import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MessageCircle, Calendar, Clock, CheckCircle, TrendingUp } from 'lucide-react';

interface ConversionEvent {
  type: 'whatsapp' | 'callback' | 'email' | 'form_submit';
  timestamp: string;
  data: any;
  variant?: string;
}

interface ABTestVariant {
  id: string;
  name: string;
  ctaText: string;
  ctaColor: string;
  message: string;
  weight: number;
}

export default function ConversionOptimizer() {
  const [selectedVariant, setSelectedVariant] = useState<ABTestVariant | null>(null);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [callbackData, setCallbackData] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    loanType: '',
    urgency: 'medium'
  });
  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    loanType: ''
  });

  // A/B Test Variants for CTAs
  const abTestVariants: ABTestVariant[] = [
    {
      id: 'variant_a',
      name: 'Direct WhatsApp',
      ctaText: 'Chat on WhatsApp',
      ctaColor: 'bg-green-600 hover:bg-green-700',
      message: 'Hi! I\'m interested in your loan services. Please help me.',
      weight: 40
    },
    {
      id: 'variant_b',
      name: 'Urgent Action',
      ctaText: 'Get Instant Quote',
      ctaColor: 'bg-red-600 hover:bg-red-700',
      message: 'I need an urgent loan quote. Please contact me immediately.',
      weight: 30
    },
    {
      id: 'variant_c',
      name: 'Professional Tone',
      ctaText: 'Request Consultation',
      ctaColor: 'bg-blue-600 hover:bg-blue-700',
      message: 'I would like to schedule a consultation for loan services.',
      weight: 30
    }
  ];

  // Select variant based on weights (A/B testing)
  useEffect(() => {
    const selectVariant = () => {
      const random = Math.random() * 100;
      let cumulative = 0;
      
      for (const variant of abTestVariants) {
        cumulative += variant.weight;
        if (random <= cumulative) {
          setSelectedVariant(variant);
          break;
        }
      }
    };

    selectVariant();
  }, []);

  // Track conversion events
  const trackConversion = (event: ConversionEvent) => {
    // Store conversion data for analytics
    const conversions = JSON.parse(localStorage.getItem('conversions') || '[]');
    conversions.push({
      ...event,
      variant: selectedVariant?.id,
      sessionId: sessionStorage.getItem('sessionId') || 'unknown'
    });
    localStorage.setItem('conversions', JSON.stringify(conversions));

    // In real implementation, send to analytics service
    console.log('Conversion tracked:', event);
  };

  const handleWhatsAppClick = () => {
    const message = selectedVariant?.message || 'Hi! I\'m interested in your loan services.';
    window.open(`https://wa.me/919497544143?text=${encodeURIComponent(message)}`, '_blank');
    
    trackConversion({
      type: 'whatsapp',
      timestamp: new Date().toISOString(),
      data: { variant: selectedVariant?.id, message }
    });
  };

  const handleCallbackRequest = () => {
    const message = `📞 *Callback Request - FiNNGUARD Capital*

👤 *Contact Details:*
• Name: ${callbackData.name}
• Phone: ${callbackData.phone}
• Preferred Time: ${callbackData.preferredTime}

💰 *Loan Interest:*
• Loan Type: ${callbackData.loanType}
• Urgency: ${callbackData.urgency}

Please call me back at the preferred time. Thank you!`;

    window.open(`https://wa.me/919497544143?text=${encodeURIComponent(message)}`, '_blank');
    
    trackConversion({
      type: 'callback',
      timestamp: new Date().toISOString(),
      data: callbackData
    });

    setShowCallbackForm(false);
    setCallbackData({ name: '', phone: '', preferredTime: '', loanType: '', urgency: 'medium' });
  };

  const handleEmailSubmit = () => {
    // Create email content
    const emailContent = `
Subject: ${emailData.subject}

Dear FiNNGUARD Capital Team,

${emailData.message}

Loan Type of Interest: ${emailData.loanType}

Best regards,
${emailData.name}
Email: ${emailData.email}
    `;

    // For now, redirect to email client
    const mailtoLink = `mailto:support@finnguardcapital.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailContent)}`;
    window.open(mailtoLink);

    trackConversion({
      type: 'email',
      timestamp: new Date().toISOString(),
      data: emailData
    });

    setShowEmailForm(false);
    setEmailData({ name: '', email: '', subject: '', message: '', loanType: '' });
  };

  if (!selectedVariant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Primary CTA with A/B Testing */}
      <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Get Your Loan?</h3>
            <p className="text-slate-600 mb-4">Choose your preferred way to connect with us</p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {/* Primary CTA (A/B Tested) */}
              <Button 
                onClick={handleWhatsAppClick}
                className={`${selectedVariant.ctaColor} text-white font-semibold px-6 py-3`}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {selectedVariant.ctaText}
              </Button>

              {/* Secondary CTAs */}
              <Button 
                variant="outline"
                onClick={() => setShowCallbackForm(true)}
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Phone className="w-4 h-4 mr-2" />
                Request Callback
              </Button>

              <Button 
                variant="outline"
                onClick={() => setShowEmailForm(true)}
                className="border-slate-600 text-slate-600 hover:bg-slate-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>

            {/* Variant indicator (for testing purposes) */}
            <div className="mt-3">
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Variant: {selectedVariant.name}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Callback Request Form Modal */}
      {showCallbackForm && (
        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                Request a Callback
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowCallbackForm(false)}
              >
                ✕
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cb-name">Your Name *</Label>
                <Input
                  id="cb-name"
                  value={callbackData.name}
                  onChange={(e) => setCallbackData(prev => ({...prev, name: e.target.value}))}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="cb-phone">Phone Number *</Label>
                <Input
                  id="cb-phone"
                  value={callbackData.phone}
                  onChange={(e) => setCallbackData(prev => ({...prev, phone: e.target.value}))}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label>Preferred Call Time</Label>
                <Select value={callbackData.preferredTime} onValueChange={(value) => setCallbackData(prev => ({...prev, preferredTime: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9AM-12PM">9 AM - 12 PM</SelectItem>
                    <SelectItem value="12PM-3PM">12 PM - 3 PM</SelectItem>
                    <SelectItem value="3PM-6PM">3 PM - 6 PM</SelectItem>
                    <SelectItem value="6PM-8PM">6 PM - 8 PM</SelectItem>
                    <SelectItem value="Anytime">Anytime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Loan Type</Label>
                <Select value={callbackData.loanType} onValueChange={(value) => setCallbackData(prev => ({...prev, loanType: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home Loan">Home Loan</SelectItem>
                    <SelectItem value="Car Loan">Car Loan</SelectItem>
                    <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                    <SelectItem value="Business Loan">Business Loan</SelectItem>
                    <SelectItem value="Loan Against Property">Loan Against Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Urgency</Label>
                <Select value={callbackData.urgency} onValueChange={(value) => setCallbackData(prev => ({...prev, urgency: value}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Urgent (Today)</SelectItem>
                    <SelectItem value="medium">This Week</SelectItem>
                    <SelectItem value="low">No Rush</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                onClick={handleCallbackRequest}
                disabled={!callbackData.name || !callbackData.phone}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Callback
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowCallbackForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Email Form Modal */}
      {showEmailForm && (
        <Card className="border-2 border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Mail className="w-5 h-5 mr-2 text-slate-600" />
                Send us an Email
              </h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowEmailForm(false)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email-name">Your Name *</Label>
                  <Input
                    id="email-name"
                    value={emailData.name}
                    onChange={(e) => setEmailData(prev => ({...prev, name: e.target.value}))}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email-email">Email Address *</Label>
                  <Input
                    id="email-email"
                    type="email"
                    value={emailData.email}
                    onChange={(e) => setEmailData(prev => ({...prev, email: e.target.value}))}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email-subject">Subject *</Label>
                  <Input
                    id="email-subject"
                    value={emailData.subject}
                    onChange={(e) => setEmailData(prev => ({...prev, subject: e.target.value}))}
                    placeholder="Email subject"
                  />
                </div>
                <div>
                  <Label>Loan Type</Label>
                  <Select value={emailData.loanType} onValueChange={(value) => setEmailData(prev => ({...prev, loanType: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home Loan">Home Loan</SelectItem>
                      <SelectItem value="Car Loan">Car Loan</SelectItem>
                      <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                      <SelectItem value="Business Loan">Business Loan</SelectItem>
                      <SelectItem value="Loan Against Property">Loan Against Property</SelectItem>
                      <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="email-message">Message *</Label>
                <textarea
                  id="email-message"
                  value={emailData.message}
                  onChange={(e) => setEmailData(prev => ({...prev, message: e.target.value}))}
                  placeholder="Please describe your loan requirements or questions..."
                  className="w-full p-3 border border-slate-300 rounded-md resize-none h-24"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                onClick={handleEmailSubmit}
                disabled={!emailData.name || !emailData.email || !emailData.subject || !emailData.message}
                className="bg-slate-600 hover:bg-slate-700 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowEmailForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Contact Options */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.open('tel:+919497544143')}>
          <CardContent className="p-4 text-center">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-slate-800">Call Now</h4>
            <p className="text-sm text-slate-600">Instant support</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleWhatsAppClick}>
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-slate-800">WhatsApp</h4>
            <p className="text-sm text-slate-600">Quick chat</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowCallbackForm(true)}>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h4 className="font-semibold text-slate-800">Callback</h4>
            <p className="text-sm text-slate-600">We'll call you</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}