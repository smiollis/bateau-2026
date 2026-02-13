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
- [x] JSON-LD `FAQPage` (10 Q&A) sur la page FAQ
- [x] JSON-LD `Offers/TouristTrip` sur la page Croisiere
- [x] `src/app/sitemap.ts` (pages statiques + articles dynamiques, multi-locale)
- [x] `src/app/robots.ts`
- [x] OpenGraph + Twitter cards configures
- [x] OG Image par defaut (image du bateau)
- [x] Canonical URLs uniques par page (10 pages) via `generateMetadata`
- [x] Hreflang alternates par page (FR/EN + x-default) via `getAlternates()`
- [x] `og:locale` dynamique (fr_FR/en_US) via `getOgLocale()`
- [x] `<html lang>` dynamique via `getLocale()`
- [x] Helper `src/lib/metadata.ts` (`getAlternates()`, `getOgLocale()`)
- [x] OpenGraph `alternateLocale` (fr_FR + en_US)

### [done] 4.2 Performance
- [x] Import images locales (`public/images/gallery/`, `hero/`, `posts/`)
- [x] `next.config.ts` : remotePatterns (Google avatars, Unsplash, Instagram CDN)
- [x] Redirects routes legacy
- [x] Migration `<img>` → `next/image` (6 composants, toutes images)
- [x] Migration Google Fonts `<link>` → `next/font/google` (Inter, Playfair Display) avec CSS variables
- [x] Suppression `export const dynamic = 'force-dynamic'` sur 8 pages statiques
- [x] Preconnect + DNS prefetch WordPress (accelere chargement iframe Bookly)
- [x] Bundle analysis : dynamic imports, tree-shaking verifie
- [x] Vercel Speed Insights (RUM) — `@vercel/speed-insights` dans root layout
- [x] Code splitting lightbox galerie (`next/dynamic`, ssr: false)
- [x] AVIF image format active (`formats: ['image/avif', 'image/webp']`)
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

## [done] Sprint 5-6 : Audit — Corrections critiques, hautes et moyennes (Semaine 9)

> Issues identifiees et corrigees lors de l'audit approfondi du 2026-02-13
> Voir [AUDIT-2026-02-12.md](frontend/AUDIT-2026-02-12.md) pour le detail complet

### [done] 5a. SEO critique — Canonical & Hreflang par page
- [x] **Canonical URLs par page** — chaque page a son propre canonical (10 pages)
- [x] **Hreflang par page** — chaque page pointe vers son equivalent FR/EN
- [x] **x-default hreflang** sur toutes les pages
- [x] **`og:locale` dynamique** — `fr_FR` sur `/fr/*`, `en_US` sur `/en/*`
- [x] **JSON-LD FAQPage** — 10 Q&A structurees

### [done] 5b. Accessibilite (WCAG Level A)
- [x] **`<html lang>` dynamique** — passe en dynamique via locale
- [x] **Skip-to-content** — lien "Aller au contenu" (premier element focusable)
- [x] **Labels formulaire contact** — `<label htmlFor>` + `<input id>` sur les 4 champs
- [x] **`aria-expanded` menu mobile** — ajoute sur le bouton hamburger
- [x] **Cookie modal `role="dialog"`** — `aria-modal`, `aria-labelledby` ajoutes
- [x] **`id="main"`** sur toutes les vues (9 fichiers)
- [x] **Aria-labels** complets sur carousel et filtres

### [done] 5c. Security headers
- [x] **`poweredByHeader: false`** dans `next.config.ts`
- [x] **Security headers** dans `next.config.ts headers()` :
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
- [x] **Content-Security-Policy** — 12 directives (GA4, Google Fonts, Instagram CDN, WordPress)

### [done] 5d. Performance & Images
- [x] **AVIF** — `formats: ['image/avif', 'image/webp']` dans `next.config.ts`
- [x] **Migration `<img>` → `next/image`** — 6 composants (Boat, CallToAction, Offers, Testimonials, Galerie, Actualites)
- [x] **Instagram CDN** dans `remotePatterns` (*.cdninstagram.com, *.fbcdn.net)
- [x] **Code splitting** — lightbox galerie lazy-loaded (`next/dynamic`, ssr: false)

### [done] 5e. Code quality
- [x] **Fix useEffect deps** CookieModal (`[open]` au lieu de `[open, analytics, marketing]`)
- [x] **DOMPurify** sur `dangerouslySetInnerHTML` (ArticleDetail.tsx — deja en place)
- [x] **Error boundaries** — `error.tsx` + `global-error.tsx`
- [x] **GalleryLightbox.tsx** — nouveau composant wrapper pour code splitting

### Resultat audit
- **Score : 6/10 → 9/10**
- 0 priorite haute restante, 0 priorite moyenne restante
- 5 items basse priorite restants (middleware proxy, composants monolithiques, couverture tests, shadcn @ts-nocheck, interface useInstagramFeed)

---

## [next] Sprint 7 : Redirections WordPress → Next.js

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

## Plans d'action detailles

### Plan d'action Phase 2 : WordPress Headless + Automatisation

> **Objectif** : decoupler WordPress du front-end et automatiser les imports de contenu.
> **Duree estimee** : 3-4 jours
> **Prerequis** : acces SSH/FTP WordPress, acces admin WP, GitHub Actions activees

#### Etape 2.1 — Plugin WordPress Headless Mode (1-2 jours)

1. **Creer le plugin** `wp-content/plugins/bateau-headless-mode/bateau-headless-mode.php`
   - Hook `template_redirect` : redirect 301 toutes les URLs front-end WordPress vers Next.js
   - Exceptions : `/reservation-embed/` (iframe Bookly), `/wp-admin/`, `/wp-login.php`, `/wp-json/`
   - Mapping des anciennes URLs → nouvelles URLs (reprendre le tableau Sprint 7)
2. **Activer CORS** sur les endpoints REST API
   - `add_filter('rest_pre_serve_request')` → header `Access-Control-Allow-Origin` pour le domaine Next.js
   - Autoriser les headers `Content-Type`, `Authorization`
3. **Desactiver les fonctions inutiles** :
   - `remove_action('wp_head', 'wp_generator')` (supprimer version WP)
   - Desactiver RSS feeds front-end, embeds oEmbed, emoji scripts
4. **Tester** : `curl -I https://bateau-a-paris.fr/` doit retourner 301 → Next.js
5. **Deployer** sur le WordPress de production

#### Etape 2.2 — Template Bookly Minimal (0.5 jour)

1. **Creer un theme minimal** `wp-content/themes/bateau-headless/`
   - `style.css` : header theme minimal
   - `functions.php` : enqueue uniquement Bookly CSS/JS
   - `page-reservation-embed.php` : template = `<!DOCTYPE html>` + shortcode Bookly, rien d'autre
2. **Supprimer** tous les CSS/JS du theme Porto (performance iframe)
3. **Activer** le theme `bateau-headless` sur WordPress
4. **Tester** : l'iframe `/reservation-embed/` doit afficher le formulaire Bookly uniquement

#### Etape 2.3 — GitHub Actions Automatisation (1-2 jours)

**Workflow 1 : `import-posts.yml`**
```yaml
# Trigger : quotidien 6h UTC + workflow_dispatch
# Steps : checkout → Node 20 → npm ci → import:posts → import:images → commit + push si diff
# Alternative : webhook WP post_published → repository_dispatch
```

**Workflow 2 : `import-reviews.yml`**
```yaml
# Trigger : hebdomadaire dimanche 6h UTC
# Steps : checkout → Node 20 → npm ci → import:reviews → commit + push si diff
```

**Workflow 3 : `refresh-instagram.yml`**
```yaml
# Trigger : tous les 50 jours (cron: '0 6 */50 * *')
# Steps : curl refresh_access_token → update GitHub secret → notifier si echec
```

**CD** : verifier que le push sur `main` declenche un redeploy automatique (Vercel deploy hook ou Coolify webhook).

---

### Plan d'action Phase 4 restante : Lighthouse & Core Web Vitals

> **Objectif** : Lighthouse > 90, LCP < 2.5s, CLS < 0.1
> **Duree estimee** : 1-2 jours
> **Prerequis** : deploiement production fonctionnel

#### Etape 4.3 — Audit Lighthouse (0.5 jour)

1. **Lancer Lighthouse** sur les 4 pages cles :
   - Homepage (`/fr`), Croisiere (`/fr/croisiere`), Blog (`/fr/actualites`), Galerie (`/fr/galerie`)
2. **Identifier les metriques** :
   - LCP : verifier `<Image priority>` sur hero, `sizes` corrects
   - CLS : verifier FOUT fonts (Playfair Display via `next/font` = OK normalement)
   - INP : verifier event handlers Framer Motion
3. **Corrections selon resultats** :
   - Hero image : ajouter `priority` si manquant
   - Third-party : GA4 charge apres consentement (deja OK)
   - Images below-the-fold : `loading="lazy"` natif `next/image` (deja OK)
   - Preload fonts critiques si necessaire

#### Etape 4.4 — ISR / Cache headers (0.5 jour)

1. **Revalidate** : ajouter `export const revalidate = 3600` sur les pages qui beneficient du cache
2. **Cache-Control** : headers pour assets statiques dans `next.config.ts`
3. **Verifier** : que Vercel/Coolify utilise le CDN pour `/_next/static/` et `/images/`

#### Etape 4.5 — Lighthouse CI (0.5 jour)

1. **Installer** `@lhci/cli` dans devDependencies
2. **Creer** `.lighthouserc.js` avec seuils : Performance > 85, Accessibility > 90, Best Practices > 90, SEO > 95
3. **GitHub Actions** : workflow qui lance Lighthouse CI sur chaque PR
4. **Alertes** : check GitHub qui bloque la PR si les scores sont trop bas

---

### Plan d'action Phase 8 : Landing Pages SEO thematiques

> **Objectif** : creer 17 landing pages longue traine pour capter le trafic a forte intention de conversion.
> **Duree estimee** : 8-12 jours (infra 2j + Tier 1 3-4j + Tier 2 2-3j + Tier 3 1-2j + optimisation 1j)
> **Prerequis** : images thematiques (hero + galerie) par occasion, contenu redactionnel valide
> **Brief complet** : `brief/brief-seo-landing-pages.md`

#### Etape 8a — Infrastructure technique (2 jours)

1. **Types TypeScript** (`src/data/landings/types.ts`)
   - `LandingPageData` : slug, meta (title, description, canonical, ogImage), hero, sections[], relatedPages, jsonLd
   - `LandingSection` : union type (richtext | benefits | gallery | testimonials | pricing | faq)
   - `BenefitItem`, `FAQItem` : types auxiliaires

2. **10 composants reutilisables** (`src/components/landing/`)
   - `LandingHero` : `next/image` (fill, priority), titre H1 + subtitle + CTA, overlay gradient
   - `LandingBenefits` : grille responsive 2x2 → 4 colonnes, icones Lucide parametrables
   - `LandingTestimonials` : filtre avis par tag thematique depuis `reviews.json`
   - `LandingPricing` : reutilise les donnees tarifs existants, CTA vers reservation avec `?occasion={slug}`
   - `LandingFAQ` : accordeon (Radix Accordion), genere automatiquement le JSON-LD FAQPage
   - `LandingGallery` : carrousel horizontal (`next/image`, lazy loading, lightbox optionnel)
   - `LandingCTA` : bloc CTA recurrent (bouton reservation + lien tel `+33670342543`)
   - `LandingStickyBar` : barre fixe bottom mobile (`position: sticky`), boutons Reserver + Appeler
   - `LandingRelated` : cards horizontales avec image + titre des pages liees
   - `LandingBreadcrumb` : fil d'Ariane visible + JSON-LD BreadcrumbList

3. **Layout landing** (`src/app/[locale]/(landing)/layout.tsx`)
   - Route group Next.js (pas de segment d'URL supplementaire)
   - Header simplifie (logo + CTA reservation)
   - Footer standard (reutilise FooterVariants)
   - StickyBar mobile en bas de page

4. **Utilitaires SEO** (`src/lib/seo/jsonld.ts`)
   - `generateFAQPageJsonLd(items: FAQItem[])` → schema FAQPage
   - `generateTouristAttractionJsonLd(landing: LandingPageData)` → schema TouristAttraction + Offer + AggregateRating
   - `generateBreadcrumbJsonLd(items: {name, url}[])` → schema BreadcrumbList
   - Reutilise `getAlternates()` et `getOgLocale()` de `src/lib/metadata.ts`

5. **Sitemap** : ajouter les 17 slugs dans `src/app/sitemap.ts` (FR + EN)

6. **Fichier index** (`src/data/landings/index.ts`)
   - Export centralise de toutes les configs landing
   - Permet l'import dynamique par slug : `getLandingData(slug)`
   - Matrice de maillage interne integree

#### Etape 8b — Pages Tier 1 : 6 pages prioritaires (3-4 jours)

Pour chaque page (EVJF, EVG, Romantique, Demande en mariage, Anniversaire, Entre amis) :

1. **Fichier data** (`src/data/landings/{slug}.ts`)
   - Meta : title (50-60 car.), description (150-160 car.), canonical, ogImage
   - Hero : titre H1, subtitle, image, CTA (`Reservez votre {occasion}`)
   - Sections : richtext (300+ mots), benefits (4 avantages), gallery, testimonials (filtre), pricing, faq (4-5 Q&A)
   - Related pages (3-4 liens)
   - JSON-LD config

2. **Page Next.js** (`src/app/[locale]/(landing)/{slug}/page.tsx`)
   - `generateMetadata()` avec title, description, canonical, og, hreflang
   - Render : assemblage des composants landing dans l'ordre brief
   - 3 scripts JSON-LD : FAQPage + TouristAttraction+Offer + BreadcrumbList

3. **Contenu redactionnel** (par page) :
   - 800-1200 mots uniques, pas de duplicate entre pages
   - Angle et tonalite specifiques (cf. brief section 7)
   - Infos pratiques : prix, duree (2h), capacite (2-12 pers.), lieu depart (Arsenal)
   - Preuves sociales : JO 2024, tournages Adidas/Le Slip Francais, avis Google
   - CTA avec verbes d'action : "Reservez", "Offrez", "Organisez", "Surprenez"

4. **Images** : hero 1920x1080, OG 1200x630, 4-6 photos galerie par page
   - Alt text incluant le mot-cle principal
   - Format AVIF/WebP via `next/image`
   - Hero image avec `priority` (LCP)

5. **Maillage interne** :
   - EVJF ↔ EVG ↔ Shooting Photo ↔ Apero
   - Romantique ↔ Demande en mariage ↔ Anniversaire mariage ↔ Coucher de soleil ↔ Saint-Valentin
   - Anniversaire ↔ Entre amis ↔ Famille ↔ Apero
   - Toutes → /reservation, /croisiere, /tarifs (page tarifs = /croisiere)

#### Etape 8c — Pages Tier 2 : 6 pages secondaires (2-3 jours)

Meme process que Tier 1 pour : Anniversaire mariage, Team building, Famille, Shooting photo, Coucher de soleil, Apero bateau.

Specificites :
- **Team building / Seminaire** : tonalite professionnelle, mention "facture possible", formule sur mesure
- **Shooting photo** : mise en avant du decor (Pont Alexandre III, lumiere doree), collaboration photographes
- **Coucher de soleil** : focus sur la golden hour, parcours avec vue Tour Eiffel

#### Etape 8d — Pages Tier 3 : 5 pages saisonnieres (1-2 jours)

Saint-Valentin, Nouvel An, Noel, Fete des meres, Seminaire.

Specificites :
- Pages activables/desactivables selon la saison (flag `active: boolean` dans les data)
- Pages saisonnieres referencees dans le sitemap toute l'annee (pas de desindexation)
- Contenu adapte a l'evenement (menus speciaux, horaires, disponibilites)

#### Etape 8e — Optimisation & maillage (1 jour)

1. **Maillage depuis les pages existantes** :
   - Homepage : ajouter section "Nos croisieres par occasion" (grille 6 cards Tier 1)
   - Page Croisiere/Tarifs : liens contextuels ("ideal pour un EVJF", "parfait pour un anniversaire")
   - Page Le Bateau : mentionner les differents usages avec liens
   - Articles blog existants : enrichir avec liens vers landing pages pertinentes

2. **Verification technique** :
   - Rich Results Test Google sur chaque page (FAQPage, TouristAttraction, BreadcrumbList)
   - Lighthouse > 90 (Performance, Accessibility, SEO) sur toutes les landings
   - Mobile-first : tester StickyBar, hero image, formulaire CTA
   - Verifier absence de cannibalisation (1 page = 1 intention, pas de chevauchement)

3. **Checklist qualite par page** (cf. brief section 11) :
   - Title unique 50-60 car. + mot-cle en debut
   - Meta description unique 150-160 car. + CTA
   - H1 unique contenant le mot-cle principal
   - 800-1200 mots de contenu unique
   - 3 schemas JSON-LD (FAQ + TouristAttraction + Breadcrumb)
   - CTA sticky mobile + CTA hero
   - 3-4 liens internes + liens /reservation + /croisiere
   - Hero image `priority` + toutes images alt-textees
   - Page dans le sitemap.xml

4. **Version anglaise** (Tier 1 en priorite) :
   - Dupliquer les 6 pages Tier 1 en anglais
   - Hreflang FR ↔ EN sur chaque paire
   - Adapter le contenu (pas de traduction mot a mot, adapter l'angle pour touristes)

---

### Plan d'action Sprint 7 : Redirections WordPress → Next.js

> **Objectif** : basculer le domaine sans perdre le SEO acquis
> **Duree estimee** : 2-3 jours
> **Prerequis** : Phase 2 completee, deploiement production Next.js, acces DNS

#### Etape 7.1 — Implementer les redirections (1 jour)

1. **Crawler** le sitemap WordPress actuel (`sitemap_index.xml`)
2. **Implementer** dans `next.config.ts redirects()` :
   - ~25 pages principales (1-pour-1)
   - ~30 articles blog (pattern `:slug` → `/fr/actualites/:slug`)
   - ~8 reservation URLs → `/fr/reservation`
   - ~10 WooCommerce/landing → `/fr/reservation` ou `/fr/croisiere`
   - Wildcards : `/category/*` → `/fr/actualites`, `/en/category/*` → `/en/actualites`
3. **410 Gone** : URLs techniques Porto (`/?porto_builder=*`)
4. **Tester en local** : `curl -I localhost:3000/croisiere-privee-seine-paris/` → 301

#### Etape 7.2 — Bascule DNS (0.5 jour)

1. **DNS** : pointer A/CNAME `bateau-a-paris.fr` vers Vercel/Coolify
2. **WordPress** : migrer sur `wp.bateau-a-paris.fr` (sous-domaine)
3. **Mettre a jour** `.env` : `NEXT_PUBLIC_WP_URL=https://wp.bateau-a-paris.fr`
4. **SSL** : verifier Let's Encrypt sur les deux domaines
5. **Iframe Bookly** : mettre a jour l'URL iframe dans `Reservation.tsx`

#### Etape 7.3 — Verification post-bascule (1 jour)

1. **Crawl test** : Screaming Frog ou script `curl -I` sur les 70+ anciennes URLs
2. **Google Search Console** :
   - Soumettre le nouveau sitemap (`https://bateau-a-paris.fr/sitemap.xml`)
   - Verifier l'indexation sur 48h
   - Monitorer les erreurs 404/soft 404
3. **Monitoring 2 semaines** :
   - Analytics : verifier le trafic organique (pas de chute brutale)
   - Search Console : verifier les impressions/clics
   - Corriger les redirections manquantes au fur et a mesure
4. **SEO** : verifier que les positions Google sont maintenues

---

## [next] Phase 8 : Landing Pages SEO thematiques

> Brief detaille : [`brief/brief-seo-landing-pages.md`](brief/brief-seo-landing-pages.md)
> 17 landing pages ciblant des expressions longue traine a forte intention de conversion.
> Chaque page = 1 intention de recherche = 800-1200 mots de contenu unique + FAQ + JSON-LD.

### 8.1 Infrastructure technique (Sprint 8a)

- [ ] Types TypeScript (`src/data/landings/types.ts`) : `LandingPageData`, `LandingSection`, `BenefitItem`, `FAQItem`
- [ ] Composants reutilisables `src/components/landing/` :
  - [ ] `LandingHero.tsx` — Hero image de fond + H1 + subtitle + CTA principal
  - [ ] `LandingBenefits.tsx` — Grille 2x2 / 4 colonnes avantages (icone + titre + texte)
  - [ ] `LandingTestimonials.tsx` — Avis clients filtres par thematique
  - [ ] `LandingPricing.tsx` — Encart tarifs simplifie + CTA
  - [ ] `LandingFAQ.tsx` — Accordeon FAQ + schema FAQPage JSON-LD
  - [ ] `LandingGallery.tsx` — Carrousel photos thematiques
  - [ ] `LandingCTA.tsx` — Bloc CTA recurrent (reservation + tel)
  - [ ] `LandingStickyBar.tsx` — Barre CTA sticky mobile (reserver + appeler)
  - [ ] `LandingRelated.tsx` — Cards maillage interne (3-4 pages liees)
  - [ ] `LandingBreadcrumb.tsx` — Fil d'Ariane + schema BreadcrumbList
- [ ] Layout commun `src/app/[locale]/(landing)/layout.tsx` (header simplifie, CTA sticky)
- [ ] Generateur JSON-LD `src/lib/seo/jsonld.ts` (FAQPage, TouristAttraction+Offer, BreadcrumbList)
- [ ] Mise a jour `src/app/sitemap.ts` pour inclure les landing pages
- [ ] Convention images : `public/images/landings/{slug}-hero.jpg`, `{slug}-og.jpg`, `{slug}-gallery-0X.jpg`

### 8.2 Pages Tier 1 — 6 pages prioritaires (Sprint 8b)

| # | Slug | Cible | Tonalite |
|---|------|-------|----------|
| 1 | `/evjf-seine` | EVJF bateau Seine Paris | Festif, complice |
| 2 | `/evg-seine` | EVG bateau Seine Paris | Fun, aventure |
| 3 | `/croisiere-romantique-seine` | Croisiere romantique Paris | Intime, poetique |
| 4 | `/demande-en-mariage-seine` | Demande mariage bateau Paris | Emotion, surprise |
| 5 | `/anniversaire-seine` | Anniversaire bateau Seine Paris | Celebration, convivialite |
| 6 | `/soiree-entre-amis-seine` | Soiree amis bateau Seine | Decontracte, fun |

Pour chaque page :
- [ ] Fichier data `src/data/landings/{slug}.ts` (meta, hero, sections, FAQ, relatedPages)
- [ ] Page Next.js `src/app/[locale]/(landing)/{slug}/page.tsx`
- [ ] Contenu SEO unique 800-1200 mots
- [ ] 4-5 FAQ specifiques
- [ ] JSON-LD FAQPage + TouristAttraction+Offer + BreadcrumbList
- [ ] Images hero + OG (1200x630) + galerie
- [ ] Maillage interne configure

### 8.3 Pages Tier 2 — 6 pages secondaires (Sprint 8c)

| # | Slug | Cible |
|---|------|-------|
| 7 | `/anniversaire-mariage-seine` | Anniversaire mariage bateau Paris |
| 8 | `/team-building-seine` | Team building bateau Seine Paris |
| 9 | `/croisiere-famille-seine` | Croisiere famille privee Paris |
| 10 | `/shooting-photo-seine` | Shooting photo bateau Seine Paris |
| 11 | `/coucher-soleil-seine` | Croisiere coucher soleil Paris |
| 12 | `/apero-bateau-seine` | Apero bateau Seine Paris |

### 8.4 Pages Tier 3 — 5 pages saisonnieres (Sprint 8d)

| # | Slug | Cible |
|---|------|-------|
| 13 | `/saint-valentin-seine` | Saint-Valentin bateau Paris |
| 14 | `/nouvel-an-seine` | Reveillon bateau Seine Paris |
| 15 | `/croisiere-noel-seine` | Croisiere Noel Paris bateau |
| 16 | `/fete-des-meres-seine` | Fete des meres bateau Paris |
| 17 | `/seminaire-seine` | Seminaire bateau Seine Paris |

### 8.5 Maillage interne & optimisation (Sprint 8e)

- [ ] Matrice de liens entre landing pages (EVJF↔EVG, Romantique↔Mariage↔Coucher de soleil, etc.)
- [ ] Liens contextuels depuis pages existantes (Tarifs, Le Bateau, Croisiere)
- [ ] Section "Nos croisieres par occasion" sur la homepage (grille de cards)
- [ ] Enrichir les articles blog existants avec liens vers landing pages
- [ ] Verification Rich Results Test Google sur chaque page
- [ ] Lighthouse > 90 sur toutes les landings
- [ ] Version anglaise des landing pages (Tier 1 en priorite)

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
- [ ] CI/CD pipeline (GitHub Actions) — *voir Phase 2.3*
- [ ] Tests automatises pre-deploy
- [ ] Staging environment automatique par PR
- [ ] Migration WordPress vers cloud manage (si besoin)
- [ ] CDN images dedie (Cloudinary, imgix)
- [ ] Refresh automatique du token Instagram (cron) — *voir Phase 2.3*
- [ ] Cron import articles WordPress — *voir Phase 2.3*
- [ ] Cron import avis Google — *voir Phase 2.3*

### Basse priorite (audit)
- [ ] Middleware next-intl : migrer vers proxy quand next-intl publie une API compatible
- [ ] Composants monolithiques : decouper Croisiere.tsx, Actualites.tsx (>250 lignes)
- [ ] Couverture tests composants : passer de 15% a 25%+
- [ ] Composants shadcn @ts-nocheck : chart.tsx, resizable.tsx
- [ ] Interface useInstagramFeed : clarifier le retour API
