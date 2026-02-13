import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale } from '@/lib/metadata';
import Page from '@/views/Reservation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("reservationTitle"),
    description: t("reservationDescription"),
    alternates: getAlternates(locale, "/reservation"),
    openGraph: { locale: getOgLocale(locale) },
  };
}

export const dynamic = 'force-dynamic';

export default function RouteWrapper() {
  return <Page />;
}
