/**
 * What the public site reports to, in one place.
 *
 * This file is the single source of truth for both halves: the tag that goes
 * into the pages, and the card in the portal that says what is installed. They
 * read the same constants, so the overview cannot drift from reality — which is
 * the whole point of having an overview.
 *
 * The ids live in code rather than in the database on purpose. The public pages
 * are BUILT — Astro turns them into finished HTML at deploy time, and a
 * visitor's browser never asks the database anything — so an id stored in a
 * settings field would not reach the live site until the next deploy anyway. It
 * would look like a switch and behave like a note. Editing this file and
 * deploying is the same amount of work, and it leaves the change in the history
 * where it can be seen.
 */

/** Meta (Facebook) pixel. The same id on all three of our sites, deliberately. */
export const META_PIXEL_ID = "958682424699882";

/** Google Analytics 4. Equity Partners only — the other two sites are not measured. */
export const GA_MEASUREMENT_ID = "G-HXBM08LD25";

export type ConnectorStatus = "live" | "planned" | "off";

/** How a tag behaves before consent — see the `consent` field on Connector. */
export type ConsentGate = "not_loaded" | "loaded_silent" | "not_sent" | "not_needed";

export const CONSENT_GATES: Record<ConsentGate, { label: string; detail: string }> = {
  not_loaded: {
    label: "Not loaded until accepted",
    detail: "The provider is not contacted at all. Someone who refuses never makes a single request to them.",
  },
  loaded_silent: {
    label: "Loaded but silent until accepted",
    detail: "The library is on the page with reporting switched off — nothing sent, no cookie set — until consent is given.",
  },
  not_sent: {
    label: "Nothing sent until accepted",
    detail: "Runs on our own server, so nothing reaches the provider unless the visitor agreed.",
  },
  not_needed: {
    label: "No consent needed",
    detail: "Sets nothing on the visitor's device and reports to nobody.",
  },
};

export type Connector = {
  key: string;
  /** Whose tool it is. The portal groups by this, so everything from one
   *  provider is read and reasoned about together — which is how they are
   *  actually turned on, configured and switched off. */
  group: "meta" | "google";
  name: string;
  /** What it is for, in one line a non-specialist can act on. */
  purpose: string;
  status: ConnectorStatus;
  /** The identifier, where there is one worth showing. */
  id?: string;
  /** Where it runs. */
  where: string;
  /**
   * What this tag does BEFORE the visitor has answered the banner.
   *
   * This used to be the word "required", which was true of everything and
   * therefore told nobody anything. The tags do not in fact behave the same
   * way: Meta's library is fetched and switched off, Google's is not fetched at
   * all. That difference is the whole answer to "does your site track me before
   * I agree?", so it belongs in the data rather than in a sentence somebody has
   * to remember to update.
   */
  consent: ConsentGate;
  note?: string;
};

export const CONNECTORS: Connector[] = [
  {
    key: "meta_pixel",
    group: "meta",
    name: "Meta pixel",
    purpose: "Measures which pages visitors see, so Meta ads can be targeted and their results counted.",
    status: "live",
    id: META_PIXEL_ID,
    where: "Every public page of equitypartners.fund",
    consent: "loaded_silent",
    note: "Also installed on Nanta Alta and Ordino Prestige, which are maintained separately.",
  },
  {
    key: "meta_capi",
    group: "meta",
    name: "Meta Conversions API",
    purpose: "Reports enquiries to Meta from the server, which ad blockers and Safari cannot stop.",
    status: "planned",
    where: "Would run inside the enquiry endpoint",
    consent: "not_sent",
    note: "Worth adding once the pixel itself is proven.",
  },
  {
    key: "ga4",
    group: "google",
    name: "Google Analytics",
    purpose: "Site traffic and behaviour reporting, independent of advertising.",
    status: "live",
    id: GA_MEASUREMENT_ID,
    where: "Every public page of equitypartners.fund",
    consent: "not_loaded",
    note: "Chosen over Google's alternative, which loads for everyone and sends anonymous pings even on refusal.",
  },
  {
    key: "google_ads",
    group: "google",
    name: "Google Ads",
    purpose: "Search advertising, and counting which clicks turn into enquiries.",
    status: "planned",
    where: "Would share the Analytics tag already on every page",
    consent: "not_loaded",
    note: "The consent signals it needs are already declared, and click ids are already captured on enquiries, so turning it on is a configuration line rather than a rebuild.",
  },
];

export const STATUS_LABEL: Record<ConnectorStatus, string> = {
  live: "Live",
  planned: "Planned",
  off: "Not connected",
};

/** How many are actually running, for a card's heading. */
export const liveConnectors = (list: Connector[] = CONNECTORS): Connector[] =>
  list.filter((c) => c.status === "live");

/**
 * A card each, in this order.
 *
 * Adding a provider later is a line here and a line in CONNECTORS — the page
 * draws whatever it finds, so nothing has to be laid out by hand again.
 */
export const CONNECTOR_GROUPS: { key: Connector["group"]; label: string; blurb: string }[] = [
  {
    key: "meta",
    label: "Meta",
    blurb: "Advertising on Facebook and Instagram, and the measurement behind it.",
  },
  {
    key: "google",
    label: "Google",
    blurb: "Traffic and behaviour reporting, separate from any advertising.",
  },
];

export const connectorsIn = (group: Connector["group"]): Connector[] =>
  CONNECTORS.filter((c) => c.group === group);
