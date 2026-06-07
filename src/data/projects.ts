export interface ProjectMilestone {
  label: string;
  date: string;
  done: boolean;
}

export interface ProjectPartner {
  name: string;
  logo: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: "Under Construction" | "Under development" | "Pipeline" | "Financing Open" | "Completed";
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
  parking: string;
  floors: string;
  image: string;
  gallery: string[];
  description: string;
  investmentCase: string;
  highlights: string[];
  milestones: ProjectMilestone[];
  planningStatus: string;
  regulatoryNote: string;
  partners?: ProjectPartner[];
}

export const projects: Project[] = [
  {
    slug: "nanta-alta-luxury-villas",
    name: "Nanta Alta Luxury Villas",
    tagline: "A boutique collection of 25 luxury villas in Encamp, offering premium mountain living in one of Andorra's most exclusive parishes.",
    status: "Under Construction",
    location: "Encamp, Andorra",
    parish: "Encamp",
    sector: "Luxury Residential",
    value: "€50M",
    investmentRequired: "€12M",
    minInvestment: "€250,000",
    fixedReturn: "12%",
    profitShare: "20%",
    holdPeriod: "36–48 months",
    returnStructure: "Fixed 12% p.a. + 20% of project profit on exit",
    completionDate: "Q4 2028",
    units: "25 villas",
    sqm: "12,400 m²",
    parking: "TBC",
    floors: "3–4 storeys per villa",
    image: "/04c%20copy.jpg",
    gallery: [
      "/images/projects/Nanta%20Alta/01_stone%20copy.jpg",
      "/images/projects/Nanta%20Alta/02_stone%20copy.jpg",
      "/images/projects/Nanta%20Alta/I01%20copy.jpg",
    ],
    description:
      "Nanta Alta is a boutique development of 25 luxury villas set across a prime hillside site in Encamp, one of Andorra's most sought-after residential parishes. Each villa combines contemporary alpine architecture with high-performance energy standards, generous interiors, and panoramic mountain views. The development is designed for international buyers seeking premium mountain living and the residency opportunities that come with Andorran ownership.",
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
    partners: [
      { name: "Pret a Porter Casas", logo: "/images/partners/pret%20a%20porter%20casas%20logo.svg" },
      { name: "Mariné Construccions", logo: "/images/partners/marine.png" },
      { name: "DATA Architects", logo: "/images/partners/DATA LOGO.png" },
      { name: "Heracles", logo: "/images/partners/heracles%20logo.png" },
    ],
  },
  {
    slug: "ordino-prestige",
    name: "Ordino Prestige",
    tagline: "A premium residential development in Andorra's most tranquil and sought-after northern parish.",
    status: "Under development",
    location: "Ordino, Andorra",
    parish: "Ordino",
    sector: "Luxury Residential",
    value: "€35M",
    investmentRequired: "€5M",
    minInvestment: "€100,000",
    fixedReturn: "12%",
    profitShare: "20%",
    holdPeriod: "24–36 months",
    returnStructure: "Fixed 12% p.a. + 20% of project profit on exit",
    completionDate: "Q4 2028",
    units: "50 apartments",
    sqm: "6,800 m²",
    parking: "TBC",
    floors: "6 storeys",
    image: "/Ordino%20Prestige.jpeg",
    gallery: [
      "/ordino%20heights.jpg",
      "/ordino%20heights%202.webp",
      "/Ordino%20AND%20IMG%20day%20snow.webp",
    ],
    description:
      "Ordino Prestige is a 24-unit premium residential apartment complex located in the parish of Ordino, known for its exceptional natural environment, clean air, and growing appeal among Andorran residents and international relocators alike. The project delivers mid-to-large format apartments with high-specification finishes, underground parking, and direct access to Ordino-Arcalís ski infrastructure.",
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
      { label: "Planning approval", date: "Q1 2027", done: false },
      { label: "Construction start", date: "Q3 2027", done: false },
      { label: "Structure complete", date: "Q2 2028", done: false },
      { label: "Completion & handover", date: "Q4 2028", done: false },
    ],
    planningStatus: "Planning application submitted — approval expected Q1 2027",
    regulatoryNote:
      "Financing round opens upon planning approval. Equity Partners manages all compliance and investor onboarding processes.",
    partners: [
      { name: "DATA Architects", logo: "/images/partners/DATA LOGO.png" },
      { name: "Pret a Porter Casas", logo: "/images/partners/pret%20a%20porter%20casas%20logo.svg" },
      { name: "Mariné Construccions", logo: "/images/partners/marine.png" },
    ],
  },
  {
    slug: "funicamp-ski-residencies",
    name: "Funicamp Ski Residencies",
    tagline: "Luxury ski-in/ski-out residencies at the gateway to Grandvalira, Europe's largest ski domain.",
    status: "Under development",
    location: "Encamp, Andorra",
    parish: "Encamp",
    sector: "Luxury Residential",
    value: "€55M",
    investmentRequired: "€6.5M",
    minInvestment: "€150,000",
    fixedReturn: "12%",
    profitShare: "20%",
    holdPeriod: "30–42 months",
    returnStructure: "Fixed 12% p.a. + 20% of project profit on exit",
    completionDate: "Q4 2028",
    units: "80 apartments",
    sqm: "8,200 m²",
    parking: "2,000 m²",
    floors: "7 storeys",
    image: "/funicamp%20ski.jpg",
    gallery: [
      "/funicamp%20ski.jpg",
      "/Andorra%20Canillo.jpg",
      "/Andorra-la-Vella.webp",
    ],
    description:
      "Funicamp Ski Residencies is a luxury residential development positioned at the Funicamp gondola base in Encamp, providing direct ski-in/ski-out access to Grandvalira, Europe's largest ski domain. The scheme delivers 80 premium ski apartments designed for owners seeking effortless mountain access and year-round alpine living. The location benefits from one of Andorra's most iconic infrastructure assets and strong year-round tourism footfall.",
    investmentCase:
      "Ski-linked residential assets in Andorra consistently command premium resale values and strong rental yields due to their scarcity and the global pull of the Grandvalira brand. This project benefits from a unique location with direct gondola access that cannot be replicated elsewhere. Combined with Andorra's tax-efficient environment, investors gain both strong fixed returns and meaningful exit upside.",
    highlights: [
      "Ski-in/ski-out access via Funicamp gondola",
      "Direct access to Grandvalira — Europe's largest ski domain",
      "Premium residential development in a scarce ski-linked location",
      "High tourism footfall location year-round",
      "Premium rental yield potential post-completion",
      "Unique location advantage — cannot be replicated",
    ],
    milestones: [
      { label: "Site identification & heads of terms", date: "Q1 2025", done: true },
      { label: "Feasibility & design study", date: "Q3 2025", done: true },
      { label: "Planning submission", date: "Q1 2026", done: true },
      { label: "Planning approval", date: "Q2 2027", done: false },
      { label: "Construction start", date: "Q4 2027", done: false },
      { label: "Completion & handover", date: "Q4 2028", done: false },
    ],
    planningStatus: "Planning submission lodged — approval expected Q2 2027",
    regulatoryNote:
      "This is a pipeline project. Investor commitments are indicative until planning approval is secured. Equity Partners will notify all registered investors upon financing round opening.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const statusColour: Record<string, string> = {
  "Under Construction": "#53b27f",
  "Under development": "#53b27f",
  "Pipeline": "#f5a623",
  "Financing Open": "#4a90d9",
  "Completed": "#8494a9",
};
