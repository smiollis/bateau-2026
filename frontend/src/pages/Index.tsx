import HeaderVariants from "@/components/HeaderVariants";
import HeroVariants from "@/components/HeroVariants";
import FeaturesVariants from "@/components/FeaturesVariants";
import OffersVariants from "@/components/OffersVariants";
import BoatVariants from "@/components/BoatVariants";
import CaptainSection from "@/components/CaptainSection";
import TestimonialsVariants from "@/components/TestimonialsVariants";
import CTAVariants from "@/components/CTAVariants";
import ContactForm from "@/components/ContactForm";
import FooterVariants from "@/components/FooterVariants";
import GalleryPreview from "@/components/GalleryPreview";
import ThemeSwitcher from "@/components/ThemeSwitcher";

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
      <ThemeSwitcher />
    </div>
  );
};

export default Index;
