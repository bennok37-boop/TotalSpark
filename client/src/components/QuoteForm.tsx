import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, Calculator } from 'lucide-react';
import { CITIES, SERVICES } from '@shared/schema';

type FormStep = 1 | 2;

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  propertyType: string;
  bedrooms: string;
  service: string;
  extras: string[];
}

export default function QuoteForm() {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
    bedrooms: '',
    service: '',
    extras: []
  });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExtraToggle = (extra: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra]
    }));
  };

  const calculatePrice = () => {
    // Todo: remove mock functionality
    let basePrice = 120;
    
    if (formData.propertyType === 'house') basePrice += 40;
    if (formData.propertyType === 'commercial') basePrice += 100;
    
    const bedroomCount = parseInt(formData.bedrooms) || 0;
    basePrice += bedroomCount * 20;
    
    basePrice += formData.extras.length * 15;
    
    setEstimatedPrice(basePrice);
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Step 1 completed:', { name: formData.name, email: formData.email, phone: formData.phone, city: formData.city }); // Todo: remove mock functionality
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePrice();
    console.log('Quote request submitted:', formData); // Todo: remove mock functionality
  };

  const propertyTypes = [
    { value: 'flat', label: '1-bed Flat' },
    { value: 'apartment', label: '2-3 bed Apartment' },
    { value: 'house', label: 'House (3+ bedrooms)' },
    { value: 'commercial', label: 'Commercial Space' }
  ];

  const extraServices = [
    'Oven cleaning',
    'Refrigerator cleaning',
    'Window cleaning (interior)',
    'Carpet steam cleaning',
    'Garage cleaning',
    'Garden tidy up'
  ];

  return (
    <section className="py-16 bg-muted" data-testid="section-quote-form">
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
              ) : (
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
                    <Button type="submit" className="flex-1" data-testid="button-get-quote">
                      Get Quote
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}