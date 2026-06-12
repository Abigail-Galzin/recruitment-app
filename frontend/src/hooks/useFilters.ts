import { useState, useCallback } from 'react';

export interface CandidateFilters {
  country?: string;
  city?: string;
  english_level?: string;
}

interface UseFiltersReturn {
  filters: CandidateFilters;
  setFilters: (filters: CandidateFilters) => void;
  setCountry: (country: string) => void;
  setCity: (city: string) => void;
  setEnglishLevel: (level: string) => void;
  resetFilters: () => void;
}

const initialFilters: CandidateFilters = {
  country: '',
  city: '',
  english_level: '',
};

export const useFilters = (): UseFiltersReturn => {
  const [filters, setFilters] = useState<CandidateFilters>(initialFilters);

  const setCountry = useCallback((country: string) => {
    setFilters((prev) => ({ ...prev, country }));
  }, []);

  const setCity = useCallback((city: string) => {
    setFilters((prev) => ({ ...prev, city }));
  }, []);

  const setEnglishLevel = useCallback((english_level: string) => {
    setFilters((prev) => ({ ...prev, english_level }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    setFilters,
    setCountry,
    setCity,
    setEnglishLevel,
    resetFilters,
  };
};
