import type { LandingPageData } from "./types";
import { evjfSeine } from "./evjf-seine";
import { evgSeine } from "./evg-seine";
import { croisiereRomantiqueSeine } from "./croisiere-romantique-seine";
import { demandeEnMariageSeine } from "./demande-en-mariage-seine";
import { anniversaireSeine } from "./anniversaire-seine";
import { soireeEntreAmisSeine } from "./soiree-entre-amis-seine";
// Tier 2
import { anniversaireMariageSeine } from "./anniversaire-mariage-seine";
import { teamBuildingSeine } from "./team-building-seine";
import { croisiereFamilleSeine } from "./croisiere-famille-seine";
import { shootingPhotoSeine } from "./shooting-photo-seine";
import { coucherSoleilSeine } from "./coucher-soleil-seine";
import { aperoBateauSeine } from "./apero-bateau-seine";
// Tier 3
import { saintValentinSeine } from "./saint-valentin-seine";
import { nouvelAnSeine } from "./nouvel-an-seine";
import { noelSeine } from "./noel-seine";
import { feteDesMeresSeine } from "./fete-des-meres-seine";
import { seminaireSeine } from "./seminaire-seine";

/**
 * Registry of all landing pages.
 * Each new landing file should be imported and added here.
 */
const landingPages: Record<string, LandingPageData> = {
  // Tier 1
  "evjf-seine": evjfSeine,
  "evg-seine": evgSeine,
  "croisiere-romantique-seine": croisiereRomantiqueSeine,
  "demande-en-mariage-seine": demandeEnMariageSeine,
  "anniversaire-seine": anniversaireSeine,
  "soiree-entre-amis-seine": soireeEntreAmisSeine,
  // Tier 2
  "anniversaire-mariage-seine": anniversaireMariageSeine,
  "team-building-seine": teamBuildingSeine,
  "croisiere-famille-seine": croisiereFamilleSeine,
  "shooting-photo-seine": shootingPhotoSeine,
  "coucher-soleil-seine": coucherSoleilSeine,
  "apero-bateau-seine": aperoBateauSeine,
  // Tier 3
  "saint-valentin-seine": saintValentinSeine,
  "nouvel-an-seine": nouvelAnSeine,
  "noel-seine": noelSeine,
  "fete-des-meres-seine": feteDesMeresSeine,
  "seminaire-seine": seminaireSeine,
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
    .filter((page): page is LandingPageData => page != null)
    .map(({ slug, hero, meta }) => ({ slug, hero, meta }));
}

export { landingPages };
