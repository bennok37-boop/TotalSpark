// CallRail tracking number configuration
// This system allows different phone numbers to display based on:
// - Landing page routes
// - Campaign parameters (UTM, gclid, fbclid, etc.)
// - Traffic sources
// - Regional targeting

export interface CallRailRule {
  // Route pattern to match (supports exact match or startsWith)
  pattern: string;
  // Pool of tracking numbers to rotate through
  numbers: string[];
  // Optional: restrict to specific region
  region?: string;
  // Optional: rule name for tracking purposes
  name?: string;
}

export interface CampaignRule {
  // Campaign identifier
  campaign: string;
  // Pool of tracking numbers for this campaign
  numbers: string[];
  // Optional: rule name for tracking purposes  
  name?: string;
}

export interface TrafficSourceRule {
  // Traffic source identifier
  source: string;
  // Pool of tracking numbers for this source
  numbers: string[];
  // Optional: rule name for tracking purposes
  name?: string;
}

// Route-based tracking numbers - specific landing pages get specific numbers
export const ROUTE_RULES: CallRailRule[] = [
  // End of Tenancy pages
  {
    pattern: '/end-of-tenancy-cleaning',
    numbers: ['0191 743 9585', '0191 743 9620'],
    name: 'End of Tenancy - Main'
  },
  {
    pattern: '/cleaning/newcastle',
    numbers: ['0191 743 9585'],
    region: 'tyne-and-wear',
    name: 'Newcastle Landing'
  },
  
  // Commercial cleaning
  {
    pattern: '/commercial-cleaning',
    numbers: ['0191 822 5678', '0191 822 5679'],
    name: 'Commercial - Main'
  },
  
  // Deep cleaning
  {
    pattern: '/deep-cleaning',
    numbers: ['0191 823 9012', '0191 823 9013'],
    name: 'Deep Cleaning - Main'
  },
  
  // Carpet cleaning
  {
    pattern: '/carpet-upholstery-cleaning',
    numbers: ['01642 824 3456', '01642 824 3457'],
    name: 'Carpet Cleaning - Main'
  }
];

// Campaign-based tracking numbers - UTM campaigns get specific numbers
export const CAMPAIGN_RULES: CampaignRule[] = [
  // Google Ads campaigns
  {
    campaign: 'google_ads_end_tenancy',
    numbers: ['0191 825 1001', '0191 825 1002'],
    name: 'Google Ads - End of Tenancy'
  },
  {
    campaign: 'google_ads_commercial',
    numbers: ['0191 825 2001', '0191 825 2002'],
    name: 'Google Ads - Commercial'
  },
  {
    campaign: 'google_ads_deep_clean',
    numbers: ['0191 825 3001', '0191 825 3002'],
    name: 'Google Ads - Deep Clean'
  },
  
  // Facebook campaigns
  {
    campaign: 'facebook_end_tenancy',
    numbers: ['0191 826 1001', '0191 826 1002'],
    name: 'Facebook - End of Tenancy'
  },
  {
    campaign: 'facebook_commercial',
    numbers: ['0191 826 2001', '0191 826 2002'],
    name: 'Facebook - Commercial'
  }
];

// Traffic source-based tracking numbers - different sources get different pools
export const TRAFFIC_SOURCE_RULES: TrafficSourceRule[] = [
  // Google Ads (via gclid parameter)
  {
    source: 'google_ads',
    numbers: ['0191 830 1000', '0191 830 1001', '0191 830 1002'],
    name: 'Google Ads - General'
  },
  
  // Facebook Ads (via fbclid parameter)
  {
    source: 'facebook_ads',
    numbers: ['0191 831 1000', '0191 831 1001', '0191 831 1002'],
    name: 'Facebook Ads - General'
  },
  
  // Bing Ads (via msclkid parameter)
  {
    source: 'bing_ads',
    numbers: ['0191 832 1000', '0191 832 1001'],
    name: 'Bing Ads - General'
  },
  
  // Organic search (UTM source = organic)
  {
    source: 'organic',
    numbers: ['0191 833 1000', '0191 833 1001'],
    name: 'Organic Search'
  },
  
  // Direct traffic
  {
    source: 'direct',
    numbers: ['0191 834 1000'],
    name: 'Direct Traffic'
  }
];

// Regional fallback numbers (when no campaign/route rule matches)
// CallRail tracking ONLY for Tyne & Wear - other regions use actual company numbers
export const REGIONAL_FALLBACK_NUMBERS: Record<string, string[]> = {
  'tyne-and-wear': ['0191 743 9585', '0191 743 9620', '0191 743 0019', '0191 743 7676', '0191 743 2098']
  // Other regions removed - they will fall back to global fallback (actual company numbers)
};

// Global fallback number (absolute last resort)
export const GLOBAL_FALLBACK_NUMBERS: string[] = ['0191 743 9585'];

// Session storage key for persisting selected tracking number
export const TRACKING_SESSION_KEY = 'ts_call_number';

// Tracking metadata for analytics
export interface TrackingMetadata {
  selectedNumber: string;
  ruleName?: string;
  ruleType: 'route' | 'campaign' | 'source' | 'region' | 'global';
  timestamp: number;
  sessionId?: string;
}