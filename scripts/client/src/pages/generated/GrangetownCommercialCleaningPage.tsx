import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { scrollToQuoteForm } from '@/utils/scroll';

export default function GrangetownCommercialCleaningPage() {
  useEffect(() => {
    document.title = "Commercial Cleaning Services Grangetown | Office & Business Cleaning | Tees Valley";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Professional commercial cleaning in Grangetown. Office cleaning & business services. Serving Middlesbrough, Redcar, Eston & Tees Valley businesses. Get quote today.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-service-type">
              TotalSpark Solutions - Commercial Cleaning in Grangetown
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="text-hero-title">
              {"Commercial Cleaning Services Grangetown – Office & Business Cleaning"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
              {"Professional commercial cleaning across Grangetown, Middlesbrough, Redcar, Eston and surrounding Tees Valley business areas. Daily, weekly, and contract cleaning services."}
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6" 
              onClick={scrollToQuoteForm}
              data-testid="button-get-quote"
            >
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
              Commercial Cleaning Services in Grangetown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <Card className="hover-elevate" data-testid="card-service-feature-0">
                <CardContent className="p-6">
                  <p className="font-medium">{"Daily, weekly & monthly cleaning contracts"}</p>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature-1">
                <CardContent className="p-6">
                  <p className="font-medium">{"Office workspace & desk cleaning"}</p>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature-2">
                <CardContent className="p-6">
                  <p className="font-medium">{"Kitchen & toilet facility maintenance"}</p>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature-3">
                <CardContent className="p-6">
                  <p className="font-medium">{"Reception & communal area cleaning"}</p>
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
            <h2 className="text-3xl font-bold mb-8 text-center" data-testid="text-pricing-title">
              Commercial Cleaning Prices in Grangetown
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Card className="hover-elevate" data-testid="card-pricing-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Small office"}</CardTitle>
                  <CardDescription>{"Per clean (up to 1000 sq ft)"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£25"}</div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-1">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Medium office"}</CardTitle>
                  <CardDescription>{"Per clean (1000-3000 sq ft)"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£45"}</div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Large office"}</CardTitle>
                  <CardDescription>{"Per clean (3000-6000 sq ft)"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£75"}</div>
                </CardContent>
              </Card>
              
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-cta-title">
              Ready to Book Commercial Cleaning in Grangetown?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your free quote today from TotalSpark Solutions and experience professional cleaning services across the North East
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6" 
              onClick={scrollToQuoteForm}
              data-testid="button-final-quote"
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}