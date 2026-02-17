/**
 * Fix hardcoded admin URLs in posts content.
 *
 * Replaces:
 *   https://admin.bateau-a-paris.fr/reservation/ → /reservation
 *   https://admin.bateau-a-paris.fr → /
 *
 * Usage:
 *   npx tsx scripts/fix-admin-links.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');

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

const FILES = [
  'posts.json',
  'posts-en.json',
  'posts-es.json',
  'posts-it.json',
  'posts-de.json',
  'posts-pt-BR.json',
];

/**
 * Replace admin URLs with relative paths.
 */
function fixAdminLinks(content: string): string {
  let fixed = content;

  // 1. Fix reservation links (must come first to avoid double replacement)
  fixed = fixed.replace(
    /https?:\/\/admin\.bateau-a-paris\.fr\/reservation\//gi,
    '/reservation'
  );

  // 2. Fix generic admin links
  fixed = fixed.replace(
    /https?:\/\/admin\.bateau-a-paris\.fr(?!\/wp-content)/gi,
    '/'
  );

  // 3. Remove trailing slashes after replacement (if any)
  fixed = fixed.replace(/href="\/">/gi, 'href="/">');

  return fixed;
}

async function main() {
  console.log('Fixing hardcoded admin URLs in posts content...\n');

  let totalReplacements = 0;
  let totalPostsFixed = 0;

  for (const file of FILES) {
    const path = resolve(dataDir, file);
    const posts: BlogPost[] = JSON.parse(readFileSync(path, 'utf-8'));

    let fileReplacements = 0;
    let postsFixed = 0;

    for (const post of posts) {
      const originalContent = post.content;
      const originalExcerpt = post.excerpt;

      post.content = fixAdminLinks(post.content);
      post.excerpt = fixAdminLinks(post.excerpt);

      if (post.content !== originalContent || post.excerpt !== originalExcerpt) {
        postsFixed++;

        // Count replacements
        const contentMatches = originalContent.match(/admin\.bateau-a-paris\.fr/gi) || [];
        const excerptMatches = originalExcerpt.match(/admin\.bateau-a-paris\.fr/gi) || [];
        fileReplacements += contentMatches.length + excerptMatches.length;
      }
    }

    // Write back
    writeFileSync(path, JSON.stringify(posts, null, 2), 'utf-8');

    console.log(`[${file.padEnd(20)}] → Fixed ${postsFixed} posts, ${fileReplacements} replacements`);
    totalPostsFixed += postsFixed;
    totalReplacements += fileReplacements;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Total posts fixed: ${totalPostsFixed}`);
  console.log(`Total URL replacements: ${totalReplacements}`);
  console.log(`${'='.repeat(60)}\n`);
}

main().catch((err) => {
  console.error('Fix failed:', err.message);
  process.exit(1);
});
