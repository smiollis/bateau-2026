# Audit Complet - bateau-a-paris.fr

**Date** : 2026-02-14
**Auditeur** : Claude Opus 4.6 (10 agents paralleles)
**Stack** : Next.js 16.1.6 + React 19 + TypeScript strict + Tailwind CSS v4 + next-intl 4
**Perimetre** : Frontend (`/work/projects/MICHEL/bateau-2026/frontend/`)

---

## Score Global : 7.5 / 10

---

## Tableau de synthese

| # | Dimension | Score | Statut | Rapport |
|---|-----------|-------|--------|---------|
| 1 | Securite | 8/10 | OK | [security.md](./security.md) |
| 2 | Performance | 7.5/10 | Attention | [performance.md](./performance.md) |
| 3 | SEO | 8/10 | OK | [SEO.md](./SEO.md) |
| 4 | Accessibilite | 7.5/10 | Attention | [Accessibilite.md](./Accessibilite.md) |
| 5 | Qualite code | 7.5/10 | Attention | [code-quality.md](./code-quality.md) |
| 6 | Tests | 7/10 | Attention | [tests.md](./tests.md) |
| 7 | TypeScript / Build | 8/10 | OK | [typescript-build.md](./typescript-build.md) |
| 8 | i18n | 6/10 | Critique | [i18n.md](./i18n.md) |
| 9 | Images / Assets | 7/10 | Attention | [images-assets.md](./images-assets.md) |
| 10 | Architecture | 7.5/10 | Attention | [architecture.md](./architecture.md) |

---

## Points forts du projet

1. **Build impeccable** : 0 erreur TypeScript, compilation Turbopack ~1.7s, 65/65 tests unitaires OK
2. **Securite solide** : CSP 12 directives, 5 headers, DOMPurify, Zod + honeypot + rate limiting sur le formulaire
3. **SEO technique complet** : metadata traduite sur 100% des pages, 7 schemas JSON-LD, sitemap dynamique, canonical + hreflang
4. **Zero console.log** : logger structure (`lib/logger.ts`) utilise systematiquement partout
5. **Landing pages exemplaires** : architecture SSG data/UI separee, registry pattern, 17 pages avec JSON-LD
6. **Cookie consent RGPD** : Google Consent Mode v2, 31 regions EU, granularite 3 categories
7. **Variables d'env** : separation client/serveur exemplaire (10/10)
8. **Messages i18n** : 228 cles, 19 namespaces, 6 langues, 0 cle manquante

---

## Top 10 des problemes critiques

### 1. Images OG manquantes (SEO / Images)
- L'image OG par defaut (`/images/hero/bateau-a-paris-seine-01.jpg`) n'existe pas
- Le dossier `public/images/landings/` est vide (6 references cassees)
- **Impact** : partages sociaux casses sur toutes les pages
- **Effort** : Faible

### 2. i18n : 5 vues 100% hardcodees en francais (i18n)
- FAQ, CGV, Mentions Legales, Confidentialite, Croisiere (landmarks) = ~130 textes non traduits
- Les visiteurs ES/IT/DE/PT-BR voient du francais partout sur ces pages
- **Impact** : Experience utilisateur brisee pour 4 langues
- **Effort** : Moyen-eleve

### 3. 17 landing pages sans traduction (i18n)
- Architecture `LandingPageData` 100% francais, aucun mecanisme i18n
- 85 URLs (5 langues x 17 pages) servent du contenu francais
- **Impact** : SEO multilingue compromis
- **Effort** : Eleve

### 4. Aucun `prefers-reduced-motion` (Accessibilite)
- 165+ animations Framer Motion sans gestion reduced-motion
- Ken Burns hero + gallery scroll infini = risque de nausees
- **Impact** : Non-conformite WCAG 2.3.1 (A)
- **Effort** : Moyen

### 5. Contrastes insuffisants (Accessibilite)
- Gold sur blanc (~2.8:1) < seuil 4.5:1
- Copyright footer (~3.8:1 classic, ~2.8:1 nuit)
- Regle `color-contrast` desactivee dans les tests axe-core
- **Impact** : Non-conformite WCAG 1.4.3 (AA)
- **Effort** : Faible

### 6. ~290 KB de dependances npm inutilisees (Performance / Code)
- recharts (~200kB), react-day-picker, cmdk, vaul, embla-carousel, etc.
- ~39 composants shadcn/ui + Radix packages non utilises
- **Impact** : npm install plus lent, risque de faux positifs securite
- **Effort** : Faible

### 7. 901 lignes de code mort (Qualite code)
- 8 composants "base" (Hero, Header, Footer, etc.) remplaces par les Variants
- Aucun import dans le code de production
- **Impact** : Maintenance, confusion
- **Effort** : Faible

### 8. `motion.img` bypasse `next/image` sur le hero (Performance / Images)
- `HeroCinemaSlideshow.tsx` utilise `motion.img` = pas d'AVIF, pas de srcset
- Image hero = element LCP de la page d'accueil
- **Impact** : LCP degrade
- **Effort** : Moyen

### 9. Couverture tests ~25% (Tests)
- 10/40 modules critiques testes
- 0/11 vues, 0/4 hooks, 0/11 composants landing testes
- Provider `@vitest/coverage-v8` non installe
- **Impact** : Regressions non detectees
- **Effort** : Moyen-eleve

### 10. Header/Footer dupliques dans 10 vues (Architecture)
- Au lieu d'etre dans `[locale]/layout.tsx`
- Modification du layout global = 10 fichiers a toucher
- **Impact** : Maintenabilite
- **Effort** : Moyen

---

## Plan d'action prioritise

### Sprint 1 - Quick wins (effort faible, impact fort)

| # | Action | Dimension | Fichiers |
|---|--------|-----------|----------|
| 1 | Creer/corriger l'image OG globale (1200x630px) | SEO | `layout.tsx`, `public/images/hero/` |
| 2 | Creer les 6 images OG landing Tier 1 | SEO | `public/images/landings/` |
| 3 | Ajouter header HSTS | Securite | `next.config.ts` |
| 4 | Assombrir le gold pour contraste AA | Accessibilite | `globals.css` |
| 5 | Supprimer les 8 composants base (901 lignes) | Code | `src/components/` |
| 6 | Supprimer la page `/test` | Securite/SEO | `src/app/[locale]/test/` |
| 7 | Ajouter DOMPurify dans `LandingRichtext.tsx` | Securite | `src/components/landing/` |
| 8 | Ne pas afficher `error.message` dans `global-error.tsx` | Securite | `src/app/global-error.tsx` |
| 9 | Corriger `formatDate` pour 6 locales | i18n | `Actualites.tsx`, `ArticleDetail.tsx` |
| 10 | Supprimer les packages npm inutilises | Performance | `package.json` |

### Sprint 2 - Ameliorations structurelles (effort moyen)

| # | Action | Dimension |
|---|--------|-----------|
| 11 | Implementer `prefers-reduced-motion` (Framer Motion `useReducedMotion`) | Accessibilite |
| 12 | Focus trap + Escape dans le cookie modal | Accessibilite |
| 13 | Migrer Header/Footer dans `[locale]/layout.tsx` | Architecture |
| 14 | Convertir vues statiques en server components | Architecture |
| 15 | Wrapper `motion.img` avec `motion.create(Image)` pour hero | Performance |
| 16 | Ajouter `placeholder="blur"` sur images statiques | Images |
| 17 | Installer `@vitest/coverage-v8` + configurer seuils | Tests |
| 18 | Extraire `escapeHtml` dans `src/lib/` (DRY + testabilite) | Code |
| 19 | Ajouter `noUncheckedIndexedAccess` dans tsconfig | TypeScript |
| 20 | Reactiver les regles axe-core desactivees | Accessibilite |

### Sprint 3 - i18n et contenus (effort eleve)

| # | Action | Dimension |
|---|--------|-----------|
| 21 | Traduire FAQ, CGV, Mentions, Confidentialite | i18n |
| 22 | Implementer l'i18n des landing pages | i18n |
| 23 | Ajouter articles blog ES/IT/DE/PT-BR | i18n |
| 24 | Corriger accents PT-BR dans messages | i18n |
| 25 | Traduire JSON-LD (FAQ, LocalBusiness, Breadcrumbs) | SEO/i18n |

### Sprint 4 - Qualite long terme

| # | Action | Dimension |
|---|--------|-----------|
| 26 | Etendre couverture tests (landing, hooks, vues, jsonld) | Tests |
| 27 | Decomposer composants monolithiques (Header 289L, Croisiere 335L) | Code |
| 28 | Nettoyer ~39 composants shadcn/ui inutilises | Code |
| 29 | Supprimer fichiers images inutilises (~1.2 MB) | Images |
| 30 | Ajouter apple-touch-icon + web manifest | Images |

---

## Score par rapport a l'audit precedent

| Dimension | AUDIT 2026-02-12 | AUDIT 2026-02-14 | Evolution |
|-----------|------------------|-------------------|-----------|
| Build + TypeScript | OK | 8/10 | = |
| Tests | 65/65 + 28/28 | 7/10 (couverture ~25%) | Analyse approfondie |
| SEO | 10/10 | 8/10 (images OG manquantes) | Nouveau probleme identifie |
| Securite | 5/5 headers | 8/10 (HSTS manquant) | Analyse approfondie |
| Accessibilite | WCAG AA substantiel | 7.5/10 (reduced-motion, contrastes) | Analyse approfondie |
| Images | 100% next/image | 7/10 (3 motion.img, 0 blur placeholder) | Analyse approfondie |
| Performance | AVIF + code split | 7.5/10 (bundle, animations hero) | Analyse approfondie |
| i18n | - | 6/10 (contenu hardcode) | Nouvelle dimension |
| Architecture | - | 7.5/10 (couplage Header/Footer) | Nouvelle dimension |
| Code qualite | - | 7.5/10 (dead code, DRY) | Nouvelle dimension |

**Le score passe de 9/10 (audit superficiel) a 7.5/10 (audit approfondi 10 dimensions).**
La baisse reflete une analyse beaucoup plus detaillee, pas une regression du code.

---

## Projection : score apres Sprint 1

Si les 10 quick wins du Sprint 1 sont implementes :

| Dimension | Actuel | Projete |
|-----------|--------|---------|
| Securite | 8 | 9 |
| SEO | 8 | 9.5 |
| Accessibilite | 7.5 | 8 |
| Qualite code | 7.5 | 8.5 |
| i18n | 6 | 6.5 |
| **Global** | **7.5** | **~8** |

---

*Rapport compile le 2026-02-14 a partir de 10 audits specialises (securite, performance, SEO, accessibilite, qualite code, tests, TypeScript/build, i18n, images/assets, architecture).*
