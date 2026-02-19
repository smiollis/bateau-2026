#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

function walkDir(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkDir(full, results);
    } else if (entry === "page.tsx") {
      results.push(full);
    }
  }
  return results;
}

const appDir = new URL("../src/app", import.meta.url).pathname;
const files = walkDir(appDir).filter((f) => {
  const content = readFileSync(f, "utf-8");
  return content.includes("getOgLocale") && !content.includes("getOgAlternateLocales");
});

let updated = 0;
for (const file of files) {
  let content = readFileSync(file, "utf-8");

  // 1. Update import to include getOgAlternateLocales
  content = content.replace(
    /getOgLocale\s*\}/,
    "getOgLocale, getOgAlternateLocales }"
  );

  // 2a. Simple pattern: openGraph: { locale: getOgLocale(locale) }
  content = content.replace(
    /openGraph:\s*\{\s*locale:\s*getOgLocale\(locale\)\s*\}/g,
    "openGraph: { locale: getOgLocale(locale), alternateLocale: getOgAlternateLocales(locale) }"
  );

  // 2b. Complex pattern: locale: getOgLocale(locale), followed by other fields
  // Add alternateLocale after locale line if not already present
  if (!content.includes("alternateLocale:")) {
    content = content.replace(
      /(locale:\s*getOgLocale\(locale\),\n)(\s+)(title:|description:|images:)/,
      "$1$2alternateLocale: getOgAlternateLocales(locale),\n$2$3"
    );
  }

  writeFileSync(file, content);
  updated++;
  console.log("Updated:", file);
}
console.log(`\nTotal: ${updated} files updated`);
