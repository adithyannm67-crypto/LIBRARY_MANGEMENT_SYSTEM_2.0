

import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

import styles from "./AdminLayout.module.css";

import SideBar from "@/components/layout/admin-sidebar";
import NavBar from "@/components/layout/admin-navbar";

import { AdminProvider } from "@/context/adminContext";

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminProvider>
      <div className={styles.root}>
        {/* Sidebar */}
        <SideBar />
        {/* Main */}
        <div className={styles.main}>
          <NavBar />
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </AdminProvider>
  );
}
