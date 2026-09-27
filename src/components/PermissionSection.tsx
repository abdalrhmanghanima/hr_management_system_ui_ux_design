import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { PermissionModule, ModulePermissions, GroupPermissions } from '../models/types';

interface PermissionSectionProps {
  moduleKey: PermissionModule;
  moduleTitle: string;
  permissions: ModulePermissions;
  onChange: (moduleKey: PermissionModule, actionKey: keyof ModulePermissions, value: boolean) => void;
  supportsPrint?: boolean;
}

export const PermissionSection: React.FC<PermissionSectionProps> = ({
  moduleKey,
  moduleTitle,
  permissions,
  onChange,
  supportsPrint = false,
}) => {
  const [expanded, setExpanded] = useState(true);

  const activeCount = Object.values(permissions).filter(Boolean).length;

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: 10,
        overflow: 'hidden',
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: expanded ? 'var(--neutral50)' : '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShieldCheck size={18} color="var(--primary)" />
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{moduleTitle}</span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              background: activeCount > 0 ? 'var(--primary-light)' : 'var(--neutral100)',
              color: activeCount > 0 ? 'var(--primary)' : 'var(--text-muted)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
            }}
          >
            {activeCount} active
          </span>
        </div>
        {expanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
      </div>

      {expanded && (
        <div
          style={{
            padding: '12px 16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={permissions.view || false}
              onChange={(e) => onChange(moduleKey, 'view', e.target.checked)}
              style={{ width: 16, height: 16, accentColor: 'var(--primary)' }}
            />
            <span>View</span>
          </label>

          {moduleKey !== 'settings' && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={permissions.add || false}
                onChange={(e) => onChange(moduleKey, 'add', e.target.checked)}
                style={{ width: 16, height: 16, accentColor: 'var(--primary)' }}
              />
              <span>Add</span>
            </label>
          )}

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={permissions.edit || false}
              onChange={(e) => onChange(moduleKey, 'edit', e.target.checked)}
              style={{ width: 16, height: 16, accentColor: 'var(--primary)' }}
            />
            <span>Edit</span>
          </label>

          {moduleKey !== 'settings' && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={permissions.delete || false}
                onChange={(e) => onChange(moduleKey, 'delete', e.target.checked)}
                style={{ width: 16, height: 16, accentColor: 'var(--primary)' }}
              />
              <span>Delete</span>
            </label>
          )}

          {supportsPrint && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={permissions.print || false}
                onChange={(e) => onChange(moduleKey, 'print', e.target.checked)}
                style={{ width: 16, height: 16, accentColor: 'var(--primary)' }}
              />
              <span>Print Slip</span>
            </label>
          )}
        </div>
      )}
    </div>
  );
};
