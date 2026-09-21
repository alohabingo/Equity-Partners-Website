/**
 * The floor list on the building forms — one row per floor, top floor first,
 * each with a stepper for how many units it holds.
 *
 * Shared by "Add a building" and by every building's own editor so the two
 * cannot drift apart. One field drives the list: "Floors". Type 6 and six rows
 * appear, drawn top-down like the building itself — the top floor first, the
 * ground floor at the bottom — and each row's stepper says how many units that
 * floor holds. There is no "units per floor" and no "add a floor": floors vary,
 * so an even fill only ever had to be corrected, and the Floors box already
 * adds one on top when it goes up by one.
 *
 * The form posts `floors` and `floor_counts` (the units on each, ground floor
 * first). The counts are rewritten on every change so reducing the floors
 * cannot leave a stale count for a floor that no longer exists in the
 * submission.
 *
 * On an existing building the rows open with the counts it has (`data-initial`)
 * and a floor cannot be stepped below the units on it that are reserved, sold
 * or have a buyer (`data-minimum`); nor can Floors go below the highest floor
 * that has one. The server checks the same rule — this just says it before Save
 * rather than after. Units recorded before floors existed appear as one more
 * row at the bottom, "No floor recorded", that can be reduced but not grown —
 * new units always get a floor — and is posted as `floorless`.
 *
 * Everything in the rows is created here, not in the page, so the page styles
 * them through :global() selectors — Astro's scoped styles cannot see elements
 * that did not exist when the page was rendered.
 */
import { floorLabel } from "./buildingFloors";

const MAX_FLOORS = 60;
const MAX_ON_FLOOR = 60;

const clamp = (n: number, hi: number): number =>
  Math.max(0, Math.min(hi, Number.isFinite(n) ? Math.floor(n) : 0));

const readList = (raw: string | undefined): number[] =>
  (raw ?? "").split(",").filter((x) => x.trim() !== "").map((x) => clamp(Number.parseInt(x, 10), MAX_ON_FLOOR));

const el = <K extends keyof HTMLElementTagNameMap>(
  tag: K, className?: string, text?: string,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

/** A "− [n] +" control. `onChange` receives the clamped new value. */
function stepper(opts: {
  value: number; min: number; max: number; label: string;
  onChange: (n: number) => void;
}): HTMLElement {
  const root = el("div", "stepper");
  const input = el("input", "stepin");
  input.type = "number";
  input.inputMode = "numeric";
  input.min = String(opts.min);
  input.max = String(opts.max);
  input.value = String(opts.value);
  input.setAttribute("aria-label", opts.label);

  const bound = (n: number) => Math.max(opts.min, clamp(n, opts.max));
  const set = (n: number) => {
    const v = bound(n);
    input.value = String(v);
    opts.onChange(v);
  };
  const button = (sign: -1 | 1) => {
    const b = el("button", "stepbtn", sign < 0 ? "−" : "+");
    b.type = "button";
    b.setAttribute("aria-label", `${sign < 0 ? "One fewer" : "One more"} — ${opts.label.toLowerCase()}`);
    b.addEventListener("click", () => set(Number.parseInt(input.value, 10) + sign));
    return b;
  };
  input.addEventListener("input", () => opts.onChange(bound(Number.parseInt(input.value, 10))));
  input.addEventListener("blur", () => set(Number.parseInt(input.value, 10)));
  root.append(button(-1), input, button(1));
  return root;
}

export function armFloorLists(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-floorlist]").forEach((list) => {
    const form = list.closest("form");
    if (!form) return;
    const rows = list.querySelector<HTMLElement>("[data-floorrows]");
    const floorsBox = form.querySelector<HTMLInputElement>("[data-floors]");
    const countsField = form.querySelector<HTMLInputElement>("[data-floorcounts]");
    const floorlessField = form.querySelector<HTMLInputElement>("[data-floorless]");
    const totalOut = list.querySelector<HTMLElement>("[data-floortotal]");
    if (!rows || !floorsBox || !countsField) return;

    // What the building holds now, and how much of each floor is spoken for.
    const initial = readList(list.dataset.initial);
    const minimum = readList(list.dataset.minimum);
    const floorless = {
      have: clamp(Number.parseInt(list.dataset.floorless ?? "0", 10), 10_000),
      locked: clamp(Number.parseInt(list.dataset.floorlessLocked ?? "0", 10), 10_000),
    };
    // Floors cannot drop below the highest floor with a committed unit on it.
    const fewestFloors = minimum.reduce((top, n, f) => (n > 0 ? f + 1 : top), 0);
    floorsBox.min = String(fewestFloors);

    const counts: number[] = initial.length
      ? [...initial]
      : Array.from({ length: clamp(Number.parseInt(floorsBox.value, 10), MAX_FLOORS) }, () => 0);
    let floorlessKeep = floorless.have;

    const publish = () => {
      floorsBox.value = String(counts.length);
      countsField.value = counts.join(",");
      if (floorlessField) floorlessField.value = String(floorlessKeep);
      if (totalOut) {
        const total = counts.reduce((a, b) => a + b, 0) + floorlessKeep;
        totalOut.textContent = total === 0 ? "No units yet" : `${total} unit${total === 1 ? "" : "s"} in total`;
      }
    };

    const draw = () => {
      rows.replaceChildren();

      // Top floor first — the list reads like the building's elevation.
      for (let f = counts.length - 1; f >= 0; f--) {
        const floorMin = minimum[f] ?? 0;
        const row = el("div", "floorrow");
        const name = el("div", "fname");
        name.append(el("b", undefined, floorLabel(f)));
        if (floorMin > 0) name.append(el("small", undefined, `${floorMin} reserved, sold or with a buyer`));
        counts[f] = Math.max(counts[f], floorMin);
        row.append(name, stepper({
          value: counts[f], min: floorMin, max: MAX_ON_FLOOR,
          label: `Units on ${floorLabel(f).toLowerCase()}`,
          onChange: (n) => { counts[f] = n; publish(); },
        }));
        rows.append(row);
      }

      if (floorless.have > 0) {
        const row = el("div", "floorrow floorless");
        const name = el("div", "fname");
        name.append(el("b", undefined, "No floor recorded"));
        name.append(el("small", undefined,
          floorless.locked > 0
            ? `Recorded before floors were. ${floorless.locked} reserved, sold or with a buyer.`
            : "Recorded before floors were. Step down to remove; new units always get a floor."));
        row.append(name, stepper({
          value: floorlessKeep, min: floorless.locked, max: floorless.have,
          label: "Units with no floor recorded",
          onChange: (n) => { floorlessKeep = n; publish(); },
        }));
        rows.append(row);
      }

      list.dataset.empty = counts.length === 0 && floorless.have === 0 ? "true" : "false";
      publish();
    };

    // The Floors box adds floors on top or takes them off the top. A floor
    // that appears starts empty; a floor that goes takes its count with it.
    // Nothing is redrawn when nothing changed: leaving the box redraws on
    // blur, and a redraw at that moment would swallow the click that caused
    // the blur — the first press on a stepper after typing a floor count.
    const resize = (snap: boolean) => {
      let wanted = clamp(Number.parseInt(floorsBox.value, 10), MAX_FLOORS);
      if (wanted < fewestFloors) {
        if (!snap) return; // still typing — wait for blur before correcting
        wanted = fewestFloors;
      }
      if (wanted === counts.length) {
        if (snap) floorsBox.value = String(counts.length);
        return;
      }
      while (counts.length > wanted) counts.pop();
      while (counts.length < wanted) counts.push(0);
      draw();
    };
    floorsBox.addEventListener("input", () => resize(false));
    floorsBox.addEventListener("blur", () => resize(true));

    draw();
  });
}
