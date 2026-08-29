import Link from "next/link";
import {
  AlertTriangle,
  ChevronLeft,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { AdminRoute } from "@/constants/admin-sidebar-constants";
import { getMember, ALL_LOANS, fmtDate, timeAgo } from "@/mock/adminData";
import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";

interface Props {
  memberId: string;
  onNavigate: (route: AdminRoute, id?: string) => void;
}

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

interface Props {
  params: Promise<{ memberId: string }>;
}

export default async function AdminMemberDetailsPage({ params }: Props) {
  const { memberId } = await params;
  const member = getMember(memberId);
  if (!member)
    return (
      <div className={styles.page}>
        <div className={styles.errorState}>
          <AlertTriangle size={28} />
          Member not found
        </div>
      </div>
    );

  const loans = ALL_LOANS.filter((l) => l.memberId === memberId);
  const active = loans.filter((l) => l.status !== "returned");
  const history = loans.filter((l) => l.status === "returned");

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Link href="/admin/members" className={styles.backBtn}>
          <ChevronLeft size={15} /> Members
        </Link>
        <div className={styles.pageActions}>
          {member.status === "active" ? (
            <Button variant="destructive" size="sm">
              Suspend
            </Button>
          ) : (
            <Button variant="success" size="sm">
              Reactivate
            </Button>
          )}
          {member.fines > 0 && (
            <Button variant="outline" size="sm">
              Waive Fines
            </Button>
          )}
        </div>
      </div>

      {/* Profile card */}
      <div className={styles.section}>
        <div className={styles.sectionBody}>
          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: `hsl(${memberId.charCodeAt(1) * 37}deg 55% 60%)`,
                color: "#fff",
                fontWeight: 800,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {member.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 4,
                }}
              >
                <h2
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {member.name}
                </h2>
                <span
                  className={`${styles.badge} ${styles[STATUS_CLS[member.status] ?? "badgeNeutral"]}`}
                >
                  {member.status}
                </span>
                <span
                  className={`${styles.badge} ${styles[TIER_CLS[member.tier] ?? "badgeNeutral"]}`}
                >
                  {member.tier}
                </span>
              </div>
              <div style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
                {member.email}
                {member.phone && ` · ${member.phone}`}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted-foreground)",
                  marginTop: 2,
                }}
              >
                Member since {fmtDate(member.memberSince)} · Last active{" "}
                {timeAgo(member.lastActivity)}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 10,
              }}
            >
              {[
                { l: "Borrows", v: member.borrowCount },
                { l: "Active", v: member.activeLoans },
                { l: "Overdue", v: member.overdueCount, danger: true },
              ].map((s) => (
                <div
                  key={s.l}
                  style={{
                    textAlign: "center",
                    padding: "12px",
                    background: "var(--muted)",
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color:
                        s.danger && s.v > 0 ? "var(--destructive)" : undefined,
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {member.fines > 0 && (
            <div
              style={{
                marginTop: 14,
                padding: "10px 14px",
                borderRadius: 8,
                background:
                  "color-mix(in srgb,var(--destructive) 8%,transparent)",
                border:
                  "1px solid color-mix(in srgb,var(--destructive) 20%,transparent)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
              }}
            >
              <AlertCircle size={14} color="var(--destructive)" />
              <strong>${member.fines.toFixed(2)}</strong>&nbsp;in outstanding
              fines
            </div>
          )}
        </div>
      </div>

      <div className={styles.twoCol}>
        {/* Account info */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTitle}>Account Details</span>
          </div>
          <div className={styles.sectionBody}>
            {[
              ["Role", member.role],
              ["Tier", member.tier],
              ["Institution", member.institution ?? "—"],
              ["Member Since", fmtDate(member.memberSince)],
              ["Last Active", timeAgo(member.lastActivity)],
              [
                "Outstanding Fines",
                member.fines > 0 ? `$${member.fines.toFixed(2)}` : "None",
              ],
            ].map(([l, v]) => (
              <div key={l} className={styles.miniStat}>
                <span className={styles.miniStatLabel}>{l}</span>
                <span className={styles.miniStatValue}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active loans */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTitle}>
              Active Loans ({active.length})
            </span>
          </div>
          <div className={styles.sectionBody}>
            {active.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  padding: "20px 0",
                  fontSize: 13,
                  color: "var(--muted-foreground)",
                  margin: 0,
                }}
              >
                No active loans
              </p>
            ) : (
              active.map((l) => (
                <div key={l.id} className={styles.histRow}>
                  <BookOpen
                    size={15}
                    color={
                      l.status === "overdue"
                        ? "var(--destructive)"
                        : "var(--accent)"
                    }
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {l.bookTitle}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                    >
                      Due {fmtDate(l.dueAt)}
                    </div>
                  </div>
                  {l.status === "overdue" && (
                    <span className={`${styles.badge} ${styles.badgeDanger}`}>
                      Overdue
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Borrow history */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>
            Borrow History ({history.length})
          </span>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {["Book", "Author", "Borrowed", "Returned"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((l) => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 600 }}>{l.bookTitle}</td>
                  <td style={{ color: "var(--muted-foreground)" }}>
                    {l.bookAuthor}
                  </td>
                  <td style={{ color: "var(--muted-foreground)" }}>
                    {fmtDate(l.borrowedAt)}
                  </td>
                  <td style={{ color: "var(--muted-foreground)" }}>
                    {l.returnedAt ? fmtDate(l.returnedAt) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {history.length === 0 && (
            <p
              style={{
                textAlign: "center",
                padding: "24px",
                fontSize: 13,
                color: "var(--muted-foreground)",
                margin: 0,
              }}
            >
              No history yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminMemberDetailsLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.skeleton} />
    </div>
  );
}
export function AdminMemberDetailsError({ onRetry }: { onRetry: () => void }) {
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
