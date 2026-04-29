export type Member = {
  id: string;
  name: string;
  color: string;
  status: MemberStatus;
};

export type MemberStatus =
  | "Yönetim Kurulu"
  | "Denetim Kurulu"
  | "YK Destek"
  | "Üye"
  | "Aday Üye";

export type EventCategoryId = "event-comm" | "si-comm" | "special-days" | "esn-turkiye-events";

export type PlannerEvent = {
  id: string;
  title: string;
  date: string;
  categoryId: EventCategoryId;
  emojiOrIcon?: string;
  assignedMemberIds: string[];
};

export type SpecialDateRange = {
  id: string;
  startDate: string;
  endDate: string;
  description: string;
  color: string;
};

export type PlannerViewState = {
  viewDateIso: string;
};

export type PlannerStateV2 = {
  version: 2;
  events: PlannerEvent[];
  members: Member[];
  specialDateRanges: SpecialDateRange[];
  viewState: PlannerViewState;
};

export type PlannerEventV1 = {
  id: string;
  title: string;
  date: string;
  time: string;
  assignedMemberIds: string[];
};
