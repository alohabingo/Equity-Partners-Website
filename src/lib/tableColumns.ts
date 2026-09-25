/**
 * Column widths shared by the Units tab's tables — one card per building, and
 * the Parking card.
 *
 * Both tables are drawn with `table-layout: fixed` and these widths, so every
 * column starts at the same place in every card: switching from a building to
 * Parking, the State, Price, Interested and Buyer columns stay exactly where
 * they were. Left to the browser, each table sizes its columns from its own
 * contents, and no two cards ever line up.
 *
 * Change a width here and every one of those tables moves together.
 */
export const ITEM_COLUMNS = [
  { key: "code", width: "10%" },
  { key: "state", width: "18%" },
  { key: "price", width: "25%" },
  { key: "interested", width: "26%" },
  { key: "buyer", width: "21%" },
] as const;
