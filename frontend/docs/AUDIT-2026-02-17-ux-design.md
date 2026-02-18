> **ARCHIVED** — Superseded by AUDIT-2026-02-18

# Audit UX & Design System - Un Bateau à Paris

**Date :** 17 février 2026
**Auditeur :** Expert UX & Design System
**Périmètre :** Frontend Next.js - Design tokens, cohérence thèmes, responsive, composants UI

---

## Score Global : 8.5/10

| Critère | Score | Commentaire |
|---------|-------|-------------|
| Design Tokens | 9/10 | Système HSL cohérent, bien structuré |
| Cohérence Thèmes | 8/10 | Bonne implémentation, quelques valeurs hardcodées |
| Responsive Design | 9/10 | Breakpoints cohérents, excellent grid system |
| Composants UI | 9/10 | Shadcn/ui bien intégré, composants accessibles |
| Navigation | 8.5/10 | Structure claire, quelques redondances mineures |
| Accessibilité Focus | 7/10 | Présent mais insuffisant sur certains composants |

---

## 1. Design Tokens (9/10)

### Points Forts

#### Système HSL Cohérent
- **Excellent** : Toutes les couleurs sont en HSL dans `globals.css`
- Tokens sémantiques bien définis (`--primary`, `--accent`, `--muted`, etc.)
- System `@theme inline` correctement utilisé pour Tailwind v4
- Palette cohérente : Navy blue (224, 64%, 33%), Gold (43, 65%, 52%)

```css
:root {
  --primary: 224 64% 33%;
  --accent: 43 65% 52%;
  --background: 210 33% 99%;
  --foreground: 220 13% 26%;
}
```

#### Variables Dérivées
- Radius system bien défini : `--radius-sm` à `--radius-xl`
- Variantes de couleurs : `--navy-dark`, `--navy-light`, `--gold-light`, `--gold-dark`
- Tokens sidebar cohérents avec le design system global

#### Classes Utilitaires Custom
- `.btn-gold` : bouton premium avec gradient
- `.card-hover` : effet hover uniforme
- `.section-padding` : spacing responsive cohérent
- `.container-custom` : padding adaptatif (1rem → 1.5rem → 2rem)
- `.text-gradient-gold` : effet texte premium

### Recommandations

**[MINOR]** Extraire les valeurs magic number dans `globals.css`
```css
/* Actuel */
.section-padding {
  padding-top: 4rem;    /* Magic number */
  padding-bottom: 4rem; /* Magic number */
}

/* Recommandé */
:root {
  --section-padding-mobile: 4rem;
  --section-padding-desktop: 6rem;
}
```

---

## 2. Cohérence des Thèmes (8/10)

### Points Forts

#### Architecture Thème Solide
- Context React `ThemeVariantContext` avec `isDark` helper
- 2 variantes : `classic` (jour) et `nuit` (sombre)
- Toggle automatique de la classe `.dark` sur `documentElement`
- Tous les composants `*Variants.tsx` utilisent le context

#### Thème Classic (Light)
```typescript
classic: {
  header: "bg-white/95 backdrop-blur-md border-b border-border",
  section: "bg-secondary/30",
  card: "bg-card rounded-2xl border border-border",
  text: "text-foreground/80",
}
```

#### Thème Nuit (Dark)
```typescript
nuit: {
  header: "bg-[#0a1628]/95 backdrop-blur-md border-b border-gold/20",
  section: "bg-[#0d1d35]",
  card: "bg-white/5 backdrop-blur-sm border border-blue-400/10",
  text: "text-blue-200/70",
}
```

### Incohérences Trouvées

#### 1. Couleurs Hardcodées en Hex (32 occurrences)

**Problème :** Valeurs hex non tokenisées dans le thème `nuit`

```tsx
// ❌ INCOHÉRENT - HeaderVariants.tsx:33
header: "bg-[#0a1628]/95 backdrop-blur-md border-b border-gold/20"

// ❌ INCOHÉRENT - FooterVariants.tsx:29
footer: "bg-[#060f1e] text-blue-100"

// ❌ INCOHÉRENT - OffersVariants.tsx:35
section: "bg-[#0a1628]"

// ❌ INCOHÉRENT - FeaturesVariants.tsx:29
section: "bg-[#0d1d35]"

// ❌ INCOHÉRENT - GalleryPreview.tsx:21
const sectionBg = isDark ? "bg-[#0d1d35]" : "bg-secondary/30";
```

**Impact :**
- 3 couleurs de fond différentes : `#0a1628`, `#0d1d35`, `#060f1e`
- Impossible de changer la couleur de fond du thème nuit globalement
- Maintenance difficile (32 occurrences à modifier manuellement)

**Solution Recommandée :**

```css
/* globals.css */
.dark {
  --background: 224 64% 10%;          /* #0a1628 équivalent */
  --background-elevated: 224 50% 14%; /* #0d1d35 équivalent */
  --background-footer: 224 70% 8%;    /* #060f1e équivalent */
}
```

```tsx
// Dans les composants
nuit: {
  section: "bg-background",
  card: "bg-background-elevated",
  footer: "bg-background-footer"
}
```

#### 2. Icône Google SVG avec Couleurs Hardcodées

**Fichier :** `TestimonialsVariants.tsx:65-68`

```tsx
// ❌ Couleurs Google hardcodées
<path fill="#4285F4" d="..." />
<path fill="#34A853" d="..." />
<path fill="#FBBC05" d="..." />
<path fill="#EA4335" d="..." />
```

**Recommandation :** Extraire dans un composant `<GoogleIcon />` séparé.

#### 3. Valeurs Pixel Hardcodées (2 occurrences)

```tsx
// BoatVariants.tsx:66
className="w-full h-[400px] lg:h-[500px]"

// LandingHero.tsx:19
className="relative h-[70vh] min-h-[500px]"
```

**Recommandation :** Ajouter des tokens de hauteur standard :
```css
--hero-height-mobile: 70vh;
--hero-min-height: 31.25rem; /* 500px */
--slideshow-height-mobile: 25rem; /* 400px */
--slideshow-height-desktop: 31.25rem; /* 500px */
```

---

## 3. Responsive Design (9/10)

### Points Forts

#### Breakpoints Cohérents (93 occurrences)
- **sm:** (640px) : 640px Tailwind default
- **md:** (768px) : tablette portrait
- **lg:** (1024px) : desktop
- **xl:** (1280px) : large desktop
- **2xl:** (1536px) : ultra-wide

Utilisation systématique dans 30 composants.

#### Grid System Excellent
```tsx
// 4-col responsive (OffersVariants.tsx:130)
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

// 2-col avec gap adaptatif (BoatVariants.tsx:57)
<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

// Footer 4-col (FooterVariants.tsx:83)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
```

#### Mobile Menu Robuste
- Menu overlay avec `AnimatePresence`
- Fermeture automatique après navigation
- Toggle langue + thème intégré
- Respect `useReducedMotion()` (WCAG 2.3.1)

#### Container Custom
```css
.container-custom {
  max-width: 80rem;
  padding-left: 1rem;        /* mobile */
  padding-right: 1rem;
}

@media (min-width: 640px) {  /* sm */
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

@media (min-width: 1024px) { /* lg */
  padding-left: 2rem;
  padding-right: 2rem;
}
```

### Recommandations

**[MINOR]** Ajouter breakpoint `xs` pour petits mobiles (375px)
```typescript
// tailwind.config.ts
theme: {
  screens: {
    xs: '375px',
    sm: '640px',
    // ...
  }
}
```

**[MINOR]** Utiliser `aspect-ratio` au lieu de hauteurs fixes
```tsx
// Actuel
<div className="h-48 overflow-hidden">

// Recommandé
<div className="aspect-video overflow-hidden">
```

---

## 4. Composants UI (9/10)

### Points Forts

#### Shadcn/ui Bien Intégré
- 7 composants shadcn : Button, Input, Textarea, Switch, Accordion, Breadcrumb, Toast, Skeleton
- Tous utilisent `cn()` utility de `class-variance-authority`
- Props `asChild` pour composition (Radix Slot)
- Variants système cohérent

#### Button Component (ui/button.tsx)
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-white",
        // ...
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
  }
);
```

#### Input Component (ui/input.tsx)
```tsx
// Focus states bien définis
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

#### Breadcrumb Components
- Composant shadcn dans `ui/breadcrumb.tsx` (90 lignes)
- Composant landing custom dans `landing/LandingBreadcrumb.tsx` (39 lignes)
- **Redondance mineure** : 2 implémentations similaires

#### Transitions Cohérentes (101 occurrences)
Toutes les transitions utilisent `transition-colors`, `transition-all`, ou Framer Motion avec respect de `useReducedMotion()`.

### Incohérences Mineures

#### 1. Manque de Focus States sur Composants Custom

**Fichier :** `HeaderVariants.tsx:106-113`
```tsx
// ❌ Manque focus-visible
<button
  onClick={() => handleNavClick(item.href)}
  className={styles.nav}
>
  {item.label}
</button>

// ✅ Recommandé
<button
  onClick={() => handleNavClick(item.href)}
  className={`${styles.nav} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
>
```

**Impact :** 5 occurrences totales de `focus:` dans les composants (insuffisant pour 44 composants).

#### 2. LandingBreadcrumb ne Supporte Pas le Thème Nuit

```tsx
// LandingBreadcrumb.tsx:14-21 (hardcodé classic)
<nav aria-label="Fil d'Ariane" className="container-custom py-4">
  <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
    {/* ... */}
    <span className="text-primary font-medium">{item.name}</span>
  </ol>
</nav>
```

**Recommandation :** Utiliser `useThemeVariant()` comme dans les autres composants.

---

## 5. Navigation (8.5/10)

### Points Forts

#### Structure Claire
- Header : logo, nav desktop (6 items), actions (langue, thème, CTA)
- Mobile : hamburger menu avec overlay
- Footer : 4 colonnes (brand, nav, contact, legal)
- Skip to content link accessible (HeaderVariants:86-91)

#### Liens Internes Cohérents
- Utilisation systématique de `Link` de `@/i18n/navigation` (i18n-ready)
- Scroll smooth vers ancres avec `handleNavClick()` robust
- Retry mechanism pour navigation async (60 tentatives max)

```tsx
// HeaderVariants.tsx:60-82
const handleNavClick = (href: string) => {
  if (href.startsWith("/#")) {
    const id = href.slice(2);
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
      let attempts = 0;
      const interval = setInterval(() => {
        const el = document.getElementById(id);
        attempts++;
        if (el) {
          clearInterval(interval);
          el.scrollIntoView({ behavior: "smooth" });
        } else if (attempts >= 60) {
          clearInterval(interval);
        }
      }, 50);
    }
  } else {
    router.push(href);
  }
};
```

#### Footer Navigation Duplication

**Fichier :** `FooterVariants.tsx:48-54`
```tsx
const navItems = [
  { label: tNav("bateau"), to: "/#bateau" },
  { label: tNav("croisiere"), to: "/#croisiere" },
  { label: tNav("tarifs"), to: "/#tarifs" },
  { label: tNav("galerie"), to: "/galerie" },
  { label: tNav("actualites"), to: "/actualites" },
];
```

**Observation :** Items navigation identiques dans Header + Footer. Pas d'item "contact" dans footer (présent dans header).

**Recommandation :** Extraire dans `@/data/navigation.ts` :
```typescript
// data/navigation.ts
export const mainNavItems = [
  { label: "nav.croisiere", href: "/#croisiere" },
  { label: "nav.bateau", href: "/#bateau" },
  { label: "nav.galerie", href: "/galerie" },
  { label: "nav.tarifs", href: "/#tarifs" },
  { label: "nav.actualites", href: "/actualites" },
  { label: "nav.contact", href: "/#contact" },
];
```

#### Breadcrumb Implementation

**Shadcn Component :** `ui/breadcrumb.tsx` (90 lignes)
- Composant complet avec `BreadcrumbEllipsis`, `BreadcrumbSeparator`
- Support `asChild` pour composition
- ARIA labels corrects

**Landing Component :** `landing/LandingBreadcrumb.tsx` (39 lignes)
- Implémentation simplifiée
- Toujours "Accueil" hardcodé en français (pas i18n)

**Recommandation :** Unifier autour du composant shadcn ou ajouter i18n au composant landing.

### Incohérences Mineures

1. **Contact dans Header, pas dans Footer nav** (présent uniquement en section)
2. **Breadcrumb non-i18n** : "Accueil" hardcodé (LandingBreadcrumb.tsx:19)
3. **Retry attempts = 60** : valeur arbitraire (3 secondes max = 60 * 50ms)

---

## 6. Styles Inline (10/10)

### Audit Complet

**Recherche :** `style={{` dans `/src/components`
**Résultat :** **0 occurrence** ✅

Tous les styles utilisent Tailwind classes ou tokens CSS. Excellent.

---

## 7. Accessibilité Focus (7/10)

### Points Forts

- Input/Textarea : `focus-visible:ring-2 focus-visible:ring-ring` ✅
- Button : `focus-visible:ring-2 focus-visible:ring-ring` ✅
- Skip to content link : `focus:not-sr-only focus:absolute` ✅ (HeaderVariants:86-91)

### Points Faibles

**Seulement 5 occurrences de `focus:` dans 44 composants.**

Composants sans focus states explicites :
- Navigation buttons (HeaderVariants:106-113)
- Footer links (FooterVariants:104)
- Landing CTA links (LandingRelated, LandingPricing)
- Language selector buttons (LanguageSelector)
- Theme toggle button (HeaderThemeToggle)

**Recommandation :** Ajouter systématiquement :
```tsx
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

---

## 8. Animations & Reduced Motion (9.5/10)

### Points Forts

**Respect WCAG 2.3.1 Parfait**
- `useReducedMotion()` de Framer Motion utilisé dans **35 composants**
- Animations conditionnelles : `initial={{ y: prefersReducedMotion ? 0 : 20 }}`
- Durée à 0 si `prefersReducedMotion`: `duration: prefersReducedMotion ? 0 : 0.6`

Exemple parfait (HeroVariants.tsx:36-38) :
```tsx
<m.div
  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
>
```

**Tous les composants landing et variants respectent ce pattern.** ✅

---

## Recommandations Priorisées

### Priorité 1 - Critique

**Aucune** - Aucun problème bloquant.

### Priorité 2 - Important

1. **Tokeniser les couleurs hex hardcodées du thème nuit** (32 occurrences)
   - Créer `--background-elevated`, `--background-footer` dans `.dark`
   - Remplacer `bg-[#0a1628]`, `bg-[#0d1d35]`, `bg-[#060f1e]`
   - Impact : Maintenance long terme

2. **Ajouter focus states sur tous les éléments interactifs**
   - 39 composants sans `focus-visible` explicite
   - Impact : Accessibilité clavier (WCAG 2.4.7)

3. **Unifier les composants Breadcrumb**
   - Choisir : Shadcn (complet) ou Landing (simple)
   - Ajouter i18n si Landing
   - Impact : Cohérence architecture

### Priorité 3 - Amélioration

4. **Extraire navigation items dans data/navigation.ts**
   - DRY : éviter duplication Header/Footer
   - Impact : Maintenance

5. **Ajouter tokens pour hauteurs standards**
   - `--hero-height`, `--slideshow-height-mobile`, etc.
   - Remplacer `h-[400px]`, `h-[500px]`, `h-[70vh]`
   - Impact : Cohérence responsive

6. **Ajouter breakpoint xs (375px)**
   - Optimiser pour iPhone SE, petits Android
   - Impact : UX mobile

7. **Extraire GoogleIcon component**
   - Séparer SVG Google (TestimonialsVariants:64-69)
   - Impact : Réutilisabilité

---

## Résumé Quantitatif

| Métrique | Valeur |
|----------|--------|
| Composants totaux | 44 |
| Composants avec thème | 8 (*Variants.tsx) |
| Composants landing | 11 |
| Composants UI shadcn | 7 |
| Tokens couleurs HSL | 22 (root) + 22 (.dark) |
| Classes custom utilitaires | 8 |
| Breakpoints responsive | 5 (sm/md/lg/xl/2xl) |
| Occurrences responsive | 93 |
| Couleurs hex hardcodées | 32 |
| Valeurs px hardcodées | 2 |
| Styles inline | 0 ✅ |
| Focus states | 5 (insuffisant) |
| Transitions cohérentes | 101 ✅ |
| Respect reduced motion | 35 composants ✅ |

---

## Conclusion

Le système de design est **globalement excellent** (8.5/10), avec une architecture solide basée sur des tokens HSL, un système de thèmes bien pensé, et un respect exemplaire de l'accessibilité animations (WCAG 2.3.1).

**Forces principales :**
- Design tokens HSL cohérents
- Système de thèmes robuste (classic/nuit)
- Responsive design systématique
- Respect reduced motion parfait
- 0 styles inline
- Composants shadcn/ui bien intégrés

**Axes d'amélioration :**
- 32 couleurs hex à tokeniser (thème nuit)
- Focus states insuffisants (5/44 composants)
- Quelques redondances mineures (breadcrumb, navigation)

**Effort estimé pour corrections Priorité 2 :** 1-2 jours dev
- 4h : Tokenisation couleurs hex
- 3h : Ajout focus states
- 1h : Unification breadcrumb

Le projet est **production-ready** avec ces améliorations pour atteindre 9.5/10.

---

**Audit réalisé par :** Claude Code (Sonnet 4.5)
**Date :** 17 février 2026
**Version frontend :** Next.js 16.1.6 + Tailwind CSS v4
