import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { initialEvents, initialMembers } from "../data/initialData";
import type { EventCategoryId, PlannerEventV1, PlannerStateV2 } from "../types";

export const STORAGE_KEY = "esn-event-planner-state-v2";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const validCategoryIds = new Set<EventCategoryId>([
  "event-comm",
  "si-comm",
  "special-days",
  "esn-turkiye-events",
]);

const asV2State = (value: unknown): PlannerStateV2 | null => {
  if (!isObject(value) || value.version !== 2) return null;
  if (!Array.isArray(value.events) || !Array.isArray(value.members) || !Array.isArray(value.specialDateRanges)) {
    return null;
  }
  if (!isObject(value.viewState) || typeof value.viewState.viewDateIso !== "string") {
    return null;
  }

  for (const event of value.events) {
    if (
      !isObject(event) ||
      typeof event.id !== "string" ||
      typeof event.title !== "string" ||
      typeof event.date !== "string" ||
      !validCategoryIds.has(event.categoryId as EventCategoryId) ||
      !Array.isArray(event.assignedMemberIds)
    ) {
      return null;
    }
  }

  for (const member of value.members) {
    if (
      !isObject(member) ||
      typeof member.id !== "string" ||
      typeof member.name !== "string" ||
      typeof member.color !== "string" ||
      typeof member.status !== "string"
    ) {
      return null;
    }
  }

  for (const range of value.specialDateRanges) {
    if (
      !isObject(range) ||
      typeof range.id !== "string" ||
      typeof range.startDate !== "string" ||
      typeof range.endDate !== "string" ||
      typeof range.description !== "string" ||
      typeof range.color !== "string"
    ) {
      return null;
    }
  }

  return value as PlannerStateV2;
};

export const createDefaultPlannerState = (): PlannerStateV2 => ({
  version: 2,
  events: initialEvents,
  members: initialMembers,
  specialDateRanges: [],
  viewState: {
    viewDateIso: new Date().toISOString().slice(0, 10),
  },
});

export const migrateV1Events = (value: unknown): PlannerStateV2 | null => {
  if (!Array.isArray(value)) return null;

  const events = value
    .filter((item): item is PlannerEventV1 => isObject(item))
    .map((event) => ({
      id: typeof event.id === "string" ? event.id : crypto.randomUUID(),
      title: typeof event.title === "string" ? event.title : "Untitled Event",
      date: typeof event.date === "string" ? event.date : new Date().toISOString().slice(0, 10),
      categoryId: "event-comm" as const,
      emojiOrIcon: "",
      assignedMemberIds: Array.isArray(event.assignedMemberIds)
        ? event.assignedMemberIds.filter((id): id is string => typeof id === "string")
        : [],
    }));

  return {
    version: 2,
    events,
    members: initialMembers,
    specialDateRanges: [],
    viewState: { viewDateIso: new Date().toISOString().slice(0, 10) },
  };
};

export const decodeSharedState = (compressed: string | null): PlannerStateV2 | null => {
  if (!compressed) return null;

  try {
    const raw = decompressFromEncodedURIComponent(compressed);
    if (!raw) return null;
    return asV2State(JSON.parse(raw));
  } catch {
    return null;
  }
};

export const encodeSharedState = (state: PlannerStateV2): string =>
  compressToEncodedURIComponent(JSON.stringify(state));

export const parseStoredState = (): PlannerStateV2 | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return asV2State(JSON.parse(raw));
  } catch {
    return null;
  }
};
