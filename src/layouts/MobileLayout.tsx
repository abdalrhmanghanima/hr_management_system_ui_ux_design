import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { BottomNavigation } from '../components/BottomNavigation';

export const MobileLayout: React.FC = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <MobileFrame>
      <Outlet />
      {!isLoginPage && <BottomNavigation />}
    </MobileFrame>
  );
};
