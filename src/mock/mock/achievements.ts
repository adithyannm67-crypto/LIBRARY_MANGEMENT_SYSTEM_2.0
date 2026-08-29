import type { MockAchievement, UserAchievement } from './types';

export const ACHIEVEMENTS: MockAchievement[] = [
  /* Milestones */
  { id: 'ach-1', title: 'First Borrow', description: 'Borrowed your very first book from the library.', icon: '📚', category: 'milestone', rarity: 'common', points: 10, target: 1 },
  { id: 'ach-2', title: 'Bookworm', description: 'Borrow 10 books total.', icon: '🐛', category: 'milestone', rarity: 'common', points: 25, target: 10 },
  { id: 'ach-3', title: 'Voracious Reader', description: 'Borrow 25 books total.', icon: '🔥', category: 'milestone', rarity: 'rare', points: 75, target: 25 },
  { id: 'ach-4', title: 'The Librarian', description: 'Borrow 50 books total.', icon: '🏛️', category: 'milestone', rarity: 'epic', points: 150, target: 50 },
  { id: 'ach-5', title: 'Centurion', description: 'Borrow 100 books lifetime.', icon: '🏆', category: 'milestone', rarity: 'legendary', points: 500, target: 100 },
  { id: 'ach-6', title: 'Annual Champion', description: 'Read 20 books in a single calendar year.', icon: '🗓️', category: 'milestone', rarity: 'rare', points: 100, target: 20 },

  /* Streaks */
  { id: 'ach-7', title: 'On Time, Every Time', description: 'Return 10 books before their due date.', icon: '⏰', category: 'streak', rarity: 'common', points: 30, target: 10 },
  { id: 'ach-8', title: 'Perfect Record', description: 'Return 25 books on time without a single late return.', icon: '✅', category: 'streak', rarity: 'rare', points: 80, target: 25 },
  { id: 'ach-9', title: 'Month-Long Streak', description: 'Borrow at least one book every week for four consecutive weeks.', icon: '📅', category: 'streak', rarity: 'rare', points: 60, target: 4 },
  { id: 'ach-10', title: 'Quarter Warrior', description: 'Borrow at least one book every month for three consecutive months.', icon: '🔄', category: 'streak', rarity: 'epic', points: 120, target: 3 },

  /* Reading */
  { id: 'ach-11', title: 'Genre Explorer', description: 'Borrow books from 5 different categories.', icon: '🗺️', category: 'reading', rarity: 'rare', points: 50, target: 5 },
  { id: 'ach-12', title: 'Polymath', description: 'Borrow books from 10 different categories.', icon: '🌍', category: 'reading', rarity: 'epic', points: 130, target: 10 },
  { id: 'ach-13', title: 'Speed Reader', description: 'Finish a 400+ page book within 7 days.', icon: '⚡', category: 'reading', rarity: 'epic', points: 100, target: 7 },
  { id: 'ach-14', title: 'Deep Diver', description: 'Borrow 5 books in the same category.', icon: '🤿', category: 'reading', rarity: 'common', points: 20, target: 5 },
  { id: 'ach-15', title: '1000 Pages', description: 'Read books totalling over 1,000 pages in a single month.', icon: '📖', category: 'reading', rarity: 'rare', points: 70, target: 1000 },

  /* Social */
  { id: 'ach-16', title: 'Critic', description: 'Leave your first book review.', icon: '✍️', category: 'social', rarity: 'common', points: 15, target: 1 },
  { id: 'ach-17', title: 'Reviewer', description: 'Leave 10 book reviews.', icon: '⭐', category: 'social', rarity: 'rare', points: 60, target: 10 },
  { id: 'ach-18', title: 'Trusted Voice', description: 'Have 5 of your reviews marked helpful by other members.', icon: '👍', category: 'social', rarity: 'rare', points: 80, target: 5 },
  { id: 'ach-19', title: 'Night Owl', description: 'Place a reservation or renewal after midnight.', icon: '🦉', category: 'social', rarity: 'common', points: 10, target: 1 },
  { id: 'ach-20', title: 'Early Bird', description: 'Borrow a book on the day it is added to the catalog.', icon: '🐦', category: 'social', rarity: 'rare', points: 40, target: 1 },
];

/* Per-member progress — keyed to member m1 (Alice Chen) as the logged-in user */
export const USER_ACHIEVEMENTS_M1: UserAchievement[] = [
  { achievementId: 'ach-1', memberId: 'm1', progress: 1, unlocked: true, unlockedAt: '2024-09-01' },
  { achievementId: 'ach-2', memberId: 'm1', progress: 10, unlocked: true, unlockedAt: '2025-01-15' },
  { achievementId: 'ach-3', memberId: 'm1', progress: 25, unlocked: true, unlockedAt: '2026-01-08' },
  { achievementId: 'ach-4', memberId: 'm1', progress: 34, unlocked: false },
  { achievementId: 'ach-5', memberId: 'm1', progress: 34, unlocked: false },
  { achievementId: 'ach-6', memberId: 'm1', progress: 22, unlocked: true, unlockedAt: '2026-07-03' },
  { achievementId: 'ach-7', memberId: 'm1', progress: 10, unlocked: true, unlockedAt: '2026-02-20' },
  { achievementId: 'ach-8', memberId: 'm1', progress: 19, unlocked: false },
  { achievementId: 'ach-9', memberId: 'm1', progress: 4, unlocked: true, unlockedAt: '2026-05-10' },
  { achievementId: 'ach-10', memberId: 'm1', progress: 3, unlocked: true, unlockedAt: '2026-04-01' },
  { achievementId: 'ach-11', memberId: 'm1', progress: 5, unlocked: true, unlockedAt: '2025-12-20' },
  { achievementId: 'ach-12', memberId: 'm1', progress: 7, unlocked: false },
  { achievementId: 'ach-13', memberId: 'm1', progress: 6, unlocked: false },
  { achievementId: 'ach-14', memberId: 'm1', progress: 5, unlocked: true, unlockedAt: '2025-11-15' },
  { achievementId: 'ach-15', memberId: 'm1', progress: 0, unlocked: false },
  { achievementId: 'ach-16', memberId: 'm1', progress: 1, unlocked: true, unlockedAt: '2025-10-01' },
  { achievementId: 'ach-17', memberId: 'm1', progress: 3, unlocked: false },
  { achievementId: 'ach-18', memberId: 'm1', progress: 2, unlocked: false },
  { achievementId: 'ach-19', memberId: 'm1', progress: 0, unlocked: false },
  { achievementId: 'ach-20', memberId: 'm1', progress: 0, unlocked: false },
];

export function getAchievement(id: string): MockAchievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

export function getUserProgress(memberId: string, achievementId: string): UserAchievement | undefined {
  if (memberId === 'm1') return USER_ACHIEVEMENTS_M1.find(ua => ua.achievementId === achievementId);
  return undefined;
}

export function getUnlockedAchievements(memberId: string): string[] {
  if (memberId === 'm1') return USER_ACHIEVEMENTS_M1.filter(ua => ua.unlocked).map(ua => ua.achievementId);
  return [];
}
