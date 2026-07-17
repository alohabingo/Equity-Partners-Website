export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer, supabaseAdmin } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Team management (super admin only — enforced in middleware AND here):
 *   action=create    email, password, full_name, role
 *   action=set_role  id, role
 *   action=remove    id
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const supabase = supabaseServer(cookies, request);

  // Defense in depth: verify the caller is a super admin even though
  // middleware already blocks this route for everyone else.
  const {
    data: { user: caller },
  } = await supabase.auth.getUser();
  if (!caller) return json({ ok: false, error: "unauthenticated" }, 401);
  const { data: callerProfile } = await supabase
    .from("profiles").select("role").eq("id", caller.id).single();
  if (callerProfile?.role !== "super_admin") return json({ ok: false, error: "forbidden" }, 403);

  const form = await request.formData();
  const action = form.get("action")?.toString() ?? "";
  const get = (k: string) => form.get(k)?.toString() ?? "";
  const admin = supabaseAdmin();

  if (action === "create") {
    const email = get("email").trim().toLowerCase();
    const password = get("password");
    const fullName = get("full_name").trim();
    const role = ["super_admin", "content_editor"].includes(get("role")) ? get("role") : "content_editor";

    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) || !fullName) {
      return redirect("/admin/users?error=invalid_fields");
    }
    if (password.length < 12) {
      return redirect("/admin/users?error=weak_password");
    }

    const { data: created, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (error || !created.user) {
      const exists = error?.message.toLowerCase().includes("already");
      return redirect(`/admin/users?error=${exists ? "email_exists" : "create_failed"}`);
    }

    // The handle_new_user trigger created the profile; set the chosen role.
    await admin.from("profiles").update({ role, full_name: fullName }).eq("id", created.user.id);
    return redirect("/admin/users?created=1");
  }

  if (action === "set_role") {
    const id = get("id");
    const role = ["super_admin", "content_editor"].includes(get("role")) ? get("role") : null;
    if (!id || !role) return json({ ok: false, error: "invalid" }, 422);
    if (id === caller.id) return redirect("/admin/users?error=own_role");

    const { error } = await admin.from("profiles").update({ role }).eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 500);
    return redirect("/admin/users?updated=1");
  }

  if (action === "remove") {
    const id = get("id");
    if (!id) return json({ ok: false, error: "invalid" }, 422);
    if (id === caller.id) return redirect("/admin/users?error=own_account");

    const { error } = await admin.auth.admin.deleteUser(id);
    if (error) return json({ ok: false, error: error.message }, 500);
    return redirect("/admin/users?removed=1");
  }

  return json({ ok: false, error: "unknown_action" }, 400);
};
