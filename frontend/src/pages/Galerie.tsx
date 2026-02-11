import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft, Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/galleryImages";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";

const instagramPosts = [
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/08/WhatsApp-Image-2025-07-27-a-12.22.05_77ed38c8.webp", likes: 124, comments: 8 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-03-03-a-16.00.24_13d1702e.jpg", likes: 89, comments: 12 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-08-a-22.20.47_261af646.webp", likes: 156, comments: 15 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-08-a-22.20.42_88a4983b.webp", likes: 203, comments: 22 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-08-a-21.50.25_ac11bce0.webp", likes: 97, comments: 6 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-03-03-a-16.00.26_b41cf5f5.webp", likes: 178, comments: 19 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-08-a-20.58.31_fcc03538.webp", likes: 145, comments: 11 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-03-02-a-21.18.40_52501437.webp", likes: 112, comments: 9 },
  { src: "https://bateau-a-paris.fr/wp-content/uploads/2025/06/WhatsApp-Image-2025-04-04-a-17.33.30_ea0b05c2.webp", likes: 234, comments: 28 },
];

const Galerie = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { isDark } = useThemeVariant();

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    );

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
            Retour à l'accueil
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-4">
              Galerie Photos
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
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
                onClick={() => openLightbox(i)}
              >
                <div className="relative">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
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
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 text-white/60 text-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              Les coulisses, les moments forts et l'ambiance à bord du Senang
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-4xl mx-auto">
            {instagramPosts.map((post, i) => (
              <motion.a
                key={i}
                href="https://www.instagram.com/bateau_a_paris/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={post.src}
                  alt="Instagram post"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4 text-white">
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <Heart className="w-4 h-4 fill-white" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <MessageCircle className="w-4 h-4 fill-white" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild className="btn-gold">
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
