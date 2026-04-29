import { useDraggable } from "@dnd-kit/core";
import { Users } from "lucide-react";
import type { Member } from "../types";

type MembersPanelProps = {
  members: Member[];
};

const DraggableMember = ({ member }: { member: Member }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `member:${member.id}`,
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.75 : 1,
      }}
      {...listeners}
      {...attributes}
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: member.color }}
      >
        {member.name.charAt(0).toUpperCase()}
      </span>
      <span className="text-sm font-medium text-[#04006d]">{member.name}</span>
    </button>
  );
};

export const MembersPanel = ({ members }: MembersPanelProps) => {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="flex items-center gap-2 text-base font-semibold text-[#04006d]">
        <Users size={18} />
        Members
      </h2>
      <p className="mt-1 text-xs text-slate-500">Drag a member onto an event card to assign them.</p>
      <div className="mt-4 space-y-2">
        {members.map((member) => (
          <DraggableMember key={member.id} member={member} />
        ))}
      </div>
    </aside>
  );
};
