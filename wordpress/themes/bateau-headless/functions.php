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
 * Dequeue all front-end scripts and styles except Bookly.
 * This drastically reduces the iframe page weight.
 */
add_action('wp_enqueue_scripts', function () {
    global $wp_scripts, $wp_styles;

    // Only strip on the reservation-embed page
    if (!is_page('reservation-embed')) {
        return;
    }

    // Dequeue all registered styles except Bookly and this theme
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
    if (is_page('reservation-embed')) {
        return false;
    }
    return $show;
});

/**
 * Remove all <head> clutter on the iframe page.
 */
add_action('wp', function () {
    if (is_page('reservation-embed')) {
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
    }
});

/**
 * Theme support (minimal).
 */
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
});
