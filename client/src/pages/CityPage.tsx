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
    heroTitle: 'Professional Cleaning Services in Newcastle — including Jesmond, Heaton, Gosforth, Gateshead, Washington & Cramlington',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds. Serving all surrounding areas including Blyth, Tynemouth & more.',
    rating: 'Rated 4.9/5 by local tenants & landlords',
    proofText: 'DBS-checked professional cleaners | Fully insured & COSHH-compliant | Deposit-Back Guarantee or free re-clean within 48 hours',
    serviceIntro: 'We provide reliable cleaning services across Newcastle and surrounding areas for tenants, landlords, businesses, and homeowners. Choose from:',
    pricingText: 'We believe in clear, upfront pricing',
    galleryIntro: 'See the difference our expert cleaners deliver across Newcastle and surrounding areas:',
    areas: ['Jesmond', 'Heaton', 'Gosforth', 'Gateshead', 'Washington', 'Cramlington', 'Blyth', 'Tynemouth', 'City Centre', 'Sandyford', 'Quayside'],
    galleryItems: [
      { title: 'Jesmond student flat', subtitle: 'spotless after end of tenancy clean' },
      { title: 'Gateshead office space', subtitle: 'polished and ready for clients' },
      { title: 'Washington family home', subtitle: 'carpets restored to like-new condition' }
    ],
    trustSignals: [
      'Worked with 40+ landlords across Newcastle, Gateshead & Washington to secure deposit returns in 2025',
      'Approved cleaning partner for student accommodation providers in Newcastle & surrounding areas',
      'Ongoing office cleaning for local SMEs around Quayside, Sandyford & Gateshead'
    ],
    miniAbout: 'Proudly serving Newcastle and surrounding areas including Gateshead, Washington, Cramlington, Blyth and Tynemouth since 2025, CleanPro has built a reputation for reliable, professional cleaning. Whether it\'s student flats in Jesmond, family homes in Washington, or offices in Gateshead, we provide cleaning services you can trust to get the job done right — the first time.',
    faqs: [
      { q: 'Do you cover areas like Gateshead, Washington, Cramlington and Blyth?', a: 'Yes — we regularly provide cleaning services across Newcastle and all surrounding areas including Gateshead, Washington, Cramlington, Blyth, and Tynemouth.' },
      { q: 'Can you clean offices in Newcastle city centre and Gateshead?', a: 'Absolutely. We cover everything from small offices to full business premises across Newcastle, Gateshead and surrounding areas, with flexible daily, weekly, or one-off cleans.' },
      { q: 'How quickly can I book a clean?', a: 'In most cases we can arrange a team within 24–48 hours across all our coverage areas.' },
      { q: 'Are your cleaners insured and DBS-checked?', a: 'Yes — all staff are background-checked, fully insured, and trained to COSHH standards.' },
      { q: 'Do you bring your own supplies and equipment?', a: 'Yes — we provide all professional-grade cleaning materials, eco-friendly where possible.' },
      { q: 'Can you provide receipts for landlords or letting agents?', a: 'Yes — we issue detailed invoices accepted by agents and landlords across Newcastle, Gateshead and all surrounding areas.' },
      { q: 'Do you cover Gateshead, Wallsend, and other nearby areas?', a: 'Yes — we serve the wider Tyne & Wear area, including Gateshead, Wallsend, and North Shields.' }
    ]
  },
  leeds: {
    name: 'Leeds',
    phone: '0113 123 4567',
    whatsapp: '447113123456',
    heroTitle: 'Professional Cleaning Services in Leeds — Headingley, Hyde Park, Burley, Bradford, Wakefield, Harrogate & Wetherby',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds. Serving all surrounding areas including Pudsey, Horsforth & more.',
    rating: 'Rated 4.9/5 by local tenants & landlords',
    proofText: 'DBS-checked professional cleaners | Fully insured & COSHH-compliant | Deposit-Back Guarantee or free re-clean within 48 hours',
    serviceIntro: 'We provide reliable cleaning services across Leeds and surrounding areas for tenants, landlords, businesses, and homeowners. Choose from:',
    pricingText: 'We believe in clear, upfront pricing',
    galleryIntro: 'See the difference our expert cleaners deliver across Leeds and surrounding areas:',
    areas: ['Headingley', 'Hyde Park', 'Burley', 'Bradford', 'Wakefield', 'Harrogate', 'Wetherby', 'Pudsey', 'Kirkstall', 'Roundhay', 'Chapel Allerton'],
    galleryItems: [
      { title: 'Headingley student house', subtitle: 'spotless after end of tenancy clean' },
      { title: 'Leeds city centre office', subtitle: 'polished and ready for clients' },
      { title: 'Roundhay family home', subtitle: 'carpets restored to like-new condition' }
    ],
    trustSignals: [
      'Cleaned 500+ student properties across Leeds University area',
      'Maintained corporate offices in Leeds financial district',
      'Ongoing cleaning contracts with businesses around Call Lane & Park Row'
    ],
    miniAbout: 'Proudly serving Leeds since 2025, TotalSpark Solutions has become the go-to choice for students, professionals, and businesses across the city. Whether it\'s student houses in Headingley, family homes in Roundhay, or offices in the financial district, we provide cleaning services you can trust to get the job done right — the first time.',
    faqs: [
      { q: 'Do you cover student houses in Headingley, Hyde Park, and Kirkstall?', a: 'Yes — we regularly clean student accommodation across these areas, including full end of tenancy cleans for university students.' },
      { q: 'Can you clean business district offices in Leeds?', a: 'Absolutely. We cover everything from small offices to full business premises, with flexible daily, weekly, or one-off cleans.' },
      { q: 'How quickly can I book a clean?', a: 'In most cases we can arrange a team within 24–48 hours.' },
      { q: 'Are your cleaners insured and DBS-checked?', a: 'Yes — all staff are background-checked, fully insured, and trained to COSHH standards.' },
      { q: 'Do you bring your own supplies and equipment?', a: 'Yes — we provide all professional-grade cleaning materials, eco-friendly where possible.' },
      { q: 'Can you provide receipts for landlords or letting agents?', a: 'Yes — we issue detailed invoices accepted by agents and landlords across Leeds.' },
      { q: 'Do you cover Horsforth, Otley, and other nearby areas?', a: 'Yes — we serve the wider Leeds area, including Horsforth, Otley, and surrounding West Yorkshire areas.' }
    ]
  },
  york: {
    name: 'York',
    phone: '01904 123 456',
    whatsapp: '447904123456',
    heroTitle: 'Professional Cleaning Services in York — Heslington, Clifton, Selby, Tadcaster, Pocklington, Harrogate & Wetherby',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds. Serving all surrounding areas including Malton, Pickering & more.',
    rating: 'Rated 4.9/5 by local tenants & landlords',
    proofText: 'DBS-checked professional cleaners | Fully insured & COSHH-compliant | Deposit-Back Guarantee or free re-clean within 48 hours',
    serviceIntro: 'We provide reliable cleaning services across York and surrounding areas for tenants, landlords, businesses, and homeowners. Choose from:',
    pricingText: 'We believe in clear, upfront pricing',
    galleryIntro: 'See the difference our expert cleaners deliver across York and surrounding areas:',
    areas: ['Heslington', 'Clifton', 'Selby', 'Tadcaster', 'Pocklington', 'Harrogate', 'Wetherby', 'Malton', 'Pickering', 'York city centre', 'Acomb', 'Fulford', 'Bishopthorpe'],
    galleryItems: [
      { title: 'Historic York property', subtitle: 'carefully cleaned period features' },
      { title: 'Clifton modern apartment', subtitle: 'spotless after end of tenancy clean' },
      { title: 'City centre office', subtitle: 'polished and ready for clients' }
    ],
    trustSignals: [
      'Specialized cleaning for historic properties and period homes',
      'Maintained luxury serviced apartments in York city centre',
      'Ongoing cleaning contracts for businesses around York Minster & The Shambles'
    ],
    miniAbout: 'Proudly serving York since 2025, TotalSpark Solutions combines modern cleaning techniques with respect for the city\'s historic character. Whether it\'s medieval properties within the city walls, student accommodation near the University, or modern homes in Clifton, we provide cleaning services you can trust to get the job done right — the first time.',
    faqs: [
      { q: 'Do you cover historic properties within York city walls?', a: 'Yes — we specialize in cleaning historic and period properties, using appropriate techniques that respect older buildings.' },
      { q: 'Can you clean near York Minster and The Shambles?', a: 'Absolutely. We cover everything from small city centre apartments to full business premises, navigating York\'s unique streets with care.' },
      { q: 'How quickly can I book a clean?', a: 'In most cases we can arrange a team within 24–48 hours.' },
      { q: 'Are your cleaners insured and DBS-checked?', a: 'Yes — all staff are background-checked, fully insured, and trained to COSHH standards.' },
      { q: 'Do you bring your own supplies and equipment?', a: 'Yes — we provide all professional-grade cleaning materials, eco-friendly where possible.' },
      { q: 'Can you provide receipts for landlords or letting agents?', a: 'Yes — we issue detailed invoices accepted by agents and landlords across York.' },
      { q: 'Do you cover Heslington, Bishopthorpe, and other nearby areas?', a: 'Yes — we serve the wider York area, including surrounding villages and University of York accommodation.' }
    ]
  },
  sunderland: {
    name: 'Sunderland',
    phone: '0191 456 7890',
    whatsapp: '447456789012',
    heroTitle: 'Professional Cleaning Services in Sunderland — Ashbrooke, Washington, Seaham, Houghton-le-Spring, Durham & South Shields',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds. Serving all surrounding areas including Chester-le-Street & more.',
    rating: 'Rated 4.9/5 by local tenants & landlords',
    proofText: 'DBS-checked professional cleaners | Fully insured & COSHH-compliant | Deposit-Back Guarantee or free re-clean within 48 hours',
    serviceIntro: 'We provide reliable cleaning services across Sunderland and surrounding areas for tenants, landlords, businesses, and homeowners. Choose from:',
    pricingText: 'We believe in clear, upfront pricing',
    galleryIntro: 'See the difference our expert cleaners deliver across Sunderland and surrounding areas:',
    areas: ['Ashbrooke', 'Washington', 'Seaham', 'Houghton-le-Spring', 'Durham', 'South Shields', 'Chester-le-Street', 'City Centre', 'University areas', 'Roker', 'Southwick', 'Hendon'],
    galleryItems: [
      { title: 'Roker seafront apartment', subtitle: 'spotless after deep clean' },
      { title: 'City centre student flat', subtitle: 'ready for deposit return' },
      { title: 'Southwick family home', subtitle: 'carpets restored to like-new condition' }
    ],
    trustSignals: [
      'Successfully cleaned 100+ student properties near University of Sunderland',
      'Maintained shopping centres and retail spaces across the city',
      'Ongoing cleaning contracts for businesses around Roker & city centre'
    ],
    miniAbout: 'Proudly serving Sunderland since 2025, TotalSpark Solutions has built strong relationships with residents, students, and businesses across the city. Whether it\'s seafront properties in Roker, student accommodations near the university, or family homes in Southwick, we provide cleaning services you can trust to get the job done right — the first time.',
    faqs: [
      { q: 'Do you cover University of Sunderland student accommodation?', a: 'Yes — we regularly clean student properties near the University, including city centre flats and surrounding areas.' },
      { q: 'Can you clean seafront properties in Roker and Seaburn?', a: 'Absolutely. We cover everything from seafront apartments to family homes, understanding coastal property cleaning challenges.' },
      { q: 'How quickly can I book a clean?', a: 'In most cases we can arrange a team within 24–48 hours.' },
      { q: 'Are your cleaners insured and DBS-checked?', a: 'Yes — all staff are background-checked, fully insured, and trained to COSHH standards.' },
      { q: 'Do you bring your own supplies and equipment?', a: 'Yes — we provide all professional-grade cleaning materials, eco-friendly where possible.' },
      { q: 'Can you provide receipts for landlords or letting agents?', a: 'Yes — we issue detailed invoices accepted by agents and landlords across Sunderland.' },
      { q: 'Do you cover Washington, Houghton-le-Spring, and other nearby areas?', a: 'Yes — we serve the wider Sunderland area, including Washington, Houghton-le-Spring, and surrounding areas.' }
    ]
  },
  middlesbrough: {
    name: 'Middlesbrough',
    phone: '01642 123 456',
    whatsapp: '447642123456',
    heroTitle: 'Professional Cleaning Services in Middlesbrough — Stockton-on-Tees, Redcar, Hartlepool, Darlington, Thornaby & Billingham',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds. Serving all Teesside areas including Guisborough, Yarm & more.',
    rating: 'Rated 4.9/5 by local tenants & landlords',
    proofText: 'DBS-checked professional cleaners | Fully insured & COSHH-compliant | Deposit-Back Guarantee or free re-clean within 48 hours',
    serviceIntro: 'We provide reliable cleaning services across Middlesbrough and surrounding Teesside areas for tenants, landlords, businesses, and homeowners. Choose from:',
    pricingText: 'We believe in clear, upfront pricing',
    galleryIntro: 'See the difference our expert cleaners deliver across Teesside:',
    areas: ['Stockton-on-Tees', 'Redcar', 'Hartlepool', 'Darlington', 'Thornaby', 'Billingham', 'Guisborough', 'Yarm', 'Teesside University', 'Linthorpe', 'Town Centre', 'Acklam', 'Marton', 'Nunthorpe'],
    galleryItems: [
      { title: 'Linthorpe Victorian house', subtitle: 'beautifully restored period features' },
      { title: 'Town centre office', subtitle: 'polished and ready for clients' },
      { title: 'Acklam family home', subtitle: 'spotless after deep clean' }
    ],
    trustSignals: [
      'Cleaned industrial offices and commercial spaces across Teesside',
      'Maintained residential properties for major letting agencies',
      'Ongoing cleaning contracts for businesses around town centre & Linthorpe'
    ],
    miniAbout: 'Proudly serving Middlesbrough since 2025, TotalSpark Solutions understands the unique needs of Teesside properties and businesses. Whether it\'s Victorian terraces in Linthorpe, modern developments in Nunthorpe, or offices in the town centre, we provide cleaning services you can trust to get the job done right — the first time.',
    faqs: [
      { q: 'Do you cover all Middlesbrough areas including Linthorpe and Acklam?', a: 'Yes — we regularly clean properties across Middlesbrough including town centre, Linthorpe, Acklam, and surrounding Teesside areas.' },
      { q: 'Can you handle industrial and commercial cleaning across Teesside?', a: 'Absolutely. We cover everything from small offices to industrial premises, understanding Teesside\'s unique business requirements.' },
      { q: 'How quickly can I book a clean?', a: 'In most cases we can arrange a team within 24–48 hours.' },
      { q: 'Are your cleaners insured and DBS-checked?', a: 'Yes — all staff are background-checked, fully insured, and trained to COSHH standards.' },
      { q: 'Do you bring your own supplies and equipment?', a: 'Yes — we provide all professional-grade cleaning materials, eco-friendly where possible.' },
      { q: 'Can you provide receipts for landlords or letting agents?', a: 'Yes — we issue detailed invoices accepted by agents and landlords across Middlesbrough.' },
      { q: 'Do you cover Stockton, Redcar, and other nearby areas?', a: 'Yes — we serve the wider Teesside area, including Stockton, Redcar, and surrounding Cleveland areas.' }
    ]
  },
  durham: {
    name: 'Durham',
    phone: '0191 789 0123',
    whatsapp: '447789012345',
    heroTitle: 'Professional Cleaning Services in Durham — Chester-le-Street, Bishop Auckland, Consett, Stanley, Spennymoor & Newton Aycliffe',
    heroSubhead: 'End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds. Serving all County Durham areas including Crook, Seaham & more.',
    rating: 'Rated 4.9/5 by local tenants & landlords',
    proofText: 'DBS-checked professional cleaners | Fully insured & COSHH-compliant | Deposit-Back Guarantee or free re-clean within 48 hours',
    serviceIntro: 'We provide reliable cleaning services across Durham and surrounding County Durham areas for tenants, landlords, businesses, and homeowners. Choose from:',
    pricingText: 'We believe in clear, upfront pricing',
    galleryIntro: 'See the difference our expert cleaners deliver across County Durham:',
    areas: ['Chester-le-Street', 'Bishop Auckland', 'Consett', 'Stanley', 'Spennymoor', 'Newton Aycliffe', 'Crook', 'Seaham', 'Durham City', 'Peterlee', 'Ferryhill', 'Shildon'],
    galleryItems: [
      { title: 'Durham Cathedral area property', subtitle: 'historic features carefully cleaned' },
      { title: 'Chester-le-Street family home', subtitle: 'spotless after end of tenancy clean' },
      { title: 'Bishop Auckland office space', subtitle: 'polished and ready for clients' }
    ],
    trustSignals: [
      'Specialized cleaning for historic properties around Durham Cathedral and city centre',
      'Maintained residential properties across County Durham mining communities',
      'Ongoing cleaning contracts for businesses around Chester-le-Street & Bishop Auckland'
    ],
    miniAbout: 'Proudly serving Durham and County Durham since 2025, CleanPro understands the unique character of this historic region. Whether it\'s period properties near Durham Cathedral, former mining community homes in Stanley and Consett, or modern developments in Newton Aycliffe, we provide cleaning services you can trust to get the job done right — the first time.',
    faqs: [
      { q: 'Do you cover all County Durham areas including Chester-le-Street and Bishop Auckland?', a: 'Yes — we regularly provide cleaning services across County Durham including Chester-le-Street, Bishop Auckland, Consett, Stanley, and all surrounding areas.' },
      { q: 'Can you handle historic properties around Durham Cathedral?', a: 'Absolutely. We specialize in cleaning historic and period properties, using appropriate techniques that respect older buildings and heritage features.' },
      { q: 'How quickly can I book a clean?', a: 'In most cases we can arrange a team within 24–48 hours across all County Durham areas.' },
      { q: 'Are your cleaners insured and DBS-checked?', a: 'Yes — all staff are background-checked, fully insured, and trained to COSHH standards.' },
      { q: 'Do you bring your own supplies and equipment?', a: 'Yes — we provide all professional-grade cleaning materials, eco-friendly where possible.' },
      { q: 'Can you provide receipts for landlords or letting agents?', a: 'Yes — we issue detailed invoices accepted by agents and landlords across County Durham.' },
      { q: 'Do you cover Seaham, Peterlee, and coastal County Durham areas?', a: 'Yes — we serve the entire County Durham region, including coastal areas and former mining communities.' }
    ]
  }
};

// Mapping from full location slugs to cityData keys
const slugMapping: Record<string, string> = {
  'newcastle-upon-tyne': 'newcastle',
  'newcastle': 'newcastle',
  'sunderland': 'sunderland',
  'leeds': 'leeds',
  'york': 'york',
  'durham': 'durham',
  'middlesbrough': 'middlesbrough'
};

export default function CityPage() {
  const params = useParams();
  const citySlug = params.city;
  
  if (!citySlug) {
    return <div>City not found</div>;
  }
  
  // Map the incoming slug to the cityData key
  const mappedSlug = slugMapping[citySlug] || citySlug;
  const city = cityData[mappedSlug as keyof typeof cityData];

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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About TotalSpark Solutions {city.name}</h2>
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