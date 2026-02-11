import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ruler, Users, Sun, Anchor, Shield, ArrowRight, Map } from "lucide-react";
import Link from "next/link";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import BoatImageSlideshow from "@/components/BoatImageSlideshow";

const highlights = [
  { icon: Ruler, title: "15 mètres", description: "Coque impeccable, entretien méticuleux" },
  { icon: Users, title: "Jusqu'à 12 passagers", description: "Pont principal de près de 10m² avec vue imprenable" },
  { icon: Sun, title: "Pont extérieur", description: "Vue panoramique sur les monuments parisiens" },
  { icon: Anchor, title: "Salon abrité", description: "Protection en cas de pluie, confort toute l'année" },
  { icon: Shield, title: "Maniabilité", description: "Proportions équilibrées, navigation aisée" },
];

const variantStyles: Record<ThemeVariant, {
  section: string;
  title: string;
  subtitle: string;
  text: string;
  highlight: string;
  highlightIcon: string;
  highlightTitle: string;
  highlightText: string;
  cta: string;
  badge: string;
  slideRounded: string;
  slideOverlay: string;
}> = {
  classic: {
    section: "bg-background",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary",
    subtitle: "text-accent font-heading text-lg",
    text: "text-muted-foreground text-lg leading-relaxed",
    highlight: "flex items-start gap-4",
    highlightIcon: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0",
    highlightTitle: "font-semibold text-primary",
    highlightText: "text-muted-foreground text-sm",
    cta: "btn-gold",
    badge: "bg-accent text-accent-foreground",
    slideRounded: "rounded-2xl",
    slideOverlay: "bg-gradient-to-t from-primary/30 to-transparent",
  },
  modern: {
    section: "bg-primary",
    title: "font-heading-michroma text-2xl md:text-3xl uppercase tracking-wider text-primary-foreground",
    subtitle: "text-accent font-heading-michroma uppercase tracking-wider text-sm",
    text: "text-primary-foreground/70 text-base",
    highlight: "flex items-start gap-4 border-l-4 border-accent pl-4",
    highlightIcon: "w-10 h-10 bg-accent flex items-center justify-center shrink-0",
    highlightTitle: "font-heading-michroma uppercase tracking-wide text-accent text-sm",
    highlightText: "text-primary-foreground/60 text-sm",
    cta: "bg-accent text-accent-foreground font-heading-michroma uppercase tracking-wider hover:bg-accent/90",
    badge: "bg-accent text-accent-foreground font-heading-michroma uppercase tracking-wider text-xs",
    slideRounded: "rounded-none",
    slideOverlay: "bg-primary/30",
  },
  minimal: {
    section: "bg-background",
    title: "font-heading-orbitron text-xl md:text-2xl uppercase tracking-widest text-foreground",
    subtitle: "text-accent font-heading-orbitron uppercase tracking-widest text-xs",
    text: "text-muted-foreground text-sm tracking-wide",
    highlight: "flex items-center gap-6 py-4 border-b border-border",
    highlightIcon: "w-10 h-10 border-2 border-accent rounded-full flex items-center justify-center shrink-0",
    highlightTitle: "font-heading-orbitron uppercase tracking-widest text-foreground text-sm",
    highlightText: "text-muted-foreground text-xs",
    cta: "bg-transparent border-2 border-accent text-accent font-heading-orbitron uppercase tracking-widest hover:bg-accent hover:text-accent-foreground",
    badge: "border-2 border-accent text-accent font-heading-orbitron uppercase tracking-wider text-xs",
    slideRounded: "rounded-none",
    slideOverlay: "bg-transparent",
  },
  editorial: {
    section: "bg-amber-50",
    title: "font-heading text-3xl md:text-4xl text-amber-900 italic",
    subtitle: "text-amber-700 font-heading italic",
    text: "text-amber-800/60 text-lg leading-relaxed",
    highlight: "flex items-start gap-4",
    highlightIcon: "w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0",
    highlightTitle: "font-heading text-amber-900 font-semibold",
    highlightText: "text-amber-700/60 text-sm",
    cta: "bg-amber-700 text-white hover:bg-amber-800",
    badge: "bg-amber-700 text-white",
    slideRounded: "rounded-3xl",
    slideOverlay: "bg-gradient-to-t from-amber-900/30 to-transparent",
  },
  luxe: {
    section: "bg-neutral-950",
    title: "text-3xl md:text-4xl font-light text-white tracking-tight",
    subtitle: "text-amber-400/60 uppercase tracking-[0.2em] text-sm",
    text: "text-white/50 text-base leading-relaxed",
    highlight: "flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-amber-400/10",
    highlightIcon: "w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shrink-0",
    highlightTitle: "text-white font-light tracking-wide",
    highlightText: "text-white/40 text-sm",
    cta: "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500",
    badge: "bg-gradient-to-r from-amber-500 to-amber-600 text-black",
    slideRounded: "rounded-2xl",
    slideOverlay: "bg-gradient-to-t from-black via-transparent to-transparent",
  },
  nuit: {
    section: "bg-[#0a1628]",
    title: "font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-100",
    subtitle: "text-accent font-heading text-lg",
    text: "text-blue-200/70 text-lg leading-relaxed",
    highlight: "flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-blue-400/10",
    highlightIcon: "w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0",
    highlightTitle: "font-semibold text-blue-100",
    highlightText: "text-blue-200/60 text-sm",
    cta: "btn-gold",
    badge: "bg-accent text-accent-foreground",
    slideRounded: "rounded-2xl",
    slideOverlay: "bg-gradient-to-t from-[#0a1628]/50 to-transparent",
  },
};

const BoatVariants = () => {
  const { variant } = useThemeVariant();
  const styles = variantStyles[variant];

  // Editorial: Full-width slideshow with overlapping content card
  if (variant === "editorial") {
    return (
      <section className={styles.section} id="bateau">
        <div className="relative">
          <BoatImageSlideshow
            className="w-full h-[50vh] lg:h-[70vh]"
            rounded="rounded-none"
            overlay={styles.slideOverlay}
          />
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative -mt-32 lg:-mt-48 bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-w-3xl"
            >
              <span className={`${styles.badge} px-4 py-1 rounded-full text-sm inline-block mb-4`}>Le Senang</span>
              <h2 className={`${styles.title} mb-4`}>Bienvenue sur le Senang</h2>
              <p className={`${styles.text} mb-8`}>
                Son entretien méticuleux et son état impeccable, tant au niveau de sa coque que de son habitacle 
                et de sa motorisation, en font une pièce unique voguant majestueusement sur la Seine. 
                Immersion dans l'élégance intemporelle associée à un confort moderne.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {highlights.slice(0, 4).map((item) => (
                  <div key={item.title} className={styles.highlight}>
                    <div className={styles.highlightIcon}>
                      <item.icon className="w-6 h-6 text-amber-700" />
                    </div>
                    <div>
                      <h3 className={styles.highlightTitle}>{item.title}</h3>
                      <p className={styles.highlightText}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white" asChild>
                  <Link href="/croisiere"><Map className="w-4 h-4 mr-2" /> La croisière en détail</Link>
                </Button>
                <Button className={styles.cta} asChild>
                  <Link href="/reservation">Réserver une croisière <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="h-16 lg:h-24 bg-amber-50" />
        </div>
      </section>
    );
  }

  // Luxe: Side-by-side with slideshow
  if (variant === "luxe") {
    return (
      <section className={`section-padding ${styles.section}`} id="bateau">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className={styles.subtitle}>Le Bateau</p>
              <h2 className={`${styles.title} mb-6 mt-2`}>
                Bienvenue sur le <span className="text-amber-400">Senang</span>
              </h2>
              <p className={`${styles.text} mb-8`}>
                Le Senang est à l'aise aussi bien en navigation côtière que sur les eaux intérieures. 
                Son entretien méticuleux en fait une pièce unique voguant majestueusement sur la Seine. 
                Pour accueillir ses hôtes dans des conditions optimales, le pont principal de près de 10m² 
                offre une vue imprenable sur Paris.
              </p>
              <div className="space-y-4 mb-8">
                {highlights.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={styles.highlight}
                  >
                    <div className={styles.highlightIcon}>
                      <item.icon className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className={styles.highlightTitle}>{item.title}</h3>
                      <p className={styles.highlightText}>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10" asChild>
                  <Link href="/croisiere"><Map className="w-4 h-4 mr-2" /> La croisière en détail</Link>
                </Button>
                <Button className={styles.cta} asChild>
                  <Link href="/reservation">Réserver une croisière <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <BoatImageSlideshow
                className="w-full h-[400px] lg:h-[500px]"
                rounded={styles.slideRounded}
                overlay={styles.slideOverlay}
              />
              <div className={`absolute bottom-6 left-6 ${styles.badge} px-6 py-3 rounded-lg z-10`}>
                <span className="font-semibold">Le Senang</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Default: Classic, Modern, Minimal
  return (
    <section className={`section-padding ${styles.section}`} id="bateau">
      <div className="container-custom">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${variant === "modern" ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <BoatImageSlideshow
              className="w-full h-[400px] lg:h-[500px]"
              rounded={styles.slideRounded}
              overlay={styles.slideOverlay}
            />
            <div className={`absolute -bottom-4 -right-4 md:bottom-8 md:right-8 ${styles.badge} px-6 py-3 ${variant === "modern" ? "rounded-none" : "rounded-xl"} shadow-lg z-10`}>
              <span className="font-heading text-lg font-semibold">Le Senang</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className={`${styles.subtitle} mb-2`}>Naviguez, vivez Paris autrement</p>
            <h2 className={`${styles.title} mb-6`}>Bienvenue sur le Senang</h2>
            <p className={`${styles.text} mb-8`}>
              Le Senang est à l'aise aussi bien en navigation côtière que sur les eaux intérieures. 
              Son entretien méticuleux et son état impeccable en font une pièce unique voguant 
              majestueusement sur la Seine. Le Senang est conçu pour offrir un confort absolu 
              et une expérience luxueuse et raffinée à bord.
            </p>

            <div className="space-y-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={styles.highlight}
                >
                  <div className={styles.highlightIcon}>
                    <item.icon className={`w-6 h-6 ${variant === "modern" ? "text-accent-foreground" : variant === "minimal" ? "text-accent" : variant === "nuit" ? "text-accent" : "text-primary"}`} />
                  </div>
                  <div>
                    <h3 className={`${styles.highlightTitle} mb-1`}>{item.title}</h3>
                    <p className={styles.highlightText}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="/croisiere"><Map className="w-4 h-4 mr-2" /> La croisière en détail</Link>
              </Button>
              <Button className={styles.cta} asChild>
                <Link href="/reservation">
                  Réserver une croisière
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BoatVariants;
