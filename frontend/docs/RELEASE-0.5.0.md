# Release Notes - bateau-a-paris.fr

---

## v0.5.0 — i18n, SEO, Contact, Tests (2026-02-12)

### Internationalisation (i18n) — Phase 5.1
- Setup `next-intl` (FR/EN) avec routing localise (`/fr/`, `/en/`)
- Migration de toutes les routes vers `src/app/[locale]/` (10 pages + not-found)
- Middleware Next.js pour redirection automatique selon la locale
- Extraction strings FR depuis 12 composants (`useTranslations`)
- Fichiers de messages `messages/fr.json` + `messages/en.json` (~130 cles, 14 namespaces)
- Switcher de langue fonctionnel dans le header (next-intl `useRouter`)
- Metadata i18n via `getTranslations` (8 pages)

### Formulaire de contact fonctionnel — Phase 3.1
- API route `src/app/api/contact/route.ts` (Resend SDK)
- Validation serveur zod (nom, email, telephone, message)
- Rate limiting in-memory (3 envois/min par IP)
- Honeypot antispam (champ invisible)
- Template email HTML inline avec Reply-To expediteur

### Page Politique de Confidentialite — Phase 3.2
- Page `/confidentialite` avec contenu RGPD complet (10 sections)
- Liens depuis le footer et le cookie banner

### SEO — Phase 4.1
- `metadataBase` + title template `%s | Un Bateau a Paris`
- `generateMetadata` par page (title, description, og:image) — i18n via `getTranslations`
- Schema.org JSON-LD (`LocalBusiness` en root, `Article` sur les articles)
- `src/app/sitemap.ts` (pages statiques + articles dynamiques, multi-locale)
- `src/app/robots.ts`
- OpenGraph + Twitter cards configures

### Performance — Phase 4.2
- Migration `<img>` → `next/image` (9 fichiers, 12 occurrences)
- Migration Google Fonts `<link>` → `next/font/google` (Inter, Playfair Display) avec CSS variables
- Suppression `export const dynamic = 'force-dynamic'` sur 8 pages statiques

### Tests — Phase 6.1
- **39 tests unitaires** (Vitest) — 7 fichiers
  - API contact (validation, rate limiting, honeypot, Resend mock)
  - Cookie consent lib (localStorage, versioning, corruption)
  - Google Analytics (consent mode, cookie removal)
  - Utils (`cn`), `escapeHtml` (XSS prevention)
  - ContactForm (rendu, soumission, erreurs)
  - CookieBanner (affichage, accept, customize)
- **28 tests E2E** (Playwright) — 6 fichiers
  - Home (chargement, sections, toggle theme)
  - Contact (formulaire, soumission avec API interceptee)
  - Navigation (8 pages, redirects legacy, switch langue)
  - Cookie consent (banner, accept, reject, customize)
  - Accessibilite (axe-core WCAG 2.1 AA sur home, contact, galerie)
  - Mobile (viewport 390px, menu hamburger, formulaire)
- Tests cross-browser (chromium, firefox, webkit)
- Tests RGPD + accessibilite (axe-core WCAG 2.1 AA)
- Config : `vitest.config.ts`, `playwright.config.ts`, setup mocks globaux

### Documentation
- ROADMAP.md mis a jour (Phases 3, 4, 5.1, 6.1 → [done])
- CLAUDE.md mis a jour (commandes test, structure tests)
- README mis a jour (stack, scripts, fonctionnalites)

---

## v0.4.0 — Nettoyage themes + Lightbox + Images locales (2026-02-12)

### Lightbox Galerie
- Integration `yet-another-react-lightbox` sur la page Galerie
- Plugins actifs : Zoom (x3), Thumbnails, Counter
- Remplacement du lightbox custom Framer Motion

### Nettoyage des themes
- Reduction de 6 variantes a 2 : **classic** (jour) et **nuit** (sombre)
- Suppression des themes : modern, minimal, editorial, luxe
- Suppression des polices Michroma et Orbitron (Google Fonts + CSS)
- 13 composants `*Variants.tsx` simplifies (pattern `isDark` ternaire)
- ThemeSwitcher reecrit : toggle jour/nuit dans le header
- ~1 200 lignes de code variant-specific supprimees

### Performance (partiel)
- 50 images WordPress telechargees en local (`public/images/`)
  - 15 images galerie, 4 images hero, 31 images articles
  - Script `import-images.ts` met a jour les sources automatiquement
- `next.config.ts` configure : remotePatterns (Google avatars, Unsplash)
- Redirects permanents pour les routes legacy (`/f_a_q` → `/faq`, `/c_g_v` → `/cgv`, `/mentions_legales` → `/mentions-legales`)
- Suppression des dossiers de pages dupliquees

### Roadmap
- Mise a jour complete de la roadmap
- Suppression des sections ACF (donnees statiques suffisantes)
- Ajout phase Contact avec Resend pour l'envoi d'emails
- Reorganisation des phases par priorite

---

## v0.3.0 — Import statique des contenus (2026-02-11)

### Articles WordPress
- Script `import-posts.ts` : import de 31 articles depuis l'API WordPress
- Decodage entites HTML, nettoyage markup Elementor, extraction contenu semantique
- Donnees stockees dans `src/data/posts.json`
- Pages articles SSG : `/actualites/[slug]` (31 pages pre-generees)

### Avis Google
- Script `import-reviews.ts` : import depuis Google Places API
- 5 avis reels dans `src/data/reviews.json` (note 4.9/5, 69 avis total)
- Composants Testimonials connectes au JSON (note + nombre dynamiques)

### Pagination Actualites
- 1 article highlight + 6 en grille + bouton "Charger plus"

### Scripts npm
- `npm run import:posts` — reimport articles
- `npm run import:reviews` — reimport avis Google
- `npm run import:images` — reimport images
- `npm run import:all` — tout reimporter

---

## v0.2.0 — Cookie RGPD + GA4 + Instagram (2026-02-10)

### Cookie Consent RGPD
- Infrastructure complete : types, lib, provider, hook (`useCookieConsent`)
- Composants CookieBanner + CookieModal
- Google Consent Mode v2 : defaults "denied" pour 33 regions EU
- Tracking GA4 conditionnel (uniquement apres consentement)

### Google Analytics 4
- Measurement ID : G-N20S788YDW
- Integration Consent Mode v2

### Instagram Feed
- API route `/api/instagram` (Instagram Graph API, cache 1h)
- Hook `useInstagramFeed` pour fetch cote client
- Section Instagram connectee au vrai flux dans la Galerie

---

## v0.1.0 — Setup initial + Integration Lovable (2026-02-09)

### Setup
- Next.js 16 + TypeScript + Tailwind CSS v4 (App Router, Turbopack)
- Design system : HSL tokens, `@theme inline`, shadcn/ui, Radix UI
- Polices : Playfair Display (headings), Inter (body)

### Composants
- Import de tous les composants Lovable :
  Header, Hero, Boat, Features, Offers, Testimonials, CTA, Footer, GalleryPreview, ContactForm, CaptainSection, etc.

### Pages
- Index, Croisiere, Galerie, FAQ, CGV, Mentions Legales, Reservation, Actualites

### Corrections
- Fix `@theme inline` (tokens couleur manquants)
- Fix static import Next.js (`.src`)
- Fix conflit Pages Router / App Router
- Fix NavLink, ScrollToTop, Calendar v9, static imports Croisiere
