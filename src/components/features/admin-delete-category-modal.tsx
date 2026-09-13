"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/client";
import { cn } from "@/lib/utils";
import styles from "@/styles/admin-modal.module.css";

import type { CategoryInput } from "@/components/features/admin-category-form-modal";

interface DeleteCategoryModalProps {
  category: CategoryInput;
  onClose: () => void;
  onDeleted: () => void;
}

export default function DeleteCategoryModal({
  category,
  onClose,
  onDeleted,
}: DeleteCategoryModalProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("delete_category", {
        p_category_id: category.id,
      });
      if (error) throw error;
      onDeleted();
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert("Failed to delete category.");
      setDeleting(false);
    }
  };

  return (
    <div
      className={cn(styles.overlay, styles.overlayScroll)}
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
            Delete Category
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
            Are you sure you want to delete <strong>&ldquo;{category.name}&rdquo;</strong>?
            {category.bookCount > 0
              ? " Its books stay in the catalog but are no longer grouped under this category."
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