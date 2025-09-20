import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/lib/analytics';

// Hook to automatically track page views in SPA
export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);
  
  useEffect(() => {
    if (location !== prevLocationRef.current) {
      // Get page title for better tracking
      const pageTitle = document.title;
      trackPageView(location, pageTitle);
      prevLocationRef.current = location;
    }
  }, [location]);

  return { currentPath: location };
};