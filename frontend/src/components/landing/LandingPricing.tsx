"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface LandingPricingProps {
  title: string;
  occasion?: string;
}

const formulas = [
  {
    name: "Formule Simple",
    price: "360",
    unit: "1-6 pers.",
    features: [
      "Bateau privatise 2h",
      "Parcours Tour Eiffel — Notre-Dame",
      "Amenez vos boissons et nourriture",
      "Capitaine dedie",
    ],
  },
  {
    name: "Formule Festive",
    price: "420",
    unit: "1-6 pers.",
    highlight: true,
    features: [
      "Tout de la Formule Simple",
      "Champagne offert (1 coupe/pers.)",
      "Enceinte Bluetooth a disposition",
      "Ambiance festive garantie",
    ],
  },
  {
    name: "Formule Tout Inclus",
    price: "Sur devis",
    unit: "",
    features: [
      "Tout de la Formule Festive",
      "Traiteur a bord (planches, buffet)",
      "Decoration personnalisee",
      "Photographe en option",
    ],
  },
];

const LandingPricing = ({ title, occasion }: LandingPricingProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="font-heading text-3xl md:text-4xl font-semibold text-primary text-center mb-4"
        >
          {title}
        </motion.h2>
        <p className="text-center text-muted-foreground mb-10">
          +100 &euro;/pers. supplementaire au-dela de 6 (max 12)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {formulas.map((formula, i) => (
            <motion.div
              key={formula.name}
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
                    {formula.price !== "Sur devis" ? "\u20ac" : ""} {formula.unit}
                  </span>
                )}
              </div>
              <ul className="space-y-2 mb-6">
                {formula.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className={formula.highlight ? "btn-gold text-white w-full" : "w-full"}>
                <Link href={`/reservation${occasion ? `?occasion=${occasion}` : ""}`}>
                  Reserver
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPricing;
