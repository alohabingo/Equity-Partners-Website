import { defineMiddleware } from "astro:middleware";
import { supabaseServer, isSupabaseConfigured } from "./lib/supabase";

/** Sections only super admins may open. UI-level guard — RLS in the
 *  database is the real enforcement even if this file had a bug. */
const SUPER_ONLY = [
  "/admin/projects",
  "/api/admin/project-star",
  "/api/admin/enquiry",
  "/api/admin/project-mail-sync",
  "/api/admin/zoho",
  "/api/admin/project-settings",
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

  // Projects starred into the Command Centre, for the sidebar. Fetched HERE and
  // not in AdminLayout: a layout is an imported component, so by the time it runs
  // the response has already begun, and the Supabase client's attempt to write
  // refreshed auth cookies throws ResponseSentError — which in turn destroyed the
  // session and signed the user out. Middleware runs before any of that.
  context.locals.sidebarProjects = [];
  if (profile.role === "super_admin" && pathname.startsWith("/admin")) {
    const { data } = await supabase
      .from("projects")
      .select("slug, name, nav_name")
      .eq("status", "active")
      .order("name");
    // Resolve the sidebar label here so the layout never has to think about it.
    // nav_name is cosmetic and optional; falling back to name means an empty
    // field is the same as no field, and nothing can end up nameless.
    context.locals.sidebarProjects = (data ?? []).map((p) => ({
      slug: p.slug,
      name: (p.nav_name ?? "").trim() || p.name,
    }));
  }

  return next();
});
