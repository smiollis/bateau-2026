/**
 * Transform WordPress REST API responses into the TypeScript
 * interfaces used by Next.js components.
 *
 * The components receive the same data shape regardless of
 * whether the source is the API or static TS files.
 */

import type { WPPost, WPLandingPage, WPFlexibleSection, WPImage } from "./types";
import type {
  LandingPageData,
  LandingSection,
} from "@/data/landings/types";

// ---------- Helpers ----------

/** Decode HTML entities from WordPress rendered fields. */
function decodeEntities(text: string): string {
  return text
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    );
}

/** Strip HTML tags and decode entities to plain text. */
function toPlainText(html: string): string {
  return decodeEntities(html)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extract clean semantic HTML from WP content.
 * Keeps only p, h2-h4, ul, ol, li, strong, em, a tags.
 */
function cleanContent(html: string): string {
  const blockRegex = new RegExp(
    "<(p|h[2-6]|li)(?:\\s[^>]*)?>(.+?)<\\/\\1>",
    "gs"
  );
  const blocks: string[] = [];
  let match;

  while ((match = blockRegex.exec(html)) !== null) {
    const tag = match[1];
    let inner = match[2] ?? "";
    inner = inner.replace(/<(?!\/?(strong|em|a|b|i)\b)[^>]*>/g, "");
    inner = decodeEntities(inner).trim();
    if (inner) blocks.push(`<${tag}>${inner}</${tag}>`);
  }

  return blocks.join("\n");
}

/** Resolve ACF image field (can be URL string or image object). */
function resolveImage(img: string | WPImage): string {
  if (typeof img === "string") return img;
  return img?.url ?? "";
}

// ---------- Post (Article) ----------

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  modified?: string;
  categories: string[];
  link: string;
  slug: string;
  seo?: {
    title: string | null;
    description: string | null;
    robots: string[];
  };
}

/**
 * Transform a WordPress REST API post into the BlogPost interface
 * used by Actualites views and article detail pages.
 */
export function transformToPost(wp: WPPost): BlogPost {
  return {
    id: wp.id,
    title: toPlainText(wp.title?.rendered ?? ""),
    excerpt: toPlainText(wp.excerpt?.rendered ?? ""),
    content: cleanContent(wp.content?.rendered ?? ""),
    image: wp._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
    date: wp.date,
    modified: wp.modified,
    categories: (wp._embedded?.["wp:term"]?.[0] ?? []).map((t: { name: string }) => t.name).filter(Boolean),
    link: wp.link,
    slug: wp.slug,
    seo: wp.seo
      ? {
          title: wp.seo.title,
          description: wp.seo.description,
          robots: wp.seo.robots || [],
        }
      : undefined,
  };
}

// ---------- Landing Page ----------

/**
 * Transform a single ACF flexible content layout into a LandingSection.
 */
function transformSection(layout: WPFlexibleSection): LandingSection {
  switch (layout.acf_fc_layout) {
    case "richtext":
      return {
        type: "richtext",
        title: layout.title,
        content: layout.content,
      };
    case "benefits":
      return {
        type: "benefits",
        title: layout.title,
        items: (layout.items || []).map((item) => ({
          icon: item.icon,
          title: item.title,
          text: item.text,
        })),
      };
    case "gallery":
      return {
        type: "gallery",
        title: layout.title,
        images: (layout.images || []).map((img) => ({
          src: resolveImage(img.src),
          alt: img.alt,
        })),
      };
    case "testimonials":
      return {
        type: "testimonials",
        title: layout.title,
        filter: layout.filter || "",
      };
    case "pricing":
      return {
        type: "pricing",
        title: layout.title,
      };
    case "faq":
      return {
        type: "faq",
        title: layout.title,
        items: (layout.items || []).map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      };
    default:
      // Unknown layout — skip gracefully
      return { type: "richtext", title: "", content: "" };
  }
}

/**
 * Transform a WordPress landing_page REST response (with ACF fields)
 * into the LandingPageData interface used by all landing components.
 */
export function transformToLandingData(wp: WPLandingPage): LandingPageData {
  const acf = wp.acf;

  // Resolve related pages to slugs
  const relatedPages: string[] = Array.isArray(acf.related_pages)
    ? acf.related_pages.map((p) => p.post_name)
    : [];

  return {
    slug: wp.slug,
    meta: {
      title: wp.seo?.title || decodeEntities(wp.title.rendered),
      description: wp.seo?.description || "",
      ogImage: resolveImage(acf.hero_background_image) || undefined,
    },
    hero: {
      title: acf.hero_title,
      subtitle: acf.hero_subtitle,
      backgroundImage: resolveImage(acf.hero_background_image),
      cta: {
        text: acf.hero_cta_text,
        href: acf.hero_cta_href,
      },
    },
    sections: (acf.sections || []).map(transformSection),
    relatedPages,
    jsonLd: {
      type: acf.jsonld_type || "TouristAttraction",
      priceFrom: Number(acf.jsonld_price_from) || 420,
    },
  };
}
