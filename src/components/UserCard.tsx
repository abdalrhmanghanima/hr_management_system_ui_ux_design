import React from 'react';
import { User } from '../models/types';
import { StatusChip } from './StatusChip';
import { Edit2, Trash2, Shield } from 'lucide-react';
import { Avatar } from './UIHelpers';

interface UserCardProps {
  user: User;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="mobile-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={user.fullName} size={42} />
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 2 }}>
              {user.fullName}
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>@{user.username} • {user.email}</p>
          </div>
        </div>
        <StatusChip status={user.accessStatus} />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--neutral50)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 12px',
          marginTop: 10,
          fontSize: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 600 }}>
          <Shield size={14} />
          <span>Group: {user.userGroupName || 'Custom'}</span>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {onEdit && (
            <button
              onClick={onEdit}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: 12 }}
            >
              <Edit2 size={13} /> Edit
            </button>
          )}
          {onDelete && !user.isHR && (
            <button
              onClick={onDelete}
              style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, fontSize: 12 }}
            >
              <Trash2 size={13} /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
