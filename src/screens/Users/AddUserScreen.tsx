import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { TextInput, PasswordInput, DropdownField } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';

export const AddUserScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addUser, userGroups, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/users' : '/user/users';

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userGroupId, setUserGroupId] = useState(userGroups[0]?.id || '');
  const [accessStatus, setAccessStatus] = useState<'Active' | 'Inactive'>('Active');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!username.trim()) newErrors.username = 'Please enter a valid username';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!userGroupId) newErrors.userGroupId = 'Please select a user group';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addUser({
      fullName,
      username,
      email,
      password,
      userGroupId,
      accessStatus,
      isHR: false,
    });

    navigate(basePath);
  };

  return (
    <>
      <MobileAppBar title="Add New User" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleSubmit}>
          <SectionHeader title="User Details" />
          <div className="mobile-card">
            <TextInput
              label="Full Name"
              placeholder="e.g. Layla Payroll Specialist"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              required
            />

            <TextInput
              label="Username"
              placeholder="Unique login username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              required
            />

            <TextInput
              type="email"
              label="Email Address"
              placeholder="e.g. user@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <PasswordInput
              label="Account Password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />

            <DropdownField
              label="Assigned User Group"
              value={userGroupId}
              onChange={(e) => setUserGroupId(e.target.value)}
              options={userGroups.map(g => ({ label: g.name, value: g.id }))}
              error={errors.userGroupId}
              required
            />

            <DropdownField
              label="Access Status"
              value={accessStatus}
              onChange={(e) => setAccessStatus(e.target.value as 'Active' | 'Inactive')}
              options={[
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
              ]}
              required
            />
          </div>

          <div style={{ marginTop: 24, marginBottom: 20 }}>
            <PrimaryButton type="submit">Create User</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};
