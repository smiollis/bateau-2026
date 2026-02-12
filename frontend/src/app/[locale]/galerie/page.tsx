import React from 'react';
import { getTranslations } from 'next-intl/server';
import Page from '@/views/Galerie';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("galerieTitle"), description: t("galerieDescription") };
}

export default function RouteWrapper() {
  return <Page />;
}
