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
// WordPress API
import {
  getLandingPage as wpGetLandingPage,
  getAllLandingSlugs as wpGetAllLandingSlugs,
} from "@/lib/wordpress/client";
import { transformToLandingData } from "@/lib/wordpress/transformers";

/**
 * Registry of all landing pages (static fallback data).
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
 * Get a landing page by slug (sync, static data only).
 * Used as fallback when the API is unavailable.
 */
export function getLandingData(slug: string): LandingPageData | undefined {
  return landingPages[slug];
}

/**
 * Get a landing page by slug and locale (async, API-first with static fallback).
 * Tries WordPress REST API first, falls back to static TS files.
 */
export async function fetchLandingData(
  slug: string,
  locale = "fr"
): Promise<LandingPageData | undefined> {
  try {
    const wp = await wpGetLandingPage(slug, locale);
    if (wp) return transformToLandingData(wp);
  } catch {
    // API unavailable — fall through to static data
  }
  return landingPages[slug];
}

/**
 * Get all landing page slugs (for generateStaticParams / sitemap).
 * Tries WordPress API first, falls back to static registry.
 */
export async function fetchAllLandingSlugs(): Promise<string[]> {
  try {
    const slugs = await wpGetAllLandingSlugs();
    if (slugs.length > 0) return slugs;
  } catch {
    // API unavailable — fall through to static data
  }
  return Object.keys(landingPages);
}

/** Sync version for contexts that can't be async. */
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
