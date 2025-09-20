// Lead Tracking System for Weekly Review
// Simple leads sheet with date, source, city page, service, value, won/lost

export interface Lead {
  id: string;
  date: string;
  source: string;
  city_page: string;
  service: string;
  value: number;
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost';
  notes?: string;
  contact_method: 'phone' | 'whatsapp' | 'email' | 'form';
  utm_data?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  created_at: string;
  updated_at: string;
}

const LEADS_STORAGE_KEY = 'totalspark_leads_tracker';

export class LeadTracker {
  private leads: Lead[] = [];

  constructor() {
    this.loadLeads();
  }

  private loadLeads() {
    const stored = localStorage.getItem(LEADS_STORAGE_KEY);
    if (stored) {
      try {
        this.leads = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading leads:', error);
        this.leads = [];
      }
    }
  }

  private saveLeads() {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(this.leads));
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 5);
  }

  private extractUTMData(): Lead['utm_data'] {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source') || undefined,
      medium: params.get('utm_medium') || undefined,
      campaign: params.get('utm_campaign') || undefined,
      term: params.get('utm_term') || undefined,
      content: params.get('utm_content') || undefined,
    };
  }

  addLead(leadData: {
    source: string;
    city_page: string;
    service: string;
    value: number;
    contact_method: Lead['contact_method'];
    notes?: string;
  }): Lead {
    const now = new Date().toISOString();
    const lead: Lead = {
      id: this.generateId(),
      date: new Date().toLocaleDateString('en-GB'),
      source: leadData.source,
      city_page: leadData.city_page,
      service: leadData.service,
      value: leadData.value,
      status: 'new',
      notes: leadData.notes,
      contact_method: leadData.contact_method,
      utm_data: this.extractUTMData(),
      created_at: now,
      updated_at: now
    };

    this.leads.unshift(lead); // Add to beginning for chronological order
    this.saveLeads();

    // Push to GTM for analytics
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'lead_added',
        lead_id: lead.id,
        source: lead.source,
        city_page: lead.city_page,
        service: lead.service,
        value: lead.value,
        contact_method: lead.contact_method,
        utm_source: lead.utm_data?.source,
        utm_medium: lead.utm_data?.medium,
        utm_campaign: lead.utm_data?.campaign
      });
    }

    return lead;
  }

  updateLeadStatus(leadId: string, status: Lead['status'], notes?: string) {
    const lead = this.leads.find(l => l.id === leadId);
    if (lead) {
      lead.status = status;
      lead.updated_at = new Date().toISOString();
      if (notes) {
        lead.notes = notes;
      }
      this.saveLeads();

      // Track status change
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'lead_status_updated',
          lead_id: leadId,
          old_status: lead.status,
          new_status: status,
          lead_value: lead.value
        });
      }
    }
  }

  getWeeklyLeads(): Lead[] {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return this.leads.filter(lead => 
      new Date(lead.created_at) >= oneWeekAgo
    );
  }

  getLeadsByStatus(status: Lead['status']): Lead[] {
    return this.leads.filter(lead => lead.status === status);
  }

  getLeadsByCity(city: string): Lead[] {
    return this.leads.filter(lead => 
      lead.city_page.toLowerCase().includes(city.toLowerCase())
    );
  }

  getLeadsByService(service: string): Lead[] {
    return this.leads.filter(lead => 
      lead.service.toLowerCase().includes(service.toLowerCase())
    );
  }

  getWeeklyStats(): {
    total_leads: number;
    total_value: number;
    conversion_rate: number;
    leads_by_source: Record<string, number>;
    leads_by_city: Record<string, number>;
    leads_by_service: Record<string, number>;
  } {
    const weeklyLeads = this.getWeeklyLeads();
    const wonLeads = weeklyLeads.filter(lead => lead.status === 'won');

    const sourceStats: Record<string, number> = {};
    const cityStats: Record<string, number> = {};
    const serviceStats: Record<string, number> = {};

    weeklyLeads.forEach(lead => {
      sourceStats[lead.source] = (sourceStats[lead.source] || 0) + 1;
      cityStats[lead.city_page] = (cityStats[lead.city_page] || 0) + 1;
      serviceStats[lead.service] = (serviceStats[lead.service] || 0) + 1;
    });

    return {
      total_leads: weeklyLeads.length,
      total_value: wonLeads.reduce((sum, lead) => sum + lead.value, 0),
      conversion_rate: weeklyLeads.length > 0 ? (wonLeads.length / weeklyLeads.length) * 100 : 0,
      leads_by_source: sourceStats,
      leads_by_city: cityStats,
      leads_by_service: serviceStats
    };
  }

  exportCSV(): string {
    const headers = ['Date', 'Source', 'City Page', 'Service', 'Value', 'Status', 'Contact Method', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'Notes'];
    
    const rows = this.leads.map(lead => [
      lead.date,
      lead.source,
      lead.city_page,
      lead.service,
      lead.value.toString(),
      lead.status,
      lead.contact_method,
      lead.utm_data?.source || '',
      lead.utm_data?.medium || '',
      lead.utm_data?.campaign || '',
      lead.notes || ''
    ]);

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(','))
      .join('\n');
  }

  getAllLeads(): Lead[] {
    return [...this.leads];
  }
}

// Global instance
let leadTracker: LeadTracker | null = null;

export const getLeadTracker = (): LeadTracker => {
  if (!leadTracker) {
    leadTracker = new LeadTracker();
  }
  return leadTracker;
};

// Convenience functions
export const addLead = (leadData: Parameters<LeadTracker['addLead']>[0]) => {
  return getLeadTracker().addLead(leadData);
};

export const updateLeadStatus = (leadId: string, status: Lead['status'], notes?: string) => {
  getLeadTracker().updateLeadStatus(leadId, status, notes);
};

export const getWeeklyStats = () => {
  return getLeadTracker().getWeeklyStats();
};