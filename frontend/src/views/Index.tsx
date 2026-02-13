"use client";

import dynamic from "next/dynamic";
import HeaderVariants from "@/components/HeaderVariants";
import HeroVariants from "@/components/HeroVariants";

const FeaturesVariants = dynamic(() => import("@/components/FeaturesVariants"));
const BoatVariants = dynamic(() => import("@/components/BoatVariants"));
const CaptainSection = dynamic(() => import("@/components/CaptainSection"));
const GalleryPreview = dynamic(() => import("@/components/GalleryPreview"));
const OffersVariants = dynamic(() => import("@/components/OffersVariants"));
const TestimonialsVariants = dynamic(() => import("@/components/TestimonialsVariants"));
const CTAVariants = dynamic(() => import("@/components/CTAVariants"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));
const FooterVariants = dynamic(() => import("@/components/FooterVariants"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeaderVariants />
      <main>
        <HeroVariants />
        <FeaturesVariants />
        <BoatVariants />
        <CaptainSection />
        <GalleryPreview />
        <OffersVariants />
        <TestimonialsVariants />
        <CTAVariants />
        <ContactForm />
      </main>
      <FooterVariants />
    </div>
  );
};

export default Index;
