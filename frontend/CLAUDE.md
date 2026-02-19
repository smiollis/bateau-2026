# CLAUDE.md - Contexte Projet bateau-a-paris.fr

## Projet

Site vitrine + reservation pour **Un Bateau a Paris** — croisieres privees sur la Seine.
Refonte complete : WordPress front-end -> Next.js headless + WordPress API backend.

## Architecture

```
bateau-2026/
├── brief/                    # Documentation projet (5 briefs .md)
├── frontend/                 # Next.js 16 + TypeScript + Tailwind CSS v4
│   ├── src/
│   │   ├── app/              # App Router (layout, pages, API routes, error boundaries)
│   │   │   └── [locale]/
│   │   │       ├── (landing)/  # Route group landing pages
│   │   │       │   ├── layout.tsx
│   │   │       │   └── [slug]/page.tsx  # Page dynamique SSG
│   │   │       └── ...         # Pages principales (croisiere, galerie, faq, etc.)
│   │   ├── views/            # Page components (ex-src/pages/, renomme pour eviter conflit Pages Router)
│   │   ├── components/       # Composants React (ui/, cookie-consent/, Variants, landing/)
│   │   │   └── landing/      # 11 composants landing reutilisables
│   │   ├── contexts/         # ThemeVariantContext (2 themes: classic/nuit)
│   │   ├── hooks/            # useCookieConsent, useInstagramFeed
│   │   ├── lib/              # cookie-consent, gtag, logger, metadata, utils
│   │   │   └── seo/          # jsonld.ts (FAQPage, TouristAttraction, Breadcrumb)
│   │   ├── data/
│   │   │   ├── landings/     # Donnees par landing page (types.ts, index.ts, {slug}.ts)
│   │   │   ├── landings/i18n/ # Traductions landing pages (en/, es/, it/, de/)
│   │   │   ├── posts.json    # Articles blog FR
│   │   │   ├── posts-en.json # Articles blog EN
│   │   │   ├── posts-es.json # Articles blog ES
│   │   │   ├── posts-it.json # Articles blog IT
│   │   │   ├── posts-de.json # Articles blog DE
│   │   │   └── reviews.json  # Avis Google
│   │   ├── i18n/             # next-intl config (request.ts, navigation.ts, routing.ts)
│   │   └── assets/           # Images statiques, logo, map/
│   ├── .env.local            # WP_API, GA_ID, INSTAGRAM_TOKEN (gitignore)
│   └── package.json
├── wordpress/
│   ├── plugins/bateau-headless-mode/  # Plugin headless (redirects, CORS)
│   └── themes/bateau-headless/        # Theme minimal Bookly iframe
├── ROADMAP.md
├── CHANGELOG.md
└── AUDIT-2026-02-14.md       # Audit qualite approfondi (9.2/10)
```

## Stack technique

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **UI**: Tailwind CSS v4 (`@theme inline` pour les tokens), shadcn/ui (epure), Radix UI
- **Animations**: Framer Motion 12 (LazyMotion + `m` components, `useReducedMotion` WCAG 2.3.1)
- **TypeScript**: strict mode + `noUncheckedIndexedAccess`
- **i18n**: next-intl 4 (FR/EN/ES/IT/DE/PT-BR) — 490+ cles, 20 namespaces, blog multilingue
- **Analytics**: GA4 (G-N20S788YDW) + Vercel Web Analytics + Google Consent Mode v2
- **API**: Instagram Graph API, WordPress REST API (reservation Bookly via iframe)
- **Logging**: `src/lib/logger.ts` — JSON structure en production, lisible en dev
- **Fonts**: Playfair Display (headings), Inter (body) via `next/font/google`
- **Securite**: CSP (12 directives), HSTS, 6 security headers
- **SEO**: Canonical + hreflang 6 locales (HTML head + sitemap) + og:locale:alternate + JSON-LD (9 schemas : LocalBusiness, WebSite, Organization, Article, FAQPage, TouristTrip, TouristAttraction, Offer, BreadcrumbList) + breadcrumbs (5 pages + landings), Rank Math sur WP
- **Landing pages**: 17 pages SSG (route dynamique `[slug]`), traduites EN/ES/IT/DE/PT-BR
- **Server Components**: LandingBreadcrumb, LandingRichtext, LandingBenefits (async server), AnimatedReveal (client wrapper animations)
- **Data pipeline**: JSON-only (pas d'appels API WP au runtime). Import via GitHub Actions + bouton WP "Publier sur le site"
- **CI/CD**: 4 workflows GitHub Actions (import-posts, import-reviews, refresh-instagram, lighthouse)

## Systeme de themes

2 variantes gerees par `ThemeVariantContext` (default: `"classic"`):
- **classic** : Navy/gold, Playfair Display (mode jour)
- **nuit** : Deep navy, night mode (mode sombre)

Tous les composants `*Variants.tsx` utilisent `isDark` (ternaire) pour adapter leur style.

## Convention de nommage

- Pages App Router : `src/app/[locale]/<route>/page.tsx` (wrappers simples)
- Landing pages : `src/app/[locale]/(landing)/[slug]/page.tsx` (route dynamique SSG)
- Landing data : `src/data/landings/<slug>.ts` (une par page, importee dans `index.ts`)
- Landing i18n : `src/data/landings/i18n/<locale>/<slug>.ts` (traduction partielle par locale)
- Landing composants : `src/components/landing/<LandingNom>.tsx` (11 composants)
- Vues : `src/views/<NomPage>.tsx` (composants de page complets)
- Composants variantes : `src/components/<Nom>Variants.tsx`
- Hooks : `src/hooks/use<Nom>.ts`
- Libs : `src/lib/<nom>.ts`

## Points d'attention

- **Tailwind v4** : les couleurs custom DOIVENT etre enregistrees dans `@theme inline {}` dans `globals.css` pour que les utility classes fonctionnent. Tokens nuit : `bg-nuit-900` (#0a1628), `bg-nuit-800` (#0d1d35) — definis via CSS custom properties `--nuit-*` dans `:root`
- **Next.js static imports** : `import img from "@/assets/x.png"` retourne un objet `{ src, width, height }`, pas une string. Utiliser `.src` pour les `<img>` tags
- **Pages Router conflit** : ne PAS creer de fichiers dans `src/pages/` — utiliser `src/views/` a la place
- **Cookie consent** : le tracking GA4 ne demarre qu'apres consentement (Consent Mode v2 defaults "denied" pour EU)
- **Instagram token** : expire le 2026-04-04 — voir section "Renouvellement token Instagram" ci-dessous
- **Blog multilingue** : 39 articles x 6 locales dans `posts.json` (FR) + `posts-{locale}.json`, 4 categories (Actualites, Decouverte, Histoire, Pont de Paris), JSON statique uniquement, importe via GitHub Actions
- **Logger** : utiliser `logger.error/warn/info` de `@/lib/logger` au lieu de `console.error`
- **Images** : TOUJOURS utiliser `next/image` (pas de `<img>`) — toutes les images sont migrees
- **CSP** : le header Content-Security-Policy est dans `next.config.ts` — penser a ajouter les domaines si on integre un nouveau service
- **DOMPurify** : supprime des server components landing (contenu CMS trusted via ACF). Reste en place sur les composants client qui rendent du HTML WP
- **Code splitting** : utiliser `next/dynamic` avec `ssr: false` pour les composants lourds client-only (ex: GalleryLightbox)
- **JSON-LD** : 7 schemas en place (LocalBusiness, FAQPage, Offers/TouristTrip, Article, TouristAttraction, BreadcrumbList, Offer) — ajouter de nouveaux schemas dans les `page.tsx` server components
- **Metadata** : utiliser `getAlternates(locale, path)`, `getBlogAlternates(locale, slug)`, `getOgLocale(locale)` et `getOgAlternateLocales(locale)` de `@/lib/metadata` pour les `generateMetadata`
- **Blog cross-locale** : `slug-map.json` mappe les slugs FR → slugs locaux. `getBlogAlternates()` resout le hreflang par slug local. `generateStaticParams` genere les params par locale
- **Landing i18n** : `getLandingData(slug, locale)` dans `src/data/landings/index.ts` fait un deep merge FR base + overlay locale. Les fichiers `i18n/<locale>/<slug>.ts` exportent un type `LandingPageTranslation` (partiel)
- **Animations** : TOUJOURS utiliser `useReducedMotion()` de framer-motion et conditionner les animations avec `shouldReduceMotion` pour WCAG 2.3.1. Utiliser `m` (pas `motion`) car `LazyMotion` est active dans Providers.tsx
- **Header/Footer** : dans `[locale]/layout.tsx` uniquement — NE PAS les ajouter dans les vues

## Commandes

```bash
npm run dev              # Dev server (port 3000)
npm run build            # Production build
npm run start            # Production server
npm run lint             # ESLint
npm run test             # Tests unitaires (Vitest)
npm run test:watch       # Tests unitaires en mode watch
npm run test:e2e         # Tests E2E (Playwright, build + start auto)
npm run test:e2e:ui      # Tests E2E avec interface Playwright
npm run import:posts     # Import articles WP (6 locales → posts*.json)
npm run import:reviews   # Import avis Google Places → reviews.json
npm run import:instagram # Import Instagram → instagram.json + images
npm run fix:images       # Corriger images manquantes dans posts traduits
npm run fix:links        # Corriger liens hardcodés vers admin WP
npm run fix:all          # Corriger images + liens (combo)
```

## Tests

- **Vitest** : 319 tests unitaires dans `src/__tests__/` (unit/ + components/)
  - Composants : Header, Hero, Footer, Offers, CookieBanner, ContactForm, LandingComponents
  - Libs : cookie-consent, gtag, utils, escapeHtml, jsonld, metadata, logger, instagram-hook
  - API routes : instagram-api (8 tests), revalidate-api (8 tests)
  - Data : landing-data (158 tests)
  - Coverage : `@vitest/coverage-v8` avec seuils (40/30/35/40)
- **Playwright** : 66 tests E2E dans `e2e/` (10 spec files — chromium, firefox, webkit, mobile)
  - Specs : reservation, landing-seo, blog-multilingual, gallery-keyboard, + 6 existants
- **axe-core** : audits accessibilite WCAG 2.1 AA integres aux E2E
- Config : `vitest.config.ts`, `playwright.config.ts`
- Setup : `src/__tests__/setup.ts` (jest-dom, gtag mock)

## SEO

- **Canonical** : unique par page (10 pages + landing pages) via `generateMetadata`
- **Hreflang** : 6 locales + x-default par page via `getAlternates()`
- **og:locale** : dynamique via `getOgLocale()`
- **JSON-LD** :
  - `LocalBusiness` + `WebSite` (SearchAction) + `Organization` (sameAs, contactPoint) : root layout
  - `FAQPage` : page FAQ (10 Q&A) + chaque landing page
  - `TouristAttraction` + `Offer` : chaque landing page
  - `BreadcrumbList` : chaque landing page + croisiere, galerie, faq, actualites, articles
  - `TouristTrip` + 3 `Offer` : page croisiere (itineraire 5 etapes, 3 formules 480/540/660€, aggregateRating dynamique)
  - `Article` : `src/app/[locale]/actualites/[slug]/page.tsx`
  - Generators : `src/lib/seo/jsonld.ts`
- **Sitemap** : `src/app/sitemap.ts` (statiques + articles + landings, multi-locale, hreflang alternates.languages)
- **og:locale:alternate** : toutes les pages via `getOgAlternateLocales(locale)` dans openGraph metadata

## Securite

- **Headers** (dans `next.config.ts headers()`) :
  - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  - Content-Security-Policy: 12 directives
- **poweredByHeader** : false
- **DOMPurify** : `dangerouslySetInnerHTML` proteges dans composants client (ArticleDetail, LandingFAQ, LandingReviews, LandingSEOContent, LandingTestimonials). Supprime de LandingRichtext/LandingBenefits (server components, contenu CMS trusted)
- **Error boundaries** : `error.tsx` + `global-error.tsx`
- **Anti-spam** : rate limiting 3 req/min + honeypot + escapeHtml

## Infrastructure serveur

- **Serveur** : OVH Public Cloud (hr3314558908.reseller.mis.ovh.net) — IP 51.77.228.195
- **OS** : Debian 12 (bookworm)
- **Panel** : Plesk Obsidian 18.0
- **MariaDB** : 10.11.14
- **PHP** : 8.3 (admin.bateau-a-paris.fr)
- **Apache** : 2.4 (Plesk-managed)

### WordPress headless (admin.bateau-a-paris.fr)

- **BDD** : `wp_clone` (prefix `9Ju5UF_`) — 11 Mo, ~90 tables
- **DB user** : `wp_clone_user`
- **Theme** : `bateau-headless` (minimal, Bookly iframe only)
- **Plugin** : `bateau-headless-mode` v2.2.0 (redirects 301, CORS, front-end disabled, bouton "Publier sur le site" → GitHub Actions, rate limiting transient lock 2 min, logging sync)
- **Plugins actifs** : 20 (ACF, Bookly x9, Polylang Pro, Loco Translate, Rank Math, etc.)
- **API** : `https://admin.bateau-a-paris.fr/wp-json/`
- **Reservation iframe** : `https://admin.bateau-a-paris.fr/reservation-embed/` (template `page-reservation-embed.php`)
- **PostMessage** : type `bookly-height` (iframe -> parent Next.js)

### Deploiement

- **Frontend** : Vercel (auto-deploy on push to main)
- **WordPress** : Plesk-managed sur OVH (admin.bateau-a-paris.fr)
- **SSH WordPress** : `ssh admin.bateau-a-paris_k1a2a2s0xbj@admin.bateau-a-paris.fr` → `httpdocs/`
- **GitHub Actions** : 4 workflows (import-posts, import-reviews, refresh-instagram, lighthouse)
- **WP → Site** : bouton admin "Publier sur le site" → `repository_dispatch` → import-posts workflow → commit JSON → Vercel rebuild

## Variables d'environnement (.env.local)

```
NEXT_PUBLIC_WP_API_URL    # URL API WordPress
NEXT_PUBLIC_WP_URL        # URL WordPress (CSP + iframe)
NEXT_PUBLIC_SITE_URL      # URL du site Next.js
NEXT_PUBLIC_GA_ID         # Google Analytics 4 Measurement ID
INSTAGRAM_ACCESS_TOKEN    # Token Instagram Graph API (server-side only)
INSTAGRAM_USER_ID         # ID utilisateur Instagram
RESEND_API_KEY            # Cle API Resend (emails contact)
CONTACT_EMAIL_TO          # Adresse destinataire formulaire contact
```

## Renouvellement token Instagram

Le token Instagram Graph API expire le **2026-04-04**. Pour renouveler :

1. **Methode manuelle** (avant expiration) :
   ```bash
   curl -s "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN_ACTUEL" | jq .
   ```
   Copier le nouveau `access_token` dans `.env.local` (`INSTAGRAM_ACCESS_TOKEN`).

2. **Methode Smash Balloon** : renouveler depuis le panel Smash Balloon sur le WordPress.

3. **Automatique** : GitHub Actions `refresh-instagram.yml` renouvelle le token les 1er et 15 du mois et met a jour le secret GitHub automatiquement.

Le token est valide 60 jours. Le workflow automatique le renouvelle toutes les 2 semaines.

## Score audit

### Audit SEO Approfondi (19 fev 2026) : 9.0/10
Voir `docs/AUDIT-SEO-2026-02-19.md` et `docs/ACTION-PLAN.md`

Session 19 fev : audit SEO approfondi (5 agents) revelant score 7.2/10, sprint correctif P0+P1+P2 (12 actions) → score remonte a 9.0/10.

Actions realisees :
- P0 : header `<button>` → `<Link>`, blog slugs cross-locale (slug-map.json), boilerplate 30 articles nettoye
- P1 : breadcrumbs 5 pages, og:locale:alternate 12 pages, hreflang sitemap, WebSite+Organization JSON-LD, footer+OccasionsGrid
- P2 : liens internes 160 articles, heading H3→H2, 404/erreur localisees, /api/ robots.txt

### Audit Consolide (18 fev 2026) : 8.5/10

| Categorie | 17 fev (S1) | 18 fev |
|-----------|-------------|--------|
| Securite ⚠️ | 9.0 | 8.5 |
| SEO ⚠️ | 9.0 | 8.8 |
| Performance | 8.5 | 8.8 |
| Accessibilite | 8.5 | 8.8 |
| i18n | 9.5 | 9.2 |
| TypeScript | 9.0 | 9.2 |
| Tests | 6.5 | 7.0 |
| Data Quality | 8.5 | 6.7 |
| Dependencies | 9.0 | 8.5 |
| CI/CD | 8.5 | 8.8 |
| UX/Design | 8.5 | 8.7 |
| WordPress | 7.5 | 8.5 |

Prochaine priorite : headers CSP, categories traduites, enrichir articles "Pont de Paris".

### Vercel Speed Insights (17 fev 2026)

| Metrique | Desktop | Mobile |
|----------|---------|--------|
| RES (Real Experience Score) | **94** (Great) | **80** (Needs Improvement) |
| FCP | 2.04s | 2.52s |
| LCP | 2.74s | 4.04s |
| INP | 56ms | 112ms |
| CLS | 0.01 | 0 |
| FID | 1ms | 21ms |
| TTFB | 0.29s | 1.77s |

Desktop : toutes les routes >90 RES. Mobile : homepage a 78 RES (TTFB 1.77s, LCP 4.04s).

### Data Quality : 6.7/10 (18 fev 2026)
Voir `docs/AUDIT-2026-02-18-data-quality.md`

**Etat actuel :** 39 articles x 6 locales, toutes les images assignees.
**Points restants :** slugs non localises (FR dans toutes les locales), categories non traduites.

**Scripts utilitaires :**
- `npm run fix:images` — Copie les images FR vers toutes les locales
- `npm run fix:links` — Remplace les URLs admin par des chemins relatifs
- `node scripts/add-internal-links.mjs` — Ajoute 2-3 liens internes dans les articles sans lien
- `node scripts/clean-boilerplate.mjs` — Supprime les blocs boilerplate commerciaux des articles
- `npx tsx scripts/merge-histoire-articles.ts` — Import articles Histoire
- `npx tsx scripts/assign-images.ts` — Attribution images par slug

## GitHub Actions Secrets

| Secret | Workflow | Description |
|--------|----------|-------------|
| `NEXT_PUBLIC_WP_API_URL` | import-posts | URL API WordPress |
| `GOOGLE_PLACES_API_KEY` | import-reviews | Cle API Google Places |
| `INSTAGRAM_ACCESS_TOKEN` | refresh-instagram | Token Instagram (auto-renouvele) |
| `GH_PAT` | refresh-instagram | PAT GitHub (scope: secrets read/write) |

## wp-config.php (serveur OVH)

```php
define('BATEAU_GITHUB_TOKEN', 'ghp_...');  // Fine-grained PAT (scope: contents read/write)
define('BATEAU_GITHUB_REPO',  'smiollis/bateau-2026');
```

## Briefs de reference

Les specs completes sont dans `/work/projects/MICHEL/bateau-2026/brief/` :
- `bateau-a-paris_briefs-complets.md` — brief principal (specs pages, design, phases)
- `cookie-notice-rgpd.md` — architecture cookie consent
- `setup-initial-projet.md` — setup environnement dev
- `brief-claude-code-phase1.md` — phase 1 integration
- `INDEX-documentation.md` — index de toute la doc
