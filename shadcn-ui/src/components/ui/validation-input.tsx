import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ValidationResult } from '@/utils/validation';

interface ValidationInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  validator: (value: string) => ValidationResult;
  required?: boolean;
  className?: string;
  autoFilled?: boolean;
}

export const ValidationInput: React.FC<ValidationInputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  validator,
  required = false,
  className = '',
  autoFilled = false
}) => {
  const [validation, setValidation] = useState<ValidationResult>({ isValid: true, message: '' });
  const [isValidating, setIsValidating] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (value && touched) {
      setIsValidating(true);
      const timer = setTimeout(() => {
        const result = validator(value);
        setValidation(result);
        setIsValidating(false);
      }, 300); // Debounce validation

      return () => clearTimeout(timer);
    }
  }, [value, validator, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (!touched) setTouched(true);
  };

  const getInputClassName = () => {
    let baseClass = className;
    
    if (autoFilled) {
      baseClass += ' bg-green-50 border-green-200';
    } else if (touched && value) {
      if (isValidating) {
        baseClass += ' border-yellow-300';
      } else if (validation.isValid) {
        baseClass += ' border-green-300 bg-green-50';
      } else {
        baseClass += ' border-red-300 bg-red-50';
      }
    }
    
    return baseClass;
  };

  const renderValidationIcon = () => {
    if (!touched || !value) return null;
    
    if (isValidating) {
      return <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />;
    }
    
    if (validation.isValid) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    
    return <AlertCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={getInputClassName()}
        />
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {renderValidationIcon()}
        </div>
      </div>
      
      {/* Validation Message */}
      {touched && value && !isValidating && (
        <div className={`text-xs ${validation.isValid ? 'text-green-600' : 'text-red-600'}`}>
          {validation.message}
        </div>
      )}
      
      {/* Auto-fill Badge */}
      {autoFilled && (
        <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded inline-block">
          ✓ Auto-filled from chat
        </div>
      )}
    </div>
  );
};