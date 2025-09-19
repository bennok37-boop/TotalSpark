<?php
/**
 * TotalSpark Solutions - Headless WordPress Theme Functions
 */

// Enable CORS for REST API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, X-WP-Nonce');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});

// Add theme support
add_theme_support('post-thumbnails');
add_theme_support('menus');
add_theme_support('custom-logo');

// Register menus
register_nav_menus(array(
    'header-menu' => 'Header Navigation',
    'footer-menu' => 'Footer Navigation',
    'services-menu' => 'Services Menu'
));

// Custom post types for TotalSpark
function create_totalspark_post_types() {
    
    // Services post type
    register_post_type('cleaning_service', array(
        'labels' => array(
            'name' => 'Cleaning Services',
            'singular_name' => 'Cleaning Service',
            'add_new' => 'Add New Service',
            'add_new_item' => 'Add New Cleaning Service',
            'edit_item' => 'Edit Cleaning Service',
            'new_item' => 'New Cleaning Service',
            'view_item' => 'View Cleaning Service',
            'search_items' => 'Search Services',
            'not_found' => 'No services found',
            'not_found_in_trash' => 'No services found in Trash'
        ),
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'services',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'has_archive' => true,
        'menu_icon' => 'dashicons-admin-tools',
        'rewrite' => array('slug' => 'services')
    ));
    
    // Cities/Locations post type
    register_post_type('cleaning_location', array(
        'labels' => array(
            'name' => 'Cleaning Locations',
            'singular_name' => 'Cleaning Location',
            'add_new' => 'Add New Location',
            'add_new_item' => 'Add New Cleaning Location',
            'edit_item' => 'Edit Cleaning Location',
            'new_item' => 'New Cleaning Location',
            'view_item' => 'View Cleaning Location',
            'search_items' => 'Search Locations',
            'not_found' => 'No locations found',
            'not_found_in_trash' => 'No locations found in Trash'
        ),
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'locations',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'has_archive' => true,
        'menu_icon' => 'dashicons-location-alt',
        'rewrite' => array('slug' => 'locations')
    ));
    
    // Before/After Gallery post type
    register_post_type('before_after', array(
        'labels' => array(
            'name' => 'Before/After Gallery',
            'singular_name' => 'Before/After Pair',
            'add_new' => 'Add New Before/After',
            'add_new_item' => 'Add New Before/After Pair',
            'edit_item' => 'Edit Before/After Pair',
            'new_item' => 'New Before/After Pair',
            'view_item' => 'View Before/After Pair',
            'search_items' => 'Search Gallery',
            'not_found' => 'No gallery items found',
            'not_found_in_trash' => 'No gallery items found in Trash'
        ),
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'before-after',
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'has_archive' => false,
        'menu_icon' => 'dashicons-images-alt2',
        'rewrite' => array('slug' => 'gallery')
    ));
    
    // Testimonials post type
    register_post_type('testimonial', array(
        'labels' => array(
            'name' => 'Testimonials',
            'singular_name' => 'Testimonial',
            'add_new' => 'Add New Testimonial',
            'add_new_item' => 'Add New Testimonial',
            'edit_item' => 'Edit Testimonial',
            'new_item' => 'New Testimonial',
            'view_item' => 'View Testimonial',
            'search_items' => 'Search Testimonials',
            'not_found' => 'No testimonials found',
            'not_found_in_trash' => 'No testimonials found in Trash'
        ),
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'testimonials',
        'supports' => array('title', 'editor', 'custom-fields'),
        'has_archive' => false,
        'menu_icon' => 'dashicons-format-quote',
        'rewrite' => array('slug' => 'reviews')
    ));
}
add_action('init', 'create_totalspark_post_types');

// Add custom fields to REST API
function add_custom_fields_to_rest() {
    
    // Add custom fields for services
    register_rest_field('cleaning_service', 'service_type', array(
        'get_callback' => function($object) {
            return get_field('service_type', $object['id']);
        }
    ));
    
    register_rest_field('cleaning_service', 'service_description', array(
        'get_callback' => function($object) {
            return get_field('service_description', $object['id']);
        }
    ));
    
    register_rest_field('cleaning_service', 'service_features', array(
        'get_callback' => function($object) {
            return get_field('service_features', $object['id']);
        }
    ));
    
    register_rest_field('cleaning_service', 'base_price', array(
        'get_callback' => function($object) {
            return get_field('base_price', $object['id']);
        }
    ));
    
    // Add custom fields for locations
    register_rest_field('cleaning_location', 'city_slug', array(
        'get_callback' => function($object) {
            return get_field('city_slug', $object['id']);
        }
    ));
    
    register_rest_field('cleaning_location', 'phone_number', array(
        'get_callback' => function($object) {
            return get_field('phone_number', $object['id']);
        }
    ));
    
    register_rest_field('cleaning_location', 'coverage_areas', array(
        'get_callback' => function($object) {
            return get_field('coverage_areas', $object['id']);
        }
    ));
    
    // Add custom fields for before/after gallery
    register_rest_field('before_after', 'before_image', array(
        'get_callback' => function($object) {
            $image_id = get_field('before_image', $object['id']);
            if ($image_id) {
                return wp_get_attachment_image_url($image_id, 'full');
            }
            return null;
        }
    ));
    
    register_rest_field('before_after', 'after_image', array(
        'get_callback' => function($object) {
            $image_id = get_field('after_image', $object['id']);
            if ($image_id) {
                return wp_get_attachment_image_url($image_id, 'full');
            }
            return null;
        }
    ));
    
    register_rest_field('before_after', 'location_slug', array(
        'get_callback' => function($object) {
            return get_field('location_slug', $object['id']);
        }
    ));
    
    register_rest_field('before_after', 'service_category', array(
        'get_callback' => function($object) {
            return get_field('service_category', $object['id']);
        }
    ));
    
    // Add custom fields for testimonials
    register_rest_field('testimonial', 'customer_name', array(
        'get_callback' => function($object) {
            return get_field('customer_name', $object['id']);
        }
    ));
    
    register_rest_field('testimonial', 'customer_location', array(
        'get_callback' => function($object) {
            return get_field('customer_location', $object['id']);
        }
    ));
    
    register_rest_field('testimonial', 'rating', array(
        'get_callback' => function($object) {
            return get_field('rating', $object['id']);
        }
    ));
    
    register_rest_field('testimonial', 'service_used', array(
        'get_callback' => function($object) {
            return get_field('service_used', $object['id']);
        }
    ));
}
add_action('rest_api_init', 'add_custom_fields_to_rest');

// Custom REST API endpoints for TotalSpark
function register_totalspark_api_routes() {
    register_rest_route('totalspark/v1', '/before-after/(?P<city>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_before_after_by_city',
        'permission_callback' => '__return_true'
    ));
    
    register_rest_route('totalspark/v1', '/services/(?P<type>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_services_by_type',
        'permission_callback' => '__return_true'
    ));
    
    register_rest_route('totalspark/v1', '/locations/all', array(
        'methods' => 'GET',
        'callback' => 'get_all_locations',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'register_totalspark_api_routes');

// Custom REST API callbacks
function get_before_after_by_city($request) {
    $city = $request['city'];
    
    $posts = get_posts(array(
        'post_type' => 'before_after',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'location_slug',
                'value' => $city,
                'compare' => '='
            )
        )
    ));
    
    $result = array();
    foreach ($posts as $post) {
        $result[] = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'description' => $post->post_content,
            'before_image' => wp_get_attachment_image_url(get_field('before_image', $post->ID), 'full'),
            'after_image' => wp_get_attachment_image_url(get_field('after_image', $post->ID), 'full'),
            'location_slug' => get_field('location_slug', $post->ID),
            'service_category' => get_field('service_category', $post->ID)
        );
    }
    
    return rest_ensure_response($result);
}

function get_services_by_type($request) {
    $type = $request['type'];
    
    $posts = get_posts(array(
        'post_type' => 'cleaning_service',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => 'service_type',
                'value' => $type,
                'compare' => '='
            )
        )
    ));
    
    $result = array();
    foreach ($posts as $post) {
        $result[] = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'description' => $post->post_content,
            'service_type' => get_field('service_type', $post->ID),
            'service_features' => get_field('service_features', $post->ID),
            'base_price' => get_field('base_price', $post->ID),
            'featured_image' => wp_get_attachment_image_url(get_post_thumbnail_id($post->ID), 'full')
        );
    }
    
    return rest_ensure_response($result);
}

function get_all_locations($request) {
    $posts = get_posts(array(
        'post_type' => 'cleaning_location',
        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC'
    ));
    
    $result = array();
    foreach ($posts as $post) {
        $result[] = array(
            'id' => $post->ID,
            'name' => $post->post_title,
            'description' => $post->post_content,
            'city_slug' => get_field('city_slug', $post->ID),
            'phone_number' => get_field('phone_number', $post->ID),
            'coverage_areas' => get_field('coverage_areas', $post->ID),
            'featured_image' => wp_get_attachment_image_url(get_post_thumbnail_id($post->ID), 'full')
        );
    }
    
    return rest_ensure_response($result);
}

// Disable default WordPress frontend (since we're headless)
function disable_wp_frontend() {
    if (!is_admin() && !wp_is_json_request()) {
        wp_redirect(home_url('/wp-admin/'));
        exit;
    }
}
add_action('template_redirect', 'disable_wp_frontend');

// Cleanup WordPress for headless use
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');