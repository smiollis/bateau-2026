import { describe, it, expect, beforeEach } from "vitest";
import {
  saveConsent,
  loadConsent,
  removeConsent,
  CONSENT_VERSION,
} from "@/lib/cookie-consent";
import type { CookieConsent } from "@/types/cookie-consent";

const mockConsent: CookieConsent = {
  necessary: true,
  analytics: true,
  marketing: false,
  timestamp: "2026-02-12T00:00:00.000Z",
  version: CONSENT_VERSION,
};

describe("cookie-consent lib", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saves and loads consent (roundtrip)", () => {
    saveConsent(mockConsent);
    const loaded = loadConsent();
    expect(loaded).toEqual(mockConsent);
  });

  it("returns null when nothing is stored", () => {
    expect(loadConsent()).toBeNull();
  });

  it("returns null and removes data on version mismatch", () => {
    const oldConsent = { ...mockConsent, version: "0.1" };
    localStorage.setItem("bateau-cookie-consent", JSON.stringify(oldConsent));
    const loaded = loadConsent();
    expect(loaded).toBeNull();
    expect(localStorage.getItem("bateau-cookie-consent")).toBeNull();
  });

  it("removes consent from localStorage", () => {
    saveConsent(mockConsent);
    expect(loadConsent()).not.toBeNull();
    removeConsent();
    expect(loadConsent()).toBeNull();
  });

  it("returns null on corrupted JSON", () => {
    localStorage.setItem("bateau-cookie-consent", "{invalid json}");
    expect(loadConsent()).toBeNull();
  });
});
