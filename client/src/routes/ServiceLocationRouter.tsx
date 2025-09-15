import { Route, Switch } from 'wouter';
import { lazy, Suspense } from 'react';
import { getAllLocations } from '../../../shared/locations';
import { SERVICES, getComponentName } from '../../../shared/services';
import { Skeleton } from '@/components/ui/skeleton';

// Pre-load all generated pages using import.meta.glob for production safety
const generatedPages = import.meta.glob('@/pages/generated/*.tsx');

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
  
  // Generate component name and file path
  const componentName = getComponentName(location.name, serviceType);
  const pageKey = `/src/pages/generated/${componentName}.tsx`;
  
  // Production-safe lazy loading using pre-registered imports
  const PageComponent = lazy(() => {
    const pageImporter = generatedPages[pageKey];
    if (pageImporter) {
      return pageImporter() as Promise<{ default: React.ComponentType }>;
    }
    // Fallback to 404 if page doesn't exist
    return import('@/pages/not-found');
  });
  
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