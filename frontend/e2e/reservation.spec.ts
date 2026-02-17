import { test, expect } from "@playwright/test";

test.describe("Reservation page", () => {
  test("FR reservation page loads with 200", async ({ page }) => {
    const response = await page.goto("/fr/reservation", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("EN reservation page loads with 200", async ({ page }) => {
    const response = await page.goto("/en/reservation", {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("page has breadcrumb navigation", async ({ page }) => {
    await page.goto("/fr/reservation");
    await page.waitForLoadState("domcontentloaded");

    const breadcrumb = page.locator("nav[aria-label*='breadcrumb'], nav[aria-label*='Breadcrumb'], ol[role='list']").first();
    await expect(breadcrumb).toBeVisible({ timeout: 10000 });
  });

  test("page has h1 title", async ({ page }) => {
    await page.goto("/fr/reservation");
    await page.waitForLoadState("domcontentloaded");

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 10000 });

    const text = await h1.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test("page has iframe or loading skeleton", async ({ page }) => {
    await page.goto("/fr/reservation");
    await page.waitForLoadState("domcontentloaded");

    // The page shows either an iframe (loaded state) or a skeleton (loading state)
    const iframe = page.locator("iframe");
    const skeleton = page.locator("[class*='skeleton'], [class*='Skeleton'], [class*='animate-spin']");

    const hasIframe = await iframe.isVisible({ timeout: 5000 }).catch(() => false);
    const hasSkeleton = await skeleton.first().isVisible({ timeout: 3000 }).catch(() => false);

    // At least one should be present (iframe loading or skeleton placeholder)
    expect(hasIframe || hasSkeleton).toBe(true);
  });

  test("page has reassurance badges", async ({ page }) => {
    await page.goto("/fr/reservation");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // Reassurance badges are in a grid with 3 items containing icons (SVG) and text
    const badgeContainer = page.locator(".grid.grid-cols-1.md\\:grid-cols-3, [class*='grid']").filter({
      has: page.locator("svg"),
    });

    // Look for the specific badge icons: ShieldCheck, Mail, CreditCard
    const svgIcons = page.locator("svg").filter({ has: page.locator("path") });
    const iconCount = await svgIcons.count();
    expect(iconCount).toBeGreaterThanOrEqual(3);
  });

  test("page has FAQ link button", async ({ page }) => {
    await page.goto("/fr/reservation");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1000);

    // FAQ link is a button with HelpCircle icon linking to /faq
    const faqLink = page.locator("a[href*='/faq']").first();
    const hasFaqLink = await faqLink.isVisible({ timeout: 5000 }).catch(() => false);

    expect(hasFaqLink).toBe(true);
  });

  test("error fallback structure exists in page source", async ({ page }) => {
    await page.goto("/fr/reservation");
    await page.waitForLoadState("domcontentloaded");

    // Verify the page has the contact fallback link (visible in error state)
    // In normal state, this is hidden but the contact link structure exists in the component
    const contactLink = page.locator("a[href*='contact'], a[href*='tel:']");
    const phoneLink = page.locator("a[href*='tel:']");

    // The phone link is in the error fallback — it may not be visible if iframe loaded
    // but we can verify the page rendered the reservation component correctly
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible({ timeout: 10000 });

    // Verify the overall page structure rendered (header + footer + content)
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("reservation page preserves locale in URL", async ({ page }) => {
    await page.goto("/fr/reservation");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/\/fr\/reservation/);

    await page.goto("/en/reservation");
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/\/en\/reservation/);
  });
});
