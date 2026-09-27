import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { FAB } from '../../components/Buttons';
import { EmptyState } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export const UserGroupsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { userGroups, deleteUserGroup, currentRole, hasPermission } = useApp();

  const isHR = currentRole === 'hr';
  const canAdd = isHR || hasPermission('userGroups', 'add');
  const canEdit = isHR || hasPermission('userGroups', 'edit');
  const canDelete = isHR || hasPermission('userGroups', 'delete');

  const basePath = isHR ? '/hr/user-groups' : '/user/user-groups';

  const [groupToDelete, setGroupToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleDeleteConfirm = () => {
    if (groupToDelete) {
      deleteUserGroup(groupToDelete.id);
      setGroupToDelete(null);
    }
  };

  return (
    <>
      <MobileAppBar title="User Groups & Roles" showBack />
      <div className="mobile-screen-body">
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Define custom permission rules for user roles. Dynamic group permissions control screen access & capabilities.
          </p>
        </div>

        {userGroups.length === 0 ? (
          <EmptyState
            icon={<Shield size={40} />}
            title="No User Groups"
            description="Create group roles to assign permissions to users."
            actionText={canAdd ? "Add User Group" : undefined}
            onAction={canAdd ? () => navigate(`${basePath}/add`) : undefined}
          />
        ) : (
          userGroups.map((group) => {
            const activePermCount = Object.values(group.permissions).reduce((acc, modulePerms) => {
              return acc + Object.values(modulePerms).filter(Boolean).length;
            }, 0);

            return (
              <div key={group.id} className="mobile-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Shield size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 2 }}>
                        {group.name}
                      </h3>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {activePermCount} active permissions
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    {canEdit && (
                      <button
                        onClick={() => navigate(`${basePath}/${group.id}/edit`)}
                        style={{
                          background: 'var(--neutral100)',
                          border: 'none',
                          width: 34,
                          height: 34,
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Edit2 size={16} />
                      </button>
                    )}

                    {canDelete && group.name !== 'HR' && (
                      <button
                        onClick={() => setGroupToDelete({ id: group.id, name: group.name })}
                        style={{
                          background: 'var(--danger-light)',
                          border: 'none',
                          width: 34,
                          height: 34,
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--danger)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {canAdd && <FAB onClick={() => navigate(`${basePath}/add`)} label="Add User Group" />}

        <ConfirmationDialog
          isOpen={!!groupToDelete}
          onClose={() => setGroupToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete User Group"
          message={`Are you sure you want to delete the user group "${groupToDelete?.name}"?`}
          confirmText="Yes, Delete"
          isDanger
        />
      </div>
    </>
  );
};
