import { defineMiddleware } from "astro:middleware";
import { supabaseServer, isSupabaseConfigured } from "./lib/supabase";

/** Sections only super admins may open. UI-level guard — RLS in the
 *  database is the real enforcement even if this file had a bug. */
const SUPER_ONLY = [
  "/admin/leads",
  "/admin/subscribers",
  "/admin/vault",
  "/admin/users",
  "/api/admin/lead-status",
  "/api/admin/lead-reply",
  "/api/admin/zoho-sync",
  "/api/admin/subscriber-actions",
  "/api/admin/subscribers.csv",
  "/api/admin/vault",
  "/api/admin/users",
];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isAdminApi = pathname.startsWith("/api/admin");

  // Guard the admin area and admin APIs; everything else passes through.
  if ((!pathname.startsWith("/admin") && !isAdminApi) || pathname.startsWith("/admin/login")) {
    return next();
  }

  const deny = (status: number, error: string) =>
    isAdminApi
      ? new Response(JSON.stringify({ ok: false, error }), {
          status,
          headers: { "Content-Type": "application/json" },
        })
      : context.redirect(status === 403 ? "/admin?denied=1" : "/admin/login");

  if (!isSupabaseConfigured()) {
    return isAdminApi ? deny(500, "setup") : context.redirect("/admin/login?error=setup");
  }

  const supabase = supabaseServer(context.cookies, context.request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return deny(401, "unauthenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (!profile) return deny(401, "noprofile");

  if (
    profile.role !== "super_admin" &&
    SUPER_ONLY.some((p) => pathname.startsWith(p))
  ) {
    return deny(403, "forbidden");
  }

  context.locals.user = {
    id: user.id,
    email: user.email ?? "",
    fullName: profile.full_name,
    role: profile.role,
  };

  return next();
});
