import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { useApp } from '../state/AppContext';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { toastMessage } = useApp();
  const [currentTime, setCurrentTime] = React.useState('09:41');

  React.useEffect(() => {
    const now = new Date();
    const hrs = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hrs}:${mins}`);
  }, []);

  return (
    <div className="mobile-app-wrapper">
      <div className="mobile-device-frame">
        {/* Mobile Status Bar */}
        <div className="mobile-notch" />
        <div className="mobile-status-bar">
          <span>{currentTime}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={16} />
          </div>
        </div>

        {/* Global Toast Banner */}
        {toastMessage && (
          <div className="toast-banner">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Content Viewport */}
        {children}
      </div>
    </div>
  );
};
