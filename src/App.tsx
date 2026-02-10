import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Tradelines101 from "./pages/Tradelines101";
import CreditMonitoring from "./pages/CreditMonitoring";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Install from "./pages/Install";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Disclaimer from "./pages/Disclaimer";
import TradelinesForSale from "./pages/TradelinesForSale";
import BuyTradelines from "./pages/BuyTradelines";
import SeasonedTradelines from "./pages/SeasonedTradelines";
import NotFound from "./pages/NotFound";
import FloatingLeadButton from "@/components/FloatingLeadButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FloatingLeadButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tradelines-101" element={<Tradelines101 />} />
          <Route path="/credit-monitoring" element={<CreditMonitoring />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/install" element={<Install />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/tradelines-for-sale" element={<TradelinesForSale />} />
          <Route path="/buy-tradelines" element={<BuyTradelines />} />
          <Route path="/seasoned-tradelines" element={<SeasonedTradelines />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
