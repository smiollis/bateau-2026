import React from 'react';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { getAlternates, getOgLocale } from '@/lib/metadata';
import { locales } from '@/i18n/routing';
import HeroVariants from '@/components/HeroVariants';

const FeaturesVariants = dynamic(() => import("@/components/FeaturesVariants"));
const BoatVariants = dynamic(() => import("@/components/BoatVariants"));
const CaptainSection = dynamic(() => import("@/components/CaptainSection"));
const GalleryPreview = dynamic(() => import("@/components/GalleryPreview"));
const OffersVariants = dynamic(() => import("@/components/OffersVariants"));
const OccasionsGrid = dynamic(() => import("@/components/OccasionsGrid"));
const TestimonialsVariants = dynamic(() => import("@/components/TestimonialsVariants"));
const CTAVariants = dynamic(() => import("@/components/CTAVariants"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: getAlternates(locale, ""),
    openGraph: { locale: getOgLocale(locale) },
  };
}

export default function Home() {
  return (
    <>
      {/* next/image priority in HeroCinemaSlideshow auto-generates the correct preload */}
      <div className="min-h-screen">
        <HeroVariants />
        <FeaturesVariants />
        <BoatVariants />
        <CaptainSection />
        <GalleryPreview />
        <OffersVariants />
        <OccasionsGrid />
        <TestimonialsVariants />
        <CTAVariants />
        <ContactForm />
      </div>
    </>
  );
}
