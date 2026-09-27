import React from 'react';
import { Calendar, Edit2, Trash2 } from 'lucide-react';
import { OfficialHoliday } from '../models/types';

interface HolidayCardProps {
  holiday: OfficialHoliday;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const HolidayCard: React.FC<HolidayCardProps> = ({ holiday, onEdit, onDelete }) => {
  return (
    <div className="mobile-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Calendar size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 2 }}>
              {holiday.name}
            </h3>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
              Date: {holiday.date}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {onEdit && (
            <button
              onClick={onEdit}
              style={{
                background: 'var(--neutral100)',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-sm)',
                color: 'var(--primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Edit holiday"
            >
              <Edit2 size={15} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              style={{
                background: 'var(--danger-light)',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-sm)',
                color: 'var(--danger)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Delete holiday"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
