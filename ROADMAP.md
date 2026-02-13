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
| 5. i18n FR/EN | **Termine** | next-intl, 230+ cles, blog bilingue |
| 6. Tests + Deploy | **Termine** | 65 unit + 28 E2E, Vercel production |
| Sprint 5-6 Audit | **Termine** | Score 6/10 → 9/10 |
| 7. Redirections WP→NJS | **Planifie** | Mapping 70+ URLs pret, attente bascule DNS |
| 8. Landing Pages SEO | **En cours** | 6/17 pages Tier 1 faites, Tier 2-3 restants |
| 9. i18n Multilingue | **Planifie** | 7 langues (ES, IT, DE, PT-BR, AR, JA, KO) |

**Score audit : 9/10** — 0 priorite haute/moyenne restante, 5 items basse priorite.

---

## Reste a faire

### [wip] Phase 8 : Landing Pages SEO (11 pages restantes)

> Brief : [`brief/brief-seo-landing-pages.md`](brief/brief-seo-landing-pages.md)
> Fait : infrastructure + 6 pages Tier 1 (EVJF, EVG, Romantique, Mariage, Anniversaire, Entre amis)

#### 8c — Tier 2 : 6 pages secondaires

| Slug | Cible SEO |
|------|-----------|
| `/anniversaire-mariage-seine` | Anniversaire mariage bateau Paris |
| `/team-building-seine` | Team building bateau Seine |
| `/croisiere-famille-seine` | Croisiere famille privee Paris |
| `/shooting-photo-seine` | Shooting photo bateau Seine |
| `/coucher-soleil-seine` | Croisiere coucher soleil Paris |
| `/apero-bateau-seine` | Apero bateau Seine Paris |

#### 8d — Tier 3 : 5 pages saisonnieres

| Slug | Cible SEO |
|------|-----------|
| `/saint-valentin-seine` | Saint-Valentin bateau Paris |
| `/nouvel-an-seine` | Reveillon bateau Seine |
| `/croisiere-noel-seine` | Croisiere Noel Paris |
| `/fete-des-meres-seine` | Fete des meres bateau Paris |
| `/seminaire-seine` | Seminaire bateau Seine |

#### 8e — Maillage interne + optimisation

- [ ] Section "Nos croisieres par occasion" sur homepage (grille 6 cards Tier 1)
- [ ] Liens contextuels depuis Croisiere, Tarifs, Blog
- [ ] Verification Rich Results Test Google
- [ ] Lighthouse > 90 sur toutes les landings
- [ ] Version anglaise des 6 landing pages Tier 1

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

### [later] Phase 9 : i18n Multilingue (7 langues)

> Prerequis : Phase 8 terminee (landing pages a traduire aussi)

#### Lot 1 — ES, IT, DE, PT-BR

- [ ] Ajouter locales dans `routing.ts`
- [ ] Traduire `messages/{locale}.json` (~250 cles × 4 langues)
- [ ] Traduire articles blog prioritaires (5-10 par langue)
- [ ] Mettre a jour `metadata.ts` (hreflang 9 locales, og:locale)
- [ ] Switcher de langue dropdown (remplacer toggle FR/EN)

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
- [ ] PWA (manifest.json + service worker)
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
- [ ] Couverture tests 15% → 25%+
- [ ] Composants shadcn @ts-nocheck
- [ ] Domaine verifie Resend (contact)
