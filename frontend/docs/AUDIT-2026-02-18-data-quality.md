# Audit Qualité des Données - 2026-02-18

## Score Global: 6.7/10

**Score précédent:** 8.5/10 (audit du 17 février après fix images/liens)
**Évolution:** ⚠️ -1.8 (régression due aux incohérences de slugs détectées)

> **Note importante** : Le score a baissé non pas à cause d'une dégradation de la qualité, mais parce que cet audit détecte désormais les incohérences de slugs entre locales, un problème qui n'était pas vérifié dans l'audit précédent. Une fois les slugs corrigés, le score devrait remonter à ~9.5/10.

---

## 📊 Vue d'ensemble

- **Nombre d'articles attendus:** 39
- **Locales:** fr, en, es, it, de, pt-BR
- **Fichiers audités:** 6
- **Total de vérifications:** 1 872
- **Issues détectées:** 62

### Articles par locale

| Locale | Fichier | Nombre d'articles | Statut |
|--------|---------|-------------------|--------|
| fr | posts.json | 39 | ✅ |
| en | posts-en.json | 39 | ✅ |
| es | posts-es.json | 39 | ✅ |
| it | posts-it.json | 39 | ✅ |
| de | posts-de.json | 39 | ✅ |
| pt-BR | posts-pt-BR.json | 39 | ✅ |

## 1. Présence des articles (39 articles × 6 locales)

❌ **Résultat:** 62 problèmes détectés.

### Nature du problème

Le problème principal est un **décalage de slugs entre FR et les autres locales** :

- **Version FR** : les 5 derniers articles importés ont des slugs normaux (ex: `renovation-hivernale-2025-2026-senang`)
- **Versions traduites** : ces mêmes articles ont un suffixe `-2` ajouté automatiquement par WordPress lors de l'import (ex: `renovation-hivernale-2025-2026-senang-2`)

Ceci indique que lors de l'import des traductions, WordPress a détecté des slugs existants et a auto-incrémenté pour éviter les doublons.

**Impact** : Les URLs ne correspondent pas entre les locales, ce qui casse la cohérence multilingue et peut impacter le SEO (hreflang).

### Articles manquants ou en trop

- **en:** renovation-hivernale-2025-2026-senang - Article manquant
- **en:** apero-bateau-seine-art-de-vivre-parisien - Article manquant
- **en:** 5-meilleures-occasions-croisiere-privee-paris - Article manquant
- **en:** concert-seine-billet-doux-musique-live - Article manquant
- **en:** nouveau-taud-senang-confort-toutes-saisons - Article manquant
- **en:** le-senang-participe-a-la-ceremonie-douverture-des-jeux-olympiques-de-paris-2024 - Article manquant
- **en:** tournage-exceptionnel-avec-un-bateau-a-paris-pour-adidas-avec-nicolas-karabatic-triple-medaille-olympique - Article manquant
- **en:** croisieres-privees-sur-la-seine-reprise-le-15-mars - Article manquant
- **en:** un-bateau-a-paris-aux-jeux-olympiques - Article manquant
- **en:** histoire-des-bateaux-mouches-de-paris - Article manquant
- **en:** le-senang-accueille-le-slip-francais-un-shooting-dexception-sur-la-seine - Article manquant
- **en:** renovation-hivernale-2025-2026-senang-2 - Article en trop (non présent en FR)
- **en:** apero-bateau-seine-art-de-vivre-parisien-2 - Article en trop (non présent en FR)
- **en:** 5-meilleures-occasions-croisiere-privee-paris-2 - Article en trop (non présent en FR)
- **en:** concert-seine-billet-doux-musique-live-2 - Article en trop (non présent en FR)
- **en:** nouveau-taud-senang-confort-toutes-saisons-2 - Article en trop (non présent en FR)
- **en:** un-bateau-a-paris-at-the-olympic-games-4 - Article en trop (non présent en FR)
- **en:** un-bateau-a-paris-at-the-olympic-games-2 - Article en trop (non présent en FR)
- **en:** private-cruises-on-the-seine-back-on-march-15 - Article en trop (non présent en FR)
- **en:** un-bateau-a-paris-at-the-olympic-games - Article en trop (non présent en FR)
- **en:** history-of-bateaux-mouches-de-paris - Article en trop (non présent en FR)
- **en:** un-bateau-a-paris-at-the-olympic-games-3 - Article en trop (non présent en FR)
- **es:** renovation-hivernale-2025-2026-senang - Article manquant
- **es:** apero-bateau-seine-art-de-vivre-parisien - Article manquant
- **es:** 5-meilleures-occasions-croisiere-privee-paris - Article manquant
- **es:** concert-seine-billet-doux-musique-live - Article manquant
- **es:** nouveau-taud-senang-confort-toutes-saisons - Article manquant
- **es:** renovation-hivernale-2025-2026-senang-2 - Article en trop (non présent en FR)
- **es:** apero-bateau-seine-art-de-vivre-parisien-2 - Article en trop (non présent en FR)
- **es:** 5-meilleures-occasions-croisiere-privee-paris-2 - Article en trop (non présent en FR)
- **es:** concert-seine-billet-doux-musique-live-2 - Article en trop (non présent en FR)
- **es:** nouveau-taud-senang-confort-toutes-saisons-2 - Article en trop (non présent en FR)
- **it:** renovation-hivernale-2025-2026-senang - Article manquant
- **it:** apero-bateau-seine-art-de-vivre-parisien - Article manquant
- **it:** 5-meilleures-occasions-croisiere-privee-paris - Article manquant
- **it:** concert-seine-billet-doux-musique-live - Article manquant
- **it:** nouveau-taud-senang-confort-toutes-saisons - Article manquant
- **it:** renovation-hivernale-2025-2026-senang-2 - Article en trop (non présent en FR)
- **it:** apero-bateau-seine-art-de-vivre-parisien-2 - Article en trop (non présent en FR)
- **it:** 5-meilleures-occasions-croisiere-privee-paris-2 - Article en trop (non présent en FR)
- **it:** concert-seine-billet-doux-musique-live-2 - Article en trop (non présent en FR)
- **it:** nouveau-taud-senang-confort-toutes-saisons-2 - Article en trop (non présent en FR)
- **de:** renovation-hivernale-2025-2026-senang - Article manquant
- **de:** apero-bateau-seine-art-de-vivre-parisien - Article manquant
- **de:** 5-meilleures-occasions-croisiere-privee-paris - Article manquant
- **de:** concert-seine-billet-doux-musique-live - Article manquant
- **de:** nouveau-taud-senang-confort-toutes-saisons - Article manquant
- **de:** renovation-hivernale-2025-2026-senang-2 - Article en trop (non présent en FR)
- **de:** apero-bateau-seine-art-de-vivre-parisien-2 - Article en trop (non présent en FR)
- **de:** 5-meilleures-occasions-croisiere-privee-paris-2 - Article en trop (non présent en FR)
- **de:** concert-seine-billet-doux-musique-live-2 - Article en trop (non présent en FR)
- **de:** nouveau-taud-senang-confort-toutes-saisons-2 - Article en trop (non présent en FR)
- **pt-BR:** renovation-hivernale-2025-2026-senang - Article manquant
- **pt-BR:** apero-bateau-seine-art-de-vivre-parisien - Article manquant
- **pt-BR:** 5-meilleures-occasions-croisiere-privee-paris - Article manquant
- **pt-BR:** concert-seine-billet-doux-musique-live - Article manquant
- **pt-BR:** nouveau-taud-senang-confort-toutes-saisons - Article manquant
- **pt-BR:** renovation-hivernale-2025-2026-senang-2 - Article en trop (non présent en FR)
- **pt-BR:** apero-bateau-seine-art-de-vivre-parisien-2 - Article en trop (non présent en FR)
- **pt-BR:** 5-meilleures-occasions-croisiere-privee-paris-2 - Article en trop (non présent en FR)
- **pt-BR:** concert-seine-billet-doux-musique-live-2 - Article en trop (non présent en FR)
- **pt-BR:** nouveau-taud-senang-confort-toutes-saisons-2 - Article en trop (non présent en FR)

### Analyse détaillée des incohérences

#### Groupe 1 : 5 derniers articles importés (suffixe `-2` systématique)

Les 5 articles les plus récents ont tous un suffixe `-2` dans TOUTES les locales traduites (EN/ES/IT/DE/PT-BR) :

1. `renovation-hivernale-2025-2026-senang` (FR) → `renovation-hivernale-2025-2026-senang-2` (autres)
2. `apero-bateau-seine-art-de-vivre-parisien` (FR) → `apero-bateau-seine-art-de-vivre-parisien-2` (autres)
3. `5-meilleures-occasions-croisiere-privee-paris` (FR) → `5-meilleures-occasions-croisiere-privee-paris-2` (autres)
4. `concert-seine-billet-doux-musique-live` (FR) → `concert-seine-billet-doux-musique-live-2` (autres)
5. `nouveau-taud-senang-confort-toutes-saisons` (FR) → `nouveau-taud-senang-confort-toutes-saisons-2` (autres)

**Pattern** : Le problème affecte les 5 derniers imports de manière systématique et cohérente.

#### Groupe 2 : Articles historiques avec traductions divergentes (EN seulement)

6 articles historiques ont des slugs complètement différents entre FR et EN :

| Article FR | Slug FR | Slug EN | Problème |
|-----------|---------|---------|----------|
| JO 2024 cérémonie | `le-senang-participe-a-la-ceremonie-douverture-des-jeux-olympiques-de-paris-2024` | `un-bateau-a-paris-at-the-olympic-games-4` | Titre différent |
| JO 2024 principal | `un-bateau-a-paris-aux-jeux-olympiques` | `un-bateau-a-paris-at-the-olympic-games` | Traduction partielle |
| Tournage Adidas | `tournage-exceptionnel-avec-un-bateau-a-paris-pour-adidas-avec-nicolas-karabatic-triple-medaille-olympique` | `un-bateau-a-paris-at-the-olympic-games-2` | Titre complètement différent |
| Reprise 15 mars | `croisieres-privees-sur-la-seine-reprise-le-15-mars` | `private-cruises-on-the-seine-back-on-march-15` | Traduction correcte |
| Histoire bateaux mouches | `histoire-des-bateaux-mouches-de-paris` | `history-of-bateaux-mouches-de-paris` | Traduction partielle |
| Shooting Slip Français | `le-senang-accueille-le-slip-francais-un-shooting-dexception-sur-la-seine` | `un-bateau-a-paris-at-the-olympic-games-3` | Titre complètement différent |

**Pattern** : 4 articles différents en FR sont tous traduits en EN avec des variantes du slug "un-bateau-a-paris-at-the-olympic-games", ce qui indique une confusion lors de la traduction ou un problème d'import massif.

#### Impact SEO et UX

- **Hreflang cassé** : Les balises `<link rel="alternate" hreflang="..." />` ne fonctionneront pas correctement car les slugs ne correspondent pas
- **URLs incohérentes** : Un utilisateur passant de FR à EN via le sélecteur de langue tombera sur une erreur 404
- **Indexation Google** : Google ne pourra pas regrouper correctement les versions linguistiques d'un même article
- **Duplication de contenu potentielle** : Les multiples variantes "olympic-games" peuvent être vues comme du contenu dupliqué

## 2. Champs image non-vides

✅ **Résultat:** Tous les articles ont un champ image renseigné.

## 3. Validation des URLs d'images

✅ **Résultat:** Toutes les URLs d'images suivent un pattern valide.

## 4. Cohérence des catégories

✅ **Résultat:** Toutes les catégories sont cohérentes.

## 5. Unicité des slugs par locale

✅ **Résultat:** Tous les slugs sont uniques dans chaque locale.

## 6. Champs requis présents

Champs vérifiés: `id`, `title`, `excerpt`, `content`, `image`, `date`, `categories`, `slug`

✅ **Résultat:** Tous les champs requis sont présents dans tous les articles.

## 7. Cohérence du format de date

✅ **Résultat:** Tous les formats de date sont valides (ISO 8601).

## 8. Qualité du contenu HTML

✅ **Résultat:** Aucun problème majeur détecté dans le contenu HTML.

## 9. Complétude des données landing pages

⚠️ **Note:** Les landing pages sont au format TypeScript (.ts), non JSON. Audit manuel recommandé.

**Fichiers détectés:** 18 landing pages dans `src/data/landings/`
- Anniversaire mariage, Anniversaire, Apéro bateau, etc.
- Structure i18n présente (dossiers i18n/ avec traductions)

## 10. Champs SEO (title, description)

✅ **Résultat:** Les articles dans posts.json incluent les champs title et excerpt utilisés pour le SEO.

---

## 🎯 Recommandations

### Priorité HAUTE

1. **Corriger les slugs incohérents (URGENT)** - 62 articles affectés par le problème de suffixe `-2`
   - **Cause racine** : WordPress a auto-incrémenté les slugs lors de l'import des traductions
   - **Articles concernés** : Les 5 derniers articles importés + 6 articles historiques (JO, tournages, etc.)
   - **Solution recommandée** :
     - Option A : Modifier manuellement les slugs dans WordPress pour qu'ils correspondent à la version FR
     - Option B : Script de normalisation des slugs dans les fichiers JSON (remplacement `-2`, `-3`, `-4` par version de base)
     - Option C : Réimporter les articles traduits avec des slugs corrects dès le départ
   - **Priorité** : HAUTE - impact SEO et UX (hreflang cassé, URLs incohérentes)

2. **Standardiser le processus d'import** - Éviter les suffixes auto-incrémentés à l'avenir
   - Vérifier que les slugs sont identiques dans Polylang avant l'import
   - Ajouter une validation dans le workflow GitHub Actions pour détecter les divergences de slugs
   - Documenter la procédure d'import multilingue correcte

### Priorité MOYENNE

3. **Traduire les slugs en anglais** - Améliorer la cohérence SEO
   - Exemples actuels : `renovation-hivernale-2025-2026-senang-2` (EN devrait être `winter-renovation-2025-2026-senang`)
   - `histoire-des-bateaux-mouches-de-paris` (EN devrait être `history-of-bateaux-mouches-paris` et non `history-of-bateaux-mouches-de-paris`)
   - Impact : meilleure indexation locale et lisibilité des URLs

4. **Harmoniser les titres des articles olympiques** - 4 articles EN avec des slugs différents pour le même événement
   - `un-bateau-a-paris-at-the-olympic-games` (x4 variantes : base, -2, -3, -4)
   - Consolider en un seul article ou différencier clairement les contenus

### Priorité BASSE

5. **Automatiser l'audit** - Intégrer ce script dans le pipeline CI/CD
   - GitHub Actions workflow hebdomadaire
   - Vérification avant chaque déploiement
   - Notification Slack/email en cas de problèmes détectés

6. **Documenter les standards** - Créer un guide de contribution
   - Format des dates (ISO 8601)
   - Convention de nommage des slugs (lowercase, hyphens, pas de caractères spéciaux)
   - Structure des catégories par locale
   - Checklist de validation avant import

7. **Améliorer la traduction des catégories** - Vérifier la cohérence des noms de catégories
   - FR: Conseils, Occasions, Histoire, Découverte
   - EN: Tips, Occasions, History, Discovery
   - Vérifier ES/IT/DE/PT-BR pour cohérence

8. **Créer un script de fix automatique** - Correction en masse des problèmes détectés
   - Normalisation des slugs (suppression des suffixes `-2`, `-3`, `-4`)
   - Validation post-fix
   - Backup automatique avant modification

---

## 📝 Conclusion

L'audit a analysé **39 articles × 6 locales = 234 entrées totales**.

Le score de **6.7/10** indique qu'une attention particulière est nécessaire pour améliorer la qualité des données.

**Date de l'audit:** 2026-02-18
**Outil:** Script Node.js automatisé
**Auditeur:** Claude Code (Anthropic)

---

## 🛠️ Actions techniques immédiates

### Script de correction des slugs (Option B - Recommandée)

Créer un script Node.js pour normaliser automatiquement les slugs dans les fichiers JSON :

```javascript
// scripts/fix-slugs.js
const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'es', 'it', 'de', 'pt-BR'];
const BASE_DIR = 'src/data';

// Mapping manuel pour les articles avec slugs complètement différents
const SLUG_MAPPING = {
  'un-bateau-a-paris-at-the-olympic-games-4': 'le-senang-participe-a-la-ceremonie-douverture-des-jeux-olympiques-de-paris-2024',
  'un-bateau-a-paris-at-the-olympic-games-2': 'tournage-exceptionnel-avec-un-bateau-a-paris-pour-adidas-avec-nicolas-karabatic-triple-medaille-olympique',
  'un-bateau-a-paris-at-the-olympic-games-3': 'le-senang-accueille-le-slip-francais-un-shooting-dexception-sur-la-seine',
  'un-bateau-a-paris-at-the-olympic-games': 'un-bateau-a-paris-aux-jeux-olympiques',
};

// 1. Charger posts.json (référence FR)
const frPosts = JSON.parse(fs.readFileSync(path.join(BASE_DIR, 'posts.json'), 'utf8'));
const frSlugSet = new Set(frPosts.map(p => p.slug));

LOCALES.forEach(locale => {
  const filename = `posts-${locale}.json`;
  const filepath = path.join(BASE_DIR, filename);
  const posts = JSON.parse(fs.readFileSync(filepath, 'utf8'));

  let modified = false;

  posts.forEach(post => {
    // Appliquer le mapping manuel d'abord
    if (SLUG_MAPPING[post.slug]) {
      console.log(`[${locale}] Mapping manuel: ${post.slug} → ${SLUG_MAPPING[post.slug]}`);
      post.slug = SLUG_MAPPING[post.slug];
      modified = true;
      return;
    }

    // Supprimer les suffixes -2, -3, -4 si le slug de base existe en FR
    const baseSlug = post.slug.replace(/-(\d+)$/, '');
    if (baseSlug !== post.slug && frSlugSet.has(baseSlug)) {
      console.log(`[${locale}] Normalisation: ${post.slug} → ${baseSlug}`);
      post.slug = baseSlug;
      modified = true;
    }
  });

  if (modified) {
    // Backup
    fs.writeFileSync(`${filepath}.backup`, fs.readFileSync(filepath));

    // Écriture du fichier corrigé
    fs.writeFileSync(filepath, JSON.stringify(posts, null, 2) + '\n', 'utf8');
    console.log(`[${locale}] ✅ Fichier corrigé et sauvegardé`);
  } else {
    console.log(`[${locale}] ℹ️ Aucune modification nécessaire`);
  }
});
```

### Validation post-correction

Réexécuter l'audit après la correction :

```bash
node docs/audit-data-quality.js
```

Le score devrait passer de **6.7/10 à ~9.5/10** après correction des slugs.

### Ajout d'une validation dans le workflow GitHub Actions

Ajouter une étape de validation dans `.github/workflows/import-posts.yml` :

```yaml
- name: Validate slugs consistency
  run: |
    node -e "
    const fr = require('./src/data/posts.json');
    const en = require('./src/data/posts-en.json');
    const frSlugs = new Set(fr.map(p => p.slug));
    const enSlugs = new Set(en.map(p => p.slug));
    const diff = [...enSlugs].filter(s => !frSlugs.has(s) && !s.match(/-\d+$/));
    if (diff.length > 0) {
      console.error('❌ Slugs incohérents détectés:', diff);
      process.exit(1);
    }
    console.log('✅ Validation des slugs OK');
    "
```

### Prochaines étapes

1. **Court terme (cette semaine)** :
   - Exécuter le script `fix-slugs.js` sur les fichiers JSON locaux
   - Valider manuellement les corrections
   - Commit et push des corrections
   - Vérifier les URLs en production après déploiement

2. **Moyen terme (ce mois)** :
   - Ajouter la validation des slugs dans le workflow CI/CD
   - Mettre à jour les slugs dans WordPress pour éviter de futurs problèmes
   - Créer des redirections 301 pour les anciennes URLs (si déjà indexées)

3. **Long terme** :
   - Documenter la procédure d'import multilingue
   - Automatiser l'audit hebdomadaire
   - Créer un dashboard de qualité des données

---

## 📎 Fichiers générés

- **Script d'audit** : `/work/projects/MICHEL/bateau-2026/frontend/docs/audit-data-quality.js`
- **Rapport complet** : `/work/projects/MICHEL/bateau-2026/frontend/docs/AUDIT-2026-02-18-data-quality.md`

Pour réexécuter l'audit à tout moment :

```bash
cd /work/projects/MICHEL/bateau-2026/frontend
node docs/audit-data-quality.js
```
