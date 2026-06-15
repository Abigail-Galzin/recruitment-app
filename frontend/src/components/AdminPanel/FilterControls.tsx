import { useEffect, useRef } from 'react';
import styles from './AdminPanel.module.css';
import type { CandidateFilters } from '../../hooks/useFilters';

interface FilterControlsProps {
  filters: CandidateFilters;
  setCountry: (country: string) => void;
  setCity: (city: string) => void;
  setEnglishLevel: (level: string) => void;
  resetFilters: () => void;
}

const DEBOUNCE_DELAY = 500;

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  setCountry,
  setCity,
  setEnglishLevel,
  resetFilters
}) => {
  const countryTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cityTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleCountryChange = (value: string) => {
    if (countryTimeoutRef.current) clearTimeout(countryTimeoutRef.current);

    countryTimeoutRef.current = setTimeout(() => {
      setCountry(value);
    }, DEBOUNCE_DELAY);
  };

  const handleCityChange = (value: string) => {
    if (cityTimeoutRef.current) clearTimeout(cityTimeoutRef.current);

    cityTimeoutRef.current = setTimeout(() => {
      setCity(value);
    }, DEBOUNCE_DELAY);
  };

  useEffect(() => {
    return () => {
      if (countryTimeoutRef.current) clearTimeout(countryTimeoutRef.current);
      if (cityTimeoutRef.current) clearTimeout(cityTimeoutRef.current);
    };
  }, []);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <div>
          <label htmlFor="country-filter" style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
            Country
          </label>
          <input
            id="country-filter"
            type="text"
            placeholder="Filter by country"
            key={filters.country}
            defaultValue={filters.country || ''} 
            onChange={(e) => handleCountryChange(e.target.value)}
            className={styles.filters}
          />
        </div>

        <div>
          <label htmlFor="city-filter" style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
            City
          </label>
          <input
            id="city-filter"
            type="text"
            placeholder="Filter by city"
            key={filters.city}
            defaultValue={filters.city || ''} 
            onChange={(e) => handleCityChange(e.target.value)}
            className={styles.filters}
          />
        </div>

        <div>
          <label htmlFor="english-level-filter" style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
            English Level
          </label>
          <select
            id="english-level-filter"
            value={filters.english_level || ''}
            onChange={(e) => setEnglishLevel(e.target.value)}
            className={styles.filters}
          >
            <option value="">All Levels</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
        </div>
      </div>

      <button
        onClick={resetFilters}
        className={styles.filterButton}
      >
        Reset Filters
      </button>
    </div>
  );
}
