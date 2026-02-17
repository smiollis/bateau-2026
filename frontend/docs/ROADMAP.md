# Roadmap — bateau-a-paris.fr

> Derniere mise a jour : 2026-02-17
> Pour l'historique detaille, voir [CHANGELOG.md](../../CHANGELOG.md)

---

## Etat d'avancement

| Phase | Statut | Resume |
|-------|--------|--------|
| 1. Setup + Integration | **Termine** | Next.js 16, Tailwind v4, 10 pages, 2 themes, RGPD, Instagram, blog |
| 2. WordPress Headless | **Termine** | Plugin + theme deployes sur admin.bateau-a-paris.fr |
| 3. Contact + Conformite | **Termine** | Formulaire Resend, page confidentialite |
| 4. SEO + Performance | **Termine** | Canonical, hreflang, JSON-LD, next/image, AVIF, Lighthouse CI |
| 5. i18n FR/EN | **Termine** | next-intl, 460+ cles, 6 langues actives |
| 6. Tests + Deploy | **Termine** | 303 unit + 28 E2E, coverage ~40%, Vercel production |
| Sprint Audit | **Termine** | Score 6/10 → 9.2/10 (2 sprints, 30+ actions) |
| 7. Migration WP + Bascule | **En cours** | Clone WP ok, plugins ok, Rank Math ok — reste bascule DNS + config Vercel |
| 8. Landing Pages SEO | **Termine** | 17 pages (6 Tier 1 + 6 Tier 2 + 5 Tier 3) + grille occasions homepage |
| 9. i18n Multilingue | **Lot 1 termine** | 6 langues actives, blog + landings traduits, Lot 2 planifie (AR, JA, KO) |
| 10. Performance | **Termine** | LazyMotion, Hero SSR, content stripping, compression images (-3.9MB) |

**Score audit : 9.2/10** — 0 priorite haute/moyenne restante.

---

## Reste a faire

### [next] Phase 7 : Bascule DNS + Config Vercel

#### Bascule DNS
- [x] Configurer projet Vercel (import repo, variables d'env, domaine)
- [x] Pointer DNS `bateau-a-paris.fr` → Vercel (front Next.js)
- [ ] Verifier que `admin.bateau-a-paris.fr` reste sur serveur OVH (WordPress headless)
- [ ] Tester toutes les pages post-bascule (regression)
- [ ] Crawl test : verifier 0 erreurs 404 sur les anciennes URLs

#### Post-bascule (J+1 a J+14)
- [ ] Monitoring Search Console 2 semaines (indexation, erreurs crawl)
- [ ] Executer Phase 5 du script SQL (CleanTalk, Wordfence, SBI, WP Rocket) si plus necessaires

---

### Landing Pages — finitions

- [x] Liens contextuels depuis Croisiere, Tarifs, Blog
- [ ] Verification Rich Results Test Google (a faire manuellement post-deploiement)
- [x] Lighthouse CI : 3 landing pages ajoutees (1 par tier)

---

### i18n Lot 2 — AR (RTL), JA, KO

- [ ] Support RTL CSS (`<html dir="rtl">`, Tailwind `rtl:` variant)
- [ ] Polices CJK/arabe (Noto Sans Arabic/JP/KR via `next/font`)
- [ ] Traduire messages + blog
- [ ] Tests visuels RTL + CJK

---

### Automatisation (crons)

- [x] Cron import articles (GitHub Actions — quotidien + webhook `save_post` → dispatch)
- [x] Cron avis Google (GitHub Actions — hebdomadaire, lundi 06:00 UTC)
- [x] Cron refresh token Instagram (1er et 15 du mois + auto-update secret GitHub)
- [x] Import articles multilingue (6 locales : FR, EN, ES, IT, DE, PT-BR)

---

### [backlog] Backlog

#### Fonctionnalites
- [ ] Reservation directe (sans iframe, integration Stripe)
- [ ] Chat en direct (Crisp/Intercom)
- [ ] Calendrier disponibilite temps reel
- [ ] Newsletter (React Email + Resend)
- [ ] PWA (manifest.json cree, service worker restant)
- [ ] Video background hero
- [ ] Visite virtuelle 360 du bateau
- [ ] OG Image dynamique (`next/og`)

#### Infrastructure
- [ ] Staging environment par PR
- [ ] CDN images (Cloudinary/imgix)
- [ ] Monitoring erreurs (Sentry)
- [ ] Validation client finale + configuration domaine

#### Data pipeline
- [x] Migration page liste articles (`/actualites`) vers API WP live + fallback JSON statique (pattern identique aux landing pages — `getPosts(locale)` existe deja dans `client.ts`)
- [x] Automatiser `import-posts` via GitHub Actions (cron quotidien + webhook `save_post` → dispatch)
- [x] Import multilingue 6 locales (posts.json, posts-en/es/it/de/pt-BR.json)

#### Centralisation contenu dans WordPress (chantier futur)

Objectif : tout le contenu editable passe par WP (back-office unique), le front Next.js ne contient plus de donnees en dur.

- [ ] **Landing pages → WP** : les 17 landing pages sont actuellement en fichiers TS (`src/data/landings/*.ts`). Le CPT `landing_page` + champs ACF existent deja dans le plugin WP. Reste a : creer les contenus dans WP, ecrire un script `import-landings.ts` (similaire a `import-posts.ts`), ajouter au workflow GitHub Actions.
- [ ] **Tarifs / Offres → WP** : actuellement en dur dans `OffersVariants.tsx`. Creer un CPT `offer` (titre, prix, description, image, features) ou une page Options ACF.
- [ ] **Traductions i18n → Polylang** : les 460+ cles sont dans `messages/*.json`. Migrer vers des chaines WP traduites via Polylang, ou garder le systeme actuel avec un script d'export WP → JSON.
- [ ] **Avis Google → WP** (optionnel) : actuellement `reviews.json` importe depuis Google Places API. Pourrait passer par un CPT `review` pour permettre la moderation manuelle.
- [ ] **FAQ → WP** : actuellement en dur dans les composants. Creer un CPT `faq` ou une page Options.

#### Qualite (basse priorite)
- [ ] Middleware next-intl → proxy (attente API compatible)
- [ ] Decouper composants monolithiques (Croisiere.tsx, Actualites.tsx)
- [ ] Domaine verifie Resend (contact)

---

### Architecture cible (en place)

```
bateau-a-paris.fr          → Vercel (Next.js front public)
admin.bateau-a-paris.fr    → Serveur OVH (WordPress headless)
  ├── /wp-admin/           → Back-office WordPress
  ├── /wp-json/            → API REST (articles, Bookly)
  └── /reservation-embed/  → Iframe Bookly (integree dans Next.js)
```
