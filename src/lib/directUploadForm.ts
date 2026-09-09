/**
 * Make an ordinary upload form send its file straight to storage.
 *
 * The two document forms — the fund vault and a project's documents — are plain
 * HTML posts, and that is worth keeping: they redirect back with a notice, they
 * work the way every other form in the portal works, and nobody has to
 * reimplement error handling in JavaScript.
 *
 * So the form still submits. What changes is that the file leaves first, on its
 * own, and the form then carries only the path it landed at. The file input is
 * disabled just before submitting, which is how a field is excluded from a form
 * post — and it is the entire point, because those bytes travelling with the
 * form is what hit the platform's 6 MB request limit and produced a raw gateway
 * error instead of any message we wrote.
 */
import { uploadFile, type UploadKind } from "./uploadClient";

export function armDirectUploadForms(): void {
  document.querySelectorAll<HTMLFormElement>("form[data-direct-upload]").forEach((form) => {
    const kind = form.dataset.directUpload as UploadKind;
    const fileInput = form.querySelector<HTMLInputElement>('input[type="file"]');
    const pathField = form.querySelector<HTMLInputElement>("[data-storage-path]");
    const nameField = form.querySelector<HTMLInputElement>("[data-file-name]");
    const status = form.querySelector<HTMLElement>("[data-upload-status]");
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (!fileInput || !pathField) return;

    let sending = false;

    form.addEventListener("submit", async (ev) => {
      if (sending) return;             // the programmatic submit below
      ev.preventDefault();

      const file = fileInput.files?.[0];
      if (!file) {
        if (status) status.textContent = "Choose a file to upload.";
        return;
      }

      sending = true;
      if (button) button.disabled = true;
      // A 40 MB file over a domestic connection takes a while, and a button
      // that does nothing for thirty seconds reads as broken.
      if (status) status.textContent = `Uploading ${file.name}…`;

      try {
        const path = await uploadFile(kind, file, {
          projectSlug: form.dataset.projectSlug,
        });
        pathField.value = path;
        if (nameField) nameField.value = file.name;

        // The bytes are already stored. Excluding the input is what keeps them
        // out of the form post — without this the request would still be too
        // large and nothing would have been fixed.
        fileInput.disabled = true;
        if (status) status.textContent = "Saving…";
        form.submit();
      } catch (err) {
        sending = false;
        fileInput.disabled = false;
        if (button) button.disabled = false;
        if (status) status.textContent = err instanceof Error ? err.message : "Upload failed.";
      }
    });
  });
}
