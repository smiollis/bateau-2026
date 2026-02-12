import React from 'react';
import { getTranslations } from 'next-intl/server';
import Page from '@/views/Reservation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("reservationTitle"), description: t("reservationDescription") };
}

export const dynamic = 'force-dynamic';

export default function RouteWrapper() {
  return <Page />;
}
