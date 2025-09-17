import { writeFileSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';
import { getAllLocations, REGIONS, LocationData, RegionData } from '../shared/locations';
import { SERVICE_GENERATORS, ServiceType, ServicePageData } from '../shared/service-templates';
import { SERVICES, ServiceConfig, getComponentName } from '../shared/services';

// Get absolute paths for robust file operations (CommonJS-style for Node.js scripts)
const PROJECT_ROOT = resolve(process.cwd());
const PAGES_OUTPUT_DIR = resolve(PROJECT_ROOT, 'client/src/pages/generated');

// Safe string interpolation for generated TSX
function safeString(str: string): string {
  return JSON.stringify(str);
}

// Generate the page component code
function generatePageComponent(
  serviceData: ServicePageData, 
  serviceType: ServiceType,
  serviceDisplayName: string
): string {
  const componentName = getComponentName(serviceData.location.name, serviceType);

  return `import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Phone, MessageCircle, MapPin, Clock, Star, CheckCircle, Users, Award, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import QuoteForm from '@/components/QuoteForm';
import SEOHead from '@/components/SEOHead';
import { useTrackingNumbers } from '@/hooks/useTrackingNumbers';
import { scrollToQuoteForm } from '@/utils/scroll';
import { 
  createLocalBusinessSchema, 
  createServiceSchema,
  generateKeywords, 
  createCanonicalUrl 
} from '@/utils/seo';

export default function ${componentName}() {
  // Get tracking numbers for this location
  const trackingNumbers = useTrackingNumbers();
  
  // SEO configuration for this location and service
  const pageTitle = ${safeString(serviceData.metaTitle)};
  const pageDescription = ${safeString(serviceData.metaDescription)};
  const cityName = ${safeString(serviceData.location.name)};
  const serviceName = ${safeString(serviceDisplayName)};
  const pageKeywords = generateKeywords([
    serviceName.toLowerCase(),
    "professional cleaners", 
    "DBS checked",
    "insured cleaning service"
  ], cityName);
  
  // Structured data for this location and service
  const structuredData = [
    createLocalBusinessSchema(cityName),
    createServiceSchema(serviceName, cityName)
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        canonicalUrl={createCanonicalUrl(\`/\${${safeString(serviceType)}}-\${${safeString(serviceData.location.slug)}}\`)}
        ogType="service"
        structuredData={structuredData}
      />
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-service-type">
              {${safeString(serviceDisplayName)}} in {${safeString(serviceData.location.name)}}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="text-hero-title">
              {${safeString(serviceData.heroTitle)}}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              {${safeString(serviceData.heroSubtitle)}}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToQuoteForm} data-testid="button-get-quote">
                <Phone className="mr-2 h-5 w-5" />
                Get Free Quote Now
              </Button>
              <a 
                href={\`tel:\${trackingNumbers.phone.replace(/\\s/g, '')}\`}
                className="inline-flex items-center justify-center h-14 px-8 bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background rounded-md font-medium text-lg transition-colors"
                data-testid="button-call-now"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Call {trackingNumbers.phone}
              </a>
            </div>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
              ${serviceData.trustSignals.map(signal => `
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{${safeString(signal)}}</span>
              </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="text-features-title">
                {${safeString(serviceDisplayName)}} Services in {${safeString(serviceData.location.name)}}
              </h2>
              <p className="text-lg text-muted-foreground">
                Professional cleaning services across {${safeString(serviceData.location.name)}} and surrounding {${safeString(serviceData.region.name)}} areas
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              ${serviceData.serviceFeatures.map(feature => `
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{${safeString(feature)}}</p>
                    </div>
                  </div>
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
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="text-pricing-title">
                {${safeString(serviceDisplayName)}} Prices in {${safeString(serviceData.location.name)}}
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent pricing for {${safeString(serviceData.location.name)}} properties
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${serviceData.pricing.map((price, index) => `
              <Card className="hover-elevate" data-testid="card-pricing-${index}">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{${safeString(price.size)}}</CardTitle>
                  <CardDescription>{${safeString(price.description)}}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{${safeString(price.price)}}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-${index}">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      {/* Local Areas */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="text-areas-title">
                Areas We Cover Near {${safeString(serviceData.location.name)}}
              </h2>
              <p className="text-lg text-muted-foreground">
                {${safeString(serviceDisplayName)}} services across {${safeString(serviceData.region.name)}}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${serviceData.nearbyAreas.map(area => `
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-${area.slug}">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{${safeString(area.name)}}</span>
                  </div>
                </CardContent>
              </Card>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="text-faq-title">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions about {${safeString(serviceDisplayName.toLowerCase())}} in {${safeString(serviceData.location.name)}}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              ${serviceData.faqs.map((faq, index) => `
              <AccordionItem value="item-${index}" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-${index}">
                  {${safeString(faq.q)}}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-${index}">
                  {${safeString(faq.a)}}
                </AccordionContent>
              </AccordionItem>
              `).join('')}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" data-testid="text-success-title">
                Recent Success Stories
              </h2>
              <p className="text-lg text-muted-foreground">
                {${safeString(serviceDisplayName)}} success stories from {${safeString(serviceData.location.name)}} and {${safeString(serviceData.region.name)}}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              ${serviceData.successStories.map((story, index) => `
              <Card className="text-center hover-elevate" data-testid="card-success-${index}">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{${safeString(story.title)}}</h3>
                  <p className="text-muted-foreground text-sm">{${safeString(story.subtitle)}}</p>
                </CardContent>
              </Card>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-final-cta-title">
              Ready to Book {${safeString(serviceDisplayName)}} in {${safeString(serviceData.location.name)}}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your free quote today and experience professional cleaning services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={scrollToQuoteForm} data-testid="button-final-quote">
                <Phone className="mr-2 h-5 w-5" />
                Get Free Quote
              </Button>
              <a 
                href={\`tel:\${trackingNumbers.phone.replace(/\\s/g, '')}\`}
                className="inline-flex items-center justify-center h-14 px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-md font-medium text-lg transition-colors"
                data-testid="button-final-call"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Call {trackingNumbers.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <QuoteForm />
      <Footer />
      <StickyCallButton />
    </div>
  );
}`;
}

// Generate route configurations
function generateRouteConfig(): string {
  const allLocations = getAllLocations();
  const routes: string[] = [];

  SERVICES.forEach(service => {
    allLocations.forEach(location => {
      routes.push(`  { 
    path: "/${service.urlSegment}-${location.slug}", 
    component: lazy(() => import("@/pages/generated/${location.name.replace(/[^a-zA-Z0-9]/g, '')}${service.type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')}Page")) 
  }`);
    });
  });

  return `import { lazy } from 'react';

// Auto-generated service-location routes
export const serviceLocationRoutes = [
${routes.join(',\n')}
];`;
}

// Main generation function
export function generateAllPages(): void {
  console.log('🚀 Starting page generation...');
  
  const allLocations = getAllLocations();
  const allRegions = Object.values(REGIONS);
  
  // Ensure pages directory exists using absolute path
  mkdirSync(PAGES_OUTPUT_DIR, { recursive: true });
  
  let totalGenerated = 0;
  
  // Generate pages for each service-location combination
  SERVICES.forEach(service => {
    console.log(`📄 Generating ${service.displayName} pages...`);
    
    allLocations.forEach(location => {
      // Find the region for this location
      const region = allRegions.find(r => 
        Object.values(REGIONS[r.slug as keyof typeof REGIONS].locations).some(loc => loc.slug === location.slug)
      );
      
      if (!region) {
        console.warn(`⚠️  Region not found for location: ${location.name}`);
        return;
      }
      
      // Generate service data using the template
      const serviceGenerator = SERVICE_GENERATORS[service.type as ServiceType];
      const serviceData = serviceGenerator(location, region);
      
      // Generate the page component
      const componentCode = generatePageComponent(serviceData, service.type as ServiceType, service.displayName);
      
      // Create filename using shared function
      const componentName = getComponentName(location.name, service.type as ServiceType);
      const filename = `${componentName}.tsx`;
      const filepath = join(PAGES_OUTPUT_DIR, filename);
      
      // Write the file
      writeFileSync(filepath, componentCode);
      totalGenerated++;
      
      if (totalGenerated % 50 === 0) {
        console.log(`✅ Generated ${totalGenerated} pages...`);
      }
    });
  });
  
  // Generate route configuration with absolute path
  console.log('🔗 Generating route configuration...');
  const routeConfig = generateRouteConfig();
  const routeConfigPath = resolve(PROJECT_ROOT, 'client/src/routes/generated-routes.ts');
  writeFileSync(routeConfigPath, routeConfig);
  
  console.log(`🎉 Page generation complete!`);
  console.log(`📊 Total pages generated: ${totalGenerated}`);
  console.log(`📊 Services: ${SERVICES.length}`);
  console.log(`📊 Locations: ${allLocations.length}`);
  console.log(`📊 Expected total: ${SERVICES.length * allLocations.length}`);
}

// CLI usage - ESM version  
generateAllPages();