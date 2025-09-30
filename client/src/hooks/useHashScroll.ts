import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Hook to handle smooth scrolling to sections when URL contains a hash fragment
 * Supports URLs like /#quote, /#services, /#areas, etc.
 */
export function useHashScroll() {
  const [location] = useLocation();

  useEffect(() => {
    // Extract hash from current URL
    const hash = window.location.hash;
    
    if (hash) {
      // Remove the # symbol
      const id = hash.substring(1);
      
      // Find the element with matching ID
      const element = document.getElementById(id);
      
      if (element) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location]);
}
