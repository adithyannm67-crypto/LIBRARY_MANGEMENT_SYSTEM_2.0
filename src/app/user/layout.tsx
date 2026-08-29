

import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

import styles from "./AdminLayout.module.css";

import SideBar from "@/components/layout/user-sidebar";
import NavBar from "@/components/layout/user-navbar";


import { UserProvider } from "@/context/userContext";

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <UserProvider>
      <div className={styles.root}>
        {/* Sidebar */}
        <SideBar />
        {/* Main */}
        <div className={styles.main}>
          <NavBar />
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </UserProvider>
  );
}
