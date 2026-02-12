# Gestion des imports de donnees externes

> Derniere mise a jour : 2026-02-11

## Principe general

Les donnees externes (articles WordPress, avis Google) sont importees en **JSON statique** via des scripts Node.js. Ce pattern evite les appels API au runtime, garantit des temps de chargement optimaux et permet le SSG (Static Site Generation).

```
Source externe ──▶ Script d'import ──▶ src/data/*.json ──▶ Composants React (import statique)
```

Les fichiers JSON generes sont **commites dans le repo** et servent directement au build Next.js.

---

## Scripts disponibles

| Commande | Description | Source |
|----------|-------------|--------|
| `npm run import:posts` | Importe les articles WordPress | REST API `/wp/v2/posts` |
| `npm run import:reviews` | Importe les avis Google Places | Google Places API (New) |
| `npm run import:all` | Execute les deux imports | — |

---

## 1. Import des articles WordPress

### Fichiers

| Fichier | Role |
|---------|------|
| `scripts/import-posts.ts` | Script d'import |
| `src/data/posts.json` | Donnees generees (~31 articles) |

### Source

- **API** : `https://bateau-a-paris.fr/wp-json/wp/v2/posts?_embed=wp:featuredmedia,wp:term`
- **Pagination** : recupere toutes les pages automatiquement (`per_page=100`)
- **Langue** : contenu en francais

### Donnees extraites par article

| Champ | Type | Description |
|-------|------|-------------|
| `id` | number | ID WordPress |
| `title` | string | Titre decode (entites HTML resolues) |
| `excerpt` | string | Extrait en texte brut |
| `content` | string | Contenu HTML semantique (nettoye d'Elementor) |
| `image` | string | URL image a la une |
| `date` | string | Date de publication ISO |
| `category` | string | Premiere categorie |
| `link` | string | URL originale WordPress |
| `slug` | string | Slug pour les routes `/actualites/[slug]` |

### Traitement du contenu

Le script applique plusieurs transformations :
- **Decodage HTML** : `&rsquo;` → `'`, `&eacute;` → `e`, etc.
- **Nettoyage Elementor** : extraction des balises semantiques (`<p>`, `<h2>`-`<h6>`, `<li>`) depuis le HTML Elementor
- **Preservation du formatage** : conserve `<strong>`, `<em>`, `<a>`, `<b>`, `<i>` inline

### Execution

```bash
# Import standard
npm run import:posts

# Avec variable d'environnement explicite
WP_API_URL=https://bateau-a-paris.fr/wp-json npm run import:posts
```

### Quand reimporter ?

- Apres publication/modification d'un article sur WordPress
- Apres changement de categories
- Avant chaque deploiement en production (recommande)

---

## 2. Import des avis Google Places

### Fichiers

| Fichier | Role |
|---------|------|
| `scripts/import-reviews.ts` | Script d'import |
| `src/data/reviews.json` | Donnees generees (5 avis max) |

### Source

- **API** : Google Places API (New) — `https://places.googleapis.com/v1/places/{placeId}`
- **Place ID** : `ChIJpf5ZjgJy5kcRHunteILRJ9g`
- **Fields** : `reviews,rating,userRatingCount,displayName`
- **Langue** : `languageCode=fr`
- **Limite** : l'API retourne un maximum de **5 avis** (limite Google)

### Configuration requise

Variable `GOOGLE_PLACES_API_KEY` dans `.env.local` ou en variable d'environnement :

```env
GOOGLE_PLACES_API_KEY=AIzaSy...
```

> La cle n'est pas prefixee `NEXT_PUBLIC_` car elle n'est utilisee qu'au build (pas exposee au client).

### Donnees extraites

| Champ | Type | Description |
|-------|------|-------------|
| `placeRating` | number | Note globale (ex: 4.9) |
| `totalReviews` | number | Nombre total d'avis sur la fiche |
| `reviews[].id` | number | Index (1-5) |
| `reviews[].name` | string | Nom de l'auteur |
| `reviews[].avatar` | string | URL photo profil Google |
| `reviews[].rating` | number | Note individuelle (1-5) |
| `reviews[].date` | string | Date relative ("il y a 5 mois") |
| `reviews[].text` | string | Texte complet de l'avis |
| `importedAt` | string | Horodatage de l'import ISO |

### Execution

```bash
# Import standard (lit la cle depuis .env.local)
npm run import:reviews

# Avec cle explicite
GOOGLE_PLACES_API_KEY=AIzaSy... npm run import:reviews
```

### Quand reimporter ?

- Mensuellement (les avis Google changent rarement)
- Apres un afflux d'avis (evenement, saison haute)
- La date relative (`il y a X mois`) est figee au moment de l'import

---

## 3. Import complet

```bash
npm run import:all
```

Execute sequentiellement : articles WordPress puis avis Google.

---

## Composants consommateurs

### Articles (`src/data/posts.json`)

| Composant | Usage |
|-----------|-------|
| `src/views/Actualites.tsx` | Liste des articles (highlight + grille + pagination) |
| `src/views/ArticleDetail.tsx` | Page article individuelle |
| `src/app/actualites/[slug]/page.tsx` | Route SSG (generateStaticParams) |

### Avis Google (`src/data/reviews.json`)

| Composant | Usage |
|-----------|-------|
| `src/components/Testimonials.tsx` | Carousel d'avis (variante basique) |
| `src/components/TestimonialsVariants.tsx` | Carousel d'avis (variantes de theme) |

---

## Ajout d'un nouvel import

Pour ajouter une nouvelle source de donnees :

1. Creer `scripts/import-<source>.ts` en suivant le pattern existant
2. Generer le JSON dans `src/data/<source>.json`
3. Ajouter le script npm dans `package.json`
4. Completer `import:all` avec le nouveau script
5. Documenter dans ce fichier

---

## Automatisation (cron)

Voir [ROADMAP.md](../../ROADMAP.md) > Phase 2b pour la mise en place des crons d'import automatique.

### Strategie envisagee

| Import | Frequence | Declencheur |
|--------|-----------|-------------|
| Articles WordPress | A chaque publication | Webhook WP `post_published` ou cron quotidien |
| Avis Google | Hebdomadaire ou mensuel | Cron (GitHub Actions ou serveur) |
| Instagram token | Tous les 50 jours | Cron de refresh (token expire tous les 60j) |

### Options d'implementation

1. **GitHub Actions (scheduled)** : workflow cron qui execute les scripts et commit/push le JSON mis a jour
2. **Webhook WordPress** : plugin WP qui notifie un endpoint Next.js ou declenche un workflow GitHub
3. **Cron serveur (Coolify/OVH)** : tache planifiee sur le serveur de production
