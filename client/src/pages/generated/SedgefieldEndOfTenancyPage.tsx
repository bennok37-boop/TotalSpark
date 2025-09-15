import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SedgefieldEndOfTenancyPage() {
  useEffect(() => {
    document.title = "End of Tenancy Cleaning Sedgefield | Deposit Back Guarantee | County Durham";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Professional end of tenancy cleaning in Sedgefield. 100% deposit back guarantee. Serving Newton Aycliffe, Ferryhill, Stockton-on-Tees & County Durham. Book online today.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-service-type">
              End of Tenancy Cleaning in Sedgefield
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground" data-testid="text-hero-title">
              {"End of Tenancy Cleaning Sedgefield – 100% Deposit Back Guarantee"}
            </h1>
            <p className="text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
              {"Professional end of tenancy cleaning across Sedgefield, Newton Aycliffe, Ferryhill, Stockton-on-Tees and surrounding County Durham areas. Get your full deposit back or we'll re-clean free."}
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
              End of Tenancy Cleaning Services in Sedgefield
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <Card className="hover-elevate" data-testid="card-service-feature-0">
                <CardContent className="p-6">
                  <p className="font-medium">{"Kitchen deep clean including oven, hob & extractor"}</p>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature-1">
                <CardContent className="p-6">
                  <p className="font-medium">{"Bathroom restoration with descaling & grout cleaning"}</p>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature-2">
                <CardContent className="p-6">
                  <p className="font-medium">{"Bedroom & living area comprehensive cleaning"}</p>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-service-feature-3">
                <CardContent className="p-6">
                  <p className="font-medium">{"Interior window cleaning & frame cleaning"}</p>
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
              End of Tenancy Cleaning Prices in Sedgefield
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <Card className="hover-elevate" data-testid="card-pricing-0">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"Studio flat"}</CardTitle>
                  <CardDescription>{"Perfect for Sedgefield centre studios"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£100"}</div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-1">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"1-bed flat"}</CardTitle>
                  <CardDescription>{"Ideal for young professionals"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£120"}</div>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate" data-testid="card-pricing-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{"2-bed house"}</CardTitle>
                  <CardDescription>{"Common in Sedgefield areas"}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-4">{"£160"}</div>
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
              Ready to Book End of Tenancy Cleaning in Sedgefield?
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
}