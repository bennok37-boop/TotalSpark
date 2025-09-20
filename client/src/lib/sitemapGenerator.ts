// Sitemap Generation for Google Search Console and Bing Webmaster Tools
// Generates comprehensive sitemap for all service and city combinations

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export class SitemapGenerator {
  private baseUrl: string;
  private urls: SitemapURL[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  private addURL(
    path: string, 
    priority: number = 0.5, 
    changefreq: SitemapURL['changefreq'] = 'weekly'
  ) {
    this.urls.push({
      loc: `${this.baseUrl}${path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq,
      priority: priority.toFixed(1)
    });
  }

  generateSitemap(): string {
    this.urls = []; // Reset

    // Homepage - highest priority
    this.addURL('/', 1.0, 'weekly');

    // Main service pages - high priority
    this.addURL('/end-of-tenancy-cleaning', 0.9, 'weekly');
    this.addURL('/deep-cleaning', 0.9, 'weekly');
    this.addURL('/commercial-cleaning', 0.9, 'weekly');
    this.addURL('/carpet-upholstery-cleaning', 0.9, 'weekly');

    // Special service pages
    this.addURL('/end-of-tenancy-cleaning-newcastle', 0.8, 'weekly');

    // Information pages
    this.addURL('/about', 0.7, 'monthly');
    this.addURL('/areas', 0.8, 'monthly');
    this.addURL('/quote', 0.9, 'weekly');
    this.addURL('/reviews', 0.7, 'weekly');
    this.addURL('/insurance', 0.6, 'monthly');
    this.addURL('/guarantee', 0.6, 'monthly');

    // Legal pages - lower priority
    this.addURL('/privacy', 0.3, 'yearly');
    this.addURL('/terms', 0.3, 'yearly');
    this.addURL('/complaints', 0.3, 'yearly');

    // City pages from REGIONS data
    this.generateCityPages();
    
    // Service-city combination pages
    this.generateServiceCityPages();

    return this.buildXMLSitemap();
  }

  private generateCityPages() {
    // Major cities - higher priority
    const majorCities = [
      'newcastle-upon-tyne', 'sunderland', 'middlesbrough', 
      'durham', 'gateshead', 'south-shields', 'north-shields'
    ];

    majorCities.forEach(city => {
      this.addURL(`/cleaning/${city}`, 0.8, 'weekly');
    });

    // Other cities - medium priority  
    const otherCities = [
      'darlington', 'hartlepool', 'stockton-on-tees', 'washington',
      'consett', 'stanley', 'chester-le-street', 'houghton-le-spring',
      'seaham', 'peterlee', 'newton-aycliffe', 'spennymoor', 'ferryhill',
      'bishop-auckland', 'crook', 'morpeth', 'cramlington', 'hexham',
      'alnwick', 'berwick-upon-tweed', 'prudhoe', 'ponteland', 'wallsend',
      'tynemouth', 'whitley-bay', 'blyth', 'killingworth', 'longbenton'
    ];

    otherCities.forEach(city => {
      this.addURL(`/cleaning/${city}`, 0.7, 'weekly');
    });
  }

  private generateServiceCityPages() {
    const services = [
      'end-of-tenancy-cleaning',
      'deep-cleaning', 
      'commercial-cleaning',
      'carpet-cleaning'
    ];

    const cities = [
      'newcastle-upon-tyne', 'sunderland', 'middlesbrough', 'durham',
      'gateshead', 'south-shields', 'north-shields', 'darlington',
      'hartlepool', 'stockton-on-tees', 'washington', 'morpeth'
    ];

    services.forEach(service => {
      cities.forEach(city => {
        this.addURL(`/${service}/${city}`, 0.6, 'weekly');
      });
    });
  }

  private buildXMLSitemap(): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const urlsetClose = '</urlset>';

    const urlsXML = this.urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n');

    return xmlHeader + urlsetOpen + urlsXML + '\n' + urlsetClose;
  }

  // Generate robots.txt content
  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml

# Disallow admin and api paths
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /wordpress/

# Allow important pages
Allow: /cleaning/
Allow: /end-of-tenancy-cleaning/
Allow: /deep-cleaning/
Allow: /commercial-cleaning/
Allow: /carpet-upholstery-cleaning/`;
  }

  getURLs(): SitemapURL[] {
    return this.urls;
  }

  getURLCount(): number {
    return this.urls.length;
  }
}

// Helper function to generate sitemap for current domain
export const generateSitemapForDomain = (domain?: string): string => {
  const baseUrl = domain || window.location.origin;
  const generator = new SitemapGenerator(baseUrl);
  return generator.generateSitemap();
};

// Helper function to generate robots.txt
export const generateRobotsTxt = (domain?: string): string => {
  const baseUrl = domain || window.location.origin;
  const generator = new SitemapGenerator(baseUrl);
  return generator.generateRobotsTxt();
};