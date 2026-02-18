/**
 * Upload featured images to WordPress for posts that don't have one.
 *
 * For images already in the WP media library (wp-content/uploads/...),
 * finds the media ID by filename. For local images, uploads them.
 * Then sets featured_media on each post (all 6 locales).
 *
 * Usage:
 *   WP_USERNAME=user WP_APP_PASSWORD=pass npx tsx scripts/upload-featured-images.ts
 */

import { readFileSync } from "fs";
import { resolve, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const WP_API =
  process.env.NEXT_PUBLIC_WP_API_URL?.replace(/\/+$/, "") ||
  "https://admin.bateau-a-paris.fr/wp-json";
const WP_USERNAME = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

if (!WP_USERNAME || !WP_APP_PASSWORD) {
  console.error("Missing credentials. Set WP_USERNAME and WP_APP_PASSWORD.");
  process.exit(1);
}

const AUTH_HEADER = `Basic ${Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString("base64")}`;

// Image mapping: slug prefix → image URL/path
const IMAGE_MAP: [string, string][] = [
  [
    "renovation-hivernale",
    "/images/blog/renovation-hivernale-senang.png",
  ],
  [
    "apero-bateau-seine",
    "https://admin.bateau-a-paris.fr/wp-content/uploads/2023/12/SENANG-1.webp",
  ],
  [
    "5-meilleures-occasions",
    "https://admin.bateau-a-paris.fr/wp-content/uploads/2023/12/SENANG-2.webp",
  ],
  [
    "concert-seine-billet-doux",
    "https://admin.bateau-a-paris.fr/wp-content/uploads/2022/08/batea-a-paris.jpg",
  ],
  [
    "nouveau-taud-senang",
    "https://admin.bateau-a-paris.fr/wp-content/uploads/2023/12/SENANG-3.webp",
  ],
  [
    "histoire-navigation-seine",
    "https://admin.bateau-a-paris.fr/wp-content/uploads/2024/02/DALL%C2%B7E-2024-02-21-12.16.07-Imagine-a-vivid-detailed-watercolor-painting-of-the-Seine-River-in-Paris-during-the-golden-age-of-the-Bateaux-Mouches-in-the-early-20th-century.-The-sc.webp",
  ],
  [
    "seine-artere-paris-2000",
    "https://admin.bateau-a-paris.fr/wp-content/uploads/2023/01/zouave-pont-de-lalma-paris.jpg",
  ],
  [
    "senang-peniches-parisiennes",
    "https://admin.bateau-a-paris.fr/wp-content/uploads/2022/08/batea-a-paris.jpg",
  ],
];

async function wpFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${WP_API}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
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

/** Find a media item by searching its filename in the WP library. */
async function findMediaByFilename(filename: string): Promise<number | null> {
  // Search by the filename without extension
  const searchTerm = filename.replace(/\.[^.]+$/, "").replace(/[%·]/g, " ").slice(0, 50);
  const media = await wpFetch(
    `/wp/v2/media?search=${encodeURIComponent(searchTerm)}&per_page=20`
  );
  // Match by source_url containing the filename
  for (const m of media) {
    const sourceFile = decodeURIComponent(m.source_url || "");
    if (sourceFile.includes(filename.replace(/%[0-9A-Fa-f]{2}/g, (match: string) => decodeURIComponent(match)))) {
      return m.id;
    }
  }
  return null;
}

/** Upload a local file to WP media library. */
async function uploadLocalImage(filePath: string): Promise<number> {
  const fileName = basename(filePath);
  const fileBuffer = readFileSync(filePath);

  const res = await fetch(`${WP_API}/wp/v2/media`, {
    method: "POST",
    headers: {
      Authorization: AUTH_HEADER,
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": filePath.endsWith(".png") ? "image/png" : "image/jpeg",
    },
    body: fileBuffer,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed ${res.status}: ${text.slice(0, 300)}`);
  }

  const media = await res.json();
  return media.id;
}

/** Set featured image on a WP post. */
async function setFeaturedImage(postId: number, mediaId: number) {
  await wpFetch(`/wp/v2/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({ featured_media: mediaId }),
  });
}

/** Find all WP posts (all locales) matching a slug prefix with featured_media: 0. */
async function findPostsWithoutImage(slugPrefix: string): Promise<{ id: number; slug: string; lang: string }[]> {
  const results: { id: number; slug: string; lang: string }[] = [];
  const langs = ["fr", "en", "es", "it", "de", "pt"];

  for (const lang of langs) {
    const posts = await wpFetch(
      `/wp/v2/posts?search=${encodeURIComponent(slugPrefix)}&lang=${lang}&per_page=10&_fields=id,slug,featured_media`
    );
    for (const p of posts) {
      if (p.slug.startsWith(slugPrefix) && p.featured_media === 0) {
        results.push({ id: p.id, slug: p.slug, lang });
      }
    }
  }
  return results;
}

async function main() {
  console.log("Uploading featured images to WordPress...\n");

  let totalUpdated = 0;

  for (const [slugPrefix, imageUrl] of IMAGE_MAP) {
    console.log(`\n--- ${slugPrefix} ---`);
    console.log(`  Image: ${imageUrl.substring(0, 80)}...`);

    // Find or upload the media
    let mediaId: number | null = null;

    if (imageUrl.startsWith("/")) {
      // Local file — upload to WP
      const localPath = resolve(__dirname, "..", "public" + imageUrl);
      console.log(`  Uploading local file...`);
      mediaId = await uploadLocalImage(localPath);
      console.log(`  Uploaded: media ID ${mediaId}`);
    } else {
      // WP URL — find existing media by filename
      const filename = basename(new URL(imageUrl).pathname);
      console.log(`  Searching media library for: ${filename.substring(0, 60)}`);
      mediaId = await findMediaByFilename(filename);
      if (mediaId) {
        console.log(`  Found: media ID ${mediaId}`);
      } else {
        console.warn(`  NOT FOUND in media library, skipping.`);
        continue;
      }
    }

    // Find all posts (6 locales) that need this image
    const posts = await findPostsWithoutImage(slugPrefix);
    if (posts.length === 0) {
      console.log(`  No posts without image found for "${slugPrefix}"`);
      continue;
    }

    // Set featured_media on each post
    for (const post of posts) {
      await setFeaturedImage(post.id, mediaId);
      console.log(`  Set featured_media on post ${post.id} (${post.lang})`);
      totalUpdated++;
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Done! ${totalUpdated} posts updated with featured images.`);
  console.log(`Run "npm run import:posts" to refresh local JSON files.`);
  console.log("=".repeat(50));
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
