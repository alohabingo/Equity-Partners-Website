export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { isValidStage } from "../../../lib/pipeline";
import { LOCALE_OPTIONS, isLeadSource, sameEmail, samePhone } from "../../../lib/enquiries";

/**
 * Adding a buyer by hand.
 *
 * Not every lead arrives by email: someone walks into the site office, a broker
 * rings, a name comes back from an event. Those were previously either typed
 * into somebody's own notes or lost entirely.
 *
 * A hand-added lead is triaged IN immediately. Triage exists to decide whether
 * an unsolicited message is a real buyer; a person you just met and typed in
 * yourself has already been judged, and making them queue for that decision
 * would be theatre.
 */

export const POST: APIRoute = async ({ request, cookies, redirect, locals }) => {
  const form = await request.formData();
  const get = (k: string) => form.get(k)?.toString().trim() ?? "";

  const slug = get("slug");
  if (!slug) return redirect("/admin/projects");

  const supabase = supabaseServer(cookies, request);
  const back = `/admin/projects/${slug}?tab=leads`;
  const say = (msg: string) => redirect(`${back}&notice=${encodeURIComponent(msg)}`);

  const { data: project } = await supabase
    .from("projects").select("id, name").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");

  if (get("action") !== "add") return say("Unknown action.");

  const name = get("name");
  const email = get("email");
  const phone = get("phone");

  if (!name) return say("A lead needs a name.");
  if (!email && !phone) return say("Add an email address or a phone number — one of the two.");
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return say("That email address doesn't look right.");

  // Same list the profile edits with, so a lead added by hand can hold any
  // value the profile could later set.
  const source = isLeadSource(get("source")) ? get("source") : "other";
  const locale = LOCALE_OPTIONS.some((l) => l.value === get("locale")) ? get("locale") : null;
  const stage = isValidStage(get("stage")) ? get("stage") : "new";
  const message = form.get("message")?.toString().trim() || null;

  // ---- when they actually came in ----
  //
  // Backdating matters more than it looks: the day counter and the chase timer
  // both run from this, so entering Saturday's walk-in on Monday would otherwise
  // show them as brand new and hide the two days they have already been waiting.
  const received = get("received");
  let createdAt = new Date().toISOString();
  if (received && /^\d{4}-\d{2}-\d{2}$/.test(received)) {
    const today = new Date().toISOString().slice(0, 10);
    // Midday, so the date cannot slide across a day boundary in either
    // direction once a timezone is applied to it.
    if (received !== today) createdAt = new Date(`${received}T12:00:00Z`).toISOString();
  }

  // ---- already here? ----
  //
  // The browser checks this too and offers to open the existing lead, which is
  // the version anyone will actually see. This is the backstop for a double
  // submit or a form posted without JavaScript.
  if (get("force") !== "1") {
    const { data: existing } = await supabase
      .from("inquiries")
      .select("id, name, email, phone")
      .eq("project_id", project.id);

    const clash = (existing ?? []).find(
      (e: any) => sameEmail(e.email, email) || samePhone(e.phone, phone),
    );
    if (clash) {
      return say(`${clash.name || "Someone"} is already a lead on this project — open them instead of adding a second record.`);
    }
  }

  const { data: created, error } = await supabase
    .from("inquiries")
    .insert({
      project_id: project.id,
      audience: "buyer",
      type: "general",
      name,
      email: email || null,
      phone: phone || null,
      locale,
      message,
      source,
      stage,
      triage: "converted",
      triaged_at: new Date().toISOString(),
      triaged_by: locals.user?.id ?? null,
      created_at: createdAt,
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error || !created) return say(`Could not add the lead: ${error?.message ?? "unknown error"}`);

  // Two events, both already permitted by the kind constraint. "Received" says
  // how it got here so nobody later wonders why there is no email thread;
  // "converted" records that it never needed triaging.
  const { error: eventError } = await supabase.from("enquiry_events").insert([
    { inquiry_id: created.id, actor_id: locals.user?.id ?? null, kind: "received",
      detail: { via: "manual", source, label: "Added by hand" } },
    { inquiry_id: created.id, actor_id: locals.user?.id ?? null, kind: "converted",
      detail: { via: "manual" } },
  ]);
  if (eventError) console.error("enquiry_events insert failed for manual lead:", eventError.message);

  return say(`${name} added.`);
};
