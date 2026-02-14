import { describe, it, expect } from "vitest";
import {
  generateFAQPageJsonLd,
  generateTouristAttractionJsonLd,
  generateBreadcrumbJsonLd,
} from "@/lib/seo/jsonld";
import type { LandingPageData, FAQItem } from "@/data/landings/types";

const mockFAQItems: FAQItem[] = [
  { question: "Quelle est la duree de la croisiere ?", answer: "2 heures environ." },
  { question: "Combien de personnes maximum ?", answer: "Jusqu'a 12 personnes." },
  { question: "Y a-t-il du champagne ?", answer: "Oui, une coupe offerte." },
];

const mockLanding: LandingPageData = {
  slug: "test-landing",
  meta: {
    title: "Test Landing Page",
    description: "Description for testing JSON-LD generation.",
  },
  hero: {
    title: "Test Hero Title",
    subtitle: "Test subtitle",
    backgroundImage: "/images/test-bg.jpg",
    cta: { text: "Reserver", href: "/reservation" },
  },
  sections: [],
  relatedPages: [],
  jsonLd: {
    type: "TouristAttraction",
    priceFrom: 290,
  },
};

describe("generateFAQPageJsonLd", () => {
  it("returns correct @context and @type", () => {
    const result = generateFAQPageJsonLd(mockFAQItems);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("FAQPage");
  });

  it("has mainEntity with correct number of questions", () => {
    const result = generateFAQPageJsonLd(mockFAQItems);
    expect(result.mainEntity).toHaveLength(3);
  });

  it("each mainEntity item has Question type", () => {
    const result = generateFAQPageJsonLd(mockFAQItems);
    result.mainEntity.forEach((item) => {
      expect(item["@type"]).toBe("Question");
    });
  });

  it("each mainEntity item has acceptedAnswer with Answer type", () => {
    const result = generateFAQPageJsonLd(mockFAQItems);
    result.mainEntity.forEach((item) => {
      expect(item.acceptedAnswer["@type"]).toBe("Answer");
      expect(typeof item.acceptedAnswer.text).toBe("string");
    });
  });

  it("preserves question and answer text", () => {
    const result = generateFAQPageJsonLd(mockFAQItems);
    expect(result.mainEntity[0]!.name).toBe(mockFAQItems[0]!.question);
    expect(result.mainEntity[0]!.acceptedAnswer.text).toBe(mockFAQItems[0]!.answer);
  });

  it("handles empty FAQ list", () => {
    const result = generateFAQPageJsonLd([]);
    expect(result.mainEntity).toHaveLength(0);
  });
});

describe("generateTouristAttractionJsonLd", () => {
  it("returns correct @context and @type", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "fr");
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("TouristAttraction");
  });

  it("uses hero title as name", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "fr");
    expect(result.name).toBe("Test Hero Title");
  });

  it("uses meta description as description", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "fr");
    expect(result.description).toBe("Description for testing JSON-LD generation.");
  });

  it("constructs correct URL with locale", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "fr");
    expect(result.url).toBe("https://bateau-a-paris.fr/fr/test-landing");
  });

  it("constructs correct URL for EN locale", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "en");
    expect(result.url).toBe("https://bateau-a-paris.fr/en/test-landing");
  });

  it("prefixes relative image paths with site URL", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "fr");
    expect(result.image).toBe("https://bateau-a-paris.fr/images/test-bg.jpg");
  });

  it("keeps absolute image paths as-is", () => {
    const landingWithAbsoluteImage = {
      ...mockLanding,
      hero: { ...mockLanding.hero, backgroundImage: "https://cdn.example.com/image.jpg" },
    };
    const result = generateTouristAttractionJsonLd(landingWithAbsoluteImage, "fr");
    expect(result.image).toBe("https://cdn.example.com/image.jpg");
  });

  it("has geo coordinates for Paris", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "fr");
    expect(result.geo["@type"]).toBe("GeoCoordinates");
    expect(result.geo.latitude).toBeCloseTo(48.85, 1);
    expect(result.geo.longitude).toBeCloseTo(2.37, 1);
  });

  it("has postal address in Paris", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "fr");
    expect(result.address["@type"]).toBe("PostalAddress");
    expect(result.address.addressLocality).toBe("Paris");
    expect(result.address.addressCountry).toBe("FR");
  });

  it("has offer with correct price", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "fr");
    expect(result.offers["@type"]).toBe("Offer");
    expect(result.offers.priceCurrency).toBe("EUR");
    expect(result.offers.price).toBe("290");
  });

  it("has aggregate rating", () => {
    const result = generateTouristAttractionJsonLd(mockLanding, "fr");
    expect(result.aggregateRating["@type"]).toBe("AggregateRating");
    expect(Number(result.aggregateRating.ratingValue)).toBeGreaterThan(0);
  });
});

describe("generateBreadcrumbJsonLd", () => {
  const breadcrumbItems = [
    { name: "Accueil", url: "/" },
    { name: "Croisieres", url: "/croisiere" },
    { name: "EVJF Seine", url: "/evjf-seine" },
  ];

  it("returns correct @context and @type", () => {
    const result = generateBreadcrumbJsonLd(breadcrumbItems);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("BreadcrumbList");
  });

  it("has correct number of items", () => {
    const result = generateBreadcrumbJsonLd(breadcrumbItems);
    expect(result.itemListElement).toHaveLength(3);
  });

  it("each item has ListItem type", () => {
    const result = generateBreadcrumbJsonLd(breadcrumbItems);
    result.itemListElement.forEach((item) => {
      expect(item["@type"]).toBe("ListItem");
    });
  });

  it("positions are 1-indexed and sequential", () => {
    const result = generateBreadcrumbJsonLd(breadcrumbItems);
    result.itemListElement.forEach((item, index) => {
      expect(item.position).toBe(index + 1);
    });
  });

  it("prefixes relative URLs with site URL", () => {
    const result = generateBreadcrumbJsonLd(breadcrumbItems);
    expect(result.itemListElement[0]!.item).toBe("https://bateau-a-paris.fr/");
  });

  it("keeps absolute URLs as-is", () => {
    const items = [{ name: "External", url: "https://example.com/page" }];
    const result = generateBreadcrumbJsonLd(items);
    expect(result.itemListElement[0]!.item).toBe("https://example.com/page");
  });

  it("preserves item names", () => {
    const result = generateBreadcrumbJsonLd(breadcrumbItems);
    expect(result.itemListElement[0]!.name).toBe("Accueil");
    expect(result.itemListElement[2]!.name).toBe("EVJF Seine");
  });
});
