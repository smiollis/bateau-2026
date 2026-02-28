import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale, getOgAlternateLocales } from '@/lib/metadata';
import { generateBreadcrumbJsonLd } from '@/lib/seo/jsonld';
import LandingBreadcrumb from '@/components/landing/LandingBreadcrumb';
import reviewsData from "@/data/reviews.json";
import Page from '@/views/Croisiere';

const reviewRatings = reviewsData.reviews.map((r) => r.rating);
const ratingValue = (
  reviewRatings.reduce((sum, r) => sum + r, 0) / reviewRatings.length
).toFixed(1);
const reviewCount = String(reviewsData.totalReviews);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("croisiereTitle"),
    description: t("croisiereDescription"),
    alternates: getAlternates(locale, "/croisiere"),
    openGraph: { locale: getOgLocale(locale), alternateLocale: getOgAlternateLocales(locale) },
  };
}

export default async function RouteWrapper({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const tC = await getTranslations({ locale, namespace: "croisiere" });
  const tBreadcrumb = await getTranslations({ locale, namespace: "breadcrumb" });

  const breadcrumbItems = [{ name: t("croisiere"), url: `/${locale}/croisiere` }];

  const touristTripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tC("schemaName"),
    description: tC("schemaDescription"),
    touristType: "Couples, Families, Groups",
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 1, item: { "@type": "TouristAttraction", name: tC("landmark_liberte_name"), description: tC("landmark_liberte_description") } },
        { "@type": "ListItem", position: 2, item: { "@type": "TouristAttraction", name: tC("landmark_tour-eiffel_name"), description: tC("landmark_tour-eiffel_description") } },
        { "@type": "ListItem", position: 3, item: { "@type": "TouristAttraction", name: tC("landmark_notre-dame_name"), description: tC("landmark_notre-dame_description") } },
        { "@type": "ListItem", position: 4, item: { "@type": "TouristAttraction", name: tC("landmark_orsay_name"), description: tC("landmark_orsay_description") } },
        { "@type": "ListItem", position: 5, item: { "@type": "TouristAttraction", name: tC("landmark_louvre_name"), description: tC("landmark_louvre_description") } },
      ],
    },
    offers: [
      { "@type": "Offer", name: "Formule Classic", priceCurrency: "EUR", price: "480", url: `https://bateau-a-paris.fr/${locale}/reservation`, availability: "https://schema.org/InStock" },
      { "@type": "Offer", name: "Formule Festive", priceCurrency: "EUR", price: "540", url: `https://bateau-a-paris.fr/${locale}/reservation`, availability: "https://schema.org/InStock" },
      { "@type": "Offer", name: "Formule Prestige", priceCurrency: "EUR", price: "660", url: `https://bateau-a-paris.fr/${locale}/reservation`, availability: "https://schema.org/InStock" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd([{ name: tBreadcrumb("home"), url: `/${locale}` }, ...breadcrumbItems])) }}
      />
      <LandingBreadcrumb items={[{ name: t("croisiere") }]} />
      <Page />
    </>
  );
}
