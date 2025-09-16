// React hook for accessing CallRail tracking numbers
// Provides tracking phone numbers based on current route, campaign parameters, and session

import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { getLocationContactDetails } from '@shared/location-utils';
import type { TrackingMetadata } from '@shared/callrail-config';

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
  const [trackingData, setTrackingData] = useState<TrackingNumbers>({
    phone: '0191 743 6925', // Default fallback while loading - updated to new Tyne & Wear number
    whatsapp: '447380991629',
    location: null,
    region: null,
    trackingMetadata: {
      selectedNumber: '0191 743 6925',
      ruleType: 'global',
      timestamp: Date.now()
    },
    isLoading: true
  });
  
  useEffect(() => {
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
        ruleType: contactDetails.trackingMetadata.ruleType
      });
    }
  }, [location]); // Re-run when route changes
  
  // Also listen for URL parameter changes (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
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
  }, [location]);
  
  return trackingData;
}