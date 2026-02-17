"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Ship } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations } from "next-intl";
import { landmarks, itineraryStepCount } from "@/data/landmarks";
import OccasionsGrid from "@/components/OccasionsGrid";

import fond2 from "@/assets/map/fond2.webp";
import metroIconImport from "@/assets/map/metro.png";

const Croisiere = () => {
  const [activeLandmark, setActiveLandmark] = useState<string | null>(null);
  const { isDark } = useThemeVariant();
  const t = useTranslations("croisiere");

  const itinerarySteps = Array.from({ length: itineraryStepCount }, (_, i) => ({
    time: t(`itinerary${i + 1}Time`),
    label: t(`itinerary${i + 1}Label`),
    detail: t(`itinerary${i + 1}Detail`),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className={`py-6 pt-24 ${isDark ? "bg-nuit-900 text-blue-100" : "bg-primary text-primary-foreground"}`}>
        <div className="container-custom">
          <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? "text-blue-200/70 hover:text-blue-100" : "text-primary-foreground/70 hover:text-primary-foreground"} transition-colors mb-4`}>
            <ArrowLeft className="w-4 h-4" />
            {t("backToHome")}
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">
            {t("pageTitle")}
          </h1>
          <p className={`text-lg mt-2 max-w-2xl ${isDark ? "text-blue-200/70" : "text-primary-foreground/70"}`}>
            {t("pageSubtitle")}
          </p>
        </div>
      </div>

      {/* Interactive Map - Full Width */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-8 px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-2">
            {t("mapTitle")}
          </h2>
          <p className="text-muted-foreground">{t("mapHint")}</p>
        </div>

        {/* Map Container - Full Width */}
        <div className="relative w-full overflow-hidden">
          <Image
            src={fond2}
            alt={t("mapAlt")}
            className="w-full h-auto block"
            sizes="100vw"
          />

          {/* Landmark hotspots */}
          {landmarks.map((landmark, index) => {
            const name = t(`landmark_${landmark.id}_name`);
            const description = t(`landmark_${landmark.id}_description`);
            return (
              <m.div
                key={landmark.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 200 }}
                className="absolute cursor-pointer group"
                style={{ top: landmark.top, left: landmark.left }}
                onClick={() => setActiveLandmark(activeLandmark === landmark.id ? null : landmark.id)}
              >
                <m.img
                  src={landmark.icon}
                  alt={name}
                  style={{ width: landmark.width }}
                  className="drop-shadow-lg transition-transform duration-300 hover:scale-110"
                  whileHover={{ y: -5 }}
                />

                <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 whitespace-nowrap">
                  <span className="text-[8px] md:text-xs font-bold text-primary bg-white/90 px-1.5 py-0.5 rounded shadow-sm">
                    {name}
                  </span>
                </div>

                <AnimatePresence>
                  {activeLandmark === landmark.id && (
                    <m.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className={`absolute z-50 w-56 rounded-xl shadow-2xl border p-4 ${
                        isDark ? "bg-nuit-800 border-blue-400/20 text-blue-100" : "bg-white border-border"
                      } ${
                        landmark.tooltipSide === "top" ? "bottom-full mb-8 left-1/2 -translate-x-1/2" :
                        landmark.tooltipSide === "bottom" ? "top-full mt-8 left-1/2 -translate-x-1/2" :
                        landmark.tooltipSide === "left" ? "right-full mr-4 top-1/2 -translate-y-1/2" :
                        "left-full ml-4 top-1/2 -translate-y-1/2"
                      }`}
                    >
                      <h3 className={`font-heading text-sm font-semibold mb-1 ${isDark ? "text-accent" : "text-primary"}`}>{name}</h3>
                      <p className={`text-xs leading-relaxed ${isDark ? "text-blue-200/70" : "text-muted-foreground"}`}>{description}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}

          {/* Metro Bastille */}
          <m.a
            href="https://www.google.com/maps/@48.8515009,2.3687565,3a,75y,349.11h,79.12t/data=!3m6!1e1!3m4!1s7r6mIOhANE3SwkssTly2vw!2e0!7i16384!8i8192?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
            className="absolute cursor-pointer group"
            style={{ top: "52%", left: "92%" }}
            title={t("metroBastilleTitle")}
          >
            <div className="relative">
              <img src={metroIconImport.src} alt={t("metroBastilleAlt")} className="w-6 h-6 md:w-8 md:h-8 drop-shadow-lg" />
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 whitespace-nowrap">
                <span className="text-[8px] md:text-xs font-bold text-primary bg-white/90 px-1.5 py-0.5 rounded shadow-sm">
                  Bastille
                </span>
              </div>
            </div>
          </m.a>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className={`py-12 md:py-16 ${isDark ? "bg-nuit-800" : "bg-secondary/30"}`}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-2">
              {t("timelineTitle")}
            </h2>
            <p className="text-muted-foreground">{t("timelineSubtitle")}</p>
          </div>

          <div className="max-w-2xl mx-auto">
            {itinerarySteps.map((step, index) => (
              <m.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    index === 0 || index === itinerarySteps.length - 1
                      ? "bg-accent text-white"
                      : isDark ? "bg-white/10 text-accent" : "bg-primary/10 text-primary"
                  }`}>
                    {index === 0 || index === itinerarySteps.length - 1 ? (
                      <Ship className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>
                  {index < itinerarySteps.length - 1 && (
                    <div className={`w-0.5 h-16 ${isDark ? "bg-blue-400/20" : "bg-border"}`} />
                  )}
                </div>

                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-accent flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.time}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-primary">{step.label}</h3>
                  <p className="text-muted-foreground text-sm">{step.detail}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions Grid */}
      <OccasionsGrid />

      {/* CTA */}
      <section className={`py-16 text-center ${isDark ? "bg-nuit-900 text-blue-100" : "bg-primary text-primary-foreground"}`}>
        <div className="container-custom">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
            {t("ctaTitle")}
          </h2>
          <p className={`mb-8 max-w-xl mx-auto ${isDark ? "text-blue-200/70" : "text-primary-foreground/70"}`}>
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-gold text-white" size="lg" asChild>
              <Link href="/reservation">{t("ctaReserve")}</Link>
            </Button>
            <Button variant="outline" size="lg" className={`bg-transparent ${isDark ? "border-blue-300/30 text-blue-100 hover:bg-white/10" : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"}`} asChild>
              <Link href="/#tarifs">{t("ctaTarifs")}</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Croisiere;
