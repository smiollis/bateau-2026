# Un Bateau a Paris — Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-latest-161618?style=flat-square&logo=radixui)](https://www.radix-ui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Google Analytics](https://img.shields.io/badge/GA4-Consent_Mode_v2-E37400?style=flat-square&logo=googleanalytics&logoColor=white)](https://marketingplatform.google.com/about/analytics/)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)]()

> Site vitrine & reservation pour **Un Bateau a Paris** — croisieres privees sur la Seine.

---

## Stack

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | Tailwind CSS v4 + shadcn/ui + Radix UI |
| Animations | Framer Motion |
| Language | TypeScript 5 (strict) |
| Analytics | GA4 + Google Consent Mode v2 |
| API | Instagram Graph API, WordPress REST API |
| Fonts | Playfair Display, Inter |
| i18n | next-intl (FR/EN) |
| Tests | Vitest + Playwright + axe-core |
| Email | Resend (formulaire de contact) |

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
| `npm run test` | Tests unitaires (Vitest, 39 tests) |
| `npm run test:watch` | Tests unitaires en mode watch |
| `npm run test:e2e` | Tests E2E (Playwright, 28 tests) |
| `npm run test:e2e:ui` | Tests E2E avec interface Playwright |

## Structure du projet

```
src/
├── app/                  # App Router (pages, layout, API routes)
│   ├── api/instagram/    # API route Instagram feed
│   ├── layout.tsx        # Layout global (fonts, GA4, Providers)
│   └── */page.tsx        # Pages (wrappers vers views/)
├── views/                # Composants de page complets
├── components/
│   ├── ui/               # shadcn/ui (Button, Card, Switch, etc.)
│   ├── cookie-consent/   # CookieProvider
│   ├── *Variants.tsx     # Composants multi-theme
│   ├── CookieBanner.tsx  # Banner RGPD
│   └── CookieModal.tsx   # Modal parametres cookies
├── contexts/             # ThemeVariantContext (6 themes)
├── hooks/                # useCookieConsent, useInstagramFeed
├── lib/                  # cookie-consent, gtag, utils
├── types/                # TypeScript declarations
├── data/                 # Donnees statiques (galleryImages)
└── assets/               # Images, logo, map
```

## Themes

2 variantes visuelles gerees par `ThemeVariantContext` :

| Theme | Style | Font heading |
|-------|-------|-------------|
| classic | Navy/gold elegant (jour) | Playfair Display |
| nuit | Deep navy night (sombre) | Playfair Display |

## Variables d'environnement

```env
# WordPress API
NEXT_PUBLIC_WP_API_URL=https://bateau-a-paris.fr/wp-json
NEXT_PUBLIC_WP_URL=https://bateau-a-paris.fr
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Instagram (server-side)
INSTAGRAM_ACCESS_TOKEN=IGAA...
INSTAGRAM_USER_ID=12345...
```

## Cookie Consent (RGPD)

- Conforme RGPD : aucun tracking avant consentement
- Google Consent Mode v2 : defaults "denied" pour 33 regions EU/EEA
- 3 categories : necessaires (toujours actifs), analytiques, marketing
- Persistance localStorage, versionne
- Lien "Parametres cookies" dans le footer

## Documentation

- [ROADMAP.md](../ROADMAP.md) — Roadmap priorisee et backlog
- [CHANGELOG.md](../CHANGELOG.md) — Release notes
- [brief/](../brief/) — Specs detaillees du projet
