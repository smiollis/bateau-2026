"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingGalleryProps {
  title: string;
  images: { src: string; alt: string }[];
}

const LandingGallery = ({ title, images }: LandingGalleryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          className="font-heading text-3xl md:text-4xl font-semibold text-primary text-center mb-10"
        >
          {title}
        </motion.h2>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          >
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : i * 0.05, duration: prefersReducedMotion ? 0 : undefined }}
                className="flex-shrink-0 w-72 md:w-80 aspect-[4/3] relative rounded-xl overflow-hidden snap-center"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
          {images.length > 3 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hidden md:flex"
                onClick={() => scroll("left")}
                aria-label="Photos precedentes"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hidden md:flex"
                onClick={() => scroll("right")}
                aria-label="Photos suivantes"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LandingGallery;
