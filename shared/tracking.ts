// CallRail tracking number resolver
// Determines which tracking phone number to display based on various rules

import { 
  ROUTE_RULES,
  CAMPAIGN_RULES, 
  TRAFFIC_SOURCE_RULES,
  REGIONAL_FALLBACK_NUMBERS,
  GLOBAL_FALLBACK_NUMBERS,
  TRACKING_SESSION_KEY,
  CACHE_VERSION,
  TrackingMetadata
} from './callrail-config';

export interface TrackingContext {
  pathname: string;
  search: string;
  referrer?: string;
  regionSlug?: string;
  sessionId?: string;
}

export interface TrackingResult {
  phone: string;
  metadata: TrackingMetadata;
}

// Extract campaign/source information from URL parameters
function extractCampaignInfo(searchParams: URLSearchParams): {
  campaign?: string;
  source?: string;
  medium?: string;
} {
  // Check for explicit UTM parameters
  const utmCampaign = searchParams.get('utm_campaign');
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  
  // Check for ad platform click IDs
  const gclid = searchParams.get('gclid'); // Google Ads
  const fbclid = searchParams.get('fbclid'); // Facebook Ads
  const msclkid = searchParams.get('msclkid'); // Bing Ads
  
  let inferredSource: string | undefined;
  
  // Infer source from click IDs if not explicitly set
  if (gclid && !utmSource) {
    inferredSource = 'google_ads';
  } else if (fbclid && !utmSource) {
    inferredSource = 'facebook_ads';
  } else if (msclkid && !utmSource) {
    inferredSource = 'bing_ads';
  }
  
  return {
    campaign: utmCampaign || undefined,
    source: utmSource || inferredSource,
    medium: utmMedium || undefined
  };
}

// Generate a deterministic index from a string (for consistent number selection)
function hashStringToIndex(str: string, poolSize: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % poolSize;
}

// Select a number from a pool consistently based on session
function selectFromPool(numbers: string[], sessionId?: string): string {
  if (numbers.length === 1) {
    return numbers[0];
  }
  
  // Use session ID or current timestamp for deterministic selection
  const seed = sessionId || Date.now().toString();
  const index = hashStringToIndex(seed, numbers.length);
  return numbers[index];
}

// Check if browser environment and session storage is available
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
}

// Get cached tracking result from session storage
function getCachedTrackingResult(): TrackingResult | null {
  if (!isBrowser()) return null;
  
  try {
    const cached = sessionStorage.getItem(TRACKING_SESSION_KEY);
    if (cached) {
      const result = JSON.parse(cached) as TrackingResult;
      
      // Check cache version - invalidate if mismatched
      if (!result.metadata.cacheVersion || result.metadata.cacheVersion !== CACHE_VERSION) {
        sessionStorage.removeItem(TRACKING_SESSION_KEY);
        return null;
      }
      
      // Check if cached result is still valid (within 1 hour)
      const hourAgo = Date.now() - (60 * 60 * 1000);
      if (result.metadata.timestamp > hourAgo) {
        // Ensure cached phone number is valid (must be main company number per new policy)
        if (result.phone === '03300432115') {
          return result;
        }
      }
    }
  } catch (error) {
    console.warn('Failed to parse cached tracking result:', error);
  }
  
  // Clear invalid cache
  sessionStorage.removeItem(TRACKING_SESSION_KEY);
  return null;
}

// Cache tracking result in session storage
function cacheTrackingResult(result: TrackingResult): void {
  if (!isBrowser()) return;
  
  try {
    sessionStorage.setItem(TRACKING_SESSION_KEY, JSON.stringify(result));
  } catch (error) {
    console.warn('Failed to cache tracking result:', error);
  }
}

// Main resolver function - determines the tracking phone number to display
export function resolveTrackingPhone(context: TrackingContext): TrackingResult {
  const { pathname, search, regionSlug, sessionId } = context;
  
  // Check for cached result first (for session consistency)
  const cached = getCachedTrackingResult();
  if (cached) {
    return cached;
  }
  
  const searchParams = new URLSearchParams(search);
  const campaignInfo = extractCampaignInfo(searchParams);
  
  let selectedNumber: string;
  let ruleName: string | undefined;
  let ruleType: TrackingMetadata['ruleType'];
  
  // Priority 1: Campaign-specific rules (highest priority)
  if (campaignInfo.campaign) {
    const campaignRule = CAMPAIGN_RULES.find(rule => 
      rule.campaign === campaignInfo.campaign
    );
    
    if (campaignRule) {
      selectedNumber = selectFromPool(campaignRule.numbers, sessionId);
      ruleName = campaignRule.name;
      ruleType = 'campaign';
      
      const result: TrackingResult = {
        phone: selectedNumber,
        metadata: {
          selectedNumber,
          ruleName,
          ruleType,
          timestamp: Date.now(),
          sessionId,
          cacheVersion: CACHE_VERSION
        }
      };
      
      cacheTrackingResult(result);
      return result;
    }
  }
  
  // Priority 2: Traffic source rules
  if (campaignInfo.source) {
    const sourceRule = TRAFFIC_SOURCE_RULES.find(rule => 
      rule.source === campaignInfo.source
    );
    
    if (sourceRule) {
      selectedNumber = selectFromPool(sourceRule.numbers, sessionId);
      ruleName = sourceRule.name;
      ruleType = 'source';
      
      const result: TrackingResult = {
        phone: selectedNumber,
        metadata: {
          selectedNumber,
          ruleName,
          ruleType,
          timestamp: Date.now(),
          sessionId,
          cacheVersion: CACHE_VERSION
        }
      };
      
      cacheTrackingResult(result);
      return result;
    }
  }
  
  // Priority 3: Route-specific rules
  const routeRule = ROUTE_RULES.find(rule => {
    // Support both exact match and startsWith patterns
    if (rule.pattern === pathname) {
      return true;
    }
    if (pathname.startsWith(rule.pattern)) {
      // If there's a region restriction, check it matches
      if (rule.region && regionSlug && rule.region !== regionSlug) {
        return false;
      }
      return true;
    }
    return false;
  });
  
  if (routeRule) {
    selectedNumber = selectFromPool(routeRule.numbers, sessionId);
    ruleName = routeRule.name;
    ruleType = 'route';
    
    const result: TrackingResult = {
      phone: selectedNumber,
      metadata: {
        selectedNumber,
        ruleName,
        ruleType,
        timestamp: Date.now(),
        sessionId
      }
    };
    
    cacheTrackingResult(result);
    return result;
  }
  
  // Priority 4: Regional fallback
  if (regionSlug && REGIONAL_FALLBACK_NUMBERS[regionSlug]) {
    const regionalNumbers = REGIONAL_FALLBACK_NUMBERS[regionSlug];
    selectedNumber = selectFromPool(regionalNumbers, sessionId);
    ruleName = `Regional - ${regionSlug}`;
    ruleType = 'region';
    
    const result: TrackingResult = {
      phone: selectedNumber,
      metadata: {
        selectedNumber,
        ruleName,
        ruleType,
        timestamp: Date.now(),
        sessionId
      }
    };
    
    cacheTrackingResult(result);
    return result;
  }
  
  // Priority 5: Global fallback (last resort)
  selectedNumber = selectFromPool(GLOBAL_FALLBACK_NUMBERS, sessionId);
  ruleName = 'Global Fallback';
  ruleType = 'global';
  
  const result: TrackingResult = {
    phone: selectedNumber,
    metadata: {
      selectedNumber,
      ruleName,
      ruleType,
      timestamp: Date.now(),
      sessionId,
      cacheVersion: CACHE_VERSION
    }
  };
  
  cacheTrackingResult(result);
  return result;
}

// Utility function to clear cached tracking (useful for testing)
export function clearTrackingCache(): void {
  if (isBrowser()) {
    sessionStorage.removeItem(TRACKING_SESSION_KEY);
  }
}

// Get current tracking metadata (for analytics/debugging)
export function getCurrentTrackingMetadata(): TrackingMetadata | null {
  const cached = getCachedTrackingResult();
  return cached?.metadata || null;
}