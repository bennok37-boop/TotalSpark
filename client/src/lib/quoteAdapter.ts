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
    bundle_carpet_with_eot: formData.bundleCarpetsWithEoT,
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

// HighLevel Integration - Real form submission implementation
export class GHLIntegration {
  private static readonly GHL_CONFIG = {
    calendarUrl: 'https://api.leadconnectorhq.com/widget/booking/GYCm1m2uJm37cdGZ80c2', // GHL calendar link
    depositUrl: '#', // GHL payment link
  };

  // Submit lead capture form (Form A) - called on Step 1 Next
  static submitLeadForm(formData: { name: string; email: string; phone: string; address: string; postcode: string; region?: string; city?: string }): void {
    const form = document.getElementById('ghl-form-lead') as HTMLFormElement;
    if (!form) {
      console.error('GHL lead form not found');
      return;
    }

    // Populate form fields
    const setFormValue = (selector: string, value: string) => {
      const element = form.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement;
      if (element) element.value = value || '';
    };

    setFormValue('input[name="first_name"]', formData.name);
    setFormValue('input[name="email"]', formData.email);
    setFormValue('input[name="phone"]', formData.phone);
    setFormValue('textarea[name="custom_values[address_full]"]', formData.address);
    setFormValue('input[name="custom_values[postcode]"]', formData.postcode);
    setFormValue('input[name="custom_values[region]"]', formData.region || '');
    setFormValue('input[name="custom_values[city_town]"]', formData.city || '');

    // Submit the form
    form.submit();
    console.log('GHL Lead form submitted:', formData);
  }

  // Replace the old pushQuoteToGHL with real form submission (Form B)
  static async pushQuoteToGHL(quote: SavedQuote): Promise<{ success: boolean; ghlId?: string; error?: string }> {
    try {
      const form = document.getElementById('ghl-form-quote') as HTMLFormElement;
      if (!form) {
        throw new Error('GHL quote form not found');
      }

      // Helper functions for form population
      const setFormValue = (selector: string, value: string | number | boolean, isCheckbox = false) => {
        const element = form.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement;
        if (!element) return;
        
        if (element.type === 'checkbox' || isCheckbox) {
          (element as HTMLInputElement).checked = !!value;
        } else {
          element.value = (value ?? '').toString();
        }
      };

      // Core quote data
      setFormValue('input[name="custom_values[quote_id]"]', quote.id);
      setFormValue('input[name="custom_values[price_low]"]', quote.estimate.low);
      setFormValue('input[name="custom_values[price_high]"]', quote.estimate.high);

      // Lock date (7 days from now)
      const lockDate = new Date();
      lockDate.setDate(lockDate.getDate() + 7);
      setFormValue('input[name="custom_values[lock_until]"]', lockDate.toISOString().split('T')[0]);

      // URLs
      setFormValue('input[name="custom_values[quote_url]"]', window.location.href);
      setFormValue('input[name="custom_values[resume_url]"]', quote.resumeUrl || window.location.href);

      // Contact details
      setFormValue('input[name="custom_values[address_full]"]', quote.address);
      setFormValue('input[name="custom_values[postcode]"]', quote.postcode);

      // Service details
      setFormValue('input[name="custom_values[service]"]', quote.serviceData.service);
      setFormValue('input[name="custom_values[property_type]"]', quote.serviceData.property_type || '');
      setFormValue('input[name="custom_values[bedrooms]"]', quote.serviceData.bedrooms || '');
      setFormValue('input[name="custom_values[bathrooms]"]', quote.serviceData.bathrooms || 1);
      setFormValue('input[name="custom_values[toilets]"]', quote.serviceData.toilets || 1);
      setFormValue('input[name="custom_values[condition]"]', quote.serviceData.condition || '');
      setFormValue('textarea[name="custom_values[notes_optional]"]', quote.serviceData.notes || '');

      // Property factors
      setFormValue('input[name="custom_values[second_kitchen]"]', quote.serviceData.second_kitchen ?? false, true);
      setFormValue('input[name="custom_values[internal_stairs]"]', quote.serviceData.internal_stairs ?? false, true);
      setFormValue('input[name="custom_values[furnished]"]', quote.serviceData.furnished ?? false, true);
      setFormValue('input[name="custom_values[occupied]"]', quote.serviceData.occupied ?? false, true);
      setFormValue('input[name="custom_values[hmo_rooms]"]', quote.serviceData.hmo_rooms || 0);
      setFormValue('input[name="custom_values[waste_bags]"]', quote.serviceData.waste_bags || 0);

      // Add-ons
      setFormValue('input[name="custom_values[add_oven]"]', quote.serviceData.add_oven ?? false, true);
      setFormValue('input[name="custom_values[add_fridge]"]', quote.serviceData.add_fridge ?? false, true);
      setFormValue('input[name="custom_values[add_cabinets]"]', quote.serviceData.add_cabinets ?? false, true);
      setFormValue('input[name="custom_values[add_limescale]"]', quote.serviceData.add_limescale ?? false, true);
      setFormValue('input[name="custom_values[add_carpet]"]', quote.serviceData.add_carpet ?? false, true);
      setFormValue('input[name="custom_values[add_upholstery]"]', quote.serviceData.add_upholstery ?? false, true);
      setFormValue('input[name="custom_values[windows_count]"]', quote.serviceData.windows_count || 0);
      setFormValue('input[name="custom_values[urgent]"]', quote.serviceData.urgent ?? false, true);
      setFormValue('input[name="custom_values[weekend]"]', quote.serviceData.weekend ?? false, true);
      setFormValue('input[name="custom_values[above_2nd_no_lift]"]', quote.serviceData.above_2nd_no_lift ?? false, true);

      // Commercial specific
      if (quote.serviceData.service === 'Commercial/Office Cleaning') {
        setFormValue('input[name="custom_values[commercial_type]"]', quote.serviceData.commercial_type || '');
        setFormValue('input[name="custom_values[area_m2]"]', quote.serviceData.area_m2 || 0);
        setFormValue('input[name="custom_values[rooms_count]"]', quote.serviceData.rooms_count || 0);
      }

      // Carpet & upholstery specific
      if (quote.serviceData.service === 'Carpet & Upholstery Cleaning') {
        setFormValue('input[name="custom_values[cu_carpet_rooms]"]', quote.serviceData.cu?.carpet_rooms || 0);
        setFormValue('input[name="custom_values[cu_stairs]"]', quote.serviceData.cu?.stairs || 0);
        setFormValue('input[name="custom_values[cu_rugs]"]', quote.serviceData.cu?.rugs || 0);
        setFormValue('input[name="custom_values[cu_sofa2]"]', quote.serviceData.cu?.sofa2 || 0);
        setFormValue('input[name="custom_values[cu_sofa3]"]', quote.serviceData.cu?.sofa3 || 0);
        setFormValue('input[name="custom_values[cu_armchairs]"]', quote.serviceData.cu?.armchairs || 0);
        setFormValue('input[name="custom_values[cu_mattresses]"]', quote.serviceData.cu?.mattresses || 0);
      }

      // Submit the form
      form.submit();
      
      console.log('GHL Quote form submitted successfully:', quote);
      
      return { 
        success: true, 
        ghlId: `ghl_${quote.id}_${Date.now()}` 
      };
    } catch (error) {
      console.error('Error submitting GHL quote form:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Get calendar URL for booking
  static getCalendarUrl(): string {
    return this.GHL_CONFIG.calendarUrl;
  }

  // Get deposit/payment URL  
  static getDepositUrl(): string {
    return this.GHL_CONFIG.depositUrl;
  }

  // Legacy methods kept for compatibility
  static async createGHLContact(contact: SavedQuote['contact'], address: string, postcode: string): Promise<{ success: boolean; contactId?: string }> {
    // This is now handled by submitLeadForm
    console.log('Contact creation handled by GHL lead form');
    return { success: true, contactId: `handled_by_form` };
  }

  static async createGHLOpportunity(quote: SavedQuote): Promise<{ success: boolean; opportunityId?: string }> {
    // This is now handled by pushQuoteToGHL
    console.log('Opportunity creation handled by GHL quote form');
    return { success: true, opportunityId: `handled_by_form` };
  }
}

// Export utility functions
export { formatMoney };

// Export configuration for easy updates
export const adapterConfig = {
  estimateBand: 0.10, // ±10%
  autoSave: true, // Auto-save quotes to localStorage
  debugMode: import.meta.env.DEV
};