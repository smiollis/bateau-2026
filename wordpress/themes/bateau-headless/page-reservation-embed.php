<?php
/**
 * Template Name: Reservation Embed (Bookly)
 *
 * Minimal page template that renders ONLY the Bookly shortcode.
 * Used as an iframe source in the Next.js front-end.
 *
 * This template intentionally skips the standard WordPress header/footer
 * to produce the lightest possible HTML output.
 */

if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
    <style>
        /* Inline critical styles for fast rendering */
        body {
            margin: 0;
            padding: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #1a1a2e;
            background: #ffffff;
        }
        .bookly-form {
            max-width: 800px;
            margin: 0 auto;
        }
        /* Gold accent matching the Next.js design system */
        .bookly-form .bookly-btn {
            background-color: #c5943a !important;
            border-color: #c5943a !important;
            color: #ffffff !important;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 600;
            border-radius: 6px;
        }
        .bookly-form .bookly-btn:hover {
            background-color: #a67b2e !important;
            border-color: #a67b2e !important;
        }
        /* Loading state */
        .bookly-loading {
            text-align: center;
            padding: 2rem;
            color: #666;
        }
    </style>
</head>
<body>
    <div id="bookly-container">
        <?php
        // Render the Bookly shortcode if the plugin is active
        if (shortcode_exists('bookly-form')) {
            echo do_shortcode('[bookly-form]');
        } else {
            echo '<p class="bookly-loading">Le module de reservation est temporairement indisponible.</p>';
        }
        ?>
    </div>
    <?php wp_footer(); ?>
    <script>
        // Notify the parent Next.js window of height changes for responsive iframe
        (function() {
            function sendHeight() {
                var height = document.getElementById('bookly-container').scrollHeight + 32;
                window.parent.postMessage({ type: 'bookly-resize', height: height }, '*');
            }
            // Send height on load and on resize
            window.addEventListener('load', sendHeight);
            window.addEventListener('resize', sendHeight);
            // Observe DOM changes (Bookly renders asynchronously)
            var observer = new MutationObserver(sendHeight);
            observer.observe(document.getElementById('bookly-container'), {
                childList: true, subtree: true, attributes: true
            });
        })();
    </script>
</body>
</html>
