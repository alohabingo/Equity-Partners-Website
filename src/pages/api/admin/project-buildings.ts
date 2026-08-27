export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

/** What a layout entry is. Display only — it never changes the counting. */
const KINDS = ["building", "project"];

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * A project's buildings: add, rename, remove.
 *
 * Adding a building can create its units in the same step, because that is how
 * anyone actually thinks about it — "block B, twelve apartments" is one fact,
 * not two. The units are still real rows afterwards, so the building's count
 * remains a count and never a stored number that can drift.
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const get = (k: string) => form.get(k)?.toString().trim() ?? "";

  const slug = get("slug");
  const action = get("action");
  if (!slug) return json({ ok: false, error: "slug_required" }, 422);

  const supabase = supabaseServer(cookies, request);
  const back = `/admin/projects/${slug}?tab=settings`;
  const fail = (msg: string) => redirect(`${back}&notice=${encodeURIComponent(msg)}`);
  const done = (msg: string) => redirect(`${back}&notice=${encodeURIComponent(msg)}`);

  const { data: project } = await supabase
    .from("projects").select("id").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");

  // ---- add a building, optionally with its units ----
  if (action === "add") {
    const name = get("name");
    if (!name) return fail("A building needs a name.");

    const count = get("count") ? Number(get("count")) : 0;
    if (get("count") && (!Number.isInteger(count) || count < 0 || count > 500)) {
      return fail("Number of units must be a whole number up to 500.");
    }

    const { data: last } = await supabase
      .from("project_buildings").select("position")
      .eq("project_id", project.id).order("position", { ascending: false }).limit(1).maybeSingle();

    const kind = KINDS.includes(get("kind")) ? get("kind") : "building";

    const { data: building, error } = await supabase
      .from("project_buildings")
      .insert({ project_id: project.id, name, kind, position: (last?.position ?? -1) + 1 })
      .select("id, name")
      .single();

    if (error) {
      return fail(error.code === "23505"
        ? `There is already a building called "${name}".`
        : error.message);
    }

    if (count > 0) {
      const prefix = get("prefix") || "Unit";

      // Numbering restarts at 1 in every building — Block A has Apartment 1–12
      // and so does Block B, which is how developments are actually numbered.
      // The database allows it: unit names are unique within a building, not
      // across the project.
      const { data: lastUnit } = await supabase
        .from("project_units").select("position")
        .eq("project_id", project.id).order("position", { ascending: false }).limit(1).maybeSingle();
      const base = (lastUnit?.position ?? -1) + 1;

      const rows = Array.from({ length: count }, (_, i) => ({
        project_id: project.id,
        building_id: building.id,
        code: `${prefix} ${i + 1}`,
        state: "available",
        // Position orders the whole project's list, so it keeps counting up
        // even though the visible numbers start again.
        position: base + i,
      }));

      const { error: unitError } = await supabase.from("project_units").insert(rows);
      if (unitError) {
        // The building exists but its units clashed — say so plainly rather
        // than leaving someone to wonder why the count is zero.
        return fail(unitError.code === "23505"
          ? `Added "${name}", but those unit names are already used inside it. Add its units from the Units tab.`
          : `Added "${name}", but its units could not be created: ${unitError.message}`);
      }
      return done(`Added "${name}" with ${count} unit${count === 1 ? "" : "s"}.`);
    }

    return done(`Added "${name}".`);
  }

  const id = get("id");
  if (!id) return json({ ok: false, error: "id_required" }, 422);

  if (action === "kind") {
    const kind = get("kind");
    if (!KINDS.includes(kind)) return fail("Unknown kind.");
    const { error } = await supabase
      .from("project_buildings")
      .update({ kind, updated_at: new Date().toISOString() })
      .eq("id", id).eq("project_id", project.id);
    if (error) return fail(error.message);
    return redirect(back);
  }

  if (action === "rename") {
    const name = get("name");
    if (!name) return fail("A building needs a name.");
    const { error } = await supabase
      .from("project_buildings")
      .update({ name, updated_at: new Date().toISOString() })
      .eq("id", id).eq("project_id", project.id);
    if (error) {
      return fail(error.code === "23505" ? `There is already a building called "${name}".` : error.message);
    }
    return redirect(back);
  }

  // Removing a building AND everything in it. Separate from "remove" rather
  // than a flag on it: deleting twelve apartments is a different act from
  // deleting an empty entry, and the button that does it should say so.
  if (action === "remove_all") {
    const { error: unitError } = await supabase
      .from("project_units").delete().eq("building_id", id).eq("project_id", project.id);
    if (unitError) return fail(unitError.message);

    const { error } = await supabase
      .from("project_buildings").delete().eq("id", id).eq("project_id", project.id);
    if (error) return fail(error.message);
    return redirect(back);
  }

  if (action === "remove") {
    // Only when empty. The database would refuse anyway (units reference it),
    // but a clear sentence beats a foreign-key error — and deleting a building
    // full of villas is never what someone meant by "remove".
    const { count } = await supabase
      .from("project_units")
      .select("*", { count: "exact", head: true })
      .eq("building_id", id);

    if ((count ?? 0) > 0) {
      return fail(`That building still has ${count} unit${count === 1 ? "" : "s"}. Move or remove them first.`);
    }

    const { error } = await supabase
      .from("project_buildings").delete().eq("id", id).eq("project_id", project.id);
    if (error) return fail(error.message);
    return redirect(back);
  }

  return json({ ok: false, error: "unknown_action" }, 400);
};
