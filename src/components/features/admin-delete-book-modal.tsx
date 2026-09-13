"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import type { Book } from "@/types/database";
import { createClient } from "@/lib/client";
import { searchParamsFrom } from "@/lib/utils";

interface DeleteBookModalProps {
  book: Book;
  params?: Record<string, string | undefined>;
  onClose?: () => void;
  onDeleted?: () => void;
}

export default function DeleteBookModal({ book, params, onClose, onDeleted }: DeleteBookModalProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const clearParam = (param: string) => {
    const p = searchParamsFrom(params ?? {});
    p.delete(param);
    router.replace(`?${p.toString()}`);
  };
  const close = () => {
    if (params) clearParam("delete");
    else onClose?.();
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("delete_book", { p_book_id: book.book_id });
      if (error) throw error;
      if (params) clearParam("delete");
      else onDeleted?.();
    } catch (err) {
      console.error("Failed to delete book:", err);
      alert("Failed to delete book.");
      setDeleting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 40,
        overflowY: "auto",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        animation: "fadeUp 150ms ease both",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          width: "90%",
          maxWidth: 420,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            Delete Book
          </h2>
          <button
            onClick={close}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "none",
              background: "var(--muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--muted-foreground)",
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", fontSize: 14, lineHeight: 1.6, color: "var(--foreground)" }}>
          <p style={{ margin: 0 }}>
            Are you sure you want to delete <strong>&ldquo;{book.title}&rdquo;</strong>?
            This removes the book and its physical copies from the library. This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: "0 20px 20px",
          }}
        >
          <Button variant="outline" size="sm" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            loading={deleting}
            leadingIcon={<Trash2 size={13} />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}