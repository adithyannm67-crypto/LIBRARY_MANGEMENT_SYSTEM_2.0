import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";

import { INVENTORY, fmtDate } from "@/mock/adminData";


const COND_COLOR: Record<string, string> = {
  excellent: "var(--success)",
  good: "var(--accent)",
  fair: "var(--warning)",
  damaged: "var(--destructive)",
  lost: "var(--muted-foreground)",
};

export default function AdminBookInventoryPage({ params }: { params: string }) {
  const bookId = params;
  const copies = INVENTORY.filter((i) => i.bookId === bookId);
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionTitle}>
          Physical Copies ({copies.length})
        </span>
        <Button variant="outline" size="xs">
          Add Copy
        </Button>
      </div>
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              {[
                "Copy #",
                "Condition",
                "Status",
                "Acquired",
                "Last Checked",
                "Notes",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {copies.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600 }}>#{c.copyNumber}</td>
                <td>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: COND_COLOR[c.condition],
                    }}
                  >
                    {c.condition}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.badge} ${c.status === "available" ? styles.badgeActive : c.status === "borrowed" ? styles.badgeWarning : styles.badgeNeutral}`}
                  >
                    {c.status}
                  </span>
                </td>
                <td style={{ color: "var(--muted-foreground)" }}>
                  {fmtDate(c.acquiredAt)}
                </td>
                <td style={{ color: "var(--muted-foreground)" }}>
                  {fmtDate(c.lastChecked)}
                </td>
                <td style={{ color: "var(--muted-foreground)", fontSize: 12 }}>
                  {c.notes ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
