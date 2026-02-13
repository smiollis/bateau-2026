"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Globe, Sun, Moon, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import logo from "@/assets/logo.png";

const localeLabels: Record<string, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
  it: "IT",
  de: "DE",
  "pt-BR": "PT",
};

const variantStyles: Record<ThemeVariant, {
  header: string;
  logoClass: string;
  nav: string;
  cta: string;
  mobileMenuBg: string;
  iconColor: string;
}> = {
  classic: {
    header: "bg-white/95 backdrop-blur-md border-b border-border",
    logoClass: "h-14 md:h-16 w-auto",
    nav: "text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200",
    cta: "btn-gold text-white",
    mobileMenuBg: "bg-background",
    iconColor: "text-primary",
  },
  nuit: {
    header: "bg-[#0a1628]/95 backdrop-blur-md border-b border-gold/20",
    logoClass: "h-14 md:h-16 w-auto brightness-0 invert",
    nav: "text-sm font-medium text-blue-100/80 hover:text-accent transition-colors duration-200",
    cta: "btn-gold text-white",
    mobileMenuBg: "bg-[#0a1628]",
    iconColor: "text-accent",
  },
};

const HeaderVariants = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { variant, setVariant } = useThemeVariant();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const styles = variantStyles[variant];
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locale = useLocale();

  const navItems = [
    { label: t("croisiere"), href: "/#croisiere" },
    { label: t("bateau"), href: "/#bateau" },
    { label: t("galerie"), href: "/galerie" },
    { label: t("tarifs"), href: "/#tarifs" },
    { label: t("actualites"), href: "/actualites" },
    { label: t("contact"), href: "/#contact" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/");
        let attempts = 0;
        const interval = setInterval(() => {
          const el = document.getElementById(id);
          attempts++;
          if (el) {
            clearInterval(interval);
            el.scrollIntoView({ behavior: "smooth" });
          } else if (attempts >= 60) {
            clearInterval(interval);
          }
        }, 50);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${styles.header}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        {t("skipToContent")}
      </a>
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label={t("mainNav")}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Un Bateau à Paris"
              className={styles.logoClass}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={styles.nav}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switch */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1 text-sm ${styles.iconColor} opacity-70 hover:opacity-100 transition-opacity`}
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
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    role="listbox"
                    className={`absolute top-full right-0 mt-2 py-1 rounded-lg shadow-lg border min-w-[100px] ${
                      variant === "nuit"
                        ? "bg-[#0a1628] border-gold/20"
                        : "bg-white border-border"
                    }`}
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
                              ? "font-semibold " + styles.iconColor
                              : variant === "nuit"
                                ? "text-blue-100/70 hover:text-accent"
                                : "text-foreground/70 hover:text-primary"
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

            {/* Day/Night Toggle */}
            <button
              onClick={() => setVariant(variant === "nuit" ? "classic" : "nuit")}
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                variant === "nuit"
                  ? "bg-accent/20 text-accent hover:bg-accent/30"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
              aria-label={variant === "nuit" ? t("dayMode") : t("nightMode")}
              title={variant === "nuit" ? t("dayMode") : t("nightMode")}
            >
              {variant === "nuit" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA Button */}
            <Button className={styles.cta} onClick={() => router.push("/reservation")}>
              {t("reservation")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t("toggleMenu")}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${styles.iconColor}`} />
            ) : (
              <Menu className={`w-6 h-6 ${styles.iconColor}`} />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-nav"
            className={`lg:hidden ${styles.mobileMenuBg} border-b border-border`}
          >
            <div className="container-custom py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { handleNavClick(item.href); setIsOpen(false); }}
                  className={`block py-2 ${styles.nav}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    {locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { router.replace(pathname, { locale: loc }); setIsOpen(false); }}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          locale === loc
                            ? "font-bold " + styles.iconColor
                            : variant === "nuit"
                              ? "text-blue-100/60 hover:text-accent"
                              : "text-foreground/60 hover:text-primary"
                        }`}
                      >
                        {localeLabels[loc]}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setVariant(variant === "nuit" ? "classic" : "nuit")}
                    className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                      variant === "nuit"
                        ? "bg-accent/20 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                    aria-label={variant === "nuit" ? t("dayMode") : t("nightMode")}
                  >
                    {variant === "nuit" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>
                <Button className={styles.cta} onClick={() => router.push("/reservation")}>
                  {t("reservation")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderVariants;
