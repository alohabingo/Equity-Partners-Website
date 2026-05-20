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
  };
  pageTitles: Record<PageTitleKey, string>;
};

export const uiTranslations: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: "Home",
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
