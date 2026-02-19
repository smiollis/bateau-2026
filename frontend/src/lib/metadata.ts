import { locales } from "@/i18n/routing";
import slugMap from "@/data/slug-map.json";

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

const typedSlugMap = slugMap as Record<string, Record<string, string>>;

/**
 * Generate locale-aware alternates for blog articles.
 * Uses slug-map.json to resolve locale-specific slugs (e.g. "-2" suffix from Polylang).
 */
export function getBlogAlternates(locale: string, slug: string) {
  // Find the FR slug key for this article
  let frSlug: string | undefined;

  if (locale === "fr") {
    frSlug = slug;
  } else {
    for (const [key, mapping] of Object.entries(typedSlugMap)) {
      if (mapping[locale] === slug) {
        frSlug = key;
        break;
      }
    }
  }

  if (!frSlug || !typedSlugMap[frSlug]) {
    return getAlternates(locale, `/actualites/${slug}`);
  }

  const mapping = typedSlugMap[frSlug];
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `/${loc}/actualites/${mapping?.[loc] || slug}`;
  }
  languages["x-default"] = `/fr/actualites/${frSlug}`;

  return {
    canonical: `/${locale}/actualites/${slug}`,
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

/**
 * Get OpenGraph alternate locales (all locales except the current one).
 */
export function getOgAlternateLocales(locale: string) {
  return locales.filter((l) => l !== locale).map((l) => ogLocaleMap[l] ?? "fr_FR");
}
