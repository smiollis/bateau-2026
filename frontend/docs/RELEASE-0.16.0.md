# Release 0.16.0 — 18 fevrier 2026

## Articles Blog + Fix Images + Load More + Audit

### Nouveaux contenus
- **3 articles Histoire** importes dans les 6 locales (39 articles total)
  - "Histoire de la navigation sur la Seine"
  - "La Seine, artere de Paris : 2000 ans d'histoire"
  - "Du Senang aux peniches parisiennes"
- **5 categories actives** : Actualites, Decouverte, Histoire, Pont de Paris, Actualites Un Bateau a Paris

### Corrections
- **8 images corrigees** — plus aucun article sans visuel (mapping WP media + 1 image locale)
- **Load more par categorie** — le bouton "Charger plus" s'affiche dans toutes les categories (pas seulement "Toutes")
- **Reset compteur** au changement de categorie (evite de voir des articles de la categorie precedente)
- **JSON syntax fix** — 3 guillemets non echappes corriges dans articles-histoire-de.json

### Scripts utilitaires
- `scripts/merge-histoire-articles.ts` — Import 3 articles Histoire dans les 6 posts*.json
- `scripts/assign-images.ts` — Attribution d'images aux 8 articles sans visuel

### Audit complet (12 agents paralleles)
- **Score global** : 8.5/10
- 12 audits specialises : securite, SEO, performance, accessibilite, i18n, TypeScript, tests, data quality, dependencies, CI/CD, UX/design, WordPress
- Rapport consolide : `docs/AUDIT-2026-02-18-CONSOLIDATED.md`
- Plan d'action mis a jour : `docs/ACTION-PLAN.md`

### Build & Tests
- 356 pages statiques generees
- 319/319 tests unitaires verts
- 66 tests E2E existants
