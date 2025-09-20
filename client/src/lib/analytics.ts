// Google Analytics and GTM integration for TotalSpark Solutions
// GDPR-compliant analytics with consent gating

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface QueuedEvent {
  event: string;
  parameters: Record<string, any>;
}

// Queued events before consent/initialization
let eventQueue: QueuedEvent[] = [];
let analyticsInitialized = false;

// Initialize Google Tag Manager and GA4 with consent check
export const initAnalytics = (hasConsent: boolean = true) => {
  const gtmId = import.meta.env.VITE_GTM_ID;
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!gtmId && !gaId) {
    console.warn('No analytics IDs found. Add VITE_GTM_ID or VITE_GA_MEASUREMENT_ID to environment variables.');
    return;
  }

  if (!hasConsent) {
    console.log('Analytics initialization delayed - awaiting user consent');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  if (gtmId) {
    initGTM(gtmId);
  } else if (gaId) {
    initGA4Direct(gaId);
  }

  analyticsInitialized = true;

  // Track initial page view
  trackPageView(window.location.pathname, document.title);

  // Flush any queued events
  flushEventQueue();
};

// Initialize Google Tag Manager with proper CSP-safe approach
const initGTM = (gtmId: string) => {
  // Initialize dataLayer with GTM start
  window.dataLayer.push({'gtm.start': new Date().getTime(), event:'gtm.js'});
  
  // GTM script with external src (CSP-safe)
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  // GTM noscript fallback
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.appendChild(noscript);
};

// Initialize GA4 directly (if no GTM)
const initGA4Direct = (gaId: string) => {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}');
  `;
  document.head.appendChild(script2);

  // Set global gtag function
  window.gtag = window.gtag || function() {
    window.dataLayer.push(arguments);
  };
};

// Track page views for SPA navigation
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined') return;

  // Push to dataLayer for GTM
  window.dataLayer?.push({
    event: 'page_view',
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href
  });

  // Also send via gtag if available (for direct GA4)
  if (window.gtag) {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId) {
      window.gtag('config', gaId, {
        page_path: url,
        page_title: title
      });
    }
  }
};

// Flush queued events after consent/initialization
const flushEventQueue = () => {
  if (eventQueue.length > 0) {
    console.log(`Flushing ${eventQueue.length} queued analytics events`);
    eventQueue.forEach(({ event, parameters }) => {
      pushEvent(event, parameters);
    });
    eventQueue = [];
  }
};

// Internal event pusher
const pushEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;

  // Push to dataLayer for GTM (use direct event name)
  window.dataLayer?.push({
    event: eventName,
    ...parameters
  });

  // Also send via gtag if available
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Track custom events with consent-aware queuing
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (!analyticsInitialized) {
    // Queue event if analytics not initialized yet
    eventQueue.push({ event: eventName, parameters });
    return;
  }

  pushEvent(eventName, parameters);
};

// Cleaning service specific tracking functions with GA4 recommended events
export const trackQuoteRequest = (data: {
  service_type: string;
  city: string;
  property_type: string;
  bedrooms?: number;
  contact_method: string;
  estimated_price?: number;
}) => {
  trackEvent('generate_lead', {
    service_type: data.service_type,
    city: data.city,
    property_type: data.property_type,
    bedrooms: data.bedrooms,
    contact_method: data.contact_method,
    value: data.estimated_price,
    currency: 'GBP'
  });
};

// Fixed parameter signature for context tracking
export const trackPhoneCall = (phoneNumber: string, context: string, city?: string) => {
  // Reliable tracking for phone calls with navigation delay
  const eventCallback = () => {
    // Let the event fire before navigation
    setTimeout(() => {
      window.location.href = `tel:${phoneNumber}`;
    }, 100);
  };

  trackEvent('phone_call', {
    context,
    city: city || 'unknown',
    contact_method: 'phone',
    event_callback: eventCallback
  });
};

export const trackWhatsApp = (context: string, city?: string) => {
  trackEvent('whatsapp_click', {
    context,
    city: city || 'unknown',
    contact_method: 'whatsapp'
  });
};

export const trackSocialMedia = (platform: 'facebook' | 'instagram' | 'linkedin') => {
  trackEvent('social_click', {
    platform,
    location: 'footer'
  });
};

export const trackServiceView = (serviceName: string, city?: string) => {
  trackEvent('page_view', {
    service_name: serviceName,
    city: city || 'general',
    content_type: 'service_page'
  });
};

export const trackCityView = (cityName: string) => {
  trackEvent('page_view', {
    city: cityName,
    content_type: 'city_page'
  });
};

// Conversion tracking with GA4 recommended events
export const trackConversion = (conversionType: 'quote_submitted' | 'phone_call' | 'email_sent', value?: number) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: value,
    currency: 'GBP'
  });
};