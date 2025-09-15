import { useParams, Link } from 'wouter';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProofStrip from '@/components/ProofStrip';
import ServiceCards from '@/components/ServiceCards';
import QuoteForm from '@/components/QuoteForm';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import SEOHead from '@/components/SEOHead';
import NotFoundPage from '@/components/NotFoundPage';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Clock, Users, Shield, Award, CheckCircle, Phone } from 'lucide-react';
import { REGIONS } from '@shared/locations';
import { findLocationBySlug, getRegionPhoneNumber, getRegionWhatsAppNumber, getNearbyLocations } from '@shared/location-utils';
import heroImage from '@assets/generated_images/Clean_modern_kitchen_hero_3f6d5639.png';
import carpetImage from '@assets/generated_images/Carpet_cleaning_before_after_2f2d0ceb.png';
import kitchenImage from '@assets/generated_images/Clean_modern_kitchen_hero_3f6d5639.png';
import livingRoomImage from '@assets/generated_images/Clean_apartment_living_room_e6d5a885.png';

type Location = {
  name: string;
  slug: string;
};


// Dynamic content generator for any location
function generateCityPageContent(location: Location, region: typeof REGIONS[keyof typeof REGIONS]) {
  const nearbyLocations = getNearbyLocations(location, region);
  const nearbyNames = nearbyLocations.slice(0, 6).map(loc => loc.name);
  const nearbyAreas = nearbyLocations.slice(0, 8).map(loc => ({ name: loc.name, slug: loc.slug }));
  
  return {
    name: location.name,
    phone: getRegionPhoneNumber(region.slug),
    whatsapp: getRegionWhatsAppNumber(region.slug),
    heroTitle: `Professional Cleaning Services in ${location.name} — ${nearbyNames.slice(0, 3).join(', ')} & surrounding ${region.name} areas`,
    heroSubhead: `End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds. Serving all ${region.name} areas including ${nearbyNames.slice(3, 6).join(', ')} & more.`,
    rating: 'Rated 4.9/5 by local tenants & landlords',
    proofText: 'DBS-checked professional cleaners | Fully insured & COSHH-compliant | Deposit-Back Guarantee or free re-clean within 48 hours',
    serviceIntro: `We provide reliable cleaning services across ${location.name} and surrounding ${region.name} areas for tenants, landlords, businesses, and homeowners. Choose from:`,
    pricingText: 'We believe in clear, upfront pricing',
    galleryIntro: `See the difference our expert cleaners deliver across ${location.name} and surrounding areas:`,
    areas: nearbyNames,
    galleryItems: [
      { title: `${location.name} property`, subtitle: 'spotless after end of tenancy clean' },
      { title: `${nearbyLocations[0]?.name || 'Local'} office space`, subtitle: 'polished and ready for clients' },
      { title: `${nearbyLocations[1]?.name || 'Area'} family home`, subtitle: 'carpets restored to like-new condition' }
    ],
    trustSignals: [
      `Successfully cleaned 100+ properties across ${location.name} and ${region.name}`,
      `Approved cleaning partner for local landlords and letting agencies in ${location.name}`,
      `Ongoing cleaning contracts with businesses around ${location.name} & surrounding areas`
    ],
    miniAbout: `Proudly serving ${location.name} and surrounding ${region.name} areas since 2025, CleanPro has built a reputation for reliable, professional cleaning. Whether it's residential properties, student accommodation, or commercial spaces around ${location.name}, we provide cleaning services you can trust to get the job done right — the first time.`,
    nearbyAreas,
    faqs: [
      { q: `Do you cover ${location.name} and surrounding areas?`, a: `Yes — we regularly provide cleaning services across ${location.name} and all surrounding ${region.name} areas including ${nearbyNames.slice(0, 3).join(', ')}.` },
      { q: 'Can you clean offices and commercial properties?', a: `Absolutely. We cover everything from small offices to full business premises across ${location.name} and ${region.name}, with flexible daily, weekly, or one-off cleans.` },
      { q: 'How quickly can I book a clean?', a: `In most cases we can arrange a team within 24–48 hours across ${location.name} and all ${region.name} areas.` },
      { q: 'Are your cleaners insured and DBS-checked?', a: 'Yes — all staff are background-checked, fully insured, and trained to COSHH standards.' },
      { q: 'Do you bring your own supplies and equipment?', a: 'Yes — we provide all professional-grade cleaning materials, eco-friendly where possible.' },
      { q: 'Can you provide receipts for landlords or letting agents?', a: `Yes — we issue detailed invoices accepted by agents and landlords across ${location.name} and ${region.name}.` },
      { q: `Do you cover nearby areas like ${nearbyNames.slice(0, 2).join(' and ')}?`, a: `Yes — we serve the entire ${region.name} area, including ${nearbyNames.join(', ')} and all surrounding locations.` }
    ]
  };
}

export default function CityPage() {
  const params = useParams();
  const citySlug = params.city;
  
  if (!citySlug) {
    return <div>City not found</div>;
  }
  
  // Find location using our REGIONS data
  const locationData = findLocationBySlug(citySlug);
  
  if (!locationData) {
    return <NotFoundPage locationSlug={citySlug} type="location" />;
  }
  
  // Generate dynamic content based on location and region
  const city = generateCityPageContent(locationData.location, locationData.region);

  // Generate SEO content
  const seoTitle = `Professional Cleaning Services in ${locationData.location.name} | CleanPro - ${locationData.region.name}`;
  const seoDescription = `Expert cleaning services in ${locationData.location.name} and surrounding ${locationData.region.name} areas. End of tenancy, deep cleaning, commercial cleaning. Instant quotes in 60 seconds. DBS-checked, fully insured. Call ${city.phone}.`;
  const seoKeywords = `cleaning services ${locationData.location.name}, end of tenancy cleaning ${locationData.location.name}, deep cleaning ${locationData.region.name}, commercial cleaning, ${locationData.location.name} cleaners, professional cleaning ${locationData.region.name}`;
  const canonicalUrl = `${window.location.origin}/cleaning/${locationData.location.slug}`;

  return (
    <div className="min-h-screen">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl={canonicalUrl}
        ogTitle={seoTitle}
        ogDescription={seoDescription}
        ogType="website"
      />
      <Header />
      <main>
        {/* 1. Hero Section */}
        <HeroSection 
          city={city.name}
          title={city.heroTitle}
          subtitle={city.heroSubhead}
          phoneNumber={city.phone}
          whatsappNumber={city.whatsapp}
        />
        
        {/* 2. Proof Strip */}
        <section className="bg-muted py-8" data-testid="section-proof-strip">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
                <span className="ml-2 font-semibold text-foreground">{city.rating}</span>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-medium">DBS-checked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-medium">Fully Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">Deposit-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Service Blocks */}
        <ServiceCards />

        {/* 4. Pricing Snapshot */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing — From Just £120</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">£120</div>
                  <div className="text-muted-foreground">1-bed flat cleans from</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">£220</div>
                  <div className="text-muted-foreground">3-bed house deep cleans from</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">£20/hr</div>
                  <div className="text-muted-foreground">Office cleaning from</div>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">Get your exact price in 60 seconds with our instant quote form.</p>
              <Button size="lg" data-testid="button-calculate-price">Calculate My Price</Button>
            </div>
          </div>
        </section>

        {/* 5. Before/After Gallery */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Difference</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Real transformations from our recent cleaning projects in {city.name}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {city.galleryItems.map((item, index) => (
                <Card key={index} className="overflow-hidden hover-elevate transition-all duration-300">
                  <div className="relative h-64">
                    <img 
                      src={index === 0 ? livingRoomImage : index === 1 ? kitchenImage : carpetImage} 
                      alt={`${item.title} - ${item.subtitle}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.subtitle}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Local Trust Signals */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by {city.name} Residents</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {city.trustSignals.map((signal, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {index === 0 && <Users className="w-6 h-6 text-primary" />}
                      {index === 1 && <Clock className="w-6 h-6 text-primary" />}
                      {index === 2 && <MapPin className="w-6 h-6 text-primary" />}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {signal}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FAQs (city-specific) */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground text-lg">
                  Everything you need to know about our cleaning services in {city.name}
                </p>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {city.faqs.map((faq, index) => (
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

        {/* 8. Mini About (geo-specific) */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About TotalSpark Solutions {city.name}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {city.miniAbout}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {city.nearbyAreas.map((area) => (
                  <Link 
                    key={area.slug} 
                    href={`/cleaning/${area.slug}`} 
                    className="group"
                    data-testid={`link-nearby-${area.slug}`}
                  >
                    <Badge variant="outline" className="p-3 text-center justify-center w-full hover-elevate transition-all">
                      <MapPin className="w-4 h-4 mr-2" />
                      {area.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. Final CTA (Quote Form) */}
        <QuoteForm />
      </main>
      <Footer />
      <StickyCallButton 
        phoneNumber={city.phone}
        whatsappNumber={city.whatsapp}
      />
    </div>
  );
}