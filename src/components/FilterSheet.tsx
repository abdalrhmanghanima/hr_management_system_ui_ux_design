import React, { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { DropdownField, DateField, TextInput } from './FormFields';
import { PrimaryButton, SecondaryButton } from './Buttons';
import { AttendanceFilterOptions, PayrollFilterOptions, Employee } from '../models/types';
import { validateDateRange } from '../utils/validation';

interface AttendanceFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: AttendanceFilterOptions) => void;
  employees: Employee[];
  initialFilters: AttendanceFilterOptions;
}

export const AttendanceFilterSheet: React.FC<AttendanceFilterSheetProps> = ({
  isOpen,
  onClose,
  onApply,
  employees,
  initialFilters,
}) => {
  const [employeeId, setEmployeeId] = useState(initialFilters.employeeId || '');
  const [department, setDepartment] = useState(initialFilters.department || '');
  const [date, setDate] = useState(initialFilters.date || '');
  const [fromDate, setFromDate] = useState(initialFilters.fromDate || '');
  const [toDate, setToDate] = useState(initialFilters.toDate || '');
  const [error, setError] = useState<string | null>(null);

  const departments = Array.from(new Set(employees.map(e => e.department).filter(Boolean))) as string[];

  const handleApply = () => {
    const dateErr = validateDateRange(fromDate, toDate);
    if (dateErr) {
      setError(dateErr);
      return;
    }
    setError(null);
    onApply({
      employeeId: employeeId || undefined,
      department: department || undefined,
      date: date || undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    });
    onClose();
  };

  const handleReset = () => {
    setEmployeeId('');
    setDepartment('');
    setDate('');
    setFromDate('');
    setToDate('');
    setError(null);
    onApply({});
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Filter Attendance Records">
      {error && (
        <div style={{ padding: 10, background: '#fef2f2', color: '#ef4444', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <DropdownField
        label="Employee"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        options={employees.map(e => ({ label: e.fullName, value: e.id }))}
      />

      <DropdownField
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        options={departments.map(d => ({ label: d, value: d }))}
      />

      <DateField
        label="Specific Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <DateField
          label="From Date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <DateField
          label="To Date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <SecondaryButton onClick={handleReset}>Reset</SecondaryButton>
        <PrimaryButton onClick={handleApply}>Apply Filters</PrimaryButton>
      </div>
    </BottomSheet>
  );
};

interface PayrollFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: PayrollFilterOptions) => void;
  employees: Employee[];
  initialFilters: PayrollFilterOptions;
}

export const PayrollFilterSheet: React.FC<PayrollFilterSheetProps> = ({
  isOpen,
  onClose,
  onApply,
  employees,
  initialFilters,
}) => {
  const [employeeId, setEmployeeId] = useState(initialFilters.employeeId || '');
  const [month, setMonth] = useState(initialFilters.month || '');
  const [year, setYear] = useState<string>(initialFilters.year ? String(initialFilters.year) : '');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleApply = () => {
    onApply({
      employeeId: employeeId || undefined,
      month: month || undefined,
      year: year ? Number(year) : undefined,
    });
    onClose();
  };

  const handleReset = () => {
    setEmployeeId('');
    setMonth('');
    setYear('');
    onApply({});
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Filter Payroll">
      <DropdownField
        label="Employee"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        options={employees.map(e => ({ label: e.fullName, value: e.id }))}
      />

      <DropdownField
        label="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        options={months.map(m => ({ label: m, value: m }))}
      />

      <TextInput
        type="number"
        label="Year"
        placeholder="e.g. 2026"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <SecondaryButton onClick={handleReset}>Reset</SecondaryButton>
        <PrimaryButton onClick={handleApply}>Apply Filters</PrimaryButton>
      </div>
    </BottomSheet>
  );
};
