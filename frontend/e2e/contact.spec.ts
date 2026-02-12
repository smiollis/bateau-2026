import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for full hydration — check that React has mounted
    await page.waitForLoadState("load");
    // Wait for React hydration by checking a client-side rendered element
    await page.waitForTimeout(2000);
  });

  test("displays contact form with all fields", async ({ page }) => {
    const contactSection = page.locator("#contact").first();
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();

    await expect(contactSection.locator('input[type="email"]')).toBeVisible();
    await expect(contactSection.locator("textarea")).toBeVisible();
    await expect(
      contactSection.locator('button[type="submit"]'),
    ).toBeVisible();
  });

  test("submits valid form with intercepted API", async ({ page }) => {
    // Intercept API call
    await page.route("**/api/contact", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    const contactSection = page.locator("#contact").first();
    await contactSection.scrollIntoViewIfNeeded();

    // Fill form fields
    const emailInput = contactSection.locator('input[type="email"]');
    const textarea = contactSection.locator("textarea");
    const nameInput = contactSection
      .locator(
        "input:not([type='hidden']):not([aria-hidden='true']):not([type='email']):not([type='tel'])",
      )
      .first();

    await nameInput.fill("Jean Test");
    await emailInput.fill("jean@test.fr");
    await textarea.fill("Message de test E2E");

    const submitBtn = contactSection.locator('button[type="submit"]');
    await submitBtn.click();

    // Wait for API response and form reset
    await page.waitForTimeout(3000);

    // Form should be cleared after success (name field empty)
    await expect(nameInput).toHaveValue("");
  });
});
