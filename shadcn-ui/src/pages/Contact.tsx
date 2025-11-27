import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { openWhatsApp, telHref, TEL_NUMBER } from '@/lib/contact';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `Hi FiNNGUARD Capital! 

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Loan Type: ${formData.loanType}
Message: ${formData.message}

Please contact me regarding loan services.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    openWhatsApp(whatsappMessage);
  };

  const handleWhatsAppContact = () => {
    const message = "Hi FiNNGUARD Capital! I'm interested in learning more about your loan services. Please provide me with more information.";
    openWhatsApp(message);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - FiNNGUARD Capital | Loan Services in Thrissur, Kerala</title>
        <meta name="description" content="Contact FiNNGUARD Capital for loan services in Thrissur, Kerala. Visit our office at Amballur or call +91 94975 44143 for home loans, car loans, personal loans." />
        <meta name="keywords" content="contact FiNNGUARD Capital, loan services Thrissur, office address Amballur, phone number, email contact" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img src="/assets/logo.png" alt="FiNNGUARD Capital" className="h-12" />
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">About Us</Link>
              <Link to="/emi-calculator" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">EMI Calculator</Link>
              <Link to="/contact" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors" aria-current="page">Contact</Link>
            </nav>
            <Button onClick={handleWhatsAppContact} className="bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
            <p className="text-xl text-slate-600">Get in touch with our loan experts</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="loanType">Loan Type</Label>
                    <Select value={formData.loanType} onValueChange={(value) => setFormData(prev => ({ ...prev, loanType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home-loan">Home Loan</SelectItem>
                        <SelectItem value="car-loan">Car Loan</SelectItem>
                        <SelectItem value="personal-loan">Personal Loan</SelectItem>
                        <SelectItem value="business-loan">Business Loan</SelectItem>
                        <SelectItem value="property-loan">Loan Against Property</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your loan requirements..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Visit Our Office</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">Office Address</h3>
                      <address className="text-slate-600 not-italic leading-relaxed">
                        17/557E, 2nd Floor, Jayamohan Building,<br />
                        Palappilly Road, Amballur,<br />
                        Thrissur, Kerala - 680302
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">Phone Numbers</h3>
                      <div className="space-y-1">
                        <a href={telHref()} className="block text-slate-600 hover:text-blue-600">
                          {TEL_NUMBER}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">Email</h3>
                      <a href="mailto:support@finnguardcapital.com" className="text-slate-600 hover:text-blue-600">
                        support@finnguardcapital.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">Business Hours</h3>
                      <div className="text-slate-600 space-y-1">
                        <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleWhatsAppContact}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                  
                  <Link to="/emi-calculator" className="block">
                    <Button variant="outline" className="w-full">
                      Calculate EMI
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Find Us on Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9876543210987!2d76.269222!3d10.432333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDI1JzU2LjQiTiA3NsKwMTYnMDkuMiJF!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="FiNNGUARD Capital Office Location"
                  ></iframe>
                </div>
                <p className="text-sm text-slate-600 mt-4">
                  Our office is conveniently located in Amballur, Thrissur. We're easily accessible by public transport and have parking facilities available.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 px-4 mt-16">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <img src="/assets/logo.png" alt="FiNNGUARD Capital" className="h-12 mb-4" />
                <p className="text-slate-300 mb-4">Your Financial Goals, Our Commitment</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link to="/" className="block text-slate-300 hover:text-yellow-400 transition-colors">Home</Link>
                  <Link to="/about" className="block text-slate-300 hover:text-yellow-400 transition-colors">About Us</Link>
                  <Link to="/emi-calculator" className="block text-slate-300 hover:text-yellow-400 transition-colors">EMI Calculator</Link>
                  <Link to="/contact" className="block text-slate-300 hover:text-yellow-400 transition-colors">Contact</Link>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <div className="space-y-2 text-slate-300">
                  <address className="not-italic">
                    17/557E, 2nd Floor, Jayamohan Building,<br />
                    Palappilly Road, Amballur,<br />
                    Thrissur, Kerala - 680302
                  </address>
                  <p>Phone: +91 94975 44143, +91 97467 54690</p>
                  <p>Email: support@finnguardcapital.com</p>
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