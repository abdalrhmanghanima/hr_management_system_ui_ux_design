import React from 'react';
import { Printer, Eye } from 'lucide-react';
import { PayrollRecord } from '../models/types';

interface PayrollCardProps {
  payroll: PayrollRecord;
  onViewDetails: () => void;
  onPrintSlip: () => void;
}

export const PayrollCard: React.FC<PayrollCardProps> = ({ payroll, onViewDetails, onPrintSlip }) => {
  return (
    <div className="mobile-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 2 }}>
            {payroll.employeeName}
          </h3>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {payroll.department} • {payroll.month} {payroll.year}
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Net Salary</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)' }}>
            {payroll.netSalary.toLocaleString()} EGP
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 6,
          background: 'var(--neutral50)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 8px',
          textAlign: 'center',
          fontSize: 11,
          marginBottom: 12,
        }}
      >
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>Basic</span>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{payroll.basicSalary.toLocaleString()}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>Att / Abs</span>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{payroll.attendanceDays}d / {payroll.absenceDays}d</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>Overtime</span>
          <span style={{ fontWeight: 600, color: 'var(--success)' }}>+{payroll.totalOvertime}</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-muted)', display: 'block' }}>Deduction</span>
          <span style={{ fontWeight: 600, color: 'var(--danger)' }}>-{payroll.totalDeduction}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={onViewDetails}
          style={{
            flex: 1,
            height: 38,
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            border: 'none',
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <Eye size={14} /> Details
        </button>
        <button
          onClick={onPrintSlip}
          style={{
            flex: 1,
            height: 38,
            borderRadius: 'var(--radius-md)',
            background: 'var(--neutral100)',
            color: 'var(--text-main)',
            border: 'none',
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <Printer size={14} /> Salary Slip
        </button>
      </div>
    </div>
  );
};
