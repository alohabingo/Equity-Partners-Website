import { pickAction, pickListAction, LIST_ACTIONS } from "./formAction";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = got === want;
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `  (got "${got}", want "${want}")`}`);
};

// ---- the bug this file exists for ----
is(pickListAction(["reorder"]), "reorder",
   "REGRESSION: drag-to-reorder is handled as a reorder, not silently as a save");

// ---- the actions that already worked, still working ----
is(pickListAction(["delete"]), "delete", "delete");
is(pickListAction(["move"]), "move", "move");
is(pickListAction(["save"]), "save", "an explicit save");
is(pickListAction([]), "save", "a form naming no action means save");
is(pickListAction(["publish"]), "save", "an action we do not recognise falls back to save");

// ---- more than one submitted: the destructive one must win ----
is(pickListAction(["save", "delete"]), "delete", "delete beats save, whatever the order sent");
is(pickListAction(["move", "delete"]), "delete", "delete beats move");
is(pickListAction(["reorder", "move"]), "move", "the declared order decides, not the posted order");

// ---- every action in the list is actually reachable ----
for (const a of LIST_ACTIONS) {
  is(pickListAction([a]), a, `"${a}" is reachable — no branch is dead code`);
}

// ---- the generic ----
is(pickAction(["b"], ["a", "b"] as const, "z" as const), "b", "generic: finds a known value");
is(pickAction(["q"], ["a", "b"] as const, "z" as const), "z", "generic: falls back");
is(pickAction([], ["a"] as const, "z" as const), "z", "generic: nothing submitted");

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
