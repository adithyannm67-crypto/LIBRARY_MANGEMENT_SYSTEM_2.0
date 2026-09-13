import styles from "@/styles/user-shared.module.css";

import Link from "next/link";

import { BookMarked, Clock, CheckCircle, AlertTriangle, ArrowRight, } from "lucide-react";

import { LOANS, NOTIFICATIONS, RESERVATIONS, BOOKS, MONTHLY_READING, getBook, daysUntil, fmtDateShort, } from "@/styles/mock/portalData";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { BarChartCard } from "@/components/ui/Charts";
import BorrowCard from "@/components/features/BorrowCard";
import { NotificationItem } from "@/components/features/NotificationItem";
import BookCard from "@/components/features/BookCard";
import UserDashboardHeader from "@/components/features/user-dashboardheader";
import OverDueAlert from "@/components/features/user-dashboard-overduealert";

import type { StatCardProps } from "@/components/ui/StatCard";



export default function DashboardPage() {
  const activeLoans = LOANS.filter((l) => l.status !== "returned")?.sort((a, b) => daysUntil(a.dueAt) - daysUntil(b.dueAt)).slice(0,5);
  const overdueLoans = activeLoans.filter((l) => l.status === "overdue");
  const readyReservation = RESERVATIONS.find((r) => r.status === "ready");
  const unreadNotifs = NOTIFICATIONS.filter((n) => !n.read).slice(0, 3);
  const recommended = BOOKS.filter(
    (b) => !activeLoans.some((l) => l.bookId === b.id),
  ).slice(0, 4);

  const chartData = MONTHLY_READING.slice(-6);

  const STATS: StatCardProps[] = [
    {
      icon: <BookMarked size={18} color="var(--accent)" />,
      label: "Active borrows",
      value: activeLoans.length,
      max: 5,
    },
    {
      icon: <AlertTriangle size={18} color="var(--destructive)" />,
      label: "Overdue",
      value: overdueLoans.length,
    },
    {
      icon: <Clock size={18} color="var(--warning)" />,
      label: "Reservations",
      value: RESERVATIONS.filter((r) => r.status !== "cancelled").length,
    },
    {
      icon: <CheckCircle size={18} color="var(--success)" />,
      label: "Returned all time",
      value: 6,
    },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <UserDashboardHeader />

      {overdueLoans.length > 0 && (
        <OverDueAlert noOfOverDue={overdueLoans.length} />
      )}

      {/* Stats */}
      <div className={`${styles.fourCol} ${styles.statsRow}`}>
        {STATS.map((s) => (
          <StatsCard key={s.label} s={s} />
        ))}
      </div>

      {/* Main + Sidebar */}
      <div className={styles.twoCol}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Active borrows */}
          <Card>
            <Card.Header>
              <Card.Title>Currently reading</Card.Title>
              <Link
                href="/user/my-borrows"
                style={{
                  textDecoration: "none",
                  fontSize: 12,
                  color: "var(--accent)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                View all <ArrowRight size={12} />
              </Link>
            </Card.Header>
            <Card.Body
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {activeLoans.length === 0 ? (
                <p style={{ color: "var(--muted-foreground)", fontSize: 13 }}>
                  No active borrows.{" "}
                  <Link
                    href="/user/browse"
                    style={{
                      textDecoration: "none",
                      background: "none",
                      border: "none",
                      color: "var(--accent)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: 13,
                    }}
                    
                  >
                    Browse the catalog
                  </Link>
                </p>
              ) : (
                activeLoans.map((l) => (
                  <BorrowCard
                    key={l.id}
                    loan={l}
                    
                    compact
                  />
                ))
              )}
            </Card.Body>
          </Card>

          {/* Reading activity */}
          <BarChartCard
            title="Reading activity"
            subtitle="Books read per month"
            data={chartData}
            series={[{ key: "count", label: "Books", color: "var(--accent)" }]}
            xKey="month"
            height={180}
          />

          
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {readyReservation && (
            <Card>
              <Card.Header>
                <Card.Title>Ready for pickup</Card.Title>
              </Card.Header>
              <Card.Body>
                {(() => {
                  const book = getBook(readyReservation.bookId);
                  return book ? (
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 54,
                          borderRadius: 6,
                          background: `linear-gradient(160deg,${book.coverColor},${book.coverAccent})`,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            marginBottom: 2,
                          }}
                        >
                          {book.title}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--muted-foreground)",
                            marginBottom: 8,
                          }}
                        >
                          by {book.author}
                        </div>
                        <Badge variant="success">
                          Pick up by {fmtDateShort(readyReservation.expiresAt!)}
                        </Badge>
                      </div>
                    </div>
                  ) : null;
                })()}
              </Card.Body>
            </Card>
          )}

          {/* Recent notifications */}
          <Card>
            <Card.Header>
              <Card.Title>Notifications</Card.Title>
              <Link
                href="/user/notifications"
                
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
            </Card.Header>
            <Card.Body
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {unreadNotifs.length === 0 ? (
                <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                  All caught up!
                </p>
              ) : (
                unreadNotifs.map((n) => (
                  <NotificationItem key={n.id} notification={n} />
                ))
              )}
            </Card.Body>
          </Card>

          {/* Borrow limit */}
          <div className={styles.miniCard}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
              Borrow limit
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 3,
                background: "var(--border)",
                overflow: "hidden",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: `${(activeLoans.length / 5) * 100}%`,
                  height: "100%",
                  background:
                    activeLoans.length >= 5
                      ? "var(--destructive)"
                      : "var(--accent)",
                  borderRadius: 3,
                }}
              />
            </div>
            <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>
              {activeLoans.length} of 5 slots used
            </div>
          </div>
          
        </div>
        
      </div>
      {/* Recommendations */}
          <div style={{ marginTop: 32 }}>
            <div className={styles.sectionLabel}>Recommended for you</div>
            <div className={styles.autoGrid}>
              {recommended.map((b) => (
                <BookCard
                  key={b.id}
                  book={b}
              
                />
              ))}
            </div>
          </div>
    </div>
  );
}

const StatsCard = ({ s }:{s:StatCardProps}) => {
  return (
    <div key={s.label} className={styles.statCard}>
      <div className={styles.statIcon}>{s.icon}</div>
      <div className={styles.statValue}>
        {s.value}
        {s?.max ? (
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--muted-foreground)",
            }}
          >
            {" "}
            / {s.max}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className={styles.statLabel}>{s.label}</div>
    </div>
  );
};
