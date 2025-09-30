import { useState } from 'react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';
import { Link } from 'wouter';
import { REGIONS, searchLocations, type LocationData } from '@shared/locations';
import { 
  createOrganizationSchema, 
  createLocalBusinessSchema, 
  generateKeywords, 
  createCanonicalUrl 
} from '@/utils/seo';
import { useHashScroll } from '@/hooks/useHashScroll';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [heroEmail, setHeroEmail] = useState('');
  
  // Enable hash-based navigation to sections
  useHashScroll();
  
  const handleHeroQuoteRequest = (email: string) => {
    setHeroEmail(email);
  };

  // SEO configuration
  const pageTitle = "Professional Cleaning Services | North East UK | DBS Checked & Insured";
  const pageDescription = "Expert cleaning services across Newcastle, Leeds, York, Sunderland & Middlesbrough. End-of-tenancy, commercial & deep cleaning. DBS checked, fully insured with deposit-back guarantee.";
  const pageKeywords = generateKeywords([
    "cleaning services",
    "professional cleaners", 
    "end of tenancy cleaning",
    "commercial cleaning",
    "deep cleaning",
    "carpet cleaning",
    "North East England"
  ]);
  
  // Structured data for homepage
  const structuredData = [
    createOrganizationSchema(),
    createLocalBusinessSchema()
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const results = searchLocations(query).slice(0, 8); // Limit to 8 results
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Prominent cities for display
  const prominentCities = [
    { name: "Newcastle upon Tyne", slug: "newcastle-upon-tyne", areas: "Jesmond, Heaton, Gosforth, Gateshead" },
    { name: "Sunderland", slug: "sunderland", areas: "Washington, Seaham, Houghton-le-Spring" },
    { name: "Durham", slug: "durham", areas: "Chester-le-Street, Bishop Auckland, Consett" },
    { name: "Middlesbrough", slug: "middlesbrough", areas: "Stockton-on-Tees, Redcar, Thornaby" },
    { name: "Gateshead", slug: "gateshead", areas: "Blaydon-on-Tyne, Felling, Birtley" },
    { name: "Hartlepool", slug: "hartlepool", areas: "Peterlee, Billingham, Seaton Carew" },
    { name: "Stockton-on-Tees", slug: "stockton-on-tees", areas: "Thornaby, Billingham, Yarm" },
    { name: "South Shields", slug: "south-shields", areas: "North Shields, Jarrow, Hebburn" }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        canonicalUrl={createCanonicalUrl('/')}
        ogType="website"
        structuredData={structuredData}
      />
      <Header />
      <main>
        <HeroSection 
          city="North East England"
          title="Professional Cleaning Services Across the North East"
          subtitle="End of Tenancy, Office & Deep Cleans — Instant Quotes in 60 Seconds. Serving Newcastle, Sunderland, Durham, Middlesbrough & all surrounding areas."
          onQuoteRequest={handleHeroQuoteRequest}
        />
        <ProofStrip />
        <ServiceCards />
        
        {/* North East Locations Section */}
        <section id="areas" className="py-16 bg-muted scroll-mt-20" data-testid="section-locations">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">We Cover the North East</h2>
              <p className="text-xl text-muted-foreground mb-6">From Northumberland to Tees Valley — instant quotes, fast scheduling, DBS-checked teams.</p>
              
              {/* Region Chips */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {Object.values(REGIONS).map((region) => (
                  <Badge key={region.slug} variant="secondary" className="text-sm px-3 py-1">
                    {region.name}
                  </Badge>
                ))}
              </div>

              {/* Search Box */}
              <div className="max-w-md mx-auto mb-8 relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Find your town..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                    data-testid="input-location-search"
                  />
                </div>
                
                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {searchResults.map((location) => (
                      <Link key={location.slug} href={`/cleaning/${location.slug}`}>
                        <div className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0" data-testid={`search-result-${location.slug}`}>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-muted-foreground">{location.region}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Prominent City Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
              {prominentCities.map((city) => (
                <Card key={city.slug} className="hover-elevate">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{city.name.replace(' upon Tyne', '').replace('-on-Tees', '')}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{city.areas}</p>
                    <Link href={`/cleaning/${city.slug}`}>
                      <Button variant="outline" size="sm" data-testid={`button-${city.slug}-location`}>Get Local Quote</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Areas Link */}
            <div className="text-center">
              <Link href="/areas">
                <Button variant="ghost" className="text-primary hover:text-primary/80" data-testid="link-view-all-areas">
                  View all areas we cover →
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <BeforeAfterGallery />
        <QuoteForm initialData={heroEmail ? { email: heroEmail } : undefined} />
        <FAQSection />
      </main>
      <Footer />
      <StickyCallButton />
    </div>
  );
}