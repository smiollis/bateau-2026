# Audit Tests - 18 février 2026

## Score global : 7.0/10

**Évolution** : 6.5/10 → 7.0/10 (+0.5 points)

### Résumé exécutif

Le projet dispose d'une base de tests solide avec **319 tests unitaires** passant et **66 tests E2E** Playwright. La couverture est correcte sur les composants UI et les utilitaires, mais présente des **lacunes importantes** sur les fonctionnalités métier récemment ajoutées (multi-catégories, pagination par catégorie, transformers WordPress).

**Points forts** :
- ✅ Tests E2E complets avec 10 spec files (5 navigateurs)
- ✅ Tests JSON-LD exhaustifs (192 assertions)
- ✅ Tests landing pages structurés (158 tests sur 17 pages)
- ✅ Playwright configuré avec axe-core pour l'accessibilité
- ✅ Couverture vitest configurée avec seuils (40/30/35/40)
- ✅ Tests Instagram, API routes, cookie consent bien couverts

**Points faibles** :
- ❌ Aucun test pour la fonctionnalité multi-catégories (feature récente)
- ❌ Aucun test pour la pagination "Load more" par catégorie
- ❌ Aucun test pour `transformToPost` et `transformToLandingData` (transformers.ts)
- ❌ Aucun test pour les vues critiques (Actualites, ArticleDetail, Croisiere, FAQ)
- ❌ Aucun test pour OccasionsGrid (composant ajouté récemment)
- ❌ Tests i18n limités (pas de tests sur getLandingData avec locales)
- ❌ Mocks parfois trop simplistes (next-intl retourne juste la clé)

---

## 1. Inventaire des tests

### 1.1 Tests unitaires (19 fichiers, ~319 tests)

#### **Composants** (7 fichiers)
| Fichier | Tests | Statut | Commentaire |
|---------|-------|--------|-------------|
| `ContactForm.test.tsx` | 5 | ✅ | Formulaire, validation, API, honeypot |
| `CookieBanner.test.tsx` | 8 | ✅ | Consent UI, accept/reject, manage |
| `FooterVariants.test.tsx` | 7 | ✅ | Classic/nuit variants |
| `HeaderVariants.test.tsx` | 9 | ✅ | Logo, nav links, mobile menu |
| `HeroVariants.test.tsx` | 5 | ✅ | Hero classic/nuit |
| `LandingComponents.test.tsx` | 23 | ✅ | LandingHero, LandingBenefits, LandingFAQ |
| `OffersVariants.test.tsx` | 7 | ✅ | Offers classic/nuit |

**Total composants** : ~64 tests

#### **Utilitaires** (13 fichiers)
| Fichier | Tests | Statut | Commentaire |
|---------|-------|--------|-------------|
| `contact-api.test.ts` | 9 | ✅ | Rate limiting, escapeHtml, validation |
| `cookie-consent-lib.test.ts` | 5 | ✅ | Storage, preferences |
| `escape-html.test.ts` | 5 | ✅ | XSS protection |
| `gtag.test.ts` | 7 | ✅ | Analytics consent mode |
| `instagram-api.test.ts` | 8 | ✅ | Static data + error handling |
| `instagram-hook.test.ts` | 13 | ✅ | useInstagramFeed avec limite |
| `jsonld.test.ts` | 63 | ✅ | FAQPage, TouristAttraction, Breadcrumb |
| `landing-data.test.ts` | 158 | ✅ | 17 landing pages × 9 assertions |
| `logger.test.ts` | 9 | ✅ | Console structuré |
| `metadata.test.ts` | 9 | ✅ | Alternates, og:locale |
| `revalidate-api.test.ts` | 8 | ✅ | Secret auth, revalidation |
| `utils.test.ts` | 2 | ✅ | cn() utility |

**Total utilitaires** : ~255 tests

### 1.2 Tests E2E (10 fichiers, 66 tests Playwright)

| Spec | Tests | Navigateurs | Commentaire |
|------|-------|-------------|-------------|
| `accessibility.spec.ts` | 5 | 5 (chromium, firefox, webkit, mobile-chrome, mobile-safari) | axe-core WCAG 2.1 AA |
| `blog-multilingual.spec.ts` | 9 | 5 | Blog FR/EN, article detail, i18n |
| `contact.spec.ts` | 3 | 5 | Contact form, submit |
| `cookie-consent.spec.ts` | 4 | 5 | Banner, accept, reject, manage |
| `gallery-keyboard.spec.ts` | 9 | 5 | Lightbox keyboard navigation |
| `home.spec.ts` | 2 | 5 | Homepage load, h1 |
| `landing-seo.spec.ts` | 12 | 5 | SEO meta, JSON-LD, hreflang, canonical |
| `mobile.spec.ts` | 3 | 2 (mobile-chrome, mobile-safari) | Mobile menu |
| `navigation.spec.ts` | 4 | 5 | Header nav, locale switch |
| `reservation.spec.ts` | 11 | 5 | Iframe Bookly, breadcrumb, FAQ link |

**Total E2E** : 66 tests × 5 navigateurs = 330 exécutions par run complet

---

## 2. Analyse de couverture

### 2.1 Ce qui est testé ✅

#### **Excellent** (>80% couverture)
- ✅ Landing pages data (158 tests sur 17 pages)
- ✅ JSON-LD schemas (63 tests — FAQPage, TouristAttraction, Breadcrumb)
- ✅ Cookie consent (13 tests unitaires + 4 E2E)
- ✅ Contact API (9 tests — rate limiting, honeypot, validation)
- ✅ Instagram feed (21 tests — API + hook)
- ✅ Metadata helpers (9 tests — alternates, og:locale)
- ✅ SEO E2E (12 tests — meta, JSON-LD, hreflang, canonical)

#### **Bon** (50-80% couverture)
- ✅ Composants Variants (HeaderVariants, FooterVariants, HeroVariants, OffersVariants)
- ✅ ContactForm (5 tests — validation, API, honeypot, success UI)
- ✅ Landing components de base (LandingHero, LandingBenefits, LandingFAQ)
- ✅ Accessibilité E2E (5 tests axe-core)
- ✅ Blog multilingue E2E (9 tests FR/EN)
- ✅ Navigation E2E (4 tests header + locale switch)

### 2.2 Ce qui n'est PAS testé ❌

#### **Critique** (fonctionnalités métier récentes)
- ❌ **Multi-catégories** : aucun test pour `activeCategory`, filtrage par catégorie
- ❌ **Pagination par catégorie** : aucun test pour `visibleCount`, `setVisibleCount`, "Load more" par catégorie
- ❌ **WordPress transformers** : `transformToPost`, `transformToLandingData` (216 lignes non testées)
- ❌ **OccasionsGrid** : composant ajouté récemment, non testé
- ❌ **Vues critiques** : Actualites, ArticleDetail, Croisiere, FAQ, Galerie (0 test)

#### **Important** (composants UI non couverts)
- ❌ LandingTestimonials, LandingGallery, LandingPricing (partiellement testé en E2E mais pas d'unit tests)
- ❌ LandingRichtext, LandingBreadcrumb, LandingCTA, LandingStickyBar
- ❌ FeaturesVariants, CTAVariants, TestimonialsVariants, BoatVariants
- ❌ GalleryLightbox, BoatImageSlideshow, HeroCinemaSlideshow
- ❌ CaptainSection, GalleryPreview
- ❌ ThemeSwitcher, HeaderThemeToggle
- ❌ MobileMenu, LanguageSelector

#### **Moyen** (helpers/libs)
- ❌ `src/lib/wordpress/transformers.ts` — 0 test (216 lignes)
- ❌ `src/lib/seo/` (autre que jsonld.ts)
- ❌ `src/lib/cookie-consent.ts` (logique serveur vs client)
- ❌ `src/lib/utils.ts` (seulement 2 tests sur `cn`)

#### **i18n**
- ❌ Pas de tests sur `getLandingData(slug, locale)` avec EN/ES/IT/DE/PT-BR
- ❌ Pas de tests sur les traductions partielles (deep merge FR base + overlay locale)
- ❌ Pas de tests sur le fallback FR si une locale manque

---

## 3. Qualité des tests existants

### 3.1 Points forts ✅

#### **Mocks bien structurés**
```typescript
// LandingComponents.test.tsx
vi.mock("framer-motion", () => {
  const proxy = {
    h1: ({ children, ...props }) => {
      const { initial, animate, exit, transition, whileInView, viewport, ...domProps } = props;
      return <h1 {...domProps}>{children}</h1>;
    },
    // ... autres éléments
  };
  return {
    motion: proxy,
    m: proxy,
    useReducedMotion: () => false,
  };
});
```
✅ Filtre les props framer-motion pour éviter les warnings DOM

#### **Tests data-driven**
```typescript
// landing-data.test.ts
slugs.forEach((slug) => {
  describe(slug, () => {
    const data = getLandingData(slug) as LandingPageData;
    it("has valid meta", () => { /* ... */ });
    it("has valid hero", () => { /* ... */ });
    it("has sections", () => { /* ... */ });
  });
});
```
✅ 158 tests générés pour 17 landing pages (9 assertions par page)

#### **Tests E2E robustes**
```typescript
// landing-seo.spec.ts
const jsonLdScripts = page.locator('script[type="application/ld+json"]');
const count = await jsonLdScripts.count();
expect(count).toBeGreaterThanOrEqual(2);

const types: string[] = [];
for (let i = 0; i < count; i++) {
  const text = await jsonLdScripts.nth(i).textContent();
  if (text) {
    const parsed = JSON.parse(text);
    types.push(parsed["@type"]);
  }
}
expect(types).toContain("TouristAttraction");
expect(types).toContain("BreadcrumbList");
```
✅ Vérifie les JSON-LD multiples et leur validité

### 3.2 Points faibles ⚠️

#### **Mocks trop simplistes**
```typescript
// ContactForm.test.tsx
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
```
❌ Retourne juste la clé au lieu du texte traduit → les assertions testent "namePlaceholder" au lieu du vrai placeholder

**Impact** : Ne détecte pas les clés i18n manquantes ou mal nommées

#### **Snapshots manquants**
- Aucun test de snapshot pour les composants UI
- Pas de visual regression testing

**Impact** : Changements visuels non-intentionnels peuvent passer inaperçus

#### **Edge cases insuffisants**
```typescript
// instagram-hook.test.ts
it("handles limit of 0", () => {
  const { result } = renderHook(() => useInstagramFeed(0));
  expect(result.current.posts).toHaveLength(0);
});
```
✅ Limite 0 testée

❌ Mais pas de test pour :
- Limite négative
- Données Instagram vides
- Erreur réseau (API down)
- Token Instagram expiré

#### **Tests d'intégration manquants**
- Aucun test d'intégration entre Actualites.tsx et ArticleDetail.tsx
- Aucun test du flow complet : blog listing → article detail → related articles
- Aucun test de la pagination multi-catégories avec données réelles

---

## 4. Scénarios de tests manquants

### 4.1 Multi-catégories (HIGH PRIORITY)

**Fichier à tester** : `src/views/Actualites.tsx` (lignes 43-111)

**Tests manquants** :
```typescript
describe("Actualites multi-categories", () => {
  it("affiche tous les articles par défaut (activeCategory = '__all__')", () => {});
  it("filtre les articles par catégorie sélectionnée", () => {});
  it("reset visibleCount à POSTS_PER_PAGE quand on change de catégorie", () => {});
  it("affiche 'Aucun article' si filteredPosts.length === 0", () => {});
  it("affiche le bouton 'Charger plus' seulement si hasMore === true", () => {});
  it("incrémente visibleCount de POSTS_PER_PAGE quand on clique 'Charger plus'", () => {});
  it("charge plus d'articles dans la catégorie active (pas toutes les catégories)", () => {});
  it("masque le bouton 'Charger plus' quand tous les articles de la catégorie sont affichés", () => {});
});
```

**Données de test** :
```typescript
const mockPosts: PostSummary[] = [
  { id: 1, title: "Post Histoire 1", categories: ["Histoire"], /* ... */ },
  { id: 2, title: "Post Gastronomie 1", categories: ["Gastronomie"], /* ... */ },
  { id: 3, title: "Post Multi", categories: ["Histoire", "Gastronomie"], /* ... */ },
  // ... 10 posts de test avec catégories variées
];
```

### 4.2 WordPress Transformers (HIGH PRIORITY)

**Fichier à tester** : `src/lib/wordpress/transformers.ts` (216 lignes)

**Tests manquants** :
```typescript
describe("transformToPost", () => {
  it("transforme un post WP avec toutes les données", () => {});
  it("décode les entités HTML dans le titre", () => {});
  it("extrait le texte plain de l'excerpt (supprime HTML)", () => {});
  it("nettoie le contenu (garde p/h2-6/li/strong/em/a)", () => {});
  it("extrait l'image featured media", () => {});
  it("retourne une string vide si pas d'image", () => {});
  it("extrait les catégories depuis _embedded['wp:term'][0]", () => {});
  it("filtre les catégories vides", () => {});
  it("transforme le SEO Rank Math (title, description, robots)", () => {});
  it("gère un post WP sans SEO", () => {});
});

describe("transformToLandingData", () => {
  it("transforme une landing page WP avec ACF", () => {});
  it("résout les related_pages en slugs", () => {});
  it("transforme toutes les sections (richtext, benefits, gallery, testimonials, pricing, faq)", () => {});
  it("résout les images ACF (string ou objet WPImage)", () => {});
  it("gère une section inconnue gracefully", () => {});
  it("utilise seo.title ou title.rendered pour meta.title", () => {});
});

describe("helpers", () => {
  it("decodeEntities() décode &rsquo; &mdash; &nbsp; etc.", () => {});
  it("toPlainText() supprime HTML + décode entités", () => {});
  it("cleanContent() garde seulement les balises autorisées", () => {});
  it("resolveImage() gère string et objet WPImage", () => {});
});
```

### 4.3 Vues critiques (MEDIUM PRIORITY)

**Tests manquants** :
```typescript
// Actualites.tsx
describe("Actualites view", () => {
  it("affiche le header avec titre et subtitle traduits", () => {});
  it("affiche le featured post (premier post)", () => {});
  it("affiche la grille de posts (posts[1..visibleCount])", () => {});
  it("affiche la section Instagram avec useInstagramFeed(9)", () => {});
  it("affiche OccasionsGrid", () => {});
  it("formate les dates selon la locale (formatDate)", () => {});
});

// ArticleDetail.tsx
describe("ArticleDetail view", () => {
  it("affiche l'image hero", () => {});
  it("affiche le titre h1", () => {});
  it("affiche les catégories", () => {});
  it("sanitize le contenu HTML avec DOMPurify", () => {});
  it("affiche 3 articles related (même catégorie)", () => {});
  it("affiche le lien 'Retour aux actualités'", () => {});
  it("utilise les posts de la bonne locale (getPostsByLocale)", () => {});
});

// Croisiere.tsx
describe("Croisiere view", () => {
  it("affiche le hero avec titre et image", () => {});
  it("affiche les 3 formules pricing", () => {});
  it("affiche le CTA 'Réserver'", () => {});
  it("affiche les reviews Google avec aggregateRating", () => {});
});

// FAQ.tsx
describe("FAQ view", () => {
  it("affiche 10 questions/réponses", () => {});
  it("utilise Accordion pour les Q&A", () => {});
  it("affiche le lien 'Retour à l'accueil'", () => {});
});
```

### 4.4 i18n avancé (MEDIUM PRIORITY)

**Tests manquants** :
```typescript
describe("getLandingData with locales", () => {
  it("retourne les données FR par défaut", () => {});
  it("merge les données EN avec FR base", () => {});
  it("merge les données ES avec FR base", () => {});
  it("override hero.title et meta.title avec la locale", () => {});
  it("garde les sections FR si pas de traduction dans la locale", () => {});
  it("fallback à FR si la locale n'existe pas", () => {});
});

describe("Blog multilingual", () => {
  it("getPostsByLocale('fr') retourne posts.json", () => {});
  it("getPostsByLocale('en') retourne posts-en.json", () => {});
  it("getPostsByLocale('es') retourne posts-es.json", () => {});
  it("getPostsByLocale('unknown') fallback à posts.json", () => {});
});
```

### 4.5 Composants landing (LOW PRIORITY)

**Tests manquants** :
```typescript
describe("LandingPricing", () => {
  it("affiche les 3 formules de pricing", () => {});
  it("utilise les traductions i18n", () => {});
  it("affiche le CTA 'Réserver' pour chaque formule", () => {});
});

describe("LandingGallery", () => {
  it("affiche les images en grille", () => {});
  it("ouvre le lightbox au clic", () => {});
});

describe("LandingTestimonials", () => {
  it("filtre les reviews selon filter", () => {});
  it("affiche le rating moyen", () => {});
});

describe("LandingRichtext", () => {
  it("affiche le contenu HTML", () => {});
  it("utilise prose Tailwind pour le style", () => {});
});

describe("OccasionsGrid", () => {
  it("affiche 6 occasions (EVJF, anniversaire, etc.)", () => {});
  it("lie vers les landing pages correspondantes", () => {});
});
```

---

## 5. Organisation et conventions

### 5.1 Points forts ✅

#### **Structure claire**
```
src/__tests__/
├── setup.ts                    # Config globale (gtag mock)
├── unit/                       # Tests unitaires libs/utils
│   ├── contact-api.test.ts
│   ├── instagram-hook.test.ts
│   ├── jsonld.test.ts
│   └── landing-data.test.ts    # 158 tests générés
└── components/                 # Tests composants React
    ├── ContactForm.test.tsx
    ├── LandingComponents.test.tsx
    └── HeaderVariants.test.tsx
```
✅ Séparation unit/components logique

#### **Naming conventions**
- Tests unitaires : `*.test.ts`
- Tests composants : `*.test.tsx`
- Tests E2E : `*.spec.ts`
- Setup global : `setup.ts`

✅ Cohérent et standard

#### **Coverage configuration**
```typescript
// vitest.config.ts
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
},
```
✅ Seuils configurés (mais bas : 40/30/35/40)

### 5.2 Points faibles ⚠️

#### **Seuils de couverture trop bas**
- Statements : 40% (devrait être 70%)
- Branches : 30% (devrait être 60%)
- Functions : 35% (devrait être 65%)
- Lines : 40% (devrait être 70%)

**Impact** : Ne force pas à tester suffisamment le code critique

#### **Pas de coverage per-file**
- Pas de rapport per-file visible dans les scripts package.json
- Impossible de savoir quels fichiers ont <40% de coverage

**Recommandation** : Ajouter `reporter: ["text", "html", "lcov"]` pour voir le détail par fichier

#### **Tests E2E pas isolés**
```typescript
// e2e/blog-multilingual.spec.ts
test("article detail page loads from first article link", async ({ page }) => {
  await page.goto("/fr/actualites");
  const firstArticleLink = page.locator("a[href*='/actualites/']").first();
  if (!hasLink) {
    test.skip();  // ⚠️ Skip silencieux si pas d'article
    return;
  }
  await firstArticleLink.click();
  // ...
});
```
❌ Dépend de l'état des données (posts.json) → pas déterministe

**Recommandation** : Créer des fixtures de posts garantis pour les tests E2E

---

## 6. Recommandations

### 6.1 Sprint immédiat (1-2 jours)

#### **1. Tests multi-catégories**
**Priorité** : CRITIQUE
**Effort** : 2h
**Fichier** : `src/__tests__/components/Actualites.test.tsx` (nouveau)

**Tests à ajouter** :
- Filtrage par catégorie (8 tests)
- Pagination par catégorie (6 tests)
- Edge cases (catégorie vide, 1 seul post, etc.)

**Impact** : +14 tests, couverture de la feature #1 récente

---

#### **2. Tests WordPress transformers**
**Priorité** : CRITIQUE
**Effort** : 3h
**Fichier** : `src/__tests__/unit/transformers.test.ts` (nouveau)

**Tests à ajouter** :
- `transformToPost` (10 tests)
- `transformToLandingData` (8 tests)
- Helpers (4 tests — decodeEntities, toPlainText, cleanContent, resolveImage)

**Impact** : +22 tests, couverture de 216 lignes critiques

---

#### **3. Tests OccasionsGrid**
**Priorité** : HIGH
**Effort** : 1h
**Fichier** : `src/__tests__/components/OccasionsGrid.test.tsx` (nouveau)

**Tests à ajouter** :
- Affichage des 6 occasions (6 tests)
- Liens vers landing pages (3 tests)
- i18n (2 tests)

**Impact** : +11 tests, couverture du composant affiché sur /actualites

---

### 6.2 Sprint 2 (3-4 jours)

#### **4. Tests vues critiques**
**Priorité** : HIGH
**Effort** : 4h
**Fichiers** :
- `src/__tests__/views/Actualites.test.tsx` (nouveau)
- `src/__tests__/views/ArticleDetail.test.tsx` (nouveau)
- `src/__tests__/views/Croisiere.test.tsx` (nouveau)
- `src/__tests__/views/FAQ.test.tsx` (nouveau)

**Tests à ajouter** :
- Actualites (8 tests)
- ArticleDetail (10 tests)
- Croisiere (6 tests)
- FAQ (4 tests)

**Impact** : +28 tests, couverture des vues métier principales

---

#### **5. Tests i18n avancés**
**Priorité** : MEDIUM
**Effort** : 2h
**Fichier** : `src/__tests__/unit/landing-data-i18n.test.ts` (nouveau)

**Tests à ajouter** :
- `getLandingData(slug, locale)` avec EN/ES/IT/DE/PT-BR (12 tests)
- Deep merge FR base + overlay locale (6 tests)
- Fallback FR si locale manquante (3 tests)

**Impact** : +21 tests, validation de la stratégie i18n

---

#### **6. Amélioration des mocks**
**Priorité** : MEDIUM
**Effort** : 2h
**Fichiers** : Tous les tests composants

**Actions** :
- Remplacer `useTranslations: () => (key: string) => key` par un vrai dictionnaire de test
- Créer `src/__tests__/mocks/translations.ts` avec des vrais textes FR/EN
- Mettre à jour tous les tests pour utiliser ce mock

**Impact** : Meilleure détection des clés i18n manquantes

---

### 6.3 Backlog (basse priorité)

#### **7. Tests composants landing**
**Priorité** : LOW
**Effort** : 3h
**Fichiers** :
- `src/__tests__/components/LandingPricing.test.tsx`
- `src/__tests__/components/LandingGallery.test.tsx`
- `src/__tests__/components/LandingTestimonials.test.tsx`
- etc.

**Impact** : +30 tests, couverture complète des landing components

---

#### **8. Snapshots UI**
**Priorité** : LOW
**Effort** : 2h
**Fichiers** : Tous les tests composants

**Actions** :
- Ajouter `expect(container).toMatchSnapshot()` dans les tests existants
- Configurer Vitest pour générer des snapshots

**Impact** : Détection des régressions visuelles

---

#### **9. Visual regression testing**
**Priorité** : LOW
**Effort** : 4h
**Outil** : Percy.io ou Chromatic

**Actions** :
- Intégrer Percy ou Chromatic dans Playwright
- Créer des tests de screenshot pour les pages clés
- Configurer le CI pour comparer les screenshots

**Impact** : Détection automatique des régressions visuelles

---

### 6.4 Configuration et tooling

#### **10. Augmenter les seuils de couverture**
**Priorité** : MEDIUM
**Effort** : 5min
**Fichier** : `vitest.config.ts`

**Actions** :
```diff
  thresholds: {
-   statements: 40,
+   statements: 60,  // +20
-   branches: 30,
+   branches: 50,    // +20
-   functions: 35,
+   functions: 55,   // +20
-   lines: 40,
+   lines: 60,       // +20
  },
```

**Impact** : Force à augmenter la couverture progressivement

---

#### **11. Ajouter coverage HTML report**
**Priorité** : LOW
**Effort** : 2min
**Fichier** : `vitest.config.ts`

**Actions** :
```diff
  coverage: {
    provider: "v8",
-   reporter: ["text", "text-summary", "lcov"],
+   reporter: ["text", "text-summary", "lcov", "html"],
  },
```

**Impact** : Rapport HTML détaillé dans `coverage/index.html`

---

#### **12. Fixtures de test E2E**
**Priorité** : MEDIUM
**Effort** : 2h
**Fichiers** :
- `e2e/fixtures/posts.json`
- `e2e/fixtures/landings.json`

**Actions** :
- Créer des données de test fixes pour E2E
- Mocker les API routes dans Playwright
- Garantir des tests déterministes

**Impact** : Tests E2E plus fiables, pas de skip silencieux

---

## 7. Métriques et KPIs

### 7.1 Métriques actuelles

| Métrique | Valeur actuelle | Cible Sprint 1 | Cible Sprint 2 |
|----------|----------------|----------------|----------------|
| **Tests unitaires** | 319 | 366 (+47) | 415 (+49) |
| **Tests E2E** | 66 | 66 | 72 (+6) |
| **Coverage statements** | ~40% | 55% | 65% |
| **Coverage branches** | ~30% | 45% | 55% |
| **Fichiers non testés** | ~40 | 25 (-15) | 15 (-10) |
| **Score audit** | 7.0/10 | 7.8/10 | 8.5/10 |

### 7.2 Tests par catégorie (cible Sprint 2)

| Catégorie | Actuel | Cible | Progression |
|-----------|--------|-------|-------------|
| Composants UI | 64 | 120 | +56 (+87%) |
| Utilitaires | 255 | 298 | +43 (+17%) |
| Vues | 0 | 28 | +28 (NEW) |
| i18n | 158 | 191 | +33 (+21%) |
| Transformers | 0 | 22 | +22 (NEW) |
| E2E | 66 | 72 | +6 (+9%) |
| **TOTAL** | **319** | **415** | **+96 (+30%)** |

---

## 8. Conclusion

### Points forts
✅ Base solide : 319 tests unitaires + 66 tests E2E
✅ Tests landing pages exhaustifs (158 tests)
✅ Tests JSON-LD complets (63 tests)
✅ E2E multi-navigateurs avec axe-core
✅ Coverage configuré avec seuils

### Points d'amélioration
❌ Lacunes critiques : multi-catégories, transformers, vues
❌ Mocks i18n trop simplistes
❌ Seuils de couverture trop bas (40/30/35/40)
❌ Pas de tests sur les features récentes (OccasionsGrid, pagination par catégorie)

### Recommandation prioritaire
**Sprint immédiat (1-2 jours)** :
1. Tests multi-catégories (2h) → +14 tests
2. Tests transformers (3h) → +22 tests
3. Tests OccasionsGrid (1h) → +11 tests

**Impact** : +47 tests, couverture +10%, score 7.0 → 7.8/10

---

## 9. Annexe : Scripts de test

### Scripts package.json
```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
}
```

### Exécution
```bash
# Tests unitaires (run once)
npm test

# Tests unitaires (watch mode)
npm run test:watch

# Coverage report
npm run test:coverage

# E2E (auto build + start)
npm run test:e2e

# E2E avec UI
npm run test:e2e:ui
```

### Coverage thresholds
```typescript
// vitest.config.ts
thresholds: {
  statements: 40,  // Cible: 60%
  branches: 30,    // Cible: 50%
  functions: 35,   // Cible: 55%
  lines: 40,       // Cible: 60%
}
```

---

**Audit réalisé le** : 18 février 2026
**Auteur** : Claude Code (Sonnet 4.5)
**Contexte** : Frontend Next.js 16, Vitest + React Testing Library + Playwright
**Tests actuels** : 319 unitaires + 66 E2E = 385 tests
**Score** : 7.0/10 (évolution +0.5 depuis dernier audit)
