import type { Locale } from "../lib/i18n";

type HomeContent = {
  hero: {
    kicker: string;
    title: string;
    subline: string;
    cta: string;
    ctaSecondary: string;
  };
  localPartnersTitle: string;
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    cards: Array<{
      title: string;
      bullets: string[];
    }>;
  };
  metrics: {
    eyebrow: string;
    items: Array<{ value: string; label: string }>;
  };
  whyEquity: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    points: Array<{ title: string; body: string }>;
  };
  aria: {
    partnersLink: string;
    partnersMarquee: string;
    metricsStrip: string;
    whyEquityImage: string;
    testImageBreak: string;
    carouselNav: string;
    projectCardLabel: string;
    goToProject: string;
  };
  testImageBreak: {
    quote: string;
  };
  andorraAdvantage: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    items: Array<{ label: string; title: string; body: string }>;
  };
  whatWeOffer: {
    eyebrow: string;
    title: string;
    introBefore: string;
    introLinkLabel: string;
    introAfter: string;
    badgePopular: string;
    requestCta: string;
    ctaMore: string;
    returnLabel: string;
    returnSub: string;
    debt: {
      role: string;
      title: string;
      subtitle: string;
      desc: string;
      returnValue: string;
      features: string[];
    };
    debtEquity: {
      role: string;
      title: string;
      subtitle: string;
      desc: string;
      returnValue: string;
      features: string[];
    };
    equityStrip: {
      role: string;
      title: string;
      subtitle: string;
      desc: string;
      cta: string;
    };
  };
  timeline: {
    eyebrow: string;
    title: string;
    intro: string;
    cta: string;
    stepPrefix: string;
    steps: Array<{ title: string; body: string }>;
  };
  gateway: {
    eyebrow: string;
    title: string;
    intro: string;
    requestTitle: string;
    requestBody: string;
    contactCta: string;
    scheduleCta: string;
  };
  featuredDevelopments: {
    eyebrow: string;
    title: string;
    intro: string;
    viewLabel: string;
    valueLabel: string;
    statusLabel: string;
    sectorLabel: string;
    viewAllCta: string;
  };
  suggestedReads: {
    eyebrow: string;
    title: string;
    ctaMore: string;
  };
  statusLabels: Record<string, string>;
  sectorLabels: Record<string, string>;
};

type NewsletterContent = {
  eyebrow: string;
  title: string;
  emailLabel: string;
  emailPlaceholder: string;
  submit: string;
  note: string;
  validationError: string;
  submitting: string;
  success: string;
  error: string;
};

type ContactContent = {
  eyebrow: string;
  title: string;
  intro: string;
  form: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    investorType: string;
    investorTypeOptions: string[];
    investmentTimeline: string;
    investmentTimelineOptions: string[];
    investmentRange: string;
    investmentRangeOptions: string[];
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  cardEyebrow: string;
  officeLabel: string;
};

type PrivacyContent = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: Array<{
    title?: string;
    body?: string[];
    bullets?: string[];
  }>;
  contactCta: string;
};

type AboutContent = {
  hero: {
    title: string;
    copy: string;
  };
  proof: {
    label: string;
    title: string;
    subtitle: string;
    metrics: Array<{ label: string }>;
  };
  whyEquity: HomeContent["whyEquity"];
  team: {
    eyebrow: string;
    title: string;
    intro: string;
    members: Array<{
      role: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    button: string;
  };
};

type PartnersContent = {
  eyebrow: string;
  title: string;
  intro: string;
  entries: Array<{
    role: string;
    summary: string;
  }>;
};

type BlogContent = {
  listing: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  article: {
    breadcrumb: string;
    asideKicker: string;
    asideLabel: string;
    asideCopy: string;
    asideCta: string;
    sourcesTitle: string;
    suggestedEyebrow: string;
    suggestedTitle: string;
  };
};

type LegalContent = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: Array<{
    title: string;
    body?: string[];
    bullets?: string[];
  }>;
  contactCta: string;
};

export const contentTranslations: Record<
  Locale,
  {
    home: HomeContent;
    newsletter: NewsletterContent;
    contact: ContactContent;
    privacy: PrivacyContent;
    about: AboutContent;
    partners: PartnersContent;
    blog: BlogContent;
    terms: LegalContent;
    cookies: LegalContent;
  }
> = {
  en: {
    home: {
      hero: {
        kicker: "ANDORRA • INVESTMENT • EXCELLENCE",
        title: "Your strategic partner for Andorra real estate investments.",
        subline:
          "Our team of professionals gives international investors a seamless experience to Andorra's high-barrier real estate market.",
        cta: "Contact our Team",
        ctaSecondary: "Request Video Call",
      },
      localPartnersTitle: "OUR LOCAL PARTNERS",
      services: {
        eyebrow: "Equity Partners",
        title: "What we do",
        intro:
          "We open the doors to Andorra's exclusive investment landscape by providing a structural bridge that allows international firms to deploy capital into Andorra without compromising on institutional standards.",
        cta: "About Equity Partners",
        cards: [
          {
            title: "Full-Cycle Project Development",
            bullets: [
              "From feasibility to delivery",
              "Securing high-potential land",
              "Institutional-grade assets",
            ],
          },
          {
            title: "Local Network & Exclusive Access",
            bullets: [
              "Off-market opportunities",
              "Direct landowner ties",
              "Deep Andorran expertise",
            ],
          },
          {
            title: "Regulatory & Structural Expertise",
            bullets: [
              "Compliance navigation",
              "Executable strategies",
              "Institutional alignment",
            ],
          },
        ],
      },
      metrics: {
        eyebrow: "Equity Partners in numbers",
        items: [
          { value: "20+", label: "Years of Andorran expertise" },
          { value: "EUR1B+", label: "Identified project pipeline value" },
          { value: "100k+", label: "Square meters under development" },
          { value: "10+", label: "Strategic local partnerships" },
        ],
      },
      whyEquity: {
        eyebrow: "Work with the best",
        title: "Why Equity Partners",
        intro:
          "We combine local market access with disciplined execution standards, helping investors approach Andorra through a more structured, informed, and institutionally aligned lens.",
        cta: "About Equity Partners",
        points: [
          {
            title: "Speed and decisiveness",
            body:
              "Andorran development moves fast and we move with it — clear decisions, short loops, and no wasted cycles between sourcing and signature.",
          },
          {
            title: "Trust earned, not assumed",
            body:
              "Two decades of disciplined execution across the Principality, with transparent reporting and zero surprises for the investors we represent.",
          },
          {
            title: "Precision over volume",
            body:
              "We curate a tight pipeline of institutional-grade opportunities, focused on quality and fit rather than chasing scale at the cost of conviction.",
          },
        ],
      },
      aria: {
        partnersLink: "View all local partners",
        partnersMarquee: "Local partner logos",
        metricsStrip: "Equity Partners metrics",
        whyEquityImage: "Equity Partners development and Andorra property view",
        testImageBreak: "Andorra night landscape",
        carouselNav: "Project carousel navigation",
        projectCardLabel: "View all projects",
        goToProject: "Go to project",
      },
      testImageBreak: {
        quote:
          "We open the door to Andorra's high-barrier foreign investment landscape, bridging the gap between global capital and Andorran opportunity.",
      },
      andorraAdvantage: {
        eyebrow: "The Andorra Advantage",
        title: "Why Andorra",
        intro:
          "We open the doors to Andorra's exclusive investment landscape by providing a structural bridge that allows international firms to deploy capital into Andorra without compromising on institutional standards.",
        cta: "Explore More Advantages",
        items: [
          {
            label: "Fiscal Advantage",
            title: "Institutional-Grade Tax Efficiency",
            body:
              "Andorra offers a capped 10% corporate and personal tax regime, paired with 0% wealth and inheritance taxes — creating a high-performance environment for capital reinvestment and long-term wealth preservation.",
          },
          {
            label: "Stability",
            title: "Sovereign Safe-Haven Status",
            body:
              "With 700 years of political neutrality and a \"Stable\" outlook from major credit agencies, the Principality provides a secure jurisdiction for risk mitigation against global geopolitical and economic volatility.",
          },
          {
            label: "Scarcity",
            title: "Natural Real Estate Appreciation",
            body:
              "With only 4% of land being buildable, the natural supply-side constraint ensures long-term asset value growth. This scarcity, combined with rising global demand, creates a high-conviction investment play.",
          },
          {
            label: "Connectivity",
            title: "Strategic European Integration",
            body:
              "Andorra is advancing its Association Agreement with the EU, giving investors a unique best-of-both-worlds scenario: full sovereign fiscal autonomy with operational access to major European markets.",
          },
        ],
      },
      whatWeOffer: {
        eyebrow: "What we offer",
        title: "Three ways to invest in Andorra",
        introBefore:
          "Choose between predictable contractual income or active participation in a specific Andorran development project. Returns are calibrated per project and shared during your call. See the structures on our ",
        introLinkLabel: "Invest page",
        introAfter: " for the full picture.",
        badgePopular: "Most popular",
        requestCta: "Request video call",
        ctaMore: "More investment information",
        returnLabel: "Headline return",
        returnSub: "Return varies per project · shared on your call",
        debt: {
          role: "Andorra Real Estate Fund",
          title: "Debt",
          subtitle: "Passive Investment · Lowest Risk",
          desc:
            "You lend capital to the project and receive a contractual annual coupon. Your position sits senior in the capital stack and is secured against the underlying real estate, with no exposure to project upside or downside.",
          returnValue: "Annual coupon",
          features: [
            "Predictable contractual payments, with no project performance exposure",
            "Capital secured against the property, senior to equity in repayment priority",
            "Fully passive, with no involvement once committed",
          ],
        },
        debtEquity: {
          role: "Direct Project Financing",
          title: "Debt + Equity",
          subtitle: "Active Investment · Balanced Risk + Upside",
          desc:
            "Part of your capital earns a contractual coupon, while the rest takes an ownership stake, so you get recurring income while the project runs and share in the upside at exit. You participate directly in the project's progress.",
          returnValue: "Annual coupon + Equity upside",
          features: [
            "Recurring contractual income on the debt portion while the project develops",
            "Equity profit share at exit on the equity portion",
            "Active participation in the project you back, with a direct stake in its success",
          ],
        },
        equityStrip: {
          role: "Direct Project Financing",
          title: "Equity",
          subtitle: "Active Investment · Highest Upside",
          desc:
            "Take a pure ownership stake in a single project and share fully in the profit at exit, with the highest return potential of the three structures and the longest typical hold. Less common than Debt + Equity, but available on request for investors comfortable with full project exposure.",
          cta: "Request video call",
        },
      },
      timeline: {
        eyebrow: "Timeline",
        title: "The Investment Roadmap",
        intro:
          "A streamlined onboarding process designed to move you from initial inquiry to active capital deployment.",
        cta: "Contact our Team",
        stepPrefix: "Step",
        steps: [
          {
            title: "Contact our Team",
            body: "Initial conversation to understand your profile and Andorra interest.",
          },
          {
            title: "Consultation Call",
            body: "Map timeline, returns, and the strategic route forward.",
          },
          {
            title: "Select Opportunity",
            body: "We present opportunities matched to your mandate.",
          },
          {
            title: "KYC & Compliance",
            body: "Onboarding and checks before capital commitment.",
          },
          {
            title: "Capital Deployment",
            body: "Capital is deployed and project execution begins.",
          },
        ],
      },
      gateway: {
        eyebrow: "Contact our Team",
        title: "Start your Andorra investment journey",
        intro:
          "Schedule a confidential consultation with our team to explore aligned opportunities in the Principality.",
        requestTitle: "Request additional investor information",
        requestBody:
          "Let our team reach out to you to analyze your investment profile and investment objectives.",
        contactCta: "Contact our Team",
        scheduleCta: "1-1 strategy call",
      },
      featuredDevelopments: {
        eyebrow: "Featured Developments",
        title: "View our properties under development",
        intro: "Balanced proof architecture: demonstrated execution plus visible momentum.",
        viewLabel: "View",
        valueLabel: "Value",
        statusLabel: "Status",
        sectorLabel: "Sector",
        viewAllCta: "View All Projects",
      },
      suggestedReads: {
        eyebrow: "Suggested Reads",
        title: "Continue exploring the Andorran market.",
        ctaMore: "See more insights",
      },
      statusLabels: {
        "Under Construction": "Under Construction",
        "Under development": "Under development",
        "Pipeline": "Pipeline",
        "Financing Open": "Financing Open",
        "Completed": "Completed",
      },
      sectorLabels: {
        "Luxury Residential": "Luxury Residential",
      },
    },
    newsletter: {
      eyebrow: "Newsletter",
      title: "Stay informed on Andorra opportunities.",
      emailLabel: "Email address",
      emailPlaceholder: "Enter your email",
      submit: "Subscribe",
      note: "We send selective updates only. No spam.",
      validationError: "Please enter a valid email address.",
      submitting: "Submitting...",
      success: "Thanks for subscribing.",
      error: "Something went wrong. Please try again.",
    },
    contact: {
      eyebrow: "Investor Inquiry",
      title: "Discuss your Andorra investment options",
      intro:
        "Reach out to our team to answer any Andorra investment questions you may have, or for any additional information you may require.",
      form: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        company: "Company (optional)",
        investorType: "Investor type",
        investorTypeOptions: [
          "Individual investor",
          "Angel investor",
          "Venture capital",
          "Family office",
          "Institutional investor",
        ],
        investmentTimeline: "Investment Timeline",
        investmentTimelineOptions: [
          "Immediately",
          "Within 3 months",
          "3–6 months",
          "Just exploring",
        ],
        investmentRange: "Investment Range",
        investmentRangeOptions: [
          "Less than 1M",
          "1M to 10M",
          "10M +",
          "Not sure yet",
        ],
        message: "Is there anything else you would like to share with us?",
        submit: "Send Enquiry",
        sending: "Sending…",
        success: "Thank you — your message has been received. Our team will get back to you shortly.",
        error: "Something went wrong sending your message. Please try again, or email us directly.",
      },
      cardEyebrow: "Contact Us",
      officeLabel: "Come By Our Office",
    },
    privacy: {
      eyebrow: "Privacy Policy",
      title: "Privacy Policy",
      intro:
        "Equity Partners is committed to the highest standards of data protection and transparency. This policy outlines our practices regarding the collection, use, and safeguarding of personal data when you visit our website, contact us, or request investor information.",
      updated: "Last updated: March 31, 2026",
      sections: [
        {
          title: "Commitment to data protection",
          body: [
            "This privacy policy is designed to reflect the principles of transparency, proportionality, and lawful processing expected under applicable data protection standards, including the Andorran data protection framework and, where relevant, the EU General Data Protection Regulation.",
          ],
        },
        {
          title: "Data controller",
          body: [
            "The entity responsible for the processing of your personal data is Equity Partners.",
            "If you have any privacy-related questions or wish to exercise your rights, you can contact us at info@equitypartners.fund.",
          ],
        },
        {
          title: "Categories of personal data",
          body: [
            "We process the following categories of personal data depending on your interaction with our platform:",
          ],
          bullets: [
            "Identity and contact data such as your name, email address, phone number, and company details.",
            "Consultation and enquiry data you submit through contact forms, newsletter forms, or investor requests.",
            "Professional and investor-related information you voluntarily share with us.",
            "Technical data such as IP address, browser type, device information, and usage patterns collected via cookies.",
          ],
        },
        {
          title: "How we use personal data",
          body: ["We may use personal information to:"],
          bullets: [
            "Respond to enquiries and investor requests.",
            "Share relevant updates, market insights, or project information.",
            "Improve the website, its performance, and user experience.",
            "Maintain internal records and satisfy legal, accounting, compliance, or reporting obligations.",
          ],
        },
        {
          title: "Legal basis for processing",
          body: [
            "Where applicable, personal data may be processed on the basis of consent, legitimate interest, steps taken at your request prior to a potential professional relationship, or compliance with legal obligations.",
          ],
        },
        {
          title: "Retention",
          body: [
            "We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including for legal, accounting, or reporting requirements. Consultation data is typically retained for up to 5 years following the end of the professional relationship, unless a longer retention period is required by law.",
          ],
        },
        {
          title: "Your rights",
          body: [
            "Under applicable privacy laws, including the Andorran LQPD and GDPR where relevant, you may have the right to:",
          ],
          bullets: [
            "Request access to the personal data we hold about you.",
            "Request correction of inaccurate or incomplete data.",
            "Request deletion of data where lawful grounds allow.",
            "Request restriction of processing in certain circumstances.",
            "Object to certain processing activities.",
            "Withdraw consent where processing relies on consent.",
          ],
        },
        {
          title: "Security measures",
          body: [
            "We have implemented robust security measures to prevent your personal data from being accidentally lost, used, altered, disclosed, or accessed in an unauthorized way. Access to personal data is limited to those employees, contractors, or advisers who have a business need to know.",
          ],
        },
        {
          title: "Cookies and related technologies",
          body: [
            "We may use cookies and similar technologies to understand website usage, improve performance, and support user experience. Technical information such as IP address, browser type, device information, and usage patterns may be collected through these tools.",
          ],
        },
        {
          title: "Contact us",
          body: [
            "If you have questions about this policy or how your data is handled, please contact info@equitypartners.fund.",
          ],
        },
      ],
      contactCta: "Contact Us",
    },
    about: {
      hero: {
        title: "Your strategic partner for Andorran investment success",
        copy:
          "With local market depth and an international investment lens, our team helps investors access Andorra through disciplined execution, trusted relationships, and long-term strategic alignment.",
      },
      proof: {
        label: "What we do",
        title: "High-barrier access. Disciplined execution.",
        subtitle: "We are the strategic gateway to Andorra's evolving real estate landscape.",
        metrics: [
          { label: "Years of Andorran expertise" },
          { label: "Identified project pipeline value" },
          { label: "Square meters under development" },
          { label: "Strategic local partnerships" },
        ],
      },
      whyEquity: {
        eyebrow: "Work with the best",
        title: "Why Equity Partners",
        intro:
          "We combine local market access with disciplined execution standards, helping investors approach Andorra through a more structured, informed, and institutionally aligned lens.",
        cta: "About Equity Partners",
        points: [
          {
            title: "We move faster than the market",
            body:
              "Our sourcing happens before assets reach public listings. By the time most investors are aware of an opportunity, we have already evaluated it.",
          },
          {
            title: "Andorra can be complex, we remove that complexity",
            body:
              "Between foreign investment limits, tax structuring, and planning approvals, the margin for error is high. We de-risk the process end to end.",
          },
          {
            title: "We only provide opportunities we can deliver",
            body:
              "We don't chase volume. Every investor relationship is selective, allowing us to commit fully to each opportunity we represent.",
          },
        ],
      },
      team: {
        eyebrow: "Meet the team",
        title: "Core Equity Partners Team",
        intro: "The people behind Equity Partners — combining local Andorran expertise with international investment experience.",
        members: [
          {
            role: "CEO & Co-founder",
            description:
              "International investor with over 30 years of experience in sales and marketing real estate projects across Europe, providing strategic capital and access to high-net-worth networks",
          },
          {
            role: "Lawyer & co-founder",
            description:
              "Expert in investment structuring and projects financing. Oriol leads the project legal and financing strategy, as well as overseeing transaction structuring, financial modeling and investor relations.",
          },
          {
            role: "Technical Architect",
            description:
              "With over 25 years of extensive expertise in real estate investment, land acquisition and strategic development. Carlos combines his deep knowledge of the Andorran market with a strong international outlook.",
          },
          {
            role: "Partnerships & Sales",
            description:
              "With a Master degree in Digital Business from the University of Amsterdam and 4 years of experience at Salesforce, Bing's international past and results-oriented mindset brings deep knowledge of digital acquisition.",
          },
          {
            role: "Digital Marketing",
            description:
              "Directing our creative strategy, Tekke translates our institutional values into a world-class visual identity and seamless digital experience for our investors.",
          },
          {
            role: "Legal Analyst",
            description:
              "Laia oversees the intersection of legal framework and investor onboarding, ensuring every transaction adheres to the highest standards of Andorran compliance.",
          },
          {
            role: "Strategic Role",
            description:
              "Placeholder profile text for a future team member card. This can be updated with real biography details later.",
          },
        ],
      },
      cta: {
        title: "Explore our current portfolio or discuss a strategic mandate.",
        button: "Contact Our Team",
      },
    },
    partners: {
      eyebrow: "Our Local Partners",
      title: "Trusted relationships across the Andorran ecosystem.",
      intro:
        "Our delivery model is built on deep local partnerships that strengthen project certainty from planning to execution.",
      entries: [
        {
          role: "Expert Residency Service",
          summary:
            "Andorra Resident provides specialized legal and fiscal advisory services designed to help international entrepreneurs and investors navigate the residency process and optimize their tax position in the Principality. Their expert team offers a seamless, end-to-end relocation experience, managing everything from immigration documentation to company formation and local fiscal compliance.",
        },
        {
          role: "Legal & Compliance",
          summary:
            "Emindset Law is a pioneering legal firm specializing in real estate, corporate law, and asset structuring within Andorra and the international market. Their multidisciplinary team provides comprehensive legal and fiscal due diligence, ensuring that every project is executed with maximum regulatory compliance and strategic efficiency.",
        },
        {
          role: "Regulatory Ecosystem",
          summary:
            "The Govern d'Andorra establishes the strategic legislative framework and sustainability standards that ensure orderly real estate development and economic growth across the Principality. They ensure every development meets the highest standards of institutional compliance and delivery readiness.",
        },
        {
          role: "Architecture & Urbanism",
          summary:
            "DATA Arquitectura is a prime Andorran studio specializing in cutting-edge architectural design, strategic urban planning, and bespoke interior solutions. Renowned for their work on iconic landmarks they combine technical precision with exceptional creativity to deliver high-quality, sustainable spaces across the Principality.",
        },
        {
          role: "Luxury Real Estate",
          summary:
            "As a leading international brokerage specializing in the premium segment, Engel & Völkers provides a team of local experts offering deep market insights and professional consultancy, ensuring every transaction is handled with the discretion and prestige that define the Andorran luxury market.",
        },
        {
          role: "Financial Services",
          summary:
            "MoraBanc provides a comprehensive suite of corporate financing solutions, including specialized business mortgages and strategic credit facilities tailored for large-scale real estate and commercial developments.",
        },
        {
          role: "High-End Modular Construction",
          summary:
            "A pioneer in high-end industrialized construction, Prêt-à-porter delivers bespoke, energy-efficient homes in Andorra with unprecedented speed and fixed-cost certainty. They combine high-quality modern architectural design with sustainable practices.",
        },
        {
          role: "Infrastructure & Construction",
          summary:
            "As the undisputed leader in Andorra's construction and infrastructure sector, Grup Heracles provides comprehensive solutions for complex civil engineering and large-scale building projects.",
        },
        {
          role: "Industrialized Sustainable Construction",
          summary:
            "Hormipresa specializes in high-performance industrialized construction using architectural precast concrete. Their innovative system allows for the rapid delivery of high-quality residential and commercial projects.",
        },
        {
          role: "Construction Partner",
          summary:
            "Mariné Construccions is a trusted Andorran construction partner delivering high-quality residential developments with deep local expertise.",
        },
      ],
    },
    blog: {
      listing: {
        eyebrow: "Latest Insights",
        title: "Insights on Andorra real estate investment and execution.",
        intro:
          "Strategic analysis, project updates, and practical market intelligence for institutional and private investors.",
      },
      article: {
        breadcrumb: "Blog / Back to Insights",
        asideKicker: "What We Do",
        asideLabel: "Equity Partners",
        asideCopy:
          "Equity Partners helps investors access Andorra's most compelling real estate opportunities through our trusted local network, regulatory expertise, and full-cycle project development execution. If you are exploring investment opportunities in Andorra's high-potential real estate market, our team would be pleased to speak with you.",
        asideCta: "Contact Us",
        sourcesTitle: "Sources",
        suggestedEyebrow: "Suggested Reads",
        suggestedTitle: "Continue exploring the Andorran market.",
      },
    },
    terms: {
      eyebrow: "Terms of Use",
      title: "Terms governing access to the Equity Partners website.",
      intro:
        "These Terms of Use explain the rules for accessing and using the Equity Partners website, the limitations of the information presented on it, and the responsibilities of visitors interacting with our content, enquiry forms, and materials.",
      updated: "Last updated: March 31, 2026",
      sections: [
        { title: "Acceptance of these terms", body: ["By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree with these terms, you should not use this website.", "These terms govern your access to and use of the website and materials provided by Equity Partners."] },
        { title: "Use of the website", body: ["You agree to use this website only for lawful purposes and in a way that does not interfere with its operation."], bullets: ["Do not use the website for any fraudulent, misleading, or unlawful purpose.", "Do not attempt to interfere with the proper working of the website or bypass any security measures.", "Do not misuse forms, automated tools, or site content in a way that could harm the platform or its users."] },
        { title: "Informational content only", body: ["Content on this website is provided for general informational purposes only. It does not constitute legal, tax, investment, residency, or financial advice, and should not be relied on as a substitute for professional advice tailored to your individual circumstances.", "No professional-client relationship is established merely by your use of this website, any calculator, eligibility form, guide, or informational material presented through it."] },
        { title: "No guarantee of availability or accuracy", body: ["We aim to keep the website current and reliable, but we do not guarantee that all information will always be complete, accurate, or up to date. Market conditions, regulations, and project details may change without notice.", "Even where we strive to keep the site updated on evolving legal, regulatory, or market topics, Equity Partners makes no warranty or representation as to the completeness, accuracy, or continuing validity of website content."] },
        { title: "Intellectual property", body: ["Unless otherwise stated, the design, branding, text, graphics, layout, and other content on this website are the property of Equity Partners or its licensors and may not be copied, reproduced, or redistributed without prior written permission."] },
        { title: "Third-party links", body: ["This website may contain links to third-party websites or resources. These links are provided for convenience only. Equity Partners is not responsible for the content, availability, or privacy practices of those external sites."] },
        { title: "Limitation of liability", body: ["To the maximum extent permitted by applicable law, Equity Partners shall not be liable for any loss or damage arising out of or in connection with your use of, or inability to use, this website or reliance on any material available through it.", "This includes, to the extent permitted by law, direct, indirect, incidental, special, or consequential damages, even where Equity Partners has been advised of the possibility of such damages."] },
        { title: "Governing law and jurisdiction", body: ["These Terms of Use shall be governed by the laws applicable in the Principality of Andorra. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the Courts of Andorra."] },
        { title: "Changes to these terms", body: ["We may update these Terms of Use from time to time. Continued use of the website after changes are published will constitute acceptance of the revised terms.", "We recommend reviewing this page periodically so you remain aware of the current version in force."] },
        { title: "Contact us", body: ["If you have questions about these Terms of Use, please contact info@equitypartners.fund."] },
      ],
      contactCta: "Contact Us",
    },
    cookies: {
      eyebrow: "Cookies",
      title: "How Equity Partners uses cookies and similar technologies.",
      intro:
        "This Cookie Policy explains how Equity Partners uses cookies and similar technologies when you visit our website, why we use them, and what choices you have regarding their use.",
      updated: "Last updated: March 31, 2026",
      sections: [
        { title: "What are cookies?", body: ["Cookies are small data files placed on your computer or mobile device when you visit a website. Cookies are widely used to make websites work, improve performance, and provide reporting information."] },
        { title: "Why we use cookies", body: ["We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons so the website can function properly, while others help us understand usage, improve performance, and enhance user experience."] },
        { title: "Types of cookies we may use", bullets: ["Strictly necessary cookies needed for the core operation of the site.", "Performance and analytics cookies that help us understand how the site is used.", "Functionality cookies that remember your preferences and improve your experience."] },
        { title: "Your choices", body: ["You have the right to decide whether to accept or reject cookies. You can do this through any cookie banner or preference tool we may provide, or by adjusting your browser settings directly.", "Most browsers allow you to block or delete cookies. The exact method varies by browser and version."] },
        { title: "Changes to this policy", body: ["We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, or legal requirements. Please review this page periodically to stay informed."] },
        { title: "Contact us", body: ["If you have questions about our use of cookies or similar technologies, please contact info@equitypartners.fund."] },
      ],
      contactCta: "Contact Us",
    },
  },
  es: {
    home: {
      hero: {
        kicker: "ANDORRA • INVERSIÓN • EXCELENCIA",
        title: "Su socio estratégico para invertir en inmuebles en Andorra.",
        subline:
          "Nuestro equipo de profesionales ofrece a los inversores internacionales una experiencia fluida de acceso al mercado inmobiliario de alta barrera de Andorra.",
        cta: "Contactar con el equipo",
        ctaSecondary: "Solicitar videollamada",
      },
      localPartnersTitle: "NUESTROS SOCIOS LOCALES",
      services: {
        eyebrow: "Equity Partners",
        title: "Qué hacemos",
        intro:
          "Abrimos las puertas al exclusivo panorama de inversión de Andorra mediante un puente estructural que permite a firmas internacionales desplegar capital en Andorra sin comprometer estándares institucionales.",
        cta: "Sobre Equity Partners",
        cards: [
          {
            title: "Desarrollo integral de proyectos",
            bullets: [
              "De la viabilidad a la entrega",
              "Suelos de alto potencial",
              "Activos de nivel institucional",
            ],
          },
          {
            title: "Red local y acceso exclusivo",
            bullets: [
              "Oportunidades off-market",
              "Relación directa con propietarios",
              "Profundo conocimiento de Andorra",
            ],
          },
          {
            title: "Experiencia regulatoria y estructural",
            bullets: [
              "Navegación normativa",
              "Estrategias ejecutables",
              "Alineación institucional",
            ],
          },
        ],
      },
      metrics: {
        eyebrow: "Equity Partners en cifras",
        items: [
          { value: "20+", label: "Años de experiencia en Andorra" },
          { value: "EUR1B+", label: "Valor del pipeline de proyectos identificado" },
          { value: "100k+", label: "Metros cuadrados en desarrollo" },
          { value: "10+", label: "Alianzas locales estratégicas" },
        ],
      },
      whyEquity: {
        eyebrow: "Trabaje con los mejores",
        title: "Por qué Equity Partners",
        intro:
          "Combinamos acceso al mercado local con estándares disciplinados de ejecución, ayudando a los inversores a entrar en Andorra con un enfoque más estructurado, informado y alineado institucionalmente.",
        cta: "Sobre Equity Partners",
        points: [
          {
            title: "Rapidez y decisión",
            body:
              "El desarrollo en Andorra se mueve rápido y nosotros también — decisiones claras, ciclos cortos y sin tiempo perdido entre el sourcing y la firma.",
          },
          {
            title: "Confianza ganada, no presupuesta",
            body:
              "Dos décadas de ejecución disciplinada en el Principado, con reportes transparentes y cero sorpresas para los inversores que representamos.",
          },
          {
            title: "Precisión por encima del volumen",
            body:
              "Curamos un pipeline reducido de oportunidades de nivel institucional, centrados en calidad y encaje en lugar de perseguir escala a costa de convicción.",
          },
        ],
      },
      aria: {
        partnersLink: "Ver todos los socios locales",
        partnersMarquee: "Logotipos de socios locales",
        metricsStrip: "Métricas de Equity Partners",
        whyEquityImage: "Desarrollo de Equity Partners y vista inmobiliaria de Andorra",
        testImageBreak: "Paisaje nocturno de Andorra",
        carouselNav: "Navegación del carrusel de proyectos",
        projectCardLabel: "Ver todos los proyectos",
        goToProject: "Ir al proyecto",
      },
      testImageBreak: {
        quote:
          "Abrimos la puerta al panorama de inversión extranjera de alta barrera de Andorra, conectando el capital global con la oportunidad andorrana.",
      },
      andorraAdvantage: {
        eyebrow: "La ventaja andorrana",
        title: "Por qué Andorra",
        intro:
          "Abrimos las puertas al exclusivo panorama de inversión de Andorra mediante un puente estructural que permite a firmas internacionales desplegar capital en Andorra sin comprometer estándares institucionales.",
        cta: "Explorar más ventajas",
        items: [
          {
            label: "Ventaja fiscal",
            title: "Eficiencia fiscal de nivel institucional",
            body:
              "Andorra ofrece un régimen fiscal con tope del 10% para sociedades y personas físicas, combinado con un 0% en impuestos sobre el patrimonio y sucesiones — creando un entorno de alto rendimiento para la reinversión de capital y la preservación de patrimonio a largo plazo.",
          },
          {
            label: "Estabilidad",
            title: "Estatus soberano de refugio seguro",
            body:
              "Con 700 años de neutralidad política y una perspectiva «Estable» de las principales agencias de calificación, el Principado ofrece una jurisdicción segura para mitigar el riesgo frente a la volatilidad geopolítica y económica global.",
          },
          {
            label: "Escasez",
            title: "Revalorización inmobiliaria natural",
            body:
              "Con solo un 4% del suelo edificable, la restricción natural de oferta asegura el crecimiento del valor de los activos a largo plazo. Esta escasez, unida a una demanda global en aumento, genera una tesis de inversión de alta convicción.",
          },
          {
            label: "Conectividad",
            title: "Integración europea estratégica",
            body:
              "Andorra avanza en su Acuerdo de Asociación con la UE, ofreciendo a los inversores un escenario único: plena autonomía fiscal soberana con acceso operativo a los principales mercados europeos.",
          },
        ],
      },
      whatWeOffer: {
        eyebrow: "Qué ofrecemos",
        title: "Tres formas de invertir en Andorra",
        introBefore:
          "Elija entre una renta contractual predecible o la participación activa en un proyecto específico de desarrollo andorrano. Las rentabilidades se calibran por proyecto y se comparten durante su llamada. Consulte las estructuras en nuestra ",
        introLinkLabel: "página de Inversión",
        introAfter: " para una visión completa.",
        badgePopular: "Más popular",
        requestCta: "Solicitar videollamada",
        ctaMore: "Más información sobre inversión",
        returnLabel: "Rentabilidad principal",
        returnSub: "La rentabilidad varía por proyecto · se comparte en su llamada",
        debt: {
          role: "Fondo Inmobiliario de Andorra",
          title: "Deuda",
          subtitle: "Inversión pasiva · Riesgo más bajo",
          desc:
            "Usted presta capital al proyecto y recibe un cupón anual contractual. Su posición es preferente dentro de la estructura de capital y está garantizada por el inmueble subyacente, sin exposición al beneficio o pérdida del proyecto.",
          returnValue: "Cupón anual",
          features: [
            "Pagos contractuales predecibles, sin exposición al rendimiento del proyecto",
            "Capital garantizado por la propiedad, preferente sobre la equity en prioridad de pago",
            "Totalmente pasivo, sin participación una vez comprometido",
          ],
        },
        debtEquity: {
          role: "Financiación directa de proyecto",
          title: "Deuda + Equity",
          subtitle: "Inversión activa · Riesgo equilibrado + Plusvalía",
          desc:
            "Parte de su capital genera un cupón contractual, mientras que el resto toma una participación en el proyecto, obteniendo así renta recurrente durante la ejecución y participando en la plusvalía en la salida. Usted participa directamente en el avance del proyecto.",
          returnValue: "Cupón anual + Plusvalía de equity",
          features: [
            "Renta contractual recurrente sobre la parte de deuda durante el desarrollo del proyecto",
            "Reparto de beneficios de equity en la salida sobre la parte de equity",
            "Participación activa en el proyecto que respalda, con una participación directa en su éxito",
          ],
        },
        equityStrip: {
          role: "Financiación directa de proyecto",
          title: "Equity",
          subtitle: "Inversión activa · Mayor potencial de plusvalía",
          desc:
            "Toma una participación íntegra en un único proyecto y comparte plenamente en el beneficio en la salida, con el mayor potencial de rentabilidad de las tres estructuras y el plazo de tenencia típico más largo. Menos habitual que Deuda + Equity, pero disponible bajo petición para inversores cómodos con la exposición total al proyecto.",
          cta: "Solicitar videollamada",
        },
      },
      timeline: {
        eyebrow: "Recorrido",
        title: "La hoja de ruta de la inversión",
        intro:
          "Un proceso de incorporación optimizado para guiarle desde el contacto inicial hasta el despliegue activo del capital.",
        cta: "Contactar con el equipo",
        stepPrefix: "Paso",
        steps: [
          {
            title: "Contactar con el equipo",
            body: "Conversación inicial para entender su perfil y su interés por Andorra.",
          },
          {
            title: "Llamada de consultoría",
            body: "Calendario, rentabilidades y trazado de la ruta estratégica.",
          },
          {
            title: "Seleccionar oportunidad",
            body: "Le presentamos oportunidades acordes con su mandato.",
          },
          {
            title: "KYC y Cumplimiento",
            body: "Onboarding y verificaciones antes del compromiso de capital.",
          },
          {
            title: "Despliegue de capital",
            body: "Se despliega el capital y comienza la ejecución del proyecto.",
          },
        ],
      },
      gateway: {
        eyebrow: "Contactar con el equipo",
        title: "Comience su recorrido de inversión en Andorra",
        intro:
          "Programe una consulta confidencial con nuestro equipo para explorar oportunidades alineadas en el Principado.",
        requestTitle: "Solicitar información adicional para inversores",
        requestBody:
          "Permita que nuestro equipo se ponga en contacto con usted para analizar su perfil y objetivos de inversión.",
        contactCta: "Contactar con el equipo",
        scheduleCta: "Llamada estratégica 1-1",
      },
      featuredDevelopments: {
        eyebrow: "Desarrollos destacados",
        title: "Vea nuestras propiedades en desarrollo",
        intro: "Una arquitectura de pruebas equilibrada: ejecución demostrada y momentum visible.",
        viewLabel: "Ver",
        valueLabel: "Valor",
        statusLabel: "Estado",
        sectorLabel: "Sector",
        viewAllCta: "Ver todos los proyectos",
      },
      suggestedReads: {
        eyebrow: "Lecturas sugeridas",
        title: "Continúe explorando el mercado andorrano.",
        ctaMore: "Ver más artículos",
      },
      statusLabels: {
        "Under Construction": "En construcción",
        "Under development": "En desarrollo",
        "Pipeline": "En cartera",
        "Financing Open": "Financiación abierta",
        "Completed": "Completado",
      },
      sectorLabels: {
        "Luxury Residential": "Residencial de lujo",
      },
    },
    newsletter: {
      eyebrow: "Boletín",
      title: "Manténgase informado sobre oportunidades en Andorra.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "Introduzca su correo",
      submit: "Suscribirse",
      note: "Enviamos solo actualizaciones selectivas. Sin spam.",
      validationError: "Introduzca un correo electrónico válido.",
      submitting: "Enviando...",
      success: "Gracias por suscribirse.",
      error: "Algo salió mal. Inténtelo de nuevo.",
    },
    contact: {
      eyebrow: "Consulta de inversor",
      title: "Hable sobre sus opciones de inversión en Andorra",
      intro:
        "Póngase en contacto con nuestro equipo para resolver cualquier duda sobre inversión en Andorra o para solicitar información adicional.",
      form: {
        firstName: "Nombre",
        lastName: "Apellidos",
        email: "Correo electrónico",
        company: "Empresa (opcional)",
        investorType: "Tipo de inversor",
        investorTypeOptions: [
          "Inversor individual",
          "Business angel",
          "Capital riesgo",
          "Family office",
          "Inversor institucional",
        ],
        investmentTimeline: "Horizonte de inversión",
        investmentTimelineOptions: [
          "Inmediatamente",
          "En un plazo de 3 meses",
          "3–6 meses",
          "Solo explorando",
        ],
        investmentRange: "Rango de inversión",
        investmentRangeOptions: [
          "Menos de 1M",
          "1M a 10M",
          "10M +",
          "Aún no lo sé",
        ],
        message: "¿Hay algo más que quisiera compartir con nosotros?",
        submit: "Enviar consulta",
        sending: "Enviando…",
        success: "Gracias — hemos recibido su mensaje. Nuestro equipo le responderá en breve.",
        error: "Ha ocurrido un error al enviar su mensaje. Inténtelo de nuevo o escríbanos directamente.",
      },
      cardEyebrow: "Contacto",
      officeLabel: "Visite nuestra oficina",
    },
    privacy: {
      eyebrow: "Política de privacidad",
      title: "Política de privacidad",
      intro:
        "Equity Partners está comprometida con los más altos estándares de protección de datos y transparencia. Esta política describe nuestras prácticas sobre la recopilación, uso y protección de los datos personales cuando visita nuestro sitio web, nos contacta o solicita información para inversores.",
      updated: "Última actualización: 31 de marzo de 2026",
      sections: [
        {
          title: "Compromiso con la protección de datos",
          body: [
            "Esta política de privacidad está diseñada para reflejar los principios de transparencia, proporcionalidad y tratamiento lícito exigidos por las normativas de protección de datos aplicables, incluido el marco andorrano de protección de datos y, cuando corresponda, el Reglamento General de Protección de Datos de la UE.",
          ],
        },
        {
          title: "Responsable del tratamiento",
          body: [
            "La entidad responsable del tratamiento de sus datos personales es Equity Partners.",
            "Si tiene cualquier pregunta relacionada con la privacidad o desea ejercer sus derechos, puede contactarnos en info@equitypartners.fund.",
          ],
        },
        {
          title: "Categorías de datos personales",
          body: [
            "Tratamos las siguientes categorías de datos personales según su interacción con nuestra plataforma:",
          ],
          bullets: [
            "Datos de identidad y contacto, como su nombre, correo electrónico, número de teléfono y datos de su empresa.",
            "Datos de consultas que envía a través de formularios de contacto, formularios de newsletter o solicitudes de inversores.",
            "Información profesional y relacionada con su perfil inversor que comparte voluntariamente con nosotros.",
            "Datos técnicos como la dirección IP, el tipo de navegador, información del dispositivo y patrones de uso recogidos mediante cookies.",
          ],
        },
        {
          title: "Cómo utilizamos los datos personales",
          body: ["Podemos utilizar la información personal para:"],
          bullets: [
            "Responder a consultas y solicitudes de inversores.",
            "Compartir actualizaciones relevantes, análisis de mercado o información sobre proyectos.",
            "Mejorar el sitio web, su rendimiento y la experiencia de usuario.",
            "Mantener registros internos y cumplir obligaciones legales, contables, de cumplimiento o de reporting.",
          ],
        },
        {
          title: "Base legal del tratamiento",
          body: [
            "Cuando corresponda, los datos personales podrán tratarse sobre la base del consentimiento, el interés legítimo, las medidas adoptadas a petición suya antes de una posible relación profesional o el cumplimiento de obligaciones legales.",
          ],
        },
        {
          title: "Conservación",
          body: [
            "Conservamos sus datos personales solo durante el tiempo necesario para cumplir los fines para los que fueron recogidos, incluidos los requisitos legales, contables o de reporting. Los datos de consultas se conservan normalmente hasta 5 años tras el fin de la relación profesional, salvo que la ley exija un plazo de conservación más largo.",
          ],
        },
        {
          title: "Sus derechos",
          body: [
            "En virtud de las leyes de privacidad aplicables, incluida la LQPD andorrana y el RGPD cuando corresponda, puede tener derecho a:",
          ],
          bullets: [
            "Solicitar acceso a los datos personales que tenemos sobre usted.",
            "Solicitar la rectificación de datos inexactos o incompletos.",
            "Solicitar la supresión de datos cuando existan motivos legítimos.",
            "Solicitar la limitación del tratamiento en determinadas circunstancias.",
            "Oponerse a determinadas actividades de tratamiento.",
            "Retirar el consentimiento cuando el tratamiento se base en el consentimiento.",
          ],
        },
        {
          title: "Medidas de seguridad",
          body: [
            "Hemos implementado medidas de seguridad sólidas para evitar que sus datos personales se pierdan, usen, alteren, divulguen o se acceda a ellos de forma accidental o no autorizada. El acceso a los datos personales está limitado a los empleados, contratistas o asesores que tienen una necesidad empresarial de conocerlos.",
          ],
        },
        {
          title: "Cookies y tecnologías relacionadas",
          body: [
            "Podemos utilizar cookies y tecnologías similares para entender el uso del sitio web, mejorar el rendimiento y favorecer la experiencia de usuario. A través de estas herramientas puede recogerse información técnica como la dirección IP, el tipo de navegador, información del dispositivo y patrones de uso.",
          ],
        },
        {
          title: "Contacto",
          body: [
            "Si tiene preguntas sobre esta política o sobre cómo se tratan sus datos, contacte con info@equitypartners.fund.",
          ],
        },
      ],
      contactCta: "Contacto",
    },
    about: {
      hero: {
        title: "Su socio estratégico para el éxito inversor en Andorra",
        copy: "Con profundidad de mercado local y una visión internacional de inversión, nuestro equipo ayuda a los inversores a acceder a Andorra mediante ejecución disciplinada, relaciones de confianza y alineación estratégica a largo plazo.",
      },
      proof: {
        label: "Qué hacemos",
        title: "Acceso de alta barrera. Ejecución disciplinada.",
        subtitle: "Somos la puerta estratégica al cambiante panorama inmobiliario de Andorra.",
        metrics: [
          { label: "Años de experiencia en Andorra" },
          { label: "Valor del pipeline de proyectos identificado" },
          { label: "Metros cuadrados en desarrollo" },
          { label: "Alianzas locales estratégicas" },
        ],
      },
      whyEquity: {
        eyebrow: "Trabaje con los mejores",
        title: "Por qué Equity Partners",
        intro:
          "Combinamos acceso al mercado local con estándares disciplinados de ejecución, ayudando a los inversores a entrar en Andorra con un enfoque más estructurado, informado y alineado institucionalmente.",
        cta: "Sobre Equity Partners",
        points: [
          {
            title: "Nos movemos más rápido que el mercado",
            body:
              "Nuestro sourcing ocurre antes de que los activos lleguen a los listados públicos. Para cuando la mayoría de inversores conoce una oportunidad, nosotros ya la hemos evaluado.",
          },
          {
            title: "Andorra es compleja — nosotros eliminamos esa complejidad",
            body:
              "Entre los límites de inversión extranjera, la estructuración fiscal y los permisos urbanísticos, el margen de error es alto. Gestionamos el proceso de principio a fin para eliminarlo.",
          },
          {
            title: "Solo ofrecemos oportunidades que podemos ejecutar",
            body:
              "No perseguimos volumen. Cada relación con inversores es selectiva, lo que nos permite comprometernos plenamente con cada oportunidad que representamos.",
          },
        ],
      },
      team: {
        eyebrow: "Conozca al equipo",
        title: "Equipo principal de Equity Partners",
        intro: "Las personas detrás de Equity Partners: experiencia local andorrana combinada con experiencia internacional en inversión.",
        members: [
          {
            role: "CEO y cofundador",
            description:
              "Inversor internacional con más de 30 años de experiencia en ventas y marketing de proyectos inmobiliarios en toda Europa, aportando capital estratégico y acceso a redes de alto patrimonio.",
          },
          {
            role: "Abogado y cofundador",
            description:
              "Experto en estructuración de inversiones y financiación de proyectos. Oriol lidera la estrategia legal y de financiación, así como la estructuración de transacciones, el modelado financiero y la relación con inversores.",
          },
          {
            role: "Arquitecto técnico",
            description:
              "Con más de 25 años de experiencia en inversión inmobiliaria, adquisición de suelo y desarrollo estratégico, Carlos combina su profundo conocimiento del mercado andorrano con una sólida visión internacional.",
          },
          {
            role: "Alianzas y ventas",
            description:
              "Con un máster en Digital Business por la Universidad de Ámsterdam y 4 años de experiencia en Salesforce, Bing aporta una mirada internacional y un conocimiento profundo de adquisición digital orientada a resultados.",
          },
          {
            role: "Marketing digital",
            description:
              "Dirigiendo nuestra estrategia creativa, Tekke traduce nuestros valores institucionales en una identidad visual de primer nivel y una experiencia digital fluida para nuestros inversores.",
          },
          {
            role: "Analista legal",
            description:
              "Laia supervisa la intersección entre el marco legal y la incorporación de inversores, garantizando que cada transacción cumpla los más altos estándares de cumplimiento andorrano.",
          },
          {
            role: "Rol estratégico",
            description:
              "Texto provisional para un futuro miembro del equipo. Puede actualizarse más adelante con una biografía real.",
          },
        ],
      },
      cta: {
        title: "Explore nuestra cartera actual o hable de un mandato estratégico.",
        button: "Contacte con nuestro equipo",
      },
    },
    partners: {
      eyebrow: "Nuestros socios locales",
      title: "Relaciones de confianza en todo el ecosistema andorrano.",
      intro: "Nuestro modelo de ejecución se apoya en alianzas locales profundas que refuerzan la certidumbre del proyecto desde la planificación hasta la ejecución.",
      entries: [
        {
          role: "Servicio experto en residencia",
          summary:
            "Andorra Resident ofrece asesoramiento legal y fiscal especializado para ayudar a empresarios e inversores internacionales a gestionar el proceso de residencia y optimizar su posición fiscal en el Principado. Su equipo experto ofrece una experiencia integral de reubicación, gestionando desde la documentación migratoria hasta la constitución de sociedades y el cumplimiento fiscal local.",
        },
        {
          role: "Legal y cumplimiento",
          summary:
            "Emindset Law es un despacho pionero especializado en inmobiliario, derecho corporativo y estructuración patrimonial en Andorra y en el mercado internacional. Su equipo multidisciplinar proporciona due diligence legal y fiscal integral, garantizando que cada proyecto se ejecute con el máximo cumplimiento normativo y eficiencia estratégica.",
        },
        {
          role: "Ecosistema regulatorio",
          summary:
            "El Govern d'Andorra establece el marco legislativo estratégico y los estándares de sostenibilidad que garantizan un desarrollo inmobiliario ordenado y el crecimiento económico del Principado. Asegura que cada desarrollo cumpla los más altos estándares institucionales de cumplimiento y preparación para la entrega.",
        },
        {
          role: "Arquitectura y urbanismo",
          summary:
            "DATA Arquitectura es un estudio andorrano de referencia especializado en diseño arquitectónico de vanguardia, urbanismo estratégico y soluciones interiores a medida. Reconocido por su trabajo en proyectos icónicos, combina precisión técnica con creatividad excepcional para entregar espacios sostenibles y de alta calidad en el Principado.",
        },
        {
          role: "Inmobiliario de lujo",
          summary:
            "Como firma internacional líder en el segmento premium, Engel & Völkers aporta un equipo de expertos locales con profundo conocimiento del mercado y asesoramiento profesional, garantizando que cada transacción se gestione con la discreción y el prestigio que definen el mercado de lujo andorrano.",
        },
        {
          role: "Servicios financieros",
          summary:
            "MoraBanc ofrece una gama completa de soluciones de financiación corporativa, incluidas hipotecas empresariales especializadas y líneas de crédito estratégicas adaptadas a desarrollos inmobiliarios y comerciales de gran escala.",
        },
        {
          role: "Construcción modular de alta gama",
          summary:
            "Pionera en construcción industrializada de alta gama, Prêt-à-porter entrega viviendas personalizadas y energéticamente eficientes en Andorra con una rapidez y certeza de coste sin precedentes. Combina diseño arquitectónico contemporáneo de alta calidad con prácticas sostenibles.",
        },
        {
          role: "Infraestructura y construcción",
          summary:
            "Como líder indiscutible del sector de construcción e infraestructuras en Andorra, Grup Heracles ofrece soluciones integrales para proyectos complejos de ingeniería civil y edificación a gran escala.",
        },
        {
          role: "Construcción sostenible industrializada",
          summary:
            "Hormipresa se especializa en construcción industrializada de alto rendimiento con hormigón arquitectónico prefabricado. Su sistema innovador permite la entrega rápida de proyectos residenciales y comerciales de alta calidad.",
        },
        {
          role: "Socio constructor",
          summary:
            "Mariné Construccions es un socio constructor andorrano de confianza que entrega promociones residenciales de alta calidad con un profundo conocimiento local.",
        },
      ],
    },
    blog: {
      listing: {
        eyebrow: "Últimos análisis",
        title: "Análisis sobre inversión y ejecución inmobiliaria en Andorra.",
        intro:
          "Análisis estratégico, actualizaciones de proyectos e inteligencia de mercado práctica para inversores institucionales y privados.",
      },
      article: {
        breadcrumb: "Blog / Volver a análisis",
        asideKicker: "Qué hacemos",
        asideLabel: "Equity Partners",
        asideCopy:
          "Equity Partners ayuda a los inversores a acceder a las oportunidades inmobiliarias más atractivas de Andorra a través de nuestra red local de confianza, experiencia regulatoria y ejecución integral de proyectos. Si está explorando oportunidades de inversión en el mercado inmobiliario andorrano de alto potencial, nuestro equipo estará encantado de hablar con usted.",
        asideCta: "Contacto",
        sourcesTitle: "Fuentes",
        suggestedEyebrow: "Lecturas recomendadas",
        suggestedTitle: "Siga explorando el mercado andorrano.",
      },
    },
    terms: {
      eyebrow: "Términos de uso",
      title: "Términos que regulan el acceso al sitio web de Equity Partners.",
      intro:
        "Estos Términos de uso explican las reglas para acceder y utilizar el sitio web de Equity Partners, las limitaciones de la información presentada y las responsabilidades de los visitantes que interactúan con nuestro contenido, formularios de consulta y materiales.",
      updated: "Última actualización: 31 de marzo de 2026",
      sections: [
        { title: "Aceptación de estos términos", body: ["Al acceder o utilizar este sitio web, usted acepta quedar vinculado por estos Términos de uso. Si no está de acuerdo con estos términos, no debe utilizar este sitio web.", "Estos términos regulan su acceso y uso del sitio web y de los materiales proporcionados por Equity Partners."] },
        { title: "Uso del sitio web", body: ["Usted se compromete a utilizar este sitio web únicamente con fines lícitos y de forma que no interfiera en su funcionamiento."], bullets: ["No utilice el sitio web con fines fraudulentos, engañosos o ilícitos.", "No intente interferir en el correcto funcionamiento del sitio web ni eludir ninguna medida de seguridad.", "No haga un mal uso de los formularios, herramientas automatizadas o contenidos del sitio de forma que pueda perjudicar la plataforma o a sus usuarios."] },
        { title: "Contenido únicamente informativo", body: ["El contenido de este sitio web se proporciona únicamente con fines informativos generales. No constituye asesoramiento legal, fiscal, de inversión, de residencia ni financiero, y no debe utilizarse como sustituto de un asesoramiento profesional adaptado a sus circunstancias individuales.", "El mero uso de este sitio web, de cualquier calculadora, formulario de elegibilidad, guía o material informativo presentado a través de él no establece ninguna relación profesional-cliente."] },
        { title: "Sin garantía de disponibilidad o exactitud", body: ["Procuramos mantener el sitio web actualizado y fiable, pero no garantizamos que toda la información sea siempre completa, exacta o esté al día. Las condiciones de mercado, la normativa y los detalles de los proyectos pueden cambiar sin previo aviso.", "Aunque nos esforzamos por mantener el sitio actualizado en cuestiones legales, regulatorias o de mercado en evolución, Equity Partners no ofrece ninguna garantía ni declaración sobre la integridad, exactitud o validez continuada del contenido del sitio web."] },
        { title: "Propiedad intelectual", body: ["Salvo que se indique lo contrario, el diseño, la marca, los textos, los gráficos, la maquetación y demás contenidos de este sitio web son propiedad de Equity Partners o de sus licenciantes y no pueden copiarse, reproducirse ni redistribuirse sin autorización previa por escrito."] },
        { title: "Enlaces de terceros", body: ["Este sitio web puede contener enlaces a sitios web o recursos de terceros. Estos enlaces se facilitan únicamente por comodidad. Equity Partners no es responsable del contenido, la disponibilidad ni las prácticas de privacidad de esos sitios externos."] },
        { title: "Limitación de responsabilidad", body: ["En la máxima medida permitida por la ley aplicable, Equity Partners no será responsable de ninguna pérdida o daño derivado de o relacionado con el uso, o la imposibilidad de uso, de este sitio web o de la confianza depositada en cualquier material disponible a través de él.", "Esto incluye, en la medida permitida por la ley, daños directos, indirectos, incidentales, especiales o consecuentes, incluso cuando Equity Partners haya sido advertida de la posibilidad de tales daños."] },
        { title: "Ley aplicable y jurisdicción", body: ["Estos Términos de uso se regirán por las leyes aplicables en el Principado de Andorra. Cualquier controversia derivada de o relacionada con estos términos quedará sometida a la jurisdicción exclusiva de los tribunales de Andorra."] },
        { title: "Cambios en estos términos", body: ["Podemos actualizar estos Términos de uso periódicamente. El uso continuado del sitio web tras la publicación de cambios constituirá la aceptación de los términos revisados.", "Le recomendamos revisar esta página periódicamente para conocer la versión vigente en cada momento."] },
        { title: "Contacto", body: ["Si tiene preguntas sobre estos Términos de uso, contacte con info@equitypartners.fund."] },
      ],
      contactCta: "Contacto",
    },
    cookies: {
      eyebrow: "Cookies",
      title: "Cómo Equity Partners utiliza cookies y tecnologías similares.",
      intro:
        "Esta Política de cookies explica cómo Equity Partners utiliza cookies y tecnologías similares cuando visita nuestro sitio web, por qué las utilizamos y qué opciones tiene respecto a su uso.",
      updated: "Última actualización: 31 de marzo de 2026",
      sections: [
        { title: "¿Qué son las cookies?", body: ["Las cookies son pequeños archivos de datos que se colocan en su ordenador o dispositivo móvil cuando visita un sitio web. Las cookies se utilizan ampliamente para hacer funcionar los sitios web, mejorar su rendimiento y proporcionar información analítica."] },
        { title: "Por qué utilizamos cookies", body: ["Utilizamos cookies propias y de terceros por varios motivos. Algunas cookies son necesarias por razones técnicas para que el sitio web funcione correctamente, mientras que otras nos ayudan a entender el uso, mejorar el rendimiento y optimizar la experiencia de usuario."] },
        { title: "Tipos de cookies que podemos utilizar", bullets: ["Cookies estrictamente necesarias para el funcionamiento básico del sitio.", "Cookies de rendimiento y analítica que nos ayudan a entender cómo se utiliza el sitio.", "Cookies de funcionalidad que recuerdan sus preferencias y mejoran su experiencia."] },
        { title: "Sus opciones", body: ["Usted tiene derecho a decidir si acepta o rechaza las cookies. Puede hacerlo a través de cualquier banner de cookies o herramienta de preferencias que ofrezcamos, o ajustando directamente la configuración de su navegador.", "La mayoría de los navegadores permiten bloquear o eliminar cookies. El método exacto varía según el navegador y la versión."] },
        { title: "Cambios en esta política", body: ["Podemos actualizar esta Política de cookies periódicamente para reflejar cambios en nuestras prácticas, tecnologías o requisitos legales. Revise esta página periódicamente para mantenerse informado."] },
        { title: "Contacto", body: ["Si tiene preguntas sobre nuestro uso de cookies o tecnologías similares, contacte con info@equitypartners.fund."] },
      ],
      contactCta: "Contacto",
    },
  },
  ca: {
    home: {
      hero: {
        kicker: "ANDORRA • INVERSIÓ • EXCEL·LÈNCIA",
        title: "El seu soci estratègic per invertir en immobles a Andorra.",
        subline:
          "El nostre equip de professionals ofereix als inversors internacionals una experiència fluida d'accés al mercat immobiliari d'alta barrera d'Andorra.",
        cta: "Contacta amb l'equip",
        ctaSecondary: "Sol·licitar videotrucada",
      },
      localPartnersTitle: "ELS NOSTRES SOCIS LOCALS",
      services: {
        eyebrow: "Equity Partners",
        title: "Què fem",
        intro:
          "Obrim les portes al panorama exclusiu d'inversió d'Andorra mitjançant un pont estructural que permet a firmes internacionals desplegar capital a Andorra sense comprometre estàndards institucionals.",
        cta: "Sobre Equity Partners",
        cards: [
          {
            title: "Desenvolupament integral de projectes",
            bullets: [
              "De la viabilitat al lliurament",
              "Sòls d'alt potencial",
              "Actius de nivell institucional",
            ],
          },
          {
            title: "Xarxa local i accés exclusiu",
            bullets: [
              "Oportunitats off-market",
              "Relació directa amb propietaris",
              "Coneixement profund d'Andorra",
            ],
          },
          {
            title: "Expertesa reguladora i estructural",
            bullets: [
              "Navegació normativa",
              "Estratègies executables",
              "Alineació institucional",
            ],
          },
        ],
      },
      metrics: {
        eyebrow: "Equity Partners en xifres",
        items: [
          { value: "20+", label: "Anys d'experiència a Andorra" },
          { value: "EUR1B+", label: "Valor del pipeline de projectes identificat" },
          { value: "100k+", label: "Metres quadrats en desenvolupament" },
          { value: "10+", label: "Aliances locals estratègiques" },
        ],
      },
      whyEquity: {
        eyebrow: "Treballi amb els millors",
        title: "Per què Equity Partners",
        intro:
          "Combinem accés al mercat local amb estàndards disciplinats d'execució, ajudant els inversors a entrar a Andorra amb una mirada més estructurada, informada i alineada institucionalment.",
        cta: "Sobre Equity Partners",
        points: [
          {
            title: "Rapidesa i decisió",
            body:
              "El desenvolupament a Andorra es mou ràpid i nosaltres també — decisions clares, cicles curts i sense temps perdut entre el sourcing i la signatura.",
          },
          {
            title: "Confiança guanyada, no pressuposada",
            body:
              "Dues dècades d'execució disciplinada al Principat, amb informes transparents i zero sorpreses per als inversors que representem.",
          },
          {
            title: "Precisió per damunt del volum",
            body:
              "Curem un pipeline reduït d'oportunitats de nivell institucional, centrats en qualitat i encaix en lloc de perseguir escala a costa de convicció.",
          },
        ],
      },
      aria: {
        partnersLink: "Veure tots els socis locals",
        partnersMarquee: "Logotips dels socis locals",
        metricsStrip: "Mètriques d'Equity Partners",
        whyEquityImage: "Desenvolupament d'Equity Partners i vista immobiliària d'Andorra",
        testImageBreak: "Paisatge nocturn d'Andorra",
        carouselNav: "Navegació del carrusel de projectes",
        projectCardLabel: "Veure tots els projectes",
        goToProject: "Anar al projecte",
      },
      testImageBreak: {
        quote:
          "Obrim la porta al panorama d'inversió estrangera d'alta barrera d'Andorra, connectant el capital global amb l'oportunitat andorrana.",
      },
      andorraAdvantage: {
        eyebrow: "L'avantatge andorrà",
        title: "Per què Andorra",
        intro:
          "Obrim les portes al panorama exclusiu d'inversió d'Andorra mitjançant un pont estructural que permet a firmes internacionals desplegar capital a Andorra sense comprometre estàndards institucionals.",
        cta: "Explorar més avantatges",
        items: [
          {
            label: "Avantatge fiscal",
            title: "Eficiència fiscal de nivell institucional",
            body:
              "Andorra ofereix un règim fiscal amb límit del 10% per a societats i persones físiques, combinat amb un 0% en impostos sobre el patrimoni i successions — creant un entorn d'alt rendiment per a la reinversió de capital i la preservació del patrimoni a llarg termini.",
          },
          {
            label: "Estabilitat",
            title: "Estatus sobirà de refugi segur",
            body:
              "Amb 700 anys de neutralitat política i una perspectiva «Estable» de les principals agències de qualificació, el Principat ofereix una jurisdicció segura per mitigar el risc davant la volatilitat geopolítica i econòmica global.",
          },
          {
            label: "Escassetat",
            title: "Revaloració immobiliària natural",
            body:
              "Amb només un 4% del sòl edificable, la restricció natural de l'oferta assegura el creixement del valor dels actius a llarg termini. Aquesta escassetat, unida a una demanda global creixent, genera una tesi d'inversió d'alta convicció.",
          },
          {
            label: "Connectivitat",
            title: "Integració europea estratègica",
            body:
              "Andorra avança en el seu Acord d'Associació amb la UE, oferint als inversors un escenari únic: plena autonomia fiscal sobirana amb accés operatiu als principals mercats europeus.",
          },
        ],
      },
      whatWeOffer: {
        eyebrow: "Què oferim",
        title: "Tres maneres d'invertir a Andorra",
        introBefore:
          "Trieu entre una renda contractual previsible o la participació activa en un projecte específic de desenvolupament andorrà. Les rendibilitats es calibren per projecte i es comparteixen durant la trucada. Consulteu les estructures a la nostra ",
        introLinkLabel: "pàgina d'Inversió",
        introAfter: " per a una visió completa.",
        badgePopular: "Més popular",
        requestCta: "Sol·licitar videotrucada",
        ctaMore: "Més informació sobre inversió",
        returnLabel: "Rendibilitat principal",
        returnSub: "La rendibilitat varia segons el projecte · es comparteix a la trucada",
        debt: {
          role: "Fons Immobiliari d'Andorra",
          title: "Deute",
          subtitle: "Inversió passiva · Risc més baix",
          desc:
            "Vostè presta capital al projecte i rep un cupó anual contractual. La seva posició és preferent dins de l'estructura de capital i està garantida per l'immoble subjacent, sense exposició al benefici o pèrdua del projecte.",
          returnValue: "Cupó anual",
          features: [
            "Pagaments contractuals previsibles, sense exposició al rendiment del projecte",
            "Capital garantit per l'immoble, preferent sobre l'equity en prioritat de pagament",
            "Totalment passiu, sense participació un cop compromès",
          ],
        },
        debtEquity: {
          role: "Finançament directe de projecte",
          title: "Deute + Equity",
          subtitle: "Inversió activa · Risc equilibrat + Plusvàlua",
          desc:
            "Una part del seu capital genera un cupó contractual, mentre que la resta pren una participació en el projecte, obtenint així una renda recurrent durant l'execució i participant en la plusvàlua a la sortida. Vostè participa directament en el progrés del projecte.",
          returnValue: "Cupó anual + Plusvàlua d'equity",
          features: [
            "Renda contractual recurrent sobre la part de deute durant el desenvolupament del projecte",
            "Repartiment de beneficis d'equity a la sortida sobre la part d'equity",
            "Participació activa en el projecte que recolza, amb una participació directa en el seu èxit",
          ],
        },
        equityStrip: {
          role: "Finançament directe de projecte",
          title: "Equity",
          subtitle: "Inversió activa · Major potencial de plusvàlua",
          desc:
            "Prengui una participació íntegra en un únic projecte i comparteixi plenament el benefici a la sortida, amb el major potencial de rendibilitat de les tres estructures i el termini de tinença típic més llarg. Menys habitual que Deute + Equity, però disponible sota demanda per a inversors còmodes amb l'exposició total al projecte.",
          cta: "Sol·licitar videotrucada",
        },
      },
      timeline: {
        eyebrow: "Recorregut",
        title: "El full de ruta de la inversió",
        intro:
          "Un procés d'incorporació optimitzat per guiar-lo des del contacte inicial fins al desplegament actiu del capital.",
        cta: "Contacta amb l'equip",
        stepPrefix: "Pas",
        steps: [
          {
            title: "Contacta amb l'equip",
            body: "Conversa inicial per entendre el seu perfil i el seu interès per Andorra.",
          },
          {
            title: "Trucada de consultoria",
            body: "Calendari, rendibilitats i traçat de la ruta estratègica.",
          },
          {
            title: "Seleccionar oportunitat",
            body: "Li presentem oportunitats d'acord amb el seu mandat.",
          },
          {
            title: "KYC i Compliment",
            body: "Onboarding i verificacions abans del compromís de capital.",
          },
          {
            title: "Desplegament de capital",
            body: "Es desplega el capital i comença l'execució del projecte.",
          },
        ],
      },
      gateway: {
        eyebrow: "Contacta amb l'equip",
        title: "Comenci el seu recorregut d'inversió a Andorra",
        intro:
          "Programi una consulta confidencial amb el nostre equip per explorar oportunitats alineades al Principat.",
        requestTitle: "Sol·licitar informació addicional per a inversors",
        requestBody:
          "Permeti que el nostre equip es posi en contacte amb vostè per analitzar el seu perfil i objectius d'inversió.",
        contactCta: "Contacta amb l'equip",
        scheduleCta: "Trucada estratègica 1-1",
      },
      featuredDevelopments: {
        eyebrow: "Desenvolupaments destacats",
        title: "Vegi les nostres propietats en desenvolupament",
        intro: "Una arquitectura de proves equilibrada: execució demostrada i momentum visible.",
        viewLabel: "Veure",
        valueLabel: "Valor",
        statusLabel: "Estat",
        sectorLabel: "Sector",
        viewAllCta: "Veure tots els projectes",
      },
      suggestedReads: {
        eyebrow: "Lectures suggerides",
        title: "Continuï explorant el mercat andorrà.",
        ctaMore: "Veure més articles",
      },
      statusLabels: {
        "Under Construction": "En construcció",
        "Under development": "En desenvolupament",
        "Pipeline": "En cartera",
        "Financing Open": "Finançament obert",
        "Completed": "Completat",
      },
      sectorLabels: {
        "Luxury Residential": "Residencial de luxe",
      },
    },
    newsletter: {
      eyebrow: "Butlletí",
      title: "Mantingui's informat sobre oportunitats a Andorra.",
      emailLabel: "Correu electrònic",
      emailPlaceholder: "Introdueixi el seu correu",
      submit: "Subscriu-te",
      note: "Enviem només actualitzacions selectives. Sense spam.",
      validationError: "Introdueixi un correu electrònic vàlid.",
      submitting: "Enviant...",
      success: "Gràcies per subscriure's.",
      error: "Hi ha hagut un error. Torni-ho a provar.",
    },
    contact: {
      eyebrow: "Consulta d'inversor",
      title: "Parli sobre les seves opcions d'inversió a Andorra",
      intro:
        "Posi's en contacte amb el nostre equip per resoldre qualsevol dubte sobre inversió a Andorra o per sol·licitar informació addicional.",
      form: {
        firstName: "Nom",
        lastName: "Cognoms",
        email: "Correu electrònic",
        company: "Empresa (opcional)",
        investorType: "Tipus d'inversor",
        investorTypeOptions: [
          "Inversor individual",
          "Business angel",
          "Capital risc",
          "Family office",
          "Inversor institucional",
        ],
        investmentTimeline: "Horitzó d'inversió",
        investmentTimelineOptions: [
          "Immediatament",
          "Dins de 3 mesos",
          "3–6 mesos",
          "Només explorant",
        ],
        investmentRange: "Rang d'inversió",
        investmentRangeOptions: [
          "Menys de 1M",
          "1M a 10M",
          "10M +",
          "Encara no ho sé",
        ],
        message: "Hi ha alguna cosa més que vulgui compartir amb nosaltres?",
        submit: "Enviar consulta",
        sending: "Enviant…",
        success: "Gràcies — hem rebut el seu missatge. El nostre equip li respondrà aviat.",
        error: "S'ha produït un error en enviar el missatge. Torni-ho a provar o escrigui'ns directament.",
      },
      cardEyebrow: "Contacte",
      officeLabel: "Visiti la nostra oficina",
    },
    privacy: {
      eyebrow: "Política de privacitat",
      title: "Política de privacitat",
      intro:
        "Equity Partners està compromesa amb els estàndards més alts de protecció de dades i transparència. Aquesta política descriu les nostres pràctiques sobre la recollida, ús i protecció de les dades personals quan visita el nostre lloc web, ens contacta o sol·licita informació per a inversors.",
      updated: "Darrera actualització: 31 de març de 2026",
      sections: [
        {
          title: "Compromís amb la protecció de dades",
          body: [
            "Aquesta política de privacitat està dissenyada per reflectir els principis de transparència, proporcionalitat i tractament lícit exigits per les normatives de protecció de dades aplicables, inclòs el marc andorrà de protecció de dades i, quan correspongui, el Reglament General de Protecció de Dades de la UE.",
          ],
        },
        {
          title: "Responsable del tractament",
          body: [
            "L'entitat responsable del tractament de les seves dades personals és Equity Partners.",
            "Si té qualsevol pregunta relacionada amb la privacitat o vol exercir els seus drets, pot contactar-nos a info@equitypartners.fund.",
          ],
        },
        {
          title: "Categories de dades personals",
          body: [
            "Tractem les categories següents de dades personals segons la seva interacció amb la nostra plataforma:",
          ],
          bullets: [
            "Dades d'identitat i contacte, com el seu nom, correu electrònic, número de telèfon i dades de la seva empresa.",
            "Dades de consultes que envia a través de formularis de contacte, formularis de newsletter o sol·licituds d'inversors.",
            "Informació professional i relacionada amb el seu perfil inversor que comparteix voluntàriament amb nosaltres.",
            "Dades tècniques com l'adreça IP, el tipus de navegador, informació del dispositiu i patrons d'ús recollits mitjançant cookies.",
          ],
        },
        {
          title: "Com utilitzem les dades personals",
          body: ["Podem utilitzar la informació personal per a:"],
          bullets: [
            "Respondre a consultes i sol·licituds d'inversors.",
            "Compartir actualitzacions rellevants, anàlisis de mercat o informació sobre projectes.",
            "Millorar el lloc web, el seu rendiment i l'experiència d'usuari.",
            "Mantenir registres interns i complir obligacions legals, comptables, de compliment o de reporting.",
          ],
        },
        {
          title: "Base legal del tractament",
          body: [
            "Quan correspongui, les dades personals es podran tractar sobre la base del consentiment, l'interès legítim, les mesures adoptades a petició seva abans d'una possible relació professional o el compliment d'obligacions legals.",
          ],
        },
        {
          title: "Conservació",
          body: [
            "Conservem les seves dades personals només durant el temps necessari per complir les finalitats per a les quals van ser recollides, inclosos els requisits legals, comptables o de reporting. Les dades de consultes es conserven normalment fins a 5 anys després de la fi de la relació professional, llevat que la llei exigeixi un termini de conservació més llarg.",
          ],
        },
        {
          title: "Els seus drets",
          body: [
            "En virtut de les lleis de privacitat aplicables, inclosa la LQPD andorrana i el RGPD quan correspongui, pot tenir dret a:",
          ],
          bullets: [
            "Sol·licitar accés a les dades personals que tenim sobre vostè.",
            "Sol·licitar la rectificació de dades inexactes o incompletes.",
            "Sol·licitar la supressió de dades quan hi hagi motius legítims.",
            "Sol·licitar la limitació del tractament en determinades circumstàncies.",
            "Oposar-se a determinades activitats de tractament.",
            "Retirar el consentiment quan el tractament es basi en el consentiment.",
          ],
        },
        {
          title: "Mesures de seguretat",
          body: [
            "Hem implementat mesures de seguretat sòlides per evitar que les seves dades personals es perdin, s'utilitzin, s'alterin, es divulguin o s'hi accedeixi de manera accidental o no autoritzada. L'accés a les dades personals està limitat als empleats, contractistes o assessors que tenen una necessitat empresarial de conèixer-les.",
          ],
        },
        {
          title: "Cookies i tecnologies relacionades",
          body: [
            "Podem utilitzar cookies i tecnologies similars per entendre l'ús del lloc web, millorar el rendiment i afavorir l'experiència d'usuari. A través d'aquestes eines es pot recollir informació tècnica com l'adreça IP, el tipus de navegador, informació del dispositiu i patrons d'ús.",
          ],
        },
        {
          title: "Contacte",
          body: [
            "Si té preguntes sobre aquesta política o sobre com es tracten les seves dades, contacti amb info@equitypartners.fund.",
          ],
        },
      ],
      contactCta: "Contacte",
    },
    about: {
      hero: {
        title: "El seu soci estratègic per a l'èxit inversor a Andorra",
        copy: "Amb profunditat de mercat local i una mirada internacional d'inversió, el nostre equip ajuda els inversors a accedir a Andorra mitjançant execució disciplinada, relacions de confiança i alineació estratègica a llarg termini.",
      },
      proof: {
        label: "Què fem",
        title: "Accés d'alta barrera. Execució disciplinada.",
        subtitle: "Som la porta estratègica al panorama immobiliari evolutiu d'Andorra.",
        metrics: [
          { label: "Anys d'experiència a Andorra" },
          { label: "Valor del pipeline de projectes identificat" },
          { label: "Metres quadrats en desenvolupament" },
          { label: "Aliances locals estratègiques" },
        ],
      },
      whyEquity: {
        eyebrow: "Treballi amb els millors",
        title: "Per què Equity Partners",
        intro:
          "Combinem accés al mercat local amb estàndards disciplinats d'execució, ajudant els inversors a entrar a Andorra amb una mirada més estructurada, informada i alineada institucionalment.",
        cta: "Sobre Equity Partners",
        points: [
          {
            title: "Ens movem més ràpid que el mercat",
            body:
              "El nostre sourcing succeeix abans que els actius arribin als llistats públics. Quan la majoria d'inversors coneix una oportunitat, nosaltres ja l'hem avaluada.",
          },
          {
            title: "Andorra és complexa — nosaltres eliminem aquesta complexitat",
            body:
              "Entre els límits d'inversió estrangera, l'estructuració fiscal i els permisos urbanístics, el marge d'error és alt. Gestionem el procés de principi a fi per eliminar-lo.",
          },
          {
            title: "Només oferim oportunitats que podem executar",
            body:
              "No perseguim volum. Cada relació amb inversors és selectiva, la qual cosa ens permet comprometre'ns plenament amb cada oportunitat que representem.",
          },
        ],
      },
      team: {
        eyebrow: "Conegui l'equip",
        title: "Equip principal d'Equity Partners",
        intro: "Les persones darrere d'Equity Partners: experiència local andorrana combinada amb experiència internacional en inversió.",
        members: [
          {
            role: "CEO i cofundador",
            description:
              "Inversor internacional amb més de 30 anys d'experiència en vendes i màrqueting de projectes immobiliaris arreu d'Europa, aportant capital estratègic i accés a xarxes d'alt patrimoni.",
          },
          {
            role: "Advocat i cofundador",
            description:
              "Expert en estructuració d'inversions i finançament de projectes. Oriol lidera l'estratègia legal i financera del projecte, així com l'estructuració de transaccions, el modelatge financer i la relació amb inversors.",
          },
          {
            role: "Arquitecte tècnic",
            description:
              "Amb més de 25 anys d'experiència en inversió immobiliària, adquisició de sòl i desenvolupament estratègic, Carlos combina el seu profund coneixement del mercat andorrà amb una sòlida visió internacional.",
          },
          {
            role: "Aliances i vendes",
            description:
              "Amb un màster en Digital Business per la Universitat d'Amsterdam i 4 anys d'experiència a Salesforce, Bing aporta una mirada internacional i un coneixement profund de captació digital orientada a resultats.",
          },
          {
            role: "Màrqueting digital",
            description:
              "Dirigint la nostra estratègia creativa, Tekke tradueix els nostres valors institucionals en una identitat visual de primer nivell i una experiència digital fluida per als nostres inversors.",
          },
          {
            role: "Analista legal",
            description:
              "Laia supervisa la intersecció entre el marc legal i la incorporació d'inversors, assegurant que cada transacció compleixi els estàndards més alts de compliment andorrà.",
          },
          {
            role: "Rol estratègic",
            description:
              "Text provisional per a un futur membre de l'equip. Es pot actualitzar més endavant amb una biografia real.",
          },
        ],
      },
      cta: {
        title: "Explori la nostra cartera actual o parli d'un mandat estratègic.",
        button: "Contacti el nostre equip",
      },
    },
    partners: {
      eyebrow: "Els nostres socis locals",
      title: "Relacions de confiança a tot l'ecosistema andorrà.",
      intro: "El nostre model d'execució es basa en aliances locals profundes que reforcen la certesa del projecte des de la planificació fins a l'execució.",
      entries: [
        {
          role: "Servei expert en residència",
          summary:
            "Andorra Resident ofereix assessorament legal i fiscal especialitzat per ajudar empresaris i inversors internacionals a gestionar el procés de residència i optimitzar la seva posició fiscal al Principat. El seu equip expert ofereix una experiència integral de reubicació, gestionant des de la documentació migratòria fins a la constitució de societats i el compliment fiscal local.",
        },
        {
          role: "Legal i compliment",
          summary:
            "Emindset Law és un despatx pioner especialitzat en immobiliari, dret corporatiu i estructuració patrimonial a Andorra i al mercat internacional. El seu equip multidisciplinari proporciona due diligence legal i fiscal integral, garantint que cada projecte s'executi amb el màxim compliment normatiu i eficiència estratègica.",
        },
        {
          role: "Ecosistema regulador",
          summary:
            "El Govern d'Andorra estableix el marc legislatiu estratègic i els estàndards de sostenibilitat que garanteixen un desenvolupament immobiliari ordenat i el creixement econòmic del Principat. Assegura que cada desenvolupament compleixi els estàndards institucionals més alts de compliment i preparació per al lliurament.",
        },
        {
          role: "Arquitectura i urbanisme",
          summary:
            "DATA Arquitectura és un estudi andorrà de referència especialitzat en disseny arquitectònic d'avantguarda, urbanisme estratègic i solucions interiors a mida. Reconegut pel seu treball en projectes icònics, combina precisió tècnica amb creativitat excepcional per lliurar espais sostenibles i d'alta qualitat al Principat.",
        },
        {
          role: "Immobiliari de luxe",
          summary:
            "Com a firma internacional líder en el segment premium, Engel & Völkers aporta un equip d'experts locals amb profund coneixement del mercat i assessorament professional, garantint que cada transacció es gestioni amb la discreció i el prestigi que defineixen el mercat de luxe andorrà.",
        },
        {
          role: "Serveis financers",
          summary:
            "MoraBanc ofereix una gamma completa de solucions de finançament corporatiu, incloses hipoteques empresarials especialitzades i línies de crèdit estratègiques adaptades a desenvolupaments immobiliaris i comercials de gran escala.",
        },
        {
          role: "Construcció modular d'alta gamma",
          summary:
            "Pionera en construcció industrialitzada d'alta gamma, Prêt-à-porter lliura habitatges personalitzats i energèticament eficients a Andorra amb una rapidesa i certesa de cost sense precedents. Combina disseny arquitectònic contemporani d'alta qualitat amb pràctiques sostenibles.",
        },
        {
          role: "Infraestructura i construcció",
          summary:
            "Com a líder indiscutible del sector de construcció i infraestructures a Andorra, Grup Heracles ofereix solucions integrals per a projectes complexos d'enginyeria civil i edificació a gran escala.",
        },
        {
          role: "Construcció sostenible industrialitzada",
          summary:
            "Hormipresa s'especialitza en construcció industrialitzada d'alt rendiment amb formigó arquitectònic prefabricat. El seu sistema innovador permet el lliurament ràpid de projectes residencials i comercials d'alta qualitat.",
        },
        {
          role: "Soci constructor",
          summary:
            "Mariné Construccions és un soci constructor andorrà de confiança que lliura promocions residencials d'alta qualitat amb un profund coneixement local.",
        },
      ],
    },
    blog: {
      listing: {
        eyebrow: "Últimes anàlisis",
        title: "Anàlisis sobre inversió i execució immobiliària a Andorra.",
        intro:
          "Anàlisi estratègica, actualitzacions de projectes i intel·ligència de mercat pràctica per a inversors institucionals i privats.",
      },
      article: {
        breadcrumb: "Blog / Tornar a anàlisis",
        asideKicker: "Què fem",
        asideLabel: "Equity Partners",
        asideCopy:
          "Equity Partners ajuda els inversors a accedir a les oportunitats immobiliàries més atractives d'Andorra a través de la nostra xarxa local de confiança, experiència reguladora i execució integral de projectes. Si està explorant oportunitats d'inversió al mercat immobiliari andorrà d'alt potencial, el nostre equip estarà encantat de parlar amb vostè.",
        asideCta: "Contacte",
        sourcesTitle: "Fonts",
        suggestedEyebrow: "Lectures recomanades",
        suggestedTitle: "Continuï explorant el mercat andorrà.",
      },
    },
    terms: {
      eyebrow: "Termes d'ús",
      title: "Termes que regulen l'accés al lloc web d'Equity Partners.",
      intro:
        "Aquests Termes d'ús expliquen les regles per accedir i utilitzar el lloc web d'Equity Partners, les limitacions de la informació presentada i les responsabilitats dels visitants que interactuen amb el nostre contingut, formularis de consulta i materials.",
      updated: "Darrera actualització: 31 de març de 2026",
      sections: [
        { title: "Acceptació d'aquests termes", body: ["En accedir o utilitzar aquest lloc web, vostè accepta quedar vinculat per aquests Termes d'ús. Si no està d'acord amb aquests termes, no ha d'utilitzar aquest lloc web.", "Aquests termes regulen el seu accés i ús del lloc web i dels materials proporcionats per Equity Partners."] },
        { title: "Ús del lloc web", body: ["Vostè es compromet a utilitzar aquest lloc web únicament amb finalitats lícites i de manera que no interfereixi en el seu funcionament."], bullets: ["No utilitzi el lloc web amb finalitats fraudulentes, enganyoses o il·lícites.", "No intenti interferir en el correcte funcionament del lloc web ni eludir cap mesura de seguretat.", "No faci un mal ús dels formularis, eines automatitzades o continguts del lloc de manera que pugui perjudicar la plataforma o els seus usuaris."] },
        { title: "Contingut únicament informatiu", body: ["El contingut d'aquest lloc web es proporciona únicament amb finalitats informatives generals. No constitueix assessorament legal, fiscal, d'inversió, de residència ni financer, i no s'ha d'utilitzar com a substitut d'un assessorament professional adaptat a les seves circumstàncies individuals.", "El mer ús d'aquest lloc web, de qualsevol calculadora, formulari d'elegibilitat, guia o material informatiu presentat a través seu no estableix cap relació professional-client."] },
        { title: "Sense garantia de disponibilitat o exactitud", body: ["Procurem mantenir el lloc web actualitzat i fiable, però no garantim que tota la informació sigui sempre completa, exacta o al dia. Les condicions de mercat, la normativa i els detalls dels projectes poden canviar sense avís previ.", "Tot i que ens esforcem per mantenir el lloc actualitzat en qüestions legals, regulatòries o de mercat en evolució, Equity Partners no ofereix cap garantia ni declaració sobre la integritat, exactitud o validesa continuada del contingut del lloc web."] },
        { title: "Propietat intel·lectual", body: ["Llevat que s'indiqui el contrari, el disseny, la marca, els textos, els gràfics, la maquetació i altres continguts d'aquest lloc web són propietat d'Equity Partners o dels seus llicenciants i no es poden copiar, reproduir ni redistribuir sense autorització prèvia per escrit."] },
        { title: "Enllaços de tercers", body: ["Aquest lloc web pot contenir enllaços a llocs web o recursos de tercers. Aquests enllaços es faciliten únicament per comoditat. Equity Partners no és responsable del contingut, la disponibilitat ni les pràctiques de privacitat d'aquests llocs externs."] },
        { title: "Limitació de responsabilitat", body: ["En la màxima mesura permesa per la llei aplicable, Equity Partners no serà responsable de cap pèrdua o dany derivat de o relacionat amb l'ús, o la impossibilitat d'ús, d'aquest lloc web o de la confiança dipositada en qualsevol material disponible a través seu.", "Això inclou, en la mesura permesa per la llei, danys directes, indirectes, incidentals, especials o conseqüents, fins i tot quan Equity Partners hagi estat advertida de la possibilitat d'aquests danys."] },
        { title: "Llei aplicable i jurisdicció", body: ["Aquests Termes d'ús es regiran per les lleis aplicables al Principat d'Andorra. Qualsevol controvèrsia derivada de o relacionada amb aquests termes quedarà sotmesa a la jurisdicció exclusiva dels tribunals d'Andorra."] },
        { title: "Canvis en aquests termes", body: ["Podem actualitzar aquests Termes d'ús periòdicament. L'ús continuat del lloc web després de la publicació de canvis constituirà l'acceptació dels termes revisats.", "Li recomanem revisar aquesta pàgina periòdicament per conèixer la versió vigent en cada moment."] },
        { title: "Contacte", body: ["Si té preguntes sobre aquests Termes d'ús, contacti amb info@equitypartners.fund."] },
      ],
      contactCta: "Contacte",
    },
    cookies: {
      eyebrow: "Cookies",
      title: "Com Equity Partners utilitza cookies i tecnologies similars.",
      intro:
        "Aquesta Política de cookies explica com Equity Partners utilitza cookies i tecnologies similars quan visita el nostre lloc web, per què les utilitzem i quines opcions té respecte al seu ús.",
      updated: "Darrera actualització: 31 de març de 2026",
      sections: [
        { title: "Què són les cookies?", body: ["Les cookies són petits arxius de dades que es col·loquen al seu ordinador o dispositiu mòbil quan visita un lloc web. Les cookies s'utilitzen àmpliament per fer funcionar els llocs web, millorar-ne el rendiment i proporcionar informació analítica."] },
        { title: "Per què utilitzem cookies", body: ["Utilitzem cookies pròpies i de tercers per diversos motius. Algunes cookies són necessàries per raons tècniques perquè el lloc web funcioni correctament, mentre que d'altres ens ajuden a entendre l'ús, millorar el rendiment i optimitzar l'experiència d'usuari."] },
        { title: "Tipus de cookies que podem utilitzar", bullets: ["Cookies estrictament necessàries per al funcionament bàsic del lloc.", "Cookies de rendiment i analítica que ens ajuden a entendre com s'utilitza el lloc.", "Cookies de funcionalitat que recorden les seves preferències i milloren la seva experiència."] },
        { title: "Les seves opcions", body: ["Vostè té dret a decidir si accepta o rebutja les cookies. Pot fer-ho a través de qualsevol bàner de cookies o eina de preferències que oferim, o ajustant directament la configuració del seu navegador.", "La majoria dels navegadors permeten bloquejar o eliminar cookies. El mètode exacte varia segons el navegador i la versió."] },
        { title: "Canvis en aquesta política", body: ["Podem actualitzar aquesta Política de cookies periòdicament per reflectir canvis en les nostres pràctiques, tecnologies o requisits legals. Revisi aquesta pàgina periòdicament per mantenir-se informat."] },
        { title: "Contacte", body: ["Si té preguntes sobre el nostre ús de cookies o tecnologies similars, contacti amb info@equitypartners.fund."] },
      ],
      contactCta: "Contacte",
    },
  },
};

export function getContentTranslations(locale: Locale) {
  return contentTranslations[locale];
}
