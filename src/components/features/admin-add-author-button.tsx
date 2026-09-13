"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import AuthorFormModal from "@/components/features/admin-author-form-modal";

export default function AddAuthorButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        leadingIcon={<Plus size={14} />}
        onClick={() => setOpen(true)}
      >
        Add Author
      </Button>
      {open && (
        <AuthorFormModal
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