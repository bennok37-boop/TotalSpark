// GoHighLevel API service for lead capture and automation
export interface GHLContact {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  tags?: string[];
  source?: string;
  customFields?: Array<{
    id: string;
    value: string;
  }>;
  // Location/service specific fields
  city?: string;
  service?: string;
  propertyType?: string;
  bedrooms?: string;
  estimatedPrice?: string;
  message?: string;
}

export interface GHLFormSubmission {
  formData: Record<string, any>;
  locationId: string;
  formId?: string;
}

class GoHighLevelService {
  private apiKey: string;
  private locationId: string;
  private baseUrl = 'https://services.leadconnectorhq.com';
  private formSubmissionUrl = 'https://backend.leadconnectorhq.com/forms/submit';

  constructor() {
    this.apiKey = process.env.GHL_API_KEY || '';
    this.locationId = process.env.GHL_LOCATION_ID || '';
    
    if (!this.apiKey || !this.locationId) {
      console.warn('GHL credentials not found. Lead capture will be disabled.');
    }
  }

  /**
   * Create or update a contact in GoHighLevel
   */
  async createContact(contactData: GHLContact): Promise<{ success: boolean; contactId?: string; error?: string }> {
    if (!this.apiKey || !this.locationId) {
      console.warn('GHL not configured - contact creation skipped');
      return { success: false, error: 'GHL not configured' };
    }

    try {
      // Prepare contact data for GHL API
      const ghlContact = {
        email: contactData.email,
        phone: contactData.phone,
        firstName: contactData.firstName || contactData.name?.split(' ')[0] || 'Unknown',
        lastName: contactData.lastName || contactData.name?.split(' ').slice(1).join(' ') || '',
        tags: contactData.tags || ['website-lead'],
        source: contactData.source || 'website',
        customFields: [
          ...(contactData.customFields || []),
          // Add service-specific custom fields
          ...(contactData.city ? [{ id: 'city', value: contactData.city }] : []),
          ...(contactData.service ? [{ id: 'service', value: contactData.service }] : []),
          ...(contactData.propertyType ? [{ id: 'property_type', value: contactData.propertyType }] : []),
          ...(contactData.bedrooms ? [{ id: 'bedrooms', value: contactData.bedrooms }] : []),
          ...(contactData.estimatedPrice ? [{ id: 'estimated_price', value: contactData.estimatedPrice }] : []),
          ...(contactData.message ? [{ id: 'message', value: contactData.message }] : [])
        ]
      };

      console.log('Creating GHL contact:', { email: ghlContact.email, phone: ghlContact.phone, source: ghlContact.source });

      const response = await fetch(`${this.baseUrl}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify(ghlContact)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GHL contact creation failed:', response.status, errorText);
        return { success: false, error: `API Error: ${response.status}` };
      }

      const result = await response.json();
      console.log('GHL contact created successfully:', result.contact?.id);

      return { 
        success: true, 
        contactId: result.contact?.id 
      };
    } catch (error) {
      console.error('Error creating GHL contact:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Submit form data directly to GoHighLevel form endpoint
   */
  async submitForm(formData: Record<string, any>, formId?: string): Promise<{ success: boolean; error?: string }> {
    if (!this.locationId) {
      console.warn('GHL not configured - form submission skipped');
      return { success: false, error: 'GHL not configured' };
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append('formData', JSON.stringify(formData));
      formDataObj.append('locationId', this.locationId);
      
      if (formId) {
        formDataObj.append('formId', formId);
      }

      console.log('Submitting form to GHL:', { locationId: this.locationId, formId });

      const response = await fetch(this.formSubmissionUrl, {
        method: 'POST',
        body: formDataObj
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('GHL form submission failed:', response.status, errorText);
        return { success: false, error: `Form submission failed: ${response.status}` };
      }

      console.log('GHL form submitted successfully');
      return { success: true };
    } catch (error) {
      console.error('Error submitting GHL form:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Process quote request and create lead in GHL
   */
  async processQuoteRequest(quoteData: {
    email: string;
    phone?: string;
    name?: string;
    city?: string;
    service?: string;
    propertyType?: string;
    bedrooms?: string;
    estimatedPrice?: number;
    message?: string;
    source?: string;
  }): Promise<{ success: boolean; contactId?: string; error?: string }> {
    
    // Extract first and last name
    const nameParts = quoteData.name?.split(' ') || [];
    const firstName = nameParts[0] || 'Unknown';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create contact data
    const contactData: GHLContact = {
      email: quoteData.email,
      phone: quoteData.phone,
      firstName,
      lastName,
      tags: ['quote-request', 'website-lead'],
      source: quoteData.source || 'website-quote-form',
      city: quoteData.city,
      service: quoteData.service,
      propertyType: quoteData.propertyType,
      bedrooms: quoteData.bedrooms,
      estimatedPrice: quoteData.estimatedPrice?.toString(),
      message: quoteData.message
    };

    return await this.createContact(contactData);
  }

  /**
   * Check if GHL is properly configured
   */
  isConfigured(): boolean {
    return !!(this.apiKey && this.locationId);
  }
}

export const ghlService = new GoHighLevelService();