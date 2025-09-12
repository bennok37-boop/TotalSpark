import { Link } from 'wouter';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { CITIES, SERVICES } from '@shared/schema';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background" data-testid="footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl">CleanPro</span>
            </div>
            <p className="text-background/80 mb-4 text-sm leading-relaxed">
              Professional cleaning services across North East England. DBS-checked, fully insured, with our deposit-back guarantee.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>0191 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@cleanpro.co.uk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Mon-Sun: 7am-9pm</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((service) => (
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
                    href={`/cleaning-${city.toLowerCase()}`}
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
                <Link href="/contact" className="text-background/80 hover:text-background transition-colors">
                  Contact
                </Link>
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
              © {currentYear} CleanPro. All rights reserved.
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