"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import DOMPurify from "dompurify";

function sanitizeHtml(html: string): string {
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(html);
  }
  return html;
}
import { ArrowLeft, ArrowRight, Calendar, Wine, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations, useLocale } from "next-intl";
import postsFr from "@/data/posts.json";
import postsEn from "@/data/posts-en.json";
import postsEs from "@/data/posts-es.json";
import postsIt from "@/data/posts-it.json";
import postsDe from "@/data/posts-de.json";
import postsPtBR from "@/data/posts-pt-BR.json";

const localeMap: Record<string, string> = {
  fr: "fr-FR", en: "en-US", es: "es-ES", it: "it-IT", de: "de-DE", "pt-BR": "pt-BR",
};

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(localeMap[locale] || "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getPostsByLocale(locale: string) {
  switch (locale) {
    case "en": return postsEn;
    case "es": return postsEs;
    case "it": return postsIt;
    case "de": return postsDe;
    case "pt-BR": return postsPtBR;
    default: return postsFr;
  }
}

interface ArticleDetailProps {
  post: (typeof postsFr)[number];
}

export default function ArticleDetail({ post }: ArticleDetailProps) {
  const { isDark } = useThemeVariant();
  const t = useTranslations("articleDetail");
  const locale = useLocale();
  const allPosts = getPostsByLocale(locale);

  const related = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
        {/* Hero image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-64 md:h-[28rem] overflow-hidden relative"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </motion.div>
        )}

        <article className="container-custom max-w-3xl mx-auto mt-8">
          {/* Retour */}
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToNews")}
          </Link>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              {post.category && (
                <span className="bg-accent/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              )}
              {/* Date masquee temporairement
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date, locale)}
              </span>
              */}
            </div>

            {/* Titre */}
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-8 leading-tight">
              {post.title}
            </h1>
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-primary
              prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80
              prose-strong:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground
              ${isDark ? "prose-invert" : ""}`}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />
        </article>

        {/* CTA Réservation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-custom max-w-4xl mx-auto mt-16"
        >
          <div className={`rounded-2xl p-8 md:p-10 ${isDark ? "bg-white/5 border border-white/10" : "bg-primary/5 border border-primary/10"}`}>
            <h2 className="font-heading text-2xl md:text-3xl text-primary mb-8 text-center">
              {t("ctaTitle")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isDark ? "bg-accent/20" : "bg-accent/10"}`}>
                  <Wine className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-1">{t("ctaFeature1Title")}</h3>
                <p className="text-muted-foreground text-sm">{t("ctaFeature1Desc")}</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isDark ? "bg-accent/20" : "bg-accent/10"}`}>
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-1">{t("ctaFeature2Title")}</h3>
                <p className="text-muted-foreground text-sm">{t("ctaFeature2Desc")}</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isDark ? "bg-accent/20" : "bg-accent/10"}`}>
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary mb-1">{t("ctaFeature3Title")}</h3>
                <p className="text-muted-foreground text-sm">{t("ctaFeature3Desc")}</p>
              </div>
            </div>
            <div className="text-center">
              <Button className="btn-gold text-white text-base px-8 py-5 h-auto" asChild>
                <Link href="/reservation">{t("ctaButton")}</Link>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Articles similaires */}
        {related.length > 0 && (
          <section className="container-custom mt-16 pt-12 border-t border-border">
            <h2 className="font-heading text-2xl text-primary mb-8">
              {t("relatedArticles")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/actualites/${r.slug}`}
                  className="group block"
                >
                  <div className="bg-card rounded-xl overflow-hidden border border-border card-hover h-full flex flex-col">
                    <div className="h-40 overflow-hidden relative">
                      {r.image ? (
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Date masquee temporairement
                      <span className="text-muted-foreground text-xs mb-2">
                        {formatDate(r.date, locale)}
                      </span>
                      */}
                      <h3 className="font-heading text-base text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium mt-auto">
                        {t("readMore")}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
    </div>
  );
}
