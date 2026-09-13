import { AlertTriangle, Plus, } from "lucide-react";

import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";

import MemberRow from "@/components/features/admin-member-row";
import Filterbar from "@/components/features/admin-filterBar";
import { createClient } from '@/lib/server';
import type { Member } from '@/types/database';

interface Props {
  searchParams: Promise<{
    q?: string;
    tier?: string;
    filter?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .returns<Member[]>();
  
  if (error) console.error(error);
  
  const MEMBERS: Member[] = data ?? [];
  
  const params = await searchParams;
  const { q, tier, filter } = params;
  const query = q ?? "";
  const status = filter;

  const filtered = MEMBERS.filter((m) => {
    const q = query.toLowerCase();
    if (
      q &&
      !m.name.toLowerCase().includes(q) &&
      !m.email.toLowerCase().includes(q)
    )
      return false;
    if (status !== "All" && m.status !== status) return false;
    if (tier !== "All" && m.tier !== tier) return false;
    return true;
  });

  const totalFines = MEMBERS.reduce((s, m) => s + m.fines, 0);

  const QUICK_STATS = [
    {
      l: "Active",
      v: MEMBERS.filter((m) => m.status === "active").length,
      c: "var(--success)",
    },
    {
      l: "Suspended",
      v: MEMBERS.filter((m) => m.status === "suspended").length,
      c: "var(--destructive)",
    },
    {
      l: "Expired",
      v: MEMBERS.filter((m) => m.status === "expired").length,
      c: "var(--muted-foreground)",
    },
    {
      l: "Premium",
      v: MEMBERS.filter((m) => m.tier === "Premium").length,
      c: "var(--accent)",
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Members</h1>
          <p className={styles.pageSub}>
            {MEMBERS.length} registered · ${totalFines.toFixed(2)} outstanding
            fines
          </p>
        </div>
        <div className={styles.pageActions}>
          <Button variant="primary" size="sm" leadingIcon={<Plus size={14} />}>
            Add Member
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div
        style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}
      >
        {QUICK_STATS.map((s) => (
          <div
            key={s.l}
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              background: "var(--card)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: s.c,
                letterSpacing: "-0.04em",
              }}
            >
              {s.v}
            </span>
            <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
              {s.l}
            </span>
          </div>
        ))}
      </div>

      <Filterbar />

      <div className={styles.section}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  "Member",
                  "Tier",
                  "Borrows",
                  "Active",
                  "Overdue",
                  "Fines",
                  "Status",
                  "",
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <MemberRow key={m.member_id} m={m} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className={styles.emptyState}>
              No members match.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminMembersLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.skeleton} />
    </div>
  );
}
export function AdminMembersError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={styles.page}>
      <div className={styles.errorState}>
        <AlertTriangle size={28} color="var(--destructive)" />
        <button
          onClick={onRetry}
          style={{
            fontSize: 13,
            cursor: "pointer",
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "6px 14px",
            fontFamily: "inherit",
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );
}
