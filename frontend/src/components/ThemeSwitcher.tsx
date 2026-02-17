"use client";

import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { m, useReducedMotion } from "framer-motion";
import { Palette, X } from "lucide-react";
import { useState } from "react";

const themes: { id: ThemeVariant; name: string; description: string; preview: string }[] = [
  {
    id: "classic",
    name: "Classique",
    description: "Playfair Display · Élégant & Intemporel",
    preview: "bg-gradient-to-r from-primary to-primary/80"
  },
  {
    id: "nuit",
    name: "Nuit",
    description: "Classique · Bleu profond & Or",
    preview: "bg-gradient-to-r from-nuit-900 to-[#1e3a8a]"
  },
];

const ThemeSwitcher = () => {
  const { variant, setVariant } = useThemeVariant();
  const [isOpen, setIsOpen] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  if (!isOpen) {
    return (
      <m.button
        initial={{ scale: prefersReducedMotion ? 1 : 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : undefined }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Ouvrir le sélecteur de thème"
      >
        <Palette className="w-6 h-6" />
      </m.button>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : undefined }}
      className="fixed bottom-6 left-6 z-50 bg-card/98 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-2xl w-80"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <p className="text-sm font-semibold text-foreground">
            Variantes de design
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
          aria-label="Fermer le sélecteur de thème"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-2">
        {themes.map((theme) => (
          <m.button
            key={theme.id}
            onClick={() => setVariant(theme.id)}
            whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
              variant === theme.id
                ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                : "bg-secondary/50 hover:bg-secondary text-foreground"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg ${theme.preview} flex-shrink-0`} />
            <div className="flex-grow min-w-0">
              <span className="font-semibold block text-sm">{theme.name}</span>
              <span className={`text-xs truncate block ${variant === theme.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {theme.description}
              </span>
            </div>
          </m.button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Cliquez pour prévisualiser chaque style
      </p>
    </m.div>
  );
};

export default ThemeSwitcher;
