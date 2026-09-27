import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { TextInput, PasswordInput, DropdownField } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export const EditUserScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserById, updateUser, userGroups, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/users' : '/user/users';

  const user = getUserById(id || '');

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userGroupId, setUserGroupId] = useState('');
  const [accessStatus, setAccessStatus] = useState<'Active' | 'Inactive'>('Active');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setUsername(user.username);
      setEmail(user.email);
      setPassword(user.password || 'password123');
      setUserGroupId(user.userGroupId);
      setAccessStatus(user.accessStatus);
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <MobileAppBar title="Edit User" showBack />
        <div className="mobile-screen-body">
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>User not found.</div>
        </div>
      </>
    );
  }

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!username.trim()) newErrors.username = 'Please enter a valid username';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!userGroupId) newErrors.userGroupId = 'Please select a user group';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowConfirmDialog(true);
  };

  const handleSave = () => {
    updateUser(user.id, {
      fullName,
      username,
      email,
      password: password || user.password,
      userGroupId,
      accessStatus,
    });
    setShowConfirmDialog(false);
    navigate(basePath);
  };

  return (
    <>
      <MobileAppBar title="Edit User" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleValidate}>
          <SectionHeader title="Edit User Information" />
          <div className="mobile-card">
            <TextInput
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              required
            />

            <TextInput
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              required
            />

            <TextInput
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <PasswordInput
              label="Account Password"
              placeholder="Leave unchanged or type new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
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
            <PrimaryButton type="submit">Update User</PrimaryButton>
          </div>
        </form>

        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleSave}
          title="Update User Account"
          message={`Are you sure you want to update ${user.fullName}'s account settings?`}
          confirmText="Yes, Update"
        />
      </div>
    </>
  );
};
