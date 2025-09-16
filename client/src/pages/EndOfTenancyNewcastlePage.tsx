import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Shield, Award, CheckCircle, Phone, MessageCircle, Home, Users, Clock, MapPin, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import QuoteForm from '@/components/QuoteForm';
import { scrollToQuoteForm } from '@/utils/scroll';
import { useTrackingNumbers } from '@/hooks/useTrackingNumbers';

// Import gallery images
import livingRoomImage from '@assets/generated_images/Clean_apartment_living_room_e6d5a885.png';
import kitchenImage from '@assets/generated_images/Clean_modern_kitchen_hero_3f6d5639.png';
import carpetImage from '@assets/generated_images/Carpet_cleaning_before_after_2f2d0ceb.png';

export default function EndOfTenancyNewcastlePage() {
  // Get tracking numbers for Newcastle (Tyne & Wear region)
  const trackingNumbers = useTrackingNumbers();
  const phoneNumber = trackingNumbers.phone;
  const whatsappNumber = trackingNumbers.whatsapp;

  const newcastleAreas = [
    'Jesmond', 'Heaton', 'Gosforth', 'Byker', 'Walker',
    'Fenham', 'Benwell', 'Elswick', 'Sandyford', 'City Centre'
  ];

  const nearbyAreas = [
    { name: 'Gateshead', slug: 'gateshead' },
    { name: 'North Shields', slug: 'north-shields' },
    { name: 'South Shields', slug: 'south-shields' },
    { name: 'Whitley Bay', slug: 'whitley-bay' }
  ];

  const relatedServices = [
    { name: 'Commercial Cleaning Newcastle', href: '/commercial-cleaning', description: 'Office cleaning across Newcastle city centre' },
    { name: 'Deep Cleaning Newcastle', href: '/deep-cleaning', description: 'Comprehensive property restoration' },
    { name: 'Carpet Cleaning Newcastle', href: '/carpet-upholstery-cleaning', description: 'Steam cleaning for Newcastle homes' }
  ];

  const newcastleFaqs = [
    {
      q: 'Do you guarantee my deposit back in Newcastle?',
      a: 'Absolutely — if your Newcastle landlord or letting agent raises an issue with the cleaning, we\'ll re-clean within 48 hours completely free of charge. This guarantee covers all Newcastle areas from city centre to Jesmond.'
    },
    {
      q: 'Which Newcastle letting agents do you work with?',
      a: 'We regularly work with major Newcastle letting agents including Sanderson Young, Bradley Hall, and Pattinson. Our cleaning meets the standards required by all Newcastle property management companies.'
    },
    {
      q: 'Can you clean student houses in Newcastle?',
      a: 'Yes! We specialize in Newcastle student properties, particularly in Jesmond, Heaton, and Sandyford. We understand the specific requirements for student house move-outs and HMO properties.'
    },
    {
      q: 'Do you cover all areas of Newcastle?',
      a: 'Yes, we cover all Newcastle postcodes including NE1, NE2, NE3, NE4, NE5, NE6, NE7, NE15, and surrounding areas like Gosforth, Jesmond, and Heaton.'
    },
    {
      q: 'How quickly can you clean my Newcastle property?',
      a: 'We often arrange Newcastle end of tenancy cleaning within 24-48 hours. Same-day emergency cleaning may be available for urgent Newcastle move-outs.'
    },
    {
      q: 'Do you bring equipment to Newcastle properties?',
      a: 'Yes, all professional cleaning equipment and eco-friendly products are brought to your Newcastle property. No need to provide anything.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section - Newcastle Focused */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-muted" data-testid="hero-section">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-sm px-3 py-1">
                <MapPin className="w-4 h-4 mr-1" />
                Newcastle Upon Tyne • NE1-NE7 Coverage
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                End of Tenancy Cleaning Newcastle – 100% Deposit Back Guarantee
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Professional end of tenancy cleaning across Newcastle, Jesmond, Heaton, and Gosforth. Trusted by Newcastle landlords, letting agents, and tenants since 2020. Get your full deposit back or we'll re-clean free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="lg" className="text-lg px-8" asChild>
                  <a href={`tel:${phoneNumber?.replace(/\s/g, '') || ''}`} data-testid="button-call-newcastle">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Newcastle: {phoneNumber}
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                  <a 
                    href={`https://wa.me/${whatsappNumber?.replace(/[^\d]/g, '').replace(/^0/, '44') || '447380991629'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-whatsapp-newcastle"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Quote
                  </a>
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="text-lg px-8" 
                  onClick={scrollToQuoteForm}
                  data-testid="button-quote-newcastle"
                >
                  Get Newcastle Quote
                </Button>
              </div>
              <div className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="ml-2">4.9/5 from 200+ Newcastle customers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Newcastle Specific Why Choose Us */}
        <section className="py-16 bg-background" data-testid="why-choose-newcastle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Newcastle Tenants Choose Us</h2>
              <p className="text-lg text-muted-foreground">Trusted by students, families, and professionals across Newcastle</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Newcastle Deposit Guarantee</h3>
                  <p className="text-sm text-muted-foreground">100% deposit back or free re-clean within 48hrs across all NE postcodes</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Agent Approved</h3>
                  <p className="text-sm text-muted-foreground">Trusted by Sanderson Young, Bradley Hall & major Newcastle agents</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Student Property Experts</h3>
                  <p className="text-sm text-muted-foreground">Specialists in Jesmond & Heaton student house move-outs</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">24-48hr Newcastle Service</h3>
                  <p className="text-sm text-muted-foreground">Quick turnaround for urgent Newcastle move-outs</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newcastle Areas Covered */}
        <section className="py-16 bg-muted" data-testid="newcastle-areas">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Newcastle Areas We Cover</h2>
              <p className="text-lg text-muted-foreground">End of tenancy cleaning across all Newcastle districts</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {newcastleAreas.map((area) => (
                <Badge key={area} variant="outline" className="p-3 text-center justify-center hover-elevate transition-all">
                  <MapPin className="w-4 h-4 mr-2" />
                  {area}
                </Badge>
              ))}
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Plus surrounding areas:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {nearbyAreas.map((area) => (
                  <Link key={area.slug} href={`/cleaning/${area.slug}`} className="group">
                    <Badge variant="secondary" className="hover-elevate transition-all group-hover:text-primary">
                      {area.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-background" data-testid="whats-included">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Included in Newcastle End of Tenancy Cleaning</h2>
              <p className="text-lg text-muted-foreground">Our comprehensive Newcastle checklist covers every corner</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Kitchen Deep Clean</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Oven, hob & extractor fan</li>
                    <li>• Cupboards inside & out</li>
                    <li>• Fridge/freezer defrosting</li>
                    <li>• Sink, taps & tiles</li>
                    <li>• Worktops & splashbacks</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Bathroom Restoration</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Toilets & baths deep clean</li>
                    <li>• Showers & glass screens</li>
                    <li>• Descaling & limescale removal</li>
                    <li>• Tiles, grout & mirrors</li>
                    <li>• Extractor fans cleaned</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Bedrooms & Living</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Carpets hoovered & treated</li>
                    <li>• Skirting boards & architraves</li>
                    <li>• Light switches & sockets</li>
                    <li>• Door frames & handles</li>
                    <li>• Radiators & window sills</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Windows & Finishing</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Interior window cleaning</li>
                    <li>• Frames, sills & locks</li>
                    <li>• Carpet steam cleaning (extra)</li>
                    <li>• Garden tidy (if required)</li>
                    <li>• Final inspection checklist</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newcastle Pricing */}
        <section className="py-16 bg-muted" data-testid="newcastle-pricing">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Newcastle End of Tenancy Cleaning Prices</h2>
              <p className="text-lg text-muted-foreground">Transparent pricing for all Newcastle property types</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <Card className="text-center border-primary/20">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£95</div>
                  <div className="text-sm text-muted-foreground">Studio flat</div>
                  <div className="text-xs text-muted-foreground mt-1">Perfect for Newcastle city centre studios</div>
                </CardContent>
              </Card>
              <Card className="text-center border-primary/20">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£115</div>
                  <div className="text-sm text-muted-foreground">1-bed flat</div>
                  <div className="text-xs text-muted-foreground mt-1">Ideal for young professionals</div>
                </CardContent>
              </Card>
              <Card className="text-center border-2 border-primary">
                <CardContent className="p-6">
                  <Badge className="mb-3">Most Popular</Badge>
                  <div className="text-2xl font-bold text-primary mb-2">£155</div>
                  <div className="text-sm text-muted-foreground">2-bed house</div>
                  <div className="text-xs text-muted-foreground mt-1">Common in Jesmond & Heaton</div>
                </CardContent>
              </Card>
              <Card className="text-center border-primary/20">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£210</div>
                  <div className="text-sm text-muted-foreground">3-bed house</div>
                  <div className="text-xs text-muted-foreground mt-1">Student houses & family homes</div>
                </CardContent>
              </Card>
              <Card className="text-center border-primary/20">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£265</div>
                  <div className="text-sm text-muted-foreground">4+ bed house</div>
                  <div className="text-xs text-muted-foreground mt-1">Large Newcastle properties</div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button 
                size="lg" 
                onClick={scrollToQuoteForm}
                data-testid="button-newcastle-quote-now"
                className="text-lg px-8"
              >
                Get My Newcastle Quote Now
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Special rates available for Newcastle student houses and HMOs
              </p>
            </div>
          </div>
        </section>

        {/* Before & After - Newcastle Focus */}
        <section className="py-16 bg-background" data-testid="newcastle-before-after">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Newcastle Success Stories</h2>
              <p className="text-lg text-muted-foreground">Real results from Newcastle properties</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={livingRoomImage} 
                    alt="Jesmond student flat - full deposit secured in Newcastle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Jesmond Student House</h3>
                    <p className="text-white/90 text-sm">Full deposit secured • Newcastle NE2</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={kitchenImage} 
                    alt="Heaton kitchen restoration - Newcastle letting agent approved"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Heaton Kitchen Restoration</h3>
                    <p className="text-white/90 text-sm">Agent approved • Re-let same week</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={carpetImage} 
                    alt="Gosforth family home - Newcastle end of tenancy success"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Gosforth Family Home</h3>
                    <p className="text-white/90 text-sm">100% deposit returned • Newcastle NE3</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Newcastle Specific FAQs */}
        <section className="py-16 bg-muted" data-testid="newcastle-faqs">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Newcastle End of Tenancy Cleaning FAQs</h2>
                <p className="text-lg text-muted-foreground">Common questions from Newcastle tenants and landlords</p>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {newcastleFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-background border border-border rounded-lg px-6">
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

        {/* Related Services */}
        <section className="py-16 bg-background" data-testid="newcastle-related-services">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Other Newcastle Cleaning Services</h2>
              <p className="text-lg text-muted-foreground">Complete your cleaning needs across Newcastle</p>
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

        {/* Final Newcastle CTA */}
        <section className="py-16 bg-primary text-primary-foreground" data-testid="final-newcastle-cta">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Newcastle Deposit?</h2>
            <p className="text-xl mb-8 opacity-90">Professional end of tenancy cleaning across all Newcastle areas</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <a href={`tel:${phoneNumber?.replace(/\s/g, '') || ''}`} data-testid="button-call-final-newcastle">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Newcastle: {phoneNumber}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a 
                  href={`https://wa.me/${whatsappNumber?.replace(/[^\d]/g, '').replace(/^0/, '44') || '447380991629'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-whatsapp-final-newcastle"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Quote
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8" 
                onClick={scrollToQuoteForm}
                data-testid="button-quote-final-newcastle"
              >
                Get Instant Newcastle Quote
              </Button>
            </div>
            <div className="flex justify-center items-center gap-1 text-sm opacity-90">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="ml-2">Trusted by 200+ Newcastle customers • Same-day service available</span>
            </div>
          </div>
        </section>
      </main>
      <QuoteForm />
      <Footer />
      <StickyCallButton 
        phoneNumber={phoneNumber}
        whatsappNumber={whatsappNumber}
      />
    </div>
  );
}