"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ArrowRight, Moon, Sun } from "lucide-react";
import styles from "@/app/(landing)/LandingPage.module.css";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
const NavLinkBtn = ({ name }: { name: string }) => {
  return <button className={styles.navLink}>{name}</button>;
};

const NavActions = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  
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
    <div className={styles.navActions}>
      <button
        className={styles.navLink}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
      </button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/sign-in")}
      >
        Sign in
      </Button>

      <Button
        variant="primary"
        size="sm"
        onClick={() => router.push("/register")}
      >
        Get started
      </Button>
    </div>
  );
};

const CtaActions = () => {
    const router=useRouter();
  return (
    <div className={styles.ctaActions}>
      <Button
        variant="accent"
        size="lg"
        trailingIcon={<ArrowRight size={16} />}
        onClick={() => router.push("/register")}
      >
        Create free account
      </Button>
      <Button
        size="lg"
        style={
          {
            background: "transparent",
            color: "rgba(255,255,255,0.7)",
            borderColor: "rgba(255,255,255,0.2)",
          } as any
        }
        variant="outline"
        onClick={() => router.push("/login")}
      >
        Sign in
      </Button>
    </div>
  );
};

const HeroActions = () => {
    const router=useRouter();
  return (
    <div className={styles.heroActions}>
      <Button
        variant="primary"
        size="lg"
        trailingIcon={<ArrowRight size={16} />}
        onClick={() => router.push("/register")}
      >
        Start for free
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={() => router.push("/login")}
      >
        View demo
      </Button>
    </div>
  );
};

const FooterLinks = () => {
  return (
    <div className={styles.footerLinks}>
      {["Privacy", "Terms", "Security", "Status", "Docs"].map((l) => (
        <button key={l} className={styles.footerLink}>
          {l}
        </button>
      ))}
    </div>
  );
};

export { NavLinkBtn, NavActions, CtaActions, HeroActions, FooterLinks };
