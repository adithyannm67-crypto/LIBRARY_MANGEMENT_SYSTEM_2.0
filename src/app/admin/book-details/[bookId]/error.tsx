'use client';

import styles from "@/styles/admin-shared.module.css";
import { AlertTriangle } from "lucide-react";

export default function AdminBookDetailsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={styles.page}>
      <div className={styles.errorState}>
        <AlertTriangle size={28} color="var(--destructive)" />
        <button
          onClick={onRetry}
          className="cursor-pointer rounded-md border border-border bg-transparent px-3.5 py-1.5 font-inherit text-[13px]"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
