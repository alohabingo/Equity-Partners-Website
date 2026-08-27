import { supabaseAdmin } from "./supabase";
import { sendMessage } from "./zohoAccount";

/**
 * Send a reply to a buyer from the project's own mailbox.
 *
 * Three things make this more than a wrapper around Zoho's send call:
 *
 * 1. The mailbox is SHARED. Everyone replies from sales@<project>, so the buyer
 *    always has one address to answer and threads stay in one place. The person
 *    who actually wrote it is carried in the display name and recorded in
 *    sent_by, which is the only place that attribution exists.
 * 2. Nothing is written down until Zoho has accepted the message. A stored reply
 *    that never left would show the team a conversation the buyer never saw, and
 *    would flip the enquiry out of "waiting on us" while the buyer is still
 *    waiting - the worst possible failure here.
 * 3. Replying triages an enquiry in and moves a brand-new one to Contacted,
 *    because those are what a reply MEANS. Asking someone to also remember two
 *    dropdowns is how a pipeline goes stale. Who sent it is recorded in
 *    sent_by - the mailbox is shared, so that record is the only attribution
 *    there is.
 */

export type ReplyResult =
  | { ok: true; stageAdvanced: boolean; converted: boolean }
  | { ok: false; error: string };

/** Turn what someone typed into a box into safe, readable HTML. */
export function bodyToHtml(text: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => `<p>${escape(para).replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}

/**
 * Subject for the reply. Mail clients thread largely on subject when there is no
 * In-Reply-To header - and Zoho's send API doesn't expose one - so reusing the
 * buyer's own subject with a single "Re:" is what keeps the exchange together in
 * their inbox. Stacking "Re: Re:" would break that, hence the test.
 */
export function replySubject(previous: string | null, projectName: string): string {
  const base = (previous ?? "").trim();
  if (!base) return `Re: Your enquiry about ${projectName}`;
  return /^re\s*:/i.test(base) ? base : `Re: ${base}`;
}

export async function sendEnquiryReply(opts: {
  inquiryId: string;
  body: string;
  actorId: string | null;
  actorName: string;
}): Promise<ReplyResult> {
  const { inquiryId, body, actorId, actorName } = opts;

  const text = body.trim();
  if (!text) return { ok: false, error: "Nothing to send - the reply was empty." };

  // Service role throughout: mail_accounts is RLS'd with no policies at all, so
  // it is reachable only this way. Who may be here at all was already settled by
  // the middleware, which restricts this route to super admins.
  const db = supabaseAdmin();

  const { data: enquiry } = await db
    .from("inquiries")
    .select("id, name, email, project_id, stage, triage")
    .eq("id", inquiryId)
    .maybeSingle();

  if (!enquiry) return { ok: false, error: "That enquiry no longer exists." };
  if (!enquiry.email) return { ok: false, error: "This enquiry has no email address to reply to." };
  if (!enquiry.project_id) return { ok: false, error: "This enquiry isn't attached to a project." };

  const { data: project } = await db
    .from("projects")
    .select("id, name, mailbox")
    .eq("id", enquiry.project_id)
    .maybeSingle();
  if (!project) return { ok: false, error: "This enquiry's project is missing." };

  const { data: account } = await db
    .from("mail_accounts")
    .select("*")
    .eq("project_id", enquiry.project_id)
    .maybeSingle();

  if (!account?.zoho_account_id) {
    return { ok: false, error: "This project's mailbox isn't connected yet - connect it in Settings." };
  }

  // Reply to the newest subject on the thread, falling back to the project name
  // for an enquiry that arrived through the form and has no mail behind it.
  const { data: last } = await db
    .from("inquiry_messages")
    .select("subject")
    .eq("inquiry_id", inquiryId)
    .order("sent_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const subject = replySubject(last?.subject ?? null, project.name);
  const html = bodyToHtml(text);

  try {
    await sendMessage(account as any, {
      to: enquiry.email,
      subject,
      html,
      // "Bing Voorham - Nanta Alta <sales@nantaalta.com>" - the buyer sees a
      // person and the project, and still replies to the shared address.
      fromName: `${actorName} · ${project.name}`,
    });
  } catch (e) {
    return { ok: false, error: `Zoho refused the message: ${e instanceof Error ? e.message : String(e)}` };
  }

  const now = new Date().toISOString();

  await db.from("inquiry_messages").insert({
    inquiry_id: inquiryId,
    direction: "outbound",
    subject,
    body_html: html,
    from_email: account.email,
    to_email: enquiry.email,
    sent_by: actorId,
    sent_at: now,
  });

  const stageAdvanced = enquiry.stage === "new";
  // Answering someone IS the judgement that they are real, so a reply triages
  // the enquiry in. Otherwise a live conversation could sit in the "nobody has
  // decided yet" queue, which would make that queue worth ignoring.
  const converted = enquiry.triage === "pending";

  const patch: Record<string, unknown> = { updated_at: now };
  if (stageAdvanced) patch.stage = "contacted";
  if (converted) {
    patch.triage = "converted";
    patch.triaged_at = now;
    patch.triaged_by = actorId;
  }
  await db.from("inquiries").update(patch).eq("id", inquiryId);

  const events: object[] = [
    { inquiry_id: inquiryId, actor_id: actorId, kind: "reply_sent", detail: { subject } },
  ];
  if (converted) events.push({ inquiry_id: inquiryId, actor_id: actorId, kind: "converted", detail: { via: "reply" } });
  if (stageAdvanced) {
    events.push({
      inquiry_id: inquiryId,
      actor_id: actorId,
      kind: "stage_changed",
      detail: { from: "new", to: "contacted", label: "Contacted", via: "reply" },
    });
  }
  const { error: eventError } = await db.from("enquiry_events").insert(events);
  if (eventError) console.error("enquiry_events insert failed after reply:", eventError.message);

  return { ok: true, stageAdvanced, converted };
}
