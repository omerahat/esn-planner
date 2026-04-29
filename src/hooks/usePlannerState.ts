import { useEffect, useMemo, useState } from "react";
import { initialMembers } from "../data/initialData";
import {
  createDefaultPlannerState,
  decodeSharedState,
  migrateV1Events,
  parseStoredState,
  STORAGE_KEY,
} from "../lib/shareState";
import type { PlannerEvent, PlannerStateV2, SpecialDateRange } from "../types";

export const usePlannerState = () => {
  const [state, setState] = useState<PlannerStateV2>(() => {
    const shared = decodeSharedState(new URLSearchParams(window.location.search).get("data"));
    if (shared) return shared;

    const v2 = parseStoredState();
    if (v2) return v2;

    const v1Raw = localStorage.getItem("esn-event-planner-state-v1");
    if (v1Raw) {
      try {
        const migrated = migrateV1Events(JSON.parse(v1Raw));
        if (migrated) return migrated;
      } catch {
        // Ignore invalid legacy data.
      }
    }
    return createDefaultPlannerState();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addEvent = (payload: {
    title: string;
    date: string;
    categoryId: PlannerEvent["categoryId"];
    emojiOrIcon?: string;
  }) => {
    const event: PlannerEvent = {
      id: crypto.randomUUID(),
      title: payload.title,
      date: payload.date,
      categoryId: payload.categoryId,
      emojiOrIcon: payload.emojiOrIcon?.trim() ?? "",
      assignedMemberIds: [],
    };
    setState((current) => ({ ...current, events: [...current.events, event] }));
  };

  const assignMember = (eventId: string, memberId: string) => {
    setState((current) => ({
      ...current,
      events: current.events.map((event) => {
        if (event.id !== eventId || event.assignedMemberIds.includes(memberId)) {
          return event;
        }
        return {
          ...event,
          assignedMemberIds: [...event.assignedMemberIds, memberId],
        };
      }),
    }));
  };

  const unassignMember = (eventId: string, memberId: string) => {
    setState((current) => ({
      ...current,
      events: current.events.map((event) => {
        if (event.id !== eventId) {
          return event;
        }
        return {
          ...event,
          assignedMemberIds: event.assignedMemberIds.filter((id) => id !== memberId),
        };
      }),
    }));
  };

  const updateEvent = (
    eventId: string,
    payload: {
      title: string;
      date: string;
      categoryId: PlannerEvent["categoryId"];
      emojiOrIcon?: string;
      assignedMemberIds: string[];
    },
  ) => {
    setState((current) => ({
      ...current,
      events: current.events.map((event) => {
        if (event.id !== eventId) {
          return event;
        }
        return {
          ...event,
          title: payload.title,
          date: payload.date,
          categoryId: payload.categoryId,
          emojiOrIcon: payload.emojiOrIcon?.trim() ?? "",
          assignedMemberIds: [...new Set(payload.assignedMemberIds)],
        };
      }),
    }));
  };

  const deleteEvent = (eventId: string) => {
    setState((current) => ({
      ...current,
      events: current.events.filter((event) => event.id !== eventId),
    }));
  };

  const moveEventToDate = (eventId: string, targetDate: string) => {
    setState((current) => ({
      ...current,
      events: current.events.map((event) => {
        if (event.id !== eventId || event.date === targetDate) {
          return event;
        }
        return {
          ...event,
          date: targetDate,
        };
      }),
    }));
  };

  const addDateRange = (payload: Omit<SpecialDateRange, "id">) => {
    setState((current) => ({
      ...current,
      specialDateRanges: [...current.specialDateRanges, { ...payload, id: crypto.randomUUID() }],
    }));
  };

  const deleteDateRange = (rangeId: string) => {
    setState((current) => ({
      ...current,
      specialDateRanges: current.specialDateRanges.filter((range) => range.id !== rangeId),
    }));
  };

  const setViewDateIso = (viewDateIso: string) => {
    setState((current) => ({
      ...current,
      viewState: current.viewState.viewDateIso === viewDateIso ? current.viewState : { viewDateIso },
    }));
  };

  const replacePlannerState = (nextState: PlannerStateV2) => {
    setState(nextState);
  };

  const resetPlannerState = () => {
    setState(createDefaultPlannerState());
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("esn-event-planner-state-v1");
  };

  const eventsByDate = useMemo(() => {
    return state.events.reduce<Record<string, PlannerEvent[]>>((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    }, {});
  }, [state.events]);

  return {
    members: state.members.length > 0 ? state.members : initialMembers,
    events: state.events,
    specialDateRanges: state.specialDateRanges,
    viewState: state.viewState,
    plannerState: state,
    eventsByDate,
    addEvent,
    assignMember,
    unassignMember,
    updateEvent,
    deleteEvent,
    moveEventToDate,
    addDateRange,
    deleteDateRange,
    setViewDateIso,
    replacePlannerState,
    resetPlannerState,
  };
};
