/**
 * Prices, typed and shown.
 *
 * Every price on the portal is whole euros — homes and parking spaces are not
 * sold to the cent — so a price is a positive integer, and everything here is
 * built on that: the parser keeps only digits, and the formatter shows no
 * decimals. What comes back is "€1,250,000": the sign first, thousands marked
 * with commas, the form the site uses everywhere a price is printed.
 */

/** "€1,250,000" — whole euros. */
export const formatEuros = (n: number): string =>
  new Intl.NumberFormat("en-GB", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(Math.round(n));

/**
 * A price typed by a person, as a number or nothing.
 *
 * Accepts what people actually type — "1.250.000", "1,250,000", "€1 250 000",
 * "1250000" — because a field that rejects a thousands separator gets worked
 * around rather than obeyed. Everything that is not a digit is dropped, which
 * is safe only because these prices are whole euros. Nothing typed, or zero,
 * is "no price yet", which is a real answer.
 */
export function parseEuros(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** What a price box should show for a stored value: formatted, or empty. */
export const priceFieldValue = (n: number | null | undefined): string =>
  typeof n === "number" && Number.isFinite(n) && n > 0 ? formatEuros(n) : "";

/**
 * Format a price box as it is typed.
 *
 * Every keystroke reparses the box to digits and rewrites it as "€1,250,000",
 * so the number is readable while it is being entered rather than only after
 * Save. The caret goes to the end each time, which is right for the way a
 * price is typed — digit after digit — and costs only the rare edit in the
 * middle of one. The server parses the same way, so the € and commas are
 * never a problem on the way back.
 */
export function armEuroInputs(root: ParentNode = document): void {
  root.querySelectorAll<HTMLInputElement>("input[data-euros]").forEach((box) => {
    const reformat = () => {
      const n = parseEuros(box.value);
      box.value = n === null ? "" : formatEuros(n);
    };
    box.addEventListener("input", reformat);
    box.addEventListener("blur", reformat);
    reformat();
  });
}
