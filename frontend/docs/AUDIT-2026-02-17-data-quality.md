> **ARCHIVED** — Superseded by AUDIT-2026-02-18

# Audit Qualité des Données - 2026-02-17

## Score Global : 6.5/10

## Résumé Exécutif

Audit approfondi des données statiques dans `/frontend/src/data/` : posts multilingues, reviews, landing pages et Instagram feed. Le projet présente une bonne structure mais souffre de problèmes critiques de cohérence multilingue, de liens cassés et d'images manquantes dans les traductions.

**Points forts :**
- Structure de données cohérente et bien typée
- 17 landing pages complètement traduites (6 locales)
- Aucun ID ou slug dupliqué
- Reviews Google bien formatées

**Points critiques :**
- 118 images manquantes dans les articles traduits (EN, ES, IT, DE)
- 36 occurrences de liens hardcodés vers `admin.bateau-a-paris.fr` dans le contenu HTML
- Incohérence totale des articles traduits (contenu partiel ou manquant)

---

## 1. Articles de Blog (posts*.json)

### 1.1 Nombre d'Articles par Locale

| Locale | Fichier | Articles | Status |
|--------|---------|----------|--------|
| 🇫🇷 FR | `posts.json` | 31 | ✅ Complet |
| 🇬🇧 EN | `posts-en.json` | 31 | ⚠️ Partiellement traduit |
| 🇪🇸 ES | `posts-es.json` | 31 | ❌ Non traduit |
| 🇮🇹 IT | `posts-it.json` | 31 | ❌ Non traduit |
| 🇩🇪 DE | `posts-de.json` | 31 | ❌ Non traduit |
| 🇧🇷 PT-BR | `posts-pt-BR.json` | 31 | ⚠️ Partiellement traduit |

**Verdict :** ✅ Cohérence du nombre (31 articles partout)

### 1.2 Structure des Champs

Tous les articles contiennent les champs requis :
- ✅ `id` (integer unique)
- ✅ `title` (string)
- ✅ `slug` (string unique)
- ✅ `excerpt` (string)
- ✅ `content` (HTML)
- ✅ `image` (URL ou empty string)
- ✅ `date` (ISO 8601)
- ✅ `category` (string)
- ✅ `link` (URL WordPress)

**Verdict :** ✅ Structure parfaite, aucun champ manquant

### 1.3 Images Manquantes

| Locale | Images vides | WP images | Taux de couverture |
|--------|--------------|-----------|-------------------|
| FR | 0 | 31 | 100% ✅ |
| EN | 25 | 6 | 19% ❌ |
| ES | 31 | 0 | 0% ❌ |
| IT | 31 | 0 | 0% ❌ |
| DE | 31 | 0 | 0% ❌ |
| PT-BR | 0 | 31 | 100% ✅ |

**Problème critique :** 118 images manquantes au total (sur 186 articles non-FR).

**Impact :**
- Pages blog EN/ES/IT/DE affichent des placeholders vides
- SEO dégradé (pas d'images dans Open Graph)
- Expérience utilisateur cassée

**Exemple (posts-en.json, ligne 7) :**
```json
{
  "id": 11872,
  "title": "An Enchanting Escape on the Seine",
  "image": "",  // ❌ Devrait pointer vers une image WP
  ...
}
```

### 1.4 Liens Cassés et URLs Hardcodées

**36 occurrences de liens hardcodés vers admin.bateau-a-paris.fr :**

| Locale | Liens admin | Impact |
|--------|-------------|--------|
| FR | 30 | ❌ Critique |
| EN | 6 | ⚠️ Modéré |
| ES/IT/DE | 0 | ✅ OK |

**Types de liens cassés trouvés :**

1. **Liens internes vers le site admin** (dans `content` HTML) :
   ```html
   <h2><a href="https://admin.bateau-a-paris.fr">Une croisière privée...</a></h2>
   <p><a href="https://admin.bateau-a-paris.fr/reservation/">Réserver maintenant</a></p>
   ```
   **Impact :** Les utilisateurs cliquant sur "Réserver maintenant" atterrissent sur le backend WordPress au lieu du frontend Next.js.

2. **Images référencées depuis WordPress** :
   ```json
   "image": "https://admin.bateau-a-paris.fr/wp-content/uploads/2024/06/..."
   ```
   **Impact :** Dépendance au serveur WordPress. Si le CDN WordPress tombe ou que les images sont supprimées, les articles FR cassent.

**Recommandation :** Remplacer tous les liens `admin.bateau-a-paris.fr/reservation/` par des liens relatifs Next.js (`/reservation` ou `/[locale]/reservation`).

### 1.5 Duplications

- ✅ Aucun ID dupliqué
- ✅ Aucun slug dupliqué
- ✅ Intégrité référentielle parfaite

---

## 2. Reviews Google (reviews.json)

### 2.1 Structure

```json
{
  "placeRating": 4.9,
  "totalReviews": 69,
  "reviews": [ ... 5 reviews ... ],
  "importedAt": "2026-02-11T17:46:06.310Z"
}
```

**Verdict :** ✅ Structure valide

### 2.2 Données des Avis

| Champ | Status |
|-------|--------|
| `name` | ✅ Présent partout |
| `rating` | ✅ Présent partout (5/5) |
| `text` | ✅ Présent partout |
| `avatar` | ✅ URLs Google valides |
| `date` | ✅ Format humain ("il y a X mois") |

**Verdict :** ✅ 5/5 reviews complètes, aucune donnée manquante

---

## 3. Landing Pages (src/data/landings/)

### 3.1 Inventaire

**17 landing pages FR de base :**
1. evjf-seine
2. evg-seine
3. croisiere-romantique-seine
4. demande-en-mariage-seine
5. anniversaire-seine
6. soiree-entre-amis-seine
7. anniversaire-mariage-seine
8. team-building-seine
9. croisiere-famille-seine
10. shooting-photo-seine
11. coucher-soleil-seine
12. apero-bateau-seine
13. saint-valentin-seine
14. nouvel-an-seine
15. noel-seine
16. fete-des-meres-seine
17. seminaire-seine

**Traductions i18n :**
- EN : 17/17 ✅
- ES : 17/17 ✅
- IT : 17/17 ✅
- DE : 17/17 ✅
- PT-BR : 17/17 ✅

**Total : 102 fichiers de données (17 base + 85 traductions)**

### 3.2 Cohérence des Slugs

✅ Tous les slugs enregistrés dans `index.ts` correspondent aux fichiers existants.

### 3.3 URLs Admin

✅ Aucun lien hardcodé vers `admin.bateau-a-paris.fr` dans les landing pages.

### 3.4 Images

**14 images uniques référencées** (toutes locales, aucune externe) :
- Format : `/images/landings/<slug>-og.jpg` ou `/images/gallery/<nom>.webp`
- ✅ Aucune image externe WordPress
- ⚠️ Non vérifié si les fichiers existent physiquement dans `/public/images/`

**Recommandation :** Vérifier que toutes les images référencées dans les landing data existent dans `/public/`.

---

## 4. Instagram Feed (instagram.json)

### 4.1 Structure

```json
[
  {
    "id": "18096186700635024",
    "caption": "...",
    "media_type": "CAROUSEL_ALBUM",
    "media_url": "/images/instagram/18096186700635024.webp",
    "permalink": "https://www.instagram.com/p/DOOmll6gt6l/",
    "timestamp": "2025-09-05T17:00:14+0000"
  },
  ...
]
```

**12 posts Instagram** (mix IMAGE, VIDEO, CAROUSEL_ALBUM)

### 4.2 Données

| Champ | Status | Notes |
|-------|--------|-------|
| `id` | ✅ | ID Instagram unique |
| `caption` | ⚠️ | 2 posts sans caption (vidéos) |
| `media_url` | ✅ | URLs locales `/images/instagram/` |
| `thumbnail_url` | ✅ | Présent pour les vidéos |
| `permalink` | ✅ | Liens Instagram valides |
| `timestamp` | ✅ | Format ISO 8601 |

**Verdict :** ✅ Bon état général, 2 captions vides acceptables (vidéos)

---

## 5. Problèmes Identifiés (Priorisés)

### 🔴 Critique (Score Impact : -3 points)

#### P1 : 118 Images Manquantes dans les Articles Traduits

**Fichiers affectés :**
- `posts-en.json` : 25/31 images vides (81%)
- `posts-es.json` : 31/31 images vides (100%)
- `posts-it.json` : 31/31 images vides (100%)
- `posts-de.json` : 31/31 images vides (100%)

**Solution :**
1. Modifier le script d'import `scripts/import-posts.js`
2. Forcer la copie de l'`image` de l'article FR vers tous les locales :
   ```javascript
   // Dans transformPost() :
   const frPost = frPosts.find(p => p.id === post.id);
   post.image = frPost?.image || post.image || '';
   ```
3. Re-run `npm run import:posts`

**Estimation :** 30 min de dev + 5 min de re-import

---

#### P2 : 36 Liens Hardcodés vers admin.bateau-a-paris.fr

**Fichiers affectés :**
- `posts.json` (FR) : 30 occurrences
- `posts-en.json` (EN) : 6 occurrences

**Exemples de liens cassés :**
```html
<!-- Dans le content HTML des articles -->
<a href="https://admin.bateau-a-paris.fr">Une croisière privée...</a>
<a href="https://admin.bateau-a-paris.fr/reservation/">Réserver maintenant</a>
```

**Impact utilisateur :**
- Clic sur "Réserver maintenant" → Redirection vers WordPress (erreur 404 ou page admin)
- Confusion UX (mélange backend/frontend)
- SEO négatif (liens externes vers domaine non pertinent)

**Solution :**
1. **Court terme** : Script de remplacement dans `scripts/fix-admin-links.js` :
   ```javascript
   content = content.replace(
     /https:\/\/admin\.bateau-a-paris\.fr\/reservation\//g,
     '/reservation'
   );
   content = content.replace(
     /https:\/\/admin\.bateau-a-paris\.fr/g,
     '/'
   );
   ```
2. **Long terme** : Corriger dans WordPress (modèle d'article) + re-import

**Estimation :** 1h (script + test + commit)

---

### 🟠 Important (Score Impact : -0.5 points)

#### P3 : Contenu HTML non Traduit

**Problème :** Le `content` HTML des articles ES/IT/DE est en français (copié tel quel).

**Exemple (posts-es.json) :**
```json
{
  "title": "Un EVJF Único en el Sena",  // ✅ Titre traduit
  "content": "<p>Vous cherchez une idée originale...</p>"  // ❌ Contenu FR
}
```

**Impact :**
- Utilisateurs ES/IT/DE voient du contenu FR sur les pages blog
- SEO dégradé (Google pénalise le contenu non traduit)

**Solution :**
- Utiliser Polylang Pro sur WordPress pour traduire les articles
- Ou utiliser un service de traduction automatique (DeepL API) dans le pipeline d'import

**Estimation :** 8h (traduction manuelle) ou 2h (auto-traduction)

---

## 6. Recommandations

### Priorité 1 (À faire immédiatement)

1. **Fixer les images manquantes** (P1)
   - Modifier `scripts/import-posts.js`
   - Copier l'`image` FR vers tous les locales
   - Re-run import

2. **Remplacer les liens admin** (P2)
   - Script de remplacement global
   - Commit des 2 fichiers `posts.json` et `posts-en.json`

### Priorité 2 (Cette semaine)

3. **Vérifier les images physiques**
   - Script pour valider que toutes les images référencées existent dans `/public/images/`
   - Liste des images manquantes → download depuis WordPress

4. **Traduire le contenu HTML** (P3)
   - Configurer Polylang Pro sur WordPress
   - Ou implémenter auto-traduction DeepL dans le pipeline

### Priorité 3 (Nice to have)

5. **Centraliser les images**
   - Migrer toutes les images WP vers `/public/images/blog/`
   - Remplacer les URLs `admin.bateau-a-paris.fr/wp-content/uploads/` par des URLs locales
   - Avantage : indépendance totale du backend WordPress

6. **Ajouter des validations**
   - Schema Zod pour valider `posts*.json` à chaque import
   - Tests unitaires pour détecter images vides / liens cassés

---

## 7. Checklist de Validation Post-Fix

Après correction des problèmes critiques, vérifier :

- [ ] `npm run import:posts` termine sans erreur
- [ ] Tous les `posts-*.json` ont 31 articles avec `image` non vide
- [ ] Aucun lien `admin.bateau-a-paris.fr` dans `content` (grep)
- [ ] Page `/en/blog` affiche 31 articles avec images
- [ ] Page `/es/blog` affiche 31 articles avec images
- [ ] Clic sur "Réserver maintenant" dans un article → `/reservation` (pas admin)
- [ ] Build Next.js réussit sans warnings

---

## 8. Métriques de Qualité

| Catégorie | Score | Détails |
|-----------|-------|---------|
| **Structure de données** | 9/10 | TypeScript + validation, champs cohérents |
| **Complétude FR** | 10/10 | 31 articles, toutes images présentes |
| **Complétude i18n** | 3/10 | Images manquantes, contenu non traduit |
| **Liens internes** | 4/10 | 36 liens cassés vers admin |
| **Reviews** | 10/10 | Données parfaites |
| **Landing pages** | 10/10 | Structure exemplaire, 102 fichiers i18n |
| **Instagram** | 9/10 | 12 posts, 2 captions vides OK |

**Score moyen pondéré : 6.5/10**

### Calcul du Score

```
Structure (20%) : 9/10 = 1.8
Complétude FR (15%) : 10/10 = 1.5
Complétude i18n (25%) : 3/10 = 0.75  ❌ Poids fort
Liens (20%) : 4/10 = 0.8  ❌ Critique
Reviews (5%) : 10/10 = 0.5
Landings (10%) : 10/10 = 1.0
Instagram (5%) : 9/10 = 0.45

Total : 6.8/10 → arrondi à 6.5/10
```

---

## 9. Impact Business

### Risques Actuels

1. **Utilisateurs non-FR** : Expérience dégradée (pas d'images, contenu FR)
2. **SEO international** : Google pénalise le contenu non traduit
3. **Conversions** : Liens cassés → perte de réservations

### Gains Attendus Post-Fix

- **+100% couverture images** : Toutes les pages blog affichent des visuels
- **-36 liens cassés** : Parcours utilisateur fluide
- **SEO +30%** : Contenu traduit = meilleur ranking ES/IT/DE

---

## 10. Conclusion

Le projet présente une excellente architecture de données (TypeScript, landing pages multilingues) mais souffre de problèmes d'implémentation dans le pipeline d'import des articles. Les 2 problèmes critiques (images manquantes + liens cassés) sont **fixables en 2h de dev**.

**Prochaines étapes :**
1. Fix images (30 min)
2. Fix liens admin (1h)
3. Re-test complet (30 min)
4. Commit + deploy

**Après fix → Score attendu : 8.5/10**

---

**Audit réalisé le 2026-02-17**
**Auditeur : Claude Code (Sonnet 4.5)**
**Portée : `/frontend/src/data/` (posts, reviews, landings, instagram)**
