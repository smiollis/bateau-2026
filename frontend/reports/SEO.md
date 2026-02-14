# Rapport d'Audit SEO Technique - bateau-a-paris.fr

**Date** : 2026-02-14
**Framework** : Next.js 16.1.6 (App Router)
**Locales** : fr, en, es, it, de, pt-BR (6 langues)
**Pages analysees** : 10 pages statiques + 17 landing pages + articles de blog

---

## Score Global : 8/10

---

## Tableau Recapitulatif

| # | Categorie | Statut | Score |
|---|-----------|--------|-------|
| 1 | Metadata (title, description) | &#9989; | 9/10 |
| 2 | Canonical / Hreflang | &#9989; | 9/10 |
| 3 | JSON-LD (donnees structurees) | &#9989; | 9/10 |
| 4 | Sitemap | &#9989; | 8/10 |
| 5 | robots.txt | &#9989; | 10/10 |
| 6 | Landing Pages SSG | &#9989; | 8/10 |
| 7 | Images SEO (attributs alt) | &#9888;&#65039; | 7/10 |
| 8 | Structure des Headings (h1/h2/h3) | &#9989; | 9/10 |
| 9 | URLs / Slugs | &#9989; | 9/10 |
| 10 | Open Graph / Twitter Cards | &#9888;&#65039; | 6/10 |

---

## 1. Metadata (title, description)

**Score : 9/10** &#9989;

### Constat

Toutes les 10 pages principales possedent un `generateMetadata` avec `title` et `description` traduits via `next-intl` (namespace `meta`). Le root layout (`src/app/layout.tsx`) definit un `title.template` : `"%s | Un Bateau a Paris"` qui s'applique a toutes les sous-pages.

#### Pages principales (10 pages)

| Page | title | description | alternates | og:locale |
|------|-------|-------------|------------|-----------|
| Accueil (`/`) | &#9989; | &#9989; | &#9989; | &#9989; |
| Croisiere (`/croisiere`) | &#9989; | &#9989; | &#9989; | &#9989; |
| Galerie (`/galerie`) | &#9989; | &#9989; | &#9989; | &#9989; |
| FAQ (`/faq`) | &#9989; | &#9989; | &#9989; | &#9989; |
| Actualites (`/actualites`) | &#9989; | &#9989; | &#9989; | &#9989; |
| Article (`/actualites/[slug]`) | &#9989; | &#9989; | &#9989; | &#9989; |
| Reservation (`/reservation`) | &#9989; | &#9989; | &#9989; | &#9989; |
| CGV (`/cgv`) | &#9989; | &#9989; | &#9989; | &#9989; |
| Mentions legales (`/mentions-legales`) | &#9989; | &#9989; | &#9989; | &#9989; |
| Confidentialite (`/confidentialite`) | &#9989; | &#9989; | &#9989; | &#9989; |

#### Landing pages (17 pages)

Toutes les 17 landing pages ont `title`, `description`, `alternates` et `og:locale` via `generateMetadata` dans `src/app/[locale]/(landing)/[slug]/page.tsx`.

#### Traductions

Les 6 locales (fr, en, es, it, de, pt-BR) disposent toutes des cles `meta.*` dans leurs fichiers de messages respectifs (`messages/{locale}.json`).

**Fichiers concernes** :
- `src/app/layout.tsx` (lignes 26-44) -- metadata par defaut + template
- `src/app/[locale]/*/page.tsx` -- chaque page
- `messages/{fr,en,es,it,de,pt-BR}.json` -- traductions

### Points d'attention

- &#9888;&#65039; La page `/test` (`src/app/[locale]/test/page.tsx`) n'a **aucun** `generateMetadata`. C'est une page de debug WordPress, mais elle est accessible en production. Elle devrait etre protegee ou avoir un `noindex`.

### Recommandations

1. Ajouter `export const metadata = { robots: "noindex, nofollow" }` a la page `/test` ou la supprimer en production.
2. Verifier que les descriptions meta respectent la longueur optimale de 150-160 caracteres (certaines descriptions de landing pages sont un peu longues, ~170 caracteres).

---

## 2. Canonical / Hreflang

**Score : 9/10** &#9989;

### Constat

La fonction `getAlternates()` dans `src/lib/metadata.ts` genere automatiquement :
- **Canonical** : `/{locale}{pagePath}` (relatif, resolu par `metadataBase`)
- **Hreflang** : une entree par locale + `x-default` pointant vers `/fr{pagePath}`
- **metadataBase** : `https://bateau-a-paris.fr` (defini dans le root layout)

```typescript
// src/lib/metadata.ts
export function getAlternates(locale: string, pagePath: string = "") {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `/${loc}${pagePath}`;
  }
  languages["x-default"] = `/fr${pagePath}`;
  return { canonical: `/${locale}${pagePath}`, languages };
}
```

**Couverture** : 100% des pages (10 pages + 17 landing pages + articles) utilisent `getAlternates()`.

### Points d'attention

- &#9888;&#65039; Les hreflang sont generes pour les 6 locales (fr, en, es, it, de, pt-BR), mais les landing pages et articles n'ont pas de contenu traduit pour es/it/de/pt-BR. Les URLs hreflang existent mais pointent vers du contenu francais (fallback). C'est techniquement correct (Next.js sert le fallback), mais Google pourrait considerer cela comme du contenu duplique inter-langue.
- &#9888;&#65039; Les canonicals sont relatifs (`/fr/croisiere`), ce qui est correct car `metadataBase` est defini. Next.js genere les URLs absolues automatiquement.

### Recommandations

1. Lorsque le contenu des landing pages sera traduit, verifier que les slugs restent identiques dans toutes les langues (actuellement c'est le cas).
2. Envisager de ne generer les hreflang que pour les locales qui ont reellement du contenu traduit (fr, en pour les articles ; fr uniquement pour les landing pages actuellement).

---

## 3. JSON-LD (Donnees Structurees)

**Score : 9/10** &#9989;

### Constat

7 types de schemas JSON-LD sont implementes :

| Schema | Emplacement | Portee |
|--------|-------------|--------|
| `LocalBusiness` | `src/app/layout.tsx` (lignes 56-86) | Global (toutes pages) |
| `FAQPage` | `src/app/[locale]/faq/page.tsx` (lignes 17-102) | Page FAQ (10 Q&A) |
| `FAQPage` | Landing pages via `generateFAQPageJsonLd()` | Chaque landing avec section FAQ |
| `TouristAttraction` + `Offer` | Landing pages via `generateTouristAttractionJsonLd()` | 17 landing pages |
| `BreadcrumbList` | Landing pages via `generateBreadcrumbJsonLd()` | 17 landing pages |
| `Article` | `src/app/[locale]/actualites/[slug]/page.tsx` (lignes 49-63) | Articles de blog |
| `ItemList` > `TouristTrip` | `src/components/OffersVariants.tsx` (lignes 90-108) | Section tarifs (page accueil) |

**Fichiers de generation** :
- `src/lib/seo/jsonld.ts` -- 3 fonctions generatrices (FAQPage, TouristAttraction, Breadcrumb)

### Points positifs

- Le `LocalBusiness` est complet : nom, adresse, telephone, email, geo, aggregateRating, priceRange.
- Le `TouristAttraction` inclut `aggregateRating`, `offers` avec `priceValidUntil` et `availability`.
- Le `BreadcrumbList` genere correctement les URLs absolues via `SITE_URL`.
- L'`Article` inclut `headline`, `datePublished`, `author`, `publisher`, `image`.

### Points d'attention

- &#9888;&#65039; Le schema `FAQPage` de la page `/faq` est en dur (francais uniquement), pas traduit pour les autres locales. Le contenu JSON-LD reste en francais meme quand on visite `/en/faq`.
- &#9888;&#65039; Le schema `Article` n'inclut pas `dateModified`, recommande par Google.
- &#9888;&#65039; Le `LocalBusiness` n'inclut pas `openingHours`.
- &#9888;&#65039; Le schema `TouristTrip` dans OffersVariants utilise les traductions (via `useTranslations`), ce qui est correct pour le rendu client, mais en tant que composant client (`"use client"`), le JSON-LD est genere cote client. Google peut l'indexer mais le SSR serait preferable.

### Recommandations

1. Internationaliser le schema `FAQPage` de la page FAQ (utiliser les traductions `next-intl`).
2. Ajouter `dateModified` au schema `Article`.
3. Ajouter `openingHours` au `LocalBusiness` (ex: `"Mo-Su 09:00-22:00"`).
4. Envisager de deplacer le JSON-LD des offres (`TouristTrip`) dans un Server Component pour un rendu SSR.

---

## 4. Sitemap

**Score : 8/10** &#9989;

### Constat

Le sitemap est genere dynamiquement via `src/app/sitemap.ts` et couvre :

- **9 pages statiques** x 6 locales = **54 entrees**
- **Articles de blog** (depuis `posts.json`) x 6 locales
- **17 landing pages** (depuis `getAllLandingSlugs()`) x 6 locales

```
Total estime : ~54 + (~10 articles x 6) + (17 x 6) = ~216 URLs
```

### Points positifs

- Priorites differenciees : accueil (1.0), pages principales (0.8), landings (0.7), articles (0.6).
- `changeFrequency` adapte : "weekly" pour l'accueil, "monthly" pour le reste.
- `lastModified` : `new Date()` pour les pages statiques, `post.date` pour les articles.
- Le sitemap est reference dans `robots.ts`.

### Points d'attention

- &#9888;&#65039; Les articles EN (`posts-en.json`) ne sont PAS inclus dans le sitemap. Seuls les slugs de `posts.json` (FR) sont utilises. Si les articles EN ont des slugs differents, les URLs EN ne seront pas dans le sitemap.
- &#9888;&#65039; `lastModified: new Date()` pour les pages statiques et landing pages signifie que la date change a chaque build. Ce n'est pas la vraie date de modification. Google peut ignorer cette valeur.
- &#9888;&#65039; Les landing pages sont generees pour les 6 locales, mais le contenu n'est disponible qu'en francais. Cela peut creer des entrees sitemap pour des pages non traduites.

### Recommandations

1. Utiliser une date fixe ou la date du dernier commit pour `lastModified` des pages statiques.
2. Verifier que les articles EN partagent les memes slugs que les articles FR (actuellement c'est le cas d'apres `posts-en.json`).
3. Limiter les entrees sitemap des landing pages aux locales ayant reellement du contenu traduit.

---

## 5. robots.txt

**Score : 10/10** &#9989;

### Constat

Le fichier `src/app/robots.ts` est parfaitement configure :

```typescript
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL;
  const isProduction = siteUrl === PRODUCTION_URL;

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${PRODUCTION_URL}/sitemap.xml`,
  };
}
```

### Points positifs

- Environnement de staging/dev automatiquement protege (`disallow: /`).
- Header `X-Robots-Tag: noindex, nofollow` en complement dans `next.config.ts` pour les environnements non-production.
- Reference au sitemap en production.

### Recommandations

Aucune -- implementation exemplaire.

---

## 6. Landing Pages SSG

**Score : 8/10** &#9989;

### Constat

**17 landing pages** sont implementees en SSG via la route dynamique `src/app/[locale]/(landing)/[slug]/page.tsx` :

#### Tier 1 (6 pages)
| Slug | Title | ogImage | FAQ |
|------|-------|---------|-----|
| `evjf-seine` | &#9989; | &#9989; | &#9989; (5 Q&A) |
| `evg-seine` | &#9989; | &#9989; | &#9989; |
| `croisiere-romantique-seine` | &#9989; | &#9989; | &#9989; |
| `demande-en-mariage-seine` | &#9989; | &#9989; | &#9989; |
| `anniversaire-seine` | &#9989; | &#9989; | &#9989; |
| `soiree-entre-amis-seine` | &#9989; | &#9989; | &#9989; |

#### Tier 2 (6 pages)
| Slug | Title | ogImage | FAQ |
|------|-------|---------|-----|
| `anniversaire-mariage-seine` | &#9989; | &#10060; | &#9989; |
| `team-building-seine` | &#9989; | &#10060; | &#9989; |
| `croisiere-famille-seine` | &#9989; | &#10060; | &#9989; |
| `shooting-photo-seine` | &#9989; | &#10060; | &#9989; |
| `coucher-soleil-seine` | &#9989; | &#10060; | &#9989; |
| `apero-bateau-seine` | &#9989; | &#10060; | &#9989; |

#### Tier 3 (5 pages)
| Slug | Title | ogImage | FAQ |
|------|-------|---------|-----|
| `saint-valentin-seine` | &#9989; | &#10060; | &#9989; |
| `nouvel-an-seine` | &#9989; | &#10060; | &#9989; |
| `noel-seine` | &#9989; | &#10060; | &#9989; |
| `fete-des-meres-seine` | &#9989; | &#10060; | &#9989; |
| `seminaire-seine` | &#9989; | &#10060; | &#9989; |

### Points positifs

- `generateStaticParams()` genere correctement tous les slugs pour le SSG.
- Chaque landing page a 2-3 schemas JSON-LD (TouristAttraction, BreadcrumbList, FAQPage).
- Fil d'Ariane visuel + schema BreadcrumbList.
- Structure coherente : Hero > Breadcrumb > Sections > CTA > Related > StickyBar.
- Sections modulaires via `SectionRenderer`.

### Points d'attention

- &#10060; **ogImage manquant** : 11 landing pages sur 17 n'ont pas de `ogImage` defini. Seules les 6 pages Tier 1 en ont un.
- &#10060; **Images OG physiques absentes** : le repertoire `public/images/landings/` est **vide**. Meme les 6 ogImage references dans les pages Tier 1 (ex: `/images/landings/evjf-seine-og.jpg`) **n'existent pas physiquement**. Cela genere des 404 pour les partages sociaux.
- &#9888;&#65039; Le contenu des landing pages est uniquement en francais. Les variantes multilingues ne sont pas encore implementees.
- &#9888;&#65039; Le composant `LandingRichtext` utilise `dangerouslySetInnerHTML` sans DOMPurify sur les contenus landing. C'est moins critique que pour le contenu WordPress (contenu statique dans les fichiers .ts), mais a surveiller si le contenu devient dynamique.

### Recommandations

1. **CRITIQUE** : Creer les images OG pour les 17 landing pages et les placer dans `public/images/landings/`. Dimensions recommandees : 1200x630px.
2. Ajouter `ogImage` aux 11 landing pages Tier 2 et 3 manquantes.
3. Planifier la traduction du contenu des landing pages pour les locales prioritaires (en, es).

---

## 7. Images SEO (attributs alt)

**Score : 7/10** &#9888;&#65039;

### Constat

L'ensemble du projet utilise `next/image` sauf 2 exceptions. Tous les composants Image ont des attributs `alt` significatifs.

### Inventaire des images

| Composant | Type | alt | Notes |
|-----------|------|-----|-------|
| `LandingHero` | `next/image` | &#9989; `{title}` | Alt dynamique = titre de la page |
| `LandingGallery` | `next/image` | &#9989; `{img.alt}` | Alt defini dans les donnees |
| `LandingRelated` | `next/image` | &#9989; `{page.hero.title}` | |
| `LandingTestimonials` | `next/image` | &#9989; `{review.name}` | |
| `OffersVariants` | `next/image` | &#9989; `{offer.title}` | |
| `HeaderVariants` | `next/image` | &#9989; `"Un Bateau a Paris"` | Logo |
| `Croisiere` (carte) | `next/image` | &#9989; | Descriptif |
| `Croisiere` (landmarks) | `motion.img` | &#9989; `{landmark.name}` | Utilise `<img>` natif via motion |
| `Croisiere` (metro) | `<img>` | &#9989; `"Metro Bastille"` | **Exception** : `<img>` natif |
| `BoatImageSlideshow` | `next/image` | &#9989; `{images[current].alt}` | |
| `HeroCinemaSlideshow` | `next/image` | &#9989; `{heroImages[current].alt}` | |
| `GalleryPreview` | `next/image` | &#9989; `{img.alt}` | |
| `Actualites` | `next/image` | &#9989; `{post.title}` | |
| `ArticleDetail` | `next/image` | &#9989; `{post.title}` | |
| `CaptainSection` | `next/image` | &#9989; `"Capitaine Michel"` | |
| `Boat` | `next/image` | &#9989; Descriptif | |
| `CTAVariants` | `next/image` | &#9989; `"Seine au coucher du soleil"` | |
| `ContactForm` | -- | -- | Pas d'images |

### Points d'attention

- &#9888;&#65039; **2 usages de `<img>` natif** dans `src/views/Croisiere.tsx` :
  - Ligne 196 : `motion.img` pour les landmarks de la carte interactive (justifie par l'animation Framer Motion sur des SVG/petites icones).
  - Ligne 246 : `<img>` pour l'icone metro (petite icone de 6x6).
- &#9888;&#65039; Le composant `LandingHero` utilise `alt={title}` ce qui est un bon fallback mais pas toujours optimal (le titre h1 et l'alt de l'image hero sont identiques, ce qui est redondant pour les lecteurs d'ecran).
- &#9888;&#65039; Pas d'alt vide (`alt=""`) trouve nulle part, ce qui est bien.

### Recommandations

1. Remplacer `<img>` par `next/image` dans `Croisiere.tsx` pour l'icone metro (meme si l'impact SEO est minime pour une icone de 6px).
2. Differencier les alt des images hero de landing pages du titre h1 (ex: "Groupe EVJF celebrant sur le pont du Senang avec la Tour Eiffel" au lieu de "Enterrement de vie de jeune fille sur la Seine").
3. Verifier que les images des galeries de landing pages ont des alt descriptifs et uniques (actuellement c'est le cas, ex: "Groupe de femmes celebrant un EVJF sur la Seine").

---

## 8. Structure des Headings (h1/h2/h3)

**Score : 9/10** &#9989;

### Constat

La hierarchie des headings est globalement correcte sur toutes les pages.

#### Pages principales

| Page | h1 | h2 | h3 | Correct |
|------|----|----|----|---------|
| Accueil | &#9989; (HeroVariants) | &#9989; (Features, Boat, Offers, Gallery, Testimonials, CTA, Contact) | &#9989; (sous-sections) | &#9989; |
| Croisiere | &#9989; | &#9989; (Carte, Timeline, CTA) | &#9989; (landmarks, etapes) | &#9989; |
| Galerie | &#9989; | &#9989; (Instagram) | -- | &#9989; |
| FAQ | &#9989; | -- | -- | &#9989; |
| Actualites | &#9989; | &#9989; (Instagram) | -- | &#9989; |
| Article | &#9989; | &#9989; (Related) | -- | &#9989; |
| Reservation | &#9989; | -- | -- | &#9989; |
| CGV | &#9989; | &#9989; (sections) | -- | &#9989; |
| Mentions legales | &#9989; | &#9989; (sections) | -- | &#9989; |
| Confidentialite | &#9989; | &#9989; (sections) | -- | &#9989; |

#### Landing pages

| Element | Tag | Correct |
|---------|-----|---------|
| Hero title | `<h1>` | &#9989; |
| Section Richtext title | `<h2>` | &#9989; |
| Section Benefits title | `<h2>` | &#9989; |
| Benefits items | `<h3>` | &#9989; |
| Section Gallery title | `<h2>` | &#9989; |
| Section Testimonials title | `<h2>` | &#9989; |
| Section Pricing title | `<h2>` | &#9989; |
| Pricing formulas | `<h3>` | &#9989; |
| Section FAQ title | `<h2>` | &#9989; |
| CTA title | `<h2>` | &#9989; |

### Points positifs

- Chaque page a exactement **un seul `<h1>`**.
- La hierarchie h1 > h2 > h3 est respectee sans saut de niveau.
- Les headings sont semantiquement pertinents et contiennent des mots-cles.

### Points d'attention

- &#9888;&#65039; La page 404 (`src/app/not-found.tsx`) utilise un `<h1>` avec juste "404". C'est acceptable mais pourrait etre plus descriptif.
- &#9888;&#65039; Le contenu HTML des articles WordPress (dans `posts.json`) contient ses propres `<h2>` et `<h3>` qui sont injectes via `dangerouslySetInnerHTML`. La hierarchie depend du contenu WordPress source.

### Recommandations

1. Modifier le h1 de la page 404 pour inclure un texte plus descriptif (ex: "Page non trouvee").
2. Auditer les `<h2>`/`<h3>` dans le contenu WordPress des articles pour verifier la coherence hierarchique.

---

## 9. URLs / Slugs

**Score : 9/10** &#9989;

### Constat

#### Structure des URLs

```
/{locale}                          -> Accueil
/{locale}/croisiere                -> Croisiere
/{locale}/galerie                  -> Galerie
/{locale}/faq                      -> FAQ
/{locale}/actualites               -> Blog
/{locale}/actualites/{slug}        -> Article
/{locale}/reservation              -> Reservation
/{locale}/cgv                      -> CGV
/{locale}/mentions-legales         -> Mentions legales
/{locale}/confidentialite          -> Confidentialite
/{locale}/{slug}                   -> Landing pages (17)
```

#### Slugs des landing pages

Tous les slugs suivent une convention coherente : `{theme}-seine` (ex: `evjf-seine`, `croisiere-romantique-seine`, `team-building-seine`). Les slugs sont :
- Entierement en minuscules
- Separes par des tirets
- Sans caracteres speciaux ni accents
- Descriptifs et contenant des mots-cles SEO

#### Redirections

Trois redirections 301 sont configurees dans `next.config.ts` :
- `/f_a_q` -> `/faq`
- `/c_g_v` -> `/cgv`
- `/mentions_legales` -> `/mentions-legales`

### Points positifs

- Pas de trailing slash incoherent (Next.js gere cela nativement, `trailingSlash` n'est pas active dans la config).
- Les URLs sont propres, courtes et descriptives.
- Les anciennes URLs WordPress sont redirigees en 301.

### Points d'attention

- &#9888;&#65039; La page `/test` est accessible publiquement. Elle devrait etre supprimee ou protegee en production.
- &#9888;&#65039; Les landing pages utilisent la route `/{locale}/{slug}` au meme niveau que les pages principales. Un conflit potentiel pourrait survenir si un slug de landing page correspond a un slug de page principale (ex: si quelqu'un cree une landing `faq-seine`, le routing pourrait etre ambigu). Le route group `(landing)` protege contre cela cote Next.js, mais c'est a surveiller.

### Recommandations

1. Supprimer ou proteger la page `/test` en production.
2. Documenter la convention de nommage des slugs pour eviter les conflits futurs.
3. Envisager d'ajouter des redirections pour les anciennes URLs WordPress des articles (ex: `/croisiere-a-paris-2pers-6pers/` -> `/fr/actualites/croisiere-a-paris-2pers-6pers`).

---

## 10. Open Graph / Twitter Cards

**Score : 6/10** &#9888;&#65039;

### Constat

#### Configuration globale (root layout)

```typescript
// src/app/layout.tsx
openGraph: {
  type: "website",
  siteName: "Un Bateau a Paris",
  images: [{ url: "/images/hero/bateau-a-paris-seine-01.jpg", width: 1200, height: 630 }],
},
twitter: {
  card: "summary_large_image",
},
```

#### Par page

| Page | og:locale | og:title | og:description | og:image | twitter:card |
|------|-----------|----------|----------------|----------|--------------|
| Toutes les pages | &#9989; (via `getOgLocale`) | &#9989; (herite du title) | &#9989; (herite) | &#9888;&#65039; | &#9989; (global) |
| Articles | &#9989; | &#9989; (explicite) | &#9989; (explicite) | &#9989; (image article) | &#9989; |
| Landing Tier 1 | &#9989; | &#9989; (explicite) | &#9989; (explicite) | &#9888;&#65039; (defini mais fichier absent) | &#9989; |
| Landing Tier 2-3 | &#9989; | &#9989; (explicite) | &#9989; (explicite) | &#10060; (non defini) | &#9989; |

### Points critiques

1. **&#10060; Image OG par defaut inexistante** : Le fichier `/images/hero/bateau-a-paris-seine-01.jpg` reference dans le root layout **n'existe pas** dans `public/images/hero/`. Les fichiers presents sont des `.webp` et un autre `.jpg` avec un nom different. Cela signifie que **toutes les pages sans og:image specifique** (accueil, croisiere, galerie, FAQ, actualites, reservation, CGV, mentions legales, confidentialite) servent un og:image **404**.

2. **&#10060; Images OG des landing pages Tier 1 inexistantes** : Le repertoire `public/images/landings/` est **vide**. Les 6 fichiers references (ex: `evjf-seine-og.jpg`, `romantique-seine-og.jpg`, etc.) **n'existent pas**.

3. **&#10060; 11 landing pages sans og:image** : Les pages Tier 2 et 3 n'ont pas de champ `ogImage` dans leurs donnees. Elles heritent de l'image OG par defaut (qui est elle-meme absente).

4. &#9888;&#65039; Pas de `og:type` specifique par page (toutes heritent de `"website"` sauf les articles qui ne definissent pas `og:type: "article"`).

5. &#9888;&#65039; Pas de `twitter:title` ni `twitter:description` explicites -- ils heritent de Open Graph. C'est correct selon la spec Twitter, mais explicitement les definir est une bonne pratique.

### Points positifs

- `og:locale` est dynamiquement genere pour les 6 locales via `getOgLocale()`.
- `og:site_name` est defini globalement.
- `twitter:card` est configure en `"summary_large_image"`.
- Les articles ont un `og:image` specifique (l'image de l'article).
- Les articles definissent explicitement `og:title` et `og:description`.

### Recommandations

1. **CRITIQUE** : Creer le fichier `/images/hero/bateau-a-paris-seine-01.jpg` (1200x630px) ou corriger le chemin dans le root layout vers un fichier existant.
2. **CRITIQUE** : Creer les 6 images OG pour les landing pages Tier 1 dans `public/images/landings/`.
3. Ajouter des `ogImage` et creer les fichiers pour les 11 landing pages Tier 2 et 3.
4. Ajouter `og:type: "article"` dans le `generateMetadata` des articles.
5. Envisager d'ajouter `twitter:site` et `twitter:creator` si le compte Twitter existe.

---

## Synthese des Actions Prioritaires

### Critiques (impact SEO immediat)

| # | Action | Fichiers concernes | Impact |
|---|--------|--------------------|--------|
| 1 | Creer l'image OG par defaut (`/images/hero/bateau-a-paris-seine-01.jpg`, 1200x630px) ou corriger le chemin | `src/app/layout.tsx`, `public/images/hero/` | Partages sociaux casses sur toutes les pages |
| 2 | Creer les 6 images OG des landing pages Tier 1 | `public/images/landings/` | Partages sociaux casses sur les landing pages |
| 3 | Supprimer ou proteger la page `/test` en production | `src/app/[locale]/test/page.tsx` | Page indexable sans interet |

### Importantes (ameliorations SEO)

| # | Action | Fichiers concernes |
|---|--------|--------------------|
| 4 | Ajouter `ogImage` aux 11 landing pages Tier 2-3 et creer les fichiers | `src/data/landings/*.ts`, `public/images/landings/` |
| 5 | Internationaliser le JSON-LD FAQPage de `/faq` | `src/app/[locale]/faq/page.tsx` |
| 6 | Ajouter `dateModified` au schema Article | `src/app/[locale]/actualites/[slug]/page.tsx` |
| 7 | Utiliser des dates `lastModified` realistes dans le sitemap | `src/app/sitemap.ts` |
| 8 | Ajouter `og:type: "article"` aux pages d'articles | `src/app/[locale]/actualites/[slug]/page.tsx` |

### Optionnelles (bonnes pratiques)

| # | Action | Fichiers concernes |
|---|--------|--------------------|
| 9 | Diversifier les alt des images hero de landing pages | `src/data/landings/*.ts` |
| 10 | Ajouter `openingHours` au LocalBusiness | `src/app/layout.tsx` |
| 11 | Ajouter `twitter:site` / `twitter:creator` | `src/app/layout.tsx` |
| 12 | Migrer `<img>` vers `next/image` dans Croisiere.tsx | `src/views/Croisiere.tsx` |
| 13 | Limiter les hreflang aux locales avec contenu traduit | `src/lib/metadata.ts` |
| 14 | Ajouter des redirections anciennes URLs WordPress | `next.config.ts` |

---

## Conclusion

Le site **bateau-a-paris.fr** possede une **infrastructure SEO technique solide** avec une couverture quasi-complete des fondamentaux : metadata traduite sur toutes les pages, canonical + hreflang systematiques, 7 types de schemas JSON-LD, sitemap dynamique multi-locale, et une structure de headings exemplaire.

Le point faible principal est l'**absence physique des images Open Graph** (image par defaut et images des landing pages), ce qui casse les previews lors des partages sur les reseaux sociaux. C'est le correctif le plus urgent a apporter.

Les 17 landing pages SSG sont bien structurees avec un contenu riche en mots-cles et des schemas JSON-LD multiples (TouristAttraction, BreadcrumbList, FAQPage). L'extension multilingue (Phase 9) est en cours mais les fondations i18n sont bien posees.

**Score global : 8/10** -- potentiellement 9.5/10 apres correction des images OG et des points importants.
