import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import SEOHead from '@/components/SEOHead';

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Get Your Free Cleaning Quote | CleanPro - North East UK"
        description="Get an instant cleaning quote in 60 seconds. Professional end of tenancy, deep cleaning, and commercial cleaning services across Newcastle, Leeds, York, and North East UK."
        ogTitle="Get Your Free Cleaning Quote | CleanPro"
        ogDescription="Professional cleaning services with instant quotes. End of tenancy, deep cleaning, commercial cleaning across North East UK."
      />
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Your Free Quote</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Professional cleaning services with instant quotes in 60 seconds. 
                No obligations, transparent pricing, satisfaction guaranteed.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <QuoteForm />
      </main>
      
      <Footer />
    </div>
  );
}