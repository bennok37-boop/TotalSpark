<?php
/**
 * Plugin Name: TotalSpark API
 * Description: Custom API endpoints and functionality for TotalSpark Solutions headless WordPress
 * Version: 1.0
 * Author: TotalSpark Solutions
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class TotalSparkAPI {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_ajax_import_existing_data', array($this, 'import_existing_data'));
        add_action('wp_ajax_sync_before_after', array($this, 'sync_before_after_images'));
    }
    
    public function init() {
        $this->register_custom_fields();
    }
    
    public function register_custom_fields() {
        // Register ACF fields if ACF is not available
        if (!function_exists('acf_add_local_field_group')) {
            add_action('add_meta_boxes', array($this, 'add_custom_meta_boxes'));
            add_action('save_post', array($this, 'save_custom_fields'));
        } else {
            $this->register_acf_fields();
        }
    }
    
    public function register_acf_fields() {
        if (function_exists('acf_add_local_field_group')) {
            
            // Service fields
            acf_add_local_field_group(array(
                'key' => 'group_service_fields',
                'title' => 'Service Details',
                'fields' => array(
                    array(
                        'key' => 'field_service_type',
                        'label' => 'Service Type',
                        'name' => 'service_type',
                        'type' => 'select',
                        'choices' => array(
                            'endOfTenancy' => 'End of Tenancy',
                            'deep' => 'Deep Clean',
                            'commercial' => 'Commercial',
                            'carpets' => 'Carpet & Upholstery'
                        ),
                        'default_value' => 'deep',
                        'allow_null' => 0,
                        'multiple' => 0,
                        'ui' => 1,
                        'return_format' => 'value'
                    ),
                    array(
                        'key' => 'field_service_description',
                        'label' => 'Service Description',
                        'name' => 'service_description',
                        'type' => 'textarea',
                        'rows' => 4
                    ),
                    array(
                        'key' => 'field_service_features',
                        'label' => 'Service Features',
                        'name' => 'service_features',
                        'type' => 'repeater',
                        'sub_fields' => array(
                            array(
                                'key' => 'field_feature_text',
                                'label' => 'Feature',
                                'name' => 'feature_text',
                                'type' => 'text'
                            )
                        ),
                        'min' => 1,
                        'layout' => 'table',
                        'button_label' => 'Add Feature'
                    ),
                    array(
                        'key' => 'field_base_price',
                        'label' => 'Base Price (£)',
                        'name' => 'base_price',
                        'type' => 'number',
                        'min' => 0,
                        'step' => 1
                    )
                ),
                'location' => array(
                    array(
                        array(
                            'param' => 'post_type',
                            'operator' => '==',
                            'value' => 'cleaning_service'
                        )
                    )
                )
            ));
            
            // Location fields
            acf_add_local_field_group(array(
                'key' => 'group_location_fields',
                'title' => 'Location Details',
                'fields' => array(
                    array(
                        'key' => 'field_city_slug',
                        'label' => 'City Slug',
                        'name' => 'city_slug',
                        'type' => 'select',
                        'choices' => array(
                            'newcastle-upon-tyne' => 'Newcastle upon Tyne',
                            'leeds' => 'Leeds',
                            'york' => 'York',
                            'sunderland' => 'Sunderland',
                            'middlesbrough' => 'Middlesbrough'
                        ),
                        'default_value' => 'newcastle-upon-tyne',
                        'allow_null' => 0,
                        'ui' => 1
                    ),
                    array(
                        'key' => 'field_phone_number',
                        'label' => 'Phone Number',
                        'name' => 'phone_number',
                        'type' => 'text',
                        'placeholder' => '0191 123 4567'
                    ),
                    array(
                        'key' => 'field_coverage_areas',
                        'label' => 'Coverage Areas',
                        'name' => 'coverage_areas',
                        'type' => 'repeater',
                        'sub_fields' => array(
                            array(
                                'key' => 'field_area_name',
                                'label' => 'Area Name',
                                'name' => 'area_name',
                                'type' => 'text'
                            )
                        ),
                        'min' => 1,
                        'layout' => 'table',
                        'button_label' => 'Add Area'
                    )
                ),
                'location' => array(
                    array(
                        array(
                            'param' => 'post_type',
                            'operator' => '==',
                            'value' => 'cleaning_location'
                        )
                    )
                )
            ));
            
            // Before/After fields
            acf_add_local_field_group(array(
                'key' => 'group_before_after_fields',
                'title' => 'Before/After Images',
                'fields' => array(
                    array(
                        'key' => 'field_before_image',
                        'label' => 'Before Image',
                        'name' => 'before_image',
                        'type' => 'image',
                        'return_format' => 'id',
                        'preview_size' => 'medium',
                        'library' => 'all'
                    ),
                    array(
                        'key' => 'field_after_image',
                        'label' => 'After Image',
                        'name' => 'after_image',
                        'type' => 'image',
                        'return_format' => 'id',
                        'preview_size' => 'medium',
                        'library' => 'all'
                    ),
                    array(
                        'key' => 'field_location_slug',
                        'label' => 'Location',
                        'name' => 'location_slug',
                        'type' => 'select',
                        'choices' => array(
                            'newcastle-upon-tyne' => 'Newcastle upon Tyne',
                            'leeds' => 'Leeds',
                            'york' => 'York',
                            'sunderland' => 'Sunderland',
                            'middlesbrough' => 'Middlesbrough'
                        ),
                        'default_value' => 'newcastle-upon-tyne',
                        'allow_null' => 0,
                        'ui' => 1
                    ),
                    array(
                        'key' => 'field_service_category',
                        'label' => 'Service Category',
                        'name' => 'service_category',
                        'type' => 'select',
                        'choices' => array(
                            'endOfTenancy' => 'End of Tenancy',
                            'deep' => 'Deep Clean',
                            'commercial' => 'Commercial',
                            'carpets' => 'Carpet & Upholstery'
                        ),
                        'default_value' => 'deep',
                        'allow_null' => 0,
                        'ui' => 1
                    )
                ),
                'location' => array(
                    array(
                        array(
                            'param' => 'post_type',
                            'operator' => '==',
                            'value' => 'before_after'
                        )
                    )
                )
            ));
            
            // Testimonial fields
            acf_add_local_field_group(array(
                'key' => 'group_testimonial_fields',
                'title' => 'Testimonial Details',
                'fields' => array(
                    array(
                        'key' => 'field_customer_name',
                        'label' => 'Customer Name',
                        'name' => 'customer_name',
                        'type' => 'text',
                        'required' => 1
                    ),
                    array(
                        'key' => 'field_customer_location',
                        'label' => 'Customer Location',
                        'name' => 'customer_location',
                        'type' => 'text',
                        'placeholder' => 'Newcastle, UK'
                    ),
                    array(
                        'key' => 'field_rating',
                        'label' => 'Rating',
                        'name' => 'rating',
                        'type' => 'range',
                        'min' => 1,
                        'max' => 5,
                        'step' => 1,
                        'default_value' => 5
                    ),
                    array(
                        'key' => 'field_service_used',
                        'label' => 'Service Used',
                        'name' => 'service_used',
                        'type' => 'select',
                        'choices' => array(
                            'endOfTenancy' => 'End of Tenancy',
                            'deep' => 'Deep Clean',
                            'commercial' => 'Commercial',
                            'carpets' => 'Carpet & Upholstery'
                        ),
                        'allow_null' => 1,
                        'ui' => 1
                    )
                ),
                'location' => array(
                    array(
                        array(
                            'param' => 'post_type',
                            'operator' => '==',
                            'value' => 'testimonial'
                        )
                    )
                )
            ));
        }
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'TotalSpark Manager',
            'TotalSpark',
            'manage_options',
            'totalspark-manager',
            array($this, 'admin_page'),
            'dashicons-admin-tools',
            30
        );
        
        add_submenu_page(
            'totalspark-manager',
            'Import Data',
            'Import Data',
            'manage_options',
            'totalspark-import',
            array($this, 'import_page')
        );
        
        add_submenu_page(
            'totalspark-manager',
            'Before/After Manager',
            'Gallery Manager',
            'manage_options',
            'totalspark-gallery',
            array($this, 'gallery_page')
        );
    }
    
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1>TotalSpark Solutions Manager</h1>
            
            <div class="card" style="max-width: none;">
                <h2>Welcome to TotalSpark WordPress Backend</h2>
                <p>This is your content management system for the TotalSpark Solutions website. Here you can:</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    
                    <div class="postbox">
                        <div class="postbox-header">
                            <h3>📝 Manage Content</h3>
                        </div>
                        <div class="inside">
                            <ul>
                                <li><a href="edit.php?post_type=cleaning_service">Cleaning Services</a> - Add/edit service descriptions</li>
                                <li><a href="edit.php?post_type=cleaning_location">Locations</a> - Manage city pages and coverage areas</li>
                                <li><a href="edit.php?post_type=before_after">Before/After Gallery</a> - Upload transformation images</li>
                                <li><a href="edit.php?post_type=testimonial">Testimonials</a> - Manage customer reviews</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="postbox">
                        <div class="postbox-header">
                            <h3>🔧 TotalSpark Tools</h3>
                        </div>
                        <div class="inside">
                            <ul>
                                <li><a href="admin.php?page=totalspark-import">Import Existing Data</a> - Migrate from current site</li>
                                <li><a href="admin.php?page=totalspark-gallery">Gallery Manager</a> - Organize before/after images</li>
                                <li><a href="upload.php">Media Library</a> - Manage all images</li>
                                <li><a href="edit.php?post_type=page">Pages</a> - Manage static pages</li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
                
                <div class="postbox">
                    <div class="postbox-header">
                        <h3>🔗 API Endpoints</h3>
                    </div>
                    <div class="inside">
                        <p>Your React frontend uses these endpoints:</p>
                        <ul>
                            <li><code>/wp-json/wp/v2/services</code> - All cleaning services</li>
                            <li><code>/wp-json/wp/v2/locations</code> - All service locations</li>
                            <li><code>/wp-json/wp/v2/before-after</code> - Before/after gallery</li>
                            <li><code>/wp-json/totalspark/v1/before-after/{city}</code> - City-specific gallery</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
    
    public function import_page() {
        ?>
        <div class="wrap">
            <h1>Import Existing Data</h1>
            
            <div class="card">
                <h2>Import from Current TotalSpark Site</h2>
                <p>This will import your existing service descriptions, location data, and before/after images from your current React website.</p>
                
                <button id="import-data-btn" class="button button-primary button-large">Import Existing Data</button>
                <div id="import-progress" style="display: none;">
                    <p>Importing data... <span class="spinner is-active"></span></p>
                    <div id="import-log"></div>
                </div>
            </div>
            
            <div class="card">
                <h2>Upload Before/After Images</h2>
                <p>Upload your dramatic transformation images here. They'll be organized by city automatically.</p>
                
                <form id="image-upload-form" enctype="multipart/form-data">
                    <table class="form-table">
                        <tr>
                            <th scope="row">City</th>
                            <td>
                                <select name="city" id="image-city">
                                    <option value="newcastle-upon-tyne">Newcastle upon Tyne</option>
                                    <option value="leeds">Leeds</option>
                                    <option value="york">York</option>
                                    <option value="sunderland">Sunderland</option>
                                    <option value="middlesbrough">Middlesbrough</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Service Type</th>
                            <td>
                                <select name="service" id="image-service">
                                    <option value="deep">Deep Clean</option>
                                    <option value="endOfTenancy">End of Tenancy</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="carpets">Carpet & Upholstery</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Before Image</th>
                            <td><input type="file" name="before_image" accept="image/*" required></td>
                        </tr>
                        <tr>
                            <th scope="row">After Image</th>
                            <td><input type="file" name="after_image" accept="image/*" required></td>
                        </tr>
                        <tr>
                            <th scope="row">Title</th>
                            <td><input type="text" name="title" class="regular-text" placeholder="e.g., Newcastle Living Room Deep Clean" required></td>
                        </tr>
                        <tr>
                            <th scope="row">Description</th>
                            <td><textarea name="description" rows="3" class="large-text" placeholder="Describe the transformation..."></textarea></td>
                        </tr>
                    </table>
                    
                    <button type="submit" class="button button-primary">Upload Before/After Pair</button>
                </form>
            </div>
        </div>
        <?php
    }
    
    public function gallery_page() {
        ?>
        <div class="wrap">
            <h1>Before/After Gallery Manager</h1>
            
            <div class="card">
                <h2>Current Gallery Items</h2>
                <div id="gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                    <!-- Gallery items will be loaded here via JavaScript -->
                </div>
            </div>
        </div>
        <?php
    }
    
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'totalspark') !== false) {
            wp_enqueue_script('totalspark-admin', plugin_dir_url(__FILE__) . 'admin.js', array('jquery'), '1.0', true);
            wp_localize_script('totalspark-admin', 'totalspark_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('totalspark_nonce')
            ));
        }
    }
    
    public function import_existing_data() {
        check_ajax_referer('totalspark_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }
        
        // Import existing locations
        $locations = array(
            array(
                'name' => 'Newcastle upon Tyne',
                'slug' => 'newcastle-upon-tyne',
                'phone' => '0191 123 4567',
                'areas' => array('Newcastle', 'Gateshead', 'South Shields', 'Wallsend')
            ),
            array(
                'name' => 'Leeds',
                'slug' => 'leeds',
                'phone' => '0113 456 7890',
                'areas' => array('Leeds', 'Bradford', 'Wakefield', 'Huddersfield')
            ),
            array(
                'name' => 'York',
                'slug' => 'york',
                'phone' => '01904 567 890',
                'areas' => array('York', 'Harrogate', 'Selby', 'Malton')
            ),
            array(
                'name' => 'Sunderland',
                'slug' => 'sunderland',
                'phone' => '0191 234 5678',
                'areas' => array('Sunderland', 'Durham', 'Chester-le-Street', 'Washington')
            ),
            array(
                'name' => 'Middlesbrough',
                'slug' => 'middlesbrough',
                'phone' => '01642 345 678',
                'areas' => array('Middlesbrough', 'Stockton-on-Tees', 'Redcar', 'Thornaby')
            )
        );
        
        foreach ($locations as $location) {
            $post_id = wp_insert_post(array(
                'post_type' => 'cleaning_location',
                'post_title' => $location['name'],
                'post_content' => 'Professional cleaning services in ' . $location['name'] . ' and surrounding areas.',
                'post_status' => 'publish'
            ));
            
            if ($post_id) {
                update_field('city_slug', $location['slug'], $post_id);
                update_field('phone_number', $location['phone'], $post_id);
                
                $areas_data = array();
                foreach ($location['areas'] as $area) {
                    $areas_data[] = array('area_name' => $area);
                }
                update_field('coverage_areas', $areas_data, $post_id);
            }
        }
        
        // Import existing services
        $services = array(
            array(
                'title' => 'End of Tenancy Cleaning',
                'type' => 'endOfTenancy',
                'description' => 'Comprehensive end of tenancy cleaning to help you get your full deposit back.',
                'features' => array('Deposit-back guarantee', 'All rooms cleaned', 'Kitchen deep clean', 'Bathroom sanitization', 'Window cleaning', 'Carpet vacuuming'),
                'base_price' => 120
            ),
            array(
                'title' => 'Deep Cleaning Service',
                'type' => 'deep',
                'description' => 'Thorough deep cleaning for homes that need extra attention.',
                'features' => array('Every surface cleaned', 'Inside appliances', 'Detailed bathroom clean', 'Kitchen degreasing', 'Skirting boards', 'Light fixtures'),
                'base_price' => 150
            ),
            array(
                'title' => 'Commercial Cleaning',
                'type' => 'commercial',
                'description' => 'Professional office and commercial space cleaning services.',
                'features' => array('Flexible scheduling', 'Professional equipment', 'Insured staff', 'Regular service available', 'Health & safety compliant', 'Waste management'),
                'base_price' => 80
            ),
            array(
                'title' => 'Carpet & Upholstery Cleaning',
                'type' => 'carpets',
                'description' => 'Professional carpet and upholstery cleaning using advanced equipment.',
                'features' => array('Hot water extraction', 'Stain removal', 'Pet odor treatment', 'Fast drying', 'Eco-friendly products', 'Fabric protection'),
                'base_price' => 25
            )
        );
        
        foreach ($services as $service) {
            $post_id = wp_insert_post(array(
                'post_type' => 'cleaning_service',
                'post_title' => $service['title'],
                'post_content' => $service['description'],
                'post_status' => 'publish'
            ));
            
            if ($post_id) {
                update_field('service_type', $service['type'], $post_id);
                update_field('service_description', $service['description'], $post_id);
                update_field('base_price', $service['base_price'], $post_id);
                
                $features_data = array();
                foreach ($service['features'] as $feature) {
                    $features_data[] = array('feature_text' => $feature);
                }
                update_field('service_features', $features_data, $post_id);
            }
        }
        
        wp_send_json_success('Data imported successfully!');
    }
}

// Initialize the plugin
new TotalSparkAPI();