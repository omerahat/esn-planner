import { useState } from "react";
import type { Member, PlannerEvent } from "../types";
import { EVENT_CATEGORIES } from "../lib/plannerConfig";

type EventModalProps = {
  mode: "create" | "edit";
  selectedDate: string | null;
  event: PlannerEvent | null;
  members: Member[];
  onClose: () => void;
  onCreate: (payload: {
    title: string;
    date: string;
    categoryId: PlannerEvent["categoryId"];
    emojiOrIcon?: string;
  }) => void;
  onUpdate: (
    eventId: string,
    payload: {
      title: string;
      date: string;
      categoryId: PlannerEvent["categoryId"];
      emojiOrIcon?: string;
      assignedMemberIds: string[];
    },
  ) => void;
  onDelete: (eventId: string) => void;
};

export const EventModal = ({
  mode,
  selectedDate,
  event,
  members,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: EventModalProps) => {
  const initialTitle = mode === "edit" && event ? event.title : "";
  const initialDate = mode === "edit" && event ? event.date : (selectedDate ?? "");
  const initialCategoryId = mode === "edit" && event ? event.categoryId : "event-comm";
  const initialEmojiOrIcon = mode === "edit" && event ? (event.emojiOrIcon ?? "") : "";
  const initialAssigned = mode === "edit" && event ? event.assignedMemberIds : [];

  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [categoryId, setCategoryId] = useState<PlannerEvent["categoryId"]>(initialCategoryId);
  const [emojiOrIcon, setEmojiOrIcon] = useState(initialEmojiOrIcon);
  const [assignedMemberIds, setAssignedMemberIds] = useState<string[]>(initialAssigned);

  const isOpen = mode === "edit" ? Boolean(event) : Boolean(selectedDate);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl max-h-[85vh] overflow-y-auto">
        <h2 className="font-heading text-lg font-bold text-brand-navy">
          {mode === "edit" ? "Edit Event" : "Create Event"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{date}</p>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-brand-navy">Event Name</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500"
              placeholder="Welcome Party"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-brand-navy">Date</span>
            <input
              type="date"
              value={date}
              onChange={(eventValue) => setDate(eventValue.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-brand-navy">Category</span>
            <select
              value={categoryId}
              onChange={(eventValue) => setCategoryId(eventValue.target.value as PlannerEvent["categoryId"])}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            >
              {EVENT_CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-brand-navy">Emoji or Icon (Optional)</span>
            <input
              value={emojiOrIcon}
              onChange={(eventValue) => setEmojiOrIcon(eventValue.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500"
              placeholder="🎉"
            />
          </label>
          <div>
            <p className="text-sm font-medium text-brand-navy">Assigned Members</p>
            <div className="mt-2 grid max-h-44 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-slate-200 p-2">
              {members.map((member) => (
                <label key={member.id} className="inline-flex items-center gap-2 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={assignedMemberIds.includes(member.id)}
                    onChange={(eventValue) => {
                      if (eventValue.target.checked) {
                        setAssignedMemberIds((current) => [...current, member.id]);
                        return;
                      }
                      setAssignedMemberIds((current) => current.filter((id) => id !== member.id));
                    }}
                  />
                  {member.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-between gap-2">
          {mode === "edit" && event ? (
            <button
              type="button"
              onClick={() => {
                onDelete(event.id);
                onClose();
              }}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
            >
              Delete
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              const cleanTitle = title.trim();
              if (!cleanTitle || !date) return;

              if (mode === "edit" && event) {
                onUpdate(event.id, {
                  title: cleanTitle,
                  date,
                  categoryId,
                  emojiOrIcon,
                  assignedMemberIds,
                });
              } else {
                onCreate({ title: cleanTitle, date, categoryId, emojiOrIcon });
              }
              onClose();
            }}
            className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white"
          >
            {mode === "edit" ? "Update" : "Save"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
