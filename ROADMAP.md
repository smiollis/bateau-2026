# Roadmap - bateau-a-paris.fr

> Derniere mise a jour : 2026-02-13 

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
- [x] Systeme de variantes de theme (classic + nuit)
- [x] Design system complet (HSL tokens, Tailwind @theme inline, fonts Playfair/Inter)
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

## [done] Phase 1d : Import statique des contenus (Semaine 2)

> Doc detaillee : [`frontend/docs/imports.md`](frontend/docs/imports.md)

- [x] Import articles WordPress en JSON statique (`scripts/import-posts.ts`)
  - Decodage entites HTML, nettoyage Elementor, extraction contenu semantique
  - 31 articles importes dans `src/data/posts.json`
- [x] Pages articles locales SSG (`/actualites/[slug]`) — 31 pages pre-generees
- [x] Pagination Actualites : 1 highlight + 6 en grille + bouton "Charger plus"
- [x] Import avis Google Places en JSON statique (`scripts/import-reviews.ts`)
  - 5 avis reels importes dans `src/data/reviews.json` (note 4.9/5, 69 avis)
  - Composants Testimonials connectes au JSON (note + nombre dynamiques)
- [x] Import images WordPress en local (`scripts/import-images.ts`)
  - 50 images telechargees dans `public/images/{gallery,hero,posts}/`
  - Sources mises a jour automatiquement (galleryImages.ts, HeroCinemaSlideshow.tsx, posts.json)
- [x] Scripts npm : `import:posts`, `import:reviews`, `import:images`, `import:all`
- [x] WordPress utilise uniquement comme CMS (stockage contenu + module reservation)

## [done] Phase 1e : Lightbox + Nettoyage themes (Semaine 3)

- [x] Lightbox galerie — `yet-another-react-lightbox`
  - Plugins : Zoom, Thumbnails, Counter
  - Remplacement du lightbox custom Framer Motion
- [x] Nettoyage themes : reduction de 6 a 2 variantes (classic + nuit)
  - Suppression : modern, minimal, editorial, luxe
  - Suppression des fonts Michroma et Orbitron (Google Fonts + CSS)
  - 13 composants simplifies (pattern `isDark` ternaire)
  - Composant ThemeSwitcher reecrit (toggle jour/nuit)
- [x] Redirects routes legacy dans `next.config.ts` (`/f_a_q` → `/faq`, etc.)
- [x] `next.config.ts` : remotePatterns pour Google avatars et Unsplash

---

## [next] Phase 2 : WordPress Headless + Automatisation (Semaine 4)

### 2.1 Plugin WordPress Headless Mode
- [ ] Developper plugin `bateau-headless-mode`
- [ ] Desactiver le front-end WordPress (redirect vers Next.js)
- [ ] Activer CORS pour le domaine de production
- [ ] Configurer les endpoints REST API custom si necessaire

### 2.2 Template Bookly Minimal
- [ ] Creer un template WordPress minimal pour Bookly
- [ ] Le endpoint `/reservation` sur WP sert uniquement l'iframe Bookly
- [ ] Style minimal (pas de theme WP charge)

### 2.3 Automatisation des imports (cron)
- [ ] **Cron articles WordPress** — reimport auto lors de publication
  - Option A : Webhook WP (`post_published`) → trigger GitHub Actions
  - Option B : GitHub Actions scheduled (quotidien)
  - Le workflow execute `npm run import:posts && npm run import:images`, commit et push
- [ ] **Cron avis Google** — reimport periodique
  - GitHub Actions scheduled (hebdomadaire ou mensuel)
  - Execute `npm run import:reviews`, commit et push le JSON
- [ ] **Cron refresh token Instagram** — renouvellement avant expiration
  - GitHub Actions scheduled (tous les 50 jours)
  - Appel endpoint `/access_token?grant_type=ig_refresh_token`
  - Mise a jour du secret GitHub + `.env.local` en production
- [ ] **Rebuild automatique** apres mise a jour des JSON
  - Trigger Vercel/Coolify apres push sur `main` (deja en place si CD active)

---

## [done] Phase 3 : Contact & Conformite (Semaine 5)

### [done] 3.1 Formulaire de contact fonctionnel (Resend)
- [x] `npm install resend zod`
- [x] API route `src/app/api/contact/route.ts`
  - Validation serveur zod (nom, email, telephone, message)
  - Rate limiting in-memory (3 envois/min par IP)
  - Honeypot antispam (champ invisible)
  - Envoi via Resend SDK (`onboarding@resend.dev`, Reply-To expediteur)
- [x] Template email HTML inline (nom, email, tel, message)
- [x] Mise a jour de `ContactForm.tsx` (fetch API + gestion erreurs typees)
- [x] Variables env : `RESEND_API_KEY`, `CONTACT_EMAIL_TO`
- [ ] Configuration domaine verifie Resend (remplacer `onboarding@resend.dev`)
- [ ] Notification de confirmation a l'expediteur (optionnel)
- [ ] CleanTalk antispam (si besoin, licence disponible)

### [done] 3.2 Page Politique de Confidentialite
- [x] Creer `/confidentialite` avec contenu RGPD complet (10 sections)
- [x] Liens depuis le footer et le cookie banner mis a jour

---

## [done] Phase 4 : SEO & Performance (Semaine 6)

### [done] 4.1 SEO
- [x] `metadataBase` dans root layout + title template `%s | Un Bateau a Paris`
- [x] `generateMetadata` par page (title, description, og:image) — i18n via `getTranslations`
- [x] Schema.org JSON-LD (`LocalBusiness` en root, `Article` sur les articles)
- [x] `src/app/sitemap.ts` (pages statiques + articles dynamiques, multi-locale)
- [x] `src/app/robots.ts`
- [x] OpenGraph + Twitter cards configures
- [x] OG Image par defaut (image du bateau)
- [x] Canonical URLs + hreflang alternates (`alternates.languages` en metadata)
- [x] OpenGraph `alternateLocale` (fr_FR + en_US)

### [done] 4.2 Performance
- [x] Import images locales (`public/images/gallery/`, `hero/`, `posts/`)
- [x] `next.config.ts` : remotePatterns (Google avatars, Unsplash)
- [x] Redirects routes legacy
- [x] Migration `<img>` → `next/image` (9 fichiers, 12 occurrences)
- [x] Migration Google Fonts `<link>` → `next/font/google` (Inter, Playfair Display) avec CSS variables
- [x] Suppression `export const dynamic = 'force-dynamic'` sur 8 pages statiques
- [x] Preconnect + DNS prefetch WordPress (accelere chargement iframe Bookly)
- [x] Bundle analysis : dynamic imports, tree-shaking verifie
- [ ] Lighthouse score > 90 / Core Web Vitals (LCP < 2.5s, CLS < 0.1)

---

## [done] Phase 5 : Features avancees (Semaine 7-8)

### [done] 5.1 Internationalisation (i18n)
- [x] Setup next-intl (FR/EN) — routing, request config, navigation
- [x] Structure `messages/fr.json` + `messages/en.json` (~230 cles, 16 namespaces)
- [x] Middleware + routing localise (`/fr/`, `/en/`) avec defaultLocale `fr`
- [x] Migration routes vers `src/app/[locale]/` (10 pages + not-found)
- [x] Extraction strings FR depuis 12 composants (`useTranslations`)
- [x] Switcher de langue fonctionnel dans le header (next-intl `useRouter`)
- [x] Metadata i18n via `getTranslations` (8 pages)
- [x] SEO hreflang tags (`alternates.languages` dans metadata)
- [x] Traduction anglaise complete (en.json + posts-en.json — 28 articles traduits)
- [x] Blog bilingue : `posts.json` (FR) + `posts-en.json` (EN), chargement par locale
- [x] Section CTA reservation en fin d'article (FR/EN)

### 5.2 Integration Bookly
- [ ] iFrame Bookly fonctionnel sur la page Reservation
- [ ] Communication parent-iframe (confirmation, erreurs)
- [ ] Style coherent avec le design Next.js
- [ ] Test sur mobile

---

## [wip] Phase 6 : Tests & Deploiement

### [done] 6.1 Tests
- [x] Tests unitaires composants critiques (Vitest) — 65 tests, 11 fichiers
  - API contact (validation, rate limiting, honeypot, Resend mock)
  - Cookie consent lib (localStorage, versioning)
  - Google Analytics (consent mode, cookie removal)
  - Utils (cn), escapeHtml (XSS prevention)
  - ContactForm (rendu, soumission, erreurs)
  - CookieBanner (affichage, accept, customize)
  - HeaderVariants (nav, mobile menu, theme toggle, language switch)
  - HeroVariants (badge, title, CTA, dark mode)
  - FooterVariants (nav, contact, social, cookie settings)
  - OffersVariants (4 offres, prix, JSON-LD, CTA)
- [x] Tests E2E parcours cles (Playwright) — 28 tests, 6 fichiers
  - Home (chargement, sections, toggle theme)
  - Contact (formulaire, soumission avec API interceptee)
  - Navigation (10 pages, redirects legacy, switch langue)
  - Cookie consent (banner, accept, reject, customize)
  - Accessibilite (axe-core WCAG 2.1 AA sur home + contact)
  - Mobile (viewport 390px, menu hamburger, formulaire)
- [x] Tests cross-browser (projets Playwright : chromium, firefox, webkit)
- [x] Tests mobile (viewport iPhone 14, touch events)
- [x] Tests RGPD (cookie consent, tracking conditionnel)
- [x] Tests accessibilite (WCAG 2.1 AA via axe-core)
- [ ] A11y : corriger button-name, link-name (composants Lovable)

### 6.2 Pre-production
- [ ] Deployer sur OVH/Coolify (preprod)
- [ ] Tests fonctionnels complets
- [ ] Validation client

### 6.3 Production
- [ ] Deployer sur Vercel ou Coolify (production)
- [ ] Configuration domaine bateau-a-paris.fr
- [ ] SSL + CDN
- [ ] Monitoring (Sentry + Vercel Analytics)
- [ ] Backup strategy

---

## [backlog] Backlog — Non planifie

### Fonctionnalites futures
- [x] Blog complet avec CMS — *fait en Phase 1d (import statique WordPress)*
- [x] Avis Google Places — *fait en Phase 1d (import statique)*
- [x] Mode sombre — *fait (theme nuit, toggle jour/nuit)*
- [ ] Systeme de reservations en ligne (sans iframe, integration directe)
- [ ] Chat en direct (Crisp, Intercom)
- [ ] Programme fidelite / parrainage
- [ ] Calendrier de disponibilite temps reel
- [ ] Paiement en ligne (Stripe)
- [ ] Application mobile (PWA — manifest.json + service worker)
- [ ] Newsletter (React Email + Resend)
- [ ] Dashboard analytics custom
- [ ] Video background hero (optimisee)
- [ ] Visite virtuelle 360 du bateau
- [ ] OG Image dynamique (`next/og` — generation d'images par page)

### Infrastructure
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Tests automatises pre-deploy
- [ ] Staging environment automatique par PR
- [ ] Migration WordPress vers cloud manage (si besoin)
- [ ] CDN images dedie (Cloudinary, imgix)
- [ ] Refresh automatique du token Instagram (cron) — *voir Phase 2.3*
- [ ] Cron import articles WordPress — *voir Phase 2.3*
- [ ] Cron import avis Google — *voir Phase 2.3*
