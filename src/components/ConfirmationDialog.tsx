import React from 'react';
import { AlertTriangle, HelpCircle } from 'lucide-react';
import { PrimaryButton, DangerButton, SecondaryButton } from './Buttons';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <div className={`dialog-icon-wrap ${isDanger ? 'danger' : 'info'}`}>
          {isDanger ? <AlertTriangle size={24} /> : <HelpCircle size={24} />}
        </div>
        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-body">{message}</p>
        <div className="dialog-actions">
          <SecondaryButton onClick={onClose}>{cancelText}</SecondaryButton>
          {isDanger ? (
            <DangerButton onClick={onConfirm}>{confirmText}</DangerButton>
          ) : (
            <PrimaryButton onClick={onConfirm}>{confirmText}</PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};
