// Smart chat enhancement utilities
export interface LoanTypeMatch {
  type: string;
  confidence: number;
  keywords: string[];
}

// Loan type detection from user messages
export const detectLoanType = (message: string): LoanTypeMatch | null => {
  const cleanMessage = message.toLowerCase().trim();
  
  const loanTypes = [
    {
      type: 'Home Purchase',
      keywords: ['home', 'house', 'property', 'flat', 'apartment', 'buy house', 'home loan', 'housing', 'residential'],
      confidence: 0.9
    },
    {
      type: 'Car Purchase', 
      keywords: ['car', 'vehicle', 'auto', 'automobile', 'bike', 'motorcycle', 'car loan', 'vehicle loan'],
      confidence: 0.9
    },
    {
      type: 'Personal Use',
      keywords: ['personal', 'personal loan', 'emergency', 'medical', 'wedding', 'travel', 'education'],
      confidence: 0.8
    },
    {
      type: 'Business Expansion',
      keywords: ['business', 'company', 'startup', 'expansion', 'working capital', 'business loan', 'commercial'],
      confidence: 0.9
    },
    {
      type: 'Home Construction',
      keywords: ['construction', 'build', 'building', 'construct house', 'home construction', 'plot'],
      confidence: 0.9
    }
  ];
  
  for (const loanType of loanTypes) {
    for (const keyword of loanType.keywords) {
      if (cleanMessage.includes(keyword)) {
        return {
          type: loanType.type,
          confidence: loanType.confidence,
          keywords: [keyword]
        };
      }
    }
  }
  
  return null;
};

// Enhanced employment type matching
export const enhancedEmploymentMatching = (input: string): string => {
  const cleanInput = input.toLowerCase().trim();
  
  // Comprehensive matching patterns
  const employmentPatterns = [
    {
      type: 'Salaried',
      patterns: ['salaried', 'salary', 'employee', 'job', 'work for', 'employed', 'corporate', 'company employee', 'govt job', 'government']
    },
    {
      type: 'Self-Employed',
      patterns: ['self employed', 'self-employed', 'freelancer', 'freelance', 'consultant', 'contractor', 'independent', 'own practice', 'professional']
    },
    {
      type: 'Business Owner',
      patterns: ['business', 'owner', 'entrepreneur', 'proprietor', 'partner', 'director', 'ceo', 'founder', 'shop owner', 'business man']
    }
  ];
  
  for (const employment of employmentPatterns) {
    for (const pattern of employment.patterns) {
      if (cleanInput.includes(pattern)) {
        return employment.type;
      }
    }
  }
  
  return input; // Return original if no match
};

// Smart number conversion with better error handling
export const enhancedNumberConversion = (input: string): { value: string; error?: string } => {
  const cleanInput = input.toLowerCase().trim();
  
  try {
    // Handle empty input
    if (!cleanInput) {
      return { value: '', error: 'Please enter an amount' };
    }
    
    // Handle "lac" or "lakh" 
    if (cleanInput.includes('lac') || cleanInput.includes('lakh')) {
      const number = parseFloat(cleanInput.replace(/[^0-9.]/g, ''));
      if (isNaN(number)) {
        return { value: input, error: 'Invalid number format with lac/lakh' };
      }
      return { value: (number * 100000).toString() };
    }
    
    // Handle "crore"
    if (cleanInput.includes('crore')) {
      const number = parseFloat(cleanInput.replace(/[^0-9.]/g, ''));
      if (isNaN(number)) {
        return { value: input, error: 'Invalid number format with crore' };
      }
      return { value: (number * 10000000).toString() };
    }
    
    // Handle "k" or "thousand"
    if (cleanInput.includes('k') || cleanInput.includes('thousand')) {
      const number = parseFloat(cleanInput.replace(/[^0-9.]/g, ''));
      if (isNaN(number)) {
        return { value: input, error: 'Invalid number format with k/thousand' };
      }
      return { value: (number * 1000).toString() };
    }
    
    // Handle direct numbers
    const numericOnly = cleanInput.replace(/[^0-9]/g, '');
    if (numericOnly && !isNaN(parseFloat(numericOnly))) {
      return { value: numericOnly };
    }
    
    return { value: input, error: 'Please enter a valid number' };
  } catch (error) {
    return { value: input, error: 'Error processing number format' };
  }
};

// Generate contextual follow-up questions based on loan type
export const generateFollowUpQuestion = (loanType: string, currentField: string): string => {
  const followUps: { [key: string]: { [field: string]: string } } = {
    'Home Purchase': {
      'loanAmount': 'What is the approximate value of the property you wish to purchase?',
      'monthlyIncome': 'What is your monthly household income including spouse income if applicable?'
    },
    'Car Purchase': {
      'loanAmount': 'What is the on-road price of the car you want to buy?',
      'monthlyIncome': 'What is your monthly take-home salary?'
    },
    'Business Expansion': {
      'loanAmount': 'How much funding do you need for your business expansion?',
      'monthlyIncome': 'What is your average monthly business income?'
    }
  };
  
  return followUps[loanType]?.[currentField] || '';
};