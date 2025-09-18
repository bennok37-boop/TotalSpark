import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { CookieSettingsLink } from '@/components/CookieSettingsLink';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Privacy Policy | TotalSpark Solutions - How We Protect Your Personal Information"
        description="TotalSpark Solutions' privacy policy explains how we collect, use, and protect your personal information when you use our cleaning services across North East UK."
        ogTitle="Privacy Policy | TotalSpark Solutions"
        ogDescription="Learn how TotalSpark Solutions protects your personal information and privacy when using our cleaning services."
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
                    <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking Technologies</h2>
                    <div className="space-y-6 text-muted-foreground">
                      <p className="text-sm">
                        We use cookies and similar tracking technologies to provide and improve our services. 
                        Below is detailed information about each type of cookie and how you can control them.
                      </p>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Cookie Categories</h3>
                        <div className="space-y-4">
                          <div className="pl-4 border-l-2 border-primary/20">
                            <h4 className="font-medium text-foreground mb-1">Essential Cookies (Always Active)</h4>
                            <p className="text-sm mb-2">
                              Required for basic website functionality and cannot be disabled. These cookies enable core features such as security, accessibility, and form submission.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              <li>Authentication and security tokens</li>
                              <li>Load balancing and server routing</li>
                              <li>Form submission and error handling</li>
                            </ul>
                          </div>
                          
                          <div className="pl-4 border-l-2 border-blue-200">
                            <h4 className="font-medium text-foreground mb-1">Functional Cookies</h4>
                            <p className="text-sm mb-2">
                              Remember your preferences and settings to provide enhanced functionality and personalized features.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              <li>Language and region preferences</li>
                              <li>Website theme and display settings</li>
                              <li>Previous form inputs and preferences</li>
                            </ul>
                          </div>
                          
                          <div className="pl-4 border-l-2 border-orange-200">
                            <h4 className="font-medium text-foreground mb-1">Phone Number Tracking</h4>
                            <p className="text-sm mb-2">
                              Display different tracking phone numbers to measure which marketing channels and campaigns are most effective.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              <li>CallRail phone number assignment</li>
                              <li>Campaign source identification</li>
                              <li>Marketing attribution tracking</li>
                            </ul>
                          </div>
                          
                          <div className="pl-4 border-l-2 border-green-200">
                            <h4 className="font-medium text-foreground mb-1">Analytics Cookies</h4>
                            <p className="text-sm mb-2">
                              Help us understand how visitors interact with our website by collecting anonymous information about usage patterns.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              <li>Page views and navigation patterns</li>
                              <li>Time spent on pages</li>
                              <li>Device and browser information</li>
                              <li>Referral source tracking</li>
                            </ul>
                          </div>
                          
                          <div className="pl-4 border-l-2 border-purple-200">
                            <h4 className="font-medium text-foreground mb-1">Marketing Cookies</h4>
                            <p className="text-sm mb-2">
                              Used to deliver relevant advertising and measure the effectiveness of marketing campaigns across different platforms.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-xs">
                              <li>Retargeting and remarketing pixels</li>
                              <li>Conversion tracking for ads</li>
                              <li>Social media integration</li>
                              <li>Email campaign effectiveness</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Managing Your Consent</h3>
                        <p className="text-sm mb-3">
                          You have full control over your cookie preferences. You can:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                          <li><strong>Update preferences anytime:</strong> Use the cookie settings banner that appears on first visit</li>
                          <li><strong>Granular control:</strong> Enable or disable specific categories based on your preferences</li>
                          <li><strong>Withdraw consent:</strong> Change your mind at any time - consent is not permanent</li>
                          <li><strong>Browser controls:</strong> Use your browser's cookie settings for additional control</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Third-Party Cookies</h3>
                        <p className="text-sm mb-3">
                          Some cookies are placed by third-party services that appear on our pages. We use:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                          <li><strong>Google Fonts:</strong> For website typography and font loading</li>
                          <li><strong>CallRail:</strong> For phone number tracking and call analytics</li>
                          <li><strong>Email Services:</strong> For contact form submissions and communications</li>
                        </ul>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h3 className="font-semibold text-foreground mb-2">Important: Consent Management</h3>
                        <p className="text-sm mb-4">
                          Your consent choices are stored locally in your browser for 30 days. After this period, 
                          you'll be asked to confirm your preferences again. We never share your consent preferences 
                          with third parties - they remain private to you and our website.
                        </p>
                        <div className="flex justify-center">
                          <CookieSettingsLink />
                        </div>
                      </div>
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
                        <p><strong>TotalSpark Solutions</strong></p>
                        <p>Email: hello@totalsparksolutions.co.uk</p>
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