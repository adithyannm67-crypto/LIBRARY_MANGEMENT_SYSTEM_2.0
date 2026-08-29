"use client";

import { useState } from "react";

import styles from "@/styles/admin-shared.module.css";
import { MEMBERS } from "@/mock/adminData";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Send } from "lucide-react";

export default function NotificationComposeButton() {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div className={styles.pageActions}>
      <Button
        variant="primary"
        size="sm"
        leadingIcon={<Send size={14} />}
        onClick={(e) => {
          const p = new URLSearchParams(params);
          const value = p.get("composing") === "true" ? "false" : "true";
          p.set("composing", value);
          router.replace(`?${p.toString()}`);
        }}
      >
        {params.get("composing") === "true" ? "Cancel" : "Send Notification"}
      </Button>
    </div>
  );
}
