// Google Analytics 4 implementation
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID

// Initialize Google Analytics
export const initGA = () => {
  // Load GA4 script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
      page_title: title,
    });
  }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track conversions
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', 'loan_application', conversionType, value);
  
  // Track specific conversion events
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'generate_lead', {
      currency: 'INR',
      value: value || 0,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submit', 'engagement', formType);
};

// Track EMI calculations
export const trackEMICalculation = (loanAmount: number, interestRate: number, tenure: number) => {
  trackEvent('emi_calculation', 'tools', 'calculator_used', loanAmount);
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', 'contact', source);
};

// Track phone calls
export const trackPhoneCall = (source: string) => {
  trackEvent('phone_call', 'contact', source);
};