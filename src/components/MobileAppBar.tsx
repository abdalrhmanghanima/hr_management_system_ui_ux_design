import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobileAppBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  action?: {
    label?: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}

export const MobileAppBar: React.FC<MobileAppBarProps> = ({
  title,
  showBack = false,
  onBack,
  action,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="mobile-app-bar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {showBack && (
          <button className="app-bar-back-btn" onClick={handleBack} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="app-bar-title">{title}</h1>
      </div>

      {action && (
        <button className="app-bar-action" onClick={action.onClick}>
          {action.icon}
          {action.label && <span>{action.label}</span>}
        </button>
      )}
    </div>
  );
};
