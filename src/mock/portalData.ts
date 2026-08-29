/**
 * User portal mock data.
 * Re-exports from the root mock/ directory with user-portal-specific types and views.
 */

export type { MockBook as Book } from './mock/types';
export type { MockBorrow as Loan } from './mock/types';
export type { MockReservation as Reservation } from './mock/types';
export type { MockNotification as Notification } from './mock/types';
export type { MockAchievement as Achievement } from './mock/types';

export {
  BOOKS,
  CATEGORIES,
  getBook,
  getBooksByCategory,
  getAvailableBooks,
} from './mock/books';

export {
  BORROWS as LOANS,
  BORROWS as LOAN_HISTORY,
  getBorrowsByMember,
} from './mock/borrows';

export {
  RESERVATIONS,
  getReservationsByMember,
  getPendingReservations,
  getReadyReservations,
} from './mock/reservations';

export {
  REVIEWS,
  getReviewsByBook,
  getReviewsByMember,
  getPublishedReviews,
} from './mock/reviews';

export {
  ACHIEVEMENTS,
  USER_ACHIEVEMENTS_M1,
  getAchievement,
  getUserProgress,
  getUnlockedAchievements,
} from './mock/achievements';

export {
  NOTIFICATIONS,
  getNotificationsByMember,
  getUnreadNotifications,
} from './mock/notifications';

export {
  USER_MONTHLY_READING as MONTHLY_READING,
  USER_HOURS_BY_CATEGORY,
} from './mock/analytics';

export {
  USER_STATS_M1 as USER_STATS,
  USER_SUMMARY_CARDS_M1 as USER_SUMMARY_CARDS,
} from './mock/stats';

export { fmtDate, fmtDateShort, timeAgo, daysUntil, daysOverdue } from './mock/index';

/* User profile for the logged-in user (m1: Alice Chen) */
export const USER_PROFILE = {
  id: 'm1',
  name: 'Alice Chen',
  email: 'alice@library.dev',
  phone: '+1 (555) 234-5678',
  bio: 'Software engineer and lifelong reader. Currently exploring distributed systems and building better habits.',
  memberSince: '2024-09-01',
  membershipTier: 'Staff' as const,
  institution: 'State University',
  avatarInitials: 'AC',
  stats: {
    totalBorrowed: 34,
    activeBorrows: 2,
    returned: 30,
    overdueBooks: 1,
    achievements: 10,
    totalReadingHours: 312,
    favoriteCategory: 'Engineering',
    averageRating: 4.6,
    currentStreak: 8,
    finesOwed: 0.50,
  },
};

/* Active loans for the logged-in user */
export const MY_LOANS = [
  { id: 'bor-1', bookId: 'b1', borrowedAt: '2026-06-20', dueAt: '2026-07-20', renewCount: 0, maxRenews: 2, status: 'active' as const },
  { id: 'bor-2', bookId: 'b8', borrowedAt: '2026-06-28', dueAt: '2026-07-28', renewCount: 0, maxRenews: 2, status: 'active' as const },
  { id: 'bor-30', bookId: 'b3', borrowedAt: '2026-06-10', dueAt: '2026-07-08', renewCount: 1, maxRenews: 2, status: 'overdue' as const },
];

/* Loan history for the logged-in user */
export const MY_LOAN_HISTORY = [
  { id: 'bor-36', bookId: 'b4', borrowedAt: '2026-04-01', dueAt: '2026-05-01', returnedAt: '2026-04-28', renewCount: 0, maxRenews: 2, status: 'returned' as const },
  { id: 'bor-37', bookId: 'b7', borrowedAt: '2026-03-10', dueAt: '2026-04-10', returnedAt: '2026-04-09', renewCount: 1, maxRenews: 2, status: 'returned' as const },
  { id: 'bor-38', bookId: 'b10', borrowedAt: '2026-02-14', dueAt: '2026-03-14', returnedAt: '2026-03-12', renewCount: 0, maxRenews: 2, status: 'returned' as const },
  { id: 'bor-39', bookId: 'b5', borrowedAt: '2026-01-20', dueAt: '2026-02-20', returnedAt: '2026-02-18', renewCount: 0, maxRenews: 2, status: 'returned' as const },
  { id: 'bor-40', bookId: 'b6', borrowedAt: '2025-12-01', dueAt: '2026-01-01', returnedAt: '2025-12-28', renewCount: 2, maxRenews: 2, status: 'returned' as const },
  { id: 'bor-41', bookId: 'b9', borrowedAt: '2025-11-05', dueAt: '2025-12-05', returnedAt: '2025-12-02', renewCount: 0, maxRenews: 2, status: 'returned' as const },
];

/* Active reservations for the logged-in user */
export const MY_RESERVATIONS = [
  { id: 'res-1', bookId: 'b2', reservedAt: '2026-07-01', queuePosition: 2, totalQueue: 5, estimatedAvailability: '2026-07-18', status: 'pending' as const },
  { id: 'res-15', bookId: 'b7', reservedAt: '2026-06-28', expiresAt: '2026-07-13', queuePosition: 1, totalQueue: 3, estimatedAvailability: '2026-07-10', status: 'ready' as const },
];

/* Wishlist for the logged-in user */
export const WISHLIST = [
  { id: 'w1', bookId: 'b5', addedAt: '2026-06-15', note: 'Recommended by colleagues' },
  { id: 'w2', bookId: 'b11', addedAt: '2026-06-20' },
  { id: 'w3', bookId: 'b17', addedAt: '2026-07-01', note: 'For architecture deep dive' },
];

/* Reading history records for the logged-in user */
export const READING_HISTORY = [
  { id: 'rh-1', bookId: 'b4', startedAt: '2026-04-01', finishedAt: '2026-04-28', userRating: 5, note: 'Mind-blowing depth on closures and scope.', readingTimeHours: 18 },
  { id: 'rh-2', bookId: 'b7', startedAt: '2026-03-10', finishedAt: '2026-04-08', userRating: 5, note: 'Life-changing perspective on habits.', readingTimeHours: 14 },
  { id: 'rh-3', bookId: 'b10', startedAt: '2026-02-14', finishedAt: '2026-03-11', userRating: 4, readingTimeHours: 22 },
  { id: 'rh-4', bookId: 'b5', startedAt: '2026-01-20', finishedAt: '2026-02-17', userRating: 4, note: 'Essential for interview prep.', readingTimeHours: 20 },
  { id: 'rh-5', bookId: 'b6', startedAt: '2025-12-01', finishedAt: '2025-12-27', userRating: 3, note: 'Dense but rewarding.', readingTimeHours: 40 },
  { id: 'rh-6', bookId: 'b9', startedAt: '2025-11-05', finishedAt: '2025-12-01', userRating: 5, note: 'Should be required reading.', readingTimeHours: 24 },
];

/* My notifications (m1) */
export const MY_NOTIFICATIONS = [
  { id: 'ntf-1', memberId: 'm1', type: 'overdue' as const, title: 'Book overdue', body: 'Designing Data-Intensive Applications is now 3 days overdue. A fine of $0.50 has accrued.', bookId: 'b3', createdAt: '2026-07-10T08:00:00Z', read: false },
  { id: 'ntf-2', memberId: 'm1', type: 'reservation-ready' as const, title: 'Reservation ready for pickup', body: 'Atomic Habits is available. You have until July 13 to collect it.', bookId: 'b7', createdAt: '2026-07-10T08:30:00Z', read: false },
  { id: 'ntf-3', memberId: 'm1', type: 'due-soon' as const, title: 'Due in 10 days', body: 'The Pragmatic Programmer is due July 20. Renew early if you need more time.', bookId: 'b1', createdAt: '2026-07-10T09:00:00Z', read: false },
  { id: 'ntf-4', memberId: 'm1', type: 'new-arrival' as const, title: 'New books in Engineering', body: '3 new titles have been added to Engineering that match your reading interests.', createdAt: '2026-07-07T10:00:00Z', read: true },
  { id: 'ntf-5', memberId: 'm1', type: 'return-confirmed' as const, title: 'Return confirmed', body: "You Don't Know JS Yet has been successfully returned. Thank you!", bookId: 'b4', createdAt: '2026-07-05T16:20:00Z', read: true },
  { id: 'ntf-6', memberId: 'm1', type: 'system' as const, title: 'Achievement unlocked: Voracious Reader', body: "Congratulations! You've borrowed 25 books and earned the Voracious Reader badge.", createdAt: '2026-07-03T12:00:00Z', read: true },
  { id: 'ntf-7', memberId: 'm1', type: 'due-soon' as const, title: 'Due in 18 days', body: 'Deep Work is due July 28.', bookId: 'b8', createdAt: '2026-07-10T09:00:00Z', read: true },
  { id: 'ntf-8', memberId: 'm1', type: 'announcement' as const, title: 'Summer reading program', body: 'The summer reading program starts July 20. Earn bonus achievements for completing 5+ books before August 31.', createdAt: '2026-06-28T09:00:00Z', read: true },
];

/* My achievements (m1) — merged catalog + progress */
export const MY_ACHIEVEMENTS = [
  { id: 'a1', title: 'First Borrow', description: 'Borrowed your first book from the library.', icon: '📚', category: 'milestone' as const, unlocked: true, unlockedAt: '2024-09-01', rarity: 'common' as const, points: 10, progress: 1, target: 1 },
  { id: 'a2', title: 'Bookworm', description: 'Borrow 10 books total.', icon: '🐛', category: 'milestone' as const, unlocked: true, unlockedAt: '2025-01-15', rarity: 'common' as const, points: 25, progress: 10, target: 10 },
  { id: 'a3', title: 'Voracious Reader', description: 'Borrow 25 books total.', icon: '🔥', category: 'milestone' as const, unlocked: true, unlockedAt: '2026-01-08', rarity: 'rare' as const, points: 75, progress: 25, target: 25 },
  { id: 'a4', title: 'The Librarian', description: 'Borrow 50 books total.', icon: '🏛️', category: 'milestone' as const, unlocked: false, rarity: 'epic' as const, points: 150, progress: 34, target: 50 },
  { id: 'a5', title: 'Centurion', description: 'Borrow 100 books lifetime.', icon: '🏆', category: 'milestone' as const, unlocked: false, rarity: 'legendary' as const, points: 500, progress: 34, target: 100 },
  { id: 'a6', title: 'Annual Champion', description: 'Read 20 books in a single calendar year.', icon: '🗓️', category: 'milestone' as const, unlocked: true, unlockedAt: '2026-07-03', rarity: 'rare' as const, points: 100, progress: 22, target: 20 },
  { id: 'a7', title: 'On Time, Every Time', description: 'Return 10 books before their due date.', icon: '⏰', category: 'streak' as const, unlocked: true, unlockedAt: '2026-02-20', rarity: 'common' as const, points: 30, progress: 10, target: 10 },
  { id: 'a8', title: 'Perfect Record', description: 'Return 25 books on time without a single late return.', icon: '✅', category: 'streak' as const, unlocked: false, rarity: 'rare' as const, points: 80, progress: 19, target: 25 },
  { id: 'a9', title: 'Month-Long Streak', description: 'Borrow at least one book every week for four consecutive weeks.', icon: '📅', category: 'streak' as const, unlocked: true, unlockedAt: '2026-05-10', rarity: 'rare' as const, points: 60, progress: 4, target: 4 },
  { id: 'a10', title: 'Quarter Warrior', description: 'Borrow at least one book every month for three consecutive months.', icon: '🔄', category: 'streak' as const, unlocked: true, unlockedAt: '2026-04-01', rarity: 'epic' as const, points: 120, progress: 3, target: 3 },
  { id: 'a11', title: 'Genre Explorer', description: 'Borrow books from 5 different categories.', icon: '🗺️', category: 'reading' as const, unlocked: true, unlockedAt: '2025-12-20', rarity: 'rare' as const, points: 50, progress: 5, target: 5 },
  { id: 'a12', title: 'Polymath', description: 'Borrow books from 10 different categories.', icon: '🌍', category: 'reading' as const, unlocked: false, rarity: 'epic' as const, points: 130, progress: 7, target: 10 },
  { id: 'a13', title: 'Speed Reader', description: 'Finish a 400+ page book within 7 days.', icon: '⚡', category: 'reading' as const, unlocked: false, rarity: 'epic' as const, points: 100, progress: 6, target: 7 },
  { id: 'a14', title: 'Deep Diver', description: 'Borrow 5 books in the same category.', icon: '🤿', category: 'reading' as const, unlocked: true, unlockedAt: '2025-11-15', rarity: 'common' as const, points: 20, progress: 5, target: 5 },
  { id: 'a15', title: 'Critic', description: 'Leave your first book review.', icon: '✍️', category: 'social' as const, unlocked: true, unlockedAt: '2025-10-01', rarity: 'common' as const, points: 15, progress: 1, target: 1 },
  { id: 'a16', title: 'Reviewer', description: 'Leave 10 book reviews.', icon: '⭐', category: 'social' as const, unlocked: false, rarity: 'rare' as const, points: 60, progress: 3, target: 10 },
  { id: 'a17', title: 'Trusted Voice', description: 'Have 5 of your reviews marked helpful.', icon: '👍', category: 'social' as const, unlocked: false, rarity: 'rare' as const, points: 80, progress: 2, target: 5 },
  { id: 'a18', title: 'Night Owl', description: 'Place a reservation or renewal after midnight.', icon: '🦉', category: 'social' as const, unlocked: false, rarity: 'common' as const, points: 10, progress: 0, target: 1 },
  { id: 'a19', title: 'Early Bird', description: 'Borrow a book on the day it is added to the catalog.', icon: '🐦', category: 'social' as const, unlocked: false, rarity: 'rare' as const, points: 40, progress: 0, target: 1 },
];
