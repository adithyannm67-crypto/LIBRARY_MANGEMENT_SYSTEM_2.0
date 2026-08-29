"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { UserRoute } from "@/constants/user-sidebar-constants";


interface AdminContextType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  activePath: UserRoute;
  setActivePath: React.Dispatch<React.SetStateAction<UserRoute>>;
}

const AppContext = createContext<AdminContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<UserRoute>(
    "dashboard",
  );
  useEffect(() => {
    if (pathname) {
      setActivePath(pathname.split("/")[2] as UserRoute);
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

export function useUserContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useUserContext must be used within UserProvider!!!!");
  return context;
}
