# Un Bateau a Paris — Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-latest-161618?style=flat-square&logo=radixui)](https://www.radix-ui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Google Analytics](https://img.shields.io/badge/GA4-Consent_Mode_v2-E37400?style=flat-square&logo=googleanalytics&logoColor=white)](https://marketingplatform.google.com/about/analytics/)
[![Audit](https://img.shields.io/badge/Audit-9%2F10-brightgreen?style=flat-square)]()
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)]()

> Site vitrine & reservation pour **Un Bateau a Paris** — croisieres privees sur la Seine.

---

## Stack

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16.1.6 (App Router, Turbopack) |
| UI | Tailwind CSS v4 + shadcn/ui + Radix UI |
| Animations | Framer Motion 12 |
| Language | TypeScript 5 (strict) |
| i18n | next-intl 4 (FR/EN) — 230+ cles, 16 namespaces, blog bilingue |
| Analytics | GA4 + Google Consent Mode v2 |
| API | Instagram Graph API, WordPress REST API |
| Fonts | Playfair Display (headings), Inter (body) |
| Tests | Vitest (65 tests) + Playwright (28 tests) + axe-core WCAG |
| Email | Resend (formulaire de contact) |
| Securite | CSP, DOMPurify, 5 security headers |
| Logging | Logger structure (JSON en prod, lisible en dev) |

## Quick Start

```bash
# Installer les dependances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Editer .env.local avec vos valeurs

# Lancer le serveur de dev
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de dev (Turbopack, port 3000) |
| `npm run build` | Build production |
| `npm run start` | Serveur production |
| `npm run lint` | Linter ESLint |
| `npm run test` | Tests unitaires (Vitest, 65 tests) |
| `npm run test:watch` | Tests unitaires en mode watch |
| `npm run test:e2e` | Tests E2E (Playwright, 28 tests) |
| `npm run test:e2e:ui` | Tests E2E avec interface Playwright |
| `npm run import:all` | Import donnees (articles, avis, images, Instagram) |

## Structure du projet

```
src/
├── app/[locale]/           # App Router — pages avec generateMetadata
│   ├── layout.tsx          # Layout global (fonts, GA4, i18n, providers)
│   ├── page.tsx            # Homepage
│   ├── (landing)/          # Route group landing pages SEO
│   │   ├── layout.tsx      # Layout landing (header + footer)
│   │   └── [slug]/page.tsx # Page dynamique SSG (6 pages Tier 1)
│   ├── actualites/         # Blog (liste + [slug])
│   ├── croisiere/          # Page croisiere
│   ├── galerie/            # Galerie photos (lightbox lazy-loaded)
│   ├── faq/                # FAQ (JSON-LD FAQPage)
│   └── ...                 # reservation, cgv, mentions-legales, confidentialite
├── views/                  # Composants de page complets
├── components/
│   ├── landing/            # 11 composants landing reutilisables (Hero, FAQ, CTA, etc.)
│   ├── ui/                 # shadcn/ui (Button, Card, Switch, etc.)
│   ├── *Variants.tsx       # Composants multi-theme (isDark ternaire)
│   └── ...                 # GalleryLightbox, CookieBanner, CookieModal
├── data/
│   ├── landings/           # Donnees landing pages (types.ts, index.ts, {slug}.ts)
│   └── ...                 # posts.json, posts-en.json, reviews.json, galleryImages
├── lib/
│   ├── seo/jsonld.ts       # Generators JSON-LD (FAQPage, TouristAttraction, Breadcrumb)
│   └── ...                 # cookie-consent, gtag, logger, metadata, utils
├── i18n/                   # Configuration next-intl (request.ts, navigation.ts)
└── assets/                 # Images statiques, logo, map
```

## Themes

2 variantes visuelles gerees par `ThemeVariantContext` :

| Theme | Style | Font heading |
|-------|-------|-------------|
| classic | Navy/gold elegant (jour) | Playfair Display |
| nuit | Deep navy night (sombre) | Playfair Display |

## SEO

- **Canonical URLs** + **hreflang alternates** (FR/EN + x-default) sur toutes les pages
- **JSON-LD** : LocalBusiness, FAQPage, Offers, Article + 3 schemas par landing (TouristAttraction, FAQPage, Breadcrumb)
- **6 landing pages SEO** Tier 1 (EVJF, EVG, Romantique, Mariage, Anniversaire, Entre amis)
- **Sitemap** dynamique (statiques + articles + landing pages, multi-locale)
- **OpenGraph** + **Twitter cards** avec `og:locale` dynamique (fr_FR/en_US)
- Generators JSON-LD : `src/lib/seo/jsonld.ts`

## Securite

- **Content-Security-Policy** : 12 directives (GA4, Google Fonts, Instagram CDN, WordPress)
- **Security headers** : X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **XSS** : DOMPurify sur tout contenu HTML dynamique (WordPress)
- **RGPD** : GA4 Consent Mode v2, defaults "denied" pour 33 regions EU
- **Anti-spam** : Rate limiting 3 req/min + honeypot + escapeHtml
- **poweredByHeader** : desactive
- **Error boundaries** : `error.tsx` + `global-error.tsx`

## Performance

- **Images** : toutes migrees vers `next/image` (AVIF/WebP, lazy loading, srcset)
- **Code splitting** : lightbox galerie lazy-loaded (`next/dynamic`, ssr: false)
- **Fonts** : `next/font/google` avec CSS variables
- **Monitoring** : Vercel Speed Insights (RUM)

## Tests

| Suite | Nombre | Outils |
|-------|--------|--------|
| Tests unitaires | 65 | Vitest, Testing Library, jsdom |
| Tests E2E | 28 | Playwright (Chromium, Firefox, WebKit) |
| Accessibilite | integre | axe-core WCAG 2.1 AA |
| Mobile | integre | Viewport iPhone 14, touch events |

## Cookie Consent (RGPD)

- Conforme RGPD : aucun tracking avant consentement
- Google Consent Mode v2 : defaults "denied" pour 33 regions EU/EEA
- 3 categories : necessaires (toujours actifs), analytiques, marketing
- Persistance localStorage, versionne
- Lien "Parametres cookies" dans le footer

## Variables d'environnement

```env
NEXT_PUBLIC_WP_API_URL=https://...        # URL API WordPress
NEXT_PUBLIC_WP_URL=https://...            # URL WordPress (CSP + iframe)
NEXT_PUBLIC_SITE_URL=https://...          # URL du site Next.js
NEXT_PUBLIC_GA_ID=G-...                   # Google Analytics 4
INSTAGRAM_ACCESS_TOKEN=...                # Token Instagram Graph API (server-side)
INSTAGRAM_USER_ID=...                     # ID utilisateur Instagram
RESEND_API_KEY=re_...                     # Cle API Resend (emails contact)
CONTACT_EMAIL_TO=...                      # Adresse destinataire formulaire contact
```

## Audit qualite

Score actuel : **9/10** — voir [AUDIT-2026-02-12.md](AUDIT-2026-02-12.md) pour le detail.

| Categorie | Statut |
|-----------|--------|
| Build + TypeScript strict | OK (0 erreur) |
| ESLint | OK (~0 erreur custom) |
| Tests | 65 unitaires + 28 E2E, tous OK |
| SEO | 10/10 pages, 4 schemas JSON-LD |
| Accessibilite | WCAG 2.1 AA substantiel |
| Securite | 5/5 headers (dont CSP), 0 vecteur XSS |
| Performance | next/image partout, AVIF, code splitting |
| Images optimisees | 100% next/image |

## Documentation

- [ROADMAP.md](../ROADMAP.md) — Reste a faire + etat d'avancement
- [CHANGELOG.md](../CHANGELOG.md) — Historique des livraisons
- [AUDIT-2026-02-12.md](AUDIT-2026-02-12.md) — Audit qualite (9/10)
- [CLAUDE.md](CLAUDE.md) — Contexte pour Claude Code
- [brief/](../brief/) — Specs detaillees du projet
