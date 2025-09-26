// React hook for accessing CallRail tracking numbers
// Provides tracking phone numbers based on current route, campaign parameters, and session

import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { getLocationContactDetails } from '@shared/location-utils';
import type { TrackingMetadata } from '@shared/callrail-config';
import { useConsent } from '@/contexts/ConsentContext';

export interface TrackingNumbers {
  phone: string;
  whatsapp: string;
  location: any;
  region: any;
  trackingMetadata: TrackingMetadata;
  isLoading: boolean;
}

// Generate or get session ID for consistent number selection
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('ts_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('ts_session_id', sessionId);
  }
  return sessionId;
}

export function useTrackingNumbers(): TrackingNumbers {
  const [location] = useLocation();
  const { preferences, hasConsented } = useConsent();
  const [trackingData, setTrackingData] = useState<TrackingNumbers>({
    phone: '03300432115', // Main company number as default fallback while loading
    whatsapp: '447380991629',
    location: null,
    region: null,
    trackingMetadata: {
      selectedNumber: '03300432115',
      ruleType: 'global',
      timestamp: Date.now()
    },
    isLoading: true
  });
  
  useEffect(() => {
    // Only use tracking numbers if user has consented to tracking
    if (!hasConsented || !preferences.tracking) {
      // Use fallback company number without tracking
      setTrackingData({
        phone: '03300432115', // Main company fallback number
        whatsapp: '447380991629',
        location: null,
        region: null,
        trackingMetadata: {
          selectedNumber: '03300432115',
          ruleType: 'global',
          timestamp: Date.now()
        },
        isLoading: false
      });
      return;
    }
    
    // Get current URL search parameters
    const searchParams = window.location.search;
    const sessionId = getSessionId();
    
    // Resolve tracking numbers based on current context
    const contactDetails = getLocationContactDetails(location, searchParams, sessionId);
    
    setTrackingData({
      phone: contactDetails.phone,
      whatsapp: contactDetails.whatsapp,
      location: contactDetails.location,
      region: contactDetails.region,
      trackingMetadata: contactDetails.trackingMetadata,
      isLoading: false
    });
    
    // Log tracking selection for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('CallRail Tracking:', {
        route: location,
        selectedNumber: contactDetails.phone,
        ruleName: contactDetails.trackingMetadata.ruleName,
        ruleType: contactDetails.trackingMetadata.ruleType,
        consentGranted: preferences.tracking
      });
    }
  }, [location, hasConsented, preferences.tracking]); // Re-run when route or consent changes
  
  // Also listen for URL parameter changes (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      // Only use tracking numbers if user has consented to tracking
      if (!hasConsented || !preferences.tracking) {
        return; // Don't update on navigation if no tracking consent
      }
      
      const searchParams = window.location.search;
      const sessionId = getSessionId();
      const contactDetails = getLocationContactDetails(location, searchParams, sessionId);
      
      setTrackingData({
        phone: contactDetails.phone,
        whatsapp: contactDetails.whatsapp,
        location: contactDetails.location,
        region: contactDetails.region,
        trackingMetadata: contactDetails.trackingMetadata,
        isLoading: false
      });
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location, hasConsented, preferences.tracking]);
  
  return trackingData;
}