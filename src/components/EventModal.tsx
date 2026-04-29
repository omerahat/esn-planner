import { useState } from "react";
import type { Member, PlannerEvent } from "../types";

type EventModalProps = {
  mode: "create" | "edit";
  selectedDate: string | null;
  event: PlannerEvent | null;
  members: Member[];
  onClose: () => void;
  onCreate: (payload: { title: string; date: string; time: string }) => void;
  onUpdate: (
    eventId: string,
    payload: { title: string; date: string; time: string; assignedMemberIds: string[] },
  ) => void;
};

export const EventModal = ({
  mode,
  selectedDate,
  event,
  members,
  onClose,
  onCreate,
  onUpdate,
}: EventModalProps) => {
  const initialTitle = mode === "edit" && event ? event.title : "";
  const initialDate = mode === "edit" && event ? event.date : (selectedDate ?? "");
  const initialTime = mode === "edit" && event ? event.time : "21:00";
  const initialAssigned = mode === "edit" && event ? event.assignedMemberIds : [];

  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [assignedMemberIds, setAssignedMemberIds] = useState<string[]>(initialAssigned);

  const isOpen = mode === "edit" ? Boolean(event) : Boolean(selectedDate);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl max-h-[85vh] overflow-y-auto">
        <h2 className="text-lg font-bold text-[#04006d]">
          {mode === "edit" ? "Edit Event" : "Create Event"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{date}</p>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-[#04006d]">Event Name</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500"
              placeholder="Welcome Party"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#04006d]">Date</span>
            <input
              type="date"
              value={date}
              onChange={(eventValue) => setDate(eventValue.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#04006d]">Time</span>
            <input
              type="time"
              value={time}
              onChange={(eventValue) => setTime(eventValue.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-500"
            />
          </label>
          <div>
            <p className="text-sm font-medium text-[#04006d]">Assigned Members</p>
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

        <div className="mt-5 flex justify-end gap-2">
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
                  time,
                  assignedMemberIds,
                });
              } else {
                onCreate({ title: cleanTitle, date, time });
              }
              onClose();
            }}
            className="rounded-lg bg-[#00aeef] px-4 py-2 text-sm font-semibold text-white"
          >
            {mode === "edit" ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
