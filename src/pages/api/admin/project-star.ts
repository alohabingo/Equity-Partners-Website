export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Star / un-star a project into the Command Centre.
 *
 * Starring creates the project's OPERATIONAL record (domain, mailbox, ingest key
 * come later in its Settings tab). There is deliberately no separate "add a
 * project" screen: the portfolio card is the switch, so the marketing content and
 * the operational record can't drift apart.
 *
 * Un-starring ARCHIVES rather than deletes. Enquiries reference the project, and
 * losing a project would orphan its buyer history — archiving hides it from the
 * sidebar while keeping everything intact, so re-starring restores it.
 *
 * Access: the projects table is RLS'd to super_admin, so a content editor's
 * request fails at the database rather than needing a second check here.
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  let body: { slug?: string; name?: string; starred?: boolean };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  const slug = (body.slug ?? "").trim();
  const name = (body.name ?? "").trim();
  const starred = body.starred === true;
  if (!slug) return json({ ok: false, error: "slug_required" }, 422);

  const supabase = supabaseServer(cookies, request);

  // Only real project slugs may be starred — never an opportunity, and never a
  // slug that doesn't exist. Stops the table filling with junk if this endpoint
  // is called directly.
  const { data: item } = await supabase
    .from("portfolio_items")
    .select("slug, name")
    .eq("slug", slug)
    .eq("kind", "project")
    .limit(1)
    .maybeSingle();

  if (!item) return json({ ok: false, error: "not_a_project" }, 404);

  if (!starred) {
    const { error } = await supabase
      .from("projects")
      .update({ status: "archived", updated_at: new Date().toISOString() })
      .eq("slug", slug);
    if (error) return json({ ok: false, error: error.message }, 403);
    return json({ ok: true, starred: false });
  }

  // Upsert on slug: re-starring an archived project reactivates the same row,
  // which brings its enquiry history back with it.
  const { error } = await supabase
    .from("projects")
    .upsert(
      {
        slug,
        name: name || item.name,
        status: "active",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );
  if (error) return json({ ok: false, error: error.message }, 403);

  return json({ ok: true, starred: true });
};
