import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanType: '',
    message: ''
  });

  const handleWhatsAppContact = () => {
    const message = "Hi FiNNGUARD Capital! I'm interested in learning more about your loan services. Please provide me with more information.";
    window.open(`https://web.whatsapp.com/send?phone=919497544143&text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hi FiNNGUARD Capital! 

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Loan Type: ${formData.loanType}
Message: ${formData.message}

Please contact me regarding loan services.`;
    
    window.open(`https://web.whatsapp.com/send?phone=919497544143&text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <section className="py-16 px-4 bg-slate-50" id="contact">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
          <p className="text-xl text-slate-600">Ready to take the next step? Contact our loan experts today</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Office Address</h3>
                    <p className="text-slate-600 leading-relaxed">
                      17/557E, 2nd Floor, Jayamohan Building,<br />
                      Palappilly Road, Amballur,<br />
                      Thrissur, Kerala - 680302
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Phone Numbers</h3>
                    <p className="text-slate-600">+91 94975 44143</p>
                    <p className="text-slate-600">+91 97467 54690</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
                    <p className="text-slate-600">support@finnguardcapital.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Business Hours</h3>
                    <p className="text-slate-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-slate-600">Sunday: Closed</p>
                  </div>
                </div>

                <Button 
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Find Us on Map</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-80 rounded-b-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.5234567890123!2d76.2144!3d10.5276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDMxJzM5LjQiTiA3NsKwMTInNTEuOCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="FiNNGUARD Capital Office Location - Palappilly Road, Amballur, Thrissur, Kerala"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">Send Us a Message</CardTitle>
              <p className="text-slate-600">Fill out the form below and we'll get back to you within 24 hours</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanType">Loan Type</Label>
                    <select
                      id="loanType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.loanType}
                      onChange={(e) => setFormData({...formData, loanType: e.target.value})}
                    >
                      <option value="">Select loan type</option>
                      <option value="home">Home Loan</option>
                      <option value="car">Car Loan</option>
                      <option value="personal">Personal Loan</option>
                      <option value="business">Business Loan</option>
                      <option value="property">Loan Against Property</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your loan requirements..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  disabled={!formData.name || !formData.email || !formData.phone}
                >
                  Send Message via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}