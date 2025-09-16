import { REGIONS, LocationData, RegionData } from './locations';
import { resolveTrackingPhone, TrackingContext } from './tracking';

// Helper function to find a location by slug across all regions
export function findLocationBySlug(slug: string) {
  for (const region of Object.values(REGIONS)) {
    const location = region.locations.find(loc => loc.slug === slug);
    if (location) {
      return { location, region };
    }
  }
  return null;
}

// Helper function to get region-specific phone number
export function getRegionPhoneNumber(regionSlug: string): string {
  const phoneMap: Record<string, string> = {
    'tyne-and-wear': '0191 821 4567',     // CallRail tracking pool - Tyne & Wear
    'county-durham': '0191 822 5678',     // CallRail tracking pool - County Durham  
    'northumberland': '01670 823 9012',   // CallRail tracking pool - Northumberland
    'tees-valley': '01642 824 3456'       // CallRail tracking pool - Tees Valley
  };
  return phoneMap[regionSlug] || '0191 821 4567';
}

// Helper function to get region-specific WhatsApp number
export function getRegionWhatsAppNumber(regionSlug: string): string {
  // Single WhatsApp number for all regions
  return '447380991629';
}

// Helper function to get nearby locations within a region
export function getNearbyLocations(currentLocation: LocationData, region: RegionData, limit: number = 5): Array<{ name: string; slug: string }> {
  // First, try to use the location's nearby array
  if (currentLocation.nearby && currentLocation.nearby.length > 0) {
    const nearbyLocations: Array<{ name: string; slug: string }> = [];
    
    for (const nearbyName of currentLocation.nearby) {
      // Find the location data for this nearby location name
      // Search across all regions to find the location
      let foundLocation: LocationData | null = null;
      
      for (const searchRegion of Object.values(REGIONS)) {
        const location = searchRegion.locations.find(loc => 
          loc.name === nearbyName || loc.name.toLowerCase() === nearbyName.toLowerCase()
        );
        if (location) {
          foundLocation = location;
          break;
        }
      }
      
      if (foundLocation) {
        nearbyLocations.push({ name: foundLocation.name, slug: foundLocation.slug });
      }
      
      // Stop if we've reached the limit
      if (nearbyLocations.length >= limit) {
        break;
      }
    }
    
    // If we have nearby locations, return them
    if (nearbyLocations.length > 0) {
      return nearbyLocations.slice(0, limit);
    }
  }
  
  // Fallback: use other locations from the same region
  return region.locations
    .filter((loc: LocationData) => loc.slug !== currentLocation.slug)
    .slice(0, limit)
    .map((loc: LocationData) => ({ name: loc.name, slug: loc.slug }));
}

// Helper function to get location-aware contact details with CallRail tracking
export function getLocationContactDetails(pathname: string, search: string = '', sessionId?: string) {
  let regionSlug: string | undefined;
  let location: LocationData | null = null;
  let region: RegionData | null = null;
  
  // Check if we're on a city page (/cleaning/slug)
  const cityPageMatch = pathname.match(/^\/cleaning\/(.+)$/);
  if (cityPageMatch) {
    const locationSlug = cityPageMatch[1];
    const locationData = findLocationBySlug(locationSlug);
    if (locationData) {
      regionSlug = locationData.region.slug;
      location = locationData.location;
      region = locationData.region;
    }
  }
  
  // Use CallRail tracking system to get the appropriate phone number
  const trackingContext: TrackingContext = {
    pathname,
    search,
    regionSlug,
    sessionId
  };
  
  const trackingResult = resolveTrackingPhone(trackingContext);
  
  return {
    phone: trackingResult.phone,
    whatsapp: getRegionWhatsAppNumber(regionSlug || 'default'),
    location,
    region,
    trackingMetadata: trackingResult.metadata
  };
}