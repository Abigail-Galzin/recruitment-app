import apiClient from './apiClient';
import type { Candidate, CandidateWithCV, RegistrationFormData, ApiResponse } from '../types/index';

export const candidateApi = {
  /**
   * Submit a new candidate registration with CV file
   */
  submitCandidate: async (formData: RegistrationFormData): Promise<ApiResponse<Candidate>> => {
    const multipartFormData = new FormData();
    multipartFormData.append('name', formData.name);
    multipartFormData.append('email', formData.email);
    multipartFormData.append('phone', formData.phone);
    multipartFormData.append('age', String(formData.age));
    multipartFormData.append('country', formData.country);
    multipartFormData.append('city', formData.city);
    multipartFormData.append('english_level', formData.english_level);
    if (formData.cv_file) {
      multipartFormData.append('cv_file', formData.cv_file);
    }

    const response = await apiClient.post<ApiResponse<Candidate>>(
      '/api/candidates',
      multipartFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Fetch all candidates with optional filters
   */
  fetchCandidates: async (filters?: {
    country?: string;
    city?: string;
    english_level?: string;
  }): Promise<ApiResponse<CandidateWithCV[]>> => {
    const params = new URLSearchParams();
    if (filters?.country) params.append('country', filters.country);
    if (filters?.city) params.append('city', filters.city);
    if (filters?.english_level) params.append('english_level', filters.english_level);

    const response = await apiClient.get<ApiResponse<CandidateWithCV[]>>(
      `/api/candidates?${params.toString()}`
    );

    return {
        ...response.data,
        success: (response.status  === 200)
    }
  },

  /**
   * Update candidate status
   */
  updateCandidateStatus: async (
    id: string,
    status: 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED'
  ): Promise<ApiResponse<Candidate>> => {
    const response = await apiClient.put<ApiResponse<Candidate>>(
      `/api/candidates/${id}/status`,
      { status }
    );
    return response.data;
  },

  /**
   * Get upload URL for CV file
   */
  getUploadUrl: (filename: string): string => {
    return `${apiClient.defaults.baseURL}/api/uploads/${filename}`;
  },
};

export default candidateApi;
