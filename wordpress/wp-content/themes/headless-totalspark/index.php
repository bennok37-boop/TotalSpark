<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TotalSpark Solutions - Headless WordPress Backend</title>
    <?php wp_head(); ?>
</head>
<body>
    <div class="admin-info">
        <h2>TotalSpark Solutions - WordPress Backend</h2>
        <p>This is the content management system for TotalSpark Solutions.</p>
        <p><a href="/wp-admin/" style="color: white; text-decoration: underline;">Access WordPress Admin</a></p>
    </div>
    
    <div class="headless-notice">
        <h3>⚠️ Headless WordPress Installation</h3>
        <p>This WordPress installation is configured for headless use. The frontend is handled by a separate React application.</p>
        <p>Use the WordPress admin panel to manage content, and the REST API to fetch data.</p>
        <p><strong>API Endpoints:</strong></p>
        <ul style="text-align: left; display: inline-block;">
            <li><code>/wp-json/wp/v2/services</code> - Cleaning Services</li>
            <li><code>/wp-json/wp/v2/locations</code> - Service Locations</li>
            <li><code>/wp-json/wp/v2/before-after</code> - Before/After Gallery</li>
            <li><code>/wp-json/wp/v2/testimonials</code> - Customer Reviews</li>
            <li><code>/wp-json/totalspark/v1/before-after/{city}</code> - City-specific gallery</li>
        </ul>
    </div>
    
    <?php wp_footer(); ?>
</body>
</html>