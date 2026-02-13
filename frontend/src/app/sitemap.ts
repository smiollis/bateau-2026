import type { MetadataRoute } from "next";
import allPosts from "@/data/posts.json";
import { routing } from "@/i18n/routing";
import { getAllLandingSlugs } from "@/data/landings";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const articles = allPosts.flatMap((post: { slug: string; date: string }) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/actualites/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const landings = getAllLandingSlugs().flatMap((slug) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...entries, ...articles, ...landings];
}
