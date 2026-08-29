import type { MockReservation } from './types';

export const RESERVATIONS: MockReservation[] = [
  /* ── Pending ── */
  { id: 'res-1', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookId: 'b2', bookTitle: 'Clean Code', bookAuthor: 'Robert C. Martin', reservedAt: '2026-07-01', queuePosition: 2, totalQueue: 5, estimatedAvailability: '2026-07-18', status: 'pending' },
  { id: 'res-2', memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', bookId: 'b2', bookTitle: 'Clean Code', bookAuthor: 'Robert C. Martin', reservedAt: '2026-07-02', queuePosition: 3, totalQueue: 5, estimatedAvailability: '2026-07-25', status: 'pending' },
  { id: 'res-3', memberId: 'm7', memberName: 'Grace Kim', memberEmail: 'grace@example.com', bookId: 'b5', bookTitle: 'System Design Interview', bookAuthor: 'Alex Xu', reservedAt: '2026-07-05', queuePosition: 1, totalQueue: 2, estimatedAvailability: '2026-07-22', status: 'pending' },
  { id: 'res-4', memberId: 'm9', memberName: 'Isabel Torres', memberEmail: 'isabel@example.com', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', reservedAt: '2026-07-06', queuePosition: 4, totalQueue: 9, estimatedAvailability: '2026-08-01', status: 'pending' },
  { id: 'res-5', memberId: 'm11', memberName: 'Karen Osei', memberEmail: 'karen@example.com', bookId: 'b2', bookTitle: 'Clean Code', bookAuthor: 'Robert C. Martin', reservedAt: '2026-07-04', queuePosition: 4, totalQueue: 5, estimatedAvailability: '2026-08-01', status: 'pending' },
  { id: 'res-6', memberId: 'm11', memberName: 'Karen Osei', memberEmail: 'karen@example.com', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', reservedAt: '2026-07-07', queuePosition: 6, totalQueue: 9, estimatedAvailability: '2026-08-10', status: 'pending' },
  { id: 'res-7', memberId: 'm13', memberName: 'Maya Patel', memberEmail: 'maya@example.com', bookId: 'b3', bookTitle: 'Designing Data-Intensive Applications', bookAuthor: 'Martin Kleppmann', reservedAt: '2026-07-08', queuePosition: 2, totalQueue: 3, estimatedAvailability: '2026-07-28', status: 'pending' },
  { id: 'res-8', memberId: 'm15', memberName: 'Olivia Scott', memberEmail: 'olivia@example.com', bookId: 'b29', bookTitle: '1984', bookAuthor: 'George Orwell', reservedAt: '2026-07-06', queuePosition: 1, totalQueue: 2, estimatedAvailability: '2026-07-20', status: 'pending' },
  { id: 'res-9', memberId: 'm18', memberName: 'Rachel Kim', memberEmail: 'rachel@example.com', bookId: 'b25', bookTitle: 'Sapiens', bookAuthor: 'Yuval Noah Harari', reservedAt: '2026-07-05', queuePosition: 2, totalQueue: 4, estimatedAvailability: '2026-07-25', status: 'pending' },
  { id: 'res-10', memberId: 'm20', memberName: 'Tanya Brown', memberEmail: 'tanya@example.com', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', reservedAt: '2026-07-07', queuePosition: 7, totalQueue: 9, estimatedAvailability: '2026-08-15', status: 'pending' },
  { id: 'res-11', memberId: 'm22', memberName: 'Vera Ivanova', memberEmail: 'vera@example.com', bookId: 'b12', bookTitle: 'Introduction to Algorithms', bookAuthor: 'Thomas H. Cormen et al.', reservedAt: '2026-07-06', queuePosition: 2, totalQueue: 3, estimatedAvailability: '2026-07-30', status: 'pending' },
  { id: 'res-12', memberId: 'm24', memberName: 'Xiao Li', memberEmail: 'xiao@example.com', bookId: 'b2', bookTitle: 'Clean Code', bookAuthor: 'Robert C. Martin', reservedAt: '2026-07-06', queuePosition: 5, totalQueue: 5, estimatedAvailability: '2026-08-08', status: 'pending' },
  { id: 'res-13', memberId: 'm2', memberName: 'Bob Martinez', memberEmail: 'bob@library.dev', bookId: 'b30', bookTitle: 'Dune', bookAuthor: 'Frank Herbert', reservedAt: '2026-07-08', queuePosition: 1, totalQueue: 2, estimatedAvailability: '2026-07-20', status: 'pending' },
  { id: 'res-14', memberId: 'm4', memberName: 'David Park', memberEmail: 'david@example.com', bookId: 'b28', bookTitle: 'The Intelligent Investor', bookAuthor: 'Benjamin Graham', reservedAt: '2026-07-07', queuePosition: 2, totalQueue: 3, estimatedAvailability: '2026-08-02', status: 'pending' },

  /* ── Ready for pickup ── */
  { id: 'res-15', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', reservedAt: '2026-06-28', expiresAt: '2026-07-13', queuePosition: 1, totalQueue: 3, status: 'ready', notifiedAt: '2026-07-10T08:00:00Z' },
  { id: 'res-16', memberId: 'm5', memberName: 'Eve Johnson', memberEmail: 'eve@example.com', bookId: 'b12', bookTitle: 'Introduction to Algorithms', bookAuthor: 'Thomas H. Cormen et al.', reservedAt: '2026-06-20', expiresAt: '2026-07-11', queuePosition: 1, totalQueue: 2, status: 'ready', notifiedAt: '2026-07-04T09:00:00Z' },
  { id: 'res-17', memberId: 'm16', memberName: 'Paul Chen', memberEmail: 'paul@example.com', bookId: 'b13', bookTitle: 'Python Crash Course', bookAuthor: 'Eric Matthes', reservedAt: '2026-06-25', expiresAt: '2026-07-14', queuePosition: 1, totalQueue: 2, status: 'ready', notifiedAt: '2026-07-07T10:00:00Z' },
  { id: 'res-18', memberId: 'm25', memberName: 'Yuki Tanaka', memberEmail: 'yuki@example.com', bookId: 'b5', bookTitle: 'System Design Interview', bookAuthor: 'Alex Xu', reservedAt: '2026-07-01', expiresAt: '2026-07-15', queuePosition: 1, totalQueue: 1, status: 'ready', notifiedAt: '2026-07-08T11:00:00Z' },

  /* ── Fulfilled ── */
  { id: 'res-19', memberId: 'm2', memberName: 'Bob Martinez', memberEmail: 'bob@library.dev', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', reservedAt: '2026-06-10', queuePosition: 1, totalQueue: 3, status: 'fulfilled' },
  { id: 'res-20', memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', bookId: 'b1', bookTitle: 'The Pragmatic Programmer', bookAuthor: 'David Thomas & Andrew Hunt', reservedAt: '2026-05-20', queuePosition: 1, totalQueue: 2, status: 'fulfilled' },
  { id: 'res-21', memberId: 'm7', memberName: 'Grace Kim', memberEmail: 'grace@example.com', bookId: 'b2', bookTitle: 'Clean Code', bookAuthor: 'Robert C. Martin', reservedAt: '2026-05-10', queuePosition: 1, totalQueue: 4, status: 'fulfilled' },
  { id: 'res-22', memberId: 'm13', memberName: 'Maya Patel', memberEmail: 'maya@example.com', bookId: 'b25', bookTitle: 'Sapiens', bookAuthor: 'Yuval Noah Harari', reservedAt: '2026-04-15', queuePosition: 1, totalQueue: 5, status: 'fulfilled' },
  { id: 'res-23', memberId: 'm18', memberName: 'Rachel Kim', memberEmail: 'rachel@example.com', bookId: 'b24', bookTitle: 'The Lean Startup', bookAuthor: 'Eric Ries', reservedAt: '2026-04-01', queuePosition: 1, totalQueue: 2, status: 'fulfilled' },
  { id: 'res-24', memberId: 'm22', memberName: 'Vera Ivanova', memberEmail: 'vera@example.com', bookId: 'b17', bookTitle: 'Domain-Driven Design', bookAuthor: 'Eric Evans', reservedAt: '2026-03-20', queuePosition: 1, totalQueue: 2, status: 'fulfilled' },

  /* ── Cancelled ── */
  { id: 'res-25', memberId: 'm4', memberName: 'David Park', memberEmail: 'david@example.com', bookId: 'b3', bookTitle: 'Designing Data-Intensive Applications', bookAuthor: 'Martin Kleppmann', reservedAt: '2026-06-01', queuePosition: 3, totalQueue: 4, status: 'cancelled' },
  { id: 'res-26', memberId: 'm9', memberName: 'Isabel Torres', memberEmail: 'isabel@example.com', bookId: 'b10', bookTitle: 'Thinking, Fast and Slow', bookAuthor: 'Daniel Kahneman', reservedAt: '2026-05-15', queuePosition: 2, totalQueue: 3, status: 'cancelled' },
  { id: 'res-27', memberId: 'm14', memberName: 'Noah Adams', memberEmail: 'noah@example.com', bookId: 'b27', bookTitle: 'Rich Dad Poor Dad', bookAuthor: 'Robert T. Kiyosaki', reservedAt: '2026-06-10', queuePosition: 2, totalQueue: 2, status: 'cancelled' },
  { id: 'res-28', memberId: 'm19', memberName: 'Sam Taylor', memberEmail: 'sam@example.com', bookId: 'b25', bookTitle: 'Sapiens', bookAuthor: 'Yuval Noah Harari', reservedAt: '2026-05-01', queuePosition: 4, totalQueue: 6, status: 'cancelled' },
  { id: 'res-29', memberId: 'm17', memberName: 'Quinn Rivera', memberEmail: 'quinn@example.com', bookId: 'b29', bookTitle: '1984', bookAuthor: 'George Orwell', reservedAt: '2026-06-15', queuePosition: 3, totalQueue: 4, status: 'cancelled' },
  { id: 'res-30', memberId: 'm10', memberName: 'James Wright', memberEmail: 'james@example.com', bookId: 'b24', bookTitle: 'The Lean Startup', bookAuthor: 'Eric Ries', reservedAt: '2026-03-10', queuePosition: 1, totalQueue: 3, status: 'cancelled' },
];

export function getReservationsByMember(memberId: string): MockReservation[] {
  return RESERVATIONS.filter(r => r.memberId === memberId);
}

export function getReservationsByBook(bookId: string): MockReservation[] {
  return RESERVATIONS.filter(r => r.bookId === bookId);
}

export function getPendingReservations(): MockReservation[] {
  return RESERVATIONS.filter(r => r.status === 'pending');
}

export function getReadyReservations(): MockReservation[] {
  return RESERVATIONS.filter(r => r.status === 'ready');
}
