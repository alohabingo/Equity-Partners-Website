export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

/** CSV export of all subscribers. Super admin only (RLS returns zero rows otherwise). */
export const GET: APIRoute = async ({ request, cookies }) => {
  const supabase = supabaseServer(cookies, request);
  const { data: subs, error } = await supabase
    .from("subscribers")
    .select("email, name, locale, status, source, esp_synced_at, created_at, unsubscribed_at")
    .order("created_at", { ascending: false });

  if (error || !subs) return new Response("Not authorized", { status: 403 });

  const esc = (v: string | null) =>
    v == null ? "" : /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;

  const header = "email,name,locale,status,source,esp_synced_at,created_at,unsubscribed_at";
  const rows = subs.map((s) =>
    [s.email, s.name, s.locale, s.status, s.source, s.esp_synced_at, s.created_at, s.unsubscribed_at]
      .map((v) => esc(v as string | null))
      .join(",")
  );

  const today = new Date().toISOString().slice(0, 10);
  return new Response([header, ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${today}.csv"`,
    },
  });
};
