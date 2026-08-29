/* Mock data barrel — import from here for convenience */

export * from './types';
export * from './books';
export * from './members';
export * from './borrows';
export * from './reservations';
export * from './reviews';
export * from './achievements';
export * from './notifications';
export * from './analytics';
export * from './reports';
export * from './stats';

/* Utility helpers shared across mock data */

export function fmtDate(s: string): string {
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function fmtDateShort(s: string): string {
  return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function timeAgo(s: string): string {
  const sec = Math.floor((Date.now() - new Date(s).getTime()) / 1000);
  if (sec < 60) return 'just now';
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  return `${Math.floor(sec / 86400)}d ago`;
}

export function daysUntil(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

export function daysOverdue(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
}

export function fineAmount(daysLate: number, ratePerDay = 0.25): number {
  return Math.max(0, daysLate) * ratePerDay;
}
