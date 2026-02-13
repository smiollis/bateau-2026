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
│   │   ├── app/              # App Router (layout, pages, API routes)
│   │   ├── views/            # Page components (ex-src/pages/, renomme pour eviter conflit Pages Router)
│   │   ├── components/       # Composants React (ui/, cookie-consent/, Variants)
│   │   ├── contexts/         # ThemeVariantContext (2 themes: classic/nuit)
│   │   ├── hooks/            # useCookieConsent, useInstagramFeed
│   │   ├── lib/              # cookie-consent, gtag, logger, utils
│   │   ├── types/            # cookie-consent.d.ts
│   │   ├── data/             # posts.json, posts-en.json, galleryImages, reviews
│   │   └── assets/           # Images statiques, logo, map/
│   ├── .env.local            # WP_API, GA_ID, INSTAGRAM_TOKEN (gitignore)
│   └── package.json
└── ROADMAP.md
```

## Stack technique

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **UI**: Tailwind CSS v4 (`@theme inline` pour les tokens), shadcn/ui, Radix UI
- **Animations**: Framer Motion
- **TypeScript**: strict mode
- **i18n**: next-intl (FR/EN) — 230+ cles, 16 namespaces, blog bilingue
- **Analytics**: GA4 (G-N20S788YDW) + Google Consent Mode v2
- **API**: Instagram Graph API, WordPress REST API (reservation Bookly)
- **Logging**: `src/lib/logger.ts` — JSON structure en production, lisible en dev
- **Fonts**: Playfair Display (headings), Inter (body)

## Systeme de themes

2 variantes gerees par `ThemeVariantContext` (default: `"classic"`):
- **classic** : Navy/gold, Playfair Display (mode jour)
- **nuit** : Deep navy, night mode (mode sombre)

Tous les composants `*Variants.tsx` utilisent `isDark` (ternaire) pour adapter leur style.

## Convention de nommage

- Pages App Router : `src/app/[locale]/<route>/page.tsx` (wrappers simples)
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

- **Vitest** : 65 tests unitaires dans `src/__tests__/` (unit/ + components/)
  - Composants : Header, Hero, Footer, Offers, CookieBanner, ContactForm
  - Libs : cookie-consent, gtag, utils, escapeHtml
- **Playwright** : 28 tests E2E dans `e2e/` (chromium, firefox, webkit, mobile)
- **axe-core** : audits accessibilite WCAG 2.1 AA integres aux E2E
- Config : `vitest.config.ts`, `playwright.config.ts`
- Setup : `src/__tests__/setup.ts` (jest-dom, gtag mock)

## Variables d'environnement (.env.local)

```
NEXT_PUBLIC_WP_API_URL    # URL API WordPress
NEXT_PUBLIC_WP_URL        # URL WordPress
NEXT_PUBLIC_SITE_URL      # URL du site Next.js
NEXT_PUBLIC_GA_ID         # Google Analytics 4 Measurement ID
INSTAGRAM_ACCESS_TOKEN    # Token Instagram Graph API (server-side only)
INSTAGRAM_USER_ID         # ID utilisateur Instagram
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

## Briefs de reference

Les specs completes sont dans `/work/projects/MICHEL/bateau-2026/brief/` :
- `bateau-a-paris_briefs-complets.md` — brief principal (specs pages, design, phases)
- `cookie-notice-rgpd.md` — architecture cookie consent
- `setup-initial-projet.md` — setup environnement dev
- `brief-claude-code-phase1.md` — phase 1 integration
- `INDEX-documentation.md` — index de toute la doc
