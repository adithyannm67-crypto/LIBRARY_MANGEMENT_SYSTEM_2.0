"use client";

import { useState } from "react";

import styles from "@/styles/admin-shared.module.css";
import { MEMBERS } from "@/mock/adminData";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Send } from "lucide-react";


export default function NotificationComposer() {
      const router = useRouter();
  const params = useSearchParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [target, setTarget] = useState("all");
  const [type, setType] = useState<"announcement" | "system" | "maintenance">(
    "announcement",
  );

  return (
    <div className={styles.section} style={{ marginBottom: 20 }}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionTitle}>New Notification</span>
      </div>
      <div className={styles.sectionBody}>
        <div className={styles.formRow}>
          <div>
            <div className={styles.formLabel}>Type</div>
          </div>
          <select
            className={styles.formInput}
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            style={{ maxWidth: 200 }}
          >
            <option value="announcement">Announcement</option>
            <option value="system">System</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className={styles.formRow}>
          <div>
            <div className={styles.formLabel}>Recipients</div>
          </div>
          <select
            className={styles.formInput}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            style={{ maxWidth: 200 }}
          >
            <option value="all">All Members ({MEMBERS.length})</option>
            <option value="overdue">Members with overdue books</option>
            <option value="premium">Premium members</option>
            <option value="admins">Admins only</option>
          </select>
        </div>
        <div className={styles.formRow}>
          <div>
            <div className={styles.formLabel}>Title</div>
          </div>
          <input
            className={styles.formInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notification title…"
          />
        </div>
        <div className={styles.formRow} style={{ alignItems: "flex-start" }}>
          <div style={{ paddingTop: 4 }}>
            <div className={styles.formLabel}>Message</div>
          </div>
          <textarea
            className={styles.formInput}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your message…"
            rows={3}
            style={{ resize: "vertical" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            marginTop: 4,
          }}
        >
          <Button variant="ghost" size="sm" 
             onClick={() => {
            const p = new URLSearchParams(params);
            p.set("composing", "false");
            router.replace(`?${p.toString()}`);
          }}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            leadingIcon={<Send size={13} />}
            disabled={!title || !body}
          >
            Send Now
          </Button>
        </div>
      </div>
    </div>
  );
}
