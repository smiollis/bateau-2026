import React from 'react';
import { getTranslations } from 'next-intl/server';
import Confidentialite from '@/views/Confidentialite';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("confidentialiteTitle"), description: t("confidentialiteDescription") };
}

export default function RouteWrapper() {
  return <Confidentialite />;
}
