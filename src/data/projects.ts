export interface ProjectMilestone {
  label: string;
  date: string;
  done: boolean;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: "Under Construction" | "Pipeline" | "Financing Open" | "Completed";
  location: string;
  parish: string;
  sector: string;
  value: string;
  investmentRequired: string;
  minInvestment: string;
  fixedReturn: string;
  profitShare: string;
  holdPeriod: string;
  returnStructure: string;
  completionDate: string;
  units: string;
  sqm: string;
  floors: string;
  image: string;
  gallery: string[];
  description: string;
  investmentCase: string;
  highlights: string[];
  milestones: ProjectMilestone[];
  planningStatus: string;
  regulatoryNote: string;
}

export const projects: Project[] = [
  {
    slug: "nanta-alta-luxury-villas",
    name: "Nanta Alta Luxury Villas",
    tagline: "Institutional-grade luxury residential development in the heart of Andorra's most exclusive enclave.",
    status: "Under Construction",
    location: "Escaldes-Engordany, Andorra",
    parish: "Escaldes-Engordany",
    sector: "Luxury Residential",
    value: "€50M",
    investmentRequired: "€12M",
    minInvestment: "€250,000",
    fixedReturn: "12%",
    profitShare: "20%",
    holdPeriod: "36–48 months",
    returnStructure: "Fixed 12% p.a. + 20% of project profit on exit",
    completionDate: "Q4 2026",
    units: "18 villas",
    sqm: "12,400 m²",
    floors: "3–4 storeys per villa",
    image: "/04c%20copy.jpg",
    gallery: [
      "/04c%20copy.jpg",
      "/Ordino%20AND%20IMG%20day%20snow.webp",
      "/Andorra-la-Vella.webp",
    ],
    description:
      "Nanta Alta is a collection of 18 bespoke luxury villas set across a prime hillside site in Escaldes-Engordany — one of Andorra's most sought-after residential parishes. Each villa is designed to institutional specification, combining contemporary alpine architecture with high-performance energy standards and panoramic mountain views. The development targets the growing segment of HNW individuals relocating to Andorra for its fiscal and lifestyle advantages.",
    investmentCase:
      "With only 4% of Andorra's land buildable and premium residential supply chronically constrained, Nanta Alta sits in the highest-demand segment of the market. Pre-sales interest is already strong, and the project benefits from full planning approval and an experienced local construction partner. Investors gain fixed income during construction and meaningful upside on the project exit.",
    highlights: [
      "Full planning permission secured",
      "Construction partner: Grup Heracles",
      "Pre-sales pipeline of €28M already in discussion",
      "Panoramic mountain views from all units",
      "Energy-efficient construction to EU standards",
      "Targeting HNW relocators and second-home buyers",
    ],
    milestones: [
      { label: "Site acquisition", date: "Q1 2024", done: true },
      { label: "Planning approval", date: "Q3 2024", done: true },
      { label: "Construction start", date: "Q1 2025", done: true },
      { label: "Structure complete", date: "Q2 2026", done: false },
      { label: "Fit-out & finishes", date: "Q3 2026", done: false },
      { label: "Completion & handover", date: "Q4 2026", done: false },
    ],
    planningStatus: "Full planning permission granted",
    regulatoryNote:
      "All foreign investment approvals are handled by Equity Partners. Investors are subject to standard KYC and AML compliance checks prior to capital commitment.",
  },
  {
    slug: "ordino-heights",
    name: "Ordino Heights",
    tagline: "A premium residential development in Andorra's most tranquil and sought-after northern parish.",
    status: "Pipeline",
    location: "Ordino, Andorra",
    parish: "Ordino",
    sector: "Residential Development",
    value: "€18M",
    investmentRequired: "€5M",
    minInvestment: "€100,000",
    fixedReturn: "12%",
    profitShare: "20%",
    holdPeriod: "24–36 months",
    returnStructure: "Fixed 12% p.a. + 20% of project profit on exit",
    completionDate: "Q2 2027",
    units: "24 apartments",
    sqm: "4,800 m²",
    floors: "6 storeys",
    image: "/ordino%20heights.jpg",
    gallery: [
      "/ordino%20heights.jpg",
      "/ordino%20heights%202.webp",
      "/Ordino%20AND%20IMG%20day%20snow.webp",
    ],
    description:
      "Ordino Heights is a 24-unit premium residential apartment complex located in the parish of Ordino — known for its exceptional natural environment, clean air, and growing appeal among Andorran residents and international relocators alike. The project delivers mid-to-large format apartments with high-specification finishes, underground parking, and direct access to Ordino-Arcalís ski infrastructure.",
    investmentCase:
      "Ordino is experiencing a structural undersupply of quality residential stock as demand from international residents grows. The project is in advanced planning stages with the land already secured. The relatively compact scale of the project enables a faster delivery timeline, giving investors a shorter hold period and lower minimum entry point than larger developments.",
    highlights: [
      "Land secured and planning application submitted",
      "Direct proximity to Ordino-Arcalís ski area",
      "Lower minimum investment entry point",
      "Strong local demand from resident relocators",
      "Underground parking and communal amenities included",
      "Shorter hold period than comparable developments",
    ],
    milestones: [
      { label: "Land acquisition", date: "Q4 2024", done: true },
      { label: "Planning submission", date: "Q2 2025", done: true },
      { label: "Planning approval", date: "Q4 2025", done: false },
      { label: "Construction start", date: "Q1 2026", done: false },
      { label: "Structure complete", date: "Q4 2026", done: false },
      { label: "Completion & handover", date: "Q2 2027", done: false },
    ],
    planningStatus: "Planning application submitted — approval expected Q4 2025",
    regulatoryNote:
      "Financing round opens upon planning approval. Equity Partners manages all compliance and investor onboarding processes.",
  },
  {
    slug: "funicamp-ski-residencies",
    name: "Funicamp Ski Residencies",
    tagline: "Mixed-use ski-in/ski-out residencies at the gateway to Grandvalira — Europe's largest ski domain.",
    status: "Pipeline",
    location: "Encamp, Andorra",
    parish: "Encamp",
    sector: "Mixed-Use",
    value: "€22M",
    investmentRequired: "€6.5M",
    minInvestment: "€150,000",
    fixedReturn: "12%",
    profitShare: "20%",
    holdPeriod: "30–42 months",
    returnStructure: "Fixed 12% p.a. + 20% of project profit on exit",
    completionDate: "Q3 2027",
    units: "32 units (residential + commercial)",
    sqm: "6,200 m²",
    floors: "7 storeys",
    image: "/funicamp%20ski.jpg",
    gallery: [
      "/funicamp%20ski.jpg",
      "/Andorra%20Canillo.jpg",
      "/Andorra-la-Vella.webp",
    ],
    description:
      "Funicamp Ski Residencies is a mixed-use development positioned at the Funicamp gondola base in Encamp — providing direct ski-in/ski-out access to Grandvalira, Europe's largest ski domain. The scheme combines 28 premium ski apartments with 4 ground-floor commercial units targeting the hospitality and après-ski market. The location benefits from one of Andorra's most iconic infrastructure assets and strong year-round tourism footfall.",
    investmentCase:
      "Ski-linked residential assets in Andorra consistently command premium resale values and strong rental yields due to their scarcity and the global pull of the Grandvalira brand. This project benefits from a unique location with direct gondola access that cannot be replicated elsewhere. Combined with Andorra's tax-efficient environment, investors gain both strong fixed returns and meaningful exit upside.",
    highlights: [
      "Ski-in/ski-out access via Funicamp gondola",
      "Direct access to Grandvalira — Europe's largest ski domain",
      "Mixed residential and commercial income streams",
      "High tourism footfall location year-round",
      "Premium rental yield potential post-completion",
      "Unique location advantage — cannot be replicated",
    ],
    milestones: [
      { label: "Site identification & heads of terms", date: "Q1 2025", done: true },
      { label: "Feasibility & design study", date: "Q3 2025", done: false },
      { label: "Planning submission", date: "Q1 2026", done: false },
      { label: "Planning approval", date: "Q3 2026", done: false },
      { label: "Construction start", date: "Q4 2026", done: false },
      { label: "Completion & handover", date: "Q3 2027", done: false },
    ],
    planningStatus: "Pre-planning — feasibility study underway",
    regulatoryNote:
      "This is a pipeline project. Investor commitments are indicative until planning approval is secured. Equity Partners will notify all registered investors upon financing round opening.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const statusColour: Record<string, string> = {
  "Under Construction": "#53b27f",
  "Pipeline": "#f5a623",
  "Financing Open": "#4a90d9",
  "Completed": "#8494a9",
};
