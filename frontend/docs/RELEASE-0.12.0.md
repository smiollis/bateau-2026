# Release v0.12.0 — 2026-02-17

## Performance + SEO multilingue + WordPress admin

### Resume

Cette release finalise l'optimisation des performances front-end, complete le SEO multilingue sur les 6 langues, et ameliore l'administration WordPress avec Rank Math et des filtres de gestion.

### Performance

| Metrique | Avant | Apres |
|----------|-------|-------|
| Desktop RES (Vercel) | 89 | 95+ |
| Mobile RES (Vercel) | 77 | 85+ |
| Bundle framer-motion | ~65KB | ~20KB (-45KB via LazyMotion) |
| JS client /actualites | ~520KB | ~50KB (-470KB via content stripping) |
| Images totales | +3.9MB | -3.9MB (compression) |

**Optimisations appliquees :**
- Hero SSR avec `next/image` + `priority` (LCP)
- `LazyMotion` + `domAnimation` dans Providers.tsx
- `motion.div` → `m.div` sur HeroVariants + FeaturesVariants
- `generateStaticParams` sur `/actualites` (elimine cold-start TTFB)
- Server component passe `PostSummary[]` sans `content` au client
- Image `priority` sur article vedette (LCP /actualites)
- Compression : formule-premium (1.3MB→115KB), logo-white (1.1MB→92KB), posts/instagram (-1.5MB)
- Vercel Web Analytics (`@vercel/analytics`, ~1KB gzipped)

### SEO multilingue

- FAQ JSON-LD traduit dynamiquement via `getTranslations` (6 langues)
- Breadcrumb JSON-LD traduit sur les 17 landing pages (6 langues)
- ISR revalidation etendue : `/api/revalidate` propage sur les 6 locales (FR/EN/ES/IT/DE/PT-BR)

### WordPress admin

- **Rank Math** : migration Yoast terminee, filtre `rank_math/excluded_post_types` corrige pour landing pages
- **SEO metadata** : genere pour 149 articles non-FR + 85 landing pages non-FR
- **Filtre langue** : dropdown ajoute sur listes Articles + Landing Pages dans l'admin WP
- **Iframe reservation** : hauteur par defaut 1200→1800px, buffer +100px, debounce 150ms cote WP

### Fichiers modifies (30+)

Frontend :
- `src/components/Providers.tsx` — LazyMotion wrapper
- `src/components/HeroVariants.tsx` — motion → m
- `src/components/FeaturesVariants.tsx` — motion → m
- `src/components/HeroCinemaSlideshow.tsx` — SSR first image + priority
- `src/views/Actualites.tsx` — PostSummary interface + props pattern
- `src/views/Reservation.tsx` — iframe height 1800px
- `src/app/[locale]/actualites/page.tsx` — generateStaticParams + stripContent
- `src/app/[locale]/faq/page.tsx` — FAQ JSON-LD traduit
- `src/app/[locale]/(landing)/[slug]/page.tsx` — breadcrumb traduit
- `src/app/[locale]/page.tsx` — remove manual preload
- `src/app/api/revalidate/route.ts` — multi-locale revalidation
- `src/app/layout.tsx` — Vercel Analytics
- `messages/{fr,en,es,it,de,pt-BR}.json` — breadcrumb namespace
- 5 images compressees

WordPress :
- `plugins/bateau-headless-mode/bateau-headless-mode.php` — Rank Math fix + language filter
- `themes/bateau-headless/page-reservation-embed.php` — debounce + buffer

### Prochaine etape

Bascule DNS `bateau-a-paris.fr` → Vercel + configuration projet Vercel.
