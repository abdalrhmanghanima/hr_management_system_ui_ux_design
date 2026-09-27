import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Calendar, CreditCard, Flag, Briefcase, DollarSign, Clock, Edit3, Trash2 } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { Avatar, SectionHeader } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { PrimaryButton, DangerButton } from '../../components/Buttons';

export const EmployeeDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEmployeeById, deleteEmployee, currentRole, hasPermission } = useApp();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const employee = getEmployeeById(id || '');

  const isHR = currentRole === 'hr';
  const canEdit = isHR || hasPermission('employees', 'edit');
  const canDelete = isHR || hasPermission('employees', 'delete');

  const basePath = isHR ? '/hr/employees' : '/user/employees';

  if (!employee) {
    return (
      <>
        <MobileAppBar title="Employee Details" showBack />
        <div className="mobile-screen-body">
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            Employee not found.
          </div>
        </div>
      </>
    );
  }

  const handleDelete = () => {
    deleteEmployee(employee.id);
    navigate(basePath);
  };

  return (
    <>
      <MobileAppBar
        title="Employee Details"
        showBack
        action={
          canEdit
            ? {
                label: 'Edit',
                icon: <Edit3 size={16} />,
                onClick: () => navigate(`${basePath}/${employee.id}/edit`),
              }
            : undefined
        }
      />
      <div className="mobile-screen-body">
        {/* Profile Card Header */}
        <div className="mobile-card" style={{ textAlign: 'center', padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <Avatar name={employee.fullName} src={employee.avatarUrl} size={72} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
            {employee.fullName}
          </h2>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--primary)',
              background: 'var(--primary-light)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
            }}
          >
            {employee.department || 'Staff Member'}
          </span>
        </div>

        {/* Section 1: Personal Information */}
        <SectionHeader title="Personal Information" />
        <div className="mobile-card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Phone size={18} color="var(--primary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Phone Number</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{employee.phoneNumber}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <MapPin size={18} color="var(--primary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Address</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{employee.address}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Calendar size={18} color="var(--primary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Birth Date</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{employee.birthDate}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CreditCard size={18} color="var(--primary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>National ID</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{employee.nationalId}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, paddingTop: 4 }}>
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Gender</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{employee.gender}</span>
              </div>
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Nationality</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{employee.nationality}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Work Information */}
        <SectionHeader title="Work Information" />
        <div className="mobile-card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Briefcase size={18} color="var(--secondary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Contract Date</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{employee.contractDate}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <DollarSign size={18} color="var(--secondary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Basic Monthly Salary</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main)' }}>
                  {employee.salary.toLocaleString()} EGP
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Clock size={18} color="var(--secondary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Working Hours Shift</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>
                  {employee.attendanceTime} - {employee.departureTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Destructive Action */}
        {canDelete && (
          <DangerButton icon={<Trash2 size={18} />} onClick={() => setShowDeleteDialog(true)}>
            Delete Employee
          </DangerButton>
        )}

        <ConfirmationDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleDelete}
          title="Delete Employee"
          message={`Are you sure you want to delete ${employee.fullName}? This operation cannot be undone.`}
          confirmText="Yes, Delete"
          isDanger
        />
      </div>
    </>
  );
};
