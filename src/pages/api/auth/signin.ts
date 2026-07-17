export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer, isSupabaseConfigured } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!isSupabaseConfigured()) return redirect("/admin/login?error=setup");

  const form = await request.formData();
  const email = form.get("email")?.toString().trim() ?? "";
  const password = form.get("password")?.toString() ?? "";

  if (!email || !password) return redirect("/admin/login?error=missing");

  const supabase = supabaseServer(cookies, request);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return redirect("/admin/login?error=credentials");
  return redirect("/admin");
};
