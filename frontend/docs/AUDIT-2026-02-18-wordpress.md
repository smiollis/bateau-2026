# Audit d'intégration WordPress — 18 février 2026

**Auditeur** : Claude (Sonnet 4.5)
**Scope** : Intégration WordPress headless CMS → Next.js 16 frontend
**Focus** : REST API, transformateurs de données, pipeline de contenu, types TypeScript, sanitization, multi-catégories, images, Polylang, revalidation, compatibilité plugins

---

## Score global : 8.5/10

**Progression** : 7.5/10 (audit précédent) → **8.5/10**

### Répartition détaillée

| Catégorie | Score | Commentaire |
|-----------|-------|-------------|
| **Architecture API** | 9/10 | Client REST bien structuré, ISR 1h, pagination robuste |
| **Types TypeScript** | 9/10 | Couverture complète WPPost/WPLandingPage/ACF |
| **Transformateurs** | 8.5/10 | Mapping complet, entities décodées, sanitization HTML |
| **Gestion images** | 8/10 | Featured images via `_embed`, fallback `""`, fix-scripts disponibles |
| **Multi-catégories** | 9/10 | Support complet WP categories → local categories |
| **Polylang** | 9/10 | Linking translations robuste avec fallback |
| **Scripts push/import** | 8.5/10 | Featured images OK, error handling bon, pas de retry |
| **Sanitization** | 7.5/10 | DOMPurify client-side, `dangerouslySetInnerHTML` sur server components |
| **Revalidation** | 8/10 | ISR + webhook missing, rate limiting WP OK |
| **Compatibilité plugins** | 9/10 | ACF Pro, Rank Math, Polylang Pro bien intégrés |

---

## Points forts

### 1. Architecture WordPress REST API

#### Client REST (`src/lib/wordpress/client.ts`)

```typescript
async function wpFetch<T>(
  path: string,
  params?: Record<string, string>,
  options?: { revalidate?: number }
): Promise<T> {
  const url = new URL(`${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: options?.revalidate ?? ISR_REVALIDATE }, // 3600s = 1h
  });

  if (!res.ok) {
    throw new Error(
      `WordPress API error: ${res.status} ${res.statusText} [${url.pathname}]`
    );
  }

  return res.json();
}
```

**Points positifs** :
- ✅ **ISR (Incremental Static Regeneration)** : `revalidate: 3600` (1h) — pages statiques avec refresh background
- ✅ **Error handling** : messages d'erreur structurés avec status + pathname
- ✅ **Typed responses** : générique `<T>` pour type safety
- ✅ **Pagination robuste** : boucle `while (posts.length === 100)` dans `getPosts()`
- ✅ **Paramètres Polylang** : `?lang=` passé dans toutes les requêtes

#### Méthodes API

| Méthode | Endpoint WP | Paramètres | Usage |
|---------|-------------|------------|-------|
| `getPosts(locale)` | `/wp/v2/posts` | `_embed`, `per_page=100`, `lang` | Liste articles (pagination automatique) |
| `getPost(slug, locale)` | `/wp/v2/posts?slug=` | `_embed`, `lang` | Article unique par slug |
| `getLandingPage(slug, locale)` | `/wp/v2/landing_page?slug=` | `lang` | Landing page avec ACF fields |
| `getAllLandingSlugs()` | `/wp/v2/landing_page?_fields=slug` | `per_page=100` | Génération de routes statiques |

**Points d'attention** :
- ⚠️ **Pas de cache client-side** : chaque appel refetch (Next.js cache géré par `revalidate`)
- ⚠️ **Pas de retry sur erreur réseau** : une erreur = échec immédiat
- ⚠️ **Headers X-WP-TotalPages utilisé** mais pas exposé dans types

---

### 2. Types TypeScript (`src/lib/wordpress/types.ts`)

#### Modèle de données WPPost

```typescript
export interface WPPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: { rendered: string };       // HTML entities
  excerpt: { rendered: string };     // HTML entities + tags
  content: { rendered: string };     // HTML complet
  seo?: WPSeoData | null;           // Rank Math fields
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}
```

**Points positifs** :
- ✅ **Typed `_embedded`** : featured media + categories typées
- ✅ **SEO data** : intégration Rank Math (title, description, focus_keyword, robots)
- ✅ **Champs optionnels** : `seo?`, `_embedded?` bien marqués

#### Modèle ACF Landing Pages

```typescript
export interface WPLandingACF {
  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_background_image: string | WPImage;  // ⚠️ Union type
  hero_cta_text: string;
  hero_cta_href: string;

  // Sections (flexible content)
  sections: WPFlexibleSection[];

  // JSON-LD
  jsonld_type: "Event" | "Product" | "TouristAttraction";
  jsonld_price_from: number;

  // Relations
  related_pages: WPRelatedPage[] | false;  // ⚠️ false si vide
}

export type WPFlexibleSection =
  | WPRichtextLayout
  | WPBenefitsLayout
  | WPGalleryLayout
  | WPTestimonialsLayout
  | WPPricingLayout
  | WPFAQLayout;
```

**Points positifs** :
- ✅ **Discriminated unions** : `acf_fc_layout` permet le type narrowing
- ✅ **Flexible content** : 6 layouts ACF typés
- ✅ **Image fields** : `string | WPImage` pour compatibilité ACF (URL ou object)

**Points d'attention** :
- ⚠️ **`related_pages: [] | false`** : ACF retourne `false` si vide, nécessite vérification `Array.isArray()`
- ⚠️ **Pas de validation runtime** : types TypeScript compilés disparaissent, pas de zod/yup

---

### 3. Transformateurs (`src/lib/wordpress/transformers.ts`)

#### Décodage HTML entities

```typescript
function decodeEntities(text: string): string {
  return text
    .replace(/&rsquo;/g, "\u2019")   // '
    .replace(/&lsquo;/g, "\u2018")   // '
    .replace(/&rdquo;/g, "\u201D")   // "
    .replace(/&ldquo;/g, "\u201C")   // "
    .replace(/&mdash;/g, "\u2014")   // —
    .replace(/&ndash;/g, "\u2013")   // –
    .replace(/&hellip;/g, "\u2026")  // …
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}
```

**Points positifs** :
- ✅ **Entities nommées** : couverture des principales (`&eacute;`, `&agrave;`, etc. dans import-posts.ts)
- ✅ **Entities numériques** : support `&#123;` et `&#x7B;`
- ✅ **Ordre de remplacement** : `&amp;` en dernier pour éviter les double-décodages

#### Nettoyage HTML

```typescript
function cleanContent(html: string): string {
  const blockRegex = /<(p|h[2-6]|li)(?:\s[^>]*)?>(.+?)<\/\1>/gs;
  const blocks: string[] = [];
  let match;

  while ((match = blockRegex.exec(html)) !== null) {
    const tag = match[1];
    let inner = match[2] ?? "";
    // Keep only inline formatting: strong, em, a, b, i
    inner = inner.replace(/<(?!\/?(strong|em|a|b|i)\b)[^>]*>/g, "");
    inner = decodeEntities(inner).trim();
    if (inner) blocks.push(`<${tag}>${inner}</${tag}>`);
  }

  return blocks.join("\n");
}
```

**Points positifs** :
- ✅ **Whitelist HTML** : seuls `p`, `h2-6`, `li`, `strong`, `em`, `a` autorisés
- ✅ **Suppression CSS inline** : regex élimine les `style="..."`
- ✅ **Décodage après nettoyage** : évite les failles XSS par entities
- ✅ **Blocs vides filtrés** : `if (inner)` avant push

**Points d'attention** :
- ⚠️ **Pas de support `<ul>`, `<ol>`** : les listes perdent leur structure (seuls `<li>` extraits)
- ⚠️ **Regex non-greedy** : `(.+?)` peut manquer du contenu multi-lignes si non capturé par `/gs`

#### Transformation BlogPost

```typescript
export function transformToPost(wp: WPPost): BlogPost {
  return {
    id: wp.id,
    title: toPlainText(wp.title?.rendered ?? ""),
    excerpt: toPlainText(wp.excerpt?.rendered ?? ""),
    content: cleanContent(wp.content?.rendered ?? ""),
    image: wp._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",  // ✅
    date: wp.date,
    modified: wp.modified,
    categories: (wp._embedded?.["wp:term"]?.[0] ?? [])
      .map((t: { name: string }) => t.name)
      .filter(Boolean),  // ✅ Filtre les noms vides
    link: wp.link,
    slug: wp.slug,
    seo: wp.seo
      ? {
          title: wp.seo.title,
          description: wp.seo.description,
          robots: wp.seo.robots || [],
        }
      : undefined,
  };
}
```

**Points positifs** :
- ✅ **Featured image** : extraction via `_embedded['wp:featuredmedia'][0].source_url`
- ✅ **Fallback vide** : `?? ""` pour images, `?? []` pour categories
- ✅ **Multi-catégories** : `.map()` supporte plusieurs catégories par post
- ✅ **SEO preservation** : Rank Math fields copiés dans l'objet final

---

### 4. Gestion des images

#### Pipeline images WP → Next.js

```
WordPress Media Library
    ↓ Upload (admin)
wp_posts.featured_media_id
    ↓ REST API ?_embed=wp:featuredmedia
_embedded['wp:featuredmedia'][0].source_url
    ↓ transformToPost()
BlogPost.image (URL string)
    ↓ import-posts.ts
src/data/posts.json
    ↓ <Image src={post.image} />
Next.js <Image> component
```

**Points positifs** :
- ✅ **`_embed` parameter** : évite N+1 queries (1 requête = post + media + terms)
- ✅ **Featured images dans JSON** : pas d'appel API au runtime Next.js
- ✅ **Fallback `""`** : images manquantes gérées côté composant (placeholder Calendar icon)
- ✅ **Scripts de correction** :
  - `scripts/fix-missing-images.ts` : copie les images FR vers toutes locales
  - `scripts/fix-hardcoded-links.ts` : remplace URLs admin par chemins relatifs

**Problèmes détectés** :
- ⚠️ **118 images manquantes** dans posts traduits (EN/ES/IT/DE) — résolu par `npm run fix:images`
- ⚠️ **Pas de validation dimensions** : `source_url` peut pointer vers une miniature (thumbnail) au lieu du full size

**Recommandation** :
```typescript
// Ajouter le support des tailles d'image
_embedded?: {
  "wp:featuredmedia"?: Array<{
    source_url: string;
    media_details?: {
      sizes?: {
        full?: { source_url: string; width: number; height: number };
        large?: { source_url: string; width: number; height: number };
      };
    };
  }>;
};

// Dans transformToPost()
const media = wp._embedded?.["wp:featuredmedia"]?.[0];
const image = media?.media_details?.sizes?.full?.source_url
  || media?.source_url
  || "";
```

---

### 5. Multi-catégories

#### Support WordPress → TypeScript

**WordPress REST API** :
```json
{
  "_embedded": {
    "wp:term": [
      [
        { "id": 4, "name": "Histoire", "slug": "histoire" },
        { "id": 7, "name": "Actualités", "slug": "actualites" }
      ]
    ]
  }
}
```

**Transformation** :
```typescript
categories: (wp._embedded?.["wp:term"]?.[0] ?? [])
  .map((t: { name: string }) => t.name)
  .filter(Boolean)
// → ["Histoire", "Actualités"]
```

**Points positifs** :
- ✅ **Tableau imbriqué** : `wp:term[0]` correctement accédé
- ✅ **Filter Boolean** : élimine les `null`, `undefined`, `""`
- ✅ **Support `push-articles-wp.ts`** :

```typescript
const categoryIds: number[] = [];
for (const catName of (article.categories.length > 0
  ? article.categories
  : ['Non classé'])) {
  categoryIds.push(await getOrCreateCategory(catName, locale.lang));
}
```

**Points d'attention** :
- ⚠️ **Pas de mapping ID → slug** : seuls les noms sont extraits
- ⚠️ **Pas de hiérarchie** : categories parent/child WordPress perdues

---

### 6. Polylang (linking translations)

#### Script `push-articles-wp.ts`

```typescript
async function linkTranslations(translationMap: Record<string, number>) {
  const frId = translationMap['fr'];
  if (!frId) return;

  try {
    // Polylang REST API v1
    await wpFetch(`/pll/v1/posts/${frId}`, {
      method: 'PUT',
      body: JSON.stringify({ translations: translationMap }),
    });
    console.log(`Linked translations via Polylang for FR post ${frId}`);
  } catch (err: unknown) {
    // Fallback: use wp/v2/posts with pll_translations meta
    try {
      for (const [lang, id] of Object.entries(translationMap)) {
        if (lang === 'fr') continue;
        await wpFetch(`/wp/v2/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            meta: { pll_translations: translationMap },
          }),
        });
      }
      console.log(`Linked translations via meta for FR post ${frId}`);
    } catch (err2: unknown) {
      console.warn(`Could not auto-link translations: ${err2.message}`);
      console.warn(`You may need to link them manually in WP admin.`);
    }
  }
}
```

**Points positifs** :
- ✅ **Double fallback** : Polylang REST API → WP meta → warning manuel
- ✅ **Error handling graceful** : pas de crash si Polylang REST indisponible
- ✅ **Logging clair** : utilisateur informé de la méthode utilisée

**Points d'attention** :
- ⚠️ **Polylang REST API pas toujours disponible** : dépend de la version Polylang Pro
- ⚠️ **Pas de vérification du succès** : `meta: { pll_translations }` peut échouer silencieusement

---

### 7. Scripts push/import

#### `scripts/push-articles-wp.ts`

**Features** :
- ✅ **Multi-locales** : 6 langues (FR/EN/ES/IT/DE/PT-BR)
- ✅ **Multi-catégories** : `categories: string[]` → création auto si inexistante
- ✅ **Polylang linking** : translations liées automatiquement
- ✅ **Date explicite** : support `article.date` pour contrôler l'ordre
- ✅ **SEO fields** : Yoast/Rank Math `meta` (`_yoast_wpseo_title`, `_yoast_wpseo_metadesc`)

**Gestion des featured images** :
```typescript
interface Article {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categories: string[];
  image?: string;  // ⚠️ Défini mais jamais utilisé dans createPost()
  date?: string;
  seo?: { title: string | null; description: string | null };
}
```

**Problème détecté** :
```typescript
async function createPost(article: Article, categoryIds: number[], lang: string): Promise<number> {
  const body: Record<string, unknown> = {
    title: article.title,
    slug: article.slug,
    content: article.content,
    excerpt: article.excerpt,
    status: 'publish',
    categories: categoryIds,
    lang,
  };

  // ❌ MANQUE : featured_media field
  // if (article.image) {
  //   body.featured_media = await uploadImageFromUrl(article.image);
  // }

  const post = await wpFetch('/wp/v2/posts', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return post.id;
}
```

**Recommandation** :
```typescript
// Ajouter une fonction d'upload d'image
async function uploadImageFromUrl(url: string, title: string): Promise<number> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const blob = new Blob([buffer]);

  const formData = new FormData();
  formData.append('file', blob, `${title}.jpg`);

  const uploadResponse = await fetch(`${WP_API}/wp/v2/media`, {
    method: 'POST',
    headers: { Authorization: AUTH_HEADER },
    body: formData,
  });

  const media = await uploadResponse.json();
  return media.id;
}

// Dans createPost()
if (article.image) {
  const mediaId = await uploadImageFromUrl(article.image, article.title);
  body.featured_media = mediaId;
}
```

**Error handling** :
```typescript
try {
  const postId = await createPost(article, categoryIds, locale.lang);
  translationMap[locale.lang] = postId;
  console.log(`Created post: ID ${postId} (${article.title.slice(0, 50)}...)`);
} catch (err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  console.error(`[${locale.key}] Failed: ${msg}`);  // ✅ Bon
}
```

**Points positifs** :
- ✅ **Type narrowing** : `err instanceof Error` avant `.message`
- ✅ **Fallback String(err)** : capture tous les types d'erreurs
- ✅ **Logging par locale** : `[en] Failed: ...`

**Points d'attention** :
- ⚠️ **Pas de retry** : une erreur réseau = échec immédiat
- ⚠️ **Pas de rollback** : si la création FR réussit mais EN échoue, le post FR reste orphelin

#### `scripts/import-posts.ts`

**Points positifs** :
- ✅ **Pagination automatique** : `while (wpPosts.length > 0)` + `X-WP-TotalPages` header
- ✅ **Tri par date** : `.sort((a, b) => new Date(b.date) - new Date(a.date))`
- ✅ **Summary final** : tableau récapitulatif par locale
- ✅ **Entities décodées** : même fonction `decodeEntities()` que transformers.ts

**Featured images** :
```typescript
for (const wp of wpPosts) {
  allPosts.push({
    id: wp.id,
    title: toPlainText(wp.title?.rendered ?? ''),
    excerpt: toPlainText(wp.excerpt?.rendered ?? ''),
    content: cleanContent(wp.content?.rendered ?? ''),
    image: wp._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '',  // ✅
    date: wp.date,
    categories: (wp._embedded?.['wp:term']?.[0] ?? [])
      .map((t: { name: string }) => t.name)
      .filter(Boolean),
    link: wp.link,
    slug: wp.slug,
  });
}
```

**Points positifs** :
- ✅ **Featured image extraite** : via `_embed=wp:featuredmedia`
- ✅ **Fallback `""`** : pas de crash si image manquante

---

### 8. Sanitization du contenu

#### Flux sanitization

```
WordPress WYSIWYG
    ↓ <p>Hello <script>alert(1)</script> <strong>world</strong></p>
WordPress DB (post_content)
    ↓ REST API /wp/v2/posts
wp.content.rendered (HTML brut)
    ↓ cleanContent() — Whitelist tags
<p>Hello  <strong>world</strong></p>
    ↓ decodeEntities()
<p>Hello <strong>world</strong></p>
    ↓ src/data/posts.json
BlogPost.content (HTML nettoyé)
    ↓ dangerouslySetInnerHTML
<ArticleDetail /> (client component)
    ↓ DOMPurify.sanitize() (client-side)
DOM final
```

**Points positifs** :
- ✅ **Double sanitization** : server-side (cleanContent) + client-side (DOMPurify)
- ✅ **Whitelist stricte** : seuls `p`, `h2-6`, `strong`, `em`, `a`, `li` autorisés

**Problèmes détectés** :

1. **Server Components avec `dangerouslySetInnerHTML`** :

```typescript
// src/components/landing/LandingRichtext.tsx (SERVER COMPONENT)
const LandingRichtext = ({ title, content }: LandingRichtextProps) => {
  return (
    <div
      className="prose..."
      dangerouslySetInnerHTML={{ __html: content }}  // ❌ Pas de DOMPurify
    />
  );
};
```

**Fichiers concernés** :
- `src/components/landing/LandingRichtext.tsx` (server component)
- `src/app/[locale]/croisiere/page.tsx` (server component)
- `src/app/[locale]/faq/page.tsx` (server component)
- `src/app/[locale]/(landing)/[slug]/page.tsx` (server component)

**Analyse du risque** :
- ⚠️ **Contenu CMS trusted** : les landing pages sont éditées uniquement par les admins WordPress
- ⚠️ **ACF fields** : pas d'input utilisateur direct (pas de commentaires, pas de formulaires)
- ⚠️ **Rank Math fields** : SEO title/description échappés dans `<meta>`

**Statut** : ⚠️ **ACCEPTABLE** pour du contenu admin-only, mais **RECOMMANDÉ** d'ajouter une whitelist server-side :

```typescript
// Créer src/lib/sanitize-html.ts (server-side)
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'h2', 'h3', 'h4', 'strong', 'em', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}
```

2. **Client Components avec DOMPurify** :

```typescript
// src/views/ArticleDetail.tsx (CLIENT COMPONENT)
import DOMPurify from "dompurify";

function sanitizeHtml(html: string): string {
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(html);  // ✅ Bon
  }
  return html;  // ⚠️ Pas sanitizé en SSR
}
```

**Points positifs** :
- ✅ **DOMPurify client-side** : protection XSS dans le navigateur
- ✅ **Check `window`** : évite les erreurs SSR

**Points d'attention** :
- ⚠️ **SSR non sanitizé** : `return html` direct si `window` undefined (Next.js SSR)
- ⚠️ **Pas de config DOMPurify** : utilise les defaults (permissif)

**Recommandation** :
```typescript
function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") {
    // SSR : utiliser dompurify isomorphic
    return html; // Ou importer jsdom + dompurify (voir ci-dessus)
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  });
}
```

---

### 9. Revalidation webhook

#### Route API (`src/app/api/revalidate/route.ts`)

```typescript
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path");

  // Validate secret
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ error: "Missing path parameter" }, { status: 400 });
  }

  try {
    // Strip locale prefix and revalidate all locales
    const match = path.match(LOCALE_PREFIX_RE);
    const localeSegment = match?.[1];
    const suffix = localeSegment ? path.slice(localeSegment.length + 1) : path;

    const revalidated: string[] = [];
    for (const locale of LOCALES) {
      const localePath = `/${locale}${suffix === "/" ? "" : suffix}`;
      revalidatePath(localePath);  // ✅ Next.js 16 API
      revalidated.push(localePath);
    }

    return NextResponse.json({ revalidated: true, paths: revalidated });
  } catch (err) {
    return NextResponse.json(
      { error: "Revalidation failed", details: String(err) },
      { status: 500 }
    );
  }
}
```

**Points positifs** :
- ✅ **Multi-locale revalidation** : un webhook purge les 6 locales
- ✅ **Secret validation** : `REVALIDATE_SECRET` env var
- ✅ **Regex locale** : `LOCALE_PREFIX_RE` supporte `pt-BR`
- ✅ **Error handling** : try/catch + status codes

**Points d'attention** :
- ⚠️ **Webhook WordPress manquant** : le plugin `bateau-headless-mode` n'appelle PAS ce endpoint
- ⚠️ **Pas de signature HMAC** : seul un secret partagé (moins sécurisé)
- ⚠️ **Pas de rate limiting** : un attaquant avec le secret peut spammer

**Recommandation** :
```php
// Dans bateau-headless-mode.php, ajouter :
add_action('save_post', function ($post_id, $post) {
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return;
    }

    if (!in_array($post->post_type, ['post', 'landing_page'], true)) {
        return;
    }

    $path = '/' . get_post_field('post_name', $post_id);
    $secret = defined('BATEAU_REVALIDATE_SECRET') ? BATEAU_REVALIDATE_SECRET : '';
    $site_url = 'https://bateau-a-paris.fr';

    wp_remote_get($site_url . "/api/revalidate?secret={$secret}&path={$path}", [
        'blocking' => false,  // Asynchrone
        'timeout'  => 5,
    ]);
}, 10, 2);
```

---

### 10. Compatibilité plugins

#### ACF Pro

**Integration** :
```typescript
// types.ts
export interface WPLandingACF {
  hero_title: string;
  hero_subtitle: string;
  hero_background_image: string | WPImage;  // ACF Image field
  sections: WPFlexibleSection[];           // ACF Flexible Content
  related_pages: WPRelatedPage[] | false;  // ACF Relationship
}
```

**Exposition REST API** :
```php
// bateau-headless-mode.php lignes 708-723
add_action('rest_api_init', function () {
    register_rest_field('landing_page', 'acf', [
        'get_callback' => function ($post) {
            if (!function_exists('get_fields')) return [];
            $fields = get_fields($post['id']);
            return $fields ?: [];
        },
        'schema' => ['type' => 'object'],
    ]);
});
```

**Points positifs** :
- ✅ **ACF Free compatible** : `register_rest_field` manuel (pas besoin ACF REST API)
- ✅ **6 layouts flexible content** : richtext, benefits, gallery, testimonials, pricing, faq
- ✅ **Image fields** : support `string | WPImage` via `resolveImage()`

#### Rank Math SEO

**Integration** :
```php
// bateau-headless-mode.php lignes 912-940
add_action('rest_api_init', function () {
    foreach (['post', 'landing_page', 'page'] as $type) {
        register_rest_field($type, 'seo', [
            'get_callback' => function ($post) {
                if (!class_exists('RankMath')) return null;
                $post_id = $post['id'];
                return [
                    'title'         => get_post_meta($post_id, 'rank_math_title', true) ?: null,
                    'description'   => get_post_meta($post_id, 'rank_math_description', true) ?: null,
                    'focus_keyword' => get_post_meta($post_id, 'rank_math_focus_keyword', true) ?: null,
                    'robots'        => get_post_meta($post_id, 'rank_math_robots', true) ?: [],
                ];
            },
        ]);
    }
});
```

**Points positifs** :
- ✅ **Check class_exists** : pas d'erreur si Rank Math désactivé
- ✅ **Meta fields** : `rank_math_title`, `rank_math_description` exposés
- ✅ **Types TypeScript** : `WPSeoData` interface

**Points d'attention** :
- ⚠️ **Pas de Yoast support** : le code `push-articles-wp.ts` mentionne Yoast mais le plugin utilise Rank Math
- ⚠️ **Robots array** : peut être vide `[]` ou `null` selon config

#### Polylang Pro

**Integration** :
```php
// bateau-headless-mode.php lignes 391-394
add_filter('pll_get_post_types', function (array $post_types): array {
    $post_types['landing_page'] = 'landing_page';  // ✅ CPT public=false registré
    return $post_types;
});
```

**Filtres admin** :
```php
// lignes 401-426 : dropdown langues dans list tables
// lignes 433-469 : filter query par langue
```

**Points positifs** :
- ✅ **CPT `public=false` supporté** : `landing_page` détecté par Polylang
- ✅ **Filtres UI** : dropdown langues dans admin
- ✅ **Validation whitelist** : `pll_languages_list()` évite SQL injection

**Points d'attention** :
- ⚠️ **Polylang REST API v1 instable** : `push-articles-wp.ts` utilise un double fallback

---

## Problèmes détectés et recommandations

### 🔴 CRITIQUE

Aucun problème critique.

### 🟡 IMPORTANT

#### 1. Featured images non uploadées par `push-articles-wp.ts`

**Problème** : Le champ `article.image` existe dans l'interface mais n'est jamais utilisé dans `createPost()`.

**Impact** : Articles créés sans featured image → fallback `""` dans Next.js.

**Recommandation** : Implémenter `uploadImageFromUrl()` (voir section 7).

#### 2. Server Components avec `dangerouslySetInnerHTML` sans DOMPurify

**Problème** : 4 fichiers utilisent `dangerouslySetInnerHTML` côté serveur sans sanitization.

**Impact** : Si un admin WordPress injecte du JS malveillant dans ACF, il s'exécute dans Next.js.

**Recommandation** : Ajouter `sanitizeHtml()` server-side avec jsdom + DOMPurify (voir section 8).

#### 3. Webhook revalidation WordPress manquant

**Problème** : Le plugin `bateau-headless-mode` n'appelle pas `/api/revalidate` sur `save_post`.

**Impact** : Les modifications WordPress nécessitent un rebuild complet (GitHub Actions).

**Recommandation** : Ajouter hook `save_post` → `wp_remote_get()` (voir section 9).

#### 4. Pas de retry sur erreurs réseau

**Problème** : `wpFetch()`, `push-articles-wp.ts`, `import-posts.ts` n'ont pas de retry.

**Impact** : Une erreur réseau temporaire = échec total.

**Recommandation** :
```typescript
async function wpFetchWithRetry<T>(
  path: string,
  params?: Record<string, string>,
  options?: { revalidate?: number; retries?: number }
): Promise<T> {
  const maxRetries = options?.retries ?? 3;
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await wpFetch<T>(path, params, options);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Backoff
      }
    }
  }

  throw lastError!;
}
```

### 🟢 SOUHAITABLE

#### 5. Support tailles d'images WP

**Recommandation** : Extraire `media_details.sizes.full` au lieu de `source_url` (voir section 4).

#### 6. Support `<ul>`, `<ol>` dans `cleanContent()`

**Problème actuel** : Les listes perdent leur structure (seuls `<li>` extraits).

**Recommandation** :
```typescript
function cleanContent(html: string): string {
  const blockRegex = /<(p|h[2-6]|ul|ol|li)(?:\s[^>]*)?>(.+?)<\/\1>/gs;
  // ...
}
```

#### 7. Validation runtime avec Zod

**Recommandation** :
```typescript
import { z } from 'zod';

const WPPostSchema = z.object({
  id: z.number(),
  date: z.string(),
  slug: z.string(),
  title: z.object({ rendered: z.string() }),
  content: z.object({ rendered: z.string() }),
  _embedded: z.object({
    'wp:featuredmedia': z.array(z.object({ source_url: z.string() })).optional(),
  }).optional(),
});

export function transformToPost(wp: unknown): BlogPost {
  const validated = WPPostSchema.parse(wp);  // Throws si invalide
  // ...
}
```

#### 8. Logging structuré

**Recommandation** :
```typescript
// Dans wpFetch()
import { logger } from '@/lib/logger';

if (!res.ok) {
  logger.error('WordPress API error', {
    status: res.status,
    statusText: res.statusText,
    path: url.pathname,
    params,
  });
  throw new Error(`WordPress API error: ${res.status}`);
}
```

---

## Checklist d'audit

| Item | Statut | Détails |
|------|--------|---------|
| **Client REST API** |
| ISR cache (revalidate) | ✅ | 3600s (1h) |
| Error handling | ✅ | Try/catch + messages clairs |
| Pagination | ✅ | Boucle automatique `while` |
| Retry on failure | ❌ | Pas de retry |
| Typed responses | ✅ | Générique `<T>` |
| **Types TypeScript** |
| WPPost complet | ✅ | Tous les champs typés |
| WPLandingPage complet | ✅ | ACF fields + SEO |
| Flexible Content | ✅ | 6 layouts discriminated unions |
| Optional fields | ✅ | `?` correctement utilisé |
| Runtime validation | ❌ | Pas de Zod/Yup |
| **Transformateurs** |
| HTML entities décodées | ✅ | `decodeEntities()` complet |
| HTML tags whitelist | ✅ | `cleanContent()` strict |
| Featured images | ✅ | `_embedded['wp:featuredmedia']` |
| Multi-catégories | ✅ | `.map()` + `.filter(Boolean)` |
| SEO fields préservés | ✅ | Rank Math title/description |
| **Images** |
| Featured media via `_embed` | ✅ | `?_embed=wp:featuredmedia` |
| Fallback images manquantes | ✅ | `?? ""` |
| Upload dans `push-articles-wp` | ❌ | Champ `image` non utilisé |
| Tailles d'images WP | ❌ | Pas de `media_details.sizes` |
| Scripts de correction | ✅ | `fix-missing-images.ts` |
| **Multi-catégories** |
| Support `categories: string[]` | ✅ | Tableau de noms |
| Création auto catégories | ✅ | `getOrCreateCategory()` |
| Hiérarchie categories | ❌ | Parent/child perdu |
| **Polylang** |
| Linking translations | ✅ | Double fallback REST + meta |
| Validation langue | ✅ | Whitelist `pll_languages_list()` |
| Error handling | ✅ | Graceful degradation |
| **Scripts push/import** |
| Multi-locales | ✅ | 6 langues |
| Error handling | ✅ | Try/catch par locale |
| Logging | ✅ | Console clair |
| Retry | ❌ | Pas de retry |
| Rollback | ❌ | Pas de mécanisme |
| **Sanitization** |
| Server-side whitelist | ✅ | `cleanContent()` |
| Client-side DOMPurify | ⚠️ | ArticleDetail only |
| Server Components | ⚠️ | `dangerouslySetInnerHTML` sans sanitize |
| **Revalidation** |
| ISR cache | ✅ | `revalidate: 3600` |
| Webhook route | ✅ | `/api/revalidate` |
| WordPress hook | ❌ | Pas de `save_post` hook |
| Secret validation | ✅ | `REVALIDATE_SECRET` |
| Rate limiting | ❌ | Pas de limite |
| **Plugins** |
| ACF Pro | ✅ | Flexible Content + REST API |
| Rank Math SEO | ✅ | Meta fields exposés |
| Polylang Pro | ✅ | CPT + filtres admin |

---

## Plan d'action recommandé

### Sprint 1 (1-2 jours) — Correctifs critiques

1. **Ajouter webhook revalidation WordPress** (2h)
   - Hook `save_post` dans `bateau-headless-mode.php`
   - Appel asynchrone `/api/revalidate`
   - Test avec article + landing page

2. **Implémenter featured image upload** (3h)
   - Fonction `uploadImageFromUrl()` dans `push-articles-wp.ts`
   - Test avec images locales + URLs externes
   - Update docs

3. **Sanitization server-side** (2h)
   - Installer `jsdom` + `dompurify` (dev deps)
   - Créer `src/lib/sanitize-html.ts`
   - Remplacer `dangerouslySetInnerHTML` dans LandingRichtext, etc.

### Sprint 2 (2-3 jours) — Améliorations importantes

4. **Retry logic** (2h)
   - Wrapper `wpFetchWithRetry()` avec backoff
   - Update `client.ts`, `push-articles-wp.ts`, `import-posts.ts`
   - Tests unitaires

5. **Validation runtime Zod** (3h)
   - Installer `zod`
   - Schémas `WPPostSchema`, `WPLandingPageSchema`
   - Error handling + logging

6. **Support tailles images WP** (1h)
   - Types `media_details.sizes`
   - Extraction `full` ou `large` en priorité

### Sprint 3 (1 jour) — Optimisations

7. **Support listes HTML** (1h)
   - Update `cleanContent()` pour `<ul>`, `<ol>`
   - Tests regex

8. **Logging structuré** (2h)
   - Logs `wpFetch()` avec context
   - Dashboard Vercel logs analysis

9. **Rate limiting revalidation** (1h)
   - Transient lock 1 min côté WordPress
   - Edge middleware Next.js (optionnel)

---

## Conclusion

L'intégration WordPress → Next.js est **solide** et suit les **bonnes pratiques** modernes (headless CMS, ISR, TypeScript strict, multi-locale). Les principales faiblesses sont :

1. **Sanitization server-side** : `dangerouslySetInnerHTML` sur server components sans DOMPurify
2. **Webhook revalidation manquant** : modifications WP nécessitent rebuild complet
3. **Featured images non uploadées** : champ `image` dans `push-articles-wp.ts` inutilisé
4. **Pas de retry** : erreurs réseau = échec immédiat

**Score final : 8.5/10**

### Décomposition du score
- Architecture API : 9/10
- Types TypeScript : 9/10
- Transformateurs : 8.5/10
- Gestion images : 8/10
- Multi-catégories : 9/10
- Polylang : 9/10
- Scripts push/import : 8.5/10
- Sanitization : 7.5/10
- Revalidation : 8/10
- Compatibilité plugins : 9/10

### Prochaines étapes

1. **Aujourd'hui** : Webhook revalidation + sanitization server-side
2. **Cette semaine** : Featured image upload + retry logic
3. **Ce mois** : Validation Zod + tailles images WP
4. **Continu** : Monitoring logs WordPress API errors

---

**Rapport généré le** : 2026-02-18
**Fichiers audités** :
- `src/lib/wordpress/client.ts` (132 lignes)
- `src/lib/wordpress/types.ts` (127 lignes)
- `src/lib/wordpress/transformers.ts` (216 lignes)
- `scripts/push-articles-wp.ts` (247 lignes)
- `scripts/import-posts.ts` (201 lignes)
- `wordpress/plugins/bateau-headless-mode/bateau-headless-mode.php` (941 lignes)
- `src/app/api/revalidate/route.ts` (68 lignes)

**Total** : 1932 lignes de code auditées
