<?php
/**
 * Hero Section Template
 */
?>
<section class="ts-hero-section" style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 4rem 1rem;">
    <div class="ts-container" style="max-width: 1200px; margin: 0 auto; text-align: center;">
        <div class="ts-badge" style="display: inline-block; background: #e2e8f0; color: #475569; padding: 0.5rem 1rem; border-radius: 1rem; margin-bottom: 1rem; font-size: 0.875rem;">
            <?php echo esc_html($atts['service']); ?> in <?php echo esc_html($atts['city']); ?>
        </div>
        
        <h1 class="ts-hero-title" style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #1e293b; line-height: 1.2;">
            <?php echo esc_html($atts['title']); ?>
        </h1>
        
        <p class="ts-hero-subtitle" style="font-size: 1.25rem; color: #64748b; margin-bottom: 2rem; max-width: 800px; margin-left: auto; margin-right: auto;">
            <?php echo esc_html($atts['subtitle']); ?>
        </p>
        
        <div class="ts-hero-buttons" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="#ts-quote-form" class="ts-btn ts-btn-primary" 
               style="background: #3b82f6; color: white; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;"
               data-gtm-event="quote_started" data-gtm-city="<?php echo esc_attr($atts['city']); ?>" data-gtm-service="<?php echo esc_attr($atts['service']); ?>">
                📞 Get Free Quote Now
            </a>
            
            <a href="tel:<?php echo esc_attr($atts['phone']); ?>" class="ts-btn ts-btn-secondary" 
               style="border: 2px solid #3b82f6; color: #3b82f6; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem;"
               data-gtm-event="call_click" data-dynamic-phone="<?php echo esc_attr($atts['phone']); ?>">
                📞 Call Now: <span data-dynamic-phone><?php echo esc_html($atts['phone']); ?></span>
            </a>
        </div>
    </div>
</section>

<style>
@media (max-width: 768px) {
    .ts-hero-title { font-size: 2rem !important; }
    .ts-hero-subtitle { font-size: 1.1rem !important; }
    .ts-hero-buttons { flex-direction: column; align-items: center; }
    .ts-btn { width: 100%; max-width: 300px; text-align: center; }
}
</style>