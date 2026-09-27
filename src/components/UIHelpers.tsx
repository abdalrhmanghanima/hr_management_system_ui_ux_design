import React from 'react';

export const Avatar: React.FC<{ name: string; src?: string; size?: number }> = ({
  name,
  src,
  size = 40,
}) => {
  const getInitials = (n: string) => {
    const parts = n.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0] ? parts[0][0].toUpperCase() : 'U';
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: size * 0.4,
        border: '2px solid #fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ title, subtitle, actionLabel, onAction }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.2px' }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</p>}
    </div>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}> = ({ icon, title, description, actionText, onAction }) => (
  <div
    style={{
      padding: '40px 20px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px border var(--border-color)',
      margin: '16px 0',
    }}
  >
    {icon && <div style={{ color: 'var(--text-subtle)', marginBottom: 12 }}>{icon}</div>}
    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>{title}</h3>
    <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 260, lineHeight: 1.4, marginBottom: 16 }}>
      {description}
    </p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        style={{
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          border: 'none',
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {actionText}
      </button>
    )}
  </div>
);

export const LoadingState: React.FC = () => (
  <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
    <div
      style={{
        width: 32,
        height: 32,
        border: '3px solid var(--border-color)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        margin: '0 auto 12px auto',
        animation: 'spin 1s linear infinite',
      }}
    />
    <p style={{ fontSize: 13, fontWeight: 500 }}>Loading data...</p>
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
  </div>
);
