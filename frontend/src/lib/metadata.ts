import { locales } from "@/i18n/routing";

/**
 * Generate alternates metadata (canonical + hreflang) for a given page.
 * @param locale - Current locale
 * @param pagePath - Page path without locale prefix (e.g., "/croisiere", "" for homepage)
 */
export function getAlternates(locale: string, pagePath: string = "") {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `/${loc}${pagePath}`;
  }
  languages["x-default"] = `/fr${pagePath}`;

  return {
    canonical: `/${locale}${pagePath}`,
    languages,
  };
}

const ogLocaleMap: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
  es: "es_ES",
  it: "it_IT",
  de: "de_DE",
  "pt-BR": "pt_BR",
};

/**
 * Get OpenGraph locale based on current locale.
 */
export function getOgLocale(locale: string) {
  return ogLocaleMap[locale] ?? "fr_FR";
}
