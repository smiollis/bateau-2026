import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale, getOgAlternateLocales } from '@/lib/metadata';
import { generateFAQPageJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo/jsonld';
import LandingBreadcrumb from '@/components/landing/LandingBreadcrumb';
import FAQ from '@/views/FAQ';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("faqTitle"),
    description: t("faqDescription"),
    alternates: getAlternates(locale, "/faq"),
    openGraph: { locale: getOgLocale(locale), alternateLocale: getOgAlternateLocales(locale) },
  };
}

export default async function RouteWrapper({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tBreadcrumb = await getTranslations({ locale, namespace: "breadcrumb" });

  const faqItems = Array.from({ length: 10 }, (_, i) => {
    const num = i + 1;
    const question = t(`question${num}`);
    // Question 6 has a split answer (answer6Before + answer6Link + answer6After)
    const answer = num === 6
      ? `${t("answer6Before")}${t("answer6Link")}${t("answer6After")}`
      : t(`answer${num}`);
    return { question, answer };
  });

  const faqJsonLd = generateFAQPageJsonLd(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd([{ name: tBreadcrumb("home"), url: `/${locale}` }, { name: "FAQ", url: `/${locale}/faq` }])) }}
      />
      <LandingBreadcrumb items={[{ name: "FAQ" }]} />
      <FAQ />
    </>
  );
}
