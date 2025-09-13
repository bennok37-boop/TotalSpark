import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Privacy Policy | CleanPro - How We Protect Your Personal Information"
        description="CleanPro's privacy policy explains how we collect, use, and protect your personal information when you use our cleaning services across North East UK."
        ogTitle="Privacy Policy | CleanPro"
        ogDescription="Learn how CleanPro protects your personal information and privacy when using our cleaning services."
      />
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your privacy matters to us. This policy explains how we collect, use, 
                and protect your personal information.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: January 2025
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Name and contact details (phone, email, address)</li>
                          <li>Property details for cleaning services</li>
                          <li>Payment information (processed securely by third-party providers)</li>
                          <li>Service preferences and special requirements</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Website usage data and analytics</li>
                          <li>IP address and browser information</li>
                          <li>Cookies and similar tracking technologies</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>To provide and deliver our cleaning services</li>
                        <li>To communicate with you about bookings, schedules, and service updates</li>
                        <li>To process payments and manage your account</li>
                        <li>To improve our services and customer experience</li>
                        <li>To send promotional materials (only with your consent)</li>
                        <li>To comply with legal obligations and protect our business interests</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">3. Information Sharing and Disclosure</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>With our cleaning staff solely for service delivery purposes</li>
                        <li>With payment processors for transaction processing</li>
                        <li>With service providers who assist in our business operations (under strict confidentiality agreements)</li>
                        <li>When required by law or to protect our legal rights</li>
                        <li>In connection with a business sale or merger (with notification to affected customers)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm">We implement appropriate technical and organizational measures to protect your personal information:</p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Secure encryption for data transmission and storage</li>
                        <li>Regular security assessments and updates</li>
                        <li>Limited access to personal information on a need-to-know basis</li>
                        <li>Staff training on data protection and privacy</li>
                        <li>Secure disposal of information when no longer needed</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm">Under UK data protection law, you have the right to:</p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Access your personal information and receive a copy</li>
                        <li>Correct inaccurate or incomplete information</li>
                        <li>Request deletion of your personal information (where legally permissible)</li>
                        <li>Object to processing of your personal information</li>
                        <li>Request transfer of your information to another service provider</li>
                        <li>Withdraw consent for marketing communications at any time</li>
                      </ul>
                      <p className="text-sm mt-4">
                        To exercise these rights, please contact us at info@cleanpro.co.uk or call 0191 349 7777.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm">Our website uses cookies to improve your browsing experience:</p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Essential cookies for website functionality</li>
                        <li>Analytics cookies to understand website usage</li>
                        <li>Marketing cookies for targeted advertising (with consent)</li>
                      </ul>
                      <p className="text-sm mt-4">
                        You can control cookie preferences through your browser settings.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm">We retain your personal information only as long as necessary:</p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Customer records: 7 years for accounting and legal purposes</li>
                        <li>Marketing consent: Until withdrawn or expired</li>
                        <li>Website analytics: 26 months maximum</li>
                        <li>Job-related information: 6 years after service completion</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm">
                        We may update this privacy policy from time to time. We will notify you of any 
                        significant changes by email or through our website. Your continued use of our 
                        services after changes are posted constitutes acceptance of the updated policy.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-sm">
                        If you have questions about this privacy policy or our data practices, please contact us:
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>CleanPro (TotalSpark Solutions)</strong></p>
                        <p>Email: info@cleanpro.co.uk</p>
                        <p>Phone: 0191 349 7777</p>
                        <p>Address: North East England, UK</p>
                      </div>
                      <p className="text-sm mt-4">
                        You also have the right to lodge a complaint with the Information Commissioner's 
                        Office (ICO) if you believe your data protection rights have been breached.
                      </p>
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