import { describe, it, expect, vi } from "vitest";

vi.mock("@/i18n/routing", () => ({
  locales: ["fr", "en", "es", "it", "de", "pt-BR"] as const,
}));

import { getAlternates, getOgLocale } from "@/lib/metadata";

describe("getAlternates", () => {
  it("returns canonical for given locale and path", () => {
    const result = getAlternates("fr", "/croisiere");
    expect(result.canonical).toBe("/fr/croisiere");
  });

  it("returns canonical for homepage (empty path)", () => {
    const result = getAlternates("fr");
    expect(result.canonical).toBe("/fr");
  });

  it("returns canonical for EN locale", () => {
    const result = getAlternates("en", "/gallery");
    expect(result.canonical).toBe("/en/gallery");
  });

  it("returns hreflang entries for all locales", () => {
    const result = getAlternates("fr", "/croisiere");
    expect(result.languages).toHaveProperty("fr", "/fr/croisiere");
    expect(result.languages).toHaveProperty("en", "/en/croisiere");
    expect(result.languages).toHaveProperty("es", "/es/croisiere");
    expect(result.languages).toHaveProperty("it", "/it/croisiere");
    expect(result.languages).toHaveProperty("de", "/de/croisiere");
    expect(result.languages).toHaveProperty("pt-BR", "/pt-BR/croisiere");
  });

  it("includes x-default pointing to FR", () => {
    const result = getAlternates("en", "/faq");
    expect(result.languages["x-default"]).toBe("/fr/faq");
  });

  it("x-default points to FR for homepage", () => {
    const result = getAlternates("de");
    expect(result.languages["x-default"]).toBe("/fr");
  });

  it("handles paths without leading slash correctly", () => {
    const result = getAlternates("fr", "");
    expect(result.canonical).toBe("/fr");
    expect(result.languages["x-default"]).toBe("/fr");
  });
});

describe("getOgLocale", () => {
  it("returns fr_FR for fr", () => {
    expect(getOgLocale("fr")).toBe("fr_FR");
  });

  it("returns en_US for en", () => {
    expect(getOgLocale("en")).toBe("en_US");
  });

  it("returns es_ES for es", () => {
    expect(getOgLocale("es")).toBe("es_ES");
  });

  it("returns it_IT for it", () => {
    expect(getOgLocale("it")).toBe("it_IT");
  });

  it("returns de_DE for de", () => {
    expect(getOgLocale("de")).toBe("de_DE");
  });

  it("returns pt_BR for pt-BR", () => {
    expect(getOgLocale("pt-BR")).toBe("pt_BR");
  });

  it("returns fr_FR as fallback for unknown locale", () => {
    expect(getOgLocale("zh")).toBe("fr_FR");
    expect(getOgLocale("ja")).toBe("fr_FR");
    expect(getOgLocale("")).toBe("fr_FR");
  });
});
