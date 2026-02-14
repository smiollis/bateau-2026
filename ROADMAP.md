# Roadmap — bateau-a-paris.fr

> Derniere mise a jour : 2026-02-15
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
| 7. Migration WP + Bascule | **Planifie** | Clone WP → admin.bateau-a-paris.fr, optimisation BDD, bascule DNS |
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

### [next] Phase 7 : Migration WordPress + Bascule DNS

> Strategie : cloner WordPress sur `admin.bateau-a-paris.fr`, nettoyer/optimiser, puis basculer le front public vers Next.js.
> Scripts : [`optimisation-bdd.sql`](optimisation-bdd.sql) | Plan detaille : [`PLAN-OPTIMISATION-BDD.md`](PLAN-OPTIMISATION-BDD.md)

#### Etape 1 — Clonage WordPress (~1h)

- [ ] Creer sous-domaine `admin.bateau-a-paris.fr` (DNS A record + vhost)
- [ ] Copier fichiers WordPress (rsync ou zip)
- [ ] Exporter + importer la BDD (dump SQL)
- [ ] Search & Replace dans la BDD : `bateau-a-paris.fr` → `admin.bateau-a-paris.fr` (WP-CLI : `wp search-replace` ou plugin "Better Search Replace")
- [ ] Verifier que le clone fonctionne (admin, front, Bookly)
- [ ] Proteger l'acces : `.htpasswd` ou restriction IP
- [ ] `robots.txt` du clone : `Disallow: /` (eviter indexation Google)

#### Etape 2 — Nettoyage plugins sur le clone

- [ ] Installer Rank Math + lancer migration Yoast → Rank Math (assistant integre)
- [ ] Verifier meta SEO sur 5-10 articles apres migration
- [ ] Desactiver + supprimer : WooCommerce, CookieYes, Complianz, Yoast, WP File Manager
- [ ] Desactiver Smash Balloon Instagram (gere par Next.js)
- [ ] Garder actifs : Bookly, WPML, Wordfence, ShortPixel, Elementor, CleanTalk, Flamingo

#### Etape 3 — Optimisation BDD sur le clone (~96 Mo → ~55 Mo)

- [ ] Backup BDD du clone avant optimisation
- [ ] Executer `optimisation-bdd.sql` (Phases 2-4) via phpMyAdmin ou CLI
- [ ] Verifier : admin WP reactive, articles accessibles, Bookly fonctionne
- [ ] OPTIMIZE tables (via WP-Optimize ou SQL)
- [ ] Exporter la BDD nettoyee comme nouveau point de reference

#### Etape 4 — Installation theme headless sur le clone

- [ ] Deployer plugin `bateau-headless-mode` (redirections front → Next.js, CORS)
- [ ] Activer theme `bateau-headless` (template minimal Bookly)
- [ ] Configurer CORS pour autoriser le domaine Next.js
- [ ] Verifier API REST : `admin.bateau-a-paris.fr/wp-json/wp/v2/posts`
- [ ] Tester page reservation : `admin.bateau-a-paris.fr/reservation-embed/`

#### Etape 5 — Connecter Next.js au clone

- [ ] Mettre a jour `.env.local` : `NEXT_PUBLIC_WP_API_URL=https://admin.bateau-a-paris.fr/wp-json`
- [ ] Mettre a jour `.env.local` : `NEXT_PUBLIC_WP_URL=https://admin.bateau-a-paris.fr`
- [ ] Tester iframe Bookly depuis le front Next.js (page /reservation)
- [ ] Tester API articles (si cron import actif)
- [ ] Valider CSP headers (ajouter `admin.bateau-a-paris.fr` dans frame-src/connect-src)

#### Etape 6 — Redirections + Bascule DNS

- [ ] Implementer redirections dans `next.config.ts` (70+ anciennes URLs WordPress)
- [ ] Pointer DNS `bateau-a-paris.fr` → Vercel/Coolify (front Next.js)
- [ ] `admin.bateau-a-paris.fr` reste le WordPress headless (back-office + Bookly + API)
- [ ] Tester toutes les pages post-bascule
- [ ] Crawl test : verifier 0 erreurs 404 sur les anciennes URLs

#### Etape 7 — Post-bascule (J+1 a J+14)

- [ ] Monitoring Search Console 2 semaines (indexation, erreurs crawl)
- [ ] Executer Phase 5 du script SQL (CleanTalk, Wordfence, SBI, WP Rocket) si plus necessaires
- [ ] Configurer cron refresh token Instagram (tous les 50 jours)
- [ ] Configurer cron import articles (GitHub Actions)
- [ ] Supprimer l'ancien WordPress sur le domaine principal (ou rediriger)

#### Architecture cible post-migration

```
bateau-a-paris.fr          → Vercel/Coolify (Next.js front public)
admin.bateau-a-paris.fr    → Serveur actuel (WordPress headless)
  ├── /wp-admin/           → Back-office WordPress
  ├── /wp-json/            → API REST (articles, Bookly)
  └── /reservation-embed/  → Iframe Bookly (integree dans Next.js)
```

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

### [later] Phase 2 : Taches restantes (integrees dans Phase 7)

- [x] **Plugin + theme headless** : code pret dans `wordpress/` → deploiement prevu Phase 7 Etape 4
- [ ] **Cron articles** : GitHub Actions import quotidien → Phase 7 Etape 7
- [ ] **Cron avis Google** : GitHub Actions import hebdomadaire
- [ ] **Cron Instagram** : refresh token auto (tous les 50 jours) → Phase 7 Etape 7
- [ ] **Integration Bookly** : iframe sur `admin.bateau-a-paris.fr/reservation-embed/` → Phase 7 Etape 5

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
