<?php
/**
 * Plugin Name: TotalSpark Landing Pages
 * Plugin URI: https://totalsparksolutions.co.uk
 * Description: Convert React landing pages to WordPress with GTM analytics, call tracking, and lead management
 * Version: 1.0.0
 * Author: TotalSpark Solutions
 * Text Domain: totalspark-landing
 * Domain Path: /languages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('TOTALSPARK_PLUGIN_URL', plugin_dir_url(__FILE__));
define('TOTALSPARK_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('TOTALSPARK_VERSION', '1.0.0');

// Main plugin class
class TotalSparkLandingPages {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_head', array($this, 'add_gtm_head'));
        add_action('wp_footer', array($this, 'add_gtm_body'));
        register_activation_hook(__FILE__, array($this, 'activate'));
    }
    
    public function init() {
        // Register shortcodes
        add_shortcode('ts_hero', array($this, 'hero_shortcode'));
        add_shortcode('ts_proof_strip', array($this, 'proof_strip_shortcode'));
        add_shortcode('ts_features', array($this, 'features_shortcode'));
        add_shortcode('ts_services', array($this, 'services_shortcode'));
        add_shortcode('ts_reviews', array($this, 'reviews_shortcode'));
        add_shortcode('ts_faq', array($this, 'faq_shortcode'));
        add_shortcode('ts_quote_form', array($this, 'quote_form_shortcode'));
        add_shortcode('ts_cta', array($this, 'cta_shortcode'));
        add_shortcode('ts_sticky_call', array($this, 'sticky_call_shortcode'));
        
        // Register AJAX endpoints
        add_action('wp_ajax_submit_quote', array($this, 'handle_quote_submission'));
        add_action('wp_ajax_nopriv_submit_quote', array($this, 'handle_quote_submission'));
        
        // Add JSON-LD structured data
        add_action('wp_head', array($this, 'add_structured_data'));
    }
    
    public function enqueue_scripts() {
        // Enqueue CSS
        wp_enqueue_style(
            'totalspark-landing-styles',
            TOTALSPARK_PLUGIN_URL . 'assets/totalspark-landing.css',
            array(),
            TOTALSPARK_VERSION
        );
        
        // Enqueue JavaScript
        wp_enqueue_script(
            'totalspark-analytics',
            TOTALSPARK_PLUGIN_URL . 'assets/totalspark-analytics.js',
            array('jquery'),
            TOTALSPARK_VERSION,
            true
        );
        
        wp_enqueue_script(
            'totalspark-call-tracking',
            TOTALSPARK_PLUGIN_URL . 'assets/totalspark-call-tracking.js',
            array('jquery'),
            TOTALSPARK_VERSION,
            true
        );
        
        // Pass data to JavaScript
        wp_localize_script('totalspark-analytics', 'totalsparkAjax', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('totalspark_nonce'),
            'gtm_id' => get_option('totalspark_gtm_id', 'GTM-W4MWH6F3')
        ));
    }
    
    public function add_gtm_head() {
        $gtm_id = get_option('totalspark_gtm_id', 'GTM-W4MWH6F3');
        if ($gtm_id) {
            echo "<!-- Google Tag Manager -->\n";
            echo "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n";
            echo "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n";
            echo "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n";
            echo "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n";
            echo "})(window,document,'script','dataLayer','{$gtm_id}');</script>\n";
            echo "<!-- End Google Tag Manager -->\n";
        }
    }
    
    public function add_gtm_body() {
        $gtm_id = get_option('totalspark_gtm_id', 'GTM-W4MWH6F3');
        if ($gtm_id) {
            echo "<!-- Google Tag Manager (noscript) -->\n";
            echo "<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id={$gtm_id}\"\n";
            echo "height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>\n";
            echo "<!-- End Google Tag Manager (noscript) -->\n";
        }
    }
    
    // Shortcode handlers
    public function hero_shortcode($atts) {
        $atts = shortcode_atts(array(
            'city' => 'Newcastle upon Tyne',
            'service' => 'Cleaning Services',
            'title' => '',
            'subtitle' => '',
            'phone' => '03300 435459'
        ), $atts);
        
        if (empty($atts['title'])) {
            $atts['title'] = "Professional {$atts['service']} {$atts['city']} – Regular & One-Off Cleans";
        }
        
        if (empty($atts['subtitle'])) {
            $atts['subtitle'] = "Trusted cleaning services across {$atts['city']} and surrounding areas. Regular domestic cleaning, one-off cleans, and maintenance services.";
        }
        
        ob_start();
        include TOTALSPARK_PLUGIN_PATH . 'templates/hero.php';
        return ob_get_clean();
    }
    
    public function proof_strip_shortcode($atts) {
        ob_start();
        include TOTALSPARK_PLUGIN_PATH . 'templates/proof-strip.php';
        return ob_get_clean();
    }
    
    public function features_shortcode($atts) {
        $atts = shortcode_atts(array(
            'service' => 'cleaning'
        ), $atts);
        
        ob_start();
        include TOTALSPARK_PLUGIN_PATH . 'templates/features.php';
        return ob_get_clean();
    }
    
    public function quote_form_shortcode($atts) {
        $atts = shortcode_atts(array(
            'city' => 'Newcastle upon Tyne',
            'service' => 'cleaning'
        ), $atts);
        
        ob_start();
        include TOTALSPARK_PLUGIN_PATH . 'templates/quote-form.php';
        return ob_get_clean();
    }
    
    public function sticky_call_shortcode($atts) {
        $atts = shortcode_atts(array(
            'phone' => '03300 435459'
        ), $atts);
        
        ob_start();
        include TOTALSPARK_PLUGIN_PATH . 'templates/sticky-call.php';
        return ob_get_clean();
    }
    
    // Placeholder shortcodes (implement based on React components)
    public function services_shortcode($atts) { return $this->render_template('services', $atts); }
    public function reviews_shortcode($atts) { return $this->render_template('reviews', $atts); }
    public function faq_shortcode($atts) { return $this->render_template('faq', $atts); }
    public function cta_shortcode($atts) { return $this->render_template('cta', $atts); }
    
    private function render_template($template, $atts = array()) {
        ob_start();
        include TOTALSPARK_PLUGIN_PATH . "templates/{$template}.php";
        return ob_get_clean();
    }
    
    public function handle_quote_submission() {
        // Verify nonce
        if (!wp_verify_nonce($_POST['security'], 'totalspark_nonce')) {
            wp_send_json_error('Security check failed');
            return;
        }
        
        // Sanitize form data
        $form_data = array(
            'service_type' => sanitize_text_field($_POST['service_type']),
            'city' => sanitize_text_field($_POST['city']),
            'name' => sanitize_text_field($_POST['name']),
            'email' => sanitize_email($_POST['email']),
            'phone' => sanitize_text_field($_POST['phone']),
            'message' => sanitize_textarea_field($_POST['message']),
            'utm_source' => sanitize_text_field($_POST['utm_source']),
            'utm_campaign' => sanitize_text_field($_POST['utm_campaign']),
            'page_url' => esc_url_raw($_POST['page_url'])
        );
        
        // Store in database
        $this->store_quote($form_data);
        
        // Send email notification
        $this->send_quote_email($form_data);
        
        // Send to external CRM (if configured)
        $this->send_to_crm($form_data);
        
        wp_send_json_success(array('message' => 'Quote submitted successfully'));
    }
    
    private function store_quote($data) {
        global $wpdb;
        
        $wpdb->insert(
            $wpdb->prefix . 'totalspark_quotes',
            $data,
            array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
        );
    }
    
    private function send_quote_email($data) {
        $to = get_option('admin_email');
        $subject = "New Quote Request from {$data['name']} - {$data['city']}";
        
        $message = "New quote request:\n\n";
        foreach ($data as $key => $value) {
            $message .= ucfirst(str_replace('_', ' ', $key)) . ": {$value}\n";
        }
        
        wp_mail($to, $subject, $message);
    }
    
    public function add_structured_data() {
        if (is_page()) {
            global $post;
            
            // Get city and service from shortcode attributes or URL
            $city = $this->extract_city_from_content($post->post_content);
            $service = $this->extract_service_from_content($post->post_content);
            
            if ($city && $service) {
                $structured_data = $this->generate_structured_data($city, $service);
                echo "<script type=\"application/ld+json\">\n" . wp_json_encode($structured_data) . "\n</script>\n";
            }
        }
    }
    
    private function generate_structured_data($city, $service) {
        return array(
            "@context" => "https://schema.org",
            "@type" => "LocalBusiness",
            "name" => "TotalSpark Solutions",
            "description" => "Professional {$service} in {$city}",
            "url" => home_url(),
            "telephone" => "03300 435459",
            "areaServed" => $city,
            "serviceType" => $service
        );
    }
    
    // Database setup
    public function activate() {
        $this->create_tables();
        
        // Set default options
        add_option('totalspark_gtm_id', 'GTM-W4MWH6F3');
    }
    
    private function create_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'totalspark_quotes';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            service_type tinytext NOT NULL,
            city tinytext NOT NULL,
            name tinytext NOT NULL,
            email varchar(100) NOT NULL,
            phone varchar(20) NOT NULL,
            message text,
            utm_source tinytext,
            utm_campaign tinytext,
            page_url text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    // Helper methods
    private function extract_city_from_content($content) {
        preg_match('/\[ts_hero[^\]]*city="([^"]*)"/', $content, $matches);
        return isset($matches[1]) ? $matches[1] : 'Newcastle upon Tyne';
    }
    
    private function extract_service_from_content($content) {
        preg_match('/\[ts_hero[^\]]*service="([^"]*)"/', $content, $matches);
        return isset($matches[1]) ? $matches[1] : 'Cleaning Services';
    }
}

// Initialize the plugin
new TotalSparkLandingPages();
?>