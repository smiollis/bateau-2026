import type { FAQItem, LandingPageData } from "@/data/landings/types";
import reviewsData from "@/data/reviews.json";

const SITE_URL = "https://bateau-a-paris.fr";

// Compute aggregate rating from reviews data
const reviewRatings = reviewsData.reviews.map((r) => r.rating);
const computedRatingValue = (
  reviewRatings.reduce((sum, r) => sum + r, 0) / reviewRatings.length
).toFixed(1);
const computedReviewCount = String(reviewsData.totalReviews);

/**
 * Generate FAQPage JSON-LD schema.
 */
export function generateFAQPageJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate TouristAttraction + Offer JSON-LD schema.
 */
export function generateTouristAttractionJsonLd(
  landing: LandingPageData,
  locale: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: landing.hero.title,
    description: landing.meta.description,
    url: `${SITE_URL}/${locale}/${landing.slug}`,
    image: landing.hero.backgroundImage.startsWith("/")
      ? `${SITE_URL}${landing.hero.backgroundImage}`
      : landing.hero.backgroundImage,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8515209,
      longitude: 2.3687542,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Port de l'Arsenal",
      addressLocality: "Paris",
      postalCode: "75012",
      addressCountry: "FR",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: String(landing.jsonLd.priceFrom),
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/${locale}/reservation`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: computedRatingValue,
      reviewCount: computedReviewCount,
    },
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema.
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("/") ? `${SITE_URL}${item.url}` : item.url,
    })),
  };
}
