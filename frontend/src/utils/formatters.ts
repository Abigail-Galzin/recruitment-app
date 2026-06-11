/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX if US number (10 digits)
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  // Return as is if not standard format
  return phone;
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format datetime for display
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get English level label with color coding
 */
export const getEnglishLevelColor = (level: string): string => {
  
  switch (level) {
    case 'B2':
    case 'C1':
    case 'C2':
      return '#10b981'; // Green
    case 'B1':
      return '#f59e0b'; // Yellow/Amber
    case 'A1':
    case 'A2':
      return '#ef4444'; // Red
    default:
      return '#6b7280'; // Gray
  }
};

/**
 * Get status label styling
 */
export const getStatusColor = (status: string): { bg: string; text: string } => {
  switch (status) {
    case 'ACCEPTED':
      return { bg: '#dcfce7', text: '#166534' };
    case 'REJECTED':
      return { bg: '#fee2e2', text: '#991b1b' };
    case 'IN_REVIEW':
    default:
      return { bg: '#dbeafe', text: '#1e40af' };
  }
};
