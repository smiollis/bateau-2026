"use client";

import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

const variantStyles: Record<ThemeVariant, {
  footer: string;
  title: string;
  text: string;
  link: string;
  icon: string;
  border: string;
  copyright: string;
}> = {
  classic: {
    footer: "bg-primary text-primary-foreground",
    title: "font-heading text-2xl font-semibold",
    text: "text-primary-foreground/70",
    link: "text-primary-foreground/70 hover:text-accent transition-colors",
    icon: "bg-primary-foreground/10 hover:bg-accent hover:text-white",
    border: "border-primary-foreground/20",
    copyright: "text-primary-foreground/60",
  },
  nuit: {
    footer: "bg-nuit-950 text-blue-100",
    title: "font-heading text-2xl font-semibold text-blue-100",
    text: "text-blue-200/60",
    link: "text-blue-200/60 hover:text-accent transition-colors",
    icon: "bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-white",
    border: "border-blue-400/20",
    copyright: "text-blue-300/40",
  },
};

const FooterVariants = () => {
  const { variant } = useThemeVariant();
  const styles = variantStyles[variant];
  const router = useRouter();
  const pathname = usePathname();
  const { openModal: openCookieSettings } = useCookieConsent();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const navItems = [
    { label: tNav("bateau"), to: "/#bateau" },
    { label: tNav("croisiere"), to: "/#croisiere" },
    { label: tNav("tarifs"), to: "/#tarifs" },
    { label: tNav("galerie"), to: "/galerie" },
    { label: tNav("actualites"), to: "/actualites" },
    { label: tNav("reservation"), to: "/reservation" },
  ];

  const handleNavClick = useCallback((to: string, e: React.MouseEvent) => {
    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
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
    }
  }, [pathname, router]);

  // Classic & Nuit: 4-column layout
  return (
    <footer className={styles.footer} id="contact">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <h3 className={`${styles.title} mb-4`}>{t("brandName")}</h3>
            <p className={`${styles.text} mb-6 leading-relaxed`}>
              {t("description")}
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/bateau_a_paris/" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`} aria-label={t("instagramLabel")}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61557848940884" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`} aria-label={t("facebookLabel")}>
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t("navTitle")}</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.to} onClick={(e) => handleNavClick(item.to, e)} className={`${styles.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm`}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t("contactTitle")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className={styles.text}>{t("address")}<br />{t("addressCity")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:+33670342543" className={`${styles.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm`}>+33 6 70 34 25 43</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:capitaine@bateau-a-paris.fr" className={`${styles.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm`}>capitaine@bateau-a-paris.fr</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t("infoTitle")}</h4>
            <ul className="space-y-3">
              <li><Link href="/mentions-legales" className={`${styles.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm`}>{t("mentionsLegales")}</Link></li>
              <li><Link href="/cgv" className={`${styles.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm`}>{t("cgv")}</Link></li>
              <li><Link href="/confidentialite" className={`${styles.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm`}>{t("confidentialite")}</Link></li>
              <li><Link href="/faq" className={`${styles.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm`}>{t("faq")}</Link></li>
              <li><button onClick={openCookieSettings} className={`${styles.link} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm`}>{t("cookieSettings")}</button></li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${styles.border}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`${styles.copyright} text-sm`}>{t("copyright", { year: new Date().getFullYear() })}</p>
            <div className="flex items-center gap-3">
              <Link href="/plan-du-site" className={`${styles.copyright} text-sm hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm`}>{t("sitemap")}</Link>
              <span className={`${styles.copyright} text-sm`}>·</span>
              <p className={`${styles.copyright} text-sm`}>{t("tagline")}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterVariants;
