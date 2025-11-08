import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, PiggyBank, Building, MessageCircle } from 'lucide-react';

interface LoanOption {
  bank: string;
  rate: number;
  processing: number;
  features: string[];
}

interface CalculationResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  affordability?: string;
  recommendation?: string;
}

export default function AdvancedCalculatorSuite() {
  const [activeTab, setActiveTab] = useState('emi');
  
  // EMI Calculator State
  const [emiData, setEmiData] = useState({
    amount: '',
    rate: '',
    tenure: ''
  });

  // Loan Comparison State
  const [comparisonData, setComparisonData] = useState({
    amount: '',
    tenure: ''
  });

  // Affordability Calculator State
  const [affordabilityData, setAffordabilityData] = useState({
    income: '',
    expenses: '',
    existingEmi: '',
    loanType: 'home'
  });

  // Business ROI Calculator State
  const [roiData, setRoiData] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
    monthlyRevenue: '',
    profitMargin: ''
  });

  // Savings vs Loan Calculator State
  const [savingsData, setSavingsData] = useState({
    targetAmount: '',
    currentSavings: '',
    monthlySavings: '',
    savingsRate: '',
    loanRate: '',
    loanTenure: ''
  });

  // Sample loan options for comparison
  const loanOptions: LoanOption[] = [
    {
      bank: 'Partner Bank A',
      rate: 8.5,
      processing: 0.5,
      features: ['Zero prepayment charges', 'Quick approval', 'Online application']
    },
    {
      bank: 'Partner Bank B',
      rate: 8.75,
      processing: 1.0,
      features: ['Flexible tenure', 'Door-step service', 'Special rates for women']
    },
    {
      bank: 'Partner Bank C',
      rate: 9.0,
      processing: 0.25,
      features: ['Lowest processing fee', 'Balance transfer facility', 'Top-up loans']
    }
  ];

  // EMI Calculation
  const calculateEMI = (principal: number, rate: number, tenure: number): CalculationResult => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    };
  };

  // Affordability Assessment
  const calculateAffordability = (): CalculationResult & { maxLoanAmount: number } => {
    const income = parseFloat(affordabilityData.income) || 0;
    const expenses = parseFloat(affordabilityData.expenses) || 0;
    const existingEmi = parseFloat(affordabilityData.existingEmi) || 0;
    
    const availableIncome = income - expenses - existingEmi;
    const maxEmi = availableIncome * 0.4; // 40% of available income
    
    // Assume average rate based on loan type
    const rates = { home: 8.5, car: 9.0, personal: 12.0, business: 10.5 };
    const rate = rates[affordabilityData.loanType as keyof typeof rates];
    const tenure = affordabilityData.loanType === 'home' ? 240 : 
                   affordabilityData.loanType === 'car' ? 60 : 36;
    
    const monthlyRate = rate / (12 * 100);
    const maxLoanAmount = (maxEmi * (Math.pow(1 + monthlyRate, tenure) - 1)) / 
                         (monthlyRate * Math.pow(1 + monthlyRate, tenure));

    let affordability = 'Good';
    if (maxEmi < income * 0.2) affordability = 'Excellent';
    else if (maxEmi < income * 0.3) affordability = 'Very Good';
    else if (maxEmi < income * 0.4) affordability = 'Good';
    else affordability = 'Limited';

    return {
      emi: Math.round(maxEmi),
      totalAmount: Math.round(maxEmi * tenure),
      totalInterest: Math.round((maxEmi * tenure) - maxLoanAmount),
      maxLoanAmount: Math.round(maxLoanAmount),
      affordability,
      recommendation: maxLoanAmount > 100000 ? 
        'You have good loan eligibility. Consider applying now!' :
        'Consider increasing your income or reducing expenses to improve eligibility.'
    };
  };

  // Business ROI Calculation
  const calculateBusinessROI = (): CalculationResult & { roi: number; breakeven: number } => {
    const loanAmount = parseFloat(roiData.loanAmount) || 0;
    const rate = parseFloat(roiData.interestRate) || 0;
    const tenure = parseFloat(roiData.tenure) || 0;
    const monthlyRevenue = parseFloat(roiData.monthlyRevenue) || 0;
    const profitMargin = parseFloat(roiData.profitMargin) || 0;

    const emiResult = calculateEMI(loanAmount, rate, tenure * 12);
    const monthlyProfit = (monthlyRevenue * profitMargin) / 100;
    const netCashFlow = monthlyProfit - emiResult.emi;
    const roi = ((monthlyProfit * 12) / loanAmount) * 100;
    const breakeven = loanAmount / monthlyProfit;

    return {
      ...emiResult,
      roi: Math.round(roi * 100) / 100,
      breakeven: Math.round(breakeven),
      recommendation: roi > 15 ? 
        'Excellent ROI! This loan will significantly boost your business.' :
        roi > 10 ? 'Good ROI. This loan should be profitable.' :
        'Consider if the ROI justifies the loan. Explore ways to increase profitability.'
    };
  };

  // Savings vs Loan Comparison
  const calculateSavingsComparison = () => {
    const targetAmount = parseFloat(savingsData.targetAmount) || 0;
    const currentSavings = parseFloat(savingsData.currentSavings) || 0;
    const monthlySavings = parseFloat(savingsData.monthlySavings) || 0;
    const savingsRate = parseFloat(savingsData.savingsRate) || 0;
    const loanRate = parseFloat(savingsData.loanRate) || 0;
    const loanTenure = parseFloat(savingsData.loanTenure) || 0;

    // Savings scenario
    const remainingAmount = targetAmount - currentSavings;
    const monthsToSave = remainingAmount / monthlySavings;
    
    // Loan scenario
    const loanEmi = calculateEMI(targetAmount, loanRate, loanTenure * 12);
    
    return {
      savingsTime: Math.round(monthsToSave),
      loanEmi: loanEmi.emi,
      loanTotalCost: loanEmi.totalAmount,
      recommendation: monthsToSave < loanTenure * 12 ?
        'Saving is better - you\'ll reach your goal faster and save on interest!' :
        'Taking a loan might be better - you get immediate access to funds.'
    };
  };

  const shareCalculation = (type: string, result: any) => {
    let message = '';
    
    switch (type) {
      case 'emi':
        message = `💰 EMI Calculator Result - FiNNGUARD Capital

Loan Amount: ₹${parseFloat(emiData.amount).toLocaleString()}
Interest Rate: ${emiData.rate}%
Tenure: ${emiData.tenure} months

Monthly EMI: ₹${result.emi.toLocaleString()}
Total Amount: ₹${result.totalAmount.toLocaleString()}
Total Interest: ₹${result.totalInterest.toLocaleString()}

Get the best loan rates with FiNNGUARD Capital!`;
        break;
      
      case 'affordability':
        message = `🏠 Loan Affordability Assessment - FiNNGUARD Capital

Monthly Income: ₹${affordabilityData.income}
Max Eligible EMI: ₹${result.emi.toLocaleString()}
Max Loan Amount: ₹${result.maxLoanAmount.toLocaleString()}
Affordability: ${result.affordability}

${result.recommendation}

Contact us for personalized loan solutions!`;
        break;
    }

    window.open(`https://wa.me/919497544143?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            Advanced Loan Calculator Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="emi">EMI Calculator</TabsTrigger>
              <TabsTrigger value="comparison">Loan Comparison</TabsTrigger>
              <TabsTrigger value="affordability">Affordability</TabsTrigger>
              <TabsTrigger value="roi">Business ROI</TabsTrigger>
              <TabsTrigger value="savings">Savings vs Loan</TabsTrigger>
            </TabsList>

            {/* EMI Calculator */}
            <TabsContent value="emi" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Calculate Your EMI</h3>
                  
                  <div>
                    <Label htmlFor="emi-amount">Loan Amount (₹)</Label>
                    <Input
                      id="emi-amount"
                      value={emiData.amount}
                      onChange={(e) => setEmiData(prev => ({...prev, amount: e.target.value}))}
                      placeholder="Enter loan amount"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emi-rate">Interest Rate (% per annum)</Label>
                    <Input
                      id="emi-rate"
                      value={emiData.rate}
                      onChange={(e) => setEmiData(prev => ({...prev, rate: e.target.value}))}
                      placeholder="Enter interest rate"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emi-tenure">Loan Tenure (months)</Label>
                    <Input
                      id="emi-tenure"
                      value={emiData.tenure}
                      onChange={(e) => setEmiData(prev => ({...prev, tenure: e.target.value}))}
                      placeholder="Enter tenure in months"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {emiData.amount && emiData.rate && emiData.tenure && (
                    <>
                      {(() => {
                        const result = calculateEMI(
                          parseFloat(emiData.amount),
                          parseFloat(emiData.rate),
                          parseFloat(emiData.tenure)
                        );
                        
                        return (
                          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-3">EMI Calculation Result</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Monthly EMI:</span>
                                  <span className="font-bold text-blue-600">₹{result.emi.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Total Amount:</span>
                                  <span>₹{result.totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Total Interest:</span>
                                  <span>₹{result.totalInterest.toLocaleString()}</span>
                                </div>
                              </div>
                              <Button 
                                onClick={() => shareCalculation('emi', result)}
                                className="w-full mt-4 bg-green-600 hover:bg-green-700"
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Share Result & Apply
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })()}
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Loan Comparison */}
            <TabsContent value="comparison" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Compare Loan Options</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="comp-amount">Loan Amount (₹)</Label>
                    <Input
                      id="comp-amount"
                      value={comparisonData.amount}
                      onChange={(e) => setComparisonData(prev => ({...prev, amount: e.target.value}))}
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div>
                    <Label htmlFor="comp-tenure">Tenure (years)</Label>
                    <Input
                      id="comp-tenure"
                      value={comparisonData.tenure}
                      onChange={(e) => setComparisonData(prev => ({...prev, tenure: e.target.value}))}
                      placeholder="Enter tenure in years"
                    />
                  </div>
                </div>

                {comparisonData.amount && comparisonData.tenure && (
                  <div className="grid md:grid-cols-3 gap-4">
                    {loanOptions.map((option, index) => {
                      const result = calculateEMI(
                        parseFloat(comparisonData.amount),
                        option.rate,
                        parseFloat(comparisonData.tenure) * 12
                      );
                      const processingFee = (parseFloat(comparisonData.amount) * option.processing) / 100;

                      return (
                        <Card key={index} className={`${index === 0 ? 'border-green-500 border-2' : ''}`}>
                          <CardContent className="p-4">
                            {index === 0 && (
                              <Badge className="bg-green-100 text-green-800 mb-2">Best Option</Badge>
                            )}
                            <h4 className="font-semibold mb-2">{option.bank}</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Interest Rate:</span>
                                <span className="font-semibold">{option.rate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Monthly EMI:</span>
                                <span className="font-semibold">₹{result.emi.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Processing Fee:</span>
                                <span>₹{processingFee.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Interest:</span>
                                <span>₹{result.totalInterest.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs text-slate-600 mb-2">Features:</p>
                              <ul className="text-xs space-y-1">
                                {option.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Button size="sm" className="w-full mt-3">
                              Choose This Option
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Affordability Calculator */}
            <TabsContent value="affordability" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Check Your Loan Affordability</h3>
                  
                  <div>
                    <Label htmlFor="aff-income">Monthly Income (₹)</Label>
                    <Input
                      id="aff-income"
                      value={affordabilityData.income}
                      onChange={(e) => setAffordabilityData(prev => ({...prev, income: e.target.value}))}
                      placeholder="Enter monthly income"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="aff-expenses">Monthly Expenses (₹)</Label>
                    <Input
                      id="aff-expenses"
                      value={affordabilityData.expenses}
                      onChange={(e) => setAffordabilityData(prev => ({...prev, expenses: e.target.value}))}
                      placeholder="Enter monthly expenses"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="aff-existing">Existing EMI (₹)</Label>
                    <Input
                      id="aff-existing"
                      value={affordabilityData.existingEmi}
                      onChange={(e) => setAffordabilityData(prev => ({...prev, existingEmi: e.target.value}))}
                      placeholder="Enter existing EMI"
                    />
                  </div>
                  
                  <div>
                    <Label>Loan Type</Label>
                    <Select value={affordabilityData.loanType} onValueChange={(value) => setAffordabilityData(prev => ({...prev, loanType: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home Loan</SelectItem>
                        <SelectItem value="car">Car Loan</SelectItem>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="business">Business Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {affordabilityData.income && (
                    <>
                      {(() => {
                        const result = calculateAffordability();
                        
                        return (
                          <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-3">Affordability Assessment</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Max EMI Capacity:</span>
                                  <span className="font-bold text-green-600">₹{result.emi.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Max Loan Amount:</span>
                                  <span className="font-bold">₹{result.maxLoanAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Affordability:</span>
                                  <Badge className={`${result.affordability === 'Excellent' ? 'bg-green-100 text-green-800' :
                                                     result.affordability === 'Very Good' ? 'bg-blue-100 text-blue-800' :
                                                     result.affordability === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                                                     'bg-red-100 text-red-800'}`}>
                                    {result.affordability}
                                  </Badge>
                                </div>
                              </div>
                              <div className="mt-3 p-3 bg-white rounded-lg">
                                <p className="text-sm text-slate-600">{result.recommendation}</p>
                              </div>
                              <Button 
                                onClick={() => shareCalculation('affordability', result)}
                                className="w-full mt-4 bg-green-600 hover:bg-green-700"
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Share & Apply Now
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })()}
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Business ROI Calculator */}
            <TabsContent value="roi" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Business Loan ROI Calculator
                  </h3>
                  
                  <div>
                    <Label htmlFor="roi-amount">Loan Amount (₹)</Label>
                    <Input
                      id="roi-amount"
                      value={roiData.loanAmount}
                      onChange={(e) => setRoiData(prev => ({...prev, loanAmount: e.target.value}))}
                      placeholder="Enter loan amount"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="roi-rate">Interest Rate (% per annum)</Label>
                    <Input
                      id="roi-rate"
                      value={roiData.interestRate}
                      onChange={(e) => setRoiData(prev => ({...prev, interestRate: e.target.value}))}
                      placeholder="Enter interest rate"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="roi-tenure">Loan Tenure (years)</Label>
                    <Input
                      id="roi-tenure"
                      value={roiData.tenure}
                      onChange={(e) => setRoiData(prev => ({...prev, tenure: e.target.value}))}
                      placeholder="Enter tenure"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="roi-revenue">Expected Monthly Revenue (₹)</Label>
                    <Input
                      id="roi-revenue"
                      value={roiData.monthlyRevenue}
                      onChange={(e) => setRoiData(prev => ({...prev, monthlyRevenue: e.target.value}))}
                      placeholder="Enter monthly revenue"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="roi-margin">Profit Margin (%)</Label>
                    <Input
                      id="roi-margin"
                      value={roiData.profitMargin}
                      onChange={(e) => setRoiData(prev => ({...prev, profitMargin: e.target.value}))}
                      placeholder="Enter profit margin"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {roiData.loanAmount && roiData.interestRate && roiData.tenure && roiData.monthlyRevenue && roiData.profitMargin && (
                    <>
                      {(() => {
                        const result = calculateBusinessROI();
                        
                        return (
                          <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                ROI Analysis
                              </h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Monthly EMI:</span>
                                  <span className="font-bold">₹{result.emi.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Annual ROI:</span>
                                  <span className={`font-bold ${result.roi > 15 ? 'text-green-600' : result.roi > 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {result.roi}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Breakeven Period:</span>
                                  <span className="font-bold">{result.breakeven} months</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Total Interest:</span>
                                  <span>₹{result.totalInterest.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="mt-3 p-3 bg-white rounded-lg">
                                <p className="text-sm text-slate-600">{result.recommendation}</p>
                              </div>
                              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Discuss Business Loan
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })()}
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Savings vs Loan */}
            <TabsContent value="savings" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <PiggyBank className="w-5 h-5" />
                    Savings vs Loan Comparison
                  </h3>
                  
                  <div>
                    <Label htmlFor="sav-target">Target Amount (₹)</Label>
                    <Input
                      id="sav-target"
                      value={savingsData.targetAmount}
                      onChange={(e) => setSavingsData(prev => ({...prev, targetAmount: e.target.value}))}
                      placeholder="Enter target amount"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sav-current">Current Savings (₹)</Label>
                    <Input
                      id="sav-current"
                      value={savingsData.currentSavings}
                      onChange={(e) => setSavingsData(prev => ({...prev, currentSavings: e.target.value}))}
                      placeholder="Enter current savings"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sav-monthly">Monthly Savings Capacity (₹)</Label>
                    <Input
                      id="sav-monthly"
                      value={savingsData.monthlySavings}
                      onChange={(e) => setSavingsData(prev => ({...prev, monthlySavings: e.target.value}))}
                      placeholder="Enter monthly savings"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sav-rate">Savings Interest Rate (%)</Label>
                    <Input
                      id="sav-rate"
                      value={savingsData.savingsRate}
                      onChange={(e) => setSavingsData(prev => ({...prev, savingsRate: e.target.value}))}
                      placeholder="Enter savings rate"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="loan-rate">Loan Interest Rate (%)</Label>
                    <Input
                      id="loan-rate"
                      value={savingsData.loanRate}
                      onChange={(e) => setSavingsData(prev => ({...prev, loanRate: e.target.value}))}
                      placeholder="Enter loan rate"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="loan-tenure">Loan Tenure (years)</Label>
                    <Input
                      id="loan-tenure"
                      value={savingsData.loanTenure}
                      onChange={(e) => setSavingsData(prev => ({...prev, loanTenure: e.target.value}))}
                      placeholder="Enter loan tenure"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {savingsData.targetAmount && savingsData.monthlySavings && (
                    <>
                      {(() => {
                        const result = calculateSavingsComparison();
                        
                        return (
                          <Card className="bg-gradient-to-r from-amber-50 to-orange-50">
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-3">Comparison Result</h4>
                              <div className="space-y-3">
                                <div className="p-3 bg-white rounded-lg">
                                  <h5 className="font-semibold text-green-600 mb-2">💰 Savings Option</h5>
                                  <p className="text-sm">Time to reach goal: <span className="font-bold">{result.savingsTime} months</span></p>
                                  <p className="text-sm">Total cost: <span className="font-bold">₹{parseFloat(savingsData.targetAmount).toLocaleString()}</span></p>
                                </div>
                                
                                <div className="p-3 bg-white rounded-lg">
                                  <h5 className="font-semibold text-blue-600 mb-2">🏦 Loan Option</h5>
                                  <p className="text-sm">Monthly EMI: <span className="font-bold">₹{result.loanEmi.toLocaleString()}</span></p>
                                  <p className="text-sm">Total cost: <span className="font-bold">₹{result.loanTotalCost.toLocaleString()}</span></p>
                                </div>
                              </div>
                              
                              <div className="mt-3 p-3 bg-white rounded-lg">
                                <p className="text-sm text-slate-600">{result.recommendation}</p>
                              </div>
                              
                              <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Get Personalized Advice
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })()}
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}