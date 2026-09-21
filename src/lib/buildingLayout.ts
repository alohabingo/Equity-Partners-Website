/**
 * Changing the layout of a building that already exists.
 *
 * Adding a building creates its units in one go; this is the other half —
 * coming back to a building that has been saved and saying "the second floor
 * has five, not four" or "there is one more floor". The building's floors are
 * still nothing but its units grouped by the floor column, so the edit is
 * worked out as a difference: which units to create, which to remove, and
 * which floors cannot be shrunk because something on them is already spoken
 * for.
 *
 * A unit that is reserved or sold, or that a buyer is attached to, is never
 * removed by a layout edit. Those are commitments to people; if one really has
 * to go, that is a decision to take on the Units tab with the unit in front of
 * you, not a side effect of retyping a number.
 */

import { floorLabel, type PlannedUnit } from "./buildingFloors";
import { unitName } from "./buildingCode";

export type ExistingUnit = {
  id: string;
  code: string;
  floor: number | null;
  state: string;
  inquiry_id: string | null;
};

export type LayoutPlan =
  | { ok: true; add: PlannedUnit[]; remove: string[] }
  | { ok: false; error: string };

/** A unit nobody has a claim on yet — the only kind a layout edit may remove. */
export const isSpare = (u: Pick<ExistingUnit, "state" | "inquiry_id">): boolean =>
  u.state === "available" && !u.inquiry_id;

/**
 * How many units each floor holds now, ground floor first. This is what the
 * edit form starts from, so the rows show the building as it is rather than
 * an even fill someone then has to correct back.
 *
 * Units recorded without a floor are not in here — they predate floors being
 * stored, and `floorless` counts them separately so the form can say so.
 */
export function floorCountsOf(units: ExistingUnit[]): number[] {
  const top = Math.max(-1, ...units.map((u) => (u.floor ?? -1)));
  const counts = Array.from({ length: top + 1 }, () => 0);
  for (const u of units) if (u.floor !== null && u.floor >= 0) counts[u.floor] += 1;
  return counts;
}

/**
 * The floor of each count that cannot be reduced: the units on it that are
 * reserved, sold or have a buyer. The form uses these as the minimum on each
 * row so the refusal is felt before Save, and the server checks them again.
 */
export function lockedCountsOf(units: ExistingUnit[]): number[] {
  const counts = floorCountsOf(units).map(() => 0);
  for (const u of units) {
    if (u.floor !== null && u.floor >= 0 && !isSpare(u)) counts[u.floor] += 1;
  }
  return counts;
}

export const floorless = (units: ExistingUnit[]): number =>
  units.filter((u) => u.floor === null).length;

/** How many of the units without a floor are spoken for. */
export const floorlessLocked = (units: ExistingUnit[]): number =>
  units.filter((u) => u.floor === null && !isSpare(u)).length;

/** The unit's number on its floor — the 3 in "Apartment 2.3" — or null. */
const numberOnFloor = (code: string): number | null => {
  const m = code.trim().match(/(\d+)$/);
  return m ? Number.parseInt(m[1], 10) : null;
};

/**
 * Turn "this many on each floor" into the units to create and the ones to
 * remove, given what is there already.
 *
 * Growing a floor continues its numbering — a floor with A1.1 to A1.4 gets
 * A1.5, never a second A1.3 — and skips any name already used in the building,
 * so a unit someone renamed by hand cannot collide with a new one. Shrinking a floor
 * removes its highest-numbered spare units first, which keeps the remaining
 * names contiguous in the common case and never touches a committed unit. Any
 * floor above the new count is a floor being removed, and follows the same
 * rule.
 */
export function planLayoutChange(
  existing: ExistingUnit[],
  counts: number[],
  /** The building's short code — new units are named from it: "A0.1". */
  buildingCode: string,
  /**
   * How many of the units recorded WITHOUT a floor to keep. Those predate
   * floors being stored; they can be reduced here (spare ones first) but never
   * grown, because a unit made today always gets a floor. Left out, they are
   * not touched.
   */
  floorlessKeep?: number,
): LayoutPlan {
  const taken = new Set(existing.map((u) => u.code.trim().toLowerCase()));
  const floors = Math.max(counts.length, floorCountsOf(existing).length);
  const add: PlannedUnit[] = [];
  const remove: string[] = [];

  if (floorlessKeep !== undefined) {
    const loose = existing.filter((u) => u.floor === null);
    const keep = Math.max(0, Math.min(loose.length, Math.floor(floorlessKeep) || 0));
    const excess = loose.length - keep;
    if (excess > 0) {
      const spare = loose
        .filter(isSpare)
        .sort((a, b) => (numberOnFloor(b.code) ?? 0) - (numberOnFloor(a.code) ?? 0));
      if (spare.length < excess) {
        const kept = loose.length - spare.length;
        return {
          ok: false,
          error:
            `${loose.length} unit${loose.length === 1 ? " has" : "s have"} no floor recorded, and ${kept} of ` +
            `${kept === 1 ? "them is" : "them are"} reserved, sold or attached to a buyer, so that cannot go below ${kept}. ` +
            `Change those on the Units tab first.`,
        };
      }
      for (const u of spare.slice(0, excess)) remove.push(u.id);
    }
  }

  for (let floor = 0; floor < floors; floor++) {
    const wanted = counts[floor] ?? 0;
    const here = existing.filter((u) => u.floor === floor);

    if (wanted > here.length) {
      let n = Math.max(0, ...here.map((u) => numberOnFloor(u.code) ?? 0));
      for (let i = here.length; i < wanted; i++) {
        let code: string;
        do { n += 1; code = unitName(buildingCode, floor, n); } while (taken.has(code.toLowerCase()));
        taken.add(code.toLowerCase());
        add.push({ code, floor });
      }
      continue;
    }

    if (wanted < here.length) {
      const spare = here
        .filter(isSpare)
        .sort((a, b) => (numberOnFloor(b.code) ?? 0) - (numberOnFloor(a.code) ?? 0));
      const excess = here.length - wanted;
      if (spare.length < excess) {
        const kept = here.length - spare.length;
        return {
          ok: false,
          error:
            `${floorLabel(floor)} has ${here.length} unit${here.length === 1 ? "" : "s"}, but ` +
            `${kept} of them ${kept === 1 ? "is" : "are"} reserved, sold or attached to a buyer, so it ` +
            `cannot go below ${kept}. Change those on the Units tab first.`,
        };
      }
      for (const u of spare.slice(0, excess)) remove.push(u.id);
    }
  }

  return { ok: true, add, remove };
}

/** The sentence the settings card shows once a layout edit has been saved. */
export function layoutSavedMessage(name: string, added: number, removed: number): string {
  const parts: string[] = [];
  if (added) parts.push(`${added} unit${added === 1 ? "" : "s"} added`);
  if (removed) parts.push(`${removed} unit${removed === 1 ? "" : "s"} removed`);
  return parts.length ? `Saved "${name}": ${parts.join(", ")}.` : `Saved "${name}".`;
}
