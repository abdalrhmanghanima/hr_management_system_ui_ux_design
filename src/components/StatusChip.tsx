import React from 'react';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { AttendanceStatus } from '../models/types';

export const StatusChip: React.FC<{ status: AttendanceStatus | 'Active' | 'Inactive' }> = ({ status }) => {
  switch (status) {
    case 'Present':
    case 'Active':
      return (
        <span className="status-chip present">
          <CheckCircle2 size={12} />
          {status}
        </span>
      );
    case 'Absent':
    case 'Inactive':
      return (
        <span className="status-chip absent">
          <XCircle size={12} />
          {status}
        </span>
      );
    case 'Late':
      return (
        <span className="status-chip late">
          <Clock size={12} />
          {status}
        </span>
      );
    case 'Leave':
      return (
        <span className="status-chip leave">
          <AlertCircle size={12} />
          {status}
        </span>
      );
    default:
      return <span className="status-chip">{status}</span>;
  }
};
