import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Shield, Award, CheckCircle, Phone, MessageCircle, Clock, Users, Building, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';

// Import gallery images
import livingRoomImage from '@assets/generated_images/Clean_apartment_living_room_e6d5a885.png';
import kitchenImage from '@assets/generated_images/Clean_modern_kitchen_hero_3f6d5639.png';
import carpetImage from '@assets/generated_images/Carpet_cleaning_before_after_2f2d0ceb.png';

export default function CommercialCleaningPage() {
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
    { name: 'End of Tenancy Cleaning', href: '/end-of-tenancy-cleaning', description: 'Move-out cleaning with deposit guarantee' },
    { name: 'Deep Cleaning', href: '/deep-cleaning', description: 'Comprehensive property restoration' },
    { name: 'Carpet & Upholstery', href: '/carpet-upholstery-cleaning', description: 'Steam cleaning for carpets & furniture' }
  ];

  const faqs = [
    {
      q: 'Do you work outside office hours?',
      a: 'Yes — evenings, weekends, and early mornings available.'
    },
    {
      q: 'Do you supply cleaning products?',
      a: 'Yes, all equipment and COSHH-compliant products included.'
    },
    {
      q: 'Can you provide risk assessments & method statements?',
      a: 'Yes — documentation supplied for compliance.'
    },
    {
      q: 'Do you do one-off deep cleans?',
      a: 'Yes, as well as ongoing contracts.'
    },
    {
      q: 'Do you cover multi-site businesses?',
      a: 'Yes — we manage cleaning across multiple North East sites.'
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
                Commercial & Office Cleaning Services
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Keep your workplace spotless with flexible office cleaning contracts and commercial cleaning across the North East.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button size="lg" className="text-lg px-8" data-testid="button-call">
                  <Phone className="w-5 h-5 mr-2" />
                  Speak to our commercial team: {phoneNumber}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Businesses Trust Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Tailored Schedules</h3>
                  <p className="text-sm text-muted-foreground">daily, weekly, or monthly cleaning schedules</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Multi-Sector Experience</h3>
                  <p className="text-sm text-muted-foreground">offices, retail, schools, and healthcare sites</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">DBS-Checked & Insured</h3>
                  <p className="text-sm text-muted-foreground">fully insured, COSHH-compliant staff</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Flexible Hours</h3>
                  <p className="text-sm text-muted-foreground">early mornings, evenings, or weekends</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-muted" data-testid="our-services">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Commercial Cleaning Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Office Cleaning</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Desks & workstations</li>
                    <li>• Phones & keyboards</li>
                    <li>• Office kitchens</li>
                    <li>• Washrooms</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Retail & Hospitality</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Shop floors</li>
                    <li>• Counters & displays</li>
                    <li>• Stockrooms</li>
                    <li>• Customer areas</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Education</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Classrooms</li>
                    <li>• Corridors</li>
                    <li>• Toilets & facilities</li>
                    <li>• Common areas</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Specialist Services</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Carpet cleaning</li>
                    <li>• High-touch disinfection</li>
                    <li>• Window cleaning</li>
                    <li>• Deep sanitisation</li>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£20/hr</div>
                  <div className="text-sm text-muted-foreground">Office cleaning from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">£60/week</div>
                  <div className="text-sm text-muted-foreground">Retail & small business contracts from</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">Custom</div>
                  <div className="text-sm text-muted-foreground">Larger sites - quote available</div>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" data-testid="button-quote-business">Get a Free Business Quote</Button>
            </div>
          </div>
        </section>

        {/* Local Businesses */}
        <section className="py-16 bg-muted" data-testid="local-businesses">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Local Businesses We Serve</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Newcastle city centre SMEs</h3>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Leeds legal & accounting firms</h3>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Sunderland retail outlets in The Bridges</h3>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Middlesbrough schools & clinics</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-background" data-testid="faqs">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQs – Commercial Cleaning</h2>
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
              <p className="text-lg text-muted-foreground">Commercial cleaning across the North East</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {cityLinks.map((city) => (
                <Card key={city.slug} className="hover-elevate transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Commercial Cleaning {city.name}</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Workplace?</h2>
            <p className="text-xl mb-8 opacity-90">Get your commercial cleaning quote today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" data-testid="button-call-final">
                <Phone className="w-5 h-5 mr-2" />
                Call now for a free consultation: {phoneNumber}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-whatsapp-final">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8" data-testid="button-quote-final">
                Get Quote
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