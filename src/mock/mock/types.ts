/* Shared mock data types */

export type UserRole = 'admin' | 'user';
export type MemberStatus = 'active' | 'suspended' | 'expired';
export type MemberTier = 'Standard' | 'Premium' | 'Staff';
export type BookStatus = 'active' | 'archived' | 'damaged';
export type BorrowStatus = 'active' | 'overdue' | 'returned' | 'cancelled';
export type ReservationStatus = 'pending' | 'ready' | 'fulfilled' | 'cancelled';
export type ReviewStatus = 'published' | 'pending' | 'rejected';
export type AchievementCategory = 'reading' | 'social' | 'streak' | 'milestone';
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type NotificationType = 'overdue' | 'due-soon' | 'reservation-ready' | 'new-arrival' | 'return-confirmed' | 'system' | 'announcement' | 'maintenance';
export type ItemCondition = 'excellent' | 'good' | 'fair' | 'damaged' | 'lost';
export type InventoryStatus = 'available' | 'borrowed' | 'reserved' | 'maintenance';

export interface MockBook {
  id: string;
  book_id: string;
  title: string;
  author: string;
  isbn: string;
  category: string|Category;
  subcategory: string;
  description: string;
  publisher: string;
  published_year: number;
  pages: number;
  language: string;
  rating: number;
  review_count: number;
  total_copies: number;
  available_copies: number;
  tags: string;
  is_new?: boolean;
  is_bestseller?: boolean;
}

export interface MockMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarInitials: string;
  role: UserRole;
  status: MemberStatus;
  tier: MemberTier;
  memberSince: string;
  institution?: string;
  bio?: string;
  borrowCount: number;
  activeLoans: number;
  overdueCount: number;
  returnedCount: number;
  reservationCount: number;
  fines: number;
  totalFinesPaid: number;
  favoriteCategory?: string;
  totalReadingHours: number;
  lastActivity: string;
}

export interface MockBorrow {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt?: string;
  renewCount: number;
  maxRenews: number;
  status: BorrowStatus;
  fine?: number;
  notes?: string;
}

export interface MockReservation {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  reservedAt: string;
  expiresAt?: string;
  estimatedAvailability?: string;
  queuePosition: number;
  totalQueue: number;
  status: ReservationStatus;
  notifiedAt?: string;
}

export interface MockReview {
  id: string;
  memberId: string;
  memberName: string;
  bookId: string;
  bookTitle: string;
  rating: number;
  content: string;
  createdAt: string;
  
  updatedAt?: string;
  status: ReviewStatus;
  flagged?: boolean;
  helpfulCount: number;
}

export interface MockAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  points: number;
  target: number;
  unlockedBy?: string[];
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserAchievement {
  achievementId: string;
  memberId: string;
  progress: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface MockNotification {
  id: string;
  memberId: string;
  type: NotificationType;
  title: string;
  body: string;
  bookId?: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
}

export interface AdminSentNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  sentAt: string;
  recipients: number;
  totalSent: number;
  readCount: number;
}

export interface InventoryItem {
  id: string;
  bookId: string;
  bookTitle: string;
  copyNumber: number;
  condition: ItemCondition;
  status: InventoryStatus;
  acquiredAt: string;
  lastChecked: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  bookCount: number;
  color: string;
  totalBorrows: number;
}

export interface Author {
  id: string;
  name: string;
  nationality: string;
  bookCount: number;
  borrowCount: number;
  rating: number;
  bio: string;
}

export interface Publisher {
  id: string;
  name: string;
  country: string;
  bookCount: number;
  founded?: number;
  website?: string;
  contactEmail?: string;
}

export interface ReportEntry {
  period: string;
  borrows: number;
  returns: number;
  overdue: number;
  newMembers: number;
  finesCollected: number;
  reservations: number;
}

export interface AnalyticsPoint {
  label: string;
  value: number;
  secondary?: number;
  tertiary?: number;
  [key: string]: string | number | undefined;
}

export interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
  activeLoans: number;
  overdueLoans: number;
  pendingReservations: number;
  totalCategories: number;
  booksAddedThisMonth: number;
  membersJoinedThisMonth: number;
  loansThisMonth: number;
  returnsThisMonth: number;
  finesOutstanding: number;
  finesCollectedThisMonth: number;
  availabilityRate: number;
  onTimeReturnRate: number;
}

export interface UserStats {
  totalBorrowed: number;
  activeBorrows: number;
  returnedBooks: number;
  overdueBooks: number;
  reservations: number;
  wishlistItems: number;
  achievements: number;
  totalReadingHours: number;
  booksThisYear: number;
  favoriteCategory: string;
  averageRating: number;
  currentStreak: number;
  finesOwed: number;
}
