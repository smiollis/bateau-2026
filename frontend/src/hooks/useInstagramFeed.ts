'use client';

import type { InstagramPost } from '@/app/api/instagram/route';
import instagramData from '@/data/instagram.json';

interface UseInstagramFeedResult {
  posts: InstagramPost[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Returns Instagram posts from a static JSON snapshot (`src/data/instagram.json`).
 * No network request is made — `isLoading` is always `false`.
 *
 * To refresh the data, re-run the Instagram import script or update the JSON file.
 */
export function useInstagramFeed(limit = 9): UseInstagramFeedResult {
  const posts = (instagramData as InstagramPost[]).slice(0, limit);
  return { posts, isLoading: false, error: null };
}
