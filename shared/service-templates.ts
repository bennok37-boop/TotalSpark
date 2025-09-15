import { LocationData, RegionData } from './locations';
import { getRegionPhoneNumber, getRegionWhatsAppNumber, getNearbyLocations } from './location-utils';

// Import pricing engine types and compute function
interface PricingInput {
  service: "endOfTenancy" | "deep" | "commercial" | "carpets";
  bedrooms?: "studio" | "1" | "2" | "3" | "4" | "5plus";
}

// Base pricing configuration from the pricing engine
const PRICING_CONFIG = {
  endOfTenancy: {
    base: { 
      studio: { price: 100, hours: 3 }, 
      "1": { price: 120, hours: 4 }, 
      "2": { price: 160, hours: 6 }, 
      "3": { price: 220, hours: 8 }, 
      "4": { price: 280, hours: 10 }, 
      "5plus": { price: 340, hours: 12 } 
    }
  },
  deep: {
    base: { 
      studio: { price: 100, hours: 3 }, 
      "1": { price: 100, hours: 4 }, 
      "2": { price: 150, hours: 6 }, 
      "3": { price: 200, hours: 8 }, 
      "4": { price: 260, hours: 10 }, 
      "5plus": { price: 320, hours: 12 } 
    }
  },
  regular: {
    base: {
      "1": { price: 35, hours: 2 },
      "2": { price: 45, hours: 3 },
      "3": { price: 55, hours: 4 },
      "4": { price: 65, hours: 5 },
      "5plus": { price: 75, hours: 6 }
    }
  },
  commercial: {
    ratePerHour: 20,
    categories: {
      office: { m2PerHour: 60 },
      retail: { m2PerHour: 55 },
      small: { price: 25 },
      medium: { price: 45 },
      large: { price: 75 }
    }
  },
  carpets: {
    room: 25, 
    stairs: 30, 
    rug: 30, 
    sofa2: 40, 
    sofa3: 55, 
    armchair: 20, 
    mattress: 35,
    single: 35,
    package2_3: 65,
    wholeHouse: 120,
    suite3piece: 85,
    singleItem: 25
  }
};

// Helper function to generate dynamic pricing based on service type
function generateDynamicPricing(serviceType: "endOfTenancy" | "deep" | "regular" | "commercial" | "carpets", location?: LocationData): Array<{ size: string; price: string; description: string }> {
  const locationDesc = location ? ` in ${location.name}` : '';
  
  switch (serviceType) {
    case "endOfTenancy":
      return [
        { size: 'Studio flat', price: '£100', description: `Perfect for ${location?.name || 'city'} centre studios` },
        { size: '1-bed flat', price: '£120', description: 'Ideal for young professionals' },
        { size: '2-bed house', price: '£160', description: `Common in ${location?.name || 'residential'} areas` },
        { size: '3-bed house', price: '£220', description: 'Student houses & family homes' },
        { size: '4+ bed house', price: '£280', description: `Large ${location?.name || 'local'} properties` }
      ];
    
    case "deep":
      return [
        { size: '1-bed property', price: '£100', description: 'Complete deep clean' },
        { size: '2-bed property', price: '£150', description: 'Complete deep clean' },
        { size: '3-bed property', price: '£200', description: 'Complete deep clean' },
        { size: '4-bed property', price: '£260', description: 'Complete deep clean' },
        { size: '5+ bed property', price: '£320+', description: 'Complete deep clean' }
      ];
    
    case "regular":
      return [
        { size: '1-bed property', price: '£35', description: 'Per clean' },
        { size: '2-bed property', price: '£45', description: 'Per clean' },
        { size: '3-bed property', price: '£55', description: 'Per clean' },
        { size: '4-bed property', price: '£65', description: 'Per clean' },
        { size: '5+ bed property', price: '£75+', description: 'Per clean' }
      ];
    
    case "commercial":
      return [
        { size: 'Small office', price: '£25', description: 'Per clean (up to 1000 sq ft)' },
        { size: 'Medium office', price: '£45', description: 'Per clean (1000-3000 sq ft)' },
        { size: 'Large office', price: '£75', description: 'Per clean (3000-6000 sq ft)' },
        { size: 'Retail space', price: '£35', description: 'Per clean (varies by layout)' },
        { size: 'Industrial unit', price: 'POA', description: 'Quote on assessment' }
      ];
    
    case "carpets":
      return [
        { size: 'Single room', price: '£35', description: 'Up to 15 sq meters' },
        { size: '2-3 rooms', price: '£65', description: 'Living areas package' },
        { size: 'Whole house', price: '£120', description: 'All carpeted areas' },
        { size: '3-piece suite', price: '£85', description: 'Sofa + 2 chairs' },
        { size: 'Single item', price: '£25', description: 'Sofa or large chair' }
      ];
    
    default:
      return [];
  }
}

export interface ServicePageData {
  location: LocationData;
  region: RegionData;
  phone: string;
  whatsapp: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  localAreas: string[];
  nearbyAreas: Array<{ name: string; slug: string }>;
  faqs: Array<{ q: string; a: string }>;
  pricing: Array<{ size: string; price: string; description: string }>;
  serviceFeatures: string[];
  trustSignals: string[];
  successStories: Array<{ title: string; subtitle: string }>;
}

// End of Tenancy Cleaning Template
export function generateEndOfTenancyPageData(location: LocationData, region: RegionData): ServicePageData {
  const nearbyLocations = getNearbyLocations(location, region, 8);
  const nearbyNames = nearbyLocations.slice(0, 6).map((loc) => loc.name);
  
  return {
    location,
    region,
    phone: getRegionPhoneNumber(region.slug),
    whatsapp: getRegionWhatsAppNumber(region.slug),
    heroTitle: `End of Tenancy Cleaning ${location.name} – 100% Deposit Back Guarantee`,
    heroSubtitle: `Professional end of tenancy cleaning across ${location.name}, ${nearbyNames.slice(0, 3).join(', ')} and surrounding ${region.name} areas. Get your full deposit back or we'll re-clean free.`,
    metaTitle: `End of Tenancy Cleaning ${location.name} | Deposit Back Guarantee | ${region.name}`,
    metaDescription: `Professional end of tenancy cleaning in ${location.name}. 100% deposit back guarantee. Serving ${nearbyNames.slice(0, 3).join(', ')} & ${region.name}. Book online today.`,
    localAreas: nearbyNames,
    nearbyAreas: nearbyLocations.slice(0, 8),
    faqs: [
      {
        q: `Do you guarantee my deposit back in ${location.name}?`,
        a: `Absolutely — if your ${location.name} landlord or letting agent raises an issue with the cleaning, we'll re-clean within 48 hours completely free of charge. This guarantee covers all ${location.name} areas and ${region.name}.`
      },
      {
        q: `Which ${location.name} letting agents do you work with?`,
        a: `We regularly work with major ${region.name} letting agents and have extensive experience with ${location.name} property management companies. Our cleaning meets industry standards.`
      },
      {
        q: `Can you clean student properties in ${location.name}?`,
        a: `Yes! We specialize in ${location.name} student properties and HMOs. We understand the specific requirements for student house move-outs in the ${region.name} area.`
      },
      {
        q: `How quickly can you clean my ${location.name} property?`,
        a: `We often arrange ${location.name} end of tenancy cleaning within 24-48 hours. Same-day emergency cleaning may be available for urgent ${location.name} move-outs.`
      },
      {
        q: `Do you bring equipment to ${location.name} properties?`,
        a: `Yes, all professional cleaning equipment and eco-friendly products are brought to your ${location.name} property. No need to provide anything.`
      }
    ],
    pricing: generateDynamicPricing('endOfTenancy', location),
    serviceFeatures: [
      'Kitchen deep clean including oven, hob & extractor',
      'Bathroom restoration with descaling & grout cleaning',
      'Bedroom & living area comprehensive cleaning',
      'Interior window cleaning & frame cleaning',
      'Final inspection checklist provided'
    ],
    trustSignals: [
      `${location.name} Deposit Guarantee - 100% money back`,
      `Agent approved across ${region.name}`,
      `DBS-checked & fully insured cleaners`,
      `24-48hr service available in ${location.name}`
    ],
    successStories: [
      { title: `${location.name} Student House`, subtitle: 'Full deposit secured' },
      { title: `${nearbyLocations[0]?.name || 'Local'} Flat`, subtitle: 'Agent approved clean' },
      { title: `${nearbyLocations[1]?.name || 'Area'} Family Home`, subtitle: '100% deposit returned' }
    ]
  };
}

// General Cleaning Template
export function generateCleaningPageData(location: LocationData, region: RegionData): ServicePageData {
  const nearbyLocations = getNearbyLocations(location, region, 8);
  const nearbyNames = nearbyLocations.slice(0, 6).map((loc) => loc.name);
  
  return {
    location,
    region,
    phone: getRegionPhoneNumber(region.slug),
    whatsapp: getRegionWhatsAppNumber(region.slug),
    heroTitle: `Professional Cleaning Services ${location.name} – Regular & One-Off Cleans`,
    heroSubtitle: `Trusted cleaning services across ${location.name}, ${nearbyNames.slice(0, 3).join(', ')} and surrounding ${region.name} areas. Regular domestic cleaning, one-off cleans, and maintenance services.`,
    metaTitle: `Professional Cleaning Services ${location.name} | Regular & One-Off | ${region.name}`,
    metaDescription: `Professional cleaning services in ${location.name}. Regular domestic cleaning & one-off cleans. Serving ${nearbyNames.slice(0, 3).join(', ')} & ${region.name}. Book today.`,
    localAreas: nearbyNames,
    nearbyAreas: nearbyLocations.slice(0, 8),
    faqs: [
      {
        q: `What cleaning services do you offer in ${location.name}?`,
        a: `We offer regular domestic cleaning, one-off cleans, spring cleaning, and maintenance cleaning across ${location.name} and ${region.name}. All services include equipment and materials.`
      },
      {
        q: `How often can you clean my ${location.name} home?`,
        a: `We offer flexible scheduling in ${location.name} - weekly, fortnightly, monthly, or one-off cleans. We can adapt to your specific needs and preferences.`
      },
      {
        q: `Are your ${location.name} cleaners insured and vetted?`,
        a: `Yes, all our ${location.name} cleaners are DBS-checked, fully insured, and professionally trained. We maintain high standards across all ${region.name} areas.`
      },
      {
        q: `What areas of ${location.name} do you cover?`,
        a: `We cover all areas of ${location.name} and surrounding ${region.name} locations including ${nearbyNames.slice(0, 4).join(', ')}.`
      },
      {
        q: `Can I book same-day cleaning in ${location.name}?`,
        a: `Subject to availability, we can often arrange same-day cleaning in ${location.name}. Contact us to check availability in your area.`
      }
    ],
    pricing: generateDynamicPricing('regular', location),
    serviceFeatures: [
      'Regular domestic cleaning schedules',
      'One-off deep cleaning sessions',
      'Kitchen & bathroom specialist cleaning',
      'Dusting, vacuuming & mopping',
      'All cleaning materials provided'
    ],
    trustSignals: [
      `Trusted by ${location.name} families since 2020`,
      `Flexible scheduling across ${region.name}`,
      `DBS-checked & insured cleaners`,
      `Same-day service available in ${location.name}`
    ],
    successStories: [
      { title: `${location.name} Family Home`, subtitle: 'Weekly cleaning for 2 years' },
      { title: `${nearbyLocations[0]?.name || 'Local'} Apartment`, subtitle: 'One-off spring clean' },
      { title: `${nearbyLocations[1]?.name || 'Area'} House`, subtitle: 'Monthly maintenance clean' }
    ]
  };
}

// Deep Cleaning Template
export function generateDeepCleaningPageData(location: LocationData, region: RegionData): ServicePageData {
  const nearbyLocations = getNearbyLocations(location, region, 8);
  const nearbyNames = nearbyLocations.slice(0, 6).map((loc) => loc.name);
  
  return {
    location,
    region,
    phone: getRegionPhoneNumber(region.slug),
    whatsapp: getRegionWhatsAppNumber(region.slug),
    heroTitle: `Deep Cleaning Services ${location.name} – Complete Property Restoration`,
    heroSubtitle: `Comprehensive deep cleaning across ${location.name}, ${nearbyNames.slice(0, 3).join(', ')} and surrounding ${region.name} areas. Perfect for neglected properties, spring cleaning, and property restoration.`,
    metaTitle: `Deep Cleaning Services ${location.name} | Complete Property Restoration | ${region.name}`,
    metaDescription: `Professional deep cleaning in ${location.name}. Complete property restoration & spring cleaning. Serving ${nearbyNames.slice(0, 3).join(', ')} & ${region.name}. Transform your space.`,
    localAreas: nearbyNames,
    nearbyAreas: nearbyLocations.slice(0, 8),
    faqs: [
      {
        q: `What does deep cleaning include in ${location.name}?`,
        a: `Our ${location.name} deep cleaning covers every surface: kitchen appliances, bathroom descaling, carpet treatment, window cleaning, and detailed room-by-room restoration across ${region.name}.`
      },
      {
        q: `How long does deep cleaning take in ${location.name}?`,
        a: `${location.name} deep cleaning typically takes 4-8 hours depending on property size and condition. We'll provide an accurate timeframe after assessment.`
      },
      {
        q: `Do you clean neglected or vacant ${location.name} properties?`,
        a: `Yes, we specialize in restoring neglected and vacant properties across ${location.name} and ${region.name}. No property is too challenging for our experienced team.`
      },
      {
        q: `Can you remove stubborn stains and odors in ${location.name}?`,
        a: `Our ${location.name} deep cleaning includes specialist stain removal, odor elimination, and restoration techniques. We tackle the toughest cleaning challenges across ${region.name}.`
      },
      {
        q: `Do you offer one-off deep cleaning in ${location.name}?`,
        a: `Yes, most of our ${location.name} deep cleaning is one-off service for property restoration, spring cleaning, or preparing for regular maintenance cleaning.`
      }
    ],
    pricing: generateDynamicPricing('deep', location),
    serviceFeatures: [
      'Complete property restoration cleaning',
      'Kitchen appliance deep cleaning & descaling',
      'Bathroom mold & limescale treatment',
      'Carpet deep cleaning & stain removal',
      'Window cleaning inside & outside'
    ],
    trustSignals: [
      `Property restoration experts in ${location.name}`,
      `Specialist equipment for deep cleaning`,
      `Experienced team across ${region.name}`,
      `Transform any property condition`
    ],
    successStories: [
      { title: `${location.name} Property Restoration`, subtitle: 'Vacant house transformed' },
      { title: `${nearbyLocations[0]?.name || 'Local'} Spring Clean`, subtitle: 'Complete home refresh' },
      { title: `${nearbyLocations[1]?.name || 'Area'} Rental Prep`, subtitle: 'Ready for new tenants' }
    ]
  };
}

// Commercial Cleaning Template
export function generateCommercialCleaningPageData(location: LocationData, region: RegionData): ServicePageData {
  const nearbyLocations = getNearbyLocations(location, region, 8);
  const nearbyNames = nearbyLocations.slice(0, 6).map((loc) => loc.name);
  
  return {
    location,
    region,
    phone: getRegionPhoneNumber(region.slug),
    whatsapp: getRegionWhatsAppNumber(region.slug),
    heroTitle: `Commercial Cleaning Services ${location.name} – Office & Business Cleaning`,
    heroSubtitle: `Professional commercial cleaning across ${location.name}, ${nearbyNames.slice(0, 3).join(', ')} and surrounding ${region.name} business areas. Daily, weekly, and contract cleaning services.`,
    metaTitle: `Commercial Cleaning Services ${location.name} | Office & Business Cleaning | ${region.name}`,
    metaDescription: `Professional commercial cleaning in ${location.name}. Office cleaning & business services. Serving ${nearbyNames.slice(0, 3).join(', ')} & ${region.name} businesses. Get quote today.`,
    localAreas: nearbyNames,
    nearbyAreas: nearbyLocations.slice(0, 8),
    faqs: [
      {
        q: `What commercial cleaning services do you offer in ${location.name}?`,
        a: `We provide office cleaning, retail cleaning, industrial cleaning, and specialist commercial services across ${location.name} and ${region.name} business districts.`
      },
      {
        q: `Can you clean ${location.name} offices outside business hours?`,
        a: `Yes, we offer flexible scheduling including evenings, weekends, and early mornings to suit your ${location.name} business operations without disruption.`
      },
      {
        q: `Do you provide cleaning contracts for ${location.name} businesses?`,
        a: `We offer daily, weekly, monthly, and bespoke cleaning contracts for ${location.name} businesses. All contracts include regular quality checks and account management.`
      },
      {
        q: `Are you insured for commercial cleaning in ${location.name}?`,
        a: `Yes, we carry comprehensive commercial insurance including public liability and employer liability for all ${location.name} and ${region.name} commercial work.`
      },
      {
        q: `Can you handle large ${location.name} commercial properties?`,
        a: `We have experience with properties of all sizes across ${location.name} and ${region.name}, from small offices to large industrial facilities and retail spaces.`
      }
    ],
    pricing: generateDynamicPricing('commercial', location),
    serviceFeatures: [
      'Daily, weekly & monthly cleaning contracts',
      'Office workspace & desk cleaning',
      'Kitchen & toilet facility maintenance',
      'Reception & communal area cleaning',
      'Flexible scheduling & account management'
    ],
    trustSignals: [
      `Trusted by ${location.name} businesses`,
      `Flexible contracts across ${region.name}`,
      `Fully insured commercial cleaning`,
      `Outside hours service available`
    ],
    successStories: [
      { title: `${location.name} Office Complex`, subtitle: 'Daily cleaning contract' },
      { title: `${nearbyLocations[0]?.name || 'Local'} Retail Unit`, subtitle: 'Weekly deep clean service' },
      { title: `${nearbyLocations[1]?.name || 'Area'} Business Park`, subtitle: 'Multiple unit contract' }
    ]
  };
}

// Carpet & Upholstery Cleaning Template
export function generateCarpetCleaningPageData(location: LocationData, region: RegionData): ServicePageData {
  const nearbyLocations = getNearbyLocations(location, region, 8);
  const nearbyNames = nearbyLocations.slice(0, 6).map((loc) => loc.name);
  
  return {
    location,
    region,
    phone: getRegionPhoneNumber(region.slug),
    whatsapp: getRegionWhatsAppNumber(region.slug),
    heroTitle: `Carpet & Upholstery Cleaning ${location.name} – Steam Cleaning Specialists`,
    heroSubtitle: `Professional carpet and upholstery cleaning across ${location.name}, ${nearbyNames.slice(0, 3).join(', ')} and surrounding ${region.name} areas. Steam cleaning, stain removal, and fabric protection.`,
    metaTitle: `Carpet & Upholstery Cleaning ${location.name} | Steam Cleaning Specialists | ${region.name}`,
    metaDescription: `Professional carpet & upholstery cleaning in ${location.name}. Steam cleaning & stain removal. Serving ${nearbyNames.slice(0, 3).join(', ')} & ${region.name}. Book today.`,
    localAreas: nearbyNames,
    nearbyAreas: nearbyLocations.slice(0, 8),
    faqs: [
      {
        q: `What carpet cleaning methods do you use in ${location.name}?`,
        a: `We use professional steam cleaning and hot water extraction methods in ${location.name}. This ensures deep cleaning while being safe for all carpet types across ${region.name}.`
      },
      {
        q: `Can you remove pet stains and odors in ${location.name}?`,
        a: `Yes, we specialize in pet stain and odor removal using enzyme treatments and deep extraction methods. Our ${location.name} service covers all types of pet-related carpet issues.`
      },
      {
        q: `How long does carpet cleaning take in ${location.name}?`,
        a: `${location.name} carpet cleaning typically takes 1-3 hours depending on room size and soil level. Carpets are usually dry within 2-6 hours.`
      },
      {
        q: `Do you clean upholstery and sofas in ${location.name}?`,
        a: `Yes, we clean all types of upholstery including sofas, chairs, curtains, and mattresses across ${location.name} and ${region.name} using appropriate methods for each fabric type.`
      },
      {
        q: `Can you protect carpets after cleaning in ${location.name}?`,
        a: `We offer fabric protection treatments for carpets and upholstery in ${location.name}. This helps prevent future staining and extends the life of your furnishings.`
      }
    ],
    pricing: generateDynamicPricing('carpets', location),
    serviceFeatures: [
      'Professional steam cleaning equipment',
      'Stain removal & odor elimination',
      'Pet stain & odor specialist treatment',
      'Upholstery & curtain cleaning',
      'Fabric protection treatment available'
    ],
    trustSignals: [
      `Carpet specialists serving ${location.name}`,
      `Professional steam cleaning equipment`,
      `Stain removal guarantee`,
      `Same-day service available in ${region.name}`
    ],
    successStories: [
      { title: `${location.name} Family Home`, subtitle: 'Pet stain removal success' },
      { title: `${nearbyLocations[0]?.name || 'Local'} Office`, subtitle: 'Commercial carpet refresh' },
      { title: `${nearbyLocations[1]?.name || 'Area'} Rental`, subtitle: 'Full house carpet restoration' }
    ]
  };
}

// Service type mapping
export const SERVICE_GENERATORS = {
  'end-of-tenancy': generateEndOfTenancyPageData,
  'cleaning': generateCleaningPageData,
  'deep-cleaning': generateDeepCleaningPageData,
  'commercial-cleaning': generateCommercialCleaningPageData,
  'carpet-cleaning': generateCarpetCleaningPageData
} as const;

export type ServiceType = keyof typeof SERVICE_GENERATORS;