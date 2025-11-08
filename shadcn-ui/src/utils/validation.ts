// Validation utilities for form inputs
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// PAN validation - Format: AAAAA9999A (5 letters + 4 digits + 1 letter)
export const validatePAN = (pan: string): ValidationResult => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const cleanPAN = pan.toUpperCase().trim();
  
  if (!cleanPAN) {
    return { isValid: false, message: 'PAN number is required' };
  }
  
  if (cleanPAN.length !== 10) {
    return { isValid: false, message: 'PAN must be exactly 10 characters' };
  }
  
  if (!panRegex.test(cleanPAN)) {
    return { isValid: false, message: 'Invalid PAN format. Use: AAAAA9999A' };
  }
  
  return { isValid: true, message: 'Valid PAN number' };
};

// Phone validation - 10 digit Indian mobile (starting with 6-9)
export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^[6-9][0-9]{9}$/;
  const cleanPhone = phone.replace(/\D/g, ''); // Remove non-digits
  
  if (!cleanPhone) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  if (cleanPhone.length !== 10) {
    return { isValid: false, message: 'Phone number must be 10 digits' };
  }
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, message: 'Invalid mobile number. Must start with 6-9' };
  }
  
  return { isValid: true, message: 'Valid phone number' };
};

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanEmail = email.trim().toLowerCase();
  
  if (!cleanEmail) {
    return { isValid: false, message: 'Email address is required' };
  }
  
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: 'Valid email address' };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const cleanName = name.trim();
  
  if (!cleanName) {
    return { isValid: false, message: 'Full name is required' };
  }
  
  if (cleanName.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' };
  }
  
  if (!nameRegex.test(cleanName)) {
    return { isValid: false, message: 'Name can only contain letters and spaces' };
  }
  
  return { isValid: true, message: 'Valid name' };
};

// Income validation
export const validateIncome = (income: string): ValidationResult => {
  const numericIncome = parseFloat(income);
  
  if (!income) {
    return { isValid: false, message: 'Monthly income is required' };
  }
  
  if (isNaN(numericIncome) || numericIncome <= 0) {
    return { isValid: false, message: 'Please enter a valid income amount' };
  }
  
  if (numericIncome < 10000) {
    return { isValid: false, message: 'Minimum income should be ₹10,000' };
  }
  
  if (numericIncome > 10000000) {
    return { isValid: false, message: 'Maximum income limit is ₹1 crore' };
  }
  
  return { isValid: true, message: 'Valid income amount' };
};

// Loan amount validation
export const validateLoanAmount = (amount: string): ValidationResult => {
  const numericAmount = parseFloat(amount);
  
  if (!amount) {
    return { isValid: false, message: 'Loan amount is required' };
  }
  
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return { isValid: false, message: 'Please enter a valid loan amount' };
  }
  
  if (numericAmount < 50000) {
    return { isValid: false, message: 'Minimum loan amount is ₹50,000' };
  }
  
  if (numericAmount > 100000000) {
    return { isValid: false, message: 'Maximum loan amount is ₹10 crores' };
  }
  
  return { isValid: true, message: 'Valid loan amount' };
};