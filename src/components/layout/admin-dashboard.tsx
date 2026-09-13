import {
  AlertTriangle,
  BookOpen,
  Users,
  ArrowLeftRight,
  Star,
  Clock,
} from "lucide-react";

import Link from "next/link";
import { AreaChartCard, BarChartCard } from "@/components/ui/Charts";
import {
  MEMBERS,
  ALL_LOANS,
  ADMIN_REVIEWS,
  BORROW_TREND,
  CATEGORY_DIST,
  fmtDate,
  timeAgo,
} from "@/styles/mock/adminData";

import {
  MockBorrow as AdminLoan,
  MockReview as AdminReview,
} from "@/styles/mock/mock/types";
import styles from "@/styles/admin-shared.module.css";

export default function AdminDashboardPage() {
  const overdue = ALL_LOANS.filter((l) => l.status === "overdue");
  const active = ALL_LOANS.filter((l) => l.status === "active");
  const pendingReviews = ADMIN_REVIEWS.filter(
    (r) => r.status === "pending" || r.flagged,
  );

  const STATS = [
    {
      label: "Total Books",
      value: "1,284",
      icon: <BookOpen size={16} />,
      color: "var(--accent)",
      trend: "+12 this month",
      up: true,
    },
    {
      label: "Active Members",
      value: MEMBERS.filter((m) => m.status === "active").length.toString(),
      icon: <Users size={16} />,
      color: "var(--success)",
      trend: "+3 this month",
      up: true,
    },
    {
      label: "Active Borrows",
      value: active.length.toString(),
      icon: <ArrowLeftRight size={16} />,
      color: "var(--warning)",
      trend: `${overdue.length} overdue`,
      up: false,
    },
    {
      label: "Avg Rating",
      value: "4.6",
      icon: <Star size={16} />,
      color: "#F59E0B",
      trend: "From 1,204 reviews",
      up: true,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSub}>
            Library overview · {fmtDate(new Date().toISOString())}
          </p>
        </div>
      </div>

      {overdue.length > 0 && <OverDueAlert overdue={overdue} />}

      {/* KPI cards */}
      <div className={styles.statGrid}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statTop}>
              <span className={styles.statLabel}>{s.label}</span>
              <div
                className={styles.statIcon}
                style={{
                  background: `color-mix(in srgb,${s.color} 12%,transparent)`,
                  color: s.color,
                }}
              >
                {s.icon}
              </div>
            </div>
            <div className={styles.statValue}>{s.value}</div>
            <div
              className={`${styles.statTrend} ${s.up ? styles.statTrendUp : styles.statTrendDown}`}
            >
              {s.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className={styles.twoCol} style={{ marginBottom: 16 }}>
        <AreaChartCard
          title="Borrow Trend"
          data={BORROW_TREND}
          series={[
            { key: "borrows", label: "Borrows", color: "var(--accent)" },
            { key: "returns", label: "Returns", color: "var(--success)" },
          ]}
          xKey="month"
        />
        <BarChartCard
          title="Borrows by Category"
          data={CATEGORY_DIST}
          series={[
            { key: "borrows", label: "Borrows", color: "var(--accent)" },
          ]}
          xKey="category"
        />
      </div>

      {/* Tables row */}
      <div className={styles.twoCol}>
        {/* Overdue loans */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTitle}>
              Overdue Loans ({overdue.length})
            </span>
            <Link
              href={"/admin/borrows"}
              style={{
                textDecoration: "none",
                fontSize: 12,
                color: "var(--accent)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              View all
            </Link>
          </div>
          <div className={styles.sectionBody}>
            {overdue.length === 0 ? (
              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted-foreground)",
                  textAlign: "center",
                  padding: "20px 0",
                  margin: 0,
                }}
              >
                No overdue loans
              </p>
            ) : (
              overdue.map((l) => <OverDueRowLoans key={l.id} l={l} />)
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTitle}>Recent Borrows</span>
            <Link
              href={"/admin/borrows"}
              style={{
                textDecoration: "none",
                fontSize: 12,
                color: "var(--accent)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              View all
            </Link>
          </div>
          <div className={styles.sectionBody}>
            {active.slice(0, 5).map((l) => (
              <ReacentBorrows key={l.id} l={l} />
            ))}
          </div>
        </div>
      </div>

      {/* Pending reviews */}
      {pendingReviews.length > 0 && (
        <PendingReviewWarning pendingReviews={pendingReviews} />
      )}
    </div>
  );
}
const PendingReviewWarning = ({
  pendingReviews,
}: {
  pendingReviews: AdminReview[];
}) => {
  return (
    <div className={styles.alertWarning}>
      <Star size={15} color="var(--warning)" />
      <span style={{ flex: 1 }}>
        <strong>{pendingReviews.length} reviews</strong> awaiting moderation
      </span>
      <Link
        href={"/admin/reviews"}
        style={{
          textDecoration: "none",
          fontSize: 12,
          fontWeight: 600,
          color: "color-mix(in srgb,var(--warning) 80%,#000)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Review now →
      </Link>
    </div>
  );
};

const ReacentBorrows = ({ l }: { l: AdminLoan }) => {
  return (
    <div key={l.id} className={styles.histRow}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: "color-mix(in srgb,var(--accent) 10%,transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <BookOpen size={15} color="var(--accent)" />
      </div>
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
        <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
          {l.memberName} · {timeAgo(l.borrowedAt)}
        </div>
      </div>
    </div>
  );
};

const OverDueRowLoans = ({ l }: { l: AdminLoan }) => {
  return (
    <div key={l.id} className={styles.histRow}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: "color-mix(in srgb,var(--destructive) 10%,transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Clock size={15} color="var(--destructive)" />
      </div>
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
        <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
          {l.memberName} · Due {fmtDate(l.dueAt)}
        </div>
      </div>
      {l.fine && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--destructive)",
            flexShrink: 0,
          }}
        >
          ${l.fine.toFixed(2)}
        </span>
      )}
    </div>
  );
};

const OverDueAlert = ({ overdue }: { overdue: AdminLoan[] }) => {
  const totalFines = overdue.reduce((s, l) => s + (l.fine ?? 0), 0);
  return (
    <div className={styles.alertDanger}>
      <AlertTriangle size={15} color="var(--destructive)" />
      <span style={{ flex: 1 }}>
        <strong>{overdue.length} loans overdue</strong> · $
        {totalFines.toFixed(2)} in outstanding fines
      </span>
      <Link
        href={"/admin/borrows"}
        style={{
          textDecoration: "none",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--destructive)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        View →
      </Link>
    </div>
  );
};
