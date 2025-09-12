import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/pages/HomePage";
import CityPage from "@/pages/CityPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/cleaning/:city" component={CityPage} />
      {/* Service pages - todo: implement service page layouts */}
      {/* <Route path="/end-of-tenancy-cleaning" component={ServicePage} /> */}
      {/* <Route path="/commercial-cleaning" component={ServicePage} /> */}
      {/* <Route path="/deep-cleaning" component={ServicePage} /> */}
      {/* <Route path="/carpet-upholstery-cleaning" component={ServicePage} /> */}
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
