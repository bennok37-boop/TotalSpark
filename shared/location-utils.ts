import { REGIONS, LocationData, RegionData } from './locations';

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
    'tyne-and-wear': '0191 123 4567',
    'county-durham': '0191 789 0123',
    'northumberland': '01670 123 456',
    'tees-valley': '01642 123 456'
  };
  return phoneMap[regionSlug] || '0191 123 4567';
}

// Helper function to get region-specific WhatsApp number
export function getRegionWhatsAppNumber(regionSlug: string): string {
  const whatsappMap: Record<string, string> = {
    'tyne-and-wear': '447123456789',
    'county-durham': '447789012345',
    'northumberland': '447670123456',
    'tees-valley': '447642123456'
  };
  return whatsappMap[regionSlug] || '447123456789';
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

// Helper function to get location-aware contact details
export function getLocationContactDetails(pathname: string) {
  // Check if we're on a city page (/cleaning/slug)
  const cityPageMatch = pathname.match(/^\/cleaning\/(.+)$/);
  if (cityPageMatch) {
    const locationSlug = cityPageMatch[1];
    const locationData = findLocationBySlug(locationSlug);
    if (locationData) {
      return {
        phone: getRegionPhoneNumber(locationData.region.slug),
        whatsapp: getRegionWhatsAppNumber(locationData.region.slug),
        location: locationData.location,
        region: locationData.region
      };
    }
  }
  
  // Default for non-city pages
  return {
    phone: '0191 123 4567',
    whatsapp: '447123456789',
    location: null,
    region: null
  };
}