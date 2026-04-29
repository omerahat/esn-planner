import { GripVertical } from "lucide-react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import type { Member, PlannerEvent } from "../types";
import { getCategoryMeta } from "../lib/plannerConfig";

type EventCardProps = {
  event: PlannerEvent;
  membersById: Record<string, Member>;
  onClick: (eventId: string) => void;
};

const initials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? "")
    .join("");

export const EventCard = ({ event, membersById, onClick }: EventCardProps) => {
  const categoryMeta = getCategoryMeta(event.categoryId);
  const { setNodeRef, isOver } = useDroppable({ id: `event:${event.id}` });
  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({
    id: `eventDrag:${event.id}`,
  });

  return (
    <article
      ref={(node) => {
        setNodeRef(node);
        setDragRef(node);
      }}
      onClick={(clickEvent) => {
        clickEvent.stopPropagation();
        onClick(event.id);
      }}
      className={`rounded-xl border p-2 transition ${
        isOver ? "border-cyan-500 bg-cyan-50" : "border-slate-200 bg-white"
      }`}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.75 : 1,
      }}
      {...listeners}
      {...attributes}
    >
      <p className="flex items-center gap-1 truncate text-sm font-semibold text-brand-navy">
        <GripVertical size={12} className="text-slate-400" />
        {event.emojiOrIcon?.trim() ? <span>{event.emojiOrIcon.trim()}</span> : null}
        {event.title}
      </p>
      <p className="mt-1 text-xs font-medium" style={{ color: categoryMeta.color }}>
        {categoryMeta.label}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {event.assignedMemberIds.map((memberId) => {
          const member = membersById[memberId];
          if (!member) return null;

          return (
            <span
              key={member.id}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: member.color }}
              title={member.name}
            >
              {initials(member.name)}
            </span>
          );
        })}
      </div>
    </article>
  );
};
