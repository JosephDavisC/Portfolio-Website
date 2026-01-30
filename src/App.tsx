import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollProgress from "@/components/shared/ScrollProgress";
import ScrollToTop from "@/components/shared/ScrollToTop";
import ScrollUpButton from "@/components/shared/ScrollUpButton";
import EasterEggs from "@/components/shared/EasterEggs";

// Eagerly load the main landing page for fast initial load
import Index from "./pages/Index";

// Lazy load non-critical pages to reduce initial bundle size
const NotFound = React.lazy(() => import("./pages/NotFound"));
const CredentialPage = React.lazy(() => import("./pages/CredentialPage"));
const ArticlePage = React.lazy(() => import("./pages/ArticlePage"));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage"));
const SeoDocs = React.lazy(() => import("./pages/SeoDocs"));
const InternshipPage = React.lazy(() => import("./pages/InternshipPage"));

// Loading fallback for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-[#141B2D]">
    <div className="animate-pulse text-espresso/60 dark:text-slate-400 font-mono">Loading...</div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <ScrollProgress />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense>} />
              <Route path="/credential/:slug" element={<Suspense fallback={<PageLoader />}><CredentialPage /></Suspense>} />
              <Route path="/blog/:slug" element={<Suspense fallback={<PageLoader />}><ArticlePage /></Suspense>} />
              <Route path="/experience/:slug" element={<Suspense fallback={<PageLoader />}><InternshipPage /></Suspense>} />
              <Route path="/seo-docs" element={<Suspense fallback={<PageLoader />}><SeoDocs /></Suspense>} />
              <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
            </Routes>

            <ScrollUpButton />
            <EasterEggs />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
