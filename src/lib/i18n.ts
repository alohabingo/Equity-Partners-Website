export const supportedLocales = ["en", "es", "ca"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && supportedLocales.includes(value as Locale);
}

export function getLocaleFromUrl(url: URL): Locale {
  const pathLocale = url.pathname.split("/").filter(Boolean)[0];
  if (isLocale(pathLocale)) return pathLocale;
  const searchLocale = url.searchParams.get("lang");
  if (isLocale(searchLocale)) return searchLocale;
  return defaultLocale;
}

export function buildLocalizedPath(path: string, locale: Locale): string {
  const normalizedPath = path || "/";
  const [rawPathname, search = ""] = normalizedPath.split("?");
  const pathname = rawPathname || "/";
  const strippedPath = pathname.replace(/^\/(en|es|ca)(?=\/|$)/, "") || "/";
  const localizedPath =
    locale === defaultLocale
      ? strippedPath
      : `/${locale}${strippedPath === "/" ? "" : strippedPath}`;

  return search ? `${localizedPath}?${search}` : localizedPath;
}

export function withLocalizedHash(path: string, hash: string, locale: Locale): string {
  return `${buildLocalizedPath(path, locale)}${hash}`;
}
