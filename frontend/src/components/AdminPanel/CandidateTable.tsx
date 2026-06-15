import type { CandidateWithCV } from '../../types';
import { formatDate, getEnglishLevelColor, getStatusColor } from '../../utils/formatters';
import styles from './AdminPanel.module.css';

interface CandidateTableProps {
  candidates: CandidateWithCV[];
}

export default function CandidateTable({ candidates }: CandidateTableProps) {
  if (candidates.length === 0) {
    return (
      <div className={styles.noDataMessage}>
        <p>No candidates found. Be the first to register!</p>
      </div>
    );
  }

  return (
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
          {candidates.map((candidate) => {
            const englishLevelColor = getEnglishLevelColor(candidate.english_level);
            const statusColors = getStatusColor(candidate.status);

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
                  <span
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: statusColors.bg,
                      color: statusColors.text,
                    }}
                  >
                    {candidate.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className={styles.td}>
                  CVViewer
                </td>
                <td className={styles.td}>
                  {formatDate(candidate.created_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
