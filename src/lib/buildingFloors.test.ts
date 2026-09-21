import {
  parseFloorCounts, totalUnits, planUnits, floorPlanError, evenFloors, floorLabel,
  MAX_UNITS_TOTAL, MAX_FLOORS,
} from "./buildingFloors";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

// ---- reading what the form posts ----
is(parseFloorCounts("2,4,4,1", 4), [2, 4, 4, 1], "an uneven building: 2 on the ground, 4, 4, one penthouse");
is(parseFloorCounts("3,3,3", 3), [3, 3, 3], "an even one");
is(parseFloorCounts(" 2 , 4 ", 2), [2, 4], "spaces around the numbers");

// The floor count and the per-floor boxes are edited independently in the
// browser, so the two can disagree for a moment. Neither may lose the typing.
is(parseFloorCounts("2,4", 4), [2, 4, 0, 0], "fewer counts than floors pads with empty floors");
is(parseFloorCounts("2,4,4,1", 2), [2, 4], "more counts than floors ignores the extras");
is(parseFloorCounts("", 3), [0, 0, 0], "nothing typed yet");
is(parseFloorCounts("2,,4", 3), [2, 0, 4], "a floor left blank is a floor with nothing on it");

// ---- junk cannot become units ----
is(parseFloorCounts("abc,4", 2), [0, 4], "a non-number is zero, the valid one survives");
is(parseFloorCounts("-3,4", 2), [0, 4], "negative is zero");
is(parseFloorCounts("2.9,4", 2), [2, 4], "a decimal truncates rather than being refused");
is(parseFloorCounts("999,1", 2), [60, 1], "an absurd count is capped, not rejected");
is(parseFloorCounts("1,1", 0), [], "no floors, no counts");
is(parseFloorCounts("1,1", -4), [], "a negative floor count is no floors");
is(parseFloorCounts(Array(200).fill("1").join(","), 200).length, MAX_FLOORS, "floors are capped");

// ---- the units themselves ----
is(totalUnits([2, 4, 4, 1]), 11, "eleven units in that building");
is(totalUnits([]), 0, "an empty building");

// The ground floor is floor 0, as it is on the lift buttons in Andorra, Spain
// and France. "Floor 1" is one flight up, and its units are named A1.x.
is(
  planUnits("A", [2, 3]).map((u) => u.code),
  ["A0.1", "A0.2", "A1.1", "A1.2", "A1.3"],
  "named building, floor, unit — ground floor as 0 — so a unit can be placed from its name alone",
);
is(
  planUnits("A", [2, 3]).map((u) => u.floor),
  [0, 0, 1, 1, 1],
  "and the floor is stored, not just spelled",
);
is(planUnits("B", [1]).map((u) => u.code), ["B0.1"], "a different building");
is(planUnits("BL2", [1]).map((u) => u.code), ["BL20.1"], "a longer code is used as it is — the form keeps codes short");
is(planUnits("A", [0, 2]).map((u) => u.code), ["A1.1", "A1.2"],
   "an empty ground floor makes no units, and the floor above is still floor 1");
is(planUnits("A", []).length, 0, "no floors, no units");

// ---- what a floor is called ----
is(floorLabel(0), "Ground floor", "floor 0 is the ground floor");
is(floorLabel(1), "Floor 1", "one flight up is floor 1");
is(floorLabel(12), "Floor 12", "and so on");

// ---- the one refusal ----
is(floorPlanError([2, 4, 4, 1]), null, "an ordinary building is fine");
is(floorPlanError(evenFloors(10, 50)), null, "500 exactly is allowed");
is(
  floorPlanError(evenFloors(11, 50)) !== null,
  true,
  `over ${MAX_UNITS_TOTAL} is refused with a sentence, not a database error`,
);

// ---- the even starting point the form fills in ----
is(evenFloors(4, 3), [3, 3, 3, 3], "four floors of three");
is(evenFloors(0, 3), [], "no floors");
is(evenFloors(3, 0), [0, 0, 0], "floors with nothing on them yet");
is(evenFloors(3, 999), [60, 60, 60], "per-floor is capped too");

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
