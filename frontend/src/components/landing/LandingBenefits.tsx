"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  Ship, GlassWater, Camera, Sparkles, Users, Heart,
  Music, Utensils, Sun, Briefcase, PartyPopper, Star,
} from "lucide-react";
import type { BenefitItem } from "@/data/landings/types";

const iconMap: Record<string, React.ElementType> = {
  ship: Ship,
  champagne: GlassWater,
  camera: Camera,
  sparkles: Sparkles,
  users: Users,
  heart: Heart,
  music: Music,
  utensils: Utensils,
  sun: Sun,
  briefcase: Briefcase,
  party: PartyPopper,
  star: Star,
};

interface LandingBenefitsProps {
  title: string;
  items: BenefitItem[];
}

const LandingBenefits = ({ title, items }: LandingBenefitsProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <m.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="font-heading text-3xl md:text-4xl font-semibold text-primary text-center mb-12"
        >
          {title}
        </m.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : i * 0.1, duration: prefersReducedMotion ? 0 : undefined }}
                className="text-center p-6 rounded-xl bg-background shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingBenefits;
