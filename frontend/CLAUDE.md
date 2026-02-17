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
- **Animations**: Framer Motion 12 (avec `useReducedMotion` WCAG 2.3.1)
- **TypeScript**: strict mode + `noUncheckedIndexedAccess`
- **i18n**: next-intl 4 (FR/EN/ES/IT/DE/PT-BR) — 460 cles, 19 namespaces, blog multilingue
- **Analytics**: GA4 (G-N20S788YDW) + Google Consent Mode v2
- **API**: Instagram Graph API, WordPress REST API (reservation Bookly)
- **Logging**: `src/lib/logger.ts` — JSON structure en production, lisible en dev
- **Fonts**: Playfair Display (headings), Inter (body) via `next/font/google`
- **Securite**: CSP (12 directives), HSTS, DOMPurify, 6 security headers
- **SEO**: Canonical + hreflang + JSON-LD (4 schemas base + 3 par landing page)
- **Landing pages**: 17 pages SSG (route dynamique `[slug]`), traduites EN/ES/IT/DE

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

- **Tailwind v4** : les couleurs custom DOIVENT etre enregistrees dans `@theme inline {}` dans `globals.css` pour que les utility classes fonctionnent
- **Next.js static imports** : `import img from "@/assets/x.png"` retourne un objet `{ src, width, height }`, pas une string. Utiliser `.src` pour les `<img>` tags
- **Pages Router conflit** : ne PAS creer de fichiers dans `src/pages/` — utiliser `src/views/` a la place
- **Cookie consent** : le tracking GA4 ne demarre qu'apres consentement (Consent Mode v2 defaults "denied" pour EU)
- **Instagram token** : expire le 2026-04-04 — voir section "Renouvellement token Instagram" ci-dessous
- **Blog bilingue** : `posts.json` (FR) + `posts-en.json` (EN), chargement par locale dans views et pages
- **Logger** : utiliser `logger.error/warn/info` de `@/lib/logger` au lieu de `console.error`
- **Images** : TOUJOURS utiliser `next/image` (pas de `<img>`) — toutes les images sont migrees
- **CSP** : le header Content-Security-Policy est dans `next.config.ts` — penser a ajouter les domaines si on integre un nouveau service
- **DOMPurify** : TOUJOURS utiliser DOMPurify sur `dangerouslySetInnerHTML` (contenu WordPress)
- **Code splitting** : utiliser `next/dynamic` avec `ssr: false` pour les composants lourds client-only (ex: GalleryLightbox)
- **JSON-LD** : 4 schemas en place (LocalBusiness, FAQPage, Offers/TouristTrip, Article) — ajouter de nouveaux schemas dans les `page.tsx` server components
- **Metadata** : utiliser `getAlternates(locale, path)` et `getOgLocale(locale)` de `@/lib/metadata` pour les `generateMetadata`
- **Landing i18n** : `getLandingData(slug, locale)` dans `src/data/landings/index.ts` fait un deep merge FR base + overlay locale. Les fichiers `i18n/<locale>/<slug>.ts` exportent un type `LandingPageTranslation` (partiel)
- **Animations** : TOUJOURS utiliser `useReducedMotion()` de framer-motion et conditionner les animations avec `shouldReduceMotion` pour WCAG 2.3.1
- **Header/Footer** : dans `[locale]/layout.tsx` uniquement — NE PAS les ajouter dans les vues

## Commandes

```bash
npm run dev          # Dev server (port 3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run test         # Tests unitaires (Vitest)
npm run test:watch   # Tests unitaires en mode watch
npm run test:e2e     # Tests E2E (Playwright, build + start auto)
npm run test:e2e:ui  # Tests E2E avec interface Playwright
```

## Tests

- **Vitest** : 303 tests unitaires dans `src/__tests__/` (unit/ + components/)
  - Composants : Header, Hero, Footer, Offers, CookieBanner, ContactForm, LandingComponents
  - Libs : cookie-consent, gtag, utils, escapeHtml, jsonld, metadata, logger, instagram-hook
  - Data : landing-data (158 tests)
  - Coverage : `@vitest/coverage-v8` avec seuils (40/30/35/40)
- **Playwright** : 28 tests E2E dans `e2e/` (chromium, firefox, webkit, mobile)
- **axe-core** : audits accessibilite WCAG 2.1 AA integres aux E2E
- Config : `vitest.config.ts`, `playwright.config.ts`
- Setup : `src/__tests__/setup.ts` (jest-dom, gtag mock)

## SEO

- **Canonical** : unique par page (10 pages + landing pages) via `generateMetadata`
- **Hreflang** : FR/EN + x-default par page via `getAlternates()`
- **og:locale** : dynamique via `getOgLocale()`
- **JSON-LD** :
  - `LocalBusiness` : root layout
  - `FAQPage` : page FAQ (10 Q&A) + chaque landing page
  - `TouristAttraction` + `Offer` : chaque landing page
  - `BreadcrumbList` : chaque landing page
  - `Offers` (TouristTrip) : page croisiere
  - `Article` : `src/views/ArticleDetail.tsx`
  - Generators : `src/lib/seo/jsonld.ts`
- **Sitemap** : `src/app/sitemap.ts` (statiques + articles + landing pages, multi-locale)

## Securite

- **Headers** (dans `next.config.ts headers()`) :
  - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  - Content-Security-Policy: 12 directives
- **poweredByHeader** : false
- **DOMPurify** : `src/views/ArticleDetail.tsx` (contenu WordPress)
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
- **Plugin** : `bateau-headless-mode` (redirects 301, CORS, front-end disabled)
- **Plugins actifs** : 19 (ACF, Bookly x9, WPML x3, Loco Translate, Rank Math, etc.)
- **API** : `https://admin.bateau-a-paris.fr/wp-json/`
- **Reservation iframe** : `https://admin.bateau-a-paris.fr/reservation-embed/` (template `page-reservation-embed.php`)
- **PostMessage** : type `bookly-height` (iframe -> parent Next.js)

### Deploiement

- **Frontend** : Vercel (auto-deploy on push to main)
- **WordPress** : Plesk-managed sur OVH

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

3. **Vercel/production** : mettre a jour la variable d'environnement dans le dashboard Vercel/Coolify.

Le token est valide 60 jours. Renouveler au moins 10 jours avant expiration.

## Score audit

**Score actuel : 9.2/10** (voir `AUDIT-2026-02-14.md`)

| Categorie | Score | Statut |
|-----------|-------|--------|
| Securite | 9.5/10 | HSTS, CSP, 6 headers, 0 XSS |
| Performance | 9/10 | next/image partout, blur placeholders, deps nettoyees |
| SEO | 9/10 | 10+ pages, 7 JSON-LD, OG images |
| Accessibilite | 9/10 | WCAG 2.1 AA, reduced-motion, focus trap |
| Qualite code | 9/10 | 0 code mort, escapeHtml extrait |
| Tests | 9/10 | 303/303 unitaires + 28/28 E2E, coverage ~40% |
| TypeScript | 9.5/10 | strict + noUncheckedIndexedAccess |
| i18n | 9/10 | 6 langues actives, 460 cles, 17 landing pages |
| Images | 9/10 | next/image, blur, OG, AVIF |
| Architecture | 9.5/10 | layout.tsx unique, composants decomposes |

Reste a faire (basse priorite) : contrastes gold/blanc, blog PT-BR, landing PT-BR, middleware proxy.

## Briefs de reference

Les specs completes sont dans `/work/projects/MICHEL/bateau-2026/brief/` :
- `bateau-a-paris_briefs-complets.md` — brief principal (specs pages, design, phases)
- `cookie-notice-rgpd.md` — architecture cookie consent
- `setup-initial-projet.md` — setup environnement dev
- `brief-claude-code-phase1.md` — phase 1 integration
- `INDEX-documentation.md` — index de toute la doc
