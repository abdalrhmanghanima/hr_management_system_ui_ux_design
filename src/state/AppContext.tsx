import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  User, 
  Employee, 
  UserGroup, 
  OfficialHoliday, 
  GeneralSettings, 
  AttendanceRecord, 
  PayrollRecord,
  GroupPermissions,
  PermissionModule
} from '../models/types';
import { 
  mockEmployees, 
  mockUsers, 
  mockUserGroups, 
  mockOfficialHolidays, 
  mockGeneralSettings, 
  mockAttendanceRecords, 
  mockPayrollRecords,
  FULL_PERMISSIONS 
} from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  currentRole: 'hr' | 'user' | null;
  activePermissions: GroupPermissions;
  
  // Login / Logout
  login: (usernameOrEmail: string, password: string) => { success: boolean; error?: string };
  logout: () => void;

  // Employees State & Methods
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => Employee;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;

  // Users State & Methods
  users: User[];
  addUser: (user: Omit<User, 'id'>) => User;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;

  // User Groups State & Methods
  userGroups: UserGroup[];
  addUserGroup: (group: Omit<UserGroup, 'id'>) => UserGroup;
  updateUserGroup: (id: string, group: Partial<UserGroup>) => void;
  deleteUserGroup: (id: string) => void;
  getUserGroupById: (id: string) => UserGroup | undefined;

  // Holidays State & Methods
  holidays: OfficialHoliday[];
  addHoliday: (holiday: Omit<OfficialHoliday, 'id'>) => OfficialHoliday;
  updateHoliday: (id: string, holiday: Partial<OfficialHoliday>) => void;
  deleteHoliday: (id: string) => void;

  // General Settings State & Methods
  generalSettings: GeneralSettings;
  updateGeneralSettings: (settings: Partial<GeneralSettings>) => void;

  // Attendance State & Methods
  attendanceRecords: AttendanceRecord[];
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id'>) => AttendanceRecord;
  updateAttendanceRecord: (id: string, record: Partial<AttendanceRecord>) => void;
  deleteAttendanceRecord: (id: string) => void;
  importAttendanceRecords: (importedRecords: Omit<AttendanceRecord, 'id'>[]) => void;

  // Payroll State & Methods
  payrollRecords: PayrollRecord[];
  getPayrollById: (id: string) => PayrollRecord | undefined;
  recalculatePayroll: () => void;

  // Helpers
  hasPermission: (module: PermissionModule, action: 'view' | 'add' | 'edit' | 'delete' | 'print') => boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default logged in as HR Admin for easy previewing
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [currentRole, setCurrentRole] = useState<'hr' | 'user' | null>('hr');

  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [userGroups, setUserGroups] = useState<UserGroup[]>(mockUserGroups);
  const [holidays, setHolidays] = useState<OfficialHoliday[]>(mockOfficialHolidays);
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>(mockGeneralSettings);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(mockPayrollRecords);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Dynamic permissions resolver
  const activePermissions = useMemo<GroupPermissions>(() => {
    if (!currentUser) {
      return {
        employees: { view: false, add: false, edit: false, delete: false },
        attendance: { view: false, add: false, edit: false, delete: false },
        payroll: { view: false, add: false, edit: false, delete: false, print: false },
        users: { view: false, add: false, edit: false, delete: false },
        userGroups: { view: false, add: false, edit: false, delete: false },
        holidays: { view: false, add: false, edit: false, delete: false },
        settings: { view: false, add: false, edit: false, delete: false },
      };
    }
    if (currentUser.isHR) {
      return FULL_PERMISSIONS;
    }
    const group = userGroups.find(g => g.id === currentUser.userGroupId);
    if (group) {
      return group.permissions;
    }
    return {
      employees: { view: false, add: false, edit: false, delete: false },
      attendance: { view: false, add: false, edit: false, delete: false },
      payroll: { view: false, add: false, edit: false, delete: false, print: false },
      users: { view: false, add: false, edit: false, delete: false },
      userGroups: { view: false, add: false, edit: false, delete: false },
      holidays: { view: false, add: false, edit: false, delete: false },
      settings: { view: false, add: false, edit: false, delete: false },
    };
  }, [currentUser, userGroups]);

  const hasPermission = (module: PermissionModule, action: 'view' | 'add' | 'edit' | 'delete' | 'print') => {
    if (!currentUser) return false;
    if (currentUser.isHR) return true;
    const modulePerms = activePermissions[module];
    if (!modulePerms) return false;
    return !!modulePerms[action];
  };

  const login = (usernameOrEmail: string, password: string) => {
    const trimmedInput = usernameOrEmail.trim().toLowerCase();
    const user = users.find(
      u => (u.username.toLowerCase() === trimmedInput || u.email.toLowerCase() === trimmedInput) && u.password === password
    );

    if (user) {
      if (user.accessStatus === 'Inactive') {
        return { success: false, error: 'User account is inactive. Please contact HR.' };
      }
      setCurrentUser(user);
      const role = user.isHR ? 'hr' : 'user';
      setCurrentRole(role);
      showToast(`Welcome back, ${user.fullName}`);
      return { success: true };
    }

    return { success: false, error: 'Invalid username/email or password.' };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
  };

  // Employees CRUD
  const addEmployee = (data: Omit<Employee, 'id'>) => {
    const newEmp: Employee = {
      ...data,
      id: `emp-${Date.now()}`,
    };
    setEmployees(prev => [newEmp, ...prev]);
    showToast('Employee added successfully');
    return newEmp;
  };

  const updateEmployee = (id: string, data: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
    showToast('Employee details updated');
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    showToast('Employee deleted');
  };

  const getEmployeeById = (id: string) => employees.find(e => e.id === id);

  // Users CRUD
  const addUser = (data: Omit<User, 'id'>) => {
    const group = userGroups.find(g => g.id === data.userGroupId);
    const newUser: User = {
      ...data,
      id: `usr-${Date.now()}`,
      userGroupName: group ? group.name : 'Custom',
    };
    setUsers(prev => [newUser, ...prev]);
    showToast('User created successfully');
    return newUser;
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const group = data.userGroupId ? userGroups.find(g => g.id === data.userGroupId) : undefined;
        return {
          ...u,
          ...data,
          userGroupName: group ? group.name : u.userGroupName,
        };
      }
      return u;
    }));
    showToast('User updated');
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast('User deleted');
  };

  const getUserById = (id: string) => users.find(u => u.id === id);

  // User Groups CRUD
  const addUserGroup = (data: Omit<UserGroup, 'id'>) => {
    const newGroup: UserGroup = {
      ...data,
      id: `grp-${Date.now()}`,
    };
    setUserGroups(prev => [...prev, newGroup]);
    showToast('User group created');
    return newGroup;
  };

  const updateUserGroup = (id: string, data: Partial<UserGroup>) => {
    setUserGroups(prev => prev.map(g => g.id === id ? { ...g, ...data } : g));
    showToast('User group updated');
  };

  const deleteUserGroup = (id: string) => {
    setUserGroups(prev => prev.filter(g => g.id !== id));
    showToast('User group deleted');
  };

  const getUserGroupById = (id: string) => userGroups.find(g => g.id === id);

  // Holidays CRUD
  const addHoliday = (data: Omit<OfficialHoliday, 'id'>) => {
    const newHoliday: OfficialHoliday = {
      ...data,
      id: `hol-${Date.now()}`,
    };
    setHolidays(prev => [...prev, newHoliday]);
    showToast('Official holiday added');
    return newHoliday;
  };

  const updateHoliday = (id: string, data: Partial<OfficialHoliday>) => {
    setHolidays(prev => prev.map(h => h.id === id ? { ...h, ...data } : h));
    showToast('Holiday updated');
  };

  const deleteHoliday = (id: string) => {
    setHolidays(prev => prev.filter(h => h.id !== id));
    showToast('Holiday removed');
  };

  // General Settings
  const updateGeneralSettings = (data: Partial<GeneralSettings>) => {
    setGeneralSettings(prev => ({ ...prev, ...data }));
    showToast('General settings saved');
  };

  // Attendance CRUD
  const addAttendanceRecord = (data: Omit<AttendanceRecord, 'id'>) => {
    const newAtt: AttendanceRecord = {
      ...data,
      id: `att-${Date.now()}`,
    };
    setAttendanceRecords(prev => [newAtt, ...prev]);
    showToast('Attendance recorded');
    return newAtt;
  };

  const updateAttendanceRecord = (id: string, data: Partial<AttendanceRecord>) => {
    setAttendanceRecords(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    showToast('Attendance updated');
  };

  const deleteAttendanceRecord = (id: string) => {
    setAttendanceRecords(prev => prev.filter(a => a.id !== id));
    showToast('Attendance record deleted');
  };

  const importAttendanceRecords = (imported: Omit<AttendanceRecord, 'id'>[]) => {
    const newRecords = imported.map((rec, i) => ({
      ...rec,
      id: `att-imp-${Date.now()}-${i}`,
    }));
    setAttendanceRecords(prev => [...newRecords, ...prev]);
    showToast(`Successfully imported ${newRecords.length} attendance records`);
  };

  // Payroll
  const getPayrollById = (id: string) => payrollRecords.find(p => p.id === id);

  const recalculatePayroll = () => {
    showToast('Payroll recalculated successfully');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        activePermissions,
        login,
        logout,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
        users,
        addUser,
        updateUser,
        deleteUser,
        getUserById,
        userGroups,
        addUserGroup,
        updateUserGroup,
        deleteUserGroup,
        getUserGroupById,
        holidays,
        addHoliday,
        updateHoliday,
        deleteHoliday,
        generalSettings,
        updateGeneralSettings,
        attendanceRecords,
        addAttendanceRecord,
        updateAttendanceRecord,
        deleteAttendanceRecord,
        importAttendanceRecords,
        payrollRecords,
        getPayrollById,
        recalculatePayroll,
        hasPermission,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
