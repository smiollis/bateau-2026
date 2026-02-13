<?php
/**
 * Default template — redirects to Next.js.
 *
 * This template should never render in production because:
 * 1. The bateau-headless-mode plugin redirects all front-end URLs to Next.js
 * 2. Only page-reservation-embed.php should ever be directly rendered
 *
 * This file exists because WordPress requires index.php in every theme.
 */

if (!defined('ABSPATH')) {
    exit;
}

wp_redirect('https://bateau-a-paris.fr/fr', 301);
exit;
