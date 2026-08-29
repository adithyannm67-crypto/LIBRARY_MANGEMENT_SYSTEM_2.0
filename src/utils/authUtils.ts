/* ── Auth utility placeholders ── */
/* All functions are stubs. Replace with real implementations when backend is ready. */

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/** TODO: Replace with real JWT decode when auth backend is wired */
export function decodeToken(_token: string): TokenPayload | null {
  // TODO: implement JWT decoding
  return null;
}

/** TODO: Replace with real JWT verification */
export function isTokenExpired(_token: string): boolean {
  // TODO: check token expiry
  return true;
}

/** TODO: Store access token in memory (not localStorage for XSS safety) */
export function getAccessToken(): string | null {
  // TODO: return from in-memory store
  return null;
}

/** TODO: Store refresh token in httpOnly cookie via API */
export function setAccessToken(_token: string): void {
  // TODO: implement
}

export function clearTokens(): void {
  // TODO: clear in-memory token and trigger cookie clear via API
}

/** Password strength: 0–4 */
export function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Very weak', color: 'var(--destructive)' },
    { label: 'Weak',      color: 'var(--destructive)' },
    { label: 'Fair',      color: 'var(--warning)' },
    { label: 'Good',      color: '#3B82F6' },
    { label: 'Strong',    color: 'var(--success)' },
  ];

  return { score, ...levels[Math.min(score, 4)] };
}

/** Generate a random 6-digit OTP string (for display only in mock) */
export function generateMockOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/** Mask an email for display: alice@library.dev → al***@library.dev */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}

/** TODO: Return the redirect path after login based on user role */
export function getPostLoginRedirect(role: string): string {
  // TODO: integrate with router
  if (role === 'admin') return '/admin/dashboard';
  return '/dashboard';
}
