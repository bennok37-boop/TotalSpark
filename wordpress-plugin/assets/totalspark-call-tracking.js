/**
 * TotalSpark Call Tracking - WordPress Dynamic Number Insertion
 * Converts React call tracking to WordPress-compatible vanilla JS
 */

(function() {
    'use strict';
    
    // Tracking number mapping (configure based on your setup)
    const trackingNumbers = {
        // City-specific numbers
        'newcastle-upon-tyne': '03300 435459',
        'sunderland': '03300 435459',
        'durham': '03300 435459',
        'middlesbrough': '03300 435459',
        'gateshead': '03300 435459',
        'hartlepool': '03300 435459',
        'stockton-on-tees': '03300 435459',
        'south-shields': '03300 435459',
        
        // Service-specific numbers (optional)
        'end-of-tenancy': '03300 435459',
        'deep-cleaning': '03300 435459',
        'commercial-cleaning': '03300 435459',
        'carpet-cleaning': '03300 435459',
        
        // Default fallback
        'default': '03300 435459'
    };
    
    const config = {
        fallbackNumber: '03300 435459',
        trackingNumbers: trackingNumbers
    };
    
    let currentTrackingNumber = config.fallbackNumber;
    
    /**
     * Initialize call tracking
     */
    function initializeCallTracking() {
        // Get current context for number assignment
        const currentCity = extractCityFromURL();
        const currentService = extractServiceFromURL();
        const utmSource = getURLParameter('utm_source');
        
        // Assign tracking number based on context
        const contextKey = `${currentCity}_${currentService}`;
        const trackingNumber = config.trackingNumbers[contextKey] 
            || config.trackingNumbers[currentCity]
            || config.trackingNumbers[currentService]
            || config.trackingNumbers['default']
            || config.fallbackNumber;
        
        currentTrackingNumber = trackingNumber;
        
        // Update all phone numbers on page
        updatePhoneNumbers();
        
        // Track number assignment in GTM
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'dynamic_number_assigned',
                tracking_number: trackingNumber,
                city: currentCity,
                service: currentService,
                utm_source: utmSource,
                page_location: window.location.href
            });
        }
        
        console.log('CallRail Tracking:', {
            route: window.location.pathname,
            selectedNumber: trackingNumber,
            ruleName: contextKey || 'Default',
            ruleType: 'location',
            consentGranted: true
        });
    }
    
    /**
     * Update all phone numbers on the page
     */
    function updatePhoneNumbers() {
        // Update elements with data-dynamic-phone attribute
        const phoneElements = document.querySelectorAll('[data-dynamic-phone]');
        
        phoneElements.forEach(function(element) {
            // Update text content
            if (element.textContent.includes('03300') || element.textContent.includes('0330')) {
                element.textContent = element.textContent.replace(/0330[0-9\s]+/g, currentTrackingNumber);
            } else if (element.textContent.trim() === '' || element.getAttribute('data-dynamic-phone') !== '') {
                element.textContent = currentTrackingNumber;
            }
            
            // Update href for links
            if (element.tagName === 'A' && element.href.includes('tel:')) {
                element.href = 'tel:' + currentTrackingNumber.replace(/\s/g, '');
            }
            
            // Update value for inputs
            if (element.tagName === 'INPUT') {
                element.value = currentTrackingNumber;
            }
            
            // Update data attribute
            element.setAttribute('data-dynamic-phone', currentTrackingNumber);
        });
        
        // Update any hardcoded phone numbers in content
        updateHardcodedNumbers();
    }
    
    /**
     * Update hardcoded phone numbers in text content
     */
    function updateHardcodedNumbers() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            if (node.textContent.includes('03300 435459') || node.textContent.includes('0330 435 459')) {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(function(node) {
            node.textContent = node.textContent
                .replace(/03300\s*435\s*459/g, currentTrackingNumber)
                .replace(/0330\s*435\s*459/g, currentTrackingNumber);
        });
    }
    
    /**
     * Extract city from URL
     */
    function extractCityFromURL() {
        const path = window.location.pathname.toLowerCase();
        
        // Check for city-specific pages
        for (const city in config.trackingNumbers) {
            if (path.includes(city.replace(/\s+/g, '-').toLowerCase())) {
                return city;
            }
        }
        
        // Extract from URL patterns
        const cityMatch = path.match(/\/(?:cleaning-)?([a-z-]+?)(?:\/|$)/);
        return cityMatch ? cityMatch[1] : 'general';
    }
    
    /**
     * Extract service from URL
     */
    function extractServiceFromURL() {
        const path = window.location.pathname.toLowerCase();
        
        if (path.includes('end-of-tenancy')) return 'end-of-tenancy';
        if (path.includes('deep-cleaning')) return 'deep-cleaning';
        if (path.includes('commercial')) return 'commercial-cleaning';
        if (path.includes('carpet')) return 'carpet-cleaning';
        
        return 'general-cleaning';
    }
    
    /**
     * Get URL parameter
     */
    function getURLParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    /**
     * Track call click
     */
    function trackCallClick(element) {
        const phoneNumber = element.getAttribute('data-dynamic-phone') || currentTrackingNumber;
        const city = extractCityFromURL();
        const service = extractServiceFromURL();
        
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'call_click',
                phone_number: phoneNumber,
                city: city,
                service: service,
                element_text: element.textContent.trim(),
                page_location: window.location.href
            });
        }
    }
    
    /**
     * Set up call tracking event listeners
     */
    function setupCallTrackingListeners() {
        // Track clicks on phone links
        document.addEventListener('click', function(e) {
            const element = e.target.closest('a[href^="tel:"], [data-dynamic-phone]');
            if (element) {
                trackCallClick(element);
            }
        });
    }
    
    /**
     * Update numbers when page content changes (for AJAX/dynamic content)
     */
    function observeContentChanges() {
        const observer = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldUpdate = true;
                }
            });
            
            if (shouldUpdate) {
                setTimeout(updatePhoneNumbers, 100); // Small delay to ensure content is rendered
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeCallTracking();
        setupCallTrackingListeners();
        observeContentChanges();
    });
    
    // Export for global access
    window.TotalSparkCallTracking = {
        updatePhoneNumbers: updatePhoneNumbers,
        getCurrentNumber: function() { return currentTrackingNumber; },
        setTrackingNumber: function(number) {
            currentTrackingNumber = number;
            updatePhoneNumbers();
        }
    };
    
})();