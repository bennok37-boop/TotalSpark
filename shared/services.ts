// Shared service configuration for page generation and routing
// This ensures consistency between the generator script and frontend router

export interface ServiceConfig {
  type: string;
  urlSegment: string;
  displayName: string;
}

// Unified service configuration used by both generator and router
export const SERVICES: ServiceConfig[] = [
  { type: 'end-of-tenancy', urlSegment: 'end-of-tenancy-cleaning', displayName: 'End of Tenancy Cleaning' },
  { type: 'cleaning', urlSegment: 'cleaning-services', displayName: 'Cleaning Services' },
  { type: 'deep-cleaning', urlSegment: 'deep-cleaning', displayName: 'Deep Cleaning' },
  { type: 'commercial-cleaning', urlSegment: 'commercial-cleaning', displayName: 'Commercial Cleaning' },
  { type: 'carpet-cleaning', urlSegment: 'carpet-cleaning', displayName: 'Carpet & Upholstery Cleaning' }
];

// Helper function to create component name from location and service
export function getComponentName(locationName: string, serviceType: string): string {
  return `${locationName.replace(/[^a-zA-Z0-9]/g, '')}${serviceType.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')}Page`;
}

// Helper to get service by type
export function getServiceByType(type: string): ServiceConfig | undefined {
  return SERVICES.find(service => service.type === type);
}

// Helper to get all service types
export function getAllServiceTypes(): string[] {
  return SERVICES.map(service => service.type);
}