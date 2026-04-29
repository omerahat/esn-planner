import type { Member, PlannerEvent } from "../types";
import { MEMBER_STATUSES } from "../lib/plannerConfig";

const memberNames = [
  "azra",
  "deniz",
  "nehir",
  "duru",
  "ezgisu",
  "diego",
  "ece",
  "elif",
  "odi",
  "sera",
  "yağmur jr",
  "yaren",
  "yiğitcan",
  "anas",
  "beyza",
  "ece 2",
  "hilal",
  "katre",
  "meryem",
  "meyra",
  "rüveyda",
  "ömer",
  "ecrin",
  "odi",
  "azra 2",
  "doğa",
  "hilal",
  "rüzgar",
  "yusuf",
];

const palette = ["#2e3192", "#00aeef", "#7ac143", "#f47b20", "#ae008c"];

export const initialMembers: Member[] = memberNames.map((name, index) => ({
  id: String(index + 1),
  name,
  color: palette[index % palette.length],
  status: MEMBER_STATUSES[index % MEMBER_STATUSES.length],
}));

export const initialEvents: PlannerEvent[] = [
  {
    id: "e1",
    title: "Welcome Party",
    date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0",
    )}-05`,
    categoryId: "event-comm",
    emojiOrIcon: "🎉",
    assignedMemberIds: ["1", "2"],
  },
];
