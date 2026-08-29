import React from "react";
import { Bell, Megaphone, Wrench, Clock } from "lucide-react";

import { ADMIN_NOTIFICATIONS, MEMBERS, timeAgo } from "@/mock/adminData";

import styles from "@/styles/admin-shared.module.css";
import NotificationComposer from "@/components/features/admin-new-notification-compose";
import NotificationComposeButton from "@/components/features/admin-notification-compose-btn";

interface Props {
  searchParams: Promise<{
    composing?: "true" | "false";
  }>;
}

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  system: { icon: <Bell size={15} />, color: "var(--accent)" },
  overdue: { icon: <Clock size={15} />, color: "var(--destructive)" },
  announcement: { icon: <Megaphone size={15} />, color: "var(--success)" },
  maintenance: { icon: <Wrench size={15} />, color: "var(--warning)" },
};

export default async function AdminNotificationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { composing } = params;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Notifications</h1>
          <p className={styles.pageSub}>
            {ADMIN_NOTIFICATIONS.length} sent · {MEMBERS.length} members
          </p>
        </div>
        <NotificationComposeButton />
      </div>

      {/* Compose panel */}

      {composing === "true" && <NotificationComposer />}
      {/* History */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>Sent Notifications</span>
        </div>
        {ADMIN_NOTIFICATIONS.map((n) => {
          const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.system;
          const readPct = Math.round((n.readCount / n.totalSent) * 100);
          return (
            <div
              key={n.id}
              style={{
                padding: "14px 18px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: `color-mix(in srgb,${cfg.color} 12%,transparent)`,
                  color: cfg.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {cfg.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>
                  {n.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                    marginBottom: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {n.body}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                  >
                    {timeAgo(n.sentAt)} · {n.recipients}
                  </span>
                  <div style={{ flex: 1, maxWidth: 140 }}>
                    <div
                      style={{
                        height: 3,
                        borderRadius: 3,
                        background: "var(--muted)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background: "var(--success)",
                          width: `${readPct}%`,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                  </div>
                  <span
                    style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                  >
                    {n.readCount}/{n.totalSent} read ({readPct}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// export function AdminNotificationsLoading() {
//   return <div className={styles.page}><div className={styles.skeleton}/></div>;
// }
// export function AdminNotificationsError({ onRetry }: { onRetry: () => void }) {
//   return <div className={styles.page}><div className={styles.errorState}><AlertTriangle size={28} color="var(--destructive)"/><button onClick={onRetry} style={{fontSize:13,cursor:'pointer',background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'6px 14px',fontFamily:'inherit'}}>Retry</button></div></div>;
// }
