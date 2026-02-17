import type { MetadataRoute } from "next";
import allPosts from "@/data/posts.json";
import { routing } from "@/i18n/routing";
import { fetchAllLandingSlugs } from "@/data/landings";
import { getPosts } from "@/lib/wordpress/client";
import { transformToPost } from "@/lib/wordpress/transformers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bateau-a-paris.fr";
  const staticPages = ["", "/croisiere", "/galerie", "/faq", "/actualites", "/reservation", "/cgv", "/mentions-legales", "/confidentialite"];
  const locales = routing.locales;

  const entries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: page === "" ? 1.0 : 0.8,
    }))
  );

  // Articles: try API first, fallback to static JSON
  let posts: Array<{ slug: string; date: string }> = allPosts;
  try {
    const wpPosts = await getPosts("fr");
    if (wpPosts.length > 0) {
      posts = wpPosts.map(transformToPost);
    }
  } catch {
    // API unavailable — use static JSON
  }

  const articles = posts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/actualites/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Landing pages: try API first, fallback to static registry
  const landingSlugs = await fetchAllLandingSlugs();

  const landings = landingSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...entries, ...articles, ...landings];
}
