# Rapport d'Audit Accessibilite WCAG 2.1 AA

**Projet** : Un Bateau a Paris — bateau-a-paris.fr
**Date** : 2026-02-14
**Referentiel** : WCAG 2.1 niveau AA
**Perimetre** : Frontend Next.js (`/work/projects/MICHEL/bateau-2026/frontend/`)

---

## Score Global : 7.5 / 10

Le site presente une bonne base d'accessibilite avec des fondamentaux bien implementes (semantique HTML, skip link, labels de formulaire, alt sur les images, tests axe-core). Cependant, plusieurs points critiques necessitent une attention : l'absence de gestion de `prefers-reduced-motion` pour les 165+ animations Framer Motion, un focus trap manquant sur le bandeau cookie, et des regles axe-core desactivees (`color-contrast`, `link-name`, `button-name`) qui masquent des problemes reels.

---

## Tableau Recapitulatif

| # | Categorie | Statut | Score |
|---|-----------|--------|-------|
| 1 | Semantique HTML | OK | 9/10 |
| 2 | Attributs ARIA | OK | 8/10 |
| 3 | Images (alt) | OK avec reserves | 7/10 |
| 4 | Formulaires | OK | 8.5/10 |
| 5 | Navigation clavier | Partiel | 7/10 |
| 6 | Contrastes | Problemes identifies | 6/10 |
| 7 | Focus visible | Partiel | 7/10 |
| 8 | Animations (reduced-motion) | Non conforme | 4/10 |
| 9 | Tests axe-core | OK avec reserves | 7/10 |
| 10 | Cookie banner | Partiel | 6.5/10 |

---

## 1. Semantique HTML

**Statut : OK (9/10)**

### Points positifs

- **`<header>`** : present dans `Header.tsx`, `HeaderVariants.tsx` et `Footer.tsx` / `FooterVariants.tsx`
- **`<nav>`** : present dans `HeaderVariants.tsx` (ligne 112) avec `aria-label={t("mainNav")}`
- **`<main id="main">`** : present dans toutes les vues principales :
  - `src/views/Index.tsx` (ligne 22)
  - `src/views/Galerie.tsx` (ligne 39)
  - `src/views/FAQ.tsx` (ligne 74)
  - `src/views/Reservation.tsx` (ligne 91)
  - `src/views/Actualites.tsx` (ligne 56)
  - `src/views/ArticleDetail.tsx` (ligne 42)
  - `src/views/CGV.tsx`, `src/views/Confidentialite.tsx`, `src/views/MentionsLegales.tsx`
- **`<footer>`** : present dans `Footer.tsx` (ligne 4) et `FooterVariants.tsx` (ligne 81)
- **`<section>`** : utilise systematiquement avec des `id` semantiques (`#croisiere`, `#bateau`, `#galerie`, `#tarifs`, `#contact`, `#temoignages`)
- **`<article>`** : utilise dans `ArticleDetail.tsx` (ligne 61) pour le contenu blog
- **`<h1>` a `<h4>`** : hierarchie respectee dans toutes les pages
- **`lang` dynamique** : attribut `lang={locale}` sur `<html>` dans `src/app/layout.tsx` (ligne 53)

### Points a ameliorer

- **Landing pages** : le layout `src/app/[locale]/(landing)/layout.tsx` utilise une `<div>` englobante sans `<main>`. Le contenu des landing pages n'est pas enveloppe dans un element `<main>`.

### Fichiers concernes

```
src/app/layout.tsx
src/app/[locale]/layout.tsx
src/app/[locale]/(landing)/layout.tsx
src/views/Index.tsx
src/components/HeaderVariants.tsx
src/components/FooterVariants.tsx
```

### Recommandation

- Ajouter un `<main id="main">` dans le layout des landing pages (`src/app/[locale]/(landing)/layout.tsx`) :
  ```tsx
  <div className="min-h-screen bg-background">
    <HeaderVariants />
    <main id="main">{children}</main>
    <FooterVariants />
  </div>
  ```

---

## 2. Attributs ARIA

**Statut : OK (8/10)**

### Points positifs

- **Navigation principale** : `aria-label={t("mainNav")}` sur le `<nav>` dans `HeaderVariants.tsx` (ligne 112)
- **Menu mobile** : `aria-expanded`, `aria-controls="mobile-nav"`, `aria-label={t("toggleMenu")}` dans `HeaderVariants.tsx` (lignes 213-215)
- **Selecteur de langue** : `aria-expanded`, `aria-haspopup="listbox"`, `role="listbox"`, `role="option"`, `aria-selected` dans `HeaderVariants.tsx` (lignes 143-167)
- **Toggle jour/nuit** : `aria-label` dynamique dans `HeaderVariants.tsx` (ligne 197)
- **Cookie modal** : `role="dialog"`, `aria-modal="true"`, `aria-labelledby="cookie-modal-title"` dans `CookieModal.tsx` (lignes 87-89)
- **Bouton fermeture modal** : `aria-label={t("close")}` dans `CookieModal.tsx` (ligne 99)
- **Carousel temoignages** : `aria-label` sur les boutons precedent/suivant et les dots dans `TestimonialsVariants.tsx` (lignes 92, 100, 148)
- **Slideshow bateau** : `aria-label` sur les dots indicateurs dans `BoatImageSlideshow.tsx` (ligne 65)
- **Honeypot antispam** : `aria-hidden="true"` dans `ContactForm.tsx` (ligne 119)
- **Reseaux sociaux** : `aria-label="Instagram"` et `aria-label="Facebook"` dans `FooterVariants.tsx` (lignes 90, 93)
- **Sticky bar landing** : `aria-label="Appeler"` dans `LandingStickyBar.tsx` (ligne 25)

### Points a ameliorer

- **Galerie** : les images cliquables dans `Galerie.tsx` (ligne 66-85) utilisent `onClick` sur un `<motion.div>` sans `role="button"` ni `aria-label`. Elles ne sont pas focusables au clavier.
- **Carte interactive** : les landmarks dans `Croisiere.tsx` (ligne 186-231) utilisent `onClick` sur des `<motion.div>` sans role ni focus clavier. Les tooltips ne sont pas accessibles aux lecteurs d'ecran.
- **Filtre categories** : les boutons de filtre dans `Actualites.tsx` (lignes 84-99) n'ont pas d'`aria-pressed` pour indiquer l'etat actif.

### Fichiers concernes

```
src/components/HeaderVariants.tsx
src/components/CookieModal.tsx
src/components/TestimonialsVariants.tsx
src/components/FooterVariants.tsx
src/components/ContactForm.tsx
src/views/Galerie.tsx
src/views/Croisiere.tsx
src/views/Actualites.tsx
```

### Recommandations

1. Ajouter `role="button"`, `tabIndex={0}`, `onKeyDown` (Enter/Space) et `aria-label` sur les images cliquables de la galerie
2. Ajouter `role="button"`, `tabIndex={0}` et `aria-label` sur les landmarks de la carte interactive
3. Ajouter `aria-pressed={activeCategory === cat}` sur les boutons de filtre des actualites

---

## 3. Images (alt)

**Statut : OK avec reserves (7/10)**

### Points positifs

- **Toutes les images `next/image`** ont un attribut `alt` descriptif :
  - Logo : `alt="Un Bateau a Paris"` (`HeaderVariants.tsx`, ligne 117)
  - Hero slideshow : alts descriptifs comme "Le Senang naviguant sous les ponts de Paris" (`HeroCinemaSlideshow.tsx`, lignes 9-22)
  - Bateau slideshow : alts descriptifs (`BoatImageSlideshow.tsx`, lignes 12-16)
  - Capitaine : `alt="Capitaine Michel"` (`CaptainSection.tsx`, ligne 43)
  - CTA : `alt="Seine au coucher du soleil"` (`CTAVariants.tsx`, ligne 33)
  - Galerie : attribut `alt` issu de `galleryImages` data (`GalleryPreview.tsx`, ligne 61)
  - Offres : `alt={offer.title}` (`OffersVariants.tsx`, ligne 148)
  - Temoignages : `alt={testimonials[currentIndex].name}` (`TestimonialsVariants.tsx`, ligne 117)
  - Articles : `alt={post.title}` (`ArticleDetail.tsx`, ligne 52)
  - Landing hero : `alt={title}` (`LandingHero.tsx`, ligne 19)
  - Instagram : `alt={post.caption?.slice(0, 100) ?? 'Instagram post'}` (`Galerie.tsx`, ligne 140)
- **Emoji cookie** : `aria-hidden="true"` (`CookieBanner.tsx`, ligne 35)
- **Carte croisiere** : `alt` descriptif sur la carte et les icones de monuments (`Croisiere.tsx`, lignes 180, 198, 246)

### Points a ameliorer

- **`HeroCinemaSlideshow.tsx`** : utilise `<motion.img>` au lieu de `next/image` (conflit avec Framer Motion Ken Burns). L'`alt` est present mais ce n'est pas un composant `Image` optimise.
- **`BoatImageSlideshow.tsx`** : meme probleme, utilise `<motion.img>` (ligne 43-46)
- **`Croisiere.tsx` ligne 246** : utilise `<img>` HTML natif au lieu de `next/image` pour l'icone metro. L'alt est present (`alt="Metro Bastille"`).
- **Landmark icons** dans `Croisiere.tsx` : utilise `<motion.img>` (ligne 196-201) -- necessaire pour les animations.
- **Images offres Unsplash** : les `alt` sont generiques (`alt={offer.title}`) — ils pourraient etre plus descriptifs du contenu visuel.
- **Images decoratives** : les overlays/gradients n'ont pas `aria-hidden="true"` (impact faible).

### Fichiers concernes

```
src/components/HeroCinemaSlideshow.tsx
src/components/BoatImageSlideshow.tsx
src/components/GalleryPreview.tsx
src/components/OffersVariants.tsx
src/components/CaptainSection.tsx
src/components/CTAVariants.tsx
src/views/Croisiere.tsx
src/views/Galerie.tsx
```

### Recommandations

1. Pour l'icone metro dans `Croisiere.tsx` (ligne 246), migrer vers `next/image` si possible
2. Enrichir les `alt` des images d'offres pour decrire le contenu visuel plutot que juste le titre
3. Les `<motion.img>` pour les slideshows sont acceptables tant que les `alt` sont presents (compromis animation)

---

## 4. Formulaires

**Statut : OK (8.5/10)**

### Points positifs

Le composant `ContactForm.tsx` est tres bien implemente :

- **Labels explicites** : chaque champ a un `<label htmlFor>` associe a un `id` unique :
  - `contact-name` (ligne 123-126)
  - `contact-email` (ligne 135-138)
  - `contact-phone` (ligne 150-152)
  - `contact-message` (ligne 163-166)
- **`aria-required="true"`** : sur les champs obligatoires (name, email, message) (lignes 131, 144, 171)
- **Honeypot antispam** : `tabIndex={-1}`, `aria-hidden="true"`, `className="absolute opacity-0 h-0 w-0 -z-10"` (lignes 111-120)
- **Types HTML corrects** : `type="email"`, `type="tel"` pour la validation native
- **`maxLength`** : sur tous les champs pour eviter les abus
- **Messages d'erreur** : via le systeme de toast (`useToast`) pour les erreurs de validation, serveur et rate limiting
- **Bouton submit** : `disabled={sending}` pendant l'envoi avec texte changeant ("Envoyer" -> "Envoi en cours...")
- **Iframe Bookly** : attribut `title` present dans `Reservation.tsx` (ligne 157)

### Points a ameliorer

- **Messages d'erreur inline** : pas de messages d'erreur inline sous chaque champ -- les erreurs sont uniquement via toast. Pour les lecteurs d'ecran, un `aria-describedby` pointant vers un message d'erreur inline serait preferable (WCAG 3.3.1).
- **`aria-invalid`** : attribut absent sur les champs en erreur
- **Toast** : le composant toast n'utilise pas `role="alert"` ou `aria-live="assertive"` de maniere explicite (verifier la lib shadcn)

### Fichiers concernes

```
src/components/ContactForm.tsx
src/views/Reservation.tsx
```

### Recommandations

1. Ajouter des messages d'erreur inline sous chaque champ obligatoire avec `aria-describedby`
2. Ajouter `aria-invalid="true"` sur les champs en erreur
3. Verifier que le composant toast shadcn utilise bien `role="alert"` ou `aria-live`

---

## 5. Navigation clavier

**Statut : Partiel (7/10)**

### Points positifs

- **Skip link** : parfaitement implemente dans `HeaderVariants.tsx` (lignes 105-110) :
  ```tsx
  <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded">
    {t("skipToContent")}
  </a>
  ```
  Ce lien est invisible par defaut (`sr-only`) et devient visible au focus. Il pointe vers `#main` present dans toutes les vues.
- **Navigation principale** : les liens sont des `<button>` et `<Link>` natifs, focusables par defaut
- **Menu mobile** : `aria-expanded` et `aria-controls` presents, le menu utilise des `<button>` focusables
- **FAQ Accordion** : utilise les composants Radix UI (`AccordionTrigger`/`AccordionContent`) qui gerent nativement le clavier (Enter/Space pour ouvrir/fermer, fleches pour naviguer)
- **Honeypot** : correctement exclu du tab order (`tabIndex={-1}`)
- **Scroll smooth** : `scroll-behavior: smooth` dans `globals.css` et `scroll-margin-top: 5rem` sur les elements avec `[id]`

### Points a ameliorer

- **Images galerie** : les `<motion.div>` cliquables dans `Galerie.tsx` (lignes 66-85) n'ont ni `tabIndex={0}` ni handler clavier -- impossibles a activer au clavier
- **Carte interactive** : les landmarks dans `Croisiere.tsx` ne sont pas focusables au clavier (meme probleme, `<motion.div>` avec `onClick` sans `tabIndex`)
- **Gallery dots** : dans `BoatImageSlideshow.tsx`, les boutons dots sont des `<button>` (OK) mais la galerie auto-scroll dans `GalleryPreview.tsx` n'a pas de controle pause au clavier
- **Selecteur de langue mobile** : les boutons de langue dans le menu mobile sont des `<button>` (OK), mais il n'y a pas de gestion Escape pour fermer le dropdown desktop
- **Lightbox** : `GalleryLightbox.tsx` utilise `yet-another-react-lightbox` -- verifier que la lib gere correctement les touches Escape, fleches et tab

### Fichiers concernes

```
src/components/HeaderVariants.tsx
src/components/GalleryPreview.tsx
src/components/BoatImageSlideshow.tsx
src/views/Galerie.tsx
src/views/Croisiere.tsx
```

### Recommandations

1. **Galerie** : ajouter `tabIndex={0}`, `role="button"`, `aria-label` et handler `onKeyDown` (Enter/Space) sur les images cliquables
2. **Carte interactive** : ajouter `tabIndex={0}` et gestion clavier sur les landmarks
3. **Dropdown langue** : ajouter fermeture sur Escape et gestion des fleches haut/bas pour le dropdown desktop
4. **Gallery auto-scroll** : ajouter un bouton pause/play ou s'assurer que `hover:animation-play-state:paused` a un equivalent clavier

---

## 6. Contrastes

**Statut : Problemes identifies (6/10)**

### Analyse des couleurs

#### Mode Classic (jour)

| Element | Couleur texte | Fond | Ratio estime | Conforme AA |
|---------|--------------|------|--------------|-------------|
| Texte principal | `hsl(220 13% 26%)` (#3a3f47) | `hsl(210 33% 99%)` (#fcfcfd) | ~11.2:1 | Oui |
| Primary (navy) | `hsl(224 64% 33%)` (#1e3a7b) | blanc | ~8.8:1 | Oui |
| Accent (gold) sur blanc | `hsl(43 65% 52%)` (#d4a636) | blanc | ~2.8:1 | **NON** |
| `text-foreground/80` | opacity 80% sur #3a3f47 | blanc | ~7.5:1 | Oui |
| `text-foreground/70` | opacity 70% sur #3a3f47 | blanc | ~5.6:1 | Oui |
| `text-muted-foreground` | `hsl(220 9% 46%)` (#6b7280) | blanc | ~4.6:1 | Limite |
| `text-primary-foreground/70` | blanc 70% | navy | ~5.4:1 | Oui |
| `text-primary-foreground/60` | blanc 60% | navy | ~3.8:1 | **NON** |

#### Mode Nuit

| Element | Couleur texte | Fond | Ratio estime | Conforme AA |
|---------|--------------|------|--------------|-------------|
| `text-blue-100` | #dbeafe | `#0a1628` | ~12.5:1 | Oui |
| `text-blue-200/70` | #bfdbfe 70% | `#0a1628` | ~7.2:1 | Oui |
| `text-blue-200/60` | #bfdbfe 60% | `#0a1628` | ~5.4:1 | Oui |
| `text-blue-300/40` | #93c5fd 40% | `#060f1e` | ~2.8:1 | **NON** |
| `text-accent` (gold) | `#d4a636` | `#0a1628` | ~5.5:1 | Oui |
| `text-blue-100/80` | #dbeafe 80% | `#0a1628` | ~9.2:1 | Oui |

### Problemes critiques

1. **Gold sur blanc** (~2.8:1) : la couleur accent gold `hsl(43 65% 52%)` n'atteint pas le ratio 4.5:1 requis quand utilisee comme couleur de texte sur fond blanc. Concerne les liens de la page de confidentialite/CGV, et certains badges.
2. **Copyright footer classic** : `text-primary-foreground/60` (blanc 60%) sur fond navy a ~3.8:1
3. **Copyright footer nuit** : `text-blue-300/40` sur `#060f1e` a ~2.8:1
4. **Bouton gold (.btn-gold)** : le texte blanc sur gradient gold est a verifier -- le gold fonce `hsl(43 65% 40%)` (#996d1a) donne un ratio ~4.3:1 avec le blanc, tout juste insuffisant.
5. **Tests axe-core** : la regle `color-contrast` est **desactivee** dans les tests E2E (`accessibility.spec.ts`, ligne 5), ce qui masque ces problemes.

### Fichiers concernes

```
src/app/globals.css (variables de couleur)
src/components/FooterVariants.tsx (copyright)
src/components/CookieBanner.tsx
src/views/FAQ.tsx
```

### Recommandations

1. **Assombrir le gold** pour le texte : passer a `hsl(43 65% 38%)` (#8f6717) pour atteindre 4.5:1 sur blanc
2. **Augmenter l'opacite du copyright** : passer `text-primary-foreground/60` a `/70` minimum dans le footer classic
3. **Augmenter l'opacite du copyright nuit** : passer `text-blue-300/40` a `/60` minimum
4. **Reactiver la regle `color-contrast`** dans les tests axe-core et corriger les violations
5. Utiliser un outil comme [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) pour valider chaque combinaison

---

## 7. Focus visible

**Statut : Partiel (7/10)**

### Points positifs

Les composants shadcn/ui ont des styles de focus bien implementes :

- **`button.tsx`** : `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- **`input.tsx`** : `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- **`textarea.tsx`** : meme style de focus ring
- **`checkbox.tsx`**, **`radio-group.tsx`**, **`switch.tsx`** : focus ring present
- **`tabs.tsx`**, **`toggle.tsx`**, **`slider.tsx`** : focus ring present
- **`select.tsx`** : `focus:ring-2 focus:ring-ring focus:ring-offset-2`
- **Skip link** : style de focus bien visible avec `focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded`

### Points a ameliorer

- **Boutons custom** : les `<button>` utilises directement dans `HeaderVariants.tsx` (liens de navigation, lignes 126-132), `FooterVariants.tsx` (cookie settings, ligne 135), `CookieBanner.tsx`, `CookieModal.tsx`, `Actualites.tsx` (filtres) n'ont **pas de style focus-visible explicite**. Ils dependent du style par defaut du navigateur (outline), qui peut etre invisible sur certains fonds.
- **`.btn-gold`** dans `globals.css` : ce style custom ne definit **aucun** style de focus. Les boutons utilisant cette classe n'ont pas de ring de focus visible.
- **Liens du footer** : les `<a>` et `<Link>` dans `FooterVariants.tsx` n'ont pas de style focus visible
- **Carte interactive** : les landmarks ne sont pas focusables (cf. section 5)
- **Liens de navigation ancres** : les `<button>` de navigation dans `HeaderVariants.tsx` n'ont pas de outline focus visible

### Fichiers concernes

```
src/app/globals.css (.btn-gold)
src/components/HeaderVariants.tsx
src/components/FooterVariants.tsx
src/components/CookieBanner.tsx
src/components/CookieModal.tsx
src/views/Actualites.tsx
```

### Recommandations

1. Ajouter un style focus-visible a `.btn-gold` dans `globals.css` :
   ```css
   .btn-gold:focus-visible {
     outline: 2px solid hsl(var(--ring));
     outline-offset: 2px;
   }
   ```
2. Ajouter `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` sur les `<button>` custom du header, footer et cookie banner
3. Definir un style global de focus visible pour les elements interactifs sans classe shadcn

---

## 8. Animations (prefers-reduced-motion)

**Statut : Non conforme (4/10)**

### Constat critique

Le projet utilise massivement **Framer Motion** (165+ occurrences de `motion.div`, `motion.img`, `motion.a` dans 38 fichiers) mais **aucune** gestion de `prefers-reduced-motion` n'est implementee.

La recherche de `prefers-reduced-motion` dans tout le code source retourne **0 resultat**.

### Animations impactees

| Composant | Type d'animation | Impact |
|-----------|-----------------|--------|
| `HeroCinemaSlideshow.tsx` | Ken Burns (zoom + pan) toutes les 6s | **Eleve** -- peut declencher des nausees |
| `BoatImageSlideshow.tsx` | Fondu enchaine toutes les 5s | Moyen |
| `HeroVariants.tsx` | Scroll indicator bouncing infini | Moyen |
| `GalleryPreview.tsx` | Defilement horizontal infini CSS | Moyen |
| `TestimonialsVariants.tsx` | Slide lateral au changement | Faible |
| Tous les composants | `whileInView` fade-in + translate | Faible |
| `CookieBanner.tsx` | Spring animation entree/sortie | Faible |
| `CookieModal.tsx` | Scale + fade animation | Faible |

### Critere WCAG concerne

**WCAG 2.3.3** (AAA) et **WCAG 2.3.1** (A) : les animations automatiques qui durent plus de 5 secondes doivent pouvoir etre mises en pause, arretees ou masquees. Le Ken Burns et le gallery scroll sont des animations infinies sans controle utilisateur.

### Fichiers concernes

```
src/components/HeroCinemaSlideshow.tsx
src/components/BoatImageSlideshow.tsx
src/components/HeroVariants.tsx
src/components/GalleryPreview.tsx
src/components/FeaturesVariants.tsx
src/components/BoatVariants.tsx
src/components/OffersVariants.tsx
src/components/TestimonialsVariants.tsx
src/components/CTAVariants.tsx
src/components/ContactForm.tsx
src/components/CaptainSection.tsx
src/components/OccasionsGrid.tsx
src/components/CookieBanner.tsx
src/components/CookieModal.tsx
src/views/Croisiere.tsx
src/views/FAQ.tsx
src/views/Galerie.tsx
src/views/Actualites.tsx
src/views/ArticleDetail.tsx
```

### Recommandations

1. **Priorite haute** : creer un hook `useReducedMotion` :
   ```tsx
   import { useReducedMotion } from "framer-motion";

   // Framer Motion fournit ce hook nativement
   const prefersReduced = useReducedMotion();
   ```
2. **Pour les slideshows automatiques** : desactiver le timer auto quand `prefersReduced === true` :
   ```tsx
   useEffect(() => {
     if (prefersReduced) return;
     const timer = setInterval(advance, INTERVAL);
     return () => clearInterval(timer);
   }, [advance, prefersReduced]);
   ```
3. **Pour les animations whileInView** : utiliser des variantes sans mouvement :
   ```tsx
   const variants = prefersReduced
     ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
     : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
   ```
4. **Pour le CSS gallery scroll** : ajouter dans `globals.css` :
   ```css
   @media (prefers-reduced-motion: reduce) {
     .animate-gallery-scroll {
       animation: none !important;
     }
     .card-hover:hover {
       transform: none !important;
     }
     .btn-gold:hover {
       transform: none !important;
     }
   }
   ```

---

## 9. Tests axe-core

**Statut : OK avec reserves (7/10)**

### Points positifs

- **3 tests E2E** avec axe-core dans `e2e/accessibility.spec.ts` :
  1. Page d'accueil (violations critiques/serieuses)
  2. Section contact (violations critiques/serieuses)
  3. Page galerie (violations critiques/serieuses)
- **Tags WCAG** : filtrage correct sur `["wcag2a", "wcag2aa"]`
- **Gestion du cookie banner** : le banner est dismiss avant les tests (bonne pratique)
- **Filtrage par severite** : seules les violations `critical` et `serious` font echouer les tests (bonne pratique)

### Points a ameliorer

- **Regles desactivees** (ligne 5) :
  ```ts
  const disabledRules = ["color-contrast", "link-name", "button-name"];
  ```
  Ces 3 regles sont fondamentales pour l'accessibilite :
  - `color-contrast` : masque les problemes de contraste documentes en section 6
  - `link-name` : masque les liens sans texte accessible (icones sans label)
  - `button-name` : masque les boutons sans texte accessible

  Le commentaire indique "Known a11y issues to fix separately (pre-existing in imported Lovable components)", ce qui suggere des problemes reels non corriges.

- **Couverture** : seules 3 pages sont testees. Les pages FAQ, Croisiere, Reservation, landing pages, articles et pages legales ne sont pas testees avec axe-core.
- **Pas de test specifique** sur le cookie banner/modal (focus trap, navigation clavier)

### Fichiers concernes

```
e2e/accessibility.spec.ts
e2e/cookie-consent.spec.ts
```

### Recommandations

1. **Reactiver progressivement les regles desactivees** : corriger les violations puis retirer les regles de la liste `disabledRules`
2. **Etendre la couverture** : ajouter des tests axe-core pour :
   - Page FAQ (`/faq`)
   - Page croisiere (`/croisiere`)
   - Page reservation (`/reservation`)
   - Au moins une landing page (ex: `/evjf-seine`)
   - Page article detail
3. **Ajouter un test** de focus trap sur le cookie modal
4. **Ajouter un test** de navigation clavier complete (tab through, skip link, focus visible)

---

## 10. Cookie Banner

**Statut : Partiel (6.5/10)**

### Points positifs

- **Modal cookie** : `role="dialog"`, `aria-modal="true"`, `aria-labelledby="cookie-modal-title"` dans `CookieModal.tsx` (lignes 87-89)
- **Bouton fermeture** : `aria-label={t("close")}` (ligne 99)
- **Titre** : `id="cookie-modal-title"` correctement lie via `aria-labelledby`
- **Switches** : composants Radix UI Switch avec gestion clavier native
- **Backdrop click** : ferme la modal en cliquant a l'exterieur
- **Tests E2E** : 4 tests dans `e2e/cookie-consent.spec.ts` couvrant affichage, acceptation, personnalisation et refus

### Points a ameliorer

- **Pas de focus trap** : quand le cookie modal est ouvert (`CookieModal.tsx`), le focus n'est **pas** piege dans la modal. L'utilisateur peut tabber vers des elements sous le backdrop, ce qui est une violation de WCAG 2.4.3 (Focus Order).
- **Pas de gestion Escape** : la modal ne se ferme pas avec la touche Escape (gestion clavier manquante)
- **Pas de restoration du focus** : quand la modal se ferme, le focus ne retourne pas au bouton qui l'a ouverte
- **Banner sans role** : le bandeau cookie dans `CookieBanner.tsx` n'a pas de `role="region"` ou `role="alertdialog"` pour signaler sa presence aux lecteurs d'ecran
- **Pas d'`aria-label`** sur les boutons du banner : les boutons "Personnaliser" et "Tout accepter" n'ont pas d'`aria-label` explicite (le texte visible suffit generalement, mais le contexte cookie n'est pas explicite)
- **Switches sans labels associes** : dans `CookieModal.tsx`, les composants `<Switch>` ne sont pas associes a des labels via `htmlFor`/`id` ou `aria-labelledby`. Le texte de la categorie est dans un `<p>` voisin mais pas formellement lie.
- **Z-index** : le banner utilise `z-50` et le modal `z-[60]`, ce qui est correct pour l'empilement mais peut masquer le skip link (`z-[100]`)

### Fichiers concernes

```
src/components/CookieBanner.tsx
src/components/CookieModal.tsx
src/hooks/useCookieConsent.ts
e2e/cookie-consent.spec.ts
```

### Recommandations

1. **Focus trap** : implementer un focus trap dans `CookieModal.tsx` :
   ```tsx
   import { FocusTrap } from "focus-trap-react";
   // ou utiliser un hook custom basé sur le premier/dernier element focusable
   ```
2. **Gestion Escape** : ajouter un `useEffect` pour fermer la modal sur Escape :
   ```tsx
   useEffect(() => {
     if (!open) return;
     const handleEscape = (e: KeyboardEvent) => {
       if (e.key === "Escape") onClose();
     };
     document.addEventListener("keydown", handleEscape);
     return () => document.removeEventListener("keydown", handleEscape);
   }, [open, onClose]);
   ```
3. **Restoration du focus** : sauvegarder `document.activeElement` a l'ouverture et y retourner a la fermeture
4. **Labels Switch** : ajouter `aria-labelledby` ou `aria-label` sur chaque `<Switch>` pointant vers le titre de la categorie
5. **Banner** : ajouter `role="region"` et `aria-label="Bandeau de consentement cookies"` sur le container du banner

---

## Synthese des recommandations par priorite

### Priorite Haute (impact WCAG critique)

| # | Action | Fichier(s) | Critere WCAG |
|---|--------|-----------|--------------|
| 1 | Implementer `prefers-reduced-motion` pour les slideshows automatiques | `HeroCinemaSlideshow.tsx`, `BoatImageSlideshow.tsx`, `GalleryPreview.tsx` | 2.3.1, 2.3.3 |
| 2 | Ajouter focus trap + gestion Escape dans le cookie modal | `CookieModal.tsx` | 2.4.3, 2.1.2 |
| 3 | Reactiver la regle `color-contrast` dans axe-core et corriger les violations | `globals.css`, `FooterVariants.tsx`, `accessibility.spec.ts` | 1.4.3 |
| 4 | Corriger le ratio de contraste du gold sur blanc | `globals.css` | 1.4.3 |

### Priorite Moyenne (amelioration significative)

| # | Action | Fichier(s) | Critere WCAG |
|---|--------|-----------|--------------|
| 5 | Rendre les images galerie focusables au clavier | `Galerie.tsx` | 2.1.1 |
| 6 | Rendre les landmarks de la carte focusables au clavier | `Croisiere.tsx` | 2.1.1 |
| 7 | Ajouter `<main>` dans le layout landing | `(landing)/layout.tsx` | 1.3.1 |
| 8 | Ajouter focus-visible sur `.btn-gold` et boutons custom | `globals.css`, composants | 2.4.7 |
| 9 | Ajouter messages d'erreur inline dans le formulaire contact | `ContactForm.tsx` | 3.3.1 |
| 10 | Ajouter `aria-label` / `aria-labelledby` sur les Switch cookie | `CookieModal.tsx` | 4.1.2 |

### Priorite Basse (amelioration progressive)

| # | Action | Fichier(s) | Critere WCAG |
|---|--------|-----------|--------------|
| 11 | Etendre les tests axe-core a toutes les pages | `accessibility.spec.ts` | - |
| 12 | Reactiver `link-name` et `button-name` dans axe-core | `accessibility.spec.ts` | 4.1.2 |
| 13 | Ajouter `aria-pressed` sur les filtres actualites | `Actualites.tsx` | 4.1.2 |
| 14 | Ajouter gestion Escape + fleches sur le dropdown langue | `HeaderVariants.tsx` | 2.1.1 |
| 15 | Ajouter `role="region"` sur le cookie banner | `CookieBanner.tsx` | 1.3.1 |

---

## Conclusion

Le projet "Un Bateau a Paris" a une base d'accessibilite solide : semantique HTML correcte, skip link, labels de formulaire, attributs ARIA sur les elements interactifs principaux, et des tests axe-core en place. L'utilisation des composants Radix UI / shadcn apporte nativement de bonnes pratiques (focus management, roles ARIA).

Les principaux axes d'amelioration sont :
1. **L'absence totale de gestion de `prefers-reduced-motion`** pour les 165+ animations Framer Motion (point le plus critique)
2. **Les problemes de contraste** masques par la desactivation de la regle axe-core
3. **Le focus trap manquant** dans le modal cookie
4. **L'accessibilite clavier incomplite** pour les elements interactifs custom (galerie, carte)

En corrigeant les 4 points de priorite haute, le score passerait a environ **8.5/10** et le site serait substantiellement conforme WCAG 2.1 AA.
