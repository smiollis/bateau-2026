"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
  it: "IT",
  de: "DE",
  "pt-BR": "PT",
};

const variantDropdownStyles: Record<ThemeVariant, {
  dropdown: string;
  option: string;
  optionActive: string;
}> = {
  classic: {
    dropdown: "bg-white border-border",
    option: "text-foreground/70 hover:text-primary",
    optionActive: "text-primary",
  },
  nuit: {
    dropdown: "bg-[#0a1628] border-gold/20",
    option: "text-blue-100/70 hover:text-accent",
    optionActive: "text-accent",
  },
};

interface LanguageSelectorProps {
  iconColor: string;
}

const LanguageSelector = ({ iconColor }: LanguageSelectorProps) => {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { variant } = useThemeVariant();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const dropdownStyles = variantDropdownStyles[variant];
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={langRef}>
      <button
        onClick={() => setLangOpen(!langOpen)}
        className={`flex items-center gap-1 text-sm ${iconColor} opacity-70 hover:opacity-100 transition-opacity`}
        aria-expanded={langOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        {localeLabels[locale] ?? locale.toUpperCase()}
        <ChevronDown className="w-3 h-3" />
      </button>
      <AnimatePresence>
        {langOpen && (
          <motion.ul
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
            transition={{ duration: prefersReducedMotion ? 0 : undefined }}
            role="listbox"
            className={`absolute top-full right-0 mt-2 py-1 rounded-lg shadow-lg border min-w-[100px] ${dropdownStyles.dropdown}`}
          >
            {locales.map((loc) => (
              <li key={loc}>
                <button
                  role="option"
                  aria-selected={locale === loc}
                  onClick={() => {
                    router.replace(pathname, { locale: loc });
                    setLangOpen(false);
                  }}
                  className={`w-full px-4 py-1.5 text-sm text-left transition-colors ${
                    locale === loc
                      ? "font-semibold " + dropdownStyles.optionActive
                      : dropdownStyles.option
                  }`}
                >
                  {localeLabels[loc]}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export { localeLabels };
export default LanguageSelector;
