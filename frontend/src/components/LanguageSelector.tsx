"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
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

const localeFlags: Record<string, string> = {
  fr: "\u{1F1EB}\u{1F1F7}",
  en: "\u{1F1EC}\u{1F1E7}",
  es: "\u{1F1EA}\u{1F1F8}",
  it: "\u{1F1EE}\u{1F1F9}",
  de: "\u{1F1E9}\u{1F1EA}",
  "pt-BR": "\u{1F1E7}\u{1F1F7}",
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
    dropdown: "bg-nuit-900 border-gold/20",
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
        className={`flex items-center gap-1 text-sm ${iconColor} opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm`}
        aria-expanded={langOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base leading-none">{localeFlags[locale]}</span>
        {localeLabels[locale] ?? locale.toUpperCase()}
        <ChevronDown className="w-3 h-3" />
      </button>
      <AnimatePresence>
        {langOpen && (
          <m.ul
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
                  className={`w-full px-4 py-1.5 text-sm text-left transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    locale === loc
                      ? "font-semibold " + dropdownStyles.optionActive
                      : dropdownStyles.option
                  }`}
                >
                  <span className="text-base leading-none">{localeFlags[loc]}</span>
                  {localeLabels[loc]}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export { localeLabels, localeFlags };
export default LanguageSelector;
