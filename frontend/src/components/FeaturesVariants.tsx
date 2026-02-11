"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Users, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";

const features = [
  {
    icon: Clock,
    title: "Croisière de 2h",
    description: "Deux heures de navigation au fil de l'eau pour profiter pleinement de Paris.",
  },
  {
    icon: MapPin,
    title: "Au cœur de Paris",
    description: "Passez devant la Tour Eiffel, Notre-Dame, le Louvre et bien d'autres monuments.",
  },
  {
    icon: Users,
    title: "Jusqu'à 12 personnes",
    description: "Profitez d'un moment privilégié en famille, entre amis ou collègues.",
  },
  {
    icon: Sparkles,
    title: "Croisière à la carte",
    description: "Choisissez parmi nos formules ou personnalisez votre expérience.",
  },
];

const variantStyles: Record<ThemeVariant, {
  section: string;
  title: string;
  subtitle: string;
  card: string;
  icon: string;
  cardTitle: string;
  cardText: string;
}> = {
  classic: {
    section: "bg-background",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary",
    subtitle: "text-foreground/70 text-lg",
    card: "bg-card rounded-xl p-6 lg:p-8 border border-border card-hover text-center",
    icon: "bg-primary/10 text-primary group-hover:bg-accent group-hover:text-accent-foreground",
    cardTitle: "font-heading text-xl font-semibold text-primary",
    cardText: "text-foreground/75",
  },
  modern: {
    section: "bg-secondary/30",
    title: "font-heading-michroma text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-primary",
    subtitle: "text-muted-foreground font-heading-michroma text-sm tracking-wide",
    card: "bg-primary text-primary-foreground rounded-none p-6 lg:p-8 border-l-4 border-accent",
    icon: "bg-accent text-accent-foreground",
    cardTitle: "font-heading-michroma text-lg uppercase tracking-wide text-primary-foreground",
    cardText: "text-primary-foreground/70",
  },
  minimal: {
    section: "bg-background",
    title: "font-heading-orbitron text-xl md:text-2xl lg:text-3xl uppercase tracking-widest text-primary",
    subtitle: "text-muted-foreground font-heading-orbitron text-xs tracking-wider uppercase",
    card: "bg-transparent p-6 lg:p-8 border-b border-border text-left",
    icon: "bg-transparent text-accent border-2 border-accent",
    cardTitle: "font-heading-orbitron text-base uppercase tracking-widest text-foreground",
    cardText: "text-muted-foreground text-sm",
  },
  editorial: {
    section: "bg-amber-50",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl text-amber-900 italic",
    subtitle: "text-amber-700/70 text-lg",
    card: "bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow",
    icon: "bg-amber-100 text-amber-700",
    cardTitle: "font-heading text-xl text-amber-900",
    cardText: "text-amber-800/60",
  },
  luxe: {
    section: "bg-black",
    title: "text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight",
    subtitle: "text-amber-400/60 uppercase tracking-[0.2em] text-sm",
    card: "bg-white/5 backdrop-blur-sm rounded-lg p-6 lg:p-8 border border-amber-400/10 hover:border-amber-400/30 transition-colors",
    icon: "bg-gradient-to-br from-amber-400 to-amber-600 text-black",
    cardTitle: "text-lg text-white font-light tracking-wide",
    cardText: "text-white/50",
  },
  nuit: {
    section: "bg-[#0d1d35]",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
    subtitle: "text-blue-200/70 text-lg",
    card: "bg-white/5 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-blue-400/10 hover:border-accent/30 transition-colors text-center",
    icon: "bg-accent/20 text-accent",
    cardTitle: "font-heading text-xl font-semibold text-blue-100",
    cardText: "text-blue-200/60",
  },
};

const FeaturesVariants = () => {
  const { variant } = useThemeVariant();
  const styles = variantStyles[variant];

  // Editorial: Horizontal scroll layout
  if (variant === "editorial") {
    return (
      <section className={`section-padding ${styles.section}`} id="croisiere">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={styles.title}>L'expérience</h2>
            <p className={`${styles.subtitle} mt-2`}>Ce qui rend nos croisières uniques</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={styles.card}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${styles.icon} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className={`${styles.cardTitle} mb-2`}>{feature.title}</h3>
                    <p className={styles.cardText}>{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Luxe: Elegant grid with glow effects
  if (variant === "luxe") {
    return (
      <section className={`section-padding ${styles.section}`} id="croisiere">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className={styles.subtitle}>L'expérience</p>
            <h2 className={`${styles.title} mt-4`}>
              Ce qui nous rend <span className="text-amber-400">uniques</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${styles.card} text-center group`}
              >
                <div className={`w-14 h-14 rounded-full ${styles.icon} flex items-center justify-center mx-auto mb-5`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className={`${styles.cardTitle} mb-3`}>{feature.title}</h3>
                <p className={styles.cardText}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Minimal: List layout
  if (variant === "minimal") {
    return (
      <section className={`section-padding ${styles.section}`} id="croisiere">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={styles.title}>L'expérience</h2>
          </motion.div>

          <div className="space-y-0">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${styles.card} flex items-center gap-6`}
              >
                <div className={`w-12 h-12 rounded-full ${styles.icon} flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={`${styles.cardText} mt-1`}>{feature.description}</p>
                </div>
                <span className="text-accent font-heading-orbitron text-2xl">0{index + 1}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Classic & Modern: Standard grid
  return (
    <section className={`section-padding ${styles.section}`} id="croisiere">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`${styles.title} mb-4`}>Une expérience unique</h2>
          <p className={styles.subtitle}>Découvrez ce qui rend nos croisières privées si spéciales</p>
        </motion.div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${variant === "modern" ? "lg:grid-cols-2 gap-4" : "lg:grid-cols-4 gap-6 lg:gap-8"}`}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className={`${styles.card} h-full ${variant === "modern" ? "flex items-start gap-4 text-left" : ""}`}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${styles.icon} ${variant === "modern" ? "flex-shrink-0 rounded-none" : "mb-5"} transition-colors duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className={`${styles.cardTitle} mb-3`}>{feature.title}</h3>
                  <p className={`${styles.cardText} leading-relaxed`}>{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button className="btn-gold" asChild>
            <Link href="/croisiere">
              La croisière en détail
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesVariants;
