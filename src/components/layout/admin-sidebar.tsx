"use client";

import styles from "@/app/admin/AdminLayout.module.css";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { NAV, NavItem } from "@/constants/admin-sidebar-constants";
import { useAdminContext } from "@/context/adminContext";

export default function SideBar() {
  const { collapsed } = useAdminContext();
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>L</div>
        {!collapsed && (
          <div className={styles.brandText}>
            <div className={styles.brandName}>LibraryOS</div>
            <div className={styles.brandRole}>Admin</div>
          </div>
        )}
      </div>

      <nav className={styles.nav}>
        {NAV.map((group, gi) => (
          <div key={gi} className={styles.navGroup}>
            {group.label && !collapsed && (
              <div className={styles.groupLabel}>{group.label}</div>
            )}
            {group.items.map((item) => (
              <LinkComponent key={item.id} item={item} collapsed={collapsed} />
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.userArea}>
        {!collapsed ? (
          <div className={styles.userCard}>
            <div className={styles.avatar}>A</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>Alice Chen</div>
              <div className={styles.userEmail}>alice@library.dev</div>
            </div>
          </div>
        ) : (
          <div className={`${styles.avatar} ${styles.avatarCenter}`}>A</div>
        )}
      </div>
    </aside>
  );
}

interface LinkComponentProps {
  item: NavItem;
  collapsed: Boolean;
}

const LinkComponent = ({ item, collapsed }: LinkComponentProps) => {
  const pathName = usePathname();
  const isActive = pathName.includes(item.id);
  const Icon = item.icon;
  let extraUrl = "";
  switch (item.id) {
    case "borrows":
      extraUrl = "?filter=All";
      break;
    case "authors":
      extraUrl = "?sort=borrows";
      break;
    case "books":
      extraUrl = "?cat=All&filter=All&sort=borrows";
      break;
    case "inventory":
      extraUrl = "?filter=All&cond=All";
      break;
    case "members":
      extraUrl = "?filter=All&tier=All";
      break;
    case "notifications":
      extraUrl = "?composing=false";
      break;
    case "reservations":
      extraUrl = "?filter=All";
      break;
    case "reviews":
      extraUrl = "?filter=all";
      break;
  }

  return (
    <Link
      href={`/admin/${item.id}${extraUrl}`}
      className={`${styles.navItem} ${isActive ? styles.active : ""}`}
      title={collapsed ? item.label : undefined}
    >
      <Icon size={16} />
      {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
      {!collapsed && item.badge ? (
        <span className={styles.navBadge}>{item.badge}</span>
      ) : null}
      {collapsed && item.badge ? <span className={styles.navBadgeDot} /> : null}
    </Link>
  );
};


