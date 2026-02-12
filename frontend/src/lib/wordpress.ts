const BASE = process.env.NEXT_PUBLIC_WP_API_URL || 'https://bateau-a-paris.fr/wp-json';

export interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  slug: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export async function wpFetch<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getPages() {
  return wpFetch('/wp/v2/pages');
}

export async function getPosts(params?: {
  per_page?: number;
  page?: number;
  categories?: number;
}): Promise<WPPost[]> {
  const searchParams = new URLSearchParams({
    _embed: 'wp:featuredmedia,wp:term',
    per_page: String(params?.per_page ?? 20),
    page: String(params?.page ?? 1),
  });
  if (params?.categories) {
    searchParams.set('categories', String(params.categories));
  }
  return wpFetch(`/wp/v2/posts?${searchParams.toString()}`);
}
