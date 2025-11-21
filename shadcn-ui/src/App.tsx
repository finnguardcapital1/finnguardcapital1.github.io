import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CookieConsent from './components/CookieConsent';
import { useEffect } from 'react';
import Index from './pages/Index';
import About from './pages/About';
import EMICalculator from './pages/EMICalculator';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { initGA, GA_TRACKING_ID } from './lib/analytics';
import { usePerformanceMonitoring } from './hooks/usePerformanceMonitoring';
import { preloadCriticalResources } from './components/PerformanceOptimizer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AppContent = () => {
  usePerformanceMonitoring();

  useEffect(() => {
    // Initialize Google Analytics
    if (GA_TRACKING_ID && !GA_TRACKING_ID.includes('XXXXXXXX')) {
      initGA();
    }
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Register service worker for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/emi-calculator" element={<EMICalculator />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <CookieConsent />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;