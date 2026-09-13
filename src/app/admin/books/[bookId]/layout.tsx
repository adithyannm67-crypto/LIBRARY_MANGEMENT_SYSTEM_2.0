import React from "react";
import { AlertTriangle, ChevronLeft } from "lucide-react";

import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";


import TabPanel from "@/components/layout/admin-book-deatils-tabs";
import BookDetailsActions from "@/components/features/admin-book-details-actions";

import { createClient } from "@/lib/server";
import { getCategoryForBook } from "@/utils/dbUtils";
import type { Book } from "@/types/database";

interface Props {
  params: Promise<{ bookId: string }>;
  children: React.ReactNode;
}

export default async function AdminBookDetailsLayout({
  params,
  children,
}: Props) {
  const { bookId } = await params;

  const supabase = await createClient();
  const { data: book, error } = await supabase
    .from("books_with_authors")
    .select("*")
    .eq("book_id", bookId)
    .single<Book>();

  if (error) console.error(error);

  if (!book)
    return (
      <div className={styles.page}>
        <div className={styles.errorState}>
          <AlertTriangle size={28} />
          Book not found
        </div>
      </div>
    );

  const category = await getCategoryForBook(book);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Button isBackButton className={styles.backBtn}>
          <ChevronLeft size={15} /> Back
        </Button>
        <div className={styles.pageActions}>
          <BookDetailsActions book={book} />
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
                background: book.coverColor || "#cc76b3",
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
                  {category?.name ?? book.category}
                </span>
                <span
                  className={`${styles.badge} ${styles.badgeNeutral}`}
                  style={{ fontFamily: "monospace" }}
                >
                  {book.isbn}
                </span>
                <span
                  className={`${styles.badge} ${
                    book.available_copies > 0
                      ? styles.badgeActive
                      : styles.badgeWarning
                  }`}
                >
                  {book.available_copies}/{book.total_copies} available
                </span>
                <span className={`${styles.badge} ${styles.badgeNeutral}`}>
                  ★ {book.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                alignSelf: "flex-start",
              }}
            >
              {[
                { l: "Pages", v: book.pages },
              ].map((s) => (
                <div
                  key={s.l}
                  style={{
                    textAlign: "center",
                    padding: "12px 14px",
                    background: "var(--muted)",
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
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
        </div>
      </div>

      {/* Tabs */}
      <TabPanel bookId={bookId} />

      {children}
    </div>
  );
}