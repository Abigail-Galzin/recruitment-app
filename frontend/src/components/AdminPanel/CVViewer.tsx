import styles from './AdminPanel.module.css';

interface CVViewerProps {
  filepath?: string;
  candidateName?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function CVViewer({ filepath, candidateName }: CVViewerProps) {
  if (!filepath) {
    return (
      <span
        className={styles.noCVButton}
        title="No CV uploaded"
        aria-label="No CV uploaded"
        style={{
          opacity: 0.5,
          cursor: 'not-allowed',
          display: 'inline-block',
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          backgroundColor: '#e5e7eb',
          color: '#6b7280',
          fontSize: '0.95rem',
          border: '1px solid #d1d5db',
        }}
      >
        📄 No CV
      </span>
    );
  }

  const cvUrl = `${API_BASE_URL}/api${filepath}`;

  return (
    <a
      href={cvUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.viewCVButton}
      title={`View CV for ${candidateName || 'candidate'}`}
      aria-label={`View CV for ${candidateName || 'candidate'}`}
    >
      📄 View CV
    </a>
  );
}
