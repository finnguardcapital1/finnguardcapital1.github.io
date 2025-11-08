import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Phone, Mail, MessageCircle, Calendar, User, DollarSign, Briefcase, Star } from 'lucide-react';

interface LeadData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    age: string;
    city: string;
  };
  loanDetails: {
    type: string;
    amount: string;
    purpose: string;
    tenure: string;
  };
  financialInfo: {
    income: string;
    employment: string;
    creditScore: string;
    existingLoans: string;
  };
  preferences: {
    contactMethod: string;
    callbackTime: string;
    urgency: string;
  };
}

interface LeadScore {
  score: number;
  category: 'Hot' | 'Warm' | 'Cold';
  factors: string[];
}

export default function AdvancedLeadCapture() {
  const [currentStep, setCurrentStep] = useState(1);
  const [leadData, setLeadData] = useState<LeadData>({
    personalInfo: { name: '', email: '', phone: '', age: '', city: '' },
    loanDetails: { type: '', amount: '', purpose: '', tenure: '' },
    financialInfo: { income: '', employment: '', creditScore: '', existingLoans: '' },
    preferences: { contactMethod: 'whatsapp', callbackTime: '', urgency: 'medium' }
  });
  const [leadScore, setLeadScore] = useState<LeadScore>({ score: 0, category: 'Cold', factors: [] });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Lead scoring algorithm
  const calculateLeadScore = (data: LeadData): LeadScore => {
    let score = 0;
    const factors: string[] = [];

    // Income scoring
    const income = parseInt(data.financialInfo.income) || 0;
    if (income >= 100000) { score += 25; factors.push('High Income'); }
    else if (income >= 50000) { score += 15; factors.push('Good Income'); }
    else if (income >= 25000) { score += 10; factors.push('Moderate Income'); }

    // Loan amount vs income ratio
    const loanAmount = parseInt(data.loanDetails.amount) || 0;
    const ratio = income > 0 ? loanAmount / (income * 12) : 0;
    if (ratio <= 3) { score += 20; factors.push('Good Loan-to-Income Ratio'); }
    else if (ratio <= 5) { score += 10; factors.push('Acceptable Ratio'); }

    // Employment stability
    if (data.financialInfo.employment === 'Salaried') { score += 15; factors.push('Stable Employment'); }
    else if (data.financialInfo.employment === 'Self Employed') { score += 10; factors.push('Self Employed'); }

    // Credit score
    const creditScore = parseInt(data.financialInfo.creditScore) || 0;
    if (creditScore >= 750) { score += 20; factors.push('Excellent Credit'); }
    else if (creditScore >= 650) { score += 15; factors.push('Good Credit'); }
    else if (creditScore >= 550) { score += 10; factors.push('Fair Credit'); }

    // Urgency
    if (data.preferences.urgency === 'high') { score += 10; factors.push('Urgent Requirement'); }
    else if (data.preferences.urgency === 'medium') { score += 5; factors.push('Moderate Urgency'); }

    // Complete profile bonus
    const completeness = Object.values(data).reduce((acc, section) => {
      const filledFields = Object.values(section).filter(value => value.trim() !== '').length;
      return acc + filledFields;
    }, 0);
    if (completeness >= 12) { score += 10; factors.push('Complete Profile'); }

    // Determine category
    let category: 'Hot' | 'Warm' | 'Cold';
    if (score >= 70) category = 'Hot';
    else if (score >= 40) category = 'Warm';
    else category = 'Cold';

    return { score, category, factors };
  };

  useEffect(() => {
    const score = calculateLeadScore(leadData);
    setLeadScore(score);
  }, [leadData]);

  const updateLeadData = (section: keyof LeadData, field: string, value: string) => {
    setLeadData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Prepare comprehensive lead data
    const leadInfo = {
      ...leadData,
      leadScore,
      timestamp: new Date().toISOString(),
      source: 'Advanced Lead Capture'
    };

    // Create detailed WhatsApp message
    const message = `🎯 *QUALIFIED LEAD - FiNNGUARD Capital* 
Lead Score: ${leadScore.score}/100 (${leadScore.category} Lead)

👤 *Personal Information:*
• Name: ${leadData.personalInfo.name}
• Email: ${leadData.personalInfo.email}
• Phone: ${leadData.personalInfo.phone}
• Age: ${leadData.personalInfo.age}
• City: ${leadData.personalInfo.city}

💰 *Loan Requirements:*
• Type: ${leadData.loanDetails.type}
• Amount: ₹${leadData.loanDetails.amount}
• Purpose: ${leadData.loanDetails.purpose}
• Tenure: ${leadData.loanDetails.tenure} years

💼 *Financial Profile:*
• Monthly Income: ₹${leadData.financialInfo.income}
• Employment: ${leadData.financialInfo.employment}
• Credit Score: ${leadData.financialInfo.creditScore}
• Existing Loans: ${leadData.financialInfo.existingLoans}

📞 *Contact Preferences:*
• Preferred Method: ${leadData.preferences.contactMethod}
• Best Call Time: ${leadData.preferences.callbackTime}
• Urgency: ${leadData.preferences.urgency}

⭐ *Lead Scoring Factors:*
${leadScore.factors.map(factor => `• ${factor}`).join('\n')}

Priority: ${leadScore.category} Lead - Handle accordingly!`;

    // Send to WhatsApp
    window.open(`https://wa.me/919497544143?text=${encodeURIComponent(message)}`, '_blank');

    // Store lead data (in real implementation, send to CRM/database)
    localStorage.setItem('leadData', JSON.stringify(leadInfo));

    setIsSubmitted(true);

    // Trigger follow-up sequence (placeholder for future automation)
    triggerFollowUpSequence(leadInfo);
  };

  const triggerFollowUpSequence = (leadInfo: any) => {
    // Placeholder for automated follow-up system
    console.log('Follow-up sequence triggered for:', leadInfo);
    
    // In real implementation, this would:
    // 1. Send confirmation email
    // 2. Schedule follow-up calls
    // 3. Add to CRM system
    // 4. Set reminders for sales team
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return leadData.personalInfo.name && leadData.personalInfo.email && leadData.personalInfo.phone;
      case 2:
        return leadData.loanDetails.type && leadData.loanDetails.amount;
      case 3:
        return leadData.financialInfo.income && leadData.financialInfo.employment;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Application Submitted Successfully!</h3>
            <Badge className={`${leadScore.category === 'Hot' ? 'bg-red-100 text-red-800' : 
                                leadScore.category === 'Warm' ? 'bg-orange-100 text-orange-800' : 
                                'bg-blue-100 text-blue-800'} mb-4`}>
              {leadScore.category} Lead - Score: {leadScore.score}/100
            </Badge>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">What happens next?</h4>
            <div className="text-sm text-slate-600 space-y-1">
              <p>✅ Your application has been forwarded to our loan specialists</p>
              <p>📧 You'll receive a confirmation email within 5 minutes</p>
              <p>📞 Our team will contact you within 2 hours during business hours</p>
              <p>📋 We'll guide you through the documentation process</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => {setIsSubmitted(false); setCurrentStep(1);}} variant="outline">
              Submit Another Application
            </Button>
            <Button onClick={() => window.open('tel:+919497544143')}>
              <Phone className="w-4 h-4 mr-2" />
              Call Us Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Advanced Loan Application</span>
          <Badge className={`${leadScore.category === 'Hot' ? 'bg-red-100 text-red-800' : 
                              leadScore.category === 'Warm' ? 'bg-orange-100 text-orange-800' : 
                              'bg-blue-100 text-blue-800'}`}>
            Lead Score: {leadScore.score}/100
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-slate-600">Step {currentStep} of {totalSteps}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={leadData.personalInfo.name}
                  onChange={(e) => updateLeadData('personalInfo', 'name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={leadData.personalInfo.email}
                  onChange={(e) => updateLeadData('personalInfo', 'email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={leadData.personalInfo.phone}
                  onChange={(e) => updateLeadData('personalInfo', 'phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Select value={leadData.personalInfo.age} onValueChange={(value) => updateLeadData('personalInfo', 'age', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="21-30">21-30 years</SelectItem>
                    <SelectItem value="31-40">31-40 years</SelectItem>
                    <SelectItem value="41-50">41-50 years</SelectItem>
                    <SelectItem value="51-60">51-60 years</SelectItem>
                    <SelectItem value="60+">60+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={leadData.personalInfo.city}
                  onChange={(e) => updateLeadData('personalInfo', 'city', e.target.value)}
                  placeholder="Enter your city"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Loan Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold">Loan Requirements</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Loan Type *</Label>
                <Select value={leadData.loanDetails.type} onValueChange={(value) => updateLeadData('loanDetails', 'type', value)}>
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
              <div>
                <Label htmlFor="amount">Loan Amount (₹) *</Label>
                <Input
                  id="amount"
                  value={leadData.loanDetails.amount}
                  onChange={(e) => updateLeadData('loanDetails', 'amount', e.target.value)}
                  placeholder="Enter loan amount"
                />
              </div>
              <div>
                <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                <Select value={leadData.loanDetails.tenure} onValueChange={(value) => updateLeadData('loanDetails', 'tenure', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="2">2 Years</SelectItem>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="7">7 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                    <SelectItem value="25">25 Years</SelectItem>
                    <SelectItem value="30">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="purpose">Loan Purpose</Label>
                <Input
                  id="purpose"
                  value={leadData.loanDetails.purpose}
                  onChange={(e) => updateLeadData('loanDetails', 'purpose', e.target.value)}
                  placeholder="Purpose of loan"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Financial Information */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Financial Profile</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="income">Monthly Income (₹) *</Label>
                <Input
                  id="income"
                  value={leadData.financialInfo.income}
                  onChange={(e) => updateLeadData('financialInfo', 'income', e.target.value)}
                  placeholder="Enter monthly income"
                />
              </div>
              <div>
                <Label>Employment Type *</Label>
                <Select value={leadData.financialInfo.employment} onValueChange={(value) => updateLeadData('financialInfo', 'employment', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Salaried">Salaried</SelectItem>
                    <SelectItem value="Self Employed">Self Employed</SelectItem>
                    <SelectItem value="Business Owner">Business Owner</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="creditScore">Credit Score (if known)</Label>
                <Select value={leadData.financialInfo.creditScore} onValueChange={(value) => updateLeadData('financialInfo', 'creditScore', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credit score range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="800+">800+ (Excellent)</SelectItem>
                    <SelectItem value="750-799">750-799 (Very Good)</SelectItem>
                    <SelectItem value="700-749">700-749 (Good)</SelectItem>
                    <SelectItem value="650-699">650-699 (Fair)</SelectItem>
                    <SelectItem value="600-649">600-649 (Poor)</SelectItem>
                    <SelectItem value="Below 600">Below 600</SelectItem>
                    <SelectItem value="Unknown">Don't Know</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Existing Loans</Label>
                <Select value={leadData.financialInfo.existingLoans} onValueChange={(value) => updateLeadData('financialInfo', 'existingLoans', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Do you have existing loans?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">No existing loans</SelectItem>
                    <SelectItem value="1 Loan">1 existing loan</SelectItem>
                    <SelectItem value="2-3 Loans">2-3 existing loans</SelectItem>
                    <SelectItem value="4+ Loans">4+ existing loans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact Preferences & Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold">Contact Preferences & Review</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Preferred Contact Method</Label>
                <Select value={leadData.preferences.contactMethod} onValueChange={(value) => updateLeadData('preferences', 'contactMethod', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="any">Any Method</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Best Time to Call</Label>
                <Select value={leadData.preferences.callbackTime} onValueChange={(value) => updateLeadData('preferences', 'callbackTime', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
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
                <Label>Urgency Level</Label>
                <Select value={leadData.preferences.urgency} onValueChange={(value) => updateLeadData('preferences', 'urgency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Urgent (Within 1 week)</SelectItem>
                    <SelectItem value="medium">Moderate (Within 1 month)</SelectItem>
                    <SelectItem value="low">No Rush (Just exploring)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lead Score Display */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Your Application Score</h4>
                <div className="flex items-center gap-4 mb-3">
                  <Badge className={`${leadScore.category === 'Hot' ? 'bg-red-100 text-red-800' : 
                                      leadScore.category === 'Warm' ? 'bg-orange-100 text-orange-800' : 
                                      'bg-blue-100 text-blue-800'}`}>
                    {leadScore.category} Lead
                  </Badge>
                  <span className="text-2xl font-bold text-slate-800">{leadScore.score}/100</span>
                </div>
                <div className="text-sm text-slate-600">
                  <p className="mb-2">Scoring factors:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {leadScore.factors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button 
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              Next Step
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={!isStepValid()}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}