# Index Documentation - Projet bateau-a-paris.fr

**Date**: Janvier 2026  
**Projet**: Refonte headless bateau-a-paris.fr

---

## 📚 Documents Créés

### 1️⃣ **setup-initial-projet.md** ⭐ COMMENCER ICI
**Quand l'utiliser**: Avant tout, pour mettre en place ton environnement  
**Durée**: 2-3h  
**Contenu**:
- Clone repos Git (Lovable + Production)
- Setup WordPress avec Portainer
- Setup Next.js avec VS Code
- Configuration complète environnement dev

**Action**:
```bash
# Suivre ce guide en premier
# Il configure tout : Git, Portainer, VS Code, Next.js
```

---

### 2️⃣ **guide-phase-1-step-by-step.md**
**Quand l'utiliser**: Après setup initial, pour l'audit production  
**Durée**: 2-3 jours  
**Contenu**:
- Audit serveur production SSH
- Export base de données
- Analyse plugins (44 → 25)
- Setup Docker/Portainer détaillé
- Setup Next.js détaillé

**Action**:
```bash
# Phase 1.1: Audit serveur
ssh bateau-a-paris.fr_zfbfr6bqojq@bateau-a-paris.fr

# Phase 1.2: Docker/Portainer (déjà fait si tu as suivi setup-initial)
# Phase 1.3: Next.js (déjà fait si tu as suivi setup-initial)
```

**Note**: Ce guide est plus détaillé que setup-initial. Utilise-le si tu veux plus d'explications.

---

### 3️⃣ **bateau-a-paris_briefs-complets.md**
**Quand l'utiliser**: Guide de référence pour TOUT le projet  
**Durée**: 10-12 semaines (tout le projet)  
**Contenu**:

#### PARTIE 1: BRIEF LOVABLE (Semaine 1-2)
- Direction artistique complète
- Structure toutes pages (8 pages)
- Composants réutilisables
- Prompts Lovable copy/paste
- Checklist design

**Action avec Lovable**:
```
1. Copier prompts depuis ce doc
2. Coller dans Lovable
3. Générer prototypes
4. Valider design
5. Exporter code vers https://github.com/smiollis/bateau-a-paris
```

#### PARTIE 2: BRIEF CLAUDE CODE (Semaine 3-8)
- Phase 1: Audit & Setup ✅ (déjà fait)
- Phase 2: WordPress Headless
- Phase 3: Intégration code Lovable
- Phase 4: Fonctionnalités (i18n, galerie, forms)
- Phase 5: SEO & Performances + Cookie Notice
- Phase 6: Tests & Déploiement (preprod + prod)

**Action avec Claude Code**:
```bash
# Donner ce brief à Claude Code
# + Accès SSH serveur
# + Accès WordPress local
# Claude Code développe selon specs
```

---

### 4️⃣ **cookie-notice-rgpd.md**
**Quand l'utiliser**: Semaine 7 (Phase 5)  
**Durée**: 3-4h  
**Contenu**:
- Types cookies (Nécessaires, Analytiques, Marketing)
- Architecture complète (Provider, Hook, Components)
- Code TypeScript complet
- GTM conditional loading
- Tests RGPD
- Page politique confidentialité

**Action**:
```bash
# 1. Récupérer design depuis Lovable
git clone https://github.com/smiollis/bateau-a-paris.git

# 2. Copier CookieBanner.tsx et CookieModal.tsx

# 3. Implémenter logique selon ce doc
# (Hook, Provider, GTM loading)

# 4. Tests RGPD
```

---

### 5️⃣ **bookly-api-analysis.md**
**Quand l'utiliser**: Pour référence décision iFrame  
**Contenu**:
- Analyse 3 solutions API Bookly
- Comparatif coûts (0€ vs 18,500€)
- Architecture iFrame recommandée
- Code exemple iFrame responsive

**Action**:
```bash
# Lecture uniquement
# Décision déjà prise: iFrame Bookly
# Référence si besoin justifier choix
```

---

## 🗂️ Organisation des Documents

```
Documentation Projet:
├── 📄 setup-initial-projet.md         → DÉMARRER ICI (2-3h)
├── 📄 guide-phase-1-step-by-step.md   → Audit détaillé (2-3j)
├── 📄 bateau-a-paris_briefs-complets.md → RÉFÉRENCE COMPLÈTE
│   ├── Brief Lovable (Semaine 1-2)
│   └── Brief Claude Code (Semaine 3-8)
├── 📄 cookie-notice-rgpd.md           → Phase 5 (Semaine 7)
└── 📄 bookly-api-analysis.md          → Référence décision

Repos Git:
├── https://github.com/smiollis/bateau-a-paris     → Lovable prototype
└── https://github.com/smiollis/bateau-2026        → Production code
```

---

## 🚀 Workflow Complet

### Semaine 0 (Aujourd'hui) - Setup
```bash
1. ✅ Lire setup-initial-projet.md
2. ✅ Cloner repos Git
3. ✅ Setup Portainer WordPress
4. ✅ Setup VS Code + Next.js
5. ✅ Vérifier tout fonctionne
```

### Semaine 1-2 - Design avec Lovable
```bash
1. 📖 Lire PARTIE 1 de bateau-a-paris_briefs-complets.md
2. 🎨 Copier prompts Lovable
3. 🎨 Générer prototypes dans Lovable
4. ✅ Valider design
5. 📦 Exporter code vers https://github.com/smiollis/bateau-a-paris
6. 🍪 Générer Cookie Banner/Modal dans Lovable
```

### Semaine 3 - WordPress Headless
```bash
1. 📖 Lire Phase 2 de bateau-a-paris_briefs-complets.md
2. 💻 Développer plugin headless mode
3. 💻 Template Bookly minimal
4. 💻 Configuration ACF
5. 💻 API WordPress client Next.js
```

### Semaine 4-5 - Intégration Lovable
```bash
1. 📖 Lire Phase 3 de bateau-a-paris_briefs-complets.md
2. 🔄 Récupérer code Lovable
3. ♻️ Refactoring composants
4. 🏗️ Implémentation pages
5. 🧪 Tests responsive
```

### Semaine 6 - Fonctionnalités
```bash
1. 📖 Lire Phase 4 de bateau-a-paris_briefs-complets.md
2. 🌍 i18n (next-intl)
3. 🖼️ Galerie lightbox
4. 📝 Formulaire contact
5. 🚢 iFrame Bookly (réf: bookly-api-analysis.md)
```

### Semaine 7 - SEO & Cookie
```bash
1. 📖 Lire Phase 5 de bateau-a-paris_briefs-complets.md
2. 📖 Lire cookie-notice-rgpd.md
3. 🍪 Implémenter Cookie Notice RGPD
4. 🔍 SEO metadata dynamique
5. ⚡ Optimisations performances
```

### Semaine 8 - Tests & Deploy
```bash
1. 📖 Lire Phase 6 de bateau-a-paris_briefs-complets.md
2. 🧪 Tests complets
3. 🚀 Preprod OVH/Coolify
4. ✅ Validation client
5. 🚀 Production Vercel
```

---

## 📋 Checklist Utilisation Documents

### Avant de Commencer
- [ ] J'ai lu setup-initial-projet.md
- [ ] J'ai cloné les 2 repos Git
- [ ] WordPress local fonctionne (Portainer)
- [ ] Next.js local fonctionne (VS Code)
- [ ] J'ai lu la PARTIE 1 du brief complet (Lovable)

### Phase Design (Lovable)
- [ ] J'ai généré tous les prototypes Lovable
- [ ] Design validé avec client/équipe
- [ ] Code exporté vers https://github.com/smiollis/bateau-a-paris
- [ ] Cookie Banner/Modal générés

### Phase Développement (Claude Code)
- [ ] J'ai donné accès SSH à Claude Code
- [ ] J'ai donné accès WordPress local
- [ ] J'ai fourni le brief complet (PARTIE 2)
- [ ] Claude Code a accès au repo Lovable
- [ ] Claude Code développe selon phases

### Phase Cookie (Semaine 7)
- [ ] J'ai lu cookie-notice-rgpd.md
- [ ] Design récupéré depuis Lovable
- [ ] Logique RGPD implémentée
- [ ] GTM conditionnel
- [ ] Tests RGPD OK

### Phase Déploiement
- [ ] Preprod déployée (OVH/Coolify)
- [ ] Tests complets passés
- [ ] Production déployée (Vercel)
- [ ] Monitoring actif

---

## 🎯 Résumé Rapide

**Tu veux...**

### Démarrer le projet maintenant ?
→ **setup-initial-projet.md** (2-3h)

### Comprendre tout le projet ?
→ **bateau-a-paris_briefs-complets.md** (lecture 1h)

### Générer le design ?
→ **PARTIE 1** du brief complet + Lovable (2j)

### Développer avec Claude Code ?
→ **PARTIE 2** du brief complet + accès serveur (7 sem)

### Implémenter cookies RGPD ?
→ **cookie-notice-rgpd.md** (3-4h)

### Comprendre choix iFrame Bookly ?
→ **bookly-api-analysis.md** (lecture 15min)

---

## 💡 Tips

1. **Ne pas tout lire d'un coup** - Chaque doc a son moment
2. **Commencer par setup-initial** - C'est la base
3. **Utiliser Lovable AVANT Claude Code** - Design validé = dev plus rapide
4. **Garder brief complet ouvert** - Référence permanente
5. **Cookie Notice en dernier** - Semaine 7, pas avant

---

## 🔗 Liens Rapides

- **Lovable**: https://lovable.dev
- **Repo Lovable**: https://github.com/smiollis/bateau-a-paris
- **Repo Production**: https://github.com/smiollis/bateau-2026
- **Site actuel**: https://bateau-a-paris.fr
- **API WordPress**: https://api.bateau-a-paris.fr

---

## 📞 Support

Si tu es bloqué:
1. Relis le doc concerné (section troubleshooting)
2. Vérifie la checklist
3. Demande à Claude (moi!) avec contexte précis

---

**Prêt à démarrer ? 🚀**

**Prochaine action** : Ouvre `setup-initial-projet.md` et suis-le étape par étape !
