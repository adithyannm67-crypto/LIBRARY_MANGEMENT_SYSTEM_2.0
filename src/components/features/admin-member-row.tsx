"use client";
import { useState } from "react";
import styles from "@/styles/admin-shared.module.css";
import Button from "@/components/ui/Button";

import { useRouter } from "next/navigation";
import type { Member } from "@/types/database";

const STATUS_CLS: Record<string, string> = {
  active: "badgeActive",
  suspended: "badgeDanger",
  expired: "badgeNeutral",
};
const TIER_CLS: Record<string, string> = {
  Standard: "badgeNeutral",
  Premium: "badgeAccent",
  Staff: "badgeWarning",
};

export default function MemberRow({ m }: { m: Member }) {
  const router = useRouter();
  return (
    <tr
      key={m.member_id}
      className={styles.clickable}
      onClick={() => router.push(`/admin/member-details/${m.member_id}`)}
    >
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: `hsl(${m.member_id.charCodeAt(1) * 37}deg 55% 60%)`,
              color: "#fff",
              fontWeight: 700,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {m.name[0]}
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{m.name}</div>
            <div
              style={{
                fontSize: 11,
                color: "var(--muted-foreground)",
              }}
            >
              {m.email}
            </div>
          </div>
        </div>
      </td>
      <td>
        <span
          className={`${styles.badge} ${styles[TIER_CLS[m.tier] ?? "badgeNeutral"]}`}
        >
          {m.tier}
        </span>
      </td>
      <td style={{ fontWeight: 600 }}>{m.borrowCount}</td>
      <td>{m.activeLoans}</td>
      <td>
        {m.overdueCount > 0 ? (
          <span style={{ color: "var(--destructive)", fontWeight: 600 }}>
            {m.overdueCount}
          </span>
        ) : (
          "0"
        )}
      </td>
      <td>
        {m.fines > 0 ? (
          <span style={{ color: "var(--destructive)", fontWeight: 700 }}>
            ${m.fines.toFixed(2)}
          </span>
        ) : (
          <span style={{ color: "var(--muted-foreground)" }}>—</span>
        )}
      </td>
      <td>
        <span
          className={`${styles.badge} ${styles[STATUS_CLS[m.status] ?? "badgeNeutral"]}`}
        >
          {m.status}
        </span>
      </td>
      <td>
        <Button
          variant="ghost"
          size="xs"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/member-details/${m.member_id}`);
          }}
        >
          View
        </Button>
      </td>
    </tr>
  );
}
