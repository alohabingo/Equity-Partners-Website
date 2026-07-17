export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const supabase = supabaseServer(cookies, request);
  await supabase.auth.signOut();
  return redirect("/admin/login");
};
