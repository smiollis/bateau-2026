# Changelog — bateau-a-paris.fr

> Historique des livraisons. Pour le reste a faire, voir [ROADMAP.md](ROADMAP.md).

---

## [0.9.0] - 2026-02-14 — Sprint Correctif Complet (Score 7.5 → 9.2/10)

**9/10 problemes critiques resolus — 30 actions sur 4 sprints**

### Securite & Config
- Header HSTS (max-age=63072000, includeSubDomains, preload)
- `global-error.tsx` : message generique (plus de `error.message` expose)
- `noUncheckedIndexedAccess` dans tsconfig.json (TypeScript strict++)
- Suppression page `/test` (debug orpheline)
- Manifest PWA (`public/manifest.json`) + apple-touch-icon

### Dead Code & Dependencies
- Supprime 8 composants base obsoletes (Hero, Header, Footer, Offers, Features, Testimonials, Boat, CallToAction — 893 lignes)
- Supprime 35 composants shadcn/ui inutilises (3 288 lignes)
- Desinstalle 8 packages npm (recharts, react-day-picker, cmdk, vaul, embla-carousel, input-otp, react-resizable-panels, next-themes)

### Accessibilite
- `useReducedMotion` sur tous les composants animes (WCAG 2.3.1)
- Focus trap + Escape dans CookieModal
- Accessibilite renforcee sur composants landing

### Performance & Images
- `motion.img` → `motion.create(Image)` sur HeroCinemaSlideshow (LCP optimise)
- `placeholder="blur"` sur CaptainSection, HeaderVariants, OffersVariants
- `escapeHtml` extrait dans `src/lib/escape-html.ts`

### Architecture
- Header/Footer migres dans `[locale]/layout.tsx` (retires de 10 vues)
- Header decompose : HeaderThemeToggle + LanguageSelector + MobileMenu

### i18n Multilingue (6 langues)
- Messages complets ES/IT/DE/PT-BR (460 cles x 6 langues)
- Landing pages traduites : 17 pages x EN/ES/IT/DE
- Architecture `getLandingData(slug, locale)` async avec deep merge
- Type `LandingPageTranslation` pour overlays partiels par locale
- Blog : +31 articles ES, +31 IT, +20 DE

### Tests
- Installe `@vitest/coverage-v8` avec seuils (40/30/35/40)
- 238 nouveaux tests : landing-data, jsonld, metadata, logger, instagram-hook, LandingComponents
- **303 tests unitaires OK** (65 → 303)

## [0.8.0] - 2026-02-14 — Landing Pages Tier 1

**6 landing pages SEO + infrastructure complete**

- Infrastructure : types TypeScript, 11 composants landing, layout route group `(landing)`, JSON-LD generators (FAQPage, TouristAttraction, Breadcrumb)
- 6 pages Tier 1 : EVJF, EVG, Romantique, Demande en mariage, Anniversaire, Entre amis
- Route dynamique `[slug]` avec `generateStaticParams` (SSG)
- 3 schemas JSON-LD par page, contenu SEO unique 300+ mots, 4-5 FAQ par page
- Sitemap etendu avec landing pages, maillage interne entre pages

## [0.7.0] - 2026-02-14 — WordPress Headless + CI

**Plugin WP headless + Lighthouse CI + plans strategiques**

- Plugin `bateau-headless-mode` : redirects 301 (70+ URLs), CORS REST API, cleanup front-end
- Theme minimal `bateau-headless` : Bookly iframe, postMessage hauteur responsive
- Lighthouse CI (`lighthouserc.js` + `lighthouse.yml` GitHub Actions)
- Cache-Control `immutable` sur images et assets statiques
- Plans strategiques : Phase 8 (17 landing pages SEO) + Phase 9 (7 nouvelles langues)
- Brief SEO landing pages ajoute

## [0.6.0] - 2026-02-13 — Audit Sprint 5-6

**Score audit : 6/10 → 9/10**

Sprint 5 — Critiques :
- SEO : canonical + hreflang par page (10 pages), og:locale dynamique, html lang dynamique
- A11y : skip-to-content, aria-expanded menu, labels formulaire, dialog modal, id="main"
- Securite : 5 headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, nosniff)
- Error boundaries (error.tsx + global-error.tsx), Vercel Speed Insights

Sprint 6 — Hautes/Moyennes :
- Migration `<img>` → `next/image` (6 composants)
- CSP 12 directives, code splitting lightbox, fix useEffect CookieModal
- JSON-LD FAQPage (10 Q&A)

## [0.5.0] - 2026-02-12 — Blog EN + SEO

- Blog bilingue FR/EN (28 articles traduits, posts-en.json)
- Section CTA reservation en fin d'article
- Hreflang initial, logger structure JSON production

## [0.4.0] - 2026-02-11 — Contact + Conformite + Tests

- Formulaire contact fonctionnel (Resend + zod + rate limiting + honeypot)
- Page confidentialite (/confidentialite)
- Tests unitaires : 34 → 65 (Vitest), E2E : 28 tests Playwright

## [0.3.0] - 2026-02-09 — Lightbox + Nettoyage themes

- Lightbox galerie (yet-another-react-lightbox, Zoom, Thumbnails)
- Themes : 6 → 2 variantes (classic + nuit), suppression fonts inutiles
- Redirects routes legacy dans next.config.ts

## [0.2.0] - 2026-02-07 — RGPD + Instagram + Contenus

- Cookie consent RGPD + GA4 Consent Mode v2
- Instagram feed API (/api/instagram, cache 1h)
- Import statique WordPress : 31 articles, 5 avis Google, 50 images
- Scripts d'import automatises, pages articles SSG
- Fix @theme inline (14 tokens couleur), fix logo, fix conflit Pages/App Router

## [0.1.0] - 2026-02-05 — Setup + Integration Lovable

- Next.js 16 + TypeScript + Tailwind CSS v4
- Import composants Lovable, design system HSL tokens, Playfair/Inter
- 10 pages App Router, systeme de themes (classic + nuit)
- Configuration WordPress API headless
