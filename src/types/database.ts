export interface Book {
  book_id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
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
  is_new: boolean;
  is_bestseller: boolean;
}


export type MemberStatus = 'active' | 'suspended' | 'expired';
export type MemberTier = 'Standard' | 'Premium' | 'Staff';

export interface Member {
  member_id: string;
  name: string;
  email: string;
  phone?: string;
  avatarInitials: string;
  role: 'admin' | 'user';
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


export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  rarity: string;
  points: number;
  target: number;
}

export interface Review {
  id: string;
  member_id: string;
  member_name: string;
  book_id: string;
  book_title: string;
  rating: number;
  content: string;
  created_at: string;
  updated_at?: string;
  status: 'published' | 'pending' | 'rejected';
  flagged: boolean;
  helpful_count: number;
}

export interface UserAchievement extends Achievement {
  achievement_id: string;
  member_id: string;
  progress: number;
  unlocked: boolean;
  unlocked_at?: string;
}

export interface Author {
  author_id: string;
  name: string;
  nationality: string;
  book_count: number;
  borrow_count: number;
  rating: number;
  bio: string;
}

export interface BorrowRecord {
  id: string;
  member_id: string;
  book_id: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  renewCount: number;
  maxRenews: number;
  borrowrecord_status: 'active' | 'overdue' | 'returned';
  fine: number;
  notes: string | null;
}
