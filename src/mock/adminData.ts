/**
 * Admin portal mock data.
 * Re-exports from the root mock/ directory and extends with admin-specific helpers.
 */

export type {
  MockBook as AdminBook,
  MockMember as AdminMember,
  MockBorrow as AdminLoan,
  MockReservation as AdminReservation,
  MockReview as AdminReview,
  InventoryItem,
  Category,
  Author,
  Publisher,
} from './mock/types';

export {
  BOOKS as ADMIN_BOOKS,
  CATEGORIES as ADMIN_CATEGORIES,
  AUTHORS,
  PUBLISHERS,
  getBook as getAdminBook,
  getBooksByCategory,
  getAvailableBooks,
} from './mock/books';

export {
  MEMBERS,
  getMember,
  getActiveMembers,
  getMembersByTier,
} from './mock/members';

export {
  BORROWS as ALL_LOANS,
  getBorrowsByMember,
  getBorrowsByBook,
  getActiveBorrows,
  getOverdueBorrows,
  getReturnedBorrows,
} from './mock/borrows';

export {
  RESERVATIONS as ALL_RESERVATIONS,
  getReservationsByMember,
  getReservationsByBook,
  getPendingReservations,
  getReadyReservations,
} from './mock/reservations';

export {
  REVIEWS as ADMIN_REVIEWS,
  getReviewsByBook,
  getReviewsByMember,
  getPublishedReviews,
  getPendingReviews,
  getFlaggedReviews,
} from './mock/reviews';

export {
  BROADCAST_NOTIFICATIONS as ADMIN_NOTIFICATIONS,
  getBroadcastNotifications,
} from './mock/notifications';

export {
  MONTHLY_TREND as BORROW_TREND,
  CATEGORY_DISTRIBUTION as CATEGORY_DIST,
  MEMBER_GROWTH,
  TOP_BOOKS,
  TOP_MEMBERS,
  FINE_COLLECTION,
  ON_TIME_RETURN_TREND,
  RENEWAL_RATE_TREND,
  AVAILABILITY_BY_CATEGORY,
} from './mock/analytics';

export {
  MONTHLY_REPORTS,
  OVERDUE_REPORT,
  FINES_REPORT,
  INVENTORY_REPORT,
  LOW_UTILIZATION_REPORT,
  ANNUAL_SUMMARY_2025_2026,
  CATEGORY_UTILIZATION,
} from './mock/reports';

export {
  ADMIN_STATS,
  ADMIN_KPIS,
  RECENT_ACTIVITY,
  ADMIN_SUMMARY_CARDS,
  ADMIN_ALERTS,
} from './mock/stats';

export { fmtDate, fmtDateShort, timeAgo, daysUntil, daysOverdue, fineAmount } from './mock/index';

/* Inline inventory data (not in root mock since it's admin-only) */
export interface InventoryItem {
  id: string; bookId: string; bookTitle: string; copyNumber: number;
  condition: 'excellent' | 'good' | 'fair' | 'damaged' | 'lost';
  status: 'available' | 'borrowed' | 'reserved' | 'maintenance';
  acquiredAt: string; lastChecked: string; notes?: string;
}

export const INVENTORY: InventoryItem[] = [
  { id: 'inv1', bookId: 'b1', bookTitle: 'The Pragmatic Programmer', copyNumber: 1, condition: 'good', status: 'available', acquiredAt: '2024-09-01', lastChecked: '2026-06-01' },
  { id: 'inv2', bookId: 'b1', bookTitle: 'The Pragmatic Programmer', copyNumber: 2, condition: 'excellent', status: 'available', acquiredAt: '2024-09-01', lastChecked: '2026-06-01' },
  { id: 'inv3', bookId: 'b1', bookTitle: 'The Pragmatic Programmer', copyNumber: 3, condition: 'fair', status: 'borrowed', acquiredAt: '2024-09-01', lastChecked: '2026-05-15', notes: 'Minor water damage on cover' },
  { id: 'inv4', bookId: 'b2', bookTitle: 'Clean Code', copyNumber: 1, condition: 'good', status: 'borrowed', acquiredAt: '2024-09-01', lastChecked: '2026-06-10' },
  { id: 'inv5', bookId: 'b2', bookTitle: 'Clean Code', copyNumber: 2, condition: 'excellent', status: 'borrowed', acquiredAt: '2024-11-01', lastChecked: '2026-07-01' },
  { id: 'inv6', bookId: 'b3', bookTitle: 'Designing Data-Intensive Applications', copyNumber: 1, condition: 'excellent', status: 'borrowed', acquiredAt: '2024-09-01', lastChecked: '2026-07-02' },
  { id: 'inv7', bookId: 'b3', bookTitle: 'Designing Data-Intensive Applications', copyNumber: 2, condition: 'good', status: 'available', acquiredAt: '2024-09-01', lastChecked: '2026-06-01' },
  { id: 'inv8', bookId: 'b7', bookTitle: 'Atomic Habits', copyNumber: 1, condition: 'good', status: 'borrowed', acquiredAt: '2024-09-01', lastChecked: '2026-06-01' },
  { id: 'inv9', bookId: 'b7', bookTitle: 'Atomic Habits', copyNumber: 2, condition: 'fair', status: 'borrowed', acquiredAt: '2024-09-01', lastChecked: '2026-05-01', notes: 'Spine showing wear' },
  { id: 'inv10', bookId: 'b7', bookTitle: 'Atomic Habits', copyNumber: 3, condition: 'damaged', status: 'maintenance', acquiredAt: '2024-09-01', lastChecked: '2026-07-01', notes: 'Pages torn, needs replacement' },
  { id: 'inv11', bookId: 'b7', bookTitle: 'Atomic Habits', copyNumber: 4, condition: 'excellent', status: 'borrowed', acquiredAt: '2025-01-15', lastChecked: '2026-07-01' },
  { id: 'inv12', bookId: 'b7', bookTitle: 'Atomic Habits', copyNumber: 5, condition: 'good', status: 'borrowed', acquiredAt: '2025-01-15', lastChecked: '2026-07-01' },
  { id: 'inv13', bookId: 'b12', bookTitle: 'Introduction to Algorithms', copyNumber: 1, condition: 'excellent', status: 'borrowed', acquiredAt: '2024-10-01', lastChecked: '2026-07-07' },
  { id: 'inv14', bookId: 'b12', bookTitle: 'Introduction to Algorithms', copyNumber: 2, condition: 'good', status: 'available', acquiredAt: '2024-10-01', lastChecked: '2026-07-01' },
  { id: 'inv15', bookId: 'b25', bookTitle: 'Sapiens', copyNumber: 1, condition: 'good', status: 'borrowed', acquiredAt: '2024-09-01', lastChecked: '2026-06-30' },
  { id: 'inv16', bookId: 'b25', bookTitle: 'Sapiens', copyNumber: 2, condition: 'excellent', status: 'borrowed', acquiredAt: '2024-09-01', lastChecked: '2026-06-29' },
  { id: 'inv17', bookId: 'b25', bookTitle: 'Sapiens', copyNumber: 3, condition: 'fair', status: 'borrowed', acquiredAt: '2025-03-01', lastChecked: '2026-06-01' },
  { id: 'inv18', bookId: 'b25', bookTitle: 'Sapiens', copyNumber: 4, condition: 'good', status: 'available', acquiredAt: '2025-03-01', lastChecked: '2026-07-01' },
  { id: 'inv19', bookId: 'b29', bookTitle: '1984', copyNumber: 1, condition: 'excellent', status: 'borrowed', acquiredAt: '2024-09-01', lastChecked: '2026-07-06' },
  { id: 'inv20', bookId: 'b29', bookTitle: '1984', copyNumber: 2, condition: 'good', status: 'borrowed', acquiredAt: '2024-09-01', lastChecked: '2026-07-06' },
  { id: 'inv21', bookId: 'b29', bookTitle: '1984', copyNumber: 3, condition: 'excellent', status: 'available', acquiredAt: '2025-01-01', lastChecked: '2026-07-01' },
  { id: 'inv22', bookId: 'b29', bookTitle: '1984', copyNumber: 4, condition: 'fair', status: 'available', acquiredAt: '2024-09-01', lastChecked: '2026-05-01', notes: 'Cover fading' },
  { id: 'inv23', bookId: 'b29', bookTitle: '1984', copyNumber: 5, condition: 'lost', status: 'maintenance', acquiredAt: '2024-09-01', lastChecked: '2026-01-15', notes: 'Reported lost by member — replacement ordered' },
];
