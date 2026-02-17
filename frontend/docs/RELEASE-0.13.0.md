# Release 0.13.0 — Data Pipeline + Automatisation + Liens contextuels

> Date : 2026-02-17

---

## Data Pipeline (JSON-only)

- **Architecture simplifiee** : suppression des appels API WP au runtime. Les pages `/actualites` et `/actualites/[slug]` utilisent exclusivement les fichiers JSON statiques
- **Import multilingue** : `import-posts.ts` etendu a 6 locales (FR, EN, ES, IT, DE, PT-BR) via parametre Polylang `?lang=`
- **Fichiers generes** : `posts.json`, `posts-en.json`, `posts-es.json`, `posts-it.json`, `posts-de.json`, `posts-pt-BR.json`

## GitHub Actions (3 workflows)

| Workflow | Declencheur | Fonction |
|----------|-------------|----------|
| `import-posts.yml` | Bouton WP + cron hebdo (dim 04:00) | Import articles WP → JSON → commit → Vercel rebuild |
| `import-reviews.yml` | Cron hebdo (lun 06:00) | Import avis Google Places → reviews.json |
| `refresh-instagram.yml` | Cron bimensuel (1er/15) | Refresh token Instagram + import posts + images |

## Bouton WordPress "Publier sur le site"

- **Plugin** `bateau-headless-mode` v2.0.0 → v2.1.0
- Nouveau bouton dans la barre admin WP : declenche `repository_dispatch` GitHub
- Feedback visuel (spinner, check vert/rouge)
- Notification admin avec timestamp derniere synchro
- Remplace l'ancien webhook automatique `save_post` (evite rebuilds pendant la redaction)
- Necessite `BATEAU_GITHUB_TOKEN` + `BATEAU_GITHUB_REPO` dans `wp-config.php`

## Liens contextuels Landing Pages

- **Croisiere** : ajout grille `OccasionsGrid` (12 occasions)
- **Tarifs** : ajout liens vers 4 landing pages + lien "Toutes nos occasions"
- **Blog (detail article)** : ajout 6 liens vers landing pages
- **i18n** : 7 nouvelles cles traduites dans 6 langues

## Lighthouse CI

- 3 landing pages ajoutees aux audits (1 par tier) : evjf-seine, team-building-seine, saint-valentin-seine

## ROADMAP

- Nouveau chantier backlog : "Centralisation contenu dans WordPress" (landing pages, tarifs, i18n, FAQ)

## Secrets GitHub configures

- `NEXT_PUBLIC_WP_API_URL`, `GOOGLE_PLACES_API_KEY`, `INSTAGRAM_ACCESS_TOKEN`, `GH_PAT`
