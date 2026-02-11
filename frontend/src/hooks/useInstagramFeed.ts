'use client';

import { useState, useEffect } from 'react';
import type { InstagramPost } from '@/app/api/instagram/route';

interface UseInstagramFeedResult {
  posts: InstagramPost[];
  isLoading: boolean;
  error: string | null;
}

export function useInstagramFeed(limit = 9): UseInstagramFeedResult {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      try {
        const res = await fetch('/api/instagram');
        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        if (!cancelled) {
          setPosts((data.posts as InstagramPost[]).slice(0, limit));
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Impossible de charger le flux Instagram');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();
    return () => { cancelled = true; };
  }, [limit]);

  return { posts, isLoading, error };
}
