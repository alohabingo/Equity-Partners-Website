import type { Locale } from "../lib/i18n";

type HomeContent = {
  hero: {
    kicker: string;
    title: string;
    subline: string;
    cta: string;
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
          "Equity Partners connects investor capital to disciplined Andorran real estate execution.",
        cta: "Explore Opportunities",
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
              "From initial feasibility to final property delivery",
              "Identifying and securing high-potential land assets",
              "Transforming acquisitions into institutional-grade assets",
            ],
          },
          {
            title: "Local Network & Exclusive Access",
            bullets: [
              "Access to high-value, off-market opportunities",
              "Direct ties with local landowners and advisors",
              "Deep-rooted expertise in the Andorran landscape",
            ],
          },
          {
            title: "Regulatory & Structural Expertise",
            bullets: [
              "Expert navigation of the Principality's compliance",
              "Translating local rules into executable strategies",
              "Professional alignment with institutional standards",
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
        "Reach out to our team to answer any Andorra investment options you may have, or for any additional information you may require.",
      form: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        company: "Company",
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
            "If you have any privacy-related questions or wish to exercise your rights, you can contact us at info@equitypartnersandorra.com.",
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
            "If you have questions about this policy or how your data is handled, please contact info@equitypartnersandorra.com.",
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
        intro: "A darker variation of the same circular team layout to compare contrast and overall feel.",
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
              "With over 25 years of extensive expertise in real estate investment, land acquisition and strategic development. Carlos combines his deep knowledge of the Andorrean maket with a strong internatinoal outlook.",
          },
          {
            role: "Partnerships & Sales",
            description:
              "With a Master degree in Digital Business from the University of Amsterdam and 4 years of experience at Salesforce, Bing's international past and results-oriented mindset brings deep knowledge of digital acquisition.",
          },
          {
            role: "Ditigal Marketing",
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
            "As a leading international brokerage specializing in the premium segment, Engel & Völkers provides a team of local experts offers deep market insights and professional consultancy, ensuring every transaction is handled with the discretion and prestige that define the Andorran luxury market.",
        },
        {
          role: "Financial Services",
          summary:
            "Creand is a leading Andorran financial group that provides specialized financing solutions and strategic banking services for large-scale real estate developments and investment projects. They offer us deep expertise in project funding and local market dynamics.",
        },
        {
          role: "Financial Services",
          summary:
            "MoraBanc provides a comprehensive suite of corporate financing solutions, including specialized business mortgages and strategic credit facilities tailored for large-scale real estate and commercial developments.",
        },
        {
          role: "High-End Modular Construction",
          summary:
            "A pioneer in high-end industrialized construction, Prêt-à-porter delivers bespoke, energy-efficient homes in Andorra with unprecedented speed and fixed-cost certainty. They combine high-quality modern architectual design with sustainable practises.",
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
        { title: "Contact us", body: ["If you have questions about these Terms of Use, please contact info@equitypartnersandorra.com."] },
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
        { title: "Contact us", body: ["If you have questions about our use of cookies or similar technologies, please contact info@equitypartnersandorra.com."] },
      ],
      contactCta: "Contact Us",
    },
  },
  es: {
    home: {
      hero: {
        kicker: "ANDORRA • INVERSIÓN • EXCELENCIA",
        title: "Su socio estratégico para inversiones inmobiliarias en Andorra.",
        subline:
          "Equity Partners conecta capital inversor con una ejecución inmobiliaria disciplinada en Andorra.",
        cta: "Explorar oportunidades",
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
              "Desde la viabilidad inicial hasta la entrega final del activo",
              "Identificación y aseguramiento de suelos de alto potencial",
              "Transformación de adquisiciones en activos de nivel institucional",
            ],
          },
          {
            title: "Red local y acceso exclusivo",
            bullets: [
              "Acceso a oportunidades off-market de alto valor",
              "Relación directa con propietarios y asesores locales",
              "Conocimiento profundo del entorno andorrano",
            ],
          },
          {
            title: "Experiencia regulatoria y estructural",
            bullets: [
              "Navegación experta del marco normativo del Principado",
              "Traducción de reglas locales en estrategias ejecutables",
              "Alineación profesional con estándares institucionales",
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
            title: "Usted se mueve más rápido que el mercado",
            body:
              "Nuestro sourcing ocurre antes de que los activos lleguen a los listados públicos. Para cuando la mayoría de inversores conoce una oportunidad, nosotros ya la hemos evaluado.",
          },
          {
            title: "Andorra es compleja — nosotros eliminamos esa complejidad",
            body:
              "Entre los límites de inversión extranjera, la estructuración fiscal y los permisos urbanísticos, el margen de error es alto. Gestionamos el proceso de principio a fin para eliminarlo.",
          },
          {
            title: "Solo aceptamos mandatos que podemos ejecutar",
            body:
              "No perseguimos volumen. Cada relación con inversores es selectiva, lo que nos permite comprometernos plenamente con cada oportunidad que representamos.",
          },
        ],
      },
    },
    newsletter: {
      eyebrow: "Newsletter",
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
        company: "Empresa",
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
      sections: [],
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
            title: "Usted se mueve más rápido que el mercado",
            body:
              "Nuestro sourcing ocurre antes de que los activos lleguen a los listados públicos. Para cuando la mayoría de inversores conoce una oportunidad, nosotros ya la hemos evaluado.",
          },
          {
            title: "Andorra es compleja — nosotros eliminamos esa complejidad",
            body:
              "Entre los límites de inversión extranjera, la estructuración fiscal y los permisos urbanísticos, el margen de error es alto. Gestionamos el proceso de principio a fin para eliminarlo.",
          },
          {
            title: "Solo aceptamos mandatos que podemos ejecutar",
            body:
              "No perseguimos volumen. Cada relación con inversores es selectiva, lo que nos permite comprometernos plenamente con cada oportunidad que representamos.",
          },
        ],
      },
      team: {
        eyebrow: "Conozca al equipo",
        title: "Equipo principal de Equity Partners",
        intro: "Una variación más oscura del mismo diseño circular del equipo para comparar contraste y sensación general.",
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
            "Creand es un grupo financiero andorrano líder que ofrece soluciones especializadas de financiación y servicios bancarios estratégicos para desarrollos inmobiliarios e inversiones a gran escala. Aporta una profunda experiencia en financiación de proyectos y dinámica de mercado local.",
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
      sections: [],
      contactCta: "Contacto",
    },
    cookies: {
      eyebrow: "Cookies",
      title: "Cómo Equity Partners utiliza cookies y tecnologías similares.",
      intro:
        "Esta Política de cookies explica cómo Equity Partners utiliza cookies y tecnologías similares cuando visita nuestro sitio web, por qué las utilizamos y qué opciones tiene respecto a su uso.",
      updated: "Última actualización: 31 de marzo de 2026",
      sections: [],
      contactCta: "Contacto",
    },
  },
  ca: {
    home: {
      hero: {
        kicker: "ANDORRA • INVERSIÓ • EXCEL.LÈNCIA",
        title: "El seu soci estratègic per a inversions immobiliàries a Andorra.",
        subline:
          "Equity Partners connecta capital inversor amb una execució immobiliària disciplinada a Andorra.",
        cta: "Explora oportunitats",
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
              "Des de la viabilitat inicial fins al lliurament final de l'actiu",
              "Identificació i assegurament de sòls d'alt potencial",
              "Transformació d'adquisicions en actius de nivell institucional",
            ],
          },
          {
            title: "Xarxa local i accés exclusiu",
            bullets: [
              "Accés a oportunitats off-market d'alt valor",
              "Relació directa amb propietaris i assessors locals",
              "Coneixement profund de l'entorn andorrà",
            ],
          },
          {
            title: "Expertesa reguladora i estructural",
            bullets: [
              "Navegació experta del marc normatiu del Principat",
              "Traducció de regles locals en estratègies executables",
              "Alineació professional amb estàndards institucionals",
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
            title: "Vostè es mou més ràpid que el mercat",
            body:
              "El nostre sourcing succeeix abans que els actius arribin als llistats públics. Quan la majoria d'inversors coneix una oportunitat, nosaltres ja l'hem avaluada.",
          },
          {
            title: "Andorra és complexa — nosaltres eliminem aquesta complexitat",
            body:
              "Entre els límits d'inversió estrangera, l'estructuració fiscal i els permisos urbanístics, el marge d'error és alt. Gestionem el procés de principi a fi per eliminar-lo.",
          },
          {
            title: "Només acceptem mandats que podem executar",
            body:
              "No perseguim volum. Cada relació amb inversors és selectiva, la qual cosa ens permet comprometre'ns plenament amb cada oportunitat que representem.",
          },
        ],
      },
    },
    newsletter: {
      eyebrow: "Newsletter",
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
        company: "Empresa",
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
      sections: [],
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
            title: "Vostè es mou més ràpid que el mercat",
            body:
              "El nostre sourcing succeeix abans que els actius arribin als llistats públics. Quan la majoria d'inversors coneix una oportunitat, nosaltres ja l'hem avaluada.",
          },
          {
            title: "Andorra és complexa — nosaltres eliminem aquesta complexitat",
            body:
              "Entre els límits d'inversió estrangera, l'estructuració fiscal i els permisos urbanístics, el marge d'error és alt. Gestionem el procés de principi a fi per eliminar-lo.",
          },
          {
            title: "Només acceptem mandats que podem executar",
            body:
              "No perseguim volum. Cada relació amb inversors és selectiva, la qual cosa ens permet comprometre'ns plenament amb cada oportunitat que representem.",
          },
        ],
      },
      team: {
        eyebrow: "Conegui l'equip",
        title: "Equip principal d'Equity Partners",
        intro: "Una variació més fosca del mateix disseny circular de l'equip per comparar contrast i sensació general.",
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
            "Creand és un grup financer andorrà líder que ofereix solucions especialitzades de finançament i serveis bancaris estratègics per a desenvolupaments immobiliaris i inversions a gran escala. Aporta una profunda experiència en finançament de projectes i dinàmica de mercat local.",
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
      ],
    },
    blog: {
      listing: {
        eyebrow: "Últimes anàlisis",
        title: "Anàlisis sobre inversió i execució immobiliària a Andorra.",
        intro:
          "Anàlisi estratègica, actualitzacions de projectes i intel.ligència de mercat pràctica per a inversors institucionals i privats.",
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
      sections: [],
      contactCta: "Contacte",
    },
    cookies: {
      eyebrow: "Cookies",
      title: "Com Equity Partners utilitza cookies i tecnologies similars.",
      intro:
        "Aquesta Política de cookies explica com Equity Partners utilitza cookies i tecnologies similars quan visita el nostre lloc web, per què les utilitzem i quines opcions té respecte al seu ús.",
      updated: "Darrera actualització: 31 de març de 2026",
      sections: [],
      contactCta: "Contacte",
    },
  },
};

contentTranslations.es.privacy.sections = contentTranslations.en.privacy.sections;
contentTranslations.ca.privacy.sections = contentTranslations.en.privacy.sections;
contentTranslations.es.terms.sections = contentTranslations.en.terms.sections;
contentTranslations.ca.terms.sections = contentTranslations.en.terms.sections;
contentTranslations.es.cookies.sections = contentTranslations.en.cookies.sections;
contentTranslations.ca.cookies.sections = contentTranslations.en.cookies.sections;

export function getContentTranslations(locale: Locale) {
  return contentTranslations[locale];
}
