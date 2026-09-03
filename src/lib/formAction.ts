/**
 * Which action a posted admin form is asking for.
 *
 * Two endpoints — team.ts and partners.ts — each wrote this out by hand as a
 * chain of ternaries ending in `: "save"`. Both chains knew about `delete` and
 * `move`. Neither knew about `reorder`, which the drag-and-drop on the Team
 * page has been posting all along, so every reorder fell through to the save
 * branch, bailed on the missing name, and came back as a redirect the page
 * could not read. Dragging a card has never worked in either list.
 *
 * The typechecker had been reporting it the whole time, as an `if` comparing
 * against a value the chain could not produce. It was written off as noise
 * twice, which is the actual lesson: a warning nobody acts on is a warning
 * nobody reads.
 *
 * So the decision lives in one tested place. Adding an action is now adding it
 * to one list, and forgetting to is a failing test rather than a button that
 * silently does the wrong thing.
 */

/**
 * @param submitted  every value posted under the name "action" — `getAll`,
 *                   not `get`, because a form with several submit buttons can
 *                   send more than one and we must not depend on which.
 * @param known      the recognised actions, MOST DESTRUCTIVE FIRST. Order is
 *                   the tie-break when more than one arrives: a request that
 *                   somehow carries both `delete` and `save` must delete, never
 *                   quietly save instead.
 * @param fallback   what a bare or unrecognised submission means.
 */
export function pickAction<T extends string>(
  submitted: readonly string[],
  known: readonly T[],
  fallback: T,
): T {
  for (const candidate of known) {
    if (submitted.includes(candidate)) return candidate;
  }
  return fallback;
}

/**
 * The ordered list both list-editing endpoints use.
 *
 * `save` is the fallback rather than a member: it is what an ordinary form
 * submission means when it names no action at all.
 */
export const LIST_ACTIONS = ["delete", "move", "reorder"] as const;
export type ListAction = (typeof LIST_ACTIONS)[number] | "save";

export const pickListAction = (submitted: readonly string[]): ListAction =>
  pickAction<ListAction>(submitted, LIST_ACTIONS, "save");
