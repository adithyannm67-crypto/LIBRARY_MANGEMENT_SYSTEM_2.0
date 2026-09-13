"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, X } from "lucide-react";
import Button from "@/components/ui/Button";
import type { Author } from "@/types/database";
import { createClient } from "@/lib/client";


interface DeleteAuthorModalProps {
  author: Author;
  params: URLSearchParams;
}

export default function DeleteAuthorModal({
  author,
params,
}: DeleteAuthorModalProps) {
  const router = useRouter();

  
  const clearParam = (param: string) => {
    const p = new URLSearchParams(params);
    p.delete(param);
    router.replace(`?${p.toString()}`);
  };
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("delete_author", {
        p_author_id: author.author_id,
      });
      if (error) throw error;
      clearParam("delete");
    } catch (err) {
      console.error("Failed to delete author:", err);
      alert("Failed to delete author.");
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
        if (e.target === e.currentTarget) clearParam("delete");
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
          <h2
            style={{
              fontSize: 16,
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Delete Author
          </h2>
          <button
            onClick={() => clearParam("delete")}
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
        <div
          style={{
            padding: "20px",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--foreground)",
          }}
        >
          <p style={{ margin: 0 }}>
            Are you sure you want to delete <strong>&ldquo;{author.name}&rdquo;</strong>?
            {author.book_count > 0
              ? " This removes the author from the library and unlinks them from their books."
              : " This action cannot be undone."}
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
          <Button variant="outline" size="sm" onClick={() => clearParam("delete")}>
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