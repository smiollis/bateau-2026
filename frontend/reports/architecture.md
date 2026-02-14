# Rapport d'architecture frontend -- bateau-a-paris.fr

**Date** : 2026-02-14
**Projet** : Un Bateau a Paris -- Next.js 16 + TypeScript + Tailwind CSS v4
**Auteur** : Audit automatise (Claude Code)
**Perimetre** : `/work/projects/MICHEL/bateau-2026/frontend/src/`

---

## Score global : 7.5 / 10

L'architecture est solide et bien structuree pour un site vitrine de cette taille. Les conventions sont coherentes, le systeme de landing pages est elegant, et la separation des responsabilites est generalement bonne. Les principaux axes d'amelioration concernent la frontiere server/client (trop de `"use client"`), la duplication du layout Header/Footer dans les vues, et le sous-usage des composants shadcn/ui installes.

---

## Tableau recapitulatif

| # | Categorie | Score | Statut |
|---|-----------|-------|--------|
| 1 | Structure des dossiers | 8/10 | OK |
| 2 | App Router | 7/10 | Attention |
| 3 | Server vs Client | 6/10 | Attention |
| 4 | Data flow | 8/10 | OK |
| 5 | Contexts | 8/10 | OK |
| 6 | Hooks customs | 7/10 | Attention |
| 7 | Landing pages architecture | 9/10 | OK |
| 8 | API layer | 8/10 | OK |
| 9 | Patterns | 7/10 | Attention |
| 10 | Couplage | 6/10 | Attention |

---

## 1. Structure des dossiers (8/10) -- OK

### Analyse

L'arborescence `src/` est claire et suit les conventions Next.js App Router :

```
src/
  app/           -- Routing (layouts, pages, API routes, sitemap, robots)
  views/         -- 11 composants de page complets (evite le conflit Pages Router)
  components/    -- 37 composants React (ui/, cookie-consent/, landing/)
  contexts/      -- 1 contexte (ThemeVariantContext)
  hooks/         -- 4 hooks customs
  lib/           -- 7 utilitaires (cookie-consent, gtag, logger, metadata, utils, wordpress, seo/jsonld)
  data/          -- Donnees statiques (landings/, posts, reviews, gallery, instagram)
  i18n/          -- 3 fichiers next-intl (routing, navigation, request)
  types/         -- 1 fichier de types (cookie-consent.d.ts)
  assets/        -- Images statiques (logo, map/)
  json/          -- 1 fichier JSON legacy (sbi-feed)
  __tests__/     -- Tests unitaires (unit/, components/)
  middleware.ts  -- Middleware next-intl
```

### Points positifs

- Separation nette `app/` (routing) vs `views/` (logique UI) vs `components/` (reutilisables)
- Le dossier `data/landings/` est bien organise : 1 fichier par page + `types.ts` + `index.ts` (registry)
- Le dossier `components/landing/` avec son barrel export (`index.ts`) est propre
- Les composants shadcn/ui sont isoles dans `components/ui/`
- Le dossier `lib/seo/` centralise la generation JSON-LD

### Points d'attention

- **`src/json/`** : contient un seul fichier legacy (`sbi-feed-bateau_a_paris.json`) qui semble orphelin. A nettoyer ou migrer dans `src/data/`.
- **`src/types/`** : contient un seul fichier `cookie-consent.d.ts`. Les autres types (landing, posts) sont defines inline ou dans les fichiers data. Il serait plus coherent de centraliser tous les types partages ici.
- **49 composants shadcn/ui** installes, mais seulement **~10** sont reellement utilises dans le code applicatif (button, accordion, input, textarea, skeleton, breadcrumb, switch, toast). Les 39 autres (`calendar`, `chart`, `carousel`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, etc.) sont du dead code.

### Recommandations

1. Supprimer `src/json/` ou migrer son contenu dans `src/data/`
2. Creer un fichier `src/types/index.ts` exportant tous les types partages (posts, reviews, gallery, etc.)
3. Auditer et supprimer les composants shadcn/ui non utilises pour reduire la taille du bundle et la surface de maintenance (supprimer ~39 fichiers `components/ui/*.tsx` inutilises)

---

## 2. App Router (7/10) -- Attention

### Analyse

**Fichiers App Router trouves :**

```
src/app/
  layout.tsx                        -- Root layout (fonts, GA4, JSON-LD LocalBusiness, Providers)
  not-found.tsx                     -- 404 global
  global-error.tsx                  -- Error boundary global ("use client")
  globals.css                       -- Tailwind + design tokens
  sitemap.ts                        -- Sitemap dynamique
  robots.ts                         -- Robots.txt dynamique
  favicon.ico
  api/
    instagram/route.ts              -- API Route Instagram
    contact/route.ts                -- API Route contact (Resend)
  [locale]/
    layout.tsx                      -- Layout locale (NextIntlClientProvider + CookieBanner)
    page.tsx                        -- Homepage
    error.tsx                       -- Error boundary locale ("use client")
    croisiere/page.tsx              -- Page croisiere
    galerie/page.tsx                -- Page galerie
    reservation/page.tsx            -- Page reservation
    faq/page.tsx                    -- Page FAQ
    mentions-legales/page.tsx       -- Mentions legales
    cgv/page.tsx                    -- CGV
    confidentialite/page.tsx        -- Confidentialite
    test/page.tsx                   -- Page test (a supprimer en prod?)
    actualites/page.tsx             -- Liste articles
    actualites/[slug]/page.tsx      -- Detail article (SSG)
    (landing)/
      layout.tsx                    -- Layout landing (Header + Footer)
      [slug]/page.tsx               -- Page landing dynamique (SSG)
```

### Points positifs

- **Layouts imbriques** : `layout.tsx` (root) > `[locale]/layout.tsx` > `(landing)/layout.tsx` -- bon usage de la hierarchie
- **Route group** `(landing)` utilisee correctement pour isoler le layout landing
- **`generateStaticParams`** : bien utilise pour les landing pages et les articles (SSG)
- **`generateMetadata`** : present sur chaque page avec `getAlternates()` et `getOgLocale()`
- **Error boundaries** : `error.tsx` (locale) + `global-error.tsx` (racine) -- couverture complete
- **`not-found.tsx`** : present au niveau racine
- **`sitemap.ts`** + **`robots.ts`** : dynamiques et complets
- **API Routes** bien separees (`api/contact`, `api/instagram`)

### Points d'attention

- **Pas de `loading.tsx`** : aucun fichier `loading.tsx` dans l'arborescence. Les pages SSG n'en ont pas vraiment besoin, mais les pages avec iframe (reservation) ou contenu dynamique beneficieraient d'un loading state natif App Router.
- **`test/page.tsx`** : une page de test est presente dans le routing de production. A supprimer ou proteger.
- **Pages wrappers trop fines** : les fichiers `page.tsx` sont de simples wrappers (`return <Page />`). C'est une convention valide, mais elle delegue TOUTE la logique UI au client via les vues `"use client"`, perdant ainsi les avantages du server rendering (voir section 3).
- **Pas de `not-found.tsx` au niveau `[locale]/`** : le 404 locale n'est pas gere specifiquement (seul le root `not-found.tsx` existe, en francais uniquement).

### Recommandations

1. Ajouter `loading.tsx` au minimum dans `[locale]/reservation/` et `[locale]/actualites/[slug]/`
2. Supprimer ou proteger `[locale]/test/page.tsx`
3. Ajouter `[locale]/not-found.tsx` avec traductions i18n pour le 404
4. Envisager de migrer la logique server-compatible des vues directement dans les `page.tsx` (voir section 3)

---

## 3. Server vs Client components (6/10) -- Attention

### Analyse

**Fichiers avec `"use client"` :**
- `app/` : 2 fichiers (error boundaries -- obligatoire)
- `views/` : **11/11 fichiers** (100%)
- `components/` : **37 fichiers** (tous les composants metier + landing)
- `hooks/` : 2 fichiers (useCookieConsent, useInstagramFeed)
- `contexts/` : 1 fichier (ThemeVariantContext)

**Fichiers server components :**
- `app/layout.tsx` : server component (root)
- `app/[locale]/layout.tsx` : server component (async, getMessages)
- `app/[locale]/(landing)/layout.tsx` : server component (mais importe des client components)
- `app/[locale]/(landing)/[slug]/page.tsx` : **server component** (bon usage ! SSG + JSON-LD)
- `app/[locale]/actualites/[slug]/page.tsx` : **server component** (SSG + JSON-LD)
- Tous les autres `page.tsx` : server components (wrappers) mais delegent immediatement a un client component

### Probleme principal

**Toutes les vues (11/11) sont des client components**, ce qui signifie que :
- Le HTML initial est genere cote serveur (SSR) mais le bundle JS complet est envoye au client
- Les composants qui ne necessitent PAS d'interactivite (MentionsLegales, CGV, Confidentialite) sont inutilement marques `"use client"`
- La page d'accueil (`Index.tsx`) est un client component monolithique qui importe 12 composants via `next/dynamic`

**Analyse detaillee des vues :**

| Vue | Besoin client ? | Raison |
|-----|----------------|--------|
| `Index.tsx` | Oui (partiel) | Theme, animations, formulaire |
| `Croisiere.tsx` | Oui | Carte interactive, animations |
| `Galerie.tsx` | Oui | Lightbox, Instagram feed |
| `Reservation.tsx` | Oui | Iframe, state management |
| `FAQ.tsx` | Oui (partiel) | Accordion interactif |
| `Actualites.tsx` | Partiel | Filtrage, mais pourrait etre server |
| `ArticleDetail.tsx` | Partiel | DOMPurify (client), mais le contenu est statique |
| `MentionsLegales.tsx` | Non | Contenu statique uniquement |
| `CGV.tsx` | Non | Contenu statique uniquement |
| `Confidentialite.tsx` | Non | Contenu statique uniquement |
| `NotFound.tsx` | Non | Contenu statique uniquement |

### Points positifs

- La page landing `[slug]/page.tsx` est un **vrai server component** avec SSG -- excellent pattern
- L'article detail `actualites/[slug]/page.tsx` est un server component qui passe les donnees en props
- Le code splitting via `next/dynamic` dans `Index.tsx` est une bonne pratique de compensation
- `GalleryLightbox` est correctement charge avec `ssr: false`

### Recommandations

1. **Migrer les vues statiques en server components** : `MentionsLegales`, `CGV`, `Confidentialite`, `NotFound` n'utilisent aucun hook client. Retirer `"use client"` et les adapter (remplacer `useThemeVariant` par des props ou du CSS natif).
2. **Decomposer les vues mixtes** : extraire les parties interactives dans des sous-composants client et garder le wrapper en server component. Exemple pour `ArticleDetail` : le contenu principal peut etre server, seuls les liens de navigation et le DOMPurify necessitent le client.
3. **Evaluer les composants landing** : `LandingBreadcrumb`, `LandingRichtext` sont marques `"use client"` mais ne semblent pas utiliser de hooks client -- verifier si le `"use client"` est necessaire.

---

## 4. Data flow (8/10) -- OK

### Analyse

Le flux de donnees suit plusieurs patterns :

**1. Server -> Client (props drilling)**
- `page.tsx` (server) genere les metadata et passe les props aux vues client
- Bon exemple : `actualites/[slug]/page.tsx` charge le post cote serveur et le passe a `ArticleDetail`
- Excellent exemple : `(landing)/[slug]/page.tsx` charge les donnees landing, genere le JSON-LD cote serveur

**2. Context (global state)**
- `ThemeVariantContext` : variant/isDark distribue globalement via Providers
- `CookieConsentContext` : consent state + actions distribue globalement
- `NextIntlClientProvider` : messages i18n distribues au niveau du layout locale

**3. Static data imports**
- `data/landings/*.ts` : donnees landing importees statiquement (tree-shakeable, SSG-friendly)
- `data/posts.json` / `data/posts-en.json` : articles importes comme modules JSON
- `data/reviews.json` : avis Google importes statiquement
- `data/instagram.json` : posts Instagram en snapshot statique
- `data/galleryImages.ts` : images galerie avec metadonnees

**4. API Routes (runtime)**
- `/api/contact` : POST via `fetch` depuis `ContactForm`
- `/api/instagram` : GET avec cache ISR (1h) -- mais **non utilise en runtime** (remplace par le snapshot statique)

### Points positifs

- Les donnees landing sont **purement statiques** : pas de fetch client, pas de state management, pas de loading states -- juste du SSG. C'est le pattern ideal.
- La hierarchie des contextes est plate (2 niveaux max) : pas de context hell.
- Le flux unidirectionnel est respecte partout : donnees vers le bas, actions vers le haut.
- Le blog bilingue utilise un pattern simple et efficace (`locale === "en" ? postsEn : postsFr`).

### Points d'attention

- **L'API route Instagram est orpheline** : `useInstagramFeed` lit `data/instagram.json` directement, rendant `/api/instagram/route.ts` inutilise en runtime. Le fichier reste utile comme reference, mais c'est du dead code fonctionnel.
- **Pas de couche de cache serveur explicite** : les donnees sont statiques (SSG), ce qui est suffisant pour le cas actuel, mais une evolution vers du contenu dynamique (WordPress live) necessiterait une strategie de cache (ISR, `unstable_cache`, etc.).

### Recommandations

1. Supprimer ou documenter l'API route Instagram si le snapshot statique est la strategie definitive
2. Creer un script automatise de rafraichissement du snapshot Instagram (`npm run import:instagram`)
3. Envisager `unstable_cache` ou ISR pour le futur passage au contenu WordPress dynamique

---

## 5. Contexts (8/10) -- OK

### Analyse

**Contextes presents :**

| Contexte | Fichier | Scope | Consumers |
|----------|---------|-------|-----------|
| `ThemeVariantContext` | `contexts/ThemeVariantContext.tsx` | Global (via Providers) | ~20 composants (tous les *Variants + vues) |
| `CookieConsentContext` | `components/cookie-consent/CookieProvider.tsx` | Global (via Providers) | CookieBanner, CookieModal, FooterVariants |
| `NextIntlClientProvider` | `app/[locale]/layout.tsx` | Locale layout | Tous les composants via `useTranslations` |

**Hierarchie des Providers :**
```
RootLayout (server)
  Providers ("use client")
    ThemeVariantProvider
      CookieProvider
        NextIntlClientProvider (dans [locale]/layout.tsx)
          {children}
```

### Points positifs

- **Contextes bien types** : `ThemeVariantContextType` et `CookieConsentContextValue` avec interfaces completes
- **Guard pattern** : les deux hooks custom (`useThemeVariant`, `useCookieConsent`) lancent une erreur explicite si utilises hors du provider
- **Separation des responsabilites** : le theme et le cookie consent sont des concerns independants avec leurs propres contextes
- **Pas de prop drilling excessif** : le theme et le consent sont distribues via contexte, evitant le passage de props a travers 5+ niveaux

### Points d'attention

- **Le ThemeVariantContext manipule le DOM directement** (`document.documentElement.classList.add("dark")` dans un `useEffect`). C'est fonctionnel mais fragile : il depend du fait que le root `<html>` element est accessible. Une approche plus robuste serait d'utiliser un data attribute.
- **Le CookieProvider est complexe** (131 lignes, 7 actions). Il pourrait beneficier d'un `useReducer` au lieu de multiples `useState`.

### Recommandations

1. Remplacer la manipulation directe de `classList` par un `data-theme` attribute sur `<html>`
2. Extraire la logique du CookieProvider dans un `useReducer` pour simplifier le state management
3. Envisager la persistence du theme dans localStorage (actuellement, le theme reset a "classic" a chaque rechargement)

---

## 6. Hooks customs (7/10) -- Attention

### Analyse

**Hooks customs :**

| Hook | Fichier | Usage | Client-only |
|------|---------|-------|-------------|
| `useCookieConsent` | `hooks/useCookieConsent.ts` | Acces au CookieConsentContext | Oui |
| `useInstagramFeed` | `hooks/useInstagramFeed.ts` | Lecture snapshot Instagram JSON | Oui (marque, mais pas necessaire) |
| `useToast` | `hooks/use-toast.ts` | Systeme de toast (shadcn) | Non (module pattern) |
| `useIsMobile` | `hooks/use-mobile.tsx` | Detection mobile via matchMedia | Oui |
| `useThemeVariant` | `contexts/ThemeVariantContext.tsx` | Acces au theme (exporte depuis le contexte) | Oui |

### Points positifs

- **`useCookieConsent`** : hook wrapper minimal et propre autour du contexte, avec guard pattern
- **`useToast`** : implementation shadcn standard avec module pattern (state global hors React) -- fonctionnel
- **`useIsMobile`** : implementation correcte avec `matchMedia` et cleanup

### Points d'attention

- **`useInstagramFeed`** est marque `"use client"` mais ne utilise aucun hook React (pas de `useState`, `useEffect`, etc.). Il retourne simplement des donnees statiques. Ce n'est pas un vrai hook -- c'est une fonction utilitaire deguisee en hook. De plus, `isLoading` est toujours `false` et `error` toujours `null`, ce qui est trompeur pour l'API consommateur.
- **`useIsMobile`** est dans un fichier `.tsx` au lieu de `.ts` (pas de JSX utilise)
- **Pas de hooks pour des patterns recurrents** : la logique de scroll-to-anchor (presente dans `HeaderVariants` et `FooterVariants` de facon dupliquee) pourrait etre extraite dans un `useScrollToSection`
- **Le hook `useThemeVariant` est defini dans le fichier du contexte** plutot que dans `hooks/`. C'est acceptable mais inconsistant avec la convention pour `useCookieConsent`.

### Recommandations

1. Transformer `useInstagramFeed` en simple fonction utilitaire dans `lib/` (pas un hook)
2. Creer un hook `useScrollToSection` pour dedupliquer la logique anchor scroll
3. Renommer `use-mobile.tsx` en `use-mobile.ts`
4. Deplacer `useThemeVariant` dans `hooks/` pour la coherence, ou deplacer `useCookieConsent` dans le fichier du contexte

---

## 7. Landing pages architecture (9/10) -- OK

### Analyse

Le systeme de landing pages est le point fort de l'architecture :

```
Architecture landing pages:

  data/landings/
    types.ts          -- Interface LandingPageData + LandingSection (union type)
    index.ts          -- Registry (getLandingData, getAllLandingSlugs, getRelatedPages)
    evjf-seine.ts     -- Donnees d'une page (17 fichiers au total)
    ...

  components/landing/
    index.ts          -- Barrel export (11 composants)
    LandingHero.tsx   -- Hero section
    LandingBreadcrumb.tsx
    LandingRichtext.tsx
    LandingBenefits.tsx
    LandingGallery.tsx
    LandingTestimonials.tsx
    LandingPricing.tsx
    LandingFAQ.tsx
    LandingCTA.tsx
    LandingStickyBar.tsx
    LandingRelated.tsx

  app/[locale]/(landing)/
    layout.tsx        -- Header + Footer
    [slug]/page.tsx   -- Route dynamique SSG (generateStaticParams + generateMetadata)
```

### Points positifs

- **Separation data/UI exemplaire** : les donnees sont purement declaratives (TypeScript objects), les composants sont purement presentationnels
- **`SectionRenderer`** : pattern switch/case elegant pour le rendu conditionnel des sections, type-safe avec TypeScript discriminated union
- **SSG complet** : `generateStaticParams()` + `generateMetadata()` pour un rendu 100% statique
- **JSON-LD server-side** : genere dans le `page.tsx` (server component) -- pas de overhead client
- **Type safety forte** : `LandingPageData` avec union type `LandingSection` couvre tous les cas
- **Registry pattern** dans `index.ts` : ajout d'une nouvelle page = 1 fichier data + 1 import
- **Route group `(landing)`** : isole le layout Header/Footer pour les landing pages
- **Related pages** : systeme de pages liees avec extraction de donnees minimales

### Points d'attention

- **Les composants landing sont tous `"use client"`** alors que certains (`LandingBreadcrumb`, `LandingRichtext`) n'utilisent pas de hooks client. Ils pourraient etre des server components.
- **Le `SectionRenderer` est defini inline** dans `page.tsx` au lieu d'etre un composant exporte. Ce n'est pas un probleme technique (il est utilise uniquement ici), mais pour la testabilite, un export serait preferable.
- **Les donnees landing ne sont pas internationalisees** : les titres, textes et FAQ sont en francais uniquement. Le systeme i18n (next-intl) n'est pas utilise dans les landing pages.

### Recommandations

1. Evaluer la migration des composants landing sans interactivite en server components
2. Internationaliser les donnees landing via les fichiers de traduction next-intl
3. Envisager un schema de validation (Zod) pour les donnees landing afin de detecter les erreurs au build time

---

## 8. API layer (8/10) -- OK

### Analyse

**API Routes :**

| Route | Methode | Fonction | Securite |
|-------|---------|----------|----------|
| `/api/contact` | POST | Envoi email via Resend | Rate limiting 3/min, Zod validation, honeypot anti-spam, escapeHtml |
| `/api/instagram` | GET | Fetch Instagram Graph API | Cache ISR 1h, token server-side |

**Client API (lib/) :**

| Module | Fonction | Utilise par |
|--------|----------|-------------|
| `lib/wordpress.ts` | `wpFetch`, `getPosts`, `getPages` | Non utilise dans le code actuel |
| `lib/gtag.ts` | Consent Mode v2 (update/remove) | CookieProvider, root layout |
| `lib/cookie-consent.ts` | localStorage CRUD | CookieProvider |
| `lib/metadata.ts` | `getAlternates`, `getOgLocale` | Toutes les pages |
| `lib/seo/jsonld.ts` | Generators JSON-LD | Landing pages, FAQ page |
| `lib/logger.ts` | Structured logging | API routes, error boundaries |

### Points positifs

- **`/api/contact`** : securite exemplaire avec 4 couches (rate limiting, Zod validation, honeypot, escapeHtml)
- **`/api/instagram`** : cache ISR avec `next: { revalidate }` et headers Cache-Control explicites
- **`lib/logger.ts`** : logger structure avec format JSON en production et lisible en dev
- **`lib/metadata.ts`** : fonctions utilitaires propres pour canonical, hreflang, og:locale
- **`lib/seo/jsonld.ts`** : centralise les generators JSON-LD, type-safe
- **Tokens server-side** : `INSTAGRAM_ACCESS_TOKEN` et `RESEND_API_KEY` ne sont jamais exposes cote client

### Points d'attention

- **`lib/wordpress.ts` est du dead code** : `wpFetch`, `getPosts`, `getPages` ne sont appeles nulle part dans l'application. Le contenu blog provient de fichiers JSON statiques (`data/posts.json`), pas de l'API WordPress.
- **Rate limiting en memoire** dans `/api/contact` : la `Map` se reset a chaque redemarrage du serveur et n'est pas partagee entre les instances (problematique en serverless / multi-instances). Pour un deploiement Vercel/Coolify, chaque cold start remet les compteurs a zero.
- **L'API Instagram route** est fonctionnelle mais non utilisee (le hook `useInstagramFeed` lit le snapshot JSON)

### Recommandations

1. Supprimer `lib/wordpress.ts` ou le documenter comme module prepare pour une future integration WordPress live
2. Migrer le rate limiting vers une solution persistante (Redis, Upstash, ou un middleware edge) si le formulaire de contact recoit du trafic significatif
3. Clarifier la strategie Instagram : supprimer l'API route si le snapshot statique est definitif, ou implementer un cron de rafraichissement

---

## 9. Patterns (7/10) -- Attention

### Analyse des design patterns utilises

**1. Composition pattern (OK)**
- Les pages sont composees de sections independantes
- Les landing pages utilisent un `SectionRenderer` qui compose dynamiquement les sections

**2. Variants pattern (OK mais lourd)**
- Les composants `*Variants.tsx` encapsulent le theming day/night
- Pattern : `variantStyles[variant]` retourne un objet de classes CSS
- Utilise dans : `HeaderVariants`, `HeroVariants`, `FooterVariants`, `BoatVariants`, `FeaturesVariants`, `OffersVariants`, `TestimonialsVariants`, `CTAVariants`
- Le pattern est coherent mais certains composants sont volumineux (HeaderVariants : 290 lignes)

**3. Wrapper pattern pour pages (OK)**
- Les `page.tsx` sont des wrappers minces qui delegent aux vues
- Permet de garder `generateMetadata` en server component tout en ayant la logique UI en client component

**4. Registry pattern (Excellent)**
- `data/landings/index.ts` : registre central des landing pages
- `getAllLandingSlugs()` et `getLandingData(slug)` fournissent une API propre

**5. Barrel exports (OK)**
- `components/landing/index.ts` : barrel export des 11 composants landing
- `components/cookie-consent/index.ts` : barrel export

**6. Dynamic imports pour code splitting (OK)**
- `Index.tsx` utilise `next/dynamic` pour 10 composants below-the-fold
- `Galerie.tsx` utilise `next/dynamic` avec `ssr: false` pour le lightbox

**7. Pattern anti-spam multi-couche (Excellent)**
- Honeypot + rate limiting + validation Zod + escapeHtml dans `/api/contact`

### Patterns manquants

- **Pas de render props / compound components** : les composants sont principalement des "big components" monolithiques. Des patterns comme compound components (ex: `<Accordion>` + `<AccordionItem>`) sont utilises uniquement via shadcn/ui.
- **Pas de HOC** : pas necessaire dans ce contexte, mais note pour reference.
- **Pas de custom error classes** : les erreurs sont geres via des strings, pas des classes Error typees.
- **Pas de pattern Repository/Service** : les acces donnees sont disperses (inline dans les pages).

### Recommandations

1. Decomposer les composants monolithiques (`HeaderVariants` 290 lignes, `Croisiere` 335 lignes, `FooterVariants` 152 lignes) en sous-composants plus petits
2. Extraire la logique de navigation anchor scroll (dupliquee dans Header et Footer) dans un utilitaire partage
3. Envisager un pattern ErrorBoundary custom avec des classes Error typees pour un meilleur suivi des erreurs

---

## 10. Couplage (6/10) -- Attention

### Analyse des dependances problematiques

**1. Header/Footer dupliques dans chaque vue (Couplage fort)**

C'est le probleme architectural le plus significatif. `HeaderVariants` et `FooterVariants` sont importes individuellement dans **10 fichiers** :

```
HeaderVariants importe dans:
  - views/Index.tsx
  - views/Croisiere.tsx
  - views/Galerie.tsx
  - views/Reservation.tsx
  - views/FAQ.tsx
  - views/Actualites.tsx
  - views/ArticleDetail.tsx
  - views/MentionsLegales.tsx
  - views/CGV.tsx
  - views/Confidentialite.tsx
  + app/[locale]/(landing)/layout.tsx   (layout -- correct)
```

Seul le layout landing `(landing)/layout.tsx` gere correctement le Header/Footer au niveau layout. Toutes les autres pages les importent dans leurs vues.

**Consequence** : pour changer le layout global (ex: ajouter un bandeau d'annonce), il faut modifier 10+ fichiers.

**Solution** : le `[locale]/layout.tsx` devrait inclure le Header/Footer pour les pages principales, comme le fait deja le layout landing.

**2. ThemeVariantContext couple a tous les composants (Couplage modere)**

Presque tous les composants importent `useThemeVariant` pour adapter leur style. Ce n'est pas un anti-pattern en soi (c'est le role d'un contexte theme), mais cela signifie que :
- Aucun composant n'est utilisable hors du `ThemeVariantProvider`
- Les composants landing ne supportent pas le theming (ils n'utilisent pas `useThemeVariant`) -- incoherence

**3. Dependance directe aux fichiers JSON statiques (Couplage rigide)**

Les vues importent directement les fichiers de donnees :
- `ArticleDetail.tsx` importe `data/posts.json` et `data/posts-en.json`
- `Actualites.tsx` importe les memes fichiers
- `Galerie.tsx` importe `data/galleryImages.ts` et utilise `useInstagramFeed`

Si la source de donnees change (ex: migration vers WordPress live), il faudra modifier chaque vue.

**4. `useInstagramFeed` importe un type depuis une API route (Couplage croise)**

```typescript
// hooks/useInstagramFeed.ts
import type { InstagramPost } from '@/app/api/instagram/route';
```

Un hook client importe un type depuis un fichier API route server-side. C'est fonctionnel (TypeScript import type) mais c'est un couplage semantique entre deux couches differentes. Le type devrait etre dans `types/`.

**5. Composants shadcn/ui : dependances internes (Couplage acceptable)**

Certains composants shadcn/ui importent d'autres composants shadcn/ui (`sidebar` importe `button`, `input`, `separator`, `sheet`, `skeleton`, `tooltip`). C'est normal pour shadcn mais complexifie la suppression des composants inutilises.

### Graphe de dependances critique

```
page.tsx (server) --> views/*.tsx ("use client")
                        |
                        +--> HeaderVariants (duplique x10)
                        +--> FooterVariants (duplique x10)
                        +--> useThemeVariant (contexte global)
                        +--> useTranslations (contexte i18n)
                        +--> data/*.json (import direct)
```

### Recommandations

1. **Priorite haute** : Migrer Header/Footer dans le `[locale]/layout.tsx` au lieu de les importer dans chaque vue. Cela necessite de restructurer les vues pour ne plus inclure le layout.
2. **Priorite moyenne** : Creer une couche d'abstraction data (ex: `lib/posts.ts` avec `getPostsByLocale(locale)`) au lieu d'importer les JSON directement dans les vues.
3. **Priorite basse** : Deplacer le type `InstagramPost` dans `types/instagram.ts` et l'importer dans le hook et l'API route.
4. **Priorite basse** : Uniformiser le theming des composants landing pour supporter le mode nuit si necessaire.

---

## Synthese et plan d'action

### Actions prioritaires (impact fort, effort modere)

1. **Migrer Header/Footer dans le layout** : reduirait la duplication de ~20 imports et centraliserait le layout. C'est la plus grande amelioration architecturale possible.
2. **Convertir les vues statiques en server components** : `MentionsLegales`, `CGV`, `Confidentialite`, `NotFound` -- reduirait le bundle JS client sans effort significatif.
3. **Nettoyer les composants shadcn/ui inutilises** : ~39 fichiers a supprimer pour reduire la surface de maintenance.

### Actions secondaires (amelioration qualite)

4. Ajouter `loading.tsx` pour les pages avec chargement asynchrone
5. Creer un hook `useScrollToSection` pour dedupliquer la logique anchor scroll
6. Supprimer le dead code (`lib/wordpress.ts`, `api/instagram/route.ts`, `src/json/`)
7. Internationaliser les donnees landing pages
8. Ajouter un `[locale]/not-found.tsx` bilingue

### Actions a long terme (evolution)

9. Decomposer les composants monolithiques (>200 lignes) en sous-composants
10. Migrer le rate limiting vers une solution persistante (Redis/Upstash)
11. Preparer une couche d'abstraction data pour la future migration WordPress live
12. Ajouter une validation Zod des donnees landing au build time

---

*Rapport genere le 2026-02-14. Perimetre : 25 fichiers App Router, 37 composants, 11 vues, 4 hooks, 7 modules lib, 17 data files landing, 49 composants UI shadcn.*
