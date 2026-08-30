export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { isValidStage, stageLabel } from "../../../lib/pipeline";
import { isLostReason, lostReasonLabel, tidyLostNote } from "../../../lib/lostReasons";
import { sendEnquiryReply } from "../../../lib/enquiryReply";
import { REJECT_REASONS, rejectReasonLabel, LOCALE_OPTIONS, LOCALE_LABEL, LEAD_SOURCES, sourceNeedsName, isDiscountStep } from "../../../lib/enquiries";
import { isActivityKind, tidyActivityBody, activityLabel } from "../../../lib/activity";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * Actions on a single buyer enquiry: triage it in or out, change stage, set
 * the language, add a note, send a reply.
 *
 * Every action also writes an enquiry_events row, so the enquiry's history shows
 * who did what rather than just its current state.
 */
export const POST: APIRoute = async ({ request, cookies, locals, redirect, url }) => {
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

    const lost = stage === "not_proceeding";
    const reason = isLostReason(get("lost_reason")) ? get("lost_reason") : null;
    const note = tidyLostNote(get("lost_note")) || null;

    const patch: Record<string, unknown> = { stage, updated_at: new Date().toISOString() };
    if (lost) {
      // A reason is NOT required to record the loss. The stage is the truth and
      // has to be recordable in a hurry; a missing reason is a gap the profile
      // chases afterwards, which is a different thing from an error.
      if (reason) { patch.lost_reason = reason; patch.lost_note = note; }
      // Re-entering the stage restarts the clock only if it was not already set.
      if (before?.stage !== "not_proceeding") patch.lost_at = new Date().toISOString();
    } else if (before?.stage === "not_proceeding") {
      // They came back. A reason for an ending that did not happen is worse
      // than none, so all three go together.
      patch.lost_reason = null;
      patch.lost_note = null;
      patch.lost_at = null;
    }

    const { error } = await supabase.from("inquiries").update(patch).eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);

    await event("stage_changed", {
      from: before?.stage ?? null, to: stage, label: stageLabel(stage),
      ...(lost && reason ? { reason, reasonLabel: lostReasonLabel(reason), note } : {}),
    });
    return redirect(back);
  }

  // ---- the reason, recorded after the fact ----
  //
  // Its own action because the commonest path to it is the chase: a lead was
  // moved to Not proceeding in a hurry, and the why is filled in later from the
  // profile. It never changes the stage.
  if (action === "lost_reason") {
    const reason = isLostReason(get("lost_reason")) ? get("lost_reason") : null;
    if (!reason) return redirect(back);

    const { data: before } = await supabase
      .from("inquiries").select("stage, lost_reason, lost_at").eq("id", id).maybeSingle();
    if (before?.stage !== "not_proceeding") return redirect(back);

    const note = tidyLostNote(get("lost_note")) || null;
    const { error } = await supabase
      .from("inquiries")
      .update({
        lost_reason: reason, lost_note: note,
        lost_at: before?.lost_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);

    // Recorded as a stage event pointing at the stage they are already in: the
    // history should show when the why was learned, without implying they moved.
    if (before?.lost_reason !== reason) {
      await event("stage_changed", {
        from: "not_proceeding", to: "not_proceeding", label: "Reason recorded",
        reason, reasonLabel: lostReasonLabel(reason), note,
      });
    }
    return redirect(back);
  }

  // ---- contact details, edited from the lead profile ----
  //
  // Every field here is OPTIONAL IN THE POST, and that is the whole design. The
  // profile edits these in three places — the typed fields on the navy panel,
  // and two dropdowns across the card that save the moment they are picked — so
  // a form that only carries a source must not be read as "clear the email".
  // Absent means "leave it alone"; present and empty means "clear it".
  if (action === "contact") {
    const { data: before } = await supabase
      .from("inquiries")
      .select("email, phone, source, country, source_detail, presale, discount_pct, wants_parking, project_id")
      .eq("id", id).maybeSingle();
    if (!before) return json({ ok: false, error: "not_found" }, 404);

    const sent = (k: string) => form.has(k);
    const email = sent("email") ? get("email") : (before.email ?? "");
    const phone = sent("phone") ? get("phone") : (before.phone ?? "");
    const country = sent("country") ? (get("country") || null) : (before.country ?? null);
    const source = sent("source")
      ? (LEAD_SOURCES.some((l) => l.value === get("source")) ? get("source") : null)
      : (before.source ?? null);

    // The name only exists for a referral or a broker. Changing the source to
    // anything else clears it here rather than leaving it behind — a stale
    // agency name sitting under "Website form" is worse than an empty field,
    // because it reads as a fact.
    const source_detail = !sourceNeedsName(source)
      ? null
      : sent("source_detail") ? (get("source_detail") || null) : (before.source_detail ?? null);

    const presale = sent("presale") ? get("presale") === "yes" : (before.presale ?? false);
    const wants_parking = sent("wants_parking")
      ? get("wants_parking") === "yes"
      : (before.wants_parking ?? false);

    // "None" and 1–10 are the only answers. Anything else is treated as none
    // rather than rejected: the value comes from a dropdown, so a stray one is
    // a bug or a hand-made request, not something to explain to the person.
    let discount_pct: number | null = before.discount_pct ?? null;
    if (sent("discount_pct")) {
      const n = Number.parseInt(get("discount_pct"), 10);
      discount_pct = isDiscountStep(n) ? n : null;
    }

    // Mirrors the database constraint, so the person gets a sentence rather
    // than a Postgres error. Removing the only way to reach someone is the one
    // edit here that cannot be undone by looking at the record.
    if (!email && !phone) {
      return redirect(`${back}${back.includes("?") ? "&" : "?"}contact_error=${encodeURIComponent("Keep an email address or a phone number — a lead needs one of the two.")}`);
    }
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return redirect(`${back}${back.includes("?") ? "&" : "?"}contact_error=${encodeURIComponent("That email address doesn't look right.")}`);
    }

    const { error } = await supabase
      .from("inquiries")
      .update({
        email: email || null, phone: phone || null, source, country, source_detail,
        presale, discount_pct, wants_parking,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (error) {
      return redirect(`${back}${back.includes("?") ? "&" : "?"}contact_error=${encodeURIComponent(error.message)}`);
    }

    // "Not interested in parking" and "interested in P3" cannot both be true.
    // Clearing the list here is the same rule the source name follows: a value
    // left behind under a heading that contradicts it reads as a fact.
    if (!wants_parking && (before.wants_parking ?? false)) {
      await supabase.from("enquiry_parking_interest").delete().eq("inquiry_id", id);
    }

    // Only record a change that actually changed something — an event for every
    // press of Save would bury the real edits in a history of non-events.
    const changed = (before.email ?? null) !== (email || null)
      || (before.phone ?? null) !== (phone || null)
      || (before.source ?? null) !== source
      || (before.country ?? null) !== country
      || (before.source_detail ?? null) !== source_detail
      || (before.presale ?? false) !== presale
      || (before.discount_pct ?? null) !== discount_pct
      || (before.wants_parking ?? false) !== wants_parking;
    if (changed) {
      await event("contact_changed", {
        from: {
          email: before.email ?? null, phone: before.phone ?? null, source: before.source ?? null,
          country: before.country ?? null, source_detail: before.source_detail ?? null,
          presale: before.presale ?? false, discount_pct: before.discount_pct ?? null,
          wants_parking: before.wants_parking ?? false,
        },
        to: { email: email || null, phone: phone || null, source, country, source_detail,
              presale, discount_pct, wants_parking },
      });
    }
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

  // ---- which properties they are looking at ----
  //
  // Many, not one. A buyer comparing three units is the normal case, and a
  // record that can only hold the last one they mentioned quietly loses the
  // other two.
  if (action === "interest_add" || action === "interest_remove" || action === "interest_set") {
    const unitId = get("unit_id");

    // Each row is a dropdown that can also be emptied or dropped, so a change
    // is a remove and an add in one step. Doing it as one action keeps the two
    // halves from being separable — a row cannot lose its old unit and then
    // fail to gain the new one.
    if (action === "interest_set") {
      const previous = get("replaces");
      const dropping = !!get("remove") || !unitId;
      const unchanged = !dropping && unitId === previous;

      // Picking the same unit again is not a change, and must not delete it.
      if (unchanged) return redirect(back);
      if (previous) {
        await supabase.from("enquiry_interest").delete()
          .eq("inquiry_id", id).eq("unit_id", previous);
      }
      if (dropping) return redirect(back);
    }

    if (!unitId) return redirect(back);

    if (action === "interest_remove") {
      await supabase.from("enquiry_interest").delete()
        .eq("inquiry_id", id).eq("unit_id", unitId);
      return redirect(back);
    }

    // The unit must belong to the lead's own project. The picker only offers
    // this project's units; that is the UI's promise, not a guarantee about
    // what arrives here.
    const { data: lead } = await supabase
      .from("inquiries").select("project_id").eq("id", id).maybeSingle();
    const { data: unit } = await supabase
      .from("project_units").select("id").eq("id", unitId)
      .eq("project_id", lead?.project_id ?? "").maybeSingle();
    if (!unit) return redirect(back);

    // Adding one they already have is a mis-click, and the unique index says
    // so — ignore it rather than showing an error about it.
    await supabase.from("enquiry_interest")
      .upsert({ inquiry_id: id, unit_id: unit.id, created_by: actor },
              { onConflict: "inquiry_id,unit_id", ignoreDuplicates: true });
    return redirect(back);
  }

  // ---- which parking spaces they are looking at ----
  //
  // The same three actions as units, against the other inventory. Kept separate
  // rather than generalised into one "interest" endpoint: the two tables have
  // different foreign keys and different rules about what may be offered, and a
  // shared version would spend its life asking which one it was dealing with.
  if (action === "parking_add" || action === "parking_remove" || action === "parking_set") {
    const spaceId = get("parking_id");

    if (action === "parking_set") {
      const previous = get("replaces");
      const dropping = !!get("remove") || !spaceId;
      if (!dropping && spaceId === previous) return redirect(back);
      if (previous) {
        await supabase.from("enquiry_parking_interest").delete()
          .eq("inquiry_id", id).eq("parking_id", previous);
      }
      if (dropping) return redirect(back);
    }

    if (!spaceId) return redirect(back);

    if (action === "parking_remove") {
      await supabase.from("enquiry_parking_interest").delete()
        .eq("inquiry_id", id).eq("parking_id", spaceId);
      return redirect(back);
    }

    // The space must belong to the lead's own project.
    const { data: lead } = await supabase
      .from("inquiries").select("project_id").eq("id", id).maybeSingle();
    const { data: space } = await supabase
      .from("project_parking").select("id").eq("id", spaceId)
      .eq("project_id", lead?.project_id ?? "").maybeSingle();
    if (!space) return redirect(back);

    // Naming a space implies wanting one. Setting the flag here saves the
    // person answering a question they have just answered by acting.
    await supabase.from("inquiries").update({ wants_parking: true }).eq("id", id);

    await supabase.from("enquiry_parking_interest")
      .upsert({ inquiry_id: id, parking_id: space.id, created_by: actor },
              { onConflict: "inquiry_id,parking_id", ignoreDuplicates: true });
    return redirect(back);
  }

  // ---- contact that happened somewhere else ----
  //
  // A call, an email from a phone, a video call, a site visit. Written by a
  // person about a person, which is why it is not an enquiry_event: events are
  // the portal's audit trail of itself and nobody should be able to author one.
  if (action === "activity") {
    const kind = get("kind");
    const body = tidyActivityBody(form.get("body")?.toString() ?? "");
    if (!isActivityKind(kind) || !body) return redirect(back);

    // Who DID it, which is not always who is typing. Only a real colleague is
    // accepted — the id arrives from a form, so it is not evidence of anything
    // until the profiles table agrees.
    const claimed = get("logged_by");
    let loggedBy = actor;
    if (claimed && claimed !== actor) {
      const { data: who } = await supabase
        .from("profiles").select("id").eq("id", claimed).maybeSingle();
      loggedBy = who?.id ?? actor;
    }

    // When it happened, not when it was typed: Monday's call written up on
    // Wednesday belongs on Monday. A date with no time lands at midday, so a
    // timezone cannot walk it into the day before.
    const day = get("happened_on");
    const happened = /^\d{4}-\d{2}-\d{2}$/.test(day)
      ? new Date(`${day}T12:00:00`).toISOString()
      : new Date().toISOString();

    const { error } = await supabase.from("enquiry_activity").insert({
      inquiry_id: id, kind, body, happened_at: happened,
      logged_by: loggedBy, created_by: actor,
    });
    if (error) return json({ ok: false, error: error.message }, 403);

    // The audit line records that someone added one; the row itself is the
    // content. Storing the description twice would mean editing it in two
    // places forever.
    await event("activity_logged", { kind, label: activityLabel(kind) });
    return redirect(back);
  }

  if (action === "reply") {
    const result = await sendEnquiryReply({
      inquiryId: id,
      body: form.get("body")?.toString() ?? "",
      actorId: actor,
      actorName: locals.user?.fullName || "Equity Partners",
      // getAll: the composer posts one "doc" field per ticked document.
      documentIds: form.getAll("doc").map((d) => d.toString()).filter(Boolean),
      origin: url.origin,
    });

    // The outcome rides back on the URL rather than being swallowed: a reply
    // that silently failed to send is indistinguishable, on screen, from one
    // that went - and the buyer would be waiting on a message nobody sent.
    const sep = back.includes("?") ? "&" : "?";
    return redirect(
      result.ok
        ? `${back}${sep}sent=1${result.documentsSent ? `&docs=${result.documentsSent}` : ""}`
        : `${back}${sep}send_error=${encodeURIComponent(result.error)}`,
    );
  }

  return json({ ok: false, error: "unknown_action" }, 400);
};
