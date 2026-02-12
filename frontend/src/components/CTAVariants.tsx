"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const CTAVariants = () => {
  const { isDark } = useThemeVariant();
  const t = useTranslations("cta");

  const styles = isDark
    ? {
        overlay: "bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/70 to-[#0a1628]/90",
        title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
        text: "text-blue-200/80 text-lg md:text-xl",
        cta: "btn-gold text-lg px-12 py-6 h-auto",
      }
    : {
        overlay: "bg-gradient-to-r from-primary/80 via-primary/70 to-primary/80",
        title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground",
        text: "text-primary-foreground/80 text-lg md:text-xl",
        cta: "btn-gold text-lg px-12 py-6 h-auto",
      };

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Seine au coucher du soleil"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className={`absolute inset-0 ${styles.overlay}`} />
      </div>

      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className={`${styles.title} mb-6`}>
            {t("title")}
            <br />
            <span className="italic text-accent">{t("titleAccent")}</span>
          </h2>

          <p className={`${styles.text} mb-10 max-w-2xl mx-auto`}>
            {t("subtitle")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button className={styles.cta} asChild>
              <Link href="/reservation">{t("button")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAVariants;
