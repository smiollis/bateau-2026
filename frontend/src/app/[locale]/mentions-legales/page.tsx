import React from 'react';
import { getTranslations } from 'next-intl/server';
import MentionsLegales from '@/views/MentionsLegales';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("mentionsTitle"), description: t("mentionsDescription") };
}

export default function RouteWrapper() {
  return <MentionsLegales />;
}
