# Plan d'optimisation BDD WordPress — bateau-a-paris.fr

## Contexte

Base de données WordPress de 96,9 Mo (export SQL 55 Mo) contenant 197 tables avec un prefixe `9Ju5UF_`. La BDD accumule des tables et donnees de plugins inutilises (WooCommerce, CookieYes, Complianz) et du bloat significatif (Wordfence scan 22 Mo, CleanTalk 5 Mo, revisions, spam Flamingo). Objectif : reduire la taille, ameliorer les performances et preparer une base saine pour la migration vers le nouveau front Next.js.

**Decisions prises** :
- Flamingo : garder les 6 derniers mois, purger le reste
- Elementor : conserve (encore utilise cote WP)
- Smash Balloon Instagram / CTF : suppression post-migration
- Wordfence : actif mais tables de scan videes (TRUNCATE)
- Yoast -> Rank Math : migration avant suppression
- WPML : conserve (articles + Bookly)

---

## Etat des lieux — Repartition par poids (96,9 Mo)

| Categorie | Taille | % BDD |
|-----------|--------|-------|
| Core WP (posts, postmeta, options, users...) | ~46 Mo | 47% |
| Wordfence (wf*) | ~26 Mo | 27% |
| CleanTalk | ~5 Mo | 5% |
| WPML (icl_*) | ~5 Mo | 5% |
| ShortPixel | ~3.3 Mo | 3% |
| Complianz (cmplz_*) | ~1.6 Mo | 2% |
| Yoast (yoast_*) | ~1.1 Mo | 1% |
| Bookly | ~2 Mo | 2% |
| WooCommerce (wc_*, woocommerce_*) | ~1.2 Mo | 1% |
| Autres (SBI, WP Rocket, CookieYes, etc.) | ~5.7 Mo | 6% |

---

## Resume de l'impact estime

| Phase | Action | Gain estime |
|-------|--------|-------------|
| Phase 2 | Nettoyage core (revisions, trash, spam, transients) | ~8-10 Mo |
| Phase 3 | TRUNCATE (Wordfence scan, ActionScheduler, Bookly logs) | ~25 Mo |
| Phase 4 | DROP tables (WooCommerce, CookieYes, Complianz, Yoast, orphelines) | ~4 Mo |
| Phase 5 | POST-MIGRATION (CleanTalk, Wordfence, SBI, WP Rocket) | ~30 Mo |
| Phase 6 | OPTIMIZE tables | Recuperation espace fragmentee |
| **Total immediat (Phases 2-4)** | | **~37-39 Mo** |
| **Total post-migration (Phase 5)** | | **~30 Mo supp.** |
| **BDD finale estimee** | | **~25-30 Mo** (vs 96,9 Mo) |

---

## Ordre d'execution

Voir le fichier `optimisation-bdd.sql` pour le script detaille a executer via phpMyAdmin ou en ligne de commande.

### Pre-requis (cote admin WP, AVANT le SQL)

1. **Backup** : export complet BDD (deja fait : `wp_ojn9a.sql`)
2. **Installer Rank Math** et lancer l'assistant de migration Yoast -> Rank Math
3. **Verifier** que les meta SEO sont bien reprises sur quelques articles
4. **Desactiver + supprimer les plugins** via l'admin WP :
   - WooCommerce
   - CookieYes
   - Complianz
   - Yoast SEO (APRES migration Rank Math confirmee)
   - WP File Manager (si plus utilise)
5. **Activer le mode maintenance** pendant l'execution du script SQL

### Execution SQL

Executer `optimisation-bdd.sql` via phpMyAdmin (onglet SQL) ou en CLI :
```bash
mysql -u USER -p NOM_BDD < optimisation-bdd.sql
```

### Post-execution

1. Desactiver le mode maintenance
2. Verifier le fonctionnement du site (voir checklist ci-dessous)
3. Ajouter dans `wp-config.php` :
   ```php
   define('WP_POST_REVISIONS', 3);
   define('AUTOSAVE_INTERVAL', 300);
   ```
4. Exporter la BDD nettoyee comme nouveau point de reference

---

## Tables conservees (post-migration finale)

| Plugin | Tables | Raison |
|--------|--------|--------|
| Core WP | posts, postmeta, options, users, usermeta, terms, termmeta, term_taxonomy, term_relationships, comments, commentmeta, links | Core WordPress |
| WPML | 17 tables icl_* | Traductions articles + Bookly |
| Bookly | 35 tables bookly_* | Systeme de reservation |
| Rank Math | 2 tables rank_math_* | SEO articles |
| ShortPixel | 5 tables shortpixel_* | Optimisation images |
| TrustIndex | 2 tables trustindex_* | Avis Google |
| Elementor | e_events (peut etre supprimee) | Page builder actif |

---

## Checklist de verification

- [ ] Le site WordPress s'affiche correctement
- [ ] Les reservations Bookly fonctionnent
- [ ] Les articles (FR + traductions WPML) sont accessibles
- [ ] L'admin WP est reactive
- [ ] L'API REST WordPress repond correctement (utilise par le front Next.js)
- [ ] Rank Math affiche les meta SEO correctement sur les articles
- [ ] Nouveau export BDD < 30 Mo
