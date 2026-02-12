'use client';

import type { InstagramPost } from '@/app/api/instagram/route';
import instagramData from '@/data/instagram.json';

interface UseInstagramFeedResult {
  posts: InstagramPost[];
  isLoading: boolean;
  error: string | null;
}

export function useInstagramFeed(limit = 9): UseInstagramFeedResult {
  const posts = (instagramData as InstagramPost[]).slice(0, limit);
  return { posts, isLoading: false, error: null };
}
