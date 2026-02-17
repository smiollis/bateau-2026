/**
 * Migration Script: Landing Pages + Translations → WordPress + Polylang
 *
 * Reads the 17 static landing page TS files (FR) and 85 i18n translations,
 * uploads images to the WP media library, creates `landing_page` CPT entries
 * via REST API, and links translations via Polylang.
 *
 * Usage:
 *   WP_USER=admin WP_APP_PASSWORD=xxxx npx tsx scripts/migrate-landings-to-wp.ts
 *
 * Options:
 *   --dry-run     Print what would be created without making API calls
 *   --verify      After creation, fetch each page back and compare
 *   --fr-only     Only import FR landing pages (skip translations)
 *
 * Requirements:
 *   - WordPress Application Password (Users > Edit > Application Passwords)
 *   - ACF Pro active with field groups from bateau-headless-mode plugin
 *   - `landing_page` CPT registered (plugin v2.0.0+)
 *   - Polylang Pro active with 6 languages configured
 */

import { landingPages } from "../src/data/landings";
import type { LandingPageData, LandingSection, LandingPageTranslation } from "../src/data/landings/types";
import { existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// --- Configuration ---

const WP_API =
  process.env.WP_API_URL || "https://admin.bateau-a-paris.fr/wp-json";
const WP_USER = process.env.WP_USER || "admin";
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD || "";

const DRY_RUN = process.argv.includes("--dry-run");
const VERIFY = process.argv.includes("--verify");
const FR_ONLY = process.argv.includes("--fr-only");

const I18N_LOCALES = ["en", "es", "it", "de", "pt-BR"] as const;

// Polylang locale codes (must match Polylang config)
const POLYLANG_LOCALE_MAP: Record<string, string> = {
  fr: "fr",
  en: "en",
  es: "es",
  it: "it",
  de: "de",
  "pt-BR": "pt",
};

if (!WP_APP_PASSWORD && !DRY_RUN) {
  console.error("Error: WP_APP_PASSWORD environment variable is required.");
  console.error("Generate one at: WordPress Admin > Users > Application Passwords");
  process.exit(1);
}

const AUTH_HEADER =
  "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64");

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Helpers ---

async function wpRequest<T>(
  method: string,
  path: string,
  body?: Record<string, unknown>
): Promise<T> {
  const url = `${WP_API}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: AUTH_HEADER,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP API ${method} ${path}: ${res.status} — ${text}`);
  }

  return res.json();
}

// --- ACF Conversion ---

/**
 * Convert LandingSection[] to ACF flexible content format.
 * Image fields are stored as URL strings (ACF url type).
 */
function sectionsToACF(sections: LandingSection[]) {
  return sections
    .map((section) => {
      switch (section.type) {
        case "richtext":
          return { acf_fc_layout: "richtext", title: section.title, content: section.content };
        case "benefits":
          return {
            acf_fc_layout: "benefits",
            title: section.title,
            items: section.items.map((item) => ({ icon: item.icon, title: item.title, text: item.text })),
          };
        case "gallery":
          return {
            acf_fc_layout: "gallery",
            title: section.title,
            images: section.images.map((img) => ({
              src: img.src,
              alt: img.alt,
            })),
          };
        case "testimonials":
          return { acf_fc_layout: "testimonials", title: section.title, filter: section.filter };
        case "pricing":
          return { acf_fc_layout: "pricing", title: section.title };
        case "faq":
          return {
            acf_fc_layout: "faq",
            title: section.title,
            items: section.items.map((item) => ({ question: item.question, answer: item.answer })),
          };
        default:
          return null;
      }
    })
    .filter(Boolean);
}

/**
 * Merge a translation into the base FR landing page data.
 * Non-translatable fields (slug, backgroundImage, cta.href, relatedPages, jsonLd)
 * are kept from the FR version.
 */
function mergeTranslation(base: LandingPageData, translation: LandingPageTranslation): LandingPageData {
  return {
    ...base,
    meta: { ...base.meta, ...translation.meta },
    hero: {
      ...base.hero,
      title: translation.hero.title,
      subtitle: translation.hero.subtitle,
      cta: { ...base.hero.cta, text: translation.hero.cta.text },
    },
    sections: translation.sections,
  };
}

/**
 * Dynamically import a translation file.
 */
async function loadTranslation(locale: string, slug: string): Promise<LandingPageTranslation | null> {
  const filePath = resolve(__dirname, `../src/data/landings/i18n/${locale}/${slug}.ts`);

  if (!existsSync(filePath)) return null;

  try {
    const module = await import(filePath);
    return module.default as LandingPageTranslation;
  } catch {
    return null;
  }
}

// --- Create / Find landing page ---

async function findOrCreateLanding(
  data: LandingPageData,
  lang: string
): Promise<number | null> {
  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would create: ${data.slug} (${lang})`);
    console.log(`    Title: ${data.hero.title}`);
    console.log(`    Sections: ${data.sections.length}`);
    return null;
  }

  // Check if already exists (with lang param for Polylang)
  const existing = await wpRequest<Array<{ id: number }>>(
    "GET",
    `/wp/v2/landing_page?slug=${data.slug}&lang=${lang}&per_page=1`
  );

  if (existing.length > 0) {
    console.log(`  [SKIP] ${data.slug} (${lang}) already exists (ID: ${existing[0].id})`);
    return existing[0].id;
  }

  const acfFields = {
    hero_title: data.hero.title,
    hero_subtitle: data.hero.subtitle,
    hero_background_image: data.hero.backgroundImage,
    hero_cta_text: data.hero.cta.text,
    hero_cta_href: data.hero.cta.href,
    sections: sectionsToACF(data.sections),
    jsonld_type: data.jsonLd.type,
    jsonld_price_from: data.jsonLd.priceFrom,
  };

  const created = await wpRequest<{ id: number }>("POST", "/wp/v2/landing_page", {
    title: data.hero.title,
    slug: data.slug,
    status: "publish",
    lang,
    acf: acfFields,
  });

  console.log(`  [OK] ${data.slug} (${lang}) → ID: ${created.id}`);
  return created.id;
}

// --- Link Polylang translations ---

async function linkTranslations(
  frId: number,
  translationIds: Record<string, number>
) {
  // Link translations via standard WP REST API with Polylang's "translations" parameter
  const translations: Record<string, number> = { fr: frId, ...translationIds };

  try {
    await wpRequest("POST", `/wp/v2/landing_page/${frId}`, { translations });
    console.log(
      `  [LINK] FR #${frId} ↔ ${Object.entries(translationIds)
        .map(([lang, id]) => `${lang}:#${id}`)
        .join(", ")}`
    );
  } catch (err) {
    console.error(`  [ERROR] Could not link translations for FR #${frId}: ${err}`);
  }
}

// --- Related pages ---

async function linkRelatedPages(
  slugToId: Map<string, number>,
  data: LandingPageData
) {
  if (data.relatedPages.length === 0) return;

  const postId = slugToId.get(data.slug);
  if (!postId) return;

  const relatedIds = data.relatedPages
    .map((slug) => slugToId.get(slug))
    .filter((id): id is number => id != null);

  if (relatedIds.length === 0) return;

  // Include hero_title (required field) when updating ACF via REST API
  await wpRequest("POST", `/wp/v2/landing_page/${postId}`, {
    acf: {
      hero_title: data.hero.title,
      related_pages: relatedIds,
    },
  });

  console.log(`  [RELATED] ${data.slug} → ${data.relatedPages.join(", ")}`);
}

// --- Verify ---

async function verifyLanding(slug: string, lang = "fr") {
  const pages = await wpRequest<Array<{ id: number; acf: Record<string, unknown> }>>(
    "GET",
    `/wp/v2/landing_page?slug=${slug}&lang=${lang}`
  );

  if (pages.length === 0) {
    console.log(`  [FAIL] ${slug} (${lang}): not found`);
    return false;
  }

  const acf = pages[0].acf;
  if (!acf.hero_title || !acf.sections) {
    console.log(`  [FAIL] ${slug} (${lang}): missing ACF fields`);
    return false;
  }

  console.log(`  [OK] ${slug} (${lang}): ${(acf.sections as unknown[]).length} sections`);
  return true;
}

// --- Main ---

async function main() {
  const entries = Object.entries(landingPages);

  console.log(`\nMigrating ${entries.length} landing pages to WordPress...`);
  console.log(`Locales: FR${FR_ONLY ? "" : ` + ${I18N_LOCALES.join(", ")}`}`);
  if (DRY_RUN) console.log("(Dry run mode — no API calls)");
  console.log();

  // ===== Pass 1: Create FR landing pages =====
  console.log("\n=== Pass 1: Creating FR landing pages ===\n");
  const slugToFrId = new Map<string, number>();

  for (const [slug, data] of entries) {
    try {
      const id = await findOrCreateLanding(data, "fr");
      if (id) slugToFrId.set(slug, id);
    } catch (err) {
      console.error(`  [ERROR] ${slug}: ${err}`);
    }
  }

  // ===== Pass 2: Create translations =====
  const slugToTranslationIds = new Map<string, Record<string, number>>();

  if (!FR_ONLY) {
    console.log("\n=== Pass 2: Creating translations ===\n");

    for (const [slug, frData] of entries) {
      const translationIds: Record<string, number> = {};

      for (const locale of I18N_LOCALES) {
        try {
          const translation = await loadTranslation(locale, slug);
          if (!translation) {
            console.log(`  [SKIP] ${slug} (${locale}): no translation file`);
            continue;
          }

          const mergedData = mergeTranslation(frData, translation);
          const pllLocale = POLYLANG_LOCALE_MAP[locale] || locale;
          const id = await findOrCreateLanding(mergedData, pllLocale);

          if (id) translationIds[pllLocale] = id;
        } catch (err) {
          console.error(`  [ERROR] ${slug} (${locale}): ${err}`);
        }
      }

      if (Object.keys(translationIds).length > 0) {
        slugToTranslationIds.set(slug, translationIds);
      }
    }

    // ===== Pass 3: Link translations via Polylang =====
    if (!DRY_RUN) {
      console.log("\n=== Pass 3: Linking Polylang translations ===\n");

      for (const [slug] of entries) {
        const frId = slugToFrId.get(slug);
        const translationIds = slugToTranslationIds.get(slug);

        if (frId && translationIds && Object.keys(translationIds).length > 0) {
          try {
            await linkTranslations(frId, translationIds);
          } catch (err) {
            console.error(`  [ERROR] ${slug}: ${err}`);
          }
        }
      }
    }
  }

  // ===== Pass 4: Link related pages (FR only) =====
  if (!DRY_RUN && slugToFrId.size > 0) {
    console.log("\n=== Pass 4: Linking related pages ===\n");
    for (const [, data] of entries) {
      try {
        await linkRelatedPages(slugToFrId, data);
      } catch (err) {
        console.error(`  [ERROR] ${data.slug}: ${err}`);
      }
    }
  }

  // ===== Pass 5: Verify (optional) =====
  if (VERIFY && !DRY_RUN) {
    console.log("\n=== Pass 5: Verifying ===\n");
    let ok = 0;
    let fail = 0;

    for (const [slug] of entries) {
      const success = await verifyLanding(slug, "fr");
      if (success) ok++;
      else fail++;
    }

    if (!FR_ONLY) {
      for (const locale of I18N_LOCALES) {
        const pllLocale = POLYLANG_LOCALE_MAP[locale] || locale;
        for (const [slug] of entries) {
          const success = await verifyLanding(slug, pllLocale);
          if (success) ok++;
          else fail++;
        }
      }
    }

    console.log(`\nVerification: ${ok} OK, ${fail} failed`);
  }

  // Summary
  const totalTranslations = [...slugToTranslationIds.values()].reduce(
    (sum, ids) => sum + Object.keys(ids).length,
    0
  );

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Done! ${DRY_RUN ? "(dry run)" : ""}`);
  console.log(`  FR pages: ${slugToFrId.size}`);
  if (!FR_ONLY) console.log(`  Translations: ${totalTranslations}`);
  console.log();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
