import { useEffect } from 'react';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
          // Track LCP in analytics
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              event_category: 'performance',
              event_label: 'LCP',
              value: Math.round(entry.startTime),
            });
          }
        }
        
        if (entry.entryType === 'first-input') {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
          // Track FID in analytics
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              event_category: 'performance',
              event_label: 'FID',
              value: Math.round((entry as any).processingStart - entry.startTime),
            });
          }
        }
        
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          console.log('CLS:', (entry as any).value);
          // Track CLS in analytics
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vitals', {
              event_category: 'performance',
              event_label: 'CLS',
              value: Math.round((entry as any).value * 1000),
            });
          }
        }
      }
    });

    // Observe performance entries
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    return () => observer.disconnect();
  }, []);

  // Monitor page load performance
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        
        console.log('Page Load Time:', loadTime);
        console.log('DOM Content Loaded:', domContentLoaded);
        
        // Track in analytics
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'page_timing', {
            event_category: 'performance',
            event_label: 'load_time',
            value: Math.round(loadTime),
          });
        }
      }, 0);
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);
};