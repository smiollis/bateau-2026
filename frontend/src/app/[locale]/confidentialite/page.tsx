import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale, getOgAlternateLocales } from '@/lib/metadata';
import Confidentialite from '@/views/Confidentialite';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("confidentialiteTitle"),
    description: t("confidentialiteDescription"),
    alternates: getAlternates(locale, "/confidentialite"),
    openGraph: { locale: getOgLocale(locale), alternateLocale: getOgAlternateLocales(locale) },
  };
}

export default function RouteWrapper() {
  return <Confidentialite />;
}
