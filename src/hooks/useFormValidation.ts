import { useState, useCallback } from 'react';
import { FormConfig, FormData } from '../types/form';

interface ValidationRules {
  [key: string]: (value: string) => string | undefined;
}

const defaultValidationRules: ValidationRules = {
  text: (value) => (!value ? 'This field is required' : undefined),
  number: (value) => {
    if (!value) return 'This field is required';
    if (isNaN(Number(value))) return 'Must be a valid number';
    return undefined;
  },
  email: (value) => {
    if (!value) return 'This field is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Must be a valid email';
    return undefined;
  },
  password: (value) => {
    if (!value) return 'This field is required';
    if (value.length < 6) return 'Must be at least 6 characters';
    return undefined;
  },
  date: (value) => (!value ? 'This field is required' : undefined),
  dropdown: (value) => (!value ? 'Please select an option' : undefined),
};

export const useFormValidation = (formConfig: FormConfig | null) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((field: string, value: string, type: string, required: boolean) => {
    if (!required && !value) return undefined;
    const rule = defaultValidationRules[type] || defaultValidationRules.text;
    return rule(value);
  }, []);

  const validateForm = useCallback((formData: FormData): boolean => {
    if (!formConfig) return false;

    const newErrors: Record<string, string> = {};
    formConfig.fields.forEach((field) => {
      const error = validateField(
        field.name,
        formData[field.name]?.toString() || '',
        field.type,
        field.required
      );
      if (error) newErrors[field.name] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formConfig, validateField]);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateForm,
    clearFieldError,
  };
};