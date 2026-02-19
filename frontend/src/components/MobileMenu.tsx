"use client";

import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { localeLabels, localeFlags } from "@/components/LanguageSelector";
import HeaderThemeToggle from "@/components/HeaderThemeToggle";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  styles: {
    nav: string;
    cta: string;
    mobileMenuBg: string;
    iconColor: string;
  };
}

const variantMobileStyles: Record<ThemeVariant, {
  localeInactive: string;
}> = {
  classic: {
    localeInactive: "text-foreground/60 hover:text-primary",
  },
  nuit: {
    localeInactive: "text-blue-100/60 hover:text-accent",
  },
};

const MobileMenu = ({ isOpen, onClose, navItems, styles }: MobileMenuProps) => {
  const { variant } = useThemeVariant();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locale = useLocale();
  const mobileStyles = variantMobileStyles[variant];
  const prefersReducedMotion = useReducedMotion();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (pathname === "/") {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, height: prefersReducedMotion ? "auto" : 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: prefersReducedMotion ? "auto" : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          id="mobile-nav"
          className={`lg:hidden ${styles.mobileMenuBg} border-b border-border`}
        >
          <div className="container-custom py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className={`block py-2 ${styles.nav} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 flex-wrap">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { router.replace(pathname, { locale: loc }); onClose(); }}
                      className={`px-2 py-1 text-xs rounded transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        locale === loc
                          ? "font-bold " + styles.iconColor
                          : mobileStyles.localeInactive
                      }`}
                    >
                      <span className="text-sm leading-none">{localeFlags[loc]}</span>
                      {localeLabels[loc]}
                    </button>
                  ))}
                </div>
                <HeaderThemeToggle className="hover:bg-transparent" />
              </div>
              <Link href="/reservation" className={styles.cta + " inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2"} onClick={onClose}>
                {t("reservation")}
              </Link>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
