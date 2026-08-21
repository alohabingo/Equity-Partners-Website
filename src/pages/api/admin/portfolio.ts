export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const slugify = (v: string) =>
  v.toLowerCase().trim()
    .replace(/[àáâä]/g, "a").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i")
    .replace(/[òóôö]/g, "o").replace(/[ùúûü]/g, "u").replace(/[ñ]/g, "n").replace(/[ç]/g, "c")
    .replace(/[^a-z0-9\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

const splitLines = (raw: string) =>
  raw.split("\n").map((l) => l.trim()).filter(Boolean);

const pipe = (line: string) => line.split("|").map((s) => s.trim());

/** Upper bound on indexed image inputs (data.gallery.0 … .N). */
const MAX_IMAGE_SLOTS = 24;

/** Rebuild a typed value from its posted text according to the field's type marker. */
function parseField(type: string, raw: string): unknown {
  switch (type) {
    case "number": {
      const n = Number(raw);
      return Number.isFinite(n) ? n : 0;
    }
    case "lines":
      return splitLines(raw);
    case "milestones":
      return splitLines(raw).map((l) => {
        const [label, date, done] = pipe(l);
        return { label: label ?? "", date: date ?? "", done: (done ?? "").toLowerCase() === "done" };
      });
    case "capitalStack":
      return splitLines(raw).map((l) => {
        const [label, percentage, note] = pipe(l);
        return { label: label ?? "", percentage: Number(percentage) || 0, ...(note ? { note } : {}) };
      });
    case "useOfFunds":
      return splitLines(raw).map((l) => {
        const [label, percentage] = pipe(l);
        return { label: label ?? "", percentage: Number(percentage) || 0 };
      });
    case "partners":
      return splitLines(raw).map((l) => {
        const [name, logo] = pipe(l);
        return { name: name ?? "", logo: logo ?? "" };
      });
    case "json":
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    default:
      return raw;
  }
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const actions = form.getAll("action").map(String);
  const action = actions.includes("delete") ? "delete" : "save";
  const supabase = supabaseServer(cookies, request);
  const get = (k: string) => form.get(k)?.toString() ?? "";

  if (action === "delete") {
    const id = get("id");
    if (!id) return json({ ok: false }, 422);
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);
    return redirect("/admin/portfolio");
  }

  const id = get("id");
  const kind = ["project", "opportunity"].includes(get("kind")) ? get("kind") : "project";
  const locale = ["en", "es", "ca"].includes(get("locale")) ? get("locale") : "en";
  const status = ["draft", "published", "archived"].includes(get("status")) ? get("status") : "draft";
  const name = get("name").trim();
  const slug = slugify(get("slug") || name);
  const sortOrder = Number(get("sort_order")) || 0;

  if (!name || !slug) return json({ ok: false, error: "name_required" }, 422);

  // __meta maps each data field name to its type marker.
  let meta: Record<string, string> = {};
  try {
    meta = JSON.parse(get("__meta"));
  } catch {
    return json({ ok: false, error: "bad_meta" }, 422);
  }

  const data: Record<string, unknown> = {};
  for (const [key, type] of Object.entries(meta)) {
    // "imageSlots" fields post one input per image (data.gallery.0, .1, .2 …)
    // so the editor can show a thumbnail beside each one.
    if (type === "imageSlots") {
      const urls: string[] = [];
      for (let i = 0; i < MAX_IMAGE_SLOTS; i++) {
        const slot = form.get(`data.${key}.${i}`);
        if (slot === null) continue;
        const url = slot.toString().trim();
        if (url) urls.push(url);
      }
      data[key] = urls;
      continue;
    }
    const raw = form.get(`data.${key}`)?.toString() ?? "";
    const value = parseField(type, raw);
    if (value !== null) data[key] = value;
  }

  const payload = {
    kind,
    locale,
    status,
    name,
    slug,
    sort_order: sortOrder,
    data,
    updated_at: new Date().toISOString(),
  };

  let saved;
  if (id) {
    // A slug identifies the item, not the translation: every language of the
    // same item shares one. Renaming it on one language therefore renames all
    // of them in a single statement — otherwise the untouched languages keep
    // the old slug and the item splits into two entries in the portfolio list.
    const { data: current } = await supabase
      .from("portfolio_items").select("slug").eq("id", id).single();

    if (current && current.slug !== slug) {
      const { error: renameError } = await supabase
        .from("portfolio_items")
        .update({ slug, updated_at: new Date().toISOString() })
        .eq("kind", kind)
        .eq("slug", current.slug);
      if (renameError) {
        const dup = renameError.code === "23505";
        return json(
          { ok: false, error: dup ? "slug_exists_for_locale" : renameError.message },
          dup ? 409 : 403,
        );
      }
    }

    const { data: d, error } = await supabase
      .from("portfolio_items").update(payload).eq("id", id).select("id").single();
    if (error) return json({ ok: false, error: error.message }, 403);
    saved = d;
  } else {
    const { data: d, error } = await supabase
      .from("portfolio_items").insert(payload).select("id").single();
    if (error) {
      const dup = error.code === "23505";
      return json({ ok: false, error: dup ? "slug_exists_for_locale" : error.message }, dup ? 409 : 403);
    }
    saved = d;
  }

  return redirect(`/admin/portfolio/${saved.id}?saved=1`);
};
