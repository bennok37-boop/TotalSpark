import { useEffect } from 'react';
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
import { useTrackingNumbers } from '@/hooks/useTrackingNumbers';
import { scrollToQuoteForm } from '@/utils/scroll';

export default function PontelandCommercialCleaningPage() {
  // Get tracking numbers for this location
  const trackingNumbers = useTrackingNumbers();
  
  // Set page title and meta description
  useEffect(() => {
    document.title = "Commercial Cleaning Services Ponteland | Office & Business Cleaning | Northumberland";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Professional commercial cleaning in Ponteland. Office cleaning & business services. Serving Cramlington, Morpeth, Newcastle upon Tyne & Northumberland businesses. Get quote today.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Professional commercial cleaning in Ponteland. Office cleaning & business services. Serving Cramlington, Morpeth, Newcastle upon Tyne & Northumberland businesses. Get quote today.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-service-type">
              {"Commercial Cleaning"} in {"Ponteland"}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="text-hero-title">
              {"Commercial Cleaning Services Ponteland – Office & Business Cleaning"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              {"Professional commercial cleaning across Ponteland, Cramlington, Morpeth, Newcastle upon Tyne and surrounding Northumberland business areas. Daily, weekly, and contract cleaning services."}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToQuoteForm} data-testid="button-get-quote">
                <Phone className="mr-2 h-5 w-5" />
                Get Free Quote Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" data-testid="button-call-now">
                <MessageCircle className="mr-2 h-5 w-5" />
                Call {trackingNumbers.phone}
              </Button>
            </div>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Trusted by Ponteland businesses"}</span>
              </div>
              
              <div className="flex items-center gap-2" data-testid="text-trust-signal">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>{"Flexible contracts across Northumberland"}</span>
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
                {"Commercial Cleaning"} Services in {"Ponteland"}
              </h2>
              <p className="text-lg text-muted-foreground">
                Professional cleaning services across {"Ponteland"} and surrounding {"Northumberland"} areas
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
                {"Commercial Cleaning"} Prices in {"Ponteland"}
              </h2>
              <p className="text-lg text-muted-foreground">
                Transparent pricing for {"Ponteland"} properties
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
                  <Button className="w-full" data-testid="button-book-0">
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
                  <Button className="w-full" data-testid="button-book-1">
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
                  <Button className="w-full" data-testid="button-book-2">
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
                  <Button className="w-full" data-testid="button-book-3">
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
                  <Button className="w-full" data-testid="button-book-4">
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
                Areas We Cover Near {"Ponteland"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {"Commercial Cleaning"} services across {"Northumberland"}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-cramlington">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Cramlington"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-morpeth">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Morpeth"}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate cursor-pointer" data-testid="card-area-newcastle-upon-tyne">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{"Newcastle upon Tyne"}</span>
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
                Common questions about {"commercial cleaning"} in {"Ponteland"}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              
              <AccordionItem value="item-0" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-0">
                  {"What commercial cleaning services do you offer in Ponteland?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-0">
                  {"We provide office cleaning, retail cleaning, industrial cleaning, and specialist commercial services across Ponteland and Northumberland business districts."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-1">
                  {"Can you clean Ponteland offices outside business hours?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-1">
                  {"Yes, we offer flexible scheduling including evenings, weekends, and early mornings to suit your Ponteland business operations without disruption."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-2">
                  {"Do you provide cleaning contracts for Ponteland businesses?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-2">
                  {"We offer daily, weekly, monthly, and bespoke cleaning contracts for Ponteland businesses. All contracts include regular quality checks and account management."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-3">
                  {"Are you insured for commercial cleaning in Ponteland?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-3">
                  {"Yes, we carry comprehensive commercial insurance including public liability and employer liability for all Ponteland and Northumberland commercial work."}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium" data-testid="trigger-faq-4">
                  {"Can you handle large Ponteland commercial properties?"}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2" data-testid="content-faq-4">
                  {"We have experience with properties of all sizes across Ponteland and Northumberland, from small offices to large industrial facilities and retail spaces."}
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
                {"Commercial Cleaning"} success stories from {"Ponteland"} and {"Northumberland"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              
              <Card className="text-center hover-elevate" data-testid="card-success-0">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Ponteland Office Complex"}</h3>
                  <p className="text-muted-foreground text-sm">{"Daily cleaning contract"}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover-elevate" data-testid="card-success-1">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Cramlington Retail Unit"}</h3>
                  <p className="text-muted-foreground text-sm">{"Weekly deep clean service"}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover-elevate" data-testid="card-success-2">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{"Morpeth Business Park"}</h3>
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
              Ready to Book {"Commercial Cleaning"} in {"Ponteland"}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your free quote today and experience professional cleaning services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={scrollToQuoteForm} data-testid="button-final-quote">
                <Phone className="mr-2 h-5 w-5" />
                Get Free Quote
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-final-call">
                <MessageCircle className="mr-2 h-5 w-5" />
                Call {trackingNumbers.phone}
              </Button>
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