import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Building2, Printer, Share2, Check } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';

export const SalarySlipScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPayrollById, showToast } = useApp();

  const [printed, setPrinted] = useState(false);

  const payroll = getPayrollById(id || '');

  if (!payroll) {
    return (
      <>
        <MobileAppBar title="Salary Slip" showBack />
        <div className="mobile-screen-body">
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Salary slip not found.</div>
        </div>
      </>
    );
  }

  const handlePrint = () => {
    setPrinted(true);
    showToast('Printing salary slip prototype action executed');
    setTimeout(() => setPrinted(false), 3000);
  };

  const handleShare = () => {
    showToast('Salary slip shareable link generated');
  };

  return (
    <>
      <MobileAppBar title="Official Salary Slip" showBack />
      <div className="mobile-screen-body">
        {/* Mobile Salary Slip Document Container */}
        <div
          className="mobile-card"
          style={{
            padding: 24,
            background: '#ffffff',
            border: '2px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Watermark / Brand Header */}
          <div style={{ borderBottom: '2px solid var(--neutral900)', paddingBottom: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Building2 size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main)' }}>CORPORATE HR</h2>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Confidential Pay Slip
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', display: 'block' }}>
                  {payroll.month} {payroll.year}
                </span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>REF: #{payroll.id.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Employee Information */}
          <div
            style={{
              background: 'var(--neutral50)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              marginBottom: 16,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              fontSize: 12,
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Employee Name</span>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{payroll.employeeName}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Department</span>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{payroll.department}</span>
            </div>
          </div>

          {/* Table Breakdown */}
          <div style={{ fontSize: 13, marginBottom: 20 }}>
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid var(--border-color)',
                fontWeight: 600,
                color: 'var(--text-muted)',
                fontSize: 11,
                textTransform: 'uppercase',
              }}
            >
              <span>Description</span>
              <span>Amount (EGP)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>Basic Salary</span>
              <span style={{ fontWeight: 600 }}>{payroll.basicSalary.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>Attendance Work Days</span>
              <span style={{ fontWeight: 600 }}>{payroll.attendanceDays} Days</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>Absence Days</span>
              <span style={{ fontWeight: 600, color: 'var(--danger)' }}>{payroll.absenceDays} Days</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>Overtime ({payroll.overtimeHours} hrs)</span>
              <span style={{ fontWeight: 600, color: 'var(--success)' }}>+{payroll.totalOvertime.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
              <span>Deductions ({payroll.deductionHours} hrs)</span>
              <span style={{ fontWeight: 600, color: 'var(--danger)' }}>-{payroll.totalDeduction.toLocaleString()}</span>
            </div>

            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                padding: '14px 0 4px 0',
                fontSize: 16,
                fontWeight: 800,
                color: 'var(--text-main)',
              }}
            >
              <span>Net Transfer Salary</span>
              <span style={{ color: 'var(--primary)' }}>{payroll.netSalary.toLocaleString()} EGP</span>
            </div>
          </div>

          {/* Stamp / Authorization */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 12, borderTop: '1px solid var(--border-color)' }}>
            <div>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block' }}>Authorized Digital Stamp</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--success)' }}>✓ HR Approved & Verified</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Page 1 of 1</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <SecondaryButton icon={<Share2 size={16} />} onClick={handleShare}>
            Share Slip
          </SecondaryButton>
          <PrimaryButton icon={printed ? <Check size={16} /> : <Printer size={16} />} onClick={handlePrint}>
            {printed ? 'Sent to Printer' : 'Print Salary Slip'}
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};
