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

const touristTripJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  name: "Croisière privée sur la Seine à Paris",
  description:
    "Découvrez Paris au fil de l'eau à bord du Sénang, bateau privatisé jusqu'à 12 personnes. Départ Port de l'Arsenal (Bastille), 2h de navigation.",
  touristType: "Couples, Families, Groups",
  itinerary: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "TouristAttraction",
          name: "Port de l'Arsenal",
          description: "Point de départ à Bastille",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "TouristAttraction",
          name: "Île Saint-Louis",
          description: "Navigation autour de l'île historique",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "TouristAttraction",
          name: "Notre-Dame de Paris",
          description: "Vue sur la cathédrale emblématique",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "TouristAttraction",
          name: "Musée d'Orsay",
          description: "Passage devant le musée impressionniste",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "TouristAttraction",
          name: "Tour Eiffel",
          description: "Vue panoramique sur le monument iconique",
        },
      },
    ],
  },
  offers: [
    {
      "@type": "Offer",
      name: "Formule Classic",
      priceCurrency: "EUR",
      price: "480",
      url: "https://bateau-a-paris.fr/fr/reservation",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Formule Festive",
      priceCurrency: "EUR",
      price: "540",
      url: "https://bateau-a-paris.fr/fr/reservation",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Formule Prestige",
      priceCurrency: "EUR",
      price: "660",
      url: "https://bateau-a-paris.fr/fr/reservation",
      availability: "https://schema.org/InStock",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: ratingValue,
    reviewCount: reviewCount,
  },
};

export default async function RouteWrapper({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const tBreadcrumb = await getTranslations({ locale, namespace: "breadcrumb" });

  const breadcrumbItems = [{ name: t("croisiere"), url: `/${locale}/croisiere` }];

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
