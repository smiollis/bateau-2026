/**
 * Import Google Places reviews to local JSON file.
 *
 * Usage:
 *   npx tsx scripts/import-reviews.ts
 *   npm run import:reviews
 *
 * Requires GOOGLE_PLACES_API_KEY in .env.local or environment.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const PLACE_ID = 'ChIJpf5ZjgJy5kcRHunteILRJ9g';

interface ReviewData {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewsFile {
  placeRating: number;
  totalReviews: number;
  reviews: ReviewData[];
  importedAt: string;
}

function loadApiKey(): string {
  // Try environment variable first
  if (process.env.GOOGLE_PLACES_API_KEY) {
    return process.env.GOOGLE_PLACES_API_KEY;
  }

  // Try .env.local
  const __dir = dirname(fileURLToPath(import.meta.url));
  const envPath = resolve(__dir, '../.env.local');
  try {
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/^GOOGLE_PLACES_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  } catch {
    // ignore
  }

  throw new Error(
    'GOOGLE_PLACES_API_KEY not found. Set it in .env.local or as an environment variable.'
  );
}

async function fetchPlaceDetails(apiKey: string) {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
  const fieldMask = 'reviews,rating,userRatingCount,displayName';

  console.log('  Fetching Google Places details...');

  const res = await fetch(`${url}?languageCode=fr`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google Places API error ${res.status}: ${body}`);
  }

  return res.json();
}

async function main() {
  console.log('Importing Google reviews...\n');

  const apiKey = loadApiKey();
  const data = await fetchPlaceDetails(apiKey);

  const placeRating: number = data.rating ?? 0;
  const totalReviews: number = data.userRatingCount ?? 0;

  const reviews: ReviewData[] = (data.reviews ?? []).map(
    (r: any, i: number) => ({
      id: i + 1,
      name: r.authorAttribution?.displayName ?? 'Anonyme',
      avatar: r.authorAttribution?.photoUri ?? '',
      rating: r.rating ?? 5,
      date: r.relativePublishTimeDescription ?? '',
      text: r.text?.text ?? r.originalText?.text ?? '',
    })
  );

  const output: ReviewsFile = {
    placeRating,
    totalReviews,
    reviews,
    importedAt: new Date().toISOString(),
  };

  const __dir = dirname(fileURLToPath(import.meta.url));
  const outPath = resolve(__dir, '../src/data/reviews.json');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\nDone! ${reviews.length} reviews imported to src/data/reviews.json`);
  console.log(`Place rating: ${placeRating}/5 (${totalReviews} avis)`);
  reviews.forEach((r) =>
    console.log(`  ${r.rating}★ ${r.name}: ${r.text.slice(0, 60)}...`)
  );
}

main().catch((err) => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
