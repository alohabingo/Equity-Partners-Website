import {
  parseFloorCounts, totalUnits, planUnits, floorPlanError, evenFloors,
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

is(
  planUnits("Apartment", [2, 3]).map((u) => u.code),
  ["Apartment 1.1", "Apartment 1.2", "Apartment 2.1", "Apartment 2.2", "Apartment 2.3"],
  "named floor-first, so a unit can be placed from its name alone",
);
is(
  planUnits("Apartment", [2, 3]).map((u) => u.floor),
  [1, 1, 2, 2, 2],
  "and the floor is stored, not just spelled",
);
is(planUnits("Villa", [1]).map((u) => u.code), ["Villa 1.1"], "a different unit type");
is(planUnits("", [1]).map((u) => u.code), ["Unit 1.1"], "no type given falls back to Unit");
is(planUnits("  ", [1]).map((u) => u.code), ["Unit 1.1"], "whitespace is not a type");
is(planUnits("Apartment", [0, 2]).map((u) => u.code), ["Apartment 2.1", "Apartment 2.2"],
   "an empty ground floor makes no units but still counts as floor 1");
is(planUnits("Apartment", []).length, 0, "no floors, no units");

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
