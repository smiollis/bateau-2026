"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import logoDay from "@/assets/logo-day.svg";
import logoNight from "@/assets/logo-night.svg";
import LanguageSelector from "@/components/LanguageSelector";
import HeaderThemeToggle from "@/components/HeaderThemeToggle";
import MobileMenu from "@/components/MobileMenu";

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
    logoClass: "h-14 md:h-16 w-auto",
    nav: "text-sm font-medium text-blue-100/80 hover:text-accent transition-colors duration-200",
    cta: "btn-gold text-white",
    mobileMenuBg: "bg-[#0a1628]",
    iconColor: "text-accent",
  },
};

const HeaderVariants = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { variant, isDark } = useThemeVariant();
  const styles = variantStyles[variant];
  const logo = isDark ? logoNight : logoDay;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

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
            <LanguageSelector iconColor={styles.iconColor} />
            <HeaderThemeToggle />
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
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={navItems}
        onNavClick={handleNavClick}
        styles={styles}
      />
    </header>
  );
};

export default HeaderVariants;
