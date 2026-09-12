"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Star, BookMarked } from "lucide-react";
import type { Book } from '@/types/database'
import Badge from "../ui/Badge";
import styles from "./BookCard.module.css";

import Link from "next/link";

interface BookCardProps {
  book: Book;

  actions?: React.ReactNode;
}

export default function BookCard({ book, actions }: BookCardProps) {
  const router = useRouter();

  const handleBookClick = () => {
    alert("Book clicked!");
    router.push(`/user/books/${book.id}`);
  };

  const isAvailable = book.availableCopies > 0;
  return (
    <Link
      href={`/user/books/${book.id}`}
    style={{  textDecoration: "none", cursor: "pointer" }}
      className={styles.card}
  
      role={"button"}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleBookClick()}
    >
      {/* Cover */}
      <div
        className={styles.cover}
        style={{
          background: `linear-gradient(160deg, ${book.coverColor} 0%, ${book.coverAccent} 100%)`,
        }}
      >
        {book.isBestseller && (
          <Badge variant="warning" size="sm" className={styles.coverBadge}>
            Bestseller
          </Badge>
        )}
        {book.isNew && (
          <Badge variant="accent" size="sm" className={styles.coverBadgeTop}>
            New
          </Badge>
        )}
        <div className={styles.coverSpine} />
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.category}>{book.category}</div>
        <div className={styles.title}>{book.title}</div>
        <div className={styles.author}>by {book.author}</div>
        <div className={styles.row}>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={10}
                fill={i <= Math.round(book.rating) ? "#F59E0B" : "transparent"}
                color="#F59E0B"
              />
            ))}
            <span className={styles.rating}>{book.rating}</span>
          </div>
          <Badge variant={isAvailable ? "success" : "outline"} size="sm">
            {isAvailable ? `${book.availableCopies} avail.` : "Unavailable"}
          </Badge>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </Link>
  );
}

interface BookListCardProps {
  book: Book;
  
  actions?: React.ReactNode;
}

export function BookListCard({ book, actions }: BookListCardProps) {
  const router = useRouter();

  const isAvailable = book.availableCopies > 0;
  return (
    <Link href={`/user/books/${book.id}`} style={{  textDecoration: "none", cursor: "pointer" }} className={styles.listCard}>
      <div
        className={styles.listCover}
        style={{
          background: `linear-gradient(160deg, ${book.coverColor} 0%, ${book.coverAccent} 100%)`,
        }}
      >
        <div className={styles.coverSpine} />
      </div>
      <div className={styles.listInfo}>
        <div className={styles.listMeta}>
          <span className={styles.category}>{book.category}</span>
          {book.isBestseller && (
            <Badge variant="warning" size="sm">
              Bestseller
            </Badge>
          )}
          {book.isNew && (
            <Badge variant="accent" size="sm">
              New
            </Badge>
          )}
        </div>
        <Link href={`/user/books/${book.id}`} className={styles.listTitle}>
          {book.title}
        </Link>
        <div className={styles.author}>by {book.author}</div>
        <div className={styles.row}>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={11}
                fill={i <= Math.round(book.rating) ? "#F59E0B" : "transparent"}
                color="#F59E0B"
              />
            ))}
            <span className={styles.rating}>
              {book.rating} ({book.reviewCount.toLocaleString()})
            </span>
          </div>
          <span className={styles.pages}>{book.pages} pages</span>
        </div>
      </div>
      <div className={styles.listRight}>
        <Badge variant={isAvailable ? "success" : "outline"}>
          {isAvailable
            ? `${book.availableCopies}/${book.totalCopies} available`
            : "Unavailable"}
        </Badge>
        {actions && <div className={styles.listActions}>{actions}</div>}
      </div>
    </Link>
  );
}
