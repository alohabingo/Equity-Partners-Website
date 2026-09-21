import {
  planLayoutChange, floorCountsOf, lockedCountsOf, floorless, floorlessLocked, isSpare, layoutSavedMessage,
  type ExistingUnit,
} from "./buildingLayout";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

const unit = (code: string, floor: number | null, state = "available", inquiry_id: string | null = null): ExistingUnit =>
  ({ id: `id-${code}`, code, floor, state, inquiry_id });

// A small block as it is after being added: 2 on the ground floor, 3 above.
const block = [
  unit("A0.1", 0), unit("A0.2", 0),
  unit("A1.1", 1), unit("A1.2", 1), unit("A1.3", 1),
];

// ---- reading the building as it is ----
is(floorCountsOf(block), [2, 3], "the counts the form opens with");
is(floorCountsOf([]), [], "an empty building has no floors");
is(floorCountsOf([unit("Villa 1", null), unit("Villa 2", null)]), [], "units without a floor make no floor rows");
is(floorCountsOf([unit("A 2.1", 2)]), [0, 0, 1], "a unit on floor 2 alone still shows the two floors under it");
is(floorless([unit("Villa 1", null), unit("A 0.1", 0)]), 1, "and are counted separately");

is(isSpare(unit("x", 0)), true, "an available unit with no buyer is spare");
is(isSpare(unit("x", 0, "reserved")), false, "a reserved one is not");
is(isSpare(unit("x", 0, "sold")), false, "nor a sold one");
is(isSpare(unit("x", 0, "available", "buyer-1")), false, "nor one a buyer is attached to, whatever its state says");

is(lockedCountsOf([...block.slice(0, 4), unit("A1.3", 1, "sold")]), [0, 1], "the minimum each floor can go to");
is(lockedCountsOf(block), [0, 0], "nothing spoken for, nothing locked");

// ---- no change ----
is(planLayoutChange(block, [2, 3], "A"), { ok: true, add: [], remove: [] }, "saving the same counts changes nothing");

// ---- growing ----
is(
  planLayoutChange(block, [2, 4], "A"),
  { ok: true, add: [{ code: "A1.4", floor: 1 }], remove: [] },
  "one more on floor 1 continues the numbering",
);
is(
  planLayoutChange(block, [2, 3, 1], "A"),
  { ok: true, add: [{ code: "A2.1", floor: 2 }], remove: [] },
  "a new floor on top starts its own numbering",
);
is(
  planLayoutChange(block, [3, 3], "Z"),
  { ok: true, add: [{ code: "Z0.3", floor: 0 }], remove: [] },
  "new units take the building's code as it is now; existing ones are not renamed",
);
is(
  planLayoutChange([unit("A0.1", 0), unit("A0.3", 0)], [3, 0], "A"),
  { ok: true, add: [{ code: "A0.4", floor: 0 }], remove: [] },
  "numbering continues past the highest number, so a gap left by a removal is not refilled",
);
is(
  planLayoutChange([unit("A0.1", 0), unit("A0.2", 0), unit("A0.3", null)], [3], "A"),
  { ok: true, add: [{ code: "A0.4", floor: 0 }], remove: [] },
  "a name already used anywhere in the building is skipped, even on a unit without a floor",
);
is(
  planLayoutChange([unit("a0.1", 0)], [2], "A"),
  { ok: true, add: [{ code: "A0.2", floor: 0 }], remove: [] },
  "names clash regardless of case, as they do in the database",
);

// ---- shrinking ----
is(
  planLayoutChange(block, [2, 2], "A"),
  { ok: true, add: [], remove: ["id-A1.3"] },
  "one fewer on floor 1 removes the highest-numbered spare unit",
);
is(
  planLayoutChange(block, [2], "A"),
  { ok: true, add: [], remove: ["id-A1.3", "id-A1.2", "id-A1.1"] },
  "dropping the floor count removes the whole floor",
);
is(
  planLayoutChange(block, [], "A"),
  { ok: true, add: [], remove: ["id-A0.2", "id-A0.1", "id-A1.3", "id-A1.2", "id-A1.1"] },
  "no floors at all empties the building",
);

// ---- the refusal: committed units never go ----
const withSale = [...block.slice(0, 4), unit("A1.3", 1, "sold")];
is(
  planLayoutChange(withSale, [2, 2], "A"),
  { ok: true, add: [], remove: ["id-A1.2"] },
  "shrinking a floor with a sale on it removes a spare unit instead",
);
is(
  planLayoutChange(withSale, [2, 0], "A").ok,
  false,
  "but it cannot go below the sold unit",
);
is(
  (planLayoutChange(withSale, [2, 0], "A") as { error: string }).error,
  "Floor 1 has 3 units, but 1 of them is reserved, sold or attached to a buyer, so it cannot go below 1. Change those on the Units tab first.",
  "and says which floor and why, in a sentence",
);
is(
  planLayoutChange([unit("A 0.1", 0, "available", "buyer-1")], [0], "A").ok,
  false,
  "a buyer attached to an available unit protects it too",
);
is(
  planLayoutChange([unit("A 0.1", 0, "reserved"), unit("A 0.2", 0, "reserved")], [], "A").ok,
  false,
  "removing every floor is refused when any unit is committed",
);

// ---- units without a floor are left alone ----
const villas = [unit("Villa 1", null), unit("Villa 2", null, "sold")];
is(planLayoutChange(villas, [], "Villa"), { ok: true, add: [], remove: [] }, "no floors, nothing to do — the villas stay");
is(
  planLayoutChange(villas, [2], "N"),
  { ok: true, add: [{ code: "N0.1", floor: 0 }, { code: "N0.2", floor: 0 }], remove: [] },
  "adding a floor beside them creates floor-numbered units",
);

is(floorlessLocked(villas), 1, "and how many of those are spoken for");
is(
  planLayoutChange(villas, [], "Villa", 2),
  { ok: true, add: [], remove: [] },
  "keeping all of them changes nothing",
);
is(
  planLayoutChange(villas, [], "Villa", 1),
  { ok: true, add: [], remove: ["id-Villa 1"] },
  "keeping fewer removes the spare ones, so the sold villa stays",
);
is(
  planLayoutChange(villas, [], "Villa", 0).ok,
  false,
  "but they cannot go below the sold one",
);
is(
  (planLayoutChange(villas, [], "Villa", 0) as { error: string }).error,
  "2 units have no floor recorded, and 1 of them is reserved, sold or attached to a buyer, so that cannot go below 1. Change those on the Units tab first.",
  "with a sentence saying why",
);
is(
  planLayoutChange(villas, [], "Villa", 9),
  { ok: true, add: [], remove: [] },
  "asking to keep more than exist adds nothing — new units always get a floor",
);
is(
  planLayoutChange([unit("B1", null), unit("B2", null), unit("B3", null)], [2], "B", 0),
  { ok: true, add: [{ code: "B0.1", floor: 0 }, { code: "B0.2", floor: 0 }],
    remove: ["id-B3", "id-B2", "id-B1"] },
  "the old floorless units can be swapped for floored ones in one save",
);

// ---- the sentence afterwards ----
is(layoutSavedMessage("Block B", 0, 0), 'Saved "Block B".', "nothing changed");
is(layoutSavedMessage("Block B", 1, 0), 'Saved "Block B": 1 unit added.', "one added");
is(layoutSavedMessage("Block B", 3, 2), 'Saved "Block B": 3 units added, 2 units removed.', "both");

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
