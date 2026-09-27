import React from 'react';
import { Phone, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { Employee } from '../models/types';
import { Avatar } from './UIHelpers';

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
  return (
    <div className="mobile-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={employee.fullName} src={employee.avatarUrl} size={48} />
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 2 }}>
              {employee.fullName}
            </h3>
            <span
              style={{
                fontSize: 12,
                color: 'var(--primary)',
                fontWeight: 600,
                background: 'var(--primary-light)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              {employee.department || 'Employee'}
            </span>
          </div>
        </div>
        <ChevronRight size={20} color="var(--text-subtle)" />
      </div>

      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid var(--border-color)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          fontSize: 12,
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Phone size={14} color="var(--text-subtle)" />
          <span>{employee.phoneNumber}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Briefcase size={14} color="var(--text-subtle)" />
          <span>Salary: {employee.salary.toLocaleString()} EGP</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, gridColumn: 'span 2' }}>
          <Calendar size={14} color="var(--text-subtle)" />
          <span>Work Shift: {employee.attendanceTime} - {employee.departureTime}</span>
        </div>
      </div>
    </div>
  );
};
