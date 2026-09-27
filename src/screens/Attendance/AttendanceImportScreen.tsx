import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSpreadsheet, Upload, CheckCircle2, AlertCircle, FileCheck, ArrowLeft } from 'lucide-react';
import { useApp } from '../../state/AppContext';
import { MobileAppBar } from '../../components/MobileAppBar';
import { PrimaryButton, SecondaryButton } from '../../components/Buttons';
import { SectionHeader } from '../../components/UIHelpers';

export const AttendanceImportScreen: React.FC = () => {
  const navigate = useNavigate();
  const { importAttendanceRecords, employees, currentRole } = useApp();

  const isHR = currentRole === 'hr';
  const basePath = isHR ? '/hr/attendance' : '/user/attendance';

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [statusState, setStatusState] = useState<'idle' | 'selected' | 'importing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSimulateFileSelect = (fileName: string) => {
    setSelectedFileName(fileName);
    setStatusState('selected');
    setErrorMessage(null);
  };

  const handleStartImport = () => {
    if (!selectedFileName) {
      setErrorMessage('Please select an Excel or CSV file first');
      setStatusState('error');
      return;
    }

    setStatusState('importing');

    setTimeout(() => {
      // Create mock imported records
      const mockImported = [
        {
          employeeId: employees[0]?.id || 'emp-101',
          employeeName: employees[0]?.fullName || 'Ahmed Mohamed',
          department: employees[0]?.department || 'Engineering',
          date: '2026-09-22',
          checkIn: '08:50',
          checkOut: '17:15',
          status: 'Present' as const,
          overtimeHours: 0.25,
          deductionHours: 0,
        },
        {
          employeeId: employees[1]?.id || 'emp-102',
          employeeName: employees[1]?.fullName || 'Mohamed Ali',
          department: employees[1]?.department || 'Operations',
          date: '2026-09-22',
          checkIn: '09:00',
          checkOut: '17:00',
          status: 'Present' as const,
          overtimeHours: 0,
          deductionHours: 0,
        },
      ];

      importAttendanceRecords(mockImported);
      setStatusState('success');
    }, 1500);
  };

  return (
    <>
      <MobileAppBar title="Import Attendance File" showBack />
      <div className="mobile-screen-body">
        <SectionHeader title="Excel / Biometric Import" subtitle="Upload attendance log spreadsheets (.xlsx, .csv)" />

        {/* Upload Dropzone Simulation */}
        <div
          className="mobile-card"
          style={{
            padding: 30,
            textAlign: 'center',
            border: '2px dashed var(--primary)',
            background: 'var(--primary-light)',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#fff',
              color: 'var(--primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Upload size={28} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
            Select Spreadsheet File
          </h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
            Supports standard biometric log templates (.xlsx, .xls, .csv)
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 260, margin: '0 auto' }}>
            <SecondaryButton onClick={() => handleSimulateFileSelect('Attendance_Log_Sept2026.xlsx')}>
              📁 Choose "Attendance_Log_Sept2026.xlsx"
            </SecondaryButton>
            <SecondaryButton onClick={() => handleSimulateFileSelect('Biometric_Device_Dump.csv')}>
              📄 Choose "Biometric_Device_Dump.csv"
            </SecondaryButton>
          </div>
        </div>

        {/* Selected File State */}
        {selectedFileName && (
          <div className="mobile-card" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <FileCheck size={28} color="var(--primary)" />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>Selected File</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{selectedFileName}</span>
                <span style={{ fontSize: 11, color: 'var(--success)', display: 'block' }}>Ready to process</span>
              </div>
            </div>
          </div>
        )}

        {/* Status Feedbacks */}
        {statusState === 'importing' && (
          <div style={{ padding: 20, textAlign: 'center', color: 'var(--primary)' }}>
            <div
              style={{
                width: 32,
                height: 32,
                border: '3px solid var(--primary-light)',
                borderTopColor: 'var(--primary)',
                borderRadius: '50%',
                margin: '0 auto 12px auto',
                animation: 'spin 1s linear infinite',
              }}
            />
            <p style={{ fontSize: 14, fontWeight: 700 }}>Processing spreadsheet records...</p>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {statusState === 'success' && (
          <div
            style={{
              padding: 20,
              background: 'var(--success-light)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              marginBottom: 20,
              border: '1px solid #a7f3d0',
            }}
          >
            <CheckCircle2 size={36} color="var(--success)" style={{ marginBottom: 8 }} />
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#065f46', marginBottom: 4 }}>
              Import Complete!
            </h3>
            <p style={{ fontSize: 13, color: '#047857', marginBottom: 16 }}>
              Successfully imported attendance logs into local records.
            </p>
            <PrimaryButton onClick={() => navigate(basePath)}>Return to Attendance</PrimaryButton>
          </div>
        )}

        {statusState === 'error' && errorMessage && (
          <div
            style={{
              padding: 16,
              background: 'var(--danger-light)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--danger)',
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </div>
        )}

        {statusState !== 'success' && (
          <div style={{ marginTop: 10 }}>
            <PrimaryButton
              onClick={handleStartImport}
              disabled={!selectedFileName || statusState === 'importing'}
            >
              Start File Import
            </PrimaryButton>
          </div>
        )}
      </div>
    </>
  );
};
