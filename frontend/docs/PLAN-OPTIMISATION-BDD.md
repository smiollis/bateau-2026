# Plan d'optimisation BDD WordPress — admin.bateau-a-paris.fr

## Contexte

Base de donnees WordPress initialement de 96,9 Mo (export SQL 55 Mo) contenant 197 tables avec un prefixe `9Ju5UF_`. La BDD accumulait des tables et donnees de plugins inutilises (WooCommerce, CookieYes, Complianz) et du bloat significatif (Wordfence scan 22 Mo, CleanTalk 5 Mo, revisions, spam Flamingo).

**Objectif** : reduire la taille, ameliorer les performances et preparer une base saine pour le WP headless (API REST pour le front Next.js sur Vercel).

**Decisions prises** :
- Flamingo : garder les 6 derniers mois, purger le reste
- Elementor : conserve (encore utilise cote WP)
- Smash Balloon Instagram / CTF : supprime (post-migration)
- Wordfence : supprime (inutile sur le WP headless, securite geree par Plesk)
- CleanTalk : supprime (idem)
- WP Rocket : supprime (caching gere par Vercel/Next.js)
- Yoast -> Rank Math : migration effectuee, Yoast supprime
- WPML : conserve (articles + Bookly)
- ShortPixel : supprime (optimisation images deja faite)

---

## Resultat final

| Metrique | Initial | Apres Phases 2-4 | Apres Phases 5-6 |
|----------|---------|-------------------|-------------------|
| **Taille BDD** | 96,9 Mo | 25,4 Mo | **21,0 Mo** |
| **Nombre de tables** | 197 | 99 | **88** |
| **Reduction totale** | — | -74% | **-78%** |

---

## Historique d'execution

### Phase 2 : Nettoyage core WordPress (~8-10 Mo) — FAIT

- Suppression revisions (484), trash (159), auto-drafts
- Flamingo : purge > 6 mois
- Postmeta et term_relationships orphelins
- Edit locks, transients expires

### Phase 3 : TRUNCATE tables de plugins (~25 Mo) — FAIT

- Wordfence : 11 tables de scan videes
- ActionScheduler : taches terminees purgees
- Bookly logs : vides

### Phase 4 : DROP tables plugins inutiles (~4 Mo) — FAIT

- WooCommerce : 34 tables + options/postmeta
- CookieYes : 3 tables + options
- Complianz : 5 tables + options
- Yoast SEO : 6 tables + meta/options (apres migration Rank Math)
- Elementor e_events, tables orphelines Porto, WP File Manager

### Phase 5 : POST-MIGRATION (~4,4 Mo restants) — FAIT (2026-02-17)

Tables supprimees sur `admin.bateau-a-paris.fr` (BDD `wp_clone`) :

- **WP Rocket** : 7 tables (wpr_above_the_fold, wpr_lazy_render_content, wpr_rocket_cache, wpr_rucss_used_css, wpr_performance_monitoring, wpr_preconnect_external_domains, wpr_preload_fonts) + options
- **ActionScheduler** : 4 tables (actions, logs, claims, groups) + options
- CleanTalk, Wordfence, Smash Balloon/CTF, ShortPixel : deja supprimes lors des phases precedentes

### Phase 6 : OPTIMIZE tables — FAIT (2026-02-17)

OPTIMIZE (recreate + analyze InnoDB) execute sur 11 tables principales :
posts, postmeta, options, usermeta, term_relationships, termmeta, comments, commentmeta, icl_strings, icl_string_translations, icl_translation_status

---

## Top 10 tables actuelles (21 Mo)

| Table | Taille | Lignes |
|-------|--------|--------|
| postmeta | 5,36 Mo | 15 905 |
| icl_translate | 3,61 Mo | 2 641 |
| options | 2,63 Mo | 1 021 |
| icl_translation_status | 2,55 Mo | 331 |
| posts | 1,80 Mo | 997 |
| icl_strings | 0,83 Mo | 1 332 |
| icl_languages_translations | 0,38 Mo | 4 225 |
| icl_translations | 0,31 Mo | 866 |
| bookly_payments | 0,25 Mo | 153 |
| usermeta | 0,23 Mo | 406 |

---

## Tables conservees (88 tables)

| Plugin | Tables | Raison |
|--------|--------|--------|
| Core WP | posts, postmeta, options, users, usermeta, terms, termmeta, term_taxonomy, term_relationships, comments, commentmeta, links | Core WordPress |
| WPML | 17 tables icl_* | Traductions articles + Bookly |
| Bookly | 35 tables bookly_* | Systeme de reservation |
| Rank Math | 2 tables rank_math_* | SEO articles |
| TrustIndex | 2 tables trustindex_* | Avis Google |

---

## Configuration wp-config.php

```php
define('WP_POST_REVISIONS', 3);
define('AUTOSAVE_INTERVAL', 300);
```

---

## Backups

| Date | Fichier | Taille |
|------|---------|--------|
| 2026-02-14 | `wp_ojn9a.sql` (BDD originale) | 55 Mo |
| 2026-02-17 | `/var/www/vhosts/old-wp.bateau-a-paris.fr/wp_ojn9a_backup_20260217.sql` (avant migration domaine) | 53 Mo |
| 2026-02-17 | `/var/www/vhosts/admin.bateau-a-paris.fr/wp_clone_backup_20260217.sql` (avant Phase 5) | 9,7 Mo |

---

## Checklist de verification

- [x] Le site WordPress admin s'affiche correctement
- [x] Les articles (FR + traductions WPML) sont accessibles via API REST
- [x] L'API REST WordPress repond correctement (utilise par le front Next.js)
- [x] Rank Math affiche les meta SEO correctement
- [x] BDD finale : 21 Mo (objectif 25-30 Mo atteint)
- [ ] Les reservations Bookly fonctionnent (a verifier manuellement)
