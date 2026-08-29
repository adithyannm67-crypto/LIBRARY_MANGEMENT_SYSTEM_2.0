
import { ALL_LOANS, fmtDate } from "@/mock/adminData";

import styles from "@/styles/admin-shared.module.css";



export default function AdminBookLoansPage({params}:{params:{bookId:string}}) {
    const bookId = params.bookId;
  // TODO: Admin book loans
    const loans = ALL_LOANS.filter((l) => l.bookId === bookId);
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionTitle}>Borrow History</span>
      </div>
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              {["Member", "Borrowed", "Due", "Returned", "Status"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id}>
                <td style={{ fontWeight: 600 }}>{l.memberName}</td>
                <td style={{ color: "var(--muted-foreground)" }}>
                  {fmtDate(l.borrowedAt)}
                </td>
                <td style={{ color: "var(--muted-foreground)" }}>
                  {fmtDate(l.dueAt)}
                </td>
                <td style={{ color: "var(--muted-foreground)" }}>
                  {l.returnedAt ? fmtDate(l.returnedAt) : "—"}
                </td>
                <td>
                  <span
                    className={`${styles.badge} ${l.status === "active" ? styles.badgeActive : l.status === "overdue" ? styles.badgeDanger : styles.badgeNeutral}`}
                  >
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loans.length === 0 && (
          <p
            style={{
              textAlign: "center",
              padding: "24px",
              fontSize: 13,
              color: "var(--muted-foreground)",
              margin: 0,
            }}
          >
            No borrow history.
          </p>
        )}
      </div>
    </div>
  );
}
