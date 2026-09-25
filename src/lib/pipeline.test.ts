/**
 * Tests for the stage rail's arithmetic.
 *
 *   npx esbuild src/lib/pipeline.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * The rail is the one place the drawer makes a claim about the PAST, so it is
 * the one place a quiet mistake would go unnoticed — nobody remembers how long
 * a buyer sat in Info shared well enough to catch a wrong number.
 */
import {
  stageDurations, daysSince, BUYER_STAGES, BUYER_STAGE_KEYS, OPEN_STAGE_KEYS,
  stageLabel, stageTheme, isValidStage,
} from "./pipeline";

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

// One move: ten days in New, twenty in Info shared.
const once = stageDurations(at("01"), [move("11", "new", "info")], NOW);
check("one move splits the time", once.totals, { new: 10, info: 20 });
check("one move — current stage", once.current, "info");
check("one move — entered the current stage then", once.enteredCurrentAt, "2026-03-11T12:00:00.000Z");

// Events arrive newest-first from the database; the maths must not care.
const reversed = stageDurations(at("01"),
  [move("21", "info", "reservation"), move("11", "new", "info")], NOW);
check("order of the events does not matter", reversed.totals, { new: 10, info: 10, reservation: 10 });

// The subtle one: going backwards. Both visits to Info shared count,
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

// ---- the record wins ----
//
// The events are a history, not the truth. When the two disagree the profile
// has to show what the list shows, or the same buyer is in two stages at once.
const legacy = stageDurations(at("01"), [move("11", "new", "viewing_booked")], NOW, "info");
check("a retired stage in history is replaced by the record", legacy.current, "info");
check("the time still lands on the stage they are actually in", legacy.totals, { new: 10, info: 20 });

const agrees = stageDurations(at("01"), [move("11", "new", "info")], NOW, "info");
check("agreeing changes nothing", agrees.totals, { new: 10, info: 20 });

const noEvents = stageDurations(at("01"), [], NOW, "reservation");
check("a stage set with no event at all is still drawn", noEvents.current, "reservation");
check("and owns the whole time since the enquiry arrived", noEvents.totals, { reservation: 30 });

check("nonsense in the record is ignored rather than drawn",
  stageDurations(at("01"), [move("11", "new", "info")], NOW, "banana").current, "info");
check("no record given falls back to the events",
  stageDurations(at("01"), [move("11", "new", "info")], NOW, null).current, "info");

check("same day is zero days, not a negative", stageDurations(at("31"), [], NOW).totals, { new: 0 });
check("daysSince agrees with the rail", daysSince(at("01"), NOW), 30);


// ---- the shape of the pipeline itself ----
//
// The order here is the order a buyer moves through, and it is what the board's
// columns, the profile rail and every stage picker are drawn from. Asserting it
// means a reorder is a deliberate act rather than something that happens by
// editing an array and not noticing what moved.
check("the stages, in order",
  BUYER_STAGE_KEYS,
  ["new", "info", "interested", "reservation", "delivery", "not_proceeding"]);
check("five of them are live steps; the last two are ends",
  OPEN_STAGE_KEYS, ["new", "info", "interested", "reservation"]);
check("Interested sits between Info shared and Reservation",
  BUYER_STAGE_KEYS.indexOf("interested") - BUYER_STAGE_KEYS.indexOf("info"), 1);
check("…and immediately before Reservation",
  BUYER_STAGE_KEYS.indexOf("reservation") - BUYER_STAGE_KEYS.indexOf("interested"), 1);
check("it is spelled the way it reads on screen", stageLabel("interested"), "Interested");
check("and it is a stage the server will accept", isValidStage("interested"), true);

// The colour ramp is the sense of progress: every live stage must be darker
// than the one before it, or a later stage can look earlier than it is.
const lightness = (hex: string) => {
  const n = Number.parseInt(hex.slice(1), 16);
  return 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
};
const liveShades = BUYER_STAGES.filter((s) => s.key !== "not_proceeding").map((s) => s.shade);
check("the shades darken with every step",
  liveShades.every((c, i) => i === 0 || lightness(c) < lightness(liveShades[i - 1])), true);
const liveTints = BUYER_STAGES.filter((s) => s.key !== "not_proceeding").map((s) => s.tint);
check("so do the pill fills",
  liveTints.every((c, i) => i === 0 || lightness(c) < lightness(liveTints[i - 1])), true);

// Readable text on that fill, at every stage — WCAG AA for normal text.
const channel = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) => {
  const n = Number.parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => channel(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
for (const st of BUYER_STAGES) {
  check(`${st.label}: its ink is readable on its fill`, contrast(st.ink, st.tint) >= 4.5, true);
}

// A buyer moving through the new stage is measured like any other.
const through = stageDurations(at("01"), [
  move("06", "new", "info"),
  move("11", "info", "interested"),
  move("21", "interested", "reservation"),
], NOW);
check("time is counted in the new stage too", through.totals,
  { new: 5, info: 5, interested: 10, reservation: 10 });
check("and it can be where a buyer currently is", through.current, "reservation");
check("a buyer sitting in Interested is drawn there",
  stageDurations(at("01"), [], NOW, "interested").current, "interested");
check("its theme is the one the pill uses",
  stageTheme("interested"),
  { bg: "#def1e8", ink: "#277452", border: "#b3d9c5", colour: "#62b691" });

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
