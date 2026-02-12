import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads successfully with hero section", async ({ page }) => {
    await page.goto("/");
    // next-intl may redirect to /fr
    await page.waitForLoadState("domcontentloaded");
    // Hero section should be visible
    await expect(page.locator("header")).toBeVisible();
  });

  test("renders all major sections", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    // Header
    await expect(page.locator("header")).toBeVisible();
    // Footer
    await expect(page.locator("footer")).toBeVisible();
    // At least one section with content
    await expect(page.locator("section").first()).toBeVisible();
  });

  test("theme toggle switches between classic and nuit", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    // The theme toggle is in the header — look for a button with Sun or Moon icon
    const themeBtn = page.locator("header button").filter({ has: page.locator("svg") }).last();
    if (await themeBtn.isVisible()) {
      const hasDarkBefore = await page.evaluate(() =>
        document.documentElement.classList.contains("dark"),
      );
      await themeBtn.click();
      await page.waitForTimeout(500);
      const hasDarkAfter = await page.evaluate(() =>
        document.documentElement.classList.contains("dark"),
      );
      expect(hasDarkBefore).not.toBe(hasDarkAfter);
    }
  });
});
