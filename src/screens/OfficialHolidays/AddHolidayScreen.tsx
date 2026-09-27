import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { TextInput, DateField } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';

export const AddHolidayScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addHoliday, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/holidays' : '/user/holidays';

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Holiday name is required';
    if (!date) newErrors.date = 'Holiday date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addHoliday({ name, date });
    navigate(basePath);
  };

  return (
    <>
      <MobileAppBar title="Add Official Holiday" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleSubmit}>
          <SectionHeader title="Holiday Information" />
          <div className="mobile-card">
            <TextInput
              label="Holiday Name"
              placeholder="e.g. Revolution Day, Eid El-Fitr"
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
            <PrimaryButton type="submit">Save Holiday</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};
