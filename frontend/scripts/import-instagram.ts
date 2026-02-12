/**
 * Import Instagram posts to local JSON + download images.
 *
 * Usage:
 *   npx tsx scripts/import-instagram.ts
 *   npm run import:instagram
 *
 * Requires INSTAGRAM_ACCESS_TOKEN in .env.local or environment.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

const INSTAGRAM_API = 'https://graph.instagram.com';
const LIMIT = 12;

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

interface LocalPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

function loadToken(): string {
  if (process.env.INSTAGRAM_ACCESS_TOKEN) {
    return process.env.INSTAGRAM_ACCESS_TOKEN;
  }

  const __dir = dirname(fileURLToPath(import.meta.url));
  const envPath = resolve(__dir, '../.env.local');
  try {
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/^INSTAGRAM_ACCESS_TOKEN=(.+)$/m);
    if (match) return match[1].trim();
  } catch {
    // ignore
  }

  throw new Error(
    'INSTAGRAM_ACCESS_TOKEN not found. Set it in .env.local or as an environment variable.'
  );
}

async function downloadImage(url: string, dest: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok || !res.body) {
    throw new Error(`Failed to download ${url}: ${res.status}`);
  }
  const readable = Readable.fromWeb(res.body as any);
  await pipeline(readable, createWriteStream(dest));
}

function getExtension(url: string, mediaType: string): string {
  if (mediaType === 'VIDEO') return '.mp4';
  const urlPath = new URL(url).pathname;
  const ext = urlPath.match(/\.(jpg|jpeg|png|webp|mp4)/i);
  return ext ? `.${ext[1].toLowerCase()}` : '.jpg';
}

async function main() {
  console.log('Importing Instagram posts...\n');

  const token = loadToken();
  const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
  const url = `${INSTAGRAM_API}/me/media?fields=${fields}&limit=${LIMIT}&access_token=${token}`;

  console.log('  Fetching from Instagram Graph API...');
  const res = await fetch(url);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Instagram API error ${res.status}: ${error}`);
  }

  const data = await res.json();
  const posts: InstagramPost[] = data.data ?? [];

  console.log(`  Got ${posts.length} posts`);

  // Setup output directories
  const __dir = dirname(fileURLToPath(import.meta.url));
  const imgDir = resolve(__dir, '../public/images/instagram');
  mkdirSync(imgDir, { recursive: true });

  const localPosts: LocalPost[] = [];

  for (const post of posts) {
    const imgFilename = `${post.id}${getExtension(post.media_url, post.media_type)}`;
    const imgPath = resolve(imgDir, imgFilename);
    const localUrl = `/images/instagram/${imgFilename}`;

    // Download main image (or thumbnail for videos)
    const downloadUrl = post.media_type === 'VIDEO'
      ? (post.thumbnail_url ?? post.media_url)
      : post.media_url;

    if (!existsSync(imgPath)) {
      console.log(`  Downloading ${post.id}...`);
      try {
        await downloadImage(downloadUrl, imgPath);
      } catch (err: any) {
        console.warn(`  Warning: could not download ${post.id}: ${err.message}`);
        continue;
      }
    } else {
      console.log(`  Skipping ${post.id} (already exists)`);
    }

    localPosts.push({
      id: post.id,
      caption: post.caption,
      media_type: post.media_type,
      media_url: localUrl,
      permalink: post.permalink,
      thumbnail_url: post.media_type === 'VIDEO' ? localUrl : undefined,
      timestamp: post.timestamp,
    });
  }

  // Write JSON
  const outPath = resolve(__dir, '../src/data/instagram.json');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(localPosts, null, 2) + '\n', 'utf-8');

  console.log(`\nDone! ${localPosts.length} posts saved to src/data/instagram.json`);
  console.log(`Images downloaded to public/images/instagram/`);
}

main().catch((err) => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
