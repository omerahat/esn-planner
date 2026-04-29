import { useDroppable } from "@dnd-kit/core";
import type { PlannerEvent, Member } from "../types";
import { buildMonthCells, getDaysOfWeek } from "../lib/calendar";
import { EventCard } from "./EventCard";

type CalendarGridProps = {
  viewDate: Date;
  eventsByDate: Record<string, PlannerEvent[]>;
  membersById: Record<string, Member>;
  onDayClick: (isoDate: string) => void;
  onEventClick: (eventId: string) => void;
};

type DayCellProps = {
  isoDate: string;
  dayNumber: number;
  inCurrentMonth: boolean;
  dayEvents: PlannerEvent[];
  membersById: Record<string, Member>;
  onDayClick: (isoDate: string) => void;
  onEventClick: (eventId: string) => void;
};

const DayCell = ({
  isoDate,
  dayNumber,
  inCurrentMonth,
  dayEvents,
  membersById,
  onDayClick,
  onEventClick,
}: DayCellProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: `day:${isoDate}` });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-28 rounded-xl border p-2 text-left align-top transition ${
        inCurrentMonth ? "border-slate-200 bg-[#fcf8ff]" : "border-slate-100 bg-slate-50 text-slate-400"
      } ${isOver ? "border-cyan-500" : ""}`}
    >
      <button
        type="button"
        onClick={() => onDayClick(isoDate)}
        className="rounded px-1 text-xs font-semibold hover:bg-white/80"
      >
        {dayNumber}
      </button>
      <div className="mt-2 space-y-2">
        {dayEvents.map((event) => (
          <EventCard key={event.id} event={event} membersById={membersById} onClick={onEventClick} />
        ))}
      </div>
    </div>
  );
};

export const CalendarGrid = ({
  viewDate,
  eventsByDate,
  membersById,
  onDayClick,
  onEventClick,
}: CalendarGridProps) => {
  const cells = buildMonthCells(viewDate);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-7 gap-2">
        {getDaysOfWeek().map((weekday) => (
          <p key={weekday} className="px-2 py-1 text-center text-xs font-semibold uppercase text-slate-500">
            {weekday}
          </p>
        ))}

        {cells.map((cell) => {
          const dayEvents = eventsByDate[cell.isoDate] ?? [];
          return (
            <DayCell
              key={cell.isoDate}
              isoDate={cell.isoDate}
              dayNumber={cell.date.getDate()}
              inCurrentMonth={cell.inCurrentMonth}
              dayEvents={dayEvents}
              membersById={membersById}
              onDayClick={onDayClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </section>
  );
};
