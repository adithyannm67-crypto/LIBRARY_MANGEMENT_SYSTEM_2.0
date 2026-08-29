import type { ReportEntry } from './types';

/* Monthly summary — Sep 2025 through Jul 2026 */
export const MONTHLY_REPORTS: ReportEntry[] = [
  { period: 'Sep 2025', borrows: 31, returns: 24, overdue: 2, newMembers: 12, finesCollected: 0.00, reservations: 8 },
  { period: 'Oct 2025', borrows: 47, returns: 38, overdue: 3, newMembers: 6, finesCollected: 1.25, reservations: 14 },
  { period: 'Nov 2025', borrows: 52, returns: 46, overdue: 4, newMembers: 6, finesCollected: 2.50, reservations: 18 },
  { period: 'Dec 2025', borrows: 38, returns: 34, overdue: 2, newMembers: 4, finesCollected: 0.75, reservations: 11 },
  { period: 'Jan 2026', borrows: 61, returns: 54, overdue: 5, newMembers: 5, finesCollected: 4.50, reservations: 22 },
  { period: 'Feb 2026', borrows: 68, returns: 62, overdue: 4, newMembers: 5, finesCollected: 2.00, reservations: 24 },
  { period: 'Mar 2026', borrows: 74, returns: 69, overdue: 6, newMembers: 7, finesCollected: 3.75, reservations: 28 },
  { period: 'Apr 2026', borrows: 83, returns: 77, overdue: 3, newMembers: 6, finesCollected: 1.50, reservations: 31 },
  { period: 'May 2026', borrows: 71, returns: 68, overdue: 7, newMembers: 3, finesCollected: 6.25, reservations: 27 },
  { period: 'Jun 2026', borrows: 88, returns: 79, overdue: 5, newMembers: 4, finesCollected: 3.00, reservations: 33 },
  { period: 'Jul 2026', borrows: 52, returns: 41, overdue: 6, newMembers: 2, finesCollected: 1.75, reservations: 18 },
];

/* Current overdue report */
export const OVERDUE_REPORT = [
  { borrowId: 'bor-30', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookTitle: 'Designing Data-Intensive Applications', dueAt: '2026-07-08', daysOverdue: 3, fine: 0.50 },
  { borrowId: 'bor-31', memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', bookTitle: 'Clean Code', dueAt: '2026-07-05', daysOverdue: 6, fine: 1.25 },
  { borrowId: 'bor-32', memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', bookTitle: 'The Power of Habit', dueAt: '2026-07-01', daysOverdue: 10, fine: 2.25 },
  { borrowId: 'bor-33', memberId: 'm6', memberName: 'Frank Lee', memberEmail: 'frank@example.com', bookTitle: 'Atomic Habits', dueAt: '2026-05-01', daysOverdue: 71, fine: 4.50 },
  { borrowId: 'bor-34', memberId: 'm6', memberName: 'Frank Lee', memberEmail: 'frank@example.com', bookTitle: 'Zero to One', dueAt: '2026-05-10', daysOverdue: 62, fine: 4.25 },
  { borrowId: 'bor-35', memberId: 'm20', memberName: 'Tanya Brown', memberEmail: 'tanya@example.com', bookTitle: 'Deep Work', dueAt: '2026-07-03', daysOverdue: 8, fine: 0.75 },
];

/* Outstanding fines report */
export const FINES_REPORT = [
  { memberId: 'm6', memberName: 'Frank Lee', memberEmail: 'frank@example.com', totalFine: 8.75, overdueBooks: 2, status: 'suspended', lastActivity: '2026-05-20' },
  { memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', totalFine: 3.50, overdueBooks: 2, status: 'active', lastActivity: '2026-07-08' },
  { memberId: 'm20', memberName: 'Tanya Brown', memberEmail: 'tanya@example.com', totalFine: 0.75, overdueBooks: 1, status: 'active', lastActivity: '2026-07-05' },
  { memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', totalFine: 0.50, overdueBooks: 1, status: 'active', lastActivity: '2026-07-10' },
];

/* Inventory condition report */
export const INVENTORY_REPORT = [
  { condition: 'Excellent', count: 18, percentage: 36 },
  { condition: 'Good', count: 24, percentage: 48 },
  { condition: 'Fair', count: 5, percentage: 10 },
  { condition: 'Damaged', count: 2, percentage: 4 },
  { condition: 'Lost', count: 1, percentage: 2 },
];

/* Utilization report — books not borrowed in the past 6 months */
export const LOW_UTILIZATION_REPORT = [
  { bookId: 'b18', title: 'The Mythical Man-Month', author: 'Frederick P. Brooks Jr.', lastBorrowed: '2025-12-10', borrowCount: 31, availableCopies: 2 },
  { bookId: 'b6', title: 'The Art of Computer Programming', author: 'Donald E. Knuth', lastBorrowed: '2026-02-19', borrowCount: 44, availableCopies: 2 },
  { bookId: 'b16', title: 'Working Effectively with Legacy Code', author: 'Michael C. Feathers', lastBorrowed: '2026-03-01', borrowCount: 39, availableCopies: 2 },
];

/* Annual summary */
export const ANNUAL_SUMMARY_2025_2026 = {
  totalBorrows: 665,
  totalReturns: 592,
  totalMembers: 103,
  newMembersThisYear: 60,
  overdueIncidents: 47,
  totalFinesCollected: 27.25,
  totalFinesOutstanding: 13.50,
  mostPopularBook: 'Atomic Habits',
  mostActiveCategory: 'Engineering',
  averageLoanDuration: 19.4,
  onTimeReturnRate: 90.3,
  renewalRate: 26.2,
  reservationFulfillmentRate: 78.4,
};

/* Category utilization — borrows per available copy */
export const CATEGORY_UTILIZATION = [
  { category: 'Self-Help', totalCopies: 11, borrowsThisYear: 614, utilizationRate: 55.8 },
  { category: 'Fiction', totalCopies: 9, borrowsThisYear: 719, utilizationRate: 79.9 },
  { category: 'Finance', totalCopies: 7, borrowsThisYear: 556, utilizationRate: 79.4 },
  { category: 'History', totalCopies: 4, borrowsThisYear: 312, utilizationRate: 78.0 },
  { category: 'Business', totalCopies: 6, borrowsThisYear: 441, utilizationRate: 73.5 },
  { category: 'Engineering', totalCopies: 22, borrowsThisYear: 869, utilizationRate: 39.5 },
  { category: 'Psychology', totalCopies: 11, borrowsThisYear: 545, utilizationRate: 49.5 },
  { category: 'Databases', totalCopies: 2, borrowsThisYear: 138, utilizationRate: 69.0 },
  { category: 'Algorithms', totalCopies: 4, borrowsThisYear: 102, utilizationRate: 25.5 },
  { category: 'JavaScript', totalCopies: 7, borrowsThisYear: 173, utilizationRate: 24.7 },
  { category: 'Python', totalCopies: 4, borrowsThisYear: 98, utilizationRate: 24.5 },
  { category: 'TypeScript', totalCopies: 3, borrowsThisYear: 43, utilizationRate: 14.3 },
  { category: 'Science', totalCopies: 3, borrowsThisYear: 187, utilizationRate: 62.3 },
];
