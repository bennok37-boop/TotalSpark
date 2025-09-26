import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Phone, Menu, X, MapPin, ChevronDown, Mail, MessageCircle, Copy } from 'lucide-react';
import { REGIONS } from '@shared/locations';
import { useTrackingNumbers } from '@/hooks/useTrackingNumbers';
import { scrollToQuoteForm } from '@/utils/scroll';
// import logoImage from '@assets/4_1757953109291.png';
const logoImage = '/attached_assets/4_1757953109291.png';
import { trackCallClick, trackWhatsAppClick, trackChatOpen } from '@/lib/analytics';
import { getCallTracker } from '@/lib/callTracking';

export default function Header() {
  const [location, navigate] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Get CallRail tracking numbers based on current context
  const { phone: trackingPhoneNumber, whatsapp: whatsappNumber } = useTrackingNumbers();
  
  // Main company number for header display - always consistent across all pages
  const headerPhoneNumber = '03300432115';
  
  // Ensure header phone numbers are not overridden by CallRail
  useEffect(() => {
    const fixHeaderPhoneNumbers = () => {
      const headerPhoneElements = document.querySelectorAll('.header-phone-fixed');
      headerPhoneElements.forEach(element => {
        element.textContent = headerPhoneNumber;
      });
    };
    
    // Set initial values
    fixHeaderPhoneNumbers();
    
    // Re-apply after CallRail might have run (with delays)
    const timeouts = [100, 500, 1000, 2000];
    timeouts.forEach(delay => {
      setTimeout(fixHeaderPhoneNumbers, delay);
    });
    
    // Also re-apply on any DOM mutations
    const observer = new MutationObserver(fixHeaderPhoneNumbers);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [headerPhoneNumber]);

  // Business contact information
  const businessEmail = 'hello@totalsparksolutions.co.uk';

  // Helper function to copy text to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err);
    }
  };

  const services = ['End of Tenancy Cleaning', 'Deep Cleaning', 'Commercial Cleaning', 'Carpet & Upholstery Cleaning'];

  const isActive = (path: string) => location === path || location.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <img 
              src={logoImage} 
              alt="TotalSpark Solutions Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-xl text-foreground">TotalSpark Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
              data-testid="link-home-nav"
            >
              Home
            </Link>

            {/* Areas Mega Menu */}
            <div className="relative group">
              <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center">
                Areas <ChevronDown className="w-3 h-3 ml-1" />
              </span>
              <div className="absolute top-full left-0 mt-2 w-[800px] bg-popover border border-popover-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-6">
                  <div className="mb-4">
                    <Link 
                      href="/areas" 
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                      data-testid="link-areas-hub"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View All Areas We Cover
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    {Object.values(REGIONS).map((region) => (
                      <div key={region.slug} className="space-y-3">
                        <h3 className="font-semibold text-foreground text-sm border-b border-border pb-2">
                          {region.name}
                        </h3>
                        <div className="space-y-1">
                          {region.locations.slice(0, 8).map((location) => (
                            <Link
                              key={location.slug}
                              href={`/cleaning/${location.slug}`}
                              className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1"
                              data-testid={`link-location-${location.slug}`}
                            >
                              {location.name}
                            </Link>
                          ))}
                          {region.locations.length > 8 && (
                            <Link
                              href="/areas"
                              className="block text-xs text-primary hover:text-primary/80 py-1 font-medium"
                            >
                              +{region.locations.length - 8} more...
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                Services
              </span>
              <div className="absolute top-full left-0 mt-2 w-56 bg-popover border border-popover-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {services.map((service) => (
                    <Link
                      key={service}
                      href={`/${service.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="block px-3 py-2 text-sm text-popover-foreground hover:bg-accent rounded-sm"
                      data-testid={`link-service-${service.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              href="/about" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/about') ? 'text-primary' : 'text-muted-foreground'}`}
              data-testid="link-about"
            >
              About
            </Link>

            <Popover open={isContactOpen} onOpenChange={setIsContactOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost"
                  className={`text-sm font-medium hover:text-primary transition-colors p-0 h-auto ${isContactOpen ? 'text-primary' : 'text-muted-foreground'}`}
                  data-testid="button-contact"
                >
                  Contact
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">Contact TotalSpark Solutions</h3>
                    <p className="text-sm text-muted-foreground">Get in touch with our professional cleaning team</p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-sm text-muted-foreground">{headerPhoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(headerPhoneNumber)}
                        data-testid="button-copy-phone"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm"
                        asChild
                        data-testid="button-call-phone"
                      >
                        <a href={`tel:${headerPhoneNumber.replace(/\s/g, '')}`}>
                          <Phone className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Email Us</p>
                        <p className="text-sm text-muted-foreground">{businessEmail}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(businessEmail)}
                        data-testid="button-copy-email"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm"
                        asChild
                        data-testid="button-email"
                      >
                        <a href={`mailto:${businessEmail}`}>
                          <Mail className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-sm text-muted-foreground">+{whatsappNumber}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(`+${whatsappNumber}`)}
                        data-testid="button-copy-whatsapp"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm"
                        asChild
                        data-testid="button-whatsapp"
                      >
                        <a 
                          href={`https://wa.me/${whatsappNumber}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => {
                            trackWhatsAppClick({
                              click_source: 'header',
                              city: 'general',
                              service_type: 'general'
                            });
                            trackChatOpen({
                              chat_type: 'whatsapp',
                              trigger_source: 'header_whatsapp'
                            });
                          }}
                        >
                          <MessageCircle className="w-3 h-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Quick Quote Button */}
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      scrollToQuoteForm();
                      setIsContactOpen(false);
                    }}
                    data-testid="button-quick-quote"
                  >
                    Get Free Quote
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href={`tel:${headerPhoneNumber}`} 
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const callTracker = getCallTracker();
                if (callTracker) {
                  callTracker.handlePhoneClick('header');
                } else {
                  trackCallClick({
                    phone_number: trackingPhoneNumber,
                    call_source: 'header',
                    city: 'general',
                    service_type: 'general'
                  });
                  trackChatOpen({
                    chat_type: 'phone',
                    trigger_source: 'header_phone'
                  });
                  // Small delay for tracking before navigation
                  setTimeout(() => {
                    window.location.href = `tel:${headerPhoneNumber.replace(/\s/g, '')}`;
                  }, 100);
                }
              }}
              data-testid="link-phone"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold header-phone-fixed">{headerPhoneNumber}</span>
            </a>
            <Button 
              onClick={scrollToQuoteForm}
              data-testid="button-quote"
            >
              Get Free Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>

              {/* Areas Mobile Section */}
              <div className="space-y-2">
                <Link 
                  href="/areas" 
                  className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-areas-mobile"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Areas We Cover
                </Link>
                <div className="pl-6 space-y-2">
                  <div className="text-xs text-muted-foreground font-medium">Popular Areas:</div>
                  {Object.values(REGIONS).slice(0, 2).map((region) => (
                    <div key={region.slug} className="space-y-1">
                      {region.locations.slice(0, 3).map((location) => (
                        <Link
                          key={location.slug}
                          href={`/cleaning/${location.slug}`}
                          className="block text-xs text-muted-foreground hover:text-primary transition-colors pl-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {location.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link
                    href="/areas"
                    className="block text-xs text-primary hover:text-primary/80 pl-2 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View all 70+ areas →
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Services</span>
                <div className="pl-4 space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service}
                      href={`/${service.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="/about" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors p-0 h-auto w-auto justify-start"
                    data-testid="button-contact-mobile"
                  >
                    Contact
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 mx-4">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-2">Contact TotalSpark Solutions</h3>
                      <p className="text-sm text-muted-foreground">Get in touch with our professional cleaning team</p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Call Us</p>
                          <p className="text-sm text-muted-foreground">{headerPhoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(headerPhoneNumber)}
                          data-testid="button-copy-phone-mobile"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm"
                          asChild
                          data-testid="button-call-phone-mobile"
                        >
                          <a href={`tel:${headerPhoneNumber.replace(/\s/g, '')}`}>
                            <Phone className="w-3 h-3" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Email Us</p>
                          <p className="text-sm text-muted-foreground">{businessEmail}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(businessEmail)}
                          data-testid="button-copy-email-mobile"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm"
                          asChild
                          data-testid="button-email-mobile"
                        >
                          <a href={`mailto:${businessEmail}`}>
                            <Mail className="w-3 h-3" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">WhatsApp</p>
                          <p className="text-sm text-muted-foreground">+{whatsappNumber}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => copyToClipboard(`+${whatsappNumber}`)}
                          data-testid="button-copy-whatsapp-mobile"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm"
                          asChild
                          data-testid="button-whatsapp-mobile"
                        >
                          <a 
                            href={`https://wa.me/${whatsappNumber}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => {
                              trackWhatsAppClick({
                                click_source: 'mobile',
                                city: 'general',
                                service_type: 'general'
                              });
                              trackChatOpen({
                                chat_type: 'whatsapp',
                                trigger_source: 'mobile_whatsapp'
                              });
                            }}
                          >
                            <MessageCircle className="w-3 h-3" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Quick Quote Button */}
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        scrollToQuoteForm();
                        setIsMenuOpen(false);
                      }}
                      data-testid="button-quick-quote-mobile"
                    >
                      Get Free Quote
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <a 
                href={`tel:${headerPhoneNumber}`} 
                className="flex items-center space-x-2 text-primary"
                data-testid="link-phone-mobile"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold header-phone-fixed">{headerPhoneNumber}</span>
              </a>

              <Button 
                className="w-full" 
                onClick={() => {
                  scrollToQuoteForm();
                  setIsMenuOpen(false);
                }}
                data-testid="button-quote-mobile"
              >
                Get Free Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}