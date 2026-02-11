"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { galleryImages } from "@/data/galleryImages";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";

const previewImages = galleryImages.slice(0, 10);
// Duplicate for seamless infinite loop
const loopImages = [...previewImages, ...previewImages];

const GalleryPreview = () => {
  const { variant } = useThemeVariant();

  const isDark = variant === "nuit" || variant === "luxe";

  const sectionBg = variant === "nuit"
    ? "bg-[#0d1d35]"
    : variant === "luxe"
    ? "bg-neutral-900"
    : variant === "editorial"
    ? "bg-amber-50/50"
    : "bg-secondary/30";

  const titleClass = variant === "nuit"
    ? "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100"
    : variant === "luxe"
    ? "text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight"
    : variant === "editorial"
    ? "font-heading text-3xl md:text-4xl lg:text-5xl text-amber-900 italic"
    : "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary";

  const subtitleClass = variant === "nuit"
    ? "text-blue-200/70 text-lg"
    : variant === "luxe"
    ? "text-white/50 text-lg"
    : variant === "editorial"
    ? "text-amber-700/70 text-lg"
    : "text-muted-foreground text-lg";

  const fadeBg = isDark
    ? variant === "nuit"
      ? "from-[#0d1d35]"
      : "from-neutral-900"
    : variant === "editorial"
    ? "from-amber-50/50"
    : "from-secondary/30";

  const ctaClass = variant === "nuit"
    ? "btn-gold"
    : variant === "luxe"
    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500"
    : variant === "editorial"
    ? "bg-amber-700 text-white hover:bg-amber-800"
    : "btn-gold";

  return (
    <section className={`section-padding ${sectionBg}`} id="galerie">
      <div className="container-custom mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className={`${titleClass} mb-4`}>
            Galerie Photos
          </h2>
          <p className={subtitleClass}>
            Revivez les plus beaux moments de nos croisières
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
              className="flex-shrink-0 w-64 md:w-72 h-48 md:h-56 rounded-xl overflow-hidden cursor-pointer group/img"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA button */}
      <div className="container-custom mt-8 text-center">
        <Button asChild className={ctaClass}>
          <Link href="/galerie">
            Voir la galerie
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default GalleryPreview;
