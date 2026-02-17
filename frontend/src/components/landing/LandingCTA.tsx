"use client";

import { m, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface LandingCTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

const LandingCTA = ({
  title,
  subtitle,
  ctaText,
  ctaHref = "/reservation",
}: LandingCTAProps) => {
  const t = useTranslations("landing");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-custom text-center">
        <m.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="font-heading text-3xl md:text-4xl font-semibold mb-4"
        >
          {title ?? t("ctaTitle")}
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.1, duration: prefersReducedMotion ? 0 : undefined }}
          className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
        >
          {subtitle ?? t("ctaSubtitle")}
        </m.p>
        <m.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : undefined }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="btn-gold text-white text-lg px-8">
            <Link href={ctaHref}>{ctaText ?? t("ctaButton")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white/10">
            <a href="tel:+33670342543">
              <Phone className="w-4 h-4 mr-2" />
              06 70 34 25 43
            </a>
          </Button>
        </m.div>
      </div>
    </section>
  );
};

export default LandingCTA;
