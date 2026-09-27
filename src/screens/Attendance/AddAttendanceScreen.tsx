import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { DropdownField, DateField, TimeField, TextInput } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';
import { AttendanceStatus } from '../../models/types';

export const AddAttendanceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { employees, addAttendanceRecord, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/attendance' : '/user/attendance';

  const [employeeId, setEmployeeId] = useState(employees[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkIn, setCheckIn] = useState('09:00');
  const [checkOut, setCheckOut] = useState('17:00');
  const [status, setStatus] = useState<AttendanceStatus>('Present');
  const [overtimeHours, setOvertimeHours] = useState('0');
  const [deductionHours, setDeductionHours] = useState('0');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!employeeId) newErrors.employeeId = 'Please select an employee';
    if (!date) newErrors.date = 'Date is required';

    const emp = employees.find(e => e.id === employeeId);
    if (!emp) newErrors.employeeId = 'Invalid employee selection';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addAttendanceRecord({
      employeeId,
      employeeName: emp ? emp.fullName : 'Employee',
      department: emp?.department || 'General',
      date,
      checkIn: status === 'Absent' ? '00:00' : checkIn,
      checkOut: status === 'Absent' ? '00:00' : checkOut,
      status,
      overtimeHours: Number(overtimeHours) || 0,
      deductionHours: Number(deductionHours) || 0,
    });

    navigate(basePath);
  };

  return (
    <>
      <MobileAppBar title="Record Attendance" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleSubmit}>
          <SectionHeader title="Attendance Entry" />
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
            <PrimaryButton type="submit">Save Attendance</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};
