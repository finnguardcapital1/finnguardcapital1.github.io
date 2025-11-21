import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Calculator, CheckCircle, XCircle } from 'lucide-react';
import { openWhatsApp } from '@/lib/contact';

interface EligibilityResult {
  eligible: boolean;
  maxAmount: number;
  recommendedTenure: number;
  interestRate: number;
  monthlyEMI: number;
  message: string;
}

export default function EligibilityCalculator() {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    employmentType: '',
    creditScore: '',
    existingEMI: '',
    loanType: '',
    loanAmount: ''
  });
  
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateEligibility = () => {
    const income = parseFloat(formData.monthlyIncome);
    const creditScore = parseInt(formData.creditScore);
    const existingEMI = parseFloat(formData.existingEMI) || 0;
    const requestedAmount = parseFloat(formData.loanAmount);

    // Basic eligibility logic
    let eligible = true;
    let message = '';
    let interestRate = 12; // Default rate
    let maxAmount = 0;
    let recommendedTenure = 240; // 20 years default

    // Credit score check
    if (creditScore < 650) {
      eligible = false;
      message = 'Credit score too low. Minimum required: 650';
    } else if (creditScore >= 750) {
      interestRate = 8.5;
    } else if (creditScore >= 700) {
      interestRate = 10;
    }

    // Income-based calculation
    const availableIncome = income - existingEMI;
    const maxEMI = availableIncome * 0.5; // 50% of available income

    // Calculate max loan amount based on EMI capacity
    const monthlyRate = interestRate / 100 / 12;
    maxAmount = (maxEMI * (Math.pow(1 + monthlyRate, recommendedTenure) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, recommendedTenure));

    // Employment type adjustment
    if (formData.employmentType === 'self-employed') {
      maxAmount *= 0.8; // 20% reduction for self-employed
      interestRate += 0.5;
    }

    // Loan type specific adjustments
    switch (formData.loanType) {
      case 'home':
        interestRate -= 0.5;
        recommendedTenure = 240;
        break;
      case 'car':
        interestRate += 1;
        recommendedTenure = 84;
        break;
      case 'personal':
        interestRate += 2;
        recommendedTenure = 60;
        maxAmount = Math.min(maxAmount, income * 10);
        break;
      case 'business':
        recommendedTenure = 120;
        break;
    }

    if (eligible && requestedAmount > maxAmount) {
      message = `Requested amount exceeds eligibility. Maximum eligible: ₹${Math.round(maxAmount).toLocaleString()}`;
    } else if (eligible) {
      message = 'Congratulations! You are eligible for the loan.';
    }

    const finalAmount = Math.min(requestedAmount, maxAmount);
    const monthlyRate2 = interestRate / 100 / 12;
    const monthlyEMI = (finalAmount * monthlyRate2 * Math.pow(1 + monthlyRate2, recommendedTenure)) / (Math.pow(1 + monthlyRate2, recommendedTenure) - 1);

    setResult({
      eligible: eligible && requestedAmount <= maxAmount,
      maxAmount: Math.round(maxAmount),
      recommendedTenure,
      interestRate,
      monthlyEMI: Math.round(monthlyEMI),
      message
    });
    setShowResult(true);
  };

  const handleWhatsAppShare = () => {
    if (!result) return;
    
    const message = `Hi FiNNGUARD Capital! I've checked my loan eligibility:

Loan Type: ${formData.loanType}
Monthly Income: ₹${formData.monthlyIncome}
Requested Amount: ₹${formData.loanAmount}
Eligibility: ${result.eligible ? 'Eligible' : 'Not Eligible'}
Max Eligible Amount: ₹${result.maxAmount.toLocaleString()}
Estimated EMI: ₹${result.monthlyEMI.toLocaleString()}
Interest Rate: ${result.interestRate}%

Please help me proceed with the loan application.`;

    // Use centralized WhatsApp helper
    openWhatsApp(message);
  };

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Check Your Loan Eligibility</h2>
          <p className="text-xl text-slate-600">Get instant eligibility results in seconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Eligibility Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="loanType">Loan Type</Label>
                <Select value={formData.loanType} onValueChange={(value) => setFormData({...formData, loanType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="car">Car Loan</SelectItem>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  placeholder="Enter your monthly income"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="loanAmount">Desired Loan Amount (₹)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="Enter desired loan amount"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(value) => setFormData({...formData, employmentType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="business">Business Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="creditScore">Credit Score</Label>
                <Select value={formData.creditScore} onValueChange={(value) => setFormData({...formData, creditScore: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credit score range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="800">Excellent (750+)</SelectItem>
                    <SelectItem value="720">Good (700-749)</SelectItem>
                    <SelectItem value="670">Fair (650-699)</SelectItem>
                    <SelectItem value="620">Poor (600-649)</SelectItem>
                    <SelectItem value="550">Very Poor (Below 600)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="existingEMI">Existing EMI (₹)</Label>
                <Input
                  id="existingEMI"
                  type="number"
                  placeholder="Enter existing EMI amount"
                  value={formData.existingEMI}
                  onChange={(e) => setFormData({...formData, existingEMI: e.target.value})}
                />
              </div>

              <Button 
                onClick={calculateEligibility}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!formData.monthlyIncome || !formData.loanType || !formData.loanAmount}
              >
                Check Eligibility
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Eligibility Results</CardTitle>
            </CardHeader>
            <CardContent>
              {!showResult ? (
                <div className="text-center py-12 text-slate-500">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Fill the form and click "Check Eligibility" to see results</p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    {result.eligible ? (
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    ) : (
                      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    )}
                    <h3 className={`text-2xl font-bold ${result.eligible ? 'text-green-600' : 'text-red-600'}`}>
                      {result.eligible ? 'Eligible!' : 'Not Eligible'}
                    </h3>
                    <p className="text-slate-600 mt-2">{result.message}</p>
                  </div>

                  {result.eligible && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-slate-600">Max Loan Amount</p>
                          <p className="text-2xl font-bold text-blue-600">₹{result.maxAmount.toLocaleString()}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-slate-600">Interest Rate</p>
                          <p className="text-2xl font-bold text-green-600">{result.interestRate}%</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-slate-600">Monthly EMI</p>
                          <p className="text-2xl font-bold text-purple-600">₹{result.monthlyEMI.toLocaleString()}</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <p className="text-sm text-slate-600">Tenure</p>
                          <p className="text-2xl font-bold text-orange-600">{Math.round(result.recommendedTenure/12)} years</p>
                        </div>
                      </div>

                      <Button 
                        onClick={handleWhatsAppShare}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Apply via WhatsApp
                      </Button>
                    </div>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}