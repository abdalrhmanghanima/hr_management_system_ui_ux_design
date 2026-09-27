export type Gender = 'Male' | 'Female';

export interface Employee {
  id: string;
  // Personal Info
  fullName: string;
  address: string;
  phoneNumber: string; // numeric >= 11
  birthDate: string;    // Age >= 20
  gender: Gender;
  nationalId: string;   // numeric >= 14
  nationality: string;
  // Work Info
  contractDate: string; // >= 2008
  salary: number;       // numeric
  attendanceTime: string; // e.g. "09:00"
  departureTime: string;  // e.g. "17:00"
  department?: string;
  avatarUrl?: string;
}

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  password?: string;
  userGroupId: string;
  userGroupName?: string;
  accessStatus: 'Active' | 'Inactive';
  isHR?: boolean;
}

export type PermissionModule = 
  | 'employees'
  | 'attendance'
  | 'payroll'
  | 'users'
  | 'userGroups'
  | 'holidays'
  | 'settings';

export interface ModulePermissions {
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
  print?: boolean;
}

export type GroupPermissions = Record<PermissionModule, ModulePermissions>;

export interface UserGroup {
  id: string;
  name: string;
  permissions: GroupPermissions;
}

export interface OfficialHoliday {
  id: string;
  name: string;
  date: string;
}

export interface GeneralSettings {
  overtimeRate: number;      // e.g., 1.5 or amount/rate
  deductionRate: number;     // e.g., 1.0 or amount/rate
  weeklyHolidays: string[];  // e.g. ['Friday'] or ['Friday', 'Saturday']
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Leave';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string; // YYYY-MM-DD
  checkIn: string; // HH:mm
  checkOut: string; // HH:mm
  status: AttendanceStatus;
  overtimeHours: number;
  deductionHours: number;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  month: string; // e.g., "September" or "2026-09"
  year: number;
  basicSalary: number;
  attendanceDays: number;
  absenceDays: number;
  overtimeHours: number;
  deductionHours: number;
  totalOvertime: number;
  totalDeduction: number;
  netSalary: number;
}

export interface AttendanceFilterOptions {
  employeeId?: string;
  department?: string;
  date?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PayrollFilterOptions {
  employeeId?: string;
  month?: string;
  year?: number;
}
