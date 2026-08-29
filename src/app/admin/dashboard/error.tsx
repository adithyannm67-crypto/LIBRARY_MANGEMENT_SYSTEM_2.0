'use client';

import { AlertTriangle } from "lucide-react";

import styles from "@/styles/admin-shared.module.css";

export default function AdminDashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={styles.page}>
      <div className={styles.errorState}>
        <AlertTriangle size={28} color="var(--destructive)"/>
        Failed to load dashboard
        <button onClick={onRetry} style={{ fontSize:13, cursor:'pointer', background:'none', border:'1px solid var(--border)', borderRadius:6, padding:'6px 14px', fontFamily:'inherit' }}>Retry</button>
      </div>
    </div>
  );
}