"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Heart,
  PartyPopper,
  Users,
  Briefcase,
  Camera,
  Sunset,
  Baby,
  Gift,
  CalendarHeart,
  Beer,
  GlassWater,
  Crown,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

const variantStyles: Record<
  ThemeVariant,
  {
    section: string;
    title: string;
    subtitle: string;
    card: string;
    icon: string;
    cardTitle: string;
  }
> = {
  classic: {
    section: "bg-background",
    title:
      "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary",
    subtitle: "text-foreground/70 text-lg",
    card: "group flex flex-col items-center gap-3 rounded-xl bg-card border border-border p-5 lg:p-6 card-hover text-center",
    icon: "bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white",
    cardTitle: "font-heading text-sm lg:text-base font-semibold text-primary",
  },
  nuit: {
    section: "bg-[#0d1d35]",
    title:
      "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
    subtitle: "text-blue-200/70 text-lg",
    card: "group flex flex-col items-center gap-3 rounded-xl bg-white/5 backdrop-blur-sm border border-blue-400/10 hover:border-accent/30 p-5 lg:p-6 transition-colors text-center",
    icon: "bg-accent/20 text-accent",
    cardTitle: "font-heading text-sm lg:text-base font-semibold text-blue-100",
  },
};

interface OccasionItem {
  slug: string;
  icon: LucideIcon;
  labelKey: string;
}

const occasions: OccasionItem[] = [
  { slug: "evjf-seine", icon: Crown, labelKey: "evjf" },
  { slug: "evg-seine", icon: PartyPopper, labelKey: "evg" },
  { slug: "croisiere-romantique-seine", icon: Heart, labelKey: "romantique" },
  { slug: "demande-en-mariage-seine", icon: GlassWater, labelKey: "mariage" },
  { slug: "anniversaire-seine", icon: Gift, labelKey: "anniversaire" },
  { slug: "soiree-entre-amis-seine", icon: Users, labelKey: "amis" },
  { slug: "team-building-seine", icon: Briefcase, labelKey: "teamBuilding" },
  { slug: "croisiere-famille-seine", icon: Baby, labelKey: "famille" },
  { slug: "shooting-photo-seine", icon: Camera, labelKey: "shooting" },
  { slug: "coucher-soleil-seine", icon: Sunset, labelKey: "coucherSoleil" },
  { slug: "apero-bateau-seine", icon: Beer, labelKey: "apero" },
  {
    slug: "saint-valentin-seine",
    icon: CalendarHeart,
    labelKey: "saintValentin",
  },
];

const OccasionsGrid = () => {
  const { variant } = useThemeVariant();
  const t = useTranslations("occasions");
  const styles = variantStyles[variant];
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="mb-12 text-center"
        >
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={`mt-4 max-w-2xl mx-auto ${styles.subtitle}`}>
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {occasions.map((occasion, i) => (
            <motion.div
              key={occasion.slug}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : i * 0.05, duration: prefersReducedMotion ? 0 : undefined }}
            >
              <Link href={`/${occasion.slug}`} className={styles.card}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${styles.icon}`}
                >
                  <occasion.icon className="w-5 h-5" />
                </div>
                <span className={styles.cardTitle}>
                  {t(occasion.labelKey)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionsGrid;
