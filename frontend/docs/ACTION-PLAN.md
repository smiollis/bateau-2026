# Plan d'Action Post-Audit — bateau-a-paris.fr

**Date** : 19 fevrier 2026
**Score initial** : 8.1/10 (17 fev)
**Score post-Sprint 1** : 8.6/10 (17 fev soir)
**Score 18 fev** : 8.5/10 (data-quality plus strict)
**Score actuel** : 9.0/10 (19 fev — audit SEO approfondi + sprint correctif P0/P1/P2)
**Objectif Sprint 3** : 9.5/10

---

## Session 2026-02-19 ✅ TERMINE

> Audit SEO approfondi (5 agents) → 20 actions priorisees → P0 + P1 + P2 implementes

### P0 — CRITIQUE (3/3)
- [x] ~~Header nav : `<button>` → `<Link>` dans HeaderVariants + MobileMenu~~ (liens decouverts par crawlers)
- [x] ~~Blog slugs cross-locale : slug-map.json + getBlogAlternates + generateStaticParams per locale~~ (70 URLs 404 corrigees)
- [x] ~~Boilerplate duplique : nettoyage 30 articles (CTA blocks + liens admin.bateau-a-paris.fr)~~

### P1 — IMPORTANT (5/5)
- [x] ~~Breadcrumbs + BreadcrumbList schema sur 5 pages~~ (croisiere, galerie, faq, actualites, article detail)
- [x] ~~og:locale:alternate sur les 12 pages~~ (script bulk add-og-alternate.mjs)
- [x] ~~Hreflang alternates dans sitemap.xml~~ (3 entry types : static, articles, landings)
- [x] ~~WebSite + Organization JSON-LD dans root layout~~ (SearchAction, sameAs, contactPoint)
- [x] ~~/reservation dans footer + 5 landings manquantes dans OccasionsGrid~~ (+ 5 traductions x 6 locales)

### P2 — AMELIORATION (4/6)
- [x] ~~Liens internes dans 31 articles~~ (160 updates across 6 locales, add-internal-links.mjs)
- [x] ~~Heading hierarchy H3 → H2~~ (CaptainSection + ArticleDetail)
- [x] ~~Pages 404/erreur localisees~~ (not-found.tsx + error.tsx + traductions 6 locales)
- [x] ~~/api/ bloque dans robots.txt~~
- [ ] Enrichir 19 articles "Pont de Paris" (thin content) — delegue agence SEO
- [ ] Ameliorer alt texts galerie — backlog

### Resultats
- Build : 356 pages OK
- Tests : 319/319 verts
- Score audit SEO : 7.2/10 → ~9.0/10 (+1.8)

---

## Session 2026-02-18 ✅ TERMINE

> 39 articles x 6 locales, images fixees, load more par categorie

- [x] ~~Importer 3 articles Histoire dans 6 locales~~ (merge-histoire-articles.ts)
- [x] ~~Corriger 8 images manquantes~~ (assign-images.ts, mapping WP media)
- [x] ~~Fix load more par categorie~~ (Actualites.tsx hasMore + reset visibleCount)
- [x] ~~Fix JSON syntax articles-histoire-de.json~~ (3 guillemets non echappes)
- [x] ~~Copier image renovation → public/images/blog/~~ (1.3 MB PNG)
- [x] ~~Audit complet 12 agents paralleles~~ (score 8.5/10)

---

## Deja fait (sessions precedentes)

- [x] ~~118 images manquantes articles traduits~~ (fix:images slug matching)
- [x] ~~54 URLs admin hardcodees dans content/excerpt~~ (fix:links)
- [x] ~~Boutons blancs sur fond blanc~~ (bg-transparent)
- [x] ~~Liens occasions en double dans Tarifs~~ (suppression section)
- [x] ~~Qualite image hero article~~ (quality=85)
- [x] ~~OG image WhatsApp 404~~ (og-image.jpg)
- [x] ~~Texte gras invisible mode nuit~~ (prose-invert + couleurs)

---

## Sprint 1 ✅ TERMINE (17 fev 2026)

> 6 agents en parallele + LazyMotion
> **Resultat** : Score 8.1 → 8.6 (+0.5)

- [x] ~~CI/CD Securisation~~ (permissions, timeout, concurrency)
- [x] ~~SEO JSON-LD + Metadata~~ (priceRange, aggregateRating, OG fallback)
- [x] ~~Accessibilite WCAG~~ (useReducedMotion, scroll-behavior)
- [x] ~~i18n Hardcoded Strings~~ (ArticleDetail, LandingBreadcrumb, StickyBar)
- [x] ~~TypeScript Cleanup~~ (DOMPurify, CGV, sonner supprime)
- [x] ~~LazyMotion strict~~ (29 composants, -20 KB)
- [x] ~~LandingPricing i18n~~ (24 cles x 6 locales)
- [x] ~~Tests fix~~ (319/319 verts)
- [x] ~~Server Components migration~~ (LandingRichtext, Breadcrumb, Benefits)
- [x] ~~Tests E2E~~ (66 tests Playwright)
- [x] ~~Rate limiting WP plugin~~ (v2.2.0)

---

## Sprint 2 — En Cours

> **Impact cible** : Score 9.0 → 9.5 (+0.5)

### 2.1 Headers CSP ⭐ Priorite haute
**Source** : Audit Securite 18/02 | **Effort** : 2h
- Configurer Content-Security-Policy dans next.config.ts
- Bloquer scripts inline, limiter sources images/fonts
- Ajouter X-Content-Type-Options, Referrer-Policy

### 2.2 Traduire les categories par locale ⭐ Priorite haute
**Source** : Audit i18n + Data Quality 18/02 | **Effort** : 2h
- "Histoire" → "History"/"Historia"/"Storia"/"Geschichte"/"Historia"
- Idem pour "Actualites", "Decouverte", "Pont de Paris"
- Mettre a jour les 6 fichiers posts*.json via script

### 2.3 JSON-LD Article sur pages articles
**Source** : Audit SEO 18/02 | **Effort** : 1h
- Schema.org Article (headline, datePublished, image, author, publisher)
- Generer dans layout article via generateMetadata

### 2.4 Focus states composants
**Source** : Audit Accessibilite | **Effort** : 2h
- `focus-visible:ring-2 focus-visible:ring-primary` sur elements interactifs
- Skip-to-content link en haut de page

### 2.5 Optimiser images /public/images/
**Source** : Audit Performance | **Effort** : 1h
- Convertir renovation-hivernale-senang.png (1.3 MB) en WebP
- Verifier les autres images > 200KB

### 2.6 Tokeniser couleurs hex nuit
**Source** : Audit UX/Design | **Effort** : 1.5h
- Remplacer `#0a1628` etc. par tokens CSS `--nuit-*`

---

## Sprint 3 — Gros Chantiers

> **Impact** : Score 9.0 → 9.5 (+0.5)

### 3.1 Tests multi-category + load more
**Source** : Audit Tests 18/02 | **Effort** : 4h
- Tests filtre categorie, bouton load more, reset compteur
- Tests articles Histoire dans donnees
- Objectif : couverture 40% → 55%

### 3.2 Localiser les slugs des 8 nouveaux articles
**Source** : Audit Data Quality 18/02 | **Effort** : 4h
- Les slugs FR dans les fichiers locales degradent le SEO multilingue
- Creer un script de generation slugs localises
- Mettre a jour generateStaticParams

### 3.3 Push featured images vers WordPress
**Source** : Audit WordPress 18/02 | **Effort** : 4h
- Ameliorer push-articles-wp.ts pour upload media + set featured image
- Automatiser le pipeline de publication complet

### 3.4 Tests vues critiques
**Source** : Audit Tests | **Effort** : 12h
- Reservation.tsx, GalleryLightbox, MobileMenu
- CookieProvider, LanguageSelector

---

## Backlog (priorite basse)

- [ ] Creer 11 images OG landing pages Tier 2/3
- [ ] Activer Dependabot (`.github/dependabot.yml`)
- [ ] Ajouter workflow CodeQL
- [ ] Hook `useScrollToAnchor` (DRY 3 duplications)
- [ ] Valider 3 assertions `as` avec Zod
- [ ] Decomposer Actualites.tsx (336 lignes → 3 composants)
- [ ] Ajouter placeholders blur sur images
- [ ] Unifier 2 composants Breadcrumb
- [ ] Notifications echec GitHub Actions (Slack/email)
- [ ] Ajouter `push:articles` dans package.json scripts
- [ ] Mettre a jour packages patch (`npm update`)

---

## Resume

| Phase | Items | Effort | Score | Statut |
|-------|-------|--------|-------|--------|
| ~~Fixes initiaux~~ | 7 fixes | 1h | → 8.1 | ✅ |
| ~~Sprint 1~~ | 11 chantiers | ~6h | 8.1 → 8.6 | ✅ |
| ~~Session 18 fev~~ | 6 corrections | ~2h | 8.6 → 8.5* | ✅ |
| ~~Session 19 fev (SEO)~~ | 12 actions P0/P1/P2 | ~8h | 8.5 → 9.0 | ✅ |
| Sprint 2 | 6 chantiers | 10h | 9.0 → 9.5 | A faire |
| Sprint 3 | 4 gros items | 24h | 9.5 → 9.8 | A faire |
| Backlog | 11 items | 15h | 9.8+ | A faire |

*Score data-quality plus strict (detection slugs non localises)
