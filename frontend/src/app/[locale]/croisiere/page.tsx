import React from 'react';
import { getTranslations } from 'next-intl/server';
import Page from '@/views/Croisiere';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("croisiereTitle"), description: t("croisiereDescription") };
}

export default function RouteWrapper() {
  return <Page />;
}
