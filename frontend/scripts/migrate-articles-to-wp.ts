/**
 * Migration Script: Article Translations → WordPress + Polylang
 *
 * Creates translated versions of the 31 FR articles in WordPress
 * using content from the static JSON files, then links them via Polylang.
 *
 * Usage:
 *   WP_USER=smiollis_ksznq4wm WP_APP_PASSWORD=xxxx npx tsx scripts/migrate-articles-to-wp.ts
 *
 * Options:
 *   --dry-run     Print what would be created without making API calls
 *   --verify      After creation, verify all translations are linked
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// --- Configuration ---

const WP_API =
  process.env.WP_API_URL || "https://admin.bateau-a-paris.fr/wp-json";
const WP_USER = process.env.WP_USER || "smiollis_ksznq4wm";
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD || "";

const DRY_RUN = process.argv.includes("--dry-run");
const VERIFY = process.argv.includes("--verify");

const LOCALES = ["en", "es", "it", "de", "pt"] as const;

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
  process.exit(1);
}

const AUTH_HEADER =
  "Basic " + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64");

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Types ---

interface StaticPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  link: string;
  slug: string;
}

interface WPPost {
  id: number;
  slug: string;
  lang: string;
  translations: Record<string, number>;
}

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

function loadPosts(locale: string): StaticPost[] {
  const suffix = locale === "fr" ? "" : `-${locale}`;
  const filePath = resolve(__dirname, `../src/data/posts${suffix}.json`);
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

// --- Category mapping ---

// WP category IDs (from the API)
const CATEGORY_MAP_FR: Record<string, number> = {
  "Découverte": 19,
  "Histoire": 22,
  "Pont de Paris": 23,
  "Actualités Un Bateau à Paris": 26,
};

// For translated posts, we'll use the same category as FR
// (Polylang should handle category translation if needed)

// --- Existing EN articles (already in WP, skip creation) ---

const EXISTING_EN: Record<number, number> = {
  // FR_ID: EN_WP_ID
  7027: 7028,
  6287: 6288,
  4712: 5779,
  5258: 5786,
  5578: 5790,
  6645: 6646,
};

// --- Main ---

async function main() {
  const frPosts = loadPosts("fr");

  console.log(`\nMigrating ${frPosts.length} articles × ${LOCALES.length} languages to WordPress...`);
  if (DRY_RUN) console.log("(Dry run mode — no API calls)");
  console.log();

  // ===== Pass 1: Get FR article WP IDs =====
  console.log("=== Pass 1: Mapping FR articles ===\n");

  const frIdToWpId = new Map<number, number>();
  const frWpPosts = await wpRequest<WPPost[]>(
    "GET",
    "/wp/v2/posts?lang=fr&per_page=100&_fields=id,slug,translations"
  );

  for (const wpPost of frWpPosts) {
    // Match by slug
    const staticPost = frPosts.find((p) => p.slug === wpPost.slug);
    if (staticPost) {
      frIdToWpId.set(staticPost.id, wpPost.id);
    }
  }

  console.log(`  Mapped ${frIdToWpId.size}/${frPosts.length} FR articles to WP IDs\n`);

  // Handle articles not found by slug (match by WP ID directly)
  for (const post of frPosts) {
    if (!frIdToWpId.has(post.id)) {
      // Check if the WP ID matches directly
      const wpPost = frWpPosts.find((wp) => wp.id === post.id);
      if (wpPost) {
        frIdToWpId.set(post.id, wpPost.id);
        console.log(`  [MATCH by ID] ${post.slug} → WP#${wpPost.id}`);
      } else {
        console.log(`  [WARN] Could not find FR article: ${post.slug} (ID: ${post.id})`);
      }
    }
  }

  // ===== Pass 2: Create translations =====
  console.log("\n=== Pass 2: Creating translations ===\n");

  // translationMap: FR_WP_ID -> { en: WP_ID, es: WP_ID, ... }
  const translationMap = new Map<number, Record<string, number>>();

  for (const locale of LOCALES) {
    const fileLocale = locale === "pt" ? "pt-BR" : locale;
    const pllLocale = POLYLANG_LOCALE_MAP[fileLocale] || locale;
    const translatedPosts = loadPosts(fileLocale);

    console.log(`\n--- ${locale.toUpperCase()} (${translatedPosts.length} articles) ---\n`);

    for (const post of translatedPosts) {
      const frWpId = frIdToWpId.get(post.id);
      if (!frWpId) {
        console.log(`  [SKIP] ${post.slug}: no FR WP match`);
        continue;
      }

      // Check if EN translation already exists
      if (locale === "en" && EXISTING_EN[post.id]) {
        const existingEnId = EXISTING_EN[post.id];
        console.log(`  [EXISTS] ${post.slug} (${locale}) → EN#${existingEnId}`);

        if (!translationMap.has(frWpId)) translationMap.set(frWpId, {});
        translationMap.get(frWpId)![pllLocale] = existingEnId;
        continue;
      }

      if (DRY_RUN) {
        console.log(`  [DRY RUN] Would create: ${post.slug} (${locale})`);
        console.log(`    Title: ${post.title.substring(0, 60)}`);
        continue;
      }

      // Check if already exists
      try {
        const existing = await wpRequest<Array<{ id: number }>>(
          "GET",
          `/wp/v2/posts?slug=${encodeURIComponent(post.slug)}&lang=${pllLocale}&per_page=1&_fields=id`
        );

        if (existing.length > 0) {
          console.log(`  [SKIP] ${post.slug} (${locale}) already exists → WP#${existing[0].id}`);
          if (!translationMap.has(frWpId)) translationMap.set(frWpId, {});
          translationMap.get(frWpId)![pllLocale] = existing[0].id;
          continue;
        }
      } catch {
        // Continue with creation
      }

      // Find FR category ID
      const frPost = frPosts.find((p) => p.id === post.id);
      const categoryId = frPost ? CATEGORY_MAP_FR[frPost.category] : undefined;

      try {
        const created = await wpRequest<{ id: number }>("POST", "/wp/v2/posts", {
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          status: "publish",
          date: post.date,
          lang: pllLocale,
          ...(categoryId ? { categories: [categoryId] } : {}),
        });

        console.log(`  [OK] ${post.slug} (${locale}) → WP#${created.id}`);

        if (!translationMap.has(frWpId)) translationMap.set(frWpId, {});
        translationMap.get(frWpId)![pllLocale] = created.id;
      } catch (err) {
        console.error(`  [ERROR] ${post.slug} (${locale}): ${err}`);
      }
    }
  }

  // ===== Pass 3: Link translations via Polylang =====
  if (!DRY_RUN) {
    console.log("\n=== Pass 3: Linking Polylang translations ===\n");

    let linked = 0;
    for (const [frWpId, langIds] of translationMap) {
      if (Object.keys(langIds).length === 0) continue;

      const translations: Record<string, number> = { fr: frWpId, ...langIds };

      try {
        await wpRequest("POST", `/wp/v2/posts/${frWpId}`, { translations });
        const langSummary = Object.entries(langIds)
          .map(([lang, id]) => `${lang}:#${id}`)
          .join(", ");
        console.log(`  [LINK] FR#${frWpId} ↔ ${langSummary}`);
        linked++;
      } catch (err) {
        console.error(`  [ERROR] linking FR#${frWpId}: ${err}`);
      }
    }

    console.log(`\n  Linked ${linked} article groups`);
  }

  // ===== Pass 4: Verify =====
  if (VERIFY && !DRY_RUN) {
    console.log("\n=== Pass 4: Verifying ===\n");

    let ok = 0;
    let fail = 0;

    for (const [frWpId] of translationMap) {
      try {
        const post = await wpRequest<WPPost>(
          "GET",
          `/wp/v2/posts/${frWpId}?_fields=id,slug,translations`
        );
        const numTranslations = Object.keys(post.translations).length;
        if (numTranslations >= 2) {
          console.log(`  [OK] FR#${frWpId} (${post.slug}): ${numTranslations} languages`);
          ok++;
        } else {
          console.log(`  [FAIL] FR#${frWpId} (${post.slug}): only ${numTranslations} language`);
          fail++;
        }
      } catch (err) {
        console.error(`  [FAIL] FR#${frWpId}: ${err}`);
        fail++;
      }
    }

    console.log(`\nVerification: ${ok} OK, ${fail} failed`);
  }

  // Summary
  const totalCreated = [...translationMap.values()].reduce(
    (sum, ids) => sum + Object.keys(ids).length,
    0
  );

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Done! ${DRY_RUN ? "(dry run)" : ""}`);
  console.log(`  FR articles: ${frIdToWpId.size}`);
  console.log(`  Translations: ${totalCreated}`);
  console.log();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
