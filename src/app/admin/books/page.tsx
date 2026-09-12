
import { Plus } from "lucide-react";

import { ADMIN_CATEGORIES } from "@/mock/adminData";
import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";

import Filterbar from "@/components/features/admin-filterBar";
import BookRow from "@/components/features/admin-books-row";
import { createClient } from '@/lib/server'
import type { Book } from '@/types/database'


interface Props {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    cat?: string;
    filter?: string;
  }>;
}

export default async function AdminBooksPage({ searchParams }: Props) {
  
   const supabase = await createClient()
 
  // Fetch rows from a table
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .returns<Book[]>()
 
  if (error) console.error(error)
 
  console.log(data)
  const params = await searchParams;
  const { q, sort, cat, filter } = params;
  const query = q ?? "";
  const status = filter;

  const cats = ["All", ...ADMIN_CATEGORIES.map((c) => c.name)];

  const books: Book[] = data ?? [];

  const filtered = books.filter((b) => {
    const q = query.toLowerCase();
    if (
      q &&
      !b.title.toLowerCase().includes(q) &&
      !b.author.toLowerCase().includes(q) &&
      !b.isbn.includes(q)
    )
      return false;
    if (cat !== "All" && b.category !== cat) return false;
    return true;
  }  ).sort((a, b) =>
    sort === "rating"
      ? b.rating - a.rating
      : a.title.localeCompare(b.title),
  );

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Books</h1>
          <p className={styles.pageSub}>
            {books.length} titles in catalog
          </p>
        </div>
        <div className={styles.pageActions}>
          <Button variant="primary" size="sm" leadingIcon={<Plus size={14} />}>
            Add Book
          </Button>
        </div>
      </div>

      <Filterbar cats={cats} />

      <div className={styles.section}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  "Book",
                  "ISBN",
                  "Category",
                  "Copies",
                  "Rating",
                  "",
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <BookRow key={b.book_id} b={b} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p
              style={{
                textAlign: "center",
                padding: "32px",
                fontSize: 13,
                color: "var(--muted-foreground)",
                margin: 0,
              }}
            >
              No books match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
