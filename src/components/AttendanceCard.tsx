import React from 'react';
import { Clock, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { AttendanceRecord } from '../models/types';
import { StatusChip } from './StatusChip';

interface AttendanceCardProps {
  record: AttendanceRecord;
  onEdit?: () => void;
  onDelete?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  record,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}) => {
  return (
    <div className="mobile-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 2 }}>
            {record.employeeName}
          </h3>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{record.department} • {record.date}</span>
        </div>
        <StatusChip status={record.status} />
      </div>

      <div
        style={{
          background: 'var(--neutral50)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 12px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          fontSize: 12,
          marginBottom: 10,
        }}
      >
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>Check-In</span>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{record.checkIn}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>Check-Out</span>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{record.checkOut}</span>
        </div>
        {record.overtimeHours > 0 && (
          <div style={{ color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={13} />
            <span>Overtime: +{record.overtimeHours} hrs</span>
          </div>
        )}
        {record.deductionHours > 0 && (
          <div style={{ color: 'var(--danger)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <AlertCircle size={13} />
            <span>Deduction: -{record.deductionHours} hrs</span>
          </div>
        )}
      </div>

      {(canEdit || canDelete) && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 6 }}>
          {canEdit && onEdit && (
            <button
              onClick={onEdit}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: 12,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <Edit2 size={14} /> Edit
            </button>
          )}
          {canDelete && onDelete && (
            <button
              onClick={onDelete}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--danger)',
                fontSize: 12,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <Trash2 size={14} /> Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};
