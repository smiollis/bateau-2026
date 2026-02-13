# Brief Claude Code — Landing Pages SEO thématiques
## bateau-a-paris.fr → bateau-2026.vercel.app (Next.js headless)

---

## 1. CONTEXTE DU PROJET

### Le site actuel
- **URL production** : https://bateau-a-paris.fr/ (WordPress)
- **Nouveau front** : https://bateau-2026.vercel.app/ (Next.js headless, en cours)
- **Activité** : Croisières privées sur la Seine à bord du Senang (bateau de 12m)
- **Capacité** : 2 à 12 personnes
- **Départ** : Port de l'Arsenal, Paris
- **Durée** : 2h de croisière
- **Tarifs** : à partir de 360€ (formule simple) / 420€ (formule festive avec champagne) / formule tout inclus
- **Parcours** : Tour Eiffel, Notre-Dame, Louvre, Musée d'Orsay, Pont Alexandre III, Pont Neuf, Statue de la Liberté, Invalides
- **USP** : Bateau privatisé, intimiste (max 12 pers.), aux JO 2024 (Mauritanie), tournages Adidas/Le Slip Français
- **Contact** : capitaine@bateau-a-paris.fr / +33 6 70 34 25 43

### Pages existantes sur le WP actuel
- Accueil, Le Bateau (Le Senang), La Croisière, Galerie, Tarifs, Contact, Réservation
- Articles blog : EVJF sur la Seine, Réunion de famille, Shooting photo, Croisière romantique, Histoire des Bateaux-Mouches
- Pages monuments : fiches individuelles sur chaque pont de Paris (Concorde, Royal, Alma, Tournelle, etc.)
- Version anglaise partielle

---

## 2. OBJECTIF SEO

Créer un **réseau de landing pages thématiques** ciblant des expressions de recherche longue traîne à forte intention de conversion. Chaque page cible une occasion/événement spécifique pour lequel les internautes recherchent une croisière privée sur la Seine.

### Principes SEO clés
- **1 page = 1 intention de recherche principale** (pas de cannibalisation entre pages)
- **Contenu unique et substantiel** : 800-1200 mots par page minimum
- **Maillage interne** dense entre les landing pages, vers les pages de réservation et tarifs
- **Schema.org** structuré (Event, TouristAttraction, Product/Service)
- **Meta tags optimisés** : title (50-60 car.), description (150-160 car.)
- **URL slugs propres** et en français
- **Mobile-first** : ces pages seront consultées majoritairement sur mobile

---

## 3. LISTE DES LANDING PAGES À CRÉER

### Tier 1 — Pages prioritaires (volume de recherche + conversion élevés)

| # | Slug | Titre H1 | Mot-clé principal | Mots-clés secondaires |
|---|------|----------|-------------------|----------------------|
| 1 | `/evjf-seine` | Enterrement de vie de jeune fille sur la Seine | EVJF bateau Seine Paris | enterrement vie jeune fille bateau paris, EVJF croisière Seine, EVJF privatif Paris |
| 2 | `/evg-seine` | Enterrement de vie de garçon sur la Seine | EVG bateau Seine Paris | enterrement vie garçon bateau paris, EVG croisière Seine, EVG privatif Paris |
| 3 | `/croisiere-romantique-seine` | Croisière romantique sur la Seine | croisière romantique Paris | soirée romantique bateau Seine, croisière en amoureux Paris, balade romantique Seine |
| 4 | `/demande-en-mariage-seine` | Demande en mariage sur la Seine | demande mariage bateau Paris | demande en mariage originale Paris, demande mariage croisière Seine |
| 5 | `/anniversaire-seine` | Fêter son anniversaire sur la Seine | anniversaire bateau Seine Paris | anniversaire croisière privée Paris, fête anniversaire bateau Paris |
| 6 | `/soiree-entre-amis-seine` | Soirée entre amis sur la Seine | soirée amis bateau Seine | sortie entre amis originale Paris, apéro bateau Seine, soirée privatisée Seine |

### Tier 2 — Pages secondaires (niches complémentaires)

| # | Slug | Titre H1 | Mot-clé principal |
|---|------|----------|-------------------|
| 7 | `/anniversaire-mariage-seine` | Anniversaire de mariage sur la Seine | anniversaire mariage bateau Paris |
| 8 | `/team-building-seine` | Team building sur la Seine | team building bateau Seine Paris |
| 9 | `/croisiere-famille-seine` | Croisière en famille sur la Seine | croisière famille privée Paris |
| 10 | `/shooting-photo-seine` | Shooting photo sur la Seine | shooting photo bateau Seine Paris |
| 11 | `/coucher-soleil-seine` | Croisière au coucher du soleil sur la Seine | croisière coucher soleil Paris |
| 12 | `/apero-bateau-seine` | Apéritif sur un bateau sur la Seine | apéro bateau Seine Paris |

### Tier 3 — Pages saisonnières / événementielles

| # | Slug | Titre H1 | Mot-clé principal |
|---|------|----------|-------------------|
| 13 | `/saint-valentin-seine` | Saint-Valentin sur la Seine | Saint-Valentin bateau Paris |
| 14 | `/nouvel-an-seine` | Réveillon du Nouvel An sur la Seine | réveillon bateau Seine Paris |
| 15 | `/croisiere-noel-seine` | Croisière de Noël sur la Seine | croisière Noël Paris bateau |
| 16 | `/fete-des-meres-seine` | Fête des Mères sur la Seine | fête des mères bateau Paris |
| 17 | `/seminaire-seine` | Séminaire d'entreprise sur la Seine | séminaire bateau Seine Paris |

---

## 4. ARCHITECTURE TECHNIQUE (Next.js)

### Structure des fichiers

```
src/
├── app/
│   ├── (landing)/                    # Route group pour les landing pages
│   │   ├── layout.tsx                # Layout commun aux landings (header simplifié, CTA sticky)
│   │   ├── evjf-seine/
│   │   │   └── page.tsx
│   │   ├── evg-seine/
│   │   │   └── page.tsx
│   │   ├── croisiere-romantique-seine/
│   │   │   └── page.tsx
│   │   ├── demande-en-mariage-seine/
│   │   │   └── page.tsx
│   │   └── ... (toutes les autres)
│   └── ...
├── components/
│   ├── landing/
│   │   ├── LandingHero.tsx           # Hero section avec image de fond + titre + CTA
│   │   ├── LandingBenefits.tsx       # Grille de bénéfices (icônes + texte)
│   │   ├── LandingTestimonials.tsx   # Avis clients filtrés par thématique
│   │   ├── LandingPricing.tsx        # Encart tarifs simplifié avec CTA
│   │   ├── LandingFAQ.tsx            # FAQ en accordéon (schema FAQPage)
│   │   ├── LandingGallery.tsx        # Carrousel photos thématiques
│   │   ├── LandingCTA.tsx            # Bloc CTA récurrent
│   │   ├── LandingStickyBar.tsx      # Barre CTA sticky mobile
│   │   ├── LandingRelated.tsx        # Liens vers pages thématiques liées
│   │   └── LandingBreadcrumb.tsx     # Fil d'Ariane structuré
│   └── ...
├── data/
│   └── landings/
│       ├── index.ts                  # Export centralisé + config de toutes les landings
│       ├── evjf-seine.ts             # Données spécifiques EVJF
│       ├── evg-seine.ts              # Données spécifiques EVG
│       └── ...                       # Un fichier data par landing
└── lib/
    └── seo/
        ├── metadata.ts               # Générateur de metadata Next.js
        ├── jsonld.ts                  # Générateur de schemas JSON-LD
        └── sitemap.ts                # Inclusion dans le sitemap
```

### Fichier de données par landing (exemple : `data/landings/evjf-seine.ts`)

```typescript
import { LandingPageData } from './types';

export const evjfSeine: LandingPageData = {
  slug: 'evjf-seine',
  // SEO
  meta: {
    title: 'EVJF sur la Seine – Croisière privée à Paris | Un Bateau à Paris',
    description: 'Organisez un enterrement de vie de jeune fille inoubliable sur la Seine. Bateau privatisé jusqu\'à 12 personnes, champagne offert, 2h au cœur de Paris.',
    canonical: 'https://bateau-a-paris.fr/evjf-seine',
    ogImage: '/images/landings/evjf-seine-og.jpg',
  },
  // Hero
  hero: {
    title: 'Enterrement de vie de jeune fille sur la Seine',
    subtitle: 'Offrez à la future mariée une croisière privée inoubliable au cœur de Paris',
    backgroundImage: '/images/landings/evjf-hero.jpg',
    cta: { text: 'Réserver votre EVJF', href: '/reservation?occasion=evjf' },
  },
  // Contenu principal (sections)
  sections: [
    {
      type: 'richtext',
      title: 'Un EVJF original sur la Seine',
      content: `...`, // Contenu SEO riche, 300+ mots
    },
    {
      type: 'benefits',
      title: 'Pourquoi choisir Un Bateau à Paris pour votre EVJF ?',
      items: [
        { icon: 'ship', title: 'Bateau 100% privatisé', text: 'Le Senang rien que pour votre groupe, jusqu\'à 12 personnes.' },
        { icon: 'champagne', title: 'Champagne offert', text: 'Une coupe de champagne offerte à chaque invitée.' },
        { icon: 'camera', title: 'Décor de rêve', text: 'Tour Eiffel, Notre-Dame, Pont Alexandre III en toile de fond.' },
        { icon: 'sparkles', title: 'Personnalisable', text: 'Amenez votre déco, votre playlist, votre traiteur.' },
      ],
    },
    {
      type: 'gallery',
      title: 'Vos moments EVJF sur la Seine',
      images: [/* chemins images */],
    },
    {
      type: 'testimonials',
      title: 'Elles l\'ont vécu',
      filter: 'evjf', // Filtre les avis tagués EVJF
    },
    {
      type: 'pricing',
      title: 'Nos formules EVJF',
      // Réutilise les données tarifs existantes
    },
    {
      type: 'faq',
      title: 'Questions fréquentes – EVJF sur la Seine',
      items: [
        {
          question: 'Combien de personnes peuvent participer à l\'EVJF ?',
          answer: 'Le Senang peut accueillir jusqu\'à 12 personnes pour votre EVJF sur la Seine.',
        },
        {
          question: 'Peut-on apporter notre propre décoration ?',
          answer: 'Absolument ! Vous êtes libres d\'apporter ballons, banderoles, accessoires photo et toute la déco qui vous fait plaisir.',
        },
        {
          question: 'Peut-on apporter de la nourriture à bord ?',
          answer: 'Oui, vous pouvez apporter votre pique-nique, gâteau ou traiteur. Nous proposons aussi des planches apéritives sur commande.',
        },
        {
          question: 'Combien coûte un EVJF sur la Seine ?',
          answer: 'À partir de 420€ pour la formule festive (champagne inclus) pour un groupe jusqu\'à 6 personnes. Consultez nos tarifs détaillés.',
        },
        {
          question: 'Quelle est la durée de la croisière ?',
          answer: 'La croisière dure 2 heures et parcourt les plus beaux monuments de Paris, de la Bastille à la Tour Eiffel.',
        },
      ],
    },
  ],
  // Maillage interne
  relatedPages: ['evg-seine', 'croisiere-romantique-seine', 'shooting-photo-seine'],
  // Schema.org
  jsonLd: {
    type: 'Event', // ou TouristAttraction + Product
  },
};
```

### Type definitions (`data/landings/types.ts`)

```typescript
export interface LandingPageData {
  slug: string;
  meta: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
  };
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    cta: { text: string; href: string };
  };
  sections: LandingSection[];
  relatedPages: string[];
  jsonLd: {
    type: 'Event' | 'Product' | 'TouristAttraction';
  };
}

export type LandingSection =
  | { type: 'richtext'; title: string; content: string }
  | { type: 'benefits'; title: string; items: BenefitItem[] }
  | { type: 'gallery'; title: string; images: string[] }
  | { type: 'testimonials'; title: string; filter: string }
  | { type: 'pricing'; title: string }
  | { type: 'faq'; title: string; items: FAQItem[] };

export interface BenefitItem {
  icon: string;
  title: string;
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
```

---

## 5. TEMPLATE DE PAGE (structure HTML/SEO)

Chaque landing page doit suivre cette structure sémantique :

```
<head>
  <title>{meta.title}</title>
  <meta name="description" content="{meta.description}" />
  <link rel="canonical" href="{meta.canonical}" />
  <meta property="og:title" ... />
  <meta property="og:description" ... />
  <meta property="og:image" ... />
  <script type="application/ld+json">{ schemas JSON-LD }</script>
</head>

<body>
  <nav> Breadcrumb : Accueil > {Thématique} </nav>

  <header> <!-- Hero -->
    <h1>{hero.title}</h1>
    <p>{hero.subtitle}</p>
    <a href="{hero.cta.href}">{hero.cta.text}</a>  <!-- CTA principal -->
  </header>

  <main>
    <section> <!-- Contenu SEO riche -->
      <h2>...</h2>
      <p>... (texte optimisé, 300+ mots) ...</p>
    </section>

    <section> <!-- Bénéfices -->
      <h2>Pourquoi choisir Un Bateau à Paris pour votre {occasion} ?</h2>
      <div> grille 2x2 ou 4 colonnes d'avantages </div>
    </section>

    <section> <!-- Galerie -->
      <h2>...</h2>
      <div> carrousel images avec alt text optimisé </div>
    </section>

    <section> <!-- Témoignages -->
      <h2>...</h2>
      <div> avis clients filtrés </div>
    </section>

    <section> <!-- Tarifs -->
      <h2>Tarifs {occasion} sur la Seine</h2>
      <div> 2-3 formules avec prix + CTA </div>
    </section>

    <section> <!-- FAQ avec schema FAQPage -->
      <h2>Questions fréquentes</h2>
      <div> accordéon Q&A </div>
    </section>

    <section> <!-- Pages liées (maillage interne) -->
      <h2>Découvrez aussi</h2>
      <div> cards vers 3-4 autres landing pages </div>
    </section>
  </main>

  <div> <!-- Sticky CTA bar mobile -->
    <a href="/reservation?occasion={slug}">Réserver</a>
    <a href="tel:+33670342543">Appeler</a>
  </div>
</body>
```

---

## 6. SCHEMAS JSON-LD À IMPLÉMENTER

### Schema FAQPage (sur chaque landing)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien de personnes pour un EVJF sur la Seine ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Senang accueille jusqu'à 12 personnes..."
      }
    }
  ]
}
```

### Schema TouristAttraction + Offer
```json
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Croisière EVJF sur la Seine – Un Bateau à Paris",
  "description": "...",
  "url": "https://bateau-a-paris.fr/evjf-seine",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8515209,
    "longitude": 2.3687542
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Port de l'Arsenal",
    "addressLocality": "Paris",
    "postalCode": "75012",
    "addressCountry": "FR"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "420",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://bateau-a-paris.fr/reservation"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "XX"
  }
}
```

### Schema BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://bateau-a-paris.fr/" },
    { "@type": "ListItem", "position": 2, "name": "EVJF sur la Seine", "item": "https://bateau-a-paris.fr/evjf-seine" }
  ]
}
```

---

## 7. CONTENU RÉDACTIONNEL — GUIDELINES

### Angle rédactionnel par page

| Page | Angle / Tonalité | Éléments à mettre en avant |
|------|------------------|---------------------------|
| EVJF | Festif, complice, girly | Champagne, déco personnalisable, photo devant la Tour Eiffel, ambiance entre copines |
| EVG | Fun, aventure, mémorable | Bières/champagne, ambiance décontractée, originalité vs bar classique |
| Romantique | Intime, poétique, élégant | Coucher de soleil, Paris by night, moments à deux, pics-nics gastronomiques |
| Demande en mariage | Émotion, surprise, unique | Organisation secrète possible, scénarios surprise, cadre exceptionnel |
| Anniversaire | Célébration, convivialité | Gâteau à bord, groupe d'amis/famille, formule tout inclus |
| Entre amis | Décontracté, fun, apéro | Pic-nic libre, playlist perso, formule simple abordable |
| Anniversaire mariage | Romantique, nostalgique | Renouveler la magie, soirée spéciale, champagne |
| Team building | Professionnel, cohésion | Sortie originale, hors cadre bureau, facture possible |
| Famille | Chaleureux, générationnel | Enfants bienvenus, sécurité, convivialité |
| Shooting photo | Créatif, professionnel | Décor naturel, lumière dorée, pont Alexandre III |
| Coucher de soleil | Poétique, visuel | Golden hour, sky line, reflets sur la Seine |
| Apéro | Décontracté, festif | Formule simple, BYO, afterwork original |

### Règles rédactionnelles
- **Pas de blabla** : chaque phrase doit apporter de l'information ou de l'émotion
- **Inclure les infos pratiques** : prix, durée, capacité, lieu de départ dans chaque page
- **Verbes d'action dans les CTA** : "Réservez", "Offrez", "Organisez", "Surprenez"
- **Preuves sociales** : mentionner les JO 2024, les tournages (Adidas, Le Slip Français), les avis Google
- **Pas de duplicate** : chaque page doit avoir un contenu unique, pas du copié-collé entre pages
- **Vocabulaire local** : utiliser "croisière privée", "bateau privatisé", "navigation sur la Seine"
- **Chaque page doit contenir** au minimum 4-5 FAQ pertinentes et uniques

---

## 8. MAILLAGE INTERNE

### Matrice de liens entre landing pages

```
EVJF ←→ EVG (les deux types d'enterrement de vie)
EVJF ←→ Shooting Photo (shooting EVJF)
EVJF ←→ Apéro bateau (formule simple EVJF)

Romantique ←→ Demande en mariage
Romantique ←→ Anniversaire mariage
Romantique ←→ Coucher de soleil
Romantique ←→ Saint-Valentin

Anniversaire ←→ Entre amis
Anniversaire ←→ Famille
Anniversaire ←→ Apéro bateau

Team building ←→ Séminaire
Team building ←→ Apéro bateau
Team building ←→ Entre amis

Toutes les pages → Page Tarifs
Toutes les pages → Page Réservation
Toutes les pages → Page Le Bateau (Le Senang)
Toutes les pages → Page La Croisière (le parcours)
```

### Liens depuis les pages existantes
- Page Tarifs : ajouter des liens contextuels vers les landing pages ("idéal pour un EVJF", "parfait pour un anniversaire")
- Page Le Bateau : mentionner les différents usages avec liens
- Page d'accueil : section "Nos croisières par occasion" avec grille de cards

---

## 9. OPTIMISATION IMAGES

### Convention de nommage
```
/images/landings/
├── evjf-seine-hero.jpg          # Image hero 1920x1080
├── evjf-seine-og.jpg            # Image OG 1200x630
├── evjf-seine-gallery-01.jpg    # Galerie
├── evjf-seine-gallery-02.jpg
├── romantique-seine-hero.jpg
└── ...
```

### Attributs alt text
Chaque image doit avoir un alt text descriptif incluant le mot-clé principal :
- `alt="Groupe de femmes célébrant un EVJF sur la Seine avec la Tour Eiffel en arrière-plan"`
- `alt="Couple en croisière romantique sur la Seine au coucher du soleil"`

### Format et optimisation
- Format WebP prioritaire avec fallback JPEG
- Lazy loading natif (`loading="lazy"`) sauf hero image (LCP)
- Image hero : `priority` dans le composant Next.js Image
- Utiliser `next/image` avec le composant Image de Next.js pour l'optimisation automatique

---

## 10. INSTRUCTIONS D'IMPLÉMENTATION POUR CLAUDE CODE

### Phase 1 : Infrastructure (à faire en premier)
1. Créer les types TypeScript (`data/landings/types.ts`)
2. Créer les composants réutilisables dans `components/landing/`
3. Créer le layout commun des landings `app/(landing)/layout.tsx`
4. Créer le générateur de metadata et JSON-LD dans `lib/seo/`
5. Mettre à jour le sitemap pour inclure les nouvelles pages

### Phase 2 : Pages Tier 1 (6 pages prioritaires)
1. Créer les fichiers de données pour les 6 pages Tier 1
2. Créer les pages Next.js correspondantes
3. Rédiger le contenu SEO unique pour chaque page (800-1200 mots)
4. Créer les FAQ spécifiques (4-5 Q&A par page)
5. Configurer le maillage interne

### Phase 3 : Pages Tier 2 + 3
1. Répéter le processus pour les pages secondaires et saisonnières
2. Enrichir le maillage interne

### Phase 4 : Optimisation
1. Vérifier la performance Lighthouse de chaque landing
2. Tester les schemas JSON-LD avec le Rich Results Test de Google
3. Vérifier l'indexation dans Google Search Console
4. A/B test des CTA et des formulations

### Commandes Claude Code suggérées

```bash
# Phase 1 - Créer l'infrastructure
# "Crée les types TypeScript, les composants landing réutilisables,
# le layout commun et les utilitaires SEO selon le brief"

# Phase 2 - Créer les 6 premières landing pages
# "Crée les fichiers de données et les pages Next.js pour les 6 landing pages
# Tier 1 : EVJF, EVG, Romantique, Demande en mariage, Anniversaire, Entre amis.
# Rédige le contenu SEO unique pour chaque page selon les guidelines du brief."

# Phase 3 - Vérification
# "Vérifie que toutes les landing pages ont :
# - des metadata uniques (title + description)
# - un schema JSON-LD FAQPage + TouristAttraction
# - un breadcrumb
# - un maillage interne cohérent
# - des alt text sur toutes les images
# - un CTA sticky mobile"
```

---

## 11. CHECKLIST QUALITÉ PAR PAGE

Pour chaque landing page, vérifier :

- [ ] Title tag unique (50-60 caractères, mot-clé en début)
- [ ] Meta description unique (150-160 caractères, avec CTA)
- [ ] URL slug propre et en français
- [ ] H1 unique contenant le mot-clé principal
- [ ] Contenu unique de 800-1200 mots minimum
- [ ] Au moins 4-5 FAQ uniques en accordéon
- [ ] Schema JSON-LD : FAQPage
- [ ] Schema JSON-LD : TouristAttraction/Product avec Offer
- [ ] Schema JSON-LD : BreadcrumbList
- [ ] Breadcrumb visible
- [ ] CTA principal en hero
- [ ] CTA sticky mobile (réservation + téléphone)
- [ ] Section tarifs avec lien vers page tarifs complète
- [ ] Section témoignages avec avis filtrés
- [ ] Section galerie avec images alt-textées
- [ ] 3-4 liens internes vers pages liées
- [ ] Liens vers /reservation, /tarifs, /le-bateau
- [ ] Images optimisées WebP, lazy loading
- [ ] Hero image avec `priority` (LCP)
- [ ] Open Graph image 1200x630
- [ ] Page incluse dans le sitemap.xml
- [ ] Performance Lighthouse > 90
- [ ] Version mobile testée et fonctionnelle

---

## 12. ÉVOLUTIONS FUTURES

- **Version anglaise** : Dupliquer les landing pages en anglais pour capter le trafic international (nombreux touristes à Paris)
- **Pages saisonnières dynamiques** : Activer/désactiver les pages Saint-Valentin, Noël, etc. selon la saison
- **Blog posts de soutien** : Créer des articles blog qui pointent vers les landing pages ("10 idées originales pour un EVJF à Paris" → lien vers /evjf-seine)
- **Google Business Profile** : Créer des posts GBP renvoyant vers chaque landing page
- **Avis structurés** : Taguer les avis Google par thématique pour alimenter les landing pages
