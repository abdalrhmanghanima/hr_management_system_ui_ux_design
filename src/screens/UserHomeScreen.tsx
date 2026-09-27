import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, DollarSign, Users, ShieldAlert } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { Avatar, SectionHeader, EmptyState } from '../components/UIHelpers';
import { AttendanceCard } from '../components/AttendanceCard';
import { PayrollCard } from '../components/PayrollCard';

export const UserHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, activePermissions, hasPermission, attendanceRecords, payrollRecords, employees } = useApp();

  const canViewEmployees = hasPermission('employees', 'view');
  const canViewAttendance = hasPermission('attendance', 'view');
  const canAddAttendance = hasPermission('attendance', 'add');
  const canEditAttendance = hasPermission('attendance', 'edit');
  const canDeleteAttendance = hasPermission('attendance', 'delete');
  const canViewPayroll = hasPermission('payroll', 'view');

  const userGroupName = currentUser?.userGroupName || 'Custom Access';

  const userAttendance = attendanceRecords.slice(0, 3);
  const userPayroll = payrollRecords.slice(0, 2);

  const hasAnyAccess = canViewEmployees || canViewAttendance || canViewPayroll;

  return (
    <div className="mobile-screen-body">
      {/* Header Profile Greeting */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          paddingTop: 8,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              color: 'var(--primary)',
              fontWeight: 700,
              background: 'var(--primary-light)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              marginBottom: 4,
              display: 'inline-block',
            }}
          >
            Role: {userGroupName}
          </span>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
            {currentUser?.fullName || 'User Portal'}
          </h1>
        </div>
        <Avatar name={currentUser?.fullName || 'User'} size={48} />
      </div>

      {!hasAnyAccess && (
        <EmptyState
          icon={<ShieldAlert size={48} />}
          title="No Module Permissions Assigned"
          description="Your user group currently does not have viewing permissions for HR modules. Please contact your HR Administrator."
        />
      )}

      {/* Permitted Modules Quick Cards */}
      {hasAnyAccess && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {canViewAttendance && (
            <div
              className="mobile-card"
              onClick={() => navigate('/user/attendance')}
              style={{ cursor: 'pointer', margin: 0, padding: 14 }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--success-light)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <CalendarCheck size={18} />
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>Attendance</h3>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {canAddAttendance ? 'View & Record' : 'View Only'}
              </p>
            </div>
          )}

          {canViewPayroll && (
            <div
              className="mobile-card"
              onClick={() => navigate('/user/payroll')}
              style={{ cursor: 'pointer', margin: 0, padding: 14 }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--secondary-light)',
                  color: 'var(--secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <DollarSign size={18} />
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>Payroll</h3>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>View Salary Slips</p>
            </div>
          )}

          {canViewEmployees && (
            <div
              className="mobile-card"
              onClick={() => navigate('/user/employees')}
              style={{ cursor: 'pointer', margin: 0, padding: 14, gridColumn: 'span 2' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Users size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>Employees Directory</h3>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{employees.length} Active Staff</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Attendance Module Preview */}
      {canViewAttendance && (
        <div style={{ marginBottom: 20 }}>
          <SectionHeader
            title="Attendance Records"
            actionLabel="View All"
            onAction={() => navigate('/user/attendance')}
          />
          {userAttendance.map((rec) => (
            <AttendanceCard
              key={rec.id}
              record={rec}
              canEdit={canEditAttendance}
              canDelete={canDeleteAttendance}
              onEdit={canEditAttendance ? () => navigate(`/user/attendance/${rec.id}/edit`) : undefined}
            />
          ))}
        </div>
      )}

      {/* Payroll Module Preview */}
      {canViewPayroll && (
        <div>
          <SectionHeader
            title="Payroll Slips"
            actionLabel="View All"
            onAction={() => navigate('/user/payroll')}
          />
          {userPayroll.map((p) => (
            <PayrollCard
              key={p.id}
              payroll={p}
              onViewDetails={() => navigate(`/user/payroll/${p.id}`)}
              onPrintSlip={() => navigate(`/user/payroll/${p.id}/slip`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
