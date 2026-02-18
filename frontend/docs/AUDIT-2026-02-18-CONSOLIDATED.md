# Audit Consolide — Un Bateau a Paris (Frontend)

**Date** : 18 fevrier 2026
**Auditeur Lead** : Claude Code (Opus 4.6)
**Perimetre** : Frontend Next.js 16 + WordPress Headless
**Methode** : 12 audits specialises paralleles

---

## Score Global : 8.5/10

**Score precedent** : 8.6/10 (17 fev 2026, post-Sprint 1)
**Score actuel** : 8.5/10 (18 fev 2026)

**Moyenne ponderee** avec securite et SEO comptant double :
```
(2x8.5 + 2x8.8 + 8.8 + 8.8 + 9.2 + 9.2 + 7.0 + 6.7 + 8.5 + 8.8 + 8.7 + 8.5) / 14 = 8.48 ≈ 8.5/10
```

> **Note** : Le score data-quality (6.7) baisse car l'audit detecte desormais les incoherences de slugs entre locales (les 3 articles Histoire + 5 articles recents gardent le slug FR dans toutes les locales). Ce n'etait pas verifie precedemment. La qualite reelle du projet s'est amelioree (images fixees, 3 nouveaux articles, load more per category).

---

## Tableau Recapitulatif

| # | Domaine | 17 fev (S1) | 18 fev | Δ | Statut |
|---|---------|-------------|--------|---|--------|
| 1 | Securite ⚠️ | 9.0 | **8.5** | -0.5 | Tres bon (CSP a ajouter) |
| 2 | SEO ⚠️ | 9.0 | **8.8** | -0.2 | Excellent (JSON-LD Article manquant) |
| 3 | Performance | 8.5 | **8.8** | +0.3 | Excellent (LazyMotion, SSG 356 pages) |
| 4 | Accessibilite | 8.5 | **8.8** | +0.3 | Excellent (motion preferences OK) |
| 5 | i18n | 9.5 | **9.2** | -0.3 | Excellent (categories non traduites) |
| 6 | TypeScript | 9.0 | **9.2** | +0.2 | Excellent (strict mode, types complets) |
| 7 | Tests | 6.5 | **7.0** | +0.5 | Correct (319 tests, couverture partielle) |
| 8 | Data Quality | 8.5 | **6.7** | -1.8 | A ameliorer (slugs non localises) |
| 9 | Dependencies | 9.0 | **8.5** | -0.5 | Tres bon (14 vulns devDep) |
| 10 | CI/CD | 8.5 | **8.8** | +0.3 | Excellent (4 workflows) |
| 11 | UX/Design | 8.5 | **8.7** | +0.2 | Excellent (load more per category) |
| 12 | WordPress | 7.5 | **8.5** | +1.0 | Tres bon (push script ameliore) |

**Legende** : ⚠️ = ponderation double

---

## Changements depuis le 17 fevrier

### Ameliorations realisees (session 18 fev)
1. **+3 articles Histoire** importes dans les 6 locales (39 articles total)
2. **8 images corrigees** — plus aucun article sans visuel
3. **Load more par categorie** — fonctionne dans toutes les categories
4. **Reset du compteur** au changement de categorie
5. **JSON syntax fix** — articles-histoire-de.json corrige (3 guillemets)

### Nouvelles observations
1. **CSP headers absents** — securite degradee vs standard moderne
2. **Slugs non localises** — les 8 nouveaux articles gardent les slugs FR dans toutes les locales
3. **Categories non traduites** — "Histoire", "Actualites" en francais dans toutes les locales
4. **JSON-LD Article manquant** — les articles n'ont pas de schema Article
5. **PNG 1.3 MB** — renovation-hivernale-senang.png non optimise

---

## Top 10 Actions Prioritaires

Classees par impact/effort (ROI maximal) :

### 1. Ajouter les headers CSP
**Domaine** : Securite | **Impact** : Haut | **Effort** : Moyen
- Configurer Content-Security-Policy dans next.config.ts ou middleware
- Bloquer les scripts inline non autorises, limiter les sources

### 2. Traduire les categories dans chaque locale
**Domaine** : i18n + Data Quality | **Impact** : Haut | **Effort** : Moyen
- "Histoire" → "History" (en), "Historia" (es), "Storia" (it), "Geschichte" (de), "Historia" (pt-BR)
- Idem pour "Actualites", "Decouverte", "Pont de Paris"
- Mettre a jour les 6 fichiers posts*.json + le filtre dans Actualites.tsx

### 3. Ajouter JSON-LD Article sur les pages articles
**Domaine** : SEO | **Impact** : Haut | **Effort** : Faible
- Schema.org Article avec headline, datePublished, image, author, publisher
- Generer dans le layout article ou via generateMetadata

### 4. Optimiser le PNG 1.3 MB
**Domaine** : Performance | **Impact** : Moyen | **Effort** : Faible
- Convertir renovation-hivernale-senang.png en WebP (~200 KB)
- Ou laisser Next Image optimizer au runtime (acceptable)

### 5. Localiser les slugs des 8 nouveaux articles
**Domaine** : Data Quality + SEO | **Impact** : Moyen | **Effort** : Moyen
- Les slugs FR dans les fichiers locales cassent le SEO multilingue
- Generer des slugs localises ou utiliser un mapping slug-locale

### 6. Ecrire tests pour multi-category et load more
**Domaine** : Tests | **Impact** : Moyen | **Effort** : Moyen
- Tester le filtre par categorie + affichage du bouton load more
- Tester le reset au changement de categorie
- Tester les articles Histoire dans les donnees

### 7. Ajouter push:articles dans package.json scripts
**Domaine** : WordPress | **Impact** : Faible | **Effort** : Faible
- `"push:articles": "tsx scripts/push-articles-wp.ts"` manquant
- Documenter le workflow de publication

### 8. Mettre a jour les packages patch
**Domaine** : Dependencies | **Impact** : Faible | **Effort** : Faible
- `npm update` pour framer-motion, next-intl, react, tailwind-merge

### 9. Ajouter skip-to-content link
**Domaine** : Accessibilite | **Impact** : Moyen | **Effort** : Faible
- Lien invisible en haut de page pour navigation clavier

### 10. Ajouter tests E2E pour le blog
**Domaine** : Tests | **Impact** : Moyen | **Effort** : Moyen
- Navigation /actualites → filtre categorie → article detail
- Verifier les images, le load more, le back button

---

## Scores par Domaine (detail)

### Securite : 8.5/10
Points forts : DOMPurify, API routes protegees, pas de secrets exposes
A ameliorer : CSP headers, rate limiting API, HSTS preload

### SEO : 8.8/10
Points forts : Sitemap complet, hreflang, OG tags, TouristTrip JSON-LD
A ameliorer : JSON-LD Article, breadcrumbs, categories structurees

### Performance : 8.8/10
Points forts : SSG 356 pages, LazyMotion, Next Image optimization
A ameliorer : PNG 1.3 MB, client JSON imports, font subsetting

### Accessibilite : 8.8/10
Points forts : useReducedMotion, boutons semantiques, alt texts
A ameliorer : Skip-to-content, focus management post-load-more

### i18n : 9.2/10
Points forts : 6 locales completes, next-intl, formatage dates
A ameliorer : Categories traduites, slugs localises

### TypeScript : 9.2/10
Points forts : Strict mode, interfaces completes, pas de `any`
A ameliorer : Scripts utilitaires peu types (merge, assign)

### Tests : 7.0/10
Points forts : 319 tests, 19 fichiers, vitest + RTL + Playwright
A ameliorer : Couverture multi-category, load more, E2E blog

### Data Quality : 6.7/10
Points forts : 39 articles x 6 locales, images completes, SEO fields
A ameliorer : Slugs FR dans toutes les locales, categories non traduites

### Dependencies : 8.5/10
Points forts : Stack moderne, pas de deps inutilisees, bundle correct
A ameliorer : 14 vulns devDep (@lhci/cli), patches disponibles

### CI/CD : 8.8/10
Points forts : 4 workflows GitHub Actions, Lighthouse CI, Playwright
A ameliorer : Cache build, parallelisation, notifications

### UX/Design : 8.7/10
Points forts : Load more per category, themes coherents, responsive
A ameliorer : Breadcrumbs, empty states, feedback load more

### WordPress : 8.5/10
Points forts : REST API client robuste, transformers complets, ISR
A ameliorer : Push featured images, Polylang automation, webhooks
