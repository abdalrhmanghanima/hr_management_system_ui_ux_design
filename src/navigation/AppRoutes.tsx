import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { MobileLayout } from '../layouts/MobileLayout';
import { LoginScreen } from '../screens/LoginScreen';
import { HRHomeScreen } from '../screens/HRHomeScreen';
import { UserHomeScreen } from '../screens/UserHomeScreen';
import { MoreMenuScreen } from '../screens/MoreMenuScreen';

// Employees Screens
import { EmployeesScreen } from '../screens/Employees/EmployeesScreen';
import { EmployeeDetailsScreen } from '../screens/Employees/EmployeeDetailsScreen';
import { AddEmployeeScreen } from '../screens/Employees/AddEmployeeScreen';
import { EditEmployeeScreen } from '../screens/Employees/EditEmployeeScreen';

// Users Screens
import { UsersScreen } from '../screens/Users/UsersScreen';
import { UserDetailsScreen } from '../screens/Users/UserDetailsScreen';
import { AddUserScreen } from '../screens/Users/AddUserScreen';
import { EditUserScreen } from '../screens/Users/EditUserScreen';

// User Groups Screens
import { UserGroupsScreen } from '../screens/UserGroups/UserGroupsScreen';
import { AddUserGroupScreen } from '../screens/UserGroups/AddUserGroupScreen';
import { EditUserGroupScreen } from '../screens/UserGroups/EditUserGroupScreen';

// General Settings Screen
import { GeneralSettingsScreen } from '../screens/GeneralSettings/GeneralSettingsScreen';

// Official Holidays Screens
import { OfficialHolidaysScreen } from '../screens/OfficialHolidays/OfficialHolidaysScreen';
import { AddHolidayScreen } from '../screens/OfficialHolidays/AddHolidayScreen';
import { EditHolidayScreen } from '../screens/OfficialHolidays/EditHolidayScreen';

// Attendance Screens
import { AttendanceScreen } from '../screens/Attendance/AttendanceScreen';
import { AddAttendanceScreen } from '../screens/Attendance/AddAttendanceScreen';
import { EditAttendanceScreen } from '../screens/Attendance/EditAttendanceScreen';
import { AttendanceImportScreen } from '../screens/Attendance/AttendanceImportScreen';

// Payroll Screens
import { PayrollScreen } from '../screens/Payroll/PayrollScreen';
import { PayrollDetailsScreen } from '../screens/Payroll/PayrollDetailsScreen';
import { SalarySlipScreen } from '../screens/Payroll/SalarySlipScreen';
import { PermissionModule } from '../models/types';

// Permission Guard Component for User Routes
const PermissionGuard: React.FC<{
  module: PermissionModule;
  action?: 'view' | 'add' | 'edit' | 'delete' | 'print';
  children: React.ReactNode;
}> = ({ module, action = 'view', children }) => {
  const { hasPermission, currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(module, action)) {
    return <Navigate to="/user/home" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  const { currentUser } = useApp();

  return (
    <Routes>
      <Route path="/" element={<MobileLayout />}>
        {/* Default redirect to login or home */}
        <Route
          index
          element={
            currentUser ? (
              currentUser.isHR ? (
                <Navigate to="/hr/home" replace />
              ) : (
                <Navigate to="/user/home" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="login" element={<LoginScreen />} />

        {/* HR Routes */}
        <Route path="hr/home" element={<HRHomeScreen />} />
        <Route path="hr/more" element={<MoreMenuScreen />} />

        <Route path="hr/employees" element={<EmployeesScreen />} />
        <Route path="hr/employees/add" element={<AddEmployeeScreen />} />
        <Route path="hr/employees/:id" element={<EmployeeDetailsScreen />} />
        <Route path="hr/employees/:id/edit" element={<EditEmployeeScreen />} />

        <Route path="hr/attendance" element={<AttendanceScreen />} />
        <Route path="hr/attendance/add" element={<AddAttendanceScreen />} />
        <Route path="hr/attendance/import" element={<AttendanceImportScreen />} />
        <Route path="hr/attendance/:id/edit" element={<EditAttendanceScreen />} />

        <Route path="hr/payroll" element={<PayrollScreen />} />
        <Route path="hr/payroll/:id" element={<PayrollDetailsScreen />} />
        <Route path="hr/payroll/:id/slip" element={<SalarySlipScreen />} />

        <Route path="hr/users" element={<UsersScreen />} />
        <Route path="hr/users/add" element={<AddUserScreen />} />
        <Route path="hr/users/:id" element={<UserDetailsScreen />} />
        <Route path="hr/users/:id/edit" element={<EditUserScreen />} />

        <Route path="hr/user-groups" element={<UserGroupsScreen />} />
        <Route path="hr/user-groups/add" element={<AddUserGroupScreen />} />
        <Route path="hr/user-groups/:id/edit" element={<EditUserGroupScreen />} />

        <Route path="hr/holidays" element={<OfficialHolidaysScreen />} />
        <Route path="hr/holidays/add" element={<AddHolidayScreen />} />
        <Route path="hr/holidays/:id/edit" element={<EditHolidayScreen />} />

        <Route path="hr/settings" element={<GeneralSettingsScreen />} />

        {/* Normal User Routes (Guarded by dynamic permissions) */}
        <Route path="user/home" element={<UserHomeScreen />} />
        <Route path="user/more" element={<MoreMenuScreen />} />

        <Route
          path="user/employees"
          element={
            <PermissionGuard module="employees" action="view">
              <EmployeesScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/employees/add"
          element={
            <PermissionGuard module="employees" action="add">
              <AddEmployeeScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/employees/:id"
          element={
            <PermissionGuard module="employees" action="view">
              <EmployeeDetailsScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/employees/:id/edit"
          element={
            <PermissionGuard module="employees" action="edit">
              <EditEmployeeScreen />
            </PermissionGuard>
          }
        />

        <Route
          path="user/attendance"
          element={
            <PermissionGuard module="attendance" action="view">
              <AttendanceScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/attendance/add"
          element={
            <PermissionGuard module="attendance" action="add">
              <AddAttendanceScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/attendance/import"
          element={
            <PermissionGuard module="attendance" action="add">
              <AttendanceImportScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/attendance/:id/edit"
          element={
            <PermissionGuard module="attendance" action="edit">
              <EditAttendanceScreen />
            </PermissionGuard>
          }
        />

        <Route
          path="user/payroll"
          element={
            <PermissionGuard module="payroll" action="view">
              <PayrollScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/payroll/:id"
          element={
            <PermissionGuard module="payroll" action="view">
              <PayrollDetailsScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/payroll/:id/slip"
          element={
            <PermissionGuard module="payroll" action="print">
              <SalarySlipScreen />
            </PermissionGuard>
          }
        />

        <Route
          path="user/users"
          element={
            <PermissionGuard module="users" action="view">
              <UsersScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/users/add"
          element={
            <PermissionGuard module="users" action="add">
              <AddUserScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/users/:id"
          element={
            <PermissionGuard module="users" action="view">
              <UserDetailsScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/users/:id/edit"
          element={
            <PermissionGuard module="users" action="edit">
              <EditUserScreen />
            </PermissionGuard>
          }
        />

        <Route
          path="user/user-groups"
          element={
            <PermissionGuard module="userGroups" action="view">
              <UserGroupsScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/user-groups/add"
          element={
            <PermissionGuard module="userGroups" action="add">
              <AddUserGroupScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/user-groups/:id/edit"
          element={
            <PermissionGuard module="userGroups" action="edit">
              <EditUserGroupScreen />
            </PermissionGuard>
          }
        />

        <Route
          path="user/holidays"
          element={
            <PermissionGuard module="holidays" action="view">
              <OfficialHolidaysScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/holidays/add"
          element={
            <PermissionGuard module="holidays" action="add">
              <AddHolidayScreen />
            </PermissionGuard>
          }
        />
        <Route
          path="user/holidays/:id/edit"
          element={
            <PermissionGuard module="holidays" action="edit">
              <EditHolidayScreen />
            </PermissionGuard>
          }
        />

        <Route
          path="user/settings"
          element={
            <PermissionGuard module="settings" action="view">
              <GeneralSettingsScreen />
            </PermissionGuard>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
