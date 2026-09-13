"use client";

import { useState } from "react";
import styles from "@/styles/admin-shared.module.css";
import BookRow from "@/components/features/admin-books-row";
import BookFormModal from "@/components/features/admin-book-form-modal";
import DeleteBookModal from "@/components/features/admin-delete-book-modal";
import type { Book } from "@/types/database";

export default function BooksTable({ books }: { books: Book[] }) {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Book", "ISBN", "Category", "Copies", "Rating", ""].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <BookRow
                key={b.book_id}
                b={b}
                onEdit={(book) => setEditingBook(book)}
                onDelete={(book) => setDeletingBook(book)}
              />
            ))}
          </tbody>
        </table>
        {books.length === 0 && (
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
      {editingBook && (
        <BookFormModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSaved={() => {
            setEditingBook(null);
            window.location.reload();
          }}
        />
      )}
      {deletingBook && (
        <DeleteBookModal
          book={deletingBook}
          onClose={() => setDeletingBook(null)}
          onDeleted={() => {
            setDeletingBook(null);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}
