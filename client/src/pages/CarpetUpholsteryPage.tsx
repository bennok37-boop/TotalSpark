import { Link, useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Shield, Award, CheckCircle, Phone, MessageCircle, Home, Users, Clock, MapPin, Droplets } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import { useTrackingNumbers } from '@/hooks/useTrackingNumbers';

// Import gallery images
// import livingRoomImage from '@assets/stock_images/clean_modern_living__f0d3e4c8.jpg';
// import kitchenImage from '@assets/stock_images/professional_kitchen_3d7b3119.jpg';
// import carpetImage from '@assets/stock_images/professional_carpet__0a1e5eba.jpg';
const livingRoomImage = '/attached_assets/stock_images/clean_modern_living__f0d3e4c8.jpg';
const kitchenImage = '/attached_assets/stock_images/professional_kitchen_3d7b3119.jpg';
const carpetImage = '/attached_assets/stock_images/professional_carpet__0a1e5eba.jpg';

export default function CarpetUpholsteryPage() {
  // Get tracking numbers from CallRail system
  const trackingNumbers = useTrackingNumbers();
  const phoneNumber = trackingNumbers.phone;
  const whatsappNumber = trackingNumbers.whatsapp;
  const [, setLocation] = useLocation();

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi, I'd like to enquire about carpet and upholstery cleaning services`, '_blank');
  };

  const handleQuoteClick = () => {
    setLocation('/quote?service=carpet-upholstery');
  };

  const cityLinks = [
    { name: 'Newcastle', slug: 'newcastle' },
    { name: 'Leeds', slug: 'leeds' },
    { name: 'Sunderland', slug: 'sunderland' },
    { name: 'York', slug: 'york' },
    { name: 'Middlesbrough', slug: 'middlesbrough' }
  ];

  const relatedServices = [
    { name: 'End of Tenancy Cleaning', href: '/end-of-tenancy-cleaning', description: 'Move-out cleaning with deposit guarantee' },
    { name: 'Commercial Cleaning', href: '/commercial-cleaning', description: 'Professional office & workplace cleaning' },
    { name: 'Deep Cleaning', href: '/deep-cleaning', description: 'Comprehensive property restoration' }
  ];

  const faqs = [
    {
      q: 'How long until carpets are dry?',
      a: 'Usually within 2–4 hours (ventilated rooms dry faster).'
    },
    {
      q: 'Can you remove pet odours?',
      a: 'Yes, our treatments neutralise odours at fibre level.'
    },
    {
      q: 'Do you use eco-friendly products?',
      a: 'Yes — safe for pets and children.'
    },
    {
      q: 'Do you move furniture?',
      a: 'We can move light items, but large furniture should be cleared before arrival.'
    },
    {
      q: 'How often should I get carpets cleaned?',
      a: 'Every 6–12 months, or more frequently for high-traffic areas.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-muted" data-testid="hero-section">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Carpet & Upholstery Cleaning
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Bring your carpets, sofas, and soft furnishings back to life with professional steam cleaning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="lg" className="text-lg px-8" onClick={handleCallClick} data-testid="button-call">
                  <Phone className="w-5 h-5 mr-2" />
                  Call today: {phoneNumber}
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8" onClick={handleWhatsAppClick} data-testid="button-whatsapp">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Chat
                </Button>
                <Button variant="secondary" size="lg" className="text-lg px-8" onClick={handleQuoteClick} data-testid="button-quote">
                  Book My Clean
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background" data-testid="why-choose-us">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Customers Love Our Carpet & Upholstery Cleaning</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Droplets className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Hot Water Extraction</h3>
                  <p className="text-sm text-muted-foreground">professional steam cleaning</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Deep Stain Removal</h3>
                  <p className="text-sm text-muted-foreground">removes stains, odours, dust mites, and allergens</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Fast-Drying Methods</h3>
                  <p className="text-sm text-muted-foreground">safe for kids & pets</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">DBS-Checked & Insured</h3>
                  <p className="text-sm text-muted-foreground">professional technicians</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Clean */}
        <section className="py-16 bg-muted" data-testid="what-we-clean">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Clean</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Carpets</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Stain removal</li>
                    <li>• Odour neutralisation</li>
                    <li>• Fibre-safe methods</li>
                    <li>• High-traffic areas</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Sofas & Chairs</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Fabric upholstery</li>
                    <li>• Leather cleaning</li>
                    <li>• Cushion deep clean</li>
                    <li>• Stain treatment</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Rugs & Mats</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Delicate fibres</li>
                    <li>• Persian & oriental rugs</li>
                    <li>• Door mats</li>
                    <li>• Specialist treatments</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Mattresses</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Sanitisation</li>
                    <li>• Bacteria removal</li>
                    <li>• Allergen treatment</li>
                    <li>• Odour elimination</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-background" data-testid="pricing">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing Snapshot</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£25</div>
                  <div className="text-sm text-muted-foreground">per room (carpet cleaning)</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£40</div>
                  <div className="text-sm text-muted-foreground">2-seater sofa from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£30</div>
                  <div className="text-sm text-muted-foreground">rug cleaning from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£35</div>
                  <div className="text-sm text-muted-foreground">mattress cleaning from</div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" onClick={handleQuoteClick} data-testid="button-book-clean">Book Carpet & Upholstery Clean</Button>
            </div>
          </div>
        </section>

        {/* Local Results */}
        <section className="py-16 bg-muted" data-testid="local-results">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Local Results</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={livingRoomImage} 
                    alt="Leeds family home - pet odours eliminated"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Leeds family home</h3>
                    <p className="text-white/90 text-sm">pet odours eliminated</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={kitchenImage} 
                    alt="Newcastle student flat - stains removed from lounge carpet"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Newcastle student flat</h3>
                    <p className="text-white/90 text-sm">stains removed from lounge carpet</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={carpetImage} 
                    alt="Middlesbrough office - freshened up communal spaces"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Middlesbrough office</h3>
                    <p className="text-white/90 text-sm">freshened up communal spaces</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-background" data-testid="faqs">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQs – Carpet & Upholstery Cleaning</h2>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-muted border border-border rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Areas We Cover */}
        <section className="py-16 bg-muted" data-testid="areas-we-cover">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Areas We Cover</h2>
              <p className="text-lg text-muted-foreground">Carpet & upholstery cleaning across the North East</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {cityLinks.map((city) => (
                <Card key={city.slug} className="hover-elevate transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Carpet Cleaning {city.name}</h3>
                    <Link 
                      href={`/cleaning/${city.slug}`}
                      className="text-primary hover:underline text-sm"
                      data-testid={`link-city-${city.slug}`}
                    >
                      View {city.name} Services
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-background" data-testid="related-services">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Services</h2>
              <p className="text-lg text-muted-foreground">Complete your cleaning needs with our other services</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
                <Card key={service.href} className="hover-elevate transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <Link href={service.href}>
                      <Button variant="outline" size="sm" data-testid={`link-${service.href.replace('/', '')}`}>
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-primary text-primary-foreground" data-testid="final-cta">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Refresh Your Home?</h2>
            <p className="text-xl mb-8 opacity-90">Book your carpet & upholstery clean today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" onClick={handleCallClick} data-testid="button-call-final">
                <Phone className="w-5 h-5 mr-2" />
                Call today: {phoneNumber}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={handleWhatsAppClick} data-testid="button-whatsapp-final">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8" onClick={handleQuoteClick} data-testid="button-quote-final">
                Book My Clean
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCallButton 
        phoneNumber={phoneNumber}
        whatsappNumber={whatsappNumber}
      />
    </div>
  );
}