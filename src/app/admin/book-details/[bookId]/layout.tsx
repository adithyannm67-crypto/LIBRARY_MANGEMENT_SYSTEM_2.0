

import React from "react";
import { AlertTriangle, ChevronLeft } from "lucide-react";

import { getAdminBook } from "@/mock/adminData";
import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";

import Link from "next/link";
import TabPanel from "@/components/layout/admin-book-deatils-tabs";import { MockBook as AdminBook } from "@/mock/mock/types";

interface Props {
  params: { bookId: string };
  children: React.ReactNode;
}
export default function AdminBookDetailsPage({ params, children }: Props) {
  const bookId = params.bookId;
  const book = getAdminBook(bookId);

  const QUICK_STATS = ({ book }: { book: AdminBook }) => {
    return [
      { l: "Pages", v: book.pages },
    ];
  };

  if (!book)
    return (
      <div className={styles.page}>
        <div className={styles.errorState}>
          <AlertTriangle size={28} />
          Book not found
        </div>
      </div>
    );

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Link href="/admin/books" className={styles.backBtn}>
          <ChevronLeft size={15} /> Books
        </Link>
        <div className={styles.pageActions}>
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Remove
          </Button>
        </div>
      </div>

      {/* Hero card */}
      <div className={styles.section}>
        <div className={styles.sectionBody}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div
              style={{
                width: 80,
                height: 110,
                borderRadius: 8,
                background: book.coverColor,
                flexShrink: 0,
                boxShadow:
                  "inset -3px 0 8px rgba(0,0,0,0.2), 4px 4px 16px rgba(0,0,0,0.12)",
              }}
            />
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  margin: "0 0 4px",
                }}
              >
                {book.title}
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted-foreground)",
                  margin: "0 0 12px",
                }}
              >
                {book.author} · {book.publisher} · {book.published_year}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span className={`${styles.badge} ${styles.badgeAccent}`}>
                  {typeof book.category === "string" ? book.category : book.category.name}
                </span>
                <span
                  className={`${styles.badge} ${styles.badgeNeutral}`}
                  style={{ fontFamily: "monospace" }}
                >
                  {book.isbn}
                </span>
                <span
                  className={`${styles.badge} ${book.available_copies > 0 ? styles.badgeActive : styles.badgeWarning}`}
                >
                  {book.available_copies}/{book.total_copies} available
                </span>
                <span className={`${styles.badge} ${styles.badgeNeutral}`}>
                  ★ {book.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignSelf: "flex-start", }} >
              {QUICK_STATS({ book }).map((s) => (
                <div key={s.l} 
                  style={{ textAlign: "center", padding: "12px 14px", background: "var(--muted)", borderRadius: 8, }} >
                  <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", }} > {s.v} </div>
                  <div style={{ fontSize: 11, color: "var(--muted-foreground)" }} > {s.l} </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <TabPanel bookId={bookId} />

      {children}
    </div>
  );
}
