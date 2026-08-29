import { BookOpen, AlertTriangle, LayoutGrid, List } from "lucide-react";
import { BOOKS, CATEGORIES } from "@/mock/portalData";

import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/SearchBar";
import EmptyState from "@/components/ui/EmptyState";
import BookCard, { BookListCard } from "@/components/features/BookCard";
import styles from "@/styles/user-shared.module.css";
import type { Category, MockBook } from "@/mock/mock/types";
import FilterBar from "@/components/features/user-books-filterbar";



import { BookCardWrapper, BookListCardWrapper } from "./samplecomponents";
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
  const params = await searchParams;
  const { q, sort, category, availableOnly, viewMode } = params;
  const query = q ?? "";

  

  const filtered = (() => {
    let list = BOOKS;
    if (
      category &&
      (Array.isArray(category) ? category.length > 0 : category !== "All")
    ) {
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

      {/* Filters */}
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
          {filtered.map((b) => (
            <BookCardWrapper key={b.id} b={b} />
          ))}
        </div>
      ) : (
        <div className={styles.cardList}>
          {filtered.map((b) => (
            <BookListCardWrapper key={b.id} b={b} />
          ))}
        </div>
      )}
    </div>
  );
}
