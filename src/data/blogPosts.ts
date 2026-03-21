export interface BlogPostSection {
  heading: string;
  paragraphs: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
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
  sources?: { label: string; href: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "can-foreigners-still-buy-property-in-andorra-2026",
    title: "Can foreigners still buy property in Andorra today?",
    category: "Regulation",
    date: "Mar 2026",
    excerpt:
      "A concise investor guide to Andorra’s post-2025 acquisition rules, what foreigners can still buy, and where real opportunity remains.",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    sections: [
      {
        heading: "Yes, But the Market Is No Longer Frictionless",
        paragraphs: [
          "Foreigners can still buy property in Andorra in 2026, but the market is no longer as open, flexible, or simple as much of the internet still suggests. Since the 2025 reform cycle, Andorra has moved into a more selective phase in which foreign capital is still welcome, but now operates within a tighter legal and strategic framework.",
          "For investors, that changes the real question. It is no longer simply whether you can buy. It is what you can buy, how you can structure it, and whether the opportunity still makes sense under the new rules.",
          "For us, this is the key shift: Andorra should no longer be viewed as an easy-access tax-efficient property market. It is now a high-barrier jurisdiction where local access, compliance, and execution quality matter far more than before.",
        ],
      },
      {
        heading: "What Changed After the 2025 Regulatory Reset",
        paragraphs: [
          "The major turning point was Law 5/2025, approved on March 6, 2025 and applied from April 2025. The reform was designed to reduce speculative pressure, protect local housing access, and tighten how foreign real estate investment works in practice.",
          "That matters because many international articles about Andorra property were written before these changes. A buyer relying on outdated guidance can easily misunderstand their real position.",
          "This is one of the biggest gaps in the market. A large share of the English-language content about buying property in Andorra was written before the 2025 reforms or still repeats an older version of the market story: low taxes, no major friction, rising demand, attractive mountain jurisdiction, straightforward property purchase.",
          "That narrative is now incomplete at best.",
        ],
      },
      {
        heading: "What Foreign Investors Can Still Buy",
        paragraphs: [
          "Foreign buyers can still acquire property in Andorra, but under narrower limits than before. In broad terms, the framework now centers around one single-family home or land for one, up to two residential units in certain cases, and limited ancillary assets such as parking.",
          "That may still work well for selected investors, but it clearly moves the market away from broad, repeat-style residential accumulation.",
          "For investors accustomed to larger-scale optionality, this can initially feel restrictive. In reality, it changes the game from accumulation to precision.",
          "The strongest outcomes are now more likely to come from carefully chosen assets, long-term holds, and acquisitions structured with disciplined local execution from day one.",
        ],
      },
      {
        heading: "Why the Best Opportunity Now Belongs to Disciplined Capital",
        paragraphs: [
          "The biggest mistake a foreign investor can make in Andorra today is assuming that still possible means still simple. Investor status, tax treatment, acquisition limits, and use case now matter much more than they once did. Some strategies still work very well. Others are far less attractive, or no longer viable in the way many foreign buyers expect.",
          "That is why local structuring has become part of investment performance. In Andorra today, execution quality is not just operational. It is strategic.",
          "The opportunity in Andorra has not disappeared. It has become more selective. That means the best outcomes are now more likely to come from carefully chosen, high-quality assets, long-term holds rather than speculative flips, strong local relationships, and disciplined legal and execution planning from day one.",
          "In other words, Andorra now rewards precision more than scale.",
        ],
      },
      {
        heading: "Why Old Internet Advice Is Now Dangerous",
        paragraphs: [
          "A buyer relying on outdated material may misunderstand whether they qualify as a foreign investor, how many units they can lawfully acquire, whether a development strategy is still permitted, how foreign investment taxes now apply, or whether a residency-linked strategy still works the way it once did.",
          "This is exactly why local, current execution advice has become more valuable than general international content. The Andorran market is no longer one where broad lifestyle guidance is enough. The legal and strategic details now change outcomes.",
        ],
      },
      {
        heading: "What the Market Is Telling Us",
        paragraphs: [
          "Recent 2025 market data reported in early 2026 showed that the majority of transactions were still carried out by residents. That is important. It confirms that Andorra is not just a foreign-demand story. Domestic participation remains central to the market, and that supports the government’s tighter policy direction.",
          "For investors, that makes Andorra more interesting, not less. A selective market with real local depth is often more resilient than one driven only by international momentum.",
        ],
      },
      {
        heading: "What This Means for Foreign Buyers",
        paragraphs: [
          "So, can foreigners still buy property in Andorra in 2026? Yes.",
          "But Andorra is no longer a market for passive assumptions or outdated playbooks. The opportunity remains strong for investors who understand the new framework and approach the market with the right local guidance.",
          "That is where the real edge now sits: not in chasing easy access, but in entering the market correctly.",
        ],
      },
    ],
    sources: [
      {
        label: "Carlota Pastora on Law 5/2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "Advantia on foreign real estate investment changes",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Advantia on 2025 residence and tax changes",
        href: "https://www.advantia.ad/en/economy/tax-changes-residence-andorra",
      },
      {
        label: "SER Andorra reporting official 2025 transaction data",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
    ],
  },
  {
    slug: "andorra-real-estate-investment-2026-serious-investors",
    title: "Andorra Real Estate Investment in 2026: Investor Guide",
    category: "Market Update",
    date: "Mar 2026",
    excerpt:
      "A current investor guide to Andorra real estate in 2026: regulation, pricing, foreign investment constraints, and where disciplined capital can still find opportunity.",
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    sections: [
      {
        heading: "A More Selective Market Is Strengthening the Investment Case",
        paragraphs: [
          "The Andorran real estate story in 2026 is no longer defined by openness. It is defined by scarcity, selectivity, and the increasing value of local execution.",
          "That is precisely why the market still deserves serious investor attention. For a long time, Andorra was described in overly simple terms: tax efficiency, political stability, mountain lifestyle, and rising international demand. Those elements still matter, but they no longer explain the full investment case.",
          "Today, Andorra is better understood as a high-barrier European real estate market. Access is narrower. Regulation is tighter. Local coordination carries more weight. And the investors best positioned to perform well are no longer those seeking broad optionality, but those entering with sharper structuring, stronger local alignment, and a longer-term view of value.",
          "That shift has not weakened the market. In many respects, it has made it more investable for disciplined capital.",
        ],
      },
      {
        heading: "What Has Changed for Investors",
        paragraphs: [
          "The old investment narrative focused on simple market entry. The current one is about qualified access.",
          "Today, serious investors need to understand three structural shifts. First, foreign real estate investment is more restricted. The market is no longer open to the kind of broad residential accumulation that many international buyers once assumed was possible. Acquisitions are now subject to clearer limits, and certain speculative or tourism-linked strategies have been materially constrained.",
          "Second, tax and regulatory structure matter more to returns. In markets with more flexibility, poor structuring can be inefficient but survivable. In Andorra today, poor structuring can alter the entire economics of a transaction.",
          "Third, local execution has become part of the investment thesis. In a smaller jurisdiction, where approvals, counterparties, and market access are relationship-sensitive, the quality of local coordination can have more impact than spreadsheet optimization.",
          "That is why the best Andorra opportunities in 2026 are not necessarily the most visible ones. They are often the ones that combine scarce product, compliant structure, and credible local delivery.",
        ],
      },
      {
        heading: "What the Data Says About the Market Now",
        paragraphs: [
          "Recent numbers confirm that Andorra remains active, but they also show a market shaped by residents, scarcity, and post-reform normalization rather than purely by foreign demand.",
          "Reporting on official 2025 market data published on February 9, 2026 indicated that 75.1% of 2025 real estate transactions were made by residents, total transaction value reached roughly €1.398 billion, average apartment pricing rose to around €4,479 per square meter, and foreign purchases rose sharply, but partly off the distorted base created by the earlier moratorium period.",
          "Additional reporting from November 6, 2025 indicated apartment pricing had already approached €4,500 per square meter in the third quarter, reinforcing the view that pricing pressure remains structurally real rather than anecdotal.",
          "More recently, data reported on March 16, 2026 showed residential mortgages in 2025 had risen by about 40% year over year, with more than €385 million in residential mortgage volume. That matters because it suggests local buyer activity remains strong even as the market becomes more expensive and more regulated.",
          "For investors, this is important. Andorra is not simply a foreign-capital story. Domestic demand still matters. That tends to support resilience.",
        ],
      },
      {
        heading: "Why Investors Are Still Interested",
        paragraphs: [
          "Despite tighter rules, Andorra retains clear attractions for sophisticated capital. Scarcity supports long-term value in a supply-constrained jurisdiction where land is limited, planning is sensitive, and product quality matters.",
          "The buyer base is also deeper than outsiders often assume. The market is supported not only by foreign interest, but by residents, local businesses, and established family capital. That matters for liquidity and resilience.",
          "Regulatory tightening may strengthen the market over time by discouraging lower-conviction capital and preserving better alignment between supply, pricing, and social tolerance.",
          "Access is harder, which increases the value of local edge. When a market becomes more selective, information asymmetry grows. That benefits investors who work through real local networks rather than generic listings and generalized market narratives.",
        ],
      },
      {
        heading: "Where the Opportunity Still Sits",
        paragraphs: [
          "The real opportunity in Andorra in 2026 is not in chasing the broadest possible exposure. It is in identifying where selectivity creates value.",
          "In our view, the strongest opportunities remain concentrated in four areas: prime residential with true scarcity, execution-ready development, long-hold strategies, and locally originated opportunities where access quality matters more than public-market visibility.",
          "Well-positioned residential assets in constrained micro-locations continue to hold investor appeal, especially where quality and supply discipline are obvious. Projects with realistic planning pathways, credible partner alignment, and clean development logic are increasingly favored over conceptual or speculative positions.",
          "As transaction friction increases, long-duration investment logic becomes more compelling. Investors entering Andorra should increasingly think in terms of enduring value, not just short-cycle arbitrage.",
        ],
      },
      {
        heading: "What Serious Investors Should Avoid",
        paragraphs: [
          "Andorra is still attractive, but it is less forgiving. The biggest mistakes in 2026 are usually strategic rather than legal.",
          "Investors misread the market when they assume old foreign-buyer guidance still applies, overestimate how scalable residential acquisition is, underwrite deals without enough regard for tax and compliance structure, treat local execution as an operational detail instead of a core investment variable, or confuse availability with quality.",
          "That last point matters. In a selective jurisdiction, visible inventory is not always the best inventory. The best opportunities often emerge where trust, timing, and local credibility intersect.",
        ],
      },
      {
        heading: "Why Local Perspective Matters More Than Ever",
        paragraphs: [
          "In a looser market, capital alone can do more of the work. In Andorra today, that is no longer true. Investors need better market intelligence, stronger local connectivity, disciplined structuring, and credible delivery oversight.",
          "That is the gap Equity Partners is built to address. Our value is not simply that we know the market. It is that we help investors enter it properly: with local perspective, stronger counterpart coordination, and a clearer line between strategic intent and on-the-ground execution.",
        ],
      },
      {
        heading: "Why Andorra Still Deserves Investor Attention",
        paragraphs: [
          "Andorra remains one of the more compelling niche real estate markets in Europe for serious capital. But it is no longer a market for passive assumptions, broad foreign-buyer optimism, or recycled tax-haven narratives.",
          "The 2026 Andorra investment story is stronger than that. It is a story about selective access, constrained supply, resilient domestic participation, rising regulatory sophistication, and the increasing value of disciplined local execution.",
          "For investors who understand that shift, Andorra still offers real opportunity. But the edge now belongs to those who treat the market as it is today, not as it was described yesterday.",
        ],
      },
    ],
    sources: [
      {
        label: "Advantia on foreign property investment changes",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Carlota Pastora on the March 6, 2025 Omnibus Law",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "SER Andorra on 2025 real estate transactions, February 9, 2026",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra on apartment price per square meter, November 6, 2025",
        href: "https://cadenaser.com/andorra/2025/11/06/el-preu-mitja-del-metre-quadrat-en-un-pis-de-venda-frega-els-4500-euros-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra on updated foreign real estate investment tax, February 26, 2026",
        href: "https://cadenaser.com/andorra/2026/02/26/el-govern-actualitza-fins-al-6-la-taxa-sobre-la-inversio-estrangera-immobiliaria-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra on residential mortgages, March 16, 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
    ],
  },
  {
    slug: "andorra-passive-residency",
    title: "Andorra Passive Residency: A Residency by Investment",
    category: "Regulation",
    date: "Mar 2026",
    excerpt:
      "What it takes to qualify in 2026, why the framework is changing, and why Andorra remains such an attractive place to live and invest.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    sections: [
      {
        heading: "A More Selective Route Into One of Europe’s Most Attractive Jurisdictions",
        paragraphs: [
          "Andorra continues to stand out as one of Europe’s most appealing jurisdictions for internationally minded investors, families, and entrepreneurs who want stability, quality of life, and a stronger long-term base in Europe.",
          "In 2026, passive residency in Andorra is still very much available. But the framework is evolving. The country is raising the bar, not to make residency less attractive, but to make it more selective, more sustainable, and more clearly aligned with people who want a genuine connection to the Principality.",
          "That is what makes Andorra’s passive residency route so interesting today. It is no longer simply about meeting a threshold. It is about demonstrating commitment to a country that offers exceptional lifestyle quality, political stability, and increasingly valuable real estate.",
        ],
      },
      {
        heading: "What Is Andorra Passive Residency?",
        paragraphs: [
          "Passive residency, or residence without gainful activity, is designed for individuals who want to live in Andorra without taking up local employment in the traditional sense.",
          "It is particularly relevant for investors, entrepreneurs with international income, private wealth holders, families seeking a secure and high-quality European base, and individuals combining lifestyle goals with long-term tax and asset planning.",
          "In practical terms, it allows you to become a resident of Andorra while building your life around the country, provided you meet the financial and investment requirements.",
        ],
      },
      {
        heading: "What Does It Take to Qualify in 2026?",
        paragraphs: [
          "The 2026 framework is more demanding than in previous years. That is important to understand from the outset.",
          "According to recent 2026 legal summaries, passive residency now generally requires a minimum qualifying investment in Andorran assets of €1,000,000, while if the investment is made in real estate, each unit must exceed €800,000.",
          "The main applicant AFA payment is €50,000, with an additional €12,000 for each dependent. There is also an expectation of effective residence in Andorra during the year.",
        ],
      },
      {
        heading: "How the Requirements Are Changing",
        paragraphs: [
          "This is where many readers get caught by outdated online information. The Andorra residency framework did not shift only once. It changed in stages.",
          "In 2025, the minimum real estate threshold had already increased, eligible investments became narrower, and the AFA requirement increased. In 2026, the broader qualifying investment threshold appears to have increased further to €1,000,000, while if the investment is made through property, each unit must exceed €800,000.",
          "This reflects a bigger trend: Andorra is moving toward a residency model built around quality, commitment, and economic substance. That should not be seen negatively. In many ways, it strengthens the country’s long-term appeal.",
        ],
      },
      {
        heading: "Why Andorra Is Still So Attractive",
        paragraphs: [
          "Even with higher thresholds, the proposition remains compelling. Andorra offers a rare combination of political stability, personal safety, strong quality of life, natural beauty, an international business and wealth profile, and a compact, high-functioning European environment.",
          "For many people, the appeal goes beyond tax planning. It is about living in a place that feels secure, clean, efficient, and increasingly exclusive.",
          "That exclusivity matters in real estate too. Andorra is a small jurisdiction with constrained supply and strong location-specific value. That means residency and property ownership can work together in a very attractive way when structured properly.",
        ],
      },
      {
        heading: "What Role Does Real Estate Play?",
        paragraphs: [
          "For many applicants, real estate remains one of the most attractive ways to create a real connection to Andorra. Property can serve two purposes at once: support a residency strategy and create long-term personal or investment value in the Principality.",
          "That may mean acquiring a home to live in, securing a high-quality family base, investing in a prime Andorran property with long-term conviction, or entering the market through an asset you would genuinely want to own.",
          "This is where strategy matters. A passive residency structure should not be built around the cheapest possible qualifying asset. The stronger approach is to choose real estate that makes sense both for residency and for long-term value.",
        ],
      },
      {
        heading: "Why Local Guidance Matters More Now",
        paragraphs: [
          "As the rules become more selective, the quality of your local advice becomes more important.",
          "The right questions are no longer just whether you qualify, what the threshold is, or what paperwork you need. The better questions are what kind of Andorran asset makes sense for you, whether to buy for personal use or investment or both, how residency, tax, and real estate decisions should be aligned, and which opportunities are actually worth pursuing.",
          "In a market like Andorra, where regulation, access, and property quality are all deeply local, that difference matters.",
        ],
      },
      {
        heading: "Why This Is Still a Positive Story",
        paragraphs: [
          "It would be easy to look at the rising thresholds and conclude that the process is becoming less attractive. In our view, that would be the wrong reading.",
          "What Andorra is doing is refining its model. The country is making clear that passive residency is for people who want a meaningful relationship with the Principality. That creates a stronger long-term environment for residents, investors, property owners, and the market as a whole.",
          "For the right applicant, that makes the opportunity more compelling, not less.",
        ],
      },
      {
        heading: "How Equity Partners Helps Residency Buyers",
        paragraphs: [
          "Equity Partners helps investors access Andorra’s most compelling real estate opportunities through trusted local relationships, regulatory insight, and disciplined execution.",
          "For a reader considering passive residency, that means we can help connect the residency objective to the right real estate strategy, whether the goal is acquiring a home in Andorra, building a long-term family base, or securing a high-quality property investment in one of the Principality’s most attractive markets.",
          "Passive residency is not just an immigration decision. It is also a capital allocation decision. And in Andorra, those two should be approached together.",
        ],
      },
      {
        heading: "Why Passive Residency Still Appeals",
        paragraphs: [
          "Andorra passive residency in 2026 is more selective than before, but it remains an exceptional route for the right investor or family.",
          "The requirements are higher. The framework is more serious. But the benefits are still very real: access to one of Europe’s most attractive small jurisdictions, a stronger long-term residency base, and the possibility to pair lifestyle with meaningful Andorran real estate ownership.",
          "For people who are genuinely excited by the idea of living in Andorra or investing in its high-quality property market, this is still a very compelling opportunity. And if that is the direction you are exploring, Equity Partners would be pleased to help you find the right property and structure the next step with confidence.",
        ],
      },
    ],
    sources: [
      {
        label: "Law 2/2026 changes summary",
        href: "https://carlotapastora.com/en/law-2-2026-andorra-changes-immigration-investment-taxation/",
      },
      {
        label: "Law 5/2025 summary",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "Advantia on new residence conditions",
        href: "https://www.advantia.ad/en/living-in-andorra/new-conditions-residence-andorra",
      },
      {
        label: "Advantia passive residency background",
        href: "https://www.advantia.ad/en/living-in-andorra/passive-resident-andorra",
      },
      {
        label: "WIT residency update",
        href: "https://wit.ad/en/new-conditions-for-residing-in-andorra-in-2025/",
      },
    ],
  },
  {
    slug: "andorra-property-tax-for-foreign-investors",
    title: "Andorra Property Tax for Foreign Investors",
    category: "Tax",
    date: "Mar 2026",
    excerpt:
      "What the rules mean in 2026, where costs have changed, and how stronger structuring can protect long-term value.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    sections: [
      {
        heading: "Tax Is Now Part of the Investment Strategy",
        paragraphs: [
          "Andorra remains one of Europe’s most attractive real estate markets for internationally minded investors. But in 2026, property tax can no longer be treated as a secondary detail.",
          "That is not because the market has become less compelling. It is because Andorra is becoming more selective in how foreign capital enters the property sector. For investors, that means tax now plays a more direct role in acquisition strategy, asset selection, and long-term returns.",
        ],
      },
      {
        heading: "The Key Tax Change Foreign Investors Need to Understand",
        paragraphs: [
          "The most important tax for foreign buyers is the foreign real estate investment tax.",
          "Recent reporting in February 2026 indicated the rate increased to 6% on a first property and 10% on a second property.",
          "That is a meaningful increase from the earlier framework and confirms the direction of policy: Andorra still welcomes investment, but it wants higher-quality, better-aligned, and less speculative capital.",
        ],
      },
      {
        heading: "Why This Matters in Practice",
        paragraphs: [
          "A 6% entry cost on a first acquisition is no longer just background friction. It becomes part of the core economics of the investment.",
          "This has several direct implications: asset quality matters more, repeat-style buying is less attractive, poor structuring becomes more expensive, and long-term conviction matters more than short-term optionality.",
          "For investors, this means Andorra increasingly rewards precision over scale.",
        ],
      },
      {
        heading: "Who Is Treated as a Foreign Investor?",
        paragraphs: [
          "This is one of the most important practical questions.",
          "The tax does not apply only to obvious non-residents. Under the expanded framework, certain residents may also be treated as foreign investors if they cannot demonstrate the required residence history in Andorra.",
          "That means investor classification should be reviewed before a transaction is structured, not after.",
        ],
      },
      {
        heading: "Why the Government Is Doing This",
        paragraphs: [
          "The tax changes are part of a broader housing and market-policy reset.",
          "Andorra is using regulation and taxation to reduce speculative pressure, protect housing access, and encourage more durable and locally aligned investment behavior.",
          "That should not be read only as a barrier. It can also be read as a sign of a market becoming more disciplined and more resilient over time.",
        ],
      },
      {
        heading: "Are There Still Attractive Opportunities?",
        paragraphs: [
          "Yes.",
          "Andorra remains compelling because it combines supply constraint, political stability, strong lifestyle appeal, and a market where local access still creates real advantage.",
          "For the right investor, higher entry tax does not eliminate opportunity. It simply raises the importance of choosing the right asset and entering the market in the right way.",
        ],
      },
      {
        heading: "Why Tax-Aware Execution Matters",
        paragraphs: [
          "This is where local guidance becomes especially valuable.",
          "The Andorran market is no longer one where international investors should rely on generic assumptions or broad online summaries. In a tax-sensitive environment, the real edge comes from understanding how the tax framework affects the acquisition, which opportunities still justify the entry cost, and how local access can improve overall investment quality.",
          "Equity Partners helps investors approach the Andorran market through local intelligence, regulatory understanding, and disciplined execution. In 2026, that is increasingly what separates a visible opportunity from a strong one.",
        ],
      },
      {
        heading: "What Investors Should Take Away",
        paragraphs: [
          "Andorra property tax for foreign investors matters more in 2026 than it did even a year ago.",
          "The market is more selective, but also more structured. For investors who are well-advised, quality-focused, and serious about long-term value, Andorra still offers highly attractive opportunities.",
          "The difference now is simple: entering well matters more than entering quickly.",
        ],
      },
    ],
    sources: [
      {
        label: "SER Andorra on the February 26, 2026 tax update",
        href: "https://cadenaser.com/andorra/2026/02/26/el-govern-actualitza-fins-al-6-la-taxa-sobre-la-inversio-estrangera-immobiliaria-radio-ser-principat-d-andorra/",
      },
      {
        label: "Advantia on foreign property investment changes",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Advantia on the tax on foreign investment in real estate",
        href: "https://www.advantia.ad/en/taxation/real-estate-foreign-investment-tax",
      },
      {
        label: "Carlota Pastora on the March 6, 2025 Omnibus Law",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
    ],
  },
  {
    slug: "andorra-real-estate-market-2026",
    title: "Andorra real estate market: Prices, Demand and Statistics",
    category: "Market Update",
    date: "Mar 2026",
    excerpt:
      "A practical read on pricing, transaction activity, and resident demand in Andorra’s evolving real estate market.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min read",
    sections: [
      {
        heading: "A Market That Is Becoming More Selective, Not Weaker",
        paragraphs: [
          "The Andorran real estate market in 2026 is best understood through one idea: selectivity.",
          "From the outside, rising prices and tighter rules can make the market look harder to access. That is true. But it does not mean the market is weakening. In many respects, it means the opposite. Andorra is becoming a more structured, more disciplined, and more quality-driven real estate environment.",
          "For investors, that matters. The market is no longer just about growth. It is about understanding where value is still holding, who is actually buying, and what the data says beneath the headlines.",
        ],
      },
      {
        heading: "Prices Are Still Moving Upward",
        paragraphs: [
          "Recent official and local reporting suggests pricing remains firm.",
          "Data reported in February 2026 showed the average apartment price in 2025 rose by 10.5% to around €4,479 per square meter. Earlier reporting from November 2025 had already shown average apartment pricing near €4,440 per square meter in the third quarter.",
          "That tells us something important: price growth is not just a short-term spike. It reflects a market where supply remains constrained and high-quality stock continues to command attention.",
        ],
      },
      {
        heading: "Residents Still Dominate the Market",
        paragraphs: [
          "One of the most important signals in the 2025 data is that 75.1% of real estate acquisitions were made by residents.",
          "That is a very important number. It means Andorra is not simply being driven by foreign capital. Resident demand remains structurally central to the market, which supports long-term resilience.",
          "For investors, that is encouraging. It shows that Andorra still has internal demand strength even while international attention continues to rise.",
        ],
      },
      {
        heading: "Transaction Activity Has Been Strong",
        paragraphs: [
          "The market was highly active in 2025.",
          "Recent reporting indicated transaction count rose by more than 35%, total transaction value rose by roughly 34%, and total market value reached around €1.398 billion.",
          "At the same time, foreign acquisitions also rose sharply. But that increase has to be interpreted carefully. It partly reflects the rebound after the earlier moratorium period, which had temporarily distorted the baseline.",
        ],
      },
      {
        heading: "Mortgage Growth Confirms Real Underlying Demand",
        paragraphs: [
          "Another useful signal came from the mortgage market.",
          "Data reported in March 2026 showed residential mortgages in 2025 rose by about 40% year over year, with total mortgage volume exceeding €385 million.",
          "That matters because mortgage activity is one of the clearest indicators of real buyer participation. It suggests that demand is not just theoretical and not purely speculative.",
        ],
      },
      {
        heading: "What This Means for Investors",
        paragraphs: [
          "For investors, the real takeaway is that Andorra remains attractive, but it is no longer a casual market.",
          "The strongest opportunities are likely to be found where several things come together: constrained supply, real local demand, high-quality product, clear regulatory fit, and strong local execution.",
          "This is not a market where broad exposure is necessarily the smartest move. It is a market where better-selected exposure is likely to outperform.",
        ],
      },
      {
        heading: "Why This Is Still a Positive Story",
        paragraphs: [
          "The 2026 Andorra market story is not about easy access. It is about durability.",
          "Prices remain strong. Residents remain active. Mortgage volume has increased. Foreign participation exists, but it is no longer the only story. And the policy environment is pushing the market toward greater discipline rather than looser speculation.",
          "For serious investors, that can be a very positive combination.",
        ],
      },
      {
        heading: "Why Local Market Reading Creates an Edge",
        paragraphs: [
          "This is where local knowledge becomes a real advantage.",
          "Equity Partners helps investors interpret the Andorran market through local access, regulatory awareness, and trusted on-the-ground relationships. In a market where quality and scarcity matter as much as headline growth, that perspective is increasingly important.",
          "For investors looking at Andorra in 2026, the goal should not just be to follow momentum. It should be to understand where the market is strongest and where long-term value is most likely to hold.",
        ],
      },
      {
        heading: "How Investors Should Read the Market Now",
        paragraphs: [
          "Andorra’s real estate market in 2026 is active, expensive, supply-constrained, and still highly compelling.",
          "But the opportunity no longer sits in broad optimism alone. It sits in reading the market properly: prices are rising, residents remain dominant, activity is strong, and quality matters more than ever.",
          "For investors who understand that shift, Andorra continues to offer one of the more interesting real estate stories in Europe.",
        ],
      },
    ],
    sources: [
      {
        label: "Govern d’Andorra on 2025 transactions, February 9, 2026",
        href: "https://www.govern.ad/ca/w/la-compra-d-habitatges-al-2025-va-ser-realitzada-majoritariament-per-residents-al-pais",
      },
      {
        label: "SER Andorra on 2025 transaction data, February 9, 2026",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra on apartment price per square meter, November 6, 2025",
        href: "https://cadenaser.com/andorra/2025/11/06/el-preu-mitja-del-metre-quadrat-en-un-pis-de-venda-frega-els-4500-euros-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra on residential mortgages, March 16, 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra on rents and sale prices, October 2, 2025",
        href: "https://cadenaser.com/andorra/2025/10/02/el-preu-del-lloguer-supera-els-3170-euros-i-arriba-al-maxim-historic-radio-ser-principat-d-andorra/",
      },
    ],
  },
  {
    slug: "best-areas-to-invest-in-andorra-property",
    title: "Best Areas to Invest in Andorra Property",
    category: "Location Guide",
    date: "Mar 2026",
    excerpt:
      "A practical guide to where value, scarcity, and long-term positioning are strongest across Andorra’s key parishes.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min read",
    sections: [
      {
        heading: "A Small Market Where Location Matters Even More",
        paragraphs: [
          "In Andorra, location is not just a search filter. It is one of the biggest drivers of long-term value.",
          "That is partly because the country is small, supply is constrained, and each parish behaves differently. A buyer looking at Ordino is not entering the same market as someone focusing on Encamp or Andorra la Vella. Pricing, buyer profile, scarcity, and long-term use case can all shift meaningfully from one area to another.",
          "For investors, that is good news. It means Andorra is not a one-dimensional market. The opportunity lies in understanding which locations best match the objective behind the capital.",
        ],
      },
      {
        heading: "Ordino: Prestige, Scarcity, and Long-Term Quality",
        paragraphs: [
          "Ordino continues to stand out as one of the most premium residential locations in the country.",
          "Recent market reporting in 2025 showed average sale prices in Ordino exceeding €1.5 million, and later data pushed that average beyond €1.6 million. That makes it one of the clearest high-end markets in Andorra.",
          "Ordino is often less about short-term volume and more about enduring residential quality. For buyers seeking a prime Andorran base or a long-hold asset in one of the country’s most desirable settings, it remains one of the strongest locations in the market.",
        ],
      },
      {
        heading: "Escaldes-Engordany: Premium Demand with Real Urban Depth",
        paragraphs: [
          "Escaldes remains one of the most important property markets in Andorra, particularly for buyers who want centrality, convenience, and premium positioning.",
          "Recent reporting showed average sale values in Escaldes above €1 million, with rental levels also among the highest in the country. Mortgage activity in 2025 also surged strongly in the parish, which suggests real underlying demand, not just listing inflation.",
          "Escaldes is one of the clearest examples of a parish where liquidity and prestige can coexist. It offers a more urban form of scarcity than Ordino, but it is no less relevant.",
        ],
      },
      {
        heading: "Andorra la Vella: Central, Established, and Highly Practical",
        paragraphs: [
          "The capital remains one of the most important reference points in the market.",
          "Average asking levels in 2025 were reported around €650,000 earlier in the year, with later market reporting putting average sale values closer to €850,000. Rental values are also among the highest in the country.",
          "Andorra la Vella may not carry the same luxury aura as the highest-end parts of Ordino or Escaldes, but it has something else: practicality. For many investors, that makes it one of the most dependable markets in the Principality.",
        ],
      },
      {
        heading: "Encamp: More Accessible Entry, Different Value Profile",
        paragraphs: [
          "Encamp remains one of the more affordable ways into the Andorran market.",
          "Recent reporting placed average sale values below most of the country, with figures below €390,000 earlier in 2025 and around €473,000 in later 2025 reporting. Rental pricing also remains far lower than in the central valley.",
          "Encamp is not the same kind of play as Ordino or Escaldes. But that is exactly the point. For some investors, a more accessible parish with room for selective upside can be more attractive than chasing the most expensive postcode.",
        ],
      },
      {
        heading: "Canillo: Tourism Adjacency and Price-Per-Meter Signals",
        paragraphs: [
          "Canillo is interesting because it often behaves differently from the rest of the market.",
          "While not always the leader in average headline purchase price, it has shown very strong price-per-square-meter and rental metrics in recent local reports. That suggests scarcity at the unit level and strong demand in specific pockets, especially where ski and mountain access play a role.",
          "Canillo is a more specialized market. It is less about broad residential depth and more about the right product in the right place.",
        ],
      },
      {
        heading: "What the Data Says About the Wider Market",
        paragraphs: [
          "The broader market backdrop supports the idea that Andorra remains active and selective at the same time.",
          "Recent reporting indicated average apartment pricing in 2025 rose to around €4,479 per square meter, 75.1% of 2025 real estate transactions were made by residents, residential mortgage activity in 2025 rose by about 40%, and total transaction value reached around €1.398 billion.",
          "These are important signals. They show a market that is expensive, supply-constrained, and still supported by meaningful real buyer activity.",
        ],
      },
      {
        heading: "So Where Should Investors Focus?",
        paragraphs: [
          "That depends on the objective.",
          "This is why parish selection in Andorra should never be generic. The same national market can offer very different investment stories depending on where you enter.",
        ],
        table: {
          headers: ["Investor objective", "Best-fit areas", "Investment profile"],
          rows: [
            ["Prime lifestyle base", "Ordino, Escaldes", "Prestige Focus"],
            ["Central, practical long-term hold", "Andorra la Vella, Escaldes", "Core Hold"],
            ["Emerging Value Position", "Encamp", "Rising Popularity"],
            ["Mountain / second-home positioning", "Canillo, Ordino", "Lifestyle Access"],
          ],
        },
      },
      {
        heading: "Why Local Market Reading Creates an Edge",
        paragraphs: [
          "Andorra is no longer a market where broad exposure is enough.",
          "The strongest results are increasingly tied to micro-location quality, supply dynamics, buyer profile, and the ability to distinguish visible stock from real opportunity. That is where local reading creates an edge.",
          "Equity Partners helps investors interpret the Andorran market through local access, regulatory awareness, and trusted on-the-ground relationships. In a small, high-barrier market, understanding where to invest is often just as important as deciding whether to invest.",
        ],
      },
      {
        heading: "Which Areas Deserve the Closest Attention Now",
        paragraphs: [
          "Andorra continues to offer compelling real estate opportunities, but parish selection is now one of the most important strategic decisions an investor can make.",
          "For investors seeking prestige and scarcity, Ordino and Escaldes remain especially strong. For those looking for practicality and urban resilience, Andorra la Vella deserves attention. For buyers prioritizing lower entry points or more specialized positioning, Encamp and Canillo can be highly relevant.",
          "The opportunity in Andorra is real. But as the market becomes more selective, location quality matters more than ever.",
        ],
      },
    ],
    sources: [
      {
        label: "SER Andorra on rents and sale prices, October 2, 2025",
        href: "https://cadenaser.com/andorra/2025/10/02/el-preu-del-lloguer-supera-els-3170-euros-i-arriba-al-maxim-historic-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra on rents and prices, April 10, 2025",
        href: "https://cadenaser.com/andorra/2025/04/10/el-preu-de-lhabitatge-de-lloguer-ha-crescut-un-35-durant-el-primer-trimestre-de-lany-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra on residential mortgages, March 16, 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
    ],
  },
];
