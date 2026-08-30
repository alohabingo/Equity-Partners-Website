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

export type ConnectorStatus = "live" | "planned" | "off";

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
  /** Whether it waits for the visitor's consent before doing anything. */
  consent: "required" | "not needed" | "—";
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
    consent: "required",
    note: "Also installed on Nanta Alta and Ordino Prestige, which are maintained separately.",
  },
  {
    key: "meta_capi",
    group: "meta",
    name: "Meta Conversions API",
    purpose: "Reports enquiries to Meta from the server, which ad blockers and Safari cannot stop.",
    status: "planned",
    where: "Would run inside the enquiry endpoint",
    consent: "required",
    note: "Worth adding once the pixel itself is proven.",
  },
  {
    key: "ga4",
    group: "google",
    name: "Google Analytics",
    purpose: "Site traffic and behaviour reporting, independent of advertising.",
    status: "off",
    where: "—",
    consent: "required",
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
