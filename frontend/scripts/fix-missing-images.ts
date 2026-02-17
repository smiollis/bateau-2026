/**
 * Fix missing images in translated posts.
 *
 * Copies the image URL from FR posts to all locales where image is empty.
 * This ensures all translated articles display the same featured image.
 *
 * Usage:
 *   npx tsx scripts/fix-missing-images.ts
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
  { locale: 'fr', file: 'posts.json' },
  { locale: 'en', file: 'posts-en.json' },
  { locale: 'es', file: 'posts-es.json' },
  { locale: 'it', file: 'posts-it.json' },
  { locale: 'de', file: 'posts-de.json' },
  { locale: 'pt-BR', file: 'posts-pt-BR.json' },
];

async function main() {
  console.log('Fixing missing images in translated posts...\n');

  // 1. Load FR posts (reference)
  const frPath = resolve(dataDir, 'posts.json');
  const frPosts: BlogPost[] = JSON.parse(readFileSync(frPath, 'utf-8'));
  console.log(`Loaded ${frPosts.length} FR posts (reference)\n`);

  // Create image lookup by slug (primary) and position (fallback)
  const imageBySlugMap = new Map<string, string>();
  for (const post of frPosts) {
    if (post.image) {
      imageBySlugMap.set(post.slug, post.image);
    }
  }

  console.log(`Built image map: ${imageBySlugMap.size} posts with images (by slug)\n`);

  // 2. Fix each locale
  let totalFixed = 0;

  for (const { locale, file } of FILES) {
    if (locale === 'fr') continue; // Skip FR (it's the reference)

    const path = resolve(dataDir, file);
    const posts: BlogPost[] = JSON.parse(readFileSync(path, 'utf-8'));

    let fixedCount = 0;
    let missingCount = 0;

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]!;
      if (!post.image || post.image === '') {
        // Try slug match first, then position fallback
        const frImage = imageBySlugMap.get(post.slug) ?? frPosts[i]?.image;
        if (frImage) {
          post.image = frImage;
          fixedCount++;
        } else {
          missingCount++;
        }
      }
    }

    // Write back
    writeFileSync(path, JSON.stringify(posts, null, 2), 'utf-8');

    console.log(`[${locale.padEnd(6)}] ${file.padEnd(20)} → Fixed: ${fixedCount}, Still missing: ${missingCount}`);
    totalFixed += fixedCount;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Total images fixed: ${totalFixed}`);
  console.log(`${'='.repeat(60)}\n`);
}

main().catch((err) => {
  console.error('Fix failed:', err.message);
  process.exit(1);
});
