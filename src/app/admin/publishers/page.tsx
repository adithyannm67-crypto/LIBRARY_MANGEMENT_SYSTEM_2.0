import { Plus, ExternalLink, Pencil } from "lucide-react";
import { createClient } from "@/lib/server";
import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";
import FilterBar from "@/components/features/admin-filterBar";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function PublishersPage({ searchParams }: Props) {
  const supabase = await createClient();
  const params = await searchParams;
  const { q } = params;
  const query = q ?? "";

  const { data, error } = await supabase
    .from("publishers")
    .select("publisher_id, name, country, books_in_library, founded, website, contact_email")
    .order("name")
    .returns<{
      publisher_id: string;
      name: string;
      country: string | null;
      books_in_library: number | null;
      founded: number | null;
      website: string | null;
      contact_email: string | null;
    }[]>();

  if (error) console.error(error);

  const publishers = (data ?? []).map((p) => ({
    id: p.publisher_id,
    name: p.name,
    country: p.country ?? "USA",
    bookCount: p.books_in_library ?? 0,
    founded: p.founded ?? undefined,
    website: p.website ?? undefined,
    contactEmail: p.contact_email ?? undefined,
  }));

  const filtered = query
    ? publishers.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.country.toLowerCase().includes(query.toLowerCase()),
      )
    : publishers;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Publishers</h1>
          <p className={styles.pageSub}>
            {publishers.length} publishers in catalog
          </p>
        </div>
        <div className={styles.pageActions}>
          <Button variant="primary" size="sm" leadingIcon={<Plus size={14} />}>
            Add Publisher
          </Button>
        </div>
      </div>

      <FilterBar />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: 14,
        }}
      >
        {filtered.map((p) => (
          <div
            key={p.id}
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
                  marginBottom: 12,
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{ fontSize: 12, color: "var(--muted-foreground)" }}
                  >
                    {p.country}
                    {p.founded ? ` · Est. ${p.founded}` : ""}
                  </div>
                </div>
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
                    flexShrink: 0,
                  }}
                >
                  <Pencil size={12} />
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    textAlign: "center",
                    flex: 1,
                    padding: "10px",
                    background: "var(--muted)",
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {p.bookCount}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                  >
                    Books
                  </div>
                </div>
              </div>
              {(p.website || p.contactEmail) && (
                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {p.website && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 12,
                        color: "var(--accent)",
                      }}
                    >
                      <ExternalLink size={11} />
                      {p.website}
                    </div>
                  )}
                  {p.contactEmail && (
                    <div style={{ fontSize: 12, color: "var(--muted-foreground)" }} >
                      {p.contactEmail}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p
          style={{
            textAlign: "center",
            padding: "48px",
            fontSize: 13,
            color: "var(--muted-foreground)",
            margin: 0,
          }}
        >
          No publishers match.
        </p>
      )}
    </div>
  );
}

// export function PublishersLoading() {
//   return <div className={styles.page}><div className={styles.skeleton}/></div>;
// }
// export function PublishersError({ onRetry }: { onRetry: () => void }) {
//   return <div className={styles.page}><div className={styles.errorState}><AlertTriangle size={28} color="var(--destructive)"/><button onClick={onRetry} style={{fontSize:13,cursor:'pointer',background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'6px 14px',fontFamily:'inherit'}}>Retry</button></div></div>;
// }
