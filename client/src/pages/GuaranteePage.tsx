import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, CheckCircle, RefreshCw, Shield, Phone } from 'lucide-react';

export default function GuaranteePage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Our Guarantee | CleanPro - 100% Satisfaction & Deposit-Back Guarantee"
        description="CleanPro's comprehensive guarantee includes 100% satisfaction guarantee, deposit-back guarantee for end of tenancy cleans, and quality assurance across North East UK."
        ogTitle="Our Guarantee | CleanPro - 100% Satisfaction Guaranteed"
        ogDescription="100% satisfaction guarantee and deposit-back promise. Professional cleaning services you can trust across North East UK."
      />
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Guarantee</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We stand behind our work with comprehensive guarantees that protect your investment 
                and ensure complete satisfaction with every cleaning service.
              </p>
            </div>
          </div>
        </section>

        {/* Guarantee Types */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <Card className="border-primary/20">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <Award className="w-8 h-8 text-primary" />
                      <h2 className="text-2xl font-bold">100% Satisfaction Guarantee</h2>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      If you're not completely satisfied with our cleaning service, we'll return 
                      within 24 hours to re-clean any areas at no additional cost.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">24-hour response to any concerns</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Free re-cleaning if not satisfied</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">No questions asked policy</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-6">
                      <RefreshCw className="w-8 h-8 text-primary" />
                      <h2 className="text-2xl font-bold">Deposit-Back Guarantee</h2>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      For end of tenancy cleans, if your landlord withholds any deposit due to 
                      cleaning issues we missed, we'll refund your cleaning fee.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Full cleaning fee refund if deposit withheld</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Must be cleaning-related issues only</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">Valid for 30 days after service</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Quality Standards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Professional Standards</h3>
                    <p className="text-sm text-muted-foreground">
                      All work completed to professional cleaning industry standards with quality checks
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Quality Assurance</h3>
                    <p className="text-sm text-muted-foreground">
                      Supervisor inspections and quality control measures on every job
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <RefreshCw className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Continuous Improvement</h3>
                    <p className="text-sm text-muted-foreground">
                      Regular training updates and feedback incorporation for service excellence
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Guarantee Terms</h2>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Satisfaction Guarantee</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Must be reported within 24 hours of service completion</li>
                        <li>• Valid for the original cleaning areas only</li>
                        <li>• Does not cover damage due to normal wear or pre-existing conditions</li>
                        <li>• Re-clean must be scheduled within 7 days of initial service</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Deposit-Back Guarantee</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Valid for end of tenancy cleaning services only</li>
                        <li>• Must provide copy of checkout report/deposit deduction letter</li>
                        <li>• Only covers cleaning-related deposit deductions</li>
                        <li>• Claim must be made within 30 days of original service</li>
                        <li>• Maximum refund amount equals original cleaning service fee</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">General Terms</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Property must be in reasonable condition prior to cleaning</li>
                        <li>• Access must be provided as arranged for any re-clean</li>
                        <li>• Guarantees do not cover damage from building defects or deterioration</li>
                        <li>• All guarantee claims subject to verification and assessment</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Our Guarantee?</h2>
              <p className="text-lg mb-8 opacity-90">
                Book with confidence knowing your satisfaction is 100% guaranteed. 
                Get your instant quote and experience the CleanPro difference today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:01913497777" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-background text-foreground hover:bg-background/90 rounded-md font-medium transition-colors"
                  data-testid="button-call-guarantee"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: 0191 349 7777
                </a>
                <a 
                  href="/quote" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-background text-background hover:bg-background hover:text-foreground rounded-md font-medium transition-colors"
                  data-testid="button-quote-guarantee"
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