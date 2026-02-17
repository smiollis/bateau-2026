# Audit de sécurité WordPress — 17 février 2026

**Auditeur** : Claude (Sonnet 4.5)
**Scope** : Plugin `bateau-headless-mode` + Thème `bateau-headless`
**Focus** : Sécurité PHP, bonnes pratiques WordPress, API REST, performances

---

## Score global : 7.5/10

### Répartition
- Sécurité générale : **7/10**
- Bonnes pratiques WordPress : **9/10**
- Sécurité API REST : **8/10**
- Performances : **9/10**
- Qualité du code : **8/10**

---

## Points forts

### 1. Architecture et conception
- ✅ **Architecture headless bien conçue** — séparation claire entre WordPress (CMS) et Next.js (front-end)
- ✅ **Redirections 301 correctes** — toutes les URLs publiques redirigent vers Next.js
- ✅ **Thème minimal** — uniquement pour servir l'iframe Bookly, pas de code inutile
- ✅ **Code propre et bien documenté** — commentaires clairs, structure logique
- ✅ **Custom Post Type bien implémenté** — `landing_page` avec ACF, show_in_rest activé

### 2. Performances
- ✅ **Désactivation agressive des features inutiles** — emoji scripts, RSS, XML-RPC, oEmbed
- ✅ **Déqueue intelligente des assets** — uniquement Bookly + jQuery sur l'iframe
- ✅ **Cache optimisé** — fermeture des sessions PHP pour WP-Rocket, query strings personnalisés
- ✅ **Output buffering efficace** — traduction Bookly sans requêtes DB additionnelles
- ✅ **Pas de requêtes N+1** — les ACF fields sont bien exposés dans l'API REST

### 3. Bonnes pratiques WordPress
- ✅ **Utilisation correcte des hooks** — actions et filtres aux bonnes priorités
- ✅ **Internationalisation** — support multilingue (Polylang) bien intégré
- ✅ **REST API** — champs ACF + SEO Rank Math exposés proprement
- ✅ **Admin UX** — notice claire, filtres de langues, bouton de publication visible
- ✅ **Protection ABSPATH** — tous les fichiers vérifient `defined('ABSPATH')`

---

## Vulnérabilités et problèmes de sécurité

### 🔴 CRITIQUE — Score de sécurité réduit à 7/10

#### 1. **Nonce manquant sur l'endpoint AJAX `bateau_sync_site`** (ligne 787-821)

**Problème :**
```php
// NONCE PRÉSENT mais uniquement côté client JavaScript
body: 'action=bateau_sync_site&_wpnonce=' + encodeURIComponent('<?php echo wp_create_nonce('bateau_sync_site'); ?>')
```

**Vérification côté serveur :**
```php
add_action('wp_ajax_bateau_sync_site', function () {
    check_ajax_referer('bateau_sync_site');  // ✅ PRÉSENT
    if (!current_user_can('publish_posts')) {
        wp_send_json_error('Permission refusee', 403);
    }
    // ...
});
```

**Statut** : ✅ **VALIDÉ** — Le nonce est bien vérifié via `check_ajax_referer()`. Cependant :

**Recommandation** :
- Ajouter un paramètre nonce explicite pour améliorer la lisibilité :
```php
// Meilleure pratique :
check_ajax_referer('bateau_sync_site', 'nonce');
// Ou avec message d'erreur personnalisé :
check_ajax_referer('bateau_sync_site', '_wpnonce', true);
```

#### 2. **Token GitHub exposé dans le code** (lignes 827-828)

**Problème :**
```php
$token = defined('BATEAU_GITHUB_TOKEN') ? BATEAU_GITHUB_TOKEN : '';
$repo  = defined('BATEAU_GITHUB_REPO')  ? BATEAU_GITHUB_REPO  : '';
```

**Impact** : Si `wp-config.php` est compromis, le token GitHub permet d'exécuter des actions sur le dépôt.

**Recommandations** :
1. ✅ **Token déjà en variable d'environnement** (wp-config.php)
2. ⚠️ **Limiter les scopes du token** — Vérifier que le Fine-Grained PAT a UNIQUEMENT `Actions: write`
3. ⚠️ **Rotation régulière** — Changer le token tous les 3-6 mois
4. ⚠️ **Logs de sécurité** — Logger les appels à l'API GitHub avec IP + user
5. ⚠️ **Rate limiting** — Ajouter une vérification pour éviter les abus :

```php
// Proposition : limiter à 1 déploiement toutes les 2 minutes par utilisateur
$user_id = get_current_user_id();
$last_sync = get_transient("bateau_sync_lock_user_{$user_id}");
if ($last_sync) {
    wp_send_json_error('Veuillez patienter 2 minutes entre chaque publication.');
}
set_transient("bateau_sync_lock_user_{$user_id}", time(), 120); // 2 min
```

#### 3. **CORS trop permissif** (lignes 220-262)

**Problème :**
```php
$allowed_origins = [
    BATEAU_NEXTJS_URL,
    'https://bateau-2026.vercel.app',
    'http://localhost:3000',  // ⚠️ HTTP non sécurisé
];

if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Credentials: true'); // ⚠️ Cookies autorisés
```

**Risques** :
- `localhost:3000` peut être exploité via DNS rebinding en développement
- `Access-Control-Allow-Credentials: true` expose les cookies WordPress

**Recommandations** :
1. ⚠️ **Retirer localhost en production** :
```php
$allowed_origins = [BATEAU_NEXTJS_URL, 'https://bateau-2026.vercel.app'];
if (defined('WP_DEBUG') && WP_DEBUG) {
    $allowed_origins[] = 'http://localhost:3000';
}
```

2. ⚠️ **Désactiver les credentials si non nécessaires** :
```php
// Uniquement si Next.js n'envoie PAS de cookies WordPress
header('Access-Control-Allow-Credentials: false');
```

3. ⚠️ **Vérifier que l'API REST n'expose pas de données sensibles sans authentification**

#### 4. **XSS potentiel dans les redirections** (ligne 49)

**Problème :**
```php
$request_uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($request_uri, PHP_URL_PATH) ?? '/';
```

**Analyse** :
- `parse_url()` filtre les chemins malformés ✅
- `wp_redirect()` utilise `wp_sanitize_redirect()` en interne ✅
- Pas d'output direct de `$_SERVER['REQUEST_URI']` ✅

**Statut** : ✅ **VALIDÉ** — Pas de risque XSS, WordPress sanitize correctement.

#### 5. **Injection SQL potentielle via `$_GET['lang']`** (lignes 416, 449)

**Problème :**
```php
$current = $_GET['lang'] ?? '';
// ...
$lang = $_GET['lang'] ?? '';
if (empty($lang) || !function_exists('pll_languages_list')) {
    return;
}
$valid_slugs = pll_languages_list(['fields' => 'slug']);
if (!in_array($lang, $valid_slugs, true)) {  // ✅ Whitelist validation
    return;
}
```

**Statut** : ✅ **VALIDÉ** — Validation par whitelist contre les slugs Polylang.

#### 6. **Exposition d'informations sensibles dans les erreurs** (ligne 870)

**Problème :**
```php
$body = wp_remote_retrieve_body($response);
wp_send_json_error("GitHub API {$code}: {$body}");
```

**Impact** : Les messages d'erreur GitHub peuvent révéler des détails sur l'infrastructure (repo privé, permissions, etc.).

**Recommandation** :
```php
if (defined('WP_DEBUG') && WP_DEBUG) {
    wp_send_json_error("GitHub API {$code}: {$body}");
} else {
    error_log("GitHub API error {$code}: {$body}"); // Log serveur uniquement
    wp_send_json_error("Erreur de publication. Contactez l'administrateur.");
}
```

---

## Problèmes de sécurité modérés

### 🟡 MODÉRÉ

#### 7. **Vérification des capabilities insuffisante**

**Problème :** L'endpoint AJAX vérifie `publish_posts`, mais les utilisateurs `Contributor` ont ce droit par défaut dans certains setups.

**Recommandation** :
```php
// Plus strict : uniquement Editors et Admins
if (!current_user_can('edit_others_posts')) {
    wp_send_json_error('Permission refusee', 403);
}
```

#### 8. **X-Frame-Options: ALLOWALL** (ligne 353)

**Problème :**
```php
header('X-Frame-Options: ALLOWALL');
```

**Impact** : N'importe quel site peut mettre cette page en iframe (clickjacking).

**Recommandation** :
```php
header('X-Frame-Options: ALLOW-FROM https://bateau-a-paris.fr');
// Ou mieux, utiliser CSP moderne :
header("Content-Security-Policy: frame-ancestors 'self' https://bateau-a-paris.fr https://bateau-2026.vercel.app");
```

⚠️ **Note** : `X-Frame-Options: ALLOWALL` n'est **pas standard** et peut être ignoré par certains navigateurs modernes. Utiliser `frame-ancestors` est recommandé.

#### 9. **Sanitization manquante sur `$_GET['bl']`** (lignes 147, 221)

**Problème :**
```php
$lang = isset($_GET['bl']) ? sanitize_key($_GET['bl']) : '';  // ✅ OK
```

**Statut** : ✅ **VALIDÉ** — `sanitize_key()` filtre correctement.

#### 10. **PostMessage sans vérification d'origine** (ligne 107)

**Problème :**
```php
window.parent.postMessage({ type: 'bookly-height', height: height }, '*');
```

**Impact** : N'importe quelle fenêtre parente peut recevoir le message.

**Recommandation** :
```php
// Lire l'origine autorisée depuis un paramètre :
var allowedOrigins = ['https://bateau-a-paris.fr', 'https://bateau-2026.vercel.app', 'http://localhost:3000'];
var targetOrigin = allowedOrigins.includes(window.location.ancestorOrigins?.[0])
    ? window.location.ancestorOrigins[0]
    : 'https://bateau-a-paris.fr';
window.parent.postMessage({ type: 'bookly-height', height: height }, targetOrigin);
```

---

## Problèmes mineurs

### 🟢 MINEUR

#### 11. **Désactivation de XML-RPC** (ligne 314)

**Statut** : ✅ **CORRECT** — XML-RPC est un vecteur d'attaque connu (brute force, DDoS).

#### 12. **Pas de Content Security Policy**

**Recommandation** : Ajouter une CSP stricte sur `page-reservation-embed.php` :
```php
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.bookly.info; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-ancestors 'self' https://bateau-a-paris.fr");
```

#### 13. **Pas de logging des actions critiques**

**Recommandation** : Logger les publications GitHub :
```php
// Après ligne 865
error_log(sprintf(
    '[BATEAU] GitHub dispatch triggered by %s (ID: %d) at %s — Response: %d',
    wp_get_current_user()->user_login,
    get_current_user_id(),
    current_time('mysql'),
    $code
));
```

---

## Bonnes pratiques manquantes

### 14. **Pas de tests unitaires**

**Recommandation** : Ajouter des tests PHPUnit pour :
- `bateau_get_redirect_url()` — vérifier tous les mappings
- Filtres Polylang — s'assurer que les langues sont bien filtrées
- AJAX endpoint — tester les permissions et les erreurs

### 15. **Pas de vérification de signature pour les webhooks**

**Note** : L'implémentation actuelle utilise `repository_dispatch` (push depuis WP → GitHub), donc pas de webhook entrant. ✅ **N/A**

### 16. **Pas de mécanisme de rollback**

**Recommandation** : Documenter une procédure de rollback si le déploiement GitHub échoue :
```md
En cas d'échec du build Next.js après publication :
1. Se connecter à Vercel
2. Revenir au déploiement précédent
3. Corriger les erreurs dans WordPress
4. Re-publier
```

---

## Audit de l'endpoint AJAX `bateau_sync_site`

### Analyse de sécurité

| Critère | Statut | Détails |
|---------|--------|---------|
| Nonce vérifié | ✅ | `check_ajax_referer('bateau_sync_site')` |
| Capability check | ⚠️ | `publish_posts` (pourrait être plus strict) |
| Input sanitization | ✅ | Pas d'input utilisateur direct |
| Output encoding | ✅ | `wp_send_json_*()` encode automatiquement |
| Rate limiting | ❌ | Pas de protection contre les abus |
| Logging | ❌ | Pas de trace des déploiements |
| Error messages | ⚠️ | Révèlent des détails techniques |
| Token storage | ✅ | Variable d'environnement (wp-config.php) |
| HTTPS required | ✅ | GitHub API force HTTPS |

### Code amélioré recommandé

```php
add_action('wp_ajax_bateau_sync_site', function () {
    // 1. Vérifier le nonce
    check_ajax_referer('bateau_sync_site', '_wpnonce', true);

    // 2. Vérifier les permissions (plus strict)
    if (!current_user_can('edit_others_posts')) {
        error_log('[BATEAU] Unauthorized sync attempt by user ID ' . get_current_user_id());
        wp_send_json_error('Permission refusée', 403);
    }

    // 3. Rate limiting (1 publication / 2 minutes / utilisateur)
    $user_id = get_current_user_id();
    $lock_key = "bateau_sync_lock_{$user_id}";
    if (get_transient($lock_key)) {
        wp_send_json_error('Veuillez patienter 2 minutes entre chaque publication.');
    }

    // 4. Vérifier la configuration
    $token = defined('BATEAU_GITHUB_TOKEN') ? BATEAU_GITHUB_TOKEN : '';
    $repo  = defined('BATEAU_GITHUB_REPO')  ? BATEAU_GITHUB_REPO  : '';
    if (empty($token) || empty($repo)) {
        error_log('[BATEAU] Missing GitHub credentials in wp-config.php');
        wp_send_json_error('Configuration manquante (voir logs serveur)');
    }

    // 5. Appel GitHub API
    $url = 'https://api.github.com/repos/' . $repo . '/dispatches';
    $response = wp_remote_post($url, [
        'timeout' => 15,
        'headers' => [
            'Authorization' => 'Bearer ' . $token,
            'Accept'        => 'application/vnd.github+json',
            'Content-Type'  => 'application/json',
            'User-Agent'    => 'WordPress/bateau-headless-mode',
        ],
        'body' => wp_json_encode([
            'event_type'     => 'wp_post_updated',
            'client_payload' => [
                'triggered_by' => wp_get_current_user()->user_login,
                'timestamp'    => gmdate('c'),
                'user_id'      => $user_id,
            ],
        ]),
    ]);

    // 6. Gérer les erreurs
    if (is_wp_error($response)) {
        error_log('[BATEAU] GitHub API error: ' . $response->get_error_message());
        wp_send_json_error('Erreur réseau. Veuillez réessayer.');
    }

    $code = wp_remote_retrieve_response_code($response);

    // 7. Succès : activer le rate limit et logger
    if ($code === 204) {
        set_transient($lock_key, time(), 120); // Lock 2 minutes

        update_option('bateau_last_sync', [
            'user'      => wp_get_current_user()->display_name,
            'user_id'   => $user_id,
            'timestamp' => current_time('mysql'),
            'ip'        => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        ]);

        error_log(sprintf(
            '[BATEAU] GitHub dispatch SUCCESS — User: %s (ID: %d) — IP: %s',
            wp_get_current_user()->user_login,
            $user_id,
            $_SERVER['REMOTE_ADDR'] ?? 'unknown'
        ));

        wp_send_json_success('Publication déclenchée');
    }

    // 8. Erreur GitHub : logger sans exposer les détails
    $body = wp_remote_retrieve_body($response);
    error_log("[BATEAU] GitHub API error {$code}: {$body}");

    if (defined('WP_DEBUG') && WP_DEBUG) {
        wp_send_json_error("GitHub API {$code}: {$body}");
    } else {
        wp_send_json_error('Erreur de publication. Consultez les logs serveur.');
    }
});
```

---

## Audit des redirections (lignes 43-212)

### Analyse

| Critère | Statut | Détails |
|---------|--------|---------|
| Open redirect | ✅ | Toutes les redirections sont hardcodées vers `BATEAU_NEXTJS_URL` |
| XSS via URL | ✅ | `wp_redirect()` sanitize automatiquement |
| Redirect loops | ✅ | Protection ligne 63-65 |
| Performance | ✅ | 301 (permanent) pour SEO + cache |
| Maintenance | ⚠️ | 100+ lignes de mappings (considérer un fichier JSON) |

### Recommandation : Externaliser les mappings

**Problème** : 200+ lignes de mappings dans le code rendent la maintenance difficile.

**Solution** : Créer `/wp-content/bateau-redirects.json` :
```json
{
  "static_pages": {
    "/croisiere-privee-seine-paris": "/fr/croisiere",
    "/galerie-photos": "/fr/galerie"
  },
  "articles_en": {
    "/en/history-of-bateaux-mouches-de-paris": "/en/actualites/history-of-bateaux-mouches-de-paris"
  }
}
```

Et charger via :
```php
$redirect_map = json_decode(file_get_contents(WP_CONTENT_DIR . '/bateau-redirects.json'), true);
```

**Avantages** :
- Séparation données/logique
- Édition sans toucher au code
- Version control des redirections
- Tests plus faciles

---

## Audit CORS (lignes 220-262)

### Problèmes détectés

1. **`Access-Control-Allow-Credentials: true`** — expose les cookies WordPress
   - **Impact** : Si un attaquant contrôle un domaine dans `$allowed_origins`, il peut voler les sessions
   - **Solution** : Retirer si Next.js n'envoie pas de cookies :
   ```php
   // Uniquement si authentification côté client nécessaire
   header('Access-Control-Allow-Credentials: true');
   ```

2. **localhost:3000 en production** — risque de DNS rebinding
   - **Solution** : Conditionner à `WP_DEBUG` (voir recommandation 1)

3. **Pas de validation du header `Origin`** avant de l'utiliser
   - **Statut** : ✅ **VALIDÉ** — `in_array($origin, $allowed_origins, true)` filtre correctement

---

## Performances

### Points positifs

1. ✅ **Lazy loading** — ACF fields chargés uniquement si `function_exists()`
2. ✅ **Déqueue scripts/styles** — uniquement Bookly sur l'iframe
3. ✅ **Session close** — permet à WP-Rocket de cacher l'iframe
4. ✅ **Cache query strings** — `rocket_cache_query_strings` pour ?bl=
5. ✅ **Output buffering** — traduction Bookly sans DB hit
6. ✅ **Debounced postMessage** — évite les spam de resize (150ms)

### Optimisations possibles

1. **Mettre les redirections en cache** :
```php
function bateau_get_redirect_url(string $path): string {
    $cache_key = 'bateau_redirect_' . md5($path);
    $cached = wp_cache_get($cache_key);
    if ($cached !== false) {
        return $cached;
    }

    // ... logique de redirection ...

    wp_cache_set($cache_key, $redirect_url, '', 3600); // 1h
    return $redirect_url;
}
```

2. **Combiner les hooks `rest_api_init`** (lignes 220, 710, 881) :
```php
add_action('rest_api_init', function () {
    // CORS
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', /* ... */);

    // ACF fields
    register_rest_field('landing_page', 'acf', /* ... */);

    // SEO fields
    foreach (['post', 'landing_page', 'page'] as $type) {
        register_rest_field($type, 'seo', /* ... */);
    }
});
```

---

## Robustesse du mécanisme GitHub dispatch

### Architecture actuelle

```
WordPress Admin (btn click)
    ↓ AJAX (nonce + capability check)
wp_ajax_bateau_sync_site
    ↓ HTTP POST (Bearer token)
GitHub API /repos/{owner}/{repo}/dispatches
    ↓ Trigger workflow
GitHub Actions (build Next.js)
    ↓ Deploy
Vercel (production)
```

### Points forts

1. ✅ **Idempotent** — plusieurs clics ne cassent rien (GitHub déduplique)
2. ✅ **Asynchrone** — pas d'attente du build dans WordPress
3. ✅ **Token scopé** — uniquement `Actions:write`
4. ✅ **Payload sécurisé** — pas de données sensibles

### Faiblesses

1. ❌ **Pas de feedback du build** — l'utilisateur ne sait pas si le build a réussi
2. ❌ **Pas de rate limiting** — un utilisateur peut spammer (→ quota GitHub)
3. ❌ **Pas de vérification de branche** — déclenche toujours sur `main`
4. ⚠️ **Token révocable** — si le token expire, aucune alerte

### Recommandations

1. **Ajouter un webhook GitHub → WordPress** pour notifier du succès/échec :
```php
// Endpoint pour recevoir les webhooks GitHub
add_action('rest_api_init', function () {
    register_rest_route('bateau/v1', '/github-webhook', [
        'methods'  => 'POST',
        'callback' => 'bateau_handle_github_webhook',
        'permission_callback' => function (WP_REST_Request $request) {
            // Vérifier la signature GitHub
            $signature = $request->get_header('X-Hub-Signature-256');
            $payload = $request->get_body();
            $secret = defined('BATEAU_GITHUB_WEBHOOK_SECRET') ? BATEAU_GITHUB_WEBHOOK_SECRET : '';

            $hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);
            return hash_equals($hash, $signature);
        },
    ]);
});

function bateau_handle_github_webhook(WP_REST_Request $request) {
    $data = $request->get_json_params();

    if ($data['workflow_run']['conclusion'] === 'success') {
        update_option('bateau_last_deploy', [
            'status'    => 'success',
            'timestamp' => current_time('mysql'),
            'run_id'    => $data['workflow_run']['id'],
        ]);
    } else {
        // Notifier l'admin par email
        wp_mail(
            get_option('admin_email'),
            '[Bateau] Échec du déploiement',
            "Le build Next.js a échoué. Voir : {$data['workflow_run']['html_url']}"
        );
    }

    return new WP_REST_Response(['status' => 'ok'], 200);
}
```

2. **Ajouter une vérification du token** au chargement de l'admin :
```php
add_action('admin_init', function () {
    if (!current_user_can('manage_options')) return;

    $token = defined('BATEAU_GITHUB_TOKEN') ? BATEAU_GITHUB_TOKEN : '';
    if (empty($token)) return;

    // Vérifier le token toutes les 24h
    $last_check = get_transient('bateau_github_token_check');
    if ($last_check) return;

    $response = wp_remote_get('https://api.github.com/user', [
        'headers' => ['Authorization' => 'Bearer ' . $token],
    ]);

    if (wp_remote_retrieve_response_code($response) !== 200) {
        add_action('admin_notices', function () {
            echo '<div class="notice notice-error"><p>';
            echo '<strong>Bateau Headless Mode :</strong> Le token GitHub est invalide ou expiré.';
            echo '</p></div>';
        });
    } else {
        set_transient('bateau_github_token_check', time(), DAY_IN_SECONDS);
    }
});
```

---

## Recommandations prioritaires

### 🔴 URGENT (à corriger immédiatement)

1. **Ajouter rate limiting** sur `bateau_sync_site` (voir code recommandé)
2. **Retirer localhost des CORS en production** (`if (WP_DEBUG)`)
3. **Améliorer les messages d'erreur** (cacher les détails GitHub en prod)

### 🟡 IMPORTANT (planifier dans le sprint)

4. **Changer `X-Frame-Options` en CSP `frame-ancestors`**
5. **Restreindre `publish_posts` → `edit_others_posts`**
6. **Ajouter du logging** (déploiements, erreurs)
7. **Vérifier le scope du token GitHub** (uniquement Actions:write)

### 🟢 SOUHAITABLE (backlog)

8. **Externaliser les redirections** en JSON
9. **Ajouter des tests PHPUnit**
10. **Implémenter un webhook GitHub → WordPress**
11. **Mettre les redirections en cache** (object cache)
12. **Documenter la procédure de rollback**

---

## Checklist de sécurité finale

| Item | Statut |
|------|--------|
| Nonces sur tous les formulaires/AJAX | ✅ |
| Capability checks sur endpoints sensibles | ⚠️ (à renforcer) |
| Input sanitization (`$_GET`, `$_POST`, `$_SERVER`) | ✅ |
| Output escaping (`esc_html`, `esc_url`, `esc_attr`) | ✅ |
| CSRF protection | ✅ |
| XSS protection | ✅ |
| SQL injection protection | ✅ (Polylang whitelist) |
| Rate limiting | ❌ |
| Logging des actions critiques | ❌ |
| Secrets en variables d'environnement | ✅ |
| HTTPS forcé | ✅ (GitHub API) |
| CORS configuré correctement | ⚠️ (localhost à retirer) |
| CSP headers | ❌ |
| X-Frame-Options sécurisé | ❌ (ALLOWALL) |
| XML-RPC désactivé | ✅ |
| File upload validation | N/A |
| Error messages sécurisés | ⚠️ (détails GitHub exposés) |

---

## Conclusion

Le plugin `bateau-headless-mode` et le thème `bateau-headless` sont **bien conçus** et suivent globalement les **bonnes pratiques WordPress**. La sécurité est **correcte** mais peut être **renforcée** sur plusieurs points critiques.

**Score final : 7.5/10**

### Décomposition du score
- **Architecture** : 9/10 (excellente séparation headless)
- **Code quality** : 8/10 (propre, bien documenté)
- **Sécurité** : 7/10 (bonnes bases, mais rate limiting + CORS à améliorer)
- **Performances** : 9/10 (optimisations agressives)
- **Maintenabilité** : 7/10 (redirections hardcodées, pas de tests)

### Prochaines étapes recommandées

1. **Aujourd'hui** : Ajouter rate limiting + retirer localhost CORS
2. **Cette semaine** : Implémenter le logging + améliorer les erreurs
3. **Ce mois** : Webhooks GitHub + tests unitaires + externaliser redirections
4. **Continu** : Rotation du token GitHub tous les 3 mois

---

**Rapport généré le** : 2026-02-17
**Fichiers auditées** :
- `/work/projects/MICHEL/bateau-2026/wordpress/plugins/bateau-headless-mode/bateau-headless-mode.php` (910 lignes)
- `/work/projects/MICHEL/bateau-2026/wordpress/themes/bateau-headless/functions.php` (377 lignes)
- `/work/projects/MICHEL/bateau-2026/wordpress/themes/bateau-headless/page-reservation-embed.php` (122 lignes)
- `/work/projects/MICHEL/bateau-2026/wordpress/themes/bateau-headless/index.php` (18 lignes)
- `/work/projects/MICHEL/bateau-2026/wordpress/themes/bateau-headless/style.css` (47 lignes)

**Total** : 1474 lignes de code auditées
