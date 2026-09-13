"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/admin-shared.module.css";

const TABS = ["info", "inventory", "loans"] as const;
type Tab = (typeof TABS)[number];

const TabPanel = ({ bookId }: { bookId: string }) => {
  const pathname = usePathname();
  const segment = pathname.split("/").pop() ?? "";
  const active: Tab = (TABS as readonly string[]).includes(segment)
    ? (segment as Tab)
    : "info";

  return (
    <div className={styles.tabs}>
      {TABS.map((t) => (
        <Link
          href={`/admin/book-details/${bookId}/${t}`}
          key={t}
          className={`${styles.tab} ${active === t ? styles.activeTab : ""}`}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </Link>
      ))}
    </div>
  );
};

export default TabPanel;