-- Seed authors table with initial data
INSERT INTO authors (author_id, name, nationality, book_count, borrow_count, rating, bio)
VALUES
  ('au1', 'Robert C. Martin', 'American', 2, 230, 4.55, 'Software engineer known as "Uncle Bob". Author of Clean Code and The Clean Coder. Advocate for software craftsmanship.'),
  ('au2', 'Martin Fowler', 'British', 1, 72, 4.70, 'Chief Scientist at ThoughtWorks. Author of Refactoring and Patterns of Enterprise Application Architecture.'),
  ('au3', 'Martin Kleppmann', 'British-German', 1, 138, 4.90, 'Researcher at Cambridge University. Expert in distributed systems and stream processing.'),
  ('au4', 'Donald E. Knuth', 'American', 1, 44, 4.40, 'Professor Emeritus at Stanford. Author of The Art of Computer Programming, creator of TeX.'),
  ('au5', 'James Clear', 'American', 1, 291, 4.80, 'Author and speaker focused on habits, decision-making, and continuous improvement.'),
  ('au6', 'Cal Newport', 'American', 1, 134, 4.60, 'Professor of Computer Science at Georgetown. Bestselling author on deep work and digital minimalism.'),
  ('au7', 'Daniel Kahneman', 'Israeli-American', 1, 267, 4.70, 'Nobel Prize-winning psychologist known for behavioral economics and prospect theory.'),
  ('au8', 'Kyle Simpson', 'American', 1, 89, 4.70, 'JavaScript educator and open-source advocate. Known for the ''You Don''t Know JS'' series.'),
  ('au9', 'Eric Matthes', 'American', 1, 98, 4.70, 'Computer science instructor and author specializing in beginner-friendly Python education.'),
  ('au10', 'Yuval Noah Harari', 'Israeli', 1, 312, 4.60, 'Professor of History at the Hebrew University of Jerusalem. Bestselling author of Sapiens and Homo Deus.'),
  ('au11', 'Peter Thiel', 'American', 1, 243, 4.40, 'Entrepreneur, investor, and PayPal co-founder. Co-author of Zero to One with Blake Masters.'),
  ('au12', 'Eric Ries', 'American', 1, 198, 4.30, 'Entrepreneur and author. Creator of the Lean Startup methodology.'),
  ('au13', 'Benjamin Graham', 'British-American', 1, 167, 4.60, 'Economist and investor known as the "father of value investing". Mentor to Warren Buffett.'),
  ('au14', 'Stephen Hawking', 'British', 1, 187, 4.50, 'Theoretical physicist and cosmologist at Cambridge. Author of A Brief History of Time.'),
  ('au15', 'George Orwell', 'British', 1, 421, 4.70, 'Novelist and essayist, known for his lucid prose and acute political awareness. Author of 1984 and Animal Farm.');
