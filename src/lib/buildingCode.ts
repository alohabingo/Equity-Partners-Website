/**
 * A building's short code — the letter its units are named with.
 *
 * "A0.1" is Aire, ground floor, first unit; "A2.3" is Aire, second floor,
 * third unit. The letter is a property of the building, stored on it, not
 * worked out from the name each time: "Block A" and "Block B" both start with
 * B, and a building renamed later must not silently rename its homes.
 *
 * The code is suggested from the name when a building is added and can be
 * changed in the same form. Codes are unique within a project.
 */

export const MAX_CODE_LENGTH = 3;

/**
 * What the form offers before anyone types a code.
 *
 * "Block D" suggests D — the letter after "Block" is the identity, not the B.
 * The same goes for "Building 2", "Bloque C", "Torre 1", "Phase 2" and any
 * other single word followed by a short token. Otherwise the first letter:
 * Aire → A, Brisa → B, Cielo → C.
 */
export function suggestBuildingCode(name: string): string {
  const trimmed = (name ?? "").trim();
  if (!trimmed) return "";
  const labelled = trimmed.match(/^[\p{L}]+\s+([\p{L}\p{N}]{1,3})$/u);
  if (labelled) return normaliseBuildingCode(labelled[1]);
  return normaliseBuildingCode(trimmed[0]);
}

/**
 * Upper-case letters and digits only, at most three of them. "a" becomes "A";
 * "bl-2" becomes "BL2"; spaces and punctuation cannot be part of a unit's
 * name because the name is meant to be said aloud and typed from a phone
 * message.
 */
export function normaliseBuildingCode(raw: string): string {
  return (raw ?? "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "")
    .toUpperCase()
    .slice(0, MAX_CODE_LENGTH);
}

/** Why a code cannot be used, or null when it can. */
export function buildingCodeError(code: string): string | null {
  if (!code) return "A building needs a short code — the letter its units are named with, like A.";
  return null;
}

/**
 * The name of one unit: the building's code, the floor, and the unit's number
 * on that floor — "A0.1", "A2.3". No space: it reads as one identifier, and
 * sorts and searches as one. Floor 0 is the ground floor.
 */
export const unitName = (buildingCode: string, floor: number, n: number): string =>
  `${buildingCode}${floor}.${n}`;

/**
 * Wire the Code box on a building form. It follows the Name box — Aire
 * suggests A, Block D suggests D — until someone types a code themselves, and
 * whatever is typed is tidied to the form a unit name can carry as it is
 * typed. Clearing the box hands it back to the name.
 */
export function armBuildingCodeFields(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement>("input[data-building-code]").forEach((codeBox) => {
    const form = codeBox.closest("form");
    const nameBox = form?.querySelector<HTMLInputElement>("input[data-building-name]");
    let typedByHand = false;
    codeBox.addEventListener("input", () => {
      codeBox.value = normaliseBuildingCode(codeBox.value);
      typedByHand = codeBox.value !== "";
      if (!typedByHand && nameBox) codeBox.value = suggestBuildingCode(nameBox.value);
    });
    nameBox?.addEventListener("input", () => {
      if (!typedByHand) codeBox.value = suggestBuildingCode(nameBox.value);
    });
  });
}
