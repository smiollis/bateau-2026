"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ruler, Users, Sun, Anchor, Shield, ArrowRight, Map } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import BoatImageSlideshow from "@/components/BoatImageSlideshow";
import { useTranslations } from "next-intl";

const BoatVariants = () => {
  const { isDark } = useThemeVariant();
  const t = useTranslations("boat");

  const highlights = [
    { icon: Ruler, title: t("highlight1Title"), description: t("highlight1Desc") },
    { icon: Users, title: t("highlight2Title"), description: t("highlight2Desc") },
    { icon: Sun, title: t("highlight3Title"), description: t("highlight3Desc") },
    { icon: Anchor, title: t("highlight4Title"), description: t("highlight4Desc") },
    { icon: Shield, title: t("highlight5Title"), description: t("highlight5Desc") },
  ];

  const styles = isDark
    ? {
        section: "bg-[#0a1628]",
        title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
        subtitle: "text-accent font-heading text-lg",
        text: "text-blue-200/70 text-lg leading-relaxed",
        highlight: "flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-blue-400/10",
        highlightIcon: "w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0",
        highlightTitle: "font-semibold text-blue-100",
        highlightText: "text-blue-200/60 text-sm",
        iconColor: "text-accent",
        cta: "btn-gold text-white",
        badge: "bg-accent text-white",
        slideOverlay: "bg-gradient-to-t from-[#0a1628]/50 to-transparent",
      }
    : {
        section: "bg-background",
        title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary",
        subtitle: "text-accent font-heading text-lg",
        text: "text-foreground/80 text-lg leading-relaxed",
        highlight: "flex items-start gap-4",
        highlightIcon: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0",
        highlightTitle: "font-semibold text-primary",
        highlightText: "text-foreground/70 text-sm",
        iconColor: "text-primary",
        cta: "btn-gold text-white",
        badge: "bg-accent text-white",
        slideOverlay: "bg-gradient-to-t from-primary/30 to-transparent",
      };

  return (
    <section className={`section-padding ${styles.section}`} id="bateau">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <BoatImageSlideshow
              className="w-full h-[400px] lg:h-[500px]"
              rounded="rounded-2xl"
              overlay={styles.slideOverlay}
            />
            <div className={`absolute -bottom-4 -right-4 md:bottom-8 md:right-8 ${styles.badge} px-6 py-3 rounded-xl shadow-lg z-10`}>
              <span className="font-heading text-lg font-semibold">{t("badge")}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={`${styles.title} mb-6`}>{t("title")}</h2>
            <p className={`${styles.text} mb-8`}>
              {t("description")}
            </p>

            <div className="space-y-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={styles.highlight}
                >
                  <div className={styles.highlightIcon}>
                    <item.icon className={`w-6 h-6 ${styles.iconColor}`} />
                  </div>
                  <div>
                    <h3 className={`${styles.highlightTitle} mb-1`}>{item.title}</h3>
                    <p className={styles.highlightText}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="/croisiere"><Map className="w-4 h-4 mr-2" /> {t("ctaDetail")}</Link>
              </Button>
              <Button className={styles.cta} asChild>
                <Link href="/reservation">
                  {t("ctaReserve")}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BoatVariants;
