import { Facebook, Instagram, Mail, MapPin, Phone, Anchor } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useThemeVariant, ThemeVariant } from "@/contexts/ThemeVariantContext";
import { useCallback } from "react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Le Bateau", to: "/#bateau" },
  { label: "La Croisière", to: "/#croisiere" },
  { label: "Tarifs", to: "/#tarifs" },
  { label: "Galerie", to: "/galerie" },
  { label: "Actualités", to: "/actualites" },
];

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
    icon: "bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground",
    border: "border-primary-foreground/20",
    copyright: "text-primary-foreground/60",
  },
  modern: {
    footer: "bg-primary text-primary-foreground",
    title: "font-heading-michroma text-lg uppercase tracking-wider",
    text: "text-primary-foreground/60 font-heading-michroma text-xs tracking-wide",
    link: "text-primary-foreground/60 hover:text-accent transition-colors font-heading-michroma text-xs uppercase tracking-wide",
    icon: "bg-accent text-accent-foreground hover:bg-accent/80",
    border: "border-accent/30",
    copyright: "text-primary-foreground/50 font-heading-michroma text-xs tracking-wide",
  },
  minimal: {
    footer: "bg-background text-foreground border-t-2 border-primary",
    title: "font-heading-orbitron text-sm uppercase tracking-widest",
    text: "text-muted-foreground font-heading-orbitron text-xs tracking-wide",
    link: "text-muted-foreground hover:text-accent transition-colors font-heading-orbitron text-xs uppercase tracking-widest",
    icon: "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground",
    border: "border-border",
    copyright: "text-muted-foreground font-heading-orbitron text-xs tracking-wide",
  },
  editorial: {
    footer: "bg-amber-900 text-white",
    title: "font-heading text-xl italic",
    text: "text-white/60",
    link: "text-white/60 hover:text-amber-300 transition-colors",
    icon: "bg-white/10 hover:bg-amber-300 hover:text-amber-900",
    border: "border-white/20",
    copyright: "text-white/40",
  },
  luxe: {
    footer: "bg-black text-white",
    title: "text-lg font-light tracking-wide",
    text: "text-white/40",
    link: "text-white/40 hover:text-amber-400 transition-colors",
    icon: "bg-amber-400/10 border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-black",
    border: "border-amber-400/20",
    copyright: "text-white/30",
  },
  nuit: {
    footer: "bg-[#060f1e] text-blue-100",
    title: "font-heading text-2xl font-semibold text-blue-100",
    text: "text-blue-200/60",
    link: "text-blue-200/60 hover:text-accent transition-colors",
    icon: "bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground",
    border: "border-blue-400/20",
    copyright: "text-blue-300/40",
  },
};

const FooterVariants = () => {
  const { variant } = useThemeVariant();
  const styles = variantStyles[variant];
  const navigate = useNavigate();
  const pathname = usePathname();

  const handleNavClick = useCallback((to: string, e: React.MouseEvent) => {
    if (to.startsWith("/#")) {
      e.preventDefault();
      const id = to.slice(2);
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname, navigate]);

  // Minimal: Simple single-row footer
  if (variant === "minimal") {
    return (
      <footer className={styles.footer} id="contact">
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Un Bateau à Paris" className="h-10" />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              {navItems.map((item) => (
                <Link key={item.label} to={item.to} onClick={(e) => handleNavClick(item.to, e)} className={styles.link}>
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/bateau_a_paris/" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center transition-colors`}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61557848940884" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center transition-colors`}>
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className={`mt-8 pt-8 border-t ${styles.border} text-center`}>
            <p className={styles.copyright}>© 2025 Un Bateau à Paris</p>
          </div>
        </div>
      </footer>
    );
  }

  // Luxe: Elegant centered footer
  if (variant === "luxe") {
    return (
      <footer className={styles.footer} id="contact">
        <div className="container-custom py-16">
          <div className="text-center mb-12">
            <img src={logo} alt="Un Bateau à Paris" className="h-12 mx-auto brightness-0 invert sepia mb-6" />
            <p className="text-amber-400/60 uppercase tracking-[0.2em] text-sm">Croisières privées sur la Seine</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            {navItems.map((item) => (
              <Link key={item.label} to={item.to} onClick={(e) => handleNavClick(item.to, e)} className={styles.link}>
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center gap-4 mb-12">
            <a href="https://www.instagram.com/bateau_a_paris/" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-full ${styles.icon} flex items-center justify-center transition-colors`}>
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61557848940884" target="_blank" rel="noopener noreferrer" className={`w-12 h-12 rounded-full ${styles.icon} flex items-center justify-center transition-colors`}>
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          
          <div className={`pt-8 border-t ${styles.border} flex flex-col md:flex-row items-center justify-between gap-4`}>
            <p className={styles.copyright}>© 2025 Un Bateau à Paris. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="/mentions-legales" className={styles.link}>Mentions légales</Link>
              <Link href="/cgv" className={styles.link}>CGV</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Editorial: Magazine-style footer
  if (variant === "editorial") {
    return (
      <footer className={styles.footer} id="contact">
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Anchor className="w-8 h-8 text-amber-300" />
                <span className={styles.title}>Un Bateau à Paris</span>
              </div>
              <p className={styles.text}>Croisières privées sur la Seine depuis 2015.</p>
            </div>
            
            <div>
              <h4 className={`${styles.title} mb-4`}>Contact</h4>
              <ul className="space-y-3">
              <li className={styles.text}>Port de l'Arsenal – Paris 12ème</li>
                <li><a href="tel:+33670342543" className={styles.link}>+33 6 70 34 25 43</a></li>
                <li><a href="mailto:capitaine@bateau-a-paris.fr" className={styles.link}>capitaine@bateau-a-paris.fr</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className={`${styles.title} mb-4`}>Suivez-nous</h4>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/bateau_a_paris/" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center transition-colors`}>
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61557848940884" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center transition-colors`}>
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className={`mt-12 pt-8 border-t ${styles.border} text-center`}>
            <p className={styles.copyright}>© 2025 Un Bateau à Paris. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    );
  }

  // Default: Classic & Modern (4-column layout)
  return (
    <footer className={styles.footer} id="contact">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            {variant === "modern" ? (
              <img src={logo} alt="Un Bateau à Paris" className="h-10 brightness-0 invert mb-4" />
            ) : (
              <h3 className={`${styles.title} mb-4`}>Un Bateau à Paris</h3>
            )}
            <p className={`${styles.text} mb-6 leading-relaxed`}>
              Croisières privées sur la Seine depuis 2015. Vivez Paris autrement à bord du Senang.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/bateau_a_paris/" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center transition-colors`}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61557848940884" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full ${styles.icon} flex items-center justify-center transition-colors`}>
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className={`${variant === "modern" ? "font-heading-michroma text-sm uppercase tracking-wider" : "font-semibold text-lg"} mb-4`}>Navigation</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} onClick={(e) => handleNavClick(item.to, e)} className={styles.link}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`${variant === "modern" ? "font-heading-michroma text-sm uppercase tracking-wider" : "font-semibold text-lg"} mb-4`}>Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 ${variant === "modern" ? "text-accent" : "text-accent"} flex-shrink-0 mt-0.5`} />
                <span className={styles.text}>Port de l'Arsenal<br />Paris 12ème</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className={`w-5 h-5 ${variant === "modern" ? "text-accent" : "text-accent"} flex-shrink-0`} />
                <a href="tel:+33670342543" className={styles.link}>+33 6 70 34 25 43</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${variant === "modern" ? "text-accent" : "text-accent"} flex-shrink-0`} />
                <a href="mailto:capitaine@bateau-a-paris.fr" className={styles.link}>capitaine@bateau-a-paris.fr</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`${variant === "modern" ? "font-heading-michroma text-sm uppercase tracking-wider" : "font-semibold text-lg"} mb-4`}>Informations</h4>
            <ul className="space-y-3">
              <li><Link href="/mentions-legales" className={styles.link}>Mentions légales</Link></li>
              <li><Link href="/cgv" className={styles.link}>Conditions générales de vente</Link></li>
              <li><Link href="/mentions-legales" className={styles.link}>Politique de confidentialité</Link></li>
              <li><Link href="/faq" className={styles.link}>FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${styles.border}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`${styles.copyright} text-sm`}>© 2025 Un Bateau à Paris. Tous droits réservés.</p>
            <p className={`${styles.copyright} text-sm`}>Croisières privées sur la Seine</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterVariants;
