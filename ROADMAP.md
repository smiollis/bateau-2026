# Roadmap - bateau-a-paris.fr

> Derniere mise a jour : 2026-02-11

## Legende

| Icone | Statut |
|-------|--------|
| done | Termine |
| wip | En cours |
| next | Prioritaire (30j) |
| later | Planifie (60j) |
| backlog | Backlog |

---

## [done] Phase 1 : Setup & Integration Lovable (Semaines 0-2)

- [x] Setup initial Next.js 16 + TypeScript + Tailwind CSS v4
- [x] Import composants Lovable (Header, Hero, Boat, Features, Offers, Testimonials, CTA, Footer, etc.)
- [x] Import pages Lovable (Index, Galerie, Croisiere, FAQ, CGV, MentionsLegales, Reservation, Actualites)
- [x] Systeme de variantes de theme (6 themes : classic, modern, minimal, editorial, luxe, nuit)
- [x] Design system complet (HSL tokens, Tailwind @theme inline, fonts Playfair/Inter/Michroma/Orbitron)
- [x] Fix `@theme inline` — enregistrement de tous les tokens couleur manquants
- [x] Fix logo Next.js static import (`.src`)
- [x] Fix conflit Pages Router / App Router (`src/pages/` -> `src/views/`)
- [x] Installation de toutes les dependances Radix UI / shadcn/ui
- [x] Fix bugs pre-existants (NavLink, ScrollToTop, Calendar v9, Croisiere static imports)

## [done] Phase 1b : Cookie RGPD + GA4 (Semaine 2)

- [x] Infrastructure cookie consent (types, lib, provider, hook)
- [x] Google Analytics 4 (G-N20S788YDW) avec Google Consent Mode v2
- [x] Defaults consent "denied" pour 33 regions EU
- [x] Composants CookieBanner + CookieModal connectes au Provider
- [x] Lien "Parametres cookies" dans toutes les variantes du footer
- [x] Meta google-site-verification
- [x] `.env.local` configure (WP API, GA4, Instagram token)

## [done] Phase 1c : Instagram Feed (Semaine 2)

- [x] API route `/api/instagram` (Instagram Graph API, cache 1h)
- [x] Hook `useInstagramFeed` pour fetch cote client
- [x] Section Instagram de la Galerie connectee au vrai flux
- [x] Token Instagram dans `.env.local` (expire 2026-04-04)
- [x] Config Smash Balloon dans `src/json/` (gitignore)

---

## [next] Phase 2 : WordPress Headless (Semaine 3) — Priorite 30 jours

### 2.1 Plugin WordPress Headless Mode
- [ ] Developper plugin `bateau-headless-mode`
- [ ] Desactiver le front-end WordPress (redirect vers Next.js)
- [ ] Activer CORS pour le domaine de production
- [ ] Configurer les endpoints REST API custom si necessaire

### 2.2 Template Bookly Minimal
- [ ] Creer un template WordPress minimal pour Bookly
- [ ] Le endpoint `/reservation` sur WP sert uniquement l'iframe Bookly
- [ ] Style minimal (pas de theme WP charge)

### 2.3 ACF Configuration
- [ ] Installer/configurer ACF Pro pour les champs custom
- [ ] Definir les field groups : infos bateau, tarifs, temoignages, FAQ
- [ ] Exposer les champs ACF via REST API

### 2.4 WordPress API Client (Next.js)
- [ ] `src/lib/wordpress.ts` — client API complet
- [ ] `getPages()`, `getPosts()`, `getACFFields()`
- [ ] Types TypeScript pour les responses WP
- [ ] Cache avec revalidation ISR

---

## [next] Phase 3 : Integration donnees dynamiques (Semaines 4-5) — Priorite 30 jours

### 3.1 Pages dynamiques
- [ ] Actualites : fetch posts WordPress, pagination, page article
- [ ] FAQ : questions/reponses depuis ACF ou CPT
- [ ] Temoignages : depuis ACF (remplacer les donnees hardcodees)

### 3.2 Composants data-driven
- [ ] Tarifs/Offres : depuis ACF (au lieu de donnees statiques)
- [ ] Infos bateau : depuis ACF
- [ ] Galerie : images depuis WordPress Media Library (en complement d'Instagram)

### 3.3 Contact Form
- [ ] Formulaire fonctionnel avec validation (react-hook-form + zod)
- [ ] Envoi via WordPress REST API ou endpoint custom
- [ ] Notifications email (via Mailhog en dev, SMTP en prod)

---

## [later] Phase 4 : Features avancees (Semaine 6) — Planifie 60 jours

### 4.1 Internationalisation (i18n)
- [ ] Setup next-intl (FR/EN minimum)
- [ ] Traduction de toutes les pages
- [ ] Switcher de langue dans le header
- [ ] Routing localise (`/fr/`, `/en/`)
- [ ] SEO hreflang tags

### 4.2 Lightbox Galerie
- [ ] Integration yet-another-react-lightbox
- [ ] Zoom, swipe, keyboard navigation
- [ ] Thumbnails panel
- [ ] Remplacement du lightbox custom actuel

### 4.3 Integration Bookly
- [ ] iFrame Bookly fonctionnel sur la page Reservation
- [ ] Communication parent-iframe (confirmation, erreurs)
- [ ] Style coherent avec le design Next.js
- [ ] Test sur mobile

---

## [later] Phase 5 : SEO & Performance (Semaine 7) — Planifie 60 jours

### 5.1 SEO
- [ ] Metadata dynamique par page (title, description, og:image)
- [ ] Schema.org JSON-LD (LocalBusiness, TouristAttraction, Product)
- [ ] Sitemap.xml automatique
- [ ] robots.txt
- [ ] Canonical URLs

### 5.2 Performance
- [ ] Optimisation images (Next.js Image component + WebP/AVIF)
- [ ] Lazy loading systematique
- [ ] Bundle analysis + code splitting
- [ ] Lighthouse score > 90 sur toutes les metriques
- [ ] Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### 5.3 Page Politique de Confidentialite
- [ ] Creer `/confidentialite` avec contenu RGPD complet
- [ ] Liens depuis le footer et le cookie banner

---

## [backlog] Phase 6 : Tests & Deploiement (Semaine 8)

### 6.1 Tests
- [ ] Tests unitaires composants critiques
- [ ] Tests E2E (Playwright) pour les parcours cles
- [ ] Tests cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Tests mobile (iOS Safari, Android Chrome)
- [ ] Tests RGPD (cookie consent, tracking conditionnel)
- [ ] Tests accessibilite (WCAG 2.1 AA)

### 6.2 Pre-production
- [ ] Deployer sur OVH/Coolify (preprod)
- [ ] Tests fonctionnels complets
- [ ] Validation client

### 6.3 Production
- [ ] Deployer sur Vercel (production)
- [ ] Configuration domaine bateau-a-paris.fr
- [ ] SSL + CDN
- [ ] Monitoring (Vercel Analytics, Sentry)
- [ ] Backup strategy

---

## [backlog] Backlog — Non planifie

### Fonctionnalites futures
- [ ] Mode sombre complet (toggle utilisateur persistant)
- [ ] Systeme de reservations en ligne (sans iframe, integration directe)
- [ ] Blog complet avec CMS (WordPress posts enrichis)
- [ ] Avis Google Maps API (live reviews)
- [ ] Chat en direct (Crisp, Intercom)
- [ ] Programme fidelite / parrainage
- [ ] Calendrier de disponibilite temps reel
- [ ] Paiement en ligne (Stripe)
- [ ] Application mobile (PWA)
- [ ] Systeme de newsletter (Mailchimp/Brevo)
- [ ] A/B testing (variantes de theme en production)
- [ ] Dashboard analytics custom
- [ ] Video background hero (optimisee)
- [ ] Visite virtuelle 360 du bateau

### Infrastructure
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Tests automatises pre-deploy
- [ ] Staging environment automatique par PR
- [ ] Migration WordPress vers cloud manage (si besoin)
- [ ] CDN images dedie (Cloudinary, imgix)
- [ ] Refresh automatique du token Instagram (cron)
