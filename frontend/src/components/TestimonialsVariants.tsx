"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";

const testimonials = [
  {
    id: 1,
    name: "Marie-Claire D.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "Il y a 2 semaines",
    text: "Une expérience magique ! Le capitaine était très sympathique et nous a fait découvrir Paris sous un angle totalement différent. Le champagne était excellent et la vue sur la Tour Eiffel au coucher du soleil restera gravée dans nos mémoires.",
  },
  {
    id: 2,
    name: "Jean-Philippe M.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "Il y a 1 mois",
    text: "Nous avons réservé pour l'anniversaire de ma femme et ce fut une surprise parfaite. Le bateau est magnifique, très bien entretenu, et l'équipe aux petits soins. Je recommande vivement la formule Premium !",
  },
  {
    id: 3,
    name: "Sophie L.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "Il y a 3 semaines",
    text: "Organisation sans faille, bateau superbe et équipage professionnel. Nous étions 10 pour un team building et tout le monde était enchanté. Le guide historique nous a appris énormément de choses sur Paris !",
  },
  {
    id: 4,
    name: "Thomas R.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "Il y a 2 mois",
    text: "Parfait pour une demande en mariage ! L'équipe a été très discrète et m'a aidé à préparer ce moment unique. Elle a dit oui ! Merci Un Bateau à Paris pour ce souvenir inoubliable.",
  },
];

const variantStyles: Record<ThemeVariant, {
  section: string;
  title: string;
  subtitle: string;
  card: string;
  name: string;
  text: string;
  nav: string;
  dots: string;
  activeDot: string;
}> = {
  classic: {
    section: "bg-primary",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground",
    subtitle: "text-primary-foreground/80",
    card: "bg-primary-foreground rounded-2xl p-8 md:p-10",
    name: "font-semibold text-primary text-lg",
    text: "text-foreground/80 text-lg leading-relaxed italic",
    nav: "bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground",
    dots: "bg-primary-foreground/30 hover:bg-primary-foreground/50",
    activeDot: "bg-accent",
  },
  modern: {
    section: "bg-secondary",
    title: "font-heading-michroma text-2xl md:text-3xl uppercase tracking-wider text-primary",
    subtitle: "text-muted-foreground font-heading-michroma text-sm tracking-wide",
    card: "bg-primary text-primary-foreground p-8 md:p-10 border-l-4 border-accent",
    name: "font-heading-michroma uppercase tracking-wide text-accent text-sm",
    text: "text-primary-foreground/80 text-base leading-relaxed",
    nav: "bg-primary hover:bg-primary/80 text-primary-foreground",
    dots: "bg-primary/30 hover:bg-primary/50",
    activeDot: "bg-accent",
  },
  minimal: {
    section: "bg-background",
    title: "font-heading-orbitron text-xl md:text-2xl uppercase tracking-widest text-foreground",
    subtitle: "text-muted-foreground font-heading-orbitron text-xs tracking-wider uppercase",
    card: "border-2 border-border p-8 md:p-10",
    name: "font-heading-orbitron uppercase tracking-widest text-foreground text-sm",
    text: "text-muted-foreground text-base leading-relaxed",
    nav: "border-2 border-border hover:border-accent text-foreground",
    dots: "border-2 border-border",
    activeDot: "bg-accent border-accent",
  },
  editorial: {
    section: "bg-white",
    title: "font-heading text-3xl md:text-4xl text-amber-900 italic",
    subtitle: "text-amber-700/70",
    card: "bg-amber-50 rounded-3xl p-8 md:p-12 shadow-xl relative",
    name: "font-heading text-amber-900 font-semibold",
    text: "text-amber-800/70 text-lg leading-relaxed",
    nav: "bg-amber-100 hover:bg-amber-200 text-amber-700",
    dots: "bg-amber-200",
    activeDot: "bg-amber-700",
  },
  luxe: {
    section: "bg-black",
    title: "text-3xl md:text-4xl font-light text-white tracking-tight",
    subtitle: "text-amber-400/60 uppercase tracking-[0.2em] text-sm",
    card: "bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-xl p-8 md:p-10",
    name: "text-amber-400 font-light tracking-wide",
    text: "text-white/60 text-base leading-relaxed",
    nav: "bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30",
    dots: "bg-white/20",
    activeDot: "bg-amber-400",
  },
  nuit: {
    section: "bg-[#0d1d35]",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
    subtitle: "text-blue-200/70",
    card: "bg-white/5 backdrop-blur-sm border border-blue-400/10 rounded-2xl p-8 md:p-10",
    name: "font-semibold text-accent text-lg",
    text: "text-blue-200/70 text-lg leading-relaxed italic",
    nav: "bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30",
    dots: "bg-blue-300/20",
    activeDot: "bg-accent",
  },
};

const TestimonialsVariants = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { variant } = useThemeVariant();
  const styles = variantStyles[variant];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Editorial: Quote-focused design
  if (variant === "editorial") {
    return (
      <section className={`section-padding ${styles.section}`} id="temoignages">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={styles.title}>Ils nous ont fait confiance</h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={styles.card}
              >
                <Quote className="absolute top-6 left-6 w-12 h-12 text-amber-200" />
                <div className="relative z-10">
                  <p className={`${styles.text} text-center mb-8`}>
                    "{testimonials[currentIndex].text}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <h4 className={styles.name}>{testimonials[currentIndex].name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              <button onClick={prev} className={`w-12 h-12 rounded-full ${styles.nav} flex items-center justify-center`}>
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={next} className={`w-12 h-12 rounded-full ${styles.nav} flex items-center justify-center`}>
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default layout for all other variants
  return (
    <section className={`section-padding ${styles.section}`} id="temoignages">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {variant !== "luxe" && variant !== "nuit" && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className={styles.subtitle}>Avis Google</span>
            </div>
          )}
          
          {(variant === "luxe" || variant === "nuit") && <p className={styles.subtitle}>Témoignages</p>}
          
          <h2 className={`${styles.title} ${(variant === "luxe" || variant === "nuit") ? "mt-4" : ""} mb-4`}>
            {variant === "luxe" ? (
              <>Ce que disent nos <span className="text-amber-400">passagers</span></>
            ) : variant === "nuit" ? (
              <>Ce que disent nos <span className="text-accent">passagers</span></>
            ) : (
              "Ce que disent nos passagers"
            )}
          </h2>
          
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-6 h-6 ${variant === "luxe" ? "fill-amber-400 text-amber-400" : (variant === "nuit") ? "fill-accent text-accent" : "fill-accent text-accent"}`} />
            ))}
            <span className={`ml-2 ${styles.subtitle} font-medium`}>5.0 sur Google</span>
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <button
            onClick={prev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full ${styles.nav} flex items-center justify-center transition-colors`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full ${styles.nav} flex items-center justify-center transition-colors`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={styles.card}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <h4 className={styles.name}>{testimonials[currentIndex].name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${variant === "luxe" ? "fill-amber-400 text-amber-400" : "fill-accent text-accent"}`} />
                      ))}
                    </div>
                    <span className={`text-sm ${variant === "classic" ? "text-muted-foreground" : variant === "luxe" ? "text-white/40" : variant === "nuit" ? "text-blue-200/50" : "text-muted-foreground"}`}>
                      {testimonials[currentIndex].date}
                    </span>
                  </div>
                </div>
              </div>
              <p className={styles.text}>"{testimonials[currentIndex].text}"</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? `w-6 ${styles.activeDot}` : styles.dots
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsVariants;
