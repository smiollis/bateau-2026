import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale } from '@/lib/metadata';
import Page from '@/views/Reservation';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL;

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

export default function RouteWrapper() {
  return (
    <>
      {/* Prefetch iframe HTML so browser starts loading before component mounts */}
      {WP_URL && <link rel="prefetch" href={`${WP_URL}/reservation-embed/`} />}
      <Page />
    </>
  );
}
