/**
 * What the visitor agreed to, per purpose.
 *
 * Andorra's regulator (the APDA) says consent for different processing
 * activities must not be bundled and that distinct operations need separate
 * consent. So there are two independent answers here — measuring how the site
 * is used, and measuring how our advertising performs — plus the essential
 * cookies, which are not a question because nothing works without them.
 *
 * ── The key does not change ─────────────────────────────────────────────
 * It stays `cookie_consent_v2` on purpose. The last change WIDENED the
 * question — the banner had asked only about advertising and the site had
 * started doing analytics too — so nobody's stored answer covered the new
 * question and everyone had to be asked again. This change does not widen
 * anything. Someone who pressed Accept on the bundled banner agreed to
 * analytics AND advertising, because the wording named both; splitting that
 * into two checkboxes does not make their answer mean something different. So
 * their answer is migrated, faithfully, and they are not pestered a third time
 * in a fortnight. Re-asking has a cost, and spending it when nothing has
 * actually changed teaches people to click whatever makes the box go away.
 */

export const CONSENT_KEY = "cookie_consent_v2";

/** The purposes a visitor can decide on. Essential is not here: it is not a choice. */
export const CONSENT_CATEGORIES = ["analytics", "marketing"] as const;
export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  /**
   * When they decided. Null for answers carried over from the earlier yes/no
   * banner, where no timestamp was kept — an honest null rather than a
   * plausible-looking date we would be inventing.
   */
  at: string | null;
};

export const NOTHING_CHOSEN: ConsentState = { analytics: false, marketing: false, at: null };
export const ALL_GRANTED = (at: string): ConsentState => ({ analytics: true, marketing: true, at });

/**
 * Read the stored answer. `null` means "has not answered" — which is NOT the
 * same as having refused, and is the difference between showing the banner and
 * not showing it.
 *
 * Anything unrecognised also returns null: if we cannot tell what someone
 * agreed to, the only safe reading is that they have not agreed, and asking
 * again is cheaper than assuming.
 */
export function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;

  // Carried over from the bundled banner: one word covering both purposes.
  if (raw === "accepted") return { analytics: true, marketing: true, at: null };
  if (raw === "rejected") return { analytics: false, marketing: false, at: null };

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

  const o = parsed as Record<string, unknown>;
  if (typeof o.analytics !== "boolean" || typeof o.marketing !== "boolean") return null;

  return {
    analytics: o.analytics,
    marketing: o.marketing,
    at: typeof o.at === "string" && o.at ? o.at : null,
  };
}

export function serializeConsent(state: ConsentState): string {
  return JSON.stringify({
    analytics: state.analytics,
    marketing: state.marketing,
    at: state.at,
  });
}

/** Has this visitor answered at all? Drives whether the banner appears. */
export const hasAnswered = (raw: string | null | undefined): boolean => parseConsent(raw) !== null;

/** What a tag should ask before doing anything. Unanswered reads as "no". */
export function allows(raw: string | null | undefined, category: ConsentCategory): boolean {
  const state = parseConsent(raw);
  return state ? state[category] : false;
}

/**
 * The cases the inline copy of this logic on the public pages must agree with.
 *
 * The tags run from a script in the document head, before any bundled module
 * has loaded, so they cannot import this file — they carry their own small
 * reader. Two implementations of one rule is exactly how the reorder bug
 * happened, so this table is shared: the unit test checks the code below
 * against it, and a browser test feeds the same strings through the real inline
 * reader on the real built page and checks it agrees. Drift fails a test rather
 * than silently mis-reading somebody's consent.
 */
export const CONSENT_FIXTURES: { raw: string | null; expect: ConsentState | null; why: string }[] = [
  { raw: null, expect: null, why: "never answered" },
  { raw: "", expect: null, why: "empty value" },
  { raw: "accepted", expect: { analytics: true, marketing: true, at: null }, why: "migrated from the bundled Accept" },
  { raw: "rejected", expect: { analytics: false, marketing: false, at: null }, why: "migrated from the bundled Reject" },
  { raw: '{"analytics":true,"marketing":false,"at":"2026-09-03T10:00:00.000Z"}',
    expect: { analytics: true, marketing: false, at: "2026-09-03T10:00:00.000Z" }, why: "analytics only" },
  { raw: '{"analytics":false,"marketing":true,"at":"2026-09-03T10:00:00.000Z"}',
    expect: { analytics: false, marketing: true, at: "2026-09-03T10:00:00.000Z" }, why: "marketing only" },
  { raw: '{"analytics":false,"marketing":false,"at":"2026-09-03T10:00:00.000Z"}',
    expect: { analytics: false, marketing: false, at: "2026-09-03T10:00:00.000Z" }, why: "answered, refused both" },
  { raw: '{"analytics":true,"marketing":true}', expect: { analytics: true, marketing: true, at: null }, why: "no timestamp" },
  { raw: "not json", expect: null, why: "corrupted" },
  { raw: "[1,2,3]", expect: null, why: "wrong shape" },
  { raw: '{"analytics":"yes","marketing":true}', expect: null, why: "a non-boolean is not a decision" },
  { raw: '{"marketing":true}', expect: null, why: "half an answer is no answer" },
  { raw: "ACCEPTED", expect: null, why: "the legacy value is exact, not case-insensitive" },
];
