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
 * Theme support (minimal).
 */
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
});
