# Validation des Scripts de Correction

## Checklist de Test

### Avant d'exécuter les scripts

1. **Backup des données** :
   ```bash
   cd frontend
   cp -r src/data src/data.backup
   ```

2. **Vérifier l'état initial** :
   ```bash
   # Compter les images vides
   node -e "
   const fs = require('fs');
   ['posts-en.json', 'posts-es.json', 'posts-it.json', 'posts-de.json'].forEach(f => {
     const posts = JSON.parse(fs.readFileSync(\`src/data/\${f}\`, 'utf8'));
     const empty = posts.filter(p => !p.image || p.image === '').length;
     console.log(\`\${f}: \${empty} images vides\`);
   });
   "

   # Compter les liens admin
   grep -r "admin.bateau-a-paris.fr" src/data/posts*.json | wc -l
   ```

---

### Test 1 : fix-missing-images.ts

**Exécution :**
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

**Validation post-run :**
```bash
# Toutes les images doivent être présentes
node -e "
const fs = require('fs');
['posts-en.json', 'posts-es.json', 'posts-it.json', 'posts-de.json'].forEach(f => {
  const posts = JSON.parse(fs.readFileSync(\`src/data/\${f}\`, 'utf8'));
  const empty = posts.filter(p => !p.image || p.image === '').length;
  const total = posts.length;
  const status = empty === 0 ? '✅' : '❌';
  console.log(\`\${status} \${f}: \${total - empty}/\${total} images\`);
});
"

# Expected:
# ✅ posts-en.json: 31/31 images
# ✅ posts-es.json: 31/31 images
# ✅ posts-it.json: 31/31 images
# ✅ posts-de.json: 31/31 images
```

**Vérifier un exemple spécifique :**
```bash
node -e "
const posts = require('./src/data/posts-en.json');
const post = posts.find(p => p.id === 11872);
console.log('Post EN #11872:');
console.log('  Title:', post.title);
console.log('  Image:', post.image);
console.log('  Has image:', post.image ? '✅' : '❌');
"

# Expected:
# Post EN #11872:
#   Title: An Enchanting Escape on the Seine
#   Image: https://admin.bateau-a-paris.fr/wp-content/uploads/2022/08/batea-a-paris.jpg
#   Has image: ✅
```

---

### Test 2 : fix-admin-links.ts

**Exécution :**
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

**Validation post-run :**
```bash
# 1. Vérifier qu'il n'y a plus de liens /reservation/ vers admin
grep "href=\"https://admin.bateau-a-paris.fr/reservation" src/data/posts*.json

# Expected: (no output - 0 results)

# 2. Vérifier que les liens de réservation sont relatifs
grep "href=\"/reservation\"" src/data/posts.json | head -3

# Expected: plusieurs lignes avec href="/reservation"

# 3. Vérifier que les images WP sont préservées
grep "https://admin.bateau-a-paris.fr/wp-content/uploads" src/data/posts.json | wc -l

# Expected: 31 (images WP intactes)

# 4. Compter les occurrences admin restantes (images uniquement)
grep -o "admin.bateau-a-paris.fr" src/data/posts*.json | wc -l

# Expected: ~186 (seulement dans les image URLs, pas dans les href)
```

**Vérifier un exemple spécifique :**
```bash
node -e "
const posts = require('./src/data/posts.json');
const post = posts[0]; // Premier post FR
console.log('Post FR #' + post.id + ':');
console.log('Has /reservation link:', post.content.includes('href=\"/reservation\"') ? '✅' : '❌');
console.log('Has admin href:', post.content.includes('href=\"https://admin.bateau-a-paris.fr\"') ? '❌ (found)' : '✅ (clean)');
console.log('Has image URL:', post.image.includes('admin.bateau-a-paris.fr') ? '✅' : '❌');
"

# Expected:
# Post FR #1:
# Has /reservation link: ✅
# Has admin href: ✅ (clean)
# Has image URL: ✅
```

---

### Test 3 : Build Next.js

**Exécution :**
```bash
npm run build
```

**Résultat attendu :**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (58/58)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
...
○ /[locale]/blog                         1.2 kB         123 kB
○ /[locale]/blog/[slug]                  2.4 kB         145 kB
...

○  (Static)  prerendered as static content
```

**Validation :**
- Pas d'erreurs de build
- Toutes les pages blog générées
- Pas de warnings TypeScript

---

### Test 4 : Pages Blog Multilingues

**Démarrer le serveur :**
```bash
npm run build
npm run start
```

**Tester dans le navigateur :**
1. http://localhost:3000/en/blog
   - ✅ 31 articles visibles
   - ✅ Toutes les images affichées

2. http://localhost:3000/es/blog
   - ✅ 31 articles visibles
   - ✅ Toutes les images affichées

3. http://localhost:3000/en/blog/an-enchanting-escape-on-the-seine
   - ✅ Image featured visible
   - ✅ Clic sur "Book now" → redirige vers /en/reservation (pas admin)

4. http://localhost:3000/blog/une-echappee-enchanteresse-sur-la-seine
   - ✅ Clic sur "Réserver maintenant" → redirige vers /reservation (pas admin)

---

### Test 5 : Git Diff

**Vérifier les changements :**
```bash
git diff src/data/posts.json | head -50
```

**Attendu :**
- Des lignes `href="/reservation"` au lieu de `href="https://admin.bateau-a-paris.fr/reservation/"`
- Pas de changement dans les `image` URLs (toujours admin.bateau-a-paris.fr/wp-content)

```bash
git diff src/data/posts-en.json | head -50
```

**Attendu :**
- Des images ajoutées : `"image": "https://admin.bateau-a-paris.fr/..."`
- Des liens fixes : `href="/reservation"`

---

### Test 6 : Validation JSON

**Vérifier la syntaxe JSON :**
```bash
for file in src/data/posts*.json; do
  echo "Validating $file..."
  node -e "JSON.parse(require('fs').readFileSync('$file', 'utf8'))" && echo "✅ Valid JSON"
done
```

**Attendu :**
```
Validating src/data/posts.json...
✅ Valid JSON
Validating src/data/posts-en.json...
✅ Valid JSON
...
```

---

## Rollback en cas de problème

Si un script échoue ou produit des résultats inattendus :

```bash
# Restaurer le backup
rm -rf src/data
mv src/data.backup src/data

# Vérifier
git status
```

---

## Commit des changements

Après validation réussie :

```bash
git add src/data/posts*.json

git commit -m "fix: correct missing images and admin URLs in posts data

- Fixed 118 missing images in translated posts (EN/ES/IT/DE)
- Replaced 110 hardcoded admin URLs with relative paths
- All blog pages now display properly across all locales

See docs/AUDIT-2026-02-17-data-quality.md for details"

git push
```

---

## Métriques Finales

Après le commit, valider les métriques :

```bash
# Images vides
node -e "
const fs = require('fs');
let total = 0;
['posts.json', 'posts-en.json', 'posts-es.json', 'posts-it.json', 'posts-de.json', 'posts-pt-BR.json'].forEach(f => {
  const posts = JSON.parse(fs.readFileSync(\`src/data/\${f}\`, 'utf8'));
  const empty = posts.filter(p => !p.image || p.image === '').length;
  total += empty;
});
console.log('Total images vides:', total);
"
# Expected: 0

# Liens admin (dans href, pas dans images)
grep -E 'href="[^"]*admin\.bateau-a-paris\.fr' src/data/posts*.json | wc -l
# Expected: 0

# Articles totaux
node -e "
const fs = require('fs');
['posts.json', 'posts-en.json', 'posts-es.json', 'posts-it.json', 'posts-de.json', 'posts-pt-BR.json'].forEach(f => {
  const posts = JSON.parse(fs.readFileSync(\`src/data/\${f}\`, 'utf8'));
  console.log(\`\${f}: \${posts.length} articles\`);
});
"
# Expected: tous 31 articles
```

---

## Score Qualité Final

**Avant fix :** 6.5/10
- 118 images manquantes
- 36 liens cassés

**Après fix :** 8.5/10
- 0 images manquantes ✅
- 0 liens cassés ✅
- Contenu HTML à traduire (P3, optionnel)

**Gain :** +2 points (+30%)
