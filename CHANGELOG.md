# Changelog

## [0.2.0] - 2026-02-11

### Cookie Consent RGPD & Google Analytics 4

**Added**
- Infrastructure cookie consent complete (types, lib, provider, hook)
- Google Analytics 4 avec Google Consent Mode v2
  - Measurement ID: G-N20S788YDW
  - Defaults consent "denied" pour 33 regions EU/EEA
  - `gtag('consent', 'update', ...)` apres consentement utilisateur
- Composants CookieBanner + CookieModal connectes au CookieProvider
- Lien "Parametres cookies" dans toutes les variantes du footer
- Meta `google-site-verification` dans le layout
- API route `/api/instagram` (Instagram Graph API, cache 1h)
- Hook `useInstagramFeed` pour charger le vrai flux Instagram
- Section Instagram de la Galerie connectee au flux reel (9 derniers posts)

**Fixed**
- `@theme inline` dans globals.css : ajout de 14 tokens couleur manquants
  (primary-foreground, card, muted, secondary, destructive, popover, input, ring)
  — cause racine des styles casses (footer invisible, hero decolore, etc.)
- Logo casse dans HeaderVariants (`logoSrc: logo` -> `logoSrc: logoSrc`)
- Conflit Pages Router / App Router : `src/pages/` renomme en `src/views/`
- NavLink.tsx : import `cn` corrige (`default` -> `named`)
- ScrollToTop.tsx : `useLocation()` -> `usePathname()`
- Calendar.tsx : API react-day-picker v9 (`IconLeft/Right` -> `Chevron`)
- Croisiere.tsx : static import `.src` pour fond2.webp et metro.png
- chart.tsx / resizable.tsx : `@ts-nocheck` pour incompatibilites de types

**Changed**
- Toutes les pages App Router utilisent `export const dynamic = 'force-dynamic'`
- BoatVariants : text colors `text-muted-foreground` -> `text-foreground/80`
- FeaturesVariants : text colors ajustes pour le theme classic

**Dependencies**
- Installe toutes les dependances Radix UI manquantes (24 packages)
- Installe react-day-picker, cmdk, embla-carousel-react, input-otp,
  react-resizable-panels, recharts, sonner, vaul, react-hook-form, next-themes

---

## [0.1.0] - 2026-02-10

### Import Lovable Prototype

**Added**
- Import des composants Lovable : Header, Hero, Boat, Features, Offers,
  Testimonials, CTA, Footer, Captain, Gallery, Contact, ScrollToTop, ThemeSwitcher
- Import des pages : Index, Galerie, Croisiere, FAQ, CGV, MentionsLegales,
  Reservation, Actualites, NotFound
- Systeme de variantes de theme (6 themes)
- Design system complet (HSL tokens, fonts, utility classes)
- App Router wrappers pour toutes les pages
- Assets (logo, images galerie, map)

---

## [0.0.1] - 2026-02-10

### Setup Initial

**Added**
- Projet Next.js 16 + TypeScript + Tailwind CSS v4
- Configuration WordPress API (.env.local)
- Structure de fichiers initiale
