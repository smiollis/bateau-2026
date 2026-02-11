import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-primary" id="temoignages">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {/* Google G Logo */}
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-primary-foreground/80 font-medium">Avis Google</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-4">
            Ce que disent nos passagers
          </h2>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-accent text-accent" />
            ))}
            <span className="ml-2 text-primary-foreground/80 font-medium">5.0 sur Google</span>
          </div>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-6 h-6 text-primary-foreground" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-6 h-6 text-primary-foreground" />
          </button>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-primary-foreground rounded-2xl p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                {/* Avatar */}
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                
                <div className="flex-grow">
                  <h4 className="font-semibold text-primary text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {testimonials[currentIndex].date}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-foreground/80 text-lg leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 bg-accent"
                    : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
                }`}
                aria-label={`Voir avis ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;