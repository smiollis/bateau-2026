# Brief Claude Code - Phase 1 : Intégration Lovable

## 🎯 Mission

Intégrer les composants du prototype Lovable dans le projet Next.js production.

## 📂 Chemins Importants

**Projet Production** :
```
/work/projects/MICHEL/bateau-2026/frontend/
```

**Prototype Lovable** :
```
/work/projects/MICHEL/lovable-prototype/
```

**Documentation** :
```
/work/projects/MICHEL/bateau-2026/brief/
```

## ✅ Déjà Fait

- WordPress CORS activé (localhost:3000 + localhost:3001)
- API WordPress accessible : https://bateau-a-paris.fr/wp-json
- Next.js configuré avec .env.local
- Test connexion API réussi

## 🎨 Couleurs à Utiliser (HSL)
```css
/* Brand Colors */
--navy: 224 64% 33%;        /* #1E3A8A */
--navy-dark: 224 64% 20%;
--navy-light: 224 40% 50%;
--gold: 43 65% 52%;         /* #D4AF37 */
--gold-light: 43 65% 65%;
--gold-dark: 43 65% 40%;
```

## 📋 Tâches Phase 1

### 1. Copier Config Tailwind (10 min)

**Source** : `/work/projects/MICHEL/lovable-prototype/src/index.css`  
**Destination** : `/work/projects/MICHEL/bateau-2026/frontend/src/app/globals.css`

Actions :
- Copier toutes les CSS variables (--navy, --gold, etc.)
- Copier les @layer components
- Copier les @layer utilities
- Mettre à jour tailwind.config.ts avec couleurs custom

### 2. Copier Composants Cookie RGPD (20 min)

**Source** :
```
lovable-prototype/src/components/CookieBanner.tsx
lovable-prototype/src/components/CookieModal.tsx
```

**Destination** :
```
frontend/src/components/cookie-consent/CookieBanner.tsx
frontend/src/components/cookie-consent/CookieModal.tsx
```

**Puis implémenter logique** selon `cookie-notice-rgpd.md`

### 3. Copier Composants UI de Base (15 min)

**Source** : `lovable-prototype/src/components/ui/`  
**Destination** : `frontend/src/components/ui/`

Composants à copier :
- Button.tsx
- Card.tsx
- (autres si nécessaire)

### 4. Créer Client WordPress (15 min)

**Fichier** : `frontend/src/lib/wordpress.ts`
```typescript
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

export async function getPages() {
  const res = await fetch(`${WP_API_URL}/wp/v2/pages`);
  if (!res.ok) throw new Error('Failed to fetch pages');
  return res.json();
}

export async function getPosts() {
  const res = await fetch(`${WP_API_URL}/wp/v2/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}
```

### 5. Page Test WordPress (10 min)

**Fichier** : `frontend/src/app/test/page.tsx`

Créer page qui :
- Fetch les pages WordPress
- Affiche titres + excerpts
- Teste CORS en live

## 🧪 Tests à Faire
```bash
cd frontend
npm run dev

# Vérifier:
# - http://localhost:3001 fonctionne
# - Couleurs navy/gold visibles
# - Cookie banner s'affiche
# - Page /test affiche pages WordPress
```

## 📚 Documentation Disponible

- `setup-initial-projet.md` - Setup complet
- `cookie-notice-rgpd.md` - Implémentation RGPD
- `bateau-a-paris_briefs-complets.md` - Brief général

## 🎯 Résultat Attendu

Après Phase 1 :
- ✅ Tailwind configuré avec couleurs brand
- ✅ Cookie consent fonctionnel
- ✅ Composants UI de base
- ✅ Client WordPress API
- ✅ Page test qui affiche données WordPress

**Temps estimé** : 1h-1h30

