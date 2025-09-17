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

export default function BlythEndOfTenancyPage() {
  // Get tracking numbers for this location
  const trackingNumbers = useTrackingNumbers();
  
  // SEO configuration for this location and service
  const pageTitle = "End of Tenancy Cleaning Blyth | Deposit Back Guarantee | Northumberland";
  const pageDescription = "Professional end of tenancy cleaning in Blyth. 100% deposit back guarantee. Serving Ashington, Cramlington, Whitley Bay & Northumberland. Book online today.";
  const cityName = "Blyth";
  const serviceName = "End of Tenancy Cleaning";
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
        canonicalUrl={createCanonicalUrl(`/${"end-of-tenancy"}-${"blyth"}`)}
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
              {"End of Tenancy Cleaning"} in {"Blyth"}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="text-hero-title">
              {"End of Tenancy Cleaning Blyth – 100% Deposit Back Guarantee"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              {"Professional end of tenancy cleaning across Blyth, Ashington, Cramlington, Whitley Bay and surrounding Northumberland areas. Get your full deposit back or we'll re-clean free."}
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
                <span>{"Blyth Deposit Guarantee - 100% money back"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Agent approved across Northumberland"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"DBS-checked & fully insured cleaners"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"24-48hr service available in Blyth"}</span>
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
                {"End of Tenancy Cleaning"} Services in {"Blyth"}
              </h2>
              <p className="text-lg text-muted-foreground">
                Professional cleaning services across {"Blyth"} and surrounding {"Northumberland"} areas
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Kitchen deep clean including oven, hob & extractor"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Bathroom restoration with descaling & grout cleaning"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Bedroom & living area comprehensive cleaning"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Interior window cleaning & frame cleaning"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{"Final inspection checklist provided"}</p>
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
                {"End of Tenancy Cleaning"} Prices in {"Blyth"}
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent pricing for {"Blyth"} properties
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Card className="hover-elevate" data-testid="card-pricing-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Studio flat"}</CardTitle>
                  <CardDescription>{"Perfect for Blyth centre studios"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£100"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-0">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-1">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"1-bed flat"}</CardTitle>
                  <CardDescription>{"Ideal for young professionals"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£120"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-1">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"2-bed house"}</CardTitle>
                  <CardDescription>{"Common in Blyth areas"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£160"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-2">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-3">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"3-bed house"}</CardTitle>
                  <CardDescription>{"Student houses & family homes"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£220"}</div>
                  <Button className="w-full" onClick={scrollToQuoteForm} data-testid="button-book-3">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-4">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"4+ bed house"}</CardTitle>
                  <CardDescription>{"Large Blyth properties"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£280"}</div>
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
                Areas We Cover Near {"Blyth"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {"End of Tenancy Cleaning"} services across {"Northumberland"}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-ashington">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Ashington"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-cramlington">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Cramlington"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-whitley-bay">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Whitley Bay"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-newbiggin-by-the-sea">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Newbiggin-by-the-Sea"}</span>
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
                Common questions about {"end of tenancy cleaning"} in {"Blyth"}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              
              <AccordionItem value="item-0" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-0">
                  {"Do you guarantee my deposit back in Blyth?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-0">
                  {"Absolutely — if your Blyth landlord or letting agent raises an issue with the cleaning, we'll re-clean within 48 hours completely free of charge. This guarantee covers all Blyth areas and Northumberland."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-1">
                  {"Which Blyth letting agents do you work with?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-1">
                  {"We regularly work with major Northumberland letting agents and have extensive experience with Blyth property management companies. Our cleaning meets industry standards."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-2">
                  {"Can you clean student properties in Blyth?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-2">
                  {"Yes! We specialize in Blyth student properties and HMOs. We understand the specific requirements for student house move-outs in the Northumberland area."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-3">
                  {"How quickly can you clean my Blyth property?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-3">
                  {"We often arrange Blyth end of tenancy cleaning within 24-48 hours. Same-day emergency cleaning may be available for urgent Blyth move-outs."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-4">
                  {"Do you bring equipment to Blyth properties?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-4">
                  {"Yes, all professional cleaning equipment and eco-friendly products are brought to your Blyth property. No need to provide anything."}
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
                {"End of Tenancy Cleaning"} success stories from {"Blyth"} and {"Northumberland"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              
              <Card className="text-center hover-elevate" data-testid="card-success-0">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Blyth Student House"}</h3>
                  <p className="text-muted-foreground text-sm">{"Full deposit secured"}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover-elevate" data-testid="card-success-1">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Ashington Flat"}</h3>
                  <p className="text-muted-foreground text-sm">{"Agent approved clean"}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover-elevate" data-testid="card-success-2">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Cramlington Family Home"}</h3>
                  <p className="text-muted-foreground text-sm">{"100% deposit returned"}</p>
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
              Ready to Book {"End of Tenancy Cleaning"} in {"Blyth"}?
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