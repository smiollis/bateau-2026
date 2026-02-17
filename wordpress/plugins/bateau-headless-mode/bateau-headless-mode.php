<?php
/**
 * Plugin Name: Bateau Headless Mode
 * Plugin URI:  https://bateau-a-paris.fr
 * Description: Transforms WordPress into a headless CMS — redirects all front-end URLs to the Next.js site, enables CORS for REST API, disables unnecessary front-end features.
 * Version:     2.2.0
 * Author:      Un Bateau à Paris
 * License:     GPL-2.0-or-later
 * Text Domain: bateau-headless
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * ============================================================
 * CONFIGURATION
 * ============================================================
 */

// Next.js front-end URL (production)
define('BATEAU_NEXTJS_URL', 'https://bateau-a-paris.fr');

// Paths that should NOT be redirected (stay on WordPress)
define('BATEAU_ALLOWED_PATHS', [
    '/wp-admin',
    '/wp-login.php',
    '/wp-cron.php',
    '/wp-json',
    '/xmlrpc.php',
    '/reservation-embed',  // Bookly iframe endpoint
]);

/**
 * ============================================================
 * 1. REDIRECT FRONT-END TO NEXT.JS
 * ============================================================
 *
 * All front-end requests are 301-redirected to the Next.js site.
 * WordPress admin, REST API, and Bookly iframe are excluded.
 */
add_action('template_redirect', function () {
    // Never redirect admin, AJAX, or CLI requests
    if (is_admin() || wp_doing_ajax() || (defined('WP_CLI') && WP_CLI)) {
        return;
    }

    $request_uri = $_SERVER['REQUEST_URI'] ?? '/';
    $path = parse_url($request_uri, PHP_URL_PATH) ?? '/';

    // Check if the path starts with any allowed prefix
    foreach (BATEAU_ALLOWED_PATHS as $allowed) {
        if (strpos($path, $allowed) === 0) {
            return;
        }
    }

    // Map WordPress URLs to Next.js URLs
    $redirect_url = bateau_get_redirect_url($path);

    // Prevent redirect loops
    if (strpos($redirect_url, home_url()) === 0) {
        return;
    }

    wp_redirect($redirect_url, 301);
    exit;
});

/**
 * Map a WordPress path to its Next.js equivalent.
 *
 * @param string $path The incoming WordPress URL path.
 * @return string The target Next.js URL.
 */
function bateau_get_redirect_url(string $path): string {
    $base = BATEAU_NEXTJS_URL;

    // Remove trailing slash for consistent matching
    $path = rtrim($path, '/');

    // ---- Static page redirects (FR) ----
    $page_map = [
        ''                                              => '/fr',
        '/croisiere-privee-seine-paris'                 => '/fr/croisiere',
        '/un-bateau-a-paris_le-senang'                  => '/fr/croisiere',
        '/un-bateau-a-paris_tarif-de-votre-croisiere'   => '/fr/croisiere',
        '/galerie-photos'                               => '/fr/galerie',
        '/foire-aux-questions_un-bateau-a-paris'        => '/fr/faq',
        '/les-actualites-du-senang'                     => '/fr/actualites',
        '/actualites-un-bateau-a-paris'                 => '/fr/actualites',
        '/contacter-un-bateau-a-paris'                  => '/fr#contact',
        '/cgv-un-bateau-a-paris'                        => '/fr/cgv',
        '/mentions-legales-un-bateau-a-paris'           => '/fr/mentions-legales',
        '/politique-de-confidentialite'                  => '/fr/confidentialite',
        '/un-bateau-a-paris_politique-de-cookies-ue'    => '/fr/confidentialite',
        '/croisiere-romantique-a-paris'                 => '/fr/croisiere',
        '/croisiere-en-famille-a-paris'                 => '/fr/croisiere',
    ];

    // ---- Static page redirects (EN) ----
    $page_map_en = [
        '/en'                                           => '/en',
        '/en/your-private-cruise-in-paris'              => '/en/croisiere',
        '/en/our-boat-the-senang'                       => '/en/croisiere',
        '/en/rates-for-your-private-cruise-in-paris'    => '/en/croisiere',
        '/en/rates-for-your-private-cruise-in-paris-2'  => '/en/croisiere',
        '/en/frequently-asked-questions'                 => '/en/faq',
        '/en/our-news'                                  => '/en/actualites',
        '/en/news-un-bateau-a-paris'                    => '/en/actualites',
        '/en/contact-un-bateau-a-paris'                 => '/en#contact',
        '/en/contact-un-bateau-a-paris-2'               => '/en#contact',
        '/en/contact-un-bateau-a-paris-3'               => '/en#contact',
        '/en/terms-conditions'                          => '/en/cgv',
        '/en/cookie-policy-eu'                          => '/en/confidentialite',
    ];

    $page_map = array_merge($page_map, $page_map_en);

    // Exact match
    if (isset($page_map[$path])) {
        return $base . $page_map[$path];
    }

    // ---- Reservation URLs (FR) ----
    $reservation_fr = [
        '/reservation-croisiere-privee-paris',
        '/reservez-votre-croisiere-privee-a-paris-bookly',
        '/reservez-votre-croisiere-privee-a-paris-hopleisure',
        '/reserver-une-croisiere-avec-guide',
    ];
    foreach ($reservation_fr as $resa) {
        if ($path === $resa) {
            return $base . '/fr/reservation';
        }
    }

    // ---- Reservation URLs (EN) ----
    if (preg_match('#^/en/book-your-private-cruise-in-paris#', $path)) {
        return $base . '/en/reservation';
    }

    // ---- WooCommerce URLs ----
    $woo_map = [
        '/mon-compte'  => '/fr/reservation',
        '/commander'   => '/fr/reservation',
        '/panier'      => '/fr/reservation',
        '/merci'       => '/fr',
    ];
    if (isset($woo_map[$path])) {
        return $base . $woo_map[$path];
    }

    $woo_en = ['/en/my-account', '/en/checkout', '/en/cart', '/en/shop'];
    foreach ($woo_en as $woo) {
        if ($path === $woo) {
            return $base . '/en/reservation';
        }
    }

    // ---- Blog article redirects (EN) ----
    $en_articles = [
        '/en/history-of-bateaux-mouches-de-paris'            => '/en/actualites/history-of-bateaux-mouches-de-paris',
        '/en/private-cruises-on-the-seine-back-on-march-15'  => '/en/actualites/private-cruises-on-the-seine-back-on-march-15',
        '/en/un-bateau-a-paris-at-the-olympic-games'         => '/en/actualites/un-bateau-a-paris-at-the-olympic-games',
        '/en/un-bateau-a-paris-at-the-olympic-games-2'       => '/en/actualites/un-bateau-a-paris-at-the-olympic-games',
        '/en/un-bateau-a-paris-at-the-olympic-games-3'       => '/en/actualites/un-bateau-a-paris-at-the-olympic-games',
        '/en/un-bateau-a-paris-at-the-olympic-games-4'       => '/en/actualites/un-bateau-a-paris-at-the-olympic-games',
    ];
    if (isset($en_articles[$path])) {
        return $base . $en_articles[$path];
    }

    // ---- Blog categories ----
    if (preg_match('#^/en/category/#', $path)) {
        return $base . '/en/actualites';
    }
    if (preg_match('#^/category/#', $path)) {
        return $base . '/fr/actualites';
    }

    // ---- Porto theme technical URLs → 410 Gone ----
    if (isset($_GET['porto_builder'])) {
        status_header(410);
        echo '<!DOCTYPE html><html><head><title>Gone</title></head><body><h1>410 Gone</h1></body></html>';
        exit;
    }

    // ---- Blog articles (EN) — catch-all for English single posts ----
    if (preg_match('#^/en/([a-z0-9-]+)$#', $path, $matches)) {
        $slug = $matches[1];
        $post = get_page_by_path($slug, OBJECT, 'post');
        if ($post) {
            return $base . '/en/actualites/' . $slug;
        }
    }

    // ---- Blog articles (FR) — catch-all for single posts ----
    // If it looks like a slug (no slashes except leading), redirect to /fr/actualites/{slug}
    if (preg_match('#^/([a-z0-9-]+)$#', $path, $matches)) {
        $slug = $matches[1];
        // Check if it's a real WordPress post
        $post = get_page_by_path($slug, OBJECT, 'post');
        if ($post) {
            return $base . '/fr/actualites/' . $slug;
        }
    }

    // ---- Default fallback: redirect to Next.js homepage ----
    return $base . '/fr';
}


/**
 * ============================================================
 * 2. ENABLE CORS FOR REST API
 * ============================================================
 */
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowed_origins = [
            BATEAU_NEXTJS_URL,
            'https://bateau-2026.vercel.app',
        ];

        if (in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }

        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');

        return $value;
    });
});

// Handle preflight OPTIONS requests
add_action('init', function () {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        $allowed_origins = [
            BATEAU_NEXTJS_URL,
            'https://bateau-2026.vercel.app',
        ];

        if (in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }

        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Max-Age: 86400');
        status_header(204);
        exit;
    }
});


/**
 * ============================================================
 * 3. DISABLE UNNECESSARY FRONT-END FEATURES
 * ============================================================
 */

// Remove WordPress version meta tag
remove_action('wp_head', 'wp_generator');

// Remove Windows Live Writer manifest
remove_action('wp_head', 'wlwmanifest_link');

// Remove Really Simple Discovery link
remove_action('wp_head', 'rsd_link');

// Remove shortlink
remove_action('wp_head', 'wp_shortlink_wp_head');

// Remove REST API link from head (still accessible, just not advertised)
remove_action('wp_head', 'rest_output_link_wp_head');

// Remove oEmbed discovery links
remove_action('wp_head', 'wp_oembed_add_discovery_links');

// Remove emoji scripts and styles
add_action('init', function () {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('admin_print_styles', 'print_emoji_styles');
});

// Disable RSS feeds on the front-end
add_action('do_feed', 'bateau_disable_feeds', 1);
add_action('do_feed_rdf', 'bateau_disable_feeds', 1);
add_action('do_feed_rss', 'bateau_disable_feeds', 1);
add_action('do_feed_rss2', 'bateau_disable_feeds', 1);
add_action('do_feed_atom', 'bateau_disable_feeds', 1);

function bateau_disable_feeds() {
    wp_redirect(BATEAU_NEXTJS_URL . '/fr', 301);
    exit;
}

// Remove feed links from head
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);

// Disable XML-RPC (security)
add_filter('xmlrpc_enabled', '__return_false');

// Disable Rank Math sitemap (Next.js generates its own at /sitemap.xml)
add_filter('rank_math/sitemap/enable', '__return_false');

// Redirect any sitemap request to the Next.js sitemap
add_action('template_redirect', function () {
    if (preg_match('#/sitemap[_\-]?(index)?\.xml#', $_SERVER['REQUEST_URI'])) {
        wp_redirect(BATEAU_NEXTJS_URL . '/sitemap.xml', 301);
        exit;
    }
}, 0);

// Register landing_page with Rank Math (public=false needs manual registration).
// Rank Math v1.0.264+ uses rank_math/excluded_post_types as the filter in
// get_accessible_post_types(). The base list comes from get_post_types(['public' => true])
// filtered through is_post_type_viewable(), so landing_page (public=false) is
// excluded by default. We re-inject it via this filter.
add_filter('rank_math/excluded_post_types', function ($types) {
    $types['landing_page'] = 'landing_page';
    return $types;
});

/**
 * ============================================================
 * 4. ADMIN NOTICES
 * ============================================================
 */
add_action('admin_notices', function () {
    echo '<div class="notice notice-info"><p>';
    echo '<strong>Bateau Headless Mode</strong> — ';
    echo 'Le front-end WordPress est desactive. ';
    echo 'Toutes les URLs publiques redirigent vers <a href="' . esc_url(BATEAU_NEXTJS_URL) . '" target="_blank">' . esc_html(BATEAU_NEXTJS_URL) . '</a>.';

    $last_sync = get_option('bateau_last_sync');
    if ($last_sync) {
        echo '<br><small>Derniere publication : ' . esc_html($last_sync['timestamp']) . ' par ' . esc_html($last_sync['user']) . '</small>';
    }

    echo '</p></div>';
});

/**
 * ============================================================
 * 5. CUSTOM POST TYPE: LANDING PAGES
 * ============================================================
 *
 * Headless CPT for SEO landing pages (evjf-seine, etc.).
 * Managed via ACF field groups, consumed by Next.js REST API.
 */
add_action('init', function () {
    register_post_type('landing_page', [
        'labels' => [
            'name'               => 'Landing Pages',
            'singular_name'      => 'Landing Page',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter une Landing Page',
            'edit_item'          => 'Modifier la Landing Page',
            'view_item'          => 'Voir la Landing Page',
            'search_items'       => 'Rechercher',
            'not_found'          => 'Aucune landing page trouvee',
        ],
        'public'              => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,  // Required for REST API + Gutenberg
        'menu_icon'           => 'dashicons-megaphone',
        'menu_position'       => 5,
        'supports'            => ['title', 'thumbnail', 'custom-fields', 'revisions'],
        'has_archive'         => false,
        'rewrite'             => false, // No front-end URLs (headless)
        'capability_type'     => 'post',
    ]);
});

/**
 * Register landing_page CPT with Polylang.
 * Required because `public => false` prevents auto-detection.
 */
add_filter('pll_get_post_types', function (array $post_types): array {
    $post_types['landing_page'] = 'landing_page';
    return $post_types;
});

/**
 * Add a language dropdown filter to admin list tables for Articles and Landing Pages.
 * Polylang Pro uses an admin-bar switcher by default; this adds an explicit
 * dropdown in the list table filters row for easier per-language filtering.
 */
add_action('restrict_manage_posts', function (string $post_type) {
    if (!in_array($post_type, ['post', 'landing_page'], true)) {
        return;
    }
    if (!function_exists('pll_languages_list') || !function_exists('pll_get_post_language')) {
        return;
    }

    $languages = pll_languages_list(['fields' => '']);
    if (empty($languages)) {
        return;
    }

    $current = $_GET['lang'] ?? '';
    echo '<select name="lang" id="filter-by-language">';
    echo '<option value="">' . esc_html__('Toutes les langues', 'bateau-headless') . '</option>';
    foreach ($languages as $lang) {
        $selected = selected($current, $lang->slug, false);
        $flag = '';
        if (!empty($lang->flag_url)) {
            $flag = '<img src="' . esc_url($lang->flag_url) . '" style="width:16px;height:11px;margin-right:4px;vertical-align:middle;" />';
        }
        echo '<option value="' . esc_attr($lang->slug) . '" ' . $selected . '>' . esc_html($lang->name) . '</option>';
    }
    echo '</select>';
});

/**
 * Filter admin post list queries by the selected language.
 * Polylang stores each post's language as a taxonomy term (language).
 * We add a tax_query when the lang parameter is set.
 */
add_action('pre_get_posts', function (WP_Query $query) {
    if (!is_admin() || !$query->is_main_query()) {
        return;
    }

    $screen = function_exists('get_current_screen') ? get_current_screen() : null;
    if (!$screen || $screen->base !== 'edit') {
        return;
    }

    if (!in_array($query->get('post_type'), ['post', 'landing_page'], true)) {
        return;
    }

    $lang = $_GET['lang'] ?? '';
    if (empty($lang) || !function_exists('pll_languages_list')) {
        return;
    }

    // Validate that the slug is a real Polylang language
    $valid_slugs = pll_languages_list(['fields' => 'slug']);
    if (!in_array($lang, $valid_slugs, true)) {
        return;
    }

    // Polylang uses the 'language' taxonomy internally
    $tax_query = $query->get('tax_query') ?: [];
    $tax_query[] = [
        'taxonomy' => 'language',
        'field'    => 'slug',
        'terms'    => $lang,
    ];
    $query->set('tax_query', $tax_query);

    // Tell Polylang not to apply its own language filter on top of ours
    $query->set('lang', '');
});

/**
 * ============================================================
 * 6. ACF FIELD GROUPS FOR LANDING PAGES
 * ============================================================
 *
 * Maps exactly to the LandingPageData TypeScript interface:
 * src/data/landings/types.ts
 *
 * Requires ACF Pro (already installed).
 */
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    // --- Landing Page: Hero Section ---
    acf_add_local_field_group([
        'key'      => 'group_landing_hero',
        'title'    => 'Hero Section',
        'fields'   => [
            [
                'key'   => 'field_hero_title',
                'label' => 'Titre Hero',
                'name'  => 'hero_title',
                'type'  => 'text',
                'required' => 1,
            ],
            [
                'key'   => 'field_hero_subtitle',
                'label' => 'Sous-titre Hero',
                'name'  => 'hero_subtitle',
                'type'  => 'textarea',
                'rows'  => 3,
            ],
            [
                'key'   => 'field_hero_background_image',
                'label' => 'Image de fond (URL)',
                'name'  => 'hero_background_image',
                'type'  => 'url',
            ],
            [
                'key'   => 'field_hero_cta_text',
                'label' => 'Texte du bouton CTA',
                'name'  => 'hero_cta_text',
                'type'  => 'text',
                'default_value' => 'Reserver',
            ],
            [
                'key'   => 'field_hero_cta_href',
                'label' => 'Lien du bouton CTA',
                'name'  => 'hero_cta_href',
                'type'  => 'text',
                'default_value' => '/reservation',
            ],
        ],
        'location' => [
            [['param' => 'post_type', 'operator' => '==', 'value' => 'landing_page']],
        ],
        'position' => 'normal',
        'style'    => 'default',
        'menu_order' => 0,
        'show_in_rest' => 1,
    ]);

    // --- Landing Page: Sections (Flexible Content) ---
    acf_add_local_field_group([
        'key'      => 'group_landing_sections',
        'title'    => 'Sections de contenu',
        'fields'   => [
            [
                'key'    => 'field_sections',
                'label'  => 'Sections',
                'name'   => 'sections',
                'type'   => 'flexible_content',
                'layouts' => [
                    // Richtext Section
                    [
                        'key'        => 'layout_richtext',
                        'name'       => 'richtext',
                        'label'      => 'Texte riche',
                        'display'    => 'block',
                        'sub_fields' => [
                            ['key' => 'field_rt_title', 'label' => 'Titre', 'name' => 'title', 'type' => 'text'],
                            ['key' => 'field_rt_content', 'label' => 'Contenu', 'name' => 'content', 'type' => 'wysiwyg', 'toolbar' => 'full', 'media_upload' => 0],
                        ],
                    ],
                    // Benefits Section
                    [
                        'key'        => 'layout_benefits',
                        'name'       => 'benefits',
                        'label'      => 'Avantages',
                        'display'    => 'block',
                        'sub_fields' => [
                            ['key' => 'field_ben_title', 'label' => 'Titre', 'name' => 'title', 'type' => 'text'],
                            [
                                'key'        => 'field_ben_items',
                                'label'      => 'Items',
                                'name'       => 'items',
                                'type'       => 'repeater',
                                'layout'     => 'row',
                                'sub_fields' => [
                                    ['key' => 'field_ben_icon', 'label' => 'Icone', 'name' => 'icon', 'type' => 'text', 'instructions' => 'Nom Lucide icon (ship, champagne-glass, camera, sparkles, heart, users, etc.)'],
                                    ['key' => 'field_ben_item_title', 'label' => 'Titre', 'name' => 'title', 'type' => 'text'],
                                    ['key' => 'field_ben_item_text', 'label' => 'Texte', 'name' => 'text', 'type' => 'textarea', 'rows' => 2],
                                ],
                            ],
                        ],
                    ],
                    // Gallery Section
                    [
                        'key'        => 'layout_gallery',
                        'name'       => 'gallery',
                        'label'      => 'Galerie photos',
                        'display'    => 'block',
                        'sub_fields' => [
                            ['key' => 'field_gal_title', 'label' => 'Titre', 'name' => 'title', 'type' => 'text'],
                            [
                                'key'        => 'field_gal_images',
                                'label'      => 'Images',
                                'name'       => 'images',
                                'type'       => 'repeater',
                                'layout'     => 'table',
                                'sub_fields' => [
                                    ['key' => 'field_gal_img_src', 'label' => 'Image (URL)', 'name' => 'src', 'type' => 'url'],
                                    ['key' => 'field_gal_img_alt', 'label' => 'Texte alternatif', 'name' => 'alt', 'type' => 'text'],
                                ],
                            ],
                        ],
                    ],
                    // Testimonials Section
                    [
                        'key'        => 'layout_testimonials',
                        'name'       => 'testimonials',
                        'label'      => 'Temoignages',
                        'display'    => 'block',
                        'sub_fields' => [
                            ['key' => 'field_test_title', 'label' => 'Titre', 'name' => 'title', 'type' => 'text'],
                            ['key' => 'field_test_filter', 'label' => 'Filtre (mot-cle)', 'name' => 'filter', 'type' => 'text', 'instructions' => 'Mot-cle pour filtrer les avis Google (ex: "evjf", "romantique")'],
                        ],
                    ],
                    // Pricing Section
                    [
                        'key'        => 'layout_pricing',
                        'name'       => 'pricing',
                        'label'      => 'Tarifs',
                        'display'    => 'block',
                        'sub_fields' => [
                            ['key' => 'field_price_title', 'label' => 'Titre', 'name' => 'title', 'type' => 'text'],
                        ],
                    ],
                    // FAQ Section
                    [
                        'key'        => 'layout_faq',
                        'name'       => 'faq',
                        'label'      => 'FAQ',
                        'display'    => 'block',
                        'sub_fields' => [
                            ['key' => 'field_faq_title', 'label' => 'Titre', 'name' => 'title', 'type' => 'text'],
                            [
                                'key'        => 'field_faq_items',
                                'label'      => 'Questions',
                                'name'       => 'items',
                                'type'       => 'repeater',
                                'layout'     => 'row',
                                'sub_fields' => [
                                    ['key' => 'field_faq_question', 'label' => 'Question', 'name' => 'question', 'type' => 'text'],
                                    ['key' => 'field_faq_answer', 'label' => 'Reponse', 'name' => 'answer', 'type' => 'textarea', 'rows' => 3],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'location' => [
            [['param' => 'post_type', 'operator' => '==', 'value' => 'landing_page']],
        ],
        'position' => 'normal',
        'style'    => 'default',
        'menu_order' => 10,
        'show_in_rest' => 1,
    ]);

    // --- Landing Page: JSON-LD & Relations ---
    acf_add_local_field_group([
        'key'      => 'group_landing_jsonld',
        'title'    => 'SEO / JSON-LD',
        'fields'   => [
            [
                'key'     => 'field_jsonld_type',
                'label'   => 'Type JSON-LD',
                'name'    => 'jsonld_type',
                'type'    => 'select',
                'choices' => [
                    'TouristAttraction' => 'TouristAttraction',
                    'Event'             => 'Event',
                    'Product'           => 'Product',
                ],
                'default_value' => 'TouristAttraction',
            ],
            [
                'key'   => 'field_jsonld_price_from',
                'label' => 'Prix a partir de (EUR)',
                'name'  => 'jsonld_price_from',
                'type'  => 'number',
                'default_value' => 420,
            ],
            [
                'key'       => 'field_related_pages',
                'label'     => 'Pages liees',
                'name'      => 'related_pages',
                'type'      => 'relationship',
                'post_type' => ['landing_page'],
                'filters'   => ['search'],
                'max'       => 4,
                'return_format' => 'object',
            ],
        ],
        'location' => [
            [['param' => 'post_type', 'operator' => '==', 'value' => 'landing_page']],
        ],
        'position' => 'side',
        'style'    => 'default',
        'menu_order' => 20,
        'show_in_rest' => 1,
    ]);
});

/**
 * ============================================================
 * 6b. EXPOSE ACF FIELDS IN REST API
 * ============================================================
 *
 * ACF free does not expose acf_add_local_field_group data in
 * the REST API response. Manually register 'acf' rest field
 * that reads from get_fields().
 */
add_action('rest_api_init', function () {
    register_rest_field('landing_page', 'acf', [
        'get_callback' => function ($post) {
            if (!function_exists('get_fields')) return [];
            $fields = get_fields($post['id']);
            return $fields ?: [];
        },
        'update_callback' => function ($value, $post) {
            if (!function_exists('update_field') || !is_array($value)) return;
            foreach ($value as $key => $val) {
                update_field($key, $val, $post->ID);
            }
        },
        'schema' => ['type' => 'object'],
    ]);
});

/**
 * ============================================================
 * 7. SYNC TO NEXT.JS — "Publier sur le site" BUTTON
 * ============================================================
 *
 * Adds a button in the WP admin bar that triggers a GitHub Actions
 * workflow via repository_dispatch. This rebuilds the Next.js site
 * with fresh data (articles + landing pages, all 6 locales).
 *
 * Requires in wp-config.php:
 *   define('BATEAU_GITHUB_TOKEN', 'ghp_...');  // Fine-grained PAT with Actions:write
 *   define('BATEAU_GITHUB_REPO',  'owner/repo');
 */

// --- Admin bar button ---
add_action('admin_bar_menu', function (\WP_Admin_Bar $admin_bar) {
    if (!current_user_can('publish_posts')) {
        return;
    }

    $admin_bar->add_node([
        'id'    => 'bateau-sync',
        'title' => '<span class="ab-icon dashicons dashicons-update" style="margin-top:2px"></span> Publier sur le site',
        'meta'  => [
            'title' => 'Synchroniser articles + landing pages vers bateau-a-paris.fr',
            'class' => 'bateau-sync-btn',
        ],
    ]);
}, 50);

// --- Admin bar inline styles + JS ---
add_action('admin_head', function () {
    if (!current_user_can('publish_posts')) {
        return;
    }
    ?>
    <style>
        #wp-admin-bar-bateau-sync .ab-item { cursor: pointer !important; }
        #wp-admin-bar-bateau-sync .ab-item:hover { background: #2271b1 !important; color: #fff !important; }
        #wp-admin-bar-bateau-sync.syncing .ab-icon { animation: bateau-spin 1s linear infinite; }
        #wp-admin-bar-bateau-sync.sync-ok .ab-item { background: #00a32a !important; color: #fff !important; }
        #wp-admin-bar-bateau-sync.sync-err .ab-item { background: #d63638 !important; color: #fff !important; }
        @keyframes bateau-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        var btn = document.getElementById('wp-admin-bar-bateau-sync');
        if (!btn) return;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (btn.classList.contains('syncing')) return;
            if (!confirm('Publier les modifications (articles + landing pages) sur bateau-a-paris.fr ?')) return;

            btn.classList.remove('sync-ok', 'sync-err');
            btn.classList.add('syncing');
            btn.querySelector('.ab-item').lastChild.textContent = ' Publication en cours…';

            fetch(ajaxurl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'action=bateau_sync_site&_wpnonce=' + encodeURIComponent('<?php echo wp_create_nonce('bateau_sync_site'); ?>'),
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                btn.classList.remove('syncing');
                if (data.success) {
                    btn.classList.add('sync-ok');
                    btn.querySelector('.ab-item').lastChild.textContent = ' Publie !';
                } else {
                    btn.classList.add('sync-err');
                    btn.querySelector('.ab-item').lastChild.textContent = ' Erreur : ' + (data.data || 'inconnue');
                }
                setTimeout(function() {
                    btn.classList.remove('sync-ok', 'sync-err');
                    btn.querySelector('.ab-item').lastChild.textContent = ' Publier sur le site';
                }, 5000);
            })
            .catch(function() {
                btn.classList.remove('syncing');
                btn.classList.add('sync-err');
                btn.querySelector('.ab-item').lastChild.textContent = ' Erreur reseau';
                setTimeout(function() {
                    btn.classList.remove('sync-err');
                    btn.querySelector('.ab-item').lastChild.textContent = ' Publier sur le site';
                }, 5000);
            });
        });
    });
    </script>
    <?php
});

/**
 * Log sync actions with IP, timestamp, user, and status.
 * Stores the last 50 entries in wp_options (bateau_sync_log).
 */
function bateau_log_sync(string $status, string $message): void {
    $log = get_option('bateau_sync_log', []);
    $user = wp_get_current_user();
    $log[] = [
        'timestamp' => current_time('mysql'),
        'user'      => $user->user_login ?: 'unknown',
        'ip'        => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'status'    => $status,
        'message'   => $message,
    ];
    // Keep only the last 50 entries
    $log = array_slice($log, -50);
    update_option('bateau_sync_log', $log, false);
}

// --- AJAX handler: trigger GitHub Actions ---
add_action('wp_ajax_bateau_sync_site', function () {
    check_ajax_referer('bateau_sync_site');

    if (!current_user_can('publish_posts')) {
        wp_send_json_error('Permission refusee', 403);
    }

    // Rate limiting: transient lock of 2 minutes between syncs
    $lock_key = 'bateau_sync_lock';
    if (get_transient($lock_key)) {
        bateau_log_sync('rate_limited', 'Sync blocked by rate limit');
        wp_send_json_error('Publication deja en cours. Reessayez dans 2 minutes.');
    }
    set_transient($lock_key, true, 2 * MINUTE_IN_SECONDS);

    $token = defined('BATEAU_GITHUB_TOKEN') ? BATEAU_GITHUB_TOKEN : '';
    $repo  = defined('BATEAU_GITHUB_REPO')  ? BATEAU_GITHUB_REPO  : '';

    if (empty($token) || empty($repo)) {
        bateau_log_sync('error', 'GITHUB_TOKEN ou GITHUB_REPO non defini');
        wp_send_json_error('BATEAU_GITHUB_TOKEN ou BATEAU_GITHUB_REPO non defini dans wp-config.php');
    }

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
            ],
        ]),
    ]);

    if (is_wp_error($response)) {
        bateau_log_sync('error', $response->get_error_message());
        delete_transient($lock_key);
        wp_send_json_error($response->get_error_message());
    }

    $code = wp_remote_retrieve_response_code($response);

    // GitHub returns 204 No Content on success
    if ($code === 204) {
        // Store last sync info for admin display
        update_option('bateau_last_sync', [
            'user'      => wp_get_current_user()->display_name,
            'timestamp' => current_time('mysql'),
        ]);
        bateau_log_sync('success', 'GitHub dispatch 204');
        wp_send_json_success('Publication declenchee');
    }

    $body = wp_remote_retrieve_body($response);
    bateau_log_sync('error', "GitHub API {$code}: {$body}");
    delete_transient($lock_key);
    wp_send_json_error("GitHub API {$code}: {$body}");
});

/**
 * ============================================================
 * 8. EXPOSE RANKMATH SEO DATA IN REST API
 * ============================================================
 *
 * Add RankMath SEO fields to the REST API response for posts
 * and landing pages, so Next.js can use them in generateMetadata().
 */
add_action('rest_api_init', function () {
    $post_types = ['post', 'landing_page', 'page'];

    foreach ($post_types as $type) {
        register_rest_field($type, 'seo', [
            'get_callback' => function ($post) {
                if (!class_exists('RankMath')) {
                    return null;
                }
                $post_id = $post['id'];
                return [
                    'title'         => get_post_meta($post_id, 'rank_math_title', true) ?: null,
                    'description'   => get_post_meta($post_id, 'rank_math_description', true) ?: null,
                    'focus_keyword' => get_post_meta($post_id, 'rank_math_focus_keyword', true) ?: null,
                    'robots'        => get_post_meta($post_id, 'rank_math_robots', true) ?: [],
                ];
            },
            'schema' => [
                'type'       => 'object',
                'properties' => [
                    'title'         => ['type' => 'string'],
                    'description'   => ['type' => 'string'],
                    'focus_keyword' => ['type' => 'string'],
                    'robots'        => ['type' => 'array'],
                ],
            ],
        ]);
    }
});
