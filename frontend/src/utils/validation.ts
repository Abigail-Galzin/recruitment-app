import { FORM_CONSTRAINTS, ERROR_MESSAGES } from './constants';

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone in E.164 format
 * E.164 format: +[country code][number] (e.g., +1234567890)
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate age is within acceptable range
 */
export const validateAge = (age: number): boolean => {
  return age >= FORM_CONSTRAINTS.MIN_AGE && age <= FORM_CONSTRAINTS.MAX_AGE;
};

/**
 * Validate file is a PDF
 */
export const validateFileType = (file: File): boolean => {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
};

/**
 * Validate file size is within limit
 */
export const validateFileSize = (file: File): boolean => {
  return file.size <= FORM_CONSTRAINTS.MAX_FILE_SIZE;
};

/**
 * Validate a complete file (type and size)
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!validateFileType(file)) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_FILE_TYPE };
  }
  if (!validateFileSize(file)) {
    return { valid: false, error: ERROR_MESSAGES.FILE_TOO_LARGE };
  }
  return { valid: true };
};

/**
 * Validate a single form field
 */
export const validateField = (
  fieldName: string,
  value: string | number | File | null
): string | undefined => {
  // Check required fields
  if (value === null || value === undefined || value === '') {
    return ERROR_MESSAGES.REQUIRED_FIELD;
  }

  switch (fieldName) {
    case 'name':
      return typeof value === 'string' && value.trim().length > 0 ? undefined : ERROR_MESSAGES.REQUIRED_FIELD;

    case 'email':
      return typeof value === 'string' && validateEmail(value) ? undefined : ERROR_MESSAGES.INVALID_EMAIL;

    case 'phone':
      return typeof value === 'string' && validatePhone(value) ? undefined : ERROR_MESSAGES.INVALID_PHONE;

    case 'age':
      return typeof value === 'number' && validateAge(value) ? undefined : ERROR_MESSAGES.INVALID_AGE;

    case 'country':
      return typeof value === 'string' && value.trim().length > 0 ? undefined : ERROR_MESSAGES.REQUIRED_FIELD;

    case 'city':
      return typeof value === 'string' && value.trim().length > 0 ? undefined : ERROR_MESSAGES.REQUIRED_FIELD;

    case 'english_level':
      return value && value !== '' ? undefined : ERROR_MESSAGES.REQUIRED_FIELD;

    case 'cv_file':
      if (!(value instanceof File)) {
        return ERROR_MESSAGES.REQUIRED_FIELD;
      }
      const fileValidation = validateFile(value);
      return fileValidation.valid ? undefined : fileValidation.error;

    default:
      return undefined;
  }
};

/**
 * Format file size to human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
