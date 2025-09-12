import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Menu, X } from 'lucide-react';
import { CITIES } from '@shared/schema';
import { scrollToQuoteForm } from '@/utils/scroll';

export default function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Newcastle');

  const phoneNumber = "0191 123 4567"; // Todo: remove mock functionality
  const whatsappNumber = "447123456789"; // Todo: remove mock functionality

  const services = ['End of Tenancy Cleaning', 'Deep Cleaning', 'Commercial Cleaning', 'Carpet & Upholstery Cleaning'];

  const isActive = (path: string) => location === path || location.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-foreground">CleanPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[140px]" data-testid="select-city">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Link 
              href="/" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
              data-testid="link-home-nav"
            >
              Home
            </Link>

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

            <Link 
              href="/contact" 
              className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/contact') ? 'text-primary' : 'text-muted-foreground'}`}
              data-testid="link-contact"
            >
              Contact
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href={`tel:${phoneNumber}`} 
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
              data-testid="link-phone"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">{phoneNumber}</span>
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
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full" data-testid="select-city-mobile">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>

              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Services</span>
                <div className="pl-4 space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service}
                      href={`/${service.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>

              <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>

              <a 
                href={`tel:${phoneNumber}`} 
                className="flex items-center space-x-2 text-primary"
                data-testid="link-phone-mobile"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold">{phoneNumber}</span>
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