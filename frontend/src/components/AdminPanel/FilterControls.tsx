import { useFilters } from '../../hooks/useFilters';
import styles from './AdminPanel.module.css';

export default function FilterControls() {
  const { filters, setCountry, setCity, setEnglishLevel, resetFilters } = useFilters();

  return (
    <div className={styles.filterCon}>
      <div className={styles.filterWrapper}>
        <div>
          <label htmlFor="country-filter" style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>
            Country
          </label>
          <input
            id="country-filter"
            type="text"
            placeholder="Filter by country"
            value={filters.country || ''}
            onChange={(e) => setCountry(e.target.value)}
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
            value={filters.city || ''}
            onChange={(e) => setCity(e.target.value)}
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
