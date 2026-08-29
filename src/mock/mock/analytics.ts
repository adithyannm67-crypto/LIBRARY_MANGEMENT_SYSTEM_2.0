import type { AnalyticsPoint } from './types';

/* Monthly borrows vs returns — Sep 2025 through Jul 2026 */
export const BORROW_TREND: AnalyticsPoint[] = [
  { label: 'Sep', value: 31, secondary: 24 },
  { label: 'Oct', value: 47, secondary: 38 },
  { label: 'Nov', value: 52, secondary: 46 },
  { label: 'Dec', value: 38, secondary: 34 },
  { label: 'Jan', value: 61, secondary: 54 },
  { label: 'Feb', value: 68, secondary: 62 },
  { label: 'Mar', value: 74, secondary: 69 },
  { label: 'Apr', value: 83, secondary: 77 },
  { label: 'May', value: 71, secondary: 68 },
  { label: 'Jun', value: 88, secondary: 79 },
  { label: 'Jul', value: 52, secondary: 41 },
];

/* Monthly borrows with returns and new members — for admin trend chart */
export const MONTHLY_TREND = [
  { month: 'Sep', borrows: 31, returns: 24, newMembers: 12 },
  { month: 'Oct', borrows: 47, returns: 38, newMembers: 6 },
  { month: 'Nov', borrows: 52, returns: 46, newMembers: 6 },
  { month: 'Dec', borrows: 38, returns: 34, newMembers: 4 },
  { month: 'Jan', borrows: 61, returns: 54, newMembers: 5 },
  { month: 'Feb', borrows: 68, returns: 62, newMembers: 5 },
  { month: 'Mar', borrows: 74, returns: 69, newMembers: 7 },
  { month: 'Apr', borrows: 83, returns: 77, newMembers: 6 },
  { month: 'May', borrows: 71, returns: 68, newMembers: 3 },
  { month: 'Jun', borrows: 88, returns: 79, newMembers: 4 },
  { month: 'Jul', borrows: 52, returns: 41, newMembers: 2 },
];

/* Category distribution by borrow volume */
export const CATEGORY_DISTRIBUTION = [
  { category: 'Engineering', borrows: 869, percentage: 21.2 },
  { category: 'Fiction', borrows: 719, percentage: 17.5 },
  { category: 'Self-Help', borrows: 614, percentage: 15.0 },
  { category: 'Psychology', borrows: 545, percentage: 13.3 },
  { category: 'Finance', borrows: 556, percentage: 13.6 },
  { category: 'Business', borrows: 441, percentage: 10.8 },
  { category: 'History', borrows: 312, percentage: 7.6 },
  { category: 'Science', borrows: 187, percentage: 4.6 },
  { category: 'Databases', borrows: 138, percentage: 3.4 },
  { category: 'JavaScript', borrows: 173, percentage: 4.2 },
  { category: 'Algorithms', borrows: 102, percentage: 2.5 },
  { category: 'Python', borrows: 98, percentage: 2.4 },
  { category: 'TypeScript', borrows: 43, percentage: 1.0 },
];

/* Member growth — cumulative, Sep 2024 through Jul 2026 */
export const MEMBER_GROWTH: AnalyticsPoint[] = [
  { label: 'Sep 24', value: 12 },
  { label: 'Oct 24', value: 18 },
  { label: 'Nov 24', value: 24 },
  { label: 'Dec 24', value: 28 },
  { label: 'Jan 25', value: 33 },
  { label: 'Feb 25', value: 38 },
  { label: 'Mar 25', value: 45 },
  { label: 'Apr 25', value: 51 },
  { label: 'May 25', value: 54 },
  { label: 'Jun 25', value: 57 },
  { label: 'Jul 25', value: 60 },
  { label: 'Aug 25', value: 63 },
  { label: 'Sep 25', value: 68 },
  { label: 'Oct 25', value: 72 },
  { label: 'Nov 25', value: 76 },
  { label: 'Dec 25', value: 79 },
  { label: 'Jan 26', value: 83 },
  { label: 'Feb 26', value: 87 },
  { label: 'Mar 26', value: 91 },
  { label: 'Apr 26', value: 95 },
  { label: 'May 26', value: 98 },
  { label: 'Jun 26', value: 101 },
  { label: 'Jul 26', value: 103 },
];

/* Top 10 most borrowed books */
export const TOP_BOOKS = [
  { bookId: 'b7', title: 'Atomic Habits', author: 'James Clear', borrows: 291, rating: 4.8 },
  { bookId: 'b29', title: '1984', author: 'George Orwell', borrows: 421, rating: 4.7 },
  { bookId: 'b10', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', borrows: 267, rating: 4.7 },
  { bookId: 'b30', title: 'Dune', author: 'Frank Herbert', borrows: 298, rating: 4.8 },
  { bookId: 'b25', title: 'Sapiens', author: 'Yuval Noah Harari', borrows: 312, rating: 4.6 },
  { bookId: 'b27', title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', borrows: 389, rating: 4.2 },
  { bookId: 'b2', title: 'Clean Code', author: 'Robert C. Martin', borrows: 163, rating: 4.6 },
  { bookId: 'b5', title: 'System Design Interview', author: 'Alex Xu', borrows: 152, rating: 4.5 },
  { bookId: 'b8', title: 'Deep Work', author: 'Cal Newport', borrows: 134, rating: 4.6 },
  { bookId: 'b1', title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt', borrows: 147, rating: 4.8 },
];

/* Top 10 most active members */
export const TOP_MEMBERS = [
  { memberId: 'm3', name: 'Carol Diaz', email: 'carol@example.com', borrowCount: 41, tier: 'Premium' },
  { memberId: 'm1', name: 'Alice Chen', email: 'alice@library.dev', borrowCount: 34, tier: 'Staff' },
  { memberId: 'm7', name: 'Grace Kim', email: 'grace@example.com', borrowCount: 28, tier: 'Premium' },
  { memberId: 'm2', name: 'Bob Martinez', email: 'bob@library.dev', borrowCount: 22, tier: 'Standard' },
  { memberId: 'm13', name: 'Maya Patel', email: 'maya@example.com', borrowCount: 32, tier: 'Premium' },
  { memberId: 'm22', name: 'Vera Ivanova', email: 'vera@example.com', borrowCount: 21, tier: 'Premium' },
  { memberId: 'm18', name: 'Rachel Kim', email: 'rachel@example.com', borrowCount: 19, tier: 'Premium' },
  { memberId: 'm11', name: 'Karen Osei', email: 'karen@example.com', borrowCount: 25, tier: 'Premium' },
  { memberId: 'm10', name: 'James Wright', email: 'james@example.com', borrowCount: 17, tier: 'Standard' },
  { memberId: 'm4', name: 'David Park', email: 'david@example.com', borrowCount: 14, tier: 'Standard' },
];

/* User reading activity — monthly books read (member m1, Alice Chen) */
export const USER_MONTHLY_READING = [
  { month: 'Sep', count: 1 }, { month: 'Oct', count: 2 }, { month: 'Nov', count: 3 },
  { month: 'Dec', count: 2 }, { month: 'Jan', count: 2 }, { month: 'Feb', count: 2 },
  { month: 'Mar', count: 2 }, { month: 'Apr', count: 2 }, { month: 'May', count: 2 },
  { month: 'Jun', count: 2 }, { month: 'Jul', count: 1 },
];

/* User reading hours by category (m1) */
export const USER_HOURS_BY_CATEGORY = [
  { category: 'Engineering', hours: 142 },
  { category: 'Databases', hours: 62 },
  { category: 'Self-Help', hours: 36 },
  { category: 'Psychology', hours: 44 },
  { category: 'Algorithms', hours: 28 },
];

/* Availability rate by category */
export const AVAILABILITY_BY_CATEGORY = [
  { category: 'TypeScript', rate: 100 },
  { category: 'Algorithms', rate: 75 },
  { category: 'Python', rate: 67 },
  { category: 'JavaScript', rate: 63 },
  { category: 'Science', rate: 67 },
  { category: 'Engineering', rate: 58 },
  { category: 'Psychology', rate: 58 },
  { category: 'History', rate: 50 },
  { category: 'Finance', rate: 50 },
  { category: 'Business', rate: 57 },
  { category: 'Databases', rate: 50 },
  { category: 'Fiction', rate: 56 },
  { category: 'Self-Help', rate: 40 },
];

/* Fine collection by month */
export const FINE_COLLECTION = [
  { month: 'Sep', collected: 0.00 },
  { month: 'Oct', collected: 1.25 },
  { month: 'Nov', collected: 2.50 },
  { month: 'Dec', collected: 0.75 },
  { month: 'Jan', collected: 4.50 },
  { month: 'Feb', collected: 2.00 },
  { month: 'Mar', collected: 3.75 },
  { month: 'Apr', collected: 1.50 },
  { month: 'May', collected: 6.25 },
  { month: 'Jun', collected: 3.00 },
  { month: 'Jul', collected: 1.75 },
];

/* Renewal rate — percentage of loans renewed at least once */
export const RENEWAL_RATE_TREND = [
  { month: 'Sep', rate: 18 }, { month: 'Oct', rate: 22 }, { month: 'Nov', rate: 24 },
  { month: 'Dec', rate: 20 }, { month: 'Jan', rate: 26 }, { month: 'Feb', rate: 29 },
  { month: 'Mar', rate: 31 }, { month: 'Apr', rate: 27 }, { month: 'May', rate: 33 },
  { month: 'Jun', rate: 28 }, { month: 'Jul', rate: 24 },
];

/* On-time return rate by month */
export const ON_TIME_RETURN_TREND = [
  { month: 'Sep', rate: 92 }, { month: 'Oct', rate: 89 }, { month: 'Nov', rate: 91 },
  { month: 'Dec', rate: 94 }, { month: 'Jan', rate: 88 }, { month: 'Feb', rate: 90 },
  { month: 'Mar', rate: 87 }, { month: 'Apr', rate: 93 }, { month: 'May', rate: 86 },
  { month: 'Jun', rate: 91 }, { month: 'Jul', rate: 90 },
];
