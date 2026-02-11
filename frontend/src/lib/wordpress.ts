const BASE = 'https://bateau-a-paris.fr/wp-json';

export async function wpFetch<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
  if (!res.ok) throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getPages() {
  return wpFetch('/wp/v2/pages');
}

export default { wpFetch, getPages };
