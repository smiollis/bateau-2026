# Release 0.17.0 — 19 fevrier 2026

## Audit SEO approfondi + Sprint correctif P0/P1/P2

Audit SEO en 5 agents specialises (Technical SEO, Content/On-page, Performance, International, Crawlability) revelant un score de 7.2/10. Sprint correctif de 12 actions prioritaires P0/P1/P2, portant le score a ~9.0/10.

---

### P0 — Corrections critiques (3/3)

- **Header navigation** : remplacement des `<button onClick={router.push}>` par des `<Link href>` dans HeaderVariants + MobileMenu — les liens principaux sont desormais decouverts par les crawlers
- **Blog slugs cross-locale** : creation de `slug-map.json` (39 articles x 6 locales), `getBlogAlternates()` dans metadata.ts, `generateStaticParams` par locale — 70 URLs en 404 corrigees
- **Boilerplate articles** : nettoyage de 30 articles (blocs CTA commerciaux + liens admin.bateau-a-paris.fr supprimes) via `clean-boilerplate.mjs`

### P1 — Ameliorations importantes (5/5)

- **Breadcrumbs** : ajout sur 5 pages principales (croisiere, galerie, faq, actualites, article detail) + schema BreadcrumbList JSON-LD
- **og:locale:alternate** : ajout sur les 12 pages avec `generateMetadata` via `getOgAlternateLocales()` (script bulk)
- **Hreflang sitemap** : `alternates.languages` ajoute aux 3 types d'entrees (statiques, articles, landings) dans `sitemap.ts`
- **WebSite + Organization JSON-LD** : ajoutes dans root layout (SearchAction, sameAs Instagram/Facebook, contactPoint)
- **Footer + OccasionsGrid** : lien `/reservation` dans le footer, 5 landings manquantes ajoutees dans la grille occasions (+ traductions 6 locales)

### P2 — Optimisations (4/6)

- **Liens internes** : 160 articles mis a jour (31 articles x ~5 locales) avec 2-3 liens internes vers /croisiere, /reservation, landings pertinentes via `add-internal-links.mjs`
- **Heading hierarchy** : H3 → H2 dans CaptainSection et ArticleDetail (conformite SEO)
- **404/Erreur localisees** : nouveau `not-found.tsx` sous `[locale]` + `error.tsx` mis a jour, traductions `notFound` + `error` dans 6 langues
- **robots.txt** : `/api/` bloque pour les crawlers

### Scripts crees

| Script | Description |
|--------|-------------|
| `scripts/clean-boilerplate.mjs` | Suppression blocs CTA boilerplate dans posts*.json |
| `scripts/add-internal-links.mjs` | Ajout liens internes dans 31 articles x 6 locales |
| `scripts/add-og-alternate.mjs` | Ajout og:locale:alternate dans 12 page.tsx |
| `scripts/add-occasion-translations.mjs` | Ajout 5 traductions occasions x 6 locales |
| `scripts/add-error-translations.mjs` | Ajout traductions notFound + error x 6 locales |

### Fichiers modifies

- `src/lib/metadata.ts` — `getBlogAlternates()`, `getOgAlternateLocales()`
- `src/app/sitemap.ts` — hreflang sur 3 entry types, import slug-map
- `src/app/layout.tsx` — WebSite + Organization JSON-LD
- `src/app/[locale]/not-found.tsx` — NOUVEAU (404 localisee)
- `src/app/[locale]/error.tsx` — traductions i18n
- `src/app/[locale]/actualites/[slug]/page.tsx` — breadcrumbs + getBlogAlternates
- `src/app/[locale]/croisiere/page.tsx` — breadcrumbs
- `src/app/[locale]/galerie/page.tsx` — breadcrumbs
- `src/app/[locale]/faq/page.tsx` — breadcrumbs
- `src/app/[locale]/actualites/page.tsx` — breadcrumbs
- `src/app/robots.ts` — disallow /api/
- `src/components/HeaderVariants.tsx` — button → Link
- `src/components/FooterVariants.tsx` — lien /reservation
- `src/components/OccasionsGrid.tsx` — 5 landings ajoutees
- `src/components/CaptainSection.tsx` — H3 → H2
- `src/views/ArticleDetail.tsx` — H3 → H2
- 6 `messages/*.json` — traductions occasions + notFound + error
- 6 `posts*.json` — boilerplate nettoye + liens internes ajoutes
- `src/data/slug-map.json` — mapping slugs cross-locale
- 12 `page.tsx` — og:locale:alternate

### Build & Tests

- 356 pages statiques generees
- 319/319 tests unitaires verts
- Score audit SEO : 7.2/10 → ~9.0/10 (+1.8)
