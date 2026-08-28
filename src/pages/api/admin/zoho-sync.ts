export const prerender = false;

import type { APIRoute } from "astro";
import { runZohoSync } from "../../../lib/zoho-sync";

/** Manual "Sync now" — the middleware already restricts /api/admin to a
 *  signed-in session, and page access to super admins; the scheduled
 *  Netlify function covers automatic syncing in production. */
export const POST: APIRoute = async ({ request, redirect }) => {
  const result = await runZohoSync();
  const back = new URL(request.headers.get("referer") ?? "/admin/investor-leads").pathname;
  const target = back.startsWith("/admin") ? back : "/admin/investor-leads";
  const q = result.ok ? `synced=${result.inserted}` : `syncerror=${encodeURIComponent(result.error ?? "unknown")}`;
  return redirect(`${target}?${q}`);
};
