/**
 * Tests for the lost-reason list.
 *
 *   npx esbuild src/lib/lostReasons.test.ts --bundle --platform=node --outfile=/tmp/l.cjs && node /tmp/l.cjs
 */
import {
  LOST_REASONS, isLostReason, lostReasonLabel, needsLostReason,
  tidyLostNote, lostTally, MAX_LOST_NOTE,
} from "./lostReasons";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

check("every reason has a unique key",
  new Set(LOST_REASONS.map((r) => r.key)).size, LOST_REASONS.length);
check("the commonest real ending is on the list", isLostReason("went_quiet"), true);
check("anything else is not", isLostReason("vibes"), false);
check("an unrecorded reason says so rather than inventing one",
  lostReasonLabel(null), "Not recorded");

// The gap this feature exists to close.
check("a lost lead with no reason is a gap to chase",
  needsLostReason({ stage: "not_proceeding", lost_reason: null }), true);
check("a lost lead with a reason is not",
  needsLostReason({ stage: "not_proceeding", lost_reason: "price" }), false);
check("a live lead is never chased for one",
  needsLostReason({ stage: "info", lost_reason: null }), false);

check("a note is collapsed to one line", tidyLostNote("  went  with\n\nCasa Nova  "), "went with Casa Nova");
check("no note is an empty string, not undefined", tidyLostNote(null), "");
check("a runaway note is capped", tidyLostNote("x".repeat(MAX_LOST_NOTE + 200)).length, MAX_LOST_NOTE);

// The number the whole thing is for.
check("losses are counted biggest first, and unrecorded ones are left out",
  lostTally([
    { lost_reason: "price" }, { lost_reason: "timing" }, { lost_reason: "price" },
    { lost_reason: null }, { lost_reason: "price" }, { lost_reason: "timing" },
  ]),
  [{ key: "price", label: "Price", count: 3 }, { key: "timing", label: "Timing", count: 2 }]);
check("no losses tally to nothing at all", lostTally([]), []);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
