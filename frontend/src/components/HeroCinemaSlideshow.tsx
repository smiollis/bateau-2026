"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  {
    src: "/images/hero/2025-04-08-a-22.20.47_261af646.webp",
    alt: "Le Senang naviguant sous les ponts de Paris",
  },
  {
    src: "/images/hero/2025-03-03-a-16.00.24_13d1702e.jpg",
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
  const preloadedRef = useRef(false);

  // Preload all images on mount
  useEffect(() => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    heroImages.forEach((img) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.src;
      // Use fetchpriority for the first image
      if (img === heroImages[0]) {
        link.setAttribute("fetchpriority", "high");
      }
      document.head.appendChild(link);
    });
  }, []);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, INTERVAL);
    return () => clearInterval(timer);
  }, [advance]);

  const kb = kenBurnsVariants[current % kenBurnsVariants.length];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={heroImages[current].src}
          alt={heroImages[current].alt}
          initial={{ opacity: 0, scale: kb.scale[0], x: kb.x[0], y: kb.y[0] }}
          animate={{
            opacity: 1,
            scale: kb.scale[1],
            x: kb.x[1],
            y: kb.y[1],
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: INTERVAL / 1000, ease: "linear" },
            x: { duration: INTERVAL / 1000, ease: "linear" },
            y: { duration: INTERVAL / 1000, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroCinemaSlideshow;
