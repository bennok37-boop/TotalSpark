import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Search, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { REGIONS, getAllLocations, searchLocations, type LocationData } from '@shared/locations';

export default function AreasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const allLocations = getAllLocations();
  
  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (searchQuery.length > 1) {
      return searchLocations(searchQuery);
    }
    if (selectedRegion) {
      const region = REGIONS[selectedRegion];
      return region ? region.locations : [];
    }
    return allLocations;
  }, [searchQuery, selectedRegion, allLocations]);

  // Group locations alphabetically
  const locationsByLetter = useMemo(() => {
    const grouped: Record<string, LocationData[]> = {};
    filteredLocations.forEach(location => {
      const firstLetter = location.name[0].toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(location);
    });
    
    // Sort locations within each letter group
    Object.keys(grouped).forEach(letter => {
      grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
    });
    
    return grouped;
  }, [filteredLocations]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-main">
              Cleaning Across the North East
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Professional cleaning services covering 70+ towns and cities across Tyne & Wear, County Durham, 
              Northumberland, and Tees Valley. From end-of-tenancy cleans to commercial services — 
              we're your trusted local cleaning partner.
            </p>
            
            {/* Quick Region Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {Object.values(REGIONS).map((region) => (
                <Button
                  key={region.slug}
                  variant={selectedRegion === region.slug ? "default" : "outline"}
                  onClick={() => setSelectedRegion(selectedRegion === region.slug ? null : region.slug)}
                  data-testid={`button-region-${region.slug}`}
                >
                  {region.name}
                </Button>
              ))}
            </div>
            
            {/* Search Box */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for your town or city..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedRegion(null); // Clear region filter when searching
                  }}
                  className="pl-10"
                  data-testid="input-area-search"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Regional Overview */}
        {!searchQuery && !selectedRegion && (
          <section className="py-16" data-testid="section-regions">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Our Coverage Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.values(REGIONS).map((region) => (
                  <Card key={region.slug} className="hover-elevate">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {region.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{region.description}</p>
                      <p className="text-sm font-medium mb-3">{region.locations.length} locations covered</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedRegion(region.slug)}
                        data-testid={`button-view-${region.slug}`}
                      >
                        View All Areas
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Locations Directory */}
        <section className="py-16 bg-muted" data-testid="section-directory">
          <div className="container mx-auto px-4">
            {selectedRegion && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  {REGIONS[selectedRegion]?.name} Locations
                </h2>
                <p className="text-muted-foreground mb-6">
                  {REGIONS[selectedRegion]?.description}
                </p>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedRegion(null)}
                  data-testid="button-view-all-regions"
                >
                  ← View All Regions
                </Button>
              </div>
            )}

            {searchQuery && (
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-muted-foreground">
                  {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found
                </p>
              </div>
            )}

            {!searchQuery && !selectedRegion && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">All Coverage Areas A-Z</h2>
                <p className="text-muted-foreground">
                  Browse all {allLocations.length} towns and cities we serve across the North East
                </p>
              </div>
            )}

            {/* Alphabet Navigation */}
            {!searchQuery && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {alphabet.map(letter => {
                  const hasLocations = locationsByLetter[letter]?.length > 0;
                  return (
                    <Button
                      key={letter}
                      variant={hasLocations ? "outline" : "ghost"}
                      size="sm"
                      disabled={!hasLocations}
                      onClick={() => {
                        const element = document.getElementById(`letter-${letter}`);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={hasLocations ? "hover-elevate" : "opacity-50"}
                      data-testid={`button-letter-${letter}`}
                    >
                      {letter}
                    </Button>
                  );
                })}
              </div>
            )}

            {/* Locations Grid */}
            {searchQuery ? (
              // Search Results View
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLocations.map((location) => (
                  <Card key={location.slug} className="hover-elevate">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{location.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {location.region}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Near: {location.nearby.slice(0, 3).join(', ')}
                      </p>
                      <Link href={`/cleaning/${location.slug}`}>
                        <Button variant="outline" size="sm" data-testid={`button-location-${location.slug}`}>
                          Get Quote
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Alphabetical Directory View
              <div className="space-y-8">
                {alphabet.map(letter => {
                  const locations = locationsByLetter[letter];
                  if (!locations || locations.length === 0) return null;
                  
                  return (
                    <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                      <h3 className="text-2xl font-bold mb-4 flex items-center">
                        <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                          {letter}
                        </span>
                        {letter}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {locations.map((location) => (
                          <Card key={location.slug} className="hover-elevate">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-sm">{location.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {location.region}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3">
                                {location.nearby.slice(0, 2).join(', ')}
                              </p>
                              <Link href={`/cleaning/${location.slug}`}>
                                <Button variant="outline" size="sm" data-testid={`button-location-${location.slug}`}>
                                  Get Quote
                                </Button>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {filteredLocations.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No locations found matching "{searchQuery}"
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Not Listed Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Don't See Your Area?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                If your area isn't listed, we likely still cover it. Our cleaning teams serve the wider North East region 
                and surrounding areas. Get in touch for a personalized quote.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/">
                  <Button size="lg" data-testid="button-instant-quote">
                    Get Instant Quote
                  </Button>
                </Link>
                <Button variant="outline" size="lg" data-testid="button-whatsapp">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </Button>
                <Button variant="ghost" size="lg" data-testid="button-call-us">
                  <Phone className="w-4 h-4 mr-2" />
                  03300432115
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCallButton />
    </div>
  );
}