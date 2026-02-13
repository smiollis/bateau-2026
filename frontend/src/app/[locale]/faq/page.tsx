import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale } from '@/lib/metadata';
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

export default function RouteWrapper() {
  return <FAQ />;
}
