"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { AdminRoute } from "@/constants/admin-sidebar-constants";
import type { UserRoute } from "@/components/layout/admin-navbar";
import { useAuth } from "./AuthContext";

interface AppContextType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  activePath: AdminRoute | UserRoute;
  setActivePath: React.Dispatch<React.SetStateAction<AdminRoute | UserRoute>>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const {user}= useAuth()
  if (!user) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  console.log("user in appProvider", user);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<AdminRoute | UserRoute>(
    "dashboard",
  );
  useEffect(() => {
    if (pathname) {
      setActivePath(pathname.split("/")[2] as AdminRoute);
    }
  }, [pathname]);
  const value = useMemo(
    () => ({
      collapsed,
      setCollapsed,
      activePath,
      setActivePath,
    }),
    [collapsed, activePath],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider!!!!");
  return context;
}
