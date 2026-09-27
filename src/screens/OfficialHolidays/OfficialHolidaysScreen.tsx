import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { HolidayCard } from '../../components/HolidayCard';
import { FAB } from '../../components/Buttons';
import { EmptyState } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export const OfficialHolidaysScreen: React.FC = () => {
  const navigate = useNavigate();
  const { holidays, deleteHoliday, currentRole, hasPermission } = useApp();

  const isHR = currentRole === 'hr';
  const canAdd = isHR || hasPermission('holidays', 'add');
  const canEdit = isHR || hasPermission('holidays', 'edit');
  const canDelete = isHR || hasPermission('holidays', 'delete');

  const basePath = isHR ? '/hr/holidays' : '/user/holidays';

  const [holidayToDelete, setHolidayToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleDeleteConfirm = () => {
    if (holidayToDelete) {
      deleteHoliday(holidayToDelete.id);
      setHolidayToDelete(null);
    }
  };

  return (
    <>
      <MobileAppBar title="Official Holidays" showBack />
      <div className="mobile-screen-body">
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Official national & company annual holidays.
          </p>
        </div>

        {holidays.length === 0 ? (
          <EmptyState
            icon={<Calendar size={40} />}
            title="No Official Holidays"
            description="No upcoming official holidays registered."
            actionText={canAdd ? "Add Holiday" : undefined}
            onAction={canAdd ? () => navigate(`${basePath}/add`) : undefined}
          />
        ) : (
          holidays.map((h) => (
            <HolidayCard
              key={h.id}
              holiday={h}
              onEdit={canEdit ? () => navigate(`${basePath}/${h.id}/edit`) : undefined}
              onDelete={canDelete ? () => setHolidayToDelete({ id: h.id, name: h.name }) : undefined}
            />
          ))
        )}

        {canAdd && <FAB onClick={() => navigate(`${basePath}/add`)} label="Add Holiday" />}

        <ConfirmationDialog
          isOpen={!!holidayToDelete}
          onClose={() => setHolidayToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Holiday"
          message={`Are you sure you want to remove official holiday "${holidayToDelete?.name}"?`}
          confirmText="Yes, Delete"
          isDanger
        />
      </div>
    </>
  );
};
