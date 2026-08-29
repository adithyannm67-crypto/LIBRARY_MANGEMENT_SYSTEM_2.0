import { Plus, Pencil, Trash2 } from "lucide-react";

import { ADMIN_CATEGORIES } from "@/mock/adminData";
import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";

export default function CategoriesPage() {
  const total = ADMIN_CATEGORIES.reduce((s, c) => s + c.bookCount, 0);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Categories</h1>
          <p className={styles.pageSub}>
            {ADMIN_CATEGORIES.length} categories · {total} books total
          </p>
        </div>
        <div className={styles.pageActions}>
          <Button variant="primary" size="sm" leadingIcon={<Plus size={14} />}>
            New Category
          </Button>
        </div>
      </div>

      {/* Grid cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {ADMIN_CATEGORIES.map((cat) => (
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
                    width: `${Math.round((cat.bookCount / total) * 100)}%`,
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
                {Math.round((cat.bookCount / total) * 100)}% of catalog
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
              {ADMIN_CATEGORIES.map((cat) => (
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
                    {Math.round((cat.bookCount / total) * 100)}%
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Button
                        variant="ghost"
                        size="xs"
                        leadingIcon={<Pencil size={11} />}
                      >
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// export function CategoriesLoading() {
//   return <div className={styles.page}><div className={styles.skeleton}/></div>;
// }
// export function CategoriesError({ onRetry }: { onRetry: () => void }) {
//   return <div className={styles.page}><div className={styles.errorState}><AlertTriangle size={28} color="var(--destructive)"/><button onClick={onRetry} style={{fontSize:13,cursor:'pointer',background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'6px 14px',fontFamily:'inherit'}}>Retry</button></div></div>;
// }
