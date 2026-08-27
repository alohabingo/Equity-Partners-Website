export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { isValidUnitState } from "../../../lib/units";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * The project's unit list: generate a run, add one, edit one, remove one.
 *
 * Everything here is deliberately small and boring. The sales figures on the
 * Overview are COUNTED from these rows rather than typed in anywhere, so the
 * only way for them to be wrong is for a row to be wrong — which is a thing
 * someone can see and fix, unlike a number that has quietly gone stale.
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const get = (k: string) => form.get(k)?.toString().trim() ?? "";

  const slug = get("slug");
  const action = get("action");
  if (!slug) return json({ ok: false, error: "slug_required" }, 422);

  const supabase = supabaseServer(cookies, request);
  const back = `/admin/projects/${slug}?tab=units`;
  const fail = (msg: string) => redirect(`${back}&units_error=${encodeURIComponent(msg)}`);

  const { data: project } = await supabase
    .from("projects").select("id").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");

  // ---- generate a numbered run, for setting a project up in one go ----
  if (action === "generate") {
    const count = Number(get("count"));
    const prefix = get("prefix") || "Villa";

    if (!Number.isInteger(count) || count < 1 || count > 500) {
      return fail("Enter how many units to create, between 1 and 500.");
    }

    const { count: existing } = await supabase
      .from("project_units")
      .select("*", { count: "exact", head: true })
      .eq("project_id", project.id);

    // Generating is for an empty project. Doing it twice would either collide
    // on the unique index or silently double the list, and neither is what
    // anybody pressing this button means.
    if ((existing ?? 0) > 0) return fail("This project already has units. Add them one at a time instead.");

    const rows = Array.from({ length: count }, (_, i) => ({
      project_id: project.id,
      code: `${prefix} ${i + 1}`,
      state: "available",
      position: i,
    }));

    const { error } = await supabase.from("project_units").insert(rows);
    if (error) return fail(error.message);
    return redirect(`${back}&units_ok=${encodeURIComponent(`Created ${count} units, all available.`)}`);
  }

  // ---- add a single unit ----
  if (action === "add") {
    const code = get("code");
    if (!code) return fail("A unit needs a name.");

    const { data: last } = await supabase
      .from("project_units").select("position")
      .eq("project_id", project.id).order("position", { ascending: false }).limit(1).maybeSingle();

    // The building is verified against THIS project, so a stray id can't file a
    // unit under someone else's block.
    const buildingId = get("building_id");
    if (buildingId) {
      const { data: b } = await supabase
        .from("project_buildings").select("id").eq("id", buildingId).eq("project_id", project.id).maybeSingle();
      if (!b) return fail("That building doesn't belong to this project.");
    }

    const { error } = await supabase.from("project_units").insert({
      project_id: project.id,
      building_id: buildingId || null,
      code,
      state: "available",
      position: (last?.position ?? -1) + 1,
    });
    // 23505 is the unique index on (project_id, lower(code)) — say what it
    // means rather than showing a Postgres error to someone naming a villa.
    if (error) return fail(error.code === "23505" ? `There is already a unit called "${code}" there.` : error.message);
    return redirect(back);
  }

  const id = get("id");
  if (!id) return json({ ok: false, error: "id_required" }, 422);

  if (action === "state") {
    const state = get("state");
    if (!isValidUnitState(state)) return fail("Unknown state.");
    const { error } = await supabase
      .from("project_units")
      .update({ state, updated_at: new Date().toISOString() })
      .eq("id", id).eq("project_id", project.id);
    if (error) return fail(error.message);
    return redirect(back);
  }

  if (action === "price") {
    const raw = get("price").replace(/[^\d.]/g, "");
    const price = raw === "" ? null : Number(raw);
    if (price !== null && (!Number.isFinite(price) || price < 0)) return fail("Price must be a number.");
    const { error } = await supabase
      .from("project_units")
      .update({ price, updated_at: new Date().toISOString() })
      .eq("id", id).eq("project_id", project.id);
    if (error) return fail(error.message);
    return redirect(back);
  }

  if (action === "building") {
    const buildingId = get("building_id");
    // Verified against THIS project, so a stray id can't move a unit into
    // another project's building.
    if (buildingId) {
      const { data: b } = await supabase
        .from("project_buildings").select("id").eq("id", buildingId).eq("project_id", project.id).maybeSingle();
      if (!b) return fail("That building doesn't belong to this project.");
    }
    const { error } = await supabase
      .from("project_units")
      .update({ building_id: buildingId || null, updated_at: new Date().toISOString() })
      .eq("id", id).eq("project_id", project.id);
    if (error) return fail(error.message);
    return redirect(back);
  }

  if (action === "buyer") {
    const inquiryId = get("inquiry_id");
    const { error } = await supabase
      .from("project_units")
      .update({ inquiry_id: inquiryId || null, updated_at: new Date().toISOString() })
      .eq("id", id).eq("project_id", project.id);
    if (error) return fail(error.message);
    return redirect(back);
  }

  if (action === "remove") {
    const { error } = await supabase
      .from("project_units").delete().eq("id", id).eq("project_id", project.id);
    if (error) return fail(error.message);
    return redirect(back);
  }

  return json({ ok: false, error: "unknown_action" }, 400);
};
