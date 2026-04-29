import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { ChevronLeft, ChevronRight, CalendarPlus } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { CalendarGrid } from "./components/CalendarGrid";
import { EventModal } from "./components/EventModal";
import { ExportButton } from "./components/ExportButton";
import { MembersPanel } from "./components/MembersPanel";
import { usePlannerState } from "./hooks/usePlannerState";
import { getMonthLabel } from "./lib/calendar";
import type { Member } from "./types";

const getMembersById = (members: Member[]): Record<string, Member> =>
  members.reduce<Record<string, Member>>((acc, member) => {
    acc[member.id] = member;
    return acc;
  }, {});

function App() {
  const [viewDate, setViewDate] = useState(new Date());
  const [createDate, setCreateDate] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const calendarExportRef = useRef<HTMLElement>(null);
  const { members, events, eventsByDate, addEvent, assignMember, updateEvent, moveEventToDate } =
    usePlannerState();

  const membersById = useMemo(() => getMembersById(members), [members]);
  const editingEvent = useMemo(
    () => (editingEventId ? events.find((item) => item.id === editingEventId) ?? null : null),
    [editingEventId, events],
  );

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
      <div className="min-h-screen bg-[#f8f9fa] px-4 py-6 md:px-8">
        <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-[#04006d]">ESN Event Planner</h1>
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
            <p className="text-sm font-semibold text-slate-600">{getMonthLabel(viewDate)}</p>
          </div>
          <ExportButton targetRef={calendarExportRef} />
        </header>

        <main className="mx-auto mt-6 grid w-full max-w-7xl gap-4 lg:grid-cols-[1fr_300px]">
          <section ref={calendarExportRef}>
            <CalendarGrid
              viewDate={viewDate}
              eventsByDate={eventsByDate}
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
          </section>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => {
                setEditingEventId(null);
                setCreateDate(new Date().toISOString().slice(0, 10));
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00aeef] px-4 py-3 text-sm font-semibold text-white"
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
      />
    </DndContext>
  );
}

export default App;
