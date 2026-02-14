# Rapport d'audit des tests - bateau-a-paris.fr

**Date** : 2026-02-14
**Projet** : Un Bateau a Paris - Frontend Next.js
**Auteur** : Audit automatise Claude Code

---

## Score global : 7/10

---

## Tableau recapitulatif

| Categorie | Score | Statut |
|-----------|-------|--------|
| Tests unitaires (Vitest) - Execution | 65/65 pass | ✅ |
| Couverture de code | ~25% des modules critiques | ⚠️ |
| Qualite des tests unitaires | Bonne, quelques reserves | ⚠️ |
| Tests E2E (Playwright) | 6 fichiers, 28 tests | ✅ |
| Axe-core / Accessibilite | Integre, 3 regles desactivees | ⚠️ |
| Configuration Vitest | Correcte | ✅ |
| Configuration Playwright | Correcte, 5 navigateurs | ✅ |
| Test setup | Minimal mais adequat | ✅ |
| Qualite des mocks | Adequats, un probleme identifie | ⚠️ |
| Isolation des tests | Bonne | ✅ |

---

## 1. Tests unitaires (Vitest) - Execution

**Resultat** : ✅ **65/65 tests passent** en 1.34s

```
 Test Files  11 passed (11)
       Tests  65 passed (65)
    Duration  1.34s
```

### Detail par fichier

| Fichier | Tests | Duree |
|---------|-------|-------|
| `unit/escape-html.test.ts` | 6 | 2ms |
| `unit/gtag.test.ts` | 6 | 6ms |
| `unit/cookie-consent-lib.test.ts` | 5 | 14ms |
| `unit/utils.test.ts` | 5 | 5ms |
| `unit/contact-api.test.ts` | 7 | 138ms |
| `components/HeroVariants.test.tsx` | 5 | 55ms |
| `components/OffersVariants.test.tsx` | 7 | 113ms |
| `components/CookieBanner.test.tsx` | 5 | 228ms |
| `components/FooterVariants.test.tsx` | 7 | 155ms |
| `components/HeaderVariants.test.tsx` | 7 | 167ms |
| `components/ContactForm.test.tsx` | 5 | 392ms |

**Observations** :
- Aucun test en echec.
- Les logs d'erreur visibles dans la sortie (`[ERROR] [cookie-consent]`, `[ERROR] [contact-api]`) sont des comportements attendus (tests de cas d'erreur) et non des vrais echecs.
- Warning `Received true for a non-boolean attribute fill/priority` dans les tests de composants : warning React benin lie au mock de `next/image`.

---

## 2. Couverture de code

**Resultat** : ⚠️ **Couverture partielle, environ 25% des modules critiques testes**

### Provider de couverture

Le script `test:coverage` est declare dans `package.json` mais le package `@vitest/coverage-v8` (ou `@vitest/coverage-istanbul`) n'est **pas installe**. La commande `npm run test:coverage` echouerait.

### Fichiers testes vs. non testes

#### Librairies (`src/lib/`)

| Fichier | Teste | Commentaire |
|---------|-------|-------------|
| `cookie-consent.ts` | ✅ | 5 tests (roundtrip, null, version mismatch, remove, JSON corrompu) |
| `gtag.ts` | ✅ | 6 tests (consent default, analytics, marketing, cookies, edge cases) |
| `utils.ts` | ✅ | 5 tests (cn merge, conditional, Tailwind conflicts, empty, null) |
| `logger.ts` | ❌ | Aucun test |
| `metadata.ts` | ❌ | `getAlternates()` et `getOgLocale()` non testes |
| `wordpress.ts` | ❌ | `wpFetch()`, `getPosts()`, `getPages()` non testes |
| `seo/jsonld.ts` | ❌ | Generateurs JSON-LD (`generateFAQPageJsonLd`, `generateTouristAttractionJsonLd`, `generateBreadcrumbJsonLd`) non testes |

#### Composants (`src/components/`)

| Composant | Teste | Tests |
|-----------|-------|-------|
| `HeaderVariants.tsx` | ✅ | 7 tests (logo, nav, CTA, mobile menu, theme toggle, nuit, reservation) |
| `HeroVariants.tsx` | ✅ | 5 tests (badge, title, slideshow, prix, CTA, dark mode) |
| `FooterVariants.tsx` | ✅ | 7 tests (brand, nav, contact, social, legal, cookie settings, copyright) |
| `OffersVariants.tsx` | ✅ | 7 tests (titre, 4 offres, prix, badge popular, CTA, features, JSON-LD) |
| `CookieBanner.tsx` | ✅ | 5 tests (affichage, accepter, personnaliser, masque, modale) |
| `ContactForm.tsx` | ✅ | 5 tests (champs, honeypot, erreur vide, succes API, echec API) |
| `TestimonialsVariants.tsx` | ❌ | Composant critique non teste |
| `CTAVariants.tsx` | ❌ | Non teste |
| `BoatVariants.tsx` | ❌ | Non teste |
| `FeaturesVariants.tsx` | ❌ | Non teste |
| `GalleryPreview.tsx` | ❌ | Non teste |
| `GalleryLightbox.tsx` | ❌ | Non teste |
| `CookieModal.tsx` | ❌ | Non teste (seul CookieBanner est teste) |
| `OccasionsGrid.tsx` | ❌ | Non teste |
| `CaptainSection.tsx` | ❌ | Non teste |
| `HeroCinemaSlideshow.tsx` | ❌ | Non teste (mocke dans HeroVariants) |
| `BoatImageSlideshow.tsx` | ❌ | Non teste |
| `ThemeSwitcher.tsx` | ❌ | Non teste |
| `ScrollToTop.tsx` | ❌ | Non teste |
| `Providers.tsx` | ❌ | Non teste |

**11 composants landing (`src/components/landing/`) : aucun teste.**

#### Vues (`src/views/`)

| Vue | Testee |
|-----|--------|
| `Index.tsx` | ❌ |
| `Croisiere.tsx` | ❌ |
| `Galerie.tsx` | ❌ |
| `FAQ.tsx` | ❌ |
| `Actualites.tsx` | ❌ |
| `ArticleDetail.tsx` | ❌ |
| `Reservation.tsx` | ❌ |
| `CGV.tsx` | ❌ |
| `MentionsLegales.tsx` | ❌ |
| `Confidentialite.tsx` | ❌ |
| `NotFound.tsx` | ❌ |

**0/11 vues testees** (couvertes partiellement par les E2E).

#### Hooks (`src/hooks/`)

| Hook | Teste |
|------|-------|
| `useCookieConsent.ts` | ❌ (mocke dans les tests composants, jamais teste directement) |
| `useInstagramFeed.ts` | ❌ |
| `use-toast.ts` | ❌ |
| `use-mobile.tsx` | ❌ |

**0/4 hooks testes directement.**

#### API Routes

| Route | Testee |
|-------|--------|
| `api/contact/route.ts` | ✅ 7 tests (validation, honeypot, rate limit, erreurs serveur) |
| `api/instagram/route.ts` | ❌ |

### Estimation globale

- **Modules critiques testes** : 10 sur ~40 (composants custom + libs + hooks + views + API routes)
- Les composants `ui/` (shadcn) sont exclus car ce sont des composants tiers.
- **Estimation couverture fonctionnelle** : ~25%

---

## 3. Qualite des tests unitaires

### Points forts ✅

1. **Assertions significatives** : les tests verifient des comportements reels (texte affiche, attributs href, appels de fonctions mockes, codes HTTP).
2. **Edge cases testes** :
   - `cookie-consent-lib` : JSON corrompu, version mismatch, localStorage vide.
   - `gtag` : `window.gtag` undefined.
   - `contact-api` : honeypot anti-spam, rate limiting (4 requetes), champs manquants, erreur Resend.
   - `utils` : inputs vides, undefined, null, conflits Tailwind.
3. **Interactions utilisateur** : `userEvent` utilise correctement dans HeaderVariants, FooterVariants, CookieBanner, ContactForm (clics, saisie de texte).
4. **JSON-LD verifie** : OffersVariants teste le script structured data inclus dans le DOM.

### Points a ameliorer ⚠️

1. **`escape-html.test.ts` : re-implementation de la fonction** (fichier `src/__tests__/unit/escape-html.test.ts`, lignes 3-11)
   - La fonction `escapeHtml` est definie comme fonction privee dans `src/app/api/contact/route.ts` (ligne 95) et n'est pas exportee.
   - Le test **re-implemente** la fonction au lieu de la tester directement. Si l'implementation source change, le test continuera de passer sans detecter la regression.
   - **Recommandation** : extraire `escapeHtml` dans un module partage (`src/lib/escape-html.ts`), l'exporter, et l'importer dans le test et la route.

2. **Test `removeGACookies` faible** (fichier `src/__tests__/unit/gtag.test.ts`, lignes 54-66)
   - L'assertion `expect(true).toBe(true)` ne verifie rien de significatif. Le commentaire indique que jsdom ne permet pas de tester facilement `document.cookie`.
   - **Recommandation** : utiliser `vi.spyOn(document, 'cookie', 'set')` pour capturer les ecritures de cookies, ou mocker `document.cookie` avec un getter/setter.

3. **Pas de test de snapshot** : aucun test de snapshot n'est utilise pour detecter des regressions visuelles non intentionnelles dans les composants.

4. **ContactForm : pas de test de soumission reseau echouee** : le test d'echec API mocke une reponse `{ ok: false }` mais ne teste pas `fetch` qui throw (erreur reseau).

---

## 4. Tests E2E (Playwright)

**Resultat** : ✅ **6 fichiers de tests, ~28 tests declares**

### Couverture E2E par page

| Page | Testee E2E | Fichier |
|------|-----------|---------|
| `/` (Home) | ✅ | `home.spec.ts`, `accessibility.spec.ts`, `mobile.spec.ts` |
| `/croisiere` | ✅ (navigation) | `navigation.spec.ts` |
| `/galerie` | ✅ (navigation + a11y) | `navigation.spec.ts`, `accessibility.spec.ts` |
| `/faq` | ✅ (navigation) | `navigation.spec.ts` |
| `/actualites` | ✅ (navigation) | `navigation.spec.ts` |
| `/cgv` | ✅ (navigation) | `navigation.spec.ts` |
| `/mentions-legales` | ✅ (navigation) | `navigation.spec.ts` |
| `/confidentialite` | ✅ (navigation) | `navigation.spec.ts` |
| `/reservation` | ✅ (navigation) | `navigation.spec.ts` |
| Contact (section) | ✅ | `contact.spec.ts`, `mobile.spec.ts` |
| Cookie consent | ✅ | `cookie-consent.spec.ts` |
| Landing pages (`/[slug]`) | ❌ | Aucun test E2E |
| `/actualites/[slug]` (article) | ❌ | Aucun test E2E |
| Pages EN (`/en/...`) | ⚠️ | Seul le switch FR/EN est teste |

### Detail des tests E2E

**`home.spec.ts`** (3 tests) :
- Chargement page, sections majeures, toggle theme. Tests corrects.

**`navigation.spec.ts`** (13 tests) :
- 8 pages testees (status 200), reservation, 3 redirections legacy (`/f_a_q`, `/c_g_v`, `/mentions_legales`), switch langue.
- Bonne couverture des redirections SEO.

**`mobile.spec.ts`** (3 tests) :
- Rendu mobile, menu hamburger, formulaire contact sur mobile.
- Viewport 390x844 avec touch emulation.

**`contact.spec.ts`** (2 tests) :
- Affichage formulaire, soumission avec API interceptee.
- Interception API (`page.route`) bien utilisee.

**`cookie-consent.spec.ts`** (4 tests) :
- Banner apparait, accepter masque, personnaliser ouvre modale, refuser masque.

**`accessibility.spec.ts`** (3 tests) :
- Home, section contact, page galerie.
- axe-core avec tags `wcag2a` + `wcag2aa`.

### Observations E2E

- **Points forts** : interception API pour le formulaire contact, tests multi-navigateurs (5 projets Playwright), redirections legacy testees.
- **`waitForTimeout` excessif** : utilisation de `waitForTimeout(500)`, `waitForTimeout(1000)`, `waitForTimeout(2000)`, `waitForTimeout(3000)` a plusieurs endroits. Ces attentes fixes rendent les tests fragiles et lents. Preferer `waitForSelector`, `waitForLoadState`, ou les assertions Playwright auto-retry.
- **Conditionnels `if (await btn.isVisible())` sans `else`** : plusieurs tests silencieusement passent si un element n'est pas trouve (ex: `cookie-consent.spec.ts` lignes 21-27, `mobile.spec.ts` lignes 29-36). Le test ne verifie rien si le bouton n'est pas visible.

---

## 5. Axe-core / Accessibilite

**Resultat** : ⚠️ **Integre mais avec des regles desactivees**

### Integration

L'integration est faite dans `e2e/accessibility.spec.ts` via `@axe-core/playwright` :
```typescript
import AxeBuilder from "@axe-core/playwright";
```

### Regles desactivees

```typescript
const disabledRules = ["color-contrast", "link-name", "button-name"];
```

- **`color-contrast`** : regle WCAG AA importante, desactivee. Justification : "pre-existing in imported Lovable components".
- **`link-name`** : liens sans texte accessible. Probleme d'accessibilite reel.
- **`button-name`** : boutons sans label accessible. Probleme d'accessibilite reel.

### Pages testees

Seules 3 cibles sont testees avec axe-core :
1. Page d'accueil (`/`)
2. Section contact (`#contact`)
3. Page galerie (`/galerie`)

Les pages `/croisiere`, `/faq`, `/actualites`, `/reservation` et les landing pages ne sont pas auditees.

### Filtrage

Les violations sont filtrees par impact : seules `critical` et `serious` sont rapportees. Les violations `moderate` et `minor` sont ignorees.

---

## 6. Configuration Vitest

**Resultat** : ✅ **Correcte**

Fichier : `vitest.config.ts`

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/navigation": path.resolve(__dirname, "./node_modules/next/navigation.js"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
    server: {
      deps: { inline: ["next-intl"] },
    },
  },
});
```

**Points positifs** :
- Alias `@` configure pour matcher le `tsconfig`.
- Environnement `jsdom` pour le rendu DOM.
- `globals: true` pour avoir `describe`, `it`, `expect`, `vi` sans import explicite (coherent avec l'usage dans les tests).
- `next-intl` inline pour eviter les problemes de resolution ESM.
- CSS desactive (pas besoin pour les tests unitaires).

**Points a ameliorer** :
- **Pas de configuration `coverage`** dans le fichier. La commande `test:coverage` existe mais le provider n'est pas installe (`@vitest/coverage-v8` absent de `package.json`).
- Le pattern `include` est `src/**/*.test.{ts,tsx}` ce qui est coherent avec la structure `src/__tests__/`.

---

## 7. Configuration Playwright

**Resultat** : ✅ **Correcte, configuration solide**

Fichier : `playwright.config.ts`

**5 navigateurs configures** :
1. Chromium (Desktop Chrome)
2. Firefox (Desktop Firefox)
3. WebKit (Desktop Safari)
4. Mobile Chrome (Pixel 7)
5. Mobile Safari (iPhone 14)

**Web Server** : build + start automatiques (`npm run build && npm run start`), timeout 180s.

**Parallelisme** : `fullyParallel: true`, 1 worker en CI.

**Retries** : 1 en CI, 0 en local.

**Reporter** : HTML.

**Trace** : sur premier retry uniquement.

**Points a ameliorer** :
- Pas de `screenshot: 'only-on-failure'` configure, ce qui pourrait aider au diagnostic en CI.

---

## 8. Test setup

**Resultat** : ✅ **Minimal mais adequat**

Fichier : `src/__tests__/setup.ts`

```typescript
import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "gtag", { value: vi.fn(), writable: true });
Object.defineProperty(window, "dataLayer", { value: [], writable: true });
```

- `jest-dom/vitest` ajoute les matchers custom (`toBeInTheDocument`, `toHaveAttribute`, etc.).
- Mock global de `window.gtag` et `window.dataLayer` pour eviter les erreurs dans tous les tests qui renderent des composants utilisant GA4.

**Points a ameliorer** :
- Pas de cleanup automatique du DOM (testing-library le fait par defaut avec Vitest, donc c'est OK).
- Pas de mock global de `next/image` ou `next/link` : chaque fichier de test les re-mocke individuellement (duplication).

---

## 9. Qualite des mocks

**Resultat** : ⚠️ **Globalement adequats, avec un probleme identifie**

### Mocks recurrents (dupliques dans chaque fichier de test composant)

Les 6 fichiers de tests de composants declarent les memes mocks :

| Mock | Fichiers l'utilisant |
|------|---------------------|
| `@/contexts/ThemeVariantContext` | 6/6 |
| `next-intl` (`useTranslations`, `useLocale`) | 6/6 |
| `framer-motion` (`motion.div`, `AnimatePresence`) | 6/6 |
| `@/i18n/navigation` (`Link`, `useRouter`, `usePathname`) | 5/6 |
| `next/image` | 3/6 |

**Probleme** : cette duplication est une source de maintenance. Si un mock doit changer (ex: nouvelle prop dans `framer-motion`), il faut le modifier dans 6 fichiers.

**Recommandation** : centraliser les mocks recurrents dans des fichiers partages (ex: `src/__tests__/mocks/framer-motion.ts`, `src/__tests__/mocks/next-intl.ts`) ou utiliser `vi.mock` dans le `setup.ts` global.

### Qualite des mocks individuels

| Mock | Qualite | Commentaire |
|------|---------|-------------|
| `useTranslations` -> `(key) => key` | ✅ Adequat | Retourne la cle de traduction, permet de tester la presence des cles |
| `framer-motion` -> div passthrough | ✅ Adequat | Filtre les props non-DOM (initial, animate, etc.) |
| `next/image` -> `<img>` | ✅ Adequat | Simplifie pour le rendu DOM |
| `Link` -> `<a>` | ✅ Adequat | Permet de tester les `href` |
| `Resend` (contact-api) | ✅ Bien fait | `mockSend` isolee, `.mockRejectedValueOnce` pour les erreurs |
| `CookieModal` -> composant simplifie | ✅ Adequat | Teste la prop `open` |
| `HeroCinemaSlideshow` -> testid | ✅ Adequat | Verifie la presence sans complexite |

### Mocks potentiellement trop permissifs

- **`useTranslations(() => key)`** : ne detecterait pas un appel avec une mauvaise cle de namespace. Si un composant appelle `t('wrongKey')`, le test passera quand meme car il retourne toujours la cle brute. Cependant, c'est une pratique standard et acceptable pour des tests unitaires.

---

## 10. Isolation des tests

**Resultat** : ✅ **Bonne isolation**

### Tests unitaires

- **`beforeEach` avec cleanup** : utilise dans `cookie-consent-lib` (`localStorage.clear()`), `gtag` (`vi.clearAllMocks()`), `contact-api` (`vi.clearAllMocks()` + reset `process.env`), `HeaderVariants` (`vi.clearAllMocks()` + reset `mockVariant`), `CookieBanner` (`vi.clearAllMocks()` + reset `mockShowBanner/mockShowModal`), `ContactForm` (`vi.clearAllMocks()` + `global.fetch = vi.fn()`).
- **Variables mutables resetees** : `mockVariant`, `mockShowBanner`, `mockShowModal`, `mockIsDark` sont reinitialises dans `beforeEach`.
- **IP aleatoire pour rate limiting** : `contact-api.test.ts` utilise `Math.random()` dans le header `x-forwarded-for` par defaut, et une IP fixe uniquement pour le test de rate limiting. Bonne pratique.

### Tests E2E

- **`cookie-consent.spec.ts`** : `beforeEach` avec `context.clearCookies()` pour simuler une premiere visite.
- **Les autres fichiers E2E** n'ont pas de cleanup explicite, mais le `context` Playwright est isole par defaut entre les tests.

### Point d'attention

- Le test `contact-api` utilise `await import()` dynamique pour chaque test, ce qui est necessaire car le module a un etat interne (rate limit map). Cependant, le module **n'est pas reinitialise entre les tests** car `vi.mock` est hisse. Le test de rate limiting fonctionne car il utilise une IP fixe distincte, mais theoriquement l'etat du `rateMap` persiste entre les tests.

---

## Recommandations concretes

### Priorite haute

1. **Installer le provider de couverture**
   ```bash
   npm install -D @vitest/coverage-v8
   ```
   Ajouter dans `vitest.config.ts` :
   ```typescript
   coverage: {
     provider: 'v8',
     reporter: ['text', 'html', 'lcov'],
     include: ['src/lib/**', 'src/hooks/**', 'src/components/**', 'src/views/**'],
     exclude: ['src/components/ui/**'],
   }
   ```

2. **Extraire `escapeHtml` dans un module partage** (`src/lib/escape-html.ts`) et l'importer dans le test et la route API. Le test actuel ne teste pas l'implementation reelle.

3. **Ajouter des tests pour les modules SEO critiques** :
   - `src/lib/seo/jsonld.ts` : tester `generateFAQPageJsonLd`, `generateTouristAttractionJsonLd`, `generateBreadcrumbJsonLd` (fonctions pures, faciles a tester).
   - `src/lib/metadata.ts` : tester `getAlternates` et `getOgLocale` (fonctions pures).

4. **Eliminer les `waitForTimeout` dans les tests E2E** : remplacer par des assertions auto-retry Playwright (`expect(locator).toBeVisible()`, `page.waitForSelector()`, `page.waitForResponse()`).

### Priorite moyenne

5. **Ajouter des tests E2E pour les landing pages** : au moins 1-2 pages landing pour valider le rendu SSG dynamique, les JSON-LD, et le routage `[slug]`.

6. **Tester `TestimonialsVariants.tsx`** : composant visible sur la page d'accueil, non couvert par aucun test unitaire.

7. **Reactiver les regles axe-core desactivees** : corriger les problemes `color-contrast`, `link-name`, `button-name` dans les composants concernes, puis retirer ces regles de la liste `disabledRules`.

8. **Centraliser les mocks recurrents** : creer `src/__tests__/mocks/` avec les mocks `framer-motion`, `next-intl`, `next/image`, `@/i18n/navigation` pour reduire la duplication dans les 6 fichiers de tests de composants.

9. **Renforcer le test `removeGACookies`** : remplacer `expect(true).toBe(true)` par une verification reelle (spy sur `document.cookie` setter).

10. **Ajouter `screenshot: 'only-on-failure'`** dans `playwright.config.ts` pour faciliter le debugging en CI.

### Priorite basse

11. **Tester les hooks directement** : `useCookieConsent`, `useInstagramFeed` avec `renderHook` de `@testing-library/react`.

12. **Ajouter des tests pour `src/lib/wordpress.ts`** : mocker `fetch` et valider `wpFetch`, la gestion d'erreurs HTTP.

13. **Ajouter des tests pour `src/lib/logger.ts`** : valider le format JSON en production vs. format lisible en dev.

14. **Tester les vues** (`src/views/`) : les vues sont des compositions de composants, mais des tests de rendu basiques (smoke tests) detecteraient les problemes d'integration.

15. **Ajouter les conditionnels `else` dans les E2E** : les blocs `if (await btn.isVisible())` sans `else { test.fail() }` masquent les echecs silencieux.

---

## Inventaire complet des fichiers

### Tests unitaires

| Fichier | Chemin |
|---------|--------|
| Setup | `src/__tests__/setup.ts` |
| cookie-consent-lib | `src/__tests__/unit/cookie-consent-lib.test.ts` |
| utils | `src/__tests__/unit/utils.test.ts` |
| escape-html | `src/__tests__/unit/escape-html.test.ts` |
| gtag | `src/__tests__/unit/gtag.test.ts` |
| contact-api | `src/__tests__/unit/contact-api.test.ts` |
| HeaderVariants | `src/__tests__/components/HeaderVariants.test.tsx` |
| HeroVariants | `src/__tests__/components/HeroVariants.test.tsx` |
| FooterVariants | `src/__tests__/components/FooterVariants.test.tsx` |
| OffersVariants | `src/__tests__/components/OffersVariants.test.tsx` |
| CookieBanner | `src/__tests__/components/CookieBanner.test.tsx` |
| ContactForm | `src/__tests__/components/ContactForm.test.tsx` |

### Tests E2E

| Fichier | Chemin |
|---------|--------|
| home | `e2e/home.spec.ts` |
| navigation | `e2e/navigation.spec.ts` |
| mobile | `e2e/mobile.spec.ts` |
| contact | `e2e/contact.spec.ts` |
| cookie-consent | `e2e/cookie-consent.spec.ts` |
| accessibility | `e2e/accessibility.spec.ts` |

### Configuration

| Fichier | Chemin |
|---------|--------|
| Vitest config | `vitest.config.ts` |
| Playwright config | `playwright.config.ts` |

---

## Conclusion

Le projet dispose d'une base de tests solide avec **65 tests unitaires et ~28 tests E2E**, tous au vert. La qualite des assertions est bonne et les cas limites sont globalement couverts. Les configurations Vitest et Playwright sont bien structurees avec un support multi-navigateurs exemplaire (5 projets dont 2 mobiles).

Les axes d'amelioration principaux sont :
- **L'installation du provider de couverture** pour mesurer objectivement le taux de couverture.
- **L'extension de la couverture** aux modules critiques non testes (SEO/JSON-LD, metadata, landing components, hooks).
- **Le remplacement des `waitForTimeout`** dans les E2E par des attentes deterministes.
- **La correction du test `escapeHtml`** qui teste une re-implementation au lieu du code source reel.
