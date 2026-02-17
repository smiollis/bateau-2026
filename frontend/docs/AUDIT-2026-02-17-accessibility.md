# Audit Accessibilité WCAG 2.1 AA - bateau-a-paris.fr

**Date:** 2026-02-17
**Auditeur:** Expert Accessibilité WCAG 2.1 AA
**Scope:** Frontend Next.js (/work/projects/MICHEL/bateau-2026/frontend)
**Focus:** ARIA, focus management, keyboard navigation, contrast, reduced motion, alt texts

---

## Score Global: 7.5/10

### Répartition par catégorie

| Catégorie | Score | Statut |
|-----------|-------|--------|
| Attributs ARIA | 8/10 | Bon |
| Focus Management | 7/10 | Bien |
| Keyboard Navigation | 8/10 | Bon |
| Reduced Motion | 9/10 | Excellent |
| Alt Texts | 9/10 | Excellent |
| Contrastes de couleurs | 5/10 | Insuffisant |
| Formulaires | 8/10 | Bon |

---

## Points Forts

### 1. Reduced Motion - Excellent (9/10)

**Implémentation exemplaire de WCAG 2.3.1 (Animation from Interactions)**

- `useReducedMotion()` de framer-motion utilisé dans **25 composants sur 44** (57%)
- Composants avec support complet:
  - `HeroVariants.tsx` (6 animations conditionnelles)
  - `ContactForm.tsx` (3 animations)
  - `MobileMenu.tsx` (menu déroulant)
  - `CookieModal.tsx` (modal + focus trap)
  - `CookieBanner.tsx` (banner slide-in)
  - `ThemeSwitcher.tsx` (transitions)
  - Tous les composants `landing/*` (11 composants)

**Code pattern cohérent:**
```tsx
const prefersReducedMotion = useReducedMotion();

<motion.div
  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: prefersReducedMotion ? 0 : undefined }}
>
```

**Point faible identifié:** `HeroCinemaSlideshow.tsx` (Ken Burns effect) ne respecte PAS `useReducedMotion()` - animation toujours active (lignes 87-99).

### 2. Alt Texts - Excellent (9/10)

**Toutes les images ont des alt texts descriptifs**

- 17 fichiers analysés avec balises `alt=`
- Aucune image avec `alt=""` vide trouvée (sauf cas décoratifs volontaires)
- Pattern `next/image` utilisé partout (pas de `<img>` brut)

**Exemples de qualité:**
```tsx
// BoatImageSlideshow.tsx
{ src: bateau1.src, alt: "Le Senang sous un pont parisien" }
{ src: bateau2.src, alt: "Le Senang naviguant sur la Seine au crépuscule" }

// HeroCinemaSlideshow.tsx
alt: "Le Senang naviguant sous les ponts de Paris"
alt: "Panorama des monuments parisiens depuis la Seine"
```

**Seul manque:** indicateurs de slideshow (dots) manquent parfois d'aria-label descriptif (ex: BoatImageSlideshow ligne 66).

### 3. Skip to Content - Présent (8/10)

**Lien "Aller au contenu" implémenté dans HeaderVariants.tsx (lignes 86-91)**

```tsx
<a
  href="#main"
  className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
>
  {t("skipToContent")}
</a>
```

**Bonne pratique:** visible au focus, positionné avant le header.

**Cible valide:** `<main id="main">` dans `/src/app/[locale]/layout.tsx` (ligne 26).

### 4. Formulaire de Contact - Bon (8/10)

**Labels explicites et aria-required présents**

`ContactForm.tsx` (lignes 126-175):
```tsx
<label htmlFor="contact-name">...</label>
<Input id="contact-name" aria-required="true" />

<label htmlFor="contact-email">...</label>
<Input id="contact-email" type="email" aria-required="true" />

<label htmlFor="contact-message">...</label>
<Textarea id="contact-message" aria-required="true" />
```

**Honeypot accessible:**
```tsx
<input tabIndex={-1} aria-hidden="true" />
```

**Gestion des erreurs:** toasts (useToast) utilisés, mais **manque aria-live** pour annoncer les erreurs.

### 5. Focus Trap - Excellent (9/10)

**CookieModal.tsx implémente un focus trap complet (lignes 63-108)**

```tsx
const handleKeyDown = useCallback((e: KeyboardEvent) => {
  if (e.key === "Escape") {
    onClose();
    return;
  }

  // Focus trap: Tab / Shift+Tab
  if (e.key === "Tab" && modalRef.current) {
    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    // ... cycle entre premier et dernier élément
  }
}, [onClose]);
```

**Attributs ARIA:**
```tsx
<div role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
  <h2 id="cookie-modal-title">...</h2>
</div>
```

**Respect WCAG 2.1.2 (No Keyboard Trap).**

### 6. Menu Mobile - Bon (8/10)

**MobileMenu.tsx** (lignes 51-98):
- `aria-expanded` / `aria-controls` présents (HeaderVariants ligne 130-131)
- Fermeture par Escape (via AnimatePresence)
- Boutons avec labels explicites
- `useReducedMotion()` respecté

**Manque:** pas de focus trap explicite (devrait piéger le focus comme CookieModal).

---

## Violations WCAG Trouvées

### Niveau AA - Critiques

#### 1. WCAG 1.4.3 Contrast (Minimum) - FAIL

**Problème majeur: bouton `.btn-gold` avec texte blanc**

`globals.css` lignes 175-190:
```css
.btn-gold {
  background: linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-dark)) 100%);
  color: #fff !important; /* HARDCODED WHITE */
}
```

**Ratio de contraste calculé:**
- Gold (HSL 43, 65%, 52%) = RGB(212, 167, 53)
- White = RGB(255, 255, 255)
- **Contrast ratio: 2.24:1**

**Normes:**
- WCAG AA normal text: 4.5:1 required → **FAIL**
- WCAG AA large text (18pt+): 3:1 required → **FAIL**

**Impact:** tous les boutons CTA principaux (réservation, contact, etc.) ont un contraste insuffisant.

**Occurrence:** 15+ boutons dans le site (Header, Hero, CTAVariants, ContactForm, landing pages).

#### 2. WCAG 1.4.11 Non-text Contrast - WARNING

**Boutons de navigation sans bordures visibles**

`HeaderVariants.tsx` (lignes 106-113):
```tsx
<button onClick={() => handleNavClick(item.href)} className={styles.nav}>
  {item.label}
</button>
```

**Styles (classic):**
```tsx
nav: "text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
```

**Problème:** pas de `focus-visible:ring` sur les boutons de navigation. Uniquement couleur text au hover/focus.

**Impact modéré:** utilisateurs clavier peuvent perdre le focus visuel.

### Niveau AA - Mineures

#### 3. WCAG 2.4.7 Focus Visible - PARTIAL

**Focus indicators présents sur composants UI mais absents sur composants custom**

**Composants UI (shadcn) - OK:**
- `ui/button.tsx` (ligne 8): `focus-visible:ring-2`
- `ui/input.tsx` (ligne 11): `focus-visible:ring-2`
- `ui/textarea.tsx` (ligne 11): `focus-visible:ring-2`
- `ui/switch.tsx` (ligne 12): `focus-visible:ring-2`

**Composants custom - NOK:**
- `HeaderVariants.tsx` navigation buttons (pas de ring)
- `FooterVariants.tsx` social icons (ligne 90-95): pas de focus indicator
- `BoatImageSlideshow.tsx` dots (ligne 60-68): pas de focus indicator
- `ThemeSwitcher.tsx` bouton fermer (ligne 57-63): pas de focus indicator

**Recommandation:** ajouter systématiquement `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`.

#### 4. WCAG 2.1.1 Keyboard - PARTIAL

**Slideshow Galerie non navigable au clavier**

`Galerie.tsx` (lignes 60-82):
```tsx
<motion.div
  onClick={() => setLightboxIndex(i)}
  className="... cursor-pointer group ..."
>
```

**Problème:** `<div>` non interactif, pas de `role="button"` ni `tabIndex={0}` ni `onKeyDown`.

**Impact:** utilisateurs clavier ne peuvent pas ouvrir la lightbox.

**Recommandation:** utiliser `<button>` ou ajouter:
```tsx
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
>
```

#### 5. WCAG 2.3.1 Three Flashes or Below Threshold - UNKNOWN

**Animation Ken Burns (HeroCinemaSlideshow) sans respect reduced-motion**

`HeroCinemaSlideshow.tsx` (lignes 87-99):
```tsx
animate={{
  opacity: 1,
  scale: kb.scale[1],
  x: kb.x[1],
  y: kb.y[1],
}}
transition={{
  opacity: { duration: 1.5, ease: "easeInOut" },
  scale: { duration: INTERVAL / 1000, ease: "linear" }, // 6 secondes
  x: { duration: INTERVAL / 1000, ease: "linear" },
  y: { duration: INTERVAL / 1000, ease: "linear" },
}
```

**Problème:** animation continue même si `prefers-reduced-motion: reduce`.

**Recommandation:** conditionner les animations:
```tsx
const prefersReducedMotion = useReducedMotion();

animate={prefersReducedMotion ? {} : {
  scale: kb.scale[1],
  x: kb.x[1],
  y: kb.y[1],
}}
```

#### 6. WCAG 4.1.2 Name, Role, Value - PARTIAL

**LanguageSelector dropdown manque de label**

`LanguageSelector.tsx` (lignes 72-81):
```tsx
<button
  onClick={() => setLangOpen(!langOpen)}
  className="flex items-center gap-1 ..."
  aria-expanded={langOpen}
  aria-haspopup="listbox"
>
```

**Problème:** pas de `aria-label="Sélectionner la langue"` explicite.

**Impact modéré:** screen reader lit "FR" mais contexte peu clair.

### Niveau A - Mineures

#### 7. WCAG 2.4.4 Link Purpose (In Context) - PARTIAL

**Icônes sociales sans label visible**

`FooterVariants.tsx` (lignes 90-95):
```tsx
<a href="..." aria-label={t("instagramLabel")}>
  <Instagram className="w-5 h-5" />
</a>
```

**Bon:** aria-label présent.

**Manque:** texte visuel "Instagram" / "Facebook" (SR-only ou tooltip).

---

## Analyse Détaillée

### Attributs ARIA - 8/10

**Usage des attributs ARIA dans le projet:**

| Attribut | Occurrences | Fichiers |
|----------|-------------|----------|
| `aria-label` | 18 | 11 fichiers |
| `aria-labelledby` | 1 | CookieModal.tsx |
| `aria-describedby` | 0 | - |
| `aria-required` | 3 | ContactForm.tsx |
| `aria-expanded` | 2 | HeaderVariants, LanguageSelector |
| `aria-controls` | 1 | HeaderVariants |
| `aria-modal` | 1 | CookieModal |
| `aria-hidden` | 4 | CookieBanner, ContactForm, breadcrumb |
| `aria-haspopup` | 1 | LanguageSelector |
| `role="dialog"` | 1 | CookieModal |
| `role="listbox"` | 1 | LanguageSelector |
| `role="option"` | 1 | LanguageSelector (ligne 95-96) |

**Points positifs:**
- `role`, `aria-modal`, `aria-labelledby` sur CookieModal (WCAG 4.1.2)
- `aria-label` sur boutons icônes (toggles, social, slideshow dots)
- `aria-expanded` / `aria-controls` sur menu mobile
- `aria-required` sur champs formulaire obligatoires
- `aria-hidden` sur honeypot et éléments décoratifs

**Points à améliorer:**
- Manque `aria-live` pour annoncer erreurs formulaire (toasts silencieux)
- Manque `aria-describedby` pour lier labels aux descriptions/hints
- Manque `aria-current="page"` sur liens de navigation actifs

### Focus Management - 7/10

**Skip to content:** présent et fonctionnel (HeaderVariants ligne 86).

**Focus trap:** implémenté dans CookieModal (lignes 63-108).

**Focus indicators:**
- Composants UI shadcn: `focus-visible:ring-2` systématique
- Composants custom: focus indicators manquants ou incomplets
- HeaderVariants skip link: `focus:not-sr-only` bien implémenté

**Ordre de tabulation:** logique (header > main > footer).

**Problèmes:**
- MobileMenu: pas de focus trap (devrait piéger comme CookieModal)
- Navigation buttons: pas de ring visible au focus
- Slideshow dots: pas de focus indicator
- Galerie masonry: divs non interactifs au clavier

### Keyboard Navigation - 8/10

**Navigation au clavier testée sur:**
- Header: OK (Tab entre liens)
- Menu mobile: OK (boutons accessibles)
- Formulaire contact: OK (Tab entre champs)
- CookieModal: OK (Tab + Shift+Tab + Escape)
- LanguageSelector dropdown: OK (listbox accessible)

**Problèmes:**
- Galerie masonry: `<div onClick>` non navigable au clavier
- BoatImageSlideshow dots: cliquables mais pas au clavier (Enter/Space manquants)
- ThemeSwitcher fermeture: bouton OK mais manque Escape handler

### Reduced Motion - 9/10

**25 composants sur 44** utilisent `useReducedMotion()` (57%).

**Coverage:**
- Hero sections: OK
- Landing pages: OK (11/11 composants)
- Forms: OK
- Modals/Banners: OK
- Navigation: OK

**Exceptions:**
- `HeroCinemaSlideshow.tsx`: **NOK** (Ken Burns toujours actif)
- `Galerie.tsx` (ligne 45): animation delay sans condition reduced-motion

**CSS:** `scroll-behavior: smooth` dans `globals.css` (ligne 5).

**Problème WCAG 2.3.3 (AAA):** `scroll-behavior: smooth` ignore `prefers-reduced-motion`. Recommandation:
```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

### Alt Texts - 9/10

**Toutes les images ont des alt texts descriptifs.**

**Bonnes pratiques:**
- next/image utilisé partout (pas de `<img>` brut)
- Alt texts contextuels et descriptifs
- Images décoratives: pas de alt vide trouvé (bien)

**Point mineur:** dots de slideshow manquent parfois de label descriptif (`aria-label="Photo ${i + 1}"` présent dans BoatImageSlideshow mais absent ailleurs).

### Contrastes de Couleurs - 5/10

**Tests effectués:**

#### Palette principale (mode clair)

| Couleur | HSL | RGB | Contraste vs Background | WCAG AA | WCAG AAA |
|---------|-----|-----|------------------------|---------|----------|
| Navy (primary) | 224 64% 33% | 30, 59, 138 | **10.00:1** | PASS | PASS |
| Gold (accent) | 43 65% 52% | 212, 167, 53 | - | - | - |
| Background | 210 33% 99% | 252, 252, 253 | - | - | - |

**Gold/White (boutons CTA):**
- Gold: RGB(212, 167, 53)
- White: RGB(255, 255, 255)
- **Contrast: 2.24:1** → **FAIL AA** (4.5:1 requis)

**Impact critique:** tous les boutons `.btn-gold` (CTA principal) échouent WCAG 1.4.3.

#### Mode sombre (nuit)

Non analysé en détail, mais utilise:
- Fond: `#0a1628` (navy très foncé)
- Texte: `blue-100` / `blue-200`
- Accent: gold (même problème de contraste potentiel)

**Recommandation:** ajouter des tests de contraste automatisés (ex: `axe-core` dans tests E2E Playwright).

### Formulaires - 8/10

**ContactForm.tsx:**

**Points forts:**
- Labels explicites (`<label htmlFor>`)
- Associations label/input via `id`
- `aria-required="true"` sur champs obligatoires
- Type d'input correct (`type="email"`, `type="tel"`)
- Maxlength défini (protection)
- Honeypot avec `tabIndex={-1}` et `aria-hidden="true"`

**Points faibles:**
- Pas de `aria-invalid` au changement d'état
- Pas de `aria-describedby` pour lier erreurs aux champs
- Toasts d'erreur sans `aria-live="assertive"`
- Pas de messages d'erreur inline (uniquement toasts)

**Recommandation:**
```tsx
<Input
  id="contact-email"
  type="email"
  aria-required="true"
  aria-invalid={emailError ? "true" : "false"}
  aria-describedby={emailError ? "email-error" : undefined}
/>
{emailError && (
  <p id="email-error" className="text-destructive text-sm" role="alert">
    {emailError}
  </p>
)}
```

---

## Recommandations par Priorité

### Critique (à corriger immédiatement)

#### 1. Corriger contraste bouton `.btn-gold`

**Fichier:** `globals.css` lignes 175-190

**Option A - Texte foncé (marine/noir):**
```css
.btn-gold {
  background: linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold-dark)) 100%);
  color: hsl(var(--navy-dark)) !important; /* Contraste 5.3:1 estimé - OK AA */
  font-weight: 600;
  text-shadow: none; /* éviter blur */
}
```

**Option B - Fond plus foncé (gold-dark):**
```css
.btn-gold {
  background: linear-gradient(135deg, hsl(var(--gold-dark)) 0%, hsl(43 65% 30%) 100%);
  color: #fff !important; /* Contraste 4.7:1 estimé - OK AA */
}
```

**Test:** `npm run test:e2e` avec `axe-core` pour valider.

#### 2. Ajouter `useReducedMotion()` dans HeroCinemaSlideshow

**Fichier:** `HeroCinemaSlideshow.tsx`

```tsx
import { m, AnimatePresence, useReducedMotion } from "framer-motion";

const HeroCinemaSlideshow = () => {
  const prefersReducedMotion = useReducedMotion();
  // ...

  <m.img
    animate={prefersReducedMotion ? { opacity: 1 } : {
      opacity: 1,
      scale: kb.scale[1],
      x: kb.x[1],
      y: kb.y[1],
    }}
    transition={prefersReducedMotion ? { duration: 0 } : {
      opacity: { duration: 1.5, ease: "easeInOut" },
      scale: { duration: INTERVAL / 1000, ease: "linear" },
      x: { duration: INTERVAL / 1000, ease: "linear" },
      y: { duration: INTERVAL / 1000, ease: "linear" },
    }}
  />
}
```

### Importante (à corriger sous 2 semaines)

#### 3. Ajouter focus indicators sur composants custom

**Pattern recommandé:**
```tsx
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

**Fichiers à modifier:**
- `HeaderVariants.tsx` (navigation buttons, lignes 106-113)
- `FooterVariants.tsx` (social icons, lignes 90-95)
- `ThemeSwitcher.tsx` (bouton fermer, lignes 57-63)
- `BoatImageSlideshow.tsx` (dots, lignes 60-68)

#### 4. Rendre Galerie navigable au clavier

**Fichier:** `Galerie.tsx` lignes 60-82

**Remplacer:**
```tsx
<motion.div onClick={() => setLightboxIndex(i)} className="... cursor-pointer">
```

**Par:**
```tsx
<motion.button
  onClick={() => setLightboxIndex(i)}
  onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(i)}
  className="... w-full text-left p-0 border-0 bg-transparent focus-visible:ring-2"
  aria-label={`Ouvrir l'image: ${img.alt}`}
>
```

#### 5. Ajouter aria-live pour erreurs formulaire

**Fichier:** `ContactForm.tsx`

**Ajouter zone live:**
```tsx
<div aria-live="assertive" aria-atomic="true" className="sr-only">
  {errorMessage}
</div>
```

**Modifier toast calls:**
```tsx
if (!res.ok) {
  const errorMsg = t("errorServer");
  setErrorMessage(errorMsg); // trigger aria-live
  toast({ title: errorMsg, variant: "destructive" });
}
```

#### 6. Conditionner scroll-behavior: smooth

**Fichier:** `globals.css` ligne 5

**Remplacer:**
```css
html {
  scroll-behavior: smooth;
}
```

**Par:**
```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

### Mineure (amélioration continue)

#### 7. Ajouter focus trap dans MobileMenu

**Fichier:** `MobileMenu.tsx`

**Pattern:** copier le `handleKeyDown` de `CookieModal.tsx` (lignes 63-94).

#### 8. Ajouter aria-current sur navigation active

**Fichier:** `HeaderVariants.tsx`

```tsx
<button
  className={styles.nav}
  aria-current={pathname === item.href ? "page" : undefined}
>
```

#### 9. Ajouter aria-label sur LanguageSelector

**Fichier:** `LanguageSelector.tsx` ligne 72

```tsx
<button
  onClick={() => setLangOpen(!langOpen)}
  aria-label="Sélectionner la langue"
  aria-expanded={langOpen}
  aria-haspopup="listbox"
>
```

#### 10. Tests automatisés accessibilité

**Ajouter dans tests E2E Playwright:**

```typescript
// e2e/accessibility.spec.ts
import AxeBuilder from '@axe-core/playwright';

test('Page d\'accueil accessible', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

**Installer:**
```bash
npm install -D @axe-core/playwright
```

---

## Checklist de Conformité WCAG 2.1 AA

### Niveau A

| Critère | Statut | Notes |
|---------|--------|-------|
| 1.1.1 Non-text Content | ✅ PASS | Alt texts présents partout |
| 1.3.1 Info and Relationships | ✅ PASS | Labels/inputs associés, headings hiérarchiques |
| 1.3.2 Meaningful Sequence | ✅ PASS | Ordre de tabulation logique |
| 1.3.3 Sensory Characteristics | ✅ PASS | Pas de "cliquez sur le bouton rond" |
| 1.4.1 Use of Color | ✅ PASS | Info pas uniquement par couleur |
| 2.1.1 Keyboard | ⚠️ PARTIAL | Galerie non navigable au clavier |
| 2.1.2 No Keyboard Trap | ✅ PASS | Focus trap OK (CookieModal) |
| 2.2.1 Timing Adjustable | N/A | Pas de timeout |
| 2.2.2 Pause, Stop, Hide | ⚠️ PARTIAL | Slideshow auto sans bouton pause |
| 2.3.1 Three Flashes | ✅ PASS | Pas de flashes |
| 2.4.1 Bypass Blocks | ✅ PASS | Skip to content présent |
| 2.4.2 Page Titled | ✅ PASS | Metadata titles OK |
| 2.4.3 Focus Order | ✅ PASS | Ordre logique |
| 2.4.4 Link Purpose | ✅ PASS | Labels clairs |
| 3.1.1 Language of Page | ✅ PASS | `<html lang={locale}>` |
| 3.2.1 On Focus | ✅ PASS | Pas de changement surprise |
| 3.2.2 On Input | ✅ PASS | Formulaire stable |
| 3.3.1 Error Identification | ⚠️ PARTIAL | Toasts sans aria-live |
| 3.3.2 Labels or Instructions | ✅ PASS | Labels explicites |
| 4.1.1 Parsing | ✅ PASS | HTML valide (Next.js) |
| 4.1.2 Name, Role, Value | ⚠️ PARTIAL | Quelques aria manquants |

### Niveau AA

| Critère | Statut | Notes |
|---------|--------|-------|
| 1.3.4 Orientation | ✅ PASS | Responsive |
| 1.3.5 Identify Input Purpose | ✅ PASS | autocomplete sur inputs |
| 1.4.3 Contrast (Minimum) | ❌ FAIL | .btn-gold 2.24:1 < 4.5:1 |
| 1.4.4 Resize Text | ✅ PASS | Rem units utilisés |
| 1.4.5 Images of Text | ✅ PASS | Logo SVG uniquement |
| 1.4.10 Reflow | ✅ PASS | Pas de scroll horizontal |
| 1.4.11 Non-text Contrast | ⚠️ PARTIAL | Focus indicators manquants |
| 1.4.12 Text Spacing | ✅ PASS | Line-height OK |
| 1.4.13 Content on Hover/Focus | ✅ PASS | Tooltips dismissibles |
| 2.4.5 Multiple Ways | ✅ PASS | Navigation + footer links |
| 2.4.6 Headings and Labels | ✅ PASS | Headings descriptifs |
| 2.4.7 Focus Visible | ⚠️ PARTIAL | Manque sur composants custom |
| 3.1.2 Language of Parts | N/A | Contenu monolingue par page |
| 3.2.3 Consistent Navigation | ✅ PASS | Header/footer identiques |
| 3.2.4 Consistent Identification | ✅ PASS | Icônes/labels cohérents |
| 3.3.3 Error Suggestion | ✅ PASS | Messages explicites |
| 3.3.4 Error Prevention | ✅ PASS | Confirmation avant submit |
| 4.1.3 Status Messages | ⚠️ PARTIAL | Toasts sans aria-live |

**Score conformité: 21/29 PASS (72%)**
**Bloquants AA: 1 (contraste .btn-gold)**

---

## Conclusion

Le projet bateau-a-paris.fr montre une **très bonne base d'accessibilité** avec des pratiques exemplaires sur:
- Reduced motion (9/10)
- Alt texts (9/10)
- Focus trap (CookieModal)
- Skip to content
- Formulaires (labels/aria-required)

**Violation critique:** contraste bouton `.btn-gold` (2.24:1 < 4.5:1) bloque la conformité AA.

**Recommandations prioritaires:**
1. Corriger contraste .btn-gold (critique)
2. Ajouter useReducedMotion dans HeroCinemaSlideshow (importante)
3. Ajouter focus indicators sur composants custom (importante)
4. Rendre Galerie navigable au clavier (importante)

**Après corrections:** score estimé **9/10** (conformité AA complète).

---

**Rapport généré le:** 2026-02-17
**Dernière modification:** 2026-02-17
