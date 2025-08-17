import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollUpButton from "@/components/ScrollUpButton";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CredentialPage from "./pages/CredentialPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* new pages start at the top */}
        <ScrollToTop />
        {/* thin progress bar at top */}
        <ScrollProgress />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/credential/:slug" element={<CredentialPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* 👇 floating “back to top” arrow on every page */}
        <ScrollUpButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
