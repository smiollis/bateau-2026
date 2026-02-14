# Audit de Securite — bateau-a-paris.fr (Frontend Next.js)

**Date** : 2026-02-14
**Auditeur** : Claude Opus 4.6 (audit automatise)
**Perimetre** : `/work/projects/MICHEL/bateau-2026/frontend/`
**Stack** : Next.js 16.1.6, React 19.2.3, TypeScript strict, Tailwind CSS v4

---

## Score global : 8/10

Un projet bien securise avec une architecture defensive solide. Les headers de securite sont complets, la sanitisation des entrees est en place, le systeme de cookies est conforme RGPD, et la separation des secrets est correcte. Quelques points d'amelioration identifies, dont un risque XSS mineur sur les landing pages et l'absence de HSTS au niveau applicatif.

---

## Tableau recapitulatif

| # | Categorie | Statut | Score |
|---|-----------|--------|-------|
| 1 | Headers de securite | ⚠️ | 8/10 |
| 2 | Protection XSS | ⚠️ | 7/10 |
| 3 | Protection injection | ✅ | 9/10 |
| 4 | CSRF / Anti-spam | ✅ | 9/10 |
| 5 | Variables d'environnement | ✅ | 10/10 |
| 6 | Dependances | ✅ | 9/10 |
| 7 | Routes API | ✅ | 9/10 |
| 8 | Cookie consent (RGPD) | ✅ | 9/10 |
| 9 | Gestion des erreurs | ⚠️ | 7/10 |

---

## 1. Headers de securite (8/10) ⚠️

**Fichier** : `next.config.ts`

### Headers presents

| Header | Valeur | Statut |
|--------|--------|--------|
| X-Content-Type-Options | `nosniff` | ✅ |
| X-Frame-Options | `DENY` | ✅ |
| Referrer-Policy | `strict-origin-when-cross-origin` | ✅ |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | ✅ |
| Content-Security-Policy | 12 directives | ⚠️ |
| poweredByHeader | `false` | ✅ |
| X-Robots-Tag | `noindex, nofollow` (hors production) | ✅ |

### Analyse CSP detaillee

```
default-src 'self'
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
img-src 'self' data: blob: https://images.unsplash.com https://lh3.googleusercontent.com https://*.cdninstagram.com https://*.fbcdn.net https://www.google-analytics.com https://www.googletagmanager.com
font-src 'self' https://fonts.gstatic.com
connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com [WP_URL]
frame-src 'self' [WP_URL]
media-src 'self' https://*.cdninstagram.com https://*.fbcdn.net
object-src 'none'
base-uri 'self'
form-action 'self'
frame-ancestors 'none'
```

**Points positifs** :
- `object-src 'none'` bloque les plugins (Flash, Java)
- `base-uri 'self'` empeche le detournement de base URL
- `form-action 'self'` limite les cibles de formulaire
- `frame-ancestors 'none'` empeche le clickjacking (redondant avec X-Frame-Options)
- `frame-src` restreint aux origines necessaires (WordPress)

**Points d'attention** :
- `'unsafe-inline'` dans `script-src` : necessaire pour le Consent Mode inline et JSON-LD, mais affaiblit la protection CSP contre les injections de scripts. Une alternative serait d'utiliser des nonces CSP.
- `'unsafe-eval'` dans `script-src` : probablement requis par une dependance (Framer Motion ou Next.js en dev). A surveiller — idealement a supprimer en production si possible.
- `'unsafe-inline'` dans `style-src` : courant avec Tailwind/CSS-in-JS, difficile a eviter.

### Headers manquants

| Header | Recommandation | Priorite |
|--------|---------------|----------|
| `Strict-Transport-Security` (HSTS) | Ajouter `max-age=31536000; includeSubDomains; preload` | **Haute** |
| `X-XSS-Protection` | Ajouter `0` (desactiver le filtre XSS des anciens navigateurs qui peut introduire des failles) | Basse |
| `Cross-Origin-Opener-Policy` | Ajouter `same-origin` | Basse |
| `Cross-Origin-Embedder-Policy` | Evaluer `require-corp` | Basse |

### Recommandations

1. **Ajouter HSTS** dans `securityHeaders` de `next.config.ts` :
   ```typescript
   { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
   ```
   Note : si le site est derriere Vercel/Coolify avec HTTPS force, HSTS peut deja etre gere au niveau infra. Verifier la configuration du reverse proxy.

2. **Remplacer `'unsafe-inline'` par des nonces CSP** pour `script-src`. Next.js 16 supporte les nonces via `next.config.ts` experimental. Cela eliminerait le vecteur d'attaque inline script injection.

3. **Evaluer la suppression de `'unsafe-eval'`** en production en testant le build sans cette directive.

---

## 2. Protection XSS (7/10) ⚠️

### Usages de `dangerouslySetInnerHTML`

| Fichier | Contenu | Sanitise | Risque |
|---------|---------|----------|--------|
| `src/views/ArticleDetail.tsx:106` | `post.content` (WordPress) | ✅ DOMPurify | Faible |
| `src/components/landing/LandingRichtext.tsx:26` | `content` (landing data) | ❌ Non sanitise | **Moyen** |
| `src/app/layout.tsx:57` | JSON-LD (LocalBusiness) | N/A (donnees statiques) | Nul |
| `src/app/layout.tsx:97` | Script GA consent | N/A (generation interne) | Nul |
| `src/components/OffersVariants.tsx:115` | JSON-LD | N/A (donnees statiques) | Nul |
| `src/app/[locale]/actualites/[slug]/page.tsx:51` | JSON-LD Article | N/A (donnees statiques) | Nul |
| `src/app/[locale]/(landing)/[slug]/page.tsx:104` | JSON-LD landing | N/A (donnees statiques) | Nul |
| `src/app/[locale]/faq/page.tsx:109` | JSON-LD FAQ | N/A (donnees statiques) | Nul |
| `src/components/ui/chart.tsx:71` | CSS themes | N/A (donnees internes) | Nul |

### Analyse detaillee

**ArticleDetail.tsx** (✅ Conforme) :
```typescript
import DOMPurify from "dompurify";
// ...
dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
```
Le contenu WordPress est correctement sanitise avec DOMPurify v3.3.1.

**LandingRichtext.tsx** (⚠️ A surveiller) :
```typescript
dangerouslySetInnerHTML={{ __html: content }}
```
Le contenu HTML des landing pages n'est **pas sanitise** avant injection. Bien que les donnees proviennent de fichiers TypeScript statiques (`src/data/landings/*.ts`), et non d'une source externe, cela represente un risque en cas de :
- Modification accidentelle des fichiers de donnees avec du contenu malveillant
- Ajout futur d'une source de donnees externe (CMS, API)
- Contribution de code non revue

Le contenu injecte contient actuellement du HTML brut (`<p>`, `<strong>`, etc.) dans les fichiers comme `evjf-seine.ts`.

### JSON-LD et `JSON.stringify`

Tous les schemas JSON-LD utilisent `JSON.stringify()` pour serialiser les donnees avant injection. `JSON.stringify` echappe automatiquement les caracteres speciaux HTML dans les valeurs de chaines, ce qui previent les injections XSS dans les blocs `<script type="application/ld+json">`. Conforme.

### Script GA Consent Mode

```typescript
export function getConsentDefaultScript(gaId: string): string {
  return `...gtag('config', '${gaId}');`;
}
```
Le `gaId` provient de `process.env.NEXT_PUBLIC_GA_ID` cote serveur. Risque nul en pratique car la variable est definie par l'operateur, mais une injection dans la variable d'environnement pourrait theoriquement injecter du JavaScript. Risque negligeable.

### Recommandations

1. **Ajouter DOMPurify dans `LandingRichtext.tsx`** :
   ```typescript
   import DOMPurify from "dompurify";
   // ...
   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
   ```
   Meme si les donnees sont statiques aujourd'hui, cela renforce la defense en profondeur et previent les regressions futures.

2. **Considerer l'utilisation de nonces CSP** pour les scripts inline (JSON-LD, Consent Mode) afin de pouvoir supprimer `'unsafe-inline'` de la CSP.

---

## 3. Protection injection (9/10) ✅

### Formulaire de contact

**Fichier** : `src/app/api/contact/route.ts`

La chaine de protection est complete :

1. **Validation Zod** : schema strict avec types, longueurs min/max
   ```typescript
   const contactSchema = z.object({
     name: z.string().min(1).max(100),
     email: z.string().email().max(255),
     phone: z.string().max(20).optional().default(""),
     message: z.string().min(1).max(1000),
     website: z.string().max(0).optional().default(""),
   });
   ```

2. **escapeHtml** : toutes les donnees utilisateur sont echappees avant inclusion dans le HTML email
   ```typescript
   function escapeHtml(str: string): string {
     return str
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;");
   }
   ```

3. **Validation cote client** : maxLength sur tous les champs Input/Textarea dans `ContactForm.tsx`

### Note sur escapeHtml

La fonction `escapeHtml` n'echappe pas les guillemets simples (`'`). Dans le contexte actuel (insertion dans du contenu HTML entre balises, pas dans des attributs avec guillemets simples), cela ne represente pas un risque. Cependant, pour une robustesse maximale, ajouter `replace(/'/g, "&#39;")` serait une bonne pratique.

### Parametres URL

Les parametres `params` (locale, slug) sont utilises dans les pages App Router mais toujours :
- Valides contre une liste connue (landing slugs via `getLandingData()`)
- Ou utilises comme cle de lookup dans un objet statique
- Jamais injectes directement dans du HTML ou du SQL

Le middleware `next-intl` (`src/middleware.ts`) filtre les routes et ne laisse passer que les patterns valides.

### WordPress API

**Fichier** : `src/lib/wordpress.ts`

L'API WordPress utilise `URLSearchParams` pour construire les parametres de requete, ce qui echappe automatiquement les valeurs. Les parametres sont limites a des types simples (nombres, chaines predefinies). Pas de risque d'injection.

### Recommandation

1. Ajouter l'echappement des guillemets simples dans `escapeHtml` (faible priorite).

---

## 4. CSRF / Anti-spam (9/10) ✅

### Rate limiting

**Fichier** : `src/app/api/contact/route.ts`

```typescript
const RATE_LIMIT = 3;
const RATE_WINDOW = 60_000; // 1 min
```

- Implementation in-memory avec `Map<string, number[]>`
- 3 requetes par minute par IP
- Extraction IP via `x-forwarded-for` ou `x-real-ip`
- Bien teste (`src/__tests__/unit/contact-api.test.ts:77`)

**Limitation** : le rate limiting in-memory est reinitialise a chaque redemarrage du serveur et n'est pas distribue entre les instances. Pour un site a faible trafic comme celui-ci, c'est acceptable. Pour une montee en charge, considerer Redis ou une solution distribuee.

**Risque de contournement** : un attaquant peut falsifier le header `x-forwarded-for` si le reverse proxy ne le nettoie pas. S'assurer que le proxy (Vercel, Coolify, Nginx) ecrase ce header avec l'IP reelle du client.

### Honeypot

**Fichier** : `src/components/ContactForm.tsx`

```tsx
<input
  type="text"
  name="website"
  value={honeypot}
  onChange={(e) => setHoneypot(e.target.value)}
  className="absolute opacity-0 h-0 w-0 -z-10"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>
```

Le champ est :
- Invisible visuellement (`opacity-0 h-0 w-0`)
- Inaccessible au clavier (`tabIndex={-1}`)
- Masque aux lecteurs d'ecran (`aria-hidden="true"`)
- Valide cote serveur (`z.string().max(0)`)
- Si rempli, le serveur repond `{ success: true }` sans envoyer d'email (leurre silencieux)

Bien teste (`src/__tests__/components/ContactForm.test.tsx:50`).

### Protection CSRF

Next.js App Router utilise des routes API POST qui verifient automatiquement le header `Content-Type: application/json`. Les requetes cross-origin avec ce content-type declenchent un preflight CORS, ce qui offre une protection CSRF de base.

Cependant, il n'y a **pas de token CSRF explicite**. Pour un formulaire de contact, le risque est faible (pas d'action destructive). Pour des actions plus sensibles (reservation, paiement), un token CSRF serait recommande.

### Recommandations

1. **Verifier la configuration du reverse proxy** pour s'assurer que `x-forwarded-for` est fiable.
2. Pour une montee en charge, migrer le rate limiting vers Redis ou un service distribue.

---

## 5. Variables d'environnement (10/10) ✅

### Separation client / serveur

| Variable | Prefixe | Exposition | Usage | Statut |
|----------|---------|------------|-------|--------|
| `NEXT_PUBLIC_WP_API_URL` | NEXT_PUBLIC_ | Client | URL API WordPress | ✅ Public OK |
| `NEXT_PUBLIC_WP_URL` | NEXT_PUBLIC_ | Client | URL WordPress (iframe, CSP) | ✅ Public OK |
| `NEXT_PUBLIC_SITE_URL` | NEXT_PUBLIC_ | Client | URL du site | ✅ Public OK |
| `NEXT_PUBLIC_GA_ID` | NEXT_PUBLIC_ | Client | GA4 Measurement ID | ✅ Public OK |
| `INSTAGRAM_ACCESS_TOKEN` | Aucun | Serveur seul | Token Instagram API | ✅ Protege |
| `INSTAGRAM_USER_ID` | Aucun | Serveur seul | ID utilisateur Instagram | ✅ Protege |
| `RESEND_API_KEY` | Aucun | Serveur seul | Cle API Resend | ✅ Protege |
| `CONTACT_EMAIL_TO` | Aucun | Serveur seul | Email destinataire | ✅ Protege |

**Points positifs** :
- Les secrets (tokens API, cles) sont correctement **sans prefixe** `NEXT_PUBLIC_` et donc inaccessibles depuis le bundle client
- Les variables publiques ne contiennent que des URLs et des IDs de tracking, informations deja visibles dans le code source
- `.env*` est dans `.gitignore`, empechant la fuite de secrets dans le depot Git
- Seul `.env.local` est present (pas de `.env` sans suffixe qui pourrait etre commit accidentellement)

### Recommandation

Rien a signaler. La separation est exemplaire.

---

## 6. Dependances (9/10) ✅

### Analyse du package.json

**Framework** : Next.js 16.1.6 (derniere version stable)
**React** : 19.2.3 (derniere version stable)
**DOMPurify** : 3.3.1 (derniere version stable)
**Zod** : 4.3.6 (derniere version stable)

### npm audit

L'execution de `npm audit` n'a pas pu etre completee dans l'environnement d'audit (restriction d'acces Bash). L'analyse est basee sur les versions declarees dans `package.json`.

### Dependances notables analysees

| Dependance | Version | Commentaire |
|------------|---------|-------------|
| next | 16.1.6 | A jour, pas de CVE connue |
| react / react-dom | 19.2.3 | A jour |
| dompurify | 3.3.1 | A jour, bibliotheque de reference pour la sanitisation XSS |
| zod | 4.3.6 | A jour, validation schema robuste |
| resend | 6.9.2 | A jour |
| framer-motion | 12.34.0 | A jour |
| next-intl | 4.8.2 | A jour |

### Recommandations

1. **Executer `npm audit` regulierement** (idealement dans la CI/CD) pour detecter les vulnerabilites dans l'arbre de dependances transitives.
2. **Configurer Dependabot ou Renovate** pour les mises a jour automatiques de securite.
3. Envisager `npm audit --production` pour ignorer les devDependencies lors des audits de securite.

---

## 7. Routes API (9/10) ✅

### `POST /api/contact` (`src/app/api/contact/route.ts`)

| Controle | Implementation | Statut |
|----------|---------------|--------|
| Validation des entrees | Zod schema strict | ✅ |
| Rate limiting | 3 req/min par IP | ✅ |
| Anti-spam (honeypot) | Champ `website` masque | ✅ |
| Echappement sortie | `escapeHtml()` sur toutes les donnees | ✅ |
| Gestion des erreurs | `logger.error` + reponse generique | ✅ |
| Secrets proteges | `RESEND_API_KEY` server-only | ✅ |
| Methode HTTP | POST uniquement (App Router) | ✅ |

L'API de contact est bien securisee. Les erreurs serveur retournent des codes generiques (`"server_error"`, `"send_failed"`) sans details techniques. La validation Zod rejette automatiquement les champs inattendus.

### `GET /api/instagram` (`src/app/api/instagram/route.ts`)

| Controle | Implementation | Statut |
|----------|---------------|--------|
| Token protege | `INSTAGRAM_ACCESS_TOKEN` server-only | ✅ |
| Gestion des erreurs | `logger.error` + reponse generique | ✅ |
| Cache | `Cache-Control` + `next.revalidate` (1h) | ✅ |
| Pas de rate limiting | Endpoint GET public | ⚠️ |

**Point d'attention** : l'endpoint `/api/instagram` est un GET public sans rate limiting. Un attaquant pourrait le spammer pour consommer le quota de l'API Instagram. Le cache (1h via `next.revalidate`) limite partiellement ce risque, mais un rate limiting supplementaire serait recommande.

Le token Instagram est transmis dans l'URL de l'API (`access_token=TOKEN`). C'est le fonctionnement standard de l'API Instagram Graph, mais le token n'est jamais expose au client (la route API agit comme proxy server-side). Conforme.

### Recommandations

1. **Ajouter un rate limiting** sur `/api/instagram` (meme simple, ex: 30 req/min).
2. Considerer l'ajout d'un header `X-Robots-Tag: noindex` sur les routes API pour eviter l'indexation.

---

## 8. Cookie consent RGPD (9/10) ✅

### Architecture

| Fichier | Role |
|---------|------|
| `src/lib/cookie-consent.ts` | Stockage localStorage, versioning |
| `src/components/cookie-consent/CookieProvider.tsx` | Context React, logique de consentement |
| `src/hooks/useCookieConsent.ts` | Hook d'acces au contexte |
| `src/components/CookieBanner.tsx` | Banniere UI |
| `src/components/CookieModal.tsx` | Modale de personnalisation |
| `src/lib/gtag.ts` | Google Consent Mode v2 |
| `src/types/cookie-consent.d.ts` | Types TypeScript |

### Conformite RGPD

| Critere RGPD | Implementation | Statut |
|--------------|---------------|--------|
| Consentement prealable | GA4 defaults `denied` pour les regions EU | ✅ |
| Consentement granulaire | 3 categories : necessaire, analytics, marketing | ✅ |
| Refus facile | Bouton "Tout refuser" dans la modale | ✅ |
| Personnalisation | Modale avec switches par categorie | ✅ |
| Cookies necessaires non desactivables | `necessary: true` toujours force | ✅ |
| Retrait du consentement | `resetConsent()` disponible | ✅ |
| Horodatage | `timestamp: new Date().toISOString()` | ✅ |
| Versioning | `version: "1.0"` avec reinitialisation automatique | ✅ |
| Suppression cookies GA | `removeGACookies()` nettoie `_ga`, `_gat`, `_gid`, `_ga_*` | ✅ |
| Regions EU ciblees | 31 codes pays EU dans `gtag.ts` | ✅ |

### Google Consent Mode v2

```typescript
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500,
  'region': [EU_REGIONS]
});
```

L'implementation est conforme aux specifications Google Consent Mode v2 :
- Les 4 signaux de consentement sont initialises a `denied` pour l'EU
- `wait_for_update: 500` laisse le temps au CMP de charger
- Les mises a jour sont envoyees via `gtag('consent', 'update', ...)` apres le choix utilisateur

### Stockage

Le consentement est stocke dans `localStorage` (pas de cookie). C'est un choix valide car :
- Le consentement est lu uniquement cote client
- Pas de transmission automatique au serveur (contrairement aux cookies)
- Conforme a l'esprit du RGPD (pas de cookie de tracking avant consentement)

### Points d'attention

1. **Pas de lien direct vers les preferences** dans le footer ou la page de confidentialite. L'utilisateur ne peut re-ouvrir la modale qu'en effacant le localStorage manuellement, sauf si `resetConsent()` est expose quelque part dans l'UI. Verifier que le footer ou la page de confidentialite propose un lien pour modifier les preferences.

2. **Le bouton "Tout refuser" n'est pas visible dans la banniere**, uniquement dans la modale. La CNIL recommande que le refus soit aussi facile que l'acceptation, avec un bouton de meme niveau dans la banniere. Actuellement, la banniere affiche "Personnaliser" et "Tout accepter", mais pas "Tout refuser".

### Recommandations

1. **Ajouter un bouton "Tout refuser" dans la banniere** `CookieBanner.tsx` au meme niveau que "Tout accepter" (recommandation CNIL).
2. **Ajouter un lien "Gerer mes cookies"** dans le footer pour permettre la modification du consentement a tout moment.

---

## 9. Gestion des erreurs (7/10) ⚠️

### Error boundaries

| Fichier | Fonction | Statut |
|---------|----------|--------|
| `src/app/[locale]/error.tsx` | Erreurs dans les pages localisees | ⚠️ |
| `src/app/global-error.tsx` | Erreurs fatales (root layout) | ⚠️ |

### `error.tsx` — Analyse

```typescript
useEffect(() => {
  logger.error(`Unhandled error: ${error.message} (digest: ${error.digest})`);
}, [error]);
```

**Points positifs** :
- Utilise `logger.error` au lieu de `console.error`
- Le message affiche a l'utilisateur est generique : "Une erreur est survenue"
- Le `error.digest` est loggue (utile pour le debugging)

**Points d'attention** :
- Le `error.message` est loggue cote client. En production, Next.js remplace deja les messages d'erreur par des generiques, mais le log cote client pourrait theoriquement contenir des infos sensibles dans certains cas edge.

### `global-error.tsx` — Analyse

```tsx
<p style={{ color: "#6b7280", maxWidth: "28rem" }}>
  {error.message || "Erreur inattendue. Veuillez reessayer."}
</p>
```

**Probleme identifie** : le `error.message` est **affiche directement a l'utilisateur** dans le composant `global-error.tsx`. Bien que Next.js filtre les messages en production, il est plus prudent de ne jamais afficher `error.message` directement et d'utiliser toujours un message generique.

### API routes — Gestion des erreurs

Les routes API retournent des messages d'erreur generiques :
- `"rate_limited"` (429)
- `"validation"` + `fieldErrors` (400)
- `"server_error"` (500)
- `"send_failed"` (500)
- `"Failed to fetch Instagram posts"` (status variable)
- `"Internal server error"` (500)

Les details techniques sont loggues cote serveur via `logger.error` et ne sont jamais exposes au client. Conforme.

**Exception** : la route `/api/instagram` retourne `{ error: 'Instagram token not configured' }` avec un status 500 si le token n'est pas defini. Ce message revele des details d'infrastructure. Preferer un message generique.

### Logger

**Fichier** : `src/lib/logger.ts`

Le logger est bien structure :
- JSON en production (facilite l'aggregation de logs)
- Format lisible en dev
- Pas de fuite de donnees sensibles dans les logs (les erreurs sont logguees avec un contexte minimal)

### Recommandations

1. **Remplacer `error.message` par un message generique** dans `global-error.tsx` :
   ```tsx
   <p>Erreur inattendue. Veuillez reessayer.</p>
   ```

2. **Remplacer le message d'erreur** dans `/api/instagram` quand le token n'est pas configure :
   ```typescript
   return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
   ```

3. Considerer l'envoi des erreurs client vers un service de monitoring (Sentry, LogRocket) plutot que le simple logging console.

---

## Analyse complementaire

### Iframe Bookly (Reservation)

**Fichier** : `src/views/Reservation.tsx`

```tsx
<iframe
  src={`${process.env.NEXT_PUBLIC_WP_URL}/reservation-embed`}
  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
/>
```

L'iframe est correctement sandboxee avec des permissions minimales. L'attribut `sandbox` restreint :
- Pas de `allow-top-navigation` (empeche la navigation de la page parente)
- Les permissions sont limitees aux besoins de Bookly

La communication postMessage verifie correctement l'origin :
```typescript
if (event.origin !== wpOrigin) return;
if (event.data?.type === "bookly-height" && typeof event.data.height === "number") {
```

Verification d'origine + validation du type de message + validation du type de donnee. Conforme.

### Middleware next-intl

**Fichier** : `src/middleware.ts`

Le middleware ne fait que du routage i18n. Le matcher exclut correctement les routes API et les assets statiques :
```typescript
matcher: ["/((?!api|_next|images|.*\\..*).*)"],
```

### Donnees statiques (Landing pages, Posts, Reviews)

Les donnees des landing pages, articles et avis sont stockees dans des fichiers statiques TypeScript/JSON. Elles ne proviennent pas de sources externes a l'execution et ne presentent pas de risque d'injection en l'etat actuel. Le risque n'existe qu'en cas de modification malveillante du code source ou d'ajout futur d'une source dynamique.

---

## Resume des recommandations

### Priorite haute

| # | Recommandation | Fichier | Effort |
|---|---------------|---------|--------|
| 1 | Ajouter le header HSTS | `next.config.ts` | Faible |
| 2 | Sanitiser le contenu dans `LandingRichtext.tsx` avec DOMPurify | `src/components/landing/LandingRichtext.tsx` | Faible |
| 3 | Ne pas afficher `error.message` dans `global-error.tsx` | `src/app/global-error.tsx` | Faible |

### Priorite moyenne

| # | Recommandation | Fichier | Effort |
|---|---------------|---------|--------|
| 4 | Ajouter un bouton "Tout refuser" dans la banniere cookie | `src/components/CookieBanner.tsx` | Faible |
| 5 | Ajouter un rate limiting sur `/api/instagram` | `src/app/api/instagram/route.ts` | Faible |
| 6 | Remplacer le message d'erreur Instagram token | `src/app/api/instagram/route.ts` | Faible |
| 7 | Ajouter un lien "Gerer mes cookies" dans le footer | `src/components/FooterVariants.tsx` | Faible |

### Priorite basse

| # | Recommandation | Fichier | Effort |
|---|---------------|---------|--------|
| 8 | Evaluer le remplacement de `'unsafe-inline'`/`'unsafe-eval'` par des nonces CSP | `next.config.ts` | Moyen |
| 9 | Ajouter l'echappement des guillemets simples dans `escapeHtml` | `src/app/api/contact/route.ts` | Faible |
| 10 | Configurer Dependabot/Renovate pour les mises a jour de securite | Configuration CI/CD | Faible |
| 11 | Ajouter un service de monitoring d'erreurs (Sentry) | Configuration | Moyen |
| 12 | Verifier la configuration du reverse proxy pour `x-forwarded-for` | Infrastructure | Faible |

---

## Conclusion

Le projet **bateau-a-paris.fr** presente un niveau de securite **solide et superieur a la moyenne** pour un site vitrine avec formulaire de contact. Les principaux piliers de securite sont en place :

- **CSP comprehensive** avec 12 directives
- **5 headers de securite** standards
- **Validation Zod** + **escapeHtml** + **honeypot** + **rate limiting** sur l'API contact
- **DOMPurify** sur le contenu WordPress
- **Separation stricte** des secrets serveur
- **Cookie consent RGPD** avec Google Consent Mode v2
- **Error boundaries** avec logging structure
- **Sandbox iframe** pour le widget de reservation

Les 3 points d'amelioration prioritaires (HSTS, sanitisation LandingRichtext, message d'erreur global-error) sont tous de faible effort et amelioreraient significativement la posture de securite.

**Score final : 8/10**
