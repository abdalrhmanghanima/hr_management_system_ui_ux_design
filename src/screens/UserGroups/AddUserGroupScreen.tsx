import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { TextInput } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';
import { PermissionSection } from '../../components/PermissionSection';
import { GroupPermissions, PermissionModule, ModulePermissions } from '../../models/types';
import { validateUserGroupName, validateGroupPermissions } from '../../utils/validation';

const DEFAULT_EMPTY_PERMISSIONS: GroupPermissions = {
  employees: { view: false, add: false, edit: false, delete: false },
  attendance: { view: false, add: false, edit: false, delete: false },
  payroll: { view: false, add: false, edit: false, delete: false, print: false },
  users: { view: false, add: false, edit: false, delete: false },
  userGroups: { view: false, add: false, edit: false, delete: false },
  holidays: { view: false, add: false, edit: false, delete: false },
  settings: { view: false, add: false, edit: false, delete: false },
};

export const AddUserGroupScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addUserGroup, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/user-groups' : '/user/user-groups';

  const [groupName, setGroupName] = useState('');
  const [permissions, setPermissions] = useState<GroupPermissions>(DEFAULT_EMPTY_PERMISSIONS);
  const [nameError, setNameError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const handlePermissionChange = (moduleKey: PermissionModule, actionKey: keyof ModulePermissions, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [actionKey]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameErr = validateUserGroupName(groupName);
    const permErr = validateGroupPermissions(permissions);

    setNameError(nameErr);
    setPermissionError(permErr);

    if (nameErr || permErr) return;

    addUserGroup({
      name: groupName,
      permissions,
    });

    navigate(basePath);
  };

  return (
    <>
      <MobileAppBar title="Add User Group" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleSubmit}>
          <SectionHeader title="Group Information" />
          <div className="mobile-card">
            <TextInput
              label="Group Name"
              placeholder="e.g. Attendance Officer, Accountant"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              error={nameError}
              required
            />
          </div>

          <SectionHeader title="Module Permissions" subtitle="Tap modules to expand permission controls" />

          {permissionError && (
            <div
              style={{
                padding: '12px 14px',
                background: 'var(--danger-light)',
                color: 'var(--danger)',
                borderRadius: 'var(--radius-md)',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              {permissionError}
            </div>
          )}

          <PermissionSection
            moduleKey="employees"
            moduleTitle="Employees Management"
            permissions={permissions.employees}
            onChange={handlePermissionChange}
          />

          <PermissionSection
            moduleKey="attendance"
            moduleTitle="Attendance Records"
            permissions={permissions.attendance}
            onChange={handlePermissionChange}
          />

          <PermissionSection
            moduleKey="payroll"
            moduleTitle="Payroll & Salary Slips"
            permissions={permissions.payroll}
            onChange={handlePermissionChange}
            supportsPrint
          />

          <PermissionSection
            moduleKey="users"
            moduleTitle="Users Management"
            permissions={permissions.users}
            onChange={handlePermissionChange}
          />

          <PermissionSection
            moduleKey="userGroups"
            moduleTitle="User Groups & Roles"
            permissions={permissions.userGroups}
            onChange={handlePermissionChange}
          />

          <PermissionSection
            moduleKey="holidays"
            moduleTitle="Official Holidays"
            permissions={permissions.holidays}
            onChange={handlePermissionChange}
          />

          <PermissionSection
            moduleKey="settings"
            moduleTitle="General System Settings"
            permissions={permissions.settings}
            onChange={handlePermissionChange}
          />

          <div style={{ marginTop: 24, marginBottom: 20 }}>
            <PrimaryButton type="submit">Create User Group</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};
