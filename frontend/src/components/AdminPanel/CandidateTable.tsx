import { useState, useEffect } from 'react';
import type { CandidateWithCV, CandidateStatus } from '../../types';
import { formatDate, getEnglishLevelColor } from '../../utils/formatters';
import candidateApi from '../../api/candidateApi';
import StatusDropdown from './StatusDropdown';
import ErrorAlert from '../Common/ErrorAlert';
import styles from './AdminPanel.module.css';
import { getStatusColor } from '../../utils/formatters';

interface CandidateTableProps {
  candidates: CandidateWithCV[];
  refetch: () => Promise<void>;
}

export default function CandidateTable({ candidates, refetch }: CandidateTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [localCandidates, setLocalCandidates] = useState(candidates);
  const [statusColor, setStatusColor] = useState<{ bg: string, text: string }>({ bg: '', text: '' });

  const handleStatusChange = async (candidateId: string, newStatus: CandidateStatus) => {
    setUpdatingId(candidateId);
    setErrorMessage(null);
    setSuccessMessage(null);
    setStatusColor(getStatusColor(newStatus));

    try {
      const response = await candidateApi.updateCandidateStatus(candidateId, newStatus);

      if (response.success) {
        setLocalCandidates((prev) =>
          prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c)),
        );
        setSuccessMessage(`Status updated to ${newStatus.replace(/_/g, ' ')}`);
      } else {
        setErrorMessage(response.error || 'Failed to update status');
        setUpdatingId(null);
      }
    } catch (error: any) {
      console.error('Error updating status:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Failed to update status';
      setErrorMessage(errorMsg);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage(null);

      refetch();
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    if (!successMessage) {
      setLocalCandidates(candidates);
    }
  }, [candidates]);

  if (candidates.length === 0) {
    return (
      <div className={styles.noDataMessage}>
        <p>No candidates found. Be the first to register!</p>
      </div>
    );
  }

  return (
    <>
      {successMessage && (
        <div
          style={{
            backgroundColor: statusColor.bg || 'gray',
            color: statusColor.text || 'gray',
            padding: '1rem',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
          }}
        >
          ✓ {successMessage}
        </div>
      )}
      {errorMessage && (
        <ErrorAlert message={errorMessage} onDismiss={() => setErrorMessage(null)} />
      )}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Phone</th>
              <th className={styles.th}>Age</th>
              <th className={styles.th}>Country</th>
              <th className={styles.th}>City</th>
              <th className={styles.th}>English Level</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>CV</th>
              <th className={styles.th}>Registered</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {localCandidates.map((candidate) => {
              const englishLevelColor = getEnglishLevelColor(candidate.english_level);

              return (
                <tr key={candidate.id} className={styles.tableRow}>
                  <td className={styles.td}>{candidate.name}</td>
                  <td className={styles.td}>{candidate.email}</td>
                  <td className={styles.td}>{candidate.phone}</td>
                  <td className={styles.td}>{candidate.age}</td>
                  <td className={styles.td}>{candidate.country}</td>
                  <td className={styles.td}>{candidate.city}</td>
                  <td className={styles.td}>
                    <span
                      className={styles.englishLevel}
                      style={{
                        backgroundColor: englishLevelColor,
                        color: 'white',
                      }}
                    >
                      {candidate.english_level}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <StatusDropdown
                      currentStatus={candidate.status}
                      candidateId={candidate.id}
                      candidateName={candidate.name}
                      onStatusChange={handleStatusChange}
                      disabled={updatingId === candidate.id}
                    />
                  </td>
                  <td className={styles.td}>
                    CVViewer
                  </td>
                  <td className={styles.td}>{formatDate(candidate.created_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
