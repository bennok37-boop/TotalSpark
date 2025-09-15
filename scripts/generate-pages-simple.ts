import { writeFileSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';
import { getAllLocations, REGIONS, LocationData, RegionData } from '../shared/locations';
import { SERVICE_GENERATORS, ServiceType, ServicePageData } from '../shared/service-templates';
import { SERVICES, getComponentName } from '../shared/services';

// Robust path resolution
const PROJECT_ROOT = resolve(process.cwd());
const PAGES_OUTPUT_DIR = resolve(PROJECT_ROOT, 'client/src/pages/generated');

console.log('📁 Output directory:', PAGES_OUTPUT_DIR);

// Safe string interpolation for generated TSX
function safeString(str: string): string {
  return JSON.stringify(str);
}

// Simplified page component generator (essential features only)
function generatePageComponent(
  serviceData: ServicePageData, 
  serviceType: ServiceType,
  serviceDisplayName: string
): string {
  const componentName = getComponentName(serviceData.location.name, serviceType);

  return `import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ${componentName}() {
  useEffect(() => {
    document.title = ${safeString(serviceData.metaTitle)};
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', ${safeString(serviceData.metaDescription)});
    }
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
              {${safeString(serviceData.heroTitle)}}
            </h1>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
              {${safeString(serviceData.heroSubtitle)}}
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
                  <p className="font-medium">{${safeString(feature)}}</p>
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
                  <CardTitle className="text-lg">{${safeString(price.size)}}</CardTitle>
                  <CardDescription>{${safeString(price.description)}}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{${safeString(price.price)}}</div>
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

// Main generation function with better error handling
export function generateAllPagesSimple(): void {
  console.log('🚀 Starting simplified page generation...');
  
  try {
    const allLocations = getAllLocations();
    const allRegions = Object.values(REGIONS);
    
    console.log(`📊 Found ${allLocations.length} locations and ${SERVICES.length} services`);
    console.log(`📊 Will generate ${allLocations.length * SERVICES.length} pages`);
    
    // Ensure directory exists
    console.log('📁 Creating output directory...');
    mkdirSync(PAGES_OUTPUT_DIR, { recursive: true });
    
    let totalGenerated = 0;
    let errors = 0;
    
    // Generate pages for each service-location combination
    SERVICES.forEach((service, serviceIndex) => {
      console.log(`📄 Generating ${service.displayName} pages... (${serviceIndex + 1}/${SERVICES.length})`);
      
      allLocations.forEach((location, locationIndex) => {
        try {
          // Find the region for this location
          const region = allRegions.find(r => 
            r.locations.some(loc => loc.slug === location.slug)
          );
          
          if (!region) {
            console.warn(`⚠️  Region not found for location: ${location.name}`);
            errors++;
            return;
          }
          
          // Generate service data using the template
          const serviceGenerator = SERVICE_GENERATORS[service.type as ServiceType];
          const serviceData = serviceGenerator(location, region);
          
          // Generate the page component
          const componentCode = generatePageComponent(serviceData, service.type as ServiceType, service.displayName);
          
          // Create filename
          const componentName = getComponentName(location.name, service.type);
          const filename = `${componentName}.tsx`;
          const filepath = join(PAGES_OUTPUT_DIR, filename);
          
          // Write the file
          writeFileSync(filepath, componentCode);
          totalGenerated++;
          
          if (totalGenerated % 50 === 0) {
            console.log(`✅ Generated ${totalGenerated} pages...`);
          }
          
        } catch (error) {
          console.error(`❌ Error generating page for ${location.name} - ${service.displayName}:`, error);
          errors++;
        }
      });
    });
    
    console.log(`🎉 Generation complete!`);
    console.log(`✅ Successfully generated: ${totalGenerated} pages`);
    console.log(`❌ Errors encountered: ${errors}`);
    console.log(`📁 Output directory: ${PAGES_OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('💥 Fatal error during generation:', error);
    process.exit(1);
  }
}

// Run the generation
generateAllPagesSimple();