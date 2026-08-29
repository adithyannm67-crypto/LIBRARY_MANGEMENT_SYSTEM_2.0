import { AlertTriangle, RotateCcw } from "lucide-react";
import { ALL_LOANS, fmtDate } from "@/mock/adminData";
import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";
import Link from "next/link";
import FilterBar from "@/components/features/admin-filterBar";

const STATUS_CLS: Record<string, string> = {
  active: "badgeActive",
  overdue: "badgeDanger",
  returned: "badgeNeutral",
};

interface Props {
  searchParams: Promise<{
    q?: string;
    filter?: string;
    
  }>;
}

export default async function BorrowManagementPage({ searchParams }: Props) {
  const params = await searchParams;
  const { q, filter } = params;
  const query = q ?? "";
  const status = filter;

  const overdue = ALL_LOANS.filter((l) => l.status === "overdue");
  const totalFines = overdue.reduce((s, l) => s + (l.fine ?? 0), 0);

  const filtered = ALL_LOANS.filter((l) => {
    const q = query.toLowerCase();
    if (
      q &&
      !l.memberName.toLowerCase().includes(q) &&
      !l.bookTitle.toLowerCase().includes(q)
    )
      return false;
    if (status !== "All" && l.status !== status) return false;
    return true;
  });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Borrow Management</h1>
          <p className={styles.pageSub}>
            {ALL_LOANS.filter((l) => l.status === "active").length} active ·{" "}
            {overdue.length} overdue · ${totalFines.toFixed(2)} in fines
          </p>
        </div>
        <div className={styles.pageActions}>
          <Button
            variant="primary"
            size="sm"
            leadingIcon={<RotateCcw size={14} />}
          >
            Record Return
          </Button>
        </div>
      </div>

      {overdue.length > 0 && (
        <div className={styles.alertDanger}>
          <AlertTriangle size={15} color="var(--destructive)" />
          <span style={{ flex: 1 }}>
            <strong>{overdue.length} loans overdue</strong> — $
            {totalFines.toFixed(2)} total fines accrued
          </span>
          <Link
            href={"?filter=overdue"}
            style={{
              textDecoration: "none",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--destructive)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Show only →
          </Link>
        </div>
      )}

      <FilterBar />
      <div className={styles.section}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  "Member",
                  "Book",
                  "Borrowed",
                  "Due",
                  "Renews",
                  "Fine",
                  "Status",
                  "",
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{l.memberName}</div>
                    <div
                      style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                    >
                      {l.memberEmail}
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        maxWidth: 180,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: 500,
                      }}
                    >
                      {l.bookTitle}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                    >
                      {l.bookAuthor}
                    </div>
                  </td>
                  <td style={{ color: "var(--muted-foreground)" }}>
                    {fmtDate(l.borrowedAt)}
                  </td>
                  <td
                    style={{
                      color:
                        l.status === "overdue"
                          ? "var(--destructive)"
                          : "var(--muted-foreground)",
                      fontWeight: l.status === "overdue" ? 700 : 400,
                    }}
                  >
                    {fmtDate(l.dueAt)}
                  </td>
                  <td style={{ color: "var(--muted-foreground)" }}>
                    {l.renewCount}×
                  </td>
                  <td>
                    {l.fine && l.fine > 0 ? (
                      <span
                        style={{ color: "var(--destructive)", fontWeight: 700 }}
                      >
                        ${l.fine.toFixed(2)}
                      </span>
                    ) : (
                      <span style={{ color: "var(--muted-foreground)" }}>
                        —
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${styles[STATUS_CLS[l.status] ?? "badgeNeutral"]}`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      {l.status !== "returned" && (
                        <Button variant="outline" size="xs">
                          Return
                        </Button>
                      )}
                      {l.status === "active" && (
                        <Button variant="ghost" size="xs">
                          Renew
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p
              style={{
                textAlign: "center",
                padding: "32px",
                fontSize: 13,
                color: "var(--muted-foreground)",
                margin: 0,
              }}
            >
              No loans match.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
