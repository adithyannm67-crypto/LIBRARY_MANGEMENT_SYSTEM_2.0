'use client';
import styles from "@/styles/admin-shared.module.css";
import { AlertTriangle } from "lucide-react";

export default function AnalyticsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={styles.page}>
      <div className={styles.errorState}>
        <AlertTriangle size={28} color="var(--destructive)" />
        <button
          onClick={onRetry}
          style={{
            fontSize: 13,
            cursor: "pointer",
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "6px 14px",
            fontFamily: "inherit",
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
