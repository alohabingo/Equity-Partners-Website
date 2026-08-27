export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { isValidStage, stageLabel } from "../../../lib/pipeline";
import { sendEnquiryReply } from "../../../lib/enquiryReply";
import { REJECT_REASONS, rejectReasonLabel, LOCALE_OPTIONS, LOCALE_LABEL } from "../../../lib/enquiries";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * Actions on a single buyer enquiry: triage it in or out, change stage, set
 * the language, add a note, send a reply.
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

  // Failures are LOGGED, not ignored. A kind the database's CHECK didn't allow
  // was silently dropping every triage event while the actions themselves
  // appeared to work - the history simply stayed empty. Not thrown, though: a
  // missing audit line must not fail the thing the person actually asked for.
  const event = async (kind: string, detail: object = {}) => {
    const { error } = await supabase
      .from("enquiry_events")
      .insert({ inquiry_id: id, actor_id: actor, kind, detail });
    if (error) console.error(`enquiry_events insert failed (${kind}):`, error.message);
  };

  // ---- triage: is this a real buyer at all? ----
  //
  // Converting admits an enquiry to the pipeline and records WHO decided that,
  // in triaged_by. It deliberately does not assign the enquiry to anyone:
  // ownership was removed because at this size it added a step without adding
  // information. Who accepted it and who has written to them is recorded either
  // way, and that is what the team actually needs to see.
  if (action === "convert") {
    const { error } = await supabase
      .from("inquiries")
      .update({
        triage: "converted",
        triage_reason: null,
        triaged_at: new Date().toISOString(),
        triaged_by: actor,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);

    await event("converted");
    return redirect(back);
  }

  // Rejecting ARCHIVES. The row stays, so a mistake is recoverable and the
  // reasons can be counted later - "we get 40 spam a month" is a fact worth
  // having, and a deleted row can't tell you anything.
  if (action === "reject") {
    const reason = get("reason");
    if (!REJECT_REASONS.some((r) => r.value === reason)) {
      return json({ ok: false, error: "bad_reason" }, 422);
    }

    const { error } = await supabase
      .from("inquiries")
      .update({
        triage: "rejected",
        triage_reason: reason,
        triaged_at: new Date().toISOString(),
        triaged_by: actor,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);

    await event("rejected", { reason, label: rejectReasonLabel(reason) });
    return redirect(back);
  }

  // Undo. Rejecting is one click, so putting it back has to be one click too.
  if (action === "untriage") {
    const { error } = await supabase
      .from("inquiries")
      .update({
        triage: "pending",
        triage_reason: null,
        triaged_at: null,
        triaged_by: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);

    await event("untriaged");
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

  // Language is GUESSED from the message when mail arrives, so it has to be
  // correctable. It picks the reply template, which makes a wrong one costly.
  if (action === "locale") {
    const locale = get("locale");
    const value = LOCALE_OPTIONS.some((l) => l.value === locale) ? locale : null;

    const { data: before } = await supabase
      .from("inquiries").select("locale").eq("id", id).maybeSingle();

    const { error } = await supabase
      .from("inquiries")
      .update({ locale: value, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);

    await event("locale_changed", {
      from: before?.locale ?? null,
      to: value,
      label: value ? (LOCALE_LABEL[value] ?? value) : "Unknown",
    });
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

  if (action === "reply") {
    const result = await sendEnquiryReply({
      inquiryId: id,
      body: form.get("body")?.toString() ?? "",
      actorId: actor,
      actorName: locals.user?.fullName || "Equity Partners",
    });

    // The outcome rides back on the URL rather than being swallowed: a reply
    // that silently failed to send is indistinguishable, on screen, from one
    // that went - and the buyer would be waiting on a message nobody sent.
    const sep = back.includes("?") ? "&" : "?";
    return redirect(
      result.ok
        ? `${back}${sep}sent=1`
        : `${back}${sep}send_error=${encodeURIComponent(result.error)}`,
    );
  }

  return json({ ok: false, error: "unknown_action" }, 400);
};
