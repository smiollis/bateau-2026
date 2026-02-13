/**
 * Generate alternates metadata (canonical + hreflang) for a given page.
 * @param locale - Current locale ("fr" or "en")
 * @param pagePath - Page path without locale prefix (e.g., "/croisiere", "" for homepage)
 */
export function getAlternates(locale: string, pagePath: string = "") {
  return {
    canonical: `/${locale}${pagePath}`,
    languages: {
      fr: `/fr${pagePath}`,
      en: `/en${pagePath}`,
      "x-default": `/fr${pagePath}`,
    },
  };
}

/**
 * Get OpenGraph locale based on current locale.
 */
export function getOgLocale(locale: string) {
  return locale === "en" ? "en_US" : "fr_FR";
}
