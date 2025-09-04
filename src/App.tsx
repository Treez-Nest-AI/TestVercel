import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes - no authentication required */}
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/signin" element={<SignIn />} />
            
            {/* Protected routes - authentication required */}
            <Route path="/business-details" element={
              <ProtectedRoute requireAuth={true}>
                <BusinessDetails />
              </ProtectedRoute>
            } />
            <Route path="/campaign-setup" element={
              <ProtectedRoute requireAuth={true}>
                <CampaignSetup />
              </ProtectedRoute>
            } />
            <Route path="/pricing" element={
              <ProtectedRoute requireAuth={true}>
                <Pricing />
              </ProtectedRoute>
            } />
            <Route path="/platform-selection" element={
              <ProtectedRoute requireAuth={true}>
                <PlatformSelection />
              </ProtectedRoute>
            } />
            <Route path="/loading" element={
              <ProtectedRoute requireAuth={true}>
                <Loading />
              </ProtectedRoute>
            } />
            <Route path="/ad-sets" element={
              <ProtectedRoute requireAuth={true}>
                <AdSets />
              </ProtectedRoute>
            } />
            <Route path="/final-payment" element={
              <ProtectedRoute requireAuth={true}>
                <FinalPayment />
              </ProtectedRoute>
            } />
            <Route path="/success" element={
              <ProtectedRoute requireAuth={true}>
                <Success />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute requireAuth={true}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </PersistGate>
  </Provider>
);

export default App;
