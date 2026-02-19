import type { MetadataRoute } from "next";
import allPosts from "@/data/posts.json";
import postsEn from "@/data/posts-en.json";
import postsEs from "@/data/posts-es.json";
import postsIt from "@/data/posts-it.json";
import postsDe from "@/data/posts-de.json";
import postsPtBR from "@/data/posts-pt-BR.json";
import { routing } from "@/i18n/routing";
import { fetchAllLandingSlugs } from "@/data/landings";
import { getPosts } from "@/lib/wordpress/client";
import { transformToPost } from "@/lib/wordpress/transformers";
import slugMap from "@/data/slug-map.json";

const typedSlugMap = slugMap as Record<string, Record<string, string>>;

const postsMap: Record<string, typeof allPosts> = {
  fr: allPosts,
  en: postsEn,
  es: postsEs,
  it: postsIt,
  de: postsDe,
  "pt-BR": postsPtBR,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bateau-a-paris.fr";
  const staticPages = ["", "/croisiere", "/galerie", "/faq", "/actualites", "/reservation", "/cgv", "/mentions-legales", "/confidentialite", "/plan-du-site"];
  const locales = routing.locales;

  const entries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}${page}`])),
      },
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

  const articles = locales.flatMap((locale) => {
    const localePosts = postsMap[locale] ?? posts;
    return localePosts.map((post) => {
      const mapping = typedSlugMap[post.slug];
      return {
        url: `${baseUrl}/${locale}/actualites/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}/actualites/${mapping?.[l] || post.slug}`])
          ),
        },
      };
    });
  });

  // Landing pages: try API first, fallback to static registry
  const landingSlugs = await fetchAllLandingSlugs();

  const landings = landingSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/${slug}`])),
      },
    }))
  );

  return [...entries, ...articles, ...landings];
}
