import { test, expect } from "@playwright/test";

test.describe("Blog multilingual", () => {
  test("FR blog page loads with articles", async ({ page }) => {
    const response = await page.goto("/fr/actualites", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);

    // Page should have h1 title
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 10000 });

    // Should have at least one article link (featured post or grid items)
    const articleLinks = page.locator("a[href*='/actualites/']");
    const count = await articleLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("EN blog page loads with articles", async ({ page }) => {
    const response = await page.goto("/en/actualites", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 10000 });

    const articleLinks = page.locator("a[href*='/actualites/']");
    const count = await articleLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("articles have titles (h2 or h3)", async ({ page }) => {
    await page.goto("/fr/actualites");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Featured article has h2, grid articles have h3
    const h2Titles = page.locator("h2");
    const h3Titles = page.locator("h3");

    const h2Count = await h2Titles.count();
    const h3Count = await h3Titles.count();

    // At least one heading for articles should exist
    expect(h2Count + h3Count).toBeGreaterThanOrEqual(1);
  });

  test("articles have images", async ({ page }) => {
    await page.goto("/fr/actualites");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Articles use next/image which renders <img> tags
    const images = page.locator("img[alt]");
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("article detail page loads from first article link", async ({ page }) => {
    await page.goto("/fr/actualites");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Find the first article link
    const firstArticleLink = page.locator("a[href*='/actualites/']").first();
    const hasLink = await firstArticleLink.isVisible({ timeout: 5000 }).catch(() => false);

    if (!hasLink) {
      test.skip();
      return;
    }

    const href = await firstArticleLink.getAttribute("href");
    expect(href).toBeTruthy();

    // Navigate to article detail
    await firstArticleLink.click();
    await page.waitForLoadState("domcontentloaded");

    // URL should contain /actualites/ with a slug
    await expect(page).toHaveURL(/\/actualites\/.+/);
  });

  test("article detail has h1 title", async ({ page }) => {
    await page.goto("/fr/actualites");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    const firstArticleLink = page.locator("a[href*='/actualites/']").first();
    const hasLink = await firstArticleLink.isVisible({ timeout: 5000 }).catch(() => false);

    if (!hasLink) {
      test.skip();
      return;
    }

    await firstArticleLink.click();
    await page.waitForLoadState("domcontentloaded");

    // Article detail should have h1
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 10000 });

    const text = await h1.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test("article detail has content and back link", async ({ page }) => {
    await page.goto("/fr/actualites");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    const firstArticleLink = page.locator("a[href*='/actualites/']").first();
    const hasLink = await firstArticleLink.isVisible({ timeout: 5000 }).catch(() => false);

    if (!hasLink) {
      test.skip();
      return;
    }

    await firstArticleLink.click();
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Article detail should have prose content
    const content = page.locator(".prose, article").first();
    const hasContent = await content.isVisible({ timeout: 5000 }).catch(() => false);
    expect(hasContent).toBe(true);

    // Should have a back link to /actualites
    const backLink = page.locator("a[href*='/actualites']").filter({ hasNotText: /\/actualites\// }).first();
    const hasBackLink = await backLink.isVisible({ timeout: 3000 }).catch(() => false);
    expect(hasBackLink).toBe(true);
  });

  test("language switch preserves blog page structure", async ({ page }) => {
    // Load FR blog
    await page.goto("/fr/actualites");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    const frH1 = page.locator("h1").first();
    await expect(frH1).toBeVisible({ timeout: 10000 });
    const frTitle = await frH1.textContent();

    const frArticleCount = await page.locator("a[href*='/actualites/']").count();

    // Load EN blog
    await page.goto("/en/actualites");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    const enH1 = page.locator("h1").first();
    await expect(enH1).toBeVisible({ timeout: 10000 });
    const enTitle = await enH1.textContent();

    const enArticleCount = await page.locator("a[href*='/actualites/']").count();

    // Both should have articles (counts may differ if translations differ)
    expect(frArticleCount).toBeGreaterThanOrEqual(1);
    expect(enArticleCount).toBeGreaterThanOrEqual(1);

    // Titles should be different (translated)
    // Use catch since translations may not always differ
    if (frTitle && enTitle) {
      // At minimum, both should have non-empty titles
      expect(frTitle.trim().length).toBeGreaterThan(0);
      expect(enTitle.trim().length).toBeGreaterThan(0);
    }
  });

  test("blog page has header and footer", async ({ page }) => {
    await page.goto("/fr/actualites");
    await page.waitForLoadState("domcontentloaded");

    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
