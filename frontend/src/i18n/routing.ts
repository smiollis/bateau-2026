import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en", "es", "it", "de", "pt-BR"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
});
