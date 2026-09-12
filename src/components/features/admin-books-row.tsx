"use client";

import { useState } from "react";
import styles from "@/styles/admin-shared.module.css";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import type { Book } from "@/types/database";

export default function BookRow({ b }: { b: Book }) {
  const router = useRouter();
  return (
    <tr
      key={b.book_id}
      className={styles.clickable}
      onClick={() => router.push(`/admin/book-details/${b.book_id}`)}
    >
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 40,
              borderRadius: 4,
              background: b.coverColor,
              flexShrink: 0,
              boxShadow: "inset -2px 0 4px rgba(0,0,0,0.15)",
            }}
          />
          <div>
            <div
              style={{
                fontWeight: 600,
                maxWidth: 150,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {b.title}
            </div>
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
      <td
        style={{
          fontFamily: "monospace",
          fontSize: 11,
          color: "var(--muted-foreground)",
        }}
      >
        {b.isbn}
      </td>
      <td style={{ color: "var(--muted-foreground)" }}>          {b.category}</td>
      <td>
        <span style={{ fontWeight: 600 }}>{b.available_copies}</span>
        <span style={{ color: "var(--muted-foreground)" }}>
          /{b.total_copies}
        </span>
      </td>
      <td>★ {b.rating.toFixed(1)}</td>
      <td>
        <Button
          variant="ghost"
          size="xs"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/book-details/${b.book_id}`);
          }}
        >
          View
        </Button>
      </td>
    </tr>
  );
}
