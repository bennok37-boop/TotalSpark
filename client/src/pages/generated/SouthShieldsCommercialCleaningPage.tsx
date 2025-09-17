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

export default function SouthShieldsCommercialCleaningPage() {
  // Get tracking numbers for this location
  const trackingNumbers = useTrackingNumbers();
  
  // SEO configuration for this location and service
  const pageTitle = "Commercial Cleaning Services South Shields | Office & Business Cleaning | Tyne & Wear";
  const pageDescription = "Professional commercial cleaning in South Shields. Office cleaning & business services. Serving North Shields, Jarrow, Hebburn & Tyne & Wear businesses. Get quote today.";
  const cityName = "South Shields";
  const serviceName = "Commercial Cleaning";
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
        canonicalUrl={createCanonicalUrl(`/${"commercial-cleaning"}-${"south-shields"}`)}
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
              {"Commercial Cleaning"} in {"South Shields"}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="text-hero-title">
              {"Commercial Cleaning Services South Shields – Office & Business Cleaning"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              {"Professional commercial cleaning across South Shields, North Shields, Jarrow, Hebburn and surrounding Tyne & Wear business areas. Daily, weekly, and contract cleaning services."}
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
                <span>{"Trusted by South Shields businesses"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Flexible contracts across Tyne & Wear"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Fully insured commercial cleaning"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Outside hours service available"}</span>
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
                {"Commercial Cleaning"} Services in {"South Shields"}
              </h2>
              <p className="text-lg text-muted-foreground">
                Professional cleaning services across {"South Shields"} and surrounding {"Tyne & Wear"} areas
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Daily, weekly & monthly cleaning contracts"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Office workspace & desk cleaning"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Kitchen & toilet facility maintenance"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Reception & communal area cleaning"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Flexible scheduling & account management"}</p>
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
                {"Commercial Cleaning"} Prices in {"South Shields"}
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent pricing for {"South Shields"} properties
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Card className="hover-elevate" data-testid="card-pricing-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Small office"}</CardTitle>
                  <CardDescription>{"Per clean (up to 1000 sq ft)"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£25"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-0">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-1">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Medium office"}</CardTitle>
                  <CardDescription>{"Per clean (1000-3000 sq ft)"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£45"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-1">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Large office"}</CardTitle>
                  <CardDescription>{"Per clean (3000-6000 sq ft)"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£75"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-2">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-3">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Retail space"}</CardTitle>
                  <CardDescription>{"Per clean (varies by layout)"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£35"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-3">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-4">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Industrial unit"}</CardTitle>
                  <CardDescription>{"Quote on assessment"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"POA"}</div>
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
                Areas We Cover Near {"South Shields"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {"Commercial Cleaning"} services across {"Tyne & Wear"}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-north-shields">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"North Shields"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-jarrow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Jarrow"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-hebburn">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Hebburn"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-tynemouth">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Tynemouth"}</span>
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
                Common questions about {"commercial cleaning"} in {"South Shields"}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              
              <AccordionItem value="item-0" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-0">
                  {"What commercial cleaning services do you offer in South Shields?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-0">
                  {"We provide office cleaning, retail cleaning, industrial cleaning, and specialist commercial services across South Shields and Tyne & Wear business districts."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-1">
                  {"Can you clean South Shields offices outside business hours?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-1">
                  {"Yes, we offer flexible scheduling including evenings, weekends, and early mornings to suit your South Shields business operations without disruption."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-2">
                  {"Do you provide cleaning contracts for South Shields businesses?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-2">
                  {"We offer daily, weekly, monthly, and bespoke cleaning contracts for South Shields businesses. All contracts include regular quality checks and account management."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-3">
                  {"Are you insured for commercial cleaning in South Shields?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-3">
                  {"Yes, we carry comprehensive commercial insurance including public liability and employer liability for all South Shields and Tyne & Wear commercial work."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-4">
                  {"Can you handle large South Shields commercial properties?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-4">
                  {"We have experience with properties of all sizes across South Shields and Tyne & Wear, from small offices to large industrial facilities and retail spaces."}
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
                {"Commercial Cleaning"} success stories from {"South Shields"} and {"Tyne & Wear"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              
              <Card className="text-center hover-elevate" data-testid="card-success-0">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"South Shields Office Complex"}</h3>
                  <p className="text-muted-foreground text-sm">{"Daily cleaning contract"}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover-elevate" data-testid="card-success-1">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"North Shields Retail Unit"}</h3>
                  <p className="text-muted-foreground text-sm">{"Weekly deep clean service"}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover-elevate" data-testid="card-success-2">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Jarrow Business Park"}</h3>
                  <p className="text-muted-foreground text-sm">{"Multiple unit contract"}</p>
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
              Ready to Book {"Commercial Cleaning"} in {"South Shields"}?
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