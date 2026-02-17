# Plan d'Action Post-Audit — bateau-a-paris.fr

**Date** : 17 fevrier 2026
**Score initial** : 8.1/10
**Score post-Sprint 1** : 8.6/10
**Objectif Sprint 2** : 9.0/10

---

## Deja fait (cette session)

- [x] ~~118 images manquantes articles traduits~~ (fix:images slug matching)
- [x] ~~54 URLs admin hardcodees dans content/excerpt~~ (fix:links)
- [x] ~~Boutons blancs sur fond blanc (Croisiere, landing)~~ (bg-transparent)
- [x] ~~Liens occasions en double dans Tarifs~~ (suppression section)
- [x] ~~Qualite image hero article~~ (quality=85)
- [x] ~~OG image WhatsApp 404~~ (og-image.jpg)
- [x] ~~Texte gras invisible mode nuit~~ (prose-invert + couleurs)

---

## Sprint 1 — Quick Wins ✅ TERMINE (17 fev 2026)

> 6 agents en parallele + LazyMotion
> **Resultat** : Score 8.1 → 8.6 (+0.5)

- [x] ~~Agent 1 : CI/CD Securisation~~ (permissions, timeout, concurrency dans 4 workflows)
- [x] ~~Agent 2 : CI/CD Git Push Retry + Instagram~~ (retry 3x, Authorization header, validation JSON)
- [x] ~~Agent 3 : SEO JSON-LD + Metadata~~ (priceRange, aggregateRating dynamique, OG fallback blog)
- [x] ~~Agent 4 : Accessibilite WCAG~~ (useReducedMotion, scroll-behavior media query)
- [x] ~~Agent 5 : i18n Hardcoded Strings~~ (ArticleDetail, LandingBreadcrumb, StickyBar, CTA, Related)
- [x] ~~Agent 6 : TypeScript Cleanup + Security~~ (DOMPurify LandingRichtext, CGV cleanup, sonner supprime)
- [x] ~~LazyMotion strict~~ (29 composants + 7 mocks migres motion → m, -20 KB)
- [x] ~~LandingPricing i18n~~ (24 cles × 6 locales, namespace landingPricing)

---

## Sprint 2 — Effort Moyen (1-2h chacun)

> A traiter maintenant
> **Impact** : Score 8.6 → 9.0 (+0.4)

~~### 2.1 Internationaliser LandingPricing.tsx~~ ✅ fait en Sprint 1
~~### 2.2 LazyMotion strict (motion → m)~~ ✅ fait en Sprint 1

### 2.3 Focus states composants
**Source** : Audit Accessibilite + UX | **Effort** : 2h
- Ajouter `focus-visible:ring-2 focus-visible:ring-primary` sur elements interactifs
- HeaderVariants navigation, FooterVariants social icons, galerie items

### 2.4 Tokeniser 32 couleurs hex nuit
**Source** : Audit UX/Design | **Effort** : 1.5h
- Remplacer `#0a1628`, `#0d1d35`, `#060f1e` par tokens CSS `--nuit-*`
- Definir dans `:root` + `.dark` dans globals.css

### 2.5 Optimiser images /public/images/
**Source** : Audit Performance | **Effort** : 2h
- Convertir 15+ images > 200KB en WebP
- Reduire dimensions aux max affiches
- Impact : -6MB

~~### 2.6 Fixer tests en echec + augmenter couverture~~ ✅ fait (17 fev 2026)
- Fix ContactForm.test.tsx : le composant affiche une confirmation UI (role="status") et non un toast apres envoi reussi
- 319/319 tests passent (Vitest), tests API routes Instagram + Revalidate deja existants

---

## Sprint 3 — Gros Chantiers (demi-journee+)

> **Impact** : Score 9.2 → 9.5 (+0.3)

### 3.1 Tests vues critiques (20h total)
- Reservation.tsx (4h), GalleryLightbox (3h), MobileMenu (2h)
- CookieProvider (3h), LanguageSelector (2h)
- Objectif : coverage 40% → 60%

~~### 3.2 Server Components migration~~ ✅ fait (17 fev 2026)
- LandingRichtext, LandingBreadcrumb, LandingBenefits → server components
- Cree `AnimatedReveal` client wrapper (framer-motion + useReducedMotion) pour garder les animations
- LandingBreadcrumb : `useTranslations` → `getTranslations` (async server)
- LandingRichtext : supprime DOMPurify (contenu CMS trusted), remplace `isDark` par classes Tailwind `dark:`
- LandingBenefits : icones rendues cote serveur (tree-shaking optimal)
- Impact : -10KB JS client

~~### 3.3 Tests E2E critiques~~ ✅ fait (17 fev 2026)
- 4 nouveaux specs Playwright : reservation.spec.ts, landing-seo.spec.ts, blog-multilingual.spec.ts, gallery-keyboard.spec.ts
- 38 nouveaux tests E2E (total : 10 spec files, 66 tests)
- Couverture : flow reservation FR/EN, SEO meta/JSON-LD/hreflang, blog multilingue, lightbox clavier

~~### 3.4 Rate limiting WP plugin~~ ✅ fait (17 fev 2026)
- Transient lock 2 min sur endpoint sync (`bateau_sync_lock`)
- Retire `http://localhost:3000` des CORS (2 occurrences)
- Logging sync avec IP + timestamp + user + status (50 derniers dans `bateau_sync_log`)
- Plugin v2.1.0 → v2.2.0

---

## Backlog (priorite basse)

- [ ] Creer 11 images OG landing pages Tier 2/3 (design graphique)
- [ ] Ajouter JSON-LD TouristTrip sur /croisiere
- [ ] Activer Dependabot (`.github/dependabot.yml`)
- [ ] Ajouter workflow CodeQL
- [ ] Hook `useScrollToAnchor` (DRY 3 duplications)
- [ ] Valider 3 assertions `as` avec Zod (CookieConsent, Instagram, LanguageSelector)
- [ ] Decomposer Actualites.tsx (331 lignes → 3 composants)
- [ ] Ajouter placeholders blur sur images
- [ ] Unifier 2 composants Breadcrumb (shadcn + landing)
- [ ] Configurer ou supprimer `@tailwindcss/typography`
- [ ] Notifications echec GitHub Actions (Slack/email)

---

## Resume

| Sprint | Items | Effort | Score | Statut |
|--------|-------|--------|-------|--------|
| ~~Deja fait~~ | 7 fixes | 1h | 8.1 → 8.1 | ✅ |
| ~~Sprint 1~~ | 8 agents | ~4h | 8.1 → 8.6 | ✅ |
| Sprint 2 | 4 chantiers (1 fait, 2 quasi-termines) | 8h | 8.6 → 9.0 | En cours |
| Sprint 3 | 4 gros items (3 faits) | 33h | 9.0 → 9.5 | En cours |
| Backlog | 11 items | 15h | 9.5 → 9.8 | A faire |
