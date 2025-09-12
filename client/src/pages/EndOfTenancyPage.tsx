import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Shield, Award, CheckCircle, Phone, MessageCircle, Home, Users, Clock, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import QuoteForm from '@/components/QuoteForm';

// Import gallery images
import livingRoomImage from '@assets/generated_images/Clean_apartment_living_room_e6d5a885.png';
import kitchenImage from '@assets/generated_images/Clean_modern_kitchen_hero_3f6d5639.png';
import carpetImage from '@assets/generated_images/Carpet_cleaning_before_after_2f2d0ceb.png';

export default function EndOfTenancyPage() {
  const phoneNumber = "0800 123 4567";
  const whatsappNumber = "447700123456";

  const cityLinks = [
    { name: 'Newcastle', slug: 'newcastle' },
    { name: 'Leeds', slug: 'leeds' },
    { name: 'Sunderland', slug: 'sunderland' },
    { name: 'York', slug: 'york' },
    { name: 'Middlesbrough', slug: 'middlesbrough' }
  ];

  const relatedServices = [
    { name: 'Commercial Cleaning', href: '/commercial-cleaning', description: 'Professional office & workplace cleaning' },
    { name: 'Deep Cleaning', href: '/deep-cleaning', description: 'Comprehensive property restoration' },
    { name: 'Carpet & Upholstery', href: '/carpet-upholstery-cleaning', description: 'Steam cleaning for carpets & furniture' }
  ];

  const faqs = [
    {
      q: 'Do you guarantee my deposit back?',
      a: 'Yes — if your landlord or agent raises an issue, we\'ll re-clean within 48 hours free of charge.'
    },
    {
      q: 'Do you bring your own equipment?',
      a: 'Yes, all professional materials & equipment are included.'
    },
    {
      q: 'Can I book last-minute?',
      a: 'In most cities we can arrange cleaning within 24–48 hours.'
    },
    {
      q: 'Do you issue receipts for landlords/agents?',
      a: 'Yes, invoices are provided for every booking.'
    },
    {
      q: 'Do you cover student lets?',
      a: 'Yes, we specialise in student move-outs and multi-tenant houses.'
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
                End of Tenancy Cleaning – Get Your Deposit Back
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Moving out? Our professional end of tenancy cleaning helps tenants secure their full deposit and gives landlords & agents properties that are ready to re-let immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="lg" className="text-lg px-8" data-testid="button-call">
                  <Phone className="w-5 h-5 mr-2" />
                  Call us today: {phoneNumber}
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8" data-testid="button-whatsapp">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Chat
                </Button>
                <Button variant="secondary" size="lg" className="text-lg px-8" data-testid="button-quote">
                  Get Instant Quote
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-background" data-testid="why-choose-us">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our End of Tenancy Cleaning?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Deposit-Back Guarantee</h3>
                  <p className="text-sm text-muted-foreground">or we'll re-clean free within 48 hours</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Agent Approved</h3>
                  <p className="text-sm text-muted-foreground">we meet the requirements of major UK letting agents</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">DBS-Checked & Fully Insured</h3>
                  <p className="text-sm text-muted-foreground">All cleaners are background-checked and insured</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Home className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">All Materials Provided</h3>
                  <p className="text-sm text-muted-foreground">eco-friendly products where possible</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-muted" data-testid="whats-included">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Included in End of Tenancy Cleaning</h2>
              <p className="text-lg text-muted-foreground">Our comprehensive checklist covers every corner</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Kitchen</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Oven, hob & extractor</li>
                    <li>• Cupboards inside & out</li>
                    <li>• Fridge/freezer</li>
                    <li>• Sink & tiles</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Bathrooms</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Toilets & baths</li>
                    <li>• Showers & mirrors</li>
                    <li>• Descaling</li>
                    <li>• Tiles & grout</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Bedrooms & Living</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Carpets & floors</li>
                    <li>• Skirting boards</li>
                    <li>• Sockets & doors</li>
                    <li>• Light fixtures</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Windows & Extras</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Interior window cleaning</li>
                    <li>• Frames & sills</li>
                    <li>• Carpet steam cleaning (optional)</li>
                    <li>• External windows (optional)</li>
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
              <p className="text-lg text-muted-foreground">Book online for an instant quote tailored to your property</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£100</div>
                  <div className="text-sm text-muted-foreground">Studio flat from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£120</div>
                  <div className="text-sm text-muted-foreground">1-bed flat from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£160</div>
                  <div className="text-sm text-muted-foreground">2-bed house from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£220</div>
                  <div className="text-sm text-muted-foreground">3-bed house from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£280</div>
                  <div className="text-sm text-muted-foreground">4-bed house from</div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" data-testid="button-quote-now">Get My Quote Now</Button>
            </div>
          </div>
        </section>

        {/* Before & After */}
        <section className="py-16 bg-muted" data-testid="before-after">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Before & After Results</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={livingRoomImage} 
                    alt="Jesmond student flat - full clean secured 100% deposit"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Jesmond student flat</h3>
                    <p className="text-white/90 text-sm">full clean secured 100% deposit</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={kitchenImage} 
                    alt="Leeds Headingley house - restored after 5 tenants moved out"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">Leeds Headingley house</h3>
                    <p className="text-white/90 text-sm">restored after 5 tenants moved out</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden hover-elevate transition-all duration-300">
                <div className="relative h-64">
                  <img 
                    src={carpetImage} 
                    alt="York townhouse - spotless and re-let within 48 hours"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">York townhouse</h3>
                    <p className="text-white/90 text-sm">spotless and re-let within 48 hours</p>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQs – End of Tenancy Cleaning</h2>
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
              <p className="text-lg text-muted-foreground">End of tenancy cleaning across the North East</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {cityLinks.map((city) => (
                <Card key={city.slug} className="hover-elevate transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">End of Tenancy Cleaning {city.name}</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Deposit?</h2>
            <p className="text-xl mb-8 opacity-90">Get your end of tenancy cleaning booked today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" data-testid="button-call-final">
                <Phone className="w-5 h-5 mr-2" />
                Call us today: {phoneNumber}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-whatsapp-final">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8" data-testid="button-quote-final">
                Get Instant Quote
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