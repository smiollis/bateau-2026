"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { LandingPageData } from "@/data/landings/types";

interface LandingRelatedProps {
  title?: string;
  pages: Pick<LandingPageData, "slug" | "hero" | "meta">[];
}

const LandingRelated = ({
  title,
  pages,
}: LandingRelatedProps) => {
  const t = useTranslations("landing");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <m.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="font-heading text-3xl md:text-4xl font-semibold text-primary text-center mb-10"
        >
          {title ?? t("relatedTitle")}
        </m.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pages.map((page, i) => (
            <m.div
              key={page.slug}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : i * 0.1, duration: prefersReducedMotion ? 0 : undefined }}
            >
              <Link
                href={`/${page.slug}`}
                className="group block rounded-xl overflow-hidden border bg-background hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={page.hero.backgroundImage}
                    alt={page.hero.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-semibold text-primary group-hover:text-gold transition-colors flex items-center gap-2">
                    {page.hero.title}
                    <ArrowRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingRelated;
