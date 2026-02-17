# Scripts de Correction des Données

Suite à l'audit qualité du 2026-02-17, ces scripts corrigent les problèmes identifiés dans les données statiques.

## Problèmes Identifiés

### P1 : Images Manquantes (Critique)
- **118 images vides** dans posts-en.json, posts-es.json, posts-it.json, posts-de.json
- Impact : pages blog multilingues cassées, SEO dégradé

### P2 : Liens Hardcodés Admin (Critique)
- **36 occurrences** de `admin.bateau-a-paris.fr` dans les articles FR et EN
- Impact : liens cassés, mauvaise UX, redirections vers le backend WordPress

## Scripts de Fix

### 1. fix-missing-images.ts

**Problème résolu :** Images manquantes dans les articles traduits.

**Comment ça marche :**
1. Lit `posts.json` (FR) comme référence
2. Crée une map `id → image URL`
3. Pour chaque locale (EN/ES/IT/DE/PT-BR) :
   - Si `image === ""`, copie l'image depuis la map FR
4. Écrit les fichiers corrigés

**Usage :**
```bash
npm run fix:images
```

**Résultat attendu :**
```
Fixing missing images in translated posts...

Loaded 31 FR posts (reference)

Built image map: 31 posts with images

[en    ] posts-en.json        → Fixed: 25, Still missing: 0
[es    ] posts-es.json        → Fixed: 31, Still missing: 0
[it    ] posts-it.json        → Fixed: 31, Still missing: 0
[de    ] posts-de.json        → Fixed: 31, Still missing: 0
[pt-BR ] posts-pt-BR.json     → Fixed: 0, Still missing: 0

============================================================
Total images fixed: 118
============================================================
```

---

### 2. fix-admin-links.ts

**Problème résolu :** Liens hardcodés vers `admin.bateau-a-paris.fr` dans le contenu HTML.

**Remplacements effectués :**
1. `https://admin.bateau-a-paris.fr/reservation/` → `/reservation`
2. `https://admin.bateau-a-paris.fr` → `/`
3. Préserve les URLs d'images (`/wp-content/uploads/`)

**Usage :**
```bash
npm run fix:links
```

**Résultat attendu :**
```
Fixing hardcoded admin URLs in posts content...

[posts.json          ] → Fixed 30 posts, 92 replacements
[posts-en.json       ] → Fixed 6 posts, 18 replacements
[posts-es.json       ] → Fixed 0 posts, 0 replacements
[posts-it.json       ] → Fixed 0 posts, 0 replacements
[posts-de.json       ] → Fixed 0 posts, 0 replacements
[posts-pt-BR.json    ] → Fixed 0 posts, 0 replacements

============================================================
Total posts fixed: 36
Total URL replacements: 110
============================================================
```

---

### 3. Fix All (Combo)

**Usage :**
```bash
npm run fix:all
```

Exécute les 2 scripts en séquence : `fix:images` puis `fix:links`.

---

## Workflow Recommandé

### 1. Première correction (manuelle)

```bash
cd frontend

# 1. Corriger les images
npm run fix:images

# 2. Corriger les liens
npm run fix:links

# 3. Vérifier les résultats
git diff src/data/posts*.json

# 4. Commit
git add src/data/posts*.json
git commit -m "fix: correct missing images and admin URLs in posts data

- Fixed 118 missing images in translated posts (EN/ES/IT/DE)
- Replaced 110 hardcoded admin URLs with relative paths
- See AUDIT-2026-02-17-data-quality.md for details"

git push
```

### 2. Automatisation Future (Optionnel)

Pour éviter que le problème se reproduise, modifier `scripts/import-posts.ts` :

```typescript
// Dans fetchAllPosts(), après la boucle for (const wp of wpPosts)
// Ligne 131-143 :

for (const wp of wpPosts) {
  allPosts.push({
    id: wp.id,
    title: toPlainText(wp.title?.rendered ?? ''),
    excerpt: toPlainText(wp.excerpt?.rendered ?? ''),
    content: cleanContent(wp.content?.rendered ?? ''),
    image: wp._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '',
    date: wp.date,
    category: wp._embedded?.['wp:term']?.[0]?.[0]?.name ?? '',
    link: wp.link,
    slug: wp.slug,
  });
}

// Ajouter après la boucle (ligne 150) :

// Fix: copy FR images to locales with empty image field
if (lang !== 'fr' && frPosts) {
  for (const post of allPosts) {
    if (!post.image) {
      const frPost = frPosts.find((p: BlogPost) => p.id === post.id);
      if (frPost?.image) {
        post.image = frPost.image;
      }
    }
  }
}
```

**Puis :**
- Charger `frPosts` au début de `main()` (une seule fois)
- Passer `frPosts` à `fetchAllPosts(lang, frPosts?)`

---

## Validation Post-Fix

Après avoir run les scripts, valider :

```bash
# 1. Vérifier qu'il n'y a plus d'images vides
cd frontend
node -e "
const fs = require('fs');
const files = ['posts-en.json', 'posts-es.json', 'posts-it.json', 'posts-de.json'];
files.forEach(f => {
  const posts = JSON.parse(fs.readFileSync(\`src/data/\${f}\`, 'utf8'));
  const empty = posts.filter(p => !p.image || p.image === '').length;
  console.log(\`\${f}: \${empty} empty images\`);
});
"

# 2. Vérifier qu'il n'y a plus de liens admin
grep -r "admin.bateau-a-paris.fr" src/data/posts*.json | wc -l
# Devrait retourner un nombre > 0 (images WP-content OK) mais pas de href

# 3. Vérifier les liens de réservation
grep "href=\"https://admin.bateau-a-paris.fr/reservation" src/data/posts*.json
# Devrait retourner 0 résultats

# 4. Build Next.js
npm run build
```

---

## Troubleshooting

### "Cannot find module 'tsx'"

```bash
npm install tsx --save-dev
```

### "File not found: posts.json"

Assurez-vous d'avoir importé les posts d'abord :
```bash
npm run import:posts
```

### Les images sont toujours vides après fix

Vérifiez que `posts.json` (FR) contient bien les images :
```bash
node -e "
const posts = require('./src/data/posts.json');
const withImages = posts.filter(p => p.image && p.image !== '').length;
console.log(\`FR posts with images: \${withImages}/\${posts.length}\`);
"
```

Si 0, c'est que l'API WordPress ne retourne pas les featured media. Vérifier :
- Le plugin Polylang est actif
- Les images sont bien définies dans WordPress
- L'API `?_embed=wp:featuredmedia` fonctionne

---

## Références

- Audit complet : `frontend/docs/AUDIT-2026-02-17-data-quality.md`
- Score avant fix : **6.5/10**
- Score après fix : **8.5/10** (attendu)
