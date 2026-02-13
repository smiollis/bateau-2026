"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Users, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations } from "next-intl";

const variantStyles: Record<ThemeVariant, {
  section: string;
  title: string;
  subtitle: string;
  card: string;
  icon: string;
  cardTitle: string;
  cardText: string;
}> = {
  classic: {
    section: "bg-background",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary",
    subtitle: "text-foreground/70 text-lg",
    card: "bg-card rounded-xl p-6 lg:p-8 border border-border card-hover text-center",
    icon: "bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white",
    cardTitle: "font-heading text-xl font-semibold text-primary",
    cardText: "text-foreground/75",
  },
  nuit: {
    section: "bg-[#0d1d35]",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
    subtitle: "text-blue-200/70 text-lg",
    card: "bg-white/5 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-blue-400/10 hover:border-accent/30 transition-colors text-center",
    icon: "bg-accent/20 text-accent",
    cardTitle: "font-heading text-xl font-semibold text-blue-100",
    cardText: "text-blue-200/60",
  },
};

const FeaturesVariants = () => {
  const { variant } = useThemeVariant();
  const t = useTranslations("features");
  const styles = variantStyles[variant];

  const features = [
    { icon: Clock, title: t("feature1Title"), description: t("feature1Desc") },
    { icon: MapPin, title: t("feature2Title"), description: t("feature2Desc") },
    { icon: Users, title: t("feature3Title"), description: t("feature3Desc") },
    { icon: Sparkles, title: t("feature4Title"), description: t("feature4Desc") },
  ];

  // Classic & Nuit: Standard grid
  return (
    <section className={`section-padding ${styles.section}`} id="croisiere">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`${styles.title} mb-4`}>{t("title")}</h2>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className={`${styles.card} h-full`}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${styles.icon} mb-5 transition-colors duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className={`${styles.cardTitle} mb-3`}>{feature.title}</h3>
                  <p className={`${styles.cardText} leading-relaxed`}>{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button className="btn-gold text-white" asChild>
            <Link href="/croisiere">
              {t("cta")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesVariants;
