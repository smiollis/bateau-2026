"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { localeLabels } from "@/components/LanguageSelector";
import HeaderThemeToggle from "@/components/HeaderThemeToggle";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  onNavClick: (href: string) => void;
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

const MobileMenu = ({ isOpen, onClose, navItems, onNavClick, styles }: MobileMenuProps) => {
  const { variant } = useThemeVariant();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locale = useLocale();
  const mobileStyles = variantMobileStyles[variant];
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: prefersReducedMotion ? "auto" : 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: prefersReducedMotion ? "auto" : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : undefined }}
          id="mobile-nav"
          className={`lg:hidden ${styles.mobileMenuBg} border-b border-border`}
        >
          <div className="container-custom py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { onNavClick(item.href); onClose(); }}
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
                      onClick={() => { router.replace(pathname, { locale: loc }); onClose(); }}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        locale === loc
                          ? "font-bold " + styles.iconColor
                          : mobileStyles.localeInactive
                      }`}
                    >
                      {localeLabels[loc]}
                    </button>
                  ))}
                </div>
                <HeaderThemeToggle className="hover:bg-transparent" />
              </div>
              <Button className={styles.cta} onClick={() => router.push("/reservation")}>
                {t("reservation")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
