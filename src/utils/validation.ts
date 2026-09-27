import { GroupPermissions } from '../models/types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validatePhone(phone: string): string | null {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }
  const cleanPhone = phone.replace(/[\s-]/g, '');
  if (!/^\d+$/.test(cleanPhone)) {
    return 'Phone number must contain digits only';
  }
  if (cleanPhone.length < 11) {
    return 'Phone number must be at least 11 digits';
  }
  return null;
}

export function validateBirthDate(birthDate: string): string | null {
  if (!birthDate || birthDate.trim() === '') {
    return 'Birth date is required';
  }
  const date = new Date(birthDate);
  if (isNaN(date.getTime())) {
    return 'Please enter a valid date';
  }
  
  // Calculate age
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  if (age < 20) {
    return 'Employee age must be at least 20 years old';
  }
  return null;
}

export function validateNationalId(nationalId: string): string | null {
  if (!nationalId || nationalId.trim() === '') {
    return 'National ID is required';
  }
  const cleanId = nationalId.replace(/[\s-]/g, '');
  if (!/^\d+$/.test(cleanId)) {
    return 'National ID must contain digits only';
  }
  if (cleanId.length < 14) {
    return 'National ID must be at least 14 digits';
  }
  return null;
}

export function validateContractDate(contractDate: string): string | null {
  if (!contractDate || contractDate.trim() === '') {
    return 'Contract date is required';
  }
  const date = new Date(contractDate);
  if (isNaN(date.getTime())) {
    return 'Please enter a valid contract date';
  }
  if (date.getFullYear() < 2008) {
    return 'Contract date cannot be before 2008';
  }
  return null;
}

export function validateSalary(salary: number | string): string | null {
  if (salary === '' || salary === null || salary === undefined) {
    return 'Salary is required';
  }
  const num = Number(salary);
  if (isNaN(num)) {
    return 'Salary must be a numeric value';
  }
  if (num <= 0) {
    return 'Salary must be greater than zero';
  }
  return null;
}

export function validateUserGroupName(name: string): string | null {
  if (!name || name.trim() === '') {
    return 'Please enter group name';
  }
  return null;
}

export function validateGroupPermissions(permissions: GroupPermissions): string | null {
  let hasAnyPermission = false;
  Object.values(permissions).forEach(modulePerms => {
    if (modulePerms.view || modulePerms.add || modulePerms.edit || modulePerms.delete || modulePerms.print) {
      hasAnyPermission = true;
    }
  });

  if (!hasAnyPermission) {
    return 'Please select group permissions before adding';
  }
  return null;
}

export function validateDateRange(fromDate: string, toDate: string): string | null {
  if (!fromDate || !toDate) return null;
  const from = new Date(fromDate);
  const to = new Date(toDate);
  if (from > to) {
    return 'From date cannot be after To date';
  }
  return null;
}
