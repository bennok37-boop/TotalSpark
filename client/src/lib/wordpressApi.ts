import { type BeforeAfterPair, type CitySlug, type ServiceType } from "@shared/schema";

// WordPress API client for TotalSpark Solutions
export class WordPressAPI {
  private baseUrl: string;
  private fallbackData: boolean = false;

  constructor() {
    // In development, WordPress might run on different port
    // In production, it would be on the same domain
    this.baseUrl = import.meta.env.VITE_WORDPRESS_URL || '/wordpress';
    
    // Check if WordPress is available
    this.checkWordPressAvailability();
  }

  private async checkWordPressAvailability() {
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/`);
      if (!response.ok) {
        throw new Error('WordPress API not available');
      }
    } catch (error) {
      console.warn('WordPress API not available, falling back to existing data:', error);
      this.fallbackData = true;
    }
  }

  // Fetch cleaning services from WordPress
  async getServices(serviceType?: ServiceType): Promise<any[]> {
    if (this.fallbackData) {
      return this.getFallbackServices(serviceType);
    }

    try {
      let url = `${this.baseUrl}/wp-json/wp/v2/services?per_page=100`;
      if (serviceType) {
        url += `&meta_key=service_type&meta_value=${serviceType}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch services');

      const services = await response.json();
      return services.map((service: any) => ({
        id: service.id,
        title: service.title.rendered,
        description: service.content.rendered,
        serviceType: service.service_type || serviceType,
        features: service.service_features || [],
        basePrice: service.base_price || 0,
        featuredImage: service.featured_image_url,
        slug: service.slug
      }));
    } catch (error) {
      console.warn('Error fetching services from WordPress, using fallback:', error);
      return this.getFallbackServices(serviceType);
    }
  }

  // Fetch locations from WordPress
  async getLocations(): Promise<any[]> {
    if (this.fallbackData) {
      return this.getFallbackLocations();
    }

    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/locations?per_page=100`);
      if (!response.ok) throw new Error('Failed to fetch locations');

      const locations = await response.json();
      return locations.map((location: any) => ({
        id: location.id,
        name: location.title.rendered,
        description: location.content.rendered,
        citySlug: location.city_slug,
        phoneNumber: location.phone_number,
        coverageAreas: location.coverage_areas || [],
        featuredImage: location.featured_image_url,
        slug: location.slug
      }));
    } catch (error) {
      console.warn('Error fetching locations from WordPress, using fallback:', error);
      return this.getFallbackLocations();
    }
  }

  // Fetch before/after pairs from WordPress
  async getBeforeAfterPairs(params: { citySlug?: CitySlug; service?: ServiceType } = {}): Promise<BeforeAfterPair[]> {
    if (this.fallbackData) {
      return this.getFallbackBeforeAfterPairs(params);
    }

    try {
      let url = `${this.baseUrl}/wp-json/wp/v2/before-after?per_page=100`;
      
      // Use custom endpoint for city-specific filtering
      if (params.citySlug) {
        url = `${this.baseUrl}/wp-json/totalspark/v1/before-after/${params.citySlug}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch before/after pairs');

      const pairs = await response.json();
      return pairs.map((pair: any) => ({
        id: pair.id,
        citySlug: pair.location_slug || params.citySlug,
        service: pair.service_category || params.service || 'deep',
        beforeSrc: pair.before_image,
        afterSrc: pair.after_image,
        title: pair.title?.rendered || pair.title,
        caption: pair.description || pair.caption,
        takenAt: null,
        tags: null,
        createdAt: new Date()
      }));
    } catch (error) {
      console.warn('Error fetching before/after pairs from WordPress, using fallback:', error);
      return this.getFallbackBeforeAfterPairs(params);
    }
  }

  // Fetch testimonials from WordPress
  async getTestimonials(limit: number = 10): Promise<any[]> {
    if (this.fallbackData) {
      return this.getFallbackTestimonials(limit);
    }

    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/testimonials?per_page=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');

      const testimonials = await response.json();
      return testimonials.map((testimonial: any) => ({
        id: testimonial.id,
        customerName: testimonial.customer_name,
        customerLocation: testimonial.customer_location,
        rating: testimonial.rating || 5,
        serviceUsed: testimonial.service_used,
        content: testimonial.content.rendered,
        date: testimonial.date,
        slug: testimonial.slug
      }));
    } catch (error) {
      console.warn('Error fetching testimonials from WordPress, using fallback:', error);
      return this.getFallbackTestimonials(limit);
    }
  }

  // Fallback data methods (using existing data structure)
  private getFallbackServices(serviceType?: ServiceType): any[] {
    const services = [
      {
        id: 1,
        title: 'End of Tenancy Cleaning',
        description: 'Comprehensive cleaning service to help you get your full deposit back. Our thorough end of tenancy clean covers every aspect of your property.',
        serviceType: 'endOfTenancy',
        features: [
          'Deposit-back guarantee',
          'All rooms deep cleaned',
          'Kitchen appliance cleaning',
          'Bathroom sanitization',
          'Window cleaning (inside)',
          'Carpet vacuuming'
        ],
        basePrice: 120,
        slug: 'end-of-tenancy-cleaning'
      },
      {
        id: 2,
        title: 'Deep Cleaning Service',
        description: 'Thorough deep cleaning service for homes that need extra attention. Perfect for spring cleaning or one-off deep cleans.',
        serviceType: 'deep',
        features: [
          'Every surface cleaned',
          'Inside of appliances',
          'Detailed bathroom clean',
          'Kitchen degreasing',
          'Skirting boards & doors',
          'Light fixtures & switches'
        ],
        basePrice: 150,
        slug: 'deep-cleaning'
      },
      {
        id: 3,
        title: 'Commercial Cleaning',
        description: 'Professional office and commercial space cleaning services with flexible scheduling to suit your business needs.',
        serviceType: 'commercial',
        features: [
          'Flexible scheduling',
          'Professional equipment',
          'Fully insured staff',
          'Regular service available',
          'Health & safety compliant',
          'Waste management included'
        ],
        basePrice: 80,
        slug: 'commercial-cleaning'
      },
      {
        id: 4,
        title: 'Carpet & Upholstery Cleaning',
        description: 'Professional carpet and upholstery cleaning using advanced hot water extraction equipment for superior results.',
        serviceType: 'carpets',
        features: [
          'Hot water extraction method',
          'Stain removal treatment',
          'Pet odor elimination',
          'Fast drying process',
          'Eco-friendly products',
          'Fabric protection available'
        ],
        basePrice: 25,
        slug: 'carpet-upholstery-cleaning'
      }
    ];

    return serviceType ? services.filter(s => s.serviceType === serviceType) : services;
  }

  private getFallbackLocations(): any[] {
    return [
      {
        id: 1,
        name: 'Newcastle upon Tyne',
        description: 'Professional cleaning services in Newcastle and surrounding areas.',
        citySlug: 'newcastle-upon-tyne',
        phoneNumber: '03300432115',
        coverageAreas: ['Newcastle', 'Gateshead', 'South Shields', 'Wallsend'],
        slug: 'newcastle-upon-tyne'
      },
      {
        id: 2,
        name: 'Leeds',
        description: 'Expert cleaning services throughout Leeds and West Yorkshire.',
        citySlug: 'leeds',
        phoneNumber: '0113 456 7890',
        coverageAreas: ['Leeds', 'Bradford', 'Wakefield', 'Huddersfield'],
        slug: 'leeds'
      },
      {
        id: 3,
        name: 'York',
        description: 'Quality cleaning services in York and North Yorkshire.',
        citySlug: 'york',
        phoneNumber: '01904 567 890',
        coverageAreas: ['York', 'Harrogate', 'Selby', 'Malton'],
        slug: 'york'
      },
      {
        id: 4,
        name: 'Sunderland',
        description: 'Reliable cleaning services in Sunderland and County Durham.',
        citySlug: 'sunderland',
        phoneNumber: '03300432115',
        coverageAreas: ['Sunderland', 'Durham', 'Chester-le-Street', 'Washington'],
        slug: 'sunderland'
      },
      {
        id: 5,
        name: 'Middlesbrough',
        description: 'Professional cleaning services in Middlesbrough and Teesside.',
        citySlug: 'middlesbrough',
        phoneNumber: '01642 345 678',
        coverageAreas: ['Middlesbrough', 'Stockton-on-Tees', 'Redcar', 'Thornaby'],
        slug: 'middlesbrough'
      }
    ];
  }

  private getFallbackBeforeAfterPairs(params: { citySlug?: CitySlug; service?: ServiceType } = {}): BeforeAfterPair[] {
    const allPairs: BeforeAfterPair[] = [
      {
        id: '1',
        citySlug: 'newcastle-upon-tyne',
        service: 'deep',
        beforeSrc: '/attached_assets/generated_images/Messy_Newcastle_living_room_7db9f580.png',
        afterSrc: '/attached_assets/generated_images/Clean_Newcastle_living_room_5001ab49.png',
        title: 'Newcastle Living Room Deep Clean',
        caption: 'Complete living room transformation - from cluttered mess to spotless comfort',
        takenAt: null,
        tags: null,
        createdAt: new Date()
      },
      {
        id: '2',
        citySlug: 'leeds',
        service: 'deep',
        beforeSrc: '/attached_assets/generated_images/Messy_Leeds_kitchen_93b8ad6e.png',
        afterSrc: '/attached_assets/generated_images/Clean_Leeds_kitchen_d40edaae.png',
        title: 'Leeds Kitchen Deep Clean',
        caption: 'Kitchen restoration - from grease and grime to sparkling surfaces',
        takenAt: null,
        tags: null,
        createdAt: new Date()
      },
      {
        id: '3',
        citySlug: 'york',
        service: 'deep',
        beforeSrc: '/attached_assets/generated_images/Dirty_York_bathroom_d8bf81f9.png',
        afterSrc: '/attached_assets/generated_images/Clean_York_bathroom_e19abd8d.png',
        title: 'York Bathroom Deep Clean',
        caption: 'Bathroom renovation - from soap scum to pristine shine',
        takenAt: null,
        tags: null,
        createdAt: new Date()
      },
      {
        id: '4',
        citySlug: 'sunderland',
        service: 'endOfTenancy',
        beforeSrc: '/attached_assets/generated_images/Messy_Sunderland_bedroom_9590095c.png',
        afterSrc: '/attached_assets/generated_images/Clean_Sunderland_bedroom_46db1d8c.png',
        title: 'Sunderland End of Tenancy Clean',
        caption: 'Move-out cleaning - from tenant mess to landlord-ready condition',
        takenAt: null,
        tags: null,
        createdAt: new Date()
      },
      {
        id: '5',
        citySlug: 'middlesbrough',
        service: 'commercial',
        beforeSrc: '/attached_assets/generated_images/Messy_Middlesbrough_office_aeede406.png',
        afterSrc: '/attached_assets/generated_images/Clean_Middlesbrough_office_ac4da46b.png',
        title: 'Middlesbrough Office Commercial Clean',
        caption: 'Workplace transformation - from cluttered chaos to professional space',
        takenAt: null,
        tags: null,
        createdAt: new Date()
      }
    ];

    let filteredPairs = allPairs;

    if (params.citySlug) {
      filteredPairs = filteredPairs.filter(pair => pair.citySlug === params.citySlug);
    }

    if (params.service) {
      filteredPairs = filteredPairs.filter(pair => pair.service === params.service);
    }

    return filteredPairs;
  }

  private getFallbackTestimonials(limit: number): any[] {
    const testimonials = [
      {
        id: 1,
        customerName: 'Sarah Johnson',
        customerLocation: 'Newcastle',
        rating: 5,
        serviceUsed: 'endOfTenancy',
        content: 'Absolutely fantastic service! Got my full deposit back thanks to TotalSpark. The team was professional and thorough.',
        date: '2024-03-15',
        slug: 'sarah-johnson-newcastle'
      },
      {
        id: 2,
        customerName: 'Michael Thompson',
        customerLocation: 'Leeds',
        rating: 5,
        serviceUsed: 'deep',
        content: 'Amazing deep clean service. My house has never looked better! Highly recommend TotalSpark Solutions.',
        date: '2024-03-10',
        slug: 'michael-thompson-leeds'
      },
      {
        id: 3,
        customerName: 'Emma Wilson',
        customerLocation: 'York',
        rating: 5,
        serviceUsed: 'commercial',
        content: 'Professional office cleaning that fits our schedule perfectly. Great value for money and excellent results.',
        date: '2024-03-08',
        slug: 'emma-wilson-york'
      },
      {
        id: 4,
        customerName: 'James Miller',
        customerLocation: 'Sunderland',
        rating: 5,
        serviceUsed: 'carpets',
        content: 'Carpet cleaning was outstanding. Removed stains I thought were permanent. Highly professional service.',
        date: '2024-03-05',
        slug: 'james-miller-sunderland'
      },
      {
        id: 5,
        customerName: 'Lisa Roberts',
        customerLocation: 'Middlesbrough',
        rating: 5,
        serviceUsed: 'endOfTenancy',
        content: 'End of tenancy clean was perfect. Got my deposit back in full and the landlord was impressed!',
        date: '2024-03-01',
        slug: 'lisa-roberts-middlesbrough'
      }
    ];

    return testimonials.slice(0, limit);
  }
}

// Create singleton instance
export const wordpressApi = new WordPressAPI();