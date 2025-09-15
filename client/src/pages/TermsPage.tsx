import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Terms of Service | TotalSpark Solutions - Service Terms and Conditions"
        description="TotalSpark Solutions' terms of service outline the conditions for using our professional cleaning services across North East UK. Read our service terms and conditions."
        ogTitle="Terms of Service | TotalSpark Solutions"
        ogDescription="Terms and conditions for TotalSpark Solutions' professional cleaning services across North East UK."
      />
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                These terms govern your use of TotalSpark Solutions' cleaning services. 
                Please read them carefully before booking our services.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">1. Service Agreement</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <p>
                        By booking our cleaning services, you agree to be bound by these terms and conditions. 
                        CleanPro (trading name of TotalSpark Solutions) provides professional cleaning services 
                        across North East England.
                      </p>
                      <p>
                        Our services include but are not limited to: end of tenancy cleaning, deep cleaning, 
                        commercial cleaning, carpet and upholstery cleaning, and regular domestic cleaning.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">2. Booking and Confirmation</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <ul className="list-disc list-inside space-y-2">
                        <li>All bookings must be confirmed in writing (email) or over the phone</li>
                        <li>A deposit may be required for certain services, particularly end of tenancy cleans</li>
                        <li>Service dates and times are confirmed upon booking and deposit payment (if applicable)</li>
                        <li>We reserve the right to refuse service at our discretion</li>
                        <li>Quotes are valid for 30 days from issue date</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">3. Pricing and Payment</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <ul className="list-disc list-inside space-y-2">
                        <li>All prices include VAT where applicable</li>
                        <li>Payment is due on completion of service unless prior arrangements have been made</li>
                        <li>We accept cash, bank transfer, and card payments</li>
                        <li>Additional charges may apply for extra services requested on the day</li>
                        <li>Price adjustments may occur if the property condition differs significantly from initial assessment</li>
                        <li>Late payment fees may apply for commercial accounts (net 30 days)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">4. Cancellation and Rescheduling</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Customer Cancellations</h3>
                        <ul className="list-disc list-inside space-y-1">
                          <li>24+ hours notice: Full refund of any deposit paid</li>
                          <li>12-24 hours notice: 50% of deposit retained as cancellation fee</li>
                          <li>Less than 12 hours notice: Full deposit retained</li>
                          <li>Same day cancellation: Full service charge may apply</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">CleanPro Cancellations</h3>
                        <ul className="list-disc list-inside space-y-1">
                          <li>We will provide at least 12 hours notice where possible</li>
                          <li>Full refund will be provided for any payments made</li>
                          <li>Alternative dates will be offered where available</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">5. Customer Responsibilities</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <ul className="list-disc list-inside space-y-2">
                        <li>Ensure safe access to the property at the agreed time</li>
                        <li>Remove or secure valuable and fragile items before cleaning</li>
                        <li>Provide accurate information about property size and condition</li>
                        <li>Ensure utilities (water, electricity) are available and working</li>
                        <li>Inform us of any hazardous materials or special considerations</li>
                        <li>Provide reasonable notice of any access restrictions or building requirements</li>
                        <li>Treat our staff with respect and courtesy</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">6. Insurance and Liability</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <ul className="list-disc list-inside space-y-2">
                        <li>We carry £2 million public liability insurance</li>
                        <li>All staff are DBS checked and appropriately trained</li>
                        <li>We are liable for damage directly caused by our negligence</li>
                        <li>We are not liable for damage to items not disclosed prior to service</li>
                        <li>Pre-existing damage or wear and tear is not covered</li>
                        <li>Any damage claims must be reported within 24 hours of service completion</li>
                        <li>Maximum liability per incident is limited to the value of the service provided</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">7. Service Standards and Guarantees</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <ul className="list-disc list-inside space-y-2">
                        <li>We provide a 100% satisfaction guarantee on all services</li>
                        <li>Any issues must be reported within 24 hours of service completion</li>
                        <li>We will return to remedy any legitimate concerns at no additional cost</li>
                        <li>End of tenancy cleans include our deposit-back guarantee (subject to terms)</li>
                        <li>Service standards are based on reasonable expectations for the service type</li>
                        <li>We reserve the right to assess and determine appropriate remedial action</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">8. Health and Safety</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <ul className="list-disc list-inside space-y-2">
                        <li>All staff are trained in COSHH regulations and safe cleaning practices</li>
                        <li>We use professional-grade, eco-friendly cleaning products where possible</li>
                        <li>Any health conditions or allergies must be disclosed at booking</li>
                        <li>We reserve the right to suspend work if unsafe conditions are encountered</li>
                        <li>Customers must ensure pets are secured during cleaning</li>
                        <li>We are not responsible for triggering existing alarm systems</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">9. Data Protection and Privacy</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <p>
                        We are committed to protecting your personal information in accordance with UK data protection law. 
                        Please refer to our Privacy Policy for detailed information about how we collect, use, and protect your data.
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Customer information is kept confidential and secure</li>
                        <li>Data is only used for service provision and legitimate business purposes</li>
                        <li>Third-party access is limited and subject to confidentiality agreements</li>
                        <li>You have rights regarding your personal data under UK GDPR</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">10. Dispute Resolution</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <ul className="list-disc list-inside space-y-2">
                        <li>We aim to resolve all complaints promptly and fairly</li>
                        <li>Initial complaints should be directed to our customer service team</li>
                        <li>Formal complaints will be acknowledged within 48 hours</li>
                        <li>If resolution cannot be reached, mediation may be pursued</li>
                        <li>These terms are governed by English law</li>
                        <li>Disputes will be subject to the jurisdiction of English courts</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <p>
                        We reserve the right to modify these terms at any time. Changes will be posted on our 
                        website and, where appropriate, communicated directly to customers. Continued use of 
                        our services constitutes acceptance of any changes.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
                    <div className="space-y-4 text-muted-foreground text-sm">
                      <p>For questions about these terms or to discuss any service-related matters:</p>
                      <div className="space-y-2">
                        <p><strong>TotalSpark Solutions</strong></p>
                        <p>Email: hello@totalsparksolutions.co.uk</p>
                        <p>Phone: 0191 349 7777</p>
                        <p>Service Areas: North East England (Newcastle, Leeds, York, Durham, Sunderland, Middlesbrough and surrounding areas)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}