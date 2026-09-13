"use client";

import Button  from "@/components/ui/Button";

import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Book } from "@/types/database";


export default function RowActions({
  b,
  onEdit,
  onDelete,
}: {
  b: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}) {
    const router = useRouter();
    return(
        <div style={{ display: "flex", gap: 4 }}>
          <Button
            variant="ghost"
            size="xs"
            leadingIcon={<Pencil size={11} />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(b);
            }}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/books/${b.book_id}`);
            }}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="xs"
            leadingIcon={<Trash2 size={11} />}
            style={{ color: "var(--destructive)" }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(b);
            }}
          >
            Delete
          </Button>
        </div>
    )
}