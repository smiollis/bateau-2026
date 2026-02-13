"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface LandingCTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

const LandingCTA = ({
  title = "Pret a embarquer ?",
  subtitle = "Reservez votre croisiere privee sur la Seine en quelques clics.",
  ctaText = "Reserver maintenant",
  ctaHref = "/reservation",
}: LandingCTAProps) => (
  <section className="section-padding bg-primary text-white">
    <div className="container-custom text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-3xl md:text-4xl font-semibold mb-4"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button asChild size="lg" className="btn-gold text-white text-lg px-8">
          <Link href={ctaHref}>{ctaText}</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
          <a href="tel:+33670342543">
            <Phone className="w-4 h-4 mr-2" />
            06 70 34 25 43
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default LandingCTA;
