export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { isValidStage, stageLabel } from "../../../lib/pipeline";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * Actions on a single buyer enquiry: claim, release, change stage, add a note.
 *
 * Every action also writes an enquiry_events row, so the enquiry's history shows
 * who did what rather than just its current state.
 */
export const POST: APIRoute = async ({ request, cookies, locals, redirect }) => {
  const form = await request.formData();
  const get = (k: string) => form.get(k)?.toString().trim() ?? "";

  const id = get("id");
  const action = get("action");
  const back = get("back") || "/admin/projects";
  if (!id) return json({ ok: false, error: "id_required" }, 422);

  const supabase = supabaseServer(cookies, request);
  const actor = locals.user?.id ?? null;

  const event = async (kind: string, detail: object = {}) => {
    await supabase.from("enquiry_events").insert({ inquiry_id: id, actor_id: actor, kind, detail });
  };

  if (action === "claim" || action === "release") {
    const claiming = action === "claim";
    const { error } = await supabase
      .from("inquiries")
      .update({ assigned_to: claiming ? actor : null, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);
    await event(claiming ? "claimed" : "released");
    return redirect(back);
  }

  if (action === "stage") {
    const stage = get("stage");
    if (!isValidStage(stage)) return json({ ok: false, error: "bad_stage" }, 422);

    // Read the old value first so the history says what changed, not just that
    // something did.
    const { data: before } = await supabase
      .from("inquiries").select("stage").eq("id", id).maybeSingle();

    const { error } = await supabase
      .from("inquiries")
      .update({ stage, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);

    await event("stage_changed", { from: before?.stage ?? null, to: stage, label: stageLabel(stage) });
    return redirect(back);
  }

  if (action === "note") {
    const body = get("body");
    if (!body) return redirect(back);

    const { error } = await supabase
      .from("enquiry_notes")
      .insert({ inquiry_id: id, author_id: actor, body });
    if (error) return json({ ok: false, error: error.message }, 403);
    await event("note_added");
    return redirect(back);
  }

  return json({ ok: false, error: "unknown_action" }, 400);
};
