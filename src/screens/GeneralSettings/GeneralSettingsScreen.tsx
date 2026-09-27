import React, { useState } from 'react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { TextInput, DropdownField } from '../../components/FormFields';
import { PrimaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { Sliders, Calendar, DollarSign } from 'lucide-react';

export const GeneralSettingsScreen: React.FC = () => {
  const { generalSettings, updateGeneralSettings } = useApp();

  const [overtimeRate, setOvertimeRate] = useState(String(generalSettings.overtimeRate));
  const [deductionRate, setDeductionRate] = useState(String(generalSettings.deductionRate));
  const [weeklyHolidaysOption, setWeeklyHolidaysOption] = useState<string>(
    generalSettings.weeklyHolidays.length === 2 ? 'Friday,Saturday' : 'Friday'
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const ot = Number(overtimeRate);
    if (isNaN(ot) || ot <= 0) {
      newErrors.overtimeRate = 'Overtime rate must be a valid positive number';
    }

    const ded = Number(deductionRate);
    if (isNaN(ded) || ded <= 0) {
      newErrors.deductionRate = 'Deduction rate must be a valid positive number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowConfirmDialog(true);
  };

  const handleSave = () => {
    const holidays = weeklyHolidaysOption === 'Friday,Saturday' ? ['Friday', 'Saturday'] : ['Friday'];
    updateGeneralSettings({
      overtimeRate: Number(overtimeRate),
      deductionRate: Number(deductionRate),
      weeklyHolidays: holidays,
    });
    setShowConfirmDialog(false);
  };

  return (
    <>
      <MobileAppBar title="General Settings" showBack />
      <div className="mobile-screen-body">
        <form onSubmit={handleValidate}>
          {/* Overtime & Deductions Section */}
          <SectionHeader title="Overtime & Deductions Rates" subtitle="Set standard calculation rates per hour" />
          <div className="mobile-card">
            <TextInput
              type="number"
              label="Overtime Rate (EGP / Hour)"
              placeholder="e.g. 55"
              value={overtimeRate}
              onChange={(e) => setOvertimeRate(e.target.value)}
              error={errors.overtimeRate}
              leftIcon={<DollarSign size={18} />}
              required
            />

            <TextInput
              type="number"
              label="Deduction Rate (EGP / Hour)"
              placeholder="e.g. 45"
              value={deductionRate}
              onChange={(e) => setDeductionRate(e.target.value)}
              error={errors.deductionRate}
              leftIcon={<DollarSign size={18} />}
              required
            />
          </div>

          {/* Weekly Holidays Section */}
          <SectionHeader title="Weekly Holidays" subtitle="Configured weekend days affecting attendance & payroll" />
          <div className="mobile-card">
            <DropdownField
              label="Selectable Weekend Days"
              value={weeklyHolidaysOption}
              onChange={(e) => setWeeklyHolidaysOption(e.target.value)}
              options={[
                { label: 'Friday Only', value: 'Friday' },
                { label: 'Friday + Saturday', value: 'Friday,Saturday' },
              ]}
              required
            />

            <div
              style={{
                background: 'var(--neutral50)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: 12,
                color: 'var(--text-muted)',
                lineHeight: 1.4,
              }}
            >
              <strong>Impact Note:</strong> Weekly weekend days are automatically excluded from working days when computing monthly payroll and absence deductions.
            </div>
          </div>

          <div style={{ marginTop: 24, marginBottom: 20 }}>
            <PrimaryButton type="submit">Save General Settings</PrimaryButton>
          </div>
        </form>

        <ConfirmationDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleSave}
          title="Save Settings"
          message="Are you sure you want to save changes to overtime, deduction rates, and weekly holidays?"
          confirmText="Yes, Save"
        />
      </div>
    </>
  );
};
