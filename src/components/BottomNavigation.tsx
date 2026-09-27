import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, CalendarCheck, DollarSign, Menu } from 'lucide-react';
import { useApp } from '../state/AppContext';

export const BottomNavigation: React.FC = () => {
  const { currentRole, hasPermission } = useApp();

  const isHR = currentRole === 'hr';

  if (isHR) {
    return (
      <div className="mobile-bottom-nav">
        <NavLink to="/hr/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-container">
            <Home size={18} />
          </div>
          <span>Home</span>
        </NavLink>

        <NavLink to="/hr/employees" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-container">
            <Users size={18} />
          </div>
          <span>Employees</span>
        </NavLink>

        <NavLink to="/hr/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-container">
            <CalendarCheck size={18} />
          </div>
          <span>Attendance</span>
        </NavLink>

        <NavLink to="/hr/payroll" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-container">
            <DollarSign size={18} />
          </div>
          <span>Payroll</span>
        </NavLink>

        <NavLink to="/hr/more" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-container">
            <Menu size={18} />
          </div>
          <span>More</span>
        </NavLink>
      </div>
    );
  }

  // Normal User dynamic navigation tabs based on permissions
  const canViewEmployees = hasPermission('employees', 'view');
  const canViewAttendance = hasPermission('attendance', 'view');
  const canViewPayroll = hasPermission('payroll', 'view');

  return (
    <div className="mobile-bottom-nav">
      <NavLink to="/user/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon-container">
          <Home size={18} />
        </div>
        <span>Home</span>
      </NavLink>

      {canViewEmployees && (
        <NavLink to="/user/employees" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-container">
            <Users size={18} />
          </div>
          <span>Employees</span>
        </NavLink>
      )}

      {canViewAttendance && (
        <NavLink to="/user/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-container">
            <CalendarCheck size={18} />
          </div>
          <span>Attendance</span>
        </NavLink>
      )}

      {canViewPayroll && (
        <NavLink to="/user/payroll" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-container">
            <DollarSign size={18} />
          </div>
          <span>Payroll</span>
        </NavLink>
      )}

      <NavLink to="/user/more" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon-container">
          <Menu size={18} />
        </div>
        <span>More</span>
      </NavLink>
    </div>
  );
};
