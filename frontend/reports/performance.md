# Rapport d'audit performance — bateau-a-paris.fr

**Date** : 2026-02-14
**Projet** : Un Bateau a Paris — Next.js 16.1.6 + Tailwind CSS v4
**Auditeur** : Claude Code (analyse statique du code source)

---

## Score global : 7.5 / 10

Le projet presente une base solide avec de bonnes pratiques (next/image generalise, AVIF/WebP, code splitting sur la page d'accueil, fonts optimisees). Les axes d'amelioration principaux concernent les dependances inutilisees (impact bundle), l'utilisation de `motion.img` au lieu de `next/image` dans les slideshows, et l'absence de lazy loading explicite sur Framer Motion.

---

## Tableau recapitulatif

| Categorie | Score | Statut | Resume |
|-----------|-------|--------|--------|
| Images | 7/10 | :warning: | `next/image` bien adopte (18 fichiers), mais 3 `motion.img` et 1 `<img>` natif echappent a l'optimisation |
| Code splitting | 8/10 | :white_check_mark: | `next/dynamic` sur 10 composants en page d'accueil + GalleryLightbox ssr:false |
| Fonts | 10/10 | :white_check_mark: | `next/font/google` avec `display: swap`, variables CSS bien appliquees |
| Bundle size | 5/10 | :x: | ~20 composants shadcn/ui et 6+ packages npm non utilises, recharts (~200kB) installe pour rien |
| SSG/SSR | 9/10 | :white_check_mark: | `generateStaticParams` sur les 2 routes dynamiques, landing pages en server component |
| Cache | 8/10 | :white_check_mark: | Instagram API avec revalidate + stale-while-revalidate, assets statiques immutables |
| Scripts tiers | 9/10 | :white_check_mark: | GA4 afterInteractive + Consent Mode v2 defaults denied, preconnect WordPress |
| CSS | 9/10 | :white_check_mark: | Tailwind v4 avec purge automatique, `@theme inline` bien configure |
| Animations | 6/10 | :warning: | Framer Motion importe dans 30+ fichiers, animations `whileInView` sans `once` partout mais motion.img bypass next/image |

---

## 1. Images

### Points positifs

- **`next/image` utilise dans 18 fichiers** : tous les composants principaux (Hero, Gallery, Offers, CTA, Boat, Testimonials, Landing, Articles) utilisent le composant `Image` de Next.js.
- **Formats AVIF/WebP actives** dans `next.config.ts` :
  ```ts
  images: { formats: ["image/avif", "image/webp"] }
  ```
- **Attribut `sizes` present** sur la majorite des images avec des valeurs responsives pertinentes (ex: `(max-width: 768px) 50vw, 33vw`).
- **`priority` sur les images above-the-fold** :
  - `src/components/HeaderVariants.tsx:119` — logo
  - `src/components/landing/LandingHero.tsx:21` — hero landing pages
  - `src/views/ArticleDetail.tsx:55` — image article
- **Remote patterns bien configures** pour Google, Unsplash et Instagram CDN.

### Problemes detectes

**P1 — `<img>` natif dans `Croisiere.tsx` (ligne 246)**
```tsx
<img src={metroIconImport.src} alt="Metro Bastille" className="w-6 h-6 md:w-8 md:h-8 drop-shadow-lg" />
```
- Fichier : `src/views/Croisiere.tsx`
- Impact : pas d'optimisation AVIF/WebP, pas de lazy loading natif.
- Note : c'est une petite icone (metro.png), l'impact est faible.

**P2 — `motion.img` dans les slideshows (3 occurrences)**
Les slideshows utilisent `motion.img` de Framer Motion au lieu de `next/image`, ce qui bypasse completement l'optimisation d'images de Next.js (pas d'AVIF, pas de srcset, pas de lazy loading) :

1. `src/components/HeroCinemaSlideshow.tsx:70` — Hero principal (above-the-fold, impact LCP important)
   ```tsx
   <motion.img src={heroImages[current].src} ... loading="eager" />
   ```
2. `src/components/BoatImageSlideshow.tsx:43` — Slideshow bateau
   ```tsx
   <motion.img src={images[current].src} ... />
   ```
3. `src/views/Croisiere.tsx:196` — Icones SVG de la carte
   ```tsx
   <motion.img src={landmark.icon} ... />
   ```

- Impact sur le Hero : les images `/images/hero/*.webp` et `.jpg` sont servies brutes sans conversion AVIF ni dimensionnement responsive. Sur le LCP, c'est significatif.
- Les images du Hero sont preloadees via `document.createElement("link")` dans un `useEffect` (client-side), ce qui est moins efficace qu'un `<link rel="preload">` dans le `<head>` server-rendered.

### Recommandations

1. **Remplacer `motion.img` par un wrapper `motion(Image)`** pour le HeroCinemaSlideshow. Framer Motion supporte `motion.create(Image)` pour wrapper des composants Next.js :
   ```tsx
   import { motion } from "framer-motion";
   import Image from "next/image";
   const MotionImage = motion.create(Image);
   ```
2. **Remplacer le `<img>` dans Croisiere.tsx** par `<Image>` de next/image pour l'icone metro.
3. **Deplacer le preload des images hero** dans un `<link rel="preload" as="image">` cote serveur (dans `layout.tsx` ou via `generateMetadata`), au lieu du `useEffect` client.

---

## 2. Code splitting

### Points positifs

- **Page d'accueil (`src/views/Index.tsx`)** : excellent usage de `next/dynamic` pour 10 composants below-the-fold :
  ```tsx
  const FeaturesVariants = dynamic(() => import("@/components/FeaturesVariants"));
  const BoatVariants = dynamic(() => import("@/components/BoatVariants"));
  const CaptainSection = dynamic(() => import("@/components/CaptainSection"));
  // ... 7 autres composants
  ```
  Seuls `HeaderVariants` et `HeroVariants` sont importes de facon statique (above-the-fold).

- **GalleryLightbox** (`src/views/Galerie.tsx`) : charge dynamiquement avec `ssr: false` :
  ```tsx
  const GalleryLightbox = dynamic(() => import("@/components/GalleryLightbox"), { ssr: false });
  ```

### Problemes detectes

**P1 — Pas de code splitting sur les pages secondaires**
Les pages `Croisiere.tsx`, `Actualites.tsx`, `FAQ.tsx`, `Reservation.tsx` importent `HeaderVariants` et `FooterVariants` de facon statique. Bien que ce soit acceptable pour le header (above-the-fold), le footer pourrait etre charge dynamiquement.

**P2 — Framer Motion importe dans 30+ fichiers composants**
Chaque composant importe individuellement `from "framer-motion"`, ce qui, bien que tree-shakable, ajoute du poids JavaScript total au bundle client. Framer Motion v12 pese environ 32kB gzipped pour le module de base.

### Recommandations

1. **Envisager `next/dynamic` pour le FooterVariants** sur les pages secondaires.
2. **Evaluer `motion/mini`** (sous-module Framer Motion allege) pour les composants qui n'utilisent que des animations simples (opacity, y, scale) sans AnimatePresence.

---

## 3. Fonts

### Points positifs

- **Configuration parfaite** dans `src/app/layout.tsx` :
  ```tsx
  const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
  const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
  ```
- `display: "swap"` sur les deux fonts (pas de FOIT).
- Variables CSS `--font-inter` et `--font-playfair` utilisees dans `globals.css`.
- `font-src 'self' https://fonts.gstatic.com` dans le CSP.
- Pas de chargement externe superflu — `next/font/google` gere le self-hosting automatique.

### Recommandations

Aucune. Configuration optimale.

---

## 4. Bundle size (dependances)

### Points positifs

- **lucide-react** : tree-shakable, chaque icone est un import nomme.
- **class-variance-authority + clsx + tailwind-merge** : leger, utile pour shadcn/ui.
- **zod** : utilise pour la validation de formulaires (ContactForm).

### Problemes detectes

**P1 (Critique) — Packages npm installes mais non utilises dans le code applicatif**

Les packages suivants sont dans `dependencies` de `package.json` mais **aucun fichier dans `src/` (hors `src/components/ui/`) ne les importe** :

| Package | Taille estimee (gzip) | Utilise dans |
|---------|-----------------------|--------------|
| `recharts` | ~200 kB | `src/components/ui/chart.tsx` uniquement (composant shadcn non utilise) |
| `react-day-picker` | ~30 kB | `src/components/ui/calendar.tsx` uniquement (composant shadcn non utilise) |
| `react-resizable-panels` | ~15 kB | `src/components/ui/resizable.tsx` uniquement (composant shadcn non utilise) |
| `input-otp` | ~10 kB | `src/components/ui/input-otp.tsx` uniquement (composant shadcn non utilise) |
| `cmdk` | ~10 kB | `src/components/ui/command.tsx` uniquement (composant shadcn non utilise) |
| `vaul` | ~10 kB | `src/components/ui/drawer.tsx` uniquement (composant shadcn non utilise) |
| `embla-carousel-react` | ~15 kB | `src/components/ui/carousel.tsx` uniquement (composant shadcn non utilise) |
| `next-themes` | ~3 kB | Aucun import detecte dans le code applicatif |

**Impact potentiel total : ~290+ kB de JavaScript inutile** (si tree-shaking ne les elimine pas completement). Meme si le tree-shaking de Next.js devrait eliminer le code non importe, ces packages ajoutent du bruit dans `node_modules` et rallongent `npm install`.

**P2 — Composants shadcn/ui installes mais non utilises**

48 composants shadcn/ui sont presents dans `src/components/ui/`, mais seulement **7 sont importes dans le code applicatif** :

| Utilise | Composants |
|---------|------------|
| Oui | `button`, `accordion`, `switch`, `breadcrumb`, `input`, `textarea`, `skeleton` |
| Non | `chart`, `calendar`, `resizable`, `input-otp`, `command`, `drawer`, `carousel`, `hover-card`, `context-menu`, `menubar`, `navigation-menu`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `slider`, `toggle`, `toggle-group`, `tabs`, `sidebar`, `avatar`, `aspect-ratio`, `alert-dialog`, `alert`, `checkbox`, `collapsible`, `dialog`, `dropdown-menu`, `form`, `label`, `pagination`, `sheet`, `sonner`, `table`, `toast`, `toaster`, `tooltip` |

Note : les composants shadcn/ui non importes n'impactent pas le bundle final (tree-shaking), mais ils encombrent le codebase et certains importent des Radix UI packages non necessaires.

**P3 — Packages Radix UI correspondants non necessaires**

Les packages Radix UI suivants dans `package.json` pourraient etre supprimes car aucun composant applicatif ne depend de leur composant shadcn/ui :

`@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-slider`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`

### Recommandations

1. **Supprimer les packages npm inutilises** : `recharts`, `react-day-picker`, `react-resizable-panels`, `input-otp`, `cmdk`, `vaul`, `embla-carousel-react`, `next-themes`.
2. **Supprimer les composants shadcn/ui non utilises** et leurs packages Radix UI correspondants.
3. **Utiliser `npx depcheck`** ou `knip` pour automatiser la detection de dependances mortes.

---

## 5. SSG/SSR

### Points positifs

- **`generateStaticParams`** present sur les 2 routes dynamiques :
  - `src/app/[locale]/(landing)/[slug]/page.tsx` — landing pages
  - `src/app/[locale]/actualites/[slug]/page.tsx` — articles blog

- **Landing page en server component** : `src/app/[locale]/(landing)/[slug]/page.tsx` est un server component (pas de `"use client"`), ce qui est excellent pour le SSG. Les composants enfants (`LandingHero`, etc.) sont marques `"use client"` individuellement.

- **Landing layout** : `src/app/[locale]/(landing)/layout.tsx` est egalement un server component qui wrappe avec Header/Footer.

- **51 fichiers `"use client"`** — ce qui est normal pour un site avec animations et interactivite. Les pages route handlers (`page.tsx`) restent server components.

### Problemes detectes

**P1 — `ScrollToTop` composant non utilise**
Le fichier `src/components/ScrollToTop.tsx` existe et est marque `"use client"`, mais il n'est importe nulle part dans le projet. Code mort.

### Recommandations

1. **Supprimer `ScrollToTop.tsx`** (code mort).
2. Les pages statiques (CGV, Mentions Legales, Confidentialite) sont des composants client — evaluer si elles pourraient etre server components pour reduire le JS.

---

## 6. Cache

### Points positifs

- **Instagram API** (`src/app/api/instagram/route.ts`) :
  ```ts
  next: { revalidate: 3600 } // 1h
  'Cache-Control': `public, s-maxage=3600, stale-while-revalidate=7200`
  ```
  Strategie SWR bien implementee.

- **Assets statiques** dans `next.config.ts` :
  ```ts
  { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }
  { source: "/_next/static/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }
  ```
  Cache immutable d'un an pour les images et bundles JS/CSS.

- **WordPress preconnect** :
  ```tsx
  <link rel="dns-prefetch" href={WP_URL} />
  <link rel="preconnect" href={WP_URL} crossOrigin="anonymous" />
  ```

### Problemes detectes

**P1 — Pas de revalidate sur les pages statiques**
Les pages SSG n'ont pas de `revalidate` defini. C'est correct pour un site vitrine avec build-deploy, mais si le contenu change frequemment (posts WordPress), un ISR (`export const revalidate = 3600`) pourrait etre benefique.

### Recommandations

1. **Envisager ISR** pour les pages blog si le contenu est mis a jour sans rebuild.
2. **Ajouter un header Cache-Control** pour les fonts self-hosted (`/_next/static/media/*`).

---

## 7. Scripts tiers

### Points positifs

- **GA4 avec `next/script` strategy `afterInteractive`** :
  ```tsx
  <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
  ```
  Ne bloque pas le rendu.

- **Consent Mode v2 defaults "denied"** pour l'EU :
  ```tsx
  <script dangerouslySetInnerHTML={{ __html: getConsentDefaultScript(GA_ID) }} />
  ```
  Inline dans `<head>` — necessaire car doit s'executer avant gtag.js. Les regions EU sont en `denied` par defaut.

- **Pas d'Instagram embed direct** : les posts Instagram sont charges via l'API Graph cote serveur (`/api/instagram`), puis affiches comme des `<Image>` Next.js. Pas de script Instagram tiers.

- **Vercel Speed Insights** :
  ```tsx
  <SpeedInsights />
  ```
  Charge de facon asynchrone, impact minimal.

### Problemes detectes

Aucun probleme majeur. Les scripts tiers sont bien geres.

### Recommandations mineures

1. Le `getConsentDefaultScript` utilise `dangerouslySetInnerHTML` — c'est acceptable car le contenu est genere cote serveur, mais on pourrait utiliser `<Script strategy="beforeInteractive">` pour plus de clarte.

---

## 8. CSS

### Points positifs

- **Tailwind CSS v4** avec purge automatique : seules les classes utilisees sont incluses dans le bundle CSS final.
- **`@theme inline`** correctement configure dans `globals.css` :
  ```css
  @theme inline {
    --color-background: hsl(var(--background));
    --color-primary: hsl(var(--primary));
    /* ... 20+ tokens */
  }
  ```
- **CSS custom minimal** : `globals.css` ne contient que ~255 lignes de CSS custom (variables, utilitaires specifiques comme `.btn-gold`, `.container-custom`, `.section-padding`).
- **`@import "tailwindcss"`** + `@plugin "@tailwindcss/typography"` — import propre Tailwind v4.
- **Pas de feuille de style externe** chargee (pas de Google Fonts CSS, gere par `next/font`).

### Problemes detectes

**P1 mineur — CSS custom qui pourrait etre en Tailwind**
Les classes `.section-padding`, `.container-custom`, `.btn-gold` pourraient etre des `@utility` Tailwind v4 au lieu de CSS brut, pour une meilleure coherence avec le systeme de purge.

### Recommandations

1. **Convertir les classes custom en `@utility`** Tailwind v4 pour profiter du purge automatique :
   ```css
   @utility section-padding {
     padding-top: 4rem;
     padding-bottom: 4rem;
   }
   ```

---

## 9. Animations (Framer Motion)

### Points positifs

- **`viewport={{ once: true }}`** present sur **toutes les animations `whileInView`** (60+ occurrences). Cela signifie que les animations ne se rejouent pas au scroll inverse, ce qui evite les reflows inutiles.
- **Animations basees sur `transform` et `opacity`** : la grande majorite des animations utilisent `opacity`, `y`, `x`, `scale` — ce sont des proprietes GPU-accelerees qui ne causent pas de reflow (pas d'impact CLS si l'element est deja dans le flow).
- **`AnimatePresence`** utilise correctement pour les transitions enter/exit (slideshows, mobile menu, cookie banner).
- **Ken Burns effect** (`HeroCinemaSlideshow.tsx`) utilise `scale` et `transform` — pas de CLS car l'image est `absolute` avec `overflow: hidden`.

### Problemes detectes

**P1 — Framer Motion dans 30+ fichiers client**
Framer Motion est importe dans 30+ composants. Meme si tree-shakable, le runtime de base (~32kB gzip) est inclus une seule fois mais le cout d'hydratation par composant s'accumule.

Fichiers impactes (non exhaustif) :
- `src/components/Hero.tsx`
- `src/components/HeroVariants.tsx`
- `src/components/HeaderVariants.tsx`
- `src/components/OffersVariants.tsx`
- `src/components/FeaturesVariants.tsx`
- `src/components/BoatVariants.tsx`
- `src/components/TestimonialsVariants.tsx`
- `src/components/CTAVariants.tsx`
- `src/components/CaptainSection.tsx`
- `src/components/ContactForm.tsx`
- `src/components/GalleryPreview.tsx`
- `src/components/CookieBanner.tsx`
- `src/components/CookieModal.tsx`
- `src/views/Croisiere.tsx`
- `src/views/Galerie.tsx`
- `src/views/FAQ.tsx`
- `src/views/Actualites.tsx`
- `src/views/Reservation.tsx`
- `src/views/ArticleDetail.tsx`
- 11 composants `landing/*`

**P2 — Animations initiales sur la page d'accueil**
Le Hero utilise plusieurs `motion.div` avec `initial={{ opacity: 0, y: 30 }}` et `animate={{ opacity: 1, y: 0 }}`. Pendant le delai d'animation (0.2s-1.2s), le contenu est invisible (`opacity: 0`). Cela peut penaliser le FCP/LCP car le texte hero n'apparait qu'apres hydratation + animation.

**P3 — Slideshow hero via `motion.img` sans `next/image`**
Comme mentionne dans la section Images, le `HeroCinemaSlideshow` utilise `motion.img` (ligne 70) au lieu de `next/image`. L'image hero est l'element LCP — ne pas utiliser `next/image` ici signifie pas d'optimisation AVIF, pas de `srcset`, et pas de dimensionnement responsive automatique.

### Recommandations

1. **Evaluer `motion/mini`** pour les composants qui n'utilisent pas `AnimatePresence` ou `layout` animations — le bundle est 50% plus leger.
2. **Reduire le delai des animations hero** : le `delay: 0.8` sur le CTA button signifie que le bouton principal n'apparait que 0.8s apres l'hydratation. Envisager `delay: 0` ou des valeurs plus basses pour les elements critiques.
3. **Eviter `initial={{ opacity: 0 }}` sur les elements above-the-fold** pour ne pas penaliser le FCP. Utiliser plutot des animations CSS natives pour le fade-in initial, ou `initial={false}` pour que les elements soient visibles immediatement.
4. **Wrapper `motion.img` avec `motion.create(Image)`** pour beneficier de l'optimisation Next.js dans les slideshows.

---

## Synthese des recommandations prioritaires

### Haute priorite (impact fort)

1. **Supprimer les packages inutilises** (`recharts`, `react-day-picker`, `react-resizable-panels`, `input-otp`, `cmdk`, `vaul`, `embla-carousel-react`, `next-themes`) et les composants shadcn/ui non utilises + Radix UI packages correspondants.
2. **Wrapper `motion.img` avec `motion.create(Image)`** dans `HeroCinemaSlideshow.tsx` et `BoatImageSlideshow.tsx` pour activer l'optimisation AVIF/WebP sur les images hero (impact LCP direct).
3. **Reduire les delais d'animation hero** et eviter `opacity: 0` initial sur les elements LCP pour ameliorer le FCP.

### Moyenne priorite (impact moyen)

4. **Evaluer `motion/mini`** pour les composants avec animations simples (gain ~16kB gzip sur le bundle Framer Motion).
5. **Supprimer `ScrollToTop.tsx`** (code mort).
6. **Deplacer le preload des images hero** en server-side (`<link rel="preload">` dans le layout) au lieu du `useEffect` client.
7. **Convertir les classes CSS custom** (`.btn-gold`, `.section-padding`, `.container-custom`) en `@utility` Tailwind v4.

### Basse priorite (amelioration mineure)

8. **Remplacer le `<img>` dans Croisiere.tsx** (icone metro) par `next/image`.
9. **Evaluer ISR** pour les pages blog (revalidate horaire ou quotidien).
10. **Nettoyer les composants shadcn/ui non utilises** pour reduire le bruit dans le codebase.

---

## Annexe : fichiers analyses

| Fichier | Categorie |
|---------|-----------|
| `next.config.ts` | Images, Cache, CSP |
| `package.json` | Bundle size |
| `src/app/layout.tsx` | Fonts, Scripts tiers |
| `src/app/[locale]/layout.tsx` | SSR |
| `src/app/[locale]/(landing)/[slug]/page.tsx` | SSG |
| `src/app/[locale]/(landing)/layout.tsx` | SSG |
| `src/app/[locale]/actualites/[slug]/page.tsx` | SSG |
| `src/app/api/instagram/route.ts` | Cache, Scripts tiers |
| `src/app/globals.css` | CSS |
| `src/app/sitemap.ts` | SSG |
| `src/views/Index.tsx` | Code splitting |
| `src/views/Croisiere.tsx` | Images |
| `src/views/Galerie.tsx` | Code splitting, Images |
| `src/views/Reservation.tsx` | SSR |
| `src/components/HeroCinemaSlideshow.tsx` | Images, Animations |
| `src/components/HeroVariants.tsx` | Animations |
| `src/components/Hero.tsx` | Animations |
| `src/components/HeaderVariants.tsx` | Images |
| `src/components/BoatImageSlideshow.tsx` | Images, Animations |
| `src/components/FooterVariants.tsx` | Code splitting |
| `src/components/landing/LandingHero.tsx` | Images |
| `src/components/Providers.tsx` | SSR |
| `src/lib/gtag.ts` | Scripts tiers |
| `src/components/ui/*.tsx` (48 fichiers) | Bundle size |
