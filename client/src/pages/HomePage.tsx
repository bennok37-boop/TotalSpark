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
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Link } from 'wouter';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection 
          city="North East England"
          title="Professional Cleaning Services in Newcastle, Leeds, Durham, Sunderland, York & Middlesbrough"
          subtitle="End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds. Serving all surrounding areas including Gateshead, Bradford, Stockton-on-Tees, Hartlepool, Darlington, Harrogate & more."
        />
        <ProofStrip />
        <ServiceCards />
        
        {/* Locations We Cover Section */}
        <section className="py-16 bg-muted" data-testid="section-locations">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted Across the North East</h2>
              <p className="text-xl text-muted-foreground mb-8">Professional cleaning services covering major cities and surrounding areas</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Newcastle</h3>
                  <p className="text-muted-foreground text-sm mb-4">Jesmond, Heaton, Gosforth, Gateshead, Washington, Cramlington, Blyth, Tynemouth</p>
                  <Link href="/cleaning/newcastle">
                    <Button variant="outline" size="sm" data-testid="button-newcastle-location">Get Local Quote</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Leeds</h3>
                  <p className="text-muted-foreground text-sm mb-4">Headingley, Hyde Park, Burley, Bradford, Wakefield, Harrogate, Wetherby, Pudsey</p>
                  <Link href="/cleaning/leeds">
                    <Button variant="outline" size="sm" data-testid="button-leeds-location">Get Local Quote</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sunderland</h3>
                  <p className="text-muted-foreground text-sm mb-4">Ashbrooke, Washington, Seaham, Houghton-le-Spring, Durham, South Shields</p>
                  <Link href="/cleaning/sunderland">
                    <Button variant="outline" size="sm" data-testid="button-sunderland-location">Get Local Quote</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">York</h3>
                  <p className="text-muted-foreground text-sm mb-4">Heslington, Clifton, Selby, Tadcaster, Pocklington, Harrogate, Wetherby</p>
                  <Link href="/cleaning/york">
                    <Button variant="outline" size="sm" data-testid="button-york-location">Get Local Quote</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Durham</h3>
                  <p className="text-muted-foreground text-sm mb-4">Chester-le-Street, Bishop Auckland, Consett, Stanley, Spennymoor, Newton Aycliffe</p>
                  <Link href="/cleaning/durham">
                    <Button variant="outline" size="sm" data-testid="button-durham-location">Get Local Quote</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Middlesbrough</h3>
                  <p className="text-muted-foreground text-sm mb-4">Stockton-on-Tees, Redcar, Hartlepool, Darlington, Thornaby, Billingham</p>
                  <Link href="/cleaning/middlesbrough">
                    <Button variant="outline" size="sm" data-testid="button-middlesbrough-location">Get Local Quote</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <BeforeAfterGallery />
        <QuoteForm />
        <FAQSection />
      </main>
      <Footer />
      <StickyCallButton />
    </div>
  );
}