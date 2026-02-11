import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown, Anchor, Ship, Waves, ArrowRight } from "lucide-react";
import HeroCinemaSlideshow from "@/components/HeroCinemaSlideshow";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import Link from "next/link";

const HeroVariants = () => {
  const { variant } = useThemeVariant();

  // Editorial: Split screen layout
  if (variant === "editorial") {
    return (
      <section className="min-h-screen grid lg:grid-cols-2">
        {/* Left: Content */}
        <div className="flex items-center justify-center p-8 lg:p-16 bg-amber-50 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-700" />
              <span className="text-amber-700 text-sm uppercase tracking-widest">Croisière Privée</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-amber-900 mb-6 leading-tight">
              Naviguez,
              <br />
              <span className="italic">vivez Paris</span>
              <br />
              autrement
            </h1>
            
            <p className="text-amber-800/70 text-lg mb-8 leading-relaxed">
              Une expérience unique sur la Seine. Découvrez Paris depuis l'eau, 
              au fil des monuments emblématiques.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="bg-amber-700 text-white hover:bg-amber-800 px-8 py-6 h-auto text-base" asChild>
                <Link href="/reservation">
                  Réserver
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-amber-700">
                <span className="text-2xl font-heading font-bold">420€</span>
                <span className="text-sm text-amber-600">jusqu'à 12 pers.</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-amber-700/60">
              <span>2h de croisière</span>
              <span>•</span>
              <span>Tour Eiffel</span>
              <span>•</span>
              <span>Notre-Dame</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-[50vh] lg:min-h-screen order-1 lg:order-2"
        >
          <img
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Paris Seine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 to-transparent" />
        </motion.div>
      </section>
    );
  }

  // Luxe: Dark premium with full-screen video effect
  if (variant === "luxe") {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Paris at night"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"
            />

            <p className="text-amber-400/80 uppercase tracking-[0.3em] text-sm mb-6">
              Croisière Privée sur la Seine
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-8xl text-white font-light tracking-tight mb-8">
              <span className="block">Un Bateau</span>
              <span className="block text-amber-400 font-heading italic">à Paris</span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="w-48 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mb-10"
            />

            <p className="text-white/60 text-lg max-w-xl mx-auto mb-12">
              Une expérience exclusive au cœur de Paris
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold px-12 py-6 h-auto text-base hover:from-amber-400 hover:to-amber-500" asChild>
                <Link href="/reservation">Réserver Maintenant</Link>
              </Button>
              <div className="text-white/80">
                <span className="text-3xl font-light text-amber-400">420€</span>
                <span className="ml-2 text-white/50">/ 12 personnes</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              {[
                { value: "2h", label: "Croisière" },
                { value: "12", label: "Personnes" },
                { value: "∞", label: "Souvenirs" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl text-amber-400 font-light">{stat.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6 text-amber-400/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Classic, Modern, Minimal variants
  const variantConfig: Record<"classic" | "modern" | "minimal" | "nuit", {
    titleClass: string;
    subtitleClass: string;
    overlayClass: string;
    layout: "centered" | "left";
  }> = {
    classic: {
      titleClass: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight",
      subtitleClass: "text-lg md:text-xl text-primary-foreground/90",
      overlayClass: "bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70",
      layout: "centered",
    },
    modern: {
      titleClass: "font-heading-michroma text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider leading-tight",
      subtitleClass: "text-base md:text-lg text-primary-foreground/80 font-heading-michroma tracking-wide",
      overlayClass: "bg-gradient-to-r from-primary/90 via-primary/70 to-transparent",
      layout: "left",
    },
    minimal: {
      titleClass: "font-heading-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest leading-relaxed",
      subtitleClass: "text-sm md:text-base text-primary-foreground/70 font-heading-orbitron tracking-wider uppercase",
      overlayClass: "bg-primary/80",
      layout: "centered",
    },
    nuit: {
      titleClass: "font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white",
      subtitleClass: "text-lg md:text-xl text-blue-200/90",
      overlayClass: "bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/50 to-[#0a1628]/80",
      layout: "centered",
    },
  };

  const config = variantConfig[variant as "classic" | "modern" | "minimal" | "nuit"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroCinemaSlideshow />
      <div className={`absolute inset-0 z-[1] ${config.overlayClass}`} />

      {/* Content */}
      <div className={`relative z-10 container-custom text-primary-foreground ${
        config.layout === "left" ? "text-left" : "text-center"
      }`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={config.layout === "left" ? "max-w-2xl" : "max-w-4xl mx-auto"}
        >
          {/* Badge - Classic & Nuit */}
          {(variant === "classic" || variant === "nuit") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span>Croisière privée sur la Seine</span>
            </motion.div>
          )}

          {/* Modern: Icon accent */}
          {variant === "modern" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-16 h-0.5 bg-accent" />
              <Ship className="w-6 h-6 text-accent" />
            </motion.div>
          )}

          {/* Minimal: Top line */}
          {variant === "minimal" && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px bg-primary-foreground/30 mb-8 origin-left max-w-xs mx-auto"
            />
          )}

          {/* Main Title */}
          <h1 className={`${config.titleClass} mb-6`}>
            {(variant === "classic" || variant === "nuit") ? (
              <>
                Naviguez, vivez Paris
                <br />
                <span className="italic text-accent">autrement !</span>
              </>
            ) : variant === "modern" ? (
              <>
                <span className="text-accent">Un Bateau</span>
                <br />
                à Paris
              </>
            ) : (
              <>
                Croisière
                <br />
                <span className="text-accent">Privée</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className={`${config.subtitleClass} max-w-2xl ${config.layout !== "left" ? "mx-auto" : ""} mb-8`}>
            {(variant === "classic" || variant === "nuit")
              ? "Embarquez pour une expérience unique sur la Seine. Découvrez Paris depuis l'eau, au fil des monuments emblématiques, en toute intimité."
              : variant === "modern"
              ? "Croisières privées sur la Seine · Paris"
              : "Seine · Paris · 12 personnes"
            }
          </p>

          {/* Price Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-6 py-3 mb-10 ${
              variant === "nuit"
                ? "bg-white/10 border border-white/30"
                : "bg-background/10 border border-primary-foreground/20"
            }`}
          >
            <span className={variant === "nuit" ? "text-white/90" : "text-primary-foreground/80"}>À partir de</span>
            <span className={`${variant === "modern" ? "font-heading-michroma" : variant === "minimal" ? "font-heading-orbitron" : ""} text-2xl font-bold text-accent`}>
              420€
            </span>
            <span className={variant === "nuit" ? "text-white/90" : "text-primary-foreground/80"}>· jusqu'à 12 personnes</span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button className={
              variant === "modern" 
                ? "bg-accent text-accent-foreground font-heading-michroma uppercase tracking-widest text-sm px-12 py-6 h-auto hover:bg-accent/90"
                : variant === "minimal"
                ? "bg-transparent border-2 border-accent text-accent font-heading-orbitron uppercase tracking-widest text-sm px-12 py-6 h-auto hover:bg-accent hover:text-accent-foreground"
                : "btn-gold text-lg px-10 py-6 h-auto"
            } asChild>
              <Link href="/reservation">{variant === "minimal" ? "Réserver" : "Réserver votre croisière"}</Link>
            </Button>
          </motion.div>

          {/* Modern: Bottom accent line */}
          {variant === "modern" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center gap-3 mt-12"
            >
              <Anchor className="w-5 h-5 text-accent" />
              <div className="w-24 h-0.5 bg-accent/50" />
            </motion.div>
          )}
        </motion.div>

      </div>

      {/* Scroll Indicator - outside content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroVariants;
