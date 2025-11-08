// Smart suggestion system for chat interactions
export interface SuggestionButton {
  text: string;
  value: string;
  icon?: string;
}

// Loan type suggestions
export const loanTypeSuggestions: SuggestionButton[] = [
  { text: '🏠 Home Loan', value: 'Home Purchase' },
  { text: '🚗 Car Loan', value: 'Car Purchase' },
  { text: '💼 Business Loan', value: 'Business Expansion' },
  { text: '👤 Personal Loan', value: 'Personal Use' },
  { text: '🏢 Property Loan', value: 'Loan Against Property' },
  { text: '🏗️ Construction Loan', value: 'Home Construction' },
  { text: '🎓 Education Loan', value: 'Education' },
  { text: '🏥 Medical Loan', value: 'Medical Emergency' }
];

// Income range suggestions
export const incomeRangeSuggestions: SuggestionButton[] = [
  { text: '₹25K-50K', value: '37500' },
  { text: '₹50K-1L', value: '75000' },
  { text: '₹1L-2L', value: '150000' },
  { text: '₹2L-5L', value: '350000' },
  { text: '₹5L-10L', value: '750000' },
  { text: '₹10L+', value: '1200000' }
];

// Employment type suggestions
export const employmentTypeSuggestions: SuggestionButton[] = [
  { text: '👔 Salaried', value: 'Salaried' },
  { text: '💼 Self-Employed', value: 'Self-Employed' },
  { text: '🏢 Business Owner', value: 'Business Owner' },
  { text: '⚖️ Professional', value: 'Self-Employed' },
  { text: '🏛️ Government', value: 'Salaried' },
  { text: '🎯 Consultant', value: 'Self-Employed' }
];

// Loan amount suggestions
export const loanAmountSuggestions: SuggestionButton[] = [
  { text: '₹5 Lac', value: '500000' },
  { text: '₹10 Lac', value: '1000000' },
  { text: '₹25 Lac', value: '2500000' },
  { text: '₹50 Lac', value: '5000000' },
  { text: '₹75 Lac', value: '7500000' },
  { text: '₹1 Crore', value: '10000000' },
  { text: '₹2 Crore', value: '20000000' },
  { text: '₹5 Crore', value: '50000000' }
];

// Credit score suggestions
export const creditScoreSuggestions: SuggestionButton[] = [
  { text: '⭐ 750+ (Excellent)', value: '750+' },
  { text: '✅ 700-749 (Good)', value: '700-749' },
  { text: '⚡ 650-699 (Fair)', value: '650-699' },
  { text: '⚠️ 600-649 (Poor)', value: '600-649' },
  { text: '❌ Below 600', value: 'Below 600' },
  { text: '❓ Don\'t Know', value: '700-749' }
];

// Yes/No suggestions
export const yesNoSuggestions: SuggestionButton[] = [
  { text: '✅ Yes', value: 'yes' },
  { text: '❌ No', value: 'no' }
];

// City suggestions (major Indian cities)
export const citySuggestions: SuggestionButton[] = [
  { text: 'Mumbai', value: 'Mumbai' },
  { text: 'Delhi', value: 'Delhi' },
  { text: 'Bangalore', value: 'Bangalore' },
  { text: 'Chennai', value: 'Chennai' },
  { text: 'Pune', value: 'Pune' },
  { text: 'Hyderabad', value: 'Hyderabad' },
  { text: 'Ahmedabad', value: 'Ahmedabad' },
  { text: 'Kolkata', value: 'Kolkata' },
  { text: 'Thrissur', value: 'Thrissur' },
  { text: 'Kochi', value: 'Kochi' }
];

// Company suggestions
export const companySuggestions: SuggestionButton[] = [
  { text: 'TCS', value: 'Tata Consultancy Services' },
  { text: 'Infosys', value: 'Infosys Limited' },
  { text: 'Wipro', value: 'Wipro Limited' },
  { text: 'Accenture', value: 'Accenture' },
  { text: 'HCL Tech', value: 'HCL Technologies' },
  { text: 'Tech Mahindra', value: 'Tech Mahindra' },
  { text: 'Cognizant', value: 'Cognizant' },
  { text: 'IBM', value: 'IBM India' },
  { text: 'Government', value: 'Government of India' },
  { text: 'Other', value: 'Other Company' }
];

// Tenure suggestions
export const tenureSuggestions: SuggestionButton[] = [
  { text: '5 Years', value: '60' },
  { text: '10 Years', value: '120' },
  { text: '15 Years', value: '180' },
  { text: '20 Years', value: '240' },
  { text: '25 Years', value: '300' },
  { text: '30 Years', value: '360' }
];

// Experience suggestions
export const experienceSuggestions: SuggestionButton[] = [
  { text: '0-2 Years', value: '1' },
  { text: '2-5 Years', value: '3' },
  { text: '5-10 Years', value: '7' },
  { text: '10-15 Years', value: '12' },
  { text: '15+ Years', value: '18' }
];

// Function to get suggestions based on field type
export const getSuggestionsForField = (field: string, context?: any): SuggestionButton[] => {
  switch (field) {
    case 'loanPurpose':
      return loanTypeSuggestions;
    
    case 'monthlyIncome':
      return incomeRangeSuggestions;
    
    case 'employmentType':
      return employmentTypeSuggestions;
    
    case 'loanAmount':
      // Context-aware loan amount suggestions based on loan type
      if (context?.loanType === 'Car Purchase') {
        return [
          { text: '₹3 Lac', value: '300000' },
          { text: '₹5 Lac', value: '500000' },
          { text: '₹8 Lac', value: '800000' },
          { text: '₹12 Lac', value: '1200000' },
          { text: '₹20 Lac', value: '2000000' },
          { text: '₹30 Lac', value: '3000000' }
        ];
      } else if (context?.loanType === 'Personal Use') {
        return [
          { text: '₹1 Lac', value: '100000' },
          { text: '₹2 Lac', value: '200000' },
          { text: '₹5 Lac', value: '500000' },
          { text: '₹10 Lac', value: '1000000' },
          { text: '₹15 Lac', value: '1500000' },
          { text: '₹25 Lac', value: '2500000' }
        ];
      }
      return loanAmountSuggestions;
    
    case 'creditScore':
      return creditScoreSuggestions;
    
    case 'city':
      return citySuggestions;
    
    case 'company':
      return companySuggestions;
    
    case 'tenure':
      return tenureSuggestions;
    
    case 'experience':
      return experienceSuggestions;
    
    case 'yesno':
      return yesNoSuggestions;
    
    default:
      return [];
  }
};

// Function to determine if a field should show suggestions
export const shouldShowSuggestions = (field: string): boolean => {
  const fieldsWithSuggestions = [
    'loanPurpose', 'monthlyIncome', 'employmentType', 'loanAmount', 
    'creditScore', 'city', 'company', 'tenure', 'experience', 'yesno'
  ];
  return fieldsWithSuggestions.includes(field);
};

// Function to get contextual question with suggestions
export const getQuestionWithSuggestions = (field: string, originalQuestion: string): { question: string; suggestionsType: string } => {
  const questionMappings: { [key: string]: { question: string; suggestionsType: string } } = {
    'loanPurpose': {
      question: 'What type of loan are you looking for? You can click on the options below or type your specific requirement.',
      suggestionsType: 'loanPurpose'
    },
    'monthlyIncome': {
      question: 'What is your monthly gross income? You can select a range below or enter the exact amount.',
      suggestionsType: 'monthlyIncome'
    },
    'employmentType': {
      question: 'What is your employment type? Please select from the options below.',
      suggestionsType: 'employmentType'
    },
    'loanAmount': {
      question: 'How much loan amount do you need? You can select from common amounts below or enter your specific requirement.',
      suggestionsType: 'loanAmount'
    }
  };

  return questionMappings[field] || { question: originalQuestion, suggestionsType: field };
};