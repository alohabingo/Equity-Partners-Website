/**
 * Sellable units — the single source of truth for a project's sales figures.
 *
 * States live here as TEXT with the allowed values in one place, not as a
 * Postgres enum, for the same reason the buyer pipeline does: renaming or
 * adding one should be an edit, not a migration.
 *
 * The colours are not chosen by eye. Available / reserved / sold is a set of
 * STATES rather than an ordered scale, so it gets three distinct hues, and the
 * three were checked against a contrast and colour-vision validator — which is
 * why "reserved" is amber rather than a second green: two greens fail for a
 * red-green colour-blind reader. Every count is written next to its colour as
 * well, so nothing on screen depends on colour alone.
 */
export const UNIT_STATES = [
  { key: "available", label: "Available", colour: "#5b8fc9", ink: "#2f6296" },
  { key: "reserved", label: "Reserved", colour: "#e8a33d", ink: "#a35700" },
  { key: "sold", label: "Sold", colour: "#1f7a55", ink: "#1a6749" },
] as const;

export type UnitState = (typeof UNIT_STATES)[number]["key"];

export const UNIT_STATE_KEYS: string[] = UNIT_STATES.map((s) => s.key);

/**
 * The order the sales bar is drawn in — committed first.
 *
 * The bar reads as progress towards sold out, so it has to fill from the LEFT
 * as units are taken: sold, then reserved, then whatever is still available as
 * the remainder on the right. Drawn in UNIT_STATES order instead, a reservation
 * appears to grow inwards from the right-hand end, which reads as the opposite
 * of what happened.
 *
 * UNIT_STATES keeps its own order because that is the order a person picks a
 * state in, which is a different question.
 */
export const SALES_BAR_ORDER = ["sold", "reserved", "available"] as const;

export const unitState = (key: string) =>
  UNIT_STATES.find((s) => s.key === key) ?? UNIT_STATES[0];

export const isValidUnitState = (v: unknown): v is UnitState =>
  typeof v === "string" && UNIT_STATE_KEYS.includes(v);

export const unitStateLabel = (key: string | null | undefined): string =>
  UNIT_STATES.find((s) => s.key === key)?.label ?? "Available";

export const unitStateColour = (key: string | null | undefined): string =>
  UNIT_STATES.find((s) => s.key === key)?.colour ?? "#5b8fc9";

/**
 * How a state looks as a control rather than as a bar segment.
 *
 * `colour` is tuned for a solid fill against white — as a text colour on its own
 * pale tint it is too light to read comfortably, which is what `ink` is for. The
 * fill and border are derived from the same hue so the two can never drift.
 */
export function unitStateTheme(key: string | null | undefined) {
  const st = UNIT_STATES.find((s) => s.key === key) ?? UNIT_STATES[0];
  const n = parseInt(st.colour.slice(1), 16);
  const rgb = `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
  return {
    ink: st.ink,
    bg: `rgba(${rgb}, 0.13)`,
    border: `rgba(${rgb}, 0.34)`,
  };
}

export type UnitRow = {
  id: string;
  code: string;
  state: string;
  price: number | null;
  inquiry_id: string | null;
  position: number;
  /** Which block or phase it sits in. Null = not placed yet. */
  building_id?: string | null;
};

export type SalesSummary = {
  total: number;
  available: number;
  reserved: number;
  sold: number;
  /** Percentages of the total, rounded so they always add up to 100. */
  pct: Record<UnitState, number>;
  soldPct: number;
  spokenForPct: number;
  value: { total: number; sold: number; reserved: number; priced: number };
};

/**
 * Counts, percentages and value from the unit rows.
 *
 * The percentages are rounded with largest-remainder rather than
 * independently: three independently rounded figures routinely add up to 99 or
 * 101, and on a card that shows all three next to a bar that is exactly the
 * kind of small wrongness people notice and stop trusting the rest over.
 */
export function summarise(units: UnitRow[]): SalesSummary {
  const total = units.length;
  const count = (s: UnitState) => units.filter((u) => u.state === s).length;
  const available = count("available");
  const reserved = count("reserved");
  const sold = count("sold");

  const raw: [UnitState, number][] = [
    ["available", available],
    ["reserved", reserved],
    ["sold", sold],
  ];

  const pct = { available: 0, reserved: 0, sold: 0 } as Record<UnitState, number>;
  if (total > 0) {
    const exact = raw.map(([k, n]) => ({ k, v: (n / total) * 100 }));
    exact.forEach((e) => (pct[e.k] = Math.floor(e.v)));
    let short = 100 - Object.values(pct).reduce((a, b) => a + b, 0);
    // Hand the leftover points to whichever shares are furthest past their
    // rounded-down value — the standard largest-remainder method.
    [...exact]
      .sort((a, b) => (b.v - Math.floor(b.v)) - (a.v - Math.floor(a.v)))
      .forEach((e) => {
        if (short > 0) { pct[e.k] += 1; short -= 1; }
      });
  }

  const sum = (rows: UnitRow[]) => rows.reduce((n, u) => n + (u.price ?? 0), 0);
  const priced = units.filter((u) => u.price != null).length;

  return {
    total, available, reserved, sold, pct,
    soldPct: pct.sold,
    spokenForPct: pct.sold + pct.reserved,
    value: {
      total: sum(units),
      sold: sum(units.filter((u) => u.state === "sold")),
      reserved: sum(units.filter((u) => u.state === "reserved")),
      priced,
    },
  };
}

/** "€1,250,000" — whole euros, since unit prices are never to the cent. */
export const euros = (n: number): string =>
  new Intl.NumberFormat("en-GB", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(n);
