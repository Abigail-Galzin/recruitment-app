import type { CandidateStatus } from '../../types';

interface StatusDropdownProps {
  currentStatus: CandidateStatus;
  candidateId: string;
  candidateName?: string;
  onStatusChange?: (id: string, status: CandidateStatus) => Promise<void>;
  disabled?: boolean;
}

export default function StatusDropdown({
  currentStatus,
  candidateId,
  candidateName = 'candidate',
  onStatusChange,
  disabled = false,
}: StatusDropdownProps) {
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as CandidateStatus;

    if (onStatusChange && newStatus !== currentStatus) {
      try {
        await onStatusChange(candidateId, newStatus);
      } catch (error) {
        console.error('Error updating status:', error);
        // Reset to previous value on error
        e.target.value = currentStatus;
      }
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={disabled}
      aria-label={`Change status for ${candidateName}`}
      style={{
        padding: '0.5rem 0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        backgroundColor: 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '0.95rem',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <option value="IN_REVIEW">In Review</option>
      <option value="ACCEPTED">Accepted</option>
      <option value="REJECTED">Rejected</option>
    </select>
  );
}
