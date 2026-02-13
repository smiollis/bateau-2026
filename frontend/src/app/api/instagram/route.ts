import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

const INSTAGRAM_API = 'https://graph.instagram.com';
const CACHE_TTL = 3600; // 1 heure en secondes

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'Instagram token not configured' },
      { status: 500 }
    );
  }

  try {
    const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
    const url = `${INSTAGRAM_API}/me/media?fields=${fields}&limit=12&access_token=${token}`;

    const res = await fetch(url, {
      next: { revalidate: CACHE_TTL },
    });

    if (!res.ok) {
      const error = await res.json();
      logger.error('Instagram API error', 'instagram-api', error);
      return NextResponse.json(
        { error: 'Failed to fetch Instagram posts' },
        { status: res.status }
      );
    }

    const data = await res.json();
    const posts: InstagramPost[] = data.data ?? [];

    return NextResponse.json(
      { posts },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${CACHE_TTL * 2}`,
        },
      }
    );
  } catch (error) {
    logger.error('Instagram fetch error', 'instagram-api', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
