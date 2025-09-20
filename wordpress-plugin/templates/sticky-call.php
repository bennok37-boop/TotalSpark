<?php
/**
 * Sticky Call Button Template
 */
?>
<div id="ts-sticky-call" class="ts-sticky-call" 
     style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: block;">
    
    <a href="tel:<?php echo esc_attr($atts['phone']); ?>" 
       class="ts-sticky-call-btn"
       style="display: flex; align-items: center; background: #10b981; color: white; padding: 1rem 1.5rem; border-radius: 2rem; text-decoration: none; font-weight: 600; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); transition: all 0.3s;"
       data-gtm-event="call_click" data-dynamic-phone="<?php echo esc_attr($atts['phone']); ?>"
       onmouseover="this.style.background='#059669'; this.style.transform='scale(1.05)'"
       onmouseout="this.style.background='#10b981'; this.style.transform='scale(1)'">
        
        <span style="font-size: 1.25rem; margin-right: 0.5rem;">📞</span>
        <span class="ts-call-text">Call Now</span>
        <span class="ts-phone-number" data-dynamic-phone style="margin-left: 0.5rem; font-size: 0.875rem;">
            <?php echo esc_html($atts['phone']); ?>
        </span>
    </a>
    
</div>

<style>
@media (max-width: 768px) {
    .ts-sticky-call {
        bottom: 10px !important;
        right: 10px !important;
    }
    
    .ts-sticky-call-btn {
        padding: 0.75rem 1rem !important;
        font-size: 0.875rem !important;
    }
    
    .ts-phone-number {
        display: none !important;
    }
}

@media (max-width: 480px) {
    .ts-sticky-call {
        right: 50% !important;
        transform: translateX(50%);
    }
    
    .ts-call-text::after {
        content: " " attr(data-dynamic-phone);
    }
}
</style>

<script>
// Hide sticky button when quote form is visible
document.addEventListener('DOMContentLoaded', function() {
    const stickyCall = document.getElementById('ts-sticky-call');
    const quoteForm = document.getElementById('ts-quote-form');
    
    if (stickyCall && quoteForm) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    stickyCall.style.display = 'none';
                } else {
                    stickyCall.style.display = 'block';
                }
            });
        });
        
        observer.observe(quoteForm);
    }
});
</script>