import React from 'react';
import { getTranslations } from 'next-intl/server';
import FAQ from '@/views/FAQ';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("faqTitle"), description: t("faqDescription") };
}

export default function RouteWrapper() {
  return <FAQ />;
}
