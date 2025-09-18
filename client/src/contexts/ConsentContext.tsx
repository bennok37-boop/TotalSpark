import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ConsentPreferences {
  essential: boolean; // Always true - required for site functionality
  analytics: boolean; // Google Analytics, website usage tracking
  marketing: boolean; // Email marketing, promotional content
  tracking: boolean; // CallRail phone number tracking
  functional: boolean; // Enhanced website features, preferences
}

export interface ConsentContextType {
  preferences: ConsentPreferences;
  hasConsented: boolean;
  showBanner: boolean;
  updatePreferences: (preferences: Partial<ConsentPreferences>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  dismissBanner: () => void;
  resetConsent: () => void;
}

const CONSENT_STORAGE_KEY = 'gdpr_consent_preferences';
const CONSENT_VERSION = '1.0'; // Increment when privacy policy changes

const defaultPreferences: ConsentPreferences = {
  essential: true, // Always required
  analytics: false,
  marketing: false,
  tracking: false,
  functional: false,
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function useConsent(): ConsentContextType {
  const context = useContext(ConsentContext);
  
  // Provide fallback values when provider is not available during initialization
  if (!context) {
    return {
      preferences: defaultPreferences,
      hasConsented: false,
      showBanner: false,
      updatePreferences: () => {},
      acceptAll: () => {},
      rejectAll: () => {},
      dismissBanner: () => {},
      resetConsent: () => {},
    };
  }
  
  return context;
}

interface StoredConsent {
  preferences: ConsentPreferences;
  timestamp: number;
  version: string;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      try {
        const parsedConsent: StoredConsent = JSON.parse(stored);
        
        // Check if consent is still valid (same version, not expired)
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const isValidConsent = parsedConsent.version === CONSENT_VERSION && 
                              parsedConsent.timestamp > thirtyDaysAgo;
        
        if (isValidConsent) {
          setPreferences(parsedConsent.preferences);
          setHasConsented(true);
          setShowBanner(false);
        } else {
          // Consent expired or version changed - show banner
          setShowBanner(true);
        }
      } catch (error) {
        console.warn('Failed to parse stored consent preferences:', error);
        setShowBanner(true);
      }
    } else {
      // No stored consent - show banner
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (newPreferences: ConsentPreferences) => {
    const consentData: StoredConsent = {
      preferences: newPreferences,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    } catch (error) {
      console.warn('Failed to save consent preferences:', error);
    }
  };

  const updatePreferences = (newPreferences: Partial<ConsentPreferences>) => {
    const updatedPreferences = {
      ...preferences,
      ...newPreferences,
      essential: true, // Always ensure essential is true
    };
    
    setPreferences(updatedPreferences);
    setHasConsented(true);
    setShowBanner(false);
    saveConsent(updatedPreferences);
  };

  const acceptAll = () => {
    const allAccepted: ConsentPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      tracking: true,
      functional: true,
    };
    
    setPreferences(allAccepted);
    setHasConsented(true);
    setShowBanner(false);
    saveConsent(allAccepted);
  };

  const rejectAll = () => {
    const essentialOnly: ConsentPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      tracking: false,
      functional: false,
    };
    
    setPreferences(essentialOnly);
    setHasConsented(true);
    setShowBanner(false);
    saveConsent(essentialOnly);
  };

  const dismissBanner = () => {
    setShowBanner(false);
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    setPreferences(defaultPreferences);
    setHasConsented(false);
    setShowBanner(true);
  };

  return (
    <ConsentContext.Provider 
      value={{
        preferences,
        hasConsented,
        showBanner,
        updatePreferences,
        acceptAll,
        rejectAll,
        dismissBanner,
        resetConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}