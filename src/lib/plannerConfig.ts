import type { EventCategoryId, MemberStatus } from "../types";

export const EVENT_CATEGORIES: Array<{
  id: EventCategoryId;
  label: string;
  color: string;
  emoji: string;
}> = [
  { id: "event-comm", label: "Event Comm", color: "#2e3192", emoji: "🎉" },
  { id: "si-comm", label: "SI Comm", color: "#00aeef", emoji: "🤝" },
  { id: "special-days", label: "Special Days", color: "#f47b20", emoji: "📅" },
  { id: "esn-turkiye-events", label: "ESN Türkiye Events", color: "#7ac143", emoji: "🇹🇷" },
];

export const MEMBER_STATUSES: MemberStatus[] = [
  "Board",
  "Board Supporter",
  "Candidate",
  "Active",
];

export const getCategoryMeta = (categoryId: EventCategoryId) =>
  EVENT_CATEGORIES.find((item) => item.id === categoryId) ?? EVENT_CATEGORIES[0];
