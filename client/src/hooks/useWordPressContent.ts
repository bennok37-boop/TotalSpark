import { useQuery } from '@tanstack/react-query';
import { wordpressApi } from '@/lib/wordpressApi';
import { type CitySlug, type ServiceType } from '@shared/schema';

// Hook for fetching services from WordPress
export function useServices(serviceType?: ServiceType) {
  return useQuery({
    queryKey: ['wordpress-services', serviceType],
    queryFn: () => wordpressApi.getServices(serviceType),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1
  });
}

// Hook for fetching locations from WordPress
export function useLocations() {
  return useQuery({
    queryKey: ['wordpress-locations'],
    queryFn: () => wordpressApi.getLocations(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1
  });
}

// Hook for fetching before/after pairs from WordPress
export function useBeforeAfterPairs(params: { citySlug?: CitySlug; service?: ServiceType } = {}) {
  return useQuery({
    queryKey: ['wordpress-before-after', params],
    queryFn: () => wordpressApi.getBeforeAfterPairs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1
  });
}

// Hook for fetching testimonials from WordPress
export function useTestimonials(limit: number = 10) {
  return useQuery({
    queryKey: ['wordpress-testimonials', limit],
    queryFn: () => wordpressApi.getTestimonials(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 1
  });
}

// Hook for fetching single service by slug
export function useService(slug: string) {
  return useQuery({
    queryKey: ['wordpress-service', slug],
    queryFn: async () => {
      const services = await wordpressApi.getServices();
      return services.find(service => service.slug === slug);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1
  });
}

// Hook for fetching single location by slug
export function useLocation(slug: string) {
  return useQuery({
    queryKey: ['wordpress-location', slug],
    queryFn: async () => {
      const locations = await wordpressApi.getLocations();
      return locations.find(location => location.slug === slug);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1
  });
}