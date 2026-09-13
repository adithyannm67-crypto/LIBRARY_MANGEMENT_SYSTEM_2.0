"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import BookFormModal from "@/components/features/admin-book-form-modal";
import DeleteBookModal from "@/components/features/admin-delete-book-modal";
import { adminDefaultHref } from "@/constants/admin-sidebar-constants";
import type { Book } from "@/types/database";

export default function BookDetailsActions({ book }: { book: Book }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [removing, setRemoving] = useState(false);

  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => setRemoving(true)}>
          Remove
        </Button>
      </div>

      {editing && (
        <BookFormModal
          book={book}
          onClose={() => setEditing(false)}
          onSaved={() => {
            setEditing(false);
            router.refresh();
          }}
        />
      )}
      {removing && (
        <DeleteBookModal
          book={book}
          onClose={() => setRemoving(false)}
onDeleted={() => {
            setRemoving(false);
            router.push(adminDefaultHref("books"));
          }}
        />
      )}
    </>
  );
}