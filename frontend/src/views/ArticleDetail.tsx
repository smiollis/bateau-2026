"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import DOMPurify from "dompurify";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import allPosts from "@/data/posts.json";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface ArticleDetailProps {
  post: (typeof allPosts)[number];
}

export default function ArticleDetail({ post }: ArticleDetailProps) {
  const { isDark } = useThemeVariant();

  const related = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <HeaderVariants />

      <main className="pt-24 pb-16">
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
            Retour aux actualites
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
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
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
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
        </article>

        {/* Articles similaires */}
        {related.length > 0 && (
          <section className="container-custom mt-16 pt-12 border-t border-border">
            <h2 className="font-heading text-2xl text-primary mb-8">
              Articles similaires
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
                      <span className="text-muted-foreground text-xs mb-2">
                        {formatDate(r.date)}
                      </span>
                      <h3 className="font-heading text-base text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium mt-auto">
                        Lire la suite
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <FooterVariants />
    </div>
  );
}
