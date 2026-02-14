export interface LandingPageData {
  slug: string;
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    cta: { text: string; href: string };
  };
  sections: LandingSection[];
  relatedPages: string[];
  jsonLd: {
    type: "Event" | "Product" | "TouristAttraction";
    priceFrom: number;
  };
}

export type LandingSection =
  | RichtextSection
  | BenefitsSection
  | GallerySection
  | TestimonialsSection
  | PricingSection
  | FAQSection;

export interface RichtextSection {
  type: "richtext";
  title: string;
  content: string;
}

export interface BenefitsSection {
  type: "benefits";
  title: string;
  items: BenefitItem[];
}

export interface GallerySection {
  type: "gallery";
  title: string;
  images: { src: string; alt: string }[];
}

export interface TestimonialsSection {
  type: "testimonials";
  title: string;
  filter: string;
}

export interface PricingSection {
  type: "pricing";
  title: string;
}

export interface FAQSection {
  type: "faq";
  title: string;
  items: FAQItem[];
}

export interface BenefitItem {
  icon: string;
  title: string;
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Translation-only shape for i18n landing pages.
 * Mirrors LandingPageData but omits non-translatable fields
 * (slug, relatedPages, jsonLd, hero.backgroundImage, hero.cta.href).
 */
export interface LandingPageTranslation {
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: { text: string };
  };
  sections: LandingSection[];
}
