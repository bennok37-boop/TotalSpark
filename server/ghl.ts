// GHL (LeadConnector) REST API integration
// Handles lead capture and opportunity creation server-side

interface GHLContact {
  firstName: string;
  email: string;
  phone: string;
  address1?: string;
  postalCode?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

interface GHLOpportunity {
  title: string;
  status: string;
  monetaryValue?: number;
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  notes?: string;
}

export class GHLApi {
  private static readonly API_BASE = 'https://services.leadconnectorhq.com';
  
  private static getHeaders() {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    
    if (!apiKey || !locationId) {
      throw new Error('GHL_API_KEY and GHL_LOCATION_ID environment variables are required');
    }
    
    return {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    };
  }

  // Create or update contact in GHL
  static async upsertContact(contactData: GHLContact): Promise<{ success: boolean; contactId?: string; error?: string }> {
    try {
      const locationId = process.env.GHL_LOCATION_ID;
      
      const response = await fetch(`${this.API_BASE}/contacts/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          ...contactData,
          locationId,
          source: 'website'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: `GHL API error: ${response.status} ${errorText}` };
      }

      const result = await response.json();
      return { success: true, contactId: result.contact?.id };
    } catch (error) {
      return { success: false, error: `Network error: ${error}` };
    }
  }

  // Create opportunity in GHL
  static async createOpportunity(opportunityData: GHLOpportunity): Promise<{ success: boolean; opportunityId?: string; error?: string }> {
    try {
      const locationId = process.env.GHL_LOCATION_ID;

      const response = await fetch(`${this.API_BASE}/opportunities/`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          ...opportunityData,
          locationId
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: `GHL API error: ${response.status} ${errorText}` };
      }

      const result = await response.json();
      return { success: true, opportunityId: result.opportunity?.id };
    } catch (error) {
      return { success: false, error: `Network error: ${error}` };
    }
  }

  // Submit lead (Step 1) - create contact
  static async submitLead(leadData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
  }): Promise<{ success: boolean; contactId?: string; error?: string }> {
    return this.upsertContact({
      firstName: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      address1: leadData.address,
      postalCode: leadData.postcode,
      tags: ['Website-Lead'],
      customFields: {
        lead_source: 'website',
        form_step: 'contact_details'
      }
    });
  }

  // Submit quote (Step 2) - create opportunity
  static async submitQuote(quoteData: {
    contactId: string;
    quoteId: string;
    serviceName: string;
    estimateLow: number;
    estimateHigh: number;
    quoteUrl: string;
  }): Promise<{ success: boolean; opportunityId?: string; error?: string }> {
    const pipelineId = process.env.GHL_PIPELINE_ID || '';
    const stageId = process.env.GHL_STAGE_ID || '';

    return this.createOpportunity({
      title: `${quoteData.serviceName} - ${quoteData.quoteId}`,
      status: 'open',
      monetaryValue: quoteData.estimateHigh,
      pipelineId,
      pipelineStageId: stageId,
      contactId: quoteData.contactId,
      notes: `Quote ${quoteData.quoteId} - ${quoteData.serviceName}\nEstimate: £${quoteData.estimateLow}-£${quoteData.estimateHigh}\nQuote URL: ${quoteData.quoteUrl}`
    });
  }
}