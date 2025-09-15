import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react';

export default function ComplaintsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Complaints Procedure | TotalSpark Solutions - How to Raise Service Concerns"
        description="TotalSpark Solutions' complaints procedure ensures fair resolution of any service concerns. Learn how to contact us and our commitment to customer satisfaction."
        ogTitle="Complaints Procedure | TotalSpark Solutions"
        ogDescription="Fair and prompt resolution of service concerns. Learn about TotalSpark Solutions' complaints process and customer commitment."
      />
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Complaints Procedure</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're committed to providing excellent service, but if something doesn't meet your expectations, 
                we want to make it right. Here's how we handle complaints fairly and promptly.
              </p>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to You</h2>
                <p className="text-muted-foreground text-lg">
                  We take all complaints seriously and are committed to resolving them quickly and fairly.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">48-Hour Response</h3>
                    <p className="text-sm text-muted-foreground">
                      We acknowledge all complaints within 48 hours of receipt
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Fair Investigation</h3>
                    <p className="text-sm text-muted-foreground">
                      Every complaint is investigated thoroughly and impartially
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Swift Resolution</h3>
                    <p className="text-sm text-muted-foreground">
                      We aim to resolve most complaints within 7 working days
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How to Complain */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How to Make a Complaint</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4">Contact Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">Phone (Immediate Response)</div>
                          <p className="text-sm text-muted-foreground">0191 349 7777</p>
                          <p className="text-xs text-muted-foreground">Mon-Sun: 7am-9pm</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">Email (For Detailed Complaints)</div>
                          <p className="text-sm text-muted-foreground">hello@totalsparksolutions.co.uk</p>
                          <p className="text-xs text-muted-foreground">Response within 48 hours</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4">What to Include</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Your contact details and booking reference</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Date and time of service</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Clear description of the issue</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Photos if applicable</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">What outcome you're seeking</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Complaints Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Complaints Process</h2>
              
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Initial Contact & Acknowledgment</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          When you contact us with a complaint, we will:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Acknowledge receipt within 48 hours</li>
                          <li>• Assign a complaint reference number</li>
                          <li>• Confirm our understanding of the issue</li>
                          <li>• Explain the next steps</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Investigation</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          We will thoroughly investigate your complaint by:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Speaking with the cleaning team involved</li>
                          <li>• Reviewing service records and procedures</li>
                          <li>• Examining any photographic evidence</li>
                          <li>• Conducting site visits if necessary</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Resolution & Response</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          We will provide a full written response including:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Investigation findings</li>
                          <li>• Explanation of any service failures</li>
                          <li>• Remedial actions taken or proposed</li>
                          <li>• Compensation or refunds where appropriate</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Follow-up & Learning</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          After resolution, we will:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Follow up to ensure you're satisfied with the outcome</li>
                          <li>• Implement process improvements where needed</li>
                          <li>• Provide additional staff training if required</li>
                          <li>• Record lessons learned to prevent recurrence</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Escalation */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">If You're Still Not Satisfied</h2>
              <Card>
                <CardContent className="p-8">
                  <p className="text-muted-foreground mb-6">
                    If you remain unsatisfied with our response or resolution, you have the following options:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Internal Escalation</h3>
                      <p className="text-sm text-muted-foreground">
                        Request escalation to our senior management team by emailing 
                        manager@cleanpro.co.uk or calling 0191 349 7777 and asking to speak with a manager.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Independent Mediation</h3>
                      <p className="text-sm text-muted-foreground">
                        We support independent mediation through recognized consumer dispute resolution services 
                        for unresolved complaints.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Consumer Rights</h3>
                      <p className="text-sm text-muted-foreground">
                        You may also contact Citizens Advice or Trading Standards for guidance on your consumer rights.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Raise a Complaint?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                We're here to listen and resolve any issues promptly and fairly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" data-testid="button-call-complaints">
                  <a href="tel:01913497777">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: 0191 349 7777
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" data-testid="button-email-complaints">
                  <a href="mailto:complaints@cleanpro.co.uk">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Complaints
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}