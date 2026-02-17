"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface LandingHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  cta: { text: string; href: string };
}

const LandingHero = ({ title, subtitle, backgroundImage, cta }: LandingHeroProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <Image
        src={backgroundImage}
        alt={title}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <m.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 drop-shadow-lg"
        >
          {title}
        </m.h1>
        <m.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          {subtitle}
        </m.p>
        <m.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
        >
          <Button asChild size="lg" className="btn-gold text-white text-lg px-8 py-6">
            <Link href={cta.href}>{cta.text}</Link>
          </Button>
        </m.div>
      </div>
    </section>
  );
};

export default LandingHero;
