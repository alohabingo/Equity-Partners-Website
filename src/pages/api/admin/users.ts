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
export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
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

  // ---- invite, rather than issue a password ----
  //
  // Nobody types a password for anybody else here. An invited colleague gets an
  // email, follows it once, and chooses their own — so the password never
  // exists anywhere it can be forwarded, pasted into a chat, or left in a sent
  // folder. That was the real weakness, not the number of characters in it.
  if (action === "create") {
    const email = get("email").trim().toLowerCase();
    const fullName = get("full_name").trim();
    const role = ["super_admin", "content_editor"].includes(get("role")) ? get("role") : "content_editor";

    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) || !fullName) {
      return redirect("/admin/users?error=invalid_fields");
    }

    const { data: invited, error } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: fullName },
      redirectTo: `${url.origin}/admin/set-password`,
    });
    if (error || !invited.user) {
      const msg = (error?.message ?? "").toLowerCase();
      if (msg.includes("already")) return redirect("/admin/users?error=email_exists");
      // Email is the whole mechanism now, so a delivery failure has to say so
      // rather than hide behind "could not create the user".
      if (msg.includes("smtp") || msg.includes("mail") || msg.includes("rate")) {
        return redirect("/admin/users?error=email_failed");
      }
      return redirect("/admin/users?error=create_failed");
    }

    // The handle_new_user trigger created the profile; set the chosen role.
    await admin.from("profiles").update({ role, full_name: fullName }).eq("id", invited.user.id);
    return redirect("/admin/users?invited=1");
  }

  // ---- send it again ----
  //
  // Invitation links expire after about a day, which is exactly long enough for
  // someone to read the email on a Friday and act on it on Monday.
  if (action === "resend") {
    const email = get("email").trim().toLowerCase();
    if (!email) return redirect("/admin/users?error=invalid_fields");

    const { error } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${url.origin}/admin/set-password`,
    });
    if (error) return redirect("/admin/users?error=email_failed");
    return redirect("/admin/users?invited=1");
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
