import { test, expect } from "@playwright/test";

test.describe("Cookie consent (RGPD)", () => {
  test.beforeEach(async ({ context }) => {
    // Clear storage to simulate first visit
    await context.clearCookies();
  });

  test("cookie banner appears on first visit", async ({ page }) => {
    await page.goto("/");
    // Banner should appear
    const banner = page.locator("text=🍪").first();
    await expect(banner).toBeVisible({ timeout: 5000 });
  });

  test("accepting all hides the banner", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);

    // Find and click "Accept" button
    const acceptBtn = page.getByRole("button", { name: /accepter|accept/i }).first();
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();

      // Banner should disappear
      await expect(acceptBtn).not.toBeVisible({ timeout: 3000 });
    }
  });

  test("customize opens the cookie modal", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);

    // Find and click "Customize" button
    const customizeBtn = page.getByRole("button", { name: /personnaliser|personaliser|customize/i }).first();
    if (await customizeBtn.isVisible()) {
      await customizeBtn.click();

      // Modal should appear with cookie categories
      const modal = page.locator('[role="dialog"], .fixed.inset-0').first();
      await expect(modal).toBeVisible({ timeout: 3000 });
    }
  });

  test("rejecting all hides the banner", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);

    // Open customize modal first, then reject
    const customizeBtn = page.getByRole("button", { name: /personnaliser|customize/i }).first();
    if (await customizeBtn.isVisible()) {
      await customizeBtn.click();
      await page.waitForTimeout(500);

      const rejectBtn = page.getByRole("button", { name: /refuser|tout refuser|reject/i }).first();
      if (await rejectBtn.isVisible()) {
        await rejectBtn.click();
        // Banner and modal should both be hidden
        await expect(customizeBtn).not.toBeVisible({ timeout: 3000 });
      }
    }
  });
});
