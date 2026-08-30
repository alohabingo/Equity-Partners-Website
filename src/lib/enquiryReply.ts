import { supabaseAdmin } from "./supabase";
import { sendMessage } from "./zohoAccount";
import { documentBlockHtml, LINK_EXPIRY_DAYS } from "./projectDocuments";
import { stageLabel } from "./pipeline";

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
  | { ok: true; stageAdvanced: boolean; converted: boolean; documentsSent: number }
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
  /** Documents to include: ids of rows belonging to this enquiry's project. */
  documentIds?: string[];
  /** Where /d/<token> lives, so the links in the email are absolute. */
  origin?: string;
}): Promise<ReplyResult> {
  const { inquiryId, body, actorId, actorName, documentIds = [], origin = "" } = opts;

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

  // ---- documents ----
  //
  // A link has to EXIST before the email can be written, because its URL is the
  // content. That inverts this module's rule of writing nothing until Zoho has
  // accepted, so the rule is kept the other way round: if the send fails, the
  // links are deleted again, and a link nobody ever received leaves no trace.
  const expiresAt = new Date(Date.now() + LINK_EXPIRY_DAYS * 24 * 3600 * 1000);
  const wanted = [...new Set(documentIds.filter(Boolean))];
  const minted: { linkId: string; documentId: string; title: string; url: string;
                  mime_type: string | null; file_size: number | null }[] = [];

  if (wanted.length > 0) {
    // Scoped to the project. An id from elsewhere must not be able to turn a
    // reply into a delivery route for another development's paperwork.
    const { data: docs } = await db
      .from("documents")
      .select("id, title, mime_type, file_size")
      .in("id", wanted)
      .eq("project_id", enquiry.project_id);

    for (const doc of docs ?? []) {
      const { data: link, error } = await db
        .from("document_links")
        .insert({
          document_id: doc.id,
          inquiry_id: inquiryId,
          label: `${enquiry.name ?? "Buyer"} · ${project.name}`,
          expires_at: expiresAt.toISOString(),
          max_views: null,
          created_by: actorId,
        })
        .select("id, token")
        .single();

      if (error || !link) {
        console.error("document link could not be created:", error?.message);
        continue;
      }

      minted.push({
        linkId: link.id,
        documentId: doc.id,
        title: doc.title,
        url: `${origin}/d/${link.token}`,
        mime_type: doc.mime_type,
        file_size: doc.file_size,
      });
    }

    // Every requested document must have produced a link, or nothing is sent.
    //
    // A partial send is the worst outcome available here: the buyer gets an
    // email promising documents with one of them quietly missing, it looks
    // deliberate, and nobody on this side knows it happened. Better to fail
    // visibly and let the person press send again.
    if ((docs ?? []).length === 0) {
      return { ok: false, error: "Those documents are no longer available — nothing was sent." };
    }
    if (minted.length !== (docs ?? []).length) {
      if (minted.length > 0) {
        await db.from("document_links").delete().in("id", minted.map((m) => m.linkId));
      }
      return { ok: false, error: "Could not prepare every document link — nothing was sent." };
    }
  }

  const html = bodyToHtml(text) + documentBlockHtml(minted, expiresAt);

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
    // The links were made a moment ago and reached nobody. Remove them rather
    // than leaving live URLs to this project's paperwork lying in the database.
    if (minted.length > 0) {
      await db.from("document_links").delete().in("id", minted.map((m) => m.linkId));
    }
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
  if (stageAdvanced) patch.stage = "info";
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
      // Read from the stage list, never typed out: a label written by hand here
      // is a second copy of the wording, and the copy is what goes stale.
      detail: { from: "new", to: "info", label: stageLabel("info"), via: "reply" },
    });
  }
  // One event per document rather than one listing them all: the history is read
  // as "what happened to this enquiry", and "Brochure sent" is a thing that
  // happened on its own, findable on its own.
  for (const m of minted) {
    events.push({
      inquiry_id: inquiryId,
      actor_id: actorId,
      kind: "document_sent",
      detail: { document_id: m.documentId, link_id: m.linkId, title: m.title },
    });
  }
  const { error: eventError } = await db.from("enquiry_events").insert(events);
  if (eventError) console.error("enquiry_events insert failed after reply:", eventError.message);

  return { ok: true, stageAdvanced, converted, documentsSent: minted.length };
}
