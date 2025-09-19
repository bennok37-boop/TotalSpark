import { useQuery } from '@tanstack/react-query';
import { BeforeAfterPair } from '@shared/schema';
import BeforeAfterSlider from './BeforeAfterSlider';

interface BeforeAfterGalleryProps {
  citySlug?: string;
  service?: string;
  limit?: number;
}

const serviceDisplayNames: Record<string, string> = {
  endOfTenancy: 'End of Tenancy',
  deep: 'Deep Cleaning',
  commercial: 'Commercial Cleaning',
  carpets: 'Carpet Cleaning'
};

const cityDisplayNames: Record<string, string> = {
  'newcastle-upon-tyne': 'Newcastle',
  'leeds': 'Leeds',
  'york': 'York', 
  'sunderland': 'Sunderland',
  'middlesbrough': 'Middlesbrough'
};

export default function BeforeAfterGallery({ citySlug, service, limit = 3 }: BeforeAfterGalleryProps) {
  const { data: beforeAfterPairs = [], isLoading, error } = useQuery<BeforeAfterPair[]>({
    queryKey: ['/api/media/before-after', citySlug, service],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (citySlug) params.append('city', citySlug);
      if (service) params.append('service', service);
      
      const response = await fetch(`/api/media/before-after?${params}`);
      if (!response.ok) throw new Error('Failed to fetch before/after pairs');
      return response.json();
    }
  });

  // Limit the number of pairs displayed
  const displayPairs = beforeAfterPairs.slice(0, limit);
  if (error) {
    return (
      <section className="py-16" data-testid="section-before-after-gallery">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Unable to load before/after gallery at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" data-testid="section-before-after-gallery">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Difference</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real transformations from our recent cleaning projects across North East England. Drag the slider to see the before and after results.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse" data-testid={`skeleton-gallery-${index + 1}`}>
                <div className="bg-muted h-64 rounded-t-lg"></div>
                <div className="p-6 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayPairs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPairs.map((pair) => (
              <BeforeAfterSlider
                key={pair.id}
                beforeSrc={pair.beforeSrc}
                afterSrc={pair.afterSrc}
                title={pair.title}
                caption={pair.caption || undefined}
                cityName={cityDisplayNames[pair.citySlug] || pair.citySlug}
                serviceName={serviceDisplayNames[pair.service] || pair.service}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transformations available for this area yet.</p>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">1,000+</div>
            <div className="text-muted-foreground text-sm">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground text-sm">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">48hrs</div>
            <div className="text-muted-foreground text-sm">Booking Response</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground text-sm">Deposit Returned</div>
          </div>
        </div>
      </div>
    </section>
  );
}