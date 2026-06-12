import { useCandidates } from '../../hooks/useCandidates';
import CandidateTable from './CandidateTable';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorAlert from '../Common/ErrorAlert';
import styles from './AdminPanel.module.css';

export default function AdminPanel() {
  const { candidates, isLoading, error, refetch } = useCandidates();

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Candidate Management</h1>
        <p className={styles.adminSubtitle}>
          View and manage all candidate registrations
        </p>
      </div>

      {error && (
        <ErrorAlert
          message={error}
          onDismiss={refetch}
        />
      )}

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
          <p>Loading candidates...</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <CandidateTable candidates={candidates} />
        </div>
      )}
    </div>
  );
}
