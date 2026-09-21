/**
 * Parking sold separately from the home.
 *
 * Some developments price a space apart from the apartment, so the portal has
 * to be able to say how many exist, what they cost and which are still going.
 * Deliberately NOT modelled as units: units drive the sales bar, the donut and
 * "how much of this project is sold", and twenty apartments beside thirty
 * parking spaces would read as 60% sold before a single home changed hands.
 *
 * The three states are the unit states, word for word. The question "can I
 * still sell this?" should not have a different vocabulary depending on what is
 * being sold.
 */

import { parseEuros, formatEuros } from "./euros";
export const PARKING_STATES = [
  { key: "available", label: "Available", colour: "#5b8fc9", tint: "#eaf1f9", ink: "#2f6296", edge: "#d3e0ee" },
  { key: "reserved",  label: "Reserved",  colour: "#e8a33d", tint: "#fdf1de", ink: "#a35700", edge: "#f0dcb8" },
  { key: "sold",      label: "Sold",      colour: "#1f7a55", tint: "#ddefe6", ink: "#1a6749", edge: "#b6d9c7" },
] as const;

export type ParkingState = (typeof PARKING_STATES)[number]["key"];

export const isParkingState = (value: unknown): value is ParkingState =>
  typeof value === "string" && PARKING_STATES.some((s) => s.key === value);

export const parkingState = (key: string | null | undefined) =>
  PARKING_STATES.find((s) => s.key === key) ?? PARKING_STATES[0];

export const parkingStateLabel = (key: string | null | undefined): string => parkingState(key).label;

/**
 * A price typed by a person, as a number or nothing.
 *
 * Accepts what people actually type — "18.000", "18,000", "€18 000", "18000" —
 * because a field that rejects a thousands separator gets worked around rather
 * than obeyed. Everything that is not a digit is dropped, which is safe here
 * only because these prices are whole euros: parking is not sold at 18,000.50.
 */
export const parseParkingPrice = parseEuros;

/** €18,000 — or a dash, because "no price yet" is a real answer. */
export function parkingPrice(n: number | null | undefined): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "—";
  return formatEuros(n);
}

/**
 * The names for a new run of spaces.
 *
 * Numbers on from what is already there and skips anything taken, so adding a
 * second batch does not restart at P1 and collide with the first. Returns fewer
 * than asked for only if it cannot find room, which the caller reports rather
 * than silently accepting.
 */
export function parkingCodes(prefix: string, count: number, taken: Set<string>): string[] {
  const clean = (prefix || "P").trim() || "P";
  const out: string[] = [];
  let n = 1;
  // The ceiling stops a pathological prefix from looping forever when every
  // name it can generate is already in use.
  const ceiling = count + taken.size + 1000;
  while (out.length < count && n <= ceiling) {
    const code = `${clean}${n}`;
    if (!taken.has(code)) { out.push(code); taken.add(code); }
    n += 1;
  }
  return out;
}

/**
 * The prefix the car park is already named with — "P" for P1…P18 — so a space
 * added on its own carries on the same series. The most common one wins when
 * they differ; "P" when there is nothing to go on.
 */
export function parkingPrefixOf(codes: string[]): string {
  const seen = new Map<string, number>();
  for (const code of codes) {
    const prefix = code.trim().replace(/\d+$/, "").trim();
    if (prefix) seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
  }
  let best = "P", most = 0;
  for (const [prefix, n] of seen) if (n > most) { best = prefix; most = n; }
  return best;
}

/**
 * How many of each state, for the card's summary line.
 *
 * The return type is spelled out rather than inferred: spreading a
 * Record<string, number> loses every key name, so `tally[state.key]` became an
 * index into a type with only `total` on it.
 */
export function parkingTally(
  rows: { state: string }[],
): Record<ParkingState, number> & { total: number } {
  const t: Record<ParkingState, number> = { available: 0, reserved: 0, sold: 0 };
  for (const r of rows) if (isParkingState(r.state)) t[r.state] += 1;
  return { ...t, total: rows.length };
}
