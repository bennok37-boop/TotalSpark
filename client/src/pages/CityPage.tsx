import { useParams } from 'wouter';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProofStrip from '@/components/ProofStrip';
import ServiceCards from '@/components/ServiceCards';
import QuoteForm from '@/components/QuoteForm';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Clock, Users, Shield, Award, CheckCircle } from 'lucide-react';
import heroImage from '@assets/generated_images/Clean_modern_kitchen_hero_3f6d5639.png';
import carpetImage from '@assets/generated_images/Carpet_cleaning_before_after_2f2d0ceb.png';
import kitchenImage from '@assets/generated_images/Clean_modern_kitchen_hero_3f6d5639.png';
import livingRoomImage from '@assets/generated_images/Clean_apartment_living_room_e6d5a885.png';

// Todo: remove mock functionality
const cityData = {
  newcastle: {
    name: 'Newcastle',
    phone: '0191 123 4567',
    whatsapp: '447123456789',
    heroTitle: 'Professional Cleaning Services in Newcastle',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds.',
    rating: '4.9/5 from 120+ Newcastle customers',
    areas: ['Jesmond', 'Gosforth', 'Heaton', 'Walker', 'Byker', 'Fenham', 'Gateshead', 'Wallsend'],
    galleryItems: [
      { title: 'Jesmond Student Flat', subtitle: 'End of tenancy clean' },
      { title: 'City Centre Office', subtitle: 'Deep clean' },
      { title: 'Heaton Family Home', subtitle: 'Carpet restoration' }
    ],
    trustSignals: [
      'Helped 40+ landlords in Newcastle get deposit returns in 2025',
      'Approved cleaning partner for local student housing agencies',
      'Regular office cleans for Newcastle SMEs'
    ],
    miniAbout: 'Proudly serving Newcastle since 2025, CleanPro has helped hundreds of tenants, landlords, and businesses with reliable, professional cleaning. From Jesmond to Gosforth and the Quayside, we\'re the trusted choice for hassle-free cleaning in Newcastle.',
    faqs: [
      { q: 'Do you cover student flats in Jesmond and Heaton?', a: 'Yes, we specialize in student accommodation cleaning throughout Jesmond, Heaton, and all Newcastle University areas. We understand the specific requirements for end-of-tenancy cleans in student properties.' },
      { q: 'Can you provide cleaning for Newcastle city centre offices?', a: 'Absolutely. We provide regular and one-off office cleaning services throughout Newcastle city centre, including the Quayside, Grainger Town, and business districts.' },
      { q: 'How quickly can you arrange an end of tenancy clean?', a: 'We can usually arrange end-of-tenancy cleaning within 24-48 hours. For urgent bookings, we offer same-day service subject to availability.' },
      { q: 'Are your cleaners DBS-checked and insured?', a: 'Yes, all our cleaning staff are DBS-checked and we carry £2 million public liability insurance. We can provide certificates upon request.' },
      { q: 'Can you provide receipts for letting agents/landlords?', a: 'Yes, we provide detailed invoices and receipts that meet letting agent and landlord requirements. We work with many Newcastle letting agencies.' },
      { q: 'Do you bring your own cleaning supplies and equipment?', a: 'Yes, we bring all professional cleaning supplies and equipment. We use eco-friendly products that are safe for children and pets.' },
      { q: 'What areas around Newcastle do you cover?', a: 'We cover all Newcastle areas including Jesmond, Gosforth, Heaton, plus surrounding areas like Gateshead, Wallsend, and North Tyneside.' }
    ]
  },
  leeds: {
    name: 'Leeds',
    phone: '0113 123 4567',
    whatsapp: '447113123456',
    heroTitle: 'Professional Cleaning Services in Leeds',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds.',
    rating: '4.9/5 from 180+ Leeds customers',
    areas: ['Headingley', 'Hyde Park', 'Kirkstall', 'Roundhay', 'Chapel Allerton', 'City Centre', 'Burley', 'Woodhouse'],
    galleryItems: [
      { title: 'Headingley Student House', subtitle: 'End of tenancy clean' },
      { title: 'Leeds City Centre Office', subtitle: 'Commercial clean' },
      { title: 'Roundhay Family Home', subtitle: 'Deep clean service' }
    ],
    trustSignals: [
      'Cleaned 500+ student properties across Leeds University area',
      'Maintained corporate offices in Leeds financial district',
      'Specialized end-of-tenancy cleans for young professionals'
    ],
    miniAbout: 'Proudly serving Leeds since 2025, CleanPro has become the go-to choice for students, professionals, and businesses across the city. From Headingley student accommodations to city centre corporate offices, we deliver exceptional cleaning services throughout Leeds.',
    faqs: [
      { q: 'Do you clean student houses in Headingley and Hyde Park?', a: 'Yes, we specialize in student accommodation cleaning throughout Headingley, Hyde Park, and all Leeds University areas. We understand student housing requirements and work with many local landlords.' },
      { q: 'Can you provide cleaning for Leeds business district offices?', a: 'Absolutely. We provide comprehensive office cleaning services throughout Leeds city centre, including the financial district, Call Lane, and Park Row areas.' },
      { q: 'Do you offer weekend cleaning services?', a: 'Yes, we offer flexible scheduling including weekends and evenings to accommodate your needs. This is especially popular with students and working professionals.' },
      { q: 'What areas of Leeds do you cover?', a: 'We cover all Leeds areas including Headingley, Hyde Park, Kirkstall, Roundhay, Chapel Allerton, plus surrounding areas like Horsforth and Otley.' },
      { q: 'Do you work with Leeds letting agencies?', a: 'Yes, we work with numerous letting agencies across Leeds and understand their specific cleaning standards and requirements.' },
      { q: 'Can you handle large student house cleans?', a: 'Yes, we regularly clean large student houses with multiple bedrooms. We bring additional staff for larger properties to ensure efficient service.' },
      { q: 'Are your cleaners available during university term time?', a: 'Yes, we maintain full availability during term time and are experienced in working around student schedules and university calendars.' }
    ]
  },
  york: {
    name: 'York',
    phone: '01904 123 456',
    whatsapp: '447904123456',
    heroTitle: 'Professional Cleaning Services in York',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds.',
    rating: '4.9/5 from 95+ York customers',
    areas: ['City Centre', 'Clifton', 'Acomb', 'Bishopthorpe', 'Fulford', 'Heslington', 'Dringhouses', 'Tang Hall'],
    galleryItems: [
      { title: 'Historic York Property', subtitle: 'Specialist period clean' },
      { title: 'Clifton Modern Apartment', subtitle: 'End of tenancy clean' },
      { title: 'City Centre Office', subtitle: 'Commercial cleaning' }
    ],
    trustSignals: [
      'Specialized cleaning for historic properties and period homes',
      'Maintained luxury serviced apartments in York city center',
      'Deep cleaned 300+ rental properties for landlords and letting agents'
    ],
    miniAbout: 'Proudly serving York since 2025, CleanPro combines modern cleaning techniques with respect for the city\'s historic character. From medieval properties within the city walls to modern developments in Clifton, we provide specialized cleaning services throughout York.',
    faqs: [
      { q: 'Do you have experience cleaning historic York properties?', a: 'Yes, we specialize in cleaning historic and period properties throughout York. We use appropriate techniques and products that respect the character of older buildings.' },
      { q: 'Can you clean properties within York city walls?', a: 'Absolutely. We regularly clean properties within the historic city centre, including apartments and offices near York Minster and in the Shambles area.' },
      { q: 'Do you provide cleaning for York University accommodation?', a: 'Yes, we clean student accommodation near the University of York, including properties in Heslington and surrounding areas.' },
      { q: 'What areas around York do you serve?', a: 'We cover all York areas including the city centre, Clifton, Acomb, Fulford, plus surrounding villages like Bishopthorpe and Dringhouses.' },
      { q: 'Do you work with York tourist accommodation?', a: 'Yes, we provide cleaning services for holiday lets, B&Bs, and serviced apartments throughout York, especially in the tourist areas.' },
      { q: 'Can you handle listed building cleaning requirements?', a: 'Yes, we understand the special requirements for listed buildings and use appropriate cleaning methods and products for sensitive surfaces.' },
      { q: 'Are you familiar with York\'s narrow streets and parking restrictions?', a: 'Yes, our team is experienced with York\'s unique layout and parking challenges. We plan our visits to minimize disruption and comply with local restrictions.' }
    ]
  },
  sunderland: {
    name: 'Sunderland',
    phone: '0191 456 7890',
    whatsapp: '447456789012',
    heroTitle: 'Professional Cleaning Services in Sunderland',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds.',
    rating: '4.9/5 from 85+ Sunderland customers',
    areas: ['City Centre', 'Roker', 'Southwick', 'Hendon', 'Millfield', 'Barnes', 'Pennywell', 'Grindon'],
    galleryItems: [
      { title: 'Roker Seafront Apartment', subtitle: 'Deep clean service' },
      { title: 'City Centre Student Flat', subtitle: 'End of tenancy clean' },
      { title: 'Southwick Family Home', subtitle: 'Weekly cleaning service' }
    ],
    trustSignals: [
      'Successfully cleaned 100+ student properties near University of Sunderland',
      'Maintained shopping centers and retail spaces for 5+ years',
      'Helped families prepare homes for sale with deep cleaning services'
    ],
    miniAbout: 'Proudly serving Sunderland since 2025, CleanPro has built strong relationships with residents, students, and businesses across the city. From seafront properties in Roker to student accommodations near the university, we provide reliable cleaning services throughout Sunderland.',
    faqs: [
      { q: 'Do you clean University of Sunderland student accommodation?', a: 'Yes, we specialize in cleaning student properties near the University of Sunderland, including city centre accommodations and surrounding areas.' },
      { q: 'Can you provide cleaning for Sunderland seafront properties?', a: 'Absolutely. We regularly clean properties along the Roker and Seaburn seafront, understanding the specific challenges of coastal properties.' },
      { q: 'Do you work with Sunderland letting agencies?', a: 'Yes, we work with several letting agencies across Sunderland and understand local rental market requirements and standards.' },
      { q: 'What areas of Sunderland do you cover?', a: 'We cover all Sunderland areas including the city centre, Roker, Southwick, Hendon, Millfield, plus surrounding areas like Washington and Houghton-le-Spring.' },
      { q: 'Can you handle industrial and commercial cleaning?', a: 'Yes, we provide commercial cleaning services for offices, retail spaces, and light industrial premises throughout Sunderland.' },
      { q: 'Do you offer end-of-tenancy cleaning guarantees?', a: 'Yes, we offer a deposit-back guarantee for all end-of-tenancy cleans. If your landlord deducts money for cleaning issues we were hired to address, we\'ll refund the amount.' },
      { q: 'Are you available for emergency cleaning services?', a: 'Yes, we provide emergency cleaning services for insurance claims, flood damage cleanup, and urgent situations throughout Sunderland.' }
    ]
  },
  middlesbrough: {
    name: 'Middlesbrough',
    phone: '01642 123 456',
    whatsapp: '447642123456',
    heroTitle: 'Professional Cleaning Services in Middlesbrough',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds.',
    rating: '4.9/5 from 75+ Middlesbrough customers',
    areas: ['Town Centre', 'Linthorpe', 'Acklam', 'Marton', 'Nunthorpe', 'Ormesby', 'Park End', 'Brambles Farm'],
    galleryItems: [
      { title: 'Linthorpe Victorian House', subtitle: 'End of tenancy clean' },
      { title: 'Town Centre Office', subtitle: 'Commercial cleaning' },
      { title: 'Acklam Family Home', subtitle: 'Deep clean service' }
    ],
    trustSignals: [
      'Cleaned industrial offices and commercial spaces across Teesside',
      'Maintained residential properties for major letting agencies',
      'Provided emergency cleaning services for insurance claims'
    ],
    miniAbout: 'Proudly serving Middlesbrough since 2025, CleanPro understands the unique needs of Teesside properties and businesses. From Victorian terraces in Linthorpe to modern developments in Nunthorpe, we provide comprehensive cleaning services throughout Middlesbrough.',
    faqs: [
      { q: 'Do you clean properties across all Middlesbrough areas?', a: 'Yes, we provide cleaning services throughout Middlesbrough including the town centre, Linthorpe, Acklam, Marton, Nunthorpe, and surrounding Teesside areas.' },
      { q: 'Can you handle industrial and commercial cleaning?', a: 'Yes, we specialize in cleaning industrial offices, commercial premises, and retail spaces across Teesside, understanding the unique requirements of industrial areas.' },
      { q: 'Do you work with Middlesbrough Council properties?', a: 'We work with various housing associations and can accommodate council property cleaning requirements and standards.' },
      { q: 'What about cleaning for Teesside University accommodation?', a: 'Yes, we provide cleaning services for student properties near Teesside University and understand student housing requirements.' },
      { q: 'Can you provide emergency cleaning for insurance claims?', a: 'Yes, we offer emergency cleaning services for flood damage, fire damage, and other insurance-related cleaning requirements throughout Middlesbrough.' },
      { q: 'Do you clean Victorian and period properties?', a: 'Yes, we have experience cleaning Victorian terraces and period properties throughout Linthorpe and other historic areas of Middlesbrough.' },
      { q: 'Are you available for weekend and evening cleans?', a: 'Yes, we offer flexible scheduling including weekends and evenings to accommodate working schedules and minimize disruption.' }
    ]
  }
};

export default function CityPage() {
  const params = useParams();
  const citySlug = params.city;
  const city = cityData[citySlug as keyof typeof cityData];

  if (!city) {
    return <div>City not found</div>;
  }

  return (
    <div className="min-h-screen">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About CleanPro {city.name}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {city.miniAbout}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {city.areas.slice(0, 8).map((area) => (
                  <Badge key={area} variant="outline" className="p-3 text-center justify-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {area}
                  </Badge>
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