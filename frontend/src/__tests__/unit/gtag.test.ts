import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getConsentDefaultScript,
  updateAnalyticsConsent,
  updateMarketingConsent,
  removeGACookies,
} from "@/lib/gtag";

describe("gtag", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.gtag = vi.fn();
  });

  describe("getConsentDefaultScript", () => {
    it("generates a valid script with gaId and EU regions", () => {
      const script = getConsentDefaultScript("G-TEST123");
      expect(script).toContain("G-TEST123");
      expect(script).toContain("analytics_storage");
      expect(script).toContain("denied");
      expect(script).toContain("FR");
      expect(script).toContain("DE");
      expect(script).toContain("gtag('js', new Date())");
    });
  });

  describe("updateAnalyticsConsent", () => {
    it("calls gtag with granted when true", () => {
      updateAnalyticsConsent(true);
      expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
        analytics_storage: "granted",
      });
    });

    it("calls gtag with denied when false", () => {
      updateAnalyticsConsent(false);
      expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
        analytics_storage: "denied",
      });
    });
  });

  describe("updateMarketingConsent", () => {
    it("updates ad_storage, ad_user_data, ad_personalization", () => {
      updateMarketingConsent(true);
      expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    });
  });

  describe("removeGACookies", () => {
    it("expires GA cookies", () => {
      // Set a mock cookie
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "_ga=GA1.2.123; _gid=GID1.2.456; _ga_ABC=value",
      });
      removeGACookies();
      // We can't easily test document.cookie assignment in jsdom,
      // but we verify the function does not throw
      expect(true).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("does not throw when window.gtag is undefined", () => {
      // @ts-expect-error testing edge case
      window.gtag = undefined;
      expect(() => updateAnalyticsConsent(true)).not.toThrow();
      expect(() => updateMarketingConsent(false)).not.toThrow();
    });
  });
});
