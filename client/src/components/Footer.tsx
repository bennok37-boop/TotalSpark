import { Link } from 'wouter';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SiLinkedin, SiInstagram, SiFacebook } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { scrollToQuoteForm } from '@/utils/scroll';
import { CITIES } from '@shared/schema';
import { useTrackingNumbers } from '@/hooks/useTrackingNumbers';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const services = ['End of Tenancy Cleaning', 'Deep Cleaning', 'Commercial Cleaning', 'Carpet & Upholstery Cleaning'];
  
  // Get CallRail tracking numbers
  const { phone: phoneNumber } = useTrackingNumbers();

  return (
    <footer className="bg-foreground text-background" data-testid="footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="@assets/4_1757953109291.png" 
                alt="TotalSpark Solutions Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-bold text-xl">TotalSpark Solutions</span>
            </div>
            <p className="text-background/80 mb-4 text-sm leading-relaxed">
              Professional cleaning services across North East England. DBS-checked, fully insured, with our deposit-back guarantee.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@totalsparksolutions.co.uk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Mon-Sun: 7am-9pm</span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Follow Us</p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/106268781"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/60 hover:text-primary transition-colors"
                  data-testid="link-linkedin"
                  aria-label="Follow us on LinkedIn"
                >
                  <SiLinkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/totalsparksolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/60 hover:text-primary transition-colors"
                  data-testid="link-instagram"
                  aria-label="Follow us on Instagram"
                >
                  <SiInstagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61573170203568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/60 hover:text-primary transition-colors"
                  data-testid="link-facebook"
                  aria-label="Follow us on Facebook"
                >
                  <SiFacebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href={`/${service.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-background/80 hover:text-background transition-colors"
                    data-testid={`footer-link-${service.toLowerCase().replace(/ /g, '-')}`}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas We Serve */}
          <div>
            <h3 className="font-semibold mb-4">Areas We Serve</h3>
            <ul className="space-y-2 text-sm">
              {CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/cleaning/${city.toLowerCase()}`}
                    className="text-background/80 hover:text-background transition-colors"
                    data-testid={`footer-link-${city.toLowerCase()}`}
                  >
                    Cleaning {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-background/80 hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Button 
                  variant="ghost"
                  onClick={scrollToQuoteForm}
                  className="text-background/80 hover:text-background transition-colors p-0 h-auto"
                >
                  Contact
                </Button>
              </li>
              <li>
                <Link href="/quote" className="text-background/80 hover:text-background transition-colors">
                  Get Quote
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-background/80 hover:text-background transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="text-background/80 hover:text-background transition-colors">
                  Insurance & DBS
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="text-background/80 hover:text-background transition-colors">
                  Our Guarantee
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-background/80">
              © {currentYear} TotalSpark Solutions. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-background/80 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-background/80 hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link href="/complaints" className="text-background/80 hover:text-background transition-colors">
                Complaints
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}