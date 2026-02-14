"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import capitaineMichel from "@/assets/capitaine-michel.jpg";
import { useTranslations } from "next-intl";

const CaptainSection = () => {
  const { isDark } = useThemeVariant();
  const t = useTranslations("captain");
  const prefersReducedMotion = useReducedMotion();

  const styles = isDark
    ? {
        section: "bg-[#0d1d35]",
        title: "font-heading text-2xl md:text-3xl font-semibold text-blue-100",
        name: "font-heading text-lg font-semibold text-blue-100",
        role: "text-accent text-sm",
        imageBorder: "ring-4 ring-accent/30",
        quote: "text-blue-200/70 italic text-lg border-l-4 border-accent/40 pl-6",
      }
    : {
        section: "bg-muted/30",
        title: "font-heading text-2xl md:text-3xl font-semibold text-primary",
        name: "font-heading text-lg font-semibold text-primary",
        role: "text-muted-foreground text-sm",
        imageBorder: "ring-4 ring-primary/20",
        quote: "text-muted-foreground italic text-lg border-l-4 border-primary/30 pl-6",
      };

  return (
    <section className={`py-16 lg:py-24 ${styles.section}`}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : undefined }}
            className="flex justify-center"
          >
            <Image
              src={capitaineMichel}
              alt="Capitaine Michel"
              className={`w-56 h-56 lg:w-72 lg:h-72 rounded-full object-cover ${styles.imageBorder}`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : undefined }}
          >
            <h3 className={`${styles.title} mb-4`}>{t("title")}</h3>
            <p className={`${styles.quote} mb-6`}>
              &laquo; {t("quote")} &raquo;
            </p>
            <div>
              <p className={styles.name}>{t("name")}</p>
              <p className={styles.role}>{t("role")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaptainSection;
