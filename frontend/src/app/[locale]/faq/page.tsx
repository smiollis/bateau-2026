import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale } from '@/lib/metadata';
import { generateFAQPageJsonLd } from '@/lib/seo/jsonld';
import FAQ from '@/views/FAQ';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("faqTitle"),
    description: t("faqDescription"),
    alternates: getAlternates(locale, "/faq"),
    openGraph: { locale: getOgLocale(locale) },
  };
}

export default async function RouteWrapper({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

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
      <FAQ />
    </>
  );
}
