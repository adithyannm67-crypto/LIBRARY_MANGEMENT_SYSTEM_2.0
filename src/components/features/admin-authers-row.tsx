"use client";

import { useState } from "react";
import styles from "@/styles/admin-shared.module.css";
import Button from "@/components/ui/Button";

import { Author } from "@/types/database";

export default function AutherRow({ a }: { a: Author }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <>
      <tr
        className={styles.clickable}
        onClick={() => setExpanded(expanded === a.author_id ? null : a.author_id)}
        style={{ background: expanded === a.author_id ? "var(--muted)" : undefined, }}
      >
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
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `hsl(${a.author_id.charCodeAt(2) * 47}deg 55% 60%)`,
                color: "#fff",
                fontWeight: 700,
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {a.name[0]}
            </div>
            <span style={{ fontWeight: 600 }}>{a.name}</span>
          </div>
        </td>
        <td style={{ color: "var(--muted-foreground)" }}>{a.nationality}</td>
        <td style={{ fontWeight: 600 }}>{a.book_count}</td>
        <td>★ {a.rating.toFixed(1)}</td>
        <td>
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => e.stopPropagation()}
          >
            Edit
          </Button>
        </td>
      </tr>
      {expanded === a.author_id && (
        <tr>
          <td
            colSpan={6}
            style={{
              padding: "0 14px 14px 56px",
              fontSize: 13,
              color: "var(--muted-foreground)",
              lineHeight: 1.7,
              borderBottom: "1px solid var(--border)",
              background: "var(--muted)",
            }}
          >
            {a?.bio}
          </td>
        </tr>
      )}
    </>
  );
}
