import { useDraggable } from "@dnd-kit/core";
import { Users } from "lucide-react";
import { useState } from "react";
import type { Member } from "../types";
import { getMemberAvatarCandidates } from "../lib/avatar";

type MembersPanelProps = {
  members: Member[];
};

const DraggableMember = ({ member }: { member: Member }) => {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const avatarCandidates = getMemberAvatarCandidates(member.name);
  const hasFallbackImage = avatarIndex < avatarCandidates.length;
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
      {hasFallbackImage ? (
        <img
          src={avatarCandidates[avatarIndex]}
          alt={member.name}
          onError={() => setAvatarIndex((current) => current + 1)}
          className="h-8 w-8 rounded-full border border-slate-200 bg-slate-50 object-cover"
        />
      ) : (
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: member.color }}
          aria-hidden
        >
          {member.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span>
        <span className="block text-sm font-medium text-brand-navy">{member.name}</span>
        <span className="block text-xs text-slate-500">{member.status}</span>
      </span>
    </button>
  );
};

export const MembersPanel = ({ members }: MembersPanelProps) => {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="font-heading flex items-center gap-2 text-base font-semibold text-brand-navy">
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
