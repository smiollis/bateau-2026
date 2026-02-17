/**
 * Import WordPress posts to local JSON files (all locales).
 *
 * Fetches posts for 6 locales via Polylang ?lang= parameter
 * and writes one JSON file per locale under src/data/.
 *
 * Usage:
 *   npx tsx scripts/import-posts.ts
 *   npm run import:posts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const WP_API =
  process.env.NEXT_PUBLIC_WP_API_URL?.replace(/\/+$/, '') ||
  'https://admin.bateau-a-paris.fr/wp-json';

/**
 * Locale configuration.
 *   key   = internal locale code
 *   lang  = Polylang ?lang= value (lowercase)
 *   file  = output filename under src/data/
 */
const LOCALES: { key: string; lang: string; file: string }[] = [
  { key: 'fr',    lang: 'fr',    file: 'posts.json' },
  { key: 'en',    lang: 'en',    file: 'posts-en.json' },
  { key: 'es',    lang: 'es',    file: 'posts-es.json' },
  { key: 'it',    lang: 'it',    file: 'posts-it.json' },
  { key: 'de',    lang: 'de',    file: 'posts-de.json' },
  { key: 'pt-BR', lang: 'pt',    file: 'posts-pt-BR.json' },
];

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  categories: string[];
  link: string;
  slug: string;
}

/** Decode named & numeric HTML entities. */
function decodeEntities(text: string): string {
  return text
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&hellip;/g, '\u2026')
    .replace(/&eacute;/g, '\u00E9')
    .replace(/&egrave;/g, '\u00E8')
    .replace(/&agrave;/g, '\u00E0')
    .replace(/&ccedil;/g, '\u00E7')
    .replace(/&ocirc;/g, '\u00F4')
    .replace(/&ucirc;/g, '\u00FB')
    .replace(/&icirc;/g, '\u00EE')
    .replace(/&acirc;/g, '\u00E2')
    .replace(/&ecirc;/g, '\u00EA')
    .replace(/&euml;/g, '\u00EB')
    .replace(/&iuml;/g, '\u00EF')
    .replace(/&ouml;/g, '\u00F6')
    .replace(/&uuml;/g, '\u00FC')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

/** Strip tags and decode entities to plain text. */
function toPlainText(html: string): string {
  return decodeEntities(html)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract clean semantic HTML from Elementor/WP content.
 * Keeps only p, h2-h4, ul, ol, li, strong, em, a tags.
 */
function cleanContent(html: string): string {
  // Extract text blocks (p, h2-h6, li)
  const blockRegex = /<(p|h[2-6]|li)(?:\s[^>]*)?>(.+?)<\/\1>/gs;
  const blocks: string[] = [];
  let match;

  while ((match = blockRegex.exec(html)) !== null) {
    const tag = match[1];
    let inner = match[2];

    // Keep only inline formatting: strong, em, a
    inner = inner.replace(/<(?!\/?(strong|em|a|b|i)\b)[^>]*>/g, '');
    inner = decodeEntities(inner).trim();

    if (inner) {
      blocks.push(`<${tag}>${inner}</${tag}>`);
    }
  }

  return blocks.join('\n');
}

async function fetchAllPosts(lang: string): Promise<BlogPost[]> {
  const allPosts: BlogPost[] = [];
  let page = 1;

  while (true) {
    const url = `${WP_API}/wp/v2/posts?lang=${lang}&_embed=wp:featuredmedia,wp:term&per_page=100&page=${page}`;
    console.log(`  Fetching page ${page}...`);

    const res = await fetch(url);
    if (!res.ok) {
      if (page === 1) throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
      break;
    }

    const wpPosts = await res.json();
    if (wpPosts.length === 0) break;

    for (const wp of wpPosts) {
      allPosts.push({
        id: wp.id,
        title: toPlainText(wp.title?.rendered ?? ''),
        excerpt: toPlainText(wp.excerpt?.rendered ?? ''),
        content: cleanContent(wp.content?.rendered ?? ''),
        image: wp._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '',
        date: wp.date,
        categories: (wp._embedded?.['wp:term']?.[0] ?? []).map((t: { name: string }) => t.name).filter(Boolean),
        link: wp.link,
        slug: wp.slug,
      });
    }

    const totalPages = Number(res.headers.get('X-WP-TotalPages')) || 1;
    if (page >= totalPages) break;
    page++;
  }

  return allPosts;
}

// --- Main ---

async function main() {
  console.log('Importing WordPress posts (all locales)...\n');
  console.log(`WP API: ${WP_API}\n`);

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const dataDir = resolve(__dirname, '../src/data');
  mkdirSync(dataDir, { recursive: true });

  const summary: { locale: string; count: number; file: string }[] = [];

  for (const locale of LOCALES) {
    console.log(`[${locale.key}] Fetching posts (lang=${locale.lang})...`);

    try {
      const posts = await fetchAllPosts(locale.lang);
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      const outPath = resolve(dataDir, locale.file);
      writeFileSync(outPath, JSON.stringify(posts, null, 2), 'utf-8');

      summary.push({ locale: locale.key, count: posts.length, file: locale.file });
      console.log(`[${locale.key}] ${posts.length} posts -> ${locale.file}\n`);
    } catch (err: any) {
      console.error(`[${locale.key}] Failed: ${err.message}\n`);
      summary.push({ locale: locale.key, count: 0, file: locale.file });
    }
  }

  // --- Summary ---
  console.log('='.repeat(45));
  console.log('Import summary:');
  console.log('-'.repeat(45));
  let total = 0;
  for (const s of summary) {
    const status = s.count > 0 ? `${s.count} posts` : 'FAILED';
    console.log(`  ${s.locale.padEnd(6)} -> ${s.file.padEnd(20)} ${status}`);
    total += s.count;
  }
  console.log('-'.repeat(45));
  console.log(`  Total: ${total} posts across ${summary.filter((s) => s.count > 0).length} locales`);
  console.log('='.repeat(45));
}

main().catch((err) => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
