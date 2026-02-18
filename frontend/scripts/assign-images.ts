/**
 * assign-images.ts
 *
 * Assign images to the 8 blog articles that currently have image: "".
 * Uses existing WP media library images matched thematically,
 * plus one local image for the renovation article.
 *
 * Usage: npx tsx scripts/assign-images.ts
 */

import fs from "fs";
import path from "path";

const DATA_DIR = path.resolve(__dirname, "..", "src/data");

// slug prefix → image URL mapping
// Using startsWith() to handle locale suffix variants (e.g. -2, -3)
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
    "https://admin.bateau-a-paris.fr/wp-content/uploads/2024/02/DALL·E-2024-02-21-12.16.07-A-realistic-photo-depicting-Bateaux-Mouches-gliding-along-the-River-Seine-on-a-beautiful-day.-The-sky-is-clear-and-blue-and-the-sun-shines-brightly-.webp",
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

const LOCALE_FILES: Record<string, string> = {
  fr: "posts.json",
  en: "posts-en.json",
  es: "posts-es.json",
  it: "posts-it.json",
  de: "posts-de.json",
  "pt-BR": "posts-pt-BR.json",
};

function findImage(slug: string): string | null {
  for (const [prefix, url] of IMAGE_MAP) {
    if (slug.startsWith(prefix)) return url;
  }
  return null;
}

let totalUpdated = 0;

for (const [locale, filename] of Object.entries(LOCALE_FILES)) {
  const filePath = path.join(DATA_DIR, filename);
  const posts = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let updated = 0;

  for (const post of posts) {
    if (post.image === "") {
      const img = findImage(post.slug);
      if (img) {
        post.image = img;
        updated++;
      } else {
        console.warn(`  ⚠ [${locale}] No image mapping for: ${post.slug}`);
      }
    }
  }

  if (updated > 0) {
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n", "utf8");
    console.log(`✅ [${locale}] Updated ${updated} images in ${filename}`);
    totalUpdated += updated;
  } else {
    console.log(`  [${locale}] No images to update`);
  }
}

console.log(`\nDone. Total images assigned: ${totalUpdated}`);
