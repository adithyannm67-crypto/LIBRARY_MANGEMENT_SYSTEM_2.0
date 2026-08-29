"use client";
import styles from "@/styles/user-shared.module.css";
import Button from "@/components/ui/Button";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UserDashboardHeader() {
  const router = useRouter();
  const { user } = useAuth();
  console.log(user);
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>Good morning, {user?.name} 👋</h1>
        <p className={styles.pageSub}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <Button
        variant="primary"
        size="sm"
        onClick={() => router.push("/browse")}
      >
        Browse catalog
      </Button>
    </div>
  );
}
