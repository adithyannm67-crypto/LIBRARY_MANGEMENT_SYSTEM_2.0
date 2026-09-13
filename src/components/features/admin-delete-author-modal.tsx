"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import type { Author } from "@/types/database";
import { createClient } from "@/lib/client";
import { cn } from "@/lib/utils";
import styles from "@/styles/admin-modal.module.css";

interface DeleteAuthorModalProps {
  author: Author;
  onClose: () => void;
  onDeleted: () => void;
}

export default function DeleteAuthorModal({
  author,
  onClose,
  onDeleted,
}: DeleteAuthorModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("delete_author", {
        p_author_id: author.author_id,
      });
      if (error) throw error;
      onDeleted();
    } catch (err) {
      console.error("Failed to delete author:", err);
      alert("Failed to delete author.");
      setDeleting(false);
    }
  };

  return (
    <div
      className={cn(styles.overlay, styles.overlayCenter)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={cn(styles.dialog, styles.dialogSm)}>
        {/* Header */}
        <div className={styles.header}>
          <h2
            className={styles.title}
          >
            Delete Author
          </h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div
          className={styles.body}
        >
          <p className={styles.bodyText}>
            Are you sure you want to delete <strong>&ldquo;{author.name}&rdquo;</strong>?
            {author.book_count > 0
              ? " This removes the author from the library and unlinks them from their books."
              : " This action cannot be undone."}
          </p>
        </div>

        {/* Actions */}
        <div
          className={styles.dialogActions}
        >
          <Button variant="outline" size="sm" onClick={onClose}>
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