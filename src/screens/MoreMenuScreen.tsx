import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  Shield, 
  Calendar, 
  Settings, 
  LogOut, 
  User as UserIcon, 
  ChevronRight,
  Building2,
  Lock
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { MobileAppBar } from '../components/MobileAppBar';
import { Avatar } from '../components/UIHelpers';
import { ConfirmationDialog } from '../components/ConfirmationDialog';

export const MoreMenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, currentRole, logout, hasPermission } = useApp();

  const isHR = currentRole === 'hr';

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const basePath = isHR ? '/hr' : '/user';

  const canViewUsers = isHR || hasPermission('users', 'view');
  const canViewUserGroups = isHR || hasPermission('userGroups', 'view');
  const canViewHolidays = isHR || hasPermission('holidays', 'view');
  const canViewSettings = isHR || hasPermission('settings', 'view');

  return (
    <>
      <MobileAppBar title="Menu & Settings" />
      <div className="mobile-screen-body">
        {/* Profile Card */}
        <div className="mobile-card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18, marginBottom: 20 }}>
          <Avatar name={currentUser?.fullName || 'User'} size={56} />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main)', marginBottom: 2 }}>
              {currentUser?.fullName}
            </h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{currentUser?.email}</p>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--primary)',
                background: 'var(--primary-light)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-block',
                marginTop: 6,
              }}
            >
              Role: {currentUser?.userGroupName || (isHR ? 'HR Administrator' : 'Staff User')}
            </span>
          </div>
        </div>

        {/* Administration Menu Options */}
        <div className="mobile-card" style={{ padding: '6px 0', marginBottom: 20 }}>
          {canViewUsers && (
            <div
              onClick={() => navigate(`${basePath}/users`)}
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <UserCheck size={20} color="var(--primary)" />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>Application Users</span>
              </div>
              <ChevronRight size={18} color="var(--text-subtle)" />
            </div>
          )}

          {canViewUserGroups && (
            <div
              onClick={() => navigate(`${basePath}/user-groups`)}
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Shield size={20} color="var(--primary)" />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>User Groups & Permissions</span>
              </div>
              <ChevronRight size={18} color="var(--text-subtle)" />
            </div>
          )}

          {canViewHolidays && (
            <div
              onClick={() => navigate(`${basePath}/holidays`)}
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Calendar size={20} color="var(--accent)" />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>Official Holidays</span>
              </div>
              <ChevronRight size={18} color="var(--text-subtle)" />
            </div>
          )}

          {canViewSettings && (
            <div
              onClick={() => navigate(`${basePath}/settings`)}
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Settings size={20} color="var(--secondary)" />
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>General System Settings</span>
              </div>
              <ChevronRight size={18} color="var(--text-subtle)" />
            </div>
          )}
        </div>

        {/* Logout Option */}
        <div
          className="mobile-card"
          onClick={() => setShowLogoutDialog(true)}
          style={{
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            background: 'var(--danger-light)',
            border: '1px solid #fecaca',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--danger)', fontWeight: 700 }}>
            <LogOut size={20} />
            <span>Sign Out Account</span>
          </div>
          <ChevronRight size={18} color="var(--danger)" />
        </div>

        <ConfirmationDialog
          isOpen={showLogoutDialog}
          onClose={() => setShowLogoutDialog(false)}
          onConfirm={handleLogout}
          title="Sign Out"
          message="Are you sure you want to sign out of the mobile application?"
          confirmText="Sign Out"
          isDanger
        />
      </div>
    </>
  );
};
