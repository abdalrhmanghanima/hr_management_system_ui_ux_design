import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { TextInput, DateField } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';

export const EditHolidayScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { holidays, updateHoliday, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/holidays' : '/user/holidays';

  const holiday = holidays.find(h => h.id === id);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (holiday) {
      setName(holiday.name);
      setDate(holiday.date);
    }
  }, [holiday]);

  if (!holiday) {
    return (
      <>
        <MobileAppBar title="Edit Holiday" showBack />
        <div className="mobile-screen-body">
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>Holiday not found.</div>
        </div>
      </>
    );
  }

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Holiday name is required';
    if (!date) newErrors.date = 'Holiday date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowConfirmDialog(true);
  };

  const handleSave = () => {
    updateHoliday(holiday.id, { name, date });
    setShowConfirmDialog(false);
    navigate(basePath);
  };

  return (
    <>
      <MobileAppBar title="Edit Official Holiday" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleValidation}>
          <SectionHeader title="Edit Holiday Details" />
          <div className="mobile-card">
            <TextInput
              label="Holiday Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
            />

            <DateField
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
              required
            />
          </div>

          <div style={{ marginTop: 24, marginBottom: 20 }}>
            <PrimaryButton type="submit">Update Holiday</PrimaryButton>
          </div>
        </form>

        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleSave}
          title="Update Holiday"
          message={`Are you sure you want to update "${holiday.name}"?`}
          confirmText="Yes, Update"
        />
      </div>
    </>
  );
};
