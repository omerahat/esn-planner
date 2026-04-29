import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { ChevronLeft, ChevronRight, CalendarPlus, Link2, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarGrid } from "./components/CalendarGrid";
import { EventModal } from "./components/EventModal";
import { ExportButton } from "./components/ExportButton";
import { MembersPanel } from "./components/MembersPanel";
import { usePlannerState } from "./hooks/usePlannerState";
import { fromIsoDate, getMonthLabel, toIsoDate } from "./lib/calendar";
import { encodeSharedState } from "./lib/shareState";
import type { Member } from "./types";

const getMembersById = (members: Member[]): Record<string, Member> =>
  members.reduce<Record<string, Member>>((acc, member) => {
    acc[member.id] = member;
    return acc;
  }, {});

function App() {
  const {
    members,
    events,
    specialDateRanges,
    eventsByDate,
    addEvent,
    assignMember,
    updateEvent,
    deleteEvent,
    moveEventToDate,
    addDateRange,
    deleteDateRange,
    setViewDateIso,
    plannerState,
    resetPlannerState,
  } = usePlannerState();
  const [viewDate, setViewDate] = useState(() => fromIsoDate(plannerState.viewState.viewDateIso));
  const [createDate, setCreateDate] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [rangeStartDate, setRangeStartDate] = useState("");
  const [rangeEndDate, setRangeEndDate] = useState("");
  const [rangeDescription, setRangeDescription] = useState("");
  const [rangeColor, setRangeColor] = useState("#2e3192");
  const calendarExportRef = useRef<HTMLElement>(null);

  const membersById = useMemo(() => getMembersById(members), [members]);
  const editingEvent = useMemo(
    () => (editingEventId ? events.find((item) => item.id === editingEventId) ?? null : null),
    [editingEventId, events],
  );

  useEffect(() => {
    setViewDateIso(toIsoDate(viewDate));
  }, [setViewDateIso, viewDate]);

  const shareCurrentState = async () => {
    const encoded = encodeSharedState({
      ...plannerState,
      viewState: { viewDateIso: toIsoDate(viewDate) },
    });
    const url = new URL(window.location.href);
    url.searchParams.set("data", encoded);
    window.history.replaceState({}, "", url.toString());
    try {
      await navigator.clipboard.writeText(url.toString());
    } catch {
      window.prompt("Copy share URL", url.toString());
    }
  };

  const handleReset = () => {
    const shouldReset = window.confirm("Reset calendar and clear local data?");
    if (!shouldReset) return;
    resetPlannerState();
    setCreateDate(null);
    setEditingEventId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("data");
    window.history.replaceState({}, "", url.toString());
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId.startsWith("member:") && overId.startsWith("event:")) {
      const memberId = activeId.replace("member:", "");
      const eventId = overId.replace("event:", "");
      assignMember(eventId, memberId);
      return;
    }

    if (activeId.startsWith("eventDrag:") && overId.startsWith("day:")) {
      const eventId = activeId.replace("eventDrag:", "");
      const targetDate = overId.replace("day:", "");
      moveEventToDate(eventId, targetDate);
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8">
        <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/esn-logo.png"
              alt="ESN Logo"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              className="h-9 w-9 rounded-full object-contain"
            />
            <h1 className="font-heading text-2xl font-extrabold text-brand-navy">ESN Event Planner</h1>
            <button
              type="button"
              onClick={() => setViewDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
            <p className="font-heading text-sm font-semibold text-slate-600">{getMonthLabel(viewDate)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={shareCurrentState}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              <Link2 size={16} />
              Share Link
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              <RotateCcw size={16} />
              Reset Calendar
            </button>
            <ExportButton targetRef={calendarExportRef} />
          </div>
        </header>

        <main className="mx-auto mt-6 grid w-full max-w-7xl gap-4 lg:grid-cols-[1fr_300px]">
          <section ref={calendarExportRef}>
            <CalendarGrid
              viewDate={viewDate}
              eventsByDate={eventsByDate}
              specialDateRanges={specialDateRanges}
              membersById={membersById}
              onDayClick={(isoDate) => {
                setEditingEventId(null);
                setCreateDate(isoDate);
              }}
              onEventClick={(eventId) => {
                setCreateDate(null);
                setEditingEventId(eventId);
              }}
            />
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-heading text-base font-semibold text-brand-navy">Special Date Ranges</h3>
              <div className="mt-3 grid gap-2 md:grid-cols-4">
                <input
                  type="date"
                  value={rangeStartDate}
                  onChange={(event) => setRangeStartDate(event.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  type="date"
                  value={rangeEndDate}
                  onChange={(event) => setRangeEndDate(event.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  value={rangeDescription}
                  onChange={(event) => setRangeDescription(event.target.value)}
                  placeholder="Orientation Week"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={rangeColor}
                    onChange={(event) => setRangeColor(event.target.value)}
                    className="h-10 w-12 rounded border border-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!rangeStartDate || !rangeEndDate || !rangeDescription.trim()) return;
                      if (rangeStartDate > rangeEndDate) return;
                      addDateRange({
                        startDate: rangeStartDate,
                        endDate: rangeEndDate,
                        description: rangeDescription.trim(),
                        color: rangeColor,
                      });
                      setRangeDescription("");
                    }}
                    className="rounded-lg bg-brand-blue px-3 py-2 text-sm font-semibold text-white"
                  >
                    Add Range
                  </button>
                </div>
              </div>
              {specialDateRanges.length > 0 ? (
                <div className="mt-3 space-y-2">
                  {specialDateRanges.map((range) => (
                    <div key={range.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">{range.description}</span> ({range.startDate} - {range.endDate})
                      </p>
                      <button
                        type="button"
                        className="text-xs font-semibold text-red-600"
                        onClick={() => deleteDateRange(range.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => {
                setEditingEventId(null);
                setCreateDate(new Date().toISOString().slice(0, 10));
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white"
            >
              <CalendarPlus size={16} />
              New Event
            </button>
            <MembersPanel members={members} />
          </div>
        </main>
      </div>

      <EventModal
        key={`${editingEventId ?? "create"}:${createDate ?? "none"}`}
        mode={editingEvent ? "edit" : "create"}
        selectedDate={createDate}
        event={editingEvent}
        members={members}
        onClose={() => {
          setCreateDate(null);
          setEditingEventId(null);
        }}
        onCreate={addEvent}
        onUpdate={updateEvent}
        onDelete={deleteEvent}
      />
    </DndContext>
  );
}

export default App;
