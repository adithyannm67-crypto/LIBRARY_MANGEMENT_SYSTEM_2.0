"use client";

import { useState } from "react";
import styles from "@/styles/admin-shared.module.css";
import AutherRow from "@/components/features/admin-authers-row";
import AuthorFormModal from "@/components/features/admin-author-form-modal";
import DeleteAuthorModal from "@/components/features/admin-delete-author-modal";
import type { Author } from "@/types/database";

export default function AuthersTable({ authors }: { authors: Author[] }) {
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [deletingAuthor, setDeletingAuthor] = useState<Author | null>(null);

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Author", "Nationality", "Books", "Rating", ""].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {authors.map((a) => (
              <AutherRow
                key={a.author_id}
                a={a}
                onEdit={(author) => setEditingAuthor(author)}
                onDelete={(author) => setDeletingAuthor(author)}
              />
            ))}
          </tbody>
        </table>
        {authors.length === 0 && (
          <p
            style={{
              textAlign: "center",
              padding: "32px",
              fontSize: 13,
              color: "var(--muted-foreground)",
              margin: 0,
            }}
          >
            No authors match.
          </p>
        )}
      </div>
      {editingAuthor && (
        <AuthorFormModal
          author={editingAuthor}
          onClose={() => setEditingAuthor(null)}
          onSaved={() => {
            setEditingAuthor(null);
            window.location.reload();
          }}
        />
      )}
      {deletingAuthor && (
        <DeleteAuthorModal
          author={deletingAuthor}
          onClose={() => setDeletingAuthor(null)}
          onDeleted={() => {
            setDeletingAuthor(null);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}