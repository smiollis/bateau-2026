# Changelog — bateau-a-paris.fr

> Historique des livraisons. Pour le reste a faire, voir [ROADMAP.md](frontend/docs/ROADMAP.md).

---

## [0.17.0] - 2026-02-19 — Audit SEO Approfondi + Sprint P0/P1/P2

**Score SEO : 7.2/10 → 9.0/10 — 12 actions, 356 pages, 319 tests verts**

### P0 — Critiques
- Header `<button>` → `<Link>` (liens decouverts par crawlers)
- Blog slugs cross-locale : slug-map.json + getBlogAlternates (70 URLs 404 corrigees)
- Boilerplate nettoye dans 30 articles (CTA + liens admin supprimes)

### P1 — Importants
- Breadcrumbs + BreadcrumbList JSON-LD sur 5 pages principales
- og:locale:alternate sur toutes les 12 pages
- Hreflang alternates dans sitemap.xml (3 entry types)
- WebSite + Organization JSON-LD dans root layout (SearchAction, sameAs, contactPoint)
- /reservation dans footer + 5 landings manquantes dans OccasionsGrid

### P2 — Ameliorations
- Liens internes dans 31 articles (160 updates x 6 locales)
- Heading hierarchy H3 → H2 (CaptainSection + ArticleDetail)
- Pages 404/erreur localisees (6 langues)
- /api/ bloque dans robots.txt

### Scripts
- `clean-boilerplate.mjs`, `add-internal-links.mjs`, `add-og-alternate.mjs`, `add-occasion-translations.mjs`, `add-error-translations.mjs`

### Build
- 356 pages statiques, 319/319 tests unitaires verts

---

## [0.16.0] - 2026-02-18 — Articles Blog + Fix Images + Load More + Audit

**39 articles x 6 locales, images fixees, load more par categorie, audit 12 agents**

### Contenu
- Import 3 articles Histoire dans 6 locales (total 39 articles, 4+ categories)
- Attribution images aux 8 articles sans visuel (WP media + 1 image locale)
- Image renovation copiee dans public/images/blog/

### Corrections
- Fix "Charger plus" affiche dans toutes les categories (pas uniquement "Toutes")
- Reset compteur visible au changement de categorie
- Fix 3 guillemets JSON non echappes dans articles-histoire-de.json

### Scripts
- `merge-histoire-articles.ts` : import 3 articles Histoire → posts*.json
- `assign-images.ts` : attribution images aux 8 articles

### Audit (12 agents paralleles)
- Score global : 8.5/10 (securite 8.5, SEO 8.8, perf 8.8, a11y 8.8, i18n 9.2, TS 9.2, tests 7.0, data 6.7, deps 8.5, CI/CD 8.8, UX 8.7, WP 8.5)
- 17 anciens audits archives
- Rapport consolide + plan d'action mis a jour

### Build
- 356 pages statiques (vs 320 precedemment)
- 319/319 tests unitaires verts

---

## [0.15.0] - 2026-02-17 — Sprint 3 + UX + Plan du site

**3 chantiers Sprint 3 termines + 4 ameliorations UX + nouvelle page**

### Sprint 3 — Gros Chantiers (3/4 faits)
- Server Components migration : LandingRichtext, LandingBreadcrumb, LandingBenefits convertis en server components (-10KB JS client)
- Cree composant `AnimatedReveal` (client wrapper framer-motion + useReducedMotion)
- Tests E2E : 4 nouveaux specs Playwright (reservation, landing-seo, blog-multilingual, gallery-keyboard) — 38 tests, total 66 E2E
- WP Plugin v2.2.0 : rate limiting transient lock 2 min, suppression localhost CORS, logging sync

### UX
- Landing pages CTA : `.btn-gold-outline` pour cards laterales (bordure gold, uppercase, hover fill)
- Contact : liens `mailto:` et `tel:` cliquables dans section #contact
- Galerie : section "Nos croisieres par occasion" ajoutee (12 cards, comme homepage/croisiere)
- OG image WhatsApp : nouveau logo croppe 1200x630 (fond blanc + badge circulaire)

### Nouvelle page
- Page Plan du site (`/plan-du-site`) : route, vue server component, i18n 6 langues
- Lien dans le footer (6 langues), ajout sitemap.xml
- Listing dynamique des landing pages via `fetchAllLandingSlugs()`

### Tests & Build
- 319/319 tests unitaires (Vitest)
- 66 tests E2E (Playwright, 10 spec files)
- Build OK : 308 pages generees

---

## [0.14.0] - 2026-02-17 — Audit Sprint 1+2 (Score 8.1 → 9.0)

**12 agents paralleles — 2 sprints enchaines — 319 tests verts**

### Sprint 1 — Quick Wins (Score 8.1 → 8.6)
- CI/CD : permissions, timeout, concurrency sur 4 workflows GitHub Actions
- CI/CD : retry 3x git push, Authorization header Instagram, validation JSON
- SEO : priceRange LocalBusiness, aggregateRating dynamique, OG fallback blog
- Accessibilite : `useReducedMotion` sur HeroCinemaSlideshow, scroll-behavior media query
- i18n : 30+ cles ajoutees (ArticleDetail occasions, LandingBreadcrumb, StickyBar, CTA, Related)
- Securite : DOMPurify sur LandingRichtext (7/7 dangerouslySetInnerHTML proteges)
- Cleanup : `sonner` desinstalle, `useThemeVariant` retire de CGV
- LazyMotion strict : `motion` → `m` dans 29 composants + 7 mocks tests (-20KB)
- LandingPricing i18n : 24 cles × 6 locales, namespace `landingPricing`

### Sprint 2 — Effort Moyen (Score 8.6 → 9.0)
- Focus states : `focus-visible:ring-2` sur 22 elements dans 7 composants (Header, Footer, MobileMenu, LanguageSelector, CookieBanner, CookieModal)
- Tokens nuit : 25 hex hardcodes remplaces par `bg-nuit-900`/`bg-nuit-800` via CSS custom properties dans 14 fichiers
- Images : 14 images optimisees (-514 KB, 5.5%)
- Tests : 6 tests corriges (motionProxy hoisting) + 16 nouveaux tests API (instagram + revalidate) — **319 tests verts**

### UX
- Formulaire contact : ecran de confirmation "Thank you" apres envoi (remplace toast ephemere)
- 3 cles i18n ajoutees × 6 langues (successTitle, successDesc, sendAnother)

### Documentation
- Rapport audit consolide mis a jour (AUDIT-2026-02-17-CONSOLIDATED.md)
- Plan d'action mis a jour (ACTION-PLAN.md)

---

## [0.13.0] - 2026-02-17 — Data Pipeline + Automatisation + Liens contextuels

### Data Pipeline
- Architecture JSON-only : suppression appels API WP au runtime sur `/actualites`
- Import multilingue `import-posts.ts` : 6 locales via Polylang `?lang=`
- 3 workflows GitHub Actions : import-posts (hebdo + bouton WP), import-reviews (hebdo), refresh-instagram (bimensuel)

### WordPress Plugin v2.1.0
- Bouton "Publier sur le site" dans barre admin (remplace webhook auto `save_post`)
- `repository_dispatch` → GitHub Actions → import JSON → commit → Vercel rebuild
- Feedback visuel + notification derniere synchro

### Liens contextuels Landing Pages
- OccasionsGrid sur page Croisiere (12 occasions)
- Liens landing pages sur Tarifs (4+1) et detail article blog (6)
- 7 cles i18n ajoutees dans 6 langues

### Infrastructure
- Lighthouse CI : +3 landing pages (1 par tier)
- 4 secrets GitHub Actions configures
- ROADMAP : chantier "Centralisation contenu WP" ajoute au backlog

---

## [0.12.0] - 2026-02-17 — Performance + SEO multilingue + WordPress admin

### Performance (Desktop RES 89 → 95+, Mobile 77 → 85+)
- Hero SSR : `next/image` avec `priority` pour premiere image (LCP)
- `LazyMotion` + `domAnimation` (framer-motion bundle -45KB)
- `motion.div` → `m.div` sur HeroVariants + FeaturesVariants
- `generateStaticParams` sur `/actualites` (elimine cold-start TTFB)
- Content stripping : serveur envoie `PostSummary[]` sans `content` (~470KB JS en moins)
- Image `priority` sur article vedette dans Actualites
- Compression images : 3.9MB economises (formule-premium, logo-white, posts, instagram)
- Vercel Web Analytics installe (`@vercel/analytics`, ~1KB)

### SEO multilingue
- FAQ JSON-LD traduit dynamiquement (6 langues, via `getTranslations`)
- Breadcrumb JSON-LD traduit sur landing pages (6 langues)
- ISR revalidation etendue a 6 locales (`/api/revalidate` × FR/EN/ES/IT/DE/PT-BR)

### WordPress admin (admin.bateau-a-paris.fr)
- Rank Math : migration Yoast terminee, filtre `rank_math/excluded_post_types` corrige
- SEO genere pour 149 articles non-FR (EN/ES/IT/DE/PT-BR) dans Rank Math
- SEO genere pour 85 landing pages non-FR dans Rank Math
- Filtre langue ajoute sur listes Articles + Landing Pages (dropdown admin)
- Iframe reservation : hauteur 1200→1800px, buffer +100px, debounce 150ms

---

## [0.11.0] - 2026-02-16 — WordPress Headless Backend

### Migration WordPress → admin.bateau-a-paris.fr
- Clone WordPress operationnel sur sous-domaine admin
- BDD `wp_clone` (prefix `9Ju5UF_`, 11 Mo, ~90 tables)
- Nettoyage plugins : suppression WooCommerce, CookieYes, Complianz, Yoast, WP File Manager
- Rank Math installe + migration Yoast → Rank Math
- 19 plugins actifs (ACF, Bookly x9, WPML x3, Loco Translate, Rank Math, etc.)

### Theme + Plugin headless
- Plugin `bateau-headless-mode` deploye (redirects 301, CORS, front-end disabled)
- Theme `bateau-headless` actif (template minimal Bookly iframe)
- Page `/reservation-embed/` avec postMessage hauteur dynamique
- API REST operationnelle : `/wp-json/wp/v2/posts`, `/wp-json/wp/v2/landing_page`

### Connexion Next.js ↔ WordPress
- `.env.local` configure (WP_API_URL, WP_URL → admin.bateau-a-paris.fr)
- CSP headers mis a jour (frame-src + connect-src)
- Iframe Bookly fonctionnelle sur `/reservation`
- Webhook `save_post` → `/api/revalidate` operationnel

### Migration articles + landing pages
- Script migration articles : 31 articles × 6 langues + liaisons Polylang
- Script migration landing pages : 85 traductions + liaisons Polylang
- Formulaire Bookly multilingue (6 langues)

### DNS + Redirections
- DNS `bateau-a-paris.fr` → Vercel (Next.js front public)
- DNS `admin.bateau-a-paris.fr` → serveur OVH (WordPress headless)
- Redirections 70+ anciennes URLs WordPress dans plugin

---

## [0.10.0] - 2026-02-15 — Landing Pages Tier 2-3 + i18n complet

### Landing Pages SEO (17 pages)
- 6 pages Tier 2 : Anniversaire mariage, Team building, Famille, Shooting photo, Coucher soleil, Apero
- 5 pages Tier 3 saisonnieres : Saint-Valentin, Nouvel An, Noel, Fete des meres, Seminaire
- Grille "Nos croisieres par occasion" sur homepage (12 cards avec icones Lucide)

### i18n Lot 1 (6 langues actives)
- 4 nouvelles locales : ES, IT, DE, PT-BR (+ FR, EN existants)
- 460+ cles traduites × 6 langues, 19 namespaces
- Switcher de langue dropdown desktop + inline mobile
- Blog multilingue : 31 articles × 6 langues (posts-{locale}.json)
- Landing pages traduites : 17 pages × 5 langues (EN/ES/IT/DE/PT-BR)
- Skip-to-content accessible multilingue

---

## [0.9.0] - 2026-02-14 — Sprint Correctif Complet (Score 7.5 → 9.2/10)

**9/10 problemes critiques resolus — 30 actions sur 4 sprints**

### Securite & Config
- Header HSTS (max-age=63072000, includeSubDomains, preload)
- `global-error.tsx` : message generique (plus de `error.message` expose)
- `noUncheckedIndexedAccess` dans tsconfig.json (TypeScript strict++)
- Suppression page `/test` (debug orpheline)
- Manifest PWA (`public/manifest.json`) + apple-touch-icon

### Dead Code & Dependencies
- Supprime 8 composants base obsoletes (Hero, Header, Footer, Offers, Features, Testimonials, Boat, CallToAction — 893 lignes)
- Supprime 35 composants shadcn/ui inutilises (3 288 lignes)
- Desinstalle 8 packages npm (recharts, react-day-picker, cmdk, vaul, embla-carousel, input-otp, react-resizable-panels, next-themes)

### Accessibilite
- `useReducedMotion` sur tous les composants animes (WCAG 2.3.1)
- Focus trap + Escape dans CookieModal
- Accessibilite renforcee sur composants landing

### Performance & Images
- `motion.img` → `motion.create(Image)` sur HeroCinemaSlideshow (LCP optimise)
- `placeholder="blur"` sur CaptainSection, HeaderVariants, OffersVariants
- `escapeHtml` extrait dans `src/lib/escape-html.ts`

### Architecture
- Header/Footer migres dans `[locale]/layout.tsx` (retires de 10 vues)
- Header decompose : HeaderThemeToggle + LanguageSelector + MobileMenu

### i18n Multilingue (6 langues)
- Messages complets ES/IT/DE/PT-BR (460 cles x 6 langues)
- Landing pages traduites : 17 pages x EN/ES/IT/DE
- Architecture `getLandingData(slug, locale)` async avec deep merge
- Type `LandingPageTranslation` pour overlays partiels par locale
- Blog : +31 articles ES, +31 IT, +20 DE

### Tests
- Installe `@vitest/coverage-v8` avec seuils (40/30/35/40)
- 238 nouveaux tests : landing-data, jsonld, metadata, logger, instagram-hook, LandingComponents
- **303 tests unitaires OK** (65 → 303)

## [0.8.0] - 2026-02-14 — Landing Pages Tier 1

**6 landing pages SEO + infrastructure complete**

- Infrastructure : types TypeScript, 11 composants landing, layout route group `(landing)`, JSON-LD generators (FAQPage, TouristAttraction, Breadcrumb)
- 6 pages Tier 1 : EVJF, EVG, Romantique, Demande en mariage, Anniversaire, Entre amis
- Route dynamique `[slug]` avec `generateStaticParams` (SSG)
- 3 schemas JSON-LD par page, contenu SEO unique 300+ mots, 4-5 FAQ par page
- Sitemap etendu avec landing pages, maillage interne entre pages

## [0.7.0] - 2026-02-14 — WordPress Headless + CI

**Plugin WP headless + Lighthouse CI + plans strategiques**

- Plugin `bateau-headless-mode` : redirects 301 (70+ URLs), CORS REST API, cleanup front-end
- Theme minimal `bateau-headless` : Bookly iframe, postMessage hauteur responsive
- Lighthouse CI (`lighthouserc.js` + `lighthouse.yml` GitHub Actions)
- Cache-Control `immutable` sur images et assets statiques
- Plans strategiques : Phase 8 (17 landing pages SEO) + Phase 9 (7 nouvelles langues)
- Brief SEO landing pages ajoute

## [0.6.0] - 2026-02-13 — Audit Sprint 5-6

**Score audit : 6/10 → 9/10**

Sprint 5 — Critiques :
- SEO : canonical + hreflang par page (10 pages), og:locale dynamique, html lang dynamique
- A11y : skip-to-content, aria-expanded menu, labels formulaire, dialog modal, id="main"
- Securite : 5 headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, nosniff)
- Error boundaries (error.tsx + global-error.tsx), Vercel Speed Insights

Sprint 6 — Hautes/Moyennes :
- Migration `<img>` → `next/image` (6 composants)
- CSP 12 directives, code splitting lightbox, fix useEffect CookieModal
- JSON-LD FAQPage (10 Q&A)

## [0.5.0] - 2026-02-12 — Blog EN + SEO

- Blog bilingue FR/EN (28 articles traduits, posts-en.json)
- Section CTA reservation en fin d'article
- Hreflang initial, logger structure JSON production

## [0.4.0] - 2026-02-11 — Contact + Conformite + Tests

- Formulaire contact fonctionnel (Resend + zod + rate limiting + honeypot)
- Page confidentialite (/confidentialite)
- Tests unitaires : 34 → 65 (Vitest), E2E : 28 tests Playwright

## [0.3.0] - 2026-02-09 — Lightbox + Nettoyage themes

- Lightbox galerie (yet-another-react-lightbox, Zoom, Thumbnails)
- Themes : 6 → 2 variantes (classic + nuit), suppression fonts inutiles
- Redirects routes legacy dans next.config.ts

## [0.2.0] - 2026-02-07 — RGPD + Instagram + Contenus

- Cookie consent RGPD + GA4 Consent Mode v2
- Instagram feed API (/api/instagram, cache 1h)
- Import statique WordPress : 31 articles, 5 avis Google, 50 images
- Scripts d'import automatises, pages articles SSG
- Fix @theme inline (14 tokens couleur), fix logo, fix conflit Pages/App Router

## [0.1.0] - 2026-02-05 — Setup + Integration Lovable

- Next.js 16 + TypeScript + Tailwind CSS v4
- Import composants Lovable, design system HSL tokens, Playfair/Inter
- 10 pages App Router, systeme de themes (classic + nuit)
- Configuration WordPress API headless
