import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Printer, Calendar, Briefcase, Clock, AlertCircle, DollarSign } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { SectionHeader } from '../../components/UIHelpers';
import { PrimaryButton } from '../../components/Buttons';

export const PayrollDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPayrollById, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/payroll' : '/user/payroll';

  const payroll = getPayrollById(id || '');

  if (!payroll) {
    return (
      <>
        <MobileAppBar title="Payroll Details" showBack />
        <div className="mobile-screen-body">
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Payroll record not found.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileAppBar title="Payroll Details" showBack />
      <div className="mobile-screen-body">
        {/* Main Card Header */}
        <div className="mobile-card" style={{ textAlign: 'center', padding: 24, marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {payroll.month} {payroll.year} Payroll
          </span>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', marginTop: 4, marginBottom: 8 }}>
            {payroll.employeeName}
          </h2>
          <span style={{ fontSize: 13, color: 'var(--primary)', background: 'var(--primary-light)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
            {payroll.department}
          </span>
        </div>

        {/* Attendance Statistics */}
        <SectionHeader title="Attendance Statistics" />
        <div className="mobile-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'var(--success-light)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: 11, color: '#047857', display: 'block' }}>Attendance Days</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#065f46' }}>{payroll.attendanceDays} Days</span>
            </div>
            <div style={{ background: 'var(--danger-light)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: 11, color: '#b91c1c', display: 'block' }}>Absence Days</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#991b1b' }}>{payroll.absenceDays} Days</span>
            </div>
            <div style={{ background: 'var(--neutral50)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Overtime Hours</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>+{payroll.overtimeHours} hrs</span>
            </div>
            <div style={{ background: 'var(--neutral50)', padding: 12, borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Deduction Hours</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>-{payroll.deductionHours} hrs</span>
            </div>
          </div>
        </div>

        {/* Financial Breakdown */}
        <SectionHeader title="Financial Breakdown" />
        <div className="mobile-card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}>
              <span>Basic Salary</span>
              <span style={{ fontWeight: 600 }}>{payroll.basicSalary.toLocaleString()} EGP</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
              <span>Total Overtime Addition</span>
              <span style={{ fontWeight: 600 }}>+{payroll.totalOvertime.toLocaleString()} EGP</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--danger)' }}>
              <span>Total Absence / Hours Deduction</span>
              <span style={{ fontWeight: 600 }}>-{payroll.totalDeduction.toLocaleString()} EGP</span>
            </div>

            <div
              style={{
                borderTop: '2px dashed var(--border-color)',
                paddingTop: 12,
                marginTop: 4,
                display: 'flex',
                justify: 'space-between',
                fontSize: 16,
                fontWeight: 800,
                color: 'var(--primary)',
              }}
            >
              <span>Net Monthly Salary</span>
              <span>{payroll.netSalary.toLocaleString()} EGP</span>
            </div>
          </div>
        </div>

        <PrimaryButton icon={<Printer size={18} />} onClick={() => navigate(`${basePath}/${payroll.id}/slip`)}>
          View & Print Salary Slip
        </PrimaryButton>
      </div>
    </>
  );
};
