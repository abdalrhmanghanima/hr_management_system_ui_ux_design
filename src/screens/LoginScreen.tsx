import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Lock, User as UserIcon } from 'lucide-react';
import { useApp } from '../state/AppContext';
import { TextInput, PasswordInput } from '../components/FormFields';
import { PrimaryButton } from '../components/Buttons';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!username || username.trim() === '') {
      setUsernameError('Please enter a valid username');
      hasError = true;
    } else {
      setUsernameError(null);
    }

    if (!password || password.trim() === '') {
      setPasswordError('Please enter a valid password');
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (hasError) return;

    setGeneralError(null);
    const result = login(username, password);

    if (result.success) {
      // Determine direction: HR vs User Home
      // For demo fallback if username is 'hradmin' or user has HR role
      if (username.toLowerCase().includes('hr') || username.toLowerCase() === 'admin' || username.toLowerCase() === 'hradmin') {
        navigate('/hr/home');
      } else {
        navigate('/user/home');
      }
    } else {
      setGeneralError(result.error || 'Invalid credentials message');
    }
  };

  const handleQuickDemoHr = () => {
    setUsername('hradmin');
    setPassword('password123');
    setUsernameError(null);
    setPasswordError(null);
  };

  const handleQuickDemoUser = () => {
    setUsername('attendance_user');
    setPassword('password123');
    setUsernameError(null);
    setPasswordError(null);
  };

  return (
    <div className="mobile-screen-body no-nav" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100%' }}>
      {/* App Logo & Header */}
      <div style={{ textAlign: 'center', marginBottom: 32, marginTop: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: 16,
          }}
        >
          <Building2 size={36} />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
          HR Mobile
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
          Human Resources Management System
        </p>
      </div>

      {/* Login Card */}
      <div className="mobile-card" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
          Welcome back
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
          Sign in to access your HR portal
        </p>

        {generalError && (
          <div
            style={{
              padding: '12px 14px',
              background: 'var(--danger-light)',
              color: 'var(--danger)',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 16,
              border: '1px solid #fecaca',
            }}
          >
            {generalError}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <TextInput
            label="Username or Email"
            placeholder="Enter username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
            leftIcon={<UserIcon size={18} />}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            required
          />

          <div style={{ marginTop: 24 }}>
            <PrimaryButton type="submit">Sign In</PrimaryButton>
          </div>
        </form>
      </div>

      {/* Quick Access Helper for visual demo */}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>Quick Demo Login Options:</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button
            onClick={handleQuickDemoHr}
            style={{
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              border: 'none',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Fill HR Admin
          </button>
          <button
            onClick={handleQuickDemoUser}
            style={{
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              border: 'none',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Fill User Role
          </button>
        </div>
      </div>
    </div>
  );
};
