/**
 * Validation Middleware and Utilities
 * Validates candidate registration input and file uploads
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const E164_PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

interface ValidationError {
  field: string;
  message: string;
}

export interface ValidatedCandidateInput {
  name: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  city: string;
  english_level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export interface PDFInput {
  filename: string;
  size: number;
  originalname: string;
  mimetype: string;
  path: string;
}

/**
 * Validate candidate input fields
 */
export const validateCandidateFields = (body: ValidatedCandidateInput): { valid: boolean; errors: ValidationError[] } => {
  const errors: ValidationError[] = [];

  // Validate name
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Name is required and must be a non-empty string' });
  } else if (body.name.length > 100) {
    errors.push({ field: 'name', message: 'Name must not exceed 100 characters' });
  }

  // Validate email
  if (!body.email || typeof body.email !== 'string' || !EMAIL_REGEX.test(body.email)) {
    errors.push({ field: 'email', message: 'Email must be a valid email address' });
  }

  // Validate phone
  if (!body.phone || typeof body.phone !== 'string' || !E164_PHONE_REGEX.test(body.phone)) {
    errors.push({ field: 'phone', message: 'Phone must be in valid E.164 format (e.g., +123456789)' });
  }

  // Validate age
  const age = Number(body.age);
  if (isNaN(age) || age < 18 || age > 99) {
    errors.push({ field: 'age', message: 'Age must be a number between 18 and 99' });
  }

  // Validate country
  if (!body.country || typeof body.country !== 'string' || body.country.trim().length === 0) {
    errors.push({ field: 'country', message: 'Country is required' });
  }

  // Validate city
  if (!body.city || typeof body.city !== 'string' || body.city.trim().length === 0) {
    errors.push({ field: 'city', message: 'City is required' });
  }

  // Validate english_level
  const validEnglishLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  if (!body.english_level || !validEnglishLevels.includes(body.english_level)) {
    errors.push({ 
      field: 'english_level', 
      message: 'English level must be one of: A1, A2, B1, B2, C1, C2' 
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate file upload
 */
export const validateFileUpload = (file: PDFInput): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'PDF file is required' };
  }

  if (file.mimetype !== 'application/pdf') {
    return { valid: false, error: 'Only PDF files are accepted' };
  }

  if (file.size > 5242880) { // 5MB
    return { valid: false, error: 'File size must not exceed 5MB' };
  }

  return { valid: true };
};
