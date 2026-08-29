"use client";

import styles from "@/app/admin/AdminLayout.module.css";

import { PanelLeftClose, PanelLeftOpen, LogOut } from "lucide-react";

import ToggleThemeButton from "@/components/features/toggleThemeButton";
import { useAdminContext } from "@/context/adminContext";
import { useAuth } from "@/context/AuthContext";

import { AdminRoute } from "@/constants/admin-sidebar-constants";
import { useRouter } from "next/navigation";


export type UserRoute =
  | "dashboard"
  | "browse"
  | "book-details"
  | "my-borrows"
  | "borrow-history"
  | "reservations"
  | "wishlist"
  | "notifications"
  | "profile"
  | "achievements"
  | "reading-history"
  | "overview"
  | "settings"
  | "help";

  

const USER_PAGE_TITLES: Record<UserRoute, string> = {
  dashboard: "Dashboard",
  browse: "Browse",
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

const ADMIN_PAGE_TITLES: Record<AdminRoute, string> = {
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

const PAGE_TITLES = { ...USER_PAGE_TITLES,
  ...ADMIN_PAGE_TITLES,
};

export default function NavBar() {
  const router = useRouter();
  const { collapsed, setCollapsed, activePath } = useAdminContext();
  const { logout, user } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/");
  }
  console.log(user)
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
        <span className={styles.adminPill}>{user?.role?.toUpperCase()}</span>
        <ToggleThemeButton />
        <button className={styles.iconBtn} onClick={handleLogout}>
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
