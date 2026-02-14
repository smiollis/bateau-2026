"use client";

import { motion, useReducedMotion } from "framer-motion";

interface LandingRichtextProps {
  title: string;
  content: string;
}

const LandingRichtext = ({ title, content }: LandingRichtextProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding">
      <div className="container-custom max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-6"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="prose prose-lg text-muted-foreground max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default LandingRichtext;
