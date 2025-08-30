import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import BusinessDetails from "./pages/BusinessDetails";
import Pricing from "./pages/Pricing";
import PlatformSelection from "./pages/PlatformSelection";
import CampaignSetup from "./pages/CampaignSetup";
import Loading from "./components/Loading";
import AdSets from "./pages/AdSets";
import FinalPayment from "./pages/FinalPayment";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/business-details" element={<BusinessDetails />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/platform-selection" element={<PlatformSelection />} />
            <Route path="/campaign-setup" element={<CampaignSetup />} />
            <Route path="/loading" element={<Loading redirectTo="/ad-sets" />} />
            <Route path="/ad-sets" element={<AdSets />} />
            <Route path="/final-payment" element={<FinalPayment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
