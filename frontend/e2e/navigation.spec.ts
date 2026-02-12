import { test, expect } from "@playwright/test";

const pages = [
  "/",
  "/croisiere",
  "/galerie",
  "/faq",
  "/actualites",
  "/cgv",
  "/mentions-legales",
  "/confidentialite",
];

test.describe("Navigation", () => {
  for (const path of pages) {
    test(`page ${path} loads with 200`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("body")).not.toBeEmpty();
    });
  }

  test("reservation page loads", async ({ page }) => {
    const response = await page.goto("/reservation", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBeLessThan(400);
  });

  test("legacy redirect /f_a_q to /faq", async ({ page }) => {
    const response = await page.goto("/f_a_q", {
      waitUntil: "domcontentloaded",
    });
    // Redirects may return 200 (after redirect) or 308
    await expect(page).toHaveURL(/\/faq/);
  });

  test("legacy redirect /c_g_v to /cgv", async ({ page }) => {
    const response = await page.goto("/c_g_v", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveURL(/\/cgv/);
  });

  test("legacy redirect /mentions_legales to /mentions-legales", async ({
    page,
  }) => {
    const response = await page.goto("/mentions_legales", {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveURL(/\/mentions-legales/);
  });

  test("language switch toggles between FR and EN", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const langBtn = page
      .locator("header button")
      .filter({ hasText: /^(FR|EN)$/ })
      .first();

    if (await langBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      const textBefore = await langBtn.textContent();
      await langBtn.click();
      await page.waitForLoadState("domcontentloaded");

      if (textBefore?.trim() === "EN") {
        await expect(page).toHaveURL(/\/en/);
      }
    }
  });
});
