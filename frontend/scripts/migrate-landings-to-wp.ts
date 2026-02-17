/**
 * Migration Script: Landing Pages → WordPress
 *
 * Reads the 17 static landing page TS files and creates them as
 * `landing_page` custom post type entries in WordPress via REST API,
 * populating ACF fields to match the existing data structure.
 *
 * Usage:
 *   WP_USER=admin WP_APP_PASSWORD=xxxx npx tsx scripts/migrate-landings-to-wp.ts
 *
 * Options:
 *   --dry-run     Print what would be created without making API calls
 *   --verify      After creation, fetch each page back and compare
 *
 * Requirements:
 *   - WordPress Application Password (Users > Edit > Application Passwords)
 *   - ACF Pro active with field groups from bateau-headless-mode plugin
 *   - `landing_page` CPT registered (plugin v2.0.0+)
 */

import { landingPages } from "../src/data/landings";
import type { LandingPageData, LandingSection } from "../src/data/landings/types";

// --- Configuration ---

const WP_API =
  process.env.WP_API_URL || "https://admin.bateau-a-paris.fr/wp-json";
const WP_USER = process.env.WP_USER || "admin";
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD || "";

const DRY_RUN = process.argv.includes("--dry-run");
const VERIFY = process.argv.includes("--verify");

if (!WP_APP_PASSWORD && !DRY_RUN) {
  console.error("Error: WP_APP_PASSWORD environment variable is required.");
  console.error("Generate one at: WordPress Admin > Users > Application Passwords");
  process.exit(1);
}

const AUTH_HEADER =
  "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64");

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

/**
 * Convert LandingSection[] to ACF flexible content format.
 * ACF flexible content expects: [{ acf_fc_layout: "type", ...fields }]
 */
function sectionsToACF(sections: LandingSection[]) {
  return sections.map((section) => {
    switch (section.type) {
      case "richtext":
        return {
          acf_fc_layout: "richtext",
          title: section.title,
          content: section.content,
        };
      case "benefits":
        return {
          acf_fc_layout: "benefits",
          title: section.title,
          items: section.items.map((item) => ({
            icon: item.icon,
            title: item.title,
            text: item.text,
          })),
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
        return {
          acf_fc_layout: "testimonials",
          title: section.title,
          filter: section.filter,
        };
      case "pricing":
        return {
          acf_fc_layout: "pricing",
          title: section.title,
        };
      case "faq":
        return {
          acf_fc_layout: "faq",
          title: section.title,
          items: section.items.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
        };
      default:
        return null;
    }
  }).filter(Boolean);
}

// --- Main ---

async function migrateLanding(data: LandingPageData) {
  const acfFields = {
    hero_title: data.hero.title,
    hero_subtitle: data.hero.subtitle,
    hero_background_image: data.hero.backgroundImage,
    hero_cta_text: data.hero.cta.text,
    hero_cta_href: data.hero.cta.href,
    sections: sectionsToACF(data.sections),
    jsonld_type: data.jsonLd.type,
    jsonld_price_from: data.jsonLd.priceFrom,
    // related_pages will be linked in a second pass
  };

  if (DRY_RUN) {
    console.log(`  [DRY RUN] Would create: ${data.slug}`);
    console.log(`    Title: ${data.hero.title}`);
    console.log(`    Sections: ${data.sections.length}`);
    console.log(`    JSON-LD: ${data.jsonLd.type} (${data.jsonLd.priceFrom}€)`);
    return null;
  }

  // Check if already exists
  const existing = await wpRequest<Array<{ id: number }>>(
    "GET",
    `/wp/v2/landing_page?slug=${data.slug}&per_page=1`
  );

  if (existing.length > 0) {
    console.log(`  [SKIP] ${data.slug} already exists (ID: ${existing[0].id})`);
    return existing[0].id;
  }

  const created = await wpRequest<{ id: number }>("POST", "/wp/v2/landing_page", {
    title: data.hero.title,
    slug: data.slug,
    status: "publish",
    acf: acfFields,
  });

  console.log(`  [OK] ${data.slug} → ID: ${created.id}`);
  return created.id;
}

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

  await wpRequest("POST", `/wp/v2/landing_page/${postId}`, {
    acf: { related_pages: relatedIds },
  });

  console.log(
    `  [LINK] ${data.slug} → related: ${data.relatedPages.join(", ")}`
  );
}

async function verifyLanding(slug: string) {
  const pages = await wpRequest<Array<{ id: number; slug: string; acf: Record<string, unknown> }>>(
    "GET",
    `/wp/v2/landing_page?slug=${slug}`
  );

  if (pages.length === 0) {
    console.log(`  [FAIL] ${slug}: not found in API`);
    return false;
  }

  const page = pages[0];
  const acf = page.acf;

  if (!acf.hero_title) {
    console.log(`  [FAIL] ${slug}: missing hero_title`);
    return false;
  }

  if (!acf.sections || !Array.isArray(acf.sections)) {
    console.log(`  [FAIL] ${slug}: missing sections`);
    return false;
  }

  console.log(
    `  [VERIFY OK] ${slug}: ${(acf.sections as unknown[]).length} sections, hero="${acf.hero_title}"`
  );
  return true;
}

async function main() {
  const entries = Object.entries(landingPages);

  console.log(`\nMigrating ${entries.length} landing pages to WordPress...\n`);
  if (DRY_RUN) console.log("(Dry run mode — no API calls)\n");

  // Pass 1: Create all landing pages
  console.log("--- Pass 1: Creating landing pages ---\n");
  const slugToId = new Map<string, number>();

  for (const [slug, data] of entries) {
    try {
      const id = await migrateLanding(data);
      if (id) slugToId.set(slug, id);
    } catch (err) {
      console.error(`  [ERROR] ${slug}: ${err}`);
    }
  }

  // Pass 2: Link related pages
  if (!DRY_RUN && slugToId.size > 0) {
    console.log("\n--- Pass 2: Linking related pages ---\n");
    for (const [, data] of entries) {
      try {
        await linkRelatedPages(slugToId, data);
      } catch (err) {
        console.error(`  [ERROR] ${data.slug}: ${err}`);
      }
    }
  }

  // Pass 3: Verify (optional)
  if (VERIFY && !DRY_RUN) {
    console.log("\n--- Pass 3: Verifying ---\n");
    let ok = 0;
    let fail = 0;
    for (const [slug] of entries) {
      const success = await verifyLanding(slug);
      if (success) ok++;
      else fail++;
    }
    console.log(`\nVerification: ${ok} OK, ${fail} failed out of ${entries.length}`);
  }

  console.log(
    `\nDone! ${DRY_RUN ? "(dry run)" : `${slugToId.size} pages created/verified`}`
  );
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
