import type { AdminSentNotification, MockNotification } from './types';

export const NOTIFICATIONS: MockNotification[] = [
  /* ── Member m1 (Alice Chen) ── */
  { id: 'ntf-1', memberId: 'm1', type: 'overdue', title: 'Book overdue', body: 'Designing Data-Intensive Applications is now 3 days overdue. A fine of $0.50 has accrued. Please return it as soon as possible.', bookId: 'b3', createdAt: '2026-07-10T08:00:00Z', read: false },
  { id: 'ntf-2', memberId: 'm1', type: 'reservation-ready', title: 'Reservation ready for pickup', body: 'Atomic Habits is available and ready for you. You have until July 13 to collect it before your reservation expires.', bookId: 'b7', createdAt: '2026-07-10T08:30:00Z', read: false },
  { id: 'ntf-3', memberId: 'm1', type: 'due-soon', title: 'Due in 10 days', body: 'The Pragmatic Programmer is due on July 20. Renew early if you need more time.', bookId: 'b1', createdAt: '2026-07-10T09:00:00Z', read: false },
  { id: 'ntf-4', memberId: 'm1', type: 'new-arrival', title: 'New books in Engineering', body: '3 new titles have been added to the Engineering category that match your reading interests.', createdAt: '2026-07-07T10:00:00Z', read: true },
  { id: 'ntf-5', memberId: 'm1', type: 'return-confirmed', title: 'Return confirmed', body: "You Don't Know JS Yet has been successfully returned. Thank you!", bookId: 'b4', createdAt: '2026-07-05T16:20:00Z', read: true },
  { id: 'ntf-6', memberId: 'm1', type: 'system', title: 'Achievement unlocked: Voracious Reader', body: "Congratulations! You've borrowed 25 books and earned the Voracious Reader badge. Keep it up!", createdAt: '2026-07-03T12:00:00Z', read: true },
  { id: 'ntf-7', memberId: 'm1', type: 'due-soon', title: 'Due in 18 days', body: 'Deep Work is due July 28. No action needed yet.', bookId: 'b8', createdAt: '2026-07-10T09:00:00Z', read: true },
  { id: 'ntf-8', memberId: 'm1', type: 'announcement', title: 'Summer reading program', body: 'The summer reading program starts July 20. Earn bonus achievements for completing 5+ books before August 31.', createdAt: '2026-06-28T09:00:00Z', read: true },
  { id: 'ntf-9', memberId: 'm1', type: 'return-confirmed', title: 'Return confirmed', body: 'System Design Interview has been successfully returned. Thank you!', bookId: 'b5', createdAt: '2026-06-18T14:10:00Z', read: true },
  { id: 'ntf-10', memberId: 'm1', type: 'system', title: 'Achievement unlocked: Annual Champion', body: "You've read 20 books this year! The Annual Champion achievement has been added to your profile.", createdAt: '2026-07-03T12:00:00Z', read: true },

  /* ── Member m2 (Bob Martinez) ── */
  { id: 'ntf-11', memberId: 'm2', type: 'due-soon', title: 'Due in 15 days', body: 'System Design Interview is due on July 25. Renew if you need more time.', bookId: 'b5', createdAt: '2026-07-10T09:00:00Z', read: false },
  { id: 'ntf-12', memberId: 'm2', type: 'return-confirmed', title: 'Return confirmed', body: 'Atomic Habits has been returned successfully.', bookId: 'b7', createdAt: '2026-04-09T11:00:00Z', read: true },
  { id: 'ntf-13', memberId: 'm2', type: 'announcement', title: 'New books in Self-Help', body: '2 new self-help titles have arrived that match your reading profile.', createdAt: '2026-06-20T09:00:00Z', read: true },
  { id: 'ntf-14', memberId: 'm2', type: 'system', title: 'Achievement unlocked: Bookworm', body: "You've borrowed 10 books. The Bookworm achievement has been awarded to your account!", createdAt: '2025-12-20T12:00:00Z', read: true },

  /* ── Member m3 (Carol Diaz) ── */
  { id: 'ntf-15', memberId: 'm3', type: 'overdue', title: 'Clean Code is overdue', body: 'Clean Code is 6 days overdue. A fine of $1.25 has been charged. Please return it to avoid additional charges.', bookId: 'b2', createdAt: '2026-07-11T08:00:00Z', read: false },
  { id: 'ntf-16', memberId: 'm3', type: 'overdue', title: 'The Power of Habit is overdue', body: 'The Power of Habit is 10 days overdue. A fine of $2.25 has accrued. Please return immediately.', bookId: 'b21', createdAt: '2026-07-11T08:00:00Z', read: false },
  { id: 'ntf-17', memberId: 'm3', type: 'return-confirmed', title: 'Return confirmed', body: 'Sapiens has been returned. Thank you!', bookId: 'b25', createdAt: '2026-06-12T15:00:00Z', read: true },
  { id: 'ntf-18', memberId: 'm3', type: 'system', title: 'Achievement unlocked: Voracious Reader', body: "You've borrowed 25 books! Well done.", createdAt: '2026-05-01T09:00:00Z', read: true },

  /* ── Member m7 (Grace Kim) ── */
  { id: 'ntf-19', memberId: 'm7', type: 'due-soon', title: 'Due in 12 days', body: "You Don't Know JS Yet is due July 22.", bookId: 'b4', createdAt: '2026-07-10T09:00:00Z', read: false },
  { id: 'ntf-20', memberId: 'm7', type: 'return-confirmed', title: 'Return confirmed', body: 'Clean Code has been returned successfully.', bookId: 'b2', createdAt: '2026-05-02T10:30:00Z', read: true },
  { id: 'ntf-21', memberId: 'm7', type: 'new-arrival', title: 'New book: Code Complete added', body: 'Code Complete by Steve McConnell has been added to Engineering. You may want to add it to your wishlist.', createdAt: '2026-04-20T11:00:00Z', read: true },

  /* ── Member m9 (Isabel Torres) ── */
  { id: 'ntf-22', memberId: 'm9', type: 'reservation-ready', title: 'Reservation ready: Introduction to Algorithms', body: 'Introduction to Algorithms is available for pickup. Your reservation expires July 11 — collect it soon!', bookId: 'b12', createdAt: '2026-07-04T09:00:00Z', read: false },
  { id: 'ntf-23', memberId: 'm9', type: 'due-soon', title: 'Due in 23 days', body: '1984 is due August 3.', bookId: 'b29', createdAt: '2026-07-10T09:00:00Z', read: true },

  /* ── Member m11 (Karen Osei) ── */
  { id: 'ntf-24', memberId: 'm11', type: 'due-soon', title: 'Due in 15 days', body: 'The Power of Habit is due July 26.', bookId: 'b21', createdAt: '2026-07-10T09:00:00Z', read: false },
  { id: 'ntf-25', memberId: 'm11', type: 'system', title: 'Achievement unlocked: Bookworm', body: "You've borrowed 10 books — keep reading!", createdAt: '2026-03-15T12:00:00Z', read: true },

  /* ── System-wide (Admin broadcast) ── */
  { id: 'ntf-26', memberId: 'broadcast', type: 'maintenance', title: 'Scheduled maintenance', body: 'The library system will be down for maintenance on July 15, 2026 from 2:00–4:00 AM EST. Apologies for any inconvenience.', createdAt: '2026-07-08T09:00:00Z', read: false },
  { id: 'ntf-27', memberId: 'broadcast', type: 'announcement', title: 'New books added', body: '12 new titles have been added across Engineering, Self-Help, Finance, and Fiction categories.', createdAt: '2026-07-05T10:00:00Z', read: false },
  { id: 'ntf-28', memberId: 'broadcast', type: 'announcement', title: 'Summer reading program', body: 'The summer reading program begins July 20. Members who complete 5 books earn exclusive achievements and extended loan periods.', createdAt: '2026-06-28T09:00:00Z', read: false },
  { id: 'ntf-29', memberId: 'broadcast', type: 'system', title: 'Overdue notices sent', body: 'Automated overdue reminders have been sent to 6 members with books past their due date.', createdAt: '2026-07-10T08:00:00Z', read: false },
  { id: 'ntf-30', memberId: 'broadcast', type: 'maintenance', title: 'Catalog audit complete', body: 'Annual catalog audit completed. 4 books marked as damaged, 1 listed as lost. Replacements ordered.', createdAt: '2026-07-01T14:00:00Z', read: true },
];

/* ── Admin “Sent Notifications” broadcast view (read-rate stats) ── */
export const BROADCAST_NOTIFICATIONS: AdminSentNotification[] = [
  {
    id: 'ntf-26',
    type: 'maintenance',
    title: 'Scheduled maintenance',
    body: 'The library system will be down for maintenance on July 15, 2026 from 2:00–4:00 AM EST. Apologies for any inconvenience.',
    sentAt: '2026-07-08T09:00:00Z',
    recipients: 25,
    totalSent: 25,
    readCount: 25,
  },
  {
    id: 'ntf-29',
    type: 'system',
    title: 'Overdue notices sent',
    body: 'Automated overdue reminders have been sent to members with books past their due date.',
    sentAt: '2026-07-10T08:00:00Z',
    recipients: 6,
    totalSent: 6,
    readCount: 5,
  },
  {
    id: 'ntf-27',
    type: 'announcement',
    title: 'New books added',
    body: '12 new titles have been added across Engineering, Self-Help, Finance, and Fiction categories.',
    sentAt: '2026-07-05T10:00:00Z',
    recipients: 25,
    totalSent: 25,
    readCount: 19,
  },
  {
    id: 'ntf-28',
    type: 'announcement',
    title: 'Summer reading program',
    body: 'The summer reading program begins July 20. Members who complete 5 books earn exclusive achievements and extended loan periods.',
    sentAt: '2026-06-28T09:00:00Z',
    recipients: 25,
    totalSent: 25,
    readCount: 14,
  },
  {
    id: 'ntf-31',
    type: 'overdue',
    title: 'Fine policy update',
    body: 'Starting August 1, the daily overdue fine will increase from $0.25 to $0.50. Pay outstanding fines early to avoid higher charges.',
    sentAt: '2026-07-22T15:00:00Z',
    recipients: 25,
    totalSent: 25,
    readCount: 8,
  },
  {
    id: 'ntf-30',
    type: 'maintenance',
    title: 'Catalog audit complete',
    body: 'Annual catalog audit completed. 4 books marked as damaged, 1 listed as lost. Replacements ordered.',
    sentAt: '2026-07-01T14:00:00Z',
    recipients: 25,
    totalSent: 25,
    readCount: 11,
  },
];

export function getNotificationsByMember(memberId: string): MockNotification[] {
  return NOTIFICATIONS.filter(n => n.memberId === memberId || n.memberId === 'broadcast');
}

export function getUnreadNotifications(memberId: string): MockNotification[] {
  return getNotificationsByMember(memberId).filter(n => !n.read);
}

export function getBroadcastNotifications(): MockNotification[] {
  return NOTIFICATIONS.filter(n => n.memberId === 'broadcast');
}
