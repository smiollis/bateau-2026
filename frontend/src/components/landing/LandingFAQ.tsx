"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from "@/data/landings/types";

interface LandingFAQProps {
  title: string;
  items: FAQItem[];
}

const LandingFAQ = ({ title, items }: LandingFAQProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding">
      <div className="container-custom max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="font-heading text-3xl md:text-4xl font-semibold text-primary text-center mb-10"
        >
          {title}
        </motion.h2>
        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : i * 0.05, duration: prefersReducedMotion ? 0 : undefined }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="border rounded-lg px-4 bg-background"
              >
                <AccordionTrigger className="text-left font-medium text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default LandingFAQ;
