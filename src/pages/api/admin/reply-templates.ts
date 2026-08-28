export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

/**
 * A project's saved replies: add, edit, reorder, remove.
 *
 * Every query here is scoped to the project in the URL, and every write carries
 * its id. That is not only tidiness: an id posted from one project must not be
 * able to edit another project's wording, and RLS cannot tell the difference
 * because the same person is allowed in both.
 *
 * The templates carrying NO project are the starter kit new projects are copied
 * from. Nothing in this file can reach them, so a normal edit can never change
 * what the next development begins with.
 */

const MAX_BODY = 8000;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const get = (k: string) => form.get(k)?.toString().trim() ?? "";
  const action = get("action");

  const supabase = supabaseServer(cookies, request);

  // Templates are edited from inside a project's command centre, so the browser
  // goes back to the tab it came from. Which project does not matter - the
  // templates themselves are shared - but being returned to a different screen
  // than the one you were working on reads as the button having done something
  // else entirely.
  const slug = get("slug");
  const back = slug ? `/admin/projects/${slug}?tab=templates` : "/admin/projects";
  const say = (msg: string) => redirect(`${back}&notice=${encodeURIComponent(msg)}`);
  const fail = say;
  const done = say;

  if (!slug) return redirect("/admin/projects");
  const { data: project } = await supabase
    .from("projects").select("id, name").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");
  // Typed through so the query builders keep their inferred row types; without
  // the generic every result downstream degrades to `any`.
  const owned = <T,>(q: T): T => (q as any).eq("project_id", project.id);

  // ---- add an empty template, to be written in place ----
  if (action === "add") {
    const name = get("name");
    if (!name) return fail("A template needs a name.");

    const { data: last } = await owned(supabase.from("reply_templates").select("position"))
      .order("position", { ascending: false }).limit(1).maybeSingle();

    const { error } = await supabase
      .from("reply_templates")
      .insert({ name, project_id: project.id, position: (last?.position ?? -1) + 1 });

    if (error) return fail(`Could not add it: ${error.message}`);
    return done(`Added “${name}”. Write the reply in each language below.`);
  }

  // ---- save one template's name and its three bodies ----
  //
  // "starter" does everything "save" does and then promotes the result. They
  // share this block rather than the button posting twice, because a promotion
  // that saved but failed to promote (or the reverse) would leave the person
  // guessing which half happened.
  if (action === "save" || action === "starter") {
    const id = get("id");
    const name = get("name");
    if (!id) return fail("Which template?");
    if (!name) return fail("A template needs a name.");

    const bodies = {
      body_en: form.get("body_en")?.toString() ?? "",
      body_es: form.get("body_es")?.toString() ?? "",
      body_ca: form.get("body_ca")?.toString() ?? "",
    };
    for (const [k, v] of Object.entries(bodies)) {
      if (v.length > MAX_BODY) return fail(`That ${k.slice(-2).toUpperCase()} reply is too long — keep it under ${MAX_BODY} characters.`);
    }

    const { data: saved, error } = await owned(
      supabase.from("reply_templates")
        .update({ name, ...bodies, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select("source_id"),
    ).maybeSingle();

    if (error) return fail(`Could not save it: ${error.message}`);
    if (!saved) return fail("That template no longer exists.");
    if (action === "save") return done(`Saved “${name}”.`);

    // ---- promote it into the starter kit ----
    //
    // The kit is what a brand-new project is copied from. Updating it changes
    // nothing for any project that already exists - including this one - which
    // is the reassurance the confirm dialog gives before we get here.
    const starterFields = { name, ...bodies, updated_at: new Date().toISOString() };

    // Only follow source_id to a row that is STILL a starter. A stale id would
    // otherwise let this write over another project's template.
    const existing = saved.source_id
      ? (await supabase.from("reply_templates").select("id")
          .eq("id", saved.source_id).is("project_id", null).maybeSingle()).data
      : null;

    if (existing) {
      const { error: e } = await supabase
        .from("reply_templates").update(starterFields).eq("id", existing.id);
      if (e) return fail(`Saved, but the starter could not be updated: ${e.message}`);
      return done(`Saved, and the starter “${name}” now matches. New projects will begin with it.`);
    }

    const { data: last } = await supabase
      .from("reply_templates").select("position").is("project_id", null)
      .order("position", { ascending: false }).limit(1).maybeSingle();

    const { data: created, error: e } = await supabase
      .from("reply_templates")
      .insert({ ...starterFields, project_id: null, position: (last?.position ?? -1) + 1 })
      .select("id").single();

    if (e || !created) return fail(`Saved, but could not add it to the starters: ${e?.message ?? "unknown"}`);

    // Remember the link, so the next promotion updates this starter rather than
    // adding a second one beside it.
    await owned(supabase.from("reply_templates").update({ source_id: created.id }).eq("id", id));

    return done(`Saved, and “${name}” is now part of the starter set for new projects.`);
  }

  // ---- reorder: swap with the neighbour in the given direction ----
  if (action === "move") {
    const id = get("id");
    const dir = get("dir") === "up" ? -1 : 1;

    const { data: all } = await owned(supabase.from("reply_templates").select("id, position"))
      .order("position").order("created_at");
    const list = all ?? [];
    const i = list.findIndex((t) => t.id === id);
    if (i < 0) return fail("That template no longer exists.");

    const j = i + dir;
    if (j < 0 || j >= list.length) return redirect(back); // already at the end; nothing to say

    // Positions are rewritten from the array rather than swapped in place. Rows
    // seeded together can share a position, and swapping two equal numbers is a
    // move that appears to do nothing — which is exactly the "glitch" a person
    // reports and nobody can reproduce.
    const reordered = [...list];
    [reordered[i], reordered[j]] = [reordered[j], reordered[i]];

    const writes = reordered.map((t, idx) =>
      owned(supabase.from("reply_templates").update({ position: idx }).eq("id", t.id)),
    );
    const results = await Promise.all(writes);
    const bad = results.find((r) => r.error);
    if (bad?.error) return fail(`Could not reorder: ${bad.error.message}`);

    return redirect(back);
  }

  // ---- remove ----
  if (action === "remove") {
    const id = get("id");
    if (!id) return fail("Which template?");

    const { data: row } = await owned(
      supabase.from("reply_templates").select("name").eq("id", id),
    ).maybeSingle();

    const { error } = await owned(supabase.from("reply_templates").delete().eq("id", id));
    if (error) return fail(`Could not remove it: ${error.message}`);

    return done(`Removed “${row?.name ?? "that template"}”.`);
  }

  return fail("Unknown action.");
};
