"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { galleryImages } from "@/data/galleryImages";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations } from "next-intl";

const previewImages = galleryImages.slice(0, 10);
// Duplicate for seamless infinite loop
const loopImages = [...previewImages, ...previewImages];

const GalleryPreview = () => {
  const { isDark } = useThemeVariant();
  const t = useTranslations("gallery");
  const prefersReducedMotion = useReducedMotion();

  const sectionBg = isDark ? "bg-[#0d1d35]" : "bg-secondary/30";
  const titleClass = isDark
    ? "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100"
    : "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary";
  const subtitleClass = isDark
    ? "text-blue-200/70 text-lg"
    : "text-muted-foreground text-lg";
  const fadeBg = isDark ? "from-[#0d1d35]" : "from-secondary/30";

  return (
    <section className={`section-padding ${sectionBg}`} id="galerie">
      <div className="container-custom mb-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="text-center"
        >
          <h2 className={`${titleClass} mb-4`}>
            {t("title")}
          </h2>
          <p className={subtitleClass}>
            {t("subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Infinite auto-scroll slider */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r ${fadeBg} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l ${fadeBg} to-transparent z-10 pointer-events-none`} />

        <div className="flex gap-4 animate-gallery-scroll hover:[animation-play-state:paused]">
          {loopImages.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 md:w-72 h-48 md:h-56 rounded-xl overflow-hidden cursor-pointer group/img relative"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 256px, 288px"
                className="object-cover transition-transform duration-500 group-hover/img:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA button */}
      <div className="container-custom mt-8 text-center">
        <Button asChild className="btn-gold text-white">
          <Link href="/galerie">
            {t("cta")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default GalleryPreview;
