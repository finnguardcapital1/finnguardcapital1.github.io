// Security utilities and CSP configuration

// Rate limiting for form submissions
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    
    return true;
  }

  getRemainingAttempts(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    const now = Date.now();
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxAttempts - validAttempts.length);
  }
}

export const formRateLimiter = new RateLimiter(3, 10 * 60 * 1000); // 3 attempts per 10 minutes

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Indian format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// Generate CSP nonce
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Content Security Policy configuration
export const getCSPHeader = (nonce: string): string => {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://www.google-analytics.com https://api.whatsapp.com",
    "frame-src 'self' https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ');
};

// CSRF token generation and validation
export const generateCSRFToken = (): string => {
  return crypto.getRandomValues(new Uint32Array(4)).join('');
};

export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
};

// Secure form submission helper
export const secureFormSubmit = (formData: any, userIdentifier: string): { success: boolean; message: string } => {
  // Check rate limiting
  if (!formRateLimiter.isAllowed(userIdentifier)) {
    return {
      success: false,
      message: `Too many attempts. Please try again later. Remaining attempts: ${formRateLimiter.getRemainingAttempts(userIdentifier)}`
    };
  }

  // Sanitize inputs
  const sanitizedData = Object.keys(formData).reduce((acc, key) => {
    acc[key] = typeof formData[key] === 'string' ? sanitizeInput(formData[key]) : formData[key];
    return acc;
  }, {} as any);

  // Validate required fields
  if (sanitizedData.email && !isValidEmail(sanitizedData.email)) {
    return { success: false, message: 'Please enter a valid email address' };
  }

  if (sanitizedData.phone && !isValidPhone(sanitizedData.phone)) {
    return { success: false, message: 'Please enter a valid phone number' };
  }

  return { success: true, message: 'Form validation passed', data: sanitizedData };
};