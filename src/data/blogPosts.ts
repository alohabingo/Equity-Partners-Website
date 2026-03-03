export interface BlogPostSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
  sections: BlogPostSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "andorra-2026-outlook-investor-demand",
    title: "Andorra 2026 Outlook: Where Investor Demand Is Concentrating",
    category: "Market Update",
    date: "Feb 2026",
    excerpt:
      "A practical read on where cross-border investor demand is accelerating and which submarkets are showing the strongest absorption.",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    sections: [
      {
        heading: "Demand Is Moving Toward Execution-Ready Assets",
        paragraphs: [
          "Investor activity is increasingly concentrated in projects with clear delivery pathways rather than conceptual land positions. In practice, that means stronger preference for assets backed by realistic permitting timelines, credible contractor access, and transparent cost assumptions.",
          "Within Andorra, this shift rewards teams with strong local coordination. Speed now comes less from aggressive underwriting and more from reducing friction between design, approvals, and site mobilization.",
        ],
      },
      {
        heading: "Premium Residential Remains the Core Allocation",
        paragraphs: [
          "Premium residential continues to attract both lifestyle-driven and capital-preservation buyers. The strongest interest is in micro-locations where quality stock is structurally limited and rental depth supports downside protection.",
          "For sponsors, the key is product discipline: layouts, finish standards, and amenity scope must align to true local demand, not generic luxury assumptions imported from larger markets.",
        ],
      },
      {
        heading: "What This Means for Investors",
        paragraphs: [
          "In the current cycle, risk-adjusted performance is linked to execution credibility. Investors should prioritize partners with proven local delivery records, live institutional relationships, and a clear governance cadence across the project lifecycle.",
        ],
      },
    ],
  },
  {
    slug: "structuring-residential-projects-faster-delivery",
    title: "Structuring Residential Projects for Faster Delivery in the Principality",
    category: "Execution",
    date: "Jan 2026",
    excerpt:
      "Key operating decisions that reduce timeline risk from acquisition through permitting and contractor coordination.",
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    sections: [
      {
        heading: "Timeline Risk Is Mostly Front-Loaded",
        paragraphs: [
          "Most delays originate in early-stage coordination gaps, not late-stage construction surprises. Site diligence, technical compatibility, and regulatory sequencing should be treated as one integrated workstream from day one.",
          "A compressed schedule is usually achieved by reducing handoff latency between legal, design, and permitting teams rather than forcing unrealistic build assumptions.",
        ],
      },
      {
        heading: "Integrated Governance Improves Predictability",
        paragraphs: [
          "Projects with a single decision framework across partners consistently outperform fragmented governance models. A structured weekly cadence with shared milestone ownership reduces both rework and decision drift.",
        ],
      },
    ],
  },
  {
    slug: "international-investors-andorran-compliance",
    title: "What International Investors Should Know About Andorran Compliance",
    category: "Regulation",
    date: "Dec 2025",
    excerpt:
      "A concise overview of the compliance touchpoints that matter most when entering and scaling in Andorra.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    readTime: "7 min read",
    sections: [
      {
        heading: "Compliance Should Be Embedded in Structuring",
        paragraphs: [
          "Treating compliance as a post-transaction checklist introduces avoidable risk. The stronger model is to embed tax, legal, and reporting requirements directly into the deal architecture before execution begins.",
          "This approach reduces downstream restructuring and helps preserve transaction speed under regulatory scrutiny.",
        ],
      },
      {
        heading: "Cross-Border Investors Need Operational Clarity",
        paragraphs: [
          "Institutional and private investors alike benefit from plain-language compliance maps that define responsibilities, timing, and documentation standards. The goal is not paperwork volume, but predictable process quality.",
        ],
      },
    ],
  },
  {
    slug: "designing-premium-units-buyer-preferences",
    title: "Designing Premium Units for Modern Buyer Preferences",
    category: "Development",
    date: "Nov 2025",
    excerpt:
      "How product design and amenity positioning can improve both sell-through velocity and long-term asset resilience.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    sections: [
      {
        heading: "Premium Buyers Reward Coherence, Not Excess",
        paragraphs: [
          "Current demand favors coherent product strategy over oversized amenity stacks. Buyers respond to efficient layouts, daylight quality, storage logic, and material consistency that support daily use.",
        ],
      },
      {
        heading: "Design Choices Should Support Exit Liquidity",
        paragraphs: [
          "Design decisions must be tested against both sell-through and future resale depth. The most resilient schemes are those that preserve broad appeal while maintaining a premium identity.",
        ],
      },
    ],
  },
  {
    slug: "capital-planning-active-and-pipeline-projects",
    title: "Capital Planning for One Active Project and Two Pipeline Opportunities",
    category: "Capital Strategy",
    date: "Oct 2025",
    excerpt:
      "A framework for balancing deployment timing, construction milestones, and risk controls across a focused portfolio.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    sections: [
      {
        heading: "Sequencing Matters More Than Scale",
        paragraphs: [
          "With a concentrated pipeline, capital sequencing has outsized impact on portfolio stability. Funding should be aligned to evidence-based milestone gates rather than fixed calendar assumptions.",
        ],
      },
      {
        heading: "Protect Optionality Without Losing Momentum",
        paragraphs: [
          "A disciplined reserve strategy allows teams to absorb volatility while maintaining delivery pace on priority assets. That balance is essential in smaller jurisdictions where execution windows can be narrow.",
        ],
      },
    ],
  },
  {
    slug: "local-partner-networks-and-performance",
    title: "Why Local Partner Networks Still Define Performance in Small Jurisdictions",
    category: "Partnerships",
    date: "Sep 2025",
    excerpt:
      "In markets like Andorra, execution quality is often determined by relationship depth more than scale.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    sections: [
      {
        heading: "Relationships Reduce Execution Friction",
        paragraphs: [
          "In compact markets, outcomes are shaped by local trust networks and proven working relationships. Reliable coordination between legal, institutional, and technical partners shortens decision cycles and improves certainty.",
        ],
      },
      {
        heading: "Depth Beats Breadth",
        paragraphs: [
          "A focused partner ecosystem with real accountability usually outperforms broad but shallow networks. The key differentiator is not the number of partners, but their operational alignment and delivery record.",
        ],
      },
    ],
  },
];
