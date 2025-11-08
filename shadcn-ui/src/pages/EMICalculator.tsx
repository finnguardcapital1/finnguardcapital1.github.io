import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Calculator, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdvancedCalculatorSuite from '@/components/AdvancedCalculatorSuite';

export default function EMICalculator() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [emiData, setEmiData] = useState({
    amount: '',
    rate: '',
    tenure: ''
  });

  const calculateEMI = () => {
    const principal = parseFloat(emiData.amount);
    const rate = parseFloat(emiData.rate) / (12 * 100);
    const tenure = parseFloat(emiData.tenure);

    if (principal && rate && tenure) {
      const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      return {
        emi: Math.round(emi),
        totalAmount: Math.round(emi * tenure),
        totalInterest: Math.round((emi * tenure) - principal)
      };
    }
    return null;
  };

  const result = calculateEMI();

  const handleWhatsAppShare = () => {
    if (result) {
      const message = `💰 EMI Calculator Result - FiNNGUARD Capital

Loan Amount: ₹${parseFloat(emiData.amount).toLocaleString()}
Interest Rate: ${emiData.rate}%
Tenure: ${emiData.tenure} months

Monthly EMI: ₹${result.emi.toLocaleString()}
Total Amount: ₹${result.totalAmount.toLocaleString()}
Total Interest: ₹${result.totalInterest.toLocaleString()}

I'm interested in applying for this loan. Please contact me.`;

      window.open(`https://wa.me/919497544143?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
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
            <Link to="/contact" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Contact</Link>
          </nav>
          <Button onClick={() => window.open('https://wa.me/919497544143', '_blank')} className="bg-green-500 hover:bg-green-600 text-white">
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            EMI Calculator
          </h1>
          <p className="text-lg text-slate-600">Calculate your loan EMI and explore advanced loan options</p>
        </div>

        {!showAdvanced ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic EMI Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle>Calculate Your EMI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Loan Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={emiData.amount}
                      onChange={(e) => setEmiData(prev => ({...prev, amount: e.target.value}))}
                      placeholder="Enter loan amount"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="rate">Interest Rate (% per annum)</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.1"
                      value={emiData.rate}
                      onChange={(e) => setEmiData(prev => ({...prev, rate: e.target.value}))}
                      placeholder="Enter interest rate"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tenure">Loan Tenure (months)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      value={emiData.tenure}
                      onChange={(e) => setEmiData(prev => ({...prev, tenure: e.target.value}))}
                      placeholder="Enter tenure in months"
                    />
                  </div>

                  <Button 
                    onClick={() => setShowAdvanced(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Advanced Calculator Suite
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle>EMI Calculation Result</CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Monthly EMI:</span>
                            <span className="text-2xl font-bold text-green-600">₹{result.emi.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span className="font-semibold">₹{result.totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-semibold">₹{result.totalInterest.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button 
                          onClick={handleWhatsAppShare}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Share Result & Apply
                        </Button>
                        
                        <Link to="/contact" className="block">
                          <Button variant="outline" className="w-full">
                            Get Detailed Quote
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Enter loan details to calculate EMI</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Links */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <h3 className="font-semibold text-slate-800 mb-2">Home Loans</h3>
                  <p className="text-slate-600 text-sm mb-4">Starting from 8.5% per annum</p>
                  <Link to="/contact">
                    <Button size="sm" className="w-full">Apply Now</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <h3 className="font-semibold text-slate-800 mb-2">Car Loans</h3>
                  <p className="text-slate-600 text-sm mb-4">Starting from 9.0% per annum</p>
                  <Link to="/contact">
                    <Button size="sm" className="w-full">Apply Now</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <h3 className="font-semibold text-slate-800 mb-2">Personal Loans</h3>
                  <p className="text-slate-600 text-sm mb-4">Starting from 11.5% per annum</p>
                  <Link to="/contact">
                    <Button size="sm" className="w-full">Apply Now</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button 
                onClick={() => setShowAdvanced(false)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Basic Calculator
              </Button>
            </div>
            
            {/* Integration Point: Advanced Calculator Suite */}
            <AdvancedCalculatorSuite />
          </div>
        )}
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
                <p>17/557E, 2nd Floor, Jayamohan Building, Palappilly Road, Amballur, Thrissur, Kerala - 680302</p>
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
  );
}