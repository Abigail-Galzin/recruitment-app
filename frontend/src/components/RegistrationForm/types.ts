import type { RegistrationFormData } from '../../types';

export interface RegistrationFormProps {
  onSuccess?: () => void;
}

export interface FormFieldProps {
  label: string;
  name: keyof RegistrationFormData;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  children?: React.ReactNode;
}

export interface SelectFieldProps extends Omit<FormFieldProps, 'type'> {
  options: Array<{ value: string | number; label: string }>;
}

export interface FileInputFieldProps extends Omit<FormFieldProps, 'type'> {
  accept?: string;
  maxSizeMB?: number;
}
