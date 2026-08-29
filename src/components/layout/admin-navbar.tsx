"use client";

import styles from "@/app/admin/AdminLayout.module.css";

import { PanelLeftClose, PanelLeftOpen, LogOut } from "lucide-react";

import ToggleThemeButton from "@/components/features/toggleThemeButton";
import { useAdminContext } from "@/context/adminContext";
import { useAuth } from "@/context/AuthContext";

import { AdminRoute } from "@/constants/admin-sidebar-constants";

const PAGE_TITLES: Record<AdminRoute, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  reports: "Reports",
  books: "Books",
  categories: "Categories",
  authors: "Authors",
  publishers: "Publishers",
  inventory: "Inventory",
  "book-details": "Book Details",
  members: "Members",
  "member-details": "Member Details",
  borrows: "Borrow Management",
  reservations: "Reservations",
  reviews: "Reviews",
  notifications: "Notifications",
  settings: "Settings",
};

export default function NavBar() {
  const { collapsed, setCollapsed, activePath } = useAdminContext();
  const {logout}=useAuth();
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
        <span className={styles.pageTitle}>{PAGE_TITLES[activePath]}</span>
      </div>
      <div className={styles.topbarRight}>
        <span className={styles.adminPill}>Admin</span>
        <ToggleThemeButton />
        <button className={styles.iconBtn} onClick={logout}>
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
