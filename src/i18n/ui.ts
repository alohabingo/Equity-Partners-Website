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
    accept: string;
    reject: string;
    policy: string;
    /** The link on the policy page that brings the banner back. */
    change: string;
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
      body: "Some are needed to run the site. Others measure how it is used and how our advertising performs — only if you say yes.",
      accept: "Accept",
      reject: "Reject",
      policy: "Cookie policy",
      change: "Change your cookie choices",
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
      body: "Algunas son necesarias para que el sitio funcione. Otras miden cómo se utiliza y qué resultados obtiene nuestra publicidad, solo si usted lo acepta.",
      accept: "Aceptar",
      reject: "Rechazar",
      policy: "Política de cookies",
      change: "Cambiar sus preferencias de cookies",
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
      body: "Algunes són necessàries perquè el lloc funcioni. D'altres mesuren com s'utilitza i quins resultats obté la nostra publicitat, només si hi doneu el vostre consentiment.",
      accept: "Acceptar",
      reject: "Rebutjar",
      policy: "Política de galetes",
      change: "Canviar les preferències de galetes",
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
