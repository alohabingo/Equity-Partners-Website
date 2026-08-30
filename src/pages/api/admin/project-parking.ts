export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { PARKING_STATES, isParkingState, parseParkingPrice, parkingCodes } from "../../../lib/parking";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * A project's parking spaces: add in a batch, edit one, remove one.
 *
 * Adding is a batch because that is how a car park arrives — "eighteen spaces,
 * P1 to P18" is one fact, not eighteen. Editing is one at a time, because after
 * that first day every change is about a particular space.
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const get = (k: string) => form.get(k)?.toString().trim() ?? "";

  const slug = get("slug");
  const action = get("action");
  if (!slug) return json({ ok: false, error: "slug_required" }, 422);

  const supabase = supabaseServer(cookies, request);
  const back = `/admin/projects/${slug}?tab=settings`;
  // Its own parameter, not the page's shared `notice`: that one is rendered by
  // the Layout card, so every word parking said appeared under the wrong
  // heading — a message about spaces sitting inside a card about buildings.
  const say = (msg: string) => redirect(`${back}&parking_notice=${encodeURIComponent(msg)}`);

  const { data: project } = await supabase
    .from("projects").select("id").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");

  // ---- add a run of spaces ----
  if (action === "add") {
    const prefix = get("prefix") || "P";
    const count = Number(get("count"));
    if (!Number.isInteger(count) || count < 1 || count > 500) {
      return say("Number of spaces must be a whole number between 1 and 500.");
    }

    // Numbered on from whatever already exists, so adding a second batch does
    // not restart at P1 and collide with the first.
    const { data: existing } = await supabase
      .from("project_parking").select("code, position")
      .eq("project_id", project.id);

    const taken = new Set((existing ?? []).map((r) => r.code));
    const lastPos = Math.max(-1, ...(existing ?? []).map((r) => r.position ?? 0));
    const price = parseParkingPrice(get("price"));

    const rows = parkingCodes(prefix, count, taken).map((code, i) => ({
      project_id: project.id,
      code,
      price,
      position: lastPos + 1 + i,
    }));
    if (rows.length === 0) return say("Those spaces already exist.");

    const { error } = await supabase.from("project_parking").insert(rows);
    if (error) return say(error.message);
    return say(`Added ${rows.length} parking space${rows.length === 1 ? "" : "s"}.`);
  }

  // ---- clear the whole car park ----
  //
  // Before `id`, because this one is about all of them and has none. Guarded by
  // a typed confirmation from the form rather than by anything clever: removing
  // twenty spaces is a keystroke to do and an afternoon to undo, and any space
  // that was sold takes its buyer link with it.
  if (action === "remove_all") {
    const { data: rows } = await supabase
      .from("project_parking").select("id").eq("project_id", project.id);
    const n = rows?.length ?? 0;
    if (n === 0) return say("There is no parking to remove.");

    const { error } = await supabase
      .from("project_parking").delete().eq("project_id", project.id);
    if (error) return say(error.message);
    return say(`Removed ${n} parking space${n === 1 ? "" : "s"}.`);
  }

  const id = get("id");
  if (!id) return say("That space could not be found.");

  // ---- edit one ----
  if (action === "save") {
    const code = get("code");
    if (!code) return say("A space needs a name.");

    const state = isParkingState(get("state")) ? get("state") : "available";
    const patch: Record<string, unknown> = {
      code,
      state,
      price: parseParkingPrice(get("price")),
      notes: get("notes") || null,
    };

    // A space nobody has bought cannot be held by anybody. Clearing the buyer
    // with the state keeps the two from disagreeing — a "sold" name sitting on
    // an available space is the kind of thing that gets sold twice.
    if (state === "available") patch.inquiry_id = null;

    const { error } = await supabase
      .from("project_parking").update(patch)
      .eq("id", id).eq("project_id", project.id);
    if (error) {
      return say(error.code === "23505"
        ? `There is already a space called ${code}.`
        : error.message);
    }
    return say("Saved.");
  }

  // ---- sold, reserved, back on the market ----
  //
  // Its own action because it is made from the Units tab, not from Settings:
  // the list there is where a space is actually sold, and it must come back to
  // that list rather than bouncing the person to Settings.
  if (action === "state") {
    const state = get("state");
    if (!isParkingState(state)) return say("That is not a state a space can be in.");

    const patch: Record<string, unknown> = { state };
    // Same rule as a full save: nobody holds an available space.
    if (state === "available") patch.inquiry_id = null;

    const { error } = await supabase
      .from("project_parking").update(patch)
      .eq("id", id).eq("project_id", project.id);
    const to = `/admin/projects/${slug}?tab=units&show=parking`;
    if (error) return redirect(`${to}&units_error=${encodeURIComponent(error.message)}`);
    return redirect(to);
  }

  if (action === "remove") {
    const { error } = await supabase
      .from("project_parking").delete().eq("id", id).eq("project_id", project.id);
    if (error) return say(error.message);
    return say("Space removed.");
  }

  return say(`Unknown action. Expected one of: add, save, state, remove, remove_all, or a state of ${PARKING_STATES.map((s) => s.key).join(", ")}.`);
};
