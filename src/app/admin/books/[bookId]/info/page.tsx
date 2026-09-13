import styles from "@/styles/admin-shared.module.css";

import { createClient } from "@/lib/server";
import { getCategoryForBook } from "@/utils/dbUtils";
import type { Book } from "@/types/database";

interface Props {
  params: Promise<{ bookId: string }>;
}

export default async function AdminBookInfoPage({ params }: Props) {
  const { bookId } = await params;

  const supabase = await createClient();
  const { data: book } = await supabase
    .from("books_with_authors")
    .select("*")
    .eq("book_id", bookId)
    .single<Book>();

  if (!book) return null;

  const category = await getCategoryForBook(book);

  const bookBody = [
    ["ISBN", book.isbn],
    ["Publisher", book.publisher],
    ["Year", book.published_year],
    ["Pages", book.pages],
    ["Category", category?.name ?? book.category],
    ["Subcategory", book.subcategory],
    ["Language", book.language],
  ];

  const bookStats = [
    ["Total Copies", book.total_copies],
    ["Available", book.available_copies],
    ["Rating", `★ ${book.rating.toFixed(1)}`],
    ["Reviews", book.review_count],
  ];

  if (category?.book_count != null) {
    bookStats.push(["Books in Category", category.book_count]);
  }

  return (
    <div className={styles.twoCol}>
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>Book Information</span>
        </div>
        <div className={styles.sectionBody}>
          {bookBody.map(([l, v]) => (
            <div key={l} className={styles.miniStat}>
              <span className={styles.miniStatLabel}>{l}</span>
              <span className={styles.miniStatValue}>{v}</span>
            </div>
          ))}
          <div
            style={{
              marginTop: 12,
              fontSize: 13,
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
            }}
          >
            {book.description}
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>Circulation Stats</span>
        </div>
        <div className={styles.sectionBody}>
          {bookStats.map(([l, v]) => (
            <div key={l} className={styles.miniStat}>
              <span className={styles.miniStatLabel}>{l}</span>
              <span className={styles.miniStatValue}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}