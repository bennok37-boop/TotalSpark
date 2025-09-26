// SEO utility functions for TotalSpark Solutions

export interface BusinessInfo {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  areaServed: string[];
  serviceTypes: string[];
}

// Default business information
export const BUSINESS_INFO: BusinessInfo = {
  name: "TotalSpark Solutions",
  description: "Professional cleaning services across North East England. End-of-tenancy, commercial, and deep cleaning with DBS-checked staff and deposit-back guarantee.",
  url: "https://totalsparksolutions.co.uk",
  telephone: "03300432115", // Using the main business number for schema consistency
  email: "hello@totalsparksolutions.co.uk",
  address: {
    streetAddress: "Business Centre",
    addressLocality: "Newcastle upon Tyne",
    addressRegion: "Tyne and Wear",
    postalCode: "NE1 6UF",
    addressCountry: "GB"
  },
  areaServed: [
    "Newcastle upon Tyne",
    "Sunderland", 
    "Durham",
    "Middlesbrough",
    "Gateshead",
    "South Shields",
    "Hartlepool",
    "Stockton-on-Tees",
    "North East England",
    "Tyne and Wear",
    "County Durham",
    "Northumberland"
  ],
  serviceTypes: [
    "End of Tenancy Cleaning",
    "Commercial Cleaning", 
    "Deep Cleaning",
    "Carpet Cleaning",
    "Upholstery Cleaning",
    "Office Cleaning",
    "House Cleaning"
  ]
};

// Generate Organization schema
export function createOrganizationSchema(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BUSINESS_INFO.name,
    "description": BUSINESS_INFO.description,
    "url": BUSINESS_INFO.url,
    "telephone": BUSINESS_INFO.telephone,
    "email": BUSINESS_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_INFO.address.streetAddress,
      "addressLocality": BUSINESS_INFO.address.addressLocality,
      "addressRegion": BUSINESS_INFO.address.addressRegion,
      "postalCode": BUSINESS_INFO.address.postalCode,
      "addressCountry": BUSINESS_INFO.address.addressCountry
    },
    "areaServed": BUSINESS_INFO.areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "logo": `${BUSINESS_INFO.url}/logo.png`,
    "image": `${BUSINESS_INFO.url}/og-image.jpg`,
    "sameAs": [
      // Add social media profiles here when available
    ]
  };
}

// Generate LocalBusiness schema
export function createLocalBusinessSchema(city?: string): Record<string, any> {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_INFO.url,
    "name": city ? `${BUSINESS_INFO.name} - ${city}` : BUSINESS_INFO.name,
    "description": city ? 
      `Professional cleaning services in ${city}. ${BUSINESS_INFO.description}` : 
      BUSINESS_INFO.description,
    "url": BUSINESS_INFO.url,
    "telephone": BUSINESS_INFO.telephone,
    "email": BUSINESS_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_INFO.address.streetAddress,
      "addressLocality": BUSINESS_INFO.address.addressLocality,
      "addressRegion": BUSINESS_INFO.address.addressRegion,
      "postalCode": BUSINESS_INFO.address.postalCode,
      "addressCountry": BUSINESS_INFO.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "54.9783",
      "longitude": "-1.6178"
    },
    "areaServed": BUSINESS_INFO.areaServed.map(area => ({
      "@type": "City", 
      "name": area
    })),
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "54.9783",
        "longitude": "-1.6178"
      },
      "geoRadius": "50000" // 50km radius
    },
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-17:00",
      "Su 10:00-16:00"
    ],
    "priceRange": "££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "logo": `${BUSINESS_INFO.url}/logo.png`,
    "image": `${BUSINESS_INFO.url}/og-image.jpg`
  };

  return baseSchema;
}

// Generate Service schema for specific services
export function createServiceSchema(serviceType: string, city?: string): Record<string, any> {
  const serviceDescriptions: Record<string, string> = {
    "End of Tenancy Cleaning": "Professional end of tenancy cleaning service to ensure you get your deposit back. Deep clean of all rooms, appliances, and fixtures.",
    "Commercial Cleaning": "Reliable commercial cleaning services for offices, retail spaces, and business premises. Regular and one-off cleaning available.",
    "Deep Cleaning": "Comprehensive deep cleaning service covering every detail of your property. Perfect for spring cleaning or move-in preparation.",
    "Carpet Cleaning": "Professional carpet and upholstery cleaning using advanced techniques to remove stains, odors, and allergens.",
    "Upholstery Cleaning": "Expert upholstery cleaning for sofas, chairs, and other fabric furniture to restore freshness and appearance."
  };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": city ? `${serviceType} in ${city}` : serviceType,
    "description": serviceDescriptions[serviceType] || `Professional ${serviceType.toLowerCase()} services`,
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS_INFO.name,
      "telephone": BUSINESS_INFO.telephone,
      "url": BUSINESS_INFO.url
    },
    "areaServed": city ? [city] : BUSINESS_INFO.areaServed,
    "serviceType": serviceType,
    "category": "Cleaning Service"
  };
}

// Generate FAQ schema
export function createFAQSchema(faqs: Array<{question: string, answer: string}>): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question", 
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate breadcrumb schema
export function createBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

// Utility to generate canonical URL
export function createCanonicalUrl(pathname: string): string {
  return `${BUSINESS_INFO.url}${pathname}`;
}

// Generate page-specific keywords
export function generateKeywords(baseKeywords: string[], city?: string, service?: string): string {
  const keywords = [...baseKeywords];
  
  if (city) {
    keywords.push(`${city} cleaning services`, `cleaners in ${city}`, `${city} cleaners`);
  }
  
  if (service) {
    keywords.push(`${service.toLowerCase()}`, `${service.toLowerCase()} service`);
    if (city) {
      keywords.push(`${service.toLowerCase()} ${city}`, `${service.toLowerCase()} in ${city}`);
    }
  }
  
  // Add common local keywords
  keywords.push(
    "North East England",
    "DBS checked cleaners", 
    "insured cleaning service",
    "deposit back guarantee",
    "professional cleaning"
  );
  
  return keywords.join(', ');
}