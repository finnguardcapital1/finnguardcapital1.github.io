import { Link } from "react-router-dom";
import { telHref, TEL_NUMBER, openWhatsApp } from "@/lib/contact";
import { MessageCircle } from "lucide-react";

export default function Contact() {
  const handleWhatsAppContact = () => {
    const message = "Hi FiNNGUARD Capital! I'm interested in learning more about your loan services. Please provide me with more information.";
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/assets/logo.png" alt="FiNNGUARD Capital" className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">About Us</Link>
            <Link to="/emi-calculator" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">EMI Calculator</Link>
            <Link to="/contact" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors" aria-current="page">Contact</Link>
          </nav>
          <button onClick={handleWhatsAppContact} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 flex items-center">
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </button>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
        <div className="space-y-3 text-slate-700">
          <div>Phone: <a href={telHref()} className="text-blue-600">{TEL_NUMBER}</a></div>
          <div>Email: <a href="mailto:support@finnguardcapital.com" className="text-blue-600">support@finnguardcapital.com</a></div>
        </div>
      </div>
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img src="/assets/logo.png" alt="FiNNGUARD Capital" className="h-12 w-auto mb-4" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
