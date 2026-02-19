#!/usr/bin/env node
/**
 * Clean boilerplate commercial blocks from blog posts.
 * Pattern A: H2+H3 commercial CTA block at end of 11 articles
 * Pattern B: CTA link to admin.bateau-a-paris.fr in 19 bridge articles
 * Runs on all 6 locale JSON files.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "../src/data");

const files = [
  "posts.json",
  "posts-en.json",
  "posts-es.json",
  "posts-it.json",
  "posts-de.json",
  "posts-pt-BR.json",
];

let totalCleaned = 0;

for (const file of files) {
  const filePath = resolve(dataDir, file);
  const posts = JSON.parse(readFileSync(filePath, "utf-8"));
  let cleaned = 0;

  for (const post of posts) {
    if (!post.content) continue;
    const original = post.content;

    // Pattern A: Commercial CTA block (H2 with admin link + H3 subheadings)
    // Starts with <h2><a href="https://admin.bateau-a-paris.fr">Une croisière...
    // Remove everything from this point to end of content
    post.content = post.content.replace(
      /<h2><a href="https:\/\/admin\.bateau-a-paris\.fr">\s*Une\s+croisière privée[\s\S]*$/,
      ""
    );

    // Pattern B: Bridge article CTA link (single <p> with admin link)
    // <p><a ... href="https://admin.bateau-a-paris.fr/croisiere-privee-seine-paris/">...</a></p>
    post.content = post.content.replace(
      /\s*<p><a[^>]*href="https:\/\/admin\.bateau-a-paris\.fr\/croisiere-privee-seine-paris\/"[^>]*>[\s\S]*?<\/a><\/p>\s*/g,
      ""
    );

    // Clean up trailing whitespace/newlines
    post.content = post.content.trimEnd();

    if (post.content !== original) {
      cleaned++;
      console.log(`  [${file}] Cleaned: ${post.slug}`);
    }
  }

  writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n", "utf-8");
  totalCleaned += cleaned;
  console.log(`${file}: ${cleaned} articles cleaned`);
}

console.log(`\nTotal: ${totalCleaned} articles cleaned across ${files.length} files`);
