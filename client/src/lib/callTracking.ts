// Dynamic Number Insertion for Call Tracking
// Integrates with CallRail and custom analytics

interface DynamicNumberConfig {
  fallbackNumber: string;
  callrailCompanyId?: string;
  trackingNumbers: Record<string, string>; // city/service -> tracking number mapping
}

export class CallTracker {
  private config: DynamicNumberConfig;
  private currentTrackingNumber: string;
  
  constructor(config: DynamicNumberConfig) {
    this.config = config;
    this.currentTrackingNumber = config.fallbackNumber;
    this.initializeTracking();
  }

  private initializeTracking() {
    // Get current context for number assignment
    const currentCity = this.extractCityFromURL();
    const currentService = this.extractServiceFromURL();
    const utmSource = new URLSearchParams(window.location.search).get('utm_source');
    
    // Assign tracking number based on context
    const contextKey = `${currentCity}_${currentService}`;
    const trackingNumber = this.config.trackingNumbers[contextKey] 
      || this.config.trackingNumbers[currentCity]
      || this.config.trackingNumbers['default']
      || this.config.fallbackNumber;

    this.currentTrackingNumber = trackingNumber;
    
    // Update all phone numbers on page
    this.updatePhoneNumbers();
    
    // Track number assignment
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
  }

  private extractCityFromURL(): string {
    const path = window.location.pathname;
    const cityMatch = path.match(/\/cleaning\/([a-zA-Z-]+)/);
    return cityMatch ? cityMatch[1] : 'general';
  }

  private extractServiceFromURL(): string {
    const path = window.location.pathname;
    if (path.includes('end-of-tenancy')) return 'end-of-tenancy';
    if (path.includes('deep-cleaning')) return 'deep';
    if (path.includes('commercial')) return 'commercial';
    if (path.includes('carpet')) return 'carpet';
    return 'general';
  }

  private updatePhoneNumbers() {
    // DOM manipulation disabled - React components handle phone numbers via useTrackingNumbers hook
    // This prevents conflicts between DOM mutation and React state management
    console.log('CallTracker: DOM phone number updates disabled - using React tracking system');
  }

  getCurrentNumber(): string {
    return this.currentTrackingNumber;
  }

  trackCall(source: string, additionalData?: Record<string, any>) {
    const city = this.extractCityFromURL();
    const service = this.extractServiceFromURL();
    
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'call_click',
        phone_number: this.currentTrackingNumber,
        call_source: source,
        city,
        service_type: service,
        is_dynamic_number: true,
        page_location: window.location.href,
        ...additionalData
      });
    }
  }

  // Method to be called when phone is clicked
  handlePhoneClick(source: string, element?: HTMLElement) {
    this.trackCall(source, {
      element_id: element?.id,
      element_class: element?.className
    });
    
    // Small delay to ensure tracking fires before navigation
    setTimeout(() => {
      window.location.href = `tel:${this.currentTrackingNumber.replace(/\s/g, '')}`;
    }, 150);
  }
}

// Initialize call tracker
let callTracker: CallTracker | null = null;

export const initializeCallTracking = (config: DynamicNumberConfig) => {
  callTracker = new CallTracker(config);
  return callTracker;
};

export const getCallTracker = (): CallTracker | null => {
  return callTracker;
};

// Helper function for components
export const trackPhoneClick = (source: string, element?: HTMLElement) => {
  if (callTracker) {
    callTracker.handlePhoneClick(source, element);
  } else {
    // Fallback if call tracker not initialized
    window.location.href = `tel:${document.querySelector('[data-dynamic-phone]')?.textContent || '03300432115'}`;
  }
};