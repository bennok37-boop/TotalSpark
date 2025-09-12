import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ArrowLeft, Calculator, CheckCircle, Phone, MessageCircle, Clock, Users } from 'lucide-react';
import { CITIES } from '@shared/schema';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { computeQuote, QuoteInput, QuoteResult } from '@/utils/pricingEngine';

type FormStep = 1 | 2 | 3;

interface QuoteFormData {
  // Contact details
  name: string;
  email: string;
  phone: string;
  city: string;
  
  // Service details
  service: "endOfTenancy" | "deep" | "commercial" | "carpets" | "";
  bedrooms: "studio" | "1" | "2" | "3" | "4" | "5plus" | "";
  area_m2: number;
  
  // Carpet items
  carpetRooms: number;
  stairs: number;
  rugs: number;
  sofa2: number;
  sofa3: number;
  armchair: number;
  mattress: number;
  
  // Add-ons
  oven: boolean;
  fridge: boolean;
  windows: number;
  cabinets: boolean;
  limescale: boolean;
  
  // Modifiers
  urgent: boolean;
  weekend: boolean;
  stairsNoLift: boolean;
  outerArea: boolean;
  
  // Pricing
  bundleCarpetsWithEoT: boolean;
  vat: boolean;
}

export default function QuoteForm() {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    service: '',
    bedrooms: '',
    area_m2: 0,
    carpetRooms: 0,
    stairs: 0,
    rugs: 0,
    sofa2: 0,
    sofa3: 0,
    armchair: 0,
    mattress: 0,
    oven: false,
    fridge: false,
    windows: 0,
    cabinets: false,
    limescale: false,
    urgent: false,
    weekend: false,
    stairsNoLift: false,
    outerArea: false,
    bundleCarpetsWithEoT: false,
    vat: false
  });
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const { toast } = useToast();

  // Handle auto-scroll when page loads with #quote-form hash
  useEffect(() => {
    if (window.location.hash === '#quote-form') {
      setTimeout(() => {
        const quoteForm = document.getElementById('quote-form');
        if (quoteForm) {
          const headerHeight = 80;
          const elementTop = quoteForm.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Focus the first input
          setTimeout(() => {
            const firstInput = quoteForm.querySelector('input[data-testid="input-name"]') as HTMLInputElement;
            if (firstInput) {
              firstInput.focus();
            }
          }, 800);
        }
      }, 100); // Small delay to ensure component is fully rendered
    }
  }, []);

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData & { quoteResult?: QuoteResult }) => {
      const submitData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        service: data.service,
        bedrooms: data.bedrooms || null,
        area_m2: data.area_m2 || null,
        quoteResult: data.quoteResult || null
      };
      return apiRequest('POST', '/api/quotes', submitData);
    },
    onSuccess: () => {
      setStep(3);
      toast({
        title: "Quote Submitted!",
        description: "We'll contact you within 24 hours with your personalized quote."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit quote. Please try again.",
        variant: "destructive"
      });
      console.error('Quote submission error:', error);
    }
  });

  const handleInputChange = (field: keyof QuoteFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumberChange = (field: keyof QuoteFormData, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleCheckboxChange = (field: keyof QuoteFormData, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  // Real-time price calculation using the pricing engine
  useEffect(() => {
    if (formData.service && 
        ((formData.service === 'commercial' && formData.area_m2 > 0) ||
         (formData.service !== 'commercial' && formData.bedrooms))) {
      
      const quoteInput: QuoteInput = {
        service: formData.service,
        bedrooms: formData.bedrooms || undefined,
        area_m2: formData.area_m2 || undefined,
        items: formData.service === 'carpets' ? {
          carpetRooms: formData.carpetRooms,
          stairs: formData.stairs,
          rugs: formData.rugs,
          sofa2: formData.sofa2,
          sofa3: formData.sofa3,
          armchair: formData.armchair,
          mattress: formData.mattress
        } : undefined,
        addons: {
          oven: formData.oven,
          fridge: formData.fridge,
          windows: formData.windows,
          cabinets: formData.cabinets,
          limescale: formData.limescale
        },
        modifiers: {
          urgent: formData.urgent,
          weekend: formData.weekend,
          stairsNoLift: formData.stairsNoLift,
          outerArea: formData.outerArea
        },
        bundleCarpetsWithEoT: formData.bundleCarpetsWithEoT,
        vat: formData.vat
      };
      
      try {
        const result = computeQuote(quoteInput);
        setQuoteResult(result);
      } catch (error) {
        console.error('Price calculation error:', error);
        setQuoteResult(null);
      }
    } else {
      setQuoteResult(null);
    }
  }, [formData]);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Step 1 completed:', { name: formData.name, email: formData.email, phone: formData.phone, city: formData.city }); // Todo: remove mock functionality
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteResult) {
      submitQuoteMutation.mutate({ ...formData, quoteResult });
    }
  };

  const serviceTypes = [
    { value: 'endOfTenancy', label: 'End of Tenancy Cleaning' },
    { value: 'deep', label: 'Deep Cleaning' },
    { value: 'commercial', label: 'Commercial/Office Cleaning' },
    { value: 'carpets', label: 'Carpet & Upholstery Cleaning' }
  ];

  const bedroomOptions = [
    { value: 'studio', label: 'Studio' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4 Bedrooms' },
    { value: '5plus', label: '5+ Bedrooms' }
  ];

  return (
    <section id="quote-form" className="py-16 bg-muted scroll-mt-20" data-testid="section-quote-form">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Calculator className="w-6 h-6 text-primary" />
                <span>Get Your Free Quote</span>
              </CardTitle>
              <p className="text-muted-foreground">
                {step === 1 ? 'Let\'s start with your contact details' : 'Tell us about your cleaning needs'}
              </p>
              
              {/* Progress Indicator */}
              <div className="flex justify-center space-x-2 mt-4">
                <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
              </div>
            </CardHeader>

            <CardContent>
              {step === 1 ? (
                <form onSubmit={handleStep1Submit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                      <SelectTrigger data-testid="select-city-quote">
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" data-testid="button-next-step">
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              ) : step === 2 ? (
                <form onSubmit={handleStep2Submit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger data-testid="select-property-type">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        min="0"
                        max="10"
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                        data-testid="input-bedrooms"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="service">Primary Service *</Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger data-testid="select-service">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Additional Services (optional)</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {extraServices.map((extra) => (
                        <div key={extra} className="flex items-center space-x-2">
                          <Checkbox
                            id={extra}
                            checked={formData.extras.includes(extra)}
                            onCheckedChange={() => handleExtraToggle(extra)}
                            data-testid={`checkbox-${extra.toLowerCase().replace(/ /g, '-')}`}
                          />
                          <Label htmlFor={extra} className="text-sm">
                            {extra}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {estimatedPrice && (
                    <div className="bg-chart-2/10 border border-chart-2/20 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Price</p>
                      <p className="text-2xl font-bold text-chart-2" data-testid="text-estimated-price">
                        £{estimatedPrice}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Final price confirmed after property assessment
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                      data-testid="button-back"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1" 
                      data-testid="button-get-quote"
                      disabled={submitQuoteMutation.isPending}
                    >
                      {submitQuoteMutation.isPending ? 'Submitting...' : 'Get Quote'}
                    </Button>
                  </div>
                </form>
              ) : step === 3 ? (
                // Thank You Step
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Thanks! Your Quote Is Ready</h3>
                    <p className="text-muted-foreground mb-4">
                      Check your inbox for details. Want to fast-track your booking?
                    </p>
                    {estimatedPrice && (
                      <div className="bg-chart-2/10 border border-chart-2/20 rounded-lg p-4 mb-6">
                        <p className="text-sm text-muted-foreground mb-1">Your Estimated Quote</p>
                        <p className="text-3xl font-bold text-chart-2" data-testid="text-final-price">
                          £{estimatedPrice}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Final price confirmed after property assessment
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      variant="default" 
                      className="w-full"
                      data-testid="button-call-direct"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us Direct
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      data-testid="button-whatsapp"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setStep(1);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          city: '',
                          propertyType: '',
                          bedrooms: '',
                          service: '',
                          extras: []
                        });
                        setEstimatedPrice(null);
                      }}
                      className="w-full"
                      data-testid="button-new-quote"
                    >
                      New Quote
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}