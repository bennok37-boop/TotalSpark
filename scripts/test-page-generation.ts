import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getAllLocations, REGIONS, LocationData, RegionData } from '../shared/locations';
import { SERVICE_GENERATORS, ServiceType, ServicePageData } from '../shared/service-templates';

// Test with just a few locations and services
const TEST_SERVICES = [
  { type: 'end-of-tenancy' as ServiceType, urlSegment: 'end-of-tenancy-cleaning', displayName: 'End of Tenancy Cleaning' },
  { type: 'cleaning' as ServiceType, urlSegment: 'cleaning-services', displayName: 'Cleaning Services' }
];

const TEST_LOCATIONS = [
  'newcastle-upon-tyne',
  'sunderland',
  'durham'
];

// Simple page component template for testing
function generateTestPageComponent(
  serviceData: ServicePageData, 
  serviceType: ServiceType,
  serviceDisplayName: string
): string {
  const componentName = `${serviceData.location.name.replace(/[^a-zA-Z0-9]/g, '')}${serviceType.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('')}Page`;

  return `import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ${componentName}() {
  useEffect(() => {
    document.title = "${serviceData.metaTitle}";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-service-type">
              ${serviceDisplayName} in ${serviceData.location.name}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="text-hero-title">
              ${serviceData.heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
              ${serviceData.heroSubtitle}
            </p>
            <Button size="lg" className="text-lg px-8 py-6" data-testid="button-get-quote">
              Get Free Quote Now
            </Button>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center" data-testid="text-features-title">
              ${serviceDisplayName} Services in ${serviceData.location.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              ${serviceData.serviceFeatures.slice(0, 4).map((feature, index) => `
              <Card className="hover-elevate" data-testid="card-service-feature-${index}">
                <CardContent className="p-6">
                  <p className="font-medium">${feature}</p>
                </CardContent>
              </Card>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center" data-testid="text-pricing-title">
              ${serviceDisplayName} Prices in ${serviceData.location.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${serviceData.pricing.slice(0, 3).map((price, index) => `
              <Card className="hover-elevate" data-testid="card-pricing-${index}">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">${price.size}</CardTitle>
                  <CardDescription>${price.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">${price.price}</div>
                </CardContent>
              </Card>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
              Ready to Book ${serviceDisplayName} in ${serviceData.location.name}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your free quote today and experience professional cleaning services
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" data-testid="button-final-quote">
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}`;
}

// Test page generation
export function generateTestPages(): void {
  console.log('🧪 Starting test page generation...');
  
  const allLocations = getAllLocations();
  const testLocations = allLocations.filter(loc => TEST_LOCATIONS.includes(loc.slug));
  
  // Ensure test directory exists
  mkdirSync('client/src/pages/generated', { recursive: true });
  
  let totalGenerated = 0;
  
  TEST_SERVICES.forEach(service => {
    console.log(`📄 Generating test ${service.displayName} pages...`);
    
    testLocations.forEach(location => {
      // Find the region for this location
      const allRegions = Object.values(REGIONS);
      const region = allRegions.find(r => 
        r.locations.some(loc => loc.slug === location.slug)
      );
      
      if (!region) {
        console.warn(`⚠️  Region not found for location: ${location.name}`);
        return;
      }
      
      // Generate service data using the template
      const serviceGenerator = SERVICE_GENERATORS[service.type];
      const serviceData = serviceGenerator(location, region);
      
      // Generate the page component
      const componentCode = generateTestPageComponent(serviceData, service.type, service.displayName);
      
      // Create filename
      const componentName = `${location.name.replace(/[^a-zA-Z0-9]/g, '')}${service.type.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('')}Page`;
      
      const filename = `${componentName}.tsx`;
      const filepath = join('client/src/pages/generated', filename);
      
      // Write the file
      writeFileSync(filepath, componentCode);
      totalGenerated++;
      
      console.log(`✅ Generated: ${componentName}`);
    });
  });
  
  console.log(`🎉 Test generation complete!`);
  console.log(`📊 Total test pages generated: ${totalGenerated}`);
  console.log(`📊 Expected: ${TEST_SERVICES.length * testLocations.length}`);
}

// CLI usage - ESM version
generateTestPages();