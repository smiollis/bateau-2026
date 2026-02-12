/**
 * Translate fr.json to en.json using DeepL API.
 *
 * Usage:
 *   DEEPL_API_KEY=xxx npx tsx scripts/translate.ts
 *   npm run translate
 *
 * Requires DEEPL_API_KEY in environment or .env.local.
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..');
const FR_PATH = resolve(ROOT, 'messages/fr.json');
const EN_PATH = resolve(ROOT, 'messages/en.json');

const DEEPL_URL = 'https://api.deepl.com/v2/translate';

// Keys whose values should NOT be translated (proper names, brand, etc.)
const SKIP_KEYS = new Set([
  'captain.name',      // "Michel"
  'captain.role',      // Keep "Capitaine du Senang" recognizable
  'footer.address',    // "Port de l'Arsenal"
  'footer.addressCity', // "Paris 12ème"
]);

function loadApiKey(): string {
  if (process.env.DEEPL_API_KEY) {
    return process.env.DEEPL_API_KEY;
  }

  const envPath = resolve(ROOT, '.env.local');
  try {
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/^DEEPL_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  } catch {
    // ignore
  }

  throw new Error(
    'DEEPL_API_KEY not found. Set it in .env.local or as an environment variable.'
  );
}

async function translateBatch(texts: string[], apiKey: string): Promise<string[]> {
  // XML-escape special characters, then protect ICU variables {var} with <x> tags
  const protected_texts = texts.map(text => {
    // First escape XML special chars
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    // Then wrap ICU variables in ignore tags
    escaped = escaped.replace(/\{([^}]+)\}/g, '<x>$1</x>');
    return escaped;
  });

  const res = await fetch(DEEPL_URL, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: protected_texts,
      source_lang: 'FR',
      target_lang: 'EN',
      tag_handling: 'xml',
      ignore_tags: ['x'],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`DeepL API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.translations.map((t: any) => {
    // Restore ICU variables and unescape XML entities
    let text = t.text as string;
    text = text.replace(/<x>([^<]+)<\/x>/g, '{$1}');
    text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    return text;
  });
}

type JsonObj = Record<string, string | JsonObj>;

async function translateObject(
  obj: JsonObj,
  apiKey: string,
  prefix = ''
): Promise<JsonObj> {
  // Collect all string entries with their paths
  const entries: { key: string; fullKey: string; value: string }[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string' && !SKIP_KEYS.has(fullKey)) {
      entries.push({ key, fullKey, value });
    }
  }

  // Batch translate all strings at once (DeepL supports arrays)
  const textsToTranslate = entries.map(e => e.value);
  let translatedTexts: string[] = [];

  if (textsToTranslate.length > 0) {
    // DeepL has a max of 50 texts per request
    const BATCH_SIZE = 50;
    for (let i = 0; i < textsToTranslate.length; i += BATCH_SIZE) {
      const batch = textsToTranslate.slice(i, i + BATCH_SIZE);
      console.log(`  Translating batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} strings)...`);
      const results = await translateBatch(batch, apiKey);
      translatedTexts.push(...results);
      // Small delay between batches
      if (i + BATCH_SIZE < textsToTranslate.length) {
        await new Promise(r => setTimeout(r, 200));
      }
    }
  }

  // Build result object
  const result: JsonObj = {};
  let translatedIndex = 0;

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      // Recurse into nested objects
      result[key] = await translateObject(value as JsonObj, apiKey, fullKey);
    } else if (typeof value === 'string') {
      if (SKIP_KEYS.has(fullKey)) {
        result[key] = value; // Keep original
      } else {
        result[key] = translatedTexts[translatedIndex++];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

async function main() {
  console.log('Translating fr.json -> en.json via DeepL...\n');

  const apiKey = loadApiKey();
  const fr: JsonObj = JSON.parse(readFileSync(FR_PATH, 'utf-8'));

  const en: JsonObj = {};

  // Process each namespace separately for better logging
  for (const [namespace, value] of Object.entries(fr)) {
    if (typeof value === 'object' && value !== null) {
      console.log(`Namespace: ${namespace}`);
      en[namespace] = await translateObject(value as JsonObj, apiKey, namespace);
    } else {
      en[namespace] = value;
    }
  }

  writeFileSync(EN_PATH, JSON.stringify(en, null, 2) + '\n', 'utf-8');
  console.log('\nDone! Written to messages/en.json');
}

main().catch((err) => {
  console.error('Translation failed:', err.message);
  process.exit(1);
});
