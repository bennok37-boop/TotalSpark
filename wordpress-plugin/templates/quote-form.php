<?php
/**
 * Quote Form Template
 */
?>
<section id="ts-quote-form" class="ts-quote-section" style="background: white; padding: 4rem 1rem;">
    <div class="ts-container" style="max-width: 800px; margin: 0 auto;">
        <div class="ts-form-header" style="text-align: center; margin-bottom: 2rem;">
            <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem; color: #1e293b;">
                Get Your Free Quote
            </h2>
            <p style="color: #64748b; font-size: 1.1rem;">
                Complete the form below and we'll get back to you within 1 hour
            </p>
        </div>
        
        <form id="ts-quote-form-element" class="ts-form" style="background: #f8fafc; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <div class="ts-form-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                
                <div class="ts-form-group">
                    <label for="ts-service-type" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Service Type *</label>
                    <select id="ts-service-type" name="service_type" required 
                            style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem;">
                        <option value="">Select a service</option>
                        <option value="end-of-tenancy">End of Tenancy Cleaning</option>
                        <option value="deep-cleaning">Deep Cleaning</option>
                        <option value="regular-cleaning">Regular Cleaning</option>
                        <option value="commercial-cleaning">Commercial Cleaning</option>
                        <option value="carpet-cleaning">Carpet & Upholstery</option>
                    </select>
                </div>
                
                <div class="ts-form-group">
                    <label for="ts-city" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">City/Area *</label>
                    <input type="text" id="ts-city" name="city" value="<?php echo esc_attr($atts['city']); ?>" required
                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem;">
                </div>
                
            </div>
            
            <div class="ts-form-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                
                <div class="ts-form-group">
                    <label for="ts-name" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Full Name *</label>
                    <input type="text" id="ts-name" name="name" required
                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem;">
                </div>
                
                <div class="ts-form-group">
                    <label for="ts-phone" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Phone Number *</label>
                    <input type="tel" id="ts-phone" name="phone" required
                           style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem;">
                </div>
                
            </div>
            
            <div class="ts-form-group" style="margin-bottom: 1rem;">
                <label for="ts-email" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Email Address *</label>
                <input type="email" id="ts-email" name="email" required
                       style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem;">
            </div>
            
            <div class="ts-form-group" style="margin-bottom: 2rem;">
                <label for="ts-message" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Additional Requirements</label>
                <textarea id="ts-message" name="message" rows="4" placeholder="Tell us about your cleaning requirements..."
                          style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem; font-size: 1rem; resize: vertical;"></textarea>
            </div>
            
            <button type="submit" class="ts-submit-btn" 
                    style="width: 100%; background: #3b82f6; color: white; padding: 1rem 2rem; border: none; border-radius: 0.5rem; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background 0.3s;"
                    onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">
                Get My Free Quote
            </button>
            
            <p style="text-align: center; margin-top: 1rem; font-size: 0.875rem; color: #64748b;">
                We'll contact you within 1 hour during business hours
            </p>
            
            <!-- Hidden fields for tracking -->
            <input type="hidden" name="utm_source" value="">
            <input type="hidden" name="utm_campaign" value="">
            <input type="hidden" name="page_url" value="">
            <input type="hidden" name="action" value="submit_quote">
            <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('totalspark_nonce'); ?>">
            
        </form>
        
        <div id="ts-form-success" style="display: none; background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; text-align: center;">
            <strong>Thank you!</strong> Your quote request has been submitted. We'll contact you within 1 hour.
        </div>
        
        <div id="ts-form-error" style="display: none; background: #fee2e2; color: #dc2626; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem; text-align: center;">
            <strong>Error:</strong> Please try again or call us directly.
        </div>
        
    </div>
</section>

<style>
@media (max-width: 768px) {
    .ts-form-grid {
        grid-template-columns: 1fr !important;
    }
    .ts-form {
        padding: 1.5rem !important;
    }
}
</style>