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


interface AdminContextType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  activePath: AdminRoute;
  setActivePath: React.Dispatch<React.SetStateAction<AdminRoute>>;
}

const AppContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<AdminRoute>(
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

export function useAdminContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAdminContext must be used within AdminProvider!!!!");
  return context;
}
