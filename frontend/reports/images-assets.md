# Audit Images & Assets - bateau-a-paris.fr

**Date** : 2026-02-14
**Projet** : Un Bateau a Paris - Frontend Next.js 16
**Auditeur** : Claude Opus 4.6

---

## Score global : 7/10

---

## Tableau recapitulatif

| # | Categorie | Statut | Note |
|---|-----------|--------|------|
| 1 | next/image | :warning: | 3 composants utilisent `<img>` ou `motion.img` au lieu de `next/image` |
| 2 | Static imports | :white_check_mark: | Imports statiques correctement utilises avec `.src` |
| 3 | Attributs (width/height/alt) | :warning: | alt toujours present ; width/height manquants sur CaptainSection |
| 4 | Formats d'images | :warning: | Mix JPG/PNG/WebP ; pas d'AVIF en source ; 2 images > 500 KB |
| 5 | Tailles des fichiers | :warning: | 5 fichiers > 500 KB, 2 fichiers > 1 MB |
| 6 | Priority (above-the-fold) | :warning: | Header logo et landing hero OK, mais hero slideshow sans priority |
| 7 | Lazy loading | :white_check_mark: | Comportement par defaut de next/image respecte |
| 8 | Placeholder blur | :x: | Aucun usage de `placeholder="blur"` / `blurDataURL` |
| 9 | SVG | :white_check_mark: | SVG geres correctement via static import + `.src` |
| 10 | Favicon / OG images | :warning: | Favicon present ; OG image globale pointe vers un fichier inexistant ; pas d'apple-touch-icon |

---

## 1. next/image

### Constat

18 fichiers importent et utilisent `next/image` correctement. Cependant, **3 composants** utilisent des balises `<img>` ou `motion.img` natives au lieu du composant `Image` de Next.js :

| Fichier | Ligne | Type | Contexte |
|---------|-------|------|----------|
| `src/components/HeroCinemaSlideshow.tsx` | 70 | `motion.img` | Slideshow hero avec Ken Burns (above-the-fold) |
| `src/components/BoatImageSlideshow.tsx` | 43 | `motion.img` | Slideshow bateau avec AnimatePresence |
| `src/views/Croisiere.tsx` | 246 | `<img>` | Icone metro (petite image 1.7 KB) |
| `src/views/Croisiere.tsx` | 196 | `motion.img` | Icones landmarks SVG sur la carte |

### Analyse

- **HeroCinemaSlideshow** : C'est le cas le plus impactant. Ce composant affiche les images hero above-the-fold avec `motion.img`. Il utilise `loading="eager"` et un preload manuel via `<link rel="preload">`, mais ne beneficie pas de l'optimisation automatique de `next/image` (redimensionnement, conversion AVIF/WebP, srcset responsive).
- **BoatImageSlideshow** : Utilise `motion.img` pour les transitions AnimatePresence. Les images JPG statiques (87-146 KB) sont servies sans optimisation.
- **Croisiere landmarks** : Les icones SVG sont rendues via `motion.img` pour les animations hover. Usage acceptable vu la petite taille des SVG et le besoin d'animation Framer Motion.
- **Croisiere metro** : Petite icone PNG (1.7 KB) avec `<img>` directe, impact minime.

### Recommandations

1. **HeroCinemaSlideshow** : Remplacer `motion.img` par un wrapper `motion.div` contenant un `<Image>` de Next.js avec `fill`, `priority` (pour la premiere image), et `sizes="100vw"`. Utiliser les callbacks `onLoad` pour gerer les transitions.
2. **BoatImageSlideshow** : Meme approche avec `motion.div` + `<Image>` pour beneficier de la conversion AVIF automatique.
3. **Croisiere landmarks/metro** : Impact negligeable, conserver en l'etat ou encapsuler dans un `motion.div` si souhaite.

---

## 2. Static imports

### Constat

Les imports statiques sont utilises correctement dans tout le projet :

```typescript
// Correct : import d'image statique
import capitaineMichel from "@/assets/capitaine-michel.jpg";
import logo from "@/assets/logo.png";
import fond2 from "@/assets/map/fond2.webp";

// Correct : utilisation avec .src pour les balises <img>
icon: liberte.src  // SVG via .src
<img src={metroIconImport.src} ... />

// Correct : conversion explicite pour compatibilite
const formuleImage = typeof formulePremiumImg === 'string' ? formulePremiumImg : formulePremiumImg.src;
```

### Fichiers utilisant des static imports

| Fichier | Images importees |
|---------|-----------------|
| `src/components/HeaderVariants.tsx` | `logo.png` |
| `src/components/CaptainSection.tsx` | `capitaine-michel.jpg` |
| `src/components/OffersVariants.tsx` | `formule-premium.jpg` |
| `src/components/BoatImageSlideshow.tsx` | `bateau-1.jpg`, `bateau-2.jpg`, `bateau-3.jpg`, `bateau-4.jpg` |
| `src/views/Croisiere.tsx` | `fond2.webp`, `metro.png`, 8 SVG landmarks |

Pas de probleme detecte.

---

## 3. Attributs (width / height / alt)

### alt

**Tous les composants fournissent un attribut `alt`** significatif et descriptif. Exemples :

- `alt="Capitaine Michel"` (CaptainSection)
- `alt="Un Bateau a Paris"` (Header logo)
- `alt="Carte de l'itineraire de la croisiere sur la Seine"` (Croisiere map)
- `alt={post.title}` (articles dynamiques)
- `alt={post.caption?.slice(0, 100) ?? 'Instagram post'}` (Instagram avec fallback)

### width / height

| Composant | Methode | Statut |
|-----------|---------|--------|
| HeaderVariants (logo) | Static import (auto) | :white_check_mark: |
| CaptainSection | Static import mais **ni `width` ni `height` explicites, ni `fill`** | :warning: |
| Testimonials / TestimonialsVariants | `width={64} height={64}` | :white_check_mark: |
| LandingTestimonials | `width={40} height={40}` | :white_check_mark: |
| Galerie (masonry) | `width={img.width} height={img.height}` | :white_check_mark: |
| Tous les composants avec `fill` | `fill` + `sizes` | :white_check_mark: |

### Probleme

- **CaptainSection** : L'image `capitaineMichel` est importee statiquement (ce qui fournit `width`/`height` au build), mais le composant ne passe ni `width`/`height` explicites ni `fill`. Next.js utilise les dimensions du static import, ce qui fonctionne, mais les dimensions affichees (56x56 a 72x72 avec CSS) sont tres differentes de l'image source (probablement ~500px+). Ajouter `width` et `height` explicites ou `fill` + `sizes` serait plus clair et optimiserait le rendu.

### Recommandation

- Ajouter `width={288} height={288}` (taille d'affichage max lg:w-72) sur `CaptainSection` pour que Next.js serve une image correctement dimensionnee.

---

## 4. Formats d'images

### Configuration Next.js

```typescript
// next.config.ts
images: {
  formats: ["image/avif", "image/webp"],
}
```

La configuration est correcte : Next.js convertira automatiquement en AVIF puis WebP les images servies via le composant `<Image>`. Cela ne s'applique **pas** aux images servies via `<img>` ou `motion.img`.

### Inventaire des formats sources

| Format | Nombre | Localisation |
|--------|--------|-------------|
| JPG/JPEG | 34 | `src/assets/` (7), `public/images/posts/` (21), `public/images/gallery/` (2), `public/images/hero/` (1), `public/images/instagram/` (4) |
| WebP | 25 | `src/assets/map/` (1), `public/images/gallery/` (13), `public/images/hero/` (3), `public/images/posts/` (6), `public/images/instagram/` (2) |
| PNG | 5 | `src/assets/` (3), `src/assets/map/` (2) |
| SVG | 17 | `src/assets/map/` (9), `public/` (8) |
| AVIF | 0 | - |
| ICO | 1 | `public/favicon.ico` |

### Analyse

- **Bonne pratique** : La majorite des images de galerie et hero sont en WebP.
- **A ameliorer** : Les images de `public/images/posts/` sont majoritairement en JPG (21 fichiers).
- **Pas d'AVIF en source** : Ce n'est pas bloquant car `next/image` convertit automatiquement, mais les images servies via `<img>` (HeroCinemaSlideshow, BoatImageSlideshow) ne beneficient pas de cette conversion.
- **PNG lourds** : `logo-white.png` (1.1 MB), `Tournage-Exceptionnel-avec-Un-Bateau-a-Paris.png` (1023 KB) sont excessivement lourds.

### Recommandations

1. Convertir `formule-premium.jpg` (1.3 MB) en WebP (gain estime ~70%)
2. Convertir `logo-white.png` (1.1 MB) en WebP ou SVG
3. Convertir `Tournage-Exceptionnel-avec-Un-Bateau-a-Paris.png` (1023 KB) en WebP
4. Convertir les JPG de `public/images/posts/` en WebP pour les navigateurs qui ne supportent pas l'optimisation Next.js (RSS, partages sociaux)

---

## 5. Tailles des fichiers

### Images > 500 KB (seuil d'alerte)

| Fichier | Taille | Recommandation |
|---------|--------|----------------|
| `src/assets/formule-premium.jpg` | **1.3 MB** | Convertir en WebP, redimensionner a 1200px max |
| `src/assets/logo-white.png` | **1.1 MB** | Convertir en WebP ou SVG |
| `public/images/posts/Tournage-Exceptionnel-avec-Un-Bateau-a-Paris.png` | **1023 KB** | Convertir en WebP |
| `public/images/instagram/18138859669410859.jpg` | **968 KB** | Redimensionner/compresser |
| `public/images/instagram/18094813591577867.jpg` | **560 KB** | Redimensionner/compresser |

### Images entre 200-500 KB

| Fichier | Taille |
|---------|--------|
| `public/images/instagram/17856071466453449.jpg` | 493 KB |
| `public/images/instagram/18053884745420109.jpg` | 336 KB |
| `public/images/instagram/18138635584400075.jpg` | 324 KB |
| `public/images/gallery/2025-04-08-a-22.20.42_88a4983b.webp` | 243 KB |
| `public/images/posts/Un_Bateau_a_Paris_Seine_River_27_May_2017-scaled-e1706540015604.jpg` | 228 KB |
| `public/images/posts/dalle-bateaux-mouches-seine.webp` | 215 KB |
| `public/images/posts/pont-louis-philippe-paris.jpg` | 207 KB |
| `public/images/posts/dalle-ceremonie-jo-paris-seine.webp` | 206 KB |

### Recapitulatif

| Categorie | Nombre |
|-----------|--------|
| > 1 MB | 2 fichiers |
| 500 KB - 1 MB | 3 fichiers |
| 200 KB - 500 KB | 8 fichiers |
| < 200 KB | Reste (~55 fichiers) |

### Recommandations

1. **Priorite haute** : Compresser/convertir les 5 fichiers > 500 KB en WebP avec une largeur max de 1200-1600px
2. **Priorite moyenne** : Compresser les images Instagram (proviennent du cache API, idealement les re-telechager en taille reduite)
3. **Bonne pratique** : `src/assets/logo-white.jpg` (49 KB) et `src/assets/logo-white.png` (1.1 MB) semblent etre le meme logo en 2 formats - supprimer `logo-white.png` si non utilise (aucune reference trouvee dans le code)

### Fichiers potentiellement inutilises

| Fichier | Taille | Reference dans le code |
|---------|--------|----------------------|
| `src/assets/logo-white.png` | 1.1 MB | Aucune import trouvee |
| `src/assets/logo-white.jpg` | 49 KB | Aucune import trouvee |
| `src/assets/map/carte-fond.png` | 62 KB | Aucune import trouvee (remplace par `fond2.webp`) |
| `public/file.svg` | 391 B | Fichier par defaut Next.js, inutilise |
| `public/next.svg` | 1.4 KB | Fichier par defaut Next.js, inutilise |
| `public/globe.svg` | 1.1 KB | Fichier par defaut Next.js, inutilise |
| `public/vercel.svg` | 128 B | Fichier par defaut Next.js, inutilise |
| `public/window.svg` | 385 B | Fichier par defaut Next.js, inutilise |

---

## 6. Priority (above-the-fold)

### Images avec `priority={true}`

| Composant | Image | Statut |
|-----------|-------|--------|
| `HeaderVariants.tsx` | Logo | :white_check_mark: `priority` |
| `LandingHero.tsx` | Image hero landing pages | :white_check_mark: `priority` |
| `ArticleDetail.tsx` | Image hero article | :white_check_mark: `priority` |

### Images above-the-fold SANS priority

| Composant | Image | Impact |
|-----------|-------|--------|
| `HeroCinemaSlideshow.tsx` | Hero principal (page d'accueil) | :x: **Impact eleve** - Utilise `motion.img` avec preload manuel, ne beneficie pas de `priority` de Next.js |
| `BoatImageSlideshow.tsx` | Images du bateau | :warning: Impact moyen si visible above-the-fold |

### Analyse

Le hero principal de la page d'accueil (`HeroCinemaSlideshow`) est le cas le plus critique. Il utilise un preload manuel (`<link rel="preload">` avec `fetchpriority="high"`) ce qui est une bonne mitigation, mais il ne beneficie pas du pipeline d'optimisation complet de `next/image`.

### Recommandation

Migrer `HeroCinemaSlideshow` vers `next/image` avec `priority` sur la premiere image pour beneficier du LCP optimal.

---

## 7. Lazy loading

### Constat

Next.js `<Image>` applique automatiquement `loading="lazy"` sauf quand `priority` est defini. Ce comportement est correctement exploite dans le projet :

- Les images de galerie, articles, offres, temoignages sont toutes below-the-fold et beneficient du lazy loading par defaut.
- Seuls les 3 composants avec `priority` chargent en eager.
- `HeroCinemaSlideshow` a `loading="eager"` explicite (correct pour du above-the-fold).

**Aucun probleme detecte.**

---

## 8. Placeholder blur

### Constat

**Aucune utilisation de `placeholder="blur"` ou `blurDataURL` dans tout le projet.**

Recherche effectuee :
- `placeholder="blur"` : 0 occurrence
- `blurDataURL` : 0 occurrence

### Impact

Sans placeholder blur, les images affichent un espace vide pendant le chargement, ce qui degrade l'experience utilisateur (CLS potentiel) et la perception de vitesse.

### Recommandations

1. **Images statiques** (`src/assets/`) : Ajouter `placeholder="blur"` directement. Next.js genere automatiquement le blur hash pour les imports statiques.

```tsx
// Avant
<Image src={capitaineMichel} alt="Capitaine Michel" ... />

// Apres
<Image src={capitaineMichel} alt="Capitaine Michel" placeholder="blur" ... />
```

Composants concernes :
- `CaptainSection.tsx` (capitaine-michel.jpg)
- `HeaderVariants.tsx` (logo.png)
- `Croisiere.tsx` (fond2.webp)

2. **Images dynamiques** (`/images/gallery/`, `/images/posts/`, URLs externes) : Generer des `blurDataURL` au build time avec un outil comme `plaiceholder` ou stocker un hash base64 dans les donnees.

```tsx
<Image
  src={post.image}
  alt={post.title}
  fill
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

3. **Images Unsplash** : Utiliser le parametre `&blur=20&w=10` d'Unsplash pour generer un placeholder inline.

---

## 9. SVG

### Constat

Les SVG sont geres de maniere appropriee :

| Methode | Fichiers | Usage |
|---------|----------|-------|
| Static import + `.src` | 9 SVG map (`trocadero.svg`, `tour-eiffel.svg`, etc.) | Icones landmarks dans `Croisiere.tsx`, rendus via `motion.img` pour les animations |
| Fichiers dans `public/` | 8 SVG (`placeholder.svg`, `hero-seine.svg`, etc.) | Assets statiques |

### Analyse

- Les SVG de carte sont importes via Next.js static import et utilises comme `src` dans des balises `motion.img`. C'est acceptable pour des SVG decoratifs avec animation.
- Aucun SVG n'est inline (React component), ce qui est correct pour ces usages (pas besoin de manipulation CSS des paths).
- Les SVG du dossier `public/` incluent des fichiers par defaut de Next.js (`file.svg`, `next.svg`, `globe.svg`, `vercel.svg`, `window.svg`) qui devraient etre supprimes.

### Recommandation

Supprimer les SVG inutilises de `public/` (fichiers par defaut Next.js).

---

## 10. Favicon / OG images

### Favicon

| Element | Statut | Detail |
|---------|--------|--------|
| `favicon.ico` | :white_check_mark: | Present dans `src/app/favicon.ico` (20 KB, multi-resolution ICO) |
| `apple-touch-icon` | :x: | **Absent** - Pas d'apple-touch-icon pour iOS |
| `icon.png` / `icon.svg` | :x: | **Absent** - Pas de favicon moderne (Next.js App Router icon convention) |
| `manifest.json` / `site.webmanifest` | :x: | **Absent** - Pas de web app manifest |

### OG images

| Element | Statut | Detail |
|---------|--------|--------|
| OG image globale | :x: | **FICHIER MANQUANT** - Reference `"/images/hero/bateau-a-paris-seine-01.jpg"` dans `layout.tsx` mais ce fichier n'existe pas dans `public/images/hero/` |
| OG locale | :white_check_mark: | `getOgLocale(locale)` utilise sur toutes les pages |
| Landing pages OG | :warning: | 6 landing pages declarent des `ogImage` (`/images/landings/...`) mais le dossier `public/images/landings/` est **vide** |
| Twitter card | :white_check_mark: | `summary_large_image` configure |

### Detail des OG images manquantes

```
# Declare dans layout.tsx mais n'existe pas :
/images/hero/bateau-a-paris-seine-01.jpg

# Declares dans les landing pages mais n'existent pas :
/images/landings/anniversaire-seine-og.jpg
/images/landings/romantique-seine-og.jpg
/images/landings/entre-amis-seine-og.jpg
/images/landings/evjf-seine-og.jpg
/images/landings/demande-mariage-og.jpg
/images/landings/evg-seine-og.jpg
```

### Recommandations

1. **Critique** : Creer l'image OG globale `/public/images/hero/bateau-a-paris-seine-01.jpg` (1200x630px) ou corriger le chemin dans `layout.tsx` pour pointer vers une image existante.
2. **Critique** : Creer les 6 images OG pour les landing pages ou supprimer les references `ogImage` dans les donnees.
3. **Important** : Ajouter un `apple-touch-icon.png` (180x180px) dans `public/` ou via la convention `src/app/apple-icon.png`.
4. **Important** : Ajouter un `site.webmanifest` avec les icones pour l'installation PWA et les signets.
5. **Optionnel** : Ajouter un `src/app/icon.svg` pour le favicon moderne (vecteur, s'adapte au theme).

---

## Images externes (Unsplash)

### Constat

Plusieurs composants utilisent des images Unsplash directement via URL :

| Composant | Nombre d'images | Via |
|-----------|----------------|-----|
| `CallToAction.tsx` | 1 | `next/image` |
| `CTAVariants.tsx` | 1 | `next/image` |
| `Boat.tsx` | 1 | `next/image` |
| `Offers.tsx` | 4 | `next/image` |
| `OffersVariants.tsx` | 3 | `next/image` |

### Analyse

- Les images Unsplash sont correctement configurees dans `remotePatterns` de `next.config.ts`.
- Elles sont servies via `next/image` (sauf dans les slideshows), donc beneficient de l'optimisation automatique.
- **Risque** : Dependance a un service externe. Si Unsplash est indisponible ou change ses URLs, les images disparaitront.

### Recommandation

Telecharger les images Unsplash en local dans `public/images/` pour supprimer la dependance externe et ameliorer le temps de chargement initial (pas de DNS lookup supplementaire).

---

## Cache des images

### Constat

Configuration de cache correcte dans `next.config.ts` :

```typescript
{
  source: "/images/:path*",
  headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
},
```

Les images statiques dans `public/images/` beneficient d'un cache d'un an. Bonne pratique.

---

## Plan d'actions prioritise

### Priorite 1 - Critique (impact SEO/UX)

| Action | Impact | Effort |
|--------|--------|--------|
| Creer ou corriger l'image OG globale (`bateau-a-paris-seine-01.jpg`) | SEO/partage social | Faible |
| Creer les 6 images OG des landing pages | SEO/partage social | Moyen |
| Migrer `HeroCinemaSlideshow` vers `next/image` | LCP, performance | Moyen |

### Priorite 2 - Important (performance)

| Action | Impact | Effort |
|--------|--------|--------|
| Ajouter `placeholder="blur"` sur les images statiques (3 composants) | UX, CLS | Faible |
| Compresser `formule-premium.jpg` (1.3 MB -> ~200 KB en WebP) | Performance | Faible |
| Supprimer `logo-white.png` (1.1 MB) si inutilise | Taille du repo | Faible |
| Ajouter `apple-touch-icon` et web manifest | PWA, mobile | Faible |

### Priorite 3 - Amelioration (optimisation fine)

| Action | Impact | Effort |
|--------|--------|--------|
| Migrer `BoatImageSlideshow` vers `next/image` | Performance | Moyen |
| Convertir les JPG de `public/images/posts/` en WebP | Performance | Faible |
| Compresser les images Instagram > 500 KB | Performance | Faible |
| Telecharger les images Unsplash en local | Fiabilite, performance | Moyen |
| Supprimer les fichiers SVG par defaut de Next.js dans `public/` | Proprete | Faible |
| Supprimer `carte-fond.png` (remplacement par `fond2.webp`) | Proprete | Faible |
| Generer des `blurDataURL` pour les images dynamiques | UX | Moyen |

---

## Annexe : Inventaire complet des fichiers images

### src/assets/ (10 fichiers, ~2.9 MB)

| Fichier | Taille | Format | Utilise |
|---------|--------|--------|---------|
| `formule-premium.jpg` | 1.3 MB | JPG | Oui (OffersVariants) |
| `logo-white.png` | 1.1 MB | PNG | **Non** |
| `bateau-1.jpg` | 146 KB | JPG | Oui (BoatImageSlideshow) |
| `bateau-2.jpg` | 111 KB | JPG | Oui (BoatImageSlideshow) |
| `bateau-4.jpg` | 104 KB | JPG | Oui (BoatImageSlideshow) |
| `bateau-3.jpg` | 87 KB | JPG | Oui (BoatImageSlideshow) |
| `capitaine-michel.jpg` | 69 KB | JPG | Oui (CaptainSection) |
| `logo-white.jpg` | 49 KB | JPG | **Non** |
| `logo.png` | 4.4 KB | PNG | Oui (HeaderVariants) |

### src/assets/map/ (11 fichiers, ~204 KB)

| Fichier | Taille | Format | Utilise |
|---------|--------|--------|---------|
| `fond2.webp` | 64 KB | WebP | Oui (Croisiere) |
| `carte-fond.png` | 62 KB | PNG | **Non** |
| `liberte.svg` | 13 KB | SVG | Oui |
| `hotel-de-ville.svg` | 9 KB | SVG | Oui |
| `notre-dame.svg` | 7.5 KB | SVG | Oui |
| `trocadero.svg` | 6.4 KB | SVG | Oui |
| `tour-eiffel.svg` | 5.7 KB | SVG | Oui |
| `invalides.svg` | 4.4 KB | SVG | Oui |
| `assemblee.svg` | 3.6 KB | SVG | Oui |
| `louvre.svg` | 3.6 KB | SVG | Oui |
| `orsay.svg` | 3.6 KB | SVG | Oui |
| `metro.png` | 1.7 KB | PNG | Oui |

### public/images/gallery/ (15 fichiers, ~2 MB)

Toutes utilisees dans `galleryImages.ts`. 13 WebP + 2 JPG. Tailles entre 56-243 KB.

### public/images/hero/ (4 fichiers, ~692 KB)

Utilisees dans `HeroCinemaSlideshow.tsx`. 3 WebP + 1 JPG. Tailles entre 161-179 KB.

### public/images/posts/ (31 fichiers, ~4.4 MB)

Utilisees comme images d'articles de blog. Mix JPG/WebP/PNG/JPEG.

### public/images/instagram/ (12 fichiers, ~4 MB dont MP4)

Cache des posts Instagram. 4 JPG + 2 WebP + 5 MP4 + 1 JPG. Fichier le plus lourd : 968 KB.

### public/ racine (9 fichiers)

| Fichier | Taille | Utilise |
|---------|--------|---------|
| `favicon.ico` | 20 KB | Oui |
| `placeholder.svg` | 3.2 KB | A verifier |
| `hero-seine-photo.svg` | 961 B | A verifier |
| `next.svg` | 1.4 KB | **Non** (defaut Next.js) |
| `globe.svg` | 1.1 KB | **Non** (defaut Next.js) |
| `hero-seine.svg` | 640 B | A verifier |
| `file.svg` | 391 B | **Non** (defaut Next.js) |
| `window.svg` | 385 B | **Non** (defaut Next.js) |
| `vercel.svg` | 128 B | **Non** (defaut Next.js) |
