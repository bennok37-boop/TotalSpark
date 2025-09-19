<?php
/**
 * TotalSpark Solutions - Headless WordPress Configuration
 */

// Database settings - these will be environment variables
define('DB_NAME', getenv('WP_DB_NAME') ?: 'totalspark_wp');
define('DB_USER', getenv('WP_DB_USER') ?: 'root');
define('DB_PASSWORD', getenv('WP_DB_PASSWORD') ?: '');
define('DB_HOST', getenv('WP_DB_HOST') ?: 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// Security keys - in production, these should be unique
define('AUTH_KEY',         'your-unique-auth-key-here');
define('SECURE_AUTH_KEY',  'your-unique-secure-auth-key-here');
define('LOGGED_IN_KEY',    'your-unique-logged-in-key-here');
define('NONCE_KEY',        'your-unique-nonce-key-here');
define('AUTH_SALT',        'your-unique-auth-salt-here');
define('SECURE_AUTH_SALT', 'your-unique-secure-auth-salt-here');
define('LOGGED_IN_SALT',   'your-unique-logged-in-salt-here');
define('NONCE_SALT',       'your-unique-nonce-salt-here');

// Table prefix
$table_prefix = 'wp_';

// Debug mode - disable in production
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Headless WordPress optimizations
define('DISABLE_WP_CRON', true);
define('WP_POST_REVISIONS', 3);
define('AUTOSAVE_INTERVAL', 300);

// CORS settings for API access
define('WP_REST_API_CORS', true);

// WordPress absolute path
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

// Load WordPress
require_once ABSPATH . 'wp-settings.php';