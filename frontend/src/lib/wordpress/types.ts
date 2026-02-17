/**
 * WordPress REST API response types.
 *
 * These types model the raw JSON returned by the WP REST API
 * (including ACF Pro and RankMath fields exposed by the
 * bateau-headless-mode plugin).
 */

// ---------- Common ----------

export interface WPSeoData {
  title: string | null;
  description: string | null;
  focus_keyword: string | null;
  robots: string[];
}

// ---------- Posts (articles) ----------

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  seo?: WPSeoData | null;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

// ---------- Landing Pages (CPT + ACF) ----------

export interface WPLandingPage {
  id: number;
  slug: string;
  title: { rendered: string };
  seo?: WPSeoData | null;
  acf: WPLandingACF;
}

export interface WPLandingACF {
  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_background_image: string | WPImage;
  hero_cta_text: string;
  hero_cta_href: string;
  // Sections (flexible content)
  sections: WPFlexibleSection[];
  // JSON-LD
  jsonld_type: "Event" | "Product" | "TouristAttraction";
  jsonld_price_from: number;
  // Relations
  related_pages: WPRelatedPage[] | false;
}

export type WPFlexibleSection =
  | WPRichtextLayout
  | WPBenefitsLayout
  | WPGalleryLayout
  | WPTestimonialsLayout
  | WPPricingLayout
  | WPFAQLayout;

export interface WPRichtextLayout {
  acf_fc_layout: "richtext";
  title: string;
  content: string;
}

export interface WPBenefitsLayout {
  acf_fc_layout: "benefits";
  title: string;
  items: Array<{
    icon: string;
    title: string;
    text: string;
  }>;
}

export interface WPGalleryLayout {
  acf_fc_layout: "gallery";
  title: string;
  images: Array<{
    src: string | WPImage;
    alt: string;
  }>;
}

export interface WPTestimonialsLayout {
  acf_fc_layout: "testimonials";
  title: string;
  filter: string;
}

export interface WPPricingLayout {
  acf_fc_layout: "pricing";
  title: string;
}

export interface WPFAQLayout {
  acf_fc_layout: "faq";
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export interface WPImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface WPRelatedPage {
  ID: number;
  post_name: string;
  post_title: string;
}
