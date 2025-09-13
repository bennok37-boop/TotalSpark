import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About CleanPro - Professional Cleaning Services in North East UK"
        description="Learn about CleanPro's commitment to quality cleaning services across Newcastle, Leeds, York, and surrounding North East areas. DBS-checked staff, fully insured, and satisfaction guaranteed."
        ogTitle="About CleanPro - Professional Cleaning Services"
        ogDescription="Trusted cleaning services across the North East UK with DBS-checked staff and satisfaction guaranteed."
      />
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About CleanPro</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your trusted cleaning partner across the North East UK, delivering exceptional results 
                with professional, reliable, and affordable cleaning services since 2025.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    CleanPro was founded with a simple mission: to provide outstanding cleaning services 
                    that exceed expectations while building lasting relationships with our clients across 
                    the North East UK.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Starting in Newcastle and expanding across Tyne & Wear, County Durham, Northumberland, 
                    and Tees Valley, we've built our reputation on reliability, attention to detail, 
                    and exceptional customer service.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className="p-2">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      73+ Locations Covered
                    </Badge>
                    <Badge variant="outline" className="p-2">
                      <Shield className="w-4 h-4 mr-2" />
                      Fully Insured
                    </Badge>
                    <Badge variant="outline" className="p-2">
                      <Users className="w-4 h-4 mr-2" />
                      DBS Checked Staff
                    </Badge>
                  </div>
                </div>
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Why Choose CleanPro?</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>Professional, trained, and background-checked cleaning teams</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>Comprehensive insurance coverage for your peace of mind</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>Eco-friendly cleaning products and COSHH-compliant practices</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>Satisfaction guarantee - we'll make it right if you're not happy</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <span>Competitive pricing with transparent, no-hidden-fees quotes</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Serving the North East UK</h2>
              <p className="text-muted-foreground text-lg mb-12">
                We're proud to serve communities across four major regions in the North East, 
                providing consistent, high-quality cleaning services wherever you need them.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Tyne & Wear</h3>
                    <p className="text-sm text-muted-foreground">
                      Newcastle, Sunderland, Gateshead, and surrounding areas
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">County Durham</h3>
                    <p className="text-sm text-muted-foreground">
                      Durham, Darlington, Chester-le-Street, and more
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Northumberland</h3>
                    <p className="text-sm text-muted-foreground">
                      Hexham, Cramlington, Blyth, and northern communities
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Tees Valley</h3>
                    <p className="text-sm text-muted-foreground">
                      Middlesbrough, Stockton, Hartlepool, and beyond
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the CleanPro Difference?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get your instant quote today and discover why thousands of customers across 
                the North East trust CleanPro for their cleaning needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:01913497777" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
                  data-testid="button-call-about"
                >
                  Call Now: 0191 349 7777
                </a>
                <a 
                  href="#quote-form" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md font-medium transition-colors"
                  data-testid="button-quote-about"
                >
                  Get Instant Quote
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}