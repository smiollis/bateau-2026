import { test, expect } from "@playwright/test";

const landingPages = [
  "/fr/croisiere-evjf-seine",
  "/fr/croisiere-anniversaire-seine",
];

test.describe("Landing pages SEO", () => {
  for (const path of landingPages) {
    test.describe(`Landing: ${path}`, () => {
      test("page loads successfully", async ({ page }) => {
        const response = await page.goto(path, {
          waitUntil: "domcontentloaded",
        });
        // Landing pages are SSG — they should return 200
        // Use catch for dynamic pages that may not exist in all environments
        const status = response?.status() ?? 0;
        const loaded = status >= 200 && status < 400;
        expect(loaded).toBe(true);
      });

      test("has non-empty title tag", async ({ page }) => {
        const response = await page.goto(path, {
          waitUntil: "domcontentloaded",
        });
        if (!response || response.status() >= 400) {
          test.skip();
          return;
        }

        const title = await page.title();
        expect(title.trim().length).toBeGreaterThan(0);
      });

      test("has meta description with content", async ({ page }) => {
        const response = await page.goto(path, {
          waitUntil: "domcontentloaded",
        });
        if (!response || response.status() >= 400) {
          test.skip();
          return;
        }

        const metaDescription = page.locator('meta[name="description"]');
        await expect(metaDescription).toHaveAttribute("content", /.+/);

        const content = await metaDescription.getAttribute("content");
        expect(content?.trim().length).toBeGreaterThan(10);
      });

      test("has JSON-LD structured data", async ({ page }) => {
        const response = await page.goto(path, {
          waitUntil: "domcontentloaded",
        });
        if (!response || response.status() >= 400) {
          test.skip();
          return;
        }

        const jsonLdScripts = page.locator('script[type="application/ld+json"]');
        const count = await jsonLdScripts.count();
        expect(count).toBeGreaterThanOrEqual(1);

        // Verify JSON-LD content is valid JSON
        const firstScript = await jsonLdScripts.first().textContent();
        expect(firstScript).toBeTruthy();
        const parsed = JSON.parse(firstScript!);
        expect(parsed).toHaveProperty("@context");
        expect(parsed["@context"]).toContain("schema.org");
      });

      test("has canonical link", async ({ page }) => {
        const response = await page.goto(path, {
          waitUntil: "domcontentloaded",
        });
        if (!response || response.status() >= 400) {
          test.skip();
          return;
        }

        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical).toHaveAttribute("href", /.+/);
      });

      test("has hreflang alternate links", async ({ page }) => {
        const response = await page.goto(path, {
          waitUntil: "domcontentloaded",
        });
        if (!response || response.status() >= 400) {
          test.skip();
          return;
        }

        const hreflangLinks = page.locator('link[rel="alternate"][hreflang]');
        const count = await hreflangLinks.count();
        // Should have at least FR + EN + x-default = 3 hreflang entries
        expect(count).toBeGreaterThanOrEqual(3);

        // Verify x-default exists
        const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
        const hasXDefault = await xDefault.isVisible().catch(() => false);
        const xDefaultCount = await xDefault.count();
        expect(xDefaultCount).toBeGreaterThanOrEqual(1);
      });
    });
  }

  test("landing page has multiple JSON-LD schemas (TouristAttraction, Breadcrumb, FAQ)", async ({ page }) => {
    const response = await page.goto("/fr/croisiere-evjf-seine", {
      waitUntil: "domcontentloaded",
    });
    if (!response || response.status() >= 400) {
      test.skip();
      return;
    }

    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();

    // Landing pages should have TouristAttraction + BreadcrumbList + optionally FAQPage
    expect(count).toBeGreaterThanOrEqual(2);

    // Collect all schema types
    const types: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await jsonLdScripts.nth(i).textContent();
      if (text) {
        const parsed = JSON.parse(text);
        types.push(parsed["@type"]);
      }
    }

    // Should include at least TouristAttraction and BreadcrumbList
    expect(types).toContain("TouristAttraction");
    expect(types).toContain("BreadcrumbList");
  });

  test("different locales have different hreflang values", async ({ page }) => {
    const response = await page.goto("/fr/croisiere-evjf-seine", {
      waitUntil: "domcontentloaded",
    });
    if (!response || response.status() >= 400) {
      test.skip();
      return;
    }

    const hreflangLinks = page.locator('link[rel="alternate"][hreflang]');
    const count = await hreflangLinks.count();

    const hreflangs: string[] = [];
    for (let i = 0; i < count; i++) {
      const lang = await hreflangLinks.nth(i).getAttribute("hreflang");
      if (lang) hreflangs.push(lang);
    }

    // Should include fr and en at minimum
    expect(hreflangs).toContain("fr");
    expect(hreflangs).toContain("en");
  });
});
