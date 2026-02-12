/**
 * Import WordPress posts to local JSON file.
 *
 * Usage:
 *   npx tsx scripts/import-posts.ts
 *   npm run import:posts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const WP_API = 'https://bateau-a-paris.fr/wp-json';

interface BlogPost {
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

async function fetchAllPosts(): Promise<BlogPost[]> {
  const allPosts: BlogPost[] = [];
  let page = 1;

  while (true) {
    const url = `${WP_API}/wp/v2/posts?_embed=wp:featuredmedia,wp:term&per_page=100&page=${page}`;
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
        category: wp._embedded?.['wp:term']?.[0]?.[0]?.name ?? '',
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
  console.log('Importing WordPress posts...\n');

  const posts = await fetchAllPosts();
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outPath = resolve(__dirname, '../src/data/posts.json');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(posts, null, 2), 'utf-8');

  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  const totalContentSize = posts.reduce((sum, p) => sum + p.content.length, 0);
  console.log(`\nDone! ${posts.length} posts imported to src/data/posts.json`);
  console.log(`Categories: ${categories.join(', ')}`);
  console.log(`Total content size: ${(totalContentSize / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
