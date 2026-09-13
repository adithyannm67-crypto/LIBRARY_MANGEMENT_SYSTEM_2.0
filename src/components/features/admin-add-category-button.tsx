"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import CategoryFormModal from "@/components/features/admin-category-form-modal";

export default function AddCategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        leadingIcon={<Plus size={14} />}
        onClick={() => setOpen(true)}
      >
        New Category
      </Button>
      {open && (
        <CategoryFormModal
          onClose={() => setOpen(false)}
          onSaved={() => {
            setOpen(false);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}