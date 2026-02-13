import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale } from '@/lib/metadata';
import Page from '@/views/Galerie';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("galerieTitle"),
    description: t("galerieDescription"),
    alternates: getAlternates(locale, "/galerie"),
    openGraph: { locale: getOgLocale(locale) },
  };
}

export default function RouteWrapper() {
  return <Page />;
}
