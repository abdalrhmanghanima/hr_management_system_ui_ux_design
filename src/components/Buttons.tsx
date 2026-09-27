import React from 'react';
import { Plus } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
  <button className="btn-primary" {...props}>
    {icon}
    <span>{children}</span>
  </button>
);

export const SecondaryButton: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
  <button className="btn-secondary" {...props}>
    {icon}
    <span>{children}</span>
  </button>
);

export const DangerButton: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
  <button className="btn-danger" {...props}>
    {icon}
    <span>{children}</span>
  </button>
);

export const FAB: React.FC<{ onClick: () => void; icon?: React.ReactNode; label?: string }> = ({
  onClick,
  icon = <Plus size={24} />,
  label,
}) => (
  <button className="mobile-fab" onClick={onClick} aria-label={label || 'Add'}>
    {icon}
  </button>
);
