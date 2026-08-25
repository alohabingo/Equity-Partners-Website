export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../../lib/supabase";
import { authorizeUrl, isOAuthConfigured, DEFAULT_API_BASE } from "../../../../lib/zohoAccount";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/** Where Zoho sends the browser back. Must match the console registration exactly. */
export const redirectUriFor = (origin: string) => `${origin}/api/admin/zoho/callback`;

/**
 * Start connecting a project's mailbox.
 *
 * The `state` parameter carries the project slug and a random nonce. The same
 * nonce goes into a short-lived httpOnly cookie, and the callback refuses to
 * proceed unless the two match — without that, someone could hand you a crafted
 * callback URL and attach THEIR mailbox to YOUR project.
 */
export const GET: APIRoute = async ({ url, cookies, request, redirect }) => {
  if (!isOAuthConfigured()) {
    return json(
      { ok: false, error: "zoho_oauth_not_configured",
        hint: "Set ZOHO_OAUTH_CLIENT_ID and ZOHO_OAUTH_CLIENT_SECRET, then restart." },
      500,
    );
  }

  const slug = url.searchParams.get("slug")?.trim() ?? "";
  if (!slug) return json({ ok: false, error: "slug_required" }, 422);

  const supabase = supabaseServer(cookies, request);
  const { data: project } = await supabase
    .from("projects").select("slug").eq("slug", slug).maybeSingle();
  if (!project) return json({ ok: false, error: "unknown_project" }, 404);

  const nonce = crypto.randomUUID();
  cookies.set("ep_zoho_state", `${nonce}:${slug}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: url.protocol === "https:",
    path: "/api/admin/zoho",
    maxAge: 600,
  });

  return redirect(authorizeUrl(redirectUriFor(url.origin), `${nonce}:${slug}`, DEFAULT_API_BASE));
};
