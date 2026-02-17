/**
 * Push new articles to WordPress (all locales via Polylang).
 *
 * Prerequisites:
 *   1. Create a WP Application Password:
 *      WP Admin → Users → Edit → Application Passwords
 *   2. Run with env vars:
 *      WP_USERNAME=admin WP_APP_PASSWORD=xxxx npx tsx scripts/push-articles-wp.ts <category-prefix>
 *
 * Examples:
 *   npx tsx scripts/push-articles-wp.ts histoire
 *   npx tsx scripts/push-articles-wp.ts actualites
 *   npx tsx scripts/push-articles-wp.ts decouverte
 *
 * This script:
 *   - Reads articles from scripts/articles-{prefix}-{locale}.json
 *   - Creates categories if they don't exist (per locale)
 *   - Creates posts in FR first, then translations linked via Polylang
 *   - Supports multiple categories per article
 *   - Supports explicit date field for post ordering
 */

const WP_API =
  process.env.NEXT_PUBLIC_WP_API_URL?.replace(/\/+$/, '') ||
  'https://admin.bateau-a-paris.fr/wp-json';

const WP_USERNAME = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

if (!WP_USERNAME || !WP_APP_PASSWORD) {
  console.error(
    'Missing credentials. Run with:\n' +
    '  WP_USERNAME=admin WP_APP_PASSWORD=xxxx npx tsx scripts/push-articles-wp.ts'
  );
  process.exit(1);
}

const AUTH_HEADER = `Basic ${Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64')}`;

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categories: string[];
  image?: string;
  date?: string;
  seo?: {
    title: string | null;
    description: string | null;
  };
}

const CATEGORY_PREFIX = process.argv[2] || 'histoire';

const LOCALES: { key: string; lang: string; file: string }[] = [
  { key: 'fr', lang: 'fr', file: `articles-${CATEGORY_PREFIX}-fr.json` },
  { key: 'en', lang: 'en', file: `articles-${CATEGORY_PREFIX}-en.json` },
  { key: 'es', lang: 'es', file: `articles-${CATEGORY_PREFIX}-es.json` },
  { key: 'it', lang: 'it', file: `articles-${CATEGORY_PREFIX}-it.json` },
  { key: 'de', lang: 'de', file: `articles-${CATEGORY_PREFIX}-de.json` },
  { key: 'pt-BR', lang: 'pt', file: `articles-${CATEGORY_PREFIX}-pt-BR.json` },
];

// --- Helpers ---

async function wpFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${WP_API}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH_HEADER,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WP API ${res.status}: ${text.slice(0, 300)}`);
  }

  return res.json();
}

/** Get or create a category by name for a given language. */
async function getOrCreateCategory(name: string, lang: string): Promise<number> {
  // Search existing categories
  const existing = await wpFetch(`/wp/v2/categories?search=${encodeURIComponent(name)}&lang=${lang}&per_page=100`);
  const found = existing.find((c: { name: string }) => c.name.toLowerCase() === name.toLowerCase());
  if (found) {
    console.log(`  Category "${name}" (${lang}) already exists: ID ${found.id}`);
    return found.id;
  }

  // Create new category
  const created = await wpFetch('/wp/v2/categories', {
    method: 'POST',
    body: JSON.stringify({ name, lang }),
  });
  console.log(`  Category "${name}" (${lang}) created: ID ${created.id}`);
  return created.id;
}

/** Create a WordPress post. */
async function createPost(article: Article, categoryIds: number[], lang: string): Promise<number> {
  const body: Record<string, unknown> = {
    title: article.title,
    slug: article.slug,
    content: article.content,
    excerpt: article.excerpt,
    status: 'publish',
    categories: categoryIds,
    lang,
  };

  // Set explicit date if provided (controls post ordering)
  if (article.date) {
    body.date = article.date;
  }

  // Add Yoast SEO fields if available
  if (article.seo) {
    body.yoast_head_json = undefined; // Read-only
    body.meta = {
      _yoast_wpseo_title: article.seo.title || '',
      _yoast_wpseo_metadesc: article.seo.description || '',
    };
  }

  const post = await wpFetch('/wp/v2/posts', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return post.id;
}

/** Link translations together via Polylang REST endpoint. */
async function linkTranslations(translationMap: Record<string, number>) {
  // Polylang uses pll_save_post to link translations
  // We need to update each post with the translation group
  const frId = translationMap['fr'];
  if (!frId) return;

  // Set translations on the FR post (Polylang links from source)
  try {
    await wpFetch(`/pll/v1/posts/${frId}`, {
      method: 'PUT',
      body: JSON.stringify({ translations: translationMap }),
    });
    console.log(`  Linked translations via Polylang for FR post ${frId}`);
  } catch (err: unknown) {
    // Polylang REST API might not be available, try alternative
    console.warn(`  Polylang REST linking failed, trying alternative...`);
    try {
      // Alternative: use wp/v2/posts with pll_translations meta
      for (const [lang, id] of Object.entries(translationMap)) {
        if (lang === 'fr') continue;
        await wpFetch(`/wp/v2/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            meta: { pll_translations: translationMap },
          }),
        });
      }
      console.log(`  Linked translations via meta for FR post ${frId}`);
    } catch (err2: unknown) {
      const msg = err2 instanceof Error ? err2.message : String(err2);
      console.warn(`  Could not auto-link translations: ${msg}`);
      console.warn(`  You may need to link them manually in WP admin.`);
    }
  }
}

// --- Main ---

async function main() {
  console.log(`Pushing articles to WordPress (prefix: ${CATEGORY_PREFIX})...\n`);
  console.log(`WP API: ${WP_API}`);
  console.log(`User: ${WP_USERNAME}\n`);

  const { readFileSync } = await import('fs');
  const { resolve, dirname } = await import('path');
  const { fileURLToPath } = await import('url');
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // Read FR articles to determine count
  const frFile = `articles-${CATEGORY_PREFIX}-fr.json`;
  const frArticles: Article[] = JSON.parse(
    readFileSync(resolve(__dirname, frFile), 'utf-8')
  );
  console.log(`Found ${frArticles.length} articles in ${frFile}\n`);

  for (let i = 0; i < frArticles.length; i++) {
    const slug = frArticles[i].slug;
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Article ${i + 1}/${frArticles.length}: ${slug}`);
    console.log('='.repeat(60));

    const translationMap: Record<string, number> = {};

    for (const locale of LOCALES) {
      console.log(`\n[${locale.key}] Processing...`);

      try {
        const filePath = resolve(__dirname, locale.file);
        const articles: Article[] = JSON.parse(readFileSync(filePath, 'utf-8'));
        const article = articles[i];

        if (!article) {
          console.error(`  Article index ${i} not found in ${locale.file}`);
          continue;
        }

        // Get or create all categories
        const categoryIds: number[] = [];
        for (const catName of (article.categories.length > 0 ? article.categories : ['Non classé'])) {
          categoryIds.push(await getOrCreateCategory(catName, locale.lang));
        }

        // Create post
        const postId = await createPost(article, categoryIds, locale.lang);
        translationMap[locale.lang] = postId;
        console.log(`  Created post: ID ${postId} (${article.title.slice(0, 50)}...)`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  [${locale.key}] Failed: ${msg}`);
      }
    }

    // Link translations
    if (Object.keys(translationMap).length > 1) {
      console.log(`\nLinking ${Object.keys(translationMap).length} translations...`);
      await linkTranslations(translationMap);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Done! Run "npm run import:posts" to refresh local JSON files.');
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Push failed:', err.message);
  process.exit(1);
});
