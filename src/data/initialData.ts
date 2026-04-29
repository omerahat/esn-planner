import type { Member, PlannerEvent } from "../types";

const palette = ["#2e3192", "#00aeef", "#7ac143", "#f47b20", "#ae008c"];

const memberSeeds: Array<{ name: string; status: Member["status"] }> = [
  { name: "Anas Al Hassoun", status: "Active" },
  { name: "Ecrin Sezer", status: "Active" },
  { name: "Meyra Karadere", status: "Active" },
  { name: "Yiğitcan Dağlı", status: "Board Supporter" },
  { name: "Ayça Rüzgar Lafcı", status: "Active" },
  { name: "Meryem Yapıcı", status: "Active" },
  { name: "Deniz Gülse Ak", status: "Board" },
  { name: "Ece Yalçın", status: "Active" },
  { name: "Rüveyda Karakurt", status: "Candidate" },
  { name: "Katre Tosun", status: "Active" },
  { name: "Ömer Ahat", status: "Active" },
  { name: "Ece Yılmaz", status: "Active" },
  { name: "Elif Saltık", status: "Board Supporter" },
  { name: "Diego Andres Arias Castro", status: "Active" },
  { name: "Azra Naz Eralp", status: "Board Supporter" },
  { name: "Odelli Eroğlu", status: "Active" },
  { name: "Nehir Özyurt", status: "Board" },
];

export const initialMembers: Member[] = memberSeeds.map((member, index) => ({
  id: String(index + 1),
  name: member.name,
  color: palette[index % palette.length],
  status: member.status,
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
