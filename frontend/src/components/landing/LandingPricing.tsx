"use client";

import { m, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface LandingPricingProps {
  title: string;
  occasion?: string;
}

const LandingPricing = ({ title, occasion }: LandingPricingProps) => {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("landingPricing");

  const formulas = [
    {
      name: t("formulaSimpleName"),
      price: t("formulaSimplePrice"),
      unit: t("formulaSimpleUnit"),
      features: [
        t("formulaSimpleFeature1"),
        t("formulaSimpleFeature2"),
        t("formulaSimpleFeature3"),
        t("formulaSimpleFeature4"),
      ],
    },
    {
      name: t("formulaFestiveName"),
      price: t("formulaFestivePrice"),
      unit: t("formulaFestiveUnit"),
      highlight: true,
      features: [
        t("formulaFestiveFeature1"),
        t("formulaFestiveFeature2"),
        t("formulaFestiveFeature3"),
        t("formulaFestiveFeature4"),
      ],
    },
    {
      name: t("formulaAllInclusiveName"),
      price: t("formulaAllInclusivePrice"),
      unit: t("formulaAllInclusiveUnit"),
      features: [
        t("formulaAllInclusiveFeature1"),
        t("formulaAllInclusiveFeature2"),
        t("formulaAllInclusiveFeature3"),
        t("formulaAllInclusiveFeature4"),
      ],
    },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <m.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="font-heading text-3xl md:text-4xl font-semibold text-primary text-center mb-4"
        >
          {title}
        </m.h2>
        <p className="text-center text-muted-foreground mb-10">
          {t("extraPersonNote")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {formulas.map((formula, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : i * 0.1, duration: prefersReducedMotion ? 0 : undefined }}
              className={`p-6 rounded-xl border ${
                formula.highlight
                  ? "border-gold bg-gold/5 ring-2 ring-gold/20"
                  : "bg-background"
              }`}
            >
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                {formula.name}
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary">
                  {formula.price}
                </span>
                {formula.unit && (
                  <span className="text-muted-foreground ml-1">
                    {formula.price !== t("onQuote") ? "\u20ac" : ""} {formula.unit}
                  </span>
                )}
              </div>
              <ul className="space-y-2 mb-6">
                {formula.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className={formula.highlight ? "btn-gold text-white w-full" : "w-full"}>
                <Link href={`/reservation${occasion ? `?occasion=${occasion}` : ""}`}>
                  {t("cta")}
                </Link>
              </Button>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPricing;
