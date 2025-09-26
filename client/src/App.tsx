import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConsentProvider } from "@/contexts/ConsentContext";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { useEffect } from "react";
import { initAnalytics, initGA4Direct } from "@/lib/analytics";
import { useAnalytics } from "@/hooks/use-analytics";
import { useConsent } from "@/contexts/ConsentContext";
import { initializeCallTracking } from "@/lib/callTracking";
import HomePage from "@/pages/HomePage";
import CityPage from "@/pages/CityPage";
import AreasPage from "@/pages/AreasPage";
import AboutPage from "@/pages/AboutPage";
import QuotePage from "@/pages/QuotePage";
import ReviewsPage from "@/pages/ReviewsPage";
import InsurancePage from "@/pages/InsurancePage";
import GuaranteePage from "@/pages/GuaranteePage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import ComplaintsPage from "@/pages/ComplaintsPage";
import AdminPage from "@/pages/AdminPage";
import EndOfTenancyPage from "@/pages/EndOfTenancyPage";
import EndOfTenancyNewcastlePage from "@/pages/EndOfTenancyNewcastlePage";
import CommercialCleaningPage from "@/pages/CommercialCleaningPage";
import DeepCleaningPage from "@/pages/DeepCleaningPage";
import CarpetUpholsteryPage from "@/pages/CarpetUpholsteryPage";
import { ServiceLocationRouter } from "@/routes/ServiceLocationRouter";
import NotFound from "@/pages/not-found";

function Router() {
  // Track page views for SPA navigation
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/areas" component={AreasPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/cleaning/:city" component={CityPage} />
      {/* Additional pages */}
      <Route path="/quote" component={QuotePage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route path="/insurance" component={InsurancePage} />
      <Route path="/guarantee" component={GuaranteePage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/complaints" component={ComplaintsPage} />
      <Route path="/admin" component={AdminPage} />
      {/* Service pages */}
      <Route path="/end-of-tenancy-cleaning" component={EndOfTenancyPage} />
      <Route path="/end-of-tenancy-cleaning-newcastle" component={EndOfTenancyNewcastlePage} />
      <Route path="/commercial-cleaning" component={CommercialCleaningPage} />
      <Route path="/deep-cleaning" component={DeepCleaningPage} />
      <Route path="/carpet-upholstery-cleaning" component={CarpetUpholsteryPage} />
      {/* Generated Service-Location Routes */}
      <ServiceLocationRouter />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { preferences, hasConsented } = useConsent();

  // Initialize analytics when app loads and user has consented
  useEffect(() => {
    const gtmId = import.meta.env.VITE_GTM_ID || 'GTM-W4MWH6F3';
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if (!gtmId && !gaId) {
      console.warn('Analytics not configured. Add VITE_GTM_ID or VITE_GA_MEASUREMENT_ID to environment variables.');
      return;
    }

    // Only initialize analytics if user has consented to analytics/marketing
    const analyticsConsent = hasConsented && (preferences.analytics || preferences.marketing);
    initAnalytics(analyticsConsent, gtmId);

    // Also initialize direct GA4 if measurement ID provided
    if (gaId && analyticsConsent) {
      initGA4Direct(gaId);
    }
  }, [hasConsented, preferences]);

  // Initialize dynamic call tracking with city/service-based numbers
  useEffect(() => {
    const callTrackingConfig = {
      fallbackNumber: '03300432115',
      trackingNumbers: {
        'newcastle-upon-tyne_end-of-tenancy': '0191 743 9585',
        'newcastle-upon-tyne_deep': '0191 743 9585', 
        'newcastle-upon-tyne_commercial': '0191 743 9585',
        'newcastle-upon-tyne_carpet': '0191 743 9585',
        'sunderland_end-of-tenancy': '0191 743 9585',
        'sunderland_deep': '0191 743 9585',
        'middlesbrough_end-of-tenancy': '03300432115',
        'durham_end-of-tenancy': '0191 743 9585',
        'gateshead_end-of-tenancy': '0191 743 9585',
        // City-level defaults
        'newcastle-upon-tyne': '0191 743 9585',
        'sunderland': '0191 743 9585',
        'middlesbrough': '03300432115',
        'durham': '0191 743 9585',
        'gateshead': '0191 743 9585',
        'default': '03300432115'
      }
    };
    
    initializeCallTracking(callTrackingConfig);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ConsentProvider>
          <Toaster />
          <Router />
          <CookieConsentBanner />
        </ConsentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
