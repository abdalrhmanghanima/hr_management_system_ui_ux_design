import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { TextInput } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';
import { PermissionSection } from '../../components/PermissionSection';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { GroupPermissions, PermissionModule, ModulePermissions } from '../../models/types';
import { validateUserGroupName, validateGroupPermissions } from '../../utils/validation';

export const EditUserGroupScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserGroupById, updateUserGroup, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/user-groups' : '/user/user-groups';

  const group = getUserGroupById(id || '');

  const [groupName, setGroupName] = useState('');
  const [permissions, setPermissions] = useState<GroupPermissions | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (group) {
      setGroupName(group.name);
      setPermissions(group.permissions);
    }
  }, [group]);

  if (!group || !permissions) {
    return (
      <>
        <MobileAppBar title="Edit User Group" showBack />
        <div className="mobile-screen-body">
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>User Group not found.</div>
        </div>
      </>
    );
  }

  const handlePermissionChange = (moduleKey: PermissionModule, actionKey: keyof ModulePermissions, value: boolean) => {
    setPermissions(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [moduleKey]: {
          ...prev[moduleKey],
          [actionKey]: value,
        },
      };
    });
  };

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();
    const nameErr = validateUserGroupName(groupName);
    const permErr = validateGroupPermissions(permissions);

    setNameError(nameErr);
    setPermissionError(permErr);

    if (nameErr || permErr) return;

    setShowConfirmDialog(true);
  };

  const handleSave = () => {
    updateUserGroup(group.id, {
      name: groupName,
      permissions,
    });
    setShowConfirmDialog(false);
    navigate(basePath);
  };

  return (
    <>
      <MobileAppBar title="Edit User Group" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleValidation}>
          <SectionHeader title="Group Information" />
          <div className="mobile-card">
            <TextInput
              label="Group Name"
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
            <PrimaryButton type="submit">Update Group</PrimaryButton>
          </div>
        </form>

        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleSave}
          title="Update Group Permissions"
          message={`Are you sure you want to update permissions for "${group.name}"?`}
          confirmText="Yes, Update"
        />
      </div>
    </>
  );
};
