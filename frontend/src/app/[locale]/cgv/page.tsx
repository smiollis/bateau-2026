import React from 'react';
import { getTranslations } from 'next-intl/server';
import CGV from '@/views/CGV';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("cgvTitle"), description: t("cgvDescription") };
}

export default function RouteWrapper() {
  return <CGV />;
}
