export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Team member management (staff: super_admin + content_editor).
 *   action=save    id?, name, photo_url, status, sort_order, role_/bio_ per locale
 *   action=delete  id
 *   action=move    id, dir=up|down
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const actions = form.getAll("action").map(String);
  const action = actions.includes("delete") ? "delete" : actions.includes("move") ? "move" : "save";
  const get = (k: string) => form.get(k)?.toString() ?? "";
  const supabase = supabaseServer(cookies, request);

  if (action === "delete") {
    const id = get("id");
    if (!id) return json({ ok: false, error: "invalid" }, 422);
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);
    return redirect("/admin/team?removed=1");
  }

  if (action === "reorder") {
    const ids = get("ids").split(",").map((s) => s.trim()).filter(Boolean);
    if (ids.length === 0) return json({ ok: false, error: "no_ids" }, 422);
    for (let i = 0; i < ids.length; i++) {
      const { error } = await supabase.from("team_members").update({ sort_order: i }).eq("id", ids[i]);
      if (error) return json({ ok: false, error: error.message }, 403);
    }
    return json({ ok: true });
  }

  if (action === "move") {
    const id = get("id");
    const dir = get("dir");
    const { data: all } = await supabase
      .from("team_members")
      .select("id, sort_order")
      .order("sort_order");
    const list = all ?? [];
    const idx = list.findIndex((m) => m.id === id);
    const swapWith = dir === "up" ? idx - 1 : idx + 1;
    if (idx === -1 || swapWith < 0 || swapWith >= list.length) return redirect("/admin/team");

    // Swap the two positions, then renumber cleanly.
    [list[idx], list[swapWith]] = [list[swapWith], list[idx]];
    for (let i = 0; i < list.length; i++) {
      await supabase.from("team_members").update({ sort_order: i }).eq("id", list[i].id);
    }
    return redirect("/admin/team");
  }

  // save
  const id = get("id");
  const name = get("name").trim();
  if (!name) return redirect("/admin/team?error=name_required");

  const status = ["draft", "published", "archived"].includes(get("status")) ? get("status") : "published";
  const translations: Record<string, { role: string; description: string }> = {};
  for (const loc of ["en", "es", "ca"]) {
    translations[loc] = {
      role: get(`role_${loc}`).trim(),
      description: get(`bio_${loc}`).trim(),
    };
  }

  // Accept a bare handle or a full URL for LinkedIn.
  let linkedin = get("linkedin_url").trim();
  if (linkedin && !/^https?:\/\//i.test(linkedin)) {
    linkedin = `https://www.linkedin.com/in/${linkedin.replace(/^\/+|^in\//gi, "")}`;
  }

  const payload: Record<string, unknown> = {
    name,
    photo_url: get("photo_url").trim() || null,
    linkedin_url: linkedin || null,
    status,
    translations,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("team_members").update(payload).eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);
    return redirect(`/admin/team?saved=1`);
  }

  // New member goes to the end of the list.
  const { count } = await supabase.from("team_members").select("*", { count: "exact", head: true });
  payload.sort_order = count ?? 0;
  const { error } = await supabase.from("team_members").insert(payload);
  if (error) return json({ ok: false, error: error.message }, 403);
  return redirect("/admin/team?saved=1");
};
