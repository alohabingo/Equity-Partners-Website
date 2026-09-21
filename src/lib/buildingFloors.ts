/**
 * Turning "four floors, and this many on each" into actual units.
 *
 * A building's floors rarely hold the same number of homes: the ground floor
 * gives space to an entrance and a couple of larger units, the top floor is one
 * penthouse, and the middle floors are the repeating ones. A single
 * units-per-floor number would describe a building nobody builds, so each floor
 * carries its own count and the form sets them all at once as a starting point.
 *
 * The counts travel as one comma-separated field rather than a numbered input
 * per floor, so changing the number of floors cannot leave orphaned fields
 * behind in the POST for floors that no longer exist.
 */

import { unitName } from "./buildingCode";

export const MAX_FLOORS = 60;
export const MAX_UNITS_PER_FLOOR = 60;
/** Matches the cap the old single-count field used, so nothing regresses. */
export const MAX_UNITS_TOTAL = 500;

/**
 * Read the per-floor counts, padded or trimmed to the number of floors asked
 * for.
 *
 * Deliberately forgiving: this arrives from a browser where the floor count and
 * the per-floor boxes are edited independently, so a mismatch is an ordinary
 * race rather than an attack. Missing entries become 0 — a floor with nothing
 * on it yet is a real answer, and refusing the whole submission over it would
 * lose the rest of someone's typing.
 */
export function parseFloorCounts(raw: string, floors: number): number[] {
  const wanted = Math.max(0, Math.min(MAX_FLOORS, Math.floor(floors) || 0));
  const parts = (raw ?? "").split(",");
  const out: number[] = [];
  for (let i = 0; i < wanted; i++) {
    const n = Number.parseInt((parts[i] ?? "").trim(), 10);
    out.push(Number.isFinite(n) && n > 0 ? Math.min(MAX_UNITS_PER_FLOOR, n) : 0);
  }
  return out;
}

export const totalUnits = (counts: number[]): number =>
  counts.reduce((sum, n) => sum + n, 0);

export type PlannedUnit = { code: string; floor: number };

/**
 * The units a building starts life with.
 *
 * Named building-first, then floor, then the unit's number on that floor —
 * "A2.3" is the third unit on the second floor of building A — so anyone
 * reading a list, a reservation or a phone message can place it without
 * opening anything. The floor is also stored on the row, because the name is
 * for people and a column is what lets the counts be edited per floor later
 * without parsing text back apart.
 *
 * The ground floor is floor 0, as it is on the lift buttons here: "A0.2" is on
 * the ground floor and "A1.1" is one flight up. This is the convention in
 * Andorra, Spain and France, where these buildings are, and matching it means
 * the unit's name agrees with what the developer's own plans call the floor.
 */
export function planUnits(buildingCode: string, counts: number[]): PlannedUnit[] {
  const out: PlannedUnit[] = [];
  counts.forEach((n, floor) => {
    for (let i = 1; i <= n; i++) out.push({ code: unitName(buildingCode, floor, i), floor });
  });
  return out;
}

/**
 * What a floor is called to a person. Used on the form, in the messages the
 * server sends back and in the tests, so the three can never disagree about
 * whether "Floor 1" is the one at street level. It is not.
 */
export const floorLabel = (floor: number): string =>
  floor === 0 ? "Ground floor" : `Floor ${floor}`;

/** Why a plan cannot be used, or null when it can. */
export function floorPlanError(counts: number[]): string | null {
  const total = totalUnits(counts);
  if (total > MAX_UNITS_TOTAL) {
    return `That comes to ${total} units. ${MAX_UNITS_TOTAL} is the most a building can be created with in one go.`;
  }
  return null;
}

/** An even starting point, before the individual floors are adjusted. */
export const evenFloors = (floors: number, perFloor: number): number[] =>
  Array.from(
    { length: Math.max(0, Math.min(MAX_FLOORS, Math.floor(floors) || 0)) },
    () => Math.max(0, Math.min(MAX_UNITS_PER_FLOOR, Math.floor(perFloor) || 0)),
  );
