import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { TextInput, DropdownField, DateField, TimeField } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { Gender } from '../../models/types';
import {
  validatePhone,
  validateBirthDate,
  validateNationalId,
  validateContractDate,
  validateSalary,
} from '../../utils/validation';

export const EditEmployeeScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEmployeeById, updateEmployee, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/employees' : '/user/employees';

  const employee = getEmployeeById(id || '');

  // Personal Info State
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender>('Male');
  const [nationalId, setNationalId] = useState('');
  const [nationality, setNationality] = useState('');
  const [department, setDepartment] = useState('');

  // Work Info State
  const [contractDate, setContractDate] = useState('');
  const [salary, setSalary] = useState('');
  const [attendanceTime, setAttendanceTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (employee) {
      setFullName(employee.fullName);
      setAddress(employee.address);
      setPhoneNumber(employee.phoneNumber);
      setBirthDate(employee.birthDate);
      setGender(employee.gender);
      setNationalId(employee.nationalId);
      setNationality(employee.nationality);
      setDepartment(employee.department || 'Engineering');
      setContractDate(employee.contractDate);
      setSalary(String(employee.salary));
      setAttendanceTime(employee.attendanceTime);
      setDepartureTime(employee.departureTime);
    }
  }, [employee]);

  if (!employee) {
    return (
      <>
        <MobileAppBar title="Edit Employee" showBack />
        <div className="mobile-screen-body">
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            Employee not found.
          </div>
        </div>
      </>
    );
  }

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!nationality.trim()) newErrors.nationality = 'Nationality is required';

    const phoneErr = validatePhone(phoneNumber);
    if (phoneErr) newErrors.phoneNumber = phoneErr;

    const birthErr = validateBirthDate(birthDate);
    if (birthErr) newErrors.birthDate = birthErr;

    const natIdErr = validateNationalId(nationalId);
    if (natIdErr) newErrors.nationalId = natIdErr;

    const contractErr = validateContractDate(contractDate);
    if (contractErr) newErrors.contractDate = contractErr;

    const salaryErr = validateSalary(salary);
    if (salaryErr) newErrors.salary = salaryErr;

    if (!attendanceTime) newErrors.attendanceTime = 'Attendance time is required';
    if (!departureTime) newErrors.departureTime = 'Departure time is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowConfirmDialog(true);
  };

  const handleSave = () => {
    updateEmployee(employee.id, {
      fullName,
      address,
      phoneNumber,
      birthDate,
      gender,
      nationalId,
      nationality,
      contractDate,
      salary: Number(salary),
      attendanceTime,
      departureTime,
      department,
    });

    setShowConfirmDialog(false);
    navigate(`${basePath}/${employee.id}`);
  };

  return (
    <>
      <MobileAppBar title="Edit Employee" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleValidation}>
          {/* Personal Information Section */}
          <SectionHeader title="Personal Information" />
          <div className="mobile-card">
            <TextInput
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              required
            />

            <TextInput
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={errors.address}
              required
            />

            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={errors.phoneNumber}
              required
            />

            <DateField
              label="Birth Date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              error={errors.birthDate}
              required
            />

            <DropdownField
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
              required
            />

            <TextInput
              label="National ID"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              error={errors.nationalId}
              required
            />

            <TextInput
              label="Nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              error={errors.nationality}
              required
            />
          </div>

          {/* Work Information Section */}
          <SectionHeader title="Work Information" />
          <div className="mobile-card">
            <DropdownField
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              options={[
                { label: 'Engineering', value: 'Engineering' },
                { label: 'Operations', value: 'Operations' },
                { label: 'Human Resources', value: 'Human Resources' },
                { label: 'Finance', value: 'Finance' },
                { label: 'Marketing', value: 'Marketing' },
              ]}
              required
            />

            <DateField
              label="Contract Date"
              value={contractDate}
              onChange={(e) => setContractDate(e.target.value)}
              error={errors.contractDate}
              required
            />

            <TextInput
              type="number"
              label="Salary (EGP)"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              error={errors.salary}
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <TimeField
                label="Attendance Time"
                value={attendanceTime}
                onChange={(e) => setAttendanceTime(e.target.value)}
                error={errors.attendanceTime}
                required
              />
              <TimeField
                label="Departure Time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                error={errors.departureTime}
                required
              />
            </div>
          </div>

          <div style={{ marginTop: 24, marginBottom: 20 }}>
            <PrimaryButton type="submit">Update Employee</PrimaryButton>
          </div>
        </form>

        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleSave}
          title="Save Changes"
          message={`Are you sure you want to update ${employee.fullName}'s information?`}
          confirmText="Yes, Save"
        />
      </div>
    </>
  );
};
