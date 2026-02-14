import { describe, it, expect } from "vitest";
import { getAllLandingSlugs, getLandingData, getRelatedPages, landingPages } from "@/data/landings";
import type { LandingPageData } from "@/data/landings/types";

describe("Landing page data", () => {
  const slugs = getAllLandingSlugs();

  it("has 17 landing pages", () => {
    expect(slugs).toHaveLength(17);
  });

  it("getAllLandingSlugs returns strings", () => {
    slugs.forEach((slug) => {
      expect(typeof slug).toBe("string");
      expect(slug.length).toBeGreaterThan(0);
    });
  });

  it("getLandingData returns undefined for unknown slug", () => {
    expect(getLandingData("non-existent-slug")).toBeUndefined();
  });

  it("getRelatedPages returns filtered data for valid slugs", () => {
    const related = getRelatedPages([slugs[0]!, slugs[1]!]);
    expect(related).toHaveLength(2);
    expect(related[0]).toHaveProperty("slug");
    expect(related[0]).toHaveProperty("hero");
    expect(related[0]).toHaveProperty("meta");
  });

  it("getRelatedPages filters out invalid slugs", () => {
    const related = getRelatedPages([slugs[0]!, "nonexistent"]);
    expect(related).toHaveLength(1);
  });

  slugs.forEach((slug) => {
    describe(slug, () => {
      const data = getLandingData(slug) as LandingPageData;

      it("exists in registry", () => {
        expect(data).toBeDefined();
      });

      it("has matching slug property", () => {
        expect(data.slug).toBe(slug);
      });

      it("has valid meta", () => {
        expect(data.meta.title).toBeTruthy();
        expect(typeof data.meta.title).toBe("string");
        expect(data.meta.description).toBeTruthy();
        expect(typeof data.meta.description).toBe("string");
        expect(data.meta.description.length).toBeGreaterThan(10);
      });

      it("has valid hero", () => {
        expect(data.hero.title).toBeTruthy();
        expect(data.hero.subtitle).toBeTruthy();
        expect(data.hero.backgroundImage).toBeTruthy();
        expect(data.hero.cta.text).toBeTruthy();
        expect(data.hero.cta.href).toBeTruthy();
      });

      it("has sections", () => {
        expect(data.sections.length).toBeGreaterThan(0);
      });

      it("has valid section types", () => {
        const validTypes = ["richtext", "benefits", "gallery", "testimonials", "pricing", "faq"];
        data.sections.forEach((section) => {
          expect(validTypes).toContain(section.type);
        });
      });

      it("has valid jsonLd priceFrom", () => {
        expect(data.jsonLd.priceFrom).toBeGreaterThan(0);
        expect(typeof data.jsonLd.priceFrom).toBe("number");
      });

      it("has valid jsonLd type", () => {
        expect(["Event", "Product", "TouristAttraction"]).toContain(data.jsonLd.type);
      });

      it("has relatedPages referencing valid slugs", () => {
        expect(Array.isArray(data.relatedPages)).toBe(true);
        data.relatedPages.forEach((relatedSlug) => {
          expect(landingPages).toHaveProperty(relatedSlug);
        });
      });
    });
  });
});
