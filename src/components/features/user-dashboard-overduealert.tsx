"use client";

import styles from "@/styles/user-shared.module.css";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function OverDueAlert({ noOfOverDue }: { noOfOverDue: number }) {
  const router = useRouter();
  return (
    <div className={styles.alertBanner}>
      <AlertTriangle size={15} />
      <span>
        <strong>
          {noOfOverDue} book
          {noOfOverDue > 1 ? "s are" : " is"} overdue.
        </strong>{" "}
        Return soon to avoid additional fines.
      </span>
      <Button
        variant="ghost"
        size="xs"
        style={{ marginLeft: "auto", color: "var(--destructive)" } as any}
        onClick={() => router.push("/user/my-borrows")}
      >
        View
      </Button>
    </div>
  );
}
