import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import EndOfTenancyPage from "@/pages/EndOfTenancyPage";
import CommercialCleaningPage from "@/pages/CommercialCleaningPage";
import DeepCleaningPage from "@/pages/DeepCleaningPage";
import CarpetUpholsteryPage from "@/pages/CarpetUpholsteryPage";
import NotFound from "@/pages/not-found";

function Router() {
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
      {/* Service pages */}
      <Route path="/end-of-tenancy-cleaning" component={EndOfTenancyPage} />
      <Route path="/commercial-cleaning" component={CommercialCleaningPage} />
      <Route path="/deep-cleaning" component={DeepCleaningPage} />
      <Route path="/carpet-upholstery-cleaning" component={CarpetUpholsteryPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
