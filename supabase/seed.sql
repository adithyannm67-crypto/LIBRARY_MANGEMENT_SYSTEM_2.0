-- Seed members table with initial data
INSERT INTO members (member_id, name, email, phone, avatarInitials, role, member_status, tier, memberSince, institution, bio, borrowCount, activeLoans, overdueCount, returnedCount, reservationCount, fines, totalFinesPaid, favoriteCategory, totalReadingHours, lastActivity)
VALUES
  ('m1', 'Alice Chen', 'alice@library.dev', '+1-555-234-5678', 'AC', 'admin', 'active', 'Staff', '2024-09-01', 'State University', 'Software engineer and lifelong reader. Currently exploring distributed systems.', 34, 3, 1, 30, 2, 0.50, 2.25, 'Engineering', 312, '2026-07-10'),
  ('m2', 'Bob Martinez', 'bob@library.dev', '+1-555-345-6789', 'BM', 'user', 'active', 'Standard', '2024-10-15', 'City College', 'Data analyst who reads everything from algorithms to philosophy.', 22, 2, 0, 20, 1, 0, 1.00, 'Self-Help', 198, '2026-07-09'),
  ('m3', 'Carol Diaz', 'carol@example.com', '+1-555-456-1234', 'CD', 'user', 'active', 'Premium', '2024-11-01', NULL, 'Product designer who reads voraciously across psychology and technology.', 41, 4, 1, 36, 2, 1.25, 5.75, 'Psychology', 387, '2026-07-08'),
  ('m4', 'David Park', 'david@example.com', '+1-555-456-7890', 'DP', 'user', 'active', 'Standard', '2024-08-20', 'Tech Institute', NULL, 14, 1, 0, 13, 0, 1.25, 3.50, 'Engineering', 134, '2026-07-05'),
  ('m5', 'Eve Johnson', 'eve@example.com', NULL, 'EJ', 'user', 'active', 'Standard', '2025-01-10', NULL, NULL, 9, 0, 0, 9, 1, 0, 0, 'Algorithms', 87, '2026-06-28'),
  ('m6', 'Frank Lee', 'frank@example.com', '+1-555-567-8901', 'FL', 'user', 'suspended', 'Standard', '2024-07-15', NULL, NULL, 11, 0, 3, 8, 0, 8.75, 0, 'Self-Help', 98, '2026-05-20'),
  ('m7', 'Grace Kim', 'grace@example.com', '+1-555-678-1234', 'GK', 'user', 'active', 'Premium', '2024-12-05', 'State University', 'Backend engineer passionate about distributed systems and clean architecture.', 28, 3, 0, 25, 1, 0, 0.75, 'Engineering', 264, '2026-07-07'),
  ('m8', 'Henry Wilson', 'henry@example.com', '+1-555-678-9012', 'HW', 'user', 'active', 'Standard', '2025-02-14', 'State University', NULL, 8, 1, 0, 7, 0, 0, 0, 'Science', 76, '2026-07-03'),
  ('m9', 'Isabel Torres', 'isabel@example.com', '+1-555-789-2345', 'IT', 'user', 'active', 'Standard', '2025-03-01', NULL, NULL, 6, 2, 0, 4, 1, 0, 0, 'Fiction', 54, '2026-07-01'),
  ('m10', 'James Wright', 'james@example.com', '+1-555-789-0123', 'JW', 'user', 'expired', 'Standard', '2024-09-30', 'City College', NULL, 17, 0, 0, 17, 0, 0, 4.50, 'Business', 162, '2026-04-15'),
  ('m11', 'Karen Osei', 'karen@example.com', '+1-555-890-1234', 'KO', 'user', 'active', 'Premium', '2024-10-01', NULL, 'UX researcher and avid reader across psychology and design.', 25, 2, 0, 23, 2, 0, 0, 'Psychology', 231, '2026-07-06'),
  ('m12', 'Liam Nguyen', 'liam@example.com', NULL, 'LN', 'user', 'active', 'Standard', '2025-04-01', NULL, NULL, 4, 1, 0, 3, 0, 0, 0, 'JavaScript', 38, '2026-06-30'),
  ('m13', 'Maya Patel', 'maya@example.com', '+1-555-901-2345', 'MP', 'user', 'active', 'Premium', '2024-09-15', 'Research Institute', 'Machine learning engineer who reads broadly across science and business.', 32, 2, 0, 30, 1, 0, 1.50, 'Science', 298, '2026-07-08'),
  ('m14', 'Noah Adams', 'noah@example.com', '+1-555-012-3456', 'NA', 'user', 'active', 'Standard', '2025-05-01', NULL, NULL, 3, 1, 0, 2, 0, 0, 0, 'Finance', 28, '2026-07-02'),
  ('m15', 'Olivia Scott', 'olivia@example.com', NULL, 'OS', 'user', 'active', 'Standard', '2025-06-01', NULL, NULL, 2, 0, 0, 2, 1, 0, 0, 'Fiction', 19, '2026-06-25'),
  ('m16', 'Paul Chen', 'paul@example.com', '+1-555-123-4567', 'PC', 'user', 'active', 'Standard', '2025-01-20', 'Tech Institute', NULL, 12, 1, 0, 11, 0, 0, 0.75, 'Python', 112, '2026-07-04'),
  ('m17', 'Quinn Rivera', 'quinn@example.com', NULL, 'QR', 'user', 'active', 'Standard', '2025-02-28', NULL, NULL, 7, 1, 0, 6, 0, 0, 0, 'History', 68, '2026-06-28'),
  ('m18', 'Rachel Kim', 'rachel@example.com', '+1-555-234-6789', 'RK', 'user', 'active', 'Premium', '2024-11-15', 'City College', 'Finance professional who reads both classic investing literature and modern tech.', 19, 2, 0, 17, 1, 0, 2.00, 'Finance', 176, '2026-07-06'),
  ('m19', 'Sam Taylor', 'sam@example.com', '+1-555-345-7890', 'ST', 'user', 'active', 'Standard', '2025-03-15', NULL, NULL, 5, 0, 0, 5, 0, 0, 0, 'Business', 47, '2026-06-20'),
  ('m20', 'Tanya Brown', 'tanya@example.com', NULL, 'TB', 'user', 'active', 'Standard', '2025-04-20', NULL, NULL, 4, 2, 0, 2, 1, 0, 0, 'Self-Help', 37, '2026-07-05');
