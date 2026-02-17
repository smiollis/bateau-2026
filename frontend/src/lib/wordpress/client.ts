/**
 * WordPress headless CMS API client.
 *
 * All methods use ISR (revalidate: 3600 = 1h) so pages are
 * statically generated at build time and refreshed in the background.
 * The WordPress plugin sends revalidation webhooks on save_post.
 */

import type { WPPost, WPLandingPage } from "./types";

const BASE_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  process.env.NEXT_PUBLIC_WP_URL
    ? `${process.env.NEXT_PUBLIC_WP_URL}/wp-json`
    : "https://admin.bateau-a-paris.fr/wp-json";

const ISR_REVALIDATE = 3600; // 1 hour

/**
 * Typed fetch wrapper for WordPress REST API.
 * Includes ISR caching and error handling.
 */
async function wpFetch<T>(
  path: string,
  params?: Record<string, string>,
  options?: { revalidate?: number }
): Promise<T> {
  const url = new URL(`${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: options?.revalidate ?? ISR_REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(
      `WordPress API error: ${res.status} ${res.statusText} [${url.pathname}]`
    );
  }

  return res.json();
}

// ---------- Posts (articles) ----------

/**
 * Get all published blog posts for a given locale.
 * Uses Polylang `?lang=` param when available.
 */
export async function getPosts(locale = "fr"): Promise<WPPost[]> {
  const allPosts: WPPost[] = [];
  let page = 1;

  while (true) {
    const posts = await wpFetch<WPPost[]>("/wp/v2/posts", {
      _embed: "wp:featuredmedia,wp:term",
      per_page: "100",
      page: String(page),
      lang: locale,
    });

    allPosts.push(...posts);
    if (posts.length < 100) break;
    page++;
  }

  return allPosts;
}

/**
 * Get a single blog post by slug and locale.
 */
export async function getPost(
  slug: string,
  locale = "fr"
): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>("/wp/v2/posts", {
    slug,
    _embed: "wp:featuredmedia,wp:term",
    lang: locale,
  });

  return posts[0] ?? null;
}

// ---------- Landing Pages ----------

/**
 * Get a single landing page by slug and locale.
 */
export async function getLandingPage(
  slug: string,
  locale = "fr"
): Promise<WPLandingPage | null> {
  const pages = await wpFetch<WPLandingPage[]>("/wp/v2/landing_page", {
    slug,
    lang: locale,
  });

  return pages[0] ?? null;
}

/**
 * Get all landing page slugs (for generateStaticParams / sitemap).
 */
export async function getAllLandingSlugs(): Promise<string[]> {
  const pages = await wpFetch<Array<{ slug: string }>>("/wp/v2/landing_page", {
    per_page: "100",
    _fields: "slug",
  });

  return pages.map((p) => p.slug);
}

/**
 * Get all landing pages for a given locale (used by sitemap).
 */
export async function getAllLandingPages(
  locale = "fr"
): Promise<WPLandingPage[]> {
  return wpFetch<WPLandingPage[]>("/wp/v2/landing_page", {
    per_page: "100",
    lang: locale,
  });
}

// ---------- Export wpFetch for advanced use ----------

export { wpFetch };
