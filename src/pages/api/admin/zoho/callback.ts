export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer, supabaseAdmin } from "../../../../lib/supabase";
import { exchangeCodeForTokens, fetchAccountInfo, DEFAULT_API_BASE } from "../../../../lib/zohoAccount";
import { redirectUriFor } from "./connect";

/**
 * Zoho sends the browser back here after the mailbox owner approves.
 *
 * Errors redirect back to the project's Settings tab with a readable reason
 * rather than dumping JSON at the user — they arrive here from a browser, not
 * from code.
 */
export const GET: APIRoute = async ({ url, cookies, request, redirect, locals }) => {
  const state = url.searchParams.get("state") ?? "";
  const code = url.searchParams.get("code") ?? "";
  const denied = url.searchParams.get("error");

  const cookieState = cookies.get("ep_zoho_state")?.value ?? "";
  cookies.delete("ep_zoho_state", { path: "/api/admin/zoho" });

  const slug = state.split(":")[1] ?? cookieState.split(":")[1] ?? "";
  const back = (msg: string) =>
    redirect(`/admin/projects/${slug || ""}?tab=settings&mailbox=${encodeURIComponent(msg)}`);

  if (denied) return back(`Zoho reported: ${denied}`);
  if (!state || state !== cookieState) {
    return back("The connection link expired or didn't match. Please try again.");
  }
  if (!code) return back("Zoho didn't return an authorisation code.");

  const supabase = supabaseServer(cookies, request);
  const { data: project } = await supabase
    .from("projects").select("id, slug, mailbox").eq("slug", slug).maybeSingle();
  if (!project) return back("That project no longer exists.");

  let refreshToken = "";
  try {
    ({ refreshToken } = await exchangeCodeForTokens(code, redirectUriFor(url.origin), DEFAULT_API_BASE));
  } catch (e) {
    return back(e instanceof Error ? e.message : "Could not complete the connection.");
  }

  // Written with the service-role client: mail_accounts has RLS on and no
  // policies, so the ordinary user client cannot touch it by design.
  const admin = supabaseAdmin();

  let accountId = "";
  let primaryEmail = "";
  try {
    ({ accountId, primaryEmail } = await fetchAccountInfo({
      refresh_token: refreshToken, api_base: DEFAULT_API_BASE,
    }));
  } catch (e) {
    return back(e instanceof Error ? e.message : "Connected, but Zoho wouldn't say which mailbox.");
  }

  // ---- guards against connecting the wrong inbox ----
  //
  // Zoho reuses whatever session the browser already has, so if you are signed in
  // as your admin account it connects THAT mailbox without ever asking. These
  // checks exist because that is the easy mistake to make, not a rare one.

  if (!primaryEmail) {
    return back("Zoho didn't say which mailbox that was. Please try again.");
  }

  // The fund inbox is not a project mailbox. Connecting it here would file
  // investor mail as buyer enquiries and send project replies from the fund.
  const fundInbox = (
    (import.meta as any).env?.ZOHO_FROM_ADDRESS ??
    (typeof process !== "undefined" ? process.env.ZOHO_FROM_ADDRESS : "") ??
    ""
  ).toLowerCase();
  if (fundInbox && primaryEmail === fundInbox) {
    return back(
      `That's the fund inbox (${primaryEmail}), not this project's mailbox. ` +
      `Sign out of Zoho — or use a private window — and sign in as the project's own address.`,
    );
  }

  // One mailbox belongs to one project. Sharing would mix two pipelines together.
  const { data: clash } = await admin
    .from("mail_accounts")
    .select("project_id, projects(name)")
    .ilike("email", primaryEmail)
    .neq("project_id", project.id)
    .maybeSingle();
  if (clash) {
    const other = (clash as any).projects?.name ?? "another project";
    return back(`${primaryEmail} is already connected to ${other}. Disconnect it there first.`);
  }

  // If the project already names a mailbox, the signed-in account must match it.
  if (project.mailbox && project.mailbox.toLowerCase() !== primaryEmail) {
    return back(
      `You signed in as ${primaryEmail}, but this project sends from ${project.mailbox}. ` +
      `Sign out of Zoho, or use a private window, and sign in as ${project.mailbox}.`,
    );
  }

  const { error } = await admin.from("mail_accounts").upsert(
    {
      project_id: project.id,
      email: primaryEmail || project.mailbox || "",
      zoho_account_id: accountId,
      refresh_token: refreshToken,
      api_base: DEFAULT_API_BASE,
      connected_by: locals.user?.id ?? null,
      connected_at: new Date().toISOString(),
      last_sync_error: null,
    },
    { onConflict: "project_id" },
  );
  if (error) return back(`Could not save the connection: ${error.message}`);

  await admin
    .from("projects")
    .update({
      mailbox: primaryEmail || project.mailbox,
      mailbox_connected_at: new Date().toISOString(),
      mailbox_last_error: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", project.id);

  return back(`Connected ${primaryEmail || project.mailbox}`);
};
