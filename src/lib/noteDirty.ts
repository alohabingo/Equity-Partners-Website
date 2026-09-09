/**
 * "Save notes" is offered only when there is something to save.
 *
 * The same notes field appears in three places — the lead profile card, the
 * inbox panel and the full enquiry page — all writing to one column. Each needs
 * the same rule, so it lives here rather than being typed out three times: that
 * duplication is what let the drag-to-reorder bug sit unnoticed, and a Save
 * button that behaves differently depending on which screen you are on is the
 * same mistake in a friendlier costume.
 *
 * The comparison is against the text the field was RENDERED with, not the last
 * keystroke, so typing a word and deleting it again correctly leaves nothing to
 * save. Ends are trimmed: a stray newline is not an edit worth stamping
 * somebody's name and a timestamp on.
 */
const baseline = new WeakMap<HTMLTextAreaElement, string>();

export function syncNoteSave(box: HTMLTextAreaElement): void {
  const save = box.closest("form")?.querySelector<HTMLButtonElement>("[data-notesave]");
  if (!save) return;
  if (!baseline.has(box)) baseline.set(box, box.defaultValue.trim());
  save.disabled = box.value.trim() === baseline.get(box);
}

export function armNoteForms(): void {
  if ((window as any).__epNotesArmed) return;
  (window as any).__epNotesArmed = true;

  // Delegated: several profiles can exist on one page, one dialog per lead, and
  // more are never added after load — but delegation costs nothing and removes
  // the question entirely.
  document.addEventListener("input", (ev) => {
    const box = (ev.target as HTMLElement | null)?.closest<HTMLTextAreaElement>("[data-noteinput]");
    if (box) syncNoteSave(box);
  });

  /**
   * Coming back with typed text still in the box.
   *
   * A browser restoring a page from its back/forward cache puts the typed value
   * back but not the button's state, which would leave unsaved edits stranded
   * behind a disabled Save. Opening and closing a dialog needs no handling: it
   * is the same DOM throughout, so the button keeps whatever the typing left.
   */
  const syncAll = () =>
    document.querySelectorAll<HTMLTextAreaElement>("[data-noteinput]").forEach(syncNoteSave);
  window.addEventListener("pageshow", syncAll);
  syncAll();
}
