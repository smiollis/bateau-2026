# Briefs Complets - Refonte bateau-a-paris.fr

**Projet**: Refonte headless bateau-a-paris.fr  
**Architecture**: Next.js 14 (front) + WordPress headless (back) + Bookly (réservations)  
**Date**: Janvier 2026  
**Durée estimée**: 10-12 semaines

---

# PARTIE 1: BRIEF LOVABLE (Design & Prototypage)

## 📋 Contexte Projet

**Site actuel**: https://bateau-a-paris.fr  
**Activité**: Croisières privées sur la Seine à Paris  
**Bateau**: Le Senang - Capacité 12 personnes  
**Public cible**: 
- Couples (demandes en mariage, anniversaires)
- Groupes d'amis (EVJF, anniversaires)
- Entreprises (team building, événements)
- Touristes premium (internationaux)

**Objectifs refonte**:
- ✅ Design moderne, premium, élégant
- ✅ Performances ultra-rapides (< 1s)
- ✅ Mobile-first (70% du trafic)
- ✅ Multilingue (FR/EN minimum)
- ✅ Conversion optimisée (réservations)

---

## 🎨 Direction Artistique

### Palette Couleurs

```
Primaire:
- Bleu Marine: #1e3a8a (principal)
- Bleu Clair: #3b82f6 (accents)
- Or/Gold: #f59e0b (CTA, highlights)

Secondaires:
- Blanc: #ffffff
- Gris clair: #f3f4f6 (backgrounds)
- Gris foncé: #1f2937 (textes)

Dégradés:
- Hero: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)
- CTA: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)
```

### Typography

```
Headings: 
- Font: Inter Bold ou Montserrat Bold
- Sizes: H1: 48-64px, H2: 36-48px, H3: 24-32px
- Line-height: 1.2

Body:
- Font: Inter Regular ou Open Sans
- Size: 16-18px
- Line-height: 1.6
- Color: #1f2937

CTA Buttons:
- Font: Inter Semibold
- Size: 16-18px
- Uppercase: oui
- Letter-spacing: 0.05em
```

### Mood & Style

**Inspirations**:
- Luxe discret (pas ostentatoire)
- Parisien élégant
- Maritime chic
- Modern premium

**Références visuelles**:
- Airbnb Luxe (navigation, cards)
- Relais & Châteaux (élégance)
- Booking.com (clarté, conversion)
- Apple.com (espaces, typographie)

**À éviter**:
- ❌ Trop chargé, complexe
- ❌ Couleurs criardes
- ❌ Animations excessives
- ❌ Stock photos génériques

---

## 📄 Contenu & Structure des Pages

### 1. Homepage

**URL**: `/` (FR) et `/en` (EN)

**Sections** (ordre prioritaire):

#### Hero Section (Above the fold)
```
CONTENU:
- Background: Grande image/video du Senang sur la Seine
  (Photo: coucher de soleil, Tour Eiffel arrière-plan)
- Titre H1: "Naviguez, vivez Paris autrement!"
- Sous-titre: "Croisières privées sur la Seine à bord du Senang"
- Prix indicatif: "À partir de 420€ • Jusqu'à 12 personnes"
- CTA Principal: "Réserver votre croisière" (button large, gold)
- CTA Secondaire: "Découvrir le bateau" (link subtle)

LAYOUT:
- Full viewport height (100vh)
- Texte centré
- Overlay gradient dark pour lisibilité texte
- Video en autoplay loop muet (fallback image)

RESPONSIVE:
- Mobile: Stack vertical, texte plus petit
- Tablet/Desktop: Texte large, centré
```

#### Trust Bar (Juste sous hero)
```
CONTENU:
- 4 USPs en ligne:
  * ⭐ "500+ croisières réalisées"
  * 💎 "Bateau privatif de luxe"
  * 🕐 "Croisières de 2h"
  * 📍 "Au cœur de Paris"

LAYOUT:
- Barre horizontale blanche avec ombre légère
- Icons + texte court
- Sticky optionnel en scroll

RESPONSIVE:
- Mobile: 2×2 grid ou carousel
- Desktop: 4 colonnes inline
```

#### Section "Notre Bateau"
```
CONTENU:
Titre H2: "Le Senang, votre bateau privatif"
Description (2-3 lignes):
"Embarquez à bord du Senang, un magnifique bateau de 15 mètres 
pouvant accueillir jusqu'à 12 personnes. Confort, élégance et 
vue imprenable sur les monuments de Paris."

3 Cards avec icons:
Card 1:
- Icon: 🚢
- Titre: "Bateau privatif"
- Texte: "Vous seul·e·s à bord avec vos invités"

Card 2:
- Icon: 🪑
- Titre: "Tout équipé"
- Texte: "Salon confortable, pont ensoleillé, toilettes"

Card 3:
- Icon: 🎵
- Titre: "Ambiance personnalisée"
- Texte: "Musique, décoration selon vos envies"

CTA: "Découvrir le Senang" (button outline)

LAYOUT:
- Image bateau gauche (50%)
- Contenu droite (50%)
- 3 cards en grid 3 colonnes sous le texte

RESPONSIVE:
- Mobile: Stack vertical, image en premier
- Desktop: Side by side
```

#### Section "Nos Croisières"
```
CONTENU:
Titre H2: "Nos formules de croisières"
Sous-titre: "Choisissez la formule qui vous convient"

4 Cards (pricing style):
1. Croisière Découverte
   - Prix: 420€
   - Durée: 2h
   - Personnes: 1-6 pers.
   - Inclus: Croisière + Capitaine
   - Image: Bateau de jour
   - CTA: "Réserver"

2. Croisière Champagne
   - Prix: 480€
   - Durée: 2h
   - Personnes: 1-6 pers.
   - Inclus: Croisière + Champagne
   - Image: Champagne à bord
   - Badge: "Populaire"
   - CTA: "Réserver"

3. Croisière Premium
   - Prix: 600€
   - Durée: 2h
   - Personnes: 1-6 pers.
   - Inclus: Champagne + Planches apéritives
   - Image: Apéro à bord
   - CTA: "Réserver"

4. Croisière Guidée
   - Prix: 600€
   - Durée: 2h
   - Personnes: 1-11 pers.
   - Inclus: Guide conférencier
   - Image: Guide + passagers
   - CTA: "Réserver"

LAYOUT:
- Grid 4 colonnes (responsive 2×2 puis 1 col mobile)
- Cards avec hover effect (scale 1.05)
- Prix en gros, bien visible
- CTA gold visible

RESPONSIVE:
- Mobile: 1 colonne, carousel swipe
- Tablet: 2×2 grid
- Desktop: 4 colonnes
```

#### Section "Témoignages"
```
CONTENU:
Titre H2: "Ils ont navigué avec nous"
Sous-titre: "Note moyenne: 4.9/5 ⭐ (120+ avis Google)"

Carousel avec 3-4 témoignages visibles:

Témoignage 1:
- Photo: Avatar client (ou initiales)
- Nom: "Sophie M."
- Date: "Décembre 2025"
- Note: ⭐⭐⭐⭐⭐
- Texte: "Magnifique expérience pour mon EVJF ! 
  Michel était aux petits soins. Vue incroyable 
  sur la Tour Eiffel au coucher du soleil."

Témoignage 2:
- Nom: "Nicolas B."
- Date: "Novembre 2025"
- Note: ⭐⭐⭐⭐⭐
- Texte: "Parfait pour notre team building ! 
  Bateau spacieux, ambiance top. Je recommande !"

[+ 2 autres témoignages]

LAYOUT:
- Carousel horizontal
- 3 cards visibles desktop, 1 mobile
- Navigation dots + arrows
- Auto-play optionnel

RESPONSIVE:
- Mobile: 1 card full-width, swipe
- Desktop: 3 cards visibles
```

#### Section "Instagram / Galerie"
```
CONTENU:
Titre H2: "Découvrez nos croisières en images"
Texte: "Suivez-nous sur Instagram @bateau_a_paris"

Grid 6-8 photos récentes:
- Mix: Bateau, Paris, clients heureux, événements
- Format carré (1:1)
- Hover: overlay avec icone Instagram

CTA: "Voir plus de photos" → lien vers /galerie

LAYOUT:
- Grid 4 colonnes desktop, 2 mobile
- Images lazy-loaded
- Aspect ratio constant

RESPONSIVE:
- Mobile: 2 colonnes
- Tablet: 3 colonnes
- Desktop: 4 colonnes
```

#### Section CTA Final
```
CONTENU:
Background: Image Seine avec effet parallax
Overlay: Gradient dark pour lisibilité
Titre H2: "Prêt à embarquer ?"
Texte: "Réservez votre croisière privée dès maintenant"
CTA: "Réserver maintenant" (button XL, gold)

LAYOUT:
- Section pleine largeur
- Texte centré
- Padding généreux (100px top/bottom)

RESPONSIVE:
- Même layout mobile/desktop
- Ajuster padding mobile
```

#### Footer
```
CONTENU:
4 colonnes:

Colonne 1: Logo + Tagline
- Logo Un Bateau à Paris
- "Croisières privées sur la Seine"
- Réseaux sociaux: Instagram, YouTube

Colonne 2: Navigation
- Le Bateau
- La Croisière
- Galerie
- Tarifs
- Actualités
- Contact

Colonne 3: Informations
- FAQ
- CGV
- Mentions légales
- Politique confidentialité

Colonne 4: Contact
- Port de l'Arsenal, Paris 12ème
- Tél: +33 6 70 34 25 43
- Email: capitaine@bateau-a-paris.fr

Copyright:
"© 2026 Un Bateau à Paris - Tous droits réservés"

LAYOUT:
- Background bleu marine foncé
- Texte blanc/gris clair
- Liens hover: gold

RESPONSIVE:
- Mobile: Stack vertical, 1 colonne
- Desktop: 4 colonnes
```

---

### 2. Page "Le Bateau"

**URL**: `/le-bateau` (FR) et `/en/our-boat` (EN)

#### Hero
```
CONTENU:
- Image large: Le Senang (vue extérieure)
- Titre H1: "Le Senang, votre bateau privatif"
- Breadcrumb: Accueil > Le Bateau
```

#### Section "Présentation"
```
CONTENU:
2 colonnes:

Gauche - Texte:
Titre H2: "Un bateau d'exception"
Paragraphes (3-4):
"Le Senang est un magnifique bateau de 15 mètres de long...
[Histoire, caractéristiques, confort]"

Droite - Image:
Photo bateau (vue salon intérieur)

LAYOUT:
- 50/50 split
- Alternance image gauche/droite entre sections
```

#### Section "Caractéristiques"
```
CONTENU:
Titre H2: "Caractéristiques techniques"

Grid 2×3 cards:
- Longueur: 15 mètres
- Capacité: 12 personnes max
- Vitesse: 12 km/h
- Motorisation: Diesel
- Confort: Chauffage, toilettes
- Équipements: Salon, pont, cuisine

LAYOUT:
- Cards avec icons
- Grid responsive
```

#### Section "Galerie Photos"
```
CONTENU:
Titre H2: "Le Senang en images"

Galerie 12-15 photos:
- Mix extérieur / intérieur / détails
- Grid masonry ou grid régulier
- Lightbox au clic

LAYOUT:
- Grid 3 colonnes desktop
- Gap entre images
- Lazy loading
```

#### Section "Équipements"
```
CONTENU:
Titre H2: "Équipements à bord"

2 listes côte à côte:

Confort:
- Salon spacieux
- Sièges confortables
- Chauffage
- Toilettes
- Cuisine équipée

Technique:
- Système audio Bluetooth
- Prises électriques
- Éclairage LED
- Taud soleil/pluie
- Gilets de sauvetage

LAYOUT:
- 2 colonnes avec checkmarks
- Icons pour chaque item
```

#### CTA Section
```
CONTENU:
"Convaincu ? Réservez votre croisière !"
CTA: "Réserver maintenant"
```

---

### 3. Page "La Croisière"

**URL**: `/la-croisiere` (FR) et `/en/the-cruise` (EN)

#### Hero
```
Image: Vue depuis le bateau (Tour Eiffel)
Titre H1: "Découvrez Paris depuis la Seine"
```

#### Section "Le Parcours"
```
CONTENU:
Titre H2: "Notre parcours sur la Seine"

Carte interactive (ou image carte stylisée):
- Point départ: Port de l'Arsenal
- Monuments: Tour Eiffel, Notre-Dame, Louvre, etc.
- Durée: 2h
- Distance: ~15 km

Timeline verticale:
1. Départ Port de l'Arsenal
2. Canal Saint-Martin
3. Notre-Dame de Paris
4. Louvre & Musée d'Orsay
5. Tour Eiffel (point photo)
6. Pont Alexandre III
7. Retour Port de l'Arsenal

LAYOUT:
- Map à gauche (ou top mobile)
- Timeline à droite
```

#### Section "Nos Formules"
```
CONTENU:
Même que homepage mais plus détaillé:
- Tableau comparatif
- Descriptions longues
- Photos pour chaque formule
- FAQ intégrées

LAYOUT:
- Tableau responsive ou cards
- Toggle FR/EN pour prix
```

#### Section "Déroulé Type"
```
CONTENU:
Titre H2: "Comment se déroule votre croisière ?"

Steps:
1. Accueil (15min avant)
   - Rencontre avec le capitaine
   - Installation à bord
   - Briefing sécurité

2. Départ (H+0)
   - Largage des amarres
   - Début de la navigation
   - Apéritif si option

3. Navigation (2h)
   - Découverte monuments
   - Ambiance musicale
   - Photos/vidéos

4. Retour (H+2)
   - Retour port
   - Débarquement
   - Au revoir et merci !

LAYOUT:
- Timeline verticale avec icons
- Images illustratives
```

#### Section "Occasions"
```
CONTENU:
Titre H2: "Parfait pour toutes les occasions"

Grid 6 use cases:
- Demande en mariage 💍
- Anniversaire 🎂
- EVJF/EVG 🎉
- Team building 💼
- Tourisme 📸
- Événement privé 🥂

LAYOUT:
- Grid 3×2
- Cards avec emoji + titre + description courte
```

---

### 4. Page "Galerie"

**URL**: `/galerie` (FR) et `/en/gallery` (EN)

#### Hero Simple
```
Titre H1: "Galerie Photos"
Sous-titre: "Découvrez le Senang et nos croisières en images"
```

#### Filtres
```
CONTENU:
Boutons filtres:
- Tous (par défaut)
- Le Bateau
- Intérieur
- Extérieur
- Paris
- Événements

LAYOUT:
- Barre horizontale sticky
- Pills style
- Active state bien visible
```

#### Galerie Masonry
```
CONTENU:
30-50 photos haute qualité

FEATURES:
- Layout masonry responsive
- Lazy loading
- Lightbox moderne (keyboard nav, compteur, zoom)
- Smooth transitions
- Loading skeleton

LAYOUT:
- 4 colonnes desktop
- 2 colonnes tablet
- 1 colonne mobile
- Gap: 16px
```

---

### 5. Page "Tarifs"

**URL**: `/tarifs` (FR) et `/en/rates` (EN)

#### Hero
```
Titre H1: "Nos tarifs"
Sous-titre: "Transparents, tout compris"
```

#### Tableau Comparatif
```
CONTENU:
Tableau 4 formules:
Lignes:
- Prix
- Durée
- Capacité
- Capitaine
- Champagne
- Planches apéritives
- Guide
- Musique
- Décoration perso
- CTA Réserver

LAYOUT:
- Table responsive
- Highlight colonne "Populaire"
- Checkmarks/crosses
```

#### Section "Suppléments"
```
CONTENU:
Titre H2: "Options supplémentaires"

Liste prix:
- Personnes supplémentaires: +70€/pers (7-12)
- Prolongation 1h: +150€
- Champagne bouteille suppl.: +40€
- Planches apéritives: +80€
- Décoration florale: sur devis
- Musicien live: sur devis

LAYOUT:
- Cards ou liste propre
- Prix bien visibles
```

#### Section "Conditions"
```
CONTENU:
Titre H2: "Conditions & Réservation"

Accordion/FAQ:
- Comment réserver ?
- Acompte ?
- Annulation ?
- Météo défavorable ?
- Paiement acceptés ?
- etc.

LAYOUT:
- Accordions simples
- Icons expand/collapse
```

---

### 6. Page "Actualités"

**URL**: `/actualites` (FR) et `/en/news` (EN)

#### Hero
```
Titre H1: "Actualités"
Sous-titre: "Les dernières nouvelles du Senang"
```

#### Grid Articles
```
CONTENU:
Grid 3 colonnes cards:
- Image featured
- Date publication
- Titre article
- Excerpt (3 lignes)
- "Lire la suite" link

LAYOUT:
- Grid responsive
- Pagination ou infinite scroll
- Sidebar optionnelle (catégories, archives)

RESPONSIVE:
- Mobile: 1 colonne
- Tablet: 2 colonnes
- Desktop: 3 colonnes
```

#### Article Single
```
CONTENU:
- Image hero full-width
- Titre H1
- Meta (date, auteur)
- Contenu riche (texte, images, vidéos)
- Galerie intégrée si pertinent
- CTA fin article: "Réserver une croisière"
- Articles similaires (3)

LAYOUT:
- Max-width 800px pour lisibilité
- Padding généreux
- Typographie optimisée lecture
```

---

### 7. Page "Contact"

**URL**: `/contact` (FR) et `/en/contact` (EN)

#### Hero
```
Titre H1: "Contactez-nous"
Sous-titre: "Une question ? Nous sommes là pour vous répondre"
```

#### 2 Colonnes Layout
```
GAUCHE - Formulaire:
Champs:
- Nom* (required)
- Email* (required)
- Téléphone
- Sujet (select)
  * Demande d'information
  * Devis personnalisé
  * Question technique
  * Autre
- Message* (textarea)
- Checkbox RGPD*
- Bouton "Envoyer"

Validation:
- Temps réel
- Messages erreur clairs
- Success message après envoi

DROITE - Informations:
Map Google Maps (iframe):
- Port de l'Arsenal
- Pin personnalisé

Contact:
- Adresse: Port de l'Arsenal, 75012 Paris
- Téléphone: +33 6 70 34 25 43
- Email: capitaine@bateau-a-paris.fr

Horaires:
- Disponible 7j/7
- Réponse sous 24h

Réseaux sociaux:
- Instagram
- YouTube

RESPONSIVE:
- Mobile: Stack vertical (form puis infos)
- Desktop: 60/40 split
```

---

### 8. Page "Réservation"

**URL**: `/reservation` (FR) et `/en/booking` (EN)

```
CONTENU:
Hero:
Titre H1: "Réservez votre croisière"
Sous-titre: "Sélectionnez votre formule et votre créneau"

Body:
- iFrame Bookly (WordPress)
- Entouré d'un container Next.js stylisé
- Reassurance badges sous iFrame:
  * 🔒 Paiement sécurisé SSL
  * 📧 Confirmation immédiate
  * 📅 Synchro Google Calendar
  * 💳 CB, PayPal, Virement

LAYOUT:
- iFrame centré, max-width 900px
- Background gradient subtil
- Padding généreux
```

---

## 🎯 Composants Réutilisables

**À créer dans Lovable:**

1. **Button Component**
```
Variants:
- Primary (gold gradient)
- Secondary (outline blue)
- Ghost (transparent, hover)

Sizes:
- Small (py-2 px-4)
- Medium (py-3 px-6)
- Large (py-4 px-8)

States:
- Default
- Hover (scale 1.05)
- Active
- Disabled
```

2. **Card Component**
```
Variants:
- Pricing card
- Feature card
- Testimonial card
- Blog card

Props:
- Image (optional)
- Title
- Description
- CTA (optional)
- Badge (optional)
```

3. **Hero Component**
```
Props:
- Background (image/video)
- Title (H1)
- Subtitle
- CTA primary
- CTA secondary (optional)
- Breadcrumb (optional)
```

4. **Section Container**
```
Props:
- Background color
- Padding size (small/medium/large)
- Max-width
- Centered (boolean)
```

5. **Testimonial Card**
```
Props:
- Avatar/Initials
- Name
- Date
- Rating (1-5 stars)
- Text
```

---

## 🎬 Animations & Interactions

**À intégrer subtilement:**

1. **Scroll Animations** (Framer Motion)
- Fade in elements on scroll
- Slide up cards
- Stagger children (cards grid)

2. **Hover Effects**
- Scale 1.05 sur cards
- Color transition sur boutons
- Underline animée sur links

3. **Page Transitions**
- Fade between pages
- Skeleton loaders pendant fetch

4. **Micro-interactions**
- Checkbox animation
- Form validation feedback
- Success/Error toasts

**Performance:**
- Animations 60fps
- GPU-accelerated (transform, opacity)
- Reduced motion support

---

## 📱 Responsive Breakpoints

```
Mobile: < 640px (sm)
Tablet: 640px - 1024px (md-lg)
Desktop: > 1024px (xl)
Large Desktop: > 1280px (2xl)
```

**Priorités responsive:**

1. **Mobile (< 640px)**
- Stack vertical
- Padding réduit (px-4)
- Font sizes réduits (80-90%)
- Hamburger menu
- Touch-friendly (min 44px tap targets)
- Images optimisées (WebP, lazy load)

2. **Tablet (640-1024px)**
- Grids 2 colonnes
- Navigation horizontale
- Padding medium (px-6)

3. **Desktop (> 1024px)**
- Grids 3-4 colonnes
- Mega-menu navigation
- Hover states riches
- Padding large (px-8)

---

## ✅ Checklist Lovable

### Phase 1: Homepage (Jour 1)
- [ ] Hero avec video/image background
- [ ] Trust bar 4 USPs
- [ ] Section "Notre Bateau" (2 colonnes)
- [ ] Section "Nos Croisières" (4 cards)
- [ ] Section Témoignages (carousel)
- [ ] Section Instagram/Galerie (grid photos)
- [ ] CTA final
- [ ] Footer complet
- [ ] Navigation header
- [ ] Tests mobile/desktop

### Phase 2: Pages Principales (Jour 2)
- [ ] Page "Le Bateau" complète
- [ ] Page "La Croisière" complète
- [ ] Page "Galerie" (grid + lightbox)
- [ ] Tests responsive

### Phase 3: Pages Secondaires (Jour 3)
- [ ] Page "Tarifs" (tableau comparatif)
- [ ] Page "Contact" (form + map)
- [ ] Page "Actualités" (grid articles)
- [ ] Article single template
- [ ] Tests responsive

### Phase 4: Composants & Polish (Jour 4)
- [ ] Composants réutilisables extraits
- [ ] Animations Framer Motion
- [ ] Hover states tous éléments
- [ ] Dark mode (optionnel)
- [ ] Tests finaux
- [ ] Export code

### Phase 5: Validation (Jour 5)
- [ ] Revue UX/UI complète
- [ ] Tests utilisateurs (2-3 personnes)
- [ ] Feedback & ajustements
- [ ] Screenshots finales
- [ ] Documentation design system

---

## 📦 Livrables Lovable

À la fin de la phase Lovable, tu auras:

1. **Code source Next.js**
- Arborescence complète
- Composants React
- Tailwind config
- Animations Framer Motion

2. **Screenshots**
- Toutes pages desktop
- Toutes pages mobile
- États hover/active
- Responsive breakpoints

3. **Design System** (minimal)
- Palette couleurs
- Typography scale
- Spacing system
- Components library

4. **Documentation**
- Structure fichiers
- Props composants
- Notes techniques

---

## 🚀 Prompts Lovable - Copy/Paste

### Prompt 1: Homepage Hero

```
Crée la section Hero pour la homepage de "Un Bateau à Paris", site de croisières privées sur la Seine.

DESIGN:
- Full viewport height (100vh)
- Background: Image du bateau Senang sur la Seine (utilise placeholder haute qualité)
- Overlay gradient: rgba(30, 58, 138, 0.6) → rgba(59, 130, 246, 0.4)
- Contenu centré verticalement et horizontalement

CONTENU:
- Logo (texte "Un Bateau à Paris" stylisé) en haut
- H1: "Naviguez, vivez Paris autrement!" (text-white, text-5xl md:text-6xl, font-bold)
- Sous-titre: "Croisières privées sur la Seine à bord du Senang" (text-white/90, text-xl)
- Prix: "À partir de 420€ • Jusqu'à 12 personnes" (text-gold, text-lg)
- CTA Principal: Button "Réserver votre croisière" (gold gradient, large, shadow-xl)
- CTA Secondaire: Link "Découvrir le bateau" (text-white, underline hover)

ANIMATIONS:
- Fade in progressive des éléments (Framer Motion)
- Stagger children (delay 100ms entre chaque)
- Button hover: scale 1.05

RESPONSIVE:
- Mobile: text-4xl pour H1, padding réduit
- Desktop: text-6xl pour H1, spacing généreux

Utilise Next.js 14, TypeScript, Tailwind CSS, Framer Motion.
```

### Prompt 2: Section Nos Croisières

```
Crée la section "Nos Croisières" avec 4 pricing cards.

DESIGN:
- Background: Gradient subtil blue-50 → white
- Container max-w-7xl mx-auto
- Padding: py-20
- Titre section centré + sous-titre

CONTENU:
Titre H2: "Nos formules de croisières"
Sous-titre: "Choisissez la formule qui vous convient"

4 Cards en grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-4):

Card 1 - Découverte:
- Image placeholder bateau jour
- Badge: null
- Titre: "Croisière Découverte"
- Prix: "420€" (text-3xl, font-bold)
- Durée: "2 heures"
- Capacité: "1 à 6 personnes"
- Inclus liste: ["Croisière sur la Seine", "Capitaine professionnel"]
- Button: "Réserver" (outline blue)

Card 2 - Champagne (POPULAIRE):
- Image placeholder champagne
- Badge: "Populaire" (gold, absolute top-right)
- Titre: "Croisière Champagne"
- Prix: "480€"
- Durée: "2 heures"
- Capacité: "1 à 6 personnes"
- Inclus: ["Croisière", "Capitaine", "Champagne"]
- Button: "Réserver" (gold solid)

Card 3 - Premium:
- Image placeholder apéro
- Prix: "600€"
- Inclus: ["Croisière", "Capitaine", "Champagne", "Planches apéritives"]
- Button: "Réserver" (outline blue)

Card 4 - Guidée:
- Image placeholder guide
- Prix: "600€"
- Capacité: "1 à 11 personnes"
- Inclus: ["Croisière", "Capitaine", "Guide conférencier"]
- Button: "Réserver" (outline blue)

STYLE CARDS:
- Background white
- Border radius: 16px
- Shadow: shadow-lg
- Hover: scale 1.05, shadow-2xl (transition smooth)
- Padding: p-6
- Gap entre éléments: space-y-4

RESPONSIVE:
- Mobile: 1 colonne, carousel swipe optionnel
- Tablet: 2×2 grid
- Desktop: 4 colonnes

Utilise Next.js 14, TypeScript, Tailwind CSS, Framer Motion pour animations.
```

### Prompt 3: Page "Le Bateau" Complète

```
Crée la page complète "Le Bateau" présentant le Senang.

STRUCTURE:
1. Hero simple
2. Section Présentation (2 colonnes alternées)
3. Section Caractéristiques (grid 2×3)
4. Galerie photos (grid masonry)
5. Section Équipements (2 listes)
6. CTA final

HERO:
- Image full-width bateau (placeholder)
- Overlay gradient subtle
- Titre H1: "Le Senang, votre bateau privatif"
- Breadcrumb: Accueil > Le Bateau

PRÉSENTATION (Alternating sections):
Section 1 (texte gauche, image droite):
- Titre H2: "Un bateau d'exception"
- Paragraphes: Lorem ipsum describing the boat (3-4 paragraphes)
- Image placeholder bateau extérieur

Section 2 (image gauche, texte droite):
- Titre H3: "Confort et élégance"
- Paragraphes: Lorem ipsum comfort features
- Image placeholder intérieur salon

CARACTÉRISTIQUES:
Titre H2: "Caractéristiques techniques"
Grid 2×3 cards:
- Longueur: "15 mètres" (icon 📏)
- Capacité: "12 personnes" (icon 👥)
- Vitesse: "12 km/h" (icon ⚡)
- Motorisation: "Diesel" (icon 🔧)
- Confort: "Chauffage, toilettes" (icon 🛋️)
- Équipements: "Salon, pont, cuisine" (icon ⚙️)

GALERIE:
- Grid masonry ou grid 3 colonnes
- 12 images placeholder (mix extérieur/intérieur)
- Lightbox au clic (library: yet-another-react-lightbox)
- Lazy loading images

ÉQUIPEMENTS:
2 colonnes side-by-side:
Colonne 1 "Confort":
- ✓ Salon spacieux
- ✓ Sièges confortables
- ✓ Chauffage
- ✓ Toilettes
- ✓ Cuisine équipée

Colonne 2 "Technique":
- ✓ Système audio Bluetooth
- ✓ Prises électriques
- ✓ Éclairage LED
- ✓ Taud soleil/pluie
- ✓ Gilets de sauvetage

CTA FINAL:
Background gradient blue, texte blanc centré
"Convaincu ? Réservez votre croisière !"
Button gold: "Réserver maintenant"

RESPONSIVE:
- Mobile: Stack toutes sections vertical
- Desktop: Layouts 2 colonnes

Utilise Next.js 14, TypeScript, Tailwind CSS, Framer Motion.
Ajoute yet-another-react-lightbox pour la galerie.
```

### Prompt 4: Navigation Header

```
Crée un header de navigation moderne et responsive pour "Un Bateau à Paris".

DESKTOP (> 1024px):
- Position: sticky top-0, backdrop-blur, shadow on scroll
- Background: white/95 (semi-transparent)
- Height: 80px
- Container: max-w-7xl mx-auto, flex justify-between items-center

Left:
- Logo "Un Bateau à Paris" (texte stylisé, bleu marine, font-bold)

Center:
- Navigation links (flex gap-8):
  * Le Bateau
  * La Croisière
  * Galerie
  * Tarifs
  * Actualités
  * Contact
- Hover: text-gold, underline animée

Right:
- Language switcher: FR | EN (toggle)
- CTA Button: "Réserver" (gold gradient, shadow)

MOBILE (< 1024px):
- Hamburger menu (right)
- Logo (left)
- Full-screen overlay menu:
  * Liens stack vertical
  * CTA "Réserver" prominent
  * Language switcher
  * Close button (X)
  * Animate slide-in from right

INTERACTIONS:
- Scroll: background opacity 100%, add shadow
- Mobile menu: Framer Motion slide animation
- Links hover: smooth color transition

ACCESSIBILITY:
- ARIA labels
- Keyboard navigation (tab)
- Focus visible

Utilise Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide React icons.
```

---

# PARTIE 2: BRIEF CLAUDE CODE (Développement Production)

## 🎯 Contexte & Objectifs

**Mission**: Développer la version production du site bateau-a-paris.fr en architecture headless moderne.

**Inputs fournis**:
1. Code Lovable (prototypes validés)
2. Accès SSH serveur production
3. Clone WordPress local (Portainer)
4. Brief design complet (ci-dessus)
5. URLs & credentials WordPress

**Outputs attendus**:
1. Site Next.js 14 production-ready
2. WordPress headless configuré
3. Intégration Bookly (iFrame)
4. Cookie Notice RGPD (voir document dédié)
5. i18n FR/EN
6. SEO optimisé
7. Performances > 90 Lighthouse
8. Documentation complète

**Durée estimée**: 7-8 semaines

---

## 📦 Repositories Git

### Prototype Lovable (référence design)
```
Repository: https://github.com/smiollis/bateau-a-paris.git
Branch: main
Usage: Récupération code UI (composants, design system)
```

### Projet Production
```
Repository: https://github.com/smiollis/bateau-2026
Branch: main (production), develop (dev)
Usage: Code production Next.js + WordPress config
```

### Workflow Git
```bash
# Clone prototype Lovable (lecture seule)
git clone https://github.com/smiollis/bateau-a-paris.git lovable-ref

# Init projet production
git clone https://github.com/smiollis/bateau-2026.git
cd bateau-2026

# Structure branches
git checkout -b develop
git push -u origin develop
```

---

## 🏗️ Architecture Technique

### Stack Cible

```
Frontend (bateau-a-paris.fr):
├── Next.js 14.2+ (App Router)
├── React 18
├── TypeScript 5+
├── Tailwind CSS 3.4+
├── Framer Motion (animations)
├── next-intl (i18n)
├── Sharp (optimisation images)
└── Deployment: Vercel

Backend (api.bateau-a-paris.fr):
├── WordPress 6.9+
├── PHP 8.2+
├── MariaDB 10.3+
├── Bookly 26.3+ (+ add-ons existants)
├── Plugin headless mode (custom)
├── ACF Pro (custom fields)
├── Yoast SEO (metadata)
└── Hosting: VPS Plesk actuel

Infrastructure:
├── DNS: Cloudflare
├── CDN: Cloudflare + Vercel
├── Images: Cloudflare Images ou Vercel
├── SSL: Automatique (Vercel + Let's Encrypt)
└── Monitoring: Vercel Analytics + Sentry
```

### Domaines & URLs

```
Production:
├── bateau-a-paris.fr           → Next.js (frontend)
├── api.bateau-a-paris.fr       → WordPress (backend API)
└── api.bateau-a-paris.fr/reservation-embed  → Bookly iFrame

Développement:
├── localhost:3000              → Next.js dev
├── localhost:8080              → WordPress Docker
└── beta.bateau-a-paris.fr     → Staging (optionnel)
```

---

## 📋 Phase 1: Audit & Setup (Semaine 1)

### 1.1 Audit Serveur Production

**Accès fourni**:
```bash
Host: bateau-a-paris.fr
User: bateau-a-paris.fr_zfbfr6bqojq
SSH: bash (chrooted)
Path: ~/httpdocs
```

**Actions attendues**:

```bash
# Se connecter
ssh bateau-a-paris.fr_zfbfr6bqojq@bateau-a-paris.fr

# 1. Vérifier structure WordPress
cd ~/httpdocs
ls -la
# Identifier:
# - Version WordPress (wp-includes/version.php)
# - Plugins actifs
# - Thème utilisé (Porto + child)
# - Uploads (taille, nombre fichiers)

# 2. Exporter base de données
wp db export ~/backups/bateau_prod_$(date +%Y%m%d).sql
gzip ~/backups/bateau_prod_$(date +%Y%m%d).sql

# 3. Vérifier config serveur
php -v  # Version PHP
mysql --version  # Version MySQL/MariaDB
df -h  # Espace disque

# 4. Lister plugins Bookly installés
wp plugin list | grep bookly

# 5. Identifier custom fields ACF
# Via wp-admin > ACF > Field Groups

# 6. Export contenu structuré
wp post list --post_type=page --format=json > ~/exports/pages.json
wp post list --post_type=post --format=json > ~/exports/posts.json

# 7. Télécharger assets critiques
# Via rsync ou scp
```

**Livrables attendus**:
- [ ] Document audit serveur (specs, versions, structure)
- [ ] Liste plugins actifs avec versions
- [ ] Schema ACF fields exporté (JSON)
- [ ] Dump base données (compressé)
- [ ] Liste pages/posts avec slugs & IDs
- [ ] Taille uploads directory
- [ ] Screenshots wp-admin (dashboard, Bookly config)

### 1.2 Setup WordPress Local avec Portainer

**Environnement**: Portainer (déjà installé sur machine Seb)

**Actions attendues**:

```bash
# Créer stack Portainer pour bateau-a-paris

# 1. Préparer dossier local
mkdir -p ~/Projects/bateau-a-paris/wordpress-docker
cd ~/Projects/bateau-a-paris/wordpress-docker

# 2. Créer docker-compose.yml (voir ci-dessous)
# 3. Copier dump SQL dans ./database/init.sql
# 4. Déployer via Portainer UI ou CLI
```

**docker-compose.yml pour Portainer**:

```yaml
version: '3.9'

services:
  db:
    image: mariadb:10.3
    container_name: bateau_db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: bateau_paris
      MYSQL_USER: bateau_user
      MYSQL_PASSWORD: bateau_pass
    volumes:
      - db_data:/var/lib/mysql
      - ./database:/docker-entrypoint-initdb.d
    networks:
      - bateau_network
    ports:
      - "3307:3306"

  wordpress:
    image: wordpress:6.9-php8.2-apache
    container_name: bateau_wordpress
    restart: unless-stopped
    depends_on:
      - db
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_NAME: bateau_paris
      WORDPRESS_DB_USER: bateau_user
      WORDPRESS_DB_PASSWORD: bateau_pass
      WORDPRESS_CONFIG_EXTRA: |
        define('WP_MEMORY_LIMIT', '1024M');
        define('WP_MAX_MEMORY_LIMIT', '1024M');
        define('WP_DEBUG', true);
        define('WP_DEBUG_LOG', true);
        define('WP_DEBUG_DISPLAY', false);
    volumes:
      - ./wordpress:/var/www/html
      - ./php-config/uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
    networks:
      - bateau_network
    ports:
      - "8080:80"

  phpmyadmin:
    image: phpmyadmin:latest
    container_name: bateau_phpmyadmin
    restart: unless-stopped
    depends_on:
      - db
    environment:
      PMA_HOST: db
      PMA_USER: root
      PMA_PASSWORD: root
      UPLOAD_LIMIT: 256M
    networks:
      - bateau_network
    ports:
      - "8081:80"

  mailhog:
    image: mailhog/mailhog:latest
    container_name: bateau_mailhog
    restart: unless-stopped
    networks:
      - bateau_network
    ports:
      - "8025:8025"
      - "1025:1025"

  redis:
    image: redis:7-alpine
    container_name: bateau_redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    networks:
      - bateau_network
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes

volumes:
  db_data:
  redis_data:

networks:
  bateau_network:
    driver: bridge
```

**Déploiement dans Portainer**:

1. **Via Portainer UI**:
   - Stacks > Add stack
   - Name: bateau-a-paris-local
   - Web editor: Copier docker-compose.yml
   - Deploy stack

2. **Via Portainer CLI** (si préféré):
```bash
# Avec Portainer API
curl -X POST http://localhost:9000/api/stacks \
  -H "X-API-Key: YOUR_API_KEY" \
  -F "Name=bateau-a-paris-local" \
  -F "StackFileContent=@docker-compose.yml"
```

3. **Via docker-compose direct** (si Portainer pas utilisé):
```bash
docker-compose up -d
```

**Import base données**:

```bash
# Méthode 1: Auto-import au démarrage
# Copier dump dans ./database/init.sql (déjà fait en Phase 1.1)
# Au premier démarrage, MariaDB importe automatiquement

# Méthode 2: Import manuel après démarrage
docker exec -i bateau_db mysql -u root -proot bateau_paris < database/init.sql

# Méthode 3: Via phpMyAdmin
# http://localhost:8081 > Import > Upload init.sql
```

**Update URLs WordPress**:

```bash
# Installer WP-CLI dans container
docker exec -it bateau_wordpress bash

# Dans le container:
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
mv wp-cli.phar /usr/local/bin/wp

# Search-replace URLs
wp search-replace \
  'https://bateau-a-paris.fr' \
  'http://localhost:8080' \
  --all-tables \
  --allow-root

exit  # Sortir du container
```

**Livrables attendus**:
- [ ] Stack Portainer "bateau-a-paris-local" déployée
- [ ] 5 containers running (WordPress, DB, phpMyAdmin, Mailhog, Redis)
- [ ] WordPress accessible http://localhost:8080
- [ ] wp-admin accessible
- [ ] Bookly fonctionnel
- [ ] URLs mises à jour
- [ ] Documentation Portainer stack

---

### 1.3 Setup Projet Next.js avec VS Code

**Environnement**: VS Code (recommandé pour développement)

**Prérequis**:
- VS Code installé
- Node.js 18+ installé
- Git configuré

**Setup initial**:

```bash
# Cloner le repo production
cd ~/Projects
git clone https://github.com/smiollis/bateau-2026.git
cd bateau-2026

# Créer branche develop
git checkout -b develop
git push -u origin develop

# Ouvrir dans VS Code
code .
```

**Extensions VS Code recommandées**:

Créer `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "streetsidesoftware.code-spell-checker",
    "formulahendry.auto-rename-tag",
    "dsznajder.es7-react-js-snippets",
    "ms-azuretools.vscode-docker"
  ]
}
```

**Settings VS Code projet**:

Créer `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

**Tasks VS Code** (optionnel):

Créer `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Next.js Dev",
      "type": "shell",
      "command": "npm run dev",
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "Start WordPress (Portainer)",
      "type": "shell",
      "command": "cd ../wordpress-docker && docker-compose up -d",
      "problemMatcher": []
    }
  ]
}
```

**Créer projet Next.js**:

```bash
# Dans bateau-2026/
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm

cd frontend
```

**Installer dépendances**:

```bash
npm install \
  framer-motion \
  next-intl \
  yet-another-react-lightbox \
  react-hook-form \
  @hookform/resolvers \
  zod \
  @tanstack/react-query \
  clsx \
  tailwind-merge

npm install -D \
  @types/node \
  eslint-config-prettier \
  prettier \
  prettier-plugin-tailwindcss
```

**Configuration initiale** (voir Phase 1.3 du guide step-by-step pour détails):
- Tailwind config (couleurs custom)
- TypeScript config
- ESLint + Prettier
- Structure fichiers

**Git init & commit**:

```bash
git add .
git commit -m "Initial Next.js setup"
git push origin develop
```

**Livrables attendus**:
- [ ] Repo bateau-2026 cloné
- [ ] VS Code configuré (extensions + settings)
- [ ] Projet Next.js initialisé
- [ ] Dépendances installées
- [ ] Tailwind configuré
- [ ] Structure fichiers créée
- [ ] Premier commit Git
- [ ] npm run dev fonctionne
- [ ] README.md projet

**Architecture fichiers attendue**:

```
bateau-frontend/
├── src/
│   ├── app/
│   │   ├── [locale]/              # i18n routing
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── le-bateau/
│   │   │   ├── la-croisiere/
│   │   │   ├── galerie/
│   │   │   ├── tarifs/
│   │   │   ├── actualites/
│   │   │   ├── contact/
│   │   │   └── reservation/
│   │   └── api/                   # API routes si besoin
│   ├── components/
│   │   ├── ui/                    # Composants base (Button, Card, etc.)
│   │   ├── layout/                # Header, Footer, etc.
│   │   ├── sections/              # Sections pages (Hero, Features, etc.)
│   │   └── wordpress/             # Composants liés WP (BlogCard, etc.)
│   ├── lib/
│   │   ├── wordpress.ts           # API client WordPress
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── types/
│   │   ├── wordpress.d.ts
│   │   └── global.d.ts
│   ├── hooks/
│   │   ├── useWordPress.ts
│   │   └── useBookly.ts
│   └── config/
│       ├── site.ts                # Config site (meta, URLs, etc.)
│       └── navigation.ts
├── public/
│   ├── images/
│   ├── fonts/
│   └── locales/                   # i18n translations
│       ├── fr.json
│       └── en.json
├── .env.local
├── .env.production
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

**Livrables attendus**:
- [ ] Projet Next.js initialisé
- [ ] Structure fichiers complète
- [ ] Configuration Tailwind custom (couleurs, fonts)
- [ ] Configuration TypeScript stricte
- [ ] ESLint + Prettier configurés
- [ ] Git repository initialisé
- [ ] README.md avec instructions dev

---

## 📋 Phase 2: WordPress Headless (Semaine 2)

### 2.1 Plugin Headless Mode

**Fichier**: `wp-content/plugins/bateau-headless/bateau-headless.php`

**Fonctionnalités attendues**:

```php
<?php
/**
 * Plugin Name: Bateau Headless Mode
 * Description: Configure WordPress en mode headless pour bateau-a-paris.fr
 * Version: 1.0.0
 * Author: Seb
 */

// 1. Redirection frontend vers Next.js
// SAUF: wp-admin, wp-json, wp-content, reservation-embed

// 2. Configuration CORS pour Next.js
// Origin autorisé: https://bateau-a-paris.fr

// 3. Endpoints REST API custom
// /wp-json/bateau/v1/homepage
// /wp-json/bateau/v1/page/{slug}
// /wp-json/bateau/v1/posts
// /wp-json/bateau/v1/croisiere/{id}

// 4. Message dashboard admin
// "Mode Headless activé - Frontend: bateau-a-paris.fr"

// 5. Nettoyage <head>
// Supprimer styles/scripts thème inutiles
```

**Livrables attendus**:
- [ ] Plugin headless fonctionnel
- [ ] Redirections testées
- [ ] CORS configuré et testé
- [ ] Endpoints custom (si pertinent)
- [ ] Documentation plugin (README.md)

### 2.2 Template Bookly Minimal

**Fichier**: `wp-content/themes/bateau-child/page-reservation-embed.php`

**Fonctionnalités attendues**:

```php
<?php
/**
 * Template Name: Bookly Embed (No Header/Footer)
 * Description: Page minimale pour iFrame Bookly
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <?php wp_head(); ?>
    <style>
        /* CSS responsive Bookly */
        /* Communication hauteur via postMessage */
    </style>
</head>
<body>
    <?php echo do_shortcode('[bookly-form]'); ?>
    <script>
        // postMessage height to parent
    </script>
    <?php wp_footer(); ?>
</body>
</html>
```

**Page WordPress à créer**:
- Titre: "Reservation Embed"
- Slug: `reservation-embed`
- Template: Bookly Embed
- Statut: Publié

**Livrables attendus**:
- [ ] Template PHP créé
- [ ] Page WordPress créée
- [ ] CSS responsive Bookly
- [ ] Script postMessage height
- [ ] Tests desktop/mobile
- [ ] Documentation template

### 2.3 Configuration ACF Pro

**Actions attendues**:

Si pas déjà fait, créer Field Groups pour:

1. **Page "Le Bateau"**
```
Field Group: Bateau Details
Location: Page = "Le Bateau"

Fields:
- bateau_caracteristiques (Repeater)
  * icon (Text)
  * titre (Text)
  * valeur (Text)
- bateau_galerie (Gallery)
- bateau_equipements_confort (Repeater)
  * equipement (Text)
- bateau_equipements_technique (Repeater)
  * equipement (Text)
```

2. **Page "La Croisière"**
```
Field Group: Croisiere Details
Location: Page = "La Croisière"

Fields:
- parcours_map_image (Image)
- parcours_etapes (Repeater)
  * ordre (Number)
  * titre (Text)
  * description (Textarea)
  * image (Image)
```

3. **Custom Post Type "Croisière"** (si nécessaire)
```
Post Type: croisiere
Fields:
- croisiere_prix (Number)
- croisiere_duree (Number)
- croisiere_capacite_min (Number)
- croisiere_capacite_max (Number)
- croisiere_inclus (Repeater)
  * item (Text)
- croisiere_image (Image)
- croisiere_badge (Text - optionnel)
```

**Livrables attendus**:
- [ ] Field Groups créés
- [ ] Champs remplis avec données production
- [ ] Export ACF JSON (acf-json/)
- [ ] Documentation champs
- [ ] Tests API REST avec ACF

### 2.4 API WordPress - Client Next.js

**Fichier**: `src/lib/wordpress.ts`

**Fonctionnalités attendues**:

```typescript
// Configuration
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

// Types
interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: any;
  yoast_head_json?: {
    title: string;
    description: string;
    og_image?: string[];
  };
}

interface WPPost {
  // Similar structure
}

// Functions
export async function getPage(slug: string, locale: string): Promise<WPPage>
export async function getPages(): Promise<WPPage[]>
export async function getPosts(limit?: number): Promise<WPPost[]>
export async function getPost(slug: string): Promise<WPPost>
export async function getCroisiere(id: string): Promise<Croisiere>

// Caching avec Next.js
// - revalidate: 3600 (ISR 1h)
// - tags pour invalidation

// Error handling robuste
// - Retry logic
// - Fallback content
// - Logging errors
```

**Livrables attendus**:
- [ ] Fichier wordpress.ts complet
- [ ] Types TypeScript stricts
- [ ] Error handling
- [ ] Caching strategy
- [ ] Tests unitaires fonctions clés
- [ ] Documentation JSDoc

---

## 📋 Phase 3: Intégration Code Lovable (Semaine 3-4)

### 3.1 Refactoring Code Lovable

**Actions attendues**:

1. **Analyser code Lovable**
```bash
# Récupérer code exporté Lovable
# Structure:
lovable-export/
├── components/
├── pages/
├── styles/
└── public/
```

2. **Extraire composants réutilisables**
```typescript
// Identifier patterns:
// - Button (variants, sizes)
// - Card (types)
// - Hero
// - Section
// - Container
// etc.

// Créer dans src/components/ui/
src/components/ui/
├── button.tsx
├── card.tsx
├── hero.tsx
├── section.tsx
└── index.ts  // Barrel export
```

3. **Refactoring architecture**
```typescript
// Avant (Lovable):
// - Code inline
// - Props non typés
// - Pas de separation of concerns

// Après (Production):
// - Composants isolés
// - Props TypeScript stricts
// - Separation data/UI
// - Accessibilité (ARIA)
// - SEO-friendly
```

4. **Optimisations**
```typescript
// - next/image pour toutes images
// - Lazy loading composants lourds
// - Code splitting
// - Preload critical assets
// - Minimize bundle size
```

**Livrables attendus**:
- [ ] Composants UI refactorisés
- [ ] Types TypeScript complets
- [ ] Storybook optionnel (composants isolés)
- [ ] Tests composants clés
- [ ] Documentation composants (props, usage)

### 3.2 Implémentation Pages

**Pour chaque page, implémenter**:

#### Homepage (`app/[locale]/page.tsx`)

```typescript
import { getPage, getPosts } from '@/lib/wordpress';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import NotreBateau from '@/components/sections/NotreBateau';
import NosCroisieres from '@/components/sections/NosCroisieres';
import Testimonials from '@/components/sections/Testimonials';
import InstagramFeed from '@/components/sections/InstagramFeed';
import CTAFinal from '@/components/sections/CTAFinal';

export async function generateMetadata({ params: { locale } }) {
  const page = await getPage('accueil', locale);
  return {
    title: page.yoast_head_json.title,
    description: page.yoast_head_json.description,
    openGraph: { /* ... */ },
    alternates: {
      languages: {
        'fr': '/fr',
        'en': '/en',
      },
    },
  };
}

export default async function HomePage({ params: { locale } }) {
  const page = await getPage('accueil', locale);
  const recentPosts = await getPosts(3);
  const croisiere = await getCroisieres();
  
  return (
    <>
      <Hero data={page.acf.hero} />
      <TrustBar />
      <NotreBateau data={page.acf.notre_bateau} />
      <NosCroisieres croisiere={croisiere} />
      <Testimonials testimonials={page.acf.testimonials} />
      <InstagramFeed posts={recentPosts} />
      <CTAFinal />
    </>
  );
}
```

#### Autres pages (similaire)

- [ ] `/le-bateau`
- [ ] `/la-croisiere`
- [ ] `/galerie`
- [ ] `/tarifs`
- [ ] `/actualites`
- [ ] `/actualites/[slug]`
- [ ] `/contact`
- [ ] `/reservation`

**Livrables attendus**:
- [ ] Toutes pages implémentées
- [ ] Data fetching WordPress fonctionnel
- [ ] SSG/ISR configuré (revalidate approprié)
- [ ] Metadata SEO dynamique (Yoast)
- [ ] Loading states
- [ ] Error states (404, 500)
- [ ] Responsive testé

---

## 📋 Phase 4: Fonctionnalités Avancées (Semaine 5-6)

### 4.1 Internationalisation (i18n)

**Configuration `next-intl`**:

```typescript
// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));

// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
});

// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

**Fichiers traductions**:

```json
// messages/fr.json
{
  "nav": {
    "home": "Accueil",
    "boat": "Le Bateau",
    "cruise": "La Croisière",
    "gallery": "Galerie",
    "rates": "Tarifs",
    "news": "Actualités",
    "contact": "Contact",
    "booking": "Réservation"
  },
  "hero": {
    "title": "Naviguez, vivez Paris autrement!",
    "subtitle": "Croisières privées sur la Seine à bord du Senang",
    "cta": "Réserver votre croisière"
  },
  // ... etc
}

// messages/en.json
{
  "nav": {
    "home": "Home",
    "boat": "Our Boat",
    "cruise": "The Cruise",
    // ... etc
  }
}
```

**Livrables attendus**:
- [ ] next-intl configuré
- [ ] Routing i18n fonctionnel (/fr, /en)
- [ ] Traductions FR complètes
- [ ] Traductions EN complètes
- [ ] Language switcher header
- [ ] hreflang SEO
- [ ] Tests navigation multilingue

### 4.2 Galerie avec Lightbox

**Implémentation**:

```typescript
// app/[locale]/galerie/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Photo {
  id: number;
  url: string;
  alt: string;
  category: 'exterieur' | 'interieur' | 'paris' | 'evenements';
}

export default function GalleryPage({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  
  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(p => p.category === filter);
  
  const slides = filteredPhotos.map(p => ({ src: p.url, alt: p.alt }));
  
  return (
    <>
      {/* Filtres */}
      <FilterBar active={filter} onChange={setFilter} />
      
      {/* Grid Masonry */}
      <div className="columns-1 md:columns-2 lg:columns-4 gap-4">
        {filteredPhotos.map((photo, index) => (
          <div 
            key={photo.id} 
            className="mb-4 break-inside-avoid cursor-pointer"
            onClick={() => {
              setPhotoIndex(index);
              setLightboxOpen(true);
            }}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              width={400}
              height={300}
              className="rounded-lg hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={photoIndex}
        // Plugins: Zoom, Thumbnails, etc.
      />
    </>
  );
}
```

**Livrables attendus**:
- [ ] Galerie masonry responsive
- [ ] Filtres catégories fonctionnels
- [ ] Lightbox avec keyboard nav
- [ ] Lazy loading images
- [ ] Optimisation next/image
- [ ] Loading skeletons
- [ ] Tests multi-devices

### 4.3 Formulaire Contact

**Implémentation avec react-hook-form + Zod**:

```typescript
// app/[locale]/contact/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  subject: z.enum(['info', 'devis', 'technique', 'autre']),
  message: z.string().min(10, "Message trop court"),
  consent: z.boolean().refine(val => val === true, "Consentement requis"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });
  
  const onSubmit = async (data: ContactForm) => {
    // Send to WordPress (Contact Form 7 API ou custom endpoint)
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (res.ok) {
      // Success toast
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

**Livrables attendus**:
- [ ] Formulaire fonctionnel
- [ ] Validation temps réel (Zod)
- [ ] Error messages clairs
- [ ] Success feedback (toast)
- [ ] Intégration WordPress (CF7 ou endpoint custom)
- [ ] Protection spam (honeypot)
- [ ] Tests validation
- [ ] Accessibilité (labels, ARIA)

### 4.4 Réservation iFrame Bookly

**Implémentation**:

```typescript
// app/[locale]/reservation/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function ReservationPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(800);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== process.env.NEXT_PUBLIC_WP_URL) return;
      
      if (event.data.type === 'bookly-height') {
        setIframeHeight(event.data.height + 50);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Réservez votre croisière
        </h1>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-8">
          Choisissez votre formule en quelques clics
        </p>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {loading && (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          )}
          
          <iframe
            ref={iframeRef}
            src={`${process.env.NEXT_PUBLIC_WP_URL}/reservation-embed`}
            style={{ 
              height: `${iframeHeight}px`,
              display: loading ? 'none' : 'block'
            }}
            className="w-full border-0 transition-all duration-300"
            onLoad={() => setLoading(false)}
            title="Formulaire de réservation Bookly"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>

      {/* Reassurance badges */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <ReassuranceCard icon="🔒" title="Paiement sécurisé" />
          <ReassuranceCard icon="📧" title="Confirmation immédiate" />
          <ReassuranceCard icon="📅" title="Google Calendar" />
        </div>
      </div>
    </div>
  );
}
```

**Livrables attendus**:
- [ ] iFrame Bookly intégré
- [ ] Communication postMessage fonctionnelle
- [ ] Hauteur automatique responsive
- [ ] Loading state élégant
- [ ] Reassurance badges
- [ ] Tests booking complet (réservation fictive)
- [ ] Tests paiement sandbox
- [ ] Documentation intégration

---

## 📋 Phase 5: SEO & Performances (Semaine 7)

### 5.0 Cookie Notice RGPD (3-4h)

**📄 Document dédié**: Voir `cookie-notice-rgpd.md` pour implémentation complète.

**Résumé Phase Cookie Notice**:

1. **Récupérer code UI depuis Lovable**:
```bash
git clone https://github.com/smiollis/bateau-a-paris.git lovable-ref
# Copier CookieBanner.tsx et CookieModal.tsx
```

2. **Implémenter logique RGPD**:
```typescript
// Hook personnalisé
useCookieConsent()

// Context Provider
<CookieProvider>

// Types de cookies
- Nécessaires (toujours actifs)
- Analytiques (optionnels - GTM/GA4)
- Marketing (optionnels - si pub)
```

3. **GTM Conditional Loading**:
```typescript
// Ne charger GTM que si consent.analytics === true
if (consent.analytics) {
  loadGTM();
}
```

4. **Tests RGPD**:
- [ ] Pas de tracking avant consentement
- [ ] Banner s'affiche au premier chargement
- [ ] Choix sauvegardés en localStorage
- [ ] Révocation consent supprime cookies
- [ ] Link politique confidentialité

**Livrables**:
- [ ] CookieBanner component fonctionnel
- [ ] CookieModal avec choix granulaires
- [ ] Hook useCookieConsent()
- [ ] GTM chargement conditionnel
- [ ] Page /confidentialite
- [ ] Tests RGPD passés

**⏱️ Temps**: 3-4h (logique + tests)

Voir document complet pour code détaillé et tests.

---

### 5.1 SEO On-Page

**Metadata dynamique**:

```typescript
// app/[locale]/[...slug]/page.tsx
export async function generateMetadata({ params }) {
  const page = await getPage(params.slug, params.locale);
  const yoast = page.yoast_head_json;
  
  return {
    title: yoast.title,
    description: yoast.description,
    keywords: yoast.keywords,
    openGraph: {
      title: yoast.og_title,
      description: yoast.og_description,
      images: yoast.og_image,
      locale: params.locale,
      type: 'website',
      url: `https://bateau-a-paris.fr/${params.locale}/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: yoast.twitter_title,
      description: yoast.twitter_description,
      images: yoast.twitter_image,
    },
    alternates: {
      canonical: yoast.canonical,
      languages: {
        'fr': `/fr/${params.slug}`,
        'en': `/en/${params.slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}
```

**Structured Data (JSON-LD)**:

```typescript
// lib/structured-data.ts
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Un Bateau à Paris',
    image: 'https://bateau-a-paris.fr/images/logo.png',
    '@id': 'https://bateau-a-paris.fr',
    url: 'https://bateau-a-paris.fr',
    telephone: '+33670342543',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Port de l\'Arsenal',
      addressLocality: 'Paris',
      postalCode: '75012',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8515174,
      longitude: 2.3687542,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
        'Friday', 'Saturday', 'Sunday'
      ],
      opens: '09:00',
      closes: '21:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '120',
    },
  };
}
```

**Sitemap dynamique**:

```typescript
// app/sitemap.ts
import { getPages, getPosts } from '@/lib/wordpress';

export default async function sitemap() {
  const baseUrl = 'https://bateau-a-paris.fr';
  
  const pages = await getPages();
  const posts = await getPosts();
  
  const pageUrls = pages.flatMap(page => [
    {
      url: `${baseUrl}/fr/${page.slug}`,
      lastModified: page.modified,
      changeFrequency: 'monthly',
      priority: page.slug === 'accueil' ? 1 : 0.8,
    },
    {
      url: `${baseUrl}/en/${page.slug}`,
      lastModified: page.modified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]);
  
  const postUrls = posts.flatMap(post => [
    {
      url: `${baseUrl}/fr/actualites/${post.slug}`,
      lastModified: post.modified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/en/news/${post.slug}`,
      lastModified: post.modified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]);
  
  return [...pageUrls, ...postUrls];
}
```

**Livrables attendus**:
- [ ] Metadata dynamique toutes pages
- [ ] Structured data (JSON-LD)
- [ ] Sitemap.xml dynamique
- [ ] robots.txt optimisé
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] hreflang tags
- [ ] Canonical URLs
- [ ] Tests Google Rich Results
- [ ] Tests Yoast SEO WordPress

### 5.2 Optimisations Performances

**next.config.js**:

```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.bateau-a-paris.fr',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

**Bundle analysis**:

```bash
# Analyser bundle size
npm install -D @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

**Optimisations attendues**:
- [ ] Code splitting automatique
- [ ] Dynamic imports composants lourds
- [ ] Tree shaking
- [ ] Minification CSS/JS
- [ ] next/image pour toutes images
- [ ] Lazy loading images below fold
- [ ] Preload critical assets
- [ ] Font optimization (next/font)
- [ ] Remove unused CSS (PurgeCSS via Tailwind)

**Livrables attendus**:
- [ ] Lighthouse score > 90 (toutes catégories)
- [ ] Core Web Vitals au vert
  * LCP < 2.5s
  * FID < 100ms
  * CLS < 0.1
- [ ] Bundle size optimisé (< 200KB initial)
- [ ] Images optimisées (AVIF/WebP)
- [ ] Fonts optimisés (preload)
- [ ] Report bundle analyzer
- [ ] Documentation optimisations

---

## 📋 Phase 6: Tests & Déploiement (Semaine 8)

### 6.0 Setup Preprod (OVH/Coolify)

**Avant déploiement production Vercel, mise en place preprod pour validation.**

#### Option A: Coolify (Recommandé) ⭐

**Prérequis**:
- VPS OVH avec Coolify installé
- Domaine ou sous-domaine pour preprod (ex: beta.bateau-a-paris.fr)

**Setup Coolify**:

1. **Créer nouveau projet dans Coolify**:
```
Project Name: bateau-a-paris-preprod
Environment: Staging
```

2. **Ajouter service Next.js**:
```yaml
# Configuration Coolify
Type: Application
Source: Git Repository
Repository: https://github.com/smiollis/bateau-2026
Branch: develop
Build Command: npm run build
Start Command: npm start
Port: 3000
Environment Variables:
  NEXT_PUBLIC_WP_API_URL: https://api.bateau-a-paris.fr/wp-json
  NEXT_PUBLIC_SITE_URL: https://beta.bateau-a-paris.fr
  NODE_ENV: production
```

3. **Configuration domaine**:
```
# Dans Cloudflare DNS
A     beta.bateau-a-paris.fr  →  [IP_VPS_OVH]

# Dans Coolify
Domain: beta.bateau-a-paris.fr
SSL: Let's Encrypt (auto)
```

4. **Configuration WordPress backend**:
```yaml
# Option 1: Utiliser WordPress prod (api.bateau-a-paris.fr)
# - Créer utilisateur preprod séparé
# - Config CORS pour beta.bateau-a-paris.fr

# Option 2: Clone WordPress sur VPS (si besoin)
Type: WordPress
Image: wordpress:6.9-php8.2-apache
Database: MariaDB 10.3
Domain: wp-beta.bateau-a-paris.fr
```

**Deploy**:
```bash
# Push sur develop déclenche auto-deploy Coolify
git push origin develop

# Ou deploy manuel via Coolify UI
# Projects > bateau-a-paris-preprod > Deploy
```

**Tests preprod**:
```
✅ Site accessible https://beta.bateau-a-paris.fr
✅ SSL actif
✅ API WordPress répond
✅ Bookly iFrame fonctionne
✅ Forms contact fonctionnels
✅ i18n FR/EN OK
✅ Performances correctes
```

#### Option B: Plesk (Alternative)

**Si WordPress actuel sur Plesk et tu veux rester dessus**:

1. **Créer sous-domaine Plesk**:
```
Domains > Add Subdomain
Name: beta
Domain: bateau-a-paris.fr
Document root: /beta
```

2. **Upload build Next.js**:
```bash
# Build en local
cd frontend
npm run build

# Upload via SFTP
scp -r .next/* user@vps:/var/www/vhosts/bateau-a-paris.fr/beta/
scp -r public/* user@vps:/var/www/vhosts/bateau-a-paris.fr/beta/public/
scp package.json user@vps:/var/www/vhosts/bateau-a-paris.fr/beta/

# SSH sur serveur
ssh user@vps
cd /var/www/vhosts/bateau-a-paris.fr/beta
npm install --production
```

3. **Configuration Node.js dans Plesk**:
```
Domains > beta.bateau-a-paris.fr > Node.js
Node.js version: 18.x
Application mode: Production
Application startup file: node_modules/next/dist/bin/next
Arguments: start
Environment variables:
  NEXT_PUBLIC_WP_API_URL=https://api.bateau-a-paris.fr/wp-json
  NEXT_PUBLIC_SITE_URL=https://beta.bateau-a-paris.fr
```

4. **Reverse proxy Apache/Nginx**:
```apache
# .htaccess ou vhost config
<IfModule mod_proxy.c>
  ProxyPreserveHost On
  ProxyPass / http://localhost:3000/
  ProxyPassReverse / http://localhost:3000/
</IfModule>
```

**Recommandation**: **Coolify** est plus adapté pour Next.js (auto-deploy Git, logs, rollbacks).

---

### 6.1 Tests

**Tests à effectuer**:

1. **Tests fonctionnels**
```
- [ ] Navigation toutes pages FR
- [ ] Navigation toutes pages EN
- [ ] Language switcher
- [ ] Formulaire contact
- [ ] Réservation Bookly (booking complet)
- [ ] Galerie lightbox
- [ ] Blog navigation
- [ ] Links internes/externes
```

2. **Tests responsive**
```
Devices:
- [ ] iPhone SE (375x667)
- [ ] iPhone 12 Pro (390x844)
- [ ] iPad (768x1024)
- [ ] iPad Pro (1024x1366)
- [ ] Desktop 1920x1080
- [ ] Desktop 2560x1440

Browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
```

3. **Tests performances**
```
Tools:
- [ ] Google PageSpeed Insights
- [ ] GTmetrix
- [ ] WebPageTest
- [ ] Lighthouse (CI)

Targets:
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90
```

4. **Tests SEO**
```
- [ ] Google Rich Results test
- [ ] Schema markup validator
- [ ] Sitemap valide
- [ ] robots.txt correct
- [ ] hreflang correct
- [ ] Open Graph validator
- [ ] Twitter card validator
```

5. **Tests accessibilité**
```
Tools:
- [ ] WAVE
- [ ] axe DevTools
- [ ] Lighthouse
- [ ] Keyboard navigation
- [ ] Screen reader (NVDA/JAWS)

Critères WCAG 2.1 Level AA:
- [ ] Contrast ratios suffisants
- [ ] Alt texts images
- [ ] ARIA labels
- [ ] Focus indicators
- [ ] Form labels
```

**Livrables attendus**:
- [ ] Checklist tests complète
- [ ] Screenshots tests OK
- [ ] Reports performances
- [ ] Liste bugs identifiés
- [ ] Fixes bugs
- [ ] Documentation QA

### 6.2 Déploiement Vercel

**Configuration Vercel**:

```bash
# Installer Vercel CLI
npm install -g vercel

# Login
vercel login

# Lier projet
vercel link

# Configuration
vercel env add NEXT_PUBLIC_WP_API_URL production
# Valeur: https://api.bateau-a-paris.fr/wp-json
```

**vercel.json**:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Configuration DNS**:

```
Cloudflare:
A     bateau-a-paris.fr    →  76.76.21.21 (Vercel)
AAAA  bateau-a-paris.fr    →  2606:4700:... (Vercel IPv6)
CNAME www                  →  cname.vercel-dns.com

A     api.bateau-a-paris.fr →  51.83.xxx.xxx (VPS actuel)
```

**Étapes déploiement**:

1. **Setup domaine Vercel**
```bash
# Ajouter domaine
vercel domains add bateau-a-paris.fr

# Vérifier DNS
vercel domains inspect bateau-a-paris.fr

# Attendre propagation (24-48h max)
```

2. **Variables environnement**
```bash
# Production
vercel env add NEXT_PUBLIC_WP_API_URL production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_GTM_ID production

# Preview (optionnel)
vercel env add NEXT_PUBLIC_WP_API_URL preview
```

3. **Premier déploiement**
```bash
# Deploy production
vercel --prod

# Vérifier
curl -I https://bateau-a-paris.fr

# Tests post-deploy
- [ ] Homepage accessible
- [ ] SSL actif
- [ ] Redirects www → apex
- [ ] i18n routing OK
- [ ] API WordPress accessible
```

4. **CI/CD GitHub**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Livrables attendus**:
- [ ] Site déployé sur Vercel
- [ ] DNS configuré Cloudflare
- [ ] SSL actif et valide
- [ ] Monitoring Vercel activé
- [ ] Analytics Vercel activé
- [ ] CI/CD GitHub configuré
- [ ] Documentation déploiement
- [ ] Runbook incidents

### 6.3 Monitoring & Analytics

**Google Tag Manager**:

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* GTM */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </head>
      <body>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
```

**Sentry (Error tracking)**:

```bash
npm install @sentry/nextjs

# sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

**Vercel Analytics**:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Livrables attendus**:
- [ ] Google Tag Manager configuré
- [ ] Google Analytics 4 actif
- [ ] Sentry error tracking actif
- [ ] Vercel Analytics actif
- [ ] Uptime monitoring (UptimeRobot ou similaire)
- [ ] Alerts configured (downtime, errors)
- [ ] Dashboard monitoring créé

---

## 📋 Phase 7: Documentation & Handover (Semaine 8)

### 7.1 Documentation Technique

**README.md principal**:

```markdown
# Un Bateau à Paris - Site Web

Architecture headless Next.js 14 + WordPress

## Quick Start

### Prérequis
- Node.js 18+
- Docker Desktop
- Git

### Installation locale
\`\`\`bash
# Clone repo
git clone https://github.com/username/bateau-frontend.git
cd bateau-frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Start dev server
npm run dev
# → http://localhost:3000
\`\`\`

### Docker WordPress local
\`\`\`bash
cd ../bateau-wordpress-docker
docker-compose up -d
# → http://localhost:8080
\`\`\`

## Stack Technique
- Next.js 14.2 (App Router)
- TypeScript 5
- Tailwind CSS 3.4
- WordPress 6.9 (headless)
- Bookly 26.3

## Structure Projet
\`\`\`
bateau-frontend/
├── src/
│   ├── app/          # Routes Next.js
│   ├── components/   # Composants React
│   ├── lib/          # Utilitaires
│   └── types/        # Types TypeScript
├── public/           # Assets statiques
└── messages/         # Traductions i18n
\`\`\`

## Commandes Utiles
\`\`\`bash
npm run dev           # Dev server
npm run build         # Production build
npm run start         # Prod server local
npm run lint          # ESLint
npm run type-check    # TypeScript
\`\`\`

## Déploiement
Site hébergé sur Vercel:
- Production: https://bateau-a-paris.fr
- Preview: Auto sur chaque PR

## WordPress API
Backend WordPress:
- URL: https://api.bateau-a-paris.fr
- Admin: https://api.bateau-a-paris.fr/wp-admin
- API: https://api.bateau-a-paris.fr/wp-json

## Support
- Bugs: GitHub Issues
- Questions: contact@example.com
\`\`\`

**docs/ directory**:

```
docs/
├── ARCHITECTURE.md        # Diagrammes architecture
├── API.md                 # Documentation API WordPress
├── COMPONENTS.md          # Guide composants
├── DEPLOYMENT.md          # Procédure déploiement
├── MAINTENANCE.md         # Guide maintenance
├── TROUBLESHOOTING.md     # Guide dépannage
└── CONTENT_MANAGEMENT.md  # Guide édition contenu WP
```

**Livrables attendus**:
- [ ] README.md complet
- [ ] Documentation technique complète
- [ ] Commentaires code (JSDoc)
- [ ] Diagrammes architecture (Excalidraw/Mermaid)
- [ ] Guide maintenance
- [ ] Runbook incidents
- [ ] FAQ développeurs

### 7.2 Guide Utilisateur WordPress

**Documentation pour éditeurs**:

```markdown
# Guide d'Utilisation - Un Bateau à Paris

## Introduction
Ce guide explique comment gérer le contenu du site bateau-a-paris.fr
via l'interface WordPress.

## Accès WordPress
URL: https://api.bateau-a-paris.fr/wp-admin
Vos identifiants vous ont été communiqués par email.

## Gérer les Pages

### Modifier une page existante
1. Menu: Pages > Toutes les pages
2. Cliquez sur la page à modifier
3. Modifiez le contenu
4. Cliquez "Mettre à jour"
5. Le site se met à jour automatiquement dans l'heure

### Champs personnalisés (ACF)
Certaines pages ont des champs spéciaux:
- Le Bateau: Caractéristiques, galerie
- La Croisière: Parcours, étapes
Ces champs apparaissent sous l'éditeur principal.

## Gérer les Actualités

### Ajouter un article
1. Menu: Articles > Ajouter
2. Titre: Ex: "Nouvelle formule champagne"
3. Contenu: Texte + images
4. Image à la une: Obligatoire (format 1200x800px)
5. Catégories: Cochez les pertinentes
6. Publier

### Bonnes pratiques
- Images: Max 2MB, format JPG/PNG
- Texte: 300-800 mots
- Titre: Max 60 caractères
- Excerpt: Max 160 caractères

## Gérer les Croisières

[Instructions détaillées pour gérer les formules]

## Gérer les Réservations Bookly

[Guide utilisation Bookly]

## SEO (Yoast)

Pour chaque page/article, scroll vers le bas:
1. Section "Yoast SEO"
2. Titre SEO: 50-60 caractères
3. Meta description: 150-160 caractères
4. Focus keyphrase: Ex "croisière Seine Paris"
5. Aim for green light indicators

## Aide

En cas de problème:
- Email: support@example.com
- Tél: +33 6 XX XX XX XX
```

**Livrables attendus**:
- [ ] Guide utilisateur WordPress (PDF)
- [ ] Screenshots annotés
- [ ] Vidéos tutorielles (optionnel)
- [ ] FAQ utilisateurs
- [ ] Session formation live (1-2h)

---

## 🎯 Checklist Finale - Prêt pour Production

### Fonctionnel
- [ ] Toutes pages accessibles FR/EN
- [ ] Navigation fonctionne
- [ ] Formulaire contact opérationnel
- [ ] Réservation Bookly testée (booking complet)
- [ ] Galerie lightbox fonctionne
- [ ] Blog pagination OK
- [ ] Language switcher OK
- [ ] 404 page custom

### Technique
- [ ] Build production sans erreurs
- [ ] TypeScript strict mode
- [ ] ESLint passed
- [ ] No console.logs en production
- [ ] Environment variables configurées
- [ ] API WordPress accessible et sécurisée
- [ ] CORS configuré correctement
- [ ] Rate limiting API (si pertinent)

### Performances
- [ ] Lighthouse > 90 toutes catégories
- [ ] Core Web Vitals au vert
- [ ] Images optimisées (WebP/AVIF)
- [ ] Fonts optimisés
- [ ] Bundle size < 300KB
- [ ] Time to Interactive < 3s
- [ ] First Contentful Paint < 1.5s

### SEO
- [ ] Metadata dynamique toutes pages
- [ ] Structured data (JSON-LD)
- [ ] Sitemap.xml généré
- [ ] robots.txt configuré
- [ ] hreflang tags FR/EN
- [ ] Open Graph / Twitter cards
- [ ] Google Search Console vérifié
- [ ] Google Analytics actif

### Sécurité
- [ ] HTTPS everywhere
- [ ] Security headers configurés
- [ ] No sensitive data in repo
- [ ] Environment variables sécurisées
- [ ] WordPress wp-admin protégé
- [ ] Plugins WordPress à jour
- [ ] SQL injection protection
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Rate limiting forms

### Accessibilité
- [ ] WCAG 2.1 Level AA
- [ ] Keyboard navigation
- [ ] Screen reader friendly
- [ ] Alt texts toutes images
- [ ] Contrast ratios suffisants
- [ ] Focus indicators visibles
- [ ] ARIA labels appropriés
- [ ] Forms properly labeled

### Responsive
- [ ] Mobile < 640px OK
- [ ] Tablet 640-1024px OK
- [ ] Desktop > 1024px OK
- [ ] Touch targets > 44px
- [ ] No horizontal scroll
- [ ] Images responsive
- [ ] Typography scales

### Monitoring
- [ ] Google Tag Manager actif
- [ ] Google Analytics tracking
- [ ] Sentry error tracking
- [ ] Vercel Analytics
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Alerts configurés

### Documentation
- [ ] README.md complet
- [ ] Documentation technique
- [ ] Guide utilisateur WordPress
- [ ] Runbook incidents
- [ ] Credentials documentés (sécurisé)
- [ ] Architecture diagrams
- [ ] API documentation

### Legal
- [ ] RGPD compliance
- [ ] Cookies consent (Complianz)
- [ ] CGV accessibles
- [ ] Mentions légales
- [ ] Politique confidentialité
- [ ] Contact accessible

---

## 💾 Livrables Finaux

À la fin du projet, remettre:

1. **Code source**
   - Repository GitHub (ou GitLab)
   - Branches: main, develop
   - Tags: v1.0.0

2. **Documentation**
   - README.md
   - docs/ directory complet
   - Guide utilisateur WordPress (PDF)
   - Architecture diagrams

3. **Accès & Credentials**
   - Vercel dashboard
   - WordPress admin
   - GitHub repo
   - Google Tag Manager
   - Google Analytics
   - Sentry
   - Cloudflare (si géré)

4. **Assets**
   - Design system (Figma link ou screenshots)
   - Fonts licenses
   - Images sources (haute résolution)

5. **Reports**
   - Lighthouse report
   - Bundle analysis
   - Test results
   - Performance benchmarks

6. **Backups**
   - WordPress database dump
   - WordPress files backup
   - Next.js build artifacts

7. **Maintenance**
   - Procédure MAJ WordPress
   - Procédure MAJ Next.js
   - Procédure MAJ dépendances
   - Monitoring dashboards links

---

## 🆘 Support & Contact

**Pendant développement**:
- Slack: #bateau-refonte
- Email: dev@example.com
- Calls: Lundi/Jeudi 15h

**Post-lancement**:
- Email support: support@example.com
- Hotline: +33 X XX XX XX XX
- SLA: Réponse < 4h ouvrées
- Interventions critiques: < 1h

---

**Fin du document - Version 1.0 - Janvier 2026**
