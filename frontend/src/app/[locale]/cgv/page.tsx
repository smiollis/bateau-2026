import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale, getOgAlternateLocales } from '@/lib/metadata';
import CGV from '@/views/CGV';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("cgvTitle"),
    description: t("cgvDescription"),
    alternates: getAlternates(locale, "/cgv"),
    openGraph: { locale: getOgLocale(locale), alternateLocale: getOgAlternateLocales(locale) },
  };
}

export default function RouteWrapper() {
  return <CGV />;
}
