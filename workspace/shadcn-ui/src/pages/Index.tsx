import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calculator, MessageCircle, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { trackPageView, trackEvent } from "@/lib/analytics";
import { openWhatsApp, telHref, TEL_NUMBER } from "@/lib/contact";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => { trackPageView("/", "Home - FiNNGUARD Capital"); }, []);

  const handleWhatsAppContact = () => {
    const message = "Hi FiNNGUARD Capital! I'm interested in learning more about your loan services. Please provide me with more information.";
    openWhatsApp(message);
  };

  const handleEMICalculator = () => { trackEvent("button_click", "navigation", "emi_calculator_hero"); navigate("/emi-calculator"); };
  const handleApplyNow = () => { trackEvent("button_click", "cta", "apply_now_hero"); handleWhatsAppContact(); };

  return (
    <>
      <Helmet>
        <title>FiNNGUARD Capital - Best Loan Services in Thrissur, Kerala | Home, Car, Personal & Business Loans</title>
        <link rel="canonical" href="https://www.finnguardcapital.com" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="/assets/logo.png?v=1" alt="FiNNGUARD Capital" className="h-12 w-auto" />
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
        <section className="relative py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/herobanner.png)' }}></div>
          <div className="relative z-10 container mx-auto">
            <div className="mb-8">
              <img src="/assets/logo_alt.png?v=1" alt="FiNNGUARD Capital" className="h-20 w-auto mx-auto mb-6" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">Your Trusted Finance Partner</h1>
            <p className="text-xl md:text-2xl text-black/90 mb-4">Simplified loan solutions for all your financial needs in Thrissur, Kerala</p>
            <p className="text-lg text-orange-600 font-semibold mb-8">Your Financial Goals, Our Commitment</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-3" onClick={handleEMICalculator}>
                <Calculator className="ml-2 w-5 h-5 mr-2" />
                Calculate EMI
              </Button>
              <Button size="lg" variant="outline" className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-8 py-3" onClick={handleApplyNow}>
                Apply Now
              </Button>
            </div>
          </div>
        </section>
        <footer className="bg-slate-900 text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <img src="/assets/logo.png?v=1" alt="FiNNGUARD Capital" className="h-12 w-auto mb-4" />
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
                    <address className="not-italic">17/557E, 2nd Floor, Jayamohan Building,<br />Palappilly Road, Amballur, Thrissur, Kerala - 680302</address>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <div>
                      <a href={telHref()} className="hover:text-yellow-400">{TEL_NUMBER}</a>
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
      </div>
    </>
  );
}
