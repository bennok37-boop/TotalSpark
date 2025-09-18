import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useConsent } from '@/contexts/ConsentContext';

export function CookieSettingsLink() {
  const { resetConsent } = useConsent();

  const handleOpenSettings = () => {
    resetConsent(); // This will show the banner again with settings
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleOpenSettings}
      className="gap-2"
      data-testid="link-cookie-settings"
    >
      <Settings className="h-4 w-4" />
      Cookie Settings
    </Button>
  );
}