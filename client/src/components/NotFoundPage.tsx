import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, MapPin, Search } from 'lucide-react';
import { REGIONS } from '@shared/locations';
import SEOHead from '@/components/SEOHead';

interface NotFoundPageProps {
  locationSlug?: string;
  type?: 'location' | 'general';
}

export default function NotFoundPage({ locationSlug, type = 'general' }: NotFoundPageProps) {
  const isLocationNotFound = type === 'location' && locationSlug;
  
  const title = isLocationNotFound 
    ? `Location "${locationSlug}" Not Found | CleanPro` 
    : 'Page Not Found | CleanPro';
    
  const description = isLocationNotFound
    ? `Sorry, we couldn't find cleaning services for "${locationSlug}". See all areas we cover in the North East UK.`
    : 'Sorry, the page you are looking for could not be found. Browse our cleaning services and coverage areas.';

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={title}
        description={description}
        ogTitle={title}
        ogDescription={description}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isLocationNotFound ? 'Location Not Found' : 'Page Not Found'}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {isLocationNotFound 
                ? `We couldn't find cleaning services for "${locationSlug}". Don't worry - we cover many areas across the North East!`
                : 'Sorry, the page you are looking for could not be found.'
              }
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <Button asChild size="lg" data-testid="button-go-home">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" data-testid="button-view-areas">
              <Link href="/areas">
                <MapPin className="w-5 h-5 mr-2" />
                View All Coverage Areas
              </Link>
            </Button>
          </div>

          {isLocationNotFound && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Areas We Cover</h2>
                <p className="text-muted-foreground mb-6">
                  We provide cleaning services across 73+ locations in the North East UK:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {Object.values(REGIONS).map((region) => (
                    <div key={region.slug}>
                      <h3 className="font-semibold mb-2">{region.name}</h3>
                      <div className="space-y-1">
                        {region.locations.slice(0, 3).map((location) => (
                          <Link 
                            key={location.slug} 
                            href={`/cleaning/${location.slug}`}
                            className="block text-sm text-primary hover:underline"
                            data-testid={`link-suggested-${location.slug}`}
                          >
                            {location.name}
                          </Link>
                        ))}
                        {region.locations.length > 3 && (
                          <Link 
                            href="/areas" 
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            +{region.locations.length - 3} more areas...
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}