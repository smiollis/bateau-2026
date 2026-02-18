> **ARCHIVED** — Superseded by AUDIT-2026-02-18

# Audit de Couverture de Tests - Frontend bateau-a-paris.fr

**Date**: 2026-02-17
**Auditeur**: Expert Testing
**Score global**: 6.5/10

---

## 1. Résumé Exécutif

Le projet dispose d'une base de tests solide avec **303 tests unitaires** et **28 tests E2E**. La qualité des tests existants est bonne avec des mocks appropriés et des assertions pertinentes. Cependant, la couverture est **très inégale** : certains composants critiques et toutes les vues (pages) ne sont **pas testés du tout**.

### Points Forts
- Tests unitaires bien structurés (vitest + @testing-library/react)
- Tests E2E fonctionnels avec Playwright (6 fichiers, 28 tests)
- Audits accessibilité automatisés (axe-core)
- Mocks appropriés (framer-motion, next-intl, ThemeVariantContext)
- Tests de l'API contact (rate limiting, validation, honeypot)
- Configuration coverage v8 avec seuils définis

### Points Faibles Critiques
- **0 test** pour les 10 vues/pages (Actualites, Croisiere, FAQ, Galerie, etc.)
- **0 test** pour 24+ composants sur 35+ (68% de composants non testés)
- **0 test** pour les hooks (use-mobile, use-toast, useCookieConsent)
- **0 test** pour les API routes Instagram et Revalidate
- **0 test** pour les libs WordPress (client, transformers)
- **5 tests en échec** (HeroVariants.test.tsx — mock framer-motion incomplet)
- Couverture réelle estimée : **~30-35%** (bien en-dessous des seuils définis)

---

## 2. Tests Unitaires (src/__tests__/)

### 2.1 Composants Testés (7/35 — 20%)

| Composant | Fichier Test | Qualité | Assertions |
|-----------|--------------|---------|------------|
| ContactForm | ContactForm.test.tsx | ⭐⭐⭐⭐ | 5 tests — valide tous les flows (succès, erreur, honeypot, validation) |
| CookieBanner | CookieBanner.test.tsx | ⭐⭐⭐⭐ | 6 tests — render, boutons, interactions |
| FooterVariants | FooterVariants.test.tsx | ⭐⭐⭐⭐ | 7 tests — classic/dark, localisation, liens |
| HeaderVariants | HeaderVariants.test.tsx | ⭐⭐⭐⭐ | 7 tests — logo, nav, theme toggle, language selector |
| HeroVariants | HeroVariants.test.tsx | ⭐⭐ | **5 tests en ÉCHEC** (mock `m.div` manquant) |
| OffersVariants | OffersVariants.test.tsx | ⭐⭐⭐ | 6 tests — render basique, pas de test des interactions |
| LandingComponents | LandingComponents.test.tsx | ⭐⭐⭐⭐⭐ | 19 tests — tous les 11 composants landing testés |

### 2.2 Composants NON Testés (28/35 — 80%)

#### Composants Critiques (Haute Priorité)
- **BoatVariants.tsx** — affichage caractéristiques bateau
- **CTAVariants.tsx** — call-to-action principal (conversions)
- **FeaturesVariants.tsx** — liste des avantages
- **TestimonialsVariants.tsx** — avis clients (trust signals)
- **GalleryLightbox.tsx** — lightbox photos (next/dynamic)
- **GalleryPreview.tsx** — preview galerie homepage
- **MobileMenu.tsx** — menu mobile (navigation critique)
- **LanguageSelector.tsx** — sélecteur de langue (i18n)
- **ThemeSwitcher.tsx** — toggle theme classic/nuit
- **CookieModal.tsx** — modal personnalisation cookies (RGPD)

#### Composants Secondaires (Priorité Moyenne)
- **BoatImageSlideshow.tsx** — slideshow images bateau
- **HeroCinemaSlideshow.tsx** — slideshow hero (déjà mocké)
- **CaptainSection.tsx** — section présentation capitaine
- **OccasionsGrid.tsx** — grid occasions (anniversaire, EVJF, etc.)
- **NavLink.tsx** — composant lien navigation
- **ScrollToTop.tsx** — bouton scroll-to-top
- **HeaderThemeToggle.tsx** — bouton toggle theme dans header
- **Providers.tsx** — wrapper providers React

#### Composants Cookie Consent
- **CookieProvider.tsx** — provider contexte cookies (logique critique RGPD)

### 2.3 Libs Testés (7/7 — 100%)

| Lib | Fichier Test | Qualité | Commentaire |
|-----|--------------|---------|-------------|
| cookie-consent.ts | cookie-consent-lib.test.ts | ⭐⭐⭐ | Tests basiques, manque edge cases |
| escape-html.ts | escape-html.test.ts | ⭐⭐⭐⭐ | Couvre tous les cas XSS |
| gtag.ts | gtag.test.ts | ⭐⭐⭐⭐ | Mock window.gtag, teste consent mode |
| jsonld.ts | jsonld.test.ts | ⭐⭐⭐⭐⭐ | 54 tests — excellente couverture |
| metadata.ts | metadata.test.ts | ⭐⭐⭐⭐ | Teste getAlternates, getOgLocale |
| logger.ts | logger.test.ts | ⭐⭐⭐⭐ | Mock console, teste tous les niveaux |
| utils.ts | utils.test.ts | ⭐⭐ | Seulement 2 tests (cn function) |

### 2.4 Libs WordPress NON Testés (4/4 — 0%)

- **client.ts** — fetches API WordPress (wpFetch, getPosts, getLandingPages)
- **transformers.ts** — transformations données WP → app
- **types.ts** — types TypeScript (pas de tests nécessaires)
- **index.ts** — barrel export

**Impact**: Les appels API WordPress ne sont pas testés. Risque d'erreurs en production si l'API WP change.

### 2.5 Hooks NON Testés (4/4 — 0%)

- **use-mobile.tsx** — détection mobile (useMediaQuery)
- **use-toast.ts** — gestion toasts (shadcn/ui)
- **useCookieConsent.ts** — hook contexte cookies
- **useInstagramFeed.ts** — fetch feed Instagram

**Impact**: Logique critique (cookies, mobile, Instagram) non couverte. Le hook `useInstagramFeed` a 1 test dans `instagram-hook.test.ts` mais pas complet.

---

## 3. Tests E2E (e2e/)

### 3.1 Fichiers E2E (6 fichiers, 28 tests estimés)

| Fichier | Tests | Couverture | Qualité |
|---------|-------|------------|---------|
| home.spec.ts | 3 | Homepage (hero, sections, theme toggle) | ⭐⭐⭐ |
| navigation.spec.ts | 14 | Toutes les pages statiques + redirects legacy | ⭐⭐⭐⭐ |
| contact.spec.ts | 2 | Formulaire contact (affichage + submit) | ⭐⭐⭐ |
| cookie-consent.spec.ts | 5 | Banner cookies (accepter, refuser, personnaliser) | ⭐⭐⭐⭐ |
| accessibility.spec.ts | 3 | Audits axe-core WCAG 2.1 AA | ⭐⭐⭐⭐⭐ |
| mobile.spec.ts | 3 | Viewport mobile (menu, form) | ⭐⭐⭐ |

### 3.2 User Flows Critiques NON Testés

#### Conversion Funnel (CRITIQUE)
- ❌ **Réservation complète** — parcours depuis CTA → iframe Bookly → confirmation
- ❌ **Formulaire contact + validation email** — test de bout-en-bout avec Resend
- ❌ **Landing pages** — test de 17 landing pages (SEO, CTA, structured data)

#### Fonctionnalités Principales
- ❌ **Galerie lightbox** — ouverture galerie, navigation photos, fermeture
- ❌ **Articles blog** — lecture article, navigation entre articles, 404
- ❌ **Navigation i18n** — changement de langue, persist de préférence, redirects
- ❌ **Theme persist** — changement de thème, persist localStorage, hydration
- ❌ **Instagram feed** — affichage, fallback si API fail

#### Edge Cases
- ❌ **Offline mode** — comportement si pas de réseau
- ❌ **Slow 3G** — performance sur connexion lente
- ❌ **Errors boundaries** — test error.tsx et global-error.tsx
- ❌ **404 pages** — test not-found.tsx

---

## 4. Tests API Routes (1/3 — 33%)

### 4.1 API Routes Testées
- **POST /api/contact** — contact-api.test.ts (12 tests) ⭐⭐⭐⭐⭐
  - Validation Zod (name, email, message)
  - Rate limiting (3 req/min)
  - Honeypot anti-spam
  - Mock Resend email

### 4.2 API Routes NON Testées
- **GET /api/instagram** — route.ts (fetch Instagram Graph API)
- **POST /api/revalidate** — route.ts (ISR on-demand revalidation)

**Impact**: Pas de tests pour le revalidation ISR (utilisé par le bouton WP "Publier sur le site"). Risque de bugs en production.

---

## 5. Vues/Pages NON Testées (10/10 — 0%)

Toutes les vues dans `src/views/` ne sont **pas testées** :

| Vue | Criticité | Composants Critiques à Tester |
|-----|-----------|-------------------------------|
| **Actualites.tsx** | Haute | Liste articles, fallback si aucun article, links |
| **ArticleDetail.tsx** | Haute | Render article, DOMPurify, JSON-LD Article, 404 |
| **Croisiere.tsx** | Haute | JSON-LD TouristTrip, OffersVariants, CTA |
| **FAQ.tsx** | Moyenne | Accordion, JSON-LD FAQPage |
| **Galerie.tsx** | Haute | GalleryPreview, GalleryLightbox, lazy loading |
| **Reservation.tsx** | CRITIQUE | Iframe Bookly, postMessage height, error handling |
| **CGV.tsx** | Basse | Render statique |
| **Confidentialite.tsx** | Basse | Render statique |
| **MentionsLegales.tsx** | Basse | Render statique |
| **NotFound.tsx** | Moyenne | 404 page, liens retour |

---

## 6. Configuration Tests

### 6.1 Vitest (vitest.config.ts)

```typescript
coverage: {
  provider: "v8",
  reporter: ["text", "text-summary", "lcov"],
  include: ["src/**/*.{ts,tsx}"],
  exclude: ["src/__tests__/**", "src/components/ui/**", "src/**/*.d.ts"],
  thresholds: {
    statements: 40,
    branches: 30,
    functions: 35,
    lines: 40,
  },
}
```

**Analyse**:
- ✅ Provider v8 (moderne, rapide)
- ✅ Exclusions pertinentes (ui/, __tests__, .d.ts)
- ⚠️ **Seuils très bas** (40/30/35/40) — ne représentent pas une bonne couverture
- ❌ Pas de seuil `per-file` pour forcer la couverture des fichiers critiques

### 6.2 Playwright (playwright.config.ts)

```typescript
projects: [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "webkit", use: { ...devices["Desktop Safari"] } },
  { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  { name: "mobile-safari", use: { ...devices["iPhone 14"] } },
]
```

**Analyse**:
- ✅ Multi-browser (chromium, firefox, webkit)
- ✅ Multi-device (desktop + mobile)
- ✅ Trace on-first-retry
- ❌ **Pas de tests parallèles en local** (workers: undefined)
- ⚠️ Build + start avant chaque run (lent, 180s timeout)

---

## 7. Qualité des Tests Existants

### 7.1 Points Forts
- **Mocks propres** : framer-motion, next-intl, ThemeVariantContext mockés correctement
- **Assertions pertinentes** : toBeInTheDocument, toHaveAttribute, toHaveBeenCalledWith
- **Edge cases** : tests de validation, rate limiting, honeypot
- **Accessibilité** : audits axe-core automatisés (WCAG 2.1 AA)
- **Structure** : séparation unit/ + components/ + e2e/

### 7.2 Problèmes Détectés

#### 7.2.1 Tests en Échec (HeroVariants.test.tsx)
```
Error: No "m" export is defined on the "framer-motion" mock
```
**Cause**: Le composant HeroVariants utilise `m.div` (LazyMotion) mais le mock ne définit que `motion.div`.
**Impact**: 5 tests échouent, composant Hero non couvert.
**Fix**: Ajouter `m: { div: ... }` dans le mock framer-motion.

#### 7.2.2 Mocks Incomplets
- **HeroCinemaSlideshow** : mocké avec `<div data-testid="slideshow" />` mais pas de tests des interactions
- **next-intl** : mocké avec `(key: string) => key` — ne teste pas les traductions réelles
- **framer-motion** : `useReducedMotion: () => false` — ne teste pas le mode reduced-motion

#### 7.2.3 Tests Trop Superficiels
- **utils.test.ts** : seulement 2 tests pour `cn()`, ne teste pas les autres utils
- **cookie-consent-lib.test.ts** : tests basiques, manque edge cases (localStorage full, JSON parse errors)
- **OffersVariants.test.tsx** : render uniquement, pas de tests des interactions (CTA clicks)

#### 7.2.4 Pas de Tests d'Intégration
- Aucun test n'intègre plusieurs composants ensemble
- Ex: Header + MobileMenu + LanguageSelector (flow complet navigation mobile)
- Ex: CookieBanner + CookieModal + gtag (flow complet consentement)

---

## 8. Lacunes de Couverture par Priorité

### 8.1 Priorité CRITIQUE (à implémenter immédiatement)

| Élément | Type | Impact | Tests Manquants |
|---------|------|--------|-----------------|
| Reservation.tsx | Vue | CRITICAL | Iframe Bookly, postMessage, error handling |
| API /api/revalidate | API | CRITICAL | Webhook revalidation ISR |
| GalleryLightbox | Component | HIGH | Ouverture, navigation, fermeture, keyboard |
| MobileMenu | Component | HIGH | Ouverture, fermeture, navigation links |
| CookieProvider | Component | HIGH | Logique consentement, localStorage, GTM |
| LanguageSelector | Component | HIGH | Switch locale, persist, redirects |

### 8.2 Priorité HAUTE (à implémenter dans les 2 semaines)

| Élément | Type | Impact | Tests Manquants |
|---------|------|--------|-----------------|
| Actualites.tsx | Vue | HIGH | Liste articles, pagination, 404 |
| ArticleDetail.tsx | Vue | HIGH | Render article, DOMPurify, JSON-LD |
| Croisiere.tsx | Vue | HIGH | JSON-LD, OffersVariants, CTA |
| Galerie.tsx | Vue | HIGH | GalleryPreview, lightbox integration |
| BoatVariants | Component | HIGH | Render caractéristiques, responsive |
| CTAVariants | Component | HIGH | Render CTA, liens, conversions |
| FeaturesVariants | Component | HIGH | Render features, icons |
| TestimonialsVariants | Component | MEDIUM | Render avis, stars, pagination |

### 8.3 Priorité MOYENNE (à planifier)

| Élément | Type | Impact | Tests Manquants |
|---------|------|--------|-----------------|
| use-mobile | Hook | MEDIUM | Détection mobile, breakpoints |
| useCookieConsent | Hook | MEDIUM | Hook contexte cookies |
| useInstagramFeed | Hook | MEDIUM | Fetch Instagram, fallback |
| API /api/instagram | API | MEDIUM | Fetch Instagram Graph API |
| WordPress client.ts | Lib | MEDIUM | wpFetch, getPosts, getLandingPages |
| WordPress transformers.ts | Lib | MEDIUM | Transformations WP → app |
| FAQ.tsx | Vue | MEDIUM | Accordion, JSON-LD FAQPage |
| NotFound.tsx | Vue | MEDIUM | 404 page, liens retour |

### 8.4 Priorité BASSE (nice-to-have)

| Élément | Type | Impact | Tests Manquants |
|---------|------|--------|-----------------|
| CGV.tsx | Vue | LOW | Render statique |
| Confidentialite.tsx | Vue | LOW | Render statique |
| MentionsLegales.tsx | Vue | LOW | Render statique |
| BoatImageSlideshow | Component | LOW | Slideshow images |
| CaptainSection | Component | LOW | Section capitaine |
| ScrollToTop | Component | LOW | Bouton scroll |

---

## 9. Tests E2E — User Flows Critiques Manquants

### 9.1 Conversion Funnel (CRITIQUE)

```typescript
// e2e/reservation.spec.ts (à créer)
test("complete reservation flow", async ({ page }) => {
  await page.goto("/");
  // 1. Click CTA "Réserver"
  await page.click("text=Réserver");
  // 2. Attendre iframe Bookly
  const iframe = page.frameLocator("iframe");
  // 3. Remplir formulaire (date, heure, nb personnes)
  // 4. Validation + confirmation
  // 5. Vérifier URL de confirmation
});
```

### 9.2 Landing Pages (HAUTE)

```typescript
// e2e/landing-pages.spec.ts (à créer)
const landingSlugs = [
  "evjf-seine", "evg-seine", "anniversaire-seine",
  "saint-valentin-seine", "croisiere-romantique-seine",
  // ... 17 landing pages
];

for (const slug of landingSlugs) {
  test(`landing page /${slug} loads with SEO`, async ({ page }) => {
    await page.goto(`/${slug}`);
    // 1. Vérifier hero title
    // 2. Vérifier CTA visible
    // 3. Vérifier JSON-LD (FAQPage, TouristAttraction, BreadcrumbList)
    // 4. Vérifier meta og:title, og:description
  });
}
```

### 9.3 Blog (HAUTE)

```typescript
// e2e/blog.spec.ts (à créer)
test("read article and navigate", async ({ page }) => {
  await page.goto("/actualites");
  // 1. Cliquer sur premier article
  const firstArticle = page.locator("article").first();
  await firstArticle.click();
  // 2. Vérifier contenu article (DOMPurify)
  // 3. Vérifier JSON-LD Article
  // 4. Cliquer "Articles similaires"
});
```

### 9.4 Galerie (HAUTE)

```typescript
// e2e/gallery.spec.ts (à créer)
test("open lightbox and navigate photos", async ({ page }) => {
  await page.goto("/galerie");
  // 1. Cliquer sur première photo
  await page.locator("img").first().click();
  // 2. Vérifier lightbox ouvert
  // 3. Navigation fleches (next/prev)
  // 4. Keyboard (ArrowRight, ArrowLeft, Escape)
  // 5. Fermer lightbox
});
```

### 9.5 i18n (MOYENNE)

```typescript
// e2e/i18n.spec.ts (à créer)
test("switch language persists", async ({ page }) => {
  await page.goto("/");
  // 1. Cliquer EN
  await page.click("text=EN");
  // 2. Vérifier URL /en
  // 3. Recharger page
  // 4. Vérifier toujours /en (persist)
  // 5. Cliquer FR
  // 6. Vérifier URL /fr
});
```

---

## 10. Recommandations Prioritaires

### 10.1 Court Terme (1-2 semaines)

#### A. Fixer les Tests en Échec (URGENT)
```typescript
// src/__tests__/components/HeroVariants.test.tsx
vi.mock("framer-motion", () => ({
  motion: { div: ({ children, ...props }) => <div {...domProps}>{children}</div> },
  m: { div: ({ children, ...props }) => <div {...domProps}>{children}</div> }, // ✅ Ajouter
  useReducedMotion: () => false,
}));
```

#### B. Tester les Composants Critiques (16h estimées)
1. **Reservation.tsx** (4h) — iframe Bookly + postMessage
2. **GalleryLightbox** (3h) — lightbox + keyboard navigation
3. **MobileMenu** (2h) — menu mobile + liens
4. **CookieProvider** (3h) — logique consentement RGPD
5. **LanguageSelector** (2h) — switch locale + persist
6. **TestimonialsVariants** (2h) — avis clients

#### C. Augmenter les Seuils de Couverture (1h)
```typescript
// vitest.config.ts
thresholds: {
  statements: 60, // ↑ de 40
  branches: 50,   // ↑ de 30
  functions: 55,  // ↑ de 35
  lines: 60,      // ↑ de 40
}
```

#### D. Créer Tests E2E Critiques (8h estimées)
1. **e2e/reservation.spec.ts** (3h) — flow complet réservation
2. **e2e/landing-pages.spec.ts** (2h) — SEO + JSON-LD des 17 pages
3. **e2e/blog.spec.ts** (2h) — navigation articles + DOMPurify
4. **e2e/gallery.spec.ts** (1h) — lightbox + keyboard

### 10.2 Moyen Terme (1 mois)

#### A. Tester les Vues (20h estimées)
1. **Actualites.tsx** (3h)
2. **ArticleDetail.tsx** (4h)
3. **Croisiere.tsx** (3h)
4. **Galerie.tsx** (4h)
5. **FAQ.tsx** (2h)
6. **NotFound.tsx** (2h)
7. **CGV/Confidentialite/MentionsLegales** (2h)

#### B. Tester les Hooks (8h estimées)
1. **use-mobile** (2h)
2. **useCookieConsent** (3h)
3. **useInstagramFeed** (3h)

#### C. Tester les API Routes (4h estimées)
1. **GET /api/instagram** (2h)
2. **POST /api/revalidate** (2h)

#### D. Tester les Libs WordPress (6h estimées)
1. **client.ts** (3h) — wpFetch, getPosts
2. **transformers.ts** (3h) — transformations WP → app

### 10.3 Long Terme (3 mois)

#### A. Tests d'Intégration (16h)
1. Header + MobileMenu + LanguageSelector (4h)
2. CookieBanner + CookieModal + gtag (4h)
3. ContactForm + API + Resend (4h)
4. Landing page complète (Hero + Benefits + FAQ + CTA) (4h)

#### B. Tests de Performance (8h)
1. Lighthouse CI sur toutes les pages
2. Métriques Web Vitals (LCP, FID, CLS)
3. Tests slow 3G
4. Tests offline mode

#### C. Tests de Régression Visuelle (12h)
1. Setup Playwright screenshots
2. Baseline snapshots pour toutes les pages
3. CI/CD integration

#### D. Tests de Sécurité (8h)
1. OWASP ZAP scan automatisé
2. Tests XSS sur formulaires
3. Tests CSP headers
4. Tests rate limiting

---

## 11. Métriques Cibles

| Métrique | Actuel | Cible 1 Mois | Cible 3 Mois |
|----------|--------|--------------|--------------|
| Tests unitaires | 303 | 400 | 500 |
| Tests E2E | 28 | 50 | 80 |
| Coverage statements | ~35% | 60% | 75% |
| Coverage branches | ~25% | 50% | 65% |
| Coverage functions | ~30% | 55% | 70% |
| Coverage lines | ~35% | 60% | 75% |
| Composants testés | 20% | 60% | 85% |
| Vues testées | 0% | 70% | 100% |
| Hooks testés | 0% | 75% | 100% |
| API routes testées | 33% | 100% | 100% |

---

## 12. Script de Vérification

```bash
#!/bin/bash
# scripts/check-test-coverage.sh

echo "🧪 Running test suite..."
npm run test

echo "📊 Running coverage report..."
npm run test:coverage

echo "🎭 Running E2E tests..."
npm run test:e2e

echo "🔍 Checking for untested files..."
find src/components -name "*.tsx" | while read file; do
  test_file="src/__tests__/components/$(basename "$file" .tsx).test.tsx"
  if [ ! -f "$test_file" ]; then
    echo "❌ Missing test: $file"
  fi
done

find src/views -name "*.tsx" | while read file; do
  test_file="src/__tests__/views/$(basename "$file" .tsx).test.tsx"
  if [ ! -f "$test_file" ]; then
    echo "❌ Missing test: $file"
  fi
done

echo "✅ Test coverage check complete"
```

---

## 13. Conclusion

### Score Détaillé
- **Tests unitaires**: 7/10 (bonne qualité mais couverture partielle)
- **Tests E2E**: 6/10 (flows critiques manquants)
- **Configuration**: 8/10 (bonne config mais seuils trop bas)
- **Qualité code de test**: 7/10 (mocks propres mais tests superficiels)
- **Couverture globale**: 4/10 (beaucoup de fichiers non testés)

### Score Global: **6.5/10**

### Effort Estimé pour Atteindre 8/10
- **Court terme (2 semaines)**: 24h
- **Moyen terme (1 mois)**: 38h
- **Long terme (3 mois)**: 44h
- **Total**: ~106h (3 semaines full-time)

### Prochaines Actions Immédiates
1. ✅ Fixer HeroVariants.test.tsx (mock `m.div`)
2. ✅ Tester Reservation.tsx (flow critique)
3. ✅ Créer e2e/reservation.spec.ts
4. ✅ Tester GalleryLightbox + MobileMenu
5. ✅ Augmenter seuils coverage à 60/50/55/60

---

**Rapport généré le**: 2026-02-17
**Dernière révision**: N/A
**Prochaine révision prévue**: 2026-03-17
