export interface OpportunityMilestone {
  label: string;
  date: string;
  done: boolean;
}

export interface CapitalStackEntry {
  label: string;
  percentage: number;
  note?: string;
}

export interface UseOfFundsEntry {
  label: string;
  percentage: number;
}

export interface Opportunity {
  slug: string;
  name: string;
  tagline: string;
  status:
    | "Open for Investment"
    | "Closing Soon"
    | "Closed"
    | "Waitlist"
    | "Fully Subscribed";
  location: string;
  parish: string;
  sector: string;

  // Structure & return framing (returns kept abstract — actual figures shared on call)
  structure: "Debt" | "Debt + Equity" | "Equity";
  headlineReturn: string; // e.g. "Annual coupon" / "Coupon + equity upside" / "Equity profit share"

  // Concrete deal metrics
  totalProjectValue: string;
  equityRaise: string;
  minInvestment: string;
  maxInvestment: string;
  holdPeriod: string;

  // Raise tracking
  fundingProgress: number; // 0-100
  amountCommitted: string;
  fundingDeadline: string;
  riskProfile: "Core" | "Core-Plus" | "Value-Add" | "Opportunistic";

  // Asset specs
  units: string;
  sqm: string;
  floors: string;
  completionDate: string;

  // Media
  image: string;
  gallery: string[];

  // Narrative
  description: string;
  investmentThesis: string;
  highlights: string[];
  useOfFunds: UseOfFundsEntry[];
  capitalStack: CapitalStackEntry[];
  exitStrategy: string;
  keyRisks: string[];

  // Timeline
  milestones: OpportunityMilestone[];

  // Compliance
  planningStatus: string;
  regulatoryNote: string;
  dueDiligenceDocs: string[];
}

export const opportunities: Opportunity[] = [
  // ──────────────────────────────────────────────────────────
  //  1. Andorra la Vella Commercial Plaza — Debt — €2M
  // ──────────────────────────────────────────────────────────
  {
    slug: "andorra-la-vella-commercial-plaza",
    name: "Andorra la Vella Commercial Plaza",
    tagline:
      "Mixed-use commercial plaza in the capital's financial district, with predictable long-lease income from established tenants.",
    status: "Open for Investment",
    location: "Andorra la Vella, Andorra",
    parish: "Andorra la Vella",
    sector: "Commercial",

    structure: "Debt",
    headlineReturn: "Annual coupon",

    totalProjectValue: "€9M",
    equityRaise: "€2M",
    minInvestment: "€500k",
    maxInvestment: "€1M",
    holdPeriod: "24–36 months",

    fundingProgress: 65,
    amountCommitted: "€1.3M of €2M",
    fundingDeadline: "30 September 2026",
    riskProfile: "Core",

    units: "Mixed retail + 4 office floors",
    sqm: "2,800 m²",
    floors: "5 storeys",
    completionDate: "Completed 2018",

    image: "/Andorra-la-Vella.webp",
    gallery: [
      "/Andorra-la-Vella.webp",
      "/hero-andorra-R2PtlkD-.jpg",
      "/04c%20copy.jpg",
    ],

    description:
      "Andorra la Vella Commercial Plaza is a fully operational mixed-use commercial building in the heart of the capital's financial district. Long-lease tenants across retail at street level and four floors of professional office space generate predictable monthly rental income. The debt structure offers senior secured exposure to a stabilised, income-producing asset, with no development or lease-up risk.",
    investmentThesis:
      "Andorra la Vella's commercial core is a chronically under-supplied market. The capital's banking sector, professional services, and government functions all concentrate within a few hundred metres of this site, anchoring sustained demand for quality office and retail space. With leases already in place and the asset already producing, debt holders are insulated from development, lease-up and tenant risk that earlier-stage projects carry.",
    highlights: [
      "Fully operational and tenanted asset, with income from day one",
      "Capital secured against a prime commercial building in the capital's financial district",
      "Long-lease tenants across retail and office floors",
      "No development risk, no lease-up risk",
      "Shorter typical hold than alpine or hospitality projects",
    ],
    useOfFunds: [
      { label: "Loan to project SPV", percentage: 92 },
      { label: "Structuring & legal fees", percentage: 4 },
      { label: "Interest reserve account", percentage: 4 },
    ],
    capitalStack: [
      { label: "Investor debt (this raise)", percentage: 22 },
      { label: "Senior bank debt", percentage: 55, note: "Andbank — term sheet signed" },
      { label: "Sponsor equity", percentage: 18, note: "Equity Partners skin in the game" },
      { label: "Mezzanine", percentage: 5 },
    ],
    exitStrategy:
      "Capital is returned through scheduled refinancing of the underlying property within the hold window, or earlier if a sale event occurs. Debt holders receive their full principal plus accrued coupon on exit.",
    keyRisks: [
      "Tenant default could compress income coverage, partially mitigated by the interest reserve account",
      "Refinance risk if commercial real estate credit conditions tighten",
      "Currency movements for non-EUR investors",
    ],
    milestones: [
      { label: "Investor financing open", date: "Q2 2026", done: true },
      { label: "Financing closed & capital deployed", date: "Q4 2026", done: false },
      { label: "Project execution", date: "Q1 2027 onward", done: false },
      { label: "Project completion / stabilization", date: "Q3 2028", done: false },
      { label: "Investor exit & capital return", date: "Q1 2029", done: false },
    ],

    planningStatus: "Operational asset",
    regulatoryNote:
      "Investment is made via an Andorran SPV with Equity Partners as asset manager. All foreign investment approvals, KYC, AML, and source-of-funds checks are handled by Equity Partners prior to capital call.",
    dueDiligenceDocs: [
      "Confidential Information Memorandum",
      "Tenant lease summary",
      "Independent valuation report",
      "Legal due diligence pack",
      "Loan agreement & security pack",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  2. Ordino Lodge Resort — Debt + Equity — €8M
  // ──────────────────────────────────────────────────────────
  {
    slug: "ordino-lodge-resort",
    name: "Ordino Lodge Resort",
    tagline:
      "Boutique 30-key mountain lodge at the gateway to Andorra's only UNESCO biosphere reserve, blending contractual income with equity upside.",
    status: "Open for Investment",
    location: "Ordino, Andorra",
    parish: "Ordino",
    sector: "Hospitality",

    structure: "Debt + Equity",
    headlineReturn: "Annual coupon + Equity upside",

    totalProjectValue: "€26M",
    equityRaise: "€8M",
    minInvestment: "€2M",
    maxInvestment: "€4M",
    holdPeriod: "42–54 months",

    fundingProgress: 25,
    amountCommitted: "€2M of €8M",
    fundingDeadline: "31 December 2026",
    riskProfile: "Value-Add",

    units: "30 keys + restaurant + library bar",
    sqm: "4,200 m²",
    floors: "4 storeys",
    completionDate: "Q4 2028",

    image: "/Ordino%20AND%20IMG%20day%20snow.webp",
    gallery: [
      "/Ordino%20AND%20IMG%20day%20snow.webp",
      "/ordino%20heights.jpg",
      "/ordino%20heights%202.webp",
    ],

    description:
      "Ordino Lodge Resort is a 30-key boutique mountain lodge positioned at the gateway to the Ordino-Arcalís ski area and Andorra's only UNESCO biosphere reserve. The concept pairs traditional Pyrenean architecture with a refined hospitality programme — destination restaurant, library bar, treatment suite, and ski-in / ski-out access. The hold structure delivers contractual income during the construction phase and equity upside on exit through either institutional sale or refinance at stabilised operating yield.",
    investmentThesis:
      "Ordino is Andorra's quietest, most exclusive parish — preferred by international residents seeking discretion and natural surroundings over the busier southern resorts. Hospitality supply at the boutique end remains thin, and the UNESCO designation creates a natural development cap that protects existing operators from over-supply. The combination of construction-phase coupon income and a clear stabilised-yield exit makes this an attractive blended structure.",
    highlights: [
      "UNESCO biosphere gateway location with natural supply cap",
      "Planning permission in advanced stage",
      "Operator framework letter signed with established boutique brand",
      "Ski-in / ski-out access to Ordino-Arcalís",
      "Coupon distributions during construction phase",
      "Equity upside on either trade sale or refinance at stabilisation",
    ],
    useOfFunds: [
      { label: "Construction & fit-out", percentage: 64 },
      { label: "Land", percentage: 16 },
      { label: "FF&E and brand fees", percentage: 9 },
      { label: "Professional & design fees", percentage: 6 },
      { label: "Financing & contingency", percentage: 5 },
    ],
    capitalStack: [
      { label: "Senior bank debt", percentage: 58, note: "Indicative term sheet received" },
      { label: "Investor capital (this raise)", percentage: 30 },
      { label: "Sponsor co-investment", percentage: 10, note: "Equity Partners skin in the game" },
      { label: "Operator key money", percentage: 2 },
    ],
    exitStrategy:
      "Primary exit is a trade sale to an institutional hospitality investor in years 4–5, post 12-month stabilisation. A refinance at stabilised yield is held as an alternative path to return investor capital while retaining residual equity.",
    keyRisks: [
      "Construction delays could push stabilisation and exit windows",
      "ADR and occupancy ramp may be slower than modelled if global travel demand softens",
      "Operator dependency: a change in operator partner could affect brand positioning",
      "Liquidity: investor capital is locked for the full hold period",
    ],
    milestones: [
      { label: "Investor financing open", date: "Q2 2026", done: true },
      { label: "Financing closed & capital deployed", date: "Q1 2027", done: false },
      { label: "Project execution", date: "Q1 2027 – Q3 2028", done: false },
      { label: "Project completion / stabilization", date: "Q4 2028", done: false },
      { label: "Investor exit & capital return", date: "Q2 2030", done: false },
    ],

    planningStatus: "Planning application in advanced stage",
    regulatoryNote:
      "Investment is made via an Andorran SPV with Equity Partners as asset manager. All foreign investment approvals, KYC, AML, and source-of-funds checks are handled by Equity Partners prior to capital call.",
    dueDiligenceDocs: [
      "Confidential Information Memorandum",
      "Financial model & sensitivity analysis",
      "Operator framework letter",
      "Independent valuation report",
      "Legal due diligence pack",
      "Planning correspondence & site plans",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  3. Escaldes Penthouse Collection — Equity — €80M
  // ──────────────────────────────────────────────────────────
  {
    slug: "escaldes-penthouse-collection",
    name: "Escaldes Penthouse Collection",
    tagline:
      "Branded penthouse collection in central Escaldes-Engordany — pure equity play with full project upside on exit. Major institutional ticket size.",
    status: "Waitlist",
    location: "Escaldes-Engordany, Andorra",
    parish: "Escaldes-Engordany",
    sector: "Luxury Residential",

    structure: "Equity",
    headlineReturn: "Equity profit share",

    totalProjectValue: "€140M",
    equityRaise: "€80M",
    minInvestment: "€20M",
    maxInvestment: "€40M",
    holdPeriod: "36–48 months",

    fundingProgress: 28,
    amountCommitted: "€22M of €80M",
    fundingDeadline: "31 March 2027",
    riskProfile: "Opportunistic",

    units: "24 penthouses + 6 sky-villas",
    sqm: "12,800 m²",
    floors: "14 storeys (two towers)",
    completionDate: "Q4 2029",

    image: "/AND%20IMG%20night%20snow%20lights.jpeg",
    gallery: [
      "/AND%20IMG%20night%20snow%20lights.jpeg",
      "/hero-andorra-R2PtlkD-.jpg",
      "/04c%20copy.jpg",
    ],

    description:
      "Escaldes Penthouse Collection is a landmark luxury residential development in central Escaldes-Engordany. The project comprises 24 penthouses and 6 sky-villas across two connected towers, each unit benefiting from full-height glazing, private terraces, and views over the river to the Pyrenees. Building amenities include a concierge service, private gym, indoor pool, treatment rooms, and a residents' lounge. The pure equity structure gives investors uncapped upside on project profits at exit.",
    investmentThesis:
      "The high end of the Andorran residential market — €15k+ per square metre prime — has structurally limited supply and growing international demand. Active-residency permits and the country's tax framework continue to attract ultra-HNW relocations from across Europe. A landmark branded scheme at this scale and quality has no comparable competitor in the current pipeline. The pure equity structure is designed for institutional and family-office investors who want concentrated exposure to the top of the market.",
    highlights: [
      "Landmark scale and positioning with no comparable competitor in the pipeline",
      "Central Escaldes-Engordany — Andorra's prime residential district",
      "24 penthouses + 6 sky-villas with full amenity programme",
      "Pure equity participation — uncapped upside on project profits",
      "Targeted at ultra-HNW relocations driven by tax and active-residency framework",
      "Branded service offering supports long-term resale and rental values",
    ],
    useOfFunds: [
      { label: "Construction & fit-out", percentage: 58 },
      { label: "Land & assembly", percentage: 22 },
      { label: "Professional & design fees", percentage: 7 },
      { label: "Branding, marketing & sales", percentage: 7 },
      { label: "Financing & contingency", percentage: 6 },
    ],
    capitalStack: [
      { label: "Senior bank debt", percentage: 38, note: "Term sheet under negotiation" },
      { label: "Investor equity (this raise)", percentage: 50 },
      { label: "Sponsor co-investment", percentage: 8, note: "Equity Partners skin in the game" },
      { label: "Strategic land partner", percentage: 4 },
    ],
    exitStrategy:
      "Primary exit is individual unit sales during the final 18 months of construction and the 24 months following completion. A bulk sale of remaining inventory to a family office or institutional buyer is retained as a fallback. Sponsor distributes profits to equity holders pro-rata after senior debt repayment.",
    keyRisks: [
      "Longer hold and higher absolute exposure than the other structures",
      "Concentration risk on the very top end of the residential market",
      "Construction risk on a complex two-tower scheme",
      "Senior debt syndication may take longer than modelled",
      "Liquidity: equity is locked through the full development and sell-down period",
    ],
    milestones: [
      { label: "Investor financing open", date: "Q1 2027 (expected)", done: false },
      { label: "Financing closed & capital deployed", date: "Q3 2027", done: false },
      { label: "Project execution", date: "Q3 2027 – Q4 2029", done: false },
      { label: "Project completion / stabilization", date: "Q4 2029 – Q4 2031", done: false },
      { label: "Investor exit & capital return", date: "Q2 2032", done: false },
    ],

    planningStatus: "Planning submission in preparation",
    regulatoryNote:
      "Investment is made via an Andorran SPV with Equity Partners as asset manager. Given the ticket sizes, all investors are processed under the professional / qualified investor framework, with full KYC, AML, and source-of-funds checks handled by Equity Partners prior to capital call.",
    dueDiligenceDocs: [
      "Confidential Information Memorandum",
      "Financial model & sensitivity analysis",
      "Architectural concept pack",
      "Independent valuation report",
      "Legal due diligence pack",
      "Planning correspondence & site plans",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  4. Canillo Wellness Retreat — Debt + Equity — €15M — CLOSED at 100%
  // ──────────────────────────────────────────────────────────
  {
    slug: "canillo-wellness-retreat",
    name: "Canillo Wellness Retreat",
    tagline:
      "48-key boutique wellness hotel at the Soldeu–El Tarter gateway, with spa, restaurant and freehold real estate upside. Fully funded — closed example.",
    status: "Closed",
    location: "Canillo, Andorra",
    parish: "Canillo",
    sector: "Hospitality",

    structure: "Debt + Equity",
    headlineReturn: "Annual coupon + Equity upside",

    totalProjectValue: "€42M",
    equityRaise: "€15M",
    minInvestment: "€3.5M",
    maxInvestment: "€7.5M",
    holdPeriod: "48–60 months",

    fundingProgress: 100,
    amountCommitted: "€15M of €15M (fully funded)",
    fundingDeadline: "Closed",
    riskProfile: "Value-Add",

    units: "48 keys + spa + restaurant",
    sqm: "5,800 m²",
    floors: "6 storeys",
    completionDate: "Q3 2027",

    image: "/Andorra%20Canillo.jpg",
    gallery: [
      "/Andorra%20Canillo.jpg",
      "/funicamp%20ski.jpg",
      "/04c%20copy.jpg",
    ],

    description:
      "Canillo Wellness Retreat is a 48-key branded boutique hotel positioned at the gateway to the Soldeu–El Tarter ski area. The asset blends a destination spa, signature restaurant, and freehold real estate, structured to capture both operating cash flow and capital appreciation on exit. This opportunity is now fully funded and shown here as a closed example — the cohort of investors who participated are now in the construction phase of the hold.",
    investmentThesis:
      "Canillo's positioning at the entry to the largest Andorran ski domain creates structural demand for hospitality keys at the boutique end. The wellness positioning addresses a gap in the local market — sophisticated international travellers seeking a refined alternative to the larger commercial hotels. Supply at this segment is naturally constrained, and the asset benefits from both the development upside and stabilised operating yield post-opening.",
    highlights: [
      "Fully funded — closed example showing how our raises complete",
      "Branded operator agreement signed",
      "Walking distance to Soldeu–El Tarter ski lift",
      "Spa and signature restaurant anchor the wellness positioning",
      "Coupon distributions during construction and stabilisation phases",
      "Equity upside captured at stabilisation",
    ],
    useOfFunds: [
      { label: "Construction & fit-out", percentage: 62 },
      { label: "Land", percentage: 14 },
      { label: "FF&E and brand fees", percentage: 11 },
      { label: "Professional & design fees", percentage: 7 },
      { label: "Financing & contingency", percentage: 6 },
    ],
    capitalStack: [
      { label: "Senior bank debt", percentage: 60, note: "Andbank — closed" },
      { label: "Investor capital", percentage: 28, note: "Fully subscribed" },
      { label: "Sponsor co-investment", percentage: 10, note: "Equity Partners skin in the game" },
      { label: "Operator key money", percentage: 2 },
    ],
    exitStrategy:
      "Primary exit is a trade sale to an institutional hospitality investor 12–18 months post-opening. Refinance at stabilised yield is the alternative path, returning investor capital while retaining residual equity for distribution.",
    keyRisks: [
      "Construction delays could extend the hold beyond target",
      "Operating ramp may underperform model if leisure travel weakens",
      "Operator concentration risk on a single brand partner",
      "Liquidity: investor capital is locked for the full hold period",
    ],
    milestones: [
      { label: "Investor financing open", date: "Q1 2025", done: true },
      { label: "Financing closed & capital deployed", date: "Q3 2025", done: true },
      { label: "Project execution", date: "Q1 2026 – Q3 2027", done: false },
      { label: "Project completion / stabilization", date: "Q4 2027", done: false },
      { label: "Investor exit & capital return", date: "Q2 2029", done: false },
    ],

    planningStatus: "Full planning permission granted",
    regulatoryNote:
      "This opportunity is shown as a closed example. New raises follow the same structure, with Equity Partners as asset manager, an Andorran SPV vehicle, and full KYC/AML and source-of-funds processing prior to capital call.",
    dueDiligenceDocs: [
      "Confidential Information Memorandum (issued at raise)",
      "Financial model & sensitivity analysis",
      "Operator agreement & brand pack",
      "Independent valuation report",
      "Legal due diligence pack",
      "Construction contract & programme",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  5. La Massana Alpine Residences — Debt + Equity — €4M
  // ──────────────────────────────────────────────────────────
  {
    slug: "la-massana-alpine-residences",
    name: "La Massana Alpine Residences",
    tagline:
      "Boutique 16-unit alpine residential scheme adjacent to the Vallnord–Pal Arinsal ski lift, structured for contractual income plus equity upside on exit.",
    status: "Open for Investment",
    location: "La Massana, Andorra",
    parish: "La Massana",
    sector: "Luxury Residential",

    structure: "Debt + Equity",
    headlineReturn: "Annual coupon + Equity upside",

    totalProjectValue: "€16M",
    equityRaise: "€4M",
    minInvestment: "€1M",
    maxInvestment: "€2M",
    holdPeriod: "30–36 months",

    fundingProgress: 60,
    amountCommitted: "€2.4M of €4M",
    fundingDeadline: "31 July 2026",
    riskProfile: "Core-Plus",

    units: "16 apartments",
    sqm: "3,450 m²",
    floors: "5 storeys",
    completionDate: "Q2 2028",

    image: "/01_stone%20copy.jpg",
    gallery: [
      "/01_stone%20copy.jpg",
      "/01_stone%20copy%202.jpg",
      "/AND%20IMG%20night%20snow%20lights.jpeg",
    ],

    description:
      "La Massana Alpine Residences is a boutique development of 16 high-specification apartments positioned within walking distance of the Pal Arinsal gondola. The design pairs traditional Andorran stone and timber façades with a contemporary interior programme — oversized glazing, double-aspect living spaces, and a shared wellness suite with spa, sauna and gym. Apartments range from two to four bedrooms and are designed to appeal to the growing segment of international residents relocating to Andorra on active residency permits.",
    investmentThesis:
      "La Massana has seen sustained growth in prime residential values as demand from international residents continues to outpace new supply. With only 4% of Andorran land buildable, ski-adjacent parcels at this scale rarely come to market. The land is already acquired at an attractive basis, planning permission is granted, and presales interest is strong — de-risking the project well ahead of construction start. Investors benefit from a contractual coupon through the build phase and share in upside on exit through unit sales.",
    highlights: [
      "Full planning permission granted",
      "Land secured at below-market basis",
      "Walking distance to Pal Arinsal gondola",
      "Strong pre-sales reservation pipeline",
      "Experienced local contractor under fixed-price build contract",
      "Quarterly coupon distributions during hold period",
    ],
    useOfFunds: [
      { label: "Construction & fit-out", percentage: 68 },
      { label: "Land", percentage: 18 },
      { label: "Professional & design fees", percentage: 6 },
      { label: "Financing & contingency", percentage: 5 },
      { label: "Marketing & sales", percentage: 3 },
    ],
    capitalStack: [
      { label: "Senior bank debt", percentage: 55, note: "Andbank — term sheet signed" },
      { label: "Investor equity (this raise)", percentage: 25 },
      { label: "Sponsor co-investment", percentage: 14, note: "Equity Partners skin in the game" },
      { label: "Mezzanine / deferred land", percentage: 6 },
    ],
    exitStrategy:
      "Primary exit is individual unit sales during the final 12 months of construction and the 6 months following completion. A bulk portfolio sale to a family office or institutional buyer is retained as an alternative exit if pre-sales momentum warrants.",
    keyRisks: [
      "Construction delays could extend the hold period beyond the target",
      "Residential price softening in Andorra could compress exit margins",
      "Currency movements for non-EUR investors",
      "Liquidity: investor equity is locked for the full hold period",
    ],
    milestones: [
      { label: "Investor financing open", date: "Q2 2026", done: true },
      { label: "Financing closed & capital deployed", date: "Q1 2027", done: false },
      { label: "Project execution", date: "Q1 2027 – Q1 2028", done: false },
      { label: "Project completion / stabilization", date: "Q2 2028", done: false },
      { label: "Investor exit & capital return", date: "Q4 2028", done: false },
    ],

    planningStatus: "Full planning permission granted",
    regulatoryNote:
      "Investment is made via an Andorran SPV with Equity Partners as asset manager. All foreign investment approvals, KYC, AML, and source-of-funds checks are handled by Equity Partners prior to capital call.",
    dueDiligenceDocs: [
      "Confidential Information Memorandum",
      "Financial model & sensitivity analysis",
      "Independent valuation report",
      "Legal due diligence pack",
      "Construction contract & programme",
      "Planning permission & site plans",
    ],
  },
];

export function getOpportunityBySlug(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}

export const opportunityStatusColour: Record<string, string> = {
  "Open for Investment": "#53b27f",
  "Closing Soon": "#d97447",
  "Closed": "#e47930",
  "Waitlist": "#eab308",
  "Fully Subscribed": "#8494a9",
};

export const riskProfileColour: Record<string, string> = {
  "Core": "#4a90d9",
  "Core-Plus": "#4a90d9",
  "Value-Add": "#4a90d9",
  "Opportunistic": "#4a90d9",
};
