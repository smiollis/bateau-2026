"use client";

import { useMemo, useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Instagram, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { useInstagramFeed } from "@/hooks/useInstagramFeed";
import { useTranslations, useLocale } from "next-intl";

/** Lightweight post type for the list view (no content/link fields) */
export interface PostSummary {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
}

interface ActualitesProps {
  posts: PostSummary[];
}

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

const POSTS_PER_PAGE = 6;

const ALL_CATEGORY = "__all__";

const Actualites = ({ posts }: ActualitesProps) => {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const { isDark } = useThemeVariant();
  const { posts: instagramPosts, isLoading: igLoading } = useInstagramFeed(9);
  const t = useTranslations("actualites");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const categories = useMemo(
    () => [ALL_CATEGORY, ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))],
    [posts]
  );

  const filteredPosts = activeCategory === ALL_CATEGORY
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  // 1 featured + up to visibleCount in grid
  const gridPosts = filteredPosts.slice(1, 1 + visibleCount);
  const hasMore = activeCategory === ALL_CATEGORY && filteredPosts.length > 1 + visibleCount;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
        {/* Page Header */}
        <div className="container-custom mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {tCommon("backToHome")}
          </Link>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-4">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              {t("subtitle")}
            </p>
          </m.div>
        </div>

        {/* Blog Section */}
        <section className="container-custom mb-24">
          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : isDark
                      ? "bg-white/10 text-muted-foreground hover:bg-white/15"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat === ALL_CATEGORY ? t("allCategories") : cat}
                </button>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">{t("noArticles")}</p>
            </div>
          )}

          {/* Featured Post */}
          {filteredPosts.length > 0 && filteredPosts[0] != null && (() => {
            const featured = filteredPosts[0];
            return (
            <Link
              href={`/actualites/${featured.slug}`}
              className="block mb-12 group"
            >
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-card border border-border card-hover">
                  <div className="h-64 md:h-96 overflow-hidden relative">
                    {featured.image ? (
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      {featured.category && (
                        <span className="bg-accent/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          {featured.category}
                        </span>
                      )}
                      {/* Date masquee temporairement
                      <span className="text-muted-foreground text-sm flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(featured.date, locale)}
                      </span>
                      */}
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      {t("readArticle")}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </m.div>
            </Link>
            );
          })()}

          {/* Blog Grid */}
          {gridPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map((post, i) => (
                <m.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/actualites/${post.slug}`} className="group block h-full">
                    <div className="bg-card rounded-xl overflow-hidden border border-border card-hover h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          {post.category && (
                            <span className="bg-accent/20 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                              {post.category}
                            </span>
                          )}
                          {/* Date masquee temporairement
                          <span className="text-muted-foreground text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.date, locale)}
                          </span>
                          */}
                        </div>
                        <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed flex-grow line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4">
                          {t("readMore")}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <Button
                onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
                variant="outline"
                className="px-8 py-3 rounded-full"
              >
                {t("loadMore")}
              </Button>
            </div>
          )}

        </section>

        {/* Instagram Section */}
        <section className={`section-padding ${isDark ? "bg-nuit-800" : "bg-secondary/30"}`}>
          <div className="container-custom">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Instagram className="w-6 h-6 text-primary" />
                <a href="https://www.instagram.com/bateau_a_paris/" target="_blank" rel="noopener noreferrer" className="font-heading text-lg text-primary hover:underline">@bateau_a_paris</a>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-3">
                {t("instagramTitle")}
              </h2>
              <p className="text-muted-foreground">
                {t("instagramSubtitle")}
              </p>
            </m.div>

            {igLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-4xl mx-auto">
                {instagramPosts.map((post, i) => (
                  <m.a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                  >
                    <Image
                      src={post.media_type === 'VIDEO' ? (post.thumbnail_url ?? post.media_url) : post.media_url}
                      alt={post.caption?.slice(0, 100) ?? 'Instagram post'}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                      {post.caption && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 text-white text-xs line-clamp-2">
                          {post.caption.slice(0, 80)}
                        </div>
                      )}
                    </div>
                  </m.a>
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <Button asChild className="btn-gold text-white">
                <a
                  href="https://www.instagram.com/bateau_a_paris/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  {t("followInstagram")}
                  <ExternalLink className="w-3.5 h-3.5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Actualites;
