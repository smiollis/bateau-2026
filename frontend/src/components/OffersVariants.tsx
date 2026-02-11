"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import Link from "next/link";
import formulePremiumImg from "@/assets/formule-premium.jpg";

const formuleImage = typeof formulePremiumImg === 'string' ? formulePremiumImg : formulePremiumImg.src;

const offers = [
  {
    title: "Formule Découverte",
    price: 420,
    priceExtra: 70,
    description: "L'essentiel pour découvrir Paris depuis la Seine",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["2h de croisière privée", "Jusqu'à 6 personnes", "Commentaires du capitaine", "Musique d'ambiance"],
    popular: false,
  },
  {
    title: "Formule Champagne",
    price: 480,
    priceExtra: 80,
    description: "Ajoutez une touche de célébration à votre croisière",
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["2h de croisière privée", "Jusqu'à 6 personnes", "Bouteille de champagne", "Musique d'ambiance"],
    popular: true,
  },
  {
    title: "Formule Premium",
    price: 600,
    priceExtra: 100,
    description: "L'expérience complète pour les gourmets",
    image: formuleImage,
    features: ["2h de croisière privée", "Jusqu'à 6 personnes", "Champagne premium", "Planches charcuterie & fromages"],
    popular: false,
  },
  {
    title: "Croisière Guidée",
    price: 600,
    priceExtra: 100,
    description: "Découvrez l'histoire de Paris avec un guide expert",
    image: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: ["2h de croisière privée", "Jusqu'à 6 personnes", "Guide historique diplômé", "Anecdotes exclusives"],
    popular: false,
  },
];

const variantStyles: Record<ThemeVariant, {
  section: string;
  title: string;
  subtitle: string;
  card: string;
  cardTitle: string;
  price: string;
  cta: string;
  popularBadge: string;
}> = {
  classic: {
    section: "bg-secondary/30",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary",
    subtitle: "text-muted-foreground text-lg",
    card: "bg-card rounded-2xl border border-border",
    cardTitle: "font-heading text-xl font-semibold text-primary",
    price: "text-3xl font-bold text-primary",
    cta: "btn-gold w-full",
    popularBadge: "bg-accent text-accent-foreground",
  },
  modern: {
    section: "bg-background",
    title: "font-heading-michroma text-2xl md:text-3xl uppercase tracking-wider text-primary",
    subtitle: "text-muted-foreground font-heading-michroma text-sm tracking-wide",
    card: "bg-primary text-primary-foreground rounded-none border-b-4 border-accent",
    cardTitle: "font-heading-michroma text-lg uppercase tracking-wide text-primary-foreground",
    price: "text-3xl font-bold text-accent font-heading-michroma",
    cta: "bg-accent text-accent-foreground font-heading-michroma uppercase text-xs tracking-wider w-full hover:bg-accent/90",
    popularBadge: "bg-accent text-accent-foreground font-heading-michroma uppercase text-xs tracking-wider",
  },
  minimal: {
    section: "bg-secondary/20",
    title: "font-heading-orbitron text-xl md:text-2xl uppercase tracking-widest text-primary",
    subtitle: "text-muted-foreground font-heading-orbitron text-xs tracking-wider uppercase",
    card: "bg-background border-2 border-border rounded-none",
    cardTitle: "font-heading-orbitron text-base uppercase tracking-widest text-foreground",
    price: "text-2xl font-bold text-accent font-heading-orbitron",
    cta: "bg-transparent border-2 border-accent text-accent font-heading-orbitron uppercase text-xs tracking-wider w-full hover:bg-accent hover:text-accent-foreground",
    popularBadge: "border-2 border-accent text-accent font-heading-orbitron uppercase text-xs tracking-wider bg-transparent",
  },
  editorial: {
    section: "bg-white",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl text-amber-900 italic",
    subtitle: "text-amber-700/70 text-lg",
    card: "bg-amber-50 rounded-3xl overflow-hidden shadow-lg",
    cardTitle: "font-heading text-xl text-amber-900",
    price: "text-3xl font-bold text-amber-700 font-heading",
    cta: "bg-amber-700 text-white w-full hover:bg-amber-800",
    popularBadge: "bg-amber-700 text-white",
  },
  luxe: {
    section: "bg-neutral-950",
    title: "text-3xl md:text-4xl font-light text-white tracking-tight",
    subtitle: "text-amber-400/60 uppercase tracking-[0.2em] text-sm",
    card: "bg-neutral-900/50 backdrop-blur-sm border border-amber-400/10 rounded-xl overflow-hidden hover:border-amber-400/30 transition-all",
    cardTitle: "text-lg text-white font-light tracking-wide",
    price: "text-3xl font-light text-amber-400",
    cta: "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold w-full hover:from-amber-400 hover:to-amber-500",
    popularBadge: "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold",
  },
  nuit: {
    section: "bg-[#0a1628]",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
    subtitle: "text-blue-200/70 text-lg",
    card: "bg-white/5 backdrop-blur-sm border border-blue-400/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all",
    cardTitle: "font-heading text-xl font-semibold text-blue-100",
    price: "text-3xl font-bold text-accent",
    cta: "btn-gold w-full",
    popularBadge: "bg-accent text-accent-foreground",
  },
};

const OffersVariants = () => {
  const { variant } = useThemeVariant();
  const styles = variantStyles[variant];

  // Editorial: Horizontal scrolling cards
  if (variant === "editorial") {
    return (
      <section className={`section-padding ${styles.section}`} id="tarifs">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={styles.title}>Nos formules</h2>
            <p className={`${styles.subtitle} mt-2`}>Choisissez l'expérience qui vous correspond</p>
          </motion.div>
        </div>

        <div className="overflow-x-auto pb-6 scrollbar-hide">
          <div className="flex gap-6 px-6 lg:px-[calc((100vw-1280px)/2+1.5rem)] min-w-max">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${styles.card} w-80 flex-shrink-0 relative`}
              >
                {offer.popular && (
                  <div className={`absolute top-4 right-4 z-10 ${styles.popularBadge} text-xs font-semibold px-3 py-1 rounded-full`}>
                    Populaire
                  </div>
                )}
                <div className="h-48 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className={`${styles.cardTitle} mb-2`}>{offer.title}</h3>
                  <p className="text-amber-800/60 text-sm mb-4">{offer.description}</p>
                  <div className="mb-4">
                    <span className="text-amber-800/40 text-xs">à partir de</span>
                    <div><span className={styles.price}>{offer.price}€</span></div>
                    <span className="text-amber-800/50 text-xs">+{offer.priceExtra}€/pers. suppl.</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-amber-800/70">
                        <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={styles.cta} asChild><Link href="/reservation">Réserver</Link></Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Luxe: Elegant pricing table
  if (variant === "luxe") {
    return (
      <section className={`section-padding ${styles.section}`} id="tarifs">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className={styles.subtitle}>Tarifs</p>
            <h2 className={`${styles.title} mt-4`}>Nos <span className="text-amber-400">formules</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${styles.card} relative group ${offer.popular ? 'ring-2 ring-amber-400' : ''}`}
              >
                {offer.popular && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${styles.popularBadge} text-xs px-4 py-1 rounded-full`}>
                    Populaire
                  </div>
                )}
                <div className="h-40 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                </div>
                <div className="p-6 relative">
                  <h3 className={`${styles.cardTitle} mb-2`}>{offer.title}</h3>
                  <p className="text-white/40 text-sm mb-4">{offer.description}</p>
                  <div className="mb-4">
                    <span className="text-white/30 text-xs">à partir de</span>
                    <div><span className={styles.price}>{offer.price}€</span>
                    <span className="text-white/40 text-sm ml-2">/ 6 pers.</span></div>
                    <span className="text-white/30 text-xs">+{offer.priceExtra}€/pers. suppl.</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                        <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={styles.cta} asChild><Link href="/reservation">Réserver</Link></Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default: Grid layout for Classic, Modern, Minimal
  return (
    <section className={`section-padding ${styles.section}`} id="tarifs">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`${styles.title} mb-4`}>Nos Formules</h2>
          <p className={styles.subtitle}>Choisissez l'expérience qui vous correspond</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`${styles.card} overflow-hidden card-hover h-full flex flex-col ${offer.popular && variant !== "modern" ? 'ring-2 ring-accent' : ''}`}>
                {offer.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`${styles.popularBadge} text-xs font-semibold px-3 py-1 rounded-full`}>
                      Populaire
                    </span>
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 ${variant === "modern" ? "bg-primary/40" : variant === "nuit" ? "bg-[#0a1628]/50" : "bg-gradient-to-t from-primary/40 to-transparent"}`} />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`${styles.cardTitle} mb-2`}>{offer.title}</h3>
                  <p className={`${variant === "modern" ? "text-primary-foreground/60" : variant === "nuit" ? "text-blue-200/60" : "text-muted-foreground"} text-sm mb-4`}>
                    {offer.description}
                  </p>

                  <div className="mb-4">
                    <span className={`${variant === "modern" ? "text-primary-foreground/50" : variant === "nuit" ? "text-blue-200/50" : "text-muted-foreground"} text-xs`}>à partir de</span>
                    <div>
                      <span className={styles.price}>{offer.price}€</span>
                      <span className={`${variant === "modern" ? "text-primary-foreground/60" : variant === "nuit" ? "text-blue-200/50" : "text-muted-foreground"} text-sm ml-1`}>
                        / 6 pers.
                      </span>
                    </div>
                    <span className={`${variant === "modern" ? "text-primary-foreground/50" : variant === "nuit" ? "text-blue-200/50" : "text-muted-foreground"} text-xs`}>+{offer.priceExtra}€/pers. suppl.</span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {offer.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2 text-sm ${variant === "modern" ? "text-primary-foreground/80" : variant === "nuit" ? "text-blue-100/80" : "text-foreground/80"}`}>
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button className={offer.popular ? styles.cta : `w-full ${variant === "modern" ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" : variant === "nuit" ? "bg-white/10 border border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground" : ""}`} variant={offer.popular ? "default" : "outline"} asChild>
                    <Link href="/reservation">Réserver</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersVariants;
