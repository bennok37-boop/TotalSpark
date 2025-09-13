// Adapter layer to integrate React form with pricing engine and HighLevel
import { QuoteInput, QuoteResult, SavedQuote, computeQuote, formatMoney } from './pricingEngine';

// Current React form data interface (from QuoteForm.tsx)
export interface ReactFormData {
  // Contact details
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  additionalDetails: string;
  
  // Service details
  service: "endOfTenancy" | "deep" | "commercial" | "carpets" | "";
  bedrooms: "studio" | "1" | "2" | "3" | "4" | "5plus" | "";
  bathrooms: number;
  toilets: number;
  livingRooms: number;
  area_m2: number;
  
  // Enhanced property factors
  propertyType: "flat" | "terraced" | "semi" | "detached" | "maisonette" | "townhouse" | "";
  condition: "light" | "standard" | "heavy" | "veryheavy" | "";
  secondKitchen: boolean;
  internalStairs: boolean;
  furnished: boolean;
  occupied: boolean;
  hmoRooms: number;
  wasteBags: number;
  
  // Commercial enhancements
  commercialType: "office" | "retail" | "education" | "healthcare" | "hospitality" | "afterbuilders" | "";
  commercialRooms: number;
  commercialToilets: number;
  
  // Carpet items
  carpetRooms: number;
  stairs: number;
  sofa2: number;
  sofa3: number;
  armchair: number;
  mattress: number;
  
  // Add-ons
  oven: boolean;
  fridge: boolean;
  windows: number;
  cabinets: boolean;
  limescale: boolean;
  addOnCarpets: boolean;
  addOnUpholstery: boolean;
  
  // Modifiers
  urgent: boolean;
  weekend: boolean;
  stairsNoLift: boolean;
  
  // Pricing
  bundleCarpetsWithEoT: boolean;
  vat: boolean;
  
  // Job Images
  jobImages: string[];
}

// Service name mapping between React form and pricing engine
const serviceNameMap: Record<string, string> = {
  'endOfTenancy': 'End of Tenancy Cleaning',
  'deep': 'Deep Cleaning',
  'commercial': 'Commercial/Office Cleaning',
  'carpets': 'Carpet & Upholstery Cleaning'
};

// Convert React form data to pricing engine input format
export function convertReactFormToPricingInput(formData: ReactFormData): QuoteInput {
  const service = serviceNameMap[formData.service] || formData.service;
  
  const input: QuoteInput = {
    service,
    property_type: formData.propertyType,
    condition: formData.condition,
    bedrooms: formData.bedrooms,
    bathrooms: formData.bathrooms,
    toilets: formData.toilets,
    living_rooms: formData.livingRooms,
    second_kitchen: formData.secondKitchen,
    internal_stairs: formData.internalStairs,
    furnished: formData.furnished,
    occupied: formData.occupied,
    hmo_rooms: formData.hmoRooms,
    waste_bags: formData.wasteBags,
    add_oven: formData.oven,
    add_fridge: formData.fridge,
    add_cabinets: formData.cabinets,
    add_limescale: formData.limescale,
    add_carpet: formData.addOnCarpets,
    add_upholstery: formData.addOnUpholstery,
    windows_count: formData.windows,
    urgent: formData.urgent,
    weekend: formData.weekend,
    above_2nd_no_lift: formData.stairsNoLift,
    address_full: formData.address,
    postcode: formData.postcode,
    notes: formData.additionalDetails
  };

  // Commercial specific fields
  if (formData.service === 'commercial') {
    input.commercial_type = formData.commercialType;
    input.area_m2 = formData.area_m2;
    input.rooms_count = formData.commercialRooms;
  }

  // Carpet & upholstery specific fields
  if (formData.service === 'carpets') {
    input.cu = {
      carpet_rooms: formData.carpetRooms,
      stairs: formData.stairs,
      rugs: 0, // Removed from React form but kept for pricing engine compatibility
      sofa2: formData.sofa2,
      sofa3: formData.sofa3,
      armchairs: formData.armchair,
      mattresses: formData.mattress
    };
  }

  return input;
}

// Enhanced quote result that includes both pricing engine data and additional metadata
export interface EnhancedQuoteResult extends QuoteResult {
  id: string;
  createdAt: string;
  estimateRange: {
    low: number;
    high: number;
  };
  scheduling: {
    crew: number;
    durationHours: number | null;
  };
  contact?: {
    name: string;
    email: string;
    phone: string;
  };
  address?: string;
  postcode?: string;
}

// Main quote computation function for React integration
export function computeReactQuote(formData: ReactFormData): EnhancedQuoteResult {
  const pricingInput = convertReactFormToPricingInput(formData);
  const result = computeQuote(pricingInput);
  
  const quoteId = `TS-${Date.now()}`;
  
  return {
    ...result,
    id: quoteId,
    createdAt: new Date().toISOString(),
    estimateRange: {
      low: result.low,
      high: result.high
    },
    scheduling: {
      crew: result.crew,
      durationHours: result.duration
    },
    contact: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    },
    address: formData.address,
    postcode: formData.postcode
  };
}

// localStorage persistence functions
export class QuoteStorage {
  private static readonly QUOTE_KEY_PREFIX = 'TS_QUOTE_';
  private static readonly LAST_QUOTE_KEY = 'TS_QUOTE_LAST';

  static saveQuote(quote: SavedQuote): void {
    try {
      localStorage.setItem(`${this.QUOTE_KEY_PREFIX}${quote.id}`, JSON.stringify(quote));
      localStorage.setItem(this.LAST_QUOTE_KEY, quote.id);
    } catch (error) {
      console.warn('Failed to save quote to localStorage:', error);
    }
  }

  static getQuote(quoteId: string): SavedQuote | null {
    try {
      const stored = localStorage.getItem(`${this.QUOTE_KEY_PREFIX}${quoteId}`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to retrieve quote from localStorage:', error);
      return null;
    }
  }

  static getLastQuote(): SavedQuote | null {
    try {
      const lastId = localStorage.getItem(this.LAST_QUOTE_KEY);
      return lastId ? this.getQuote(lastId) : null;
    } catch (error) {
      console.warn('Failed to retrieve last quote from localStorage:', error);
      return null;
    }
  }

  static createSavedQuote(formData: ReactFormData, quoteResult: EnhancedQuoteResult): SavedQuote {
    return {
      id: quoteResult.id,
      createdAt: quoteResult.createdAt,
      contact: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      address: formData.address,
      postcode: formData.postcode,
      serviceData: convertReactFormToPricingInput(formData),
      estimate: {
        low: quoteResult.low,
        high: quoteResult.high,
        subtotal: quoteResult.subtotal,
        crew: quoteResult.crew,
        duration: quoteResult.duration
      },
      resumeUrl: `${window.location.origin}${window.location.pathname}?qid=${encodeURIComponent(quoteResult.id)}`
    };
  }
}

// HighLevel (GHL) integration stubs - ready for future implementation
export class GHLIntegration {
  private static readonly GHL_CONFIG = {
    webhookUrl: '', // To be configured later
    calendarUrl: '#', // GHL calendar link
    depositUrl: '#', // GHL payment link
    contactFormId: '', // GHL form ID
    opportunityPipelineId: '', // GHL pipeline
    opportunityStageId: '' // GHL stage
  };

  // Stub: Push quote data to HighLevel
  static async pushQuoteToGHL(quote: SavedQuote): Promise<{ success: boolean; ghlId?: string; error?: string }> {
    // NO-OP for now - ready for GHL webhook integration
    console.log('GHL Push Stub - Quote ready for submission:', {
      quoteId: quote.id,
      contact: quote.contact,
      estimate: quote.estimate,
      service: quote.serviceData.service
    });

    // Simulate async operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          ghlId: `ghl_${quote.id}_${Date.now()}` 
        });
      }, 100);
    });
  }

  // Stub: Create GHL contact
  static async createGHLContact(contact: SavedQuote['contact'], address: string, postcode: string): Promise<{ success: boolean; contactId?: string }> {
    console.log('GHL Contact Stub - Ready to create:', { contact, address, postcode });
    return { success: true, contactId: `contact_${Date.now()}` };
  }

  // Stub: Create GHL opportunity/lead
  static async createGHLOpportunity(quote: SavedQuote): Promise<{ success: boolean; opportunityId?: string }> {
    console.log('GHL Opportunity Stub - Ready to create:', {
      value: quote.estimate.high,
      service: quote.serviceData.service,
      contact: quote.contact
    });
    return { success: true, opportunityId: `opp_${Date.now()}` };
  }

  // Get booking calendar URL (placeholder)
  static getCalendarUrl(): string {
    return this.GHL_CONFIG.calendarUrl;
  }

  // Get deposit/payment URL (placeholder)  
  static getDepositUrl(): string {
    return this.GHL_CONFIG.depositUrl;
  }
}

// Export utility functions
export { formatMoney };

// Export configuration for easy updates
export const adapterConfig = {
  estimateBand: 0.10, // ±10%
  autoSave: true, // Auto-save quotes to localStorage
  debugMode: process.env.NODE_ENV === 'development'
};