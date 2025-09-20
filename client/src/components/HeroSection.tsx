import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, MessageCircle, Star } from 'lucide-react';
import { useState } from 'react';
// import heroImage from '@assets/generated_images/Clean_modern_kitchen_hero_3f6d5639.png';
const heroImage = '/attached_assets/generated_images/Clean_modern_kitchen_hero_3f6d5639.png';
import { scrollToQuoteForm } from '@/utils/scroll';
import { useTrackingNumbers } from '@/hooks/useTrackingNumbers';

interface HeroSectionProps {
  city: string;
  title?: string;
  subtitle?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  onQuoteRequest?: (email: string) => void;
}

export default function HeroSection({ 
  city, 
  title, 
  subtitle, 
  phoneNumber,
  whatsappNumber,
  onQuoteRequest
}: HeroSectionProps) {
  const [email, setEmail] = useState('');
  
  // Get CallRail tracking numbers, with props as override if provided
  const trackingNumbers = useTrackingNumbers();
  const effectivePhoneNumber = phoneNumber || trackingNumbers.phone;
  const effectiveWhatsAppNumber = whatsappNumber || trackingNumbers.whatsapp;

  const defaultTitle = title || `Professional Cleaning Services in ${city}`;
  const defaultSubtitle = subtitle || `Trusted by over 1,000 customers across ${city}. DBS-checked, fully insured cleaners with our deposit-back guarantee.`;

  const handleQuoteRequest = () => {
    if (email.trim()) {
      onQuoteRequest?.(email);
      scrollToQuoteForm();
    } else {
      // If no email provided, just scroll to form
      scrollToQuoteForm();
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt={`Professional cleaning service in ${city}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          {/* Star Rating */}
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-white/90 font-medium">4.9/5 from 500+ reviews</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {defaultTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            {defaultSubtitle}
          </p>

          {/* Quick Quote Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white">Get Your Free Quote in 60 Seconds</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 flex-1"
                data-testid="input-email-hero"
              />
              <Button 
                onClick={handleQuoteRequest}
                className="bg-chart-2 hover:bg-chart-2/90 text-white font-semibold px-8"
                data-testid="button-quote-hero"
              >
                Get Free Quote
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-2">No obligation • Response within 1 hour</p>
          </div>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={`tel:${effectivePhoneNumber}`}
              className="flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-md transition-colors"
              data-testid="button-call-hero"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now: {effectivePhoneNumber}</span>
            </a>
            <a 
              href={`https://wa.me/${effectiveWhatsAppNumber}?text=Hi! I'd like a quote for cleaning services in ${city}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              data-testid="button-whatsapp-hero"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}