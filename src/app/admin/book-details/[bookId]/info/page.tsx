import styles from "@/styles/admin-shared.module.css";

import { MockBook as AdminBook } from "@/mock/mock/types";
import { fmtDate } from "@/mock/adminData";

export default function AdminBookInfoPage({ book }: { book: AdminBook }) {
  const bookBody = [
    ["ISBN", book.isbn],
    ["Publisher", book.publisher],
    ["Year", book.published_year],
    ["Pages", book.pages],
    ["Category", book.category],
  ];

  const bookStats = [
    ["Total Copies", book.total_copies],
    ["Available", book.available_copies],
    ["Rating", `★ ${book.rating.toFixed(1)}`],
  ];
  return (
    <div className={styles.twoCol}>
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>Book Information</span>
        </div>
        <div className={styles.sectionBody}>
          {bookBody.map(([l, v]) => (
            <div key={l} className={styles.miniStat}>
              <span className={styles.miniStatLabel}>{l}</span>
              <span className={styles.miniStatValue}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>Circulation Stats</span>
        </div>
        <div className={styles.sectionBody}>
          {bookStats.map(([l, v]) => (
            <div key={l} className={styles.miniStat}>
              <span className={styles.miniStatLabel}>{l}</span>
              <span className={styles.miniStatValue}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
