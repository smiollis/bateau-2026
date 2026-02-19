import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale, getOgAlternateLocales } from '@/lib/metadata';
import { generateBreadcrumbJsonLd } from '@/lib/seo/jsonld';
import LandingBreadcrumb from '@/components/landing/LandingBreadcrumb';
import Page from '@/views/Galerie';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("galerieTitle"),
    description: t("galerieDescription"),
    alternates: getAlternates(locale, "/galerie"),
    openGraph: { locale: getOgLocale(locale), alternateLocale: getOgAlternateLocales(locale) },
  };
}

export default async function RouteWrapper({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const tBreadcrumb = await getTranslations({ locale, namespace: "breadcrumb" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd([{ name: tBreadcrumb("home"), url: `/${locale}` }, { name: t("galerie"), url: `/${locale}/galerie` }])) }}
      />
      <LandingBreadcrumb items={[{ name: t("galerie") }]} />
      <Page />
    </>
  );
}
