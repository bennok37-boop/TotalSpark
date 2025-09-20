// GTM-first analytics for TotalSpark Solutions
// Centralized measurement with specific GA4 events: form_submit, call_click, whatsapp_click, quote_started, quote_completed, chat_open

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

// GTM-first initialization (non-negotiable)
export const initAnalytics = (hasConsent: boolean = true) => {
  const gtmId = import.meta.env.VITE_GTM_ID;

  if (!gtmId) {
    console.error('GTM ID is required. Add VITE_GTM_ID to environment variables.');
    return;
  }

  if (!hasConsent) {
    console.log('GTM initialization delayed - awaiting user consent');
    return;
  }

  initGTM(gtmId);
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

// Specific GA4 events as requested: form_submit, call_click, whatsapp_click, quote_started, quote_completed, chat_open

// Quote flow tracking
export const trackQuoteStarted = (data: {
  service_type: string;
  city: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}) => {
  trackEvent('quote_started', {
    service_type: data.service_type,
    city: data.city,
    page_location: window.location.href,
    source: data.source || 'website',
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign
  });
};

export const trackQuoteCompleted = (data: {
  service_type: string;
  city: string;
  property_type: string;
  bedrooms?: number;
  estimated_value: number;
  form_id: string;
}) => {
  trackEvent('quote_completed', {
    service_type: data.service_type,
    city: data.city,
    property_type: data.property_type,
    bedrooms: data.bedrooms,
    value: data.estimated_value,
    currency: 'GBP',
    form_id: data.form_id,
    page_location: window.location.href
  });
};

export const trackFormSubmit = (data: {
  form_name: string;
  form_id: string;
  service_type?: string;
  city?: string;
  lead_value?: number;
}) => {
  trackEvent('form_submit', {
    form_name: data.form_name,
    form_id: data.form_id,
    service_type: data.service_type,
    city: data.city,
    value: data.lead_value,
    currency: 'GBP',
    page_location: window.location.href
  });
};

// Call tracking with dynamic number insertion support
export const trackCallClick = (data: {
  phone_number: string;
  call_source: string;
  city?: string;
  service_type?: string;
  is_dynamic_number?: boolean;
}) => {
  trackEvent('call_click', {
    phone_number: data.phone_number,
    call_source: data.call_source,
    city: data.city || 'unknown',
    service_type: data.service_type,
    is_dynamic_number: data.is_dynamic_number || false,
    page_location: window.location.href
  });
};

export const trackWhatsAppClick = (data: {
  click_source: string;
  city?: string;
  service_type?: string;
}) => {
  trackEvent('whatsapp_click', {
    click_source: data.click_source,
    city: data.city || 'unknown',
    service_type: data.service_type,
    page_location: window.location.href
  });
};

export const trackChatOpen = (data: {
  chat_type: 'whatsapp' | 'phone' | 'email';
  trigger_source: string;
  city?: string;
  service_type?: string;
}) => {
  trackEvent('chat_open', {
    chat_type: data.chat_type,
    trigger_source: data.trigger_source,
    city: data.city || 'unknown',
    service_type: data.service_type,
    page_location: window.location.href
  });
};

// Social media tracking
export const trackSocialClick = (platform: 'facebook' | 'instagram' | 'linkedin') => {
  trackEvent('social_click', {
    platform,
    click_location: 'footer',
    page_location: window.location.href
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

// UTM parameter extraction for internal tracking
export const getUTMParameters = (): Record<string, string> => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_term: urlParams.get('utm_term') || '',
    utm_content: urlParams.get('utm_content') || ''
  };
};

// Lead tracking for weekly review system
export interface LeadData {
  date: string;
  source: string;
  city_page: string;
  service: string;
  value: number;
  status: 'new' | 'contacted' | 'won' | 'lost';
  utm_parameters?: Record<string, string>;
}

export const trackLead = (leadData: LeadData) => {
  // Store lead in localStorage for weekly review
  const leads = JSON.parse(localStorage.getItem('totalspark_leads') || '[]');
  const newLead = {
    ...leadData,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    utm_parameters: getUTMParameters()
  };
  
  leads.push(newLead);
  localStorage.setItem('totalspark_leads', JSON.stringify(leads));

  // Also push to GTM for immediate analytics
  trackEvent('lead_generated', {
    source: leadData.source,
    city_page: leadData.city_page,
    service: leadData.service,
    value: leadData.value,
    currency: 'GBP',
    ...leadData.utm_parameters
  });
};

// Weekly leads export for review
export const exportWeeklyLeads = (): LeadData[] => {
  const leads = JSON.parse(localStorage.getItem('totalspark_leads') || '[]');
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  return leads.filter((lead: LeadData & { timestamp: string }) => 
    new Date(lead.timestamp) >= oneWeekAgo
  );
};