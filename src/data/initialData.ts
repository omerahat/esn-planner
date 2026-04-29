import type { Member, PlannerEvent } from "../types";

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

const palette = ["#ec008c", "#7ac143", "#f47c36", "#00aeef"];

export const initialMembers: Member[] = memberNames.map((name, index) => ({
  id: String(index + 1),
  name,
  color: palette[index % palette.length],
}));

export const initialEvents: PlannerEvent[] = [
  {
    id: "e1",
    title: "Welcome Party",
    date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0",
    )}-05`,
    time: "21:00",
    assignedMemberIds: ["1", "2"],
  },
];
