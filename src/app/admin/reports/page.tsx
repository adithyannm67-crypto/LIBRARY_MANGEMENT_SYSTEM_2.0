

import { Download, FileText } from "lucide-react";

import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";

import { REPORTS,SCHEDULED_REPORTS } from "@/constants/admin-reports-constants";

export default function ReportsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Reports</h1>
          <p className={styles.pageSub}>
            Generate and download library reports
          </p>
        </div>
        <div className={styles.pageActions}>
          <Button variant="outline" size="sm">
            Schedule Report
          </Button>
          <Button
            variant="primary"
            size="sm"
            leadingIcon={<FileText size={14} />}
          >
            Custom Report
          </Button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>Available Reports</span>
        </div>
        {REPORTS.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.title} className={styles.reportCard}>
              <div
                className={styles.reportIcon}
                style={{
                  background: `color-mix(in srgb,${r.color} 12%,transparent)`,
                  color: r.color,
                }}
              >
                <Icon size={18} />
              </div>
              <div className={styles.reportMeta}>
                <div className={styles.reportTitle}>{r.title}</div>
                <div className={styles.reportDesc}>{r.desc}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted-foreground)",
                    marginTop: 4,
                  }}
                >
                  <span style={{ fontFamily: "monospace" }}>{r.format}</span>
                  {" · "}Updated {r.updated}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <Button
                  variant="outline"
                  size="sm"
                  leadingIcon={<Download size={13} />}
                >
                  Download
                </Button>
                <Button variant="ghost" size="sm">
                  Preview
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scheduled reports */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>Scheduled Reports</span>
        </div>
        <div className={styles.sectionBody}>
          {SCHEDULED_REPORTS.map((s) => (
            <div key={s.name} className={styles.miniStat}>
              <div>
                <div className={styles.miniStatValue}>{s.name}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted-foreground)",
                    marginTop: 2,
                  }}
                >
                  {s.freq} → {s.to}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{ fontSize: 12, color: "var(--muted-foreground)" }}
                >
                  Next: {s.next}
                </span>
                <Button variant="ghost" size="xs">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
