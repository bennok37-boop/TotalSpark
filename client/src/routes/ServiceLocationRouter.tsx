import { Route, Switch } from 'wouter';
import { lazy, Suspense } from 'react';
import { getAllLocations } from '../../../shared/locations';
import { Skeleton } from '@/components/ui/skeleton';

// Service configuration matching the generator
const SERVICES = [
  { type: 'end-of-tenancy', urlSegment: 'end-of-tenancy-cleaning', displayName: 'End of Tenancy Cleaning' },
  { type: 'cleaning', urlSegment: 'cleaning-services', displayName: 'Cleaning Services' },
  { type: 'deep-cleaning', urlSegment: 'deep-cleaning', displayName: 'Deep Cleaning' },
  { type: 'commercial-cleaning', urlSegment: 'commercial-cleaning', displayName: 'Commercial Cleaning' },
  { type: 'carpet-cleaning', urlSegment: 'carpet-cleaning', displayName: 'Carpet & Upholstery Cleaning' }
];

// Helper function to create component name from location and service
function getComponentName(locationName: string, serviceType: string): string {
  return `${locationName.replace(/[^a-zA-Z0-9]/g, '')}${serviceType.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')}Page`;
}

// Dynamic route component that lazy loads the appropriate page
function ServiceLocationRoute({ 
  serviceUrlSegment, 
  serviceType, 
  locationSlug 
}: { 
  serviceUrlSegment: string; 
  serviceType: string; 
  locationSlug: string; 
}) {
  // Find the location data
  const allLocations = getAllLocations();
  const location = allLocations.find(loc => loc.slug === locationSlug);
  
  if (!location) {
    return <div>Location not found</div>;
  }
  
  // Generate component name
  const componentName = getComponentName(location.name, serviceType);
  
  // Lazy load the component
  const PageComponent = lazy(() => 
    /* @vite-ignore */ import(`@/pages/generated/${componentName}.tsx`)
      .catch(() => import('@/pages/not-found')) // Fallback to 404 if page doesn't exist
  );
  
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="grid gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    }>
      <PageComponent />
    </Suspense>
  );
}

// Generate all routes dynamically
export function ServiceLocationRouter() {
  const allLocations = getAllLocations();
  
  return (
    <Switch>
      {SERVICES.map(service => 
        allLocations.map(location => (
          <Route 
            key={`${service.urlSegment}-${location.slug}`}
            path={`/${service.urlSegment}-${location.slug}`}
          >
            <ServiceLocationRoute 
              serviceUrlSegment={service.urlSegment}
              serviceType={service.type}
              locationSlug={location.slug}
            />
          </Route>
        ))
      ).flat()}
    </Switch>
  );
}