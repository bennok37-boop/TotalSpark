import { useState } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Settings, Shield, BarChart3, Mail, Phone, Zap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function CookieConsentBanner() {
  const { 
    showBanner, 
    preferences, 
    acceptAll, 
    rejectAll, 
    updatePreferences,
    dismissBanner 
  } = useConsent();
  
  const [showSettings, setShowSettings] = useState(false);
  const [tempPreferences, setTempPreferences] = useState(preferences);

  if (!showBanner) return null;

  const handleSaveSettings = () => {
    updatePreferences(tempPreferences);
    setShowSettings(false);
  };

  const consentOptions = [
    {
      key: 'essential' as const,
      title: 'Essential Cookies',
      description: 'Required for basic website functionality and security. Cannot be disabled.',
      icon: Shield,
      required: true,
    },
    {
      key: 'functional' as const,
      title: 'Functional Cookies',
      description: 'Remember your preferences and improve your user experience.',
      icon: Zap,
      required: false,
    },
    {
      key: 'tracking' as const,
      title: 'Phone Number Tracking',
      description: 'Display different phone numbers to track which marketing channels bring customers.',
      icon: Phone,
      required: false,
    },
    {
      key: 'analytics' as const,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website to improve our services.',
      icon: BarChart3,
      required: false,
    },
    {
      key: 'marketing' as const,
      title: 'Marketing Cookies',
      description: 'Used to show you relevant advertising and measure marketing campaign effectiveness.',
      icon: Mail,
      required: false,
    },
  ];

  return (
    <>
      {/* Main Banner */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t shadow-lg"
        data-testid="cookie-consent-banner"
      >
        <Card className="max-w-6xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Cookie Consent</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to improve your browsing experience, 
                  provide personalized services, and analyze website traffic. By clicking "Accept All", 
                  you agree to our use of cookies as described in our{' '}
                  <a 
                    href="/privacy" 
                    className="text-primary underline hover:no-underline"
                    data-testid="link-privacy-policy"
                  >
                    Privacy Policy
                  </a>.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 lg:flex-nowrap">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  data-testid="button-cookie-settings"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={rejectAll}
                  data-testid="button-reject-all"
                >
                  Reject All
                </Button>
                <Button 
                  size="sm"
                  onClick={acceptAll}
                  data-testid="button-accept-all"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent 
          className="max-w-2xl max-h-[80vh] overflow-y-auto"
          data-testid="dialog-cookie-settings"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Choose which cookies and tracking technologies you'd like to allow. 
              You can change these preferences at any time from our privacy policy page.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {consentOptions.map((option) => {
              const Icon = option.icon;
              const isEnabled = tempPreferences[option.key];
              
              return (
                <div 
                  key={option.key}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-muted/20"
                >
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{option.title}</h4>
                        {option.required && (
                          <Badge variant="secondary" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      
                      <Switch
                        checked={isEnabled}
                        disabled={option.required}
                        onCheckedChange={(checked) => {
                          if (!option.required) {
                            setTempPreferences(prev => ({
                              ...prev,
                              [option.key]: checked
                            }));
                          }
                        }}
                        data-testid={`switch-${option.key}`}
                      />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setTempPreferences({
                  essential: true,
                  analytics: false,
                  marketing: false,
                  tracking: false,
                  functional: false,
                });
              }}
              data-testid="button-reject-optional"
            >
              Reject Optional
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={() => {
                setTempPreferences({
                  essential: true,
                  analytics: true,
                  marketing: true,
                  tracking: true,
                  functional: true,
                });
              }}
              data-testid="button-accept-optional"
            >
              Accept All
            </Button>
            <Button 
              className="flex-1"
              onClick={handleSaveSettings}
              data-testid="button-save-preferences"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}