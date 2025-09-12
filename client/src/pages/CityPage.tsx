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
import { MapPin, Clock, Users } from 'lucide-react';

// Todo: remove mock functionality
const cityData = {
  newcastle: {
    name: 'Newcastle',
    phone: '0191 123 4567',
    whatsapp: '447123456789',
    areas: ['Jesmond', 'Gosforth', 'Heaton', 'Walker', 'Byker', 'Fenham'],
    caseStudies: [
      'Helped 50 families get full deposits back from end-of-tenancy cleans this month',
      'Cleaned 200+ offices across Newcastle city center',
      'Maintained spotless Airbnb properties in Jesmond for 3+ years'
    ]
  },
  sunderland: {
    name: 'Sunderland',
    phone: '0191 456 7890',
    whatsapp: '447456789012',
    areas: ['City Centre', 'Roker', 'Southwick', 'Hendon', 'Millfield', 'Barnes'],
    caseStudies: [
      'Successfully cleaned 100+ student properties near University of Sunderland',
      'Maintained shopping centers and retail spaces for 5+ years',
      'Helped families prepare homes for sale with deep cleaning services'
    ]
  },
  york: {
    name: 'York',
    phone: '01904 123 456',
    whatsapp: '447904123456',
    areas: ['City Centre', 'Clifton', 'Acomb', 'Bishopthorpe', 'Fulford', 'Heslington'],
    caseStudies: [
      'Specialized cleaning for historic properties and period homes',
      'Maintained luxury serviced apartments in York city center',
      'Deep cleaned 300+ rental properties for landlords and letting agents'
    ]
  },
  middlesbrough: {
    name: 'Middlesbrough',
    phone: '01642 123 456',
    whatsapp: '447642123456',
    areas: ['Town Centre', 'Linthorpe', 'Acklam', 'Marton', 'Nunthorpe', 'Ormesby'],
    caseStudies: [
      'Cleaned industrial offices and commercial spaces across Teesside',
      'Maintained residential properties for major letting agencies',
      'Provided emergency cleaning services for insurance claims'
    ]
  },
  leeds: {
    name: 'Leeds',
    phone: '0113 123 4567',
    whatsapp: '447113123456',
    areas: ['City Centre', 'Headingley', 'Hyde Park', 'Kirkstall', 'Roundhay', 'Chapel Allerton'],
    caseStudies: [
      'Cleaned 500+ student properties across Leeds University area',
      'Maintained corporate offices in Leeds financial district',
      'Specialized end-of-tenancy cleans for young professionals'
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
        <HeroSection 
          city={city.name}
          phoneNumber={city.phone}
          whatsappNumber={city.whatsapp}
        />
        <ProofStrip />
        
        {/* Local Areas Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Areas We Serve in {city.name}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Professional cleaning services available throughout {city.name} and surrounding areas.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {city.areas.map((area) => (
                <Badge key={area} variant="outline" className="p-3 text-center justify-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {area}
                </Badge>
              ))}
            </div>

            {/* Local Case Studies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {city.caseStudies.map((caseStudy, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {index === 0 && <Users className="w-6 h-6 text-primary" />}
                      {index === 1 && <Clock className="w-6 h-6 text-primary" />}
                      {index === 2 && <MapPin className="w-6 h-6 text-primary" />}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {caseStudy}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ServiceCards />
        <BeforeAfterGallery />
        <QuoteForm />
        <FAQSection city={city.name} />
      </main>
      <Footer />
      <StickyCallButton 
        phoneNumber={city.phone}
        whatsappNumber={city.whatsapp}
      />
    </div>
  );
}