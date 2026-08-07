export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Partner management (staff: super_admin + content_editor).
 *   action=save    id?, name, logo_url, website_url, status, role_/summary_ per locale
 *   action=delete  id
 *   action=move    id, dir=up|down
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const actions = form.getAll("action").map(String);
  const action = actions.includes("delete") ? "delete" : actions.includes("move") ? "move" : "save";
  const get = (k: string) => form.get(k)?.toString() ?? "";
  const supabase = supabaseServer(cookies, request);
  const back = "/admin/team?view=partners";

  if (action === "delete") {
    const id = get("id");
    if (!id) return json({ ok: false, error: "invalid" }, 422);
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);
    return redirect(`${back}&removed=1`);
  }

  if (action === "move") {
    const id = get("id");
    const dir = get("dir");
    const { data: all } = await supabase.from("partners").select("id, sort_order").order("sort_order");
    const list = all ?? [];
    const idx = list.findIndex((p) => p.id === id);
    const swapWith = dir === "up" ? idx - 1 : idx + 1;
    if (idx === -1 || swapWith < 0 || swapWith >= list.length) return redirect(back);
    [list[idx], list[swapWith]] = [list[swapWith], list[idx]];
    for (let i = 0; i < list.length; i++) {
      await supabase.from("partners").update({ sort_order: i }).eq("id", list[i].id);
    }
    return redirect(back);
  }

  // save
  const id = get("id");
  const name = get("name").trim();
  if (!name) return redirect(`${back}&error=name_required`);

  const status = ["draft", "published", "archived"].includes(get("status")) ? get("status") : "published";
  const translations: Record<string, { role: string; summary: string }> = {};
  for (const loc of ["en", "es", "ca"]) {
    translations[loc] = { role: get(`role_${loc}`).trim(), summary: get(`summary_${loc}`).trim() };
  }

  let website = get("website_url").trim();
  if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`;

  const payload: Record<string, unknown> = {
    name,
    logo_url: get("logo_url").trim() || null,
    website_url: website || null,
    status,
    translations,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("partners").update(payload).eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);
    return redirect(`${back}&saved=1`);
  }

  const { count } = await supabase.from("partners").select("*", { count: "exact", head: true });
  payload.sort_order = count ?? 0;
  const { error } = await supabase.from("partners").insert(payload);
  if (error) return json({ ok: false, error: error.message }, 403);
  return redirect(`${back}&saved=1`);
};
