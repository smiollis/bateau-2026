"use client";

import { motion } from "framer-motion";

interface LandingRichtextProps {
  title: string;
  content: string;
}

const LandingRichtext = ({ title, content }: LandingRichtextProps) => (
  <section className="section-padding">
    <div className="container-custom max-w-3xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-6"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="prose prose-lg text-muted-foreground max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  </section>
);

export default LandingRichtext;
