import styles from "@/styles/user-shared.module.css";

import { BookOpen } from "lucide-react";

import EmptyState from "@/components/ui/EmptyState";
import BookCard, { BookListCard } from "@/components/features/BookCard";

import FilterBar from "@/components/features/user-books-filterbar";
import { createClient } from '@/lib/server'
import type { Book } from '@/types/database'


interface Props {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    category?: string | string[];
    viewMode?: string;
    availableOnly?: string;
  }>;
}

export default async function BrowsePage({ searchParams }: Props) {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('books')
    .select('*')
    .returns<Book[]>()
 
  if (error) console.error(error)

    
 
  const params = await searchParams;
  const { q, sort, category, availableOnly, viewMode } = params;
  const query = q ?? "";

  const filtered = (() => {
    let list: Book[] = data ?? [];

    if ( category && (Array.isArray(category) ? category.length > 0 : category !== "All") ) {
      list = list.filter((b) => category.includes(String(b.category)));
    }
    if (availableOnly) {
      list = list.filter((b) => b.availableCopies > 0);
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.tags.some((t) => t.includes(q)),
      );
    }
    if (sort === "rating") {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    if (sort === "title") {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return [...list].sort((a, b) => b.publishedYear - a.publishedYear);
  })();
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Browse Books</h1>
          <p className={styles.pageSub}>{filtered.length} books in catalog</p>
        </div>
      </div>

    
      <FilterBar />

      {filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen size={22} />}
          title="No books found"
          description="Try a different search or category."
          compact
        />
      ) : viewMode === "grid" ? (
        <div className={styles.autoGrid}>
          {filtered.map((b) => ( <BookCard key={b.id} book={b} /> ))}
        </div>
      ) : (
        <div className={styles.cardList}>
          {filtered.map((b) => ( <BookListCard key={b.id} book={b} /> ))}
        </div>
      )}
    </div>
  );
}
