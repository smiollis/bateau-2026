import React from 'react';
import { getPages } from '@/lib/wordpress';
import { logger } from '@/lib/logger';

export default async function TestPage() {
  let pages: any[] = [];
  try {
    pages = await getPages();
  } catch (e) {
    logger.error('WP fetch error', 'test-page', e);
  }

  return (
    <div className="min-h-screen bg-navy p-8 text-white">
      <h1 className="text-2xl font-bold text-gold mb-4">WordPress Pages</h1>
      {pages && pages.length > 0 ? (
        <ul className="space-y-2">
          {pages.map((p) => (
            <li key={p.id} className="rounded-md bg-white/6 p-3">
              <div className="text-lg font-semibold text-white">{p.title?.rendered || p.slug}</div>
              <div className="text-sm text-white/80">ID: {p.id}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages found or error fetching WordPress pages.</p>
      )}
    </div>
  );
}
