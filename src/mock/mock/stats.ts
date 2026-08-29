import type { DashboardStats, UserStats } from './types';

/* Admin dashboard statistics */
export const ADMIN_STATS: DashboardStats = {
  totalBooks: 30,
  totalMembers: 103,
  activeLoans: 29,
  overdueLoans: 6,
  pendingReservations: 14,
  totalCategories: 13,
  booksAddedThisMonth: 2,
  membersJoinedThisMonth: 2,
  loansThisMonth: 52,
  returnsThisMonth: 41,
  finesOutstanding: 13.50,
  finesCollectedThisMonth: 1.75,
  availabilityRate: 58.4,
  onTimeReturnRate: 90.3,
};

/* Key performance indicators with comparison to previous period */
export const ADMIN_KPIS = {
  totalBooks: { value: 30, previousValue: 28, change: 7.1, trend: 'up' as const },
  totalMembers: { value: 103, previousValue: 101, change: 2.0, trend: 'up' as const },
  activeLoans: { value: 29, previousValue: 24, change: 20.8, trend: 'up' as const },
  overdueLoans: { value: 6, previousValue: 5, change: 20.0, trend: 'up' as const },
  pendingReservations: { value: 14, previousValue: 18, change: -22.2, trend: 'down' as const },
  finesOutstanding: { value: 13.50, previousValue: 10.25, change: 31.7, trend: 'up' as const },
  availabilityRate: { value: 58.4, previousValue: 61.2, change: -2.8, trend: 'down' as const },
  onTimeReturnRate: { value: 90.3, previousValue: 88.7, change: 1.6, trend: 'up' as const },
};

/* User dashboard statistics (member m1: Alice Chen) */
export const USER_STATS_M1: UserStats = {
  totalBorrowed: 34,
  activeBorrows: 2,
  returnedBooks: 30,
  overdueBooks: 1,
  reservations: 2,
  wishlistItems: 3,
  achievements: 10,
  totalReadingHours: 312,
  booksThisYear: 22,
  favoriteCategory: 'Engineering',
  averageRating: 4.6,
  currentStreak: 8,
  finesOwed: 0.50,
};

/* Recent activity for admin dashboard */
export const RECENT_ACTIVITY = [
  { type: 'borrow', memberId: 'm12', memberName: 'Liam Nguyen', bookTitle: 'Eloquent JavaScript', timestamp: '2026-07-07T14:30:00Z' },
  { type: 'return', memberId: 'm16', memberName: 'Paul Chen', bookTitle: 'Python Crash Course', timestamp: '2026-07-07T11:20:00Z' },
  { type: 'reservation', memberId: 'm13', memberName: 'Maya Patel', bookTitle: 'Designing Data-Intensive Applications', timestamp: '2026-07-08T09:45:00Z' },
  { type: 'borrow', memberId: 'm9', memberName: 'Isabel Torres', bookTitle: '1984', timestamp: '2026-07-06T16:00:00Z' },
  { type: 'borrow', memberId: 'm9', memberName: 'Isabel Torres', bookTitle: 'Dune', timestamp: '2026-07-06T16:02:00Z' },
  { type: 'return', memberId: 'm24', memberName: 'Xiao Li', bookTitle: 'Domain-Driven Design', timestamp: '2026-07-05T13:15:00Z' },
  { type: 'overdue', memberId: 'm3', memberName: 'Carol Diaz', bookTitle: 'Clean Code', timestamp: '2026-07-05T08:00:00Z' },
  { type: 'member-join', memberId: 'm25', memberName: 'Yuki Tanaka', bookTitle: '', timestamp: '2026-07-05T10:30:00Z' },
  { type: 'borrow', memberId: 'm8', memberName: 'Henry Wilson', bookTitle: 'A Brief History of Time', timestamp: '2026-07-04T14:00:00Z' },
  { type: 'return', memberId: 'm5', memberName: 'Eve Johnson', bookTitle: 'The Art of Computer Programming', timestamp: '2026-07-04T11:45:00Z' },
];

/* Summary cards data for admin dashboard */
export const ADMIN_SUMMARY_CARDS = [
  { label: 'Total Books', value: 30, icon: 'BookOpen', color: 'indigo', change: '+2 this month' },
  { label: 'Total Members', value: 103, icon: 'Users', color: 'green', change: '+2 this month' },
  { label: 'Active Loans', value: 29, icon: 'BookMarked', color: 'blue', change: '6 overdue' },
  { label: 'Pending Reservations', value: 14, icon: 'Clock', color: 'amber', change: '4 ready for pickup' },
  { label: 'Fines Outstanding', value: '$13.50', icon: 'DollarSign', color: 'red', change: '4 members' },
  { label: 'On-Time Return Rate', value: '90.3%', icon: 'CheckCircle', color: 'emerald', change: '+1.6% vs last month' },
];

/* User summary cards */
export const USER_SUMMARY_CARDS_M1 = [
  { label: 'Books Borrowed', value: 34, icon: 'BookOpen', color: 'indigo', sublabel: '2 currently active' },
  { label: 'Reading Hours', value: 312, icon: 'Clock', color: 'blue', sublabel: 'across 22 books' },
  { label: 'Achievements', value: 10, icon: 'Trophy', color: 'amber', sublabel: '10 more to unlock' },
  { label: 'Avg. Rating Given', value: '4.6', icon: 'Star', color: 'yellow', sublabel: 'across 3 reviews' },
];

/* Alerts for admin dashboard */
export const ADMIN_ALERTS = [
  { id: 'alert-1', severity: 'high', message: 'Frank Lee (m6) has 2 overdue books and $8.75 in outstanding fines. Account suspended.', actionLabel: 'View Member', memberId: 'm6' },
  { id: 'alert-2', severity: 'medium', message: "Carol Diaz has 2 overdue books totalling $3.50 in fines.", actionLabel: 'View Member', memberId: 'm3' },
  { id: 'alert-3', severity: 'medium', message: "5 members have reservations expiring within 3 days.", actionLabel: 'View Reservations' },
  { id: 'alert-4', severity: 'low', message: 'Atomic Habits (b7) has a queue of 9 reservations. Consider acquiring additional copies.', actionLabel: 'View Book', bookId: 'b7' },
  { id: 'alert-5', severity: 'low', message: "Clean Code (b2) has 5 pending reservations with both copies currently borrowed.", actionLabel: 'View Book', bookId: 'b2' },
];
