"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroCinemaSlideshow from "@/components/HeroCinemaSlideshow";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import Link from "next/link";
import { useTranslations } from "next-intl";

const HeroVariants = () => {
  const { isDark } = useThemeVariant();
  const t = useTranslations("hero");

  const config = isDark
    ? {
        titleClass: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white",
        subtitleClass: "text-lg md:text-xl text-blue-200/90",
        overlayClass: "bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/50 to-[#0a1628]/80",
      }
    : {
        titleClass: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight",
        subtitleClass: "text-lg md:text-xl text-primary-foreground/90",
        overlayClass: "bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70",
      };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroCinemaSlideshow />
      <div className={`absolute inset-0 z-[1] ${config.overlayClass}`} />

      {/* Content */}
      <div className="relative z-10 container-custom text-primary-foreground text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <span>{t("badge")}</span>
          </motion.div>

          {/* Main Title */}
          <h1 className={`${config.titleClass} mb-6`}>
            {t("title1")}
            <br />
            <span className="italic text-accent">{t("title2")}</span>
          </h1>

          {/* Subtitle */}
          <p className={`${config.subtitleClass} max-w-2xl mx-auto mb-8`}>
            {t("subtitle")}
          </p>

          {/* Price Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-6 py-3 mb-10 ${
              isDark
                ? "bg-white/10 border border-white/30"
                : "bg-background/10 border border-primary-foreground/20"
            }`}
          >
            <span className={isDark ? "text-white/90" : "text-primary-foreground/80"}>{t("priceFrom")}</span>
            <span className="text-2xl font-bold text-accent">
              {t("price")}
            </span>
            <span className={isDark ? "text-white/90" : "text-primary-foreground/80"}>· {t("priceDetail")}</span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button className="btn-gold text-lg px-10 py-6 h-auto" asChild>
              <Link href="/reservation">{t("cta")}</Link>
            </Button>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Indicator - outside content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroVariants;
