export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

import { parseFloorCounts, planUnits, totalUnits, floorPlanError, floorLabel } from "../../../lib/buildingFloors";
import { planLayoutChange, layoutSavedMessage, type ExistingUnit } from "../../../lib/buildingLayout";
import { normaliseBuildingCode, suggestBuildingCode, buildingCodeError } from "../../../lib/buildingCode";

const KINDS = ["building", "project"];
const UNIT_TYPES = ["Apartment", "Villa"];

/** Which unique rule an insert or update tripped over, as a sentence. */
const clashMessage = (error: { code?: string; message: string }, name: string, code: string): string => {
  if (error.code !== "23505") return error.message;
  return error.message.includes("project_code")
    ? `Another building here already uses the code ${code}. Give this one a different letter.`
    : `There is already a building called "${name}".`;
};

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * A project's buildings: add, edit, remove.
 *
 * Adding a building can create its units in the same step, because that is how
 * anyone actually thinks about it — "block B, twelve apartments" is one fact,
 * not two. The units are still real rows afterwards, so the building's count
 * remains a count and never a stored number that can drift. Editing works the
 * same way from the other side: the new per-floor counts are compared with the
 * units that exist and the difference is created or removed.
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
    // The letter its units are named with. Suggested from the name when the
    // form was left alone, so a building never arrives without one.
    const code = normaliseBuildingCode(get("code")) || suggestBuildingCode(name);
    const codeError = buildingCodeError(code);
    if (codeError) return fail(codeError);
    const unitType = UNIT_TYPES.includes(get("unit_type")) ? get("unit_type") : "Apartment";

    /**
     * How many units, floor by floor.
     *
     * `floors` is how many the building has; `floor_counts` is a comma-separated
     * count for each one, in order from the ground up. One field rather than a
     * numbered input per floor, so reducing the number of floors cannot leave
     * inputs for floors that no longer exist sitting in the submission.
     */
    const counts = parseFloorCounts(get("floor_counts"), Number(get("floors")));
    const count = totalUnits(counts);
    const planError = floorPlanError(counts);
    if (planError) return fail(planError);

    const { data: last } = await supabase
      .from("project_buildings").select("position")
      .eq("project_id", project.id).order("position", { ascending: false }).limit(1).maybeSingle();

    const kind = KINDS.includes(get("kind")) ? get("kind") : "building";

    const { data: building, error } = await supabase
      .from("project_buildings")
      .insert({ project_id: project.id, name, kind, code, unit_type: unitType, position: (last?.position ?? -1) + 1 })
      .select("id, name")
      .single();

    if (error) return fail(clashMessage(error, name, code));

    if (count > 0) {
      // Numbering restarts in every building — A has A0.1 and B has B0.1 —
      // and the building's code in the name is what keeps them apart.
      const { data: lastUnit } = await supabase
        .from("project_units").select("position")
        .eq("project_id", project.id).order("position", { ascending: false }).limit(1).maybeSingle();
      const base = (lastUnit?.position ?? -1) + 1;

      const rows = planUnits(code, counts).map((u, i) => ({
        project_id: project.id,
        building_id: building.id,
        code: u.code,
        floor: u.floor,
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
      const floors = counts.filter((n) => n > 0).length;
      return done(
        `Added "${name}" with ${count} unit${count === 1 ? "" : "s"} across ` +
        `${floors} floor${floors === 1 ? "" : "s"}.`,
      );
    }

    return done(`Added "${name}".`);
  }

  const id = get("id");
  if (!id) return json({ ok: false, error: "id_required" }, 422);

  // ---- edit a building: its name, its type, and how many units each floor holds ----
  if (action === "layout") {
    const name = get("name");
    if (!name) return fail("A building needs a name.");
    const kind = KINDS.includes(get("kind")) ? get("kind") : "building";
    const code = normaliseBuildingCode(get("code")) || suggestBuildingCode(name);
    const codeError = buildingCodeError(code);
    if (codeError) return fail(codeError);
    const unitType = UNIT_TYPES.includes(get("unit_type")) ? get("unit_type") : "Apartment";

    const { data: building, error: findError } = await supabase
      .from("project_buildings").select("id, name")
      .eq("id", id).eq("project_id", project.id).maybeSingle();
    if (findError || !building) return fail("That building no longer exists.");

    // Changing the code renames nothing that exists — A0.1 stays A0.1 even if
    // the building becomes D. A unit's name is a home somebody may have
    // reserved; only new units take the new letter.
    const { error: nameError } = await supabase
      .from("project_buildings")
      .update({ name, kind, code, unit_type: unitType, updated_at: new Date().toISOString() })
      .eq("id", id).eq("project_id", project.id);
    if (nameError) return fail(clashMessage(nameError, name, code));

    const counts = parseFloorCounts(get("floor_counts"), Number(get("floors")));
    const planError = floorPlanError(counts);
    if (planError) return fail(planError);

    const { data: unitRows, error: unitsError } = await supabase
      .from("project_units").select("id, code, floor, state, inquiry_id")
      .eq("building_id", id).eq("project_id", project.id);
    if (unitsError) return fail(unitsError.message);
    const existing = (unitRows ?? []) as ExistingUnit[];

    // `floorless` is how many of the units recorded without a floor to keep;
    // absent when the form had no such row, in which case they are not touched.
    const floorlessRaw = get("floorless");
    const plan = planLayoutChange(
      existing, counts, code,
      floorlessRaw === "" ? undefined : Number(floorlessRaw),
    );
    if (!plan.ok) return fail(plan.error);

    if (plan.remove.length > 0) {
      // Spare units only — planLayoutChange never lists a reserved or sold one,
      // and the state filter here makes that true even if something changed in
      // the seconds since it looked.
      const { error: removeError, count: removed } = await supabase
        .from("project_units").delete({ count: "exact" })
        .in("id", plan.remove).eq("building_id", id).eq("state", "available").is("inquiry_id", null);
      if (removeError) return fail(removeError.message);
      if ((removed ?? 0) < plan.remove.length) {
        return fail(`Saved "${name}", but a unit was reserved or sold while you were editing, so its floor was left as it is.`);
      }
    }

    if (plan.add.length > 0) {
      const { data: lastUnit } = await supabase
        .from("project_units").select("position")
        .eq("project_id", project.id).order("position", { ascending: false }).limit(1).maybeSingle();
      const base = (lastUnit?.position ?? -1) + 1;
      const rows = plan.add.map((u, i) => ({
        project_id: project.id,
        building_id: id,
        code: u.code,
        floor: u.floor,
        state: "available",
        position: base + i,
      }));
      const { error: addError } = await supabase.from("project_units").insert(rows);
      if (addError) {
        return fail(addError.code === "23505"
          ? `Saved "${name}", but a unit name on ${floorLabel(plan.add[0].floor)} is already used inside it. Add its units from the Units tab.`
          : `Saved "${name}", but its new units could not be created: ${addError.message}`);
      }
    }

    return done(layoutSavedMessage(name, plan.add.length, plan.remove.length));
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
