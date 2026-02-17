"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

// Helper to generate Next.js image optimizer URL for responsive loading
function nextImageUrl(src: string, width: number, quality = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

function makeSrcSet(src: string): string {
  return [640, 1080, 1920]
    .map((w) => `${nextImageUrl(src, w)} ${w}w`)
    .join(", ");
}

const heroImages = [
  {
    src: "/images/hero/2025-04-08-a-22.20.47_261af646.webp",
    alt: "Le Senang naviguant sous les ponts de Paris",
  },
  {
    src: "/images/hero/2025-03-03-a-16.00.24_13d1702e.webp",
    alt: "Panorama des monuments parisiens depuis la Seine",
  },
  {
    src: "/images/hero/2025-04-08-a-20.58.31_fcc03538.webp",
    alt: "Vue sur les quais et ponts de Paris au fil de l'eau",
  },
  {
    src: "/images/hero/2025-04-08-a-20.57.33_c61d5f00.webp",
    alt: "Coucher de soleil sur la Seine et ses monuments",
  },
];

// Ken Burns: each image gets a unique pan/zoom direction
const kenBurnsVariants = [
  { scale: [1, 1.15], x: ["0%", "-3%"], y: ["0%", "-2%"] },
  { scale: [1.1, 1], x: ["-2%", "2%"], y: ["-1%", "1%"] },
  { scale: [1, 1.12], x: ["1%", "-2%"], y: ["2%", "0%"] },
  { scale: [1.08, 1], x: ["2%", "-1%"], y: ["0%", "2%"] },
];

const INTERVAL = 6000;

const HeroCinemaSlideshow = () => {
  const [current, setCurrent] = useState(0);
  // Track whether the slideshow has advanced past the first image.
  // While false, we show the SSR-friendly next/image for LCP.
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
    setHasAdvanced(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, INTERVAL);
    return () => clearInterval(timer);
  }, [advance]);

  const kb = kenBurnsVariants[current % kenBurnsVariants.length]!;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* SSR-rendered first image for instant LCP — visible until slideshow advances */}
      {!hasAdvanced && (
        <Image
          src={heroImages[0]!.src}
          alt={heroImages[0]!.alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      )}

      {/* Animated slideshow layer — takes over once JS has hydrated */}
      <AnimatePresence mode="sync">
        <m.img
          key={current}
          src={heroImages[current]?.src}
          srcSet={heroImages[current]?.src ? makeSrcSet(heroImages[current].src) : undefined}
          sizes="100vw"
          alt={heroImages[current]?.alt ?? ""}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: kb.scale[0], x: kb.x[0], y: kb.y[0] }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: kb.scale[1],
                  x: kb.x[1],
                  y: kb.y[1],
                }
          }
          exit={{ opacity: 0 }}
          transition={
            prefersReducedMotion
              ? { opacity: { duration: 0.5, ease: "easeInOut" } }
              : {
                  opacity: { duration: 1.5, ease: "easeInOut" },
                  scale: { duration: INTERVAL / 1000, ease: "linear" },
                  x: { duration: INTERVAL / 1000, ease: "linear" },
                  y: { duration: INTERVAL / 1000, ease: "linear" },
                }
          }
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority={current === 0 ? "high" : "auto"}
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroCinemaSlideshow;
