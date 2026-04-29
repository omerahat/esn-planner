import { useEffect, useMemo, useState } from "react";
import { initialEvents, initialMembers } from "../data/initialData";
import type { PlannerEvent } from "../types";

const STORAGE_KEY = "esn-event-planner-state-v1";

const parseStoredEvents = (): PlannerEvent[] | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PlannerEvent[];
    if (!Array.isArray(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const usePlannerState = () => {
  const [events, setEvents] = useState<PlannerEvent[]>(() => parseStoredEvents() ?? initialEvents);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = (payload: { title: string; date: string; time: string }) => {
    const event: PlannerEvent = {
      id: crypto.randomUUID(),
      title: payload.title,
      date: payload.date,
      time: payload.time,
      assignedMemberIds: [],
    };
    setEvents((current) => [...current, event]);
  };

  const assignMember = (eventId: string, memberId: string) => {
    setEvents((current) =>
      current.map((event) => {
        if (event.id !== eventId || event.assignedMemberIds.includes(memberId)) {
          return event;
        }
        return {
          ...event,
          assignedMemberIds: [...event.assignedMemberIds, memberId],
        };
      }),
    );
  };

  const unassignMember = (eventId: string, memberId: string) => {
    setEvents((current) =>
      current.map((event) => {
        if (event.id !== eventId) {
          return event;
        }
        return {
          ...event,
          assignedMemberIds: event.assignedMemberIds.filter((id) => id !== memberId),
        };
      }),
    );
  };

  const updateEvent = (
    eventId: string,
    payload: {
      title: string;
      date: string;
      time: string;
      assignedMemberIds: string[];
    },
  ) => {
    setEvents((current) =>
      current.map((event) => {
        if (event.id !== eventId) {
          return event;
        }
        return {
          ...event,
          title: payload.title,
          date: payload.date,
          time: payload.time,
          assignedMemberIds: [...new Set(payload.assignedMemberIds)],
        };
      }),
    );
  };

  const moveEventToDate = (eventId: string, targetDate: string) => {
    setEvents((current) =>
      current.map((event) => {
        if (event.id !== eventId || event.date === targetDate) {
          return event;
        }
        return {
          ...event,
          date: targetDate,
        };
      }),
    );
  };

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, PlannerEvent[]>>((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    }, {});
  }, [events]);

  return {
    members: initialMembers,
    events,
    eventsByDate,
    addEvent,
    assignMember,
    unassignMember,
    updateEvent,
    moveEventToDate,
  };
};
