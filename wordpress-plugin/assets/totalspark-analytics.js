/**
 * TotalSpark Analytics - WordPress GTM Integration
 * Converts React analytics to WordPress-compatible vanilla JS
 */

(function() {
    'use strict';
    
    // Initialize dataLayer if not exists
    window.dataLayer = window.dataLayer || [];
    
    // Configuration
    const config = {
        gtmId: totalsparkAjax.gtm_id || 'GTM-W4MWH6F3',
        consentGranted: true // Can be integrated with cookie consent later
    };
    
    // Event queue for before initialization
    let eventQueue = [];
    let analyticsInitialized = false;
    
    /**
     * Initialize GTM Analytics
     */
    function initAnalytics() {
        if (!config.consentGranted) {
            console.log('GTM initialization delayed - awaiting user consent');
            return;
        }
        
        if (analyticsInitialized) {
            return;
        }
        
        // GTM is already loaded in PHP, just track page view
        trackPageView(window.location.pathname, document.title);
        analyticsInitialized = true;
        
        // Flush queued events
        flushEventQueue();
        
        console.log('TotalSpark Analytics initialized with GTM:', config.gtmId);
    }
    
    /**
     * Track page view
     */
    function trackPageView(path, title) {
        pushToDataLayer({
            event: 'page_view',
            page_title: title,
            page_location: window.location.href,
            page_path: path
        });
    }
    
    /**
     * Track form submission
     */
    function trackFormSubmit(formType, city, service) {
        pushToDataLayer({
            event: 'form_submit',
            form_type: formType,
            city: city,
            service: service,
            page_location: window.location.href
        });
    }
    
    /**
     * Track call clicks
     */
    function trackCallClick(phoneNumber, city, service) {
        pushToDataLayer({
            event: 'call_click',
            phone_number: phoneNumber,
            city: city,
            service: service,
            page_location: window.location.href
        });
    }
    
    /**
     * Track WhatsApp clicks
     */
    function trackWhatsAppClick(phoneNumber, city, service) {
        pushToDataLayer({
            event: 'whatsapp_click',
            phone_number: phoneNumber,
            city: city,
            service: service,
            page_location: window.location.href
        });
    }
    
    /**
     * Track quote form started
     */
    function trackQuoteStarted(city, service) {
        pushToDataLayer({
            event: 'quote_started',
            city: city,
            service: service,
            page_location: window.location.href
        });
    }
    
    /**
     * Track quote form completed
     */
    function trackQuoteCompleted(formData) {
        pushToDataLayer({
            event: 'quote_completed',
            service_type: formData.service_type,
            city: formData.city,
            page_location: window.location.href
        });
    }
    
    /**
     * Push event to dataLayer
     */
    function pushToDataLayer(eventData) {
        if (analyticsInitialized) {
            window.dataLayer.push(eventData);
        } else {
            eventQueue.push(eventData);
        }
    }
    
    /**
     * Flush queued events
     */
    function flushEventQueue() {
        while (eventQueue.length > 0) {
            const event = eventQueue.shift();
            window.dataLayer.push(event);
        }
    }
    
    /**
     * Set up event listeners
     */
    function setupEventListeners() {
        // Track clicks on elements with data-gtm-event
        document.addEventListener('click', function(e) {
            const element = e.target.closest('[data-gtm-event]');
            if (!element) return;
            
            const eventType = element.getAttribute('data-gtm-event');
            const city = element.getAttribute('data-gtm-city') || extractCityFromPage();
            const service = element.getAttribute('data-gtm-service') || extractServiceFromPage();
            
            switch (eventType) {
                case 'call_click':
                    const phoneNumber = element.getAttribute('data-dynamic-phone') || element.textContent;
                    trackCallClick(phoneNumber, city, service);
                    break;
                    
                case 'quote_started':
                    trackQuoteStarted(city, service);
                    break;
                    
                case 'whatsapp_click':
                    const whatsappNumber = element.getAttribute('data-dynamic-phone');
                    trackWhatsAppClick(whatsappNumber, city, service);
                    break;
            }
        });
        
        // Track form submissions
        const quoteForm = document.getElementById('ts-quote-form-element');
        if (quoteForm) {
            quoteForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleQuoteFormSubmission(this);
            });
        }
    }
    
    /**
     * Handle quote form submission
     */
    function handleQuoteFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Add UTM parameters
        const urlParams = new URLSearchParams(window.location.search);
        data.utm_source = urlParams.get('utm_source') || '';
        data.utm_campaign = urlParams.get('utm_campaign') || '';
        data.page_url = window.location.href;
        
        // Ensure action and security are set
        data.action = 'submit_quote';
        data.security = totalsparkAjax.nonce;
        
        // Track form completion
        trackQuoteCompleted(data);
        
        // Submit via AJAX
        jQuery.ajax({
            url: totalsparkAjax.ajaxurl,
            type: 'POST',
            data: data,
            success: function(response) {
                if (response.success) {
                    document.getElementById('ts-form-success').style.display = 'block';
                    form.style.display = 'none';
                } else {
                    document.getElementById('ts-form-error').style.display = 'block';
                }
            },
            error: function() {
                document.getElementById('ts-form-error').style.display = 'block';
            }
        });
    }
    
    /**
     * Extract city from page content
     */
    function extractCityFromPage() {
        const cityElement = document.querySelector('[data-gtm-city]');
        if (cityElement) {
            return cityElement.getAttribute('data-gtm-city');
        }
        
        // Fallback: extract from URL or title
        const title = document.title;
        const cityMatch = title.match(/(?:in|for)\s+([A-Za-z\s]+?)(?:\s*[|\-]|$)/);
        return cityMatch ? cityMatch[1].trim() : 'Unknown';
    }
    
    /**
     * Extract service from page content
     */
    function extractServiceFromPage() {
        const serviceElement = document.querySelector('[data-gtm-service]');
        if (serviceElement) {
            return serviceElement.getAttribute('data-gtm-service');
        }
        
        // Fallback: extract from title
        const title = document.title;
        if (title.includes('End of Tenancy')) return 'End of Tenancy Cleaning';
        if (title.includes('Deep Cleaning')) return 'Deep Cleaning';
        if (title.includes('Commercial')) return 'Commercial Cleaning';
        if (title.includes('Carpet')) return 'Carpet & Upholstery';
        return 'Cleaning Services';
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initAnalytics();
        setupEventListeners();
    });
    
    // Export functions for global access
    window.TotalSparkAnalytics = {
        trackPageView: trackPageView,
        trackFormSubmit: trackFormSubmit,
        trackCallClick: trackCallClick,
        trackWhatsAppClick: trackWhatsAppClick,
        trackQuoteStarted: trackQuoteStarted,
        trackQuoteCompleted: trackQuoteCompleted
    };
    
})();