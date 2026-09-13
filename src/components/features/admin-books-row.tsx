

import type { Book } from "@/types/database";
import RowActions from "./admin-book-row-actions";

export default function BookRow({
  b,
  onEdit,
  onDelete,
}: {
  b: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}) {
  
  return (
    <tr key={b.book_id} >
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
            <div style={{ fontSize: 11, color: "var(--muted-foreground)", }} > {b.author} </div>
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
        <RowActions b={b} onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}
