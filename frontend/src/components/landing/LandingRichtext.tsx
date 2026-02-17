"use client";

import { m, useReducedMotion } from "framer-motion";
import DOMPurify from "dompurify";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";

function sanitizeHtml(html: string): string {
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(html);
  }
  return html;
}

interface LandingRichtextProps {
  title: string;
  content: string;
}

const LandingRichtext = ({ title, content }: LandingRichtextProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useThemeVariant();

  return (
    <section className="section-padding">
      <div className="container-custom max-w-3xl">
        <m.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className={`font-heading text-3xl md:text-4xl font-semibold mb-6 ${isDark ? "text-blue-100" : "text-primary"}`}
        >
          {title}
        </m.h2>
        <m.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className={`prose prose-lg max-w-none ${isDark
            ? "prose-invert prose-strong:text-blue-100 prose-p:text-blue-200/70 prose-li:text-blue-200/70"
            : "text-muted-foreground"
          }`}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        />
      </div>
    </section>
  );
};

export default LandingRichtext;
