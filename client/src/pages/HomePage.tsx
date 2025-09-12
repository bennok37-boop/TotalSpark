import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProofStrip from '@/components/ProofStrip';
import ServiceCards from '@/components/ServiceCards';
import QuoteForm from '@/components/QuoteForm';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import StickyCallButton from '@/components/StickyCallButton';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection 
          city="North East England"
          title="Professional Cleaning Services Across North East England"
          subtitle="Trusted by over 1,000 customers across Newcastle, Leeds, York, Sunderland & Middlesbrough. DBS-checked, fully insured cleaners with our deposit-back guarantee."
        />
        <ProofStrip />
        <ServiceCards />
        <BeforeAfterGallery />
        <QuoteForm />
        <FAQSection />
      </main>
      <Footer />
      <StickyCallButton />
    </div>
  );
}