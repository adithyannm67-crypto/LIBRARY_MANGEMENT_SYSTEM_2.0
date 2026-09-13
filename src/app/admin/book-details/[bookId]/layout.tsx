import React from "react";
import { AlertTriangle, ChevronLeft } from "lucide-react";

import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";


import TabPanel from "@/components/layout/admin-book-deatils-tabs";
import BookDetailsActions from "@/components/features/admin-book-details-actions";

import { getBook, getBookCategory } from "@/utils/bookQueries";

interface Props {
  params: Promise<{ bookId: string }>;
  children: React.ReactNode;
}

export default async function AdminBookDetailsLayout({
  params,
  children,
}: Props) {
  const { bookId } = await params;

  const book = await getBook(bookId);

  if (!book)
    return (
      <div className={styles.page}>
        <div className={styles.errorState}>
          <AlertTriangle size={28} />
          Book not found
        </div>
      </div>
    );

  const category = await getBookCategory(book);

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
              className="h-[110px] w-20 shrink-0 rounded-lg shadow-[inset_-3px_0_8px_rgba(0,0,0,0.2),4px_4px_16px_rgba(0,0,0,0.12)]"
              style={{ background: book.coverColor || "#cc76b3" }}
            />
            <div className="flex-1">
              <h2 className="mb-1 text-[18px] font-extrabold tracking-[-0.02em]">
                {book.title}
              </h2>
              <p className="mb-3 text-[13px] text-muted-foreground">
                {book.author} · {book.publisher} · {book.published_year}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className={`${styles.badge} ${styles.badgeAccent}`}>
                  {category?.name ?? book.category}
                </span>
                <span
                  className={`${styles.badge} ${styles.badgeNeutral} font-mono`}
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
            <div className="grid grid-cols-2 gap-2.5 self-start">
              {[
                { l: "Pages", v: book.pages },
                { l: "Rating", v: `★ ${book.rating.toFixed(1)}` },
                { l: "Reviews", v: book.review_count },
                { l: "Copies", v: book.total_copies },
              ].map((s) => (
                <div
                  key={s.l}
                  className="min-w-[88px] rounded-lg bg-muted px-3.5 py-3 text-center"
                >
                  <div className="text-[18px] font-extrabold tracking-[-0.03em]">
                    {s.v}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
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