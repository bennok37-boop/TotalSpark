import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ArrowLeft, Calculator, CheckCircle, Phone, MessageCircle, Clock, Users, Search, MapPin } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { computeQuote, QuoteInput, QuoteResult } from '@/utils/pricingEngine';

type FormStep = 1 | 2 | 3;

interface QuoteFormData {
  // Contact details
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  additionalDetails: string;
  
  // Service details
  service: "endOfTenancy" | "deep" | "commercial" | "carpets" | "";
  bedrooms: "studio" | "1" | "2" | "3" | "4" | "5plus" | "";
  bathrooms: number;
  toilets: number;
  livingRooms: number;
  area_m2: number;
  
  // Enhanced property factors
  propertyType: "flat" | "terraced" | "semi" | "detached" | "maisonette" | "townhouse" | "";
  condition: "light" | "standard" | "heavy" | "veryheavy" | "";
  secondKitchen: boolean;
  internalStairs: boolean;
  furnished: boolean;
  occupied: boolean;
  hmoRooms: number;
  wasteBags: number;
  
  // Commercial enhancements
  commercialType: "office" | "retail" | "education" | "healthcare" | "hospitality" | "afterbuilders" | "";
  commercialRooms: number;
  commercialToilets: number;
  
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
  addOnCarpets: boolean;
  addOnUpholstery: boolean;
  
  // Modifiers
  urgent: boolean;
  weekend: boolean;
  stairsNoLift: boolean;
  
  // Pricing
  bundleCarpetsWithEoT: boolean;
  vat: boolean;
}

export default function QuoteForm() {
  const [step, setStep] = useState<FormStep>(1);
  const [isLookingUpPostcode, setIsLookingUpPostcode] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    postcode: '',
    additionalDetails: '',
    service: '',
    bedrooms: '',
    bathrooms: 1,
    toilets: 1,
    livingRooms: 1,
    area_m2: 0,
    
    // Enhanced property factors
    propertyType: '',
    condition: '',
    secondKitchen: false,
    internalStairs: false,
    furnished: false,
    occupied: false,
    hmoRooms: 0,
    wasteBags: 0,
    
    // Commercial enhancements
    commercialType: '',
    commercialRooms: 0,
    commercialToilets: 0,
    
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
    addOnCarpets: false,
    addOnUpholstery: false,
    urgent: false,
    weekend: false,
    stairsNoLift: false,

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
        address: data.address,
        postcode: data.postcode,
        additionalDetails: data.additionalDetails,
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

  // Postcode lookup functionality
  const lookupPostcode = async (postcode: string) => {
    if (!postcode || postcode.length < 5) return;
    
    setIsLookingUpPostcode(true);
    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode.replace(/\s/g, '')}`);
      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          // Auto-fill address components only if address is empty
          const result = data.result;
          const normalizedPostcode = postcode.toUpperCase().trim().replace(/(.+)(\d[A-Z]{2})$/, '$1 $2');
          
          // Only auto-fill if address is empty, otherwise suggest
          if (!formData.address.trim()) {
            const addressParts = [];
            if (result.admin_district) addressParts.push(result.admin_district);
            if (result.admin_ward) addressParts.push(result.admin_ward);
            const suggestedAddress = addressParts.join(', ');
            
            setFormData(prev => ({
              ...prev,
              address: suggestedAddress,
              postcode: normalizedPostcode
            }));
          } else {
            // Just update postcode if address already exists
            setFormData(prev => ({
              ...prev,
              postcode: normalizedPostcode
            }));
          }
          
          toast({
            title: "Postcode found!",
            description: `Address details loaded for ${postcode.toUpperCase()}`
          });
        }
      } else {
        toast({
          title: "Postcode not found",
          description: "Please check the postcode and try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Lookup failed",
        description: "Please enter address manually",
        variant: "destructive"
      });
    } finally {
      setIsLookingUpPostcode(false);
    }
  };

  const handleCheckboxChange = (field: keyof QuoteFormData, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  // Real-time price calculation using the pricing engine
  useEffect(() => {
    const hasCarpetItems = formData.carpetRooms > 0 || formData.stairs > 0 || formData.rugs > 0 || 
                          formData.sofa2 > 0 || formData.sofa3 > 0 || formData.armchair > 0 || formData.mattress > 0;
    
    if (formData.service && 
        ((formData.service === 'commercial' && (formData.area_m2 > 0 || formData.commercialRooms > 0)) ||
         (formData.service === 'carpets' && hasCarpetItems) ||
         (formData.service !== 'commercial' && formData.service !== 'carpets' && formData.bedrooms))) {
      
      const quoteInput: QuoteInput = {
        service: formData.service,
        bedrooms: formData.bedrooms || undefined,
        bathrooms: formData.bathrooms,
        toilets: formData.toilets,
        livingRooms: formData.livingRooms,
        area_m2: formData.area_m2 || undefined,
        
        // Enhanced property factors
        propertyType: formData.propertyType || undefined,
        condition: formData.condition || undefined,
        secondKitchen: formData.secondKitchen,
        internalStairs: formData.internalStairs,
        furnished: formData.furnished,
        occupied: formData.occupied,
        hmoRooms: formData.hmoRooms,
        wasteBags: formData.wasteBags,
        
        // Commercial enhancements
        commercialType: formData.commercialType || undefined,
        commercialRooms: formData.commercialRooms || undefined,
        commercialToilets: formData.commercialToilets || undefined,
        
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
          limescale: formData.limescale,
          carpets: formData.addOnCarpets,
          upholstery: formData.addOnUpholstery
        },
        modifiers: {
          urgent: formData.urgent,
          weekend: formData.weekend,
          stairsNoLift: formData.stairsNoLift,
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
    
    // Enhanced validation for address and postcode
    if (formData.address && !formData.postcode) {
      toast({
        title: "Postcode Required",
        description: "Please provide a postcode with your address for accurate service delivery",
        variant: "destructive"
      });
      return;
    }
    
    // Validate postcode format (basic UK postcode pattern)
    if (formData.postcode && !/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(formData.postcode.replace(/\s/g, ''))) {
      toast({
        title: "Invalid Postcode",
        description: "Please enter a valid UK postcode (e.g. NE1 1AA)",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Step 1 completed:', { name: formData.name, email: formData.email, phone: formData.phone, address: formData.address, postcode: formData.postcode });
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
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your full address or use postcode lookup below"
                      required
                      data-testid="input-address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="postcode">Postcode *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="postcode"
                        type="text"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        placeholder="Enter postcode (e.g. NE1 1AA)"
                      required
                        data-testid="input-postcode"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => lookupPostcode(formData.postcode)}
                        disabled={isLookingUpPostcode || !formData.postcode}
                        data-testid="button-lookup-postcode"
                        className="min-w-[100px]"
                      >
                        {isLookingUpPostcode ? (
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs">Looking up...</span>
                          </div>
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-1" />
                            Lookup
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      Enter your postcode to auto-fill address details
                    </p>
                  </div>


                  <Button type="submit" className="w-full" data-testid="button-next-step">
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              ) : step === 2 ? (
                <form onSubmit={handleStep2Submit} className="space-y-6">
                  {/* Service Type Selection */}
                  <div>
                    <Label htmlFor="service">Service Type *</Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger data-testid="select-service">
                        <SelectValue placeholder="Select cleaning service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map(service => (
                          <SelectItem key={service.value} value={service.value}>{service.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Conditional Fields Based on Service Type */}
                  {formData.service && formData.service !== 'commercial' && formData.service !== 'carpets' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bedrooms">Number of Bedrooms *</Label>
                        <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                          <SelectTrigger data-testid="numberOfBedrooms_input">
                            <SelectValue placeholder="Select number of bedrooms" />
                          </SelectTrigger>
                          <SelectContent>
                            {bedroomOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="bathrooms">Number of Bathrooms *</Label>
                          <Input
                            id="bathrooms"
                            type="number"
                            min="1"
                            max="10"
                            value={formData.bathrooms || ''}
                            onChange={(e) => handleNumberChange('bathrooms', e.target.value)}
                            placeholder="Enter number of bathrooms"
                            data-testid="numberOfBathrooms_input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="toilets">Number of Toilets</Label>
                          <Input
                            id="toilets"
                            type="number"
                            min="0"
                            max="10"
                            value={formData.toilets || ''}
                            onChange={(e) => handleNumberChange('toilets', e.target.value)}
                            placeholder="Enter number of toilets"
                            data-testid="input-toilets"
                          />
                        </div>
                        <div>
                          <Label htmlFor="livingRooms">Number of Living Rooms</Label>
                          <Input
                            id="livingRooms"
                            type="number"
                            min="0"
                            max="10"
                            value={formData.livingRooms || ''}
                            onChange={(e) => handleNumberChange('livingRooms', e.target.value)}
                            placeholder="Enter number of living rooms"
                            data-testid="input-living-rooms"
                          />
                        </div>
                      </div>
                      
                      {/* Enhanced Property Factors */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="propertyType">Property Type *</Label>
                            <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                              <SelectTrigger data-testid="select-property-type">
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="flat">Studio/Flat</SelectItem>
                                <SelectItem value="terraced">Terraced House</SelectItem>
                                <SelectItem value="semi">Semi-Detached</SelectItem>
                                <SelectItem value="detached">Detached House</SelectItem>
                                <SelectItem value="maisonette">Maisonette</SelectItem>
                                <SelectItem value="townhouse">Townhouse</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="condition">Property Condition *</Label>
                            <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                              <SelectTrigger data-testid="select-condition">
                                <SelectValue placeholder="Select condition level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light (Well-maintained)</SelectItem>
                                <SelectItem value="standard">Standard (Typical tenancy)</SelectItem>
                                <SelectItem value="heavy">Heavy (Grease/scale buildup)</SelectItem>
                                <SelectItem value="veryheavy">Very Heavy (Neglected/party house)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="secondKitchen" 
                              checked={formData.secondKitchen}
                              onCheckedChange={(checked) => handleCheckboxChange('secondKitchen', checked as boolean)}
                              data-testid="checkbox-second-kitchen"
                            />
                            <Label htmlFor="secondKitchen">Second Kitchen (HMO/Annex)</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="internalStairs" 
                              checked={formData.internalStairs}
                              onCheckedChange={(checked) => handleCheckboxChange('internalStairs', checked as boolean)}
                              data-testid="checkbox-internal-stairs"
                            />
                            <Label htmlFor="internalStairs">Internal Staircases (Townhouse/Maisonette)</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="furnished" 
                              checked={formData.furnished}
                              onCheckedChange={(checked) => handleCheckboxChange('furnished', checked as boolean)}
                              data-testid="checkbox-furnished"
                            />
                            <Label htmlFor="furnished">Property is Furnished</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="occupied" 
                              checked={formData.occupied}
                              onCheckedChange={(checked) => handleCheckboxChange('occupied', checked as boolean)}
                              data-testid="checkbox-occupied"
                            />
                            <Label htmlFor="occupied">Property Occupied During Cleaning</Label>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="hmoRooms">HMO Room Count (Optional)</Label>
                            <Input
                              id="hmoRooms"
                              type="number"
                              min="0"
                              max="20"
                              value={formData.hmoRooms || ''}
                              onChange={(e) => handleNumberChange('hmoRooms', e.target.value)}
                              placeholder="Number of HMO rooms"
                              data-testid="input-hmo-rooms"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="wasteBags">Waste Bag Removal (Optional)</Label>
                            <Input
                              id="wasteBags"
                              type="number"
                              min="0"
                              max="10"
                              value={formData.wasteBags || ''}
                              onChange={(e) => handleNumberChange('wasteBags', e.target.value)}
                              placeholder="Number of bags to remove"
                              data-testid="input-waste-bags"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Commercial Area Input */}
                  {formData.service === 'commercial' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="commercialType">Commercial Type *</Label>
                          <Select value={formData.commercialType} onValueChange={(value) => handleInputChange('commercialType', value)}>
                            <SelectTrigger data-testid="select-commercial-type">
                              <SelectValue placeholder="Select commercial type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="office">Office (Standard)</SelectItem>
                              <SelectItem value="retail">Retail / Showroom</SelectItem>
                              <SelectItem value="education">Education (School/Classrooms)</SelectItem>
                              <SelectItem value="healthcare">Healthcare (GP/Dental/Clinics)</SelectItem>
                              <SelectItem value="hospitality">Hospitality (Café/Restaurant)</SelectItem>
                              <SelectItem value="afterbuilders">After Builders (Dusty/Construction)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="condition">Property Condition *</Label>
                          <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                            <SelectTrigger data-testid="select-commercial-condition">
                              <SelectValue placeholder="Select condition level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light (Well-maintained)</SelectItem>
                              <SelectItem value="standard">Standard (Typical use)</SelectItem>
                              <SelectItem value="heavy">Heavy (High traffic/buildup)</SelectItem>
                              <SelectItem value="veryheavy">Very Heavy (Neglected/heavy use)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="area">Area (m²)</Label>
                            <Input
                              id="area"
                              type="number"
                              min="1"
                              value={formData.area_m2 || ''}
                              onChange={(e) => handleNumberChange('area_m2', e.target.value)}
                              placeholder="Area in square meters"
                              data-testid="input-area"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="commercialRooms">OR Number of Rooms</Label>
                            <Input
                              id="commercialRooms"
                              type="number"
                              min="1"
                              value={formData.commercialRooms || ''}
                              onChange={(e) => handleNumberChange('commercialRooms', e.target.value)}
                              placeholder="Number of rooms"
                              data-testid="input-commercial-rooms"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="commercialToilets">Number of Toilets</Label>
                          <Input
                            id="commercialToilets"
                            type="number"
                            min="0"
                            value={formData.commercialToilets || ''}
                            onChange={(e) => handleNumberChange('commercialToilets', e.target.value)}
                            placeholder="Number of toilets"
                            data-testid="input-commercial-toilets"
                          />
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          Please provide either the area in square meters OR the number of rooms. We'll add a quote for additional toilets if specified.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Carpet Items */}
                  {formData.service === 'carpets' && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Carpet & Upholstery Items</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="carpetRooms">Carpet Rooms</Label>
                          <Input
                            id="carpetRooms"
                            type="number"
                            min="0"
                            value={formData.carpetRooms || ''}
                            onChange={(e) => handleNumberChange('carpetRooms', e.target.value)}
                            data-testid="input-carpet-rooms"
                          />
                        </div>
                        <div>
                          <Label htmlFor="stairs">Stairs</Label>
                          <Input
                            id="stairs"
                            type="number"
                            min="0"
                            value={formData.stairs || ''}
                            onChange={(e) => handleNumberChange('stairs', e.target.value)}
                            data-testid="input-stairs"
                          />
                        </div>
                        <div>
                          <Label htmlFor="rugs">Rugs</Label>
                          <Input
                            id="rugs"
                            type="number"
                            min="0"
                            value={formData.rugs || ''}
                            onChange={(e) => handleNumberChange('rugs', e.target.value)}
                            data-testid="input-rugs"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sofa2">2-Seater Sofas</Label>
                          <Input
                            id="sofa2"
                            type="number"
                            min="0"
                            value={formData.sofa2 || ''}
                            onChange={(e) => handleNumberChange('sofa2', e.target.value)}
                            data-testid="input-sofa2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sofa3">3-Seater Sofas</Label>
                          <Input
                            id="sofa3"
                            type="number"
                            min="0"
                            value={formData.sofa3 || ''}
                            onChange={(e) => handleNumberChange('sofa3', e.target.value)}
                            data-testid="input-sofa3"
                          />
                        </div>
                        <div>
                          <Label htmlFor="armchair">Armchairs</Label>
                          <Input
                            id="armchair"
                            type="number"
                            min="0"
                            value={formData.armchair || ''}
                            onChange={(e) => handleNumberChange('armchair', e.target.value)}
                            data-testid="input-armchair"
                          />
                        </div>
                        <div>
                          <Label htmlFor="mattress">Mattresses</Label>
                          <Input
                            id="mattress"
                            type="number"
                            min="0"
                            value={formData.mattress || ''}
                            onChange={(e) => handleNumberChange('mattress', e.target.value)}
                            data-testid="input-mattress"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add-ons Section */}
                  {formData.service && formData.service !== 'carpets' && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Additional Services</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="oven"
                            checked={formData.oven}
                            onCheckedChange={(checked) => handleCheckboxChange('oven', checked as boolean)}
                            data-testid="checkbox-oven"
                          />
                          <Label htmlFor="oven" className="text-sm">Oven Deep Clean (+£25)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="fridge"
                            checked={formData.fridge}
                            onCheckedChange={(checked) => handleCheckboxChange('fridge', checked as boolean)}
                            data-testid="checkbox-fridge"
                          />
                          <Label htmlFor="fridge" className="text-sm">Refrigerator Deep Clean (+£20)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="cabinets"
                            checked={formData.cabinets}
                            onCheckedChange={(checked) => handleCheckboxChange('cabinets', checked as boolean)}
                            data-testid="checkbox-cabinets"
                          />
                          <Label htmlFor="cabinets" className="text-sm">Inside Cabinets (+£30)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="limescale"
                            checked={formData.limescale}
                            onCheckedChange={(checked) => handleCheckboxChange('limescale', checked as boolean)}
                            data-testid="checkbox-limescale"
                          />
                          <Label htmlFor="limescale" className="text-sm">Heavy Limescale Treatment (+£35)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="addOnCarpets"
                            checked={formData.addOnCarpets}
                            onCheckedChange={(checked) => handleCheckboxChange('addOnCarpets', checked as boolean)}
                            data-testid="checkbox-add-on-carpets"
                          />
                          <Label htmlFor="addOnCarpets" className="text-sm">Carpet Cleaning Add-on (+£80)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="addOnUpholstery"
                            checked={formData.addOnUpholstery}
                            onCheckedChange={(checked) => handleCheckboxChange('addOnUpholstery', checked as boolean)}
                            data-testid="checkbox-add-on-upholstery"
                          />
                          <Label htmlFor="addOnUpholstery" className="text-sm">Upholstery Cleaning Add-on (+£60)</Label>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="windows">Interior Windows</Label>
                          <Input
                            id="windows"
                            type="number"
                            min="0"
                            value={formData.windows || ''}
                            onChange={(e) => handleNumberChange('windows', e.target.value)}
                            placeholder="Number of windows (£3 each, min £15)"
                            data-testid="input-windows"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Modifiers Section */}
                  {formData.service && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Special Requirements</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="urgent"
                            checked={formData.urgent}
                            onCheckedChange={(checked) => handleCheckboxChange('urgent', checked as boolean)}
                            data-testid="checkbox-urgent"
                          />
                          <Label htmlFor="urgent" className="text-sm">Urgent Service (within 24h) (+25%)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="weekend"
                            checked={formData.weekend}
                            onCheckedChange={(checked) => handleCheckboxChange('weekend', checked as boolean)}
                            data-testid="checkbox-weekend"
                          />
                          <Label htmlFor="weekend" className="text-sm">Weekend Service (+20%)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="stairsNoLift"
                            checked={formData.stairsNoLift}
                            onCheckedChange={(checked) => handleCheckboxChange('stairsNoLift', checked as boolean)}
                            data-testid="checkbox-stairs"
                          />
                          <Label htmlFor="stairsNoLift" className="text-sm">Property above 2nd floor (no lift) (+£15)</Label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Price Display */}
                  {quoteResult && (
                    <Card className="mt-6 border-primary/20">
                      <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                          <div className="space-y-2">
                            <div className="text-3xl font-bold text-primary">
                              £{quoteResult.estimateRange.low} - £{quoteResult.estimateRange.high}
                            </div>
                            <div className="text-sm text-muted-foreground">Estimated Price Range</div>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="space-y-1">
                              <div className="flex items-center justify-center space-x-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{quoteResult.scheduling.crew}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">Crew Size</div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-center space-x-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{quoteResult.scheduling.durationHours}h</span>
                              </div>
                              <div className="text-xs text-muted-foreground">Duration</div>
                            </div>
                          </div>
                          
                          {quoteResult.lineItems.length > 0 && (
                            <>
                              <Separator />
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-left">Price Breakdown:</h4>
                                <div className="space-y-1 text-sm text-left">
                                  {quoteResult.lineItems.map((item: any, index: number) => (
                                    <div key={index} className="flex justify-between">
                                      <span className="text-muted-foreground">{item.description}</span>
                                      <span>£{item.amount.toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Additional Details - moved to end of form */}
                  <div>
                    <Label htmlFor="additionalDetails">Additional Details (Optional)</Label>
                    <Textarea
                      id="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                      placeholder="Any additional information about your cleaning requirements, special instructions, access details, or specific areas that need attention..."
                      rows={3}
                      data-testid="textarea-additional-details"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Help us provide the most accurate quote by sharing any special requirements
                    </p>
                  </div>

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
                      disabled={submitQuoteMutation.isPending || !quoteResult}
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
                    {quoteResult && (
                      <div className="bg-chart-2/10 border border-chart-2/20 rounded-lg p-4 mb-6">
                        <p className="text-sm text-muted-foreground mb-1">Your Estimated Quote</p>
                        <p className="text-3xl font-bold text-chart-2" data-testid="text-final-price">
                          £{quoteResult.estimateRange.low} - £{quoteResult.estimateRange.high}
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
                          address: '',
                          postcode: '',
                          additionalDetails: '',
                          service: '',
                          bedrooms: '',
                          bathrooms: 1,
                          toilets: 1,
                          livingRooms: 1,
                          area_m2: 0,
                          
                          // Enhanced property factors
                          propertyType: '',
                          condition: '',
                          secondKitchen: false,
                          internalStairs: false,
                          furnished: false,
                          occupied: false,
                          hmoRooms: 0,
                          wasteBags: 0,
                          
                          // Commercial enhancements
                          commercialType: '',
                          commercialRooms: 0,
                          commercialToilets: 0,
                          
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
                          addOnCarpets: false,
                          addOnUpholstery: false,
                          urgent: false,
                          weekend: false,
                          stairsNoLift: false,
                      
                          bundleCarpetsWithEoT: false,
                          vat: false
                        });
                        setQuoteResult(null);
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