"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import styles from "@/styles/admin-shared.module.css";
import Button from "@/components/ui/Button";
import CategoryFormModal from "@/components/features/admin-category-form-modal";
import DeleteCategoryModal from "@/components/features/admin-delete-category-modal";

import type { CategoryInput } from "@/components/features/admin-category-form-modal";

interface CategoriesManagerProps {
  categories: CategoryInput[];
  total: number;
}

export default function CategoriesManager({
  categories,
  total,
}: CategoriesManagerProps) {
  const [editingCategory, setEditingCategory] = useState<CategoryInput | null>(
    null,
  );
  const [deletingCategory, setDeletingCategory] = useState<CategoryInput | null>(
    null,
  );

  const share = (bookCount: number) =>
    total > 0 ? Math.round((bookCount / total) * 100) : 0;

  return (
    <>
      {/* Grid cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={styles.section}
            style={{ marginBottom: 0 }}
          >
            <div className={styles.sectionBody}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: `${cat.color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: cat.color,
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>
                      {cat.name}
                    </div>
                    <div
                      style={{ fontSize: 12, color: "var(--muted-foreground)" }}
                    >
                      {cat.description}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  <button
                    onClick={() => setEditingCategory(cat)}
                    aria-label={`Edit ${cat.name}`}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      border: "1px solid var(--border)",
                      background: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={() => setDeletingCategory(cat)}
                    aria-label={`Delete ${cat.name}`}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      border: "1px solid var(--border)",
                      background: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ fontSize: 12, color: "var(--muted-foreground)" }}
                >
                  Books
                </span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: cat.color,
                  }}
                >
                  {cat.bookCount}
                </span>
              </div>
              <div
                style={{
                  marginTop: 8,
                  height: 4,
                  borderRadius: 4,
                  background: "var(--muted)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: cat.color,
                    width: `${share(cat.bookCount)}%`,
                    borderRadius: 4,
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                  textAlign: "right",
                }}
              >
                {share(cat.bookCount)}% of catalog
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>All Categories</span>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {["Color", "Name", "Description", "Books", "Share", ""].map(
                  (h) => (
                    <th key={h}>{h}</th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: cat.color,
                      }}
                    />
                  </td>
                  <td style={{ fontWeight: 600 }}>{cat.name}</td>
                  <td
                    style={{ color: "var(--muted-foreground)", fontSize: 12 }}
                  >
                    {cat.description}
                  </td>
                  <td style={{ fontWeight: 600 }}>{cat.bookCount}</td>
                  <td style={{ color: "var(--muted-foreground)" }}>
                    {share(cat.bookCount)}%
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Button
                        variant="ghost"
                        size="xs"
                        leadingIcon={<Pencil size={11} />}
                        onClick={() => setEditingCategory(cat)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="xs"
                        leadingIcon={<Trash2 size={11} />}
                        style={{ color: "var(--destructive)" }}
                        onClick={() => setDeletingCategory(cat)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingCategory && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSaved={() => {
            setEditingCategory(null);
            window.location.reload();
          }}
        />
      )}
      {deletingCategory && (
        <DeleteCategoryModal
          category={deletingCategory}
          onClose={() => setDeletingCategory(null)}
          onDeleted={() => {
            setDeletingCategory(null);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}