"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ruler, Sofa, Sun, ArrowRight } from "lucide-react";

const highlights = [
  {
    icon: Ruler,
    title: "15 mètres",
    description: "Un bateau de caractère spacieux et confortable",
  },
  {
    icon: Sofa,
    title: "Salon intérieur",
    description: "Espace chauffé et climatisé toute l'année",
  },
  {
    icon: Sun,
    title: "Pont extérieur",
    description: "Vue panoramique sur les monuments parisiens",
  },
];

const Boat = () => {
  return (
    <section className="section-padding bg-background" id="bateau">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Le Senang - Bateau de croisière privée"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg">
              <span className="font-heading text-lg font-semibold">Le Senang</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-6">
              Découvrez le Senang
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Notre bateau de caractère vous accueille pour une expérience unique sur la Seine. 
              Avec son salon intérieur chaleureux et son pont extérieur panoramique, 
              le Senang offre le cadre idéal pour vos moments privilégiés.
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Button variant="outline" className="group">
              Découvrir le bateau
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Boat;