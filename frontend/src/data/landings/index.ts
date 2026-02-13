import type { LandingPageData } from "./types";
import { evjfSeine } from "./evjf-seine";
import { evgSeine } from "./evg-seine";
import { croisiereRomantiqueSeine } from "./croisiere-romantique-seine";
import { demandeEnMariageSeine } from "./demande-en-mariage-seine";
import { anniversaireSeine } from "./anniversaire-seine";
import { soireeEntreAmisSeine } from "./soiree-entre-amis-seine";

/**
 * Registry of all landing pages.
 * Each new landing file should be imported and added here.
 */
const landingPages: Record<string, LandingPageData> = {
  "evjf-seine": evjfSeine,
  "evg-seine": evgSeine,
  "croisiere-romantique-seine": croisiereRomantiqueSeine,
  "demande-en-mariage-seine": demandeEnMariageSeine,
  "anniversaire-seine": anniversaireSeine,
  "soiree-entre-amis-seine": soireeEntreAmisSeine,
};

/**
 * Get a landing page by slug. Returns undefined if not found.
 */
export function getLandingData(slug: string): LandingPageData | undefined {
  return landingPages[slug];
}

/**
 * Get all landing page slugs (for generateStaticParams / sitemap).
 */
export function getAllLandingSlugs(): string[] {
  return Object.keys(landingPages);
}

/**
 * Get minimal data for related pages display.
 */
export function getRelatedPages(slugs: string[]) {
  return slugs
    .map((slug) => landingPages[slug])
    .filter(Boolean)
    .map(({ slug, hero, meta }) => ({ slug, hero, meta }));
}

export { landingPages };
