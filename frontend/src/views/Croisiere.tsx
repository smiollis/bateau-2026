"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useThemeVariant } from "@/contexts/ThemeVariantContext";
import HeaderVariants from "@/components/HeaderVariants";
import FooterVariants from "@/components/FooterVariants";

import fond2 from "@/assets/map/fond2.webp";
import metroIconImport from "@/assets/map/metro.png";
const metroIcon = typeof metroIconImport === 'string' ? metroIconImport : metroIconImport.src;
import trocadero from "@/assets/map/trocadero.svg";
import tourEiffel from "@/assets/map/tour-eiffel.svg";
import invalides from "@/assets/map/invalides.svg";
import assemblee from "@/assets/map/assemblee.svg";
import orsay from "@/assets/map/orsay.svg";
import louvre from "@/assets/map/louvre.svg";
import notreDame from "@/assets/map/notre-dame.svg";
import hotelDeVille from "@/assets/map/hotel-de-ville.svg";
import liberte from "@/assets/map/liberte.svg";

const getSrc = (img: string | { src: string }) => typeof img === 'string' ? img : img.src;

interface Landmark {
  id: string;
  name: string;
  icon: string;
  description: string;
  top: string;
  left: string;
  width: string;
  tooltipSide: "top" | "bottom" | "left" | "right";
}

const landmarks: Landmark[] = [
  {
    id: "liberte",
    name: "Statue de la Liberté",
    icon: getSrc(liberte),
    description: "Réplique de la statue offerte par les États-Unis, point de départ de votre croisière.",
    top: "62%",
    left: "2.3%",
    width: "30px",
    tooltipSide: "right",
  },
  {
    id: "trocadero",
    name: "Trocadéro",
    icon: getSrc(trocadero),
    description: "Palais de Chaillot et ses jardins, une vue imprenable sur la Tour Eiffel.",
    top: "32%",
    left: "10%",
    width: "80px",
    tooltipSide: "bottom",
  },
  {
    id: "tour-eiffel",
    name: "Tour Eiffel",
    icon: getSrc(tourEiffel),
    description: "Le monument le plus emblématique de Paris, illuminé la nuit pour un spectacle inoubliable.",
    top: "34%",
    left: "20%",
    width: "30px",
    tooltipSide: "right",
  },
  {
    id: "invalides",
    name: "Invalides",
    icon: getSrc(invalides),
    description: "Le Dôme doré des Invalides abrite le tombeau de Napoléon Bonaparte.",
    top: "40%",
    left: "35%",
    width: "40px",
    tooltipSide: "bottom",
  },
  {
    id: "assemblee",
    name: "Assemblée Nationale",
    icon: getSrc(assemblee),
    description: "Palais Bourbon, siège de l'Assemblée nationale française depuis 1798.",
    top: "34%",
    left: "40%",
    width: "65px",
    tooltipSide: "top",
  },
  {
    id: "orsay",
    name: "Musée d'Orsay",
    icon: getSrc(orsay),
    description: "Ancienne gare reconvertie en musée, abritant la plus grande collection d'art impressionniste au monde.",
    top: "44%",
    left: "51%",
    width: "65px",
    tooltipSide: "bottom",
  },
  {
    id: "louvre",
    name: "Louvre",
    icon: getSrc(louvre),
    description: "Le plus grand musée du monde et sa célèbre pyramide de verre.",
    top: "29%",
    left: "55%",
    width: "45px",
    tooltipSide: "top",
  },
  {
    id: "notre-dame",
    name: "Notre-Dame",
    icon: getSrc(notreDame),
    description: "Cathédrale gothique emblématique, restaurée après l'incendie de 2019.",
    top: "43%",
    left: "70%",
    width: "50px",
    tooltipSide: "bottom",
  },
  {
    id: "hotel-de-ville",
    name: "Hôtel de Ville",
    icon: getSrc(hotelDeVille),
    description: "Siège de la municipalité parisienne, chef-d'œuvre de l'architecture néo-Renaissance.",
    top: "47%",
    left: "81%",
    width: "60px",
    tooltipSide: "top",
  },
];

const itinerarySteps = [
  { time: "Départ", label: "Port de Javel (15ème)", detail: "Embarquement et accueil à bord du Senang" },
  { time: "10 min", label: "Statue de la Liberté", detail: "Réplique parisienne sur l'Île aux Cygnes" },
  { time: "15 min", label: "Tour Eiffel & Trocadéro", detail: "Le monument iconique vu depuis la Seine" },
  { time: "25 min", label: "Invalides & Assemblée Nationale", detail: "Le Dôme doré et le Palais Bourbon" },
  { time: "35 min", label: "Musée d'Orsay", detail: "L'ancienne gare devenue temple de l'impressionnisme" },
  { time: "45 min", label: "Le Louvre", detail: "La pyramide de verre et le Pont des Arts" },
  { time: "55 min", label: "Notre-Dame & Hôtel de Ville", detail: "Le cœur historique de Paris" },
  { time: "1h15", label: "Demi-tour & retour", detail: "Retour par la rive opposée pour de nouvelles perspectives" },
  { time: "2h", label: "Retour au port", detail: "Fin de la croisière au Port de Javel" },
];

const Croisiere = () => {
  const [activeLandmark, setActiveLandmark] = useState<string | null>(null);
  const { isDark } = useThemeVariant();

  return (
    <div className="min-h-screen bg-background">
      <HeaderVariants />

      {/* Page header */}
      <div className={`py-6 pt-24 ${isDark ? "bg-[#0a1628] text-blue-100" : "bg-primary text-primary-foreground"}`}>
        <div className="container-custom">
          <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? "text-blue-200/70 hover:text-blue-100" : "text-primary-foreground/70 hover:text-primary-foreground"} transition-colors mb-4`}>
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold">
            L'Itinéraire de la Croisière
          </h1>
          <p className={`text-lg mt-2 max-w-2xl ${isDark ? "text-blue-200/70" : "text-primary-foreground/70"}`}>
            2 heures de navigation au cœur de Paris, entre monuments emblématiques et perspectives uniques sur la Seine.
          </p>
        </div>
      </div>

      {/* Interactive Map - Full Width */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-8 px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-2">
            La Carte du Parcours
          </h2>
          <p className="text-muted-foreground">Cliquez sur un monument pour en savoir plus</p>
        </div>

        {/* Map Container - Full Width */}
        <div className="relative w-full overflow-hidden">
          <img
            src={typeof fond2 === 'string' ? fond2 : fond2.src}
            alt="Carte de l'itinéraire de la croisière sur la Seine"
            className="w-full h-auto block"
          />

          {/* Landmark hotspots */}
          {landmarks.map((landmark, index) => (
            <motion.div
              key={landmark.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 200 }}
              className="absolute cursor-pointer group"
              style={{ top: landmark.top, left: landmark.left }}
              onClick={() => setActiveLandmark(activeLandmark === landmark.id ? null : landmark.id)}
            >
              <motion.img
                src={landmark.icon}
                alt={landmark.name}
                style={{ width: landmark.width }}
                className="drop-shadow-lg transition-transform duration-300 hover:scale-110"
                whileHover={{ y: -5 }}
              />

              <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 whitespace-nowrap">
                <span className="text-[8px] md:text-xs font-bold text-primary bg-white/90 px-1.5 py-0.5 rounded shadow-sm">
                  {landmark.name}
                </span>
              </div>

              <AnimatePresence>
                {activeLandmark === landmark.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className={`absolute z-50 w-56 rounded-xl shadow-2xl border p-4 ${
                      isDark ? "bg-[#0d1d35] border-blue-400/20 text-blue-100" : "bg-white border-border"
                    } ${
                      landmark.tooltipSide === "top" ? "bottom-full mb-8 left-1/2 -translate-x-1/2" :
                      landmark.tooltipSide === "bottom" ? "top-full mt-8 left-1/2 -translate-x-1/2" :
                      landmark.tooltipSide === "left" ? "right-full mr-4 top-1/2 -translate-y-1/2" :
                      "left-full ml-4 top-1/2 -translate-y-1/2"
                    }`}
                  >
                    <h3 className={`font-heading text-sm font-semibold mb-1 ${isDark ? "text-accent" : "text-primary"}`}>{landmark.name}</h3>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-blue-200/70" : "text-muted-foreground"}`}>{landmark.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Metro Bastille */}
          <motion.a
            href="https://www.google.com/maps/@48.8515009,2.3687565,3a,75y,349.11h,79.12t/data=!3m6!1e1!3m4!1s7r6mIOhANE3SwkssTly2vw!2e0!7i16384!8i8192?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
            className="absolute cursor-pointer group"
            style={{ top: "52%", left: "92%" }}
            title="Métro Bastille — Lieu d'embarquement"
          >
            <div className="relative">
              <img src={metroIcon} alt="Métro Bastille" className="w-6 h-6 md:w-8 md:h-8 drop-shadow-lg" />
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 whitespace-nowrap">
                <span className="text-[8px] md:text-xs font-bold text-primary bg-white/90 px-1.5 py-0.5 rounded shadow-sm">
                  Bastille
                </span>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className={`py-12 md:py-16 ${isDark ? "bg-[#0d1d35]" : "bg-secondary/30"}`}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-primary mb-2">
              Le Déroulé de la Croisière
            </h2>
            <p className="text-muted-foreground">2 heures de navigation commentée</p>
          </div>

          <div className="max-w-2xl mx-auto">
            {itinerarySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4 mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    index === 0 || index === itinerarySteps.length - 1
                      ? "bg-accent text-accent-foreground"
                      : isDark ? "bg-white/10 text-accent" : "bg-primary/10 text-primary"
                  }`}>
                    {index === 0 || index === itinerarySteps.length - 1 ? (
                      <Ship className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>
                  {index < itinerarySteps.length - 1 && (
                    <div className={`w-0.5 h-16 ${isDark ? "bg-blue-400/20" : "bg-border"}`} />
                  )}
                </div>

                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-accent flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.time}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-primary">{step.label}</h3>
                  <p className="text-muted-foreground text-sm">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 text-center ${isDark ? "bg-[#0a1628] text-blue-100" : "bg-primary text-primary-foreground"}`}>
        <div className="container-custom">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
            Prêt à embarquer ?
          </h2>
          <p className={`mb-8 max-w-xl mx-auto ${isDark ? "text-blue-200/70" : "text-primary-foreground/70"}`}>
            Réservez votre croisière privée et découvrez Paris comme vous ne l'avez jamais vu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-gold" size="lg" asChild>
              <Link href="/reservation">Réserver ma croisière</Link>
            </Button>
            <Button variant="outline" size="lg" className={`${isDark ? "border-blue-300/30 text-blue-100 hover:bg-white/10" : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"}`} asChild>
              <Link href="/#tarifs">Voir les tarifs</Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterVariants />
    </div>
  );
};

export default Croisiere;
