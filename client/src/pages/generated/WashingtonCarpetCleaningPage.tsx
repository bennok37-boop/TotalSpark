import { Link } from 'wouter';
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

export default function WashingtonCarpetCleaningPage() {
  // Get tracking numbers for this location
  const trackingNumbers = useTrackingNumbers();
  
  // SEO configuration for this location and service
  const pageTitle = "Carpet & Upholstery Cleaning Washington | Steam Cleaning Specialists | Tyne & Wear";
  const pageDescription = "Professional carpet & upholstery cleaning in Washington. Steam cleaning & stain removal. Serving Sunderland, Houghton-le-Spring, Chester-le-Street & Tyne & Wear. Book today.";
  const cityName = "Washington";
  const serviceName = "Carpet & Upholstery Cleaning";
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
        canonicalUrl={createCanonicalUrl(`/${"carpet-cleaning"}-${"washington"}`)}
        ogType="service"
        ogImage="/og-image.jpg"
        structuredData={structuredData}
      />
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-service-type">
              {"Carpet & Upholstery Cleaning"} in {"Washington"}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="text-hero-title">
              {"Carpet & Upholstery Cleaning Washington – Steam Cleaning Specialists"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              {"Professional carpet and upholstery cleaning across Washington, Sunderland, Houghton-le-Spring, Chester-le-Street and surrounding Tyne & Wear areas. Steam cleaning, stain removal, and fabric protection."}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToQuoteForm} data-testid="button-get-quote">
                <Phone className="mr-2 h-5 w-5" />
                Get Free Quote Now
              </Button>
              <a 
                href={`tel:${trackingNumbers.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center h-14 px-8 bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background rounded-md font-medium text-lg transition-colors"
                data-testid="button-call-now"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Call {trackingNumbers.phone}
              </a>
            </div>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Carpet specialists serving Washington"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Professional steam cleaning equipment"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Stain removal guarantee"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Same-day service available in Tyne & Wear"}</span>
              </div>
              
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
                {"Carpet & Upholstery Cleaning"} Services in {"Washington"}
              </h2>
              <p className="text-lg text-muted-foreground">
                Professional cleaning services across {"Washington"} and surrounding {"Tyne & Wear"} areas
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Professional steam cleaning equipment"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Stain removal & odor elimination"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Pet stain & odor specialist treatment"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Upholstery & curtain cleaning"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Fabric protection treatment available"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
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
                {"Carpet & Upholstery Cleaning"} Prices in {"Washington"}
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent pricing for {"Washington"} properties
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Card className="hover-elevate" data-testid="card-pricing-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Single room"}</CardTitle>
                  <CardDescription>{"Up to 15 sq meters"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£35"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-0">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-1">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"2-3 rooms"}</CardTitle>
                  <CardDescription>{"Living areas package"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£65"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-1">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Whole house"}</CardTitle>
                  <CardDescription>{"All carpeted areas"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£120"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-2">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-3">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"3-piece suite"}</CardTitle>
                  <CardDescription>{"Sofa + 2 chairs"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£85"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-3">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-4">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Single item"}</CardTitle>
                  <CardDescription>{"Sofa or large chair"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£25"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-4">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
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
                Areas We Cover Near {"Washington"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {"Carpet & Upholstery Cleaning"} services across {"Tyne & Wear"}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-sunderland">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Sunderland"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-houghton-le-spring">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Houghton-le-Spring"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-chester-le-street">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Chester-le-Street"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-birtley">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Birtley"}</span>
                  </div>
                </CardContent>
              </Card>
              
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
                Common questions about {"carpet & upholstery cleaning"} in {"Washington"}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              
              <AccordionItem value="item-0" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-0">
                  {"What carpet cleaning methods do you use in Washington?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-0">
                  {"We use professional steam cleaning and hot water extraction methods in Washington. This ensures deep cleaning while being safe for all carpet types across Tyne & Wear."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-1">
                  {"Can you remove pet stains and odors in Washington?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-1">
                  {"Yes, we specialize in pet stain and odor removal using enzyme treatments and deep extraction methods. Our Washington service covers all types of pet-related carpet issues."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-2">
                  {"How long does carpet cleaning take in Washington?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-2">
                  {"Washington carpet cleaning typically takes 1-3 hours depending on room size and soil level. Carpets are usually dry within 2-6 hours."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-3">
                  {"Do you clean upholstery and sofas in Washington?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-3">
                  {"Yes, we clean all types of upholstery including sofas, chairs, curtains, and mattresses across Washington and Tyne & Wear using appropriate methods for each fabric type."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-4">
                  {"Can you protect carpets after cleaning in Washington?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-4">
                  {"We offer fabric protection treatments for carpets and upholstery in Washington. This helps prevent future staining and extends the life of your furnishings."}
                </AccordionContent>
              </AccordionItem>
              
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
                {"Carpet & Upholstery Cleaning"} success stories from {"Washington"} and {"Tyne & Wear"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              
              <Card className="text-center hover-elevate" data-testid="card-success-0">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Washington Family Home"}</h3>
                  <p className="text-muted-foreground text-sm">{"Pet stain removal success"}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover-elevate" data-testid="card-success-1">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Sunderland Office"}</h3>
                  <p className="text-muted-foreground text-sm">{"Commercial carpet refresh"}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover-elevate" data-testid="card-success-2">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Houghton-le-Spring Rental"}</h3>
                  <p className="text-muted-foreground text-sm">{"Full house carpet restoration"}</p>
                </CardContent>
              </Card>
              
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-final-cta-title">
              Ready to Book {"Carpet & Upholstery Cleaning"} in {"Washington"}?
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
                href={`tel:${trackingNumbers.phone.replace(/\s/g, '')}`}
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
}