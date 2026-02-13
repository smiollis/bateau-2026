import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" id="contact">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-heading text-2xl font-semibold mb-4">
              Un Bateau à Paris
            </h3>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Croisières privées sur la Seine depuis 2015. 
              Vivez Paris autrement à bord du Senang.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/bateau_a_paris/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61557848940884"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#bateau" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Le Bateau
                </a>
              </li>
              <li>
                <a href="#croisiere" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  La Croisière
                </a>
              </li>
              <li>
                <a href="#tarifs" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#galerie" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Galerie
                </a>
              </li>
              <li>
                <a href="#actualites" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Actualités
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70">
                  Port de l&apos;Arsenal<br />
                  Paris 12ème
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:+33670342543" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  +33 6 70 34 25 43
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:capitaine@bateau-a-paris.fr" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  capitaine@bateau-a-paris.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Informations</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Conditions générales de vente
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 Un Bateau à Paris. Tous droits réservés.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              Croisières privées sur la Seine
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;