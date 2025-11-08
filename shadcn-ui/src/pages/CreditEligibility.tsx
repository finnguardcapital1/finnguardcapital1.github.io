import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Shield, Upload, CheckCircle, AlertTriangle, FileText, Calculator, ArrowLeft, ArrowRight, Download, Zap, Clock, Loader2, AlertCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ValidationInput } from '@/components/ui/validation-input';
import { ChatSuggestions } from '@/components/ui/chat-suggestions';
import { 
  validatePAN, 
  validatePhone, 
  validateEmail, 
  validateName, 
  validateIncome, 
  validateLoanAmount,
  ValidationResult 
} from '@/utils/validation';
import { 
  detectLoanType, 
  enhancedEmploymentMatching, 
  enhancedNumberConversion, 
  generateFollowUpQuestion 
} from '@/utils/chatEnhancement';
import {
  getSuggestionsForField,
  shouldShowSuggestions,
  getQuestionWithSuggestions,
  SuggestionButton
} from '@/utils/chatSuggestions';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
  loanTypeDetected?: string;
  showSuggestions?: boolean;
  suggestionsType?: string;
}

interface ApplicantData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    pan: string;
    dateOfBirth: string;
    address: string;
  };
  employmentInfo: {
    type: string;
    company: string;
    designation: string;
    experience: string;
    monthlyIncome: string;
    otherIncome: string;
  };
  financialInfo: {
    existingLoans: string;
    creditCards: string;
    monthlyObligations: string;
    loanAmount: string;
    loanPurpose: string;
    tenure: string;
  };
  consentInfo: {
    dataProcessing: boolean;
    creditCheck: boolean;
    marketing: boolean;
    termsAccepted: boolean;
  };
}

interface QuickCheckData {
  loanType: string;
  monthlyIncome: string;
  loanAmount: string;
  employmentType: string;
  creditScore: string;
}

interface EligibilityResult {
  status: 'eligible' | 'conditionally_eligible' | 'not_eligible';
  maxLoanAmount: number;
  recommendedAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  foir: number;
  creditScore: number;
  lenderRecommendations: Array<{
    name: string;
    rate: number;
    amount: number;
    features: string[];
    status?: string;
  }>;
}

interface FormValidation {
  [key: string]: ValidationResult;
}

export default function CreditEligibility() {
  const [assessmentType, setAssessmentType] = useState<'choice' | 'quick' | 'detailed'>('choice');
  const [currentStep, setCurrentStep] = useState(1);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [quickCheckData, setQuickCheckData] = useState<QuickCheckData>({
    loanType: '', monthlyIncome: '', loanAmount: '', employmentType: '', creditScore: ''
  });
  const [applicantData, setApplicantData] = useState<ApplicantData>({
    personalInfo: {
      name: '', email: '', phone: '', pan: '', dateOfBirth: '', address: ''
    },
    employmentInfo: {
      type: '', company: '', designation: '', experience: '', monthlyIncome: '', otherIncome: ''
    },
    financialInfo: {
      existingLoans: '', creditCards: '', monthlyObligations: '', loanAmount: '', loanPurpose: '', tenure: ''
    },
    consentInfo: {
      dataProcessing: false, creditCheck: false, marketing: false, termsAccepted: false
    }
  });
  const [formValidation, setFormValidation] = useState<FormValidation>({});
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [detectedLoanType, setDetectedLoanType] = useState<string>('');

  const chatQuestions = [
    { field: 'name', question: "Hi! I'm your FiNNGUARD assistant. Let's start with your full name as per PAN card.", type: 'text' },
    { field: 'email', question: "Great! Now, please provide your email address for communication.", type: 'email' },
    { field: 'phone', question: "What's your mobile number?", type: 'tel' },
    { field: 'pan', question: "Please enter your PAN number (format: ABCDE1234F)", type: 'text' },
    { field: 'monthlyIncome', question: "What's your monthly gross income in rupees?", type: 'number' },
    { field: 'employmentType', question: "Are you Salaried or Self-Employed?", type: 'select', options: ['Salaried', 'Self-Employed', 'Business Owner'] },
    { field: 'loanAmount', question: "How much loan amount are you looking for?", type: 'number' },
    { field: 'loanPurpose', question: "What's the purpose of this loan?", type: 'select', options: ['Home Purchase', 'Home Construction', 'Car Purchase', 'Personal Use', 'Business Expansion', 'Education', 'Medical Emergency'] }
  ];

  useEffect(() => {
    // Initialize chat with first question directly for detailed assessment
    if (assessmentType === 'detailed' && chatMessages.length === 0) {
      setChatMessages([{
        id: '1',
        type: 'bot',
        message: chatQuestions[0].question,
        timestamp: new Date(),
        showSuggestions: shouldShowSuggestions(chatQuestions[0].field),
        suggestionsType: chatQuestions[0].field
      }]);
    }
  }, [assessmentType]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.getElementById('chat-messages');
      if (chatContainer) {
        setTimeout(() => {
          chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    };
    
    scrollToBottom();
  }, [chatMessages]);

  // Enhanced form validation
  const validateForm = (): boolean => {
    const validations: FormValidation = {};
    let isValid = true;

    // Validate personal info
    validations.name = validateName(applicantData.personalInfo.name);
    validations.email = validateEmail(applicantData.personalInfo.email);
    validations.phone = validatePhone(applicantData.personalInfo.phone);
    validations.pan = validatePAN(applicantData.personalInfo.pan);

    // Validate financial info
    validations.monthlyIncome = validateIncome(applicantData.employmentInfo.monthlyIncome);
    validations.loanAmount = validateLoanAmount(applicantData.financialInfo.loanAmount);

    // Check if any validation failed
    Object.values(validations).forEach(validation => {
      if (!validation.isValid) {
        isValid = false;
      }
    });

    setFormValidation(validations);
    return isValid;
  };

  const handleQuickCheck = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Validate quick check data
      const incomeValidation = validateIncome(quickCheckData.monthlyIncome);
      const loanValidation = validateLoanAmount(quickCheckData.loanAmount);
      
      if (!incomeValidation.isValid) {
        throw new Error(incomeValidation.message);
      }
      
      if (!loanValidation.isValid) {
        throw new Error(loanValidation.message);
      }

      const income = parseFloat(quickCheckData.monthlyIncome) || 0;
      const requestedAmount = parseFloat(quickCheckData.loanAmount) || 0;
      const creditScoreRange = quickCheckData.creditScore;
      
      // Updated FOIR calculation to 70%
      const foirLimit = quickCheckData.employmentType === 'Salaried' ? 0.70 : 0.65;
      const maxEMI = income * foirLimit;
      
      // Estimate interest rate based on credit score
      let interestRate = 12.0;
      if (creditScoreRange === '750+') interestRate = 8.5;
      else if (creditScoreRange === '700-749') interestRate = 9.5;
      else if (creditScoreRange === '650-699') interestRate = 10.5;
      else if (creditScoreRange === '600-649') interestRate = 11.5;
      
      const rate = interestRate / 100 / 12;
      const tenure = 240; // 20 years default
      
      const maxLoanAmount = maxEMI > 0 ? (maxEMI * (Math.pow(1 + rate, tenure) - 1)) / (rate * Math.pow(1 + rate, tenure)) : 0;
      const recommendedAmount = Math.min(maxLoanAmount, requestedAmount);
      const emi = recommendedAmount > 0 ? (recommendedAmount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1) : 0;
      
      const result: EligibilityResult = {
        status: recommendedAmount >= requestedAmount * 0.8 ? 'eligible' : 
                recommendedAmount >= requestedAmount * 0.5 ? 'conditionally_eligible' : 'not_eligible',
        maxLoanAmount: Math.round(maxLoanAmount),
        recommendedAmount: Math.round(recommendedAmount),
        interestRate: interestRate,
        tenure: tenure,
        emi: Math.round(emi),
        foir: Math.round((emi / income) * 100 * 100) / 100,
        creditScore: parseInt(creditScoreRange.split('-')[0]) || 750,
        lenderRecommendations: [
          {
            name: 'FiNNGUARD Premium',
            rate: interestRate,
            amount: Math.round(recommendedAmount),
            features: ['Quick Processing', 'Flexible Tenure']
          },
          {
            name: 'Multiple Lender Network',
            rate: interestRate - 0.5,
            amount: Math.round(recommendedAmount * 1.1),
            features: ['Best Rates', 'Multiple Options'],
            status: 'Coming Soon'
          }
        ]
      };
      
      setEligibilityResult(result);
      setCurrentStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (value: string) => {
    handleChatResponse(value, true);
  };

  const handleChatResponse = async (answer: string, fromSuggestion: boolean = false) => {
    setIsLoading(true);
    
    try {
      const newUserMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        message: answer,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, newUserMessage]);

      // Enhanced loan type detection
      const loanTypeMatch = detectLoanType(answer);
      if (loanTypeMatch && !detectedLoanType) {
        setDetectedLoanType(loanTypeMatch.type);
        // Auto-populate loan purpose
        setApplicantData(prev => ({
          ...prev,
          financialInfo: { ...prev.financialInfo, loanPurpose: loanTypeMatch.type }
        }));
      }

      const currentField = chatQuestions[currentQuestion].field;
      let processedAnswer = answer.trim();
      
      // Enhanced processing based on field type
      if (currentField === 'monthlyIncome' || currentField === 'loanAmount') {
        const conversionResult = enhancedNumberConversion(answer);
        if (conversionResult.error) {
          setError(conversionResult.error);
          setIsLoading(false);
          return;
        }
        processedAnswer = conversionResult.value;
      } else if (currentField === 'employmentType') {
        processedAnswer = enhancedEmploymentMatching(answer);
      }

      // Validate processed answer (skip validation for personal details if user typed them)
      let validationResult: ValidationResult = { isValid: true, message: '' };
      
      if (!['name', 'email', 'phone', 'pan'].includes(currentField)) {
        switch (currentField) {
          case 'monthlyIncome':
            validationResult = validateIncome(processedAnswer);
            break;
          case 'loanAmount':
            validationResult = validateLoanAmount(processedAnswer);
            break;
        }

        if (!validationResult.isValid) {
          setError(validationResult.message);
          setIsLoading(false);
          return;
        }
      }

      // Enhanced field mapping
      const fieldMapping: { [key: string]: [keyof ApplicantData, string] } = {
        'name': ['personalInfo', 'name'],
        'email': ['personalInfo', 'email'],
        'phone': ['personalInfo', 'phone'],
        'pan': ['personalInfo', 'pan'],
        'monthlyIncome': ['employmentInfo', 'monthlyIncome'],
        'employmentType': ['employmentInfo', 'type'],
        'loanAmount': ['financialInfo', 'loanAmount'],
        'loanPurpose': ['financialInfo', 'loanPurpose']
      };

      if (fieldMapping[currentField]) {
        const [section, field] = fieldMapping[currentField];
        
        setApplicantData(prev => ({
          ...prev,
          [section]: {
            ...prev[section as keyof ApplicantData],
            [field]: processedAnswer
          }
        }));
      }

      setTimeout(() => {
        if (currentQuestion < chatQuestions.length - 1) {
          const nextQuestion = chatQuestions[currentQuestion + 1];
          
          // Get enhanced question with suggestions
          const { question: questionText, suggestionsType } = shouldShowSuggestions(nextQuestion.field) 
            ? getQuestionWithSuggestions(nextQuestion.field, nextQuestion.question)
            : { question: nextQuestion.question, suggestionsType: nextQuestion.field };
          
          // Generate contextual follow-up if loan type detected
          let finalQuestionText = questionText;
          if (detectedLoanType) {
            const contextualQuestion = generateFollowUpQuestion(detectedLoanType, nextQuestion.field);
            if (contextualQuestion) {
              finalQuestionText = contextualQuestion;
            }
          }
          
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            message: finalQuestionText,
            timestamp: new Date(),
            loanTypeDetected: loanTypeMatch?.type,
            showSuggestions: shouldShowSuggestions(nextQuestion.field),
            suggestionsType: suggestionsType
          };
          setChatMessages(prev => [...prev, botMessage]);
          setCurrentQuestion(prev => prev + 1);
        } else {
          const completionMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            message: "Thank you! I have all the basic information. Now let's proceed to detailed assessment.",
            timestamp: new Date()
          };
          setChatMessages(prev => [...prev, completionMessage]);
          setCurrentStep(2);
        }
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred processing your response');
      setIsLoading(false);
    }
  };

  const calculateTentativeEligibility = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      if (!validateForm()) {
        throw new Error('Please correct the validation errors before proceeding');
      }

      const income = parseFloat(applicantData.employmentInfo.monthlyIncome) || 0;
      const obligations = parseFloat(applicantData.financialInfo.monthlyObligations) || 0;
      const requestedAmount = parseFloat(applicantData.financialInfo.loanAmount) || 0;
      
      // Updated FOIR calculation to 70%
      const foirLimit = applicantData.employmentInfo.type === 'Salaried' ? 0.70 : 0.65;
      const maxEMI = income * foirLimit - obligations;
      
      const rate = 0.085 / 12;
      const tenure = parseInt(applicantData.financialInfo.tenure) || 240;
      
      const maxLoanAmount = maxEMI > 0 ? (maxEMI * (Math.pow(1 + rate, tenure) - 1)) / (rate * Math.pow(1 + rate, tenure)) : 0;
      
      const recommendedAmount = Math.min(maxLoanAmount, requestedAmount);
      const emi = recommendedAmount > 0 ? (recommendedAmount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1) : 0;
      const foir = income > 0 ? ((emi + obligations) / income) * 100 : 0;
      
      const result: EligibilityResult = {
        status: recommendedAmount >= requestedAmount * 0.8 ? 'eligible' : 
                recommendedAmount >= requestedAmount * 0.5 ? 'conditionally_eligible' : 'not_eligible',
        maxLoanAmount: Math.round(maxLoanAmount),
        recommendedAmount: Math.round(recommendedAmount),
        interestRate: 8.5,
        tenure: tenure,
        emi: Math.round(emi),
        foir: Math.round(foir * 100) / 100,
        creditScore: 750,
        lenderRecommendations: [
          {
            name: 'FiNNGUARD Premium',
            rate: 8.5,
            amount: Math.round(recommendedAmount),
            features: ['Quick Processing', 'Flexible Tenure', 'No Prepayment Charges']
          },
          {
            name: 'Partner Bank Network',
            rate: 9.0,
            amount: Math.round(recommendedAmount * 0.9),
            features: ['Multiple Options', 'Best Rates', 'Digital Process'],
            status: 'Coming Soon'
          },
          {
            name: 'NBFC Partners',
            rate: 9.5,
            amount: Math.round(recommendedAmount * 0.8),
            features: ['Fast Approval', 'Flexible Terms', 'Special Offers'],
            status: 'Coming Soon'
          }
        ]
      };
      
      setEligibilityResult(result);
      setCurrentStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
      setUploadedFile(file);
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentStep(5);
          }, 1000);
        }
      }, 200);
    } else {
      setError('Please upload a valid PDF file under 10MB');
    }
  };

  const handleWhatsAppContact = () => {
    const message = `Hi FiNNGUARD Capital! I've completed the credit eligibility assessment. My details:
    
Name: ${applicantData.personalInfo.name}
Phone: ${applicantData.personalInfo.phone}
Loan Amount: ₹${applicantData.financialInfo.loanAmount}
Monthly Income: ₹${applicantData.employmentInfo.monthlyIncome}

Please contact me to proceed with the loan application.`;
    
    window.open(`https://wa.me/919497544143?text=${encodeURIComponent(message)}`, '_blank');
  };

  const renderErrorAlert = () => {
    if (!error) return null;
    
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <div>
            <h4 className="text-red-800 font-semibold">Error</h4>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setError('')}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            ×
          </Button>
        </div>
      </div>
    );
  };

  const getCurrentSuggestions = (): SuggestionButton[] => {
    if (currentQuestion >= chatQuestions.length) return [];
    
    const currentField = chatQuestions[currentQuestion].field;
    const context = {
      loanType: detectedLoanType || applicantData.financialInfo.loanPurpose
    };
    
    return getSuggestionsForField(currentField, context);
  };

  const renderStep = () => {
    // Choice Screen
    if (assessmentType === 'choice') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Choose Your Assessment Type</h2>
            <p className="text-xl text-slate-600">Select the option that works best for you</p>
          </div>

          {renderErrorAlert()}

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Quick Check Option */}
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-500">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-600">Quick Check</CardTitle>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>2 minutes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">5 basic questions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Instant preliminary results</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">70% FOIR calculation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Option to upgrade to detailed</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setAssessmentType('quick')}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Start Quick Check
                </Button>
              </CardContent>
            </Card>

            {/* Detailed Assessment Option */}
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-green-500">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">Detailed Assessment</CardTitle>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>5-7 minutes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">AI-guided chat with smart suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Comprehensive 70% FOIR analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-sm">Multiple lender network (Coming Soon)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Detailed eligibility report</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setAssessmentType('detailed')}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Start Detailed Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    // Quick Check Flow
    if (assessmentType === 'quick') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Eligibility Check</h2>
            <p className="text-slate-600">Get instant preliminary results with 70% FOIR calculation</p>
          </div>

          {renderErrorAlert()}

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Quick Assessment Form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="loanType">Loan Type *</Label>
                <Select value={quickCheckData.loanType} onValueChange={(value) => setQuickCheckData(prev => ({...prev, loanType: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home Loan">🏠 Home Loan</SelectItem>
                    <SelectItem value="Personal Loan">👤 Personal Loan</SelectItem>
                    <SelectItem value="Car Loan">🚗 Car Loan</SelectItem>
                    <SelectItem value="Business Loan">💼 Business Loan</SelectItem>
                    <SelectItem value="Loan Against Property">🏢 Loan Against Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ValidationInput
                id="quickMonthlyIncome"
                label="Monthly Income (₹)"
                type="number"
                placeholder="Enter your monthly income"
                value={quickCheckData.monthlyIncome}
                onChange={(value) => setQuickCheckData(prev => ({...prev, monthlyIncome: value}))}
                validator={validateIncome}
                required
              />

              <ValidationInput
                id="quickLoanAmount"
                label="Desired Loan Amount (₹)"
                type="number"
                placeholder="Enter desired loan amount"
                value={quickCheckData.loanAmount}
                onChange={(value) => setQuickCheckData(prev => ({...prev, loanAmount: value}))}
                validator={validateLoanAmount}
                required
              />

              <div>
                <Label htmlFor="employmentType">Employment Type *</Label>
                <Select value={quickCheckData.employmentType} onValueChange={(value) => setQuickCheckData(prev => ({...prev, employmentType: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Salaried">👔 Salaried (70% FOIR)</SelectItem>
                    <SelectItem value="Self-Employed">💼 Self-Employed (65% FOIR)</SelectItem>
                    <SelectItem value="Business Owner">🏢 Business Owner (65% FOIR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="creditScore">Credit Score Range</Label>
                <Select value={quickCheckData.creditScore} onValueChange={(value) => setQuickCheckData(prev => ({...prev, creditScore: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credit score range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="750+">⭐ 750+ (Excellent)</SelectItem>
                    <SelectItem value="700-749">✅ 700-749 (Good)</SelectItem>
                    <SelectItem value="650-699">⚡ 650-699 (Fair)</SelectItem>
                    <SelectItem value="600-649">⚠️ 600-649 (Poor)</SelectItem>
                    <SelectItem value="Below 600">❌ Below 600 (Very Poor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setAssessmentType('choice')}
                  className="flex-1"
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={handleQuickCheck}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={!quickCheckData.loanType || !quickCheckData.monthlyIncome || !quickCheckData.loanAmount || !quickCheckData.employmentType || isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Check Eligibility
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Detailed Assessment Flow (existing chat-based flow)
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Interactive Credit Assessment</h2>
              <p className="text-slate-600">Let our AI assistant guide you through the eligibility process</p>
              <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Click on the suggested buttons for faster responses, or type your own answer
                </p>
              </div>
            </div>
            
            {renderErrorAlert()}
            
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  Chat with FiNNGUARD Assistant
                  {detectedLoanType && (
                    <Badge variant="secondary" className="ml-2">
                      Detected: {detectedLoanType}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  id="chat-messages" 
                  className="h-96 overflow-y-auto border rounded-lg p-4 pb-6 mb-4 bg-slate-50"
                >
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`mb-6 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-3 rounded-lg max-w-xs ${
                        msg.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border shadow-sm'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        {msg.loanTypeDetected && (
                          <div className="text-xs mt-2 text-green-600">
                            ✓ Detected: {msg.loanTypeDetected}
                          </div>
                        )}
                        <span className="text-xs opacity-70">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="h-4"></div>
                </div>
                
                <div className="flex gap-4 mb-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setAssessmentType('choice')}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>

                {currentQuestion < chatQuestions.length && (
                  <div className="space-y-3">
                    {/* Smart Suggestions */}
                    {shouldShowSuggestions(chatQuestions[currentQuestion].field) && (
                      <ChatSuggestions
                        suggestions={getCurrentSuggestions()}
                        onSelect={handleSuggestionClick}
                        disabled={isLoading}
                        maxVisible={4}
                      />
                    )}
                    
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your answer..."
                        disabled={isLoading}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !isLoading) {
                            const target = e.target as HTMLInputElement;
                            if (target.value.trim()) {
                              handleChatResponse(target.value);
                              target.value = '';
                            }
                          }
                        }}
                      />
                      <Button 
                        onClick={() => {
                          const input = document.querySelector('input') as HTMLInputElement;
                          if (input?.value.trim() && !isLoading) {
                            handleChatResponse(input.value);
                            input.value = '';
                          }
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send'}
                      </Button>
                    </div>
                    <Progress value={(currentQuestion / chatQuestions.length) * 100} className="w-full" />
                  </div>
                )}
                
                {currentQuestion >= chatQuestions.length && (
                  <div className="text-center">
                    <Button 
                      onClick={() => setCurrentStep(2)} 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Continue to Detailed Assessment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Detailed Information</h2>
              <p className="text-slate-600">Please provide complete details for accurate assessment</p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Information from chat has been auto-filled. You can edit any field below.
                </p>
              </div>
            </div>

            {renderErrorAlert()}

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ValidationInput
                    id="name"
                    label="Full Name"
                    value={applicantData.personalInfo.name}
                    onChange={(value) => setApplicantData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, name: value }
                    }))}
                    validator={validateName}
                    required
                    autoFilled={!!applicantData.personalInfo.name}
                  />

                  <ValidationInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={applicantData.personalInfo.email}
                    onChange={(value) => setApplicantData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: value }
                    }))}
                    validator={validateEmail}
                    required
                    autoFilled={!!applicantData.personalInfo.email}
                  />

                  <ValidationInput
                    id="phone"
                    label="Phone Number"
                    value={applicantData.personalInfo.phone}
                    onChange={(value) => setApplicantData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: value }
                    }))}
                    validator={validatePhone}
                    required
                    autoFilled={!!applicantData.personalInfo.phone}
                  />

                  <ValidationInput
                    id="pan"
                    label="PAN Number"
                    placeholder="AAAAA9999A"
                    value={applicantData.personalInfo.pan}
                    onChange={(value) => setApplicantData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, pan: value.toUpperCase() }
                    }))}
                    validator={validatePAN}
                    required
                    autoFilled={!!applicantData.personalInfo.pan}
                  />
                </CardContent>
              </Card>

              {/* Employment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Employment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Employment Type *</Label>
                    <Select 
                      value={applicantData.employmentInfo.type}
                      onValueChange={(value) => setApplicantData(prev => ({
                        ...prev,
                        employmentInfo: { ...prev.employmentInfo, type: value }
                      }))}
                    >
                      <SelectTrigger className={applicantData.employmentInfo.type ? 'bg-green-50 border-green-200' : ''}>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Salaried">👔 Salaried (70% FOIR)</SelectItem>
                        <SelectItem value="Self-Employed">💼 Self-Employed (65% FOIR)</SelectItem>
                        <SelectItem value="Business Owner">🏢 Business Owner (65% FOIR)</SelectItem>
                      </SelectContent>
                    </Select>
                    {applicantData.employmentInfo.type && (
                      <Badge variant="secondary" className="mt-1 text-xs">Auto-filled from chat</Badge>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="company">Company/Business Name *</Label>
                    <Input
                      id="company"
                      value={applicantData.employmentInfo.company}
                      onChange={(e) => setApplicantData(prev => ({
                        ...prev,
                        employmentInfo: { ...prev.employmentInfo, company: e.target.value }
                      }))}
                    />
                  </div>

                  <ValidationInput
                    id="monthlyIncome"
                    label="Monthly Gross Income (₹)"
                    type="number"
                    value={applicantData.employmentInfo.monthlyIncome}
                    onChange={(value) => setApplicantData(prev => ({
                      ...prev,
                      employmentInfo: { ...prev.employmentInfo, monthlyIncome: value }
                    }))}
                    validator={validateIncome}
                    required
                    autoFilled={!!applicantData.employmentInfo.monthlyIncome}
                  />

                  <div>
                    <Label htmlFor="experience">Work Experience (Years)</Label>
                    <Input
                      id="experience"
                      value={applicantData.employmentInfo.experience}
                      onChange={(e) => setApplicantData(prev => ({
                        ...prev,
                        employmentInfo: { ...prev.employmentInfo, experience: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Financial Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ValidationInput
                    id="loanAmount"
                    label="Loan Amount Required (₹)"
                    type="number"
                    value={applicantData.financialInfo.loanAmount}
                    onChange={(value) => setApplicantData(prev => ({
                      ...prev,
                      financialInfo: { ...prev.financialInfo, loanAmount: value }
                    }))}
                    validator={validateLoanAmount}
                    required
                    autoFilled={!!applicantData.financialInfo.loanAmount}
                  />

                  <div>
                    <Label>Loan Purpose *</Label>
                    <Select 
                      value={applicantData.financialInfo.loanPurpose}
                      onValueChange={(value) => setApplicantData(prev => ({
                        ...prev,
                        financialInfo: { ...prev.financialInfo, loanPurpose: value }
                      }))}
                    >
                      <SelectTrigger className={applicantData.financialInfo.loanPurpose ? 'bg-green-50 border-green-200' : ''}>
                        <SelectValue placeholder="Select loan purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Home Purchase">🏠 Home Purchase</SelectItem>
                        <SelectItem value="Home Construction">🏗️ Home Construction</SelectItem>
                        <SelectItem value="Car Purchase">🚗 Car Purchase</SelectItem>
                        <SelectItem value="Personal Use">👤 Personal Use</SelectItem>
                        <SelectItem value="Business Expansion">💼 Business Expansion</SelectItem>
                        <SelectItem value="Education">🎓 Education</SelectItem>
                        <SelectItem value="Medical Emergency">🏥 Medical Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    {applicantData.financialInfo.loanPurpose && (
                      <Badge variant="secondary" className="mt-1 text-xs">Auto-filled from chat</Badge>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="tenure">Preferred Tenure (Months)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      value={applicantData.financialInfo.tenure}
                      onChange={(e) => setApplicantData(prev => ({
                        ...prev,
                        financialInfo: { ...prev.financialInfo, tenure: e.target.value }
                      }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="obligations">Existing Monthly Obligations (₹)</Label>
                    <Input
                      id="obligations"
                      type="number"
                      value={applicantData.financialInfo.monthlyObligations}
                      onChange={(e) => setApplicantData(prev => ({
                        ...prev,
                        financialInfo: { ...prev.financialInfo, monthlyObligations: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Consent Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Consent & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="dataProcessing"
                        checked={applicantData.consentInfo.dataProcessing}
                        onCheckedChange={(checked) => setApplicantData(prev => ({
                          ...prev,
                          consentInfo: { ...prev.consentInfo, dataProcessing: checked as boolean }
                        }))}
                      />
                      <Label htmlFor="dataProcessing" className="text-sm">
                        I consent to processing of my personal data for loan eligibility assessment
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="creditCheck"
                        checked={applicantData.consentInfo.creditCheck}
                        onCheckedChange={(checked) => setApplicantData(prev => ({
                          ...prev,
                          consentInfo: { ...prev.consentInfo, creditCheck: checked as boolean }
                        }))}
                      />
                      <Label htmlFor="creditCheck" className="text-sm">
                        I authorize credit bureau checks and report access
                      </Label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms"
                        checked={applicantData.consentInfo.termsAccepted}
                        onCheckedChange={(checked) => setApplicantData(prev => ({
                          ...prev,
                          consentInfo: { ...prev.consentInfo, termsAccepted: checked as boolean }
                        }))}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I accept the Terms & Conditions and Privacy Policy
                      </Label>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Your data is protected under DPDP Act 2023. You can withdraw consent anytime.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setCurrentStep(3)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!applicantData.consentInfo.dataProcessing || !applicantData.consentInfo.termsAccepted || isLoading}
              >
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Calculate Tentative Eligibility
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">FOIR & Eligibility Calculation</h2>
              <p className="text-slate-600">Calculating your loan eligibility with enhanced 70% FOIR</p>
            </div>

            {renderErrorAlert()}

            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Advanced Eligibility Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Income Analysis</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Monthly Gross Income:</span>
                        <span className="font-semibold">₹{applicantData.employmentInfo.monthlyIncome}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Employment Type:</span>
                        <span className="font-semibold">{applicantData.employmentInfo.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FOIR Limit:</span>
                        <span className="font-semibold text-green-600">{applicantData.employmentInfo.type === 'Salaried' ? '70%' : '65%'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Obligation Analysis</h3>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Existing Obligations:</span>
                        <span className="font-semibold">₹{applicantData.financialInfo.monthlyObligations || '0'}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Requested Amount:</span>
                        <span className="font-semibold">₹{applicantData.financialInfo.loanAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Preferred Tenure:</span>
                        <span className="font-semibold">{applicantData.financialInfo.tenure || '240'} months</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button 
                    onClick={calculateTentativeEligibility}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Calculate Eligibility
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                {assessmentType === 'quick' ? 'Quick Check Result' : 'Tentative Eligibility Result'}
              </h2>
              <p className="text-slate-600">
                {assessmentType === 'quick' ? 'Preliminary assessment with 70% FOIR calculation' : 'Based on your comprehensive income and obligations analysis'}
              </p>
            </div>

            {renderErrorAlert()}

            {eligibilityResult && (
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Status Card */}
                <Card className={`border-2 ${
                  eligibilityResult.status === 'eligible' ? 'border-green-500 bg-green-50' :
                  eligibilityResult.status === 'conditionally_eligible' ? 'border-yellow-500 bg-yellow-50' :
                  'border-red-500 bg-red-50'
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      {eligibilityResult.status === 'eligible' ? (
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      ) : eligibilityResult.status === 'conditionally_eligible' ? (
                        <AlertTriangle className="w-12 h-12 text-yellow-600" />
                      ) : (
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {eligibilityResult.status === 'eligible' ? 'Congratulations! You are Eligible' :
                       eligibilityResult.status === 'conditionally_eligible' ? 'Conditionally Eligible' :
                       'Not Eligible'}
                    </h3>
                    <p className="text-slate-600">
                      {eligibilityResult.status === 'eligible' ? 'Your loan application has high approval chances with our enhanced 70% FOIR calculation' :
                       eligibilityResult.status === 'conditionally_eligible' ? 'Your loan may be approved with modified terms' :
                       'Your current profile does not meet eligibility criteria'}
                    </p>
                  </CardContent>
                </Card>

                {/* Eligibility Details */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Loan Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Recommended Amount:</span>
                          <span className="font-semibold text-green-600">₹{eligibilityResult.recommendedAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Rate:</span>
                          <span className="font-semibold">{eligibilityResult.interestRate}% p.a.</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tenure:</span>
                          <span className="font-semibold">{eligibilityResult.tenure} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly EMI:</span>
                          <span className="font-semibold text-blue-600">₹{eligibilityResult.emi.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Financial Ratios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>FOIR:</span>
                          <span className={`font-semibold ${eligibilityResult.foir <= 70 ? 'text-green-600' : 'text-red-600'}`}>
                            {eligibilityResult.foir}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Credit Score:</span>
                          <span className="font-semibold text-blue-600">{eligibilityResult.creditScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Loan Capacity:</span>
                          <span className="font-semibold">₹{eligibilityResult.maxLoanAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {assessmentType === 'quick' && (
                          <Button 
                            onClick={() => {
                              setAssessmentType('detailed');
                              setCurrentStep(1);
                            }}
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={isLoading}
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Upgrade to Detailed Assessment
                          </Button>
                        )}
                        <Button 
                          onClick={handleWhatsAppContact}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isLoading}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contact Expert
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={() => setAssessmentType('choice')}
                          disabled={isLoading}
                        >
                          Start New Assessment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lender Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lender Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {eligibilityResult.lenderRecommendations.map((lender, index) => (
                        <div key={index} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                          lender.status === 'Coming Soon' ? 'bg-gray-50 border-gray-300' : ''
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-slate-800">{lender.name}</h4>
                            {lender.status === 'Coming Soon' && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Coming Soon
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between">
                              <span className="text-sm">Rate:</span>
                              <span className="text-sm font-semibold">{lender.rate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Amount:</span>
                              <span className="text-sm font-semibold">₹{lender.amount.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {lender.features.map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs mr-1">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          {lender.status === 'Coming Soon' && (
                            <p className="text-xs text-gray-600 mt-2">
                              Multiple lender network launching soon for better rates and options
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Credit Eligibility Assessment - FiNNGUARD Capital</title>
        <meta name="description" content="Check your loan eligibility instantly with FiNNGUARD's AI-powered credit assessment system. Enhanced 70% FOIR calculation for better eligibility." />
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
              <Link to="/credit-eligibility" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Credit Eligibility</Link>
              <Link to="/contact" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Contact</Link>
            </nav>
            <Button onClick={handleWhatsAppContact} className="bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </header>

        {/* Progress Indicator - Only show for detailed assessment */}
        {assessmentType === 'detailed' && (
          <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                {[
                  { step: 1, label: 'Smart Chat', icon: MessageCircle },
                  { step: 2, label: 'Detailed Info', icon: FileText },
                  { step: 3, label: 'FOIR Analysis', icon: Calculator },
                  { step: 4, label: 'Final Result', icon: CheckCircle }
                ].map(({ step, label, icon: Icon }) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs mt-1 text-slate-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {renderStep()}

          {/* Navigation - Only for detailed assessment */}
          {assessmentType === 'detailed' && currentStep > 1 && currentStep < 4 && (
            <div className="flex justify-between mt-8 max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < 3 && (
                <Button 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 px-4 mt-16">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <img src="/assets/logo_variant_1.png" alt="FiNNGUARD Capital" className="h-12 mb-4" />
                <p className="text-slate-300 mb-4">Your Financial Goals, Our Commitment</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link to="/" className="block text-slate-300 hover:text-yellow-400 transition-colors">Home</Link>
                  <Link to="/about" className="block text-slate-300 hover:text-yellow-400 transition-colors">About Us</Link>
                  <Link to="/emi-calculator" className="block text-slate-300 hover:text-yellow-400 transition-colors">EMI Calculator</Link>
                  <Link to="/credit-eligibility" className="block text-slate-300 hover:text-yellow-400 transition-colors">Credit Eligibility</Link>
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
    </>
  );
}