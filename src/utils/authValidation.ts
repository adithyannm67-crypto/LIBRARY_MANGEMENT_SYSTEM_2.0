export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface LoginFields {
  email: string;
  password: string;
}

export interface SignupFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFields {
  email: string;
}

export interface ResetPasswordFields {
  password: string;
  confirmPassword: string;
}

/* ── Field-level validators ── */
export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  // TODO: add strength rules (uppercase, number, symbol) when business rules are defined
  return null;
}

export function validateName(name: string): string | null {
  if (!name.trim()) return 'Full name is required.';
  if (name.trim().length < 2) return 'Name must be at least 2 characters.';
  return null;
}

export function validateConfirmPassword(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return null;
}

/* ── Form-level validators ── */
export function validateLoginForm(fields: LoginFields): ValidationResult {
  const errors: Record<string, string> = {};

  const emailErr = validateEmail(fields.email);
  if (emailErr) errors.email = emailErr;

  if (!fields.password) errors.password = 'Password is required.';

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateSignupForm(fields: SignupFields): ValidationResult {
  const errors: Record<string, string> = {};

  const nameErr = validateName(fields.name);
  if (nameErr) errors.name = nameErr;

  const emailErr = validateEmail(fields.email);
  if (emailErr) errors.email = emailErr;

  const passwordErr = validatePassword(fields.password);
  if (passwordErr) errors.password = passwordErr;

  const confirmErr = validateConfirmPassword(fields.password, fields.confirmPassword);
  if (confirmErr) errors.confirmPassword = confirmErr;

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateForgotPasswordForm(fields: ForgotPasswordFields): ValidationResult {
  const errors: Record<string, string> = {};

  const emailErr = validateEmail(fields.email);
  if (emailErr) errors.email = emailErr;

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateResetPasswordForm(fields: ResetPasswordFields): ValidationResult {
  const errors: Record<string, string> = {};

  const passwordErr = validatePassword(fields.password);
  if (passwordErr) errors.password = passwordErr;

  const confirmErr = validateConfirmPassword(fields.password, fields.confirmPassword);
  if (confirmErr) errors.confirmPassword = confirmErr;

  return { valid: Object.keys(errors).length === 0, errors };
}
