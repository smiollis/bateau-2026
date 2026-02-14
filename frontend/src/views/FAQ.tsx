"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { isDark } = useThemeVariant();
  const t = useTranslations("faq");

  const faqItems = Array.from({ length: 10 }, (_, i) => ({
    question: t(`question${i + 1}`),
    answer: i + 1 === 6
      ? (<>{t("answer6Before")}<Link href="/cgv" className="text-accent font-semibold hover:underline">{t("answer6Link")}</Link>{t("answer6After")}</>)
      : t(`answer${i + 1}`),
  }));

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToHome")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-4">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-4">
              {t("subtitle")}
            </p>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              {t("intro")}
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, index) => (
              <motion.div
                key={`faq-${index}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-border rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-left font-heading text-base md:text-lg font-medium text-primary hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`mt-12 p-8 rounded-2xl text-center ${isDark ? "bg-white/5" : "bg-primary/5"}`}
          >
            <p className="text-foreground/80 mb-2">
              {t.rich("contactCta", {
                strong: (chunks) => <strong>{chunks}</strong>,
                link: (chunks) => <Link href="/#contact" className="text-accent font-semibold hover:underline">{chunks}</Link>,
              })}
            </p>
            <p className="text-muted-foreground text-sm">
              {t("contactCtaSub")}
            </p>
          </motion.div>
        </div>
    </div>
  );
};

export default FAQ;
