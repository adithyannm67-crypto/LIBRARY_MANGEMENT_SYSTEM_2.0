"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import BookFormModal from "@/components/features/admin-book-form-modal";
import type { Book } from "@/types/database";
import { useRouter } from "next/navigation";

export default function AddBookButton({ books }: { books: Book[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        leadingIcon={<Plus size={14} />}
        onClick={() => setOpen(true)}
      >
        Add Book
      </Button>
      {open && (
        <BookFormModal
          existingBooks={books}
          onClose={() => setOpen(false)}
          onSaved={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      )}
    </>
  );
}