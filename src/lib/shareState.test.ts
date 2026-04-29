import { describe, expect, test } from "vitest";
import { decodeSharedState, encodeSharedState } from "./shareState";
import type { PlannerStateV2 } from "../types";

const sampleState: PlannerStateV2 = {
  version: 2,
  events: [
    {
      id: "e1",
      title: "Test",
      date: "2026-04-29",
      categoryId: "event-comm",
      emojiOrIcon: "⭐",
      assignedMemberIds: [],
    },
  ],
  members: [{ id: "1", name: "azra", color: "#2e3192", status: "Active" }],
  specialDateRanges: [{ id: "r1", startDate: "2026-04-01", endDate: "2026-04-03", description: "Range", color: "#00aeef" }],
  viewState: { viewDateIso: "2026-04-01" },
};

describe("shareState", () => {
  test("encodes and decodes planner state safely", () => {
    const encoded = encodeSharedState(sampleState);
    const decoded = decodeSharedState(encoded);

    expect(decoded).toEqual(sampleState);
  });

  test("returns null for invalid payloads", () => {
    expect(decodeSharedState("abc")).toBeNull();
  });
});
