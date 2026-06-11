import { useState, useCallback } from 'react';
import type { RegistrationFormData, FormErrors } from '../types';
import { validateField } from '../utils/validation';

const initialFormData: RegistrationFormData = {
  name: '',
  email: '',
  phone: '',
  age: 0,
  country: '',
  city: '',
  english_level: 'B1',
  cv_file: null,
};

const initialErrors: FormErrors = {};

export const useForm = (onSubmit?: (data: RegistrationFormData) => Promise<void>) => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  const setFieldValue = useCallback((field: keyof RegistrationFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear field error when user starts editing
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    const fields = ['name', 'email', 'phone', 'age', 'country', 'city', 'english_level', 'cv_file'] as const;
    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      if (onSubmit) {
        setIsLoading(true);
        try {
          await onSubmit(formData);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [formData, validateForm, onSubmit]
  );

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors(initialErrors);
  }, []);

  return {
    formData,
    errors,
    isLoading,
    setFieldValue,
    handleSubmit,
    resetForm,
    setErrors,
  };
};
