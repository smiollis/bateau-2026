"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";

const offers = [
  {
    title: "Formule Découverte",
    price: 420,
    description: "L&apos;essentiel pour découvrir Paris depuis la Seine",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "2h de croisière privée",
      "Jusqu&apos;à 12 personnes",
      "Commentaires du capitaine",
      "Musique d&apos;ambiance",
    ],
    popular: false,
  },
  {
    title: "Formule Champagne",
    price: 480,
    description: "Ajoutez une touche de célébration à votre croisière",
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "2h de croisière privée",
      "Jusqu&apos;à 12 personnes",
      "Bouteille de champagne",
      "Verrines apéritives",
    ],
    popular: true,
  },
  {
    title: "Formule Premium",
    price: 600,
    description: "L&apos;expérience complète pour les gourmets",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "2h de croisière privée",
      "Jusqu&apos;à 12 personnes",
      "Champagne premium",
      "Planches charcuterie & fromages",
    ],
    popular: false,
  },
  {
    title: "Croisière Guidée",
    price: 600,
    description: "Découvrez l&apos;histoire de Paris avec un guide expert",
    image: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    features: [
      "2h de croisière privée",
      "Jusqu&apos;à 12 personnes",
      "Guide historique diplômé",
      "Anecdotes exclusives",
    ],
    popular: false,
  },
];

const Offers = () => {
  return (
    <section className="section-padding bg-secondary/30" id="tarifs">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4">
            Nos Formules
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choisissez l&apos;expérience qui vous correspond
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`bg-card rounded-2xl overflow-hidden border card-hover h-full flex flex-col ${offer.popular ? 'border-accent ring-2 ring-accent' : 'border-border'}`}>
                {/* Popular Badge */}
                {offer.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Populaire
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {offer.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-primary">{offer.price}€</span>
                    <span className="text-muted-foreground text-sm ml-1">/ croisière</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-grow">
                    {offer.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    className={offer.popular ? 'btn-gold text-white w-full' : 'w-full'}
                    variant={offer.popular ? 'default' : 'outline'}
                    asChild
                  >
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

export default Offers;