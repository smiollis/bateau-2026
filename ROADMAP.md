# Roadmap — bateau-a-paris.fr

> Derniere mise a jour : 2026-02-14
> Pour l'historique detaille, voir [CHANGELOG.md](CHANGELOG.md)

---

## Etat d'avancement

| Phase | Statut | Resume |
|-------|--------|--------|
| 1. Setup + Integration | **Termine** | Next.js 16, Tailwind v4, 10 pages, 2 themes, RGPD, Instagram, blog |
| 2. WordPress Headless | **Code pret** | Plugin + theme crees, deploiement WP restant |
| 3. Contact + Conformite | **Termine** | Formulaire Resend, page confidentialite |
| 4. SEO + Performance | **Termine** | Canonical, hreflang, JSON-LD, next/image, AVIF, Lighthouse CI |
| 5. i18n FR/EN | **Termine** | next-intl, 460+ cles, 6 langues actives |
| 6. Tests + Deploy | **Termine** | 303 unit + 28 E2E, coverage ~40%, Vercel production |
| Sprint 5-6 Audit | **Termine** | Score 6/10 → 9/10 |
| Sprint Correctif | **Termine** | Score 7.5/10 → 9.2/10 (30 actions, 9/10 problemes) |
| 7. Redirections WP→NJS | **Planifie** | Mapping 70+ URLs pret, attente bascule DNS |
| 8. Landing Pages SEO | **Termine** | 17 pages (6 Tier 1 + 6 Tier 2 + 5 Tier 3) + grille occasions homepage |
| 9. i18n Multilingue | **Lot 1 termine** | 6 langues actives (FR, EN, ES, IT, DE, PT-BR), blog + landings traduits, Lot 2 planifie (AR, JA, KO) |

**Score audit : 9.2/10** (audit approfondi 10 dimensions) — 0 priorite haute/moyenne restante.

---

## Reste a faire

### [done] Phase 8 : Landing Pages SEO — 17 pages

> Brief : [`brief/brief-seo-landing-pages.md`](brief/brief-seo-landing-pages.md)

- [x] Infrastructure : route dynamique `[slug]`, type `LandingPageData`, JSON-LD TouristAttraction
- [x] 6 pages Tier 1 (EVJF, EVG, Romantique, Mariage, Anniversaire, Entre amis)
- [x] 6 pages Tier 2 (Anniversaire mariage, Team building, Famille, Shooting photo, Coucher soleil, Apero)
- [x] 5 pages Tier 3 saisonnieres (Saint-Valentin, Nouvel An, Noel, Fete des meres, Seminaire)
- [x] Grille "Nos croisieres par occasion" sur homepage (12 cards avec icones Lucide)
- [ ] Liens contextuels depuis Croisiere, Tarifs, Blog
- [ ] Verification Rich Results Test Google
- [ ] Lighthouse > 90 sur toutes les landings

---

### [next] Phase 7 : Bascule DNS WordPress → Next.js

> Prerequis : deploiement WP du plugin headless (Phase 2)

- [ ] Deployer plugin `bateau-headless-mode` sur WordPress production
- [ ] Activer theme `bateau-headless` + assigner template Bookly
- [ ] Implementer redirections dans `next.config.ts` (70+ URLs)
- [ ] Pointer DNS `bateau-a-paris.fr` vers Vercel
- [ ] Migrer WordPress sur `wp.bateau-a-paris.fr`
- [ ] Crawl test post-bascule + monitoring Search Console 2 semaines

---

### [done] Phase 9 Lot 1 : i18n ES, IT, DE, PT-BR

#### Lot 1 — ES, IT, DE, PT-BR (termine)

- [x] Ajouter 4 locales dans `routing.ts` (6 locales total)
- [x] Traduire `messages/{locale}.json` (~228 cles × 4 langues, 19 namespaces)
- [x] Mettre a jour `metadata.ts` (hreflang 6 locales, og:locale dynamique)
- [x] Switcher de langue dropdown desktop + inline mobile (remplace toggle FR/EN)
- [x] Skip-to-content accessible multilingue
- [x] Traduire articles blog (31 FR + 31 EN + 31 ES + 31 IT + 31 DE + 31 PT-BR)
- [x] Traduire landing pages SEO (17 pages × 5 langues : EN/ES/IT/DE/PT-BR)
- [x] Blog multilingue : getPostsByLocale() dans Actualites, ArticleDetail, page.tsx

#### Lot 2 — AR (RTL), JA, KO

- [ ] Support RTL CSS (`<html dir="rtl">`, Tailwind `rtl:` variant)
- [ ] Polices CJK/arabe (Noto Sans Arabic/JP/KR via `next/font`)
- [ ] Traduire messages + blog
- [ ] Tests visuels RTL + CJK

---

### [later] Phase 2 : Taches restantes

- [ ] **Deployer** plugin + theme sur WordPress production
- [ ] **Cron articles** : GitHub Actions import quotidien
- [ ] **Cron avis Google** : GitHub Actions import hebdomadaire
- [ ] **Cron Instagram** : refresh token auto (tous les 50 jours)
- [ ] **Integration Bookly** : iframe fonctionnel, style coherent, test mobile

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

#### Qualite (basse priorite)
- [ ] Middleware next-intl → proxy (attente API compatible)
- [ ] Decouper composants monolithiques (Croisiere.tsx, Actualites.tsx)
- [x] Couverture tests ~40% (303 tests, seuils 40/30/35/40)
- [x] Composants shadcn inutilises supprimes (35 composants, 3288 lignes)
- [ ] Domaine verifie Resend (contact)
