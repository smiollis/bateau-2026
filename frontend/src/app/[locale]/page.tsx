import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale } from '@/lib/metadata';
import Index from '@/views/Index';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: getAlternates(locale, ""),
    openGraph: { locale: getOgLocale(locale) },
  };
}

export default function Home() {
  return <Index />;
}
