"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import styles from "@/app/admin/AdminLayout.module.css";
import { useState, useEffect } from "react";
export default function ToggleThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button className={styles.iconBtn} onClick={toggleTheme}>
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
