import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import bateau1 from "@/assets/bateau-1.jpg";
import bateau2 from "@/assets/bateau-2.jpg";
import bateau3 from "@/assets/bateau-3.jpg";
import bateau4 from "@/assets/bateau-4.jpg";

const images = [
  { src: bateau1, alt: "Le Senang sous un pont parisien" },
  { src: bateau2, alt: "Le Senang naviguant sur la Seine au crépuscule" },
  { src: bateau3, alt: "Le Senang sur la Seine avec Paris en arrière-plan" },
  { src: bateau4, alt: "Vue aérienne du Senang avec ses passagers" },
];

interface BoatImageSlideshowProps {
  className?: string;
  interval?: number;
  rounded?: string;
  overlay?: string;
}

const BoatImageSlideshow = ({
  className = "w-full h-[400px] lg:h-[500px]",
  interval = 5000,
  rounded = "rounded-2xl",
  overlay = "bg-gradient-to-t from-black/30 to-transparent",
}: BoatImageSlideshowProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current].src}
          alt={images[current].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className={`absolute inset-0 ${overlay}`} />
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BoatImageSlideshow;
