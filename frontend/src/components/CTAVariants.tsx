"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import Link from "next/link";

const variantStyles: Record<ThemeVariant, {
  section: string;
  overlay: string;
  title: string;
  text: string;
  cta: string;
}> = {
  classic: {
    section: "relative py-24 md:py-32",
    overlay: "bg-gradient-to-r from-primary/80 via-primary/70 to-primary/80",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground",
    text: "text-primary-foreground/80 text-lg md:text-xl",
    cta: "btn-gold text-lg px-12 py-6 h-auto",
  },
  modern: {
    section: "relative py-24 md:py-32",
    overlay: "bg-primary/90",
    title: "font-heading-michroma text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-primary-foreground",
    text: "text-primary-foreground/70 font-heading-michroma text-sm tracking-wide",
    cta: "bg-accent text-accent-foreground font-heading-michroma uppercase tracking-widest text-sm px-12 py-6 h-auto hover:bg-accent/90",
  },
  minimal: {
    section: "relative py-24 md:py-32",
    overlay: "bg-foreground/90",
    title: "font-heading-orbitron text-xl md:text-2xl lg:text-3xl uppercase tracking-widest text-background",
    text: "text-background/70 font-heading-orbitron text-xs tracking-wider uppercase",
    cta: "bg-transparent border-2 border-accent text-accent font-heading-orbitron uppercase tracking-widest text-sm px-12 py-6 h-auto hover:bg-accent hover:text-accent-foreground",
  },
  editorial: {
    section: "relative py-24 md:py-32",
    overlay: "bg-gradient-to-r from-amber-900/90 to-amber-700/90",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl text-white italic",
    text: "text-white/80 text-lg",
    cta: "bg-white text-amber-900 font-semibold px-12 py-6 h-auto hover:bg-amber-50",
  },
  luxe: {
    section: "relative py-32 md:py-40",
    overlay: "bg-gradient-to-t from-black via-black/80 to-black/60",
    title: "text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight",
    text: "text-white/50 text-base",
    cta: "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold px-12 py-6 h-auto hover:from-amber-400 hover:to-amber-500",
  },
  nuit: {
    section: "relative py-24 md:py-32",
    overlay: "bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/70 to-[#0a1628]/90",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
    text: "text-blue-200/80 text-lg md:text-xl",
    cta: "btn-gold text-lg px-12 py-6 h-auto",
  },
};

const CTAVariants = () => {
  const { variant } = useThemeVariant();
  const styles = variantStyles[variant];

  // Luxe: Dramatic full-screen CTA
  if (variant === "luxe") {
    return (
      <section className={styles.section}>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Seine at sunset"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${styles.overlay}`} />
        </div>

        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
            />
            
            <p className="text-amber-400/60 uppercase tracking-[0.3em] text-sm mb-6">Réservation</p>
            
            <h2 className={`${styles.title} mb-6`}>
              Vivez l'exception
            </h2>
            
            <p className={`${styles.text} max-w-xl mx-auto mb-10`}>
              Réservez dès maintenant votre croisière privée sur la Seine
            </p>
            
            <Button className={styles.cta} asChild>
              <Link href="/reservation">
                Réserver maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Editorial: Asymmetric layout
  if (variant === "editorial") {
    return (
      <section className="bg-amber-50">
        <div className="grid lg:grid-cols-2 min-h-[50vh]">
          <div className="relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Seine at sunset"
              className="w-full h-full object-cover min-h-[300px]"
            />
          </div>
          
          <div className="flex items-center p-8 lg:p-16 bg-amber-700">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`${styles.title} mb-4`}>
                Prêt à embarquer ?
              </h2>
              <p className={`${styles.text} mb-8`}>
                Réservez votre croisière privée et découvrez Paris autrement.
              </p>
              <Button className={styles.cta} asChild>
                <Link href="/reservation">
                  Réserver
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Default: Classic, Modern, Minimal
  return (
    <section className={styles.section}>
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Seine au coucher du soleil"
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${styles.overlay}`} />
      </div>

      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className={`${styles.title} mb-6`}>
            {variant === "modern" ? (
              "Réservez maintenant"
            ) : variant === "minimal" ? (
              "Réserver"
            ) : (
              <>
                Prêt à vivre une expérience
                <br />
                <span className="italic text-accent">inoubliable ?</span>
              </>
            )}
          </h2>
          
          <p className={`${styles.text} mb-10 max-w-2xl mx-auto`}>
            Réservez dès maintenant votre croisière privée sur la Seine 
            et découvrez Paris comme vous ne l'avez jamais vu.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button className={styles.cta} asChild>
              <Link href="/reservation">Réserver votre croisière</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAVariants;
