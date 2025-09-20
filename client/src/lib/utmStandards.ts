// UTM Parameter Standards for TotalSpark Solutions
// Internal tracking links using utm_source=google&utm_medium=organic&utm_campaign=local_city

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

// Standard UTM configurations for different link types
export const UTM_STANDARDS = {
  // Internal profile/citation links
  local_profiles: {
    source: 'google',
    medium: 'organic', 
    campaign: 'local_city'
  },
  
  // Social media posts
  social_media: {
    source: 'social',
    medium: 'post',
    campaign: 'brand_awareness'
  },
  
  // Email campaigns
  email_campaigns: {
    source: 'email',
    medium: 'newsletter',
    campaign: 'monthly_promo'
  },
  
  // Google Ads
  google_ads: {
    source: 'google',
    medium: 'cpc',
    campaign: 'cleaning_services'
  },
  
  // Direct mail/offline
  offline_campaigns: {
    source: 'offline',
    medium: 'print',
    campaign: 'local_ads'
  }
} as const;

// Helper function to build URLs with UTM parameters
export const buildUTMUrl = (baseUrl: string, utmParams: UTMParams): string => {
  const url = new URL(baseUrl);
  const params = new URLSearchParams();
  
  if (utmParams.source) params.append('utm_source', utmParams.source);
  if (utmParams.medium) params.append('utm_medium', utmParams.medium);
  if (utmParams.campaign) params.append('utm_campaign', utmParams.campaign);
  if (utmParams.term) params.append('utm_term', utmParams.term);
  if (utmParams.content) params.append('utm_content', utmParams.content);
  
  const paramString = params.toString();
  return paramString ? `${baseUrl}${url.search ? '&' : '?'}${paramString}` : baseUrl;
};

// Generate city-specific profile links with standard UTM parameters
export const generateCityProfileLinks = (domain: string, cities: string[]): Record<string, string> => {
  const links: Record<string, string> = {};
  
  cities.forEach(city => {
    const citySlug = city.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const baseUrl = `${domain}/cleaning/${citySlug}`;
    
    links[city] = buildUTMUrl(baseUrl, {
      ...UTM_STANDARDS.local_profiles,
      campaign: `local_${citySlug}`,
      term: `${city.replace(/[^a-zA-Z0-9\s]/g, '')} cleaning`
    });
  });
  
  return links;
};

// Generate service-specific campaign links
export const generateServiceCampaignLinks = (
  domain: string, 
  service: string, 
  cities: string[]
): Record<string, string> => {
  const links: Record<string, string> = {};
  const serviceSlug = service.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  cities.forEach(city => {
    const citySlug = city.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const baseUrl = `${domain}/${serviceSlug}/${citySlug}`;
    
    links[`${service}_${city}`] = buildUTMUrl(baseUrl, {
      source: 'google',
      medium: 'ads',
      campaign: `${serviceSlug}_${citySlug}`,
      term: `${service} ${city}`,
      content: 'landing_page'
    });
  });
  
  return links;
};

// Extract and validate UTM parameters from current URL
export const getCurrentUTMParams = (): UTMParams => {
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    source: urlParams.get('utm_source') || undefined,
    medium: urlParams.get('utm_medium') || undefined,
    campaign: urlParams.get('utm_campaign') || undefined,
    term: urlParams.get('utm_term') || undefined,
    content: urlParams.get('utm_content') || undefined,
  };
};

// Validate UTM parameter structure
export const isValidUTMStructure = (params: UTMParams): boolean => {
  // Must have at least source and medium
  if (!params.source || !params.medium) return false;
  
  // Check for valid characters (no special chars that could break tracking)
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  
  const values = [params.source, params.medium, params.campaign, params.term, params.content].filter(Boolean);
  return values.every(value => validPattern.test(value as string));
};

// Generate campaign report data with UTM breakdown
export const generateUTMReport = (): {
  current_params: UTMParams;
  is_valid: boolean;
  campaign_type: string;
  attribution: string;
} => {
  const params = getCurrentUTMParams();
  const isValid = isValidUTMStructure(params);
  
  // Determine campaign type
  let campaignType = 'unknown';
  if (params.source === 'google' && params.medium === 'organic') campaignType = 'local_seo';
  else if (params.source === 'google' && params.medium === 'cpc') campaignType = 'google_ads';
  else if (params.source === 'social') campaignType = 'social_media';
  else if (params.source === 'email') campaignType = 'email_marketing';
  else if (params.source === 'offline') campaignType = 'offline_marketing';
  
  // Generate attribution string
  const attribution = params.source && params.medium 
    ? `${params.source}/${params.medium}${params.campaign ? `/${params.campaign}` : ''}`
    : 'direct';
  
  return {
    current_params: params,
    is_valid: isValid,
    campaign_type: campaignType,
    attribution
  };
};