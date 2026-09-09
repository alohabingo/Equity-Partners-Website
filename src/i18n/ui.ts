import type { Locale } from "../lib/i18n";

type PageTitleKey =
  | "home"
  | "about"
  | "partners"
  | "blog"
  | "contact"
  | "privacyPolicy"
  | "termsOfUse"
  | "cookiePolicy"
  | "test";

type Dictionary = {
  nav: {
    home: string;
    invest: string;
    about: string;
    portfolio: string;
    partners: string;
    blog: string;
    test: string;
    contactUs: string;
    selectLanguage: string;
  };
  footer: {
    cta: string;
    company: string;
    resources: string;
    contact: string;
    about: string;
    team: string;
    projects: string;
    marketReports: string;
    rightsReserved: string;
    privacyPolicy: string;
    termsOfUse: string;
    cookies: string;
    login: string;
  };
  /** The cookie banner. Short enough to be read, which is the only version
   *  anyone reads at all. */
  cookieBanner: {
    title: string;
    body: string;
    /** Accept and reject must read as equal weight — the APDA asks for equal prominence. */
    acceptAll: string;
    rejectAll: string;
    /** Opens the second layer, where the two purposes are decided separately. */
    manage: string;
    policy: string;
    /** The link on the policy page that brings the banner back. */
    change: string;
    prefs: {
      title: string;
      close: string;
      save: string;
      alwaysOn: string;
      essentialTitle: string;
      essentialBody: string;
      analyticsTitle: string;
      analyticsBody: string;
      marketingTitle: string;
      marketingBody: string;
    };
  };
  pageTitles: Record<PageTitleKey, string>;
};

export const uiTranslations: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      invest: "Invest",
      about: "About",
      portfolio: "Portfolio",
      partners: "Partners",
      blog: "Blog",
      test: "Test",
      contactUs: "Contact Us",
      selectLanguage: "Select language",
    },
    footer: {
      cta: "Explore Opportunities",
      company: "Equity Partners",
      resources: "Resources",
      contact: "Contact",
      about: "About",
      team: "Team",
      projects: "Portfolio",
      marketReports: "Opportunities",
      rightsReserved: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
      cookies: "Cookies",
      login: "Login",
    },
    cookieBanner: {
      title: "Cookies",
      body: "Some are needed to run this site. Others measure how it is used, or how our advertising performs. You choose which.",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      manage: "Manage preferences",
      policy: "Cookie policy",
      change: "Change your cookie choices",
      prefs: {
        title: "Manage preferences",
        close: "Close",
        save: "Save preferences",
        alwaysOn: "Always on",
        essentialTitle: "Essential cookies",
        essentialBody: "Needed for the site to work and stay secure. These cannot be switched off.",
        analyticsTitle: "Analytics cookies",
        analyticsBody: "Help us understand how visitors use the site, through Google Analytics.",
        marketingTitle: "Marketing cookies",
        marketingBody: "Let us measure how our advertising performs and reach people who have shown an interest, through Meta.",
      },
    },
    pageTitles: {
      home: "Equity Partners | Andorra Property Group",
      about: "About Us | Equity Partners",
      partners: "Partners | Equity Partners",
      blog: "Blog | Equity Partners",
      contact: "Contact | Equity Partners",
      privacyPolicy: "Privacy Policy | Equity Partners",
      termsOfUse: "Terms of Use | Equity Partners",
      cookiePolicy: "Cookie Policy | Equity Partners",
      test: "Test Sections | Equity Partners",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      invest: "Invertir",
      about: "Nosotros",
      portfolio: "Portafolio",
      partners: "Socios",
      blog: "Blog",
      test: "Pruebas",
      contactUs: "Contacto",
      selectLanguage: "Seleccionar idioma",
    },
    footer: {
      cta: "Explorar oportunidades",
      company: "Equity Partners",
      resources: "Recursos",
      contact: "Contacto",
      about: "Nosotros",
      team: "Equipo",
      projects: "Portafolio",
      marketReports: "Oportunidades",
      rightsReserved: "Todos los derechos reservados.",
      privacyPolicy: "Política de privacidad",
      termsOfUse: "Términos de uso",
      cookies: "Cookies",
      login: "Iniciar sesión",
    },
    cookieBanner: {
      title: "Cookies",
      body: "Algunas son necesarias para que el sitio funcione. Otras miden cómo se utiliza o qué resultados obtiene nuestra publicidad. Usted decide cuáles.",
      acceptAll: "Aceptar todo",
      rejectAll: "Rechazar todo",
      manage: "Gestionar preferencias",
      policy: "Política de cookies",
      change: "Cambiar sus preferencias de cookies",
      prefs: {
        title: "Gestionar preferencias",
        close: "Cerrar",
        save: "Guardar preferencias",
        alwaysOn: "Siempre activas",
        essentialTitle: "Cookies esenciales",
        essentialBody: "Necesarias para que el sitio funcione y sea seguro. No se pueden desactivar.",
        analyticsTitle: "Cookies analíticas",
        analyticsBody: "Nos ayudan a entender cómo se utiliza el sitio, mediante Google Analytics.",
        marketingTitle: "Cookies de marketing",
        marketingBody: "Nos permiten medir el rendimiento de nuestra publicidad y llegar a personas que han mostrado interés, mediante Meta.",
      },
    },
    pageTitles: {
      home: "Equity Partners | Grupo inmobiliario en Andorra",
      about: "Sobre nosotros | Equity Partners",
      partners: "Socios | Equity Partners",
      blog: "Blog | Equity Partners",
      contact: "Contacto | Equity Partners",
      privacyPolicy: "Política de privacidad | Equity Partners",
      termsOfUse: "Términos de uso | Equity Partners",
      cookiePolicy: "Política de cookies | Equity Partners",
      test: "Secciones de prueba | Equity Partners",
    },
  },
  ca: {
    nav: {
      home: "Inici",
      invest: "Invertir",
      about: "Nosaltres",
      portfolio: "Portafoli",
      partners: "Socis",
      blog: "Blog",
      test: "Proves",
      contactUs: "Contacte",
      selectLanguage: "Selecciona idioma",
    },
    footer: {
      cta: "Explora oportunitats",
      company: "Equity Partners",
      resources: "Recursos",
      contact: "Contacte",
      about: "Nosaltres",
      team: "Equip",
      projects: "Portafoli",
      marketReports: "Oportunitats",
      rightsReserved: "Tots els drets reservats.",
      privacyPolicy: "Política de privacitat",
      termsOfUse: "Termes d'ús",
      cookies: "Cookies",
      login: "Inicia sessió",
    },
    cookieBanner: {
      title: "Galetes",
      body: "Algunes són necessàries perquè el lloc funcioni. D'altres mesuren com s'utilitza o quins resultats obté la nostra publicitat. Vostè decideix quines.",
      acceptAll: "Acceptar-ho tot",
      rejectAll: "Rebutjar-ho tot",
      manage: "Gestionar preferències",
      policy: "Política de galetes",
      change: "Canviar les preferències de galetes",
      prefs: {
        title: "Gestionar preferències",
        close: "Tancar",
        save: "Desar les preferències",
        alwaysOn: "Sempre actives",
        essentialTitle: "Galetes essencials",
        essentialBody: "Necessàries perquè el lloc funcioni i sigui segur. No es poden desactivar.",
        analyticsTitle: "Galetes analítiques",
        analyticsBody: "Ens ajuden a entendre com s'utilitza el lloc, mitjançant Google Analytics.",
        marketingTitle: "Galetes de màrqueting",
        marketingBody: "Ens permeten mesurar el rendiment de la nostra publicitat i arribar a persones que hi han mostrat interès, mitjançant Meta.",
      },
    },
    pageTitles: {
      home: "Equity Partners | Grup immobiliari d'Andorra",
      about: "Sobre nosaltres | Equity Partners",
      partners: "Socis | Equity Partners",
      blog: "Blog | Equity Partners",
      contact: "Contacte | Equity Partners",
      privacyPolicy: "Política de privacitat | Equity Partners",
      termsOfUse: "Termes d'ús | Equity Partners",
      cookiePolicy: "Política de cookies | Equity Partners",
      test: "Seccions de prova | Equity Partners",
    },
  },
};

export function getUiTranslations(locale: Locale) {
  return uiTranslations[locale];
}

export function getPageTitle(locale: Locale, key: PageTitleKey) {
  return uiTranslations[locale].pageTitles[key];
}
