/**
 * Tests for the stage rail's arithmetic.
 *
 *   npx esbuild src/lib/pipeline.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * The rail is the one place the drawer makes a claim about the PAST, so it is
 * the one place a quiet mistake would go unnoticed — nobody remembers how long
 * a buyer sat in Information sharing well enough to catch a wrong number.
 */
import { stageDurations, daysSince } from "./pipeline";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

const NOW = new Date("2026-03-31T12:00:00Z");
const at = (d: string) => `2026-03-${d}T12:00:00Z`;
const move = (day: string, from: string, to: string) => ({ created_at: at(day), detail: { from, to } });

// Never moved: every day since arriving belongs to the stage they arrived in.
check("never moved",
  stageDurations(at("01"), [], NOW).totals, { new: 30 });
check("never moved — still in the first stage",
  stageDurations(at("01"), [], NOW).current, "new");

// One move: ten days in New, twenty in Information sharing.
const once = stageDurations(at("01"), [move("11", "new", "info")], NOW);
check("one move splits the time", once.totals, { new: 10, info: 20 });
check("one move — current stage", once.current, "info");
check("one move — entered the current stage then", once.enteredCurrentAt, "2026-03-11T12:00:00.000Z");

// Events arrive newest-first from the database; the maths must not care.
const reversed = stageDurations(at("01"),
  [move("21", "info", "reservation"), move("11", "new", "info")], NOW);
check("order of the events does not matter", reversed.totals, { new: 10, info: 10, reservation: 10 });

// The subtle one: going backwards. Both visits to Information sharing count,
// so a stalling sale cannot look fresher than it is.
const back = stageDurations(at("01"), [
  move("06", "new", "info"),
  move("11", "info", "reservation"),
  move("16", "reservation", "info"),
], NOW);
check("revisiting a stage sums both visits", back.totals, { new: 5, info: 20, reservation: 5 });
check("revisiting — current is where they are now", back.current, "info");

// A lead added by hand straight into a later stage has no 'from' to work with.
const started = stageDurations(at("01"), [move("11", "reservation", "delivery")], NOW);
check("an unusual starting stage is taken from the first event", started.totals, { reservation: 10, delivery: 20 });

check("same day is zero days, not a negative", stageDurations(at("31"), [], NOW).totals, { new: 0 });
check("daysSince agrees with the rail", daysSince(at("01"), NOW), 30);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
