import { useState } from "react";
import { Menu, X, Globe, Anchor, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "La Croisière", href: "/#croisiere" },
  { label: "Le Bateau", href: "/#bateau" },
  { label: "Galerie", href: "/galerie" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/#contact" },
];

const variantStyles: Record<ThemeVariant, {
  header: string;
  logoClass: string;
  logoSrc: string;
  nav: string;
  cta: string;
  mobileMenuBg: string;
  iconColor: string;
}> = {
  classic: {
    header: "bg-white/95 backdrop-blur-md border-b border-border",
    logoClass: "h-14 md:h-16 w-auto",
    logoSrc: logo,
    nav: "text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200",
    cta: "btn-gold",
    mobileMenuBg: "bg-background",
    iconColor: "text-primary",
  },
  modern: {
    header: "bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10",
    logoClass: "h-14 md:h-16 w-auto brightness-0 invert",
    logoSrc: logo,
    nav: "text-xs font-heading-michroma uppercase tracking-wider text-primary-foreground/80 hover:text-accent transition-colors duration-200",
    cta: "bg-accent text-accent-foreground font-heading-michroma uppercase text-xs tracking-wider hover:bg-accent/90",
    mobileMenuBg: "bg-primary",
    iconColor: "text-primary-foreground",
  },
  minimal: {
    header: "bg-background border-b-2 border-primary",
    logoClass: "h-14 md:h-16 w-auto",
    logoSrc: logo,
    nav: "text-xs font-heading-orbitron uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors duration-200",
    cta: "bg-transparent border-2 border-accent text-accent font-heading-orbitron uppercase text-xs tracking-wider hover:bg-accent hover:text-accent-foreground",
    mobileMenuBg: "bg-background",
    iconColor: "text-primary",
  },
  editorial: {
    header: "bg-amber-50 border-b border-amber-200",
    logoClass: "h-14 md:h-16 w-auto",
    logoSrc: logo,
    nav: "text-sm font-medium text-amber-900/80 hover:text-amber-700 transition-colors duration-200 italic",
    cta: "bg-amber-700 text-white hover:bg-amber-800",
    mobileMenuBg: "bg-amber-50",
    iconColor: "text-amber-700",
  },
  luxe: {
    header: "bg-black/95 backdrop-blur-md border-b border-amber-500/20",
    logoClass: "h-14 md:h-16 w-auto brightness-0 invert",
    logoSrc: logo,
    nav: "text-xs uppercase tracking-[0.2em] text-amber-100/70 hover:text-amber-400 transition-colors duration-200",
    cta: "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-400 hover:to-amber-500",
    mobileMenuBg: "bg-black",
    iconColor: "text-amber-400",
  },
  nuit: {
    header: "bg-[#0a1628]/95 backdrop-blur-md border-b border-gold/20",
    logoClass: "h-14 md:h-16 w-auto brightness-0 invert",
    logoSrc: logo,
    nav: "text-sm font-medium text-blue-100/80 hover:text-accent transition-colors duration-200",
    cta: "btn-gold",
    mobileMenuBg: "bg-[#0a1628]",
    iconColor: "text-accent",
  },
};

const HeaderVariants = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"FR" | "EN">("FR");
  const { variant, setVariant } = useThemeVariant();
  const styles = variantStyles[variant];
  const navigate = useNavigate();
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/" , { state: { scrollTo: id } });
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${styles.header}`}>
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            {variant === "editorial" ? (
              <div className="flex items-center gap-2">
                <Anchor className="w-8 h-8 text-amber-700" />
                <span className="font-heading text-xl md:text-2xl text-amber-900 italic">Un Bateau à Paris</span>
              </div>
            ) : (
              <img 
                src={styles.logoSrc} 
                alt="Un Bateau à Paris" 
                className={styles.logoClass}
              />
            )}
          </a>

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
            <button
              onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
              className={`flex items-center gap-1 text-sm ${styles.iconColor} opacity-70 hover:opacity-100 transition-opacity`}
            >
              <Globe className="w-4 h-4" />
              {lang}
            </button>

            {/* Day/Night Toggle */}
            <button
              onClick={() => setVariant(variant === "nuit" ? "classic" : "nuit")}
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                variant === "nuit"
                  ? "bg-accent/20 text-accent hover:bg-accent/30"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
              aria-label={variant === "nuit" ? "Mode jour" : "Mode nuit"}
              title={variant === "nuit" ? "Mode jour" : "Mode nuit"}
            >
              {variant === "nuit" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA Button */}
            <Button className={styles.cta} onClick={() => navigate("/reservation")}>
              Réservation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
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
                  <button
                    onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
                    className={`flex items-center gap-1 text-sm ${styles.iconColor} opacity-70`}
                  >
                    <Globe className="w-4 h-4" />
                    {lang}
                  </button>
                  <button
                    onClick={() => setVariant(variant === "nuit" ? "classic" : "nuit")}
                    className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                      variant === "nuit"
                        ? "bg-accent/20 text-accent"
                        : "bg-primary/10 text-primary"
                    }`}
                    aria-label={variant === "nuit" ? "Mode jour" : "Mode nuit"}
                  >
                    {variant === "nuit" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>
                <Button className={styles.cta} onClick={() => navigate("/reservation")}>
                  Réservation
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
