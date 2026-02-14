"use client";

import dynamic from "next/dynamic";
import HeroVariants from "@/components/HeroVariants";

const FeaturesVariants = dynamic(() => import("@/components/FeaturesVariants"));
const BoatVariants = dynamic(() => import("@/components/BoatVariants"));
const CaptainSection = dynamic(() => import("@/components/CaptainSection"));
const GalleryPreview = dynamic(() => import("@/components/GalleryPreview"));
const OffersVariants = dynamic(() => import("@/components/OffersVariants"));
const OccasionsGrid = dynamic(() => import("@/components/OccasionsGrid"));
const TestimonialsVariants = dynamic(() => import("@/components/TestimonialsVariants"));
const CTAVariants = dynamic(() => import("@/components/CTAVariants"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));

const Index = () => {
  return (
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
  );
};

export default Index;
