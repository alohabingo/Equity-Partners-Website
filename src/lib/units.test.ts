/**
 * Tests for the sales summary.
 *
 * No test runner is configured in this project, so run it directly:
 *   npx esbuild src/lib/units.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * Most of these exist for one reason: the card shows three percentages next to
 * a bar, and three independently rounded percentages routinely add up to 99 or
 * 101. That is exactly the kind of small wrongness someone notices and then
 * stops trusting the rest of the figures over.
 */
import { summarise, type UnitRow } from "./units";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

const make = (states: string[]): UnitRow[] =>
  states.map((s, i) => ({ id: String(i), code: `Villa ${i + 1}`, state: s, price: null, inquiry_id: null, position: i }));
const split = (a: number, b: number, c: number) =>
  make([...Array(a).fill("available"), ...Array(b).fill("reserved"), ...Array(c).fill("sold")]);

const s = summarise(split(14, 4, 7));
check("counts", [s.total, s.available, s.reserved, s.sold], [25, 14, 4, 7]);
check("percentages", s.pct, { available: 56, reserved: 16, sold: 28 });
check("the headline is sold only", s.soldPct, 28);
check("spoken for adds reserved", s.spokenForPct, 44);

const thirds = summarise(split(1, 1, 1));
check("thirds still add to 100", thirds.pct.available + thirds.pct.reserved + thirds.pct.sold, 100);
check("the spare point goes to the largest remainder",
  [thirds.pct.available, thirds.pct.reserved, thirds.pct.sold], [34, 33, 33]);

let allSumTo100 = true;
for (const [a, b, c] of [[1, 0, 0], [0, 0, 1], [3, 2, 2], [5, 5, 5], [11, 7, 3], [1, 1, 98], [2, 3, 5], [9, 9, 7]]) {
  const x = summarise(split(a, b, c));
  if (x.pct.available + x.pct.reserved + x.pct.sold !== 100) allSumTo100 = false;
}
check("every split tested adds to exactly 100", allSumTo100, true);

const empty = summarise([]);
check("no units yet: no division by zero", [empty.total, empty.soldPct, empty.pct.sold], [0, 0, 0]);
check("a project with nothing sold reads 0%", summarise(split(25, 0, 0)).soldPct, 0);
check("a sold-out project reads 100%", summarise(split(0, 0, 4)).soldPct, 100);

const priced = summarise([
  { id: "1", code: "Villa 1", state: "sold", price: 2_000_000, inquiry_id: null, position: 0 },
  { id: "2", code: "Villa 2", state: "reserved", price: 1_500_000, inquiry_id: null, position: 1 },
  { id: "3", code: "Villa 3", state: "available", price: null, inquiry_id: null, position: 2 },
]);
check("value totals skip units with no price set",
  [priced.value.total, priced.value.sold, priced.value.reserved, priced.value.priced],
  [3_500_000, 2_000_000, 1_500_000, 2]);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
