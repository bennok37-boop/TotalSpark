import { Link } from "wouter";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { getRegionPhoneNumber, getRegionWhatsAppNumber } from "@shared/location-utils";

interface LandingLayoutProps {
  children: React.ReactNode;
  showStickyCTA?: boolean;
  region?: string; // Region slug for dynamic phone numbers
}

export function LandingLayout({ children, showStickyCTA = true, region = 'tyne-and-wear' }: LandingLayoutProps) {
  const phoneNumber = getRegionPhoneNumber(region);
  const whatsappNumber = getRegionWhatsAppNumber(region);
  
  const scrollToQuoteForm = () => {
    const element = document.getElementById('quote-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header - Landing Page Optimized */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CP</span>
              </div>
              <span className="font-bold text-xl text-foreground">CleanPro</span>
            </div>
          </Link>

          {/* Primary CTAs */}
          <div className="flex items-center space-x-2">
            <Button 
              onClick={scrollToQuoteForm}
              className="hidden sm:inline-flex"
              data-testid="button-get-quote-header"
            >
              Get Instant Quote
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              asChild
              data-testid="button-call-header"
            >
              <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call Now</span>
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              asChild
              data-testid="button-whatsapp-header"
            >
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hi, I'd like a quote for cleaning services`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 ${showStickyCTA ? 'pb-20 sm:pb-0' : ''}`}>
        {children}
      </main>

      {/* Sticky CTA Bar - Mobile Optimized */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur border-t border-border p-3 sm:hidden">
          <div className="flex items-center justify-center space-x-2">
            <Button 
              onClick={scrollToQuoteForm}
              className="flex-1 max-w-[140px]"
              size="sm"
              data-testid="button-get-quote-sticky"
            >
              Get Quote
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              asChild
              data-testid="button-call-sticky"
            >
              <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              asChild
              data-testid="button-whatsapp-sticky"
            >
              <a 
                href={`https://wa.me/${whatsappNumber}?text=Hi, I'd like a quote for cleaning services`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* Footer with Internal Links for SEO */}
      <Footer />
    </div>
  );
}