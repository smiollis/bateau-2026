import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Paris Seine river with Eiffel Tower"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <span>Croisière privée sur la Seine</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6">
            Naviguez, vivez Paris
            <br />
            <span className="italic text-accent">autrement !</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Embarquez pour une expérience unique sur la Seine. Découvrez Paris depuis l'eau, 
            au fil des monuments emblématiques, en toute intimité.
          </p>

          {/* Price Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-flex items-center gap-3 bg-background/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-6 py-3 mb-10"
          >
            <span className="text-primary-foreground/80">À partir de</span>
            <span className="text-2xl font-bold text-accent">420€</span>
            <span className="text-primary-foreground/80">· jusqu'à 12 personnes</span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button className="btn-gold text-lg px-10 py-6 h-auto" asChild>
              <Link href="/reservation">Réserver votre croisière</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;