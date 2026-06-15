/**
 * Candidate Model
 * TypeScript interface for the CANDIDATE table
 */

import { FilePDFData } from "./CVDocument.js";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  city: string;
  english_level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  status: 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED';
  created_at: string;
  updated_at: string;
}

export interface CreateCandidateData {
  name: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  city: string;
  english_level: string;
  file: FilePDFData
}

export interface CandidateFilters {
  country?: string;
  city?: string;
  english_level?: string;
}

export type CreateCandidateInput = Omit<
  Candidate,
  'id' | 'status' | 'created_at' | 'updated_at'
>;

export type CandidateResponse = {
  id: string,
  name: string,
  email: string,
  phone: string,
  age: string,
  country: string,
  city: string,
  english_level: string,
  status: string,
  cv_file: {
    file_name: string,
    file_path: string,
  },
  created_at: string,
};
