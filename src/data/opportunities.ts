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
  status: "Open for Investment" | "Closing Soon" | "Waitlist" | "Fully Subscribed";
  location: string;
  parish: string;
  sector: string;

  // Headline deal metrics
  totalProjectValue: string;
  equityRaise: string;
  minInvestment: string;
  maxInvestment: string;
  fixedReturn: string;
  profitShare: string;
  targetIRR: string;
  equityMultiple: string;
  cashYield: string;
  holdPeriod: string;
  returnStructure: string;

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
  {
    slug: "la-massana-alpine-residences",
    name: "La Massana Alpine Residences",
    tagline:
      "Boutique 16-unit alpine residential scheme adjacent to the Vallnord–Pal Arinsal ski lift — structured for fixed income plus equity upside.",
    status: "Open for Investment",
    location: "La Massana, Andorra",
    parish: "La Massana",
    sector: "Luxury Residential",

    totalProjectValue: "€32M",
    equityRaise: "€8.5M",
    minInvestment: "€150,000",
    maxInvestment: "€2,000,000",
    fixedReturn: "12%",
    profitShare: "20%",
    targetIRR: "18–22%",
    equityMultiple: "1.6–1.8x",
    cashYield: "12% p.a. during construction",
    holdPeriod: "30–36 months",
    returnStructure: "Fixed 12% p.a. coupon paid quarterly + 20% of project profit on exit",

    fundingProgress: 62,
    amountCommitted: "€5.3M of €8.5M",
    fundingDeadline: "31 July 2026",
    riskProfile: "Core-Plus",

    units: "16 apartments",
    sqm: "3,450 m²",
    floors: "5 storeys",
    completionDate: "Q2 2028",

    image: "/01_stone%20copy.jpg",
    gallery: [
      "/01_stone%20copy.jpg",
      "/Ordino%20AND%20IMG%20day%20snow.webp",
      "/AND%20IMG%20night%20snow%20lights.jpeg",
    ],

    description:
      "La Massana Alpine Residences is a boutique development of 16 high-specification apartments positioned within walking distance of the Pal Arinsal gondola. The design pairs traditional Andorran stone and timber façades with a contemporary interior programme — oversized glazing, double-aspect living spaces, and a shared wellness suite with spa, sauna, and gym. Apartments range from two to four bedrooms and are designed to appeal to the growing segment of international residents relocating to Andorra on active residency permits.",
    investmentThesis:
      "La Massana has seen double-digit annual growth in prime residential values as demand from international residents continues to outpace new supply. With only 4% of Andorran land buildable, ski-adjacent parcels at this scale rarely come to market. The land is already acquired at an attractive basis, planning permission is granted, and presales interest is strong — de-risking the project well ahead of construction start. Investors benefit from a fixed coupon through the build phase and share in meaningful upside on exit through unit sales.",
    highlights: [
      "Full planning permission granted",
      "Land secured at below-market basis",
      "Walking distance to Pal Arinsal gondola",
      "€6.2M in pre-sales reservations already signed",
      "Experienced local contractor under fixed-price build contract",
      "Fixed-price construction contract eliminates cost overruns",
      "Quarterly coupon distributions during hold period",
    ],
    useOfFunds: [
      { label: "Construction & fit-out", percentage: 68 },
      { label: "Land (already secured)", percentage: 18 },
      { label: "Professional & design fees", percentage: 6 },
      { label: "Financing & contingency", percentage: 5 },
      { label: "Marketing & sales", percentage: 3 },
    ],
    capitalStack: [
      { label: "Senior debt", percentage: 55, note: "Andbank — term sheet signed" },
      { label: "Investor equity (this raise)", percentage: 27 },
      { label: "Sponsor co-investment", percentage: 12, note: "Equity Partners skin-in-the-game" },
      { label: "Mezzanine / deferred land", percentage: 6 },
    ],
    exitStrategy:
      "Primary exit is individual unit sales during the final 12 months of construction and the 6 months following completion. A bulk portfolio sale to a family office or institutional buyer is retained as an alternative exit if pre-sales momentum warrants.",
    keyRisks: [
      "Construction delays could extend the hold period beyond the target 36 months",
      "Residential price softening in Andorra could compress exit margins",
      "Currency movements for non-EUR investors",
      "Liquidity: investor equity is locked for the full hold period — no secondary market",
    ],

    milestones: [
      { label: "Site acquisition", date: "Q4 2024", done: true },
      { label: "Planning permission granted", date: "Q2 2025", done: true },
      { label: "Investor financing open", date: "Q4 2025", done: true },
      { label: "Construction start", date: "Q3 2026", done: false },
      { label: "Structure complete", date: "Q2 2027", done: false },
      { label: "Unit handover & sales", date: "Q2 2028", done: false },
    ],

    planningStatus: "Full planning permission granted (Q2 2025)",
    regulatoryNote:
      "Investment is made via an Andorran SPV with Equity Partners as asset manager. All foreign investment approvals, KYC, AML, and source-of-funds checks are handled by Equity Partners prior to capital call.",
    dueDiligenceDocs: [
      "Confidential Information Memorandum (CIM)",
      "Financial model & sensitivity analysis",
      "Independent valuation report",
      "Legal due diligence pack",
      "Construction contract & programme",
      "Planning permission & site plans",
    ],
  },
  {
    slug: "canillo-wellness-retreat",
    name: "Canillo Wellness Retreat",
    tagline:
      "Branded 48-key boutique wellness hotel at the Soldeu–El Tarter gateway — hospitality cash flow with premium freehold real estate upside.",
    status: "Closing Soon",
    location: "Canillo, Andorra",
    parish: "Canillo",
    sector: "Hospitality",

    totalProjectValue: "€42M",
    equityRaise: "€14M",
    minInvestment: "€250,000",
    maxInvestment: "€3,000,000",
    fixedReturn: "10%",
    profitShare: "25%",
    targetIRR: "16–20%",
    equityMultiple: "1.8–2.1x",
    cashYield: "10% p.a. during build, 7–9% NOI yield post-stabilisation",
    holdPeriod: "48–60 months",
    returnStructure: "Fixed 10% p.a. during development + 25% of project profit on exit / refinance",

    fundingProgress: 84,
    amountCommitted: "€11.8M of €14M",
    fundingDeadline: "30 May 2026",
    riskProfile: "Value-Add",

    units: "48 keys + spa + restaurant",
    sqm: "5,800 m²",
    floors: "6 storeys",
    completionDate: "Q4 2027",

    image: "/Andorra%20Canillo.jpg",
    gallery: [
      "/Andorra%20Canillo.jpg",
      "/AND%20IMG%20night%20snow%20lights.jpeg",
      "/Ordino%20AND%20IMG%20day%20snow.webp",
    ],

    description:
      "Canillo Wellness Retreat is a ground-up development of a 48-key boutique hotel with a 600 m² destination spa, signature restaurant, rooftop terrace, and ski-concierge services. The asset is positioned at the base of the Soldeu–El Tarter access road, giving guests direct access to Grandvalira — Europe's largest ski domain — and strong year-round demand from wellness and mountain leisure travellers. The property will be operated under a white-label management agreement with a European boutique hospitality group.",
    investmentThesis:
      "Andorra's hotel market has structurally underperformed on key count per tourist, creating a persistent supply gap in the 4 and 5-star wellness-led segment. ADRs in the parish have grown at a 7% CAGR over the last five years and occupancy regularly clears 80% in the winter season. The combination of development-phase fixed income, stabilised NOI yields post-opening, and a clear institutional exit path via sale to a European hotel fund makes this one of the more resilient opportunities in our current pipeline.",
    highlights: [
      "Planning permission granted and construction permit issued",
      "Lead contractor appointed under guaranteed maximum price contract",
      "Operator agreement signed — revenue share structure",
      "Direct access to Grandvalira — Europe's largest ski domain",
      "Year-round hospitality demand — not seasonal",
      "Target stabilised NOI yield of 7–9%",
      "Clear institutional exit to European hotel investment funds",
    ],
    useOfFunds: [
      { label: "Construction & fit-out", percentage: 62 },
      { label: "FF&E & operating supplies", percentage: 12 },
      { label: "Land (secured)", percentage: 14 },
      { label: "Professional fees", percentage: 5 },
      { label: "Pre-opening & contingency", percentage: 7 },
    ],
    capitalStack: [
      { label: "Senior development debt", percentage: 50, note: "Credit Andorra — 65% LTC" },
      { label: "Investor equity (this raise)", percentage: 33 },
      { label: "Sponsor co-investment", percentage: 10 },
      { label: "Mezzanine", percentage: 7 },
    ],
    exitStrategy:
      "Primary exit is a sale to a European hospitality investment fund or regional hotel REIT 18–24 months after stabilisation (target Q2 2029). A refinance-and-hold option at stabilisation is available if market conditions favour it, returning a portion of investor capital while maintaining cash yield exposure.",
    keyRisks: [
      "Hospitality markets are sensitive to macro-economic cycles",
      "Operator execution risk during ramp-up to stabilisation",
      "Construction cost inflation above contingency reserves",
      "Exit multiple compression if hotel capital markets soften at exit",
      "Longer hold period than residential developments",
    ],

    milestones: [
      { label: "Site acquisition", date: "Q2 2024", done: true },
      { label: "Operator agreement signed", date: "Q1 2025", done: true },
      { label: "Planning & construction permit", date: "Q3 2025", done: true },
      { label: "Investor financing open", date: "Q1 2026", done: true },
      { label: "Construction start", date: "Q2 2026", done: false },
      { label: "Soft opening", date: "Q3 2027", done: false },
      { label: "Stabilisation", date: "Q4 2028", done: false },
      { label: "Exit or refinance window", date: "Q2 2029", done: false },
    ],

    planningStatus: "Full planning permission and construction permit granted",
    regulatoryNote:
      "Investment is made through an Andorran SPV holding the freehold asset. A hotel management agreement sits below the SPV. Investors are subject to standard KYC, AML, and source-of-funds checks. This opportunity is limited to accredited and professional investors only.",
    dueDiligenceDocs: [
      "Confidential Information Memorandum (CIM)",
      "Hotel operator agreement (redacted)",
      "STR market report & comp set analysis",
      "Financial model with scenario sensitivities",
      "Independent feasibility study",
      "Legal due diligence pack",
      "Construction contract (GMP basis)",
    ],
  },
  {
    slug: "andorra-la-vella-commercial-plaza",
    name: "Andorra la Vella Commercial Plaza",
    tagline:
      "Core-plus mixed-use commercial asset in Andorra's capital — long-lease income from blue-chip tenants with a value-add repositioning angle.",
    status: "Open for Investment",
    location: "Andorra la Vella, Andorra",
    parish: "Andorra la Vella",
    sector: "Commercial / Mixed-Use",

    totalProjectValue: "€24M",
    equityRaise: "€7.2M",
    minInvestment: "€100,000",
    maxInvestment: "€1,500,000",
    fixedReturn: "9%",
    profitShare: "15%",
    targetIRR: "13–16%",
    equityMultiple: "1.5–1.7x",
    cashYield: "8–9% stabilised NOI yield on cost",
    holdPeriod: "60 months",
    returnStructure: "Fixed 9% p.a. paid quarterly from Year 2 + 15% of equity profit on sale",

    fundingProgress: 38,
    amountCommitted: "€2.7M of €7.2M",
    fundingDeadline: "30 September 2026",
    riskProfile: "Core-Plus",

    units: "Ground-floor retail + 4 office floors",
    sqm: "4,200 m²",
    floors: "5 storeys",
    completionDate: "Q1 2028 (repositioning)",

    image: "/Andorra-la-Vella.webp",
    gallery: [
      "/Andorra-la-Vella.webp",
      "/hero-andorra-R2PtlkD-.jpg",
      "/AND%20IMG%20night%20snow%20lights.jpeg",
    ],

    description:
      "Andorra la Vella Commercial Plaza is an established mixed-use office and retail asset on Avinguda Meritxell — the principal commercial thoroughfare of Andorra's capital. The acquisition includes the freehold building, ground-floor retail frontage, and four floors of office space. The business plan is a light value-add repositioning: upgrading the façade, modernising the lobby and common areas, rolling to market rents on lease expiry, and securing a long-lease covenant with a blue-chip anchor tenant. Post-repositioning, the asset is targeted as a core-income holding for institutional capital.",
    investmentThesis:
      "Andorra la Vella is structurally undersupplied with grade-A commercial space. The capital continues to attract international corporates, legal firms, and family offices drawn by Andorra's tax regime and stable jurisdiction. Rental tone on Avinguda Meritxell has moved up materially in the last 24 months, yet the subject asset is currently 38% under-rented relative to market. The acquisition basis reflects the in-place rent roll — not market — allowing investors to capture rental reversion as leases roll. A contracted exit at stabilisation provides predictable return visibility.",
    highlights: [
      "Prime Avinguda Meritxell location — capital's main commercial spine",
      "Existing rent roll covers debt service from day one",
      "38% rental reversion opportunity on lease expiry",
      "Light-touch capex plan — no structural works required",
      "Heads of terms signed with anchor tenant for 10-year lease",
      "Lower volatility than ground-up development",
      "Quarterly coupon distributions from Year 2",
    ],
    useOfFunds: [
      { label: "Acquisition price", percentage: 78 },
      { label: "Capex repositioning", percentage: 12 },
      { label: "Leasing costs & tenant incentives", percentage: 5 },
      { label: "Acquisition fees & legal", percentage: 3 },
      { label: "Working capital reserve", percentage: 2 },
    ],
    capitalStack: [
      { label: "Senior debt", percentage: 60, note: "MoraBanc — 60% LTV, 10-year fixed" },
      { label: "Investor equity (this raise)", percentage: 30 },
      { label: "Sponsor co-investment", percentage: 10 },
    ],
    exitStrategy:
      "Sale as a stabilised core-income asset to a European institutional investor or pension fund in Year 5, once the full rent roll has been rolled to market and the anchor tenant's 10-year lease is in place. A refinance-and-extend option is available if macro conditions or yield markets favour it at the stabilisation point.",
    keyRisks: [
      "Tenant default or delayed lease commencement",
      "Market rents soften between underwriting and lease rollover",
      "Interest-rate movements affecting refinance terms",
      "Commercial real estate yield expansion at exit",
      "Longer hold period than development deals — capital locked for 5 years",
    ],

    milestones: [
      { label: "Heads of terms signed", date: "Q3 2025", done: true },
      { label: "Due diligence complete", date: "Q4 2025", done: true },
      { label: "Investor financing open", date: "Q1 2026", done: true },
      { label: "Acquisition close", date: "Q4 2026", done: false },
      { label: "Repositioning works complete", date: "Q1 2028", done: false },
      { label: "Full stabilisation", date: "Q2 2029", done: false },
      { label: "Exit to institutional buyer", date: "Q1 2031", done: false },
    ],

    planningStatus: "No planning required — repositioning within existing envelope",
    regulatoryNote:
      "Acquisition via an Andorran SPV with investors holding proportional equity. Equity Partners serves as asset manager under an investment management agreement. All investors subject to KYC, AML, and source-of-funds verification. Suitable for professional and sophisticated investors.",
    dueDiligenceDocs: [
      "Confidential Information Memorandum (CIM)",
      "Rent roll & tenancy schedule",
      "Building technical survey",
      "Independent valuation (red book)",
      "Anchor tenant heads of terms",
      "Financial model with downside scenarios",
      "Legal due diligence pack",
    ],
  },
];

export function getOpportunityBySlug(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}

export const opportunityStatusColour: Record<string, string> = {
  "Open for Investment": "#53b27f",
  "Closing Soon": "#d97447",
  "Waitlist": "#4a90d9",
  "Fully Subscribed": "#8494a9",
};

export const riskProfileColour: Record<string, string> = {
  "Core": "#4a90d9",
  "Core-Plus": "#53b27f",
  "Value-Add": "#f5a623",
  "Opportunistic": "#d97447",
};
