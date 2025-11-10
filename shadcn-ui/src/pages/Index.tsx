import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, MessageCircle, Calculator } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import DocumentChecklist from '@/components/DocumentChecklist';
import LiveChat from '@/components/LiveChat';
import ConversionOptimizer from '@/components/ConversionOptimizer';
import { LazyStatsDashboard, OptimizedImage } from '@/components/PerformanceOptimizer';
import { trackPageView, trackWhatsAppClick, trackEvent } from '@/lib/analytics';
import ErrorBoundary from '@/components/ErrorBoundary';

const loanProducts = [
  {
    title: 'Business Loan',
    description: 'Fuel your business growth with competitive rates',
    rate: 'Starting from 10.5%',
    features: ['Quick Processing', 'Flexible Tenure', 'Minimal Documentation']
  },
  {
    title: 'Home Loan',
    description: 'Make your dream home a reality',
    rate: 'Starting from 8.5%',
    features: ['Low Interest Rates', 'Long Tenure Options', 'Easy EMI']
  },
  {
    title: 'Car Loan',
    description: 'Drive your dream car today',
    rate: 'Starting from 9.0%',
    features: ['Fast Approval', 'Competitive Rates', 'No Hidden Charges']
  },
  {
    title: 'Personal Loan',
    description: 'Quick funds for personal needs',
    rate: 'Starting from 11.5%',
    features: ['Instant Approval', 'No Collateral', 'Flexible Repayment']
  },
  {
    title: 'Loan Against Property',
    description: 'Unlock the value of your property',
    rate: 'Starting from 9.5%',
    features: ['High Loan Amount', 'Lower Interest', 'Tax Benefits']
  }
];

const features = [
  {
    icon: <CheckCircle className="w-8 h-8 text-yellow-500" />,
    title: 'Low Interest Rates',
    description: 'Competitive rates starting from 8.5%* per annum'
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-yellow-500" />,
    title: 'Quick Approval',
    description: 'Get quick approvals for your application'
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-yellow-500" />,
    title: 'Flexible Repayment',
    description: 'Choose from flexible repayment plans offered'
  }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('/', 'Home - FiNNGUARD Capital');
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % loanProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppContact = () => {
    trackWhatsAppClick('header_button');
    const message = "Hi FiNNGUARD Capital! I'm interested in learning more about your loan services. Please provide me with more information.";
    window.open(`https://web.whatsapp.com/send?phone=919497544143&text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEMICalculator = () => {
    trackEvent('button_click', 'navigation', 'emi_calculator_hero');
    navigate('/emi-calculator');
  };

  const handleApplyNow = () => {
    trackEvent('button_click', 'cta', 'apply_now_hero');
    handleWhatsAppContact();
  };

  return (
    <>
      <Helmet>
        <title>FiNNGUARD Capital - Best Loan Services in Thrissur, Kerala | Home, Car, Personal & Business Loans</title>
        <meta name="description" content="FiNNGUARD Capital offers competitive loan services in Thrissur, Kerala. Get home loans from 8.5%, car loans, personal loans, and business loans with quick approval. Your trusted finance partner." />
        <meta name="keywords" content="loan services Thrissur, home loan Kerala, car loan Thrissur, personal loan, business loan, FiNNGUARD Capital, finance company Kerala, loan provider Thrissur" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="FiNNGUARD Capital" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="FiNNGUARD Capital - Best Loan Services in Thrissur, Kerala" />
        <meta property="og:description" content="Get competitive home loans, car loans, personal loans & business loans in Thrissur. Quick approval, low interest rates starting from 8.5%." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://finnguardcapital.com" />
        <meta property="og:site_name" content="FiNNGUARD Capital" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiNNGUARD Capital - Loan Services Thrissur" />
        <meta name="twitter:description" content="Professional loan services in Thrissur, Kerala. Home loans, car loans, personal loans with competitive rates." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://finnguardcapital.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/assets/herobanner_variant_1.png" as="image" />
        <link rel="preload" href="/assets/logo.png" as="image" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "FiNNGUARD Capital",
            "alternateName": "FiNNGUARD",
            "description": "Professional loan services provider in Thrissur, Kerala offering home loans, car loans, personal loans, and business loans with competitive interest rates",
            "url": "https://finnguardcapital.com",
            "logo": "https://finnguardcapital.com/assets/logo.png",
            "telephone": "+91-94975-44143",
            "email": "support@finnguardcapital.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "17/557E, 2nd Floor, Jayamohan Building, Palappilly Road",
              "addressLocality": "Amballur",
              "addressRegion": "Thrissur",
              "postalCode": "680302",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "10.5276",
              "longitude": "76.2144"
            },
            "openingHours": "Mo-Sa 09:00-19:00",
            "priceRange": "$$",
            "serviceArea": {
              "@type": "State",
              "name": "Kerala"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Loan Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Home Loan",
                    "description": "Competitive home loan rates starting from 8.5% per annum"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Car Loan",
                    "description": "Quick car loan approval with attractive interest rates"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Personal Loan",
                    "description": "Instant personal loans for your immediate financial needs"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Business Loan", 
                    "description": "Business loans to fuel your company's growth and expansion"
                  }
                }
              ]
            },
            "sameAs": [
              "https://www.facebook.com/finnguardcapital",
              "https://www.instagram.com/finnguardcapital"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <OptimizedImage 
                src="/assets/logo_variant_1.png" 
                alt="FiNNGUARD Capital - Professional Loan Services Provider" 
                className="h-12"
                width={48}
                height={48}
              />
            </div>
            <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
              <Link to="/" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors" aria-current="page">Home</Link>
              <Link to="/about" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">About Us</Link>
              <Link to="/emi-calculator" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">EMI Calculator</Link>
              <Link to="/contact" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Contact</Link>
            </nav>
            <Button onClick={handleWhatsAppContact} className="bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-white/30"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/herobanner.png)' }}
          ></div>
          <div className="relative z-10 container mx-auto">
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <OptimizedImage 
                src="/assets/logo-alt.png" 
                alt="FiNNGUARD Capital Logo" 
                className="h-20 mx-auto mb-6"
                width={80}
                height={80}
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Your Trusted Finance Partner
            </h1>
            <p className="text-xl md:text-2xl text-black/90 mb-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              Simplified loan solutions for all your financial needs in Thrissur, Kerala
            </p>
            <p className="text-lg text-orange-600 font-semibold mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
              Your Financial Goals, Our Commitment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-3"
                onClick={handleEMICalculator}
              >
                <Calculator className="ml-2 w-5 h-5 mr-2" />
                Calculate EMI
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-8 py-3"
                onClick={handleApplyNow}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </section>

        {/* Statistics Dashboard with Error Boundary */}
        <ErrorBoundary fallback={<div className="py-16 text-center">Loading statistics...</div>}>
          <LazyStatsDashboard />
        </ErrorBoundary>

        {/* Loan Products Cards */}
        <section className="py-16 px-4" aria-labelledby="loan-products-heading">
          <div className="container mx-auto">
            <h2 id="loan-products-heading" className="text-4xl font-bold text-center text-slate-800 mb-12">Our Loan Products</h2>
            <div className="relative max-w-7xl mx-auto">
              <div className="min-h-[400px]">
                {loanProducts.map((product, index) => (
                  <div
                    key={index}
                    className={`transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                  >
                    <Card className="overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white">
                      <CardContent className="p-8 md:p-12">
                        <div className="text-center space-y-6">
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{product.title}</h3>
                          <p className="text-lg md:text-xl lg:text-2xl text-slate-200 leading-relaxed max-w-2xl mx-auto">{product.description}</p>
                          <Badge className="bg-yellow-500 text-slate-900 text-lg font-semibold px-6 py-3">
                            {product.rate}
                          </Badge>
                          
                          {/* Features */}
                          <div className="flex flex-wrap justify-center gap-4 mt-6">
                            {product.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-white border-white/30 px-4 py-2">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="pt-4">
                            <Link to="/contact">
                              <Button 
                                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold text-lg px-8 py-3 transition-all duration-200 hover:scale-105"
                                onClick={() => trackEvent('button_click', 'cta', `apply_now_${product.title.toLowerCase().replace(' ', '_')}`)}
                              >
                                Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6 space-x-3" role="tablist" aria-label="Loan product slides">
                {loanProducts.map((product, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      trackEvent('carousel_navigation', 'interaction', product.title);
                    }}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-200 ${
                      index === currentSlide 
                        ? 'bg-yellow-500 scale-125' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`View ${product.title} details`}
                    role="tab"
                    aria-selected={index === currentSlide}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-slate-100" aria-labelledby="features-heading">
          <div className="container mx-auto">
            <h2 id="features-heading" className="text-4xl font-bold text-center text-slate-800 mb-12">Why Choose FiNNGUARD?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-4 text-slate-800">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ErrorBoundary>
          <DocumentChecklist />
        </ErrorBoundary>

        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>

        <ErrorBoundary>
          <FAQ />
        </ErrorBoundary>

        {/* Enhanced CTA Section with Conversion Optimizer */}
        <section className="py-16 px-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-slate-200">Contact us today for personalized loan solutions</p>
            
            <ErrorBoundary>
              <ConversionOptimizer />
            </ErrorBoundary>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <OptimizedImage 
                  src="/assets/logo_variant_2.png" 
                  alt="FiNNGUARD Capital Logo" 
                  className="h-12 mb-4"
                  width={48}
                  height={48}
                />
                <p className="text-slate-300 mb-4">Your Financial Goals, Our Commitment</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <nav className="space-y-2" aria-label="Footer navigation">
                  <Link to="/" className="block text-slate-300 hover:text-yellow-400 transition-colors">Home</Link>
                  <Link to="/about" className="block text-slate-300 hover:text-yellow-400 transition-colors">About Us</Link>
                  <Link to="/emi-calculator" className="block text-slate-300 hover:text-yellow-400 transition-colors">EMI Calculator</Link>
                  <Link to="/contact" className="block text-slate-300 hover:text-yellow-400 transition-colors">Contact</Link>
                </nav>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-1 text-yellow-400" />
                    <address className="not-italic">
                      17/557E, 2nd Floor, Jayamohan Building,<br />
                      Palappilly Road, Amballur, Thrissur, Kerala - 680302
                    </address>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <div>
                      <a href="tel:+919497544143" className="hover:text-yellow-400">+91 94975 44143</a>,{' '}
                      <a href="tel:+919746754690" className="hover:text-yellow-400">+91 97467 54690</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-yellow-400" />
                    <a href="mailto:support@finnguardcapital.com" className="hover:text-yellow-400">support@finnguardcapital.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2025 FiNNGUARD CAPITAL | www.finnguardcapital.com</p>
            </div>
          </div>
        </footer>

        <ErrorBoundary>
          <LiveChat />
        </ErrorBoundary>
      </div>
    </>
  );
}