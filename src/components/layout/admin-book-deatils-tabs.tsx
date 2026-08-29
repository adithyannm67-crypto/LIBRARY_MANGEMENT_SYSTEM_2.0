"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/admin-shared.module.css";

const TabPanel = ({ bookId }: { bookId: string }) => {
  const [tab, setTab] = useState<"info" | "inventory" | "loans">("info");
  return (
    <div className={styles.tabs}>
      {(["info", "inventory", "loans"] as const).map((t) => (
        <Link
          href={`/admin/book-details/${bookId}/${t}`}
          key={t}
          className={`${styles.tab} ${tab === t ? styles.activeTab : ""}`}
          onClick={() => setTab(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </Link>
      ))}
    </div>
  );
};

export default TabPanel;
