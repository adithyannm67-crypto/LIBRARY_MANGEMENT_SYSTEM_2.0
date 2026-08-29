"use client";

import styles from "@/app/admin/AdminLayout.module.css";

import { PanelLeftClose, PanelLeftOpen, LogOut } from "lucide-react";

import ToggleThemeButton from "@/components/features/toggleThemeButton";
import { useUserContext } from "@/context/userContext";
import { useAuth } from "@/context/AuthContext";

import { UserRoute } from "@/constants/user-sidebar-constants";


const PAGE_TITLES: Record<UserRoute, string> = {
  dashboard: "Dashboard",
  books: "Browse",
  "book-details": "Book Details",
  "my-borrows": "My Borrows",
  "borrow-history": "Borrow History",
  reservations: "Reservations",
  wishlist: "Wishlist",
  notifications: "Notifications",
  profile: "Profile",
  achievements: "Achievements",
  "reading-history": "Reading History",
  overview: "Overview",
  settings: "Settings",
  help: "Help",
};

export default function NavBar() {
  const { collapsed, setCollapsed, activePath } = useUserContext();
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
        <span className={styles.adminPill}>User</span>
        <ToggleThemeButton />
        <button className={styles.iconBtn} onClick={logout}>
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
