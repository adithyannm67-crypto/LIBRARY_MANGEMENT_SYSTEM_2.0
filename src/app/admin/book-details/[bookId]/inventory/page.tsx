import Button from "@/components/ui/Button";
import styles from "@/styles/admin-shared.module.css";

import { fmtDate } from "@/mock/adminData";
import { createClient } from "@/lib/server";
import { getBook } from "@/utils/bookQueries";

interface Props {
  params: Promise<{ bookId: string }>;
}

const COND_COLOR: Record<string, string> = {
  excellent: "var(--success)",
  good: "var(--accent)",
  fair: "var(--warning)",
  damaged: "var(--destructive)",
  lost: "var(--muted-foreground)",
};

const STATUS_CLS: Record<string, string> = {
  available: "badgeActive",
  borrowed: "badgeWarning",
  reserved: "badgeAccent",
  maintenance: "badgeNeutral",
};

export default async function AdminBookInventoryPage({ params }: Props) {
  const { bookId } = await params;

  const supabase = await createClient();
  const book = await getBook(bookId);

  const { data, error } = await supabase
    .from("inventory")
    .select(
      "inventory_id, book_title, copy_number, condition, status, acquired_at, last_checked, notes",
    )
    .eq("book_title", book?.title ?? "")
    .order("copy_number")
    .returns<{
      inventory_id: string;
      book_title: string;
      copy_number: number;
      condition: string | null;
      status: string | null;
      acquired_at: string | null;
      last_checked: string | null;
      notes: string | null;
    }[]>();

  if (error) console.error(error);

  const copies = (data ?? []).map((c) => ({
    id: c.inventory_id,
    copyNumber: c.copy_number,
    condition: c.condition ?? "good",
    status: c.status ?? "available",
    acquiredAt: c.acquired_at ?? null,
    lastChecked: c.last_checked ?? null,
    notes: c.notes ?? null,
  }));

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionTitle}>
          Physical Copies ({copies.length})
        </span>
        <Button variant="outline" size="xs">
          Add Copy
        </Button>
      </div>
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              {[
                "Copy #",
                "Condition",
                "Status",
                "Acquired",
                "Last Checked",
                "Notes",
              ].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {copies.map((c) => (
              <tr key={c.id}>
                <td className="font-semibold">#{c.copyNumber}</td>
                <td>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: COND_COLOR[c.condition] }}
                  >
                    {c.condition}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[STATUS_CLS[c.status] ?? "badgeNeutral"]
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="text-muted-foreground">
                  {c.acquiredAt ? fmtDate(c.acquiredAt) : "—"}
                </td>
                <td className="text-muted-foreground">
                  {c.lastChecked ? fmtDate(c.lastChecked) : "—"}
                </td>
                <td className="text-xs text-muted-foreground">
                  {c.notes ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {copies.length === 0 && (
          <p className="py-6 text-center text-[13px] text-muted-foreground">
            No copies registered for this book yet.
          </p>
        )}
      </div>
    </div>
  );
}