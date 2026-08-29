import type { MockBorrow } from './types';

export const BORROWS: MockBorrow[] = [
  /* ── Active ── */
  { id: 'bor-1', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookId: 'b1', bookTitle: 'The Pragmatic Programmer', bookAuthor: 'David Thomas & Andrew Hunt', borrowedAt: '2026-06-20', dueAt: '2026-07-20', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-2', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookId: 'b8', bookTitle: 'Deep Work', bookAuthor: 'Cal Newport', borrowedAt: '2026-06-28', dueAt: '2026-07-28', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-3', memberId: 'm2', memberName: 'Bob Martinez', memberEmail: 'bob@library.dev', bookId: 'b5', bookTitle: 'System Design Interview', bookAuthor: 'Alex Xu', borrowedAt: '2026-06-25', dueAt: '2026-07-25', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-4', memberId: 'm2', memberName: 'Bob Martinez', memberEmail: 'bob@library.dev', bookId: 'b10', bookTitle: 'Thinking, Fast and Slow', bookAuthor: 'Daniel Kahneman', borrowedAt: '2026-07-01', dueAt: '2026-07-29', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-5', memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', borrowedAt: '2026-07-01', dueAt: '2026-07-29', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-6', memberId: 'm4', memberName: 'David Park', memberEmail: 'david@example.com', bookId: 'b9', bookTitle: 'Refactoring', bookAuthor: 'Martin Fowler', borrowedAt: '2026-07-05', dueAt: '2026-08-02', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-7', memberId: 'm7', memberName: 'Grace Kim', memberEmail: 'grace@example.com', bookId: 'b4', bookTitle: "You Don't Know JS Yet", bookAuthor: 'Kyle Simpson', borrowedAt: '2026-06-22', dueAt: '2026-07-22', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-8', memberId: 'm7', memberName: 'Grace Kim', memberEmail: 'grace@example.com', bookId: 'b11', bookTitle: 'The Phoenix Project', bookAuthor: 'Gene Kim et al.', borrowedAt: '2026-07-03', dueAt: '2026-08-01', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-9', memberId: 'm8', memberName: 'Henry Wilson', memberEmail: 'henry@example.com', bookId: 'b26', bookTitle: 'A Brief History of Time', bookAuthor: 'Stephen Hawking', borrowedAt: '2026-07-04', dueAt: '2026-08-01', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-10', memberId: 'm9', memberName: 'Isabel Torres', memberEmail: 'isabel@example.com', bookId: 'b29', bookTitle: '1984', bookAuthor: 'George Orwell', borrowedAt: '2026-07-06', dueAt: '2026-08-03', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-11', memberId: 'm9', memberName: 'Isabel Torres', memberEmail: 'isabel@example.com', bookId: 'b30', bookTitle: 'Dune', bookAuthor: 'Frank Herbert', borrowedAt: '2026-07-06', dueAt: '2026-08-03', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-12', memberId: 'm11', memberName: 'Karen Osei', memberEmail: 'karen@example.com', bookId: 'b22', bookTitle: 'Mindset', bookAuthor: 'Carol S. Dweck', borrowedAt: '2026-07-02', dueAt: '2026-07-30', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-13', memberId: 'm11', memberName: 'Karen Osei', memberEmail: 'karen@example.com', bookId: 'b21', bookTitle: 'The Power of Habit', bookAuthor: 'Charles Duhigg', borrowedAt: '2026-06-28', dueAt: '2026-07-26', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-14', memberId: 'm12', memberName: 'Liam Nguyen', memberEmail: 'liam@example.com', bookId: 'b20', bookTitle: 'Eloquent JavaScript', bookAuthor: 'Marijn Haverbeke', borrowedAt: '2026-07-07', dueAt: '2026-08-04', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-15', memberId: 'm13', memberName: 'Maya Patel', memberEmail: 'maya@example.com', bookId: 'b25', bookTitle: 'Sapiens', bookAuthor: 'Yuval Noah Harari', borrowedAt: '2026-06-30', dueAt: '2026-07-28', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-16', memberId: 'm13', memberName: 'Maya Patel', memberEmail: 'maya@example.com', bookId: 'b17', bookTitle: 'Domain-Driven Design', bookAuthor: 'Eric Evans', borrowedAt: '2026-07-08', dueAt: '2026-08-05', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-17', memberId: 'm14', memberName: 'Noah Adams', memberEmail: 'noah@example.com', bookId: 'b28', bookTitle: 'The Intelligent Investor', bookAuthor: 'Benjamin Graham', borrowedAt: '2026-07-05', dueAt: '2026-08-02', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-18', memberId: 'm16', memberName: 'Paul Chen', memberEmail: 'paul@example.com', bookId: 'b13', bookTitle: 'Python Crash Course', bookAuthor: 'Eric Matthes', borrowedAt: '2026-07-03', dueAt: '2026-07-31', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-19', memberId: 'm17', memberName: 'Quinn Rivera', memberEmail: 'quinn@example.com', bookId: 'b25', bookTitle: 'Sapiens', bookAuthor: 'Yuval Noah Harari', borrowedAt: '2026-06-29', dueAt: '2026-07-27', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-20', memberId: 'm18', memberName: 'Rachel Kim', memberEmail: 'rachel@example.com', bookId: 'b27', bookTitle: 'Rich Dad Poor Dad', bookAuthor: 'Robert T. Kiyosaki', borrowedAt: '2026-07-04', dueAt: '2026-08-01', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-21', memberId: 'm18', memberName: 'Rachel Kim', memberEmail: 'rachel@example.com', bookId: 'b23', bookTitle: 'Zero to One', bookAuthor: 'Peter Thiel & Blake Masters', borrowedAt: '2026-07-01', dueAt: '2026-07-29', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-22', memberId: 'm20', memberName: 'Tanya Brown', memberEmail: 'tanya@example.com', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', borrowedAt: '2026-07-06', dueAt: '2026-08-03', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-23', memberId: 'm21', memberName: 'Umar Hassan', memberEmail: 'umar@example.com', bookId: 'b12', bookTitle: 'Introduction to Algorithms', bookAuthor: 'Thomas H. Cormen et al.', borrowedAt: '2026-07-07', dueAt: '2026-08-04', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-24', memberId: 'm22', memberName: 'Vera Ivanova', memberEmail: 'vera@example.com', bookId: 'b3', bookTitle: 'Designing Data-Intensive Applications', bookAuthor: 'Martin Kleppmann', borrowedAt: '2026-07-02', dueAt: '2026-07-30', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-25', memberId: 'm22', memberName: 'Vera Ivanova', memberEmail: 'vera@example.com', bookId: 'b15', bookTitle: 'The Clean Coder', bookAuthor: 'Robert C. Martin', borrowedAt: '2026-06-25', dueAt: '2026-07-23', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-26', memberId: 'm22', memberName: 'Vera Ivanova', memberEmail: 'vera@example.com', bookId: 'b19', bookTitle: 'Code Complete', bookAuthor: 'Steve McConnell', borrowedAt: '2026-06-18', dueAt: '2026-07-16', renewCount: 1, maxRenews: 2, status: 'active' },
  { id: 'bor-27', memberId: 'm23', memberName: 'Will Foster', memberEmail: 'will@example.com', bookId: 'b30', bookTitle: 'Dune', bookAuthor: 'Frank Herbert', borrowedAt: '2026-07-05', dueAt: '2026-08-02', renewCount: 0, maxRenews: 2, status: 'active' },
  { id: 'bor-28', memberId: 'm24', memberName: 'Xiao Li', memberEmail: 'xiao@example.com', bookId: 'b3', bookTitle: 'Designing Data-Intensive Applications', bookAuthor: 'Martin Kleppmann', borrowedAt: '2026-06-15', dueAt: '2026-07-13', renewCount: 1, maxRenews: 2, status: 'active' },
  { id: 'bor-29', memberId: 'm25', memberName: 'Yuki Tanaka', memberEmail: 'yuki@example.com', bookId: 'b14', bookTitle: 'TypeScript Deep Dive', bookAuthor: 'Basarat Ali Syed', borrowedAt: '2026-07-01', dueAt: '2026-07-29', renewCount: 0, maxRenews: 2, status: 'active' },

  /* ── Overdue ── */
  { id: 'bor-30', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookId: 'b3', bookTitle: 'Designing Data-Intensive Applications', bookAuthor: 'Martin Kleppmann', borrowedAt: '2026-06-10', dueAt: '2026-07-08', renewCount: 1, maxRenews: 2, status: 'overdue', fine: 0.50, notes: 'Member contacted, returning soon' },
  { id: 'bor-31', memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', bookId: 'b2', bookTitle: 'Clean Code', bookAuthor: 'Robert C. Martin', borrowedAt: '2026-06-15', dueAt: '2026-07-05', renewCount: 1, maxRenews: 2, status: 'overdue', fine: 1.25 },
  { id: 'bor-32', memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', bookId: 'b21', bookTitle: 'The Power of Habit', bookAuthor: 'Charles Duhigg', borrowedAt: '2026-06-01', dueAt: '2026-07-01', renewCount: 0, maxRenews: 2, status: 'overdue', fine: 2.25 },
  { id: 'bor-33', memberId: 'm6', memberName: 'Frank Lee', memberEmail: 'frank@example.com', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', borrowedAt: '2026-04-01', dueAt: '2026-05-01', renewCount: 0, maxRenews: 2, status: 'overdue', fine: 4.50, notes: 'Account suspended due to outstanding fines' },
  { id: 'bor-34', memberId: 'm6', memberName: 'Frank Lee', memberEmail: 'frank@example.com', bookId: 'b23', bookTitle: 'Zero to One', bookAuthor: 'Peter Thiel', borrowedAt: '2026-04-10', dueAt: '2026-05-10', renewCount: 0, maxRenews: 2, status: 'overdue', fine: 4.25, notes: 'Account suspended due to outstanding fines' },
  { id: 'bor-35', memberId: 'm20', memberName: 'Tanya Brown', memberEmail: 'tanya@example.com', bookId: 'b8', bookTitle: 'Deep Work', bookAuthor: 'Cal Newport', borrowedAt: '2026-06-05', dueAt: '2026-07-03', renewCount: 0, maxRenews: 2, status: 'overdue', fine: 0.75 },

  /* ── Returned ── */
  { id: 'bor-36', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookId: 'b4', bookTitle: "You Don't Know JS Yet", bookAuthor: 'Kyle Simpson', borrowedAt: '2026-04-01', dueAt: '2026-05-01', returnedAt: '2026-04-28', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-37', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', borrowedAt: '2026-03-10', dueAt: '2026-04-10', returnedAt: '2026-04-09', renewCount: 1, maxRenews: 2, status: 'returned' },
  { id: 'bor-38', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookId: 'b10', bookTitle: 'Thinking, Fast and Slow', bookAuthor: 'Daniel Kahneman', borrowedAt: '2026-02-14', dueAt: '2026-03-14', returnedAt: '2026-03-12', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-39', memberId: 'm1', memberName: 'Alice Chen', memberEmail: 'alice@library.dev', bookId: 'b5', bookTitle: 'System Design Interview', bookAuthor: 'Alex Xu', borrowedAt: '2026-01-20', dueAt: '2026-02-20', returnedAt: '2026-02-18', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-40', memberId: 'm2', memberName: 'Bob Martinez', memberEmail: 'bob@library.dev', bookId: 'b7', bookTitle: 'Atomic Habits', bookAuthor: 'James Clear', borrowedAt: '2026-03-10', dueAt: '2026-04-10', returnedAt: '2026-04-09', renewCount: 1, maxRenews: 2, status: 'returned' },
  { id: 'bor-41', memberId: 'm2', memberName: 'Bob Martinez', memberEmail: 'bob@library.dev', bookId: 'b22', bookTitle: 'Mindset', bookAuthor: 'Carol S. Dweck', borrowedAt: '2026-02-01', dueAt: '2026-03-01', returnedAt: '2026-02-27', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-42', memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', bookId: 'b10', bookTitle: 'Thinking, Fast and Slow', bookAuthor: 'Daniel Kahneman', borrowedAt: '2026-02-14', dueAt: '2026-03-14', returnedAt: '2026-03-12', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-43', memberId: 'm4', memberName: 'David Park', memberEmail: 'david@example.com', bookId: 'b1', bookTitle: 'The Pragmatic Programmer', bookAuthor: 'David Thomas & Andrew Hunt', borrowedAt: '2026-03-01', dueAt: '2026-03-29', returnedAt: '2026-03-27', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-44', memberId: 'm5', memberName: 'Eve Johnson', memberEmail: 'eve@example.com', bookId: 'b6', bookTitle: 'The Art of Computer Programming', bookAuthor: 'Donald E. Knuth', borrowedAt: '2026-01-20', dueAt: '2026-02-20', returnedAt: '2026-02-19', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-45', memberId: 'm7', memberName: 'Grace Kim', memberEmail: 'grace@example.com', bookId: 'b2', bookTitle: 'Clean Code', bookAuthor: 'Robert C. Martin', borrowedAt: '2026-04-05', dueAt: '2026-05-05', returnedAt: '2026-05-02', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-46', memberId: 'm7', memberName: 'Grace Kim', memberEmail: 'grace@example.com', bookId: 'b9', bookTitle: 'Refactoring', bookAuthor: 'Martin Fowler', borrowedAt: '2026-02-20', dueAt: '2026-03-20', returnedAt: '2026-03-18', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-47', memberId: 'm8', memberName: 'Henry Wilson', memberEmail: 'henry@example.com', bookId: 'b12', bookTitle: 'Introduction to Algorithms', bookAuthor: 'Thomas H. Cormen et al.', borrowedAt: '2026-05-01', dueAt: '2026-05-29', returnedAt: '2026-05-27', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-48', memberId: 'm10', memberName: 'James Wright', memberEmail: 'james@example.com', bookId: 'b23', bookTitle: 'Zero to One', bookAuthor: 'Peter Thiel & Blake Masters', borrowedAt: '2026-01-10', dueAt: '2026-02-10', returnedAt: '2026-02-08', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-49', memberId: 'm11', memberName: 'Karen Osei', memberEmail: 'karen@example.com', bookId: 'b10', bookTitle: 'Thinking, Fast and Slow', bookAuthor: 'Daniel Kahneman', borrowedAt: '2026-04-10', dueAt: '2026-05-10', returnedAt: '2026-05-07', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-50', memberId: 'm13', memberName: 'Maya Patel', memberEmail: 'maya@example.com', bookId: 'b26', bookTitle: 'A Brief History of Time', bookAuthor: 'Stephen Hawking', borrowedAt: '2026-03-15', dueAt: '2026-04-15', returnedAt: '2026-04-14', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-51', memberId: 'm13', memberName: 'Maya Patel', memberEmail: 'maya@example.com', bookId: 'b11', bookTitle: 'The Phoenix Project', bookAuthor: 'Gene Kim et al.', borrowedAt: '2026-02-01', dueAt: '2026-03-01', returnedAt: '2026-02-27', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-52', memberId: 'm18', memberName: 'Rachel Kim', memberEmail: 'rachel@example.com', bookId: 'b28', bookTitle: 'The Intelligent Investor', bookAuthor: 'Benjamin Graham', borrowedAt: '2026-05-01', dueAt: '2026-06-01', returnedAt: '2026-05-30', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-53', memberId: 'm3', memberName: 'Carol Diaz', memberEmail: 'carol@example.com', bookId: 'b25', bookTitle: 'Sapiens', bookAuthor: 'Yuval Noah Harari', borrowedAt: '2026-05-15', dueAt: '2026-06-15', returnedAt: '2026-06-12', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-54', memberId: 'm11', memberName: 'Karen Osei', memberEmail: 'karen@example.com', bookId: 'b22', bookTitle: 'Mindset', bookAuthor: 'Carol S. Dweck', borrowedAt: '2026-05-20', dueAt: '2026-06-20', returnedAt: '2026-06-18', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-55', memberId: 'm16', memberName: 'Paul Chen', memberEmail: 'paul@example.com', bookId: 'b13', bookTitle: 'Python Crash Course', bookAuthor: 'Eric Matthes', borrowedAt: '2026-04-01', dueAt: '2026-05-01', returnedAt: '2026-04-29', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-56', memberId: 'm22', memberName: 'Vera Ivanova', memberEmail: 'vera@example.com', bookId: 'b1', bookTitle: 'The Pragmatic Programmer', bookAuthor: 'David Thomas & Andrew Hunt', borrowedAt: '2026-03-20', dueAt: '2026-04-20', returnedAt: '2026-04-18', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-57', memberId: 'm22', memberName: 'Vera Ivanova', memberEmail: 'vera@example.com', bookId: 'b5', bookTitle: 'System Design Interview', bookAuthor: 'Alex Xu', borrowedAt: '2026-02-15', dueAt: '2026-03-15', returnedAt: '2026-03-14', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-58', memberId: 'm24', memberName: 'Xiao Li', memberEmail: 'xiao@example.com', bookId: 'b17', bookTitle: 'Domain-Driven Design', bookAuthor: 'Eric Evans', borrowedAt: '2026-04-20', dueAt: '2026-05-20', returnedAt: '2026-05-17', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-59', memberId: 'm25', memberName: 'Yuki Tanaka', memberEmail: 'yuki@example.com', bookId: 'b4', bookTitle: "You Don't Know JS Yet", bookAuthor: 'Kyle Simpson', borrowedAt: '2026-03-01', dueAt: '2026-04-01', returnedAt: '2026-03-29', renewCount: 0, maxRenews: 2, status: 'returned' },
  { id: 'bor-60', memberId: 'm7', memberName: 'Grace Kim', memberEmail: 'grace@example.com', bookId: 'b3', bookTitle: 'Designing Data-Intensive Applications', bookAuthor: 'Martin Kleppmann', borrowedAt: '2026-01-15', dueAt: '2026-02-15', returnedAt: '2026-02-13', renewCount: 0, maxRenews: 2, status: 'returned' },
];

export function getBorrowsByMember(memberId: string): MockBorrow[] {
  return BORROWS.filter(b => b.memberId === memberId);
}

export function getBorrowsByBook(bookId: string): MockBorrow[] {
  return BORROWS.filter(b => b.bookId === bookId);
}

export function getActiveBorrows(): MockBorrow[] {
  return BORROWS.filter(b => b.status === 'active');
}

export function getOverdueBorrows(): MockBorrow[] {
  return BORROWS.filter(b => b.status === 'overdue');
}

export function getReturnedBorrows(): MockBorrow[] {
  return BORROWS.filter(b => b.status === 'returned');
}
