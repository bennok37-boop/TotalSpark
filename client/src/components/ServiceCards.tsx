import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Building2, Sparkles, Sofa, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { scrollToQuoteForm } from '@/utils/scroll';

const services = [
  {
    icon: Home,
    title: "End of Tenancy Cleaning",
    description: "Complete move-out cleaning service to ensure you get your full deposit back. Professional grade equipment and eco-friendly products.",
    price: "From £120",
    features: ["Deposit-back guarantee", "Full property clean", "Oven & appliances"],
    slug: "end-of-tenancy-cleaning",
    popular: true
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Regular office and commercial space cleaning. Flexible scheduling to minimize disruption to your business operations.",
    price: "From £25/hour",
    features: ["Flexible scheduling", "All equipment provided", "Insured & bonded"],
    slug: "commercial-cleaning",
    popular: false
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Intensive one-off cleaning service for homes that need extra attention. Perfect for spring cleaning or special occasions.",
    price: "From £15/hour",
    features: ["Top to bottom clean", "Eco-friendly products", "Same-day service"],
    slug: "deep-cleaning",
    popular: false
  },
  {
    icon: Sofa,
    title: "Carpet & Upholstery Cleaning",
    description: "Professional steam cleaning for carpets and furniture. Remove stains, odors, and allergens from your home.",
    price: "From £60",
    features: ["Steam cleaning", "Stain removal", "Fast drying"],
    slug: "carpet-upholstery-cleaning",
    popular: false
  }
];

export default function ServiceCards() {
  return (
    <section className="py-16" data-testid="section-service-cards">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Cleaning Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional cleaning solutions tailored to your needs. All services include our satisfaction guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.slug} className="relative hover-elevate transition-all duration-300" data-testid={`card-service-${service.slug}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-chart-3 text-white">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{service.price}</div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-chart-2 rounded-full flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link href={`/${service.slug}`}>
                      <Button variant="outline" className="w-full group" data-testid={`button-learn-more-${service.slug}`}>
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            onClick={scrollToQuoteForm}
            data-testid="button-get-quote-services"
          >
            Get Free Quote for Any Service
          </Button>
        </div>
      </div>
    </section>
  );
}