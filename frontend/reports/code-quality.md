# Rapport Qualite Code - bateau-a-paris.fr

**Date** : 2026-02-14
**Analyseur** : Claude Code (Opus 4.6)
**Perimetre** : `/work/projects/MICHEL/bateau-2026/frontend/src/` (hors `node_modules/`)

---

## Score Global : 7.5 / 10

Le projet est globalement bien structure avec des conventions coherentes, un bon usage du logger, zero `console.log` dans le code source, et un typage TypeScript solide. Les principaux axes d'amelioration concernent le code mort (composants legacy non utilises), la duplication entre composants "base" et "Variants", et quelques composants monolithiques.

---

## Tableau Recapitulatif

| # | Categorie | Statut | Score |
|---|-----------|--------|-------|
| 1 | Convention de nommage | ✅ Bon | 8/10 |
| 2 | DRY (Don't Repeat Yourself) | ⚠️ Moyen | 6/10 |
| 3 | Composants monolithiques | ⚠️ Moyen | 7/10 |
| 4 | Props typing (TypeScript) | ✅ Bon | 8/10 |
| 5 | Error handling | ✅ Bon | 8/10 |
| 6 | Console.log | ✅ Excellent | 10/10 |
| 7 | Dead code | ⚠️ Moyen | 5/10 |
| 8 | Patterns React | ✅ Bon | 8/10 |
| 9 | ESLint | ⚠️ Moyen | 7/10 |
| 10 | Code comments | ⚠️ Moyen | 6/10 |

---

## 1. Convention de nommage ✅ (8/10)

### Points positifs

- **Composants** : PascalCase systematique (`HeaderVariants`, `ContactForm`, `LandingHero`, etc.)
- **Fichiers composants** : PascalCase coherent (`HeaderVariants.tsx`, `ContactForm.tsx`)
- **Hooks** : Convention `use` respectee (`useCookieConsent.ts`, `useInstagramFeed.ts`)
- **Libs** : camelCase/kebab-case (`logger.ts`, `cookie-consent.ts`, `metadata.ts`)
- **Fichiers data** : kebab-case coherent (`gallery-images` serait attendu, mais `galleryImages.ts` est utilise)
- **Landing pages data** : kebab-case strict (`anniversaire-seine.ts`, `evjf-seine.ts`)
- **Vues** : PascalCase (`Croisiere.tsx`, `Actualites.tsx`, `FAQ.tsx`)
- **App Router pages** : kebab-case pour les routes (`mentions-legales/`, `confidentialite/`)

### Points a ameliorer

| Fichier | Probleme | Recommandation |
|---------|----------|----------------|
| `src/hooks/use-toast.ts` | kebab-case (convention shadcn) vs `useCookieConsent.ts` (camelCase) | Inconsistance mineure, acceptable car shadcn genere |
| `src/hooks/use-mobile.tsx` | kebab-case + extension `.tsx` pour un hook | Renommer en `useMobile.ts` (pas de JSX dans ce hook) |
| `src/data/galleryImages.ts` | camelCase au lieu de kebab-case | Renommer en `gallery-images.ts` pour coherence avec les autres fichiers data |
| `src/components/ui/use-toast.ts` | Hook dans le dossier `ui/` | Deplacer vers `src/hooks/` pour coherence |

### Verdict

La convention est globalement bien respectee. Les inconsistances proviennent principalement des fichiers generes par shadcn/ui, ce qui est acceptable.

---

## 2. DRY (Don't Repeat Yourself) ⚠️ (6/10)

### Probleme majeur : Duplication composants "Base" vs "Variants"

Le projet contient des paires de composants dont la version "base" (non i18n, non theme) est une copie quasi identique de la version "Variants" :

| Composant Base | Composant Variants | Lignes Base | Lignes Variants | % duplication estimee |
|----------------|-------------------|-------------|-----------------|----------------------|
| `Hero.tsx` | `HeroVariants.tsx` | 87 | 109 | ~70% |
| `Offers.tsx` | `OffersVariants.tsx` | 160 | 191 | ~65% |
| `Footer.tsx` | `FooterVariants.tsx` | 141 | 151 | ~60% |
| `Testimonials.tsx` | `TestimonialsVariants.tsx` | 149 | 158 | ~70% |
| `Features.tsx` | `FeaturesVariants.tsx` | 82 | 107 | ~60% |
| `Header.tsx` | `HeaderVariants.tsx` | 118 | 289 | ~40% |
| `Boat.tsx` | `BoatVariants.tsx` | 106 | 123 | ~60% |
| `CallToAction.tsx` | `CTAVariants.tsx` | 58 | 74 | ~65% |

**Aucun des composants "Base" n'est importe nulle part dans le code source** (verifie par grep). Ils ne sont references que dans les tests.

**Total estime** : ~900 lignes de code duplique / mort.

### Duplication `handleNavClick`

La logique de navigation avec scroll-to-section est dupliquee entre :
- `src/components/HeaderVariants.tsx` (lignes 79-101)
- `src/components/FooterVariants.tsx` (lignes 56-76)

Les deux implementent le meme pattern : `setInterval` avec retry pour trouver un element apres navigation. Ce code devrait etre extrait dans un hook partage.

### Duplication `escapeHtml`

- Definie dans `src/app/api/contact/route.ts` (lignes 95-101)
- Re-implementee dans `src/__tests__/unit/escape-html.test.ts` (lignes 5-11)
- Le test note explicitement : "escapeHtml is not exported from the route, so we re-implement it for testing"

L'utilitaire devrait etre extrait dans `src/lib/escape-html.ts` et exporte.

### Duplication Google Logo SVG

Le logo Google (SVG inline) est duplique entre :
- `src/components/Testimonials.tsx` (lignes 35-52)
- `src/components/TestimonialsVariants.tsx` (lignes 62-66)

### Recommandations

1. **Supprimer les composants "Base"** non utilises (`Hero.tsx`, `Footer.tsx`, `Offers.tsx`, `Testimonials.tsx`, `Features.tsx`, `Header.tsx`, `Boat.tsx`, `CallToAction.tsx`)
2. **Extraire `handleNavClick`** dans un hook `useScrollToSection.ts`
3. **Extraire `escapeHtml`** dans `src/lib/escape-html.ts`
4. **Extraire le Google Logo SVG** dans un composant `GoogleLogo.tsx`

---

## 3. Composants monolithiques ⚠️ (7/10)

### Fichiers depassant 300 lignes

| Fichier | Lignes | Probleme |
|---------|--------|----------|
| `src/components/ui/sidebar.tsx` | 637 | Composant shadcn/ui (accepte, genere) |
| `src/views/Croisiere.tsx` | 335 | Donnees landmarks + itineraire + UI dans un seul fichier |
| `src/views/Actualites.tsx` | 315 | Blog + Instagram + categories dans un seul fichier |
| `src/components/ui/chart.tsx` | 310 | Composant shadcn/ui (accepte, genere) |
| `src/components/HeaderVariants.tsx` | 289 | Desktop + Mobile + Lang switcher + Theme toggle |

### Analyse detaillee

**`src/views/Croisiere.tsx` (335 lignes)** :
- Les donnees `landmarks` (37-128, 91 lignes) et `itinerarySteps` (130-140, 11 lignes) devraient etre extraites dans `src/data/croisiere.ts`
- La carte interactive (177-254) pourrait etre un composant `InteractiveMap.tsx`
- La timeline (258-308) pourrait etre un composant `ItineraryTimeline.tsx`

**`src/views/Actualites.tsx` (315 lignes)** :
- La section Instagram (236-307) devrait etre un composant `InstagramFeed.tsx`
- Le "featured post" (110-161) pourrait etre un composant `FeaturedPost.tsx`
- La grille de posts (164-217) pourrait etre un composant `PostGrid.tsx`

**`src/components/HeaderVariants.tsx` (289 lignes)** :
- Le menu mobile (226-284) pourrait etre un composant `MobileMenu.tsx`
- Le language switcher (139-187) pourrait etre un composant `LanguageSwitcher.tsx`

### Recommandations

1. Extraire les donnees statiques de `Croisiere.tsx` vers `src/data/croisiere.ts`
2. Decomposer `Actualites.tsx` en 3 sous-composants
3. Decomposer `HeaderVariants.tsx` en sous-composants (MobileMenu, LanguageSwitcher)

---

## 4. Props Typing (TypeScript) ✅ (8/10)

### Points positifs

- **Landing composants** : Tous les 11 composants ont des interfaces `Props` bien definies (`LandingHeroProps`, `LandingFAQProps`, `LandingBenefitsProps`, etc.)
- **Types landing pages** : Excellent fichier `src/data/landings/types.ts` avec 75 lignes de types bien structures (union types, interfaces imbriquees)
- **API routes** : Schema Zod pour la validation (`contactSchema` dans `route.ts`)
- **WordPress** : Interface `WPPost` bien definie dans `src/lib/wordpress.ts`
- **Instagram** : Interface `InstagramPost` exportee dans `src/app/api/instagram/route.ts`
- **Cookie consent** : Types declares dans `src/types/cookie-consent.d.ts`
- **Theme** : `ThemeVariant` type union bien utilise partout

### Points a ameliorer

| Fichier | Probleme |
|---------|----------|
| `src/app/[locale]/test/page.tsx:6` | `any[]` pour les pages WordPress |
| `src/lib/wordpress.ts:16` | `wpFetch<T = any>` — le generic a un fallback `any` |
| `src/components/HeaderVariants.tsx` | Pas d'interface Props (composant sans props, acceptable) |
| `src/views/Croisiere.tsx` | Interface `Landmark` bien definie localement, mais pourrait etre dans un fichier types |

### Composants sans interface Props explicite

La majorite des composants de page (vues) et composants Variants n'acceptent pas de props, ce qui est un choix d'architecture valide (ils consomment le contexte via hooks). Les composants qui acceptent des props sont tous bien types.

### Recommandations

1. Remplacer les `any` dans `test/page.tsx` par le type `WPPost[]` de `@/lib/wordpress`
2. Remplacer le fallback `any` dans `wpFetch<T = any>` par `unknown`
3. Exporter l'interface `Landmark` si reutilisee

---

## 5. Error Handling ✅ (8/10)

### Points positifs

- **Logger structure** : `src/lib/logger.ts` bien implemente (JSON en prod, lisible en dev)
- **API contact** : Validation Zod + rate limiting + honeypot + try/catch avec `logger.error`
- **API Instagram** : try/catch avec `logger.error` et reponses d'erreur correctes
- **Cookie consent** : try/catch sur chaque operation localStorage avec `logger.error`
- **Error boundaries** : `src/app/[locale]/error.tsx` + `src/app/global-error.tsx` en place
- **404** : `src/views/NotFound.tsx` avec `logger.warn`
- **ContactForm** : Gestion fine des erreurs (rate_limited, validation, server) avec messages utilisateur

### Points a ameliorer

| Fichier | Probleme |
|---------|----------|
| `src/components/ContactForm.tsx:80` | `catch` vide sans variable d'erreur (catch sans `(error)`) |
| `src/lib/wordpress.ts:19` | `throw new Error(...)` sans catch au niveau superieur |
| `src/app/[locale]/test/page.tsx:9` | `catch (e)` — l'erreur `e` n'est pas typee |
| `src/views/Reservation.tsx` | L'iframe a un timeout/error state mais pas de `logger.error` quand il timeout |

### Couverture des try/catch

| Zone | try/catch | logger |
|------|-----------|--------|
| API contact | ✅ | ✅ |
| API Instagram | ✅ | ✅ |
| Cookie consent (3 fonctions) | ✅ | ✅ |
| WordPress fetch | ✅ (test page) | ✅ |
| Formulaire contact client | ✅ | ❌ (toast seulement) |
| Error boundary | ✅ | ✅ |
| Page 404 | N/A | ✅ |

### Recommandations

1. Ajouter `logger.error` dans le catch du `ContactForm.tsx`
2. Ajouter `logger.warn` quand l'iframe Reservation timeout
3. Typer les erreurs dans les catch blocks (`catch (error: unknown)`)

---

## 6. Console.log ✅ (10/10)

**Zero occurrence** de `console.log`, `console.error`, `console.warn`, `console.debug` ou `console.info` dans l'ensemble du code source (`src/`).

Le logger structure (`src/lib/logger.ts`) est utilise systematiquement :
- 10 appels `logger.error` dans 6 fichiers
- 1 appel `logger.warn` dans 1 fichier

Le logger encapsule correctement les appels `console.*` natifs en production (JSON) et en developpement (format lisible).

**C'est un point d'excellence du projet.**

---

## 7. Dead Code ⚠️ (5/10)

### Composants non utilises (code mort)

8 composants "base" ne sont importes nulle part dans le code de production :

| Fichier | Lignes | Remplace par |
|---------|--------|-------------|
| `src/components/Hero.tsx` | 87 | `HeroVariants.tsx` |
| `src/components/Header.tsx` | 118 | `HeaderVariants.tsx` |
| `src/components/Footer.tsx` | 141 | `FooterVariants.tsx` |
| `src/components/Offers.tsx` | 160 | `OffersVariants.tsx` |
| `src/components/Testimonials.tsx` | 149 | `TestimonialsVariants.tsx` |
| `src/components/Features.tsx` | 82 | `FeaturesVariants.tsx` |
| `src/components/Boat.tsx` | 106 | `BoatVariants.tsx` |
| `src/components/CallToAction.tsx` | 58 | `CTAVariants.tsx` |
| **Total** | **901** | |

### Page de test en production

`src/app/[locale]/test/page.tsx` est une page de debug WordPress qui :
- Utilise `any` (erreur ESLint)
- N'a pas d'equivalent sur la page d'accueil
- Est accessible en production

### Composants UI shadcn non utilises

Sur les ~47 composants `ui/` installes, seulement ~10 sont importes dans le code custom :
- **Utilises** : `button`, `input`, `textarea`, `skeleton`, `breadcrumb`, `accordion`, `switch`, `toast`/`toaster`
- **Non utilises** (exemples) : `sidebar` (637 lignes), `chart` (310 lignes), `carousel`, `command`, `menubar`, `calendar`, `drawer`, `hover-card`, `context-menu`, `dialog`, `alert-dialog`, `navigation-menu`, `pagination`, `form`, `table`, `progress`, `avatar`, `collapsible`, `resizable`, `scroll-area`, `select`, `dropdown-menu`, `sheet`, `popover`, `checkbox`, `slider`, `tooltip`, `input-otp`, `radio-group`, `tabs`, `toggle`, `toggle-group`, `sonner`, `alert`, `card`, `separator`

**Estimation** : ~4000+ lignes de composants UI non utilises.

### Variables ESLint `no-unused-vars`

ESLint a detecte ~35 warnings `no-unused-vars` dans les fichiers de test (mocks Framer Motion).

### Recommandations

1. **Priorite haute** : Supprimer les 8 composants "base" (901 lignes)
2. **Priorite haute** : Supprimer ou proteger `test/page.tsx` (ne pas livrer en prod)
3. **Priorite moyenne** : Faire le tri des composants shadcn/ui non utilises
4. **Priorite basse** : Nettoyer les warnings `no-unused-vars` dans les tests

---

## 8. Patterns React ✅ (8/10)

### Points positifs

- **Code splitting** : `next/dynamic` utilise dans `src/views/Index.tsx` pour 10 composants below-the-fold
- **`"use client"` coherent** : Tous les composants interactifs ont la directive, les pages App Router sont server components
- **`useCallback`** bien utilise :
  - `FooterVariants.tsx` : `handleNavClick` memoize avec `[pathname, router]`
  - `Reservation.tsx` : `handleIframeLoad` memoize
  - `HeroCinemaSlideshow.tsx` : `advance` memoize
- **`useMemo`** bien utilise :
  - `Actualites.tsx` : `categories` memoize avec `[allPosts]`
- **Hooks customs** : `useCookieConsent`, `useInstagramFeed` bien encapsules
- **Context** : `ThemeVariantContext` avec `isDark` helper, pattern propre
- **Image optimization** : `next/image` utilise partout sauf exceptions justifiees

### Points a ameliorer

| Pattern | Fichier | Probleme |
|---------|---------|----------|
| `motion.img` au lieu de `next/image` | `Croisiere.tsx:196`, `HeroCinemaSlideshow.tsx:70`, `BoatImageSlideshow.tsx:43` | SVG/slideshow avec animation Framer Motion — justifie pour les SVG, discutable pour les slideshows |
| `<img>` natif | `Croisiere.tsx:246` | Metro icon — devrait utiliser `next/image` |
| `setState` dans `useEffect` | `CookieProvider.tsx:32` | ESLint error `react-hooks/set-state-in-effect` — initialisation au mount, fonctionnellement correct mais l'approche devrait etre refactoree |
| Pas de `useCallback` | `HeaderVariants.tsx:79` | `handleNavClick` n'est pas memoize (recree a chaque render) |
| `setInterval` pour scroll | `HeaderVariants.tsx:87-96`, `FooterVariants.tsx:64-75` | Pattern fragile — preferer `MutationObserver` ou `requestAnimationFrame` |
| Pas de cleanup | `HeaderVariants.tsx:87-96` | L'intervalle n'est pas nettoye si le composant se demonte pendant le polling |

### CookieProvider — setState dans useEffect

L'ESLint rule `react-hooks/set-state-in-effect` signale un probleme dans `CookieProvider.tsx:32`. Le code appelle `setConsent(stored)` dans un `useEffect`, ce qui est techniquement correct pour une initialisation au mount mais pourrait etre ameliore avec `useSyncExternalStore` ou en initialisant le state directement :

```tsx
// Approche recommandee
const [consent, setConsent] = useState<CookieConsent | null>(() => {
  if (typeof window === 'undefined') return null;
  return loadConsent();
});
```

### Recommandations

1. Remplacer le `<img>` natif dans `Croisiere.tsx:246` par `next/image`
2. Memoizer `handleNavClick` dans `HeaderVariants.tsx` avec `useCallback`
3. Extraire la logique de scroll-to-section dans un hook avec cleanup propre
4. Refactorer l'initialisation du `CookieProvider` pour eviter `setState` dans `useEffect`

---

## 9. ESLint ⚠️ (7/10)

### Resultats `npm run lint`

| Severite | Nombre | Categories principales |
|----------|--------|----------------------|
| Erreurs | 8 | `no-explicit-any` (6), `set-state-in-effect` (1), `prefer-const` (1) |
| Warnings | 44 | `no-unused-vars` (35 dans tests), `no-img-element` (2), `alt-text` (1), `eslint-disable unused` (1) |
| **Total** | **52** | |

### Erreurs (a corriger)

| Fichier | Erreur | Recommandation |
|---------|--------|----------------|
| `scripts/import-instagram.ts:66,118` | `no-explicit-any` | Typer les reponses API Instagram |
| `scripts/import-reviews.ts:86` | `no-explicit-any` | Typer les donnees Google Places |
| `scripts/translate.ts:83` | `no-explicit-any` | Typer les parametres de traduction |
| `scripts/translate.ts:111` | `prefer-const` | Remplacer `let` par `const` |
| `src/app/[locale]/test/page.tsx:6` | `no-explicit-any` | Utiliser `WPPost[]` |
| `src/lib/wordpress.ts:16` | `no-explicit-any` | Remplacer `<T = any>` par `<T = unknown>` |
| `src/components/cookie-consent/CookieProvider.tsx:32` | `set-state-in-effect` | Refactorer l'initialisation |

### Warnings notables (hors tests)

| Fichier | Warning | Recommandation |
|---------|---------|----------------|
| `src/views/Croisiere.tsx:246` | `no-img-element` | Remplacer `<img>` par `next/image` |
| `scripts/import-images.ts:17` | `no-unused-vars` (`extname`) | Supprimer l'import inutile |

### Recommandations

1. Corriger les 8 erreurs ESLint (priorite haute)
2. Nettoyer les mocks Framer Motion dans les tests pour eliminer les warnings `no-unused-vars`
3. Ajouter un fichier `.eslintignore` pour les scripts si les types ne sont pas critiques

---

## 10. Code Comments ⚠️ (6/10)

### Points positifs — Fichiers bien documentes

| Fichier | Documentation |
|---------|--------------|
| `src/lib/logger.ts` | JSDoc complet avec description du module |
| `src/lib/gtag.ts` | JSDoc sur chaque fonction exportee (5 fonctions) |
| `src/lib/metadata.ts` | JSDoc sur les 2 fonctions exportees |
| `src/lib/seo/jsonld.ts` | JSDoc sur les 3 generateurs de schemas |
| `src/data/landings/index.ts` | JSDoc sur les 4 fonctions exportees |
| `src/hooks/useInstagramFeed.ts` | JSDoc sur le hook principal |
| `src/app/api/contact/route.ts` | Commentaires sections (rate limiting, schema, handler) |

### Points a ameliorer — Fichiers sans documentation

| Fichier | Lignes | Probleme |
|---------|--------|----------|
| `src/components/HeaderVariants.tsx` | 289 | Zero commentaire de documentation (la logique `handleNavClick` et `setInterval` sont complexes) |
| `src/views/Croisiere.tsx` | 335 | Commentaires HTML uniquement (`{/* Map Container */}`) mais pas de doc fonctionnelle |
| `src/views/Actualites.tsx` | 315 | Commentaires HTML uniquement |
| `src/views/Reservation.tsx` | 235 | Quelques commentaires inline mais pas de JSDoc |
| `src/components/ContactForm.tsx` | 217 | Un commentaire honeypot, mais pas de doc sur la logique d'envoi |
| `src/components/cookie-consent/CookieProvider.tsx` | 131 | Un commentaire sur le batching React 18 mais pas de JSDoc |
| `src/lib/cookie-consent.ts` | ~50 | Aucun JSDoc sur les fonctions exportees |
| `src/contexts/ThemeVariantContext.tsx` | ~40 | Aucun JSDoc |

### Patterns observes

- Les **fichiers `lib/`** sont generalement bien documentes (JSDoc)
- Les **composants** utilisent des commentaires HTML (`{/* Section Header */}`) qui sont utiles pour la structure mais pas pour la documentation
- Les **hooks** et **contextes** manquent de JSDoc
- Aucun `TODO`, `FIXME` ou `HACK` dans le code (bon signe)

### Recommandations

1. Ajouter des JSDoc sur les composants complexes (`HeaderVariants`, `ContactForm`, `CookieProvider`)
2. Documenter les hooks (`useCookieConsent`, `useInstagramFeed` — ce dernier est deja fait)
3. Documenter le contexte `ThemeVariantContext`
4. Ajouter un commentaire de module en haut des fichiers critiques

---

## Resume des recommandations par priorite

### Priorite haute (impact immediat)

1. **Supprimer les 8 composants "base" non utilises** — 901 lignes de code mort (`Hero.tsx`, `Header.tsx`, `Footer.tsx`, `Offers.tsx`, `Testimonials.tsx`, `Features.tsx`, `Boat.tsx`, `CallToAction.tsx`)
2. **Corriger les 8 erreurs ESLint** — principalement les `no-explicit-any`
3. **Supprimer ou proteger `test/page.tsx`** — page de debug accessible en production
4. **Corriger le `set-state-in-effect`** dans `CookieProvider.tsx`

### Priorite moyenne (amelioration qualite)

5. **Extraire `handleNavClick`** dans un hook `useScrollToSection.ts` (DRY)
6. **Extraire `escapeHtml`** dans `src/lib/escape-html.ts` (DRY + testabilite)
7. **Decomposer `Croisiere.tsx`** : extraire donnees + sous-composants
8. **Decomposer `Actualites.tsx`** : extraire section Instagram + grille
9. **Remplacer `<img>` par `next/image`** dans `Croisiere.tsx:246`
10. **Memoizer `handleNavClick`** dans `HeaderVariants.tsx` avec `useCallback`

### Priorite basse (maintenance long terme)

11. **Nettoyer les composants shadcn/ui non utilises** (~4000 lignes)
12. **Ajouter des JSDoc** sur les composants et hooks complexes
13. **Harmoniser les noms de fichiers hooks** (`use-mobile.tsx` -> `useMobile.ts`)
14. **Nettoyer les warnings ESLint** dans les tests (mocks Framer Motion)
15. **Extraire le Google Logo SVG** dans un composant reutilisable

---

## Annexe : Fichiers analyses

### Composants custom (hors ui/) : 32 fichiers
### Vues : 11 fichiers
### Libs/hooks/contexts : 12 fichiers
### API routes : 2 fichiers
### Landing data : 19 fichiers
### Tests : 10 fichiers
### App Router pages : 15 fichiers

**Total analyse** : ~101 fichiers TypeScript/TSX, ~14 111 lignes de code.
