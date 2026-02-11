# Un Bateau a Paris

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-latest-161618?style=flat-square&logo=radixui)](https://www.radix-ui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![WordPress](https://img.shields.io/badge/WordPress-REST_API-21759B?style=flat-square&logo=wordpress)](https://developer.wordpress.org/rest-api/)
[![GA4](https://img.shields.io/badge/GA4-Consent_Mode_v2-E37400?style=flat-square&logo=googleanalytics&logoColor=white)](https://marketingplatform.google.com/about/analytics/)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)]()

![Logo Un Bateau a Paris](Logo_Un-Bateau-A-Paris_Croisiere-privee.png)

> Site vitrine & reservation pour **Un Bateau a Paris** — croisieres privees sur la Seine.
>
> Production : [bateau-a-paris.fr](https://bateau-a-paris.fr)

---

## Architecture

```
bateau-2026/
├── frontend/          # Application Next.js 16 (App Router)
├── brief/             # Specifications et briefs du projet
├── docs/              # Documentation technique
├── ROADMAP.md         # Roadmap priorisee et backlog
└── CHANGELOG.md       # Release notes
```

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 16 (App Router, Turbopack) |
| UI | Tailwind CSS v4 + shadcn/ui + Radix UI |
| Animations | Framer Motion 12 |
| Language | TypeScript 5 (strict) |
| CMS | WordPress (REST API headless) |
| Analytics | GA4 + Google Consent Mode v2 |
| API | Instagram Graph API, WordPress REST API |
| Fonts | Playfair Display, Inter, Michroma, Orbitron |

## Quick Start

```bash
# Cloner le repo
git clone git@github.com:smiollis/bateau-2026.git
cd bateau-2026/frontend

# Installer les dependances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Editer .env.local avec vos valeurs

# Lancer le serveur de dev
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Fonctionnalites

- **6 themes visuels** — classic, modern, minimal, editorial, luxe, nuit (switcher en temps reel)
- **Cookie consent RGPD** — conforme, Google Consent Mode v2, 3 categories, aucun tracking avant consentement
- **Google Analytics 4** — defaults "denied" pour 33 regions EU/EEA, mise a jour apres consentement
- **Instagram feed** — API route server-side avec cache 1h, 9 derniers posts
- **Pages** — Accueil, Galerie, Croisiere, FAQ, CGV, Mentions Legales, Reservation, Actualites
- **Lightbox galerie** — navigation clavier, grille masonry responsive
- **Animations** — Framer Motion sur tous les composants (scroll, hover, transitions)

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

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de dev (Turbopack, port 3000) |
| `npm run build` | Build production |
| `npm run start` | Serveur production |
| `npm run lint` | Linter ESLint |

## Documentation

| Document | Description |
|----------|-------------|
| [ROADMAP.md](ROADMAP.md) | Roadmap priorisee (30-60j) et backlog |
| [CHANGELOG.md](CHANGELOG.md) | Release notes |
| [frontend/README.md](frontend/README.md) | Documentation frontend detaillee |
| [frontend/CLAUDE.md](frontend/CLAUDE.md) | Contexte projet pour Claude Code |
| [brief/](brief/) | Specifications et briefs du projet |
