import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { Avatar, SectionHeader } from '../../components/UIHelpers';
import { StatusChip } from '../../components/StatusChip';
import { Shield, Mail, User as UserIcon, Edit3 } from 'lucide-react';

export const UserDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserById, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/users' : '/user/users';

  const user = getUserById(id || '');

  if (!user) {
    return (
      <>
        <MobileAppBar title="User Details" showBack />
        <div className="mobile-screen-body">
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>User not found.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileAppBar
        title="User Details"
        showBack
        action={{
          label: 'Edit',
          icon: <Edit3 size={16} />,
          onClick: () => navigate(`${basePath}/${user.id}/edit`),
        }}
      />
      <div className="mobile-screen-body">
        <div className="mobile-card" style={{ textAlign: 'center', padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <Avatar name={user.fullName} size={72} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
            {user.fullName}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8 }}>
            <StatusChip status={user.accessStatus} />
          </div>
        </div>

        <SectionHeader title="Account Information" />
        <div className="mobile-card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <UserIcon size={18} color="var(--primary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Username</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>@{user.username}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Mail size={18} color="var(--primary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{user.email}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Shield size={18} color="var(--primary)" />
              <div>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>User Group Role</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>
                  {user.userGroupName || 'Custom Permissions'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
