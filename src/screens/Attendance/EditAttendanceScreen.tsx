import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { DropdownField, DateField, TimeField, TextInput } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { AttendanceStatus } from '../../models/types';

export const EditAttendanceScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { attendanceRecords, updateAttendanceRecord, employees, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/attendance' : '/user/attendance';

  const record = attendanceRecords.find(a => a.id === id);

  const [employeeId, setEmployeeId] = useState('');
  const [date, setDate] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [status, setStatus] = useState<AttendanceStatus>('Present');
  const [overtimeHours, setOvertimeHours] = useState('0');
  const [deductionHours, setDeductionHours] = useState('0');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (record) {
      setEmployeeId(record.employeeId);
      setDate(record.date);
      setCheckIn(record.checkIn);
      setCheckOut(record.checkOut);
      setStatus(record.status);
      setOvertimeHours(String(record.overtimeHours));
      setDeductionHours(String(record.deductionHours));
    }
  }, [record]);

  if (!record) {
    return (
      <>
        <MobileAppBar title="Edit Attendance" showBack />
        <div className="mobile-screen-body">
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Attendance record not found.</div>
        </div>
      </>
    );
  }

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!employeeId) newErrors.employeeId = 'Please select an employee';
    if (!date) newErrors.date = 'Date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowConfirmDialog(true);
  };

  const handleSave = () => {
    const emp = employees.find(e => e.id === employeeId);
    updateAttendanceRecord(record.id, {
      employeeId,
      employeeName: emp ? emp.fullName : record.employeeName,
      department: emp?.department || record.department,
      date,
      checkIn: status === 'Absent' ? '00:00' : checkIn,
      checkOut: status === 'Absent' ? '00:00' : checkOut,
      status,
      overtimeHours: Number(overtimeHours) || 0,
      deductionHours: Number(deductionHours) || 0,
    });

    setShowConfirmDialog(false);
    navigate(basePath);
  };

  return (
    <>
      <MobileAppBar title="Edit Attendance" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleValidate}>
          <SectionHeader title="Edit Attendance Entry" />
          <div className="mobile-card">
            <DropdownField
              label="Select Employee"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              options={employees.map(e => ({ label: `${e.fullName} (${e.department})`, value: e.id }))}
              error={errors.employeeId}
              required
            />

            <DateField
              label="Attendance Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
              required
            />

            <DropdownField
              label="Attendance Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as AttendanceStatus)}
              options={[
                { label: 'Present', value: 'Present' },
                { label: 'Absent', value: 'Absent' },
                { label: 'Late', value: 'Late' },
                { label: 'Leave', value: 'Leave' },
              ]}
              required
            />

            {status !== 'Absent' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <TimeField
                  label="Check-In Time"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
                <TimeField
                  label="Check-Out Time"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
              <TextInput
                type="number"
                step="0.5"
                label="Overtime (Hours)"
                value={overtimeHours}
                onChange={(e) => setOvertimeHours(e.target.value)}
              />
              <TextInput
                type="number"
                step="0.5"
                label="Deduction (Hours)"
                value={deductionHours}
                onChange={(e) => setDeductionHours(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: 24, marginBottom: 20 }}>
            <PrimaryButton type="submit">Update Record</PrimaryButton>
          </div>
        </form>

        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleSave}
          title="Save Changes"
          message={`Are you sure you want to update attendance record for ${record.employeeName}?`}
          confirmText="Yes, Update"
        />
      </div>
    </>
  );
};
