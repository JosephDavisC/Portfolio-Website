import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollProgress from "@/components/shared/ScrollProgress";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ScrollUpButton from "@/components/shared/ScrollUpButton";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CredentialPage from "./pages/CredentialPage";
import ArticlePage from "./pages/ArticlePage";
import ProjectsPage from "./pages/ProjectsPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <ScrollProgress />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/credential/:slug" element={<CredentialPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ScrollUpButton />
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
