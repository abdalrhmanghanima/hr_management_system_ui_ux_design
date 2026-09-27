import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { SearchBar } from '../../components/FormFields';
import { UserCard } from '../../components/UserCard';
import { FAB } from '../../components/Buttons';
import { EmptyState } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export const UsersScreen: React.FC = () => {
  const navigate = useNavigate();
  const { users, deleteUser, currentRole, hasPermission } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);

  const isHR = currentRole === 'hr';
  const canAdd = isHR || hasPermission('users', 'add');
  const canEdit = isHR || hasPermission('users', 'edit');
  const canDelete = isHR || hasPermission('users', 'delete');

  const basePath = isHR ? '/hr/users' : '/user/users';

  const filteredUsers = users.filter(
    u =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.userGroupName && u.userGroupName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setUserToDelete(null);
    }
  };

  return (
    <>
      <MobileAppBar title="Application Users" showBack />
      <div className="mobile-screen-body">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, username, email..."
        />

        {filteredUsers.length === 0 ? (
          <EmptyState
            icon={<UserCheck size={40} />}
            title="No Users Found"
            description={searchQuery ? "No application users match your search." : "There are no users registered."}
            actionText={canAdd ? "Create New User" : undefined}
            onAction={canAdd ? () => navigate(`${basePath}/add`) : undefined}
          />
        ) : (
          <div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, fontWeight: 600 }}>
              Showing {filteredUsers.length} Registered User{filteredUsers.length !== 1 ? 's' : ''}
            </div>
            {filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={canEdit ? () => navigate(`${basePath}/${user.id}/edit`) : undefined}
                onDelete={canDelete && !user.isHR ? () => setUserToDelete({ id: user.id, name: user.fullName }) : undefined}
              />
            ))}
          </div>
        )}

        {canAdd && <FAB onClick={() => navigate(`${basePath}/add`)} label="Add User" />}

        <ConfirmationDialog
          isOpen={!!userToDelete}
          onClose={() => setUserToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete User"
          message={`Are you sure you want to delete user account "${userToDelete?.name}"?`}
          confirmText="Yes, Delete"
          isDanger
        />
      </div>
    </>
  );
};
