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
│   │   ├── contexts/         # ThemeVariantContext (6 themes)
│   │   ├── hooks/            # useCookieConsent, useInstagramFeed
│   │   ├── lib/              # cookie-consent, gtag, utils
│   │   ├── types/            # cookie-consent.d.ts
│   │   ├── data/             # galleryImages, etc.
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
- **Analytics**: GA4 (G-N20S788YDW) + Google Consent Mode v2
- **API**: Instagram Graph API, WordPress REST API (a venir)
- **Fonts**: Playfair Display (headings), Inter (body), Michroma, Orbitron (variantes)

## Systeme de themes

6 variantes gerees par `ThemeVariantContext` (default: `"classic"`):
- **classic** : Navy/gold, Playfair Display
- **modern** : Michroma, geometric
- **minimal** : Orbitron, monochrome
- **editorial** : Amber, magazine-style
- **luxe** : Black/gold, ultra-premium
- **nuit** : Deep navy, night mode

Tous les composants `*Variants.tsx` adaptent leur style selon le theme actif.

## Convention de nommage

- Pages App Router : `src/app/<route>/page.tsx` (wrappers simples, `export const dynamic = 'force-dynamic'`)
- Vues : `src/views/<NomPage>.tsx` (composants de page complets)
- Composants variantes : `src/components/<Nom>Variants.tsx`
- Hooks : `src/hooks/use<Nom>.ts`
- Libs : `src/lib/<nom>.ts`

## Points d'attention

- **Tailwind v4** : les couleurs custom DOIVENT etre enregistrees dans `@theme inline {}` dans `globals.css` pour que les utility classes fonctionnent
- **Next.js static imports** : `import img from "@/assets/x.png"` retourne un objet `{ src, width, height }`, pas une string. Utiliser `.src` pour les `<img>` tags
- **Pages Router conflit** : ne PAS creer de fichiers dans `src/pages/` — utiliser `src/views/` a la place
- **Cookie consent** : le tracking GA4 ne demarre qu'apres consentement (Consent Mode v2 defaults "denied" pour EU)
- **Instagram token** : expire le 2026-04-04, a renouveler via Smash Balloon ou manuellement

## Commandes

```bash
npm run dev     # Dev server (port 3000)
npm run build   # Production build
npm run start   # Production server
npm run lint    # ESLint
```

## Variables d'environnement (.env.local)

```
NEXT_PUBLIC_WP_API_URL    # URL API WordPress
NEXT_PUBLIC_WP_URL        # URL WordPress
NEXT_PUBLIC_SITE_URL      # URL du site Next.js
NEXT_PUBLIC_GA_ID         # Google Analytics 4 Measurement ID
INSTAGRAM_ACCESS_TOKEN    # Token Instagram Graph API (server-side only)
INSTAGRAM_USER_ID         # ID utilisateur Instagram
```

## Briefs de reference

Les specs completes sont dans `/work/projects/MICHEL/bateau-2026/brief/` :
- `bateau-a-paris_briefs-complets.md` — brief principal (specs pages, design, phases)
- `cookie-notice-rgpd.md` — architecture cookie consent
- `setup-initial-projet.md` — setup environnement dev
- `brief-claude-code-phase1.md` — phase 1 integration
- `INDEX-documentation.md` — index de toute la doc
