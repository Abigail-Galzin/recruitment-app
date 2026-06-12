import { useState, useEffect } from 'react';
import type { CandidateWithCV } from '../types';
import candidateApi from '../api/candidateApi';

interface UseCandidatesReturn {
  candidates: CandidateWithCV[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCandidates = (): UseCandidatesReturn => {
  const [candidates, setCandidates] = useState<CandidateWithCV[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await candidateApi.fetchCandidates();
        console.log(response);
      if (response.success && response.data) {
        setCandidates(response.data);
      } else {
        setError(response.error || 'Failed to fetch candidates');
      }
    } catch (err: any) {
      console.error('Error fetching candidates:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An error occurred while fetching candidates');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return {
    candidates,
    isLoading,
    error,
    refetch: fetchCandidates,
  };
};
