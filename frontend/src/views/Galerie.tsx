"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Instagram, ExternalLink, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/galleryImages";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import { useInstagramFeed } from "@/hooks/useInstagramFeed";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

const slides = galleryImages.map((img) => ({
  src: img.src,
  alt: img.alt,
  width: img.width,
  height: img.height,
}));

const Galerie = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { isDark } = useThemeVariant();
  const { posts: instagramPosts, isLoading: igLoading } = useInstagramFeed(9);

  return (
    <div className="min-h-screen bg-background">
      <HeaderVariants />

      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="container-custom mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-4">
              Galerie Photos
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Découvrez les plus beaux moments capturés lors de nos croisières privées sur la Seine.
            </p>
          </motion.div>
        </div>

        {/* Masonry grid */}
        <div className="container-custom">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="break-inside-avoid cursor-pointer group rounded-xl overflow-hidden"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="relative">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Zoom, Thumbnails, Counter]}
        zoom={{ maxZoomPixelRatio: 3 }}
        thumbnails={{ position: "bottom", width: 100, height: 60 }}
      />

      {/* Instagram Section */}
      <section className={`section-padding ${isDark ? "bg-[#0d1d35]" : "bg-secondary/30"}`}>
        <div className="container-custom">
          <motion.div
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
              Suivez-nous sur Instagram
            </h2>
            <p className="text-muted-foreground">
              Les coulisses, les moments forts et l&apos;ambiance à bord du Senang
            </p>
          </motion.div>

          {igLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-4xl mx-auto">
              {instagramPosts.map((post, i) => (
                <motion.a
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
                  <img
                    src={post.media_type === 'VIDEO' ? (post.thumbnail_url ?? post.media_url) : post.media_url}
                    alt={post.caption?.slice(0, 100) ?? 'Instagram post'}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                    {post.caption && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 text-white text-xs line-clamp-2">
                        {post.caption.slice(0, 80)}
                      </div>
                    )}
                  </div>
                </motion.a>
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
                Suivre @bateau_a_paris
                <ExternalLink className="w-3.5 h-3.5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <FooterVariants />
    </div>
  );
};

export default Galerie;
