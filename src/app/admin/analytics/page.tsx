import { MockBook as AdminBook } from "@/styles/mock/mock/types";

import {
  AreaChartCard,
  BarChartCard,
  LineChartCard,
} from "@/components/ui/Charts";

import {
  BORROW_TREND,
  CATEGORY_DIST,
  MEMBER_GROWTH,
  MEMBERS,
  ADMIN_BOOKS,
} from "@/styles/mock/adminData";
import styles from "@/styles/admin-shared.module.css";

export default function AnalyticsPage() {
  const topBook = [...ADMIN_BOOKS].sort(
    (a, b) => b.totalBorrows - a.totalBorrows,
  )[0];
  const avgBorrows = Math.round(
    BORROW_TREND.reduce((s, d) => s + d.borrows, 0) / BORROW_TREND.length,
  );
  const returnRate = Math.round(
    (BORROW_TREND.reduce((s, d) => s + d.returns, 0) /
      BORROW_TREND.reduce((s, d) => s + d.borrows, 0)) *
      100,
  );
  const QUICK_STATS = [
    {
      label: "Avg Monthly Borrows",
      value: avgBorrows,
      color: "var(--accent)",
      trend: "Last 7 months",
    },
    {
      label: "Return Rate",
      value: `${returnRate}%`,
      color: "var(--success)",
      trend: "On-time returns",
    },
    {
      label: "Total Members",
      value: MEMBERS.length,
      color: "#9B59B6",
      trend: "Registered",
    },
    {
      label: "Most Borrowed",
      value: topBook.totalBorrows,
      color: "var(--warning)",
      trend: topBook.title.slice(0, 22) + "…",
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Analytics</h1>
          <p className={styles.pageSub}>Library performance · July 2026</p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className={styles.statGrid}>
        {QUICK_STATS.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statTop}>
              <span className={styles.statLabel}>{s.label}</span>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: s.color,
                }}
              />
            </div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statTrend}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Borrow trend — full width */}
      <AreaChartCard
        title="Borrow & Return Trend"
        subtitle="Monthly totals over the past 7 months"
        data={BORROW_TREND}
        series={[
          { key: "borrows", label: "Borrows", color: "var(--accent)" },
          { key: "returns", label: "Returns", color: "var(--success)" },
        ]}
        xKey="month"
        height={240}
        className={styles.section}
      />

      {/* Two column charts */}
      <div className={styles.twoCol}>
        <BarChartCard
          title="Borrows by Category"
          data={CATEGORY_DIST}
          series={[
            { key: "borrows", label: "Borrows", color: "var(--accent)" },
          ]}
          xKey="category"
        />
        <LineChartCard
          title="Member Growth"
          data={MEMBER_GROWTH}
          series={[
            { key: "value", label: "Total Members", color: "var(--success)" },
          ]}
          xKey="label"
        />
      </div>

      {/* Top books */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>Top Borrowed Books</span>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {[
                  "Rank",
                  "Book",
                  "Category",
                  "Total Borrows",
                  "Available",
                  "Rating",
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...ADMIN_BOOKS]
                .sort((a, b) => b.totalBorrows - a.totalBorrows)
                .slice(0, 8)
                .map((b, i) => (
                  <TableRow key={b.id} b={b} i={i} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const TableRow = ({ b, i }: { b: AdminBook; i: number }) => {
  return (
    <tr key={b.id}>
      <td>
        <span
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: i < 3 ? "var(--accent)" : "var(--muted-foreground)",
            letterSpacing: "-0.03em",
          }}
        >
          #{i + 1}
        </span>
      </td>
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 26,
              height: 36,
              borderRadius: 4,
              background: b.coverColor,
              flexShrink: 0,
              boxShadow: "inset -1px 0 3px rgba(0,0,0,0.2)",
            }}
          />
          <div>
            <div style={{ fontWeight: 600 }}>{b.title}</div>
            <div
              style={{
                fontSize: 11,
                color: "var(--muted-foreground)",
              }}
            >
              {b.author}
            </div>
          </div>
        </div>
      </td>
      <td style={{ color: "var(--muted-foreground)" }}>{b.category}</td>
      <td style={{ fontWeight: 700 }}>{b.totalBorrows.toLocaleString()}</td>
      <td>
        <span
          style={{
            color:
              b.availableCopies > 0 ? "var(--success)" : "var(--destructive)",
            fontWeight: 600,
          }}
        >
          {b.availableCopies}/{b.totalCopies}
        </span>
      </td>
      <td>★ {b.rating.toFixed(1)}</td>
    </tr>
  );
};
