import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CalendarCheck, 
  DollarSign, 
  PlusUser, 
  UserPlus, 
  CalendarPlus, 
  ChevronRight, 
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../state/AppContext';
import { Avatar, SectionHeader } from '../components/UIHelpers';
import { AttendanceCard } from '../components/AttendanceCard';
import { HolidayCard } from '../components/HolidayCard';

export const HRHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, employees, attendanceRecords, payrollRecords, holidays } = useApp();

  const totalEmployees = employees.length;
  const todayPresent = attendanceRecords.filter(a => a.status === 'Present').length;
  const todayAbsent = attendanceRecords.filter(a => a.status === 'Absent').length;
  const totalPayrollNet = payrollRecords.reduce((sum, p) => sum + p.netSalary, 0);

  const recentAttendance = attendanceRecords.slice(0, 3);
  const upcomingHolidays = holidays.slice(0, 2);

  return (
    <div className="mobile-screen-body">
      {/* Header Profile Greeting */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          paddingTop: 8,
        }}
      >
        <div>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
            Welcome back 👋
          </span>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
            {currentUser?.fullName || 'HR Manager'}
          </h1>
        </div>
        <Avatar name={currentUser?.fullName || 'HR Manager'} size={48} />
      </div>

      {/* Summary KPI Cards Horizontal Scroll or Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {/* Total Employees */}
        <div
          className="mobile-card"
          onClick={() => navigate('/hr/employees')}
          style={{ cursor: 'pointer', margin: 0, padding: 14 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={18} />
            </div>
            <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 700 }}>+4 this mo</span>
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>
            {totalEmployees}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total Employees</span>
        </div>

        {/* Today's Attendance */}
        <div
          className="mobile-card"
          onClick={() => navigate('/hr/attendance')}
          style={{ cursor: 'pointer', margin: 0, padding: 14 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-md)',
                background: 'var(--success-light)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CalendarCheck size={18} />
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
              {todayAbsent} absent
            </span>
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>
            {todayPresent} / {totalEmployees}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Present Today</span>
        </div>
      </div>

      {/* Payroll Summary Full Card */}
      <div
        className="mobile-card"
        onClick={() => navigate('/hr/payroll')}
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#fff',
          cursor: 'pointer',
          padding: 16,
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: 12, color: 'var(--neutral400)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Current Month Payroll
            </span>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginTop: 2 }}>
              {totalPayrollNet.toLocaleString()} <span style={{ fontSize: 14, fontWeight: 500 }}>EGP</span>
            </h2>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DollarSign size={20} color="#38bdf8" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--neutral300)' }}>
          <span>September 2026</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#38bdf8', fontWeight: 600 }}>
            View Details <ChevronRight size={14} />
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <SectionHeader title="Quick Actions" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => navigate('/hr/employees/add')}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserPlus size={18} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-main)' }}>Add Employee</span>
        </button>

        <button
          onClick={() => navigate('/hr/attendance/add')}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={18} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-main)' }}>Attendance</span>
        </button>

        <button
          onClick={() => navigate('/hr/payroll')}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={18} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-main)' }}>Payroll</span>
        </button>

        <button
          onClick={() => navigate('/hr/holidays/add')}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarPlus size={18} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-main)' }}>Add Holiday</span>
        </button>
      </div>

      {/* Recent Attendance Preview */}
      <SectionHeader
        title="Recent Attendance"
        actionLabel="View All"
        onAction={() => navigate('/hr/attendance')}
      />
      {recentAttendance.map(rec => (
        <AttendanceCard
          key={rec.id}
          record={rec}
          onEdit={() => navigate(`/hr/attendance/${rec.id}/edit`)}
          canDelete={false}
        />
      ))}

      {/* Upcoming Holidays Preview */}
      <div style={{ marginTop: 16 }}>
        <SectionHeader
          title="Upcoming Holidays"
          actionLabel="Manage"
          onAction={() => navigate('/hr/holidays')}
        />
        {upcomingHolidays.map(hol => (
          <HolidayCard key={hol.id} holiday={hol} />
        ))}
      </div>
    </div>
  );
};
