import React, { useState } from 'react';
import { Eye, EyeOff, Search, Filter } from 'lucide-react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  required?: boolean;
  leftIcon?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  required,
  leftIcon,
  className = '',
  ...props
}) => (
  <div className="form-group">
    {label && (
      <label className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
    )}
    <div className="input-wrapper">
      {leftIcon && <span className="input-icon-left">{leftIcon}</span>}
      <input
        className={`form-input ${leftIcon ? 'with-icon-left' : ''} ${error ? 'has-error' : ''} ${className}`}
        {...props}
      />
    </div>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export const PasswordInput: React.FC<TextInputProps> = ({
  label = 'Password',
  error,
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`form-input with-icon-right ${error ? 'has-error' : ''}`}
          {...props}
        />
        <button
          type="button"
          className="input-icon-right"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export const SearchBar: React.FC<{
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
  isFilterActive?: boolean;
}> = ({ value, onChange, placeholder = 'Search...', onFilterClick, isFilterActive = false }) => (
  <div className="search-container">
    <div className="search-input-wrapper">
      <Search size={18} className="input-icon-left" />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
    {onFilterClick && (
      <button
        type="button"
        className={`filter-btn ${isFilterActive ? 'active' : ''}`}
        onClick={onFilterClick}
        aria-label="Filter"
      >
        <Filter size={18} />
      </button>
    )}
  </div>
);

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string | null;
  required?: boolean;
}

export const DropdownField: React.FC<DropdownProps> = ({
  label,
  options,
  error,
  required,
  className = '',
  ...props
}) => (
  <div className="form-group">
    {label && (
      <label className="form-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
    )}
    <select
      className={`form-input ${error ? 'has-error' : ''} ${className}`}
      {...props}
    >
      <option value="">Select option...</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export const DateField: React.FC<TextInputProps> = ({ label, error, required, ...props }) => (
  <TextInput
    type="date"
    label={label}
    error={error}
    required={required}
    {...props}
  />
);

export const TimeField: React.FC<TextInputProps> = ({ label, error, required, ...props }) => (
  <TextInput
    type="time"
    label={label}
    error={error}
    required={required}
    {...props}
  />
);
