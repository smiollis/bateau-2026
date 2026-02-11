import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { motion } from "framer-motion";
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
    id: "modern", 
    name: "Moderne", 
    description: "Michroma · Comme le logo actuel",
    preview: "bg-gradient-to-r from-primary to-accent"
  },
  { 
    id: "minimal", 
    name: "Épuré", 
    description: "Orbitron · Contemporain & Tech",
    preview: "bg-gradient-to-r from-gray-900 to-gray-700"
  },
  { 
    id: "editorial", 
    name: "Éditorial", 
    description: "Mise en page magazine asymétrique",
    preview: "bg-gradient-to-r from-amber-700 to-orange-500"
  },
  { 
    id: "luxe", 
    name: "Luxe", 
    description: "Dark mode · Ultra premium",
    preview: "bg-gradient-to-r from-black to-amber-900"
  },
  { 
    id: "nuit", 
    name: "Nuit", 
    description: "Classique · Bleu profond & Or",
    preview: "bg-gradient-to-r from-[#0a1628] to-[#1e3a8a]"
  },
];

const ThemeSwitcher = () => {
  const { variant, setVariant } = useThemeVariant();
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        <Palette className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      
      <div className="space-y-2">
        {themes.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => setVariant(theme.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
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
          </motion.button>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Cliquez pour prévisualiser chaque style
      </p>
    </motion.div>
  );
};

export default ThemeSwitcher;
