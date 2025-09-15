import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, FileText, Users } from 'lucide-react';

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Insurance & DBS Checks | TotalSpark Solutions - Fully Insured & Background Checked"
        description="All TotalSpark Solutions staff are DBS-checked and we carry comprehensive public liability insurance. Professional cleaning services you can trust across North East UK."
        ogTitle="Insurance & DBS Checks | TotalSpark Solutions"
        ogDescription="DBS-checked staff and fully insured cleaning services across North East UK. Your peace of mind is our priority."
      />
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Insurance & DBS Checks</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your safety and peace of mind are our top priorities. All our staff are thoroughly 
                background checked and we maintain comprehensive insurance coverage.
              </p>
            </div>
          </div>
        </section>

        {/* Insurance Details */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Shield className="w-8 h-8 text-primary" />
                      <h2 className="text-2xl font-bold">Public Liability Insurance</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">£2 Million Coverage</div>
                          <p className="text-muted-foreground text-sm">
                            Comprehensive public liability insurance covering all our cleaning operations
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Property Protection</div>
                          <p className="text-muted-foreground text-sm">
                            Full protection for your property and belongings during cleaning
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Accidental Damage Cover</div>
                          <p className="text-muted-foreground text-sm">
                            Coverage for any accidental damage that may occur during service
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Users className="w-8 h-8 text-primary" />
                      <h2 className="text-2xl font-bold">DBS Background Checks</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Enhanced DBS Checks</div>
                          <p className="text-muted-foreground text-sm">
                            All cleaning staff undergo thorough Enhanced DBS background checks
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Regular Updates</div>
                          <p className="text-muted-foreground text-sm">
                            DBS checks are renewed regularly to ensure ongoing compliance
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Identity Verification</div>
                          <p className="text-muted-foreground text-sm">
                            Complete identity verification and reference checks for all staff
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Credentials */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Additional Credentials & Training
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <FileText className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">COSHH Compliance</h3>
                    <p className="text-sm text-muted-foreground">
                      All staff trained in Control of Substances Hazardous to Health regulations
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Health & Safety</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive health and safety training for all cleaning operations
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Professional Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Ongoing professional development and cleaning technique training
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose CleanPro?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="p-3">
                    <Shield className="w-5 h-5 mr-2" />
                    £2M Insurance
                  </Badge>
                  <span className="text-muted-foreground">Full liability coverage</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="p-3">
                    <Users className="w-5 h-5 mr-2" />
                    DBS Checked
                  </Badge>
                  <span className="text-muted-foreground">Background verified staff</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="p-3">
                    <FileText className="w-5 h-5 mr-2" />
                    COSHH Trained
                  </Badge>
                  <span className="text-muted-foreground">Safety compliant</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="p-3">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Bonded & Trusted
                  </Badge>
                  <span className="text-muted-foreground">Professional service</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:01913497777" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
                  data-testid="button-call-insurance"
                >
                  Call Now: 0191 349 7777
                </a>
                <a 
                  href="/quote" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md font-medium transition-colors"
                  data-testid="button-quote-insurance"
                >
                  Get Free Quote
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