/**
 * Download WordPress images to local public/images/ directory.
 *
 * Usage:
 *   npx tsx scripts/import-images.ts
 *   npm run import:images
 *
 * Downloads images from:
 *   - src/data/galleryImages.ts  → public/images/gallery/
 *   - src/components/HeroCinemaSlideshow.tsx → public/images/hero/
 *   - src/data/posts.json → public/images/posts/
 *
 * Then updates the source files to use local paths.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, resolve, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..');
const PUBLIC = resolve(ROOT, 'public/images');

interface DownloadResult {
  url: string;
  localPath: string; // relative to public, e.g. /images/gallery/foo.webp
  filename: string;
}

async function downloadImage(url: string, destDir: string, filename?: string): Promise<DownloadResult> {
  const fname = filename ?? slugifyUrl(url);
  const destPath = resolve(destDir, fname);
  const localPath = `/images/${destDir.split('/images/')[1]}/${fname}`;

  if (existsSync(destPath)) {
    console.log(`  ✓ ${fname} (already exists)`);
    return { url, localPath, filename: fname };
  }

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`  ✗ ${fname} — HTTP ${res.status}`);
    return { url, localPath: url, filename: fname }; // fallback to remote URL
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buffer);
  console.log(`  ✓ ${fname} (${(buffer.length / 1024).toFixed(0)} KB)`);
  return { url, localPath, filename: fname };
}

function slugifyUrl(url: string): string {
  const parsed = new URL(url);
  const path = parsed.pathname;
  // Keep filename from URL path
  let name = basename(path);
  // Shorten WhatsApp-style names
  name = name.replace(/^WhatsApp-Image-/, '');
  return name;
}

async function downloadBatch(urls: string[], destDir: string): Promise<Map<string, string>> {
  mkdirSync(destDir, { recursive: true });
  const map = new Map<string, string>();
  // Download 5 at a time
  for (let i = 0; i < urls.length; i += 5) {
    const batch = urls.slice(i, i + 5);
    const results = await Promise.all(
      batch.map((url) => downloadImage(url, destDir))
    );
    for (const r of results) {
      map.set(r.url, r.localPath);
    }
  }
  return map;
}

async function importGalleryImages(): Promise<void> {
  console.log('\n📷 Gallery images...');
  const galleryFile = resolve(ROOT, 'src/data/galleryImages.ts');
  const content = readFileSync(galleryFile, 'utf-8');

  const urlRegex = /src:\s*"(https:\/\/bateau-a-paris\.fr[^"]+)"/g;
  const urls: string[] = [];
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  console.log(`  Found ${urls.length} images`);
  const map = await downloadBatch(urls, resolve(PUBLIC, 'gallery'));

  let updated = content;
  for (const [url, local] of map) {
    updated = updated.replace(url, local);
  }
  writeFileSync(galleryFile, updated, 'utf-8');
}

async function importHeroImages(): Promise<void> {
  console.log('\n🎬 Hero images...');
  const heroFile = resolve(ROOT, 'src/components/HeroCinemaSlideshow.tsx');
  const content = readFileSync(heroFile, 'utf-8');

  const urlRegex = /src:\s*"(https:\/\/bateau-a-paris\.fr[^"]+)"/g;
  const urls: string[] = [];
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  console.log(`  Found ${urls.length} images`);
  const map = await downloadBatch(urls, resolve(PUBLIC, 'hero'));

  let updated = content;
  for (const [url, local] of map) {
    updated = updated.replace(url, local);
  }
  writeFileSync(heroFile, updated, 'utf-8');
}

async function importPostImages(): Promise<void> {
  console.log('\n📰 Post images...');
  const postsFile = resolve(ROOT, 'src/data/posts.json');
  const content = readFileSync(postsFile, 'utf-8');
  const posts = JSON.parse(content);

  const urls: string[] = posts
    .map((p: { image: string }) => p.image)
    .filter((url: string) => url && url.startsWith('http'));

  const uniqueUrls = [...new Set(urls)];
  console.log(`  Found ${uniqueUrls.length} unique images`);
  const map = await downloadBatch(uniqueUrls, resolve(PUBLIC, 'posts'));

  for (const post of posts) {
    if (post.image && map.has(post.image)) {
      post.image = map.get(post.image);
    }
  }
  writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf-8');
}

async function main() {
  console.log('Importing WordPress images to local...\n');

  mkdirSync(PUBLIC, { recursive: true });

  await importGalleryImages();
  await importHeroImages();
  await importPostImages();

  console.log('\n✅ Done! Images imported to public/images/');
}

main().catch((err) => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
