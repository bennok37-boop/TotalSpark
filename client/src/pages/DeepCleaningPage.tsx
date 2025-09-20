import { Link, useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Shield, Award, CheckCircle, Phone, MessageCircle, Home, Users, Clock, MapPin, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import { useTrackingNumbers } from '@/hooks/useTrackingNumbers';

// Import gallery images
// import livingRoomImage from '@assets/stock_images/professional_house_c_9c27b829.jpg';
// import kitchenImage from '@assets/stock_images/professional_house_c_62a1095a.jpg';
// import carpetImage from '@assets/stock_images/professional_bathroo_944593f2.jpg';
const livingRoomImage = '/attached_assets/stock_images/professional_house_c_9c27b829.jpg';
const kitchenImage = '/attached_assets/stock_images/professional_house_c_62a1095a.jpg';
const carpetImage = '/attached_assets/stock_images/professional_bathroo_944593f2.jpg';

export default function DeepCleaningPage() {
  // Get tracking numbers from CallRail system
  const trackingNumbers = useTrackingNumbers();
  const phoneNumber = trackingNumbers.phone;
  const whatsappNumber = trackingNumbers.whatsapp;
  const [, setLocation] = useLocation();

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi, I'd like to enquire about deep cleaning services`, '_blank');
  };

  const handleQuoteClick = () => {
    setLocation('/quote?service=deep-cleaning');
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
    { name: 'Carpet & Upholstery', href: '/carpet-upholstery-cleaning', description: 'Steam cleaning for carpets & furniture' }
  ];

  const faqs = [
    {
      q: 'How is a deep clean different from a standard clean?',
      a: 'Deep cleans target areas often missed in regular cleaning (appliances, tiles, skirting, etc).'
    },
    {
      q: 'Do you provide cleaning supplies?',
      a: 'Yes, all equipment and materials are included.'
    },
    {
      q: 'Can you add carpet/upholstery cleaning?',
      a: 'Yes, optional extras available.'
    },
    {
      q: 'Do you cover mould removal?',
      a: 'We clean visible mould but recommend specialist treatment for severe cases.'
    },
    {
      q: 'How long does a deep clean take?',
      a: 'Typically 4–8 hours depending on property size.'
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
                Professional Deep Cleaning Services
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                When a regular clean isn't enough, our deep cleaning services restore properties to a spotless condition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="lg" className="text-lg px-8" onClick={handleCallClick} data-testid="button-call">
                  <Phone className="w-5 h-5 mr-2" />
                  Call us: {phoneNumber}
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8" onClick={handleWhatsAppClick} data-testid="button-whatsapp">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Chat
                </Button>
                <Button variant="secondary" size="lg" className="text-lg px-8" onClick={handleQuoteClick} data-testid="button-quote">
                  Book Deep Clean
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background" data-testid="why-choose-us">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Deep Cleaning</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Home className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Perfect for Move-ins</h3>
                  <p className="text-sm text-muted-foreground">neglected properties, or post-renovation</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Full Property Sanitation</h3>
                  <p className="text-sm text-muted-foreground">kitchens, bathrooms, and comprehensive cleaning</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">DBS-Checked & Insured</h3>
                  <p className="text-sm text-muted-foreground">COSHH-compliant professionals</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
                  <p className="text-sm text-muted-foreground">one-off or regular scheduled deep cleans</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What's Covered */}
        <section className="py-16 bg-muted" data-testid="whats-covered">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Covered in a Deep Clean</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Kitchens</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Degreasing ovens</li>
                    <li>• Cupboards inside & out</li>
                    <li>• Tiles & grout</li>
                    <li>• Extractor fans</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Bathrooms</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Descaling</li>
                    <li>• Scrubbing grout</li>
                    <li>• Disinfecting toilets</li>
                    <li>• Deep shower cleaning</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Living Areas</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Skirting boards</li>
                    <li>• Sockets & switches</li>
                    <li>• Radiators</li>
                    <li>• Cobweb removal</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Extras</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Carpet steam cleaning</li>
                    <li>• Upholstery cleaning</li>
                    <li>• Appliance deep clean</li>
                    <li>• Window cleaning</li>
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
                  <div className="text-2xl font-bold text-primary mb-2">£100</div>
                  <div className="text-sm text-muted-foreground">1-bed flat from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£150</div>
                  <div className="text-sm text-muted-foreground">2-bed house from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£200</div>
                  <div className="text-sm text-muted-foreground">3-bed house from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">Custom</div>
                  <div className="text-sm text-muted-foreground">Large houses/offices</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Real Results */}
        <section className="py-16 bg-muted" data-testid="real-results">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Results</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={livingRoomImage} 
                    alt="York property post-renovation - restored for move-in"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">York property post-renovation</h3>
                    <p className="text-white/90 text-sm">restored for move-in</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={kitchenImage} 
                    alt="Sunderland home - sanitised after neglect"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Sunderland home</h3>
                    <p className="text-white/90 text-sm">sanitised after neglect</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={carpetImage} 
                    alt="Newcastle kitchen - full degrease & appliance clean"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Newcastle kitchen</h3>
                    <p className="text-white/90 text-sm">full degrease & appliance clean</p>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQs – Deep Cleaning</h2>
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
              <p className="text-lg text-muted-foreground">Deep cleaning across the North East</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {cityLinks.map((city) => (
                <Card key={city.slug} className="hover-elevate transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Deep Cleaning {city.name}</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for a Complete Transformation?</h2>
            <p className="text-xl mb-8 opacity-90">Book your deep clean today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" onClick={handleCallClick} data-testid="button-call-final">
                <Phone className="w-5 h-5 mr-2" />
                Call us: {phoneNumber}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={handleWhatsAppClick} data-testid="button-whatsapp-final">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8" onClick={handleQuoteClick} data-testid="button-quote-final">
                Book My Deep Clean
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