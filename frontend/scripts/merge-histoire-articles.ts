/**
 * merge-histoire-articles.ts
 *
 * Merge the 3 new Histoire articles from scripts/articles-histoire-{locale}.json
 * into the main src/data/posts*.json files for all 6 locales.
 *
 * Usage: npx tsx scripts/merge-histoire-articles.ts
 */

import fs from "fs";
import path from "path";

const FRONTEND = path.resolve(__dirname, "..");
const DATA_DIR = path.join(FRONTEND, "src/data");
const SCRIPTS_DIR = path.join(FRONTEND, "scripts");

// Locale → data file name mapping
const LOCALE_MAP: Record<string, string> = {
  fr: "posts.json",
  en: "posts-en.json",
  es: "posts-es.json",
  it: "posts-it.json",
  de: "posts-de.json",
  "pt-BR": "posts-pt-BR.json",
};

// IDs and dates for the 3 new articles (same across all locales, matched by slug order)
const NEW_ARTICLES_META = [
  { id: 13001, date: "2025-01-15T10:00:00", link: "" },
  { id: 13002, date: "2025-02-01T10:00:00", link: "" },
  { id: 13003, date: "2025-02-15T10:00:00", link: "" },
];

let totalAdded = 0;

for (const [locale, dataFile] of Object.entries(LOCALE_MAP)) {
  const dataPath = path.join(DATA_DIR, dataFile);
  const histoirePath = path.join(SCRIPTS_DIR, `articles-histoire-${locale}.json`);

  if (!fs.existsSync(histoirePath)) {
    console.warn(`⚠ Missing ${histoirePath}, skipping ${locale}`);
    continue;
  }

  const posts = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const histoireArticles = JSON.parse(fs.readFileSync(histoirePath, "utf8"));

  const existingSlugs = new Set(posts.map((p: any) => p.slug));
  let added = 0;

  for (let i = 0; i < histoireArticles.length; i++) {
    const article = histoireArticles[i];
    const meta = NEW_ARTICLES_META[i];

    if (existingSlugs.has(article.slug)) {
      console.log(`  ✓ [${locale}] ${article.slug} already exists, skipping`);
      continue;
    }

    posts.push({
      id: meta.id,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image: "", // Will be assigned by assign-images.ts
      date: meta.date,
      categories: article.categories,
      link: meta.link,
      slug: article.slug,
    });
    added++;
  }

  if (added > 0) {
    fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2) + "\n", "utf8");
    console.log(`✅ [${locale}] Added ${added} articles → ${dataFile} (total: ${posts.length})`);
    totalAdded += added;
  } else {
    console.log(`  [${locale}] No new articles to add`);
  }
}

console.log(`\nDone. Total articles added across all locales: ${totalAdded}`);
