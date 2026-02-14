import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// color-contrast kept disabled: dynamic theme variants (classic/nuit) make automated
// contrast checks unreliable — contrast is manually verified per variant.
// link-name and button-name re-enabled: all links have text/alt and all icon-only
// buttons have aria-label attributes.
const disabledRules = ["color-contrast"];

test.describe("Accessibility (WCAG 2.1 AA)", () => {
  test("home page has no critical accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(1000);

    // Dismiss cookie banner
    const acceptBtn = page
      .getByRole("button", { name: /accepter|accept/i })
      .first();
    if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await acceptBtn.click();
      await page.waitForTimeout(500);
    }

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(disabledRules)
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(
      critical,
      `Found ${critical.length} critical/serious a11y violations: ${critical.map((v) => `${v.id}: ${v.description}`).join("; ")}`,
    ).toHaveLength(0);
  });

  test("contact section is accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("load");
    await page.waitForTimeout(1000);

    const acceptBtn = page
      .getByRole("button", { name: /accepter|accept/i })
      .first();
    if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await acceptBtn.click();
      await page.waitForTimeout(500);
    }

    const contactSection = page.locator("#contact").first();
    await contactSection.scrollIntoViewIfNeeded();

    const results = await new AxeBuilder({ page })
      .include("#contact")
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(disabledRules)
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(
      critical,
      `Found ${critical.length} critical/serious a11y violations in contact: ${critical.map((v) => `${v.id}: ${v.description}`).join("; ")}`,
    ).toHaveLength(0);
  });

  test("galerie page is accessible", async ({ page }) => {
    await page.goto("/galerie");
    await page.waitForLoadState("load");
    await page.waitForTimeout(1000);

    const acceptBtn = page
      .getByRole("button", { name: /accepter|accept/i })
      .first();
    if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await acceptBtn.click();
      await page.waitForTimeout(500);
    }

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(disabledRules)
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(
      critical,
      `Found ${critical.length} critical/serious a11y violations in galerie: ${critical.map((v) => `${v.id}: ${v.description}`).join("; ")}`,
    ).toHaveLength(0);
  });
});
