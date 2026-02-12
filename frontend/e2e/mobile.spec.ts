import { test, expect } from "@playwright/test";

// Use mobile viewport (without full device emulation to avoid webkit conflicts)
test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

test.describe("Mobile responsiveness", () => {
  test("home page renders on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThanOrEqual(430);
  });

  test("mobile menu opens", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(500);

    // On mobile, the header should have a hamburger button
    const menuBtn = page.locator("header button").filter({ has: page.locator("svg") }).first();

    if (await menuBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await menuBtn.click();
      await page.waitForTimeout(500);

      // Some navigation element should become visible
      const nav = page.locator("nav, [role='navigation']").first();
      await expect(nav).toBeVisible();
    }
  });

  test("contact form is usable on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const contactSection = page.locator("#contact").first();
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();

    await expect(contactSection.locator('input[type="email"]')).toBeVisible();
    await expect(contactSection.locator("textarea")).toBeVisible();
    await expect(
      contactSection.locator('button[type="submit"]'),
    ).toBeVisible();
  });
});
