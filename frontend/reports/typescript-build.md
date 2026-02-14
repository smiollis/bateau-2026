# Rapport TypeScript & Build - bateau-a-paris.fr

**Date** : 2026-02-14
**Version Next.js** : 16.1.6 (Turbopack)
**Version TypeScript** : ^5 (strict mode)
**Auteur** : Audit automatise Claude Code

---

## Score global : 8/10

Le projet est dans un tres bon etat global : build de production sans erreur, TypeScript strict active, architecture propre avec path aliases. Les points d'amelioration portent sur le renforcement du tsconfig, l'elimination des `any` restants, et le nettoyage des dependances shadcn/ui inutilisees.

---

## Tableau recapitulatif

| Categorie | Score | Statut |
|---|---|---|
| TypeScript strict | 7/10 | :warning: Options supplementaires recommandees |
| Build production | 10/10 | :white_check_mark: 0 erreur, 0 warning, ~1.7s |
| Types `any` | 7/10 | :warning: 7 occurrences dans src/ (2 custom + 5 shadcn/ui) |
| Type safety donnees | 9/10 | :white_check_mark: Interfaces bien definies, 1 lacune (`getPages()`) |
| Next.js config | 9/10 | :white_check_mark: Securite, images, redirects, CSP complets |
| Package.json | 7/10 | :warning: Dependances shadcn/ui inutilisees, pas de `engines` |
| Imports | 10/10 | :white_check_mark: Path aliases `@/` partout, pas d'imports relatifs hors modules |
| Taille du build | 8/10 | :warning: 1 chunk > 200 Ko, total chunks 1.7 Mo |
| ESLint | 7/10 | :warning: 8 erreurs, 44 warnings |

---

## 1. TypeScript strict

**Fichier** : `/work/projects/MICHEL/bateau-2026/frontend/tsconfig.json`

### Options actives

| Option | Valeur | Statut |
|---|---|---|
| `strict` | `true` | :white_check_mark: Active toutes les verifications strictes de base |
| `noEmit` | `true` | :white_check_mark: Correct pour Next.js (build par Turbopack) |
| `esModuleInterop` | `true` | :white_check_mark: |
| `isolatedModules` | `true` | :white_check_mark: Requis par Turbopack |
| `resolveJsonModule` | `true` | :white_check_mark: Necessaire pour imports JSON |
| `incremental` | `true` | :white_check_mark: Build incrementiel |
| `moduleResolution` | `bundler` | :white_check_mark: Recommande pour Next.js 16 |
| `skipLibCheck` | `true` | :white_check_mark: Performance build |

### Options manquantes (recommandees)

| Option | Impact | Priorite |
|---|---|---|
| `noUncheckedIndexedAccess` | Ajoute `undefined` aux acces par index (`obj[key]`, `arr[i]`) — previent les erreurs runtime | Haute |
| `noFallthroughCasesInSwitch` | Empeche les `case` sans `break` implicites | Moyenne |
| `exactOptionalPropertyTypes` | Distingue `undefined` explicite vs propriete absente | Basse |
| `noPropertyAccessFromIndexSignature` | Force `obj["key"]` au lieu de `obj.key` pour les index signatures | Basse |

### Recommandation

Ajouter au minimum `noUncheckedIndexedAccess: true` dans `compilerOptions`. C'est l'option la plus impactante pour la securite des types, surtout avec le pattern `landingPages[slug]` dans `src/data/landings/index.ts` (qui retourne deja `LandingPageData | undefined` explicitement, mais l'option forcerait cette rigueur partout).

---

## 2. Build production

```
next build (Turbopack)
Compiled successfully in ~1.7s
TypeScript : 0 erreur
Static pages : 7/7 generees en ~260ms
```

### Routes generees

| Type | Nombre | Description |
|---|---|---|
| Static (SSG) | 2 | `[slug]` (landing pages), `actualites/[slug]` (articles) |
| Dynamic (SSR) | 12 | Pages principales (accueil, croisiere, galerie, FAQ, etc.) |
| Static pur | 2 | `robots.txt`, `sitemap.xml` |
| API routes | 2 | `/api/contact`, `/api/instagram` |

**Verdict** : :white_check_mark: Build parfait, aucune erreur TypeScript ni warning de compilation. Le warning `middleware` -> `proxy` est un avertissement de deprecation Next.js 16 (non-bloquant).

---

## 3. Types `any` dans src/

### Occurrences trouvees (7 total)

#### Code applicatif (2 — a corriger)

| Fichier | Ligne | Code | Correction proposee |
|---|---|---|---|
| `src/lib/wordpress.ts:16` | `wpFetch<T = any>` | Default generique a `any` | Changer en `wpFetch<T = unknown>` |
| `src/app/[locale]/test/page.tsx:6` | `let pages: any[] = []` | Page de test avec type non defini | Typer avec `WPPost[]` ou creer un type `WPPage` |

#### Composants shadcn/ui (5 — faible priorite)

| Fichier | Lignes | Contexte |
|---|---|---|
| `src/components/ui/chart.tsx` | 102, 104, 105, 107 | Types Recharts (`payload`, `label`, `formatter`) |

Ces `any` proviennent du generateur shadcn/ui et correspondent aux types internes de Recharts. Ils sont acceptables car :
- Le composant `chart.tsx` n'est pas utilise dans l'application
- Les types Recharts ne sont pas toujours generiques

### Recommandation

1. **Priorite haute** : Remplacer `T = any` par `T = unknown` dans `wpFetch` (`src/lib/wordpress.ts`)
2. **Priorite haute** : Typer `pages` dans `test/page.tsx` (ou supprimer cette page de test)
3. **Priorite basse** : Les `any` de `chart.tsx` sont negligeables

---

## 4. Type safety des donnees

### Landing pages :white_check_mark: Excellent

- **Interface principale** : `LandingPageData` dans `src/data/landings/types.ts` (74 lignes)
- **Union discriminee** : `LandingSection` avec 6 variantes (`richtext | benefits | gallery | testimonials | pricing | faq`)
- **17 fichiers de donnees**, tous types avec `import type { LandingPageData }`
- **Registry** : `Record<string, LandingPageData>` dans `index.ts`
- **Fonctions typees** : `getLandingData()` retourne `LandingPageData | undefined`

### WordPress API :white_check_mark: Bon

- **`WPPost`** : Interface bien definie (id, title, excerpt, date, slug, _embedded)
- **`wpFetch<T>`** : Generique, mais default a `any` (voir point 3)
- **`getPages()`** : :warning: Retourne `any` implicitement (pas de type de retour declare)
- **`getPosts()`** : Correctement type avec `Promise<WPPost[]>`

### Instagram API :white_check_mark: Excellent

- **`InstagramPost`** : Interface complete exportee depuis `src/app/api/instagram/route.ts`
- **Hook `useInstagramFeed`** : Importe et utilise le type correctement

### Contact API :white_check_mark: Excellent

- **Validation Zod** : Schema `contactSchema` avec validation stricte
- **Honeypot + Rate limiting** : Types implicites corrects
- **`escapeHtml`** : Fonction utilitaire bien typee

### Donnees JSON (reviews, posts)

- **`reviews.json`** : Importe directement sans interface TypeScript dediee. Le typage est infere par `resolveJsonModule`, ce qui est suffisant mais fragile.
- **`posts.json` / `posts-en.json`** : Meme situation, typage par inference.

### Recommandation

1. Typer explicitement `getPages()` : `Promise<WPPage[]>` (creer l'interface `WPPage`)
2. Creer une interface `Review` pour les donnees `reviews.json`
3. Creer une interface `BlogPost` pour les donnees `posts.json`

---

## 5. Next.js config

**Fichier** : `/work/projects/MICHEL/bateau-2026/frontend/next.config.ts`

### Securite :white_check_mark: Excellent

| Header | Valeur | Statut |
|---|---|---|
| X-Content-Type-Options | `nosniff` | :white_check_mark: |
| X-Frame-Options | `DENY` | :white_check_mark: |
| Referrer-Policy | `strict-origin-when-cross-origin` | :white_check_mark: |
| Permissions-Policy | camera, microphone, geolocation, interest-cohort desactives | :white_check_mark: |
| Content-Security-Policy | 12 directives completes | :white_check_mark: |
| poweredByHeader | `false` | :white_check_mark: |
| X-Robots-Tag | `noindex, nofollow` en non-production | :white_check_mark: |

### Images :white_check_mark:

- Formats : AVIF + WebP (optimal)
- Remote patterns : 4 domaines configures (Google, Unsplash, Instagram CDN)

### Cache :white_check_mark:

- Assets statiques `/images/*` et `/_next/static/*` : `max-age=31536000, immutable`

### Redirects :white_check_mark:

- 3 redirections permanentes (301) depuis les anciennes URLs WordPress

### i18n :white_check_mark:

- Plugin `next-intl` correctement configure avec `withNextIntl()`

### Points d'attention

- **Middleware deprece** : Le fichier `src/middleware.ts` utilise la convention `middleware` qui est deprecee dans Next.js 16. Migrer vers `proxy` comme suggere par le warning du build.
- **CSP `unsafe-inline` + `unsafe-eval`** : Present dans `script-src` pour la compatibilite GA4/GTM. Acceptable pour l'usage actuel mais a surveiller.

---

## 6. Package.json

**Fichier** : `/work/projects/MICHEL/bateau-2026/frontend/package.json`

### Versions principales

| Dependance | Version | Statut |
|---|---|---|
| next | 16.1.6 | :white_check_mark: Derniere stable |
| react / react-dom | 19.2.3 | :white_check_mark: React 19 |
| typescript | ^5 | :white_check_mark: |
| tailwindcss | ^4 | :white_check_mark: Tailwind v4 |
| framer-motion | ^12.34.0 | :white_check_mark: |
| next-intl | ^4.8.2 | :white_check_mark: |
| zod | ^4.3.6 | :white_check_mark: |
| vitest | ^4.0.18 | :white_check_mark: |
| playwright | ^1.58.2 | :white_check_mark: |

### Scripts :white_check_mark:

Les scripts sont complets et bien organises : `dev`, `build`, `start`, `lint`, `test`, `test:watch`, `test:coverage`, `test:e2e`, `test:e2e:ui`, plus 4 scripts d'import.

### Problemes identifies

#### Absence de champ `engines` :warning:

Pas de contrainte sur la version Node.js. Avec Next.js 16 + React 19, Node >= 18.18 est requis.

```json
"engines": {
  "node": ">=18.18.0"
}
```

#### Composants shadcn/ui potentiellement inutilises :warning:

48 composants UI dans `src/components/ui/`. Parmi eux, plusieurs ne sont utilises que par d'autres composants UI (jamais directement dans l'application). Les composants suivants et leurs dependances Radix associees sont candidats au nettoyage :

| Composant UI | Dependance npm | Utilise dans l'app ? |
|---|---|---|
| `chart.tsx` | `recharts` (273 Ko) | Non (uniquement interne) |
| `resizable.tsx` | `react-resizable-panels` | Non (uniquement interne) |
| `input-otp.tsx` | `input-otp` | Non (uniquement interne) |
| `drawer.tsx` | `vaul` | Non (uniquement interne) |
| `calendar.tsx` | `react-day-picker` | Non (uniquement interne) |
| `sonner.tsx` | `sonner` | Non (uniquement interne) |
| `carousel.tsx` | `embla-carousel-react` | Non (uniquement interne) |
| `command.tsx` | `cmdk` | Non (uniquement interne) |
| `sidebar.tsx` | (multiple deps) | Non (uniquement interne) |

**Impact estime** : Ces composants et leurs dependances representent du code mort qui augmente la taille de `node_modules` et potentiellement celle du bundle si tree-shaking n'est pas parfait.

### Recommandation

1. Ajouter le champ `engines` dans `package.json`
2. Auditer et supprimer les composants shadcn/ui non utilises et leurs dependances npm (recharts, react-resizable-panels, input-otp, vaul, react-day-picker, cmdk)
3. Supprimer les composants Radix inutilises correspondants (`@radix-ui/react-context-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-menubar`, `@radix-ui/react-progress`, `@radix-ui/react-slider`, `@radix-ui/react-tabs`, `@radix-ui/react-radio-group`, etc.)

---

## 7. Imports

### Path aliases :white_check_mark: Excellent

- **264 imports `@/`** repartis sur 126 fichiers
- **0 import relatif inter-modules** : Tous les imports entre modules passent par `@/`
- Les seuls imports relatifs (`./`) sont :
  - Intra-module dans `src/data/landings/` (imports entre fichiers du meme dossier)
  - Barrel exports dans `src/components/landing/index.ts` et `src/components/cookie-consent/index.ts`
  - Fichiers de configuration `src/i18n/` (navigation -> routing)
  - `src/middleware.ts` -> `./i18n/routing`

### Imports circulaires

Aucun import circulaire detecte. L'architecture est strictement hierarchique :
- `app/` -> `views/` -> `components/` -> `ui/`
- `components/` -> `data/`, `lib/`, `hooks/`, `contexts/`

### Convention `import type` :white_check_mark:

Utilisation correcte de `import type` pour les imports de types uniquement (visible dans les fichiers landings et i18n).

---

## 8. Taille du build

### Vue d'ensemble

| Metrique | Valeur | Statut |
|---|---|---|
| Total `.next/` | 174 Mo | :white_check_mark: Normal (inclut cache Turbopack) |
| Total `static/chunks/` | 1.7 Mo | :white_check_mark: Acceptable |
| Total CSS | ~137 Ko | :white_check_mark: |

### Plus gros chunks JS

| Taille | Fichier | Analyse probable |
|---|---|---|
| **219 Ko** | `69be39811437728d.js` | :warning: Framework React/Next.js runtime |
| 114 Ko | `8d9ce281e2699520.js` | Librairies tierces (Framer Motion probable) |
| 110 Ko | `a6dad97d9634a72d.js` | Librairies tierces |
| 109 Ko | `7d6514a90169e63d.js` | Librairies tierces |
| 101 Ko | `b6ce5f94d0a87019.js` | Librairies tierces |
| 91 Ko | `fcc043734e2f15ae.js` | Composants application |

### CSS

| Taille | Fichier |
|---|---|
| 124 Ko | `83df3f17c9d9df4d.css` (Tailwind CSS principal) |
| 9.7 Ko | `efbfc1257cbc8508.css` |
| 3.6 Ko | `95bbd13a3ea91ecd.css` |

### Analyse

- Le chunk de 219 Ko est le plus preoccupant. Il contient probablement le runtime React + Next.js + librairies partagees. C'est au-dessus du seuil recommande de 150 Ko pour un chunk individuel.
- Les 4 chunks suivants (100-114 Ko) sont probablement Framer Motion, Radix UI, et autres librairies. Le nettoyage des composants shadcn/ui inutilises pourrait reduire cette taille.
- Le CSS principal (124 Ko) est relativement eleve pour Tailwind v4 qui est cense purger les classes inutilisees. Les 48 composants shadcn/ui non utilises contribuent a ce volume.

### Recommandation

1. Supprimer les composants shadcn/ui inutilises pour reduire le CSS et potentiellement le JS
2. Verifier que `next/dynamic` avec `ssr: false` est bien utilise pour les composants lourds (lightbox, etc.)
3. Envisager le lazy-loading de Framer Motion pour les animations non-critiques

---

## 9. ESLint (bonus)

Resultat de `npm run lint` : **8 erreurs, 44 warnings**

### Erreurs (8)

| Fichier | Erreur | Impact |
|---|---|---|
| `src/lib/wordpress.ts:16` | `@typescript-eslint/no-explicit-any` | `T = any` dans `wpFetch` |
| `src/app/[locale]/test/page.tsx:6` | `@typescript-eslint/no-explicit-any` | `any[]` dans page de test |
| `src/components/cookie-consent/CookieProvider.tsx:32` | `react-hooks/set-state-in-effect` | `setState` synchrone dans `useEffect` |
| `scripts/import-instagram.ts` (x2) | `@typescript-eslint/no-explicit-any` | Scripts d'import |
| `scripts/import-reviews.ts` | `@typescript-eslint/no-explicit-any` | Script d'import |
| `scripts/translate.ts` (x2) | `no-explicit-any` + `prefer-const` | Script de traduction |

### Warnings (44)

- **34 warnings `@typescript-eslint/no-unused-vars`** : Principalement dans les fichiers de tests (mocks Framer Motion avec variables destructurees non utilisees)
- **3 warnings `no-unused-vars`** dans les tests E2E (variable `response`)
- **2 warnings `@next/next/no-img-element`** : `src/views/Croisiere.tsx:246` et un mock de test
- **1 warning `jsx-a11y/alt-text`** : Mock de test

### Recommandation

1. **Corriger l'erreur `CookieProvider.tsx`** : Utiliser `useMemo` ou `useRef` pour initialiser le consentement stocke sans `setState` dans l'effet
2. **Nettoyer les mocks de test** : Prefixer les variables inutilisees avec `_` (`_initial`, `_animate`, etc.)
3. **Corriger `Croisiere.tsx:246`** : Remplacer `<img>` par `<Image>` de `next/image`

---

## Recommandations prioritaires

### Priorite haute

1. **Ajouter `noUncheckedIndexedAccess: true`** dans `tsconfig.json` — Previent les acces non-verifies aux tableaux et objets indexes
2. **Eliminer les `any` dans le code applicatif** — Remplacer `T = any` par `T = unknown` dans `wpFetch`, typer `getPages()` correctement
3. **Corriger l'erreur `CookieProvider.tsx`** — `setState` dans `useEffect` synchrone est un anti-pattern React 19

### Priorite moyenne

4. **Nettoyer les composants shadcn/ui inutilises** — Supprimer ~10 composants UI et leurs 6+ dependances npm (recharts, vaul, cmdk, etc.)
5. **Ajouter le champ `engines`** dans `package.json` — `"node": ">=18.18.0"`
6. **Migrer `middleware.ts` vers `proxy`** — Convention deprecee dans Next.js 16
7. **Creer des interfaces pour les JSON** — `Review`, `BlogPost` pour `reviews.json` et `posts.json`

### Priorite basse

8. **Nettoyer les warnings ESLint** — Variables inutilisees dans les tests, `<img>` -> `<Image>`
9. **Supprimer ou typer la page `/test`** — Page de debug avec types faibles
10. **Ajouter `noFallthroughCasesInSwitch: true`** dans `tsconfig.json`

---

## Conclusion

Le projet presente une excellente base TypeScript avec un build propre et une architecture bien structuree. Le mode strict est active, les interfaces sont definies pour les donnees critiques (landing pages, API WordPress, Instagram), et les path aliases sont utilises de maniere coherente.

Les axes d'amelioration principaux sont le renforcement du `tsconfig.json` avec `noUncheckedIndexedAccess`, l'elimination des quelques `any` restants dans le code applicatif, et le nettoyage des composants shadcn/ui installes par defaut mais jamais utilises — ce qui aurait un impact positif sur la taille du bundle et la maintenabilite.
