import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, FileSpreadsheet } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { SearchBar } from '../../components/FormFields';
import { AttendanceCard } from '../../components/AttendanceCard';
import { AttendanceFilterSheet } from '../../components/FilterSheet';
import { FAB, SecondaryButton } from '../../components/Buttons';
import { EmptyState } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { AttendanceFilterOptions } from '../../models/types';

export const AttendanceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { attendanceRecords, employees, deleteAttendanceRecord, currentRole, hasPermission } = useApp();

  const isHR = currentRole === 'hr';
  const canAdd = isHR || hasPermission('attendance', 'add');
  const canEdit = isHR || hasPermission('attendance', 'edit');
  const canDelete = isHR || hasPermission('attendance', 'delete');

  const basePath = isHR ? '/hr/attendance' : '/user/attendance';

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState<AttendanceFilterOptions>({});
  const [recordToDelete, setRecordToDelete] = useState<{ id: string; name: string } | null>(null);

  const filteredRecords = attendanceRecords.filter((rec) => {
    // Search query match
    const matchesSearch =
      rec.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.date.includes(searchQuery);

    if (!matchesSearch) return false;

    // Filter sheet matches
    if (filters.employeeId && rec.employeeId !== filters.employeeId) return false;
    if (filters.department && rec.department !== filters.department) return false;
    if (filters.date && rec.date !== filters.date) return false;

    if (filters.fromDate && new Date(rec.date) < new Date(filters.fromDate)) return false;
    if (filters.toDate && new Date(rec.date) > new Date(filters.toDate)) return false;

    return true;
  });

  const hasActiveFilters = Object.keys(filters).some(k => !!filters[k as keyof AttendanceFilterOptions]);

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      deleteAttendanceRecord(recordToDelete.id);
      setRecordToDelete(null);
    }
  };

  return (
    <>
      <MobileAppBar
        title="Attendance Records"
        action={
          canAdd
            ? {
                label: 'Import',
                icon: <FileSpreadsheet size={16} />,
                onClick: () => navigate(`${basePath}/import`),
              }
            : undefined
        }
      />
      <div className="mobile-screen-body">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by employee or date..."
          onFilterClick={() => setIsFilterSheetOpen(true)}
          isFilterActive={hasActiveFilters}
        />

        {filteredRecords.length === 0 ? (
          <EmptyState
            icon={<CalendarCheck size={40} />}
            title="No Attendance Records"
            description={
              hasActiveFilters || searchQuery
                ? "No attendance entries match your current search or filter criteria."
                : "No attendance logs have been created yet."
            }
            actionText={canAdd ? "Record Attendance" : undefined}
            onAction={canAdd ? () => navigate(`${basePath}/add`) : undefined}
          />
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center',
                fontSize: 13,
                color: 'var(--text-muted)',
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              <span>Showing {filteredRecords.length} Attendance Entries</span>
              {hasActiveFilters && (
                <button
                  onClick={() => setFilters({})}
                  style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: 12 }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {filteredRecords.map((rec) => (
              <AttendanceCard
                key={rec.id}
                record={rec}
                canEdit={canEdit}
                canDelete={canDelete}
                onEdit={canEdit ? () => navigate(`${basePath}/${rec.id}/edit`) : undefined}
                onDelete={canDelete ? () => setRecordToDelete({ id: rec.id, name: `${rec.employeeName} (${rec.date})` }) : undefined}
              />
            ))}
          </div>
        )}

        {canAdd && <FAB onClick={() => navigate(`${basePath}/add`)} label="Record Attendance" />}

        <AttendanceFilterSheet
          isOpen={isFilterSheetOpen}
          onClose={() => setIsFilterSheetOpen(false)}
          onApply={setFilters}
          employees={employees}
          initialFilters={filters}
        />

        <ConfirmationDialog
          isOpen={!!recordToDelete}
          onClose={() => setRecordToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Attendance Record"
          message={`Are you sure you want to delete attendance record for "${recordToDelete?.name}"?`}
          confirmText="Yes, Delete"
          isDanger
        />
      </div>
    </>
  );
};
