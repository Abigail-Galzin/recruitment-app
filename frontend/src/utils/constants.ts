// English Level Options
export const ENGLISH_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

// Candidate Status Options
export const CANDIDATE_STATUSES = ['IN_REVIEW', 'ACCEPTED', 'REJECTED'] as const;

// Form Constraints
export const FORM_CONSTRAINTS = {
  MIN_AGE: 18,
  MAX_AGE: 99,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
  ALLOWED_FILE_TYPES: ['application/pdf'],
  ALLOWED_FILE_EXTENSIONS: ['.pdf'],
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number in E.164 format (e.g., +1234567890)',
  INVALID_AGE: 'Age must be between 18 and 99',
  INVALID_FILE_TYPE: 'Only PDF files are allowed',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  SUBMISSION_ERROR: 'An error occurred while submitting the form. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Registration successful! Your CV has been received and will be reviewed shortly.',
} as const;

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
