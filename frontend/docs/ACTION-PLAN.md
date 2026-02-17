# Plan d'Action Post-Audit — bateau-a-paris.fr

**Date** : 17 fevrier 2026
**Score actuel** : 8.1/10
**Objectif Sprint 1** : 8.8/10

---

## Deja fait (cette session)

- [x] ~~118 images manquantes articles traduits~~ (fix:images slug matching)
- [x] ~~54 URLs admin hardcodees dans content/excerpt~~ (fix:links)
- [x] ~~Boutons blancs sur fond blanc (Croisiere, landing)~~ (bg-transparent)
- [x] ~~Liens occasions en double dans Tarifs~~ (suppression section)
- [x] ~~Qualite image hero article~~ (quality=85)
- [x] ~~OG image WhatsApp 404~~ (og-image.jpg)
- [x] ~~Texte gras invisible mode nuit~~ (prose-invert + couleurs)

---

## Sprint 1 — Quick Wins (parallelisables par agents)

> 6 agents en parallele, < 30 min chacun
> **Impact** : Score 8.1 → 8.8 (+0.7)

### Agent 1 : CI/CD Securisation
**Source** : Audit CI/CD (6.5/10)
**Effort** : 20 min | **Impact** : CI/CD 6.5 → 8.0

- [ ] Ajouter `permissions:` explicites dans les 4 workflows
- [ ] Ajouter `timeout-minutes:` (5-15) dans les 4 workflows
- [ ] Ajouter `concurrency:` pour eviter les race conditions

**Fichiers** :
- `.github/workflows/import-posts.yml`
- `.github/workflows/import-reviews.yml`
- `.github/workflows/refresh-instagram.yml`
- `.github/workflows/lighthouse.yml`

### Agent 2 : CI/CD Git Push Retry + Instagram
**Source** : Audit CI/CD (6.5/10)
**Effort** : 25 min | **Impact** : Fiabilite deploiements

- [ ] Ajouter retry loop `git pull --rebase && git push` (3 tentatives) dans import-posts, import-reviews, refresh-instagram
- [ ] Securiser curl Instagram : `Authorization: Bearer` header au lieu de token dans URL
- [ ] Valider reponse JSON avant `gh secret set`

**Fichiers** :
- `.github/workflows/import-posts.yml`
- `.github/workflows/import-reviews.yml`
- `.github/workflows/refresh-instagram.yml`

### Agent 3 : SEO JSON-LD + Metadata
**Source** : Audit SEO (8.5/10)
**Effort** : 15 min | **Impact** : SEO 8.5 → 9.0

- [ ] Corriger `priceRange: "480€ - 600€"` dans layout.tsx (actuellement 420€)
- [ ] Dynamiser `aggregateRating` depuis `reviews.json` au lieu de hardcoder
- [ ] Ajouter fallback OG image pour articles blog sans image

**Fichiers** :
- `src/app/[locale]/layout.tsx`
- `src/lib/seo/jsonld.ts`
- `src/app/[locale]/actualites/[slug]/page.tsx`

### Agent 4 : Accessibilite WCAG
**Source** : Audit Accessibilite (7.5/10)
**Effort** : 25 min | **Impact** : A11y 7.5 → 8.5

- [ ] Ajouter `useReducedMotion` dans HeroCinemaSlideshow (Ken Burns)
- [ ] Conditionner `scroll-behavior: smooth` avec `@media (prefers-reduced-motion: no-preference)` dans globals.css
- [ ] Ajouter `role="button"` + `tabIndex={0}` + `onKeyDown` sur images galerie cliquables
- [ ] Ajouter `aria-live="polite"` sur les messages d'erreur formulaire contact

**Fichiers** :
- `src/components/HeroCinemaSlideshow.tsx`
- `src/app/globals.css`
- `src/components/GalleryLightbox.tsx`
- `src/components/ContactForm.tsx`

### Agent 5 : i18n Hardcoded Strings
**Source** : Audit i18n (8.5/10)
**Effort** : 25 min | **Impact** : i18n 8.5 → 9.0

- [ ] ArticleDetail.tsx : remplacer 6 labels d'occasions hardcodes FR par cles i18n existantes (namespace `occasions`)
- [ ] LandingBreadcrumb.tsx : remplacer "Accueil" hardcode par cle i18n
- [ ] LandingStickyBar.tsx, LandingCTA.tsx, LandingRelated.tsx : supprimer defaults texte FR dans les props

**Fichiers** :
- `src/views/ArticleDetail.tsx`
- `src/components/landing/LandingBreadcrumb.tsx`
- `src/components/landing/LandingStickyBar.tsx`
- `src/components/landing/LandingCTA.tsx`
- `src/components/landing/LandingRelated.tsx`

### Agent 6 : TypeScript Cleanup + Security
**Source** : Audits TypeScript (8.5/10) + Security (8.5/10)
**Effort** : 20 min | **Impact** : TS 8.5 → 9.0

- [ ] Ajouter DOMPurify dans LandingRichtext.tsx (seul dangerouslySetInnerHTML sans sanitization)
- [ ] Supprimer import `useThemeVariant` inutilise dans CGV.tsx
- [ ] Supprimer package `sonner` (installe mais jamais importe)

**Fichiers** :
- `src/components/landing/LandingRichtext.tsx`
- `src/views/CGV.tsx`
- `package.json`

---

## Sprint 2 — Effort Moyen (1-2h chacun)

> A traiter apres Sprint 1
> **Impact** : Score 8.8 → 9.2 (+0.4)

### 2.1 Internationaliser LandingPricing.tsx
**Source** : Audit i18n | **Effort** : 2h
- Creer namespace `landingPricing` dans messages/*.json (6 langues)
- Extraire toutes les strings FR hardcodees (formules, prix, features)

### 2.2 LazyMotion strict (motion → m)
**Source** : Audit Performance | **Effort** : 1h
- Remplacer `import { motion }` par `import { m }` dans 37 fichiers
- Verifier que `LazyMotion` wrapper est present dans tous les layouts
- Impact : -20KB bundle gzip

### 2.3 Focus states composants
**Source** : Audit Accessibilite + UX | **Effort** : 2h
- Ajouter `focus-visible:ring-2 focus-visible:ring-primary` sur elements interactifs
- HeaderVariants navigation, FooterVariants social icons, galerie items

### 2.4 Tokeniser 32 couleurs hex nuit
**Source** : Audit UX/Design | **Effort** : 1.5h
- Remplacer `#0a1628`, `#0d1d35`, `#060f1e` par tokens CSS `--nuit-*`
- Definir dans `:root` + `.dark` dans globals.css

### 2.5 Optimiser images /public/images/
**Source** : Audit Performance | **Effort** : 2h
- Convertir 15+ images > 200KB en WebP
- Reduire dimensions aux max affiches
- Impact : -6MB

### 2.6 Fixer 5 tests en echec + augmenter couverture
**Source** : Audit Tests | **Effort** : 2h
- Corriger mock framer-motion (ajouter `m.div` dans mock)
- Ajouter tests API routes Instagram + Revalidate

---

## Sprint 3 — Gros Chantiers (demi-journee+)

> **Impact** : Score 9.2 → 9.5 (+0.3)

### 3.1 Tests vues critiques (20h total)
- Reservation.tsx (4h), GalleryLightbox (3h), MobileMenu (2h)
- CookieProvider (3h), LanguageSelector (2h)
- Objectif : coverage 40% → 60%

### 3.2 Server Components migration (3h)
- LandingRichtext, LandingBreadcrumb, LandingBenefits → server
- Impact : -10KB JS client

### 3.3 Tests E2E critiques (8h)
- Flow reservation, landing pages SEO, blog multilingue, galerie keyboard

### 3.4 Rate limiting WP plugin (2h)
- Transient lock 2 min sur endpoint sync
- Retirer `localhost:3000` des CORS en prod
- Logger actions GitHub avec IP + timestamp

---

## Backlog (priorite basse)

- [ ] Creer 11 images OG landing pages Tier 2/3 (design graphique)
- [ ] Ajouter JSON-LD TouristTrip sur /croisiere
- [ ] Activer Dependabot (`.github/dependabot.yml`)
- [ ] Ajouter workflow CodeQL
- [ ] Hook `useScrollToAnchor` (DRY 3 duplications)
- [ ] Valider 3 assertions `as` avec Zod (CookieConsent, Instagram, LanguageSelector)
- [ ] Decomposer Actualites.tsx (331 lignes → 3 composants)
- [ ] Ajouter placeholders blur sur images
- [ ] Unifier 2 composants Breadcrumb (shadcn + landing)
- [ ] Configurer ou supprimer `@tailwindcss/typography`
- [ ] Notifications echec GitHub Actions (Slack/email)

---

## Resume

| Sprint | Items | Effort | Score |
|--------|-------|--------|-------|
| ~~Deja fait~~ | 7 fixes | 1h | 8.1 → 8.1 |
| Sprint 1 | 6 agents paralleles | 2h30 | 8.1 → 8.8 |
| Sprint 2 | 6 chantiers | 10h | 8.8 → 9.2 |
| Sprint 3 | 4 gros items | 33h | 9.2 → 9.5 |
| Backlog | 11 items | 15h | 9.5 → 9.8 |
