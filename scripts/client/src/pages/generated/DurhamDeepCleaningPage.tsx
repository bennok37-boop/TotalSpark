import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { scrollToQuoteForm } from '@/utils/scroll';

export default function DurhamDeepCleaningPage() {
  useEffect(() => {
    document.title = "Deep Cleaning Services Durham | Complete Property Restoration | County Durham";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Professional deep cleaning in Durham. Complete property restoration & spring cleaning. Serving Chester-le-Street, Bishop Auckland, Consett & County Durham. Transform your space.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-service-type">
              TotalSpark Solutions - Deep Cleaning in Durham
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="text-hero-title">
              {"Deep Cleaning Services Durham – Complete Property Restoration"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
              {"Comprehensive deep cleaning across Durham, Chester-le-Street, Bishop Auckland, Consett and surrounding County Durham areas. Perfect for neglected properties, spring cleaning, and property restoration."}
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
              Deep Cleaning Services in Durham
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <Card className="hover-elevate" data-testid="card-service-feature-0">
                <CardContent className="p-6">
                  <p className="font-medium">{"Complete property restoration cleaning"}</p>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature-1">
                <CardContent className="p-6">
                  <p className="font-medium">{"Kitchen appliance deep cleaning & descaling"}</p>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature-2">
                <CardContent className="p-6">
                  <p className="font-medium">{"Bathroom mold & limescale treatment"}</p>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature-3">
                <CardContent className="p-6">
                  <p className="font-medium">{"Carpet deep cleaning & stain removal"}</p>
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
              Deep Cleaning Prices in Durham
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Card className="hover-elevate" data-testid="card-pricing-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"1-bed property"}</CardTitle>
                  <CardDescription>{"Complete deep clean"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£100"}</div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-1">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"2-bed property"}</CardTitle>
                  <CardDescription>{"Complete deep clean"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£150"}</div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"3-bed property"}</CardTitle>
                  <CardDescription>{"Complete deep clean"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£200"}</div>
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
              Ready to Book Deep Cleaning in Durham?
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