<?php
/**
 * Bateau Headless — Minimal theme functions.
 *
 * This theme exists solely to serve the Bookly reservation iframe.
 * All other front-end rendering is handled by the Next.js application.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Helper: check if we're on the reservation-embed page.
 */
function bateau_is_reservation_embed(): bool {
    return is_page('reservation-embed') || is_page_template('page-reservation-embed.php');
}

/**
 * Locale map: Polylang lang code → WordPress locale.
 */
function bateau_locale_map(): array {
    return [
        'fr' => 'fr_FR',
        'en' => 'en_US',
        'es' => 'es_ES',
        'it' => 'it_IT',
        'de' => 'de_DE',
        'pt' => 'pt_BR',
    ];
}

/**
 * Map of French Bookly labels → English source strings (from Bookly's __() calls).
 * Used to translate DB-stored French labels via gettext .mo files.
 */
function bateau_bookly_fr_to_en_map(): array {
    return [
        // Steps
        'Commencer' => 'Start',
        'Suppléments' => 'Extras',
        'Heure' => 'Time',
        'Panier' => 'Cart',
        'Détails' => 'Details',
        'Paiement' => 'Payment',
        'Terminer' => 'Finish',
        'Terminé' => 'Done',
        // Steps descriptions
        'Choisir service' => 'Select service',
        'Sélectionner un service' => 'Select service',
        'Ajouter des suppléments' => 'Add extras',
        'Sélectionnez un créneau horaire' => 'Select time slot',
        'Vérifier le panier' => 'Check cart',
        'Vos coordonnées' => 'Your information',
        'Effectuer un achat' => 'Make purchase',
        // Navigation / Actions
        'Suivant' => 'Next',
        'Retour' => 'Back',
        'Réserver maintenant' => 'Book now',
        'Acheter maintenant' => 'Buy now',
        'Réserver plus' => 'Book more',
        'Fermer' => 'Close',
        'Voir' => 'View',
        'Appliquer' => 'Apply',
        // Form labels
        'Nom complet' => 'Full name',
        'Prénom' => 'First name',
        'Nom' => 'Last name',
        'E-mail' => 'Email',
        'Téléphone' => 'Phone',
        'Notes' => 'Notes',
        'Anniversaire' => 'Birthday',
        'Requis' => 'Required',
        'Adresse' => 'Address',
        'Pays' => 'Country',
        'État/Région' => 'State/Region',
        'Code Postal' => 'Postal Code',
        'Ville' => 'City',
        'N° de rue' => 'Street Number',
        'Adresse complémentaire' => 'Additional Address',
        // Entity labels
        'Service' => 'Service',
        'Equipe' => 'Staff',
        'Tous' => 'Any',
        'Date' => 'Date',
        'Prix' => 'Price',
        'Carte cadeau' => 'Gift card',
        'Nombre de personnes' => 'Number of persons',
        // Slots
        'Aucun créneau horaire disponible' => 'No time slots available',
        'Créneau déjà réservé' => 'Slot already booked',
        'Aucun résultat trouvé' => 'No results found',
        // Booking completion
        'Merci !' => 'Thank you!',
        'Oups !' => 'Oops!',
        'Votre réservation est terminée.' => 'Your booking is complete.',
        'Votre numéro de commande' => 'Your order number',
        'Votre carte cadeau a été créée.' => 'Your gift card has been created.',
        'Votre paiement est en cours de traitement.' => 'Your payment has been accepted for processing.',
        'Le paiement a été sauté.' => 'Payment has been skipped.',
        // Payments
        'Total' => 'Total',
        'Sous-total' => 'Subtotal',
        'Remise' => 'Discount',
        'Montant à payer' => 'Amount to pay',
        'Je paie sur place' => 'I will pay locally',
        'Je paie maintenant par Carte' => 'I will pay now with Credit Card',
        // Verification
        'Code de vérification' => 'Verification code',
        'Renvoyer le code' => 'Resend code',
        'Code de vérification incorrect' => 'Incorrect verification code',
        // Calendar
        'Ajouter au calendrier' => 'Add to calendar',
        'Votre fuseau horaire' => 'Your time zone',
        'Sélectionnez une ville' => 'Select city',
        // Misc
        'Résumé' => 'Summary',
        "L'heure sélectionnée n'est plus disponible" => 'The selected time is not available anymore',
        "Aucune méthode de paiement n'est disponible. Veuillez contacter votre fournisseur de services." => 'No payment methods available. Please contact service provider.',
        'Sur liste d\'attente' => 'On waiting list',
        'Liste d\'attente' => 'Waiting list',
        'Capacité' => 'Capacity',
        'Occupé' => 'Busy',
        'Libre' => 'Free',
        // Payment systems
        'Je paie maintenant par Carte' => 'I will pay now with Credit Card',
        'Je paie par carte bancaire ou avec mon compte PayPal' => 'I will pay now with Credit Card',
        'Je paie sur place' => 'I will pay locally',
        // Form sections
        'Sélectionner un service' => 'Select service',
        'Choisir service' => 'Select service',
        'Google Maps' => 'Google Maps',
        'Durée' => 'Duration',
    ];
}

/**
 * Switch WordPress locale for the Bookly iframe based on ?lang= parameter.
 * Priority 1 ensures this runs before Bookly hooks and wp_localize_script().
 */
add_action('template_redirect', function () {
    if (!bateau_is_reservation_embed()) {
        return;
    }

    $lang = isset($_GET['bl']) ? sanitize_key($_GET['bl']) : '';
    if (empty($lang) || $lang === 'fr') {
        return;
    }

    $locale_map = bateau_locale_map();
    if (!isset($locale_map[$lang])) {
        return;
    }

    $wp_locale = $locale_map[$lang];

    // Switch Polylang's current language if available
    $pll_switched = false;
    if (function_exists('PLL') && PLL()->model) {
        $pll_lang = PLL()->model->get_language($lang);
        if ($pll_lang) {
            PLL()->curlang = $pll_lang;
            $pll_switched = true;
        }
    }

    // Force WordPress locale via filter (works with or without Polylang)
    add_filter('locale', fn() => $wp_locale, 1);

    // Override language_attributes() output (Polylang hooks this with its own filter)
    $html_lang = str_replace('_', '-', $wp_locale);
    add_filter('language_attributes', function () use ($html_lang) {
        return 'lang="' . esc_attr($html_lang) . '"';
    }, 9999);

    // Reload Bookly translations in the target locale
    unload_textdomain('bookly');
    load_plugin_textdomain('bookly', false,
        'bookly-responsive-appointment-booking-tool/languages/');

    // Translate Bookly labels in the HTML output using output buffering.
    // Bookly stores labels in its DB (French). We replace JSON-encoded French
    // strings with their translations from the Bookly .mo files.
    // We search for both escaped (\u00e9) and unescaped (é) JSON variants.
    $fr_to_en = bateau_bookly_fr_to_en_map();
    $replacements = [];
    foreach ($fr_to_en as $fr => $en) {
        $translated = __($en, 'bookly');
        if ($translated !== $fr) {
            // Unescaped variant: "Réserver" → "Book now"
            $fr_unescaped = json_encode($fr, JSON_UNESCAPED_UNICODE);
            $tr_unescaped = json_encode($translated, JSON_UNESCAPED_UNICODE);
            $replacements[$fr_unescaped] = $tr_unescaped;
            // Escaped variant: "R\u00e9server" → "Book now"
            $fr_escaped = json_encode($fr);
            if ($fr_escaped !== $fr_unescaped) {
                $replacements[$fr_escaped] = json_encode($translated);
            }
        }
    }
    ob_start(function ($html) use ($replacements) {
        return str_replace(
            array_keys($replacements),
            array_values($replacements),
            $html
        );
    });
}, 1);

/**
 * Switch locale for Bookly AJAX requests (subsequent form steps).
 * The bookly_lang parameter is injected client-side by page-reservation-embed.php.
 */
add_action('admin_init', function () {
    if (!wp_doing_ajax()) {
        return;
    }

    $lang = isset($_REQUEST['bookly_lang']) ? sanitize_key($_REQUEST['bookly_lang']) : '';
    if (empty($lang) || $lang === 'fr') {
        return;
    }

    $locale_map = bateau_locale_map();
    if (!isset($locale_map[$lang])) {
        return;
    }

    $wp_locale = $locale_map[$lang];

    add_filter('locale', fn() => $wp_locale, 1);

    if (function_exists('PLL') && PLL()->model) {
        $pll_lang = PLL()->model->get_language($lang);
        if ($pll_lang) {
            PLL()->curlang = $pll_lang;
        }
    }
});

/**
 * Dequeue ALL front-end scripts and styles except Bookly.
 * Priority 9999 ensures we run after all plugins have enqueued their assets.
 */
add_action('wp_enqueue_scripts', function () {
    global $wp_scripts, $wp_styles;

    if (!bateau_is_reservation_embed()) {
        return;
    }

    // Dequeue all registered styles except Bookly
    if ($wp_styles instanceof WP_Styles) {
        foreach ($wp_styles->registered as $handle => $style) {
            if (strpos($handle, 'bookly') === false && $handle !== 'bateau-headless-style') {
                wp_dequeue_style($handle);
                wp_deregister_style($handle);
            }
        }
    }

    // Dequeue all registered scripts except Bookly and jQuery (Bookly dependency)
    if ($wp_scripts instanceof WP_Scripts) {
        foreach ($wp_scripts->registered as $handle => $script) {
            if (
                strpos($handle, 'bookly') === false &&
                $handle !== 'jquery' &&
                $handle !== 'jquery-core' &&
                $handle !== 'jquery-migrate'
            ) {
                wp_dequeue_script($handle);
                wp_deregister_script($handle);
            }
        }
    }
}, 9999);

/**
 * Remove WordPress admin bar on the iframe page.
 */
add_filter('show_admin_bar', function ($show) {
    if (bateau_is_reservation_embed()) {
        return false;
    }
    return $show;
});

/**
 * Remove all <head> clutter on the iframe page.
 * Disables output from WPML, Rank Math, ACF, and WP core.
 */
add_action('wp', function () {
    if (!bateau_is_reservation_embed()) {
        return;
    }

    // Core WP head cleanup
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'feed_links', 2);
    remove_action('wp_head', 'feed_links_extra', 3);
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');

    // Disable WP block library CSS (Gutenberg)
    remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
    remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');

    // Disable WPML front-end output on this page
    if (defined('ICL_SITEPRESS_VERSION')) {
        // Remove WPML language switcher and meta tags
        global $sitepress;
        if ($sitepress && method_exists($sitepress, 'remove_filters')) {
            remove_action('wp_head', [$sitepress, 'meta_generator_tag']);
        }
    }

    // Disable Rank Math SEO output on this page
    if (class_exists('RankMath')) {
        remove_all_actions('rank_math/head');
    }
});

/**
 * Disable WP global styles and SVG filters on the iframe page.
 * These add ~30KB of inline CSS that Bookly doesn't need.
 */
add_action('wp_enqueue_scripts', function () {
    if (bateau_is_reservation_embed()) {
        wp_dequeue_style('global-styles');
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('wp-block-library-theme');
        wp_dequeue_style('classic-theme-styles');
    }
}, 100);

/**
 * Allow iframe embedding and enable caching for reservation-embed page.
 * Bookly renders client-side via AJAX, so the HTML shell is safe to cache.
 * We close the PHP session early so WP-Rocket doesn't skip caching.
 */
add_action('template_redirect', function () {
    if (!bateau_is_reservation_embed()) {
        return;
    }
    // Override X-Frame-Options so Next.js can embed this page as iframe
    header('X-Frame-Options: ALLOWALL');

    // Close any PHP session started by Bookly so WP-Rocket can cache this page.
    // Bookly form works entirely via AJAX — the initial HTML is static.
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_write_close();
    }
});

/**
 * Ensure WP-Rocket caches separate versions per ?lang= parameter.
 * Without this, WP-Rocket might serve a cached French version to all languages.
 */
add_filter('rocket_cache_query_strings', function ($query_strings) {
    $query_strings[] = 'bl';
    return $query_strings;
});

/**
 * Theme support (minimal).
 */
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
});
