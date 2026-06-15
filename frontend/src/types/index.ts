// Form Data Types
export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  city: string;
  english_level: EnglishLevel;
  cv_file: File | null;
}

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// API Response Types
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  city: string;
  english_level: EnglishLevel;
  status: CandidateStatus;
  created_at: string;
  updated_at: string;
}

export interface CandidateWithCV extends Candidate {
  cv_document?: CVDocument;
}

export interface CVDocument {
  id: string;
  candidate_id: string;
  file_name: string;
  file_size: number;
  uploaded_at: string;
}

export type CandidateStatus = 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED';

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form Validation Error Type
export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  age?: string;
  country?: string;
  city?: string;
  english_level?: string;
  cv_file?: string;
  submit?: string;
}
