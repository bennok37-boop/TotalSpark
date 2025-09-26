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
    numbers: ['03300432115'],
    name: 'End of Tenancy - Main'
  },
  {
    pattern: '/cleaning/newcastle',
    numbers: ['03300432115'],
    region: 'tyne-and-wear',
    name: 'Newcastle Landing'
  },
  
  // Commercial cleaning
  {
    pattern: '/commercial-cleaning',
    numbers: ['03300432115'],
    name: 'Commercial - Main'
  },
  
  // Deep cleaning
  {
    pattern: '/deep-cleaning',
    numbers: ['03300432115'],
    name: 'Deep Cleaning - Main'
  },
  
  // Carpet cleaning
  {
    pattern: '/carpet-upholstery-cleaning',
    numbers: ['03300432115'],
    name: 'Carpet Cleaning - Main'
  }
];

// Campaign-based tracking numbers - UTM campaigns get specific numbers
export const CAMPAIGN_RULES: CampaignRule[] = [
  // Google Ads campaigns
  {
    campaign: 'google_ads_end_tenancy',
    numbers: ['03300432115'],
    name: 'Google Ads - End of Tenancy'
  },
  {
    campaign: 'google_ads_commercial',
    numbers: ['03300432115'],
    name: 'Google Ads - Commercial'
  },
  {
    campaign: 'google_ads_deep_clean',
    numbers: ['03300432115'],
    name: 'Google Ads - Deep Clean'
  },
  
  // Facebook campaigns
  {
    campaign: 'facebook_end_tenancy',
    numbers: ['03300432115'],
    name: 'Facebook - End of Tenancy'
  },
  {
    campaign: 'facebook_commercial',
    numbers: ['03300432115'],
    name: 'Facebook - Commercial'
  }
];

// Traffic source-based tracking numbers - different sources get different pools
export const TRAFFIC_SOURCE_RULES: TrafficSourceRule[] = [
  // Google Ads (via gclid parameter)
  {
    source: 'google_ads',
    numbers: ['03300432115'],
    name: 'Google Ads - General'
  },
  
  // Facebook Ads (via fbclid parameter)
  {
    source: 'facebook_ads',
    numbers: ['03300432115'],
    name: 'Facebook Ads - General'
  },
  
  // Bing Ads (via msclkid parameter)
  {
    source: 'bing_ads',
    numbers: ['03300432115'],
    name: 'Bing Ads - General'
  },
  
  // Organic search (UTM source = organic)
  {
    source: 'organic',
    numbers: ['03300432115'],
    name: 'Organic Search'
  },
  
  // Direct traffic
  {
    source: 'direct',
    numbers: ['03300432115'],
    name: 'Direct Traffic'
  }
];

// Regional fallback numbers (when no campaign/route rule matches)
// CallRail tracking ONLY for Tyne & Wear - other regions use actual company numbers
export const REGIONAL_FALLBACK_NUMBERS: Record<string, string[]> = {
  'tyne-and-wear': ['03300432115']
  // Other regions removed - they will fall back to global fallback (actual company numbers)
};

// Global fallback number (absolute last resort)
export const GLOBAL_FALLBACK_NUMBERS: string[] = ['03300432115'];

// Session storage key for persisting selected tracking number
export const TRACKING_SESSION_KEY = 'ts_call_number';
export const CACHE_VERSION = '2.0'; // Increment to invalidate old cached data

// Tracking metadata for analytics
export interface TrackingMetadata {
  selectedNumber: string;
  ruleName?: string;
  ruleType: 'route' | 'campaign' | 'source' | 'region' | 'global';
  timestamp: number;
  sessionId?: string;
  cacheVersion?: string;
}