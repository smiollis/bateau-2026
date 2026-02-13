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
  - **Attention** : canonical et hreflang sont herites du root layout → corrections Sprint 5a
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
- [x] Vercel Speed Insights (RUM) — `@vercel/speed-insights` dans root layout
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

## [next] Sprint 5 : Audit — Corrections critiques (Semaine 9)

> Issues identifiees lors de l'audit approfondi du 2026-02-13

### 5a. SEO critique — Canonical & Hreflang par page
- [ ] **Canonical URLs par page** — chaque page doit avoir son propre canonical (actuellement toutes pointent vers `/`)
- [ ] **Hreflang par page** — chaque page doit pointer vers son equivalent FR/EN (actuellement toutes pointent vers homepage)
- [ ] **Ajouter `x-default` hreflang** sur toutes les pages
- [ ] **`og:locale` dynamique** — `fr_FR` sur `/fr/*`, `en_US` sur `/en/*` (actuellement `fr_FR` en dur)
- [ ] **Title EN traduit** — le `<title>` de la homepage EN est encore en francais

### 5b. Accessibilite critique (WCAG Level A)
- [ ] **`<html lang>` dynamique** — `lang="fr"` en dur sur les pages `/en` → passer en dynamique via locale
- [ ] **Skip-to-content** — ajouter lien "Aller au contenu" (premier element focusable)
- [ ] **Labels formulaire contact** — associer `<label htmlFor>` + `<input id>` sur les 4 champs
- [ ] **`aria-expanded` menu mobile** — ajouter sur le bouton hamburger
- [ ] **Cookie modal `role="dialog"`** — ajouter `aria-modal`, `aria-labelledby`

### 5c. Security headers
- [ ] **`poweredByHeader: false`** dans `next.config.ts` (supprimer `X-Powered-By: Next.js`)
- [ ] **Security headers** dans `next.config.ts` `headers()` pour tous les environnements :
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- [ ] **Content-Security-Policy** — CSP adaptee (GA4, Google Fonts, Instagram API, WordPress)

### 5d. Performance
- [ ] **Activer le cache HTML** — ISR (`revalidate`) ou static generation pour CDN caching (actuellement MISS sur chaque requete)
- [ ] **AVIF** — ajouter `formats: ['image/avif', 'image/webp']` dans `next.config.ts` images
- [ ] **Hero images** — migrer les 2 images hero restantes vers `next/image` (srcSet + AVIF)

### 5e. Code quality
- [ ] **Fix ESLint errors** — 2 `react-hooks/set-state-in-effect` (CookieModal, CookieProvider), 4 `no-explicit-any`
- [ ] **Ajouter `error.tsx`** + **`global-error.tsx`** pour gestion gracieuse des erreurs runtime
- [ ] **Contrastes couleurs** — verifier et corriger `text-*/50`, `text-*/60` (WCAG AA 4.5:1)

---

## [next] Sprint 6 : Redirections WordPress → Next.js

> Plan de redirections pour la bascule du domaine bateau-a-paris.fr de WordPress vers Next.js.
> Toutes les redirections sont **301 (permanent)** sauf indication contraire.

### Pages principales (WordPress → Next.js)

| WordPress (ancien) | Next.js (nouveau) | Note |
|---|---|---|
| `/` | `/fr` | Homepage (redirect auto next-intl) |
| `/en/` | `/en` | Homepage EN |
| `/croisiere-privee-seine-paris/` | `/fr/croisiere` | Page croisiere FR |
| `/en/your-private-cruise-in-paris/` | `/en/croisiere` | Page croisiere EN |
| `/un-bateau-a-paris_le-senang/` | `/fr/croisiere` | Page bateau → croisiere |
| `/en/our-boat-the-senang/` | `/en/croisiere` | Page bateau EN |
| `/un-bateau-a-paris_tarif-de-votre-croisiere/` | `/fr/croisiere` | Page tarifs → croisiere |
| `/en/rates-for-your-private-cruise-in-paris/` | `/en/croisiere` | Tarifs EN |
| `/en/rates-for-your-private-cruise-in-paris-2/` | `/en/croisiere` | Tarifs EN (doublon) |
| `/galerie-photos/` | `/fr/galerie` | Galerie |
| `/foire-aux-questions_un-bateau-a-paris/` | `/fr/faq` | FAQ |
| `/en/frequently-asked-questions/` | `/en/faq` | FAQ EN |
| `/les-actualites-du-senang/` | `/fr/actualites` | Blog FR |
| `/actualites-un-bateau-a-paris/` | `/fr/actualites` | Blog FR (ancien slug) |
| `/en/our-news/` | `/en/actualites` | Blog EN |
| `/en/news-un-bateau-a-paris/` | `/en/actualites` | Blog EN (ancien slug) |
| `/contacter-un-bateau-a-paris/` | `/fr#contact` | Contact FR |
| `/en/contact-un-bateau-a-paris/` | `/en#contact` | Contact EN |
| `/en/contact-un-bateau-a-paris-2/` | `/en#contact` | Contact EN (doublon) |
| `/en/contact-un-bateau-a-paris-3/` | `/en#contact` | Contact EN (doublon) |
| `/cgv-un-bateau-a-paris/` | `/fr/cgv` | CGV |
| `/en/terms-conditions/` | `/en/cgv` | CGV EN |
| `/mentions-legales-un-bateau-a-paris/` | `/fr/mentions-legales` | Mentions legales |
| `/politique-de-confidentialite/` | `/fr/confidentialite` | Confidentialite |
| `/un-bateau-a-paris_politique-de-cookies-ue/` | `/fr/confidentialite` | Cookies → confidentialite |
| `/en/cookie-policy-eu/` | `/en/confidentialite` | Cookies EN |

### Reservation (multiples URLs WordPress → une seule)

| WordPress (ancien) | Next.js (nouveau) |
|---|---|
| `/reservation-croisiere-privee-paris/` | `/fr/reservation` |
| `/reservez-votre-croisiere-privee-a-paris-bookly/` | `/fr/reservation` |
| `/reservez-votre-croisiere-privee-a-paris-hopleisure/` | `/fr/reservation` |
| `/reserver-une-croisiere-avec-guide/` | `/fr/reservation` |
| `/en/book-your-private-cruise-in-paris/` | `/en/reservation` |
| `/en/book-your-private-cruise-in-paris-2/` | `/en/reservation` |
| `/en/book-your-private-cruise-in-paris-3/` | `/en/reservation` |
| `/en/book-your-private-cruise-in-paris-4/` | `/en/reservation` |

### Articles blog (WordPress → Next.js)

| WordPress (ancien) | Next.js (nouveau) |
|---|---|
| `/croisiere-a-paris-2pers-6pers/` | `/fr/actualites/croisiere-a-paris-2pers-6pers` |
| `/croisieres-privees-sur-la-seine-reprise-le-15-mars/` | `/fr/actualites/croisieres-privees-sur-la-seine-reprise-le-15-mars` |
| `/histoire-des-bateaux-mouches-de-paris/` | `/fr/actualites/histoire-des-bateaux-mouches-de-paris` |
| `/un-bateau-a-paris-aux-jeux-olympiques/` | `/fr/actualites/un-bateau-a-paris-aux-jeux-olympiques` |
| `/shooting-photo-au-pieds-de-la-tour-eiffel/` | `/fr/actualites/shooting-photo-au-pieds-de-la-tour-eiffel` |
| `/le-senang-participe-a-la-ceremonie-douverture-des-jeux-olympiques-de-paris-2024/` | `/fr/actualites/le-senang-participe-a-la-ceremonie-douverture-des-jeux-olympiques-de-paris-2024` |
| `/tournage-exceptionnel-avec-un-bateau-a-paris-pour-adidas-avec-nicolas-karabatic-triple-medaille-olympique/` | `/fr/actualites/tournage-exceptionnel-avec-un-bateau-a-paris-pour-adidas-avec-nicolas-karabatic-triple-medaille-olympique` |
| `/le-senang-accueille-le-slip-francais-un-shooting-dexception-sur-la-seine/` | `/fr/actualites/le-senang-accueille-le-slip-francais-un-shooting-dexception-sur-la-seine` |
| `/un-enterrement-de-vie-de-jeune-fille-inoubliable-a-bord-du-senang/` | `/fr/actualites/un-enterrement-de-vie-de-jeune-fille-inoubliable-a-bord-du-senang` |
| `/une-croisiere-romantique-au-crepuscule-sur-la-seine-a-bord-du-senang/` | `/fr/actualites/une-croisiere-romantique-au-crepuscule-sur-la-seine-a-bord-du-senang` |
| `/une-reunion-de-famille-inoubliable-a-bord-du-senang-sur-la-seine/` | `/fr/actualites/une-reunion-de-famille-inoubliable-a-bord-du-senang-sur-la-seine` |
| `/le-zouave-de-lalma/` | `/fr/actualites/le-zouave-de-lalma` |
| `/pont-neuf/` | `/fr/actualites/pont-neuf` |
| `/pont-alexandre-iii/` | `/fr/actualites/pont-alexandre-iii` |
| `/pont-des-arts/` | `/fr/actualites/pont-des-arts` |
| `/pont-de-iena/` | `/fr/actualites/pont-de-iena` |
| `/pont-des-invalides/` | `/fr/actualites/pont-des-invalides` |
| `/pont-du-carrousel/` | `/fr/actualites/pont-du-carrousel` |
| `/pont-louis-philippe/` | `/fr/actualites/pont-louis-philippe` |
| `/pont-de-sully/` | `/fr/actualites/pont-de-sully` |
| `/pont-notre-dame/` | `/fr/actualites/pont-notre-dame` |
| `/pont-d-arcole/` | `/fr/actualites/pont-d-arcole` |
| `/pont-de-l-alma/` | `/fr/actualites/pont-de-l-alma` |
| `/pont-marie/` | `/fr/actualites/pont-marie` |
| `/pont-royal/` | `/fr/actualites/pont-royal` |
| `/pont-au-change/` | `/fr/actualites/pont-au-change` |
| `/pont-de-larcheveche/` | `/fr/actualites/pont-de-larcheveche` |
| `/petit-pont-cardinal-lustiger/` | `/fr/actualites/petit-pont-cardinal-lustiger` |
| `/pont-de-la-tournelle/` | `/fr/actualites/pont-de-la-tournelle` |
| `/pont-saint-michel/` | `/fr/actualites/pont-saint-michel` |
| `/pont-de-la-concorde/` | `/fr/actualites/pont-de-la-concorde` |
| `/en/history-of-bateaux-mouches-de-paris/` | `/en/actualites/history-of-bateaux-mouches-de-paris` |
| `/en/private-cruises-on-the-seine-back-on-march-15/` | `/en/actualites/private-cruises-on-the-seine-back-on-march-15` |
| `/en/un-bateau-a-paris-at-the-olympic-games/` | `/en/actualites/un-bateau-a-paris-at-the-olympic-games` |

### Pages speciales (WordPress → redirect ou suppression)

| WordPress (ancien) | Action | Note |
|---|---|---|
| `/croisiere-romantique-a-paris/` | → `/fr/croisiere` | Landing page → page croisiere |
| `/croisiere-en-famille-a-paris/` | → `/fr/croisiere` | Landing page → page croisiere |
| `/mon-compte/` | → `/fr/reservation` | WooCommerce, plus utilise |
| `/en/my-account/` | → `/en/reservation` | WooCommerce EN |
| `/commander/` | → `/fr/reservation` | WooCommerce checkout |
| `/en/checkout/` | → `/en/reservation` | WooCommerce checkout EN |
| `/panier/` | → `/fr/reservation` | WooCommerce cart |
| `/en/cart/` | → `/en/reservation` | WooCommerce cart EN |
| `/en/shop/` | → `/en/reservation` | WooCommerce shop EN |
| `/merci/` | → `/fr` | Page merci → homepage |
| `/reservation-embed/` | **Ne pas rediriger** | Endpoint iframe Bookly (utilise par Next.js) |
| `/category/*` | → `/fr/actualites` | Categories blog → page actualites |
| `/en/category/*` | → `/en/actualites` | Categories EN |
| `/?porto_builder=*` | **410 Gone** | URLs techniques Porto theme |

### Implementation

Les redirections seront ajoutees dans `next.config.ts` `redirects()` une fois le domaine bascule.
Pour les articles blog, utiliser un pattern dynamique : `/:slug` avec matching sur les slugs existants.

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
