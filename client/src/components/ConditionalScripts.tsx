import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function ConditionalScripts() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Check if current page is a Newcastle page
    const isNewcastlePage = location.toLowerCase().includes('newcastle');
    
    if (isNewcastlePage) {
      // Only add CallRail script to Newcastle pages
      const existingScript = document.querySelector('script[src*="callrail.com"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//cdn.callrail.com/companies/570100588/bf305e1b49cc4ec9ae18/12/swap.js';
        script.async = true;
        
        // Add before closing body tag
        document.body.appendChild(script);
        
        console.log('CallRail dynamic number insertion loaded for Newcastle page:', location);
      }
    }
  }, [location]);

  return null; // This component doesn't render anything
}